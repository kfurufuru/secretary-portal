#!/usr/bin/env python3
"""denken_nightly.py - 電験 夜間メタボリズム v0

毎晩22:00、e-log.md誤答メモの当日分を読み、
翌朝の自問自答用『問い』を3つだけ生成する。

Usage:
    py scripts/denken_nightly.py            # 本番
    py scripts/denken_nightly.py --dry-run  # API叩かずプロンプトだけ確認
"""
import argparse
import re
import sys
from datetime import date, datetime
from pathlib import Path

if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import anthropic

SECRETARY = Path("C:/Users/kfuru/.secretary")
ELOG = SECRETARY / "denken-study" / "e-log.md"
OUT_DIR = SECRETARY / "inbox" / "denken-questions"
LOG_FILE = SECRETARY / "logs" / "denken-nightly.log"
MODEL = "claude-sonnet-4-6"
TODAY = date.today().isoformat()

SYSTEM = """あなたは電験3種学習支援AIです。古舘さん（36歳・電気エンジニア管理職・合理主義）の誤答メモから、翌朝のバス通勤中（15分・スマホ・紙ペンなし）で考えられる「問い」を3つ生成してください。

絶対ルール:
- 語呂合わせ・暗記テクニック禁止（因果理解ベース）
- 答えは書かない。問いだけ
- 1問30秒で考えられる粒度
- 「なぜ」「どちらが先」「もし〜なら」形式推奨

出力形式（この形式のみ、前置き禁止）:
問い1: ...
問い2: ...
問い3: ..."""


def log(msg: str) -> None:
    LOG_FILE.parent.mkdir(exist_ok=True)
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    with LOG_FILE.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def extract_today_errors() -> list[str]:
    """e-log.md の ## 誤答メモ テーブルから当日行のみ抽出."""
    if not ELOG.exists():
        return []
    text = ELOG.read_text(encoding="utf-8")
    m = re.search(r"## 誤答メモ\s*\n(.*?)(?=\n##|\Z)", text, re.DOTALL)
    if not m:
        return []
    rows = []
    for line in m.group(1).splitlines():
        line = line.strip()
        if not line.startswith("|") or line.startswith("|---") or "日付" in line:
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) >= 2 and cells[0] == TODAY and any(cells[1:]):
            rows.append(line)
    return rows


def call_sonnet(rows: list[str]) -> str:
    client = anthropic.Anthropic()
    user = "当日の誤答メモ:\n" + "\n".join(rows)
    resp = client.messages.create(
        model=MODEL,
        max_tokens=500,
        system=SYSTEM,
        messages=[{"role": "user", "content": user}],
    )
    return resp.content[0].text.strip()


def parse_questions(text: str) -> list[str]:
    qs = []
    for line in text.splitlines():
        m = re.match(r"問い\s*\d+\s*[:：]\s*(.+)", line.strip())
        if m:
            qs.append(m.group(1).strip())
    return qs[:3]


def write_output(questions: list[str], rows: list[str]) -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / f"{TODAY}.md"
    body = [
        "---",
        "type: denken-question",
        f"date: {TODAY}",
        "source: e-log.md当日分",
        "status: pending",
        "---",
        "",
        "# 明日のバスで考える3問",
        "",
    ]
    for i, q in enumerate(questions, 1):
        body += [f"## {i}. {q}", "", "（答えをここに記入）", ""]
    body += ["---", "", "## 元の誤答（参考）", ""] + rows + [""]
    out.write_text("\n".join(body), encoding="utf-8")
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    log("=" * 50)
    log(f"denken-nightly START ({TODAY})")

    rows = extract_today_errors()
    if not rows:
        log("no-op: e-log.md に当日の誤答メモなし")
        return 0
    log(f"誤答行 {len(rows)} 件を抽出")

    if args.dry_run:
        log("[dry-run] API呼び出しスキップ")
        print("\n--- System ---\n" + SYSTEM)
        print("\n--- User ---\n" + "\n".join(rows))
        return 0

    try:
        raw = call_sonnet(rows)
        questions = parse_questions(raw)
        if len(questions) < 3:
            log(f"ERROR: 問いを3件取得できず ({len(questions)}件)。レスポンス: {raw[:200]}")
            return 1
        out = write_output(questions, rows)
        log(f"OK: {out} 書き込み完了")
        return 0
    except Exception as e:
        log(f"ERROR: {type(e).__name__}: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
