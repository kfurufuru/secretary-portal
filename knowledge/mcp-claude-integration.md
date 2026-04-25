---
title: "MCP — Claudeを実行AIに変える接続基盤"
category: "AI活用"
level: "review"
created: "2026-04-22"
last_reviewed: "2026-04-22"
understanding_score: 4
source: "実運用整理（2026-04-22）"
tags: ["MCP", "Claude", "自動化", "GitHub", "Notion", "Slack"]
related: ["knowledge/agentic-graphrag-architecture.md", "knowledge/terminal-shell-cli.md", "knowledge/portal-health-observability.md", "knowledge/top3-monday-api-key-401-error.md"]
---

# MCP — Claudeを実行AIに変える接続基盤

## TL;DR

MCPはAIが外部ツールやサービスを直接操作するための接続方式。「回答するAI」から「実務を実行するAI」への転換点。設計の本質は**何を・どの権限で・どう繋ぐか**。

---

## 主な用途

| 用途 | 具体例 |
|------|--------|
| 開発自動化 | Issue確認・修正・PR作成・CIログ確認 |
| 調査自動化 | Web操作・スクショ取得・競合調査 |
| 業務自動化 | Slack投稿・Notion更新・Gmail下書き |
| データ分析 | PostgreSQL / Supabase / Qdrant等 |
| AI強化 | Memory・Sequential Thinking・Brave Search・Fetch |

---

## 代表サーバー早見表

| 系統 | サーバー例 |
|------|-----------|
| 開発系 | GitHub, Playwright, Sentry, Semgrep, CircleCI |
| DB/インフラ系 | PostgreSQL, Supabase, Neo4j, Qdrant, AWS, Cloudflare |
| 生産性系 | Notion, Slack, Gmail, Jira, Grafana |
| ビジネス系 | Stripe, HubSpot, Firecrawl, Browserbase |
| AI拡張系 | Memory, Sequential Thinking, Brave Search, Fetch |

---

## 実務例（横展パターン）

- **進捗自動報告**: GitHub Issue進捗 → Slack自動通知（人手ゼロ）
- **手順書検索**: Notion内マニュアルをClaudeが検索・要約して回答
- **支払い照合**: HubSpot顧客とStripe支払い状況を自動突合

---

## 注意点（落とし穴）

1. **最小権限で運用** — 書き込み権限は必要最小限に絞る
2. **Read-onlyから始める** — まず読み取りで動作確認、書き込みは後
3. **APIキーは環境変数** — `.env` or OSの環境変数。ハードコード厳禁
4. **コスト監視** — 特にFetch系・検索系はトークン消費が大きい
5. **公開リポジトリへの漏洩注意** — 秘密情報をコードに含めない

---

## 選定・運用の5原則

1. 目的を明確化（何を自動化したいか）
2. 小さく始める（1ツール・Read-only）
3. 思考はプロンプト、実行はMCPに分離
4. エラー処理を決める（失敗時の代替動作）
5. ログ・コスト・認証情報を継続管理

---

## 実践メモ

- 現在 `.secretary` 環境でNotion・GitHub・Gmailが稼働中
- 自作MCPは「既存サーバーで足りない外部API」が対象。TypeScript/Python SDKで実装可能
- コスト増の主因はFetch系（Webアクセス）とDB系（大量データ取得）— ログで定期確認
