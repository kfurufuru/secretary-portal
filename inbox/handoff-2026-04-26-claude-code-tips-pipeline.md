---
title: 引き継ぎ：Claude Code活用ネタ 自動収集パイプライン実装
date: 2026-04-26
status: 実装待ち
phase: フェーズ1
---

# 実装続行して

## やること（フェーズ1）

毎日02:00に自動実行するスケジュールエージェントを構築する。

### 処理フロー
1. **Exa検索**（3クエリ固定）
   - `Claude Code innovative techniques 2026`
   - `Claude Code hooks MCP autonomous`
   - `Claude Code productivity workflow`
2. **重複除去**：Notion「🤖 AI知識インボックス」DB を過去30日クエリ → URL・タイトル一致は除外
3. **Notion保存**：新着のみ AI知識インボックスに追加
   - カテゴリ: `AI活用` / AIツール: `Claude` / ステータス: `📥 Inbox`
4. **HTML更新**：`ai-news/claude-code-tips.html` を書き換え（最新30件を表示）
5. **自動push**：PostToolUse hookが既に設定済み → HTML書くだけで kfurufuru.github.io に自動反映

## 既設インフラ（活用する）

| リソース | 場所 | 用途 |
|---|---|---|
| Notion DB | `🤖 AI知識インボックス`（ID: 223b37de-41c7-4f08-abfd-5aef35b7e5c4） | ネタ保存先 |
| データソース | `collection://c684e016-983a-49af-a74b-06fe49416c5a` | Notionへの書き込みに使用 |
| HTML格納先 | `.secretary/ai-news/claude-code-tips.html` | 新規作成 |
| 自動push | PostToolUse hook（既設） | HTML編集→GitHub Pages自動反映 |
| 既存参考HTML | `.secretary/ai-news/claude-code-non-engineer-report.html` | デザイン参考 |

## スケジュール設定

- 毎日 02:00 実行
- `/schedule` スキルまたは `mcp__scheduled-tasks__create_scheduled_task` を使用

## 実装すべきもの

### 1. スキルファイル
`.secretary/.claude/skills/claude-code-tips-collector/SKILL.md`

内容：
- Exa MCPで3クエリ実行
- Notion DBから過去30日の「Claude」タグエントリのURLリストを取得
- 重複除去して新着のみ抽出
- Notion AI知識インボックスに保存（notion-create-pages）
- ai-news/claude-code-tips.html を生成・更新

### 2. HTMLファイル
`ai-news/claude-code-tips.html`

要件：
- web-ui-style.md の `cyber` テーマ（Slate Frost パレット）
- 1ファイル完結（HTML + CSS + JS）
- カード形式で記事一覧（タイトル・要約・ソース・日付）
- 「実装したい」ボタン → Notionのステータスを更新（将来拡張）
- portal-v2.html からリンクを追加

### 3. スケジュール登録
毎日02:00に上記スキルを実行するスケジュールタスク

## AI社員議論での結論

- **フェーズ1**: Exa単独で開始（X・YouTubeは安定後に追加）
- **クエリ**: 固定クエリで1ヶ月運用→その後自己進化ループへ
- **継続性担保**: 週次TOP5を朝刊ブリーフィングに統合（後続タスク）

## フェーズ2以降（今回は実装しない）

- Xリサーチ追加（WebSearch: site:x.com）
- YouTube transcript MCP追加
- クエリ自己進化ループ（前日ネタ→キーワード抽出→翌日クエリ）
- 週次TOP5を朝刊ブリーフィングに統合

## Exa APIキー

`ede99c31-054c-4e55-939b-3f6ca0f2cf83`（Notion 🔐 重要情報・APIキー管理にも保存済み）

Exa MCPはすでに `claude mcp add` 済み。次回セッションから `mcp__exa__*` ツールが使える。
