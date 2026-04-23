---
title: "Fカンパニーポータルの健全性可視化パターン（点→線化＋セルフ診断）"
category: "システム設計"
level: "draft"
created: "2026-04-23"
last_reviewed: "2026-04-23"
understanding_score: 4
source: "2026-04-23 セッション（Fカンパニー導線診断→link_checker拡張→cron化）"
verification_method: "link-check-results.json / heal_log.json の実データ検証"
tags: ["ポータル", "ヘルスチェック", "link_checker", "セルフヒール", "可観測性", "cron"]
related: ["portal-v2.html", "health-monitor/link_checker.py"]
---
# Fカンパニーポータルの健全性可視化パターン

## TL;DR
- **点構造は必ず崩壊する** — ハブ&スポークのみのサイト群はハブが死ぬと全断。横断線（隣接サイトへの直接リンク）が冗長性を生む
- **「詳細は別ページ」は1クリックの敗北** — サマリはハブに直接埋め込む。別ページは見られない
- **スキャナの汚染源は `.claude/` とworktree** — 全走査ツールは必ず除外設定を持つ
- **「未確認」より「サーバ停止」と明示**のほうが情報量が増える（実疎通HEAD検証で差別化）

## 4つの発見

### 1. サイト構造診断は back-link の数を数えるだけで分かる
portal-v2.html から9サイトにリンク、各サイトはportalへの戻りリンクを持つ → ハブ&スポーク構造。ただし **サイト間横断リンクは business-skills のみ**で他は portal 経由必須 → ハブが死ぬと全断する脆弱構造。

### 2. 「詳細を見る→」別ページは使われない
heal_log.json（44KB）が2日前更新されても可視化UIが無いため誰も見ていなかった。portal の System Health カードに fetch + サマリ表示する形で統合 → 1クリックで状況把握。

### 3. link_checker の初期走査は「汚染結果」を出す
`rglob("*.html")` で全走査すると、worktree（他エージェントの作業コピー）の壊れリンクを全て検出 → **27件中26件が偽陽性**。除外対象: `.claude / node_modules / .git / __pycache__`。

### 4. localhost URLは「要確認」ではなく実疎通で判定する
事前HEAD 1秒タイムアウトで起動中サーバを自動検出 → `ok` に格上げ。停止中のみ `localhost_server_down` として警告。ステータス遷移の曖昧さを排除。

## 実装パターン（再利用可能）

### A. ポータル健康カード3段構成
1. knowledge/ 件数バッジ（静的）
2. 🔗 リンクチェック サマリ（`link-check-results.json` を fetch）
3. 🩹 セルフヒール サマリ（`heal_log.json` を fetch、直近24h件数 + カテゴリ）

### B. link_checker.py の最小構成
- 全HTML走査: `root.rglob("*.html")` + 除外フィルタ
- relative: ファイル存在確認 + 類似候補 suggestion
- external: `--check-external` 時のみ HEAD検証
- localhost: デフォルトで1秒 HEAD検証 → ok / warning に自動振分
- 結果は `link-check-results.json` に保存（portal fetch用）

### C. 週次自動実行（Windows Task Scheduler）
```
schtasks /create /tn SecretaryLinkCheck ^
  /tr "C:\Users\kfuru\.secretary\health-monitor\run-link-check.bat" ^
  /sc WEEKLY /d MON /st 08:00 /f
```
- `.bat` ラッパは ASCII only（Shift_JIS解釈で em-dash 等が `'ry' is not recognized` 系エラーになる）

## 落とし穴

| 症状 | 原因 | 対処 |
|------|------|------|
| スキャナ結果が過剰 | worktree汚染 | `.claude/` 除外 |
| バッチが動かない | 日本語コメント（em-dash等） | コメントASCII化 |
| localhost全部warning | 実疎通未実施 | HEAD 1秒タイムアウト追加 |
| 別ページダッシュボードが見られない | 1クリックの分離 | ハブに埋め込み |

## 次の発展
- portalカードに「最終チェック経過時間」バッジ（cron稼働監視）
- `--check-external` を週次cronに加えて死んだGitHub Pages/CDNを検出
- heal_log.json のカテゴリ別トレンドをsparklineで表示
