---
title: Claude Code 会話 → 知識昇格パイプライン
created: 2026-04-24
updated: 2026-04-26
category: AI活用 / secretary運用
tags: [Claude Code, 知識昇格, パイプライン, JSONL, extract_claude_code]
level: published
source: Claude Code セッション（2026-04-24）
related: [[f-company-session-framework]] [[obsidian-notion-workflow]]
---

# Claude Code 会話 → 知識昇格パイプライン

## 背景・なぜ作ったか

Claude Codeとの会話（1ヶ月・163セッション）が財産として眠っていた。
会話は消えないがセッションをまたいで参照できない。
ローカルの `.claude/projects/C--Users-kfuru--secretary/*.jsonl` に全履歴が保存されていることを発見し、パーサーを実装した。

---

## 仕組み

```
~/.claude/projects/C--Users-kfuru--secretary/*.jsonl
        ↓ extract_claude_code.py（キーワードマッチ）
ai-exports/processed/claude_code_knowledge_YYYY-MM-DD.md
        ↓ ★昇格コメントを付ける
knowledge/ or denken-study/ にファイル化
        ↓
次回セッションでClaudeが参照できる知識になる
```

---

## スクリプト概要

**場所**: `ai-exports/extract_claude_code.py`

| オプション | 動作 |
|---|---|
| `py ai-exports/extract_claude_code.py` | 全セッションをスキャン |
| `--days 7` | 過去7日分のみ |
| `--show` | ファイル保存なし・一覧表示のみ |
| `--min-turns 5` | 最低ターン数指定（デフォルト3） |

**知識候補の判定基準**: 電験・計装・AI活用・マネジメント・設備管理のキーワードにマッチしたセッション

---

## ログの保存形式（JSONL）

```json
{"type":"user","message":{"role":"user","content":"質問内容"},"timestamp":"2026-03-30T..."}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"回答"}]},...}
```

---

## コマンド

| Claude Codeコマンド | 動作 |
|---|---|
| `CC知識スキャン` | 全セッションスキャン → Markdown生成 |
| `CC知識スキャン --days 7` | 過去7日分のみ |
| `CC知識スキャン --show` | 一覧表示のみ |

---

## 運用サイクル（推奨）

- **週1回**: `CC知識スキャン` を実行 → 候補Markdownを確認
- **その場昇格**: 会話中に「これ知識化して」→ 直接 `knowledge/` にファイル化
- **ダッシュボード確認**: `dashboard.html` の「CC 知識昇格タスク」カードで残件数を把握

---

## Stop Hook 自動commit

セッション終了時に知識ファイルの変更を自動でgit commitするhookを実装済み。

### 設計判断

- **hookファイルパス**: `C:/Users/kfuru/.claude/hooks/secretary-auto-commit.js`
- **登録先**: `C:/Users/kfuru/.claude/settings.json` → Stop hooks（3番目に登録）
- **対象ディレクトリ**: `knowledge/` `inbox/` `denken-study/` の変更のみをステージ
- **変更なし時の挙動**: commitをスキップ（空コミット防止済み、動作確認済み）

### commit message形式

```
auto: knowledge snapshot YYYY-MM-DD_HH:MM (N files)
```

例: `auto: knowledge snapshot 2026-04-22_09:00 (3 files)`
- ファイル数を含める（落合陽一提案を採用）
- 日時は実行時のローカルタイムスタンプ

### 既存hookとの棲み分けルール

| hook | 対象ファイル | 目的 |
|------|------------|------|
| `secretary-github-sync.js` | HTML5ファイルのみ（portal, dashboardなど） | GitHub Pages への同期 |
| `secretary-auto-commit.js` | 知識ファイルのみ（knowledge/ inbox/ denken-study/） | ローカル知識の自動スナップショット |

- 両hookは独立して動作。対象が重複しないため競合なし
- HTML5ファイルの知識化が必要な場合は手動commitで対応

---

## 実績

- 2026-04-24時点: 163セッション → 406件候補を抽出
- 内訳: 電験3種 約60% / AI活用 約20% / 電気計装 約10% / その他
