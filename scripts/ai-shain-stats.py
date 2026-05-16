#!/usr/bin/env python3
"""AI社員諮問ログ集計

使い方:
    python scripts/ai-shain-stats.py              # 全期間サマリ
    python scripts/ai-shain-stats.py --recent 10  # 直近10件詳細
    python scripts/ai-shain-stats.py --since 2026-05-01  # 指定日以降

出力:
- 呼出総数
- 一致パターン分布（unanimous / majority / split）
- rescope適用率
- 少数派採用率
- 最近の諮問一覧（オプション）

拡張判断:
- split が増えてきたら「前提整理スキル」追加検討
- minority_adopted が増えてきたら構造的負債領域の偏り検出
- 全体ボリュームが多ければペルソナ4人目追加の判断材料に
"""
import argparse
import json
import sys
from collections import Counter
from datetime import datetime, timedelta
from pathlib import Path

LOG_PATH = Path(r"C:\Users\kfuru\.secretary\logs\ai-shain-consult.jsonl")

# Windows UTF-8出力
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def load_records(since: str | None):
    if not LOG_PATH.exists():
        return []
    records = []
    with LOG_PATH.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                r = json.loads(line)
            except json.JSONDecodeError:
                continue
            if since and r.get("ts", "") < since:
                continue
            records.append(r)
    return records


def main() -> int:
    parser = argparse.ArgumentParser(description="AI社員諮問ログ集計")
    parser.add_argument("--recent", type=int, default=0, help="直近N件の詳細表示")
    parser.add_argument("--since", help="ISO日付（YYYY-MM-DD）以降に絞る")
    parser.add_argument("--summary", choices=["7d", "30d"], help="直近7日 or 30日サマリ（morning-reporter用・1行出力）")
    parser.add_argument("--split-recent", choices=["7d", "30d"], help="直近の split 案件件名リスト（morning-reporter用・未決リマインダー）")
    args = parser.parse_args()

    # --split-recent モード: split案件のみ件名列挙して早期return
    if args.split_recent:
        days = 7 if args.split_recent == "7d" else 30
        cutoff = (datetime.now() - timedelta(days=days)).date().isoformat()
        split_records = [r for r in load_records(cutoff) if r.get("pattern") == "split"]
        if not split_records:
            return 0  # 0件なら何も出力しない（morning-reporter スキップ用）
        print(f"未決諮問（直近{args.split_recent} split・{len(split_records)}件）:")
        for r in split_records:
            ts_date = r.get("ts", "")[:10]
            print(f"  - {ts_date} {r.get('topic', '?')}")
        return 0

    # --summary は --since を上書き
    since = args.since
    if args.summary:
        days = 7 if args.summary == "7d" else 30
        since = (datetime.now() - timedelta(days=days)).date().isoformat()

    records = load_records(since)
    total = len(records)

    # --summary モード: 1行出力で早期return
    if args.summary:
        if total == 0:
            print(f"AI社員諮問（直近{args.summary}）: 0件")
            return 0
        patterns = Counter(r.get("pattern", "?") for r in records)
        print(f"AI社員諮問（直近{args.summary}）: {total}件  "
              f"一致 {patterns.get('unanimous',0)} / 多数決 {patterns.get('majority',0)} / 割れ {patterns.get('split',0)}")
        return 0

    print(f"AI社員諮問 集計  ログ: {LOG_PATH}")
    if args.since:
        print(f"対象期間: {args.since} 以降")
    print(f"総呼出数: {total}")

    if total == 0:
        print("（ログなし）")
        return 0

    # パターン分布
    patterns = Counter(r.get("pattern", "?") for r in records)
    print("\n一致パターン分布:")
    for p in ("unanimous", "majority", "split"):
        c = patterns.get(p, 0)
        pct = c / total * 100 if total else 0
        print(f"  {p:10s} {c:4d}  ({pct:5.1f}%)")

    # rescope / minority採用
    rescope_count = sum(1 for r in records if r.get("rescope_applied"))
    minority_count = sum(1 for r in records if r.get("minority_adopted"))
    print(f"\nrescope適用: {rescope_count} ({rescope_count / total * 100:.1f}%)")
    print(f"少数派採用: {minority_count} ({minority_count / total * 100:.1f}%)")

    # カテゴリ分布
    categories = Counter(r.get("category", "other") for r in records)
    if len(categories) > 1 or "other" not in categories:
        print("\nカテゴリ分布:")
        for cat, c in categories.most_common():
            print(f"  {cat:12s} {c:4d}")

    # 少数派ペルソナ分布（majorityのみ）
    minority_records = [r for r in records if r.get("pattern") == "majority"]
    if minority_records:
        minorities = Counter(r.get("minority_persona", "none") for r in minority_records)
        print("\n少数派ペルソナ（majority時）:")
        for persona, c in minorities.most_common():
            if persona != "none":
                print(f"  {persona:10s} {c:4d}")

    # 直近N件詳細
    if args.recent > 0:
        print(f"\n直近 {args.recent} 件:")
        for r in records[-args.recent:]:
            ts = r.get("ts", "?")
            topic = r.get("topic", "?")
            pattern = r.get("pattern", "?")
            result = r.get("result", "?")
            print(f"  [{ts}] {pattern:10s} {topic}")
            print(f"      → {result}")

    # 拡張判断のヒント
    print("\n--- 拡張判断ヒント ---")
    if total >= 20:
        split_pct = patterns.get("split", 0) / total * 100
        if split_pct >= 30:
            print(f"⚠️  split率 {split_pct:.0f}% （前提整理スキル追加検討）")
        if minority_count / total >= 0.3:
            print(f"⚠️  少数派採用率 {minority_count / total * 100:.0f}% （構造的負債領域に偏り？）")
        # 少数派ペルソナ偏り検出
        minority_fixation = 0.0
        top_minority = None
        if minority_records:
            top_minority, top_count = minorities.most_common(1)[0]
            if top_minority != "none":
                minority_fixation = top_count / len(minority_records)
                if minority_fixation >= 0.6:
                    print(f"⚠️  少数派が {top_minority} に偏り {top_count}/{len(minority_records)}件 "
                          f"（{top_minority} の視点が構造的に他者と衝突中）")

        # 🚨 ペルソナ4人目検討トリガー（N≥50・split+少数派固定の両立）
        if total >= 50 and split_pct >= 25 and minority_fixation >= 0.5 and top_minority and top_minority != "none":
            print()
            print(f"🚨 ペルソナ4人目検討推奨")
            print(f"   条件: N={total}（≥50） / split率 {split_pct:.0f}%（≥25%） / "
                  f"少数派{top_minority}固定 {minority_fixation*100:.0f}%（≥50%）")
            print(f"   → 3者では視点が足りない兆候。add-persona Skill で4人目追加を検討")
            print(f"   候補軸: 学習者視点 / 法令専門家視点 / 経営者視点 / エンジニア視点 等")
    else:
        print(f"（サンプル不足 N={total}・拡張判断は20件以降推奨）")

    return 0


if __name__ == "__main__":
    sys.exit(main())
