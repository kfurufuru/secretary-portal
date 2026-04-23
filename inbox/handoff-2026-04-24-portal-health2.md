---
title: "Fカンパニー ポータル健全性可視化 引き継ぎ (完結)"
date: "2026-04-24"
status: "complete"
---

# 引き継ぎ

## 完了項目（2026-04-24 セッション）

前回 handoff-2026-04-24-portal-health.md の続き。P1〜P4 + knowledge昇格 全完了。

### P1: 外部4リポ 共通フッタ追加（GitHub Pages）
- ✅ kfurufuru/denken3-study → `index.html` (commit: 65b5dc53)
- ✅ kfurufuru/denken-wiki-riron → `overrides/main.html` (commit: 5d728d12)
- ✅ kfurufuru/denken-wiki-denryoku → `overrides/main.html` (commit: 8c4d08f3)
- ✅ kfurufuru/denken-wiki → `overrides/main.html` (commit: 900670ce)
- フッタ内容: Fカンパニーポータル(localhost:8092) + 4サイト相互リンク
- MkDocs 3リポは `{% block footer %}` で挿入（上部アナウンスバーと共存）

### P2: link_checker 外部URL死活監視
- ✅ `health-monitor/run-link-check.bat` に `--check-external` 追加
- 週次cron（SecretaryLinkCheck / 月08:00）に自動反映済み
- 実行時間: 内部のみ数秒 → 外部込みで1-3分に延びる

### P3: セルフヒールsparkline
- ✅ `portal-v2.html` の🩹セルフヒールカードにChart.js sparkline追加
- cat_id別・直近7日推移の mini-lineグラフ
- Chart.js CDN: `cdn.jsdelivr.net/npm/chart.js@4` を追加

### P4: localhost:8765 → GitHub Pages置換（部分A案）
- ✅ portal-v2.html 2箇所を `https://kfurufuru.github.io/denken3-study/denken-study.html` に置換
  - Quick Links「電験学習」ボタン（旧861行）
  - Navigation Hub「今日の学習」リンク（旧882行）
- localhost:8096（ai-news）はGitHub Pages なし → 起動ボタン（B案）継続
- warning件数: 4件 → 2件（localhost:8096のみ残存）

### knowledge昇格
- ✅ `knowledge/portal-health-observability.md`: review → published（last_reviewed: 2026-04-24）

## 現状の数値

| 指標 | 値 |
|------|-----|
| localhost:8765参照 | 0件（全置換済み） |
| localhost:8096参照 | 2件（起動ボタンで継続対応） |
| warning件数 | 2件（8096停止中のみ） |
| knowledge/published | 昇格済み |

## 残タスク・未決事項

### 未コミット
- portal-v2.html の変更（P3/P4）
- health-monitor/run-link-check.bat（P2）
- knowledge/portal-health-observability.md（level昇格）
- **git commit は未実施。次セッションで `git add` → `git commit` 推奨**
- 設計判断5: `auto: knowledge snapshot` cron競合注意 → git add と commit は同一bashコマンド内で連結

### P3 追加改善候補（任意）
- heal_log のデータが直近3件のみ（gas/study系）のためsparklineはほぼフラット
- データが蓄積されれば自然に見栄えが良くなる。現状は実装済みで問題なし

### P4 残件（低優先）
- ai-news を GitHub Pages 化すれば localhost:8096も完全解消できるが、コスト大

## 関連ファイル

- portal-v2.html（P3/P4変更済み・未commit）
- health-monitor/run-link-check.bat（P2変更済み・未commit）
- health-monitor/link_checker.py（変更なし）
- knowledge/portal-health-observability.md（published昇格済み・未commit）
- inbox/handoff-2026-04-24-portal-health.md（前回引継ぎ・status: pending → 本ファイルで完結）

## 重要な設計判断（再掲）

1. **ハブ埋込主義**: 別ページダッシュボードは見られない → portalカードに直接統合
2. **スキャナ除外必須**: `.claude / node_modules / .git / __pycache__` を rglob除外
3. **実疎通 > 未確認**: localhost URLはHEAD 1秒で自動判定
4. **.bat はASCII only**: 日本語コメント禁止（em-dash等でエラー発生）
5. **auto-snapshot競合**: git add と commit は同一bashコマンド内で連結すること
