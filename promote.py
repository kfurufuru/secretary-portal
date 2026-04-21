#!/usr/bin/env python3
"""
promote.py - inbox/ (L1) → knowledge/ (L2) 昇格スクリプト
           + knowledge/ 内レベル自動昇格（アクセスログ・クロスリファレンスベース）
"""

import argparse
import os
import re
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

# Windows CP932対策：標準出力をUTF-8に固定
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if sys.stderr.encoding != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

import anthropic
import json

# ─── 設定値 ───────────────────────────────────────────────
SECRETARY_DIR = Path("C:/Users/kfuru/.secretary")
INBOX_DIR = SECRETARY_DIR / "inbox"
KNOWLEDGE_DIR = SECRETARY_DIR / "knowledge"
LOGS_DIR = SECRETARY_DIR / "logs"
ACCESS_LOG = LOGS_DIR / "access_log.jsonl"
MODEL_HAIKU = "claude-haiku-4-5"
MODEL_SONNET = "claude-sonnet-4-6"
TODAY = date.today().isoformat()

# アクセスログベース昇格しきい値
DRAFT_TO_REVIEW_REFS = 2    # クロスリファレンス数 ≥ 2 で draft→review
REVIEW_TO_PUBLISHED_REFS = 5  # クロスリファレンス数 ≥ 5 で review→published
DRAFT_TO_REVIEW_ACCESS = 3  # 30日以内のアクセス日数 ≥ 3 で draft→review
REVIEW_TO_PUBLISHED_ACCESS = 7  # アクセス日数 ≥ 7 で review→published

# ─── フロントマター・テンプレート ──────────────────────────

FRONTMATTER_TEMPLATE = """\
---
title: "{title}"
category: "{category}"
level: "draft"
created: "{created}"
last_reviewed: "{created}"
understanding_score: 2
source: "{source}"
tags: [{tags}]
related: [{related}]
---
"""

KNOWLEDGE_BODY_TEMPLATE = """\
# {title}

## TL;DR
{tldr}

## ポイント
{points}

## 詳細
{details}

## 落とし穴
{pitfalls}

## 参考リンク
-

## メモ（実践接続）
-
"""

# ─── 判定プロンプト ───────────────────────────────────────

JUDGE_SYSTEM = """\
あなたはナレッジ昇格の判定者です。
以下の基準をすべて満たす場合のみ「昇格可」と判定してください。

昇格基準:
1. 再利用可能な知見・手順・判断軸が含まれている
2. 単なる日程・TODO・一時メモではない
3. 50文字以上の実質的な内容がある

回答フォーマット（必ずJSONのみ）:
{"promote": true, "reason": "理由（1行）", "summary": "内容の要約（1行）"}
または
{"promote": false, "reason": "却下理由（1行）", "summary": ""}
"""

# ─── 生成プロンプト ───────────────────────────────────────

GENERATE_SYSTEM = """\
あなたはナレッジ整理の専門家です。
受け取ったinboxエントリからknowledge/ファイルを生成してください。

出力形式:
- title: 日本語タイトル（簡潔に）
- category: 以下から1つ選ぶ
  電気計装 | 電験3種 | AI活用 | 設備管理 | 組織・マネジメント
- tags: 2〜4個（JSON配列の文字列、例: "タグ1", "タグ2"）
- filename: kebab-case英語ファイル名（拡張子なし）
- tldr: 結論を箇条書き1〜3行（各行先頭に"- "）
- points: 横展スタイル・思考プロセス込みの箇条書き（各行先頭に"- "）
- details: 詳細説明（箇条書きまたは文章）
- pitfalls: 落とし穴・注意点（箇条書き、各行先頭に"- "）

回答フォーマット（必ずJSONのみ）:
{
  "title": "...",
  "category": "...",
  "tags": ["...", "..."],
  "filename": "...",
  "tldr": "...",
  "points": "...",
  "details": "...",
  "pitfalls": "..."
}
"""


# ─── ユーティリティ ──────────────────────────────────────

def check_api_key() -> anthropic.Anthropic:
    """APIキー確認・clientを返す。env変数→config.jsonの順で探索"""
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        config_path = SECRETARY_DIR / "daily-review-config.json"
        try:
            cfg = json.loads(config_path.read_text(encoding="utf-8"))
            api_key = cfg.get("anthropic_api_key", "")
        except Exception:
            pass
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY が未設定です（環境変数またはdaily-review-config.json）")
        sys.exit(1)
    return anthropic.Anthropic(api_key=api_key)


def get_existing_titles() -> set[str]:
    """knowledge/ 内の既存タイトルを収集（重複チェック用）"""
    titles = set()
    for f in KNOWLEDGE_DIR.glob("**/*.md"):
        if f.name.startswith("_"):
            continue
        content = f.read_text(encoding="utf-8", errors="ignore")
        m = re.search(r'^title:\s*"(.+)"', content, re.MULTILINE)
        if m:
            titles.add(m.group(1).strip())
    return titles


def get_existing_files_meta() -> list[dict]:
    """knowledge/ 内の既存ファイルのメタ情報を収集（クロスリンク候補用）"""
    files = []
    for f in KNOWLEDGE_DIR.glob("**/*.md"):
        if f.name.startswith("_"):
            continue
        try:
            content = f.read_text(encoding="utf-8", errors="ignore")
            title_m = re.search(r'^title:\s*"(.+)"', content, re.MULTILINE)
            cat_m = re.search(r'^category:\s*"(.+)"', content, re.MULTILINE)
            tags_m = re.search(r'^tags:\s*\[(.+)\]', content, re.MULTILINE)
            if title_m:
                files.append({
                    "filename": f.name,
                    "title": title_m.group(1).strip(),
                    "category": cat_m.group(1).strip() if cat_m else "",
                    "tags": tags_m.group(1).strip() if tags_m else "",
                })
        except Exception:
            pass
    return files


def suggest_related_files(
    client: anthropic.Anthropic,
    new_data: dict,
    existing_files: list[dict],
) -> list[str]:
    """新規knowledgeに関連する既存ファイル名をHaikuで提案（最大5件）"""
    if not existing_files:
        return []
    existing_summary = "\n".join(
        f"- {f['filename']}: {f['title']} [{f['category']}] tags={f['tags']}"
        for f in existing_files[:60]
    )
    prompt = (
        f"新規ナレッジ:\n"
        f"タイトル: {new_data.get('title')}\n"
        f"カテゴリ: {new_data.get('category')}\n"
        f"タグ: {new_data.get('tags')}\n"
        f"概要: {new_data.get('tldr')}\n\n"
        f"既存ナレッジ:\n{existing_summary}\n\n"
        f"関連性の高いものをファイル名のみJSONリストで最大5件。なければ[]。\n"
        f'例: ["file-a.md", "file-b.md"]'
    )
    try:
        resp = client.messages.create(
            model=MODEL_HAIKU,
            max_tokens=200,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = resp.content[0].text.strip()
        raw = re.sub(r"^```(?:json)?\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw)
        return json.loads(raw)
    except Exception:
        return []


def split_inbox_entries(content: str) -> list[str]:
    """
    inboxファイルからエントリを分割する。
    見出し（## / ###）または水平線（---）で区切られたブロックを返す。
    frontmatter（---...---）は除外。
    """
    # frontmatterを除去
    content = re.sub(r"^---[\s\S]+?---\n", "", content, count=1)

    entries: list[str] = []

    # ## または ### 見出しでブロック分割
    blocks = re.split(r"(?=^#{2,3} )", content, flags=re.MULTILINE)
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        # 水平線でさらに分割
        sub_blocks = re.split(r"^-{3,}$", block, flags=re.MULTILINE)
        for sub in sub_blocks:
            sub = sub.strip()
            if sub:
                entries.append(sub)

    # ブロック分割で何も取れなかった場合は全体を1エントリとして扱う
    if not entries:
        stripped = content.strip()
        if stripped:
            entries.append(stripped)

    return entries


def is_already_promoted(entry: str) -> bool:
    """エントリに昇格済みマークがあるか確認"""
    return "[昇格済み→" in entry


def mark_as_promoted(content: str, entry: str, knowledge_filename: str) -> str:
    """inboxファイルの対象エントリに昇格済みマークを追記"""
    mark = f"\n> [昇格済み→ knowledge/{knowledge_filename}]"
    # エントリの末尾にマークを挿入（既存コンテンツ内の該当箇所を置換）
    # エントリの最初の行を基準に探す
    first_line = entry.split("\n")[0]
    escaped = re.escape(first_line)
    # エントリ全体を見つけてマーク付きに置換
    pattern = re.compile(re.escape(entry), re.DOTALL)
    if pattern.search(content):
        replacement = entry + mark
        new_content = pattern.sub(lambda m: replacement, content, count=1)
        return new_content
    # fallback: 最初の行の後に挿入
    return content.replace(first_line, first_line + mark, 1)


def judge_entry(client: anthropic.Anthropic, entry: str) -> dict:
    """Haikuでエントリの昇格可否を判定"""
    import json
    try:
        resp = client.messages.create(
            model=MODEL_HAIKU,
            max_tokens=256,
            system=JUDGE_SYSTEM,
            messages=[{"role": "user", "content": f"以下のエントリを判定してください:\n\n{entry}"}],
        )
        raw = resp.content[0].text.strip()
        # JSONブロックを抽出（```json ... ``` を除去）
        raw = re.sub(r"^```(?:json)?\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw)
        return json.loads(raw)
    except Exception as e:
        return {"promote": False, "reason": f"判定エラー: {e}", "summary": ""}


def generate_knowledge(client: anthropic.Anthropic, entry: str, source_filename: str) -> dict | None:
    """Sonnetでknowledgeコンテンツを生成"""
    import json
    try:
        resp = client.messages.create(
            model=MODEL_SONNET,
            max_tokens=2048,
            system=GENERATE_SYSTEM,
            messages=[{
                "role": "user",
                "content": (
                    f"以下のinboxエントリをknowledge形式に変換してください。\n"
                    f"ソースファイル: inbox/{source_filename}\n\n"
                    f"{entry}"
                ),
            }],
        )
        raw = resp.content[0].text.strip()
        raw = re.sub(r"^```(?:json)?\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw)
        return json.loads(raw)
    except Exception as e:
        print(f"    ERROR 生成失敗: {e}")
        return None


def build_knowledge_file(data: dict, source_filename: str, related: list[str] | None = None) -> str:
    """frontmatter + body を組み立てる"""
    tags_str = ", ".join(f'"{t}"' for t in data.get("tags", []))
    related_str = ", ".join(f'"[[{r}]]"' for r in (related or []))
    fm = FRONTMATTER_TEMPLATE.format(
        title=data["title"],
        category=data["category"],
        created=TODAY,
        source=f"inbox/{source_filename}",
        tags=tags_str,
        related=related_str,
    )
    body = KNOWLEDGE_BODY_TEMPLATE.format(
        title=data["title"],
        tldr=data.get("tldr", "-"),
        points=data.get("points", "-"),
        details=data.get("details", "-"),
        pitfalls=data.get("pitfalls", "-"),
    )
    return fm + body


def get_entry_label(entry: str) -> str:
    """エントリの1行目（見出しまたは先頭テキスト）を返す"""
    first = entry.split("\n")[0].strip()
    first = re.sub(r"^#+\s*", "", first)  # 見出し記号を除去
    return first[:60] if first else "(内容なし)"


# ─── アクセスログ ──────────────────────────────────────────

def log_access(rel_path: str, source: str = "manual") -> None:
    """アクセスログに1件追記する。rel_path は knowledge/ からの相対パス"""
    LOGS_DIR.mkdir(exist_ok=True)
    entry = json.dumps({
        "ts": datetime.now().isoformat(timespec="seconds"),
        "file": rel_path,
        "source": source,
    }, ensure_ascii=False)
    with open(ACCESS_LOG, "a", encoding="utf-8") as f:
        f.write(entry + "\n")


def count_access_days(rel_path: str, days: int = 30) -> int:
    """指定ファイルの直近N日間のユニーク日数アクセス数を返す"""
    if not ACCESS_LOG.exists():
        return 0
    cutoff = date.today() - timedelta(days=days)
    access_dates: set[str] = set()
    with open(ACCESS_LOG, encoding="utf-8", errors="ignore") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
                if rec.get("file") != rel_path:
                    continue
                ts_date = rec["ts"][:10]
                if ts_date >= cutoff.isoformat():
                    access_dates.add(ts_date)
            except Exception:
                pass
    return len(access_dates)


def count_cross_references(filename: str) -> int:
    """knowledge/ + inbox/ 内の全.mdファイルから filename への参照数を返す"""
    search_dirs = [KNOWLEDGE_DIR, INBOX_DIR, SECRETARY_DIR / "digital-twin"]
    count = 0
    stem = Path(filename).stem
    # Obsidian [[link]] 形式 と markdown [text](path) 形式の両方を探索
    patterns = [
        re.compile(rf"\[\[{re.escape(stem)}\]\]", re.IGNORECASE),
        re.compile(rf"\[\[{re.escape(filename)}\]\]", re.IGNORECASE),
        re.compile(rf"\({re.escape(filename)}\)", re.IGNORECASE),
        re.compile(rf"knowledge/{re.escape(filename)}", re.IGNORECASE),
    ]
    for d in search_dirs:
        if not d.exists():
            continue
        for f in d.glob("**/*.md"):
            if f.name == filename:
                continue  # 自己参照除外
            try:
                text = f.read_text(encoding="utf-8", errors="ignore")
                if any(p.search(text) for p in patterns):
                    count += 1
            except Exception:
                pass
    return count


def get_knowledge_meta(f: Path) -> dict:
    """knowledge/ ファイルのfrontmatterを解析して返す"""
    try:
        content = f.read_text(encoding="utf-8", errors="ignore")
        fm, _ = parse_frontmatter(content)
        return fm
    except Exception:
        return {}


def set_level(f: Path, new_level: str) -> None:
    """knowledge/ ファイルの level フィールドを書き換える"""
    content = f.read_text(encoding="utf-8", errors="ignore")
    updated = re.sub(
        r'^(level:\s*)["\']?\w+["\']?',
        f'level: "{new_level}"',
        content,
        count=1,
        flags=re.MULTILINE,
    )
    # last_reviewed も更新
    updated = re.sub(
        r'^(last_reviewed:\s*)["\']?[\d-]+["\']?',
        f'last_reviewed: "{TODAY}"',
        updated,
        count=1,
        flags=re.MULTILINE,
    )
    f.write_text(updated, encoding="utf-8")


def auto_promote_knowledge(dry_run: bool = True, verbose: bool = False) -> None:
    """
    knowledge/ 内の draft/review ファイルをアクセスログ・クロスリファレンスで自動昇格。
    昇格条件（どちらか一方で昇格）:
      draft → review:    refs ≥ 2  OR  access_days(30d) ≥ 3
      review → published: refs ≥ 5  OR  access_days(30d) ≥ 7
    """
    promoted: list[tuple[str, str, str, str]] = []  # (rel, old, new, reason)
    skipped: list[tuple[str, str, str]] = []         # (rel, level, reason)

    for f in sorted(KNOWLEDGE_DIR.glob("**/*.md")):
        if f.name.startswith("_"):
            continue
        meta = get_knowledge_meta(f)
        level = meta.get("level", "draft").strip().strip("\"'")
        if level not in ("draft", "review"):
            if verbose:
                skipped.append((f.name, level, "対象外"))
            continue

        rel = str(f.relative_to(KNOWLEDGE_DIR))
        refs = count_cross_references(f.name)
        access = count_access_days(rel)

        if level == "draft":
            ref_ok = refs >= DRAFT_TO_REVIEW_REFS
            acc_ok = access >= DRAFT_TO_REVIEW_ACCESS
            if ref_ok or acc_ok:
                reason = (
                    f"refs={refs}(≥{DRAFT_TO_REVIEW_REFS})"
                    if ref_ok else
                    f"access={access}日(≥{DRAFT_TO_REVIEW_ACCESS})"
                )
                promoted.append((rel, "draft", "review", reason))
                if not dry_run:
                    set_level(f, "review")
                    log_access(rel, source="auto-promote")
            else:
                skipped.append((rel, level, f"refs={refs}, access={access}日"))

        elif level == "review":
            ref_ok = refs >= REVIEW_TO_PUBLISHED_REFS
            acc_ok = access >= REVIEW_TO_PUBLISHED_ACCESS
            if ref_ok or acc_ok:
                reason = (
                    f"refs={refs}(≥{REVIEW_TO_PUBLISHED_REFS})"
                    if ref_ok else
                    f"access={access}日(≥{REVIEW_TO_PUBLISHED_ACCESS})"
                )
                promoted.append((rel, "review", "published", reason))
                if not dry_run:
                    set_level(f, "published")
                    log_access(rel, source="auto-promote")
            else:
                skipped.append((rel, level, f"refs={refs}, access={access}日"))

    # 出力
    mode = "（DRY RUN）" if dry_run else ""
    print(f"=== アクセスログ自動昇格スキャン {mode}===")
    print(f"しきい値: draft→review refs≥{DRAFT_TO_REVIEW_REFS} or access≥{DRAFT_TO_REVIEW_ACCESS}日 | "
          f"review→published refs≥{REVIEW_TO_PUBLISHED_REFS} or access≥{REVIEW_TO_PUBLISHED_ACCESS}日")
    print()

    if promoted:
        print(f"[昇格対象: {len(promoted)}件]")
        for rel, old, new, reason in promoted:
            mark = "  " if dry_run else "✓ "
            print(f"  {mark}{old} → {new}  {rel}  ({reason})")
    else:
        print("[昇格対象なし]")

    if verbose and skipped:
        print(f"\n[スキップ: {len(skipped)}件]")
        for rel, level, reason in skipped:
            print(f"  - {level}  {rel}  ({reason})")

    print()
    if dry_run and promoted:
        print("実行するには --auto-promote --no-dry-run を指定してください")


# ─── メイン処理 ──────────────────────────────────────────

def process_file(
    client: anthropic.Anthropic,
    inbox_file: Path,
    existing_titles: set[str],
    existing_files_meta: list[dict],
    dry_run: bool,
    process_all: bool,
) -> tuple[int, int]:
    """
    1つのinboxファイルを処理。
    戻り値: (promoted_count, skipped_count)
    """
    content = inbox_file.read_text(encoding="utf-8", errors="ignore")
    entries = split_inbox_entries(content)

    if not entries:
        print(f"  (エントリなし)")
        return 0, 0

    print(f"[DIR] inbox/{inbox_file.name} ... {len(entries)}エントリ検出")

    promoted = 0
    skipped = 0
    modified_content = content  # inboxへの書き戻し用

    for entry in entries:
        label = get_entry_label(entry)

        # 昇格済みスキップ
        if not process_all and is_already_promoted(entry):
            print(f"  [-] スキップ: \"{label}\" (昇格済み)")
            skipped += 1
            continue

        # 昇格判定（Haiku）
        judgment = judge_entry(client, entry)
        if not judgment.get("promote"):
            reason = judgment.get("reason", "基準未達")
            print(f"  [-] スキップ: \"{label}\" ({reason})")
            skipped += 1
            continue

        # コンテンツ生成（Sonnet）
        data = generate_knowledge(client, entry, inbox_file.name)
        if data is None:
            print(f"  [ERR] エラー: \"{label}\" -> 生成失敗のためスキップ")
            skipped += 1
            continue

        title = data.get("title", "")
        filename_base = data.get("filename", "knowledge-entry")
        filename = f"{filename_base}.md"
        dest_path = KNOWLEDGE_DIR / filename

        # 重複チェック（タイトル）
        if title in existing_titles:
            print(f"  [-] スキップ: \"{label}\" -> タイトル重複 ({title})")
            skipped += 1
            continue

        # ファイル名衝突回避（連番付加）
        if dest_path.exists() and not dry_run:
            i = 2
            while True:
                alt = KNOWLEDGE_DIR / f"{filename_base}-{i}.md"
                if not alt.exists():
                    dest_path = alt
                    filename = alt.name
                    break
                i += 1

        # クロスリンク候補取得（既存ファイルがある場合のみ）
        related = []
        if existing_files_meta:
            related = suggest_related_files(client, data, existing_files_meta)
            if related:
                print(f"     関連: {', '.join(related)}")

        knowledge_content = build_knowledge_file(data, inbox_file.name, related)

        print(f"  [OK] 昇格: \"{label}\" -> knowledge/{filename}")

        if not dry_run:
            # knowledge/ に書き込み
            dest_path.write_text(knowledge_content, encoding="utf-8")
            existing_titles.add(title)
            # 新ファイルをメタリストに追加（同バッチ内での後続エントリが参照できるよう）
            existing_files_meta.append({
                "filename": filename,
                "title": data.get("title", ""),
                "category": data.get("category", ""),
                "tags": str(data.get("tags", [])),
            })

            # inbox に昇格済みマークを付記
            modified_content = mark_as_promoted(modified_content, entry, filename)

        promoted += 1

    # inboxファイルを更新（dry_run 以外）
    if not dry_run and promoted > 0:
        inbox_file.write_text(modified_content, encoding="utf-8")

    return promoted, skipped


def main():
    parser = argparse.ArgumentParser(description="inbox/ → knowledge/ 昇格スクリプト")
    parser.add_argument("--dry-run", action="store_true", help="書き込みなし・プレビューのみ")
    parser.add_argument("--no-dry-run", action="store_true", help="--auto-promote 実行時に実際に書き込む")
    parser.add_argument("--inbox", metavar="FILENAME", help="特定ファイルのみ処理（例: 2026-04-12.md）")
    parser.add_argument("--all", dest="process_all", action="store_true", help="昇格済みエントリも再処理")
    parser.add_argument("--list-drafts", action="store_true", help="レビュー待ちのdraftファイルを一覧表示")
    parser.add_argument("--auto-promote", action="store_true",
                        help="アクセスログ・クロスリファレンスでknowledge内を自動昇格（デフォルトDRY RUN）")
    parser.add_argument("--rebuild-links", action="store_true",
                        help="既存knowledge/ファイルのrelated:フィールドをHaikuで再生成")
    parser.add_argument("--log-access", metavar="FILE",
                        help="指定ファイルのアクセスをログに記録（例: ai-agent-memory-design.md）")
    parser.add_argument("--access-stats", action="store_true", help="アクセスログ統計を表示")
    parser.add_argument("--verbose", action="store_true", help="スキップ理由も表示")
    args = parser.parse_args()

    # --log-access: 指定ファイルのアクセスを記録して終了
    if args.log_access:
        LOGS_DIR.mkdir(exist_ok=True)
        log_access(args.log_access, source="manual")
        print(f"[OK] アクセスログ記録: {args.log_access} ({TODAY})")
        sys.exit(0)

    # --access-stats: アクセスログ統計を表示して終了
    if args.access_stats:
        if not ACCESS_LOG.exists():
            print("[INFO] アクセスログなし（logs/access_log.jsonl が存在しません）")
            sys.exit(0)
        stats: dict[str, set[str]] = {}
        with open(ACCESS_LOG, encoding="utf-8", errors="ignore") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    rec = json.loads(line)
                    fp = rec.get("file", "")
                    ds = rec["ts"][:10]
                    stats.setdefault(fp, set()).add(ds)
                except Exception:
                    pass
        if not stats:
            print("[INFO] アクセスログは空です")
        else:
            rows = sorted(stats.items(), key=lambda x: -len(x[1]))
            print(f"=== アクセスログ統計（全期間, {len(rows)}ファイル） ===")
            print(f"{'アクセス日数':>10}  ファイル")
            print("-" * 60)
            for fp, days in rows[:30]:
                print(f"{len(days):>10}日  {fp}")
        sys.exit(0)

    # --rebuild-links: 既存ファイルのrelated:を再生成して終了
    if args.rebuild_links:
        client = check_api_key()
        all_meta = get_existing_files_meta()
        if not all_meta:
            print("[INFO] knowledge/ にファイルがありません")
            sys.exit(0)
        print(f"=== related: 再構築 ({len(all_meta)}件) ===")
        for meta in all_meta:
            fname = meta["filename"]
            f = next(KNOWLEDGE_DIR.glob(f"**/{fname}"), None)
            if not f:
                continue
            others = [m for m in all_meta if m["filename"] != fname]
            related = suggest_related_files(client, meta, others)
            if related:
                related_str = ", ".join(f'"[[{r}]]"' for r in related)
                content = f.read_text(encoding="utf-8", errors="ignore")
                updated = re.sub(
                    r"^related:\s*\[.*?\]",
                    f"related: [{related_str}]",
                    content,
                    count=1,
                    flags=re.MULTILINE,
                )
                f.write_text(updated, encoding="utf-8")
                print(f"  [OK] {fname}: {', '.join(related)}")
            else:
                print(f"  [-] {fname}: 関連なし")
        sys.exit(0)

    # --auto-promote: アクセスログ・クロスリファレンスで自動昇格して終了
    if args.auto_promote:
        dry = not args.no_dry_run
        auto_promote_knowledge(dry_run=dry, verbose=args.verbose)
        sys.exit(0)

    # --list-drafts: レビュー待ちknowledgeを一覧表示して終了
    if args.list_drafts:
        drafts = []
        for f in sorted(KNOWLEDGE_DIR.glob("**/*.md")):
            if f.name.startswith("_"):
                continue
            text = f.read_text(encoding="utf-8")
            if "level: \"draft\"" in text or "level: 'draft'" in text:
                # created日付を抽出
                m = re.search(r'created:\s*["\']?(\d{4}-\d{2}-\d{2})', text)
                created = m.group(1) if m else "----"
                # titleを抽出
                m2 = re.search(r'title:\s*["\'](.+?)["\']', text)
                title = m2.group(1) if m2 else f.stem
                # サブフォルダを含む相対パスで表示
                rel = f.relative_to(KNOWLEDGE_DIR)
                drafts.append((created, str(rel), title))
        if not drafts:
            print("[OK] レビュー待ちのdraftファイルはありません")
        else:
            print(f"=== レビュー待ち knowledge/ ({len(drafts)}件) ===")
            print(f"{'作成日':<12} {'ファイル名':<45} タイトル")
            print("-" * 90)
            for created, fname, title in drafts:
                print(f"{created:<12} {fname:<45} {title}")
            print()
            print("レビュー後: frontmatter の level を draft → review → published に更新")
        sys.exit(0)

    # APIクライアント初期化
    client = check_api_key()

    # 対象ファイル収集
    if args.inbox:
        target_files = [INBOX_DIR / args.inbox]
        for f in target_files:
            if not f.exists():
                print(f"ERROR: {f} が見つかりません")
                sys.exit(1)
    else:
        target_files = sorted(
            [f for f in INBOX_DIR.glob("*.md") if not f.name.startswith("_")]
        )

    if not target_files:
        print("昇格対象なし（inbox/ にファイルがありません）")
        sys.exit(0)

    print("=== L1→L2 昇格スキャン ===")
    if args.dry_run:
        print("（DRY RUN モード：ファイル書き込みなし）")
    print()

    # 既存knowledge収集（タイトル重複チェック＋クロスリンク候補）
    existing_titles = get_existing_titles()
    existing_files_meta = get_existing_files_meta()

    total_promoted = 0
    total_skipped = 0

    for inbox_file in target_files:
        promoted, skipped = process_file(
            client,
            inbox_file,
            existing_titles,
            existing_files_meta,
            dry_run=args.dry_run,
            process_all=args.process_all,
        )
        total_promoted += promoted
        total_skipped += skipped

    print()
    print(f"[DONE] 合計: {total_promoted}件昇格 / {total_skipped}件スキップ")


if __name__ == "__main__":
    main()
