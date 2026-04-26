---
name: claude-code-tips-collector
description: Claude Code活用ネタを毎日自動収集してHTMLダッシュボードに保存するスキル（Exa REST API版）
triggers: ["Claude Codeネタ収集", "tips収集", "Claude Code Tips 自動収集"]
dependencies: []
---

# Claude Code Tips 自動収集スキル（REST API版）

## 概要

Claude Codeに関する最新情報・テクニック・活用事例を3つの検索クエリから自動収集し、JSONデータストアで重複管理したうえでHTMLダッシュボードに反映。

**目的**: Claude Codeの実装・運用最適化ネタを常にストックし、プロジェクト内で横展開可能な状態を維持

> **注記**: Notionへの保存はローカル実行時のみMCP使用。リモート実行・スケジュール実行時はスキップ。

---

## APIキー

```
EXA_API_KEY=ede99c31-054c-4e55-939b-3f6ca0f2cf83
```

---

## 実行手順

### Phase 1: Web検索（Exa REST API）

**エンドポイント**: `https://api.exa.ai/search`

**3クエリを並列 fetch**（各最大10件 = 合計最大30件）

#### クエリ1: 最新テクニック
```bash
curl -s -X POST https://api.exa.ai/search \
  -H "Content-Type: application/json" \
  -H "x-api-key: ede99c31-054c-4e55-939b-3f6ca0f2cf83" \
  -d '{
    "query": "Claude Code innovative techniques 2026",
    "numResults": 10,
    "type": "news",
    "contents": {"summary": {"query": "Claude Code tips techniques"}}
  }'
```

#### クエリ2: Hooks・MCP・自動化
```bash
curl -s -X POST https://api.exa.ai/search \
  -H "Content-Type: application/json" \
  -H "x-api-key: ede99c31-054c-4e55-939b-3f6ca0f2cf83" \
  -d '{
    "query": "Claude Code hooks MCP autonomous workflow",
    "numResults": 10,
    "type": "news",
    "contents": {"summary": {"query": "Claude Code automation hooks MCP"}}
  }'
```

#### クエリ3: 生産性・開発フロー
```bash
curl -s -X POST https://api.exa.ai/search \
  -H "Content-Type: application/json" \
  -H "x-api-key: ede99c31-054c-4e55-939b-3f6ca0f2cf83" \
  -d '{
    "query": "Claude Code productivity workflow developer tips",
    "numResults": 10,
    "type": "web",
    "contents": {"summary": {"query": "Claude Code productivity"}}
  }'
```

**抽出データ（各結果から）**:
```json
{
  "url": "https://...",
  "title": "記事タイトル",
  "description": "summary.summaryまたはsnippet",
  "published_at": "2026-04-26T..." 
}
```

> `published_at` が null の場合は今日の日付（YYYY-MM-DD）を使用。

---

### Phase 2: 重複除外（JSONデータストア）

**データストア**: `C:\Users\kfuru\.secretary\ai-news\claude-code-tips-data.json`

**スキーマ**:
```json
{
  "last_updated": "YYYY-MM-DD",
  "entries": [
    {
      "url": "https://...",
      "url_normalized": "https://...",
      "title": "記事タイトル",
      "description": "説明",
      "published_at": "YYYY-MM-DD",
      "collected_at": "YYYY-MM-DD"
    }
  ]
}
```

**重複判定ロジック**:
```
既存URLリスト = entries[].url_normalized
url_normalized = url.split('?')[0].rstrip('/')

新着候補のうち url_normalized が既存リストに未登録のもの = 新着
```

- URLが一致しない場合はタイトルで2次判定（完全一致のみ）
- 新着エントリを `entries` に追加して JSON を上書き保存
- `last_updated` を今日の日付に更新

---

### Phase 3: HTMLダッシュボード更新

**出力ファイル**: `C:\Users\kfuru\.secretary\ai-news\claude-code-tips.html`

**データソース**: `claude-code-tips-data.json` の `entries`（`collected_at` 降順、最新30件）

**HTML生成**（1ファイル完結）:

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude Code Tips - AI News</title>
    <style>
        :root {
            --font-base: 'Inter', 'Noto Sans JP', sans-serif;
            --fs-h1: 2rem; --fs-body: 0.95rem; --fs-sm: 0.85rem;
            --sp-4: 16px; --sp-6: 24px; --sp-8: 32px;
            --radius-md: 12px; --transition: 0.2s ease;
        }
        body {
            font-family: var(--font-base);
            line-height: 1.6;
            color: #1a1a1a;
            background: #f0f2f5;
            padding: var(--sp-8);
            margin: 0;
        }
        .container { max-width: 1100px; margin: 0 auto; }
        h1 { font-size: var(--fs-h1); margin-bottom: var(--sp-6); color: #111; }
        .stats { font-size: var(--fs-sm); color: #666; margin-bottom: var(--sp-6); }
        .tips-grid {
            display: grid;
            gap: var(--sp-6);
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        }
        .tip-card {
            background: white;
            border-radius: var(--radius-md);
            padding: var(--sp-4);
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform var(--transition), box-shadow var(--transition);
            display: flex;
            flex-direction: column;
        }
        .tip-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .tip-title { font-weight: 700; margin-bottom: 8px; font-size: 0.95rem; }
        .tip-desc {
            font-size: 0.88rem;
            color: #555;
            margin-bottom: 12px;
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .tip-meta {
            font-size: 0.78rem;
            color: #999;
            border-top: 1px solid #f0f0f0;
            padding-top: 8px;
        }
        .tip-link {
            color: #0066cc;
            text-decoration: none;
            word-break: break-all;
            font-size: 0.78rem;
        }
        .tip-link:hover { text-decoration: underline; }
        .updated-at {
            text-align: center;
            color: #bbb;
            font-size: var(--fs-sm);
            margin-top: var(--sp-8);
        }
        @media (max-width: 768px) {
            body { padding: var(--sp-4); }
            .tips-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Claude Code Tips & News</h1>
        <div class="stats">{count}件 | 最終更新: {updated_at}</div>
        <div class="tips-grid">
            {cards}
        </div>
        <div class="updated-at">Generated by claude-code-tips-collector</div>
    </div>
</body>
</html>
```

**カードテンプレート（1件ずつ）**:
```html
<div class="tip-card">
    <div class="tip-title">{title}</div>
    <div class="tip-desc">{description}</div>
    <div class="tip-meta">
        <a href="{url}" class="tip-link" target="_blank" rel="noopener">{url_display}</a>
        <br>公開: {published_at} | 収集: {collected_at}
    </div>
</div>
```

> `url_display` = URLの最初の60文字（超える場合は `...` 付加）

---

### Phase 4: Notion保存（ローカル実行時のみ）

> **リモート実行・スケジュール実行時はこのPhaseをスキップ**。ローカルでMCPが利用可能な場合のみ実行。

**ツール**: `mcp__10ecf44d-862f-43c1-affd-e1f1bce1dee2__notion-create-pages`

**保存先データソース**: `c684e016-983a-49af-a74b-06fe49416c5a`

**対象**: Phase 2で新着と判定されたエントリのみ

```json
{
  "parent": {"data_source_id": "c684e016-983a-49af-a74b-06fe49416c5a"},
  "pages": [{
    "properties": {
      "Name": "{title}",
      "URL": "{url}",
      "説明": "{description}",
      "カテゴリ": "AI活用",
      "AIツール": "Claude",
      "ステータス": "📥 Inbox",
      "作成日": "{published_at}"
    }
  }]
}
```

---

## 実行フロー（Claude Codeが行う手順）

1. **Phase 1**: `WebFetch` または Bash の `curl` で3クエリを並列実行
2. **Phase 2**: `claude-code-tips-data.json` を Read → 重複除外 → Write で更新
3. **Phase 3**: `claude-code-tips.html` を Write で上書き
4. **Phase 4**: MCPが使用可能な場合のみ Notion に保存
5. **ログ出力**: 新着件数・スキップ件数・HTML更新結果をコンソールに出力

---

## エラーハンドリング

| ケース | 対応 |
|-------|------|
| Exa API 失敗 | エラーログ出力・既存HTML保持・JSONは更新しない |
| 新着なし | `"新着なし"` をログ出力・HTML更新スキップ |
| HTMLファイル未存在 | `ai-news/` ディレクトリ確認後、新規生成 |
| JSON破損 | 空の初期スキーマ `{"last_updated":"","entries":[]}` で初期化 |

---

## 実行後

```bash
git add ai-news/claude-code-tips-data.json ai-news/claude-code-tips.html
git commit -m "auto: Claude Code tips update $(date +%Y-%m-%d)"
git push
```

---

## 参考

- Exa API ドキュメント: https://docs.exa.ai/reference/search
- データストア: `C:\Users\kfuru\.secretary\ai-news\claude-code-tips-data.json`
- HTMLダッシュボード: `C:\Users\kfuru\.secretary\ai-news\claude-code-tips.html`
