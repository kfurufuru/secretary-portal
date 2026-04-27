---
title: "Agentic GraphRAG アーキテクチャ"
category: "AI活用"
level: "review"
created: "2026-04-22"
last_reviewed: "2026-04-22"
understanding_score: 3
source: "アーキテクチャ図レビュー（2026-04-22）"
tags: ["GraphRAG", "知識グラフ", "MCP", "ベクトル検索", "Claude Code", "MongoDB"]
related: ["knowledge/promote-py-auto-promote-access-log.md", "knowledge/claude-code-knowledge-pipeline.md", "knowledge/mcp-claude-integration.md", "knowledge/ai-agent-architecture.md"]
---

# Agentic GraphRAG アーキテクチャ

## TL;DR

URI/ノートをETLで取り込み、チャンク→グラフ抽出→埋め込みベクトル化してMongoDBに蓄積。FastMCPサーバー経由でClaude Code（ハーネス）がNL検索・取り込みツールを呼ぶ構成。**現状のMarkdownベース知識DBがGrep困難になる規模（500ファイル超）で検討価値が出る**。

---

## アーキテクチャ全体像

```
Data Pipeline         Data Warehouse    Memory Pipeline
URI/Notes → ETL → Documents → MongoDB → Clean → Chunking
                                              ↓
                                       Graph Extractor（OSS）
                                              ↓
                                       Normalization（Entity Resolution）
                                              ↓
                                       Embedding Model（OSS + Voyage AI）
                                              ↓
                              Unified Memory（MongoDB）← Knowledge Graph Objects
                                              ↓
                              MCP Server（FastMCP）← Tools（NL Query / Ingest等）
                                              ↓
                              Harness：Claude Code → Skills（assistant-memory等）
```

## 各コンポーネントの役割

| 番号 | コンポーネント | 役割 |
|------|--------------|------|
| 1-2 | ETL（Crawl/Personal Docs） | URI・ノートをドキュメント化 |
| 3 | Chunking | ドキュメントを意味単位で分割 |
| 4 | Graph Extractor | エンティティ・関係を三つ組（triplet）で抽出 |
| 5 | Normalization | 同一エンティティを名寄せ（Entity Resolution） |
| 6 | Embedding Model | チャンクをベクトル化（Voyage AI or OSS） |
| 7-8 | Knowledge Graph Objects | triplets + vectors + metadata をMongoDBへ |
| 9 | MCP Server（FastMCP） | ツール群をClaude Codeに公開 |
| 10 | Harness（Claude Code） | LLMとツールを統合するオーケストレーター |
| 11 | Skills | assistant-memory / assistant-learn |
| 12-13 | Tools | NL Query / Query Memory / Deep Search / Ingest URL・File・Conversation |

## 提供ツール群

- **NL Query Memory** — 自然言語で記憶を検索
- **Query Memory** — 構造化クエリ
- **Deep Search Memory** — グラフトラバーサル付き深層検索
- **Ingest URL / File / Conversation** — 新規データの取り込み

## 現状システムとの比較

| 項目 | 現状（.secretary） | GraphRAG構成 |
|------|-------------------|-------------|
| ストレージ | Markdownファイル + Obsidian | MongoDB |
| 検索 | Grep / Obsidian Dataview | ベクトル検索 + グラフトラバーサル |
| 昇格 | `promote.py`（ルールベース） | 自動チャンク + エンティティ解決 |
| 関係性表現 | `related:` frontmatter（手動） | Knowledge Graph（自動推定） |
| 構築コスト | ゼロ（既存） | MongoDB + 埋め込みモデル運用 |
| 横断検索 | Grep + 手動 | NL Query Memory |

## 導入検討トリガー

- knowledge/ が 500ファイルを超えてGrepが遅くなる
- 「トラブルA → 原因X → 対策B」のような**エンティティ間関係**を横断検索したい
- factory/trouble-log.md の事例が蓄積して自動解析したい

## 落とし穴

- **MongoDB運用コスト**：ローカル実行なら無料だが、クラウド化すると月額固定費が発生
- **Embedding モデル選択**：日本語性能はモデル依存。Voyage AI は英語特化、OSS代替は `multilingual-e5-large` 等を要検証
- **Entity Resolution精度**：同一エンティティ判定は難しく、ノイズが混入しやすい
- **現状で十分な可能性**：400ファイル以下・Grepで間に合う規模ではオーバーエンジニアリング

## 実践メモ

- 参照アーキテクチャとして保存。**今すぐ導入は不要**
- OSS実装例：`graphrag`（Microsoft）、`lightrag`、`neo4j-graphrag`
- FastMCP はPython製のMCPサーバーフレームワーク（Claude Code連携が容易）
- 将来的に `promote.py` のGraph化（エンティティ抽出）だけ先行実装も選択肢

---

*2026-04-22: アーキテクチャ図レビューから直接昇格*
