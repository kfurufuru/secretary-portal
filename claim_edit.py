#!/usr/bin/env python3
"""
claim_edit.py — Claude マルチセッション編集ロック管理

並列セッション衝突事故（2026-05-03 a9675b0）の再発防止。
inbox/active-edits.md の <!-- BEGIN_ACTIVE -->〜<!-- END_ACTIVE --> 間に
セッション宣言を追記/削除する。Obsidian で人間も視覚確認可能。

Usage:
  python claim_edit.py claim --target <file_or_page> --reason <text> [--duration 90]
  python claim_edit.py release --target <file_or_page>
  python claim_edit.py list
  python claim_edit.py check --target <file>           # exit 0=自分のみ or 空, 1=他セッション衝突
  python claim_edit.py check --target <file> --not-mine # exit 0=他セッションあり, 1=なし（hook用）
  python claim_edit.py expire                          # 期限切れエントリを自動削除

Storage: inbox/active-edits.md
"""
import os
import re
import sys
import io
import argparse
import datetime as dt
from pathlib import Path

# Windows cp932 → UTF-8 強制
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

ACTIVE_FILE = Path(__file__).parent / "inbox" / "active-edits.md"
BEGIN_MARK = "<!-- BEGIN_ACTIVE -->"
END_MARK = "<!-- END_ACTIVE -->"
SESSION_ID_ENV = "CLAUDE_SESSION_ID"


def now_jst() -> dt.datetime:
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=9)))


def get_session_id() -> str:
    """セッションIDを取得（環境変数 or PIDベース fallback）"""
    sid = os.environ.get(SESSION_ID_ENV)
    if sid:
        return sid
    return f"PID-{os.getpid()}"


def parse_entries(content: str) -> list[dict]:
    """active セクションから辞書のリストとして既存エントリを抽出"""
    m = re.search(rf"{re.escape(BEGIN_MARK)}(.*?){re.escape(END_MARK)}", content, re.DOTALL)
    if not m:
        return []
    block = m.group(1).strip()
    if not block:
        return []
    entries = []
    # ### Session-XXX ... の塊で分割
    chunks = re.split(r"\n(?=### )", block)
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk:
            continue
        d = {"raw": chunk}
        # session id and timestamps
        m1 = re.search(r"### (.+?) — (.+?) 開始", chunk)
        if m1:
            d["session"] = m1.group(1).strip()
            d["started"] = m1.group(2).strip()
        m2 = re.search(r"\*\*対象\*\*:\s*`(.+?)`", chunk)
        if m2:
            d["target"] = m2.group(1).strip()
        m3 = re.search(r"\*\*作業内容\*\*:\s*(.+)", chunk)
        if m3:
            d["reason"] = m3.group(1).strip()
        m4 = re.search(r"\*\*期限\*\*:\s*(.+)", chunk)
        if m4:
            d["deadline"] = m4.group(1).strip()
        m5 = re.search(r"\*\*heartbeat\*\*:\s*(.+)", chunk)
        if m5:
            d["heartbeat"] = m5.group(1).strip()
        entries.append(d)
    return entries


def render_entries(entries: list[dict]) -> str:
    """エントリ辞書のリストを Markdown ブロックに整形"""
    if not entries:
        return f"{BEGIN_MARK}\n{END_MARK}"
    parts = [BEGIN_MARK, ""]
    for e in entries:
        parts.append(f"### {e['session']} — {e['started']} 開始")
        parts.append(f"- **対象**: `{e['target']}`")
        parts.append(f"- **作業内容**: {e.get('reason', '(未記載)')}")
        if e.get("deadline"):
            parts.append(f"- **期限**: {e['deadline']}")
        parts.append(f"- **heartbeat**: {e.get('heartbeat', '-')}")
        parts.append("")
    parts.append(END_MARK)
    return "\n".join(parts)


def update_file(entries: list[dict]) -> None:
    content = ACTIVE_FILE.read_text(encoding="utf-8")
    new_block = render_entries(entries)
    new_content = re.sub(
        rf"{re.escape(BEGIN_MARK)}.*?{re.escape(END_MARK)}",
        new_block,
        content,
        count=1,
        flags=re.DOTALL,
    )
    # frontmatter last_updated 更新
    iso = now_jst().strftime("%Y-%m-%dT%H:%M:%S+09:00")
    new_content = re.sub(r"^last_updated:.*$", f"last_updated: {iso}", new_content, count=1, flags=re.MULTILINE)
    ACTIVE_FILE.write_text(new_content, encoding="utf-8", newline="")


def cmd_claim(args) -> int:
    entries = parse_entries(ACTIVE_FILE.read_text(encoding="utf-8"))
    sid = args.session or get_session_id()
    now = now_jst().strftime("%Y-%m-%d %H:%M JST")
    deadline = (now_jst() + dt.timedelta(minutes=args.duration)).strftime("%Y-%m-%d %H:%M JST")

    # 既存衝突チェック
    conflicts = [e for e in entries if e.get("target") == args.target and e.get("session") != sid]
    if conflicts:
        print(f"⚠ CONFLICT: '{args.target}' は別セッションが claim 中:")
        for c in conflicts:
            print(f"    {c.get('session')} (since {c.get('started')}) — {c.get('reason')}")
        print("対処: 別セッションが完了するのを待つか、ユーザーに確認")
        return 1

    # 同セッションの既存エントリは上書き（heartbeat 更新の意味も）
    entries = [e for e in entries if not (e.get("target") == args.target and e.get("session") == sid)]
    entries.append({
        "session": sid,
        "started": now,
        "target": args.target,
        "reason": args.reason,
        "deadline": deadline,
        "heartbeat": now,
    })
    update_file(entries)
    print(f"✓ CLAIMED: '{args.target}' by {sid} (deadline: {deadline})")
    return 0


def cmd_release(args) -> int:
    entries = parse_entries(ACTIVE_FILE.read_text(encoding="utf-8"))
    sid = args.session or get_session_id()
    before = len(entries)
    if args.target:
        entries = [e for e in entries if not (e.get("target") == args.target and e.get("session") == sid)]
    else:
        # 自セッションの全エントリ削除
        entries = [e for e in entries if e.get("session") != sid]
    after = len(entries)
    update_file(entries)
    print(f"✓ RELEASED: {before - after} entries (session={sid})")
    return 0


def cmd_list(args) -> int:
    entries = parse_entries(ACTIVE_FILE.read_text(encoding="utf-8"))
    if not entries:
        print("(アクティブセッションなし)")
        return 0
    print(f"=== アクティブな編集 ({len(entries)} 件) ===")
    for e in entries:
        print(f"\n[{e.get('session')}] {e.get('target')}")
        print(f"  reason   : {e.get('reason')}")
        print(f"  started  : {e.get('started')}")
        print(f"  deadline : {e.get('deadline', '-')}")
        print(f"  heartbeat: {e.get('heartbeat', '-')}")
    return 0


def cmd_check(args) -> int:
    """staged ファイルが他セッションと衝突するかチェック（pre-commit用）"""
    entries = parse_entries(ACTIVE_FILE.read_text(encoding="utf-8"))
    sid = args.session or get_session_id()
    # target は厳密一致と「ファイル名で始まる」両方をマッチ（page anchor 含む）
    base_target = args.target.split("#")[0]
    conflicts = []
    for e in entries:
        et = e.get("target", "")
        eb = et.split("#")[0]
        if eb == base_target and e.get("session") != sid:
            conflicts.append(e)
    if args.not_mine:
        # hook用: 他セッションの claim があれば exit 0
        if conflicts:
            for c in conflicts:
                print(f"OTHER_SESSION_CLAIM: {c.get('session')} | target={c.get('target')} | reason={c.get('reason')}")
            return 0
        return 1
    else:
        # 通常: 他セッション claim あれば exit 1
        if conflicts:
            print(f"⚠ '{args.target}' は他セッションが claim 中:")
            for c in conflicts:
                print(f"    {c.get('session')} (since {c.get('started')}) — {c.get('reason')}")
            return 1
        print(f"✓ '{args.target}': 衝突なし")
        return 0


def cmd_expire(args) -> int:
    """deadline を過ぎたエントリを削除"""
    entries = parse_entries(ACTIVE_FILE.read_text(encoding="utf-8"))
    now = now_jst()
    survivors = []
    expired = []
    for e in entries:
        deadline_str = e.get("deadline", "")
        try:
            d = dt.datetime.strptime(deadline_str.replace(" JST", ""), "%Y-%m-%d %H:%M")
            d = d.replace(tzinfo=dt.timezone(dt.timedelta(hours=9)))
            if d < now:
                expired.append(e)
            else:
                survivors.append(e)
        except (ValueError, TypeError):
            survivors.append(e)
    update_file(survivors)
    print(f"✓ EXPIRED: {len(expired)} 件削除 / {len(survivors)} 件残存")
    for e in expired:
        print(f"   - {e.get('session')} | {e.get('target')} (deadline {e.get('deadline')})")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description="Claude マルチセッション編集ロック")
    sp = p.add_subparsers(dest="cmd", required=True)

    pc = sp.add_parser("claim")
    pc.add_argument("--target", required=True)
    pc.add_argument("--reason", required=True)
    pc.add_argument("--duration", type=int, default=90, help="想定編集時間(分)。デフォルト90分")
    pc.add_argument("--session")

    pr = sp.add_parser("release")
    pr.add_argument("--target")
    pr.add_argument("--session")

    sp.add_parser("list")

    pcheck = sp.add_parser("check")
    pcheck.add_argument("--target", required=True)
    pcheck.add_argument("--session")
    pcheck.add_argument("--not-mine", action="store_true",
                        help="他セッションのclaimがあれば exit 0、なければ exit 1（pre-commit用）")

    sp.add_parser("expire")

    args = p.parse_args()
    if not ACTIVE_FILE.exists():
        print(f"ERROR: {ACTIVE_FILE} not found", file=sys.stderr)
        return 2

    return {
        "claim": cmd_claim,
        "release": cmd_release,
        "list": cmd_list,
        "check": cmd_check,
        "expire": cmd_expire,
    }[args.cmd](args)


if __name__ == "__main__":
    sys.exit(main())
