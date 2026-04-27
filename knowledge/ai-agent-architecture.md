---
title: "AIエージェント アーキテクチャ完全ガイド"
category: "AI活用"
level: "review"
created: "2026-04-28"
last_reviewed: "2026-04-28"
understanding_score: 4
source: "チートシート補足・実運用整理（2026-04-28）"
tags: ["エージェント", "アーキテクチャ", "LLM", "Memory", "MCP", "Make.com", "Claude Code", "自動化"]
related: ["knowledge/mcp-claude-integration.md", "knowledge/agentic-graphrag-architecture.md", "knowledge/claude-code-knowledge-pipeline.md", "knowledge/claude-memory-management.md"]
---

# AIエージェント アーキテクチャ完全ガイド

## TL;DR

LLM単体はブレインだが製品ではない。**Tools（実行）+ Memory（文脈）+ Backend（制御）+ Queue（非同期）の4層が揃って初めてエージェントになる**。設計で最も詰まるのはBackend（エラー処理）とMemory（何をどこに記憶するか）の2点。チャットボットとの本質的な違いは「ループが繰り返される」こと。

---

## コアコンポーネント 5層

### 1. LLM (The Brain)

- 推論・理解・生成を担う唯一の「知性」
- **単体では何もできない** — 実行力も永続記憶もない
- 代表: Claude (Anthropic), GPT-4o (OpenAI), Gemini (Google)
- **あなたの環境**: Claude Sonnet 4.6（日常）/ Opus 4.7（複雑推論・設計）

### 2. Tools (Action Layer)

- APIコール・DB操作・外部サービス実行を担う「手足」
- 「AIが回答する」→「AIが実行する」への転換点
- 設計原則: **1ツール1責任**（複合ツールはデバッグが指数関数的に困難になる）
- **あなたの環境**: MCPサーバー群（Obsidian・Notion・GitHub・Gmail・Calendar・Make.com・Google Calendar）

### 3. Memory (Context Layer)

チートシートの「短期/長期」は単純化しすぎ。実際は**4層**で設計する:

| 層 | 役割 | 揮発性 | 実装例 |
|----|------|--------|--------|
| **Working Memory** | 現在の会話・タスクの文脈 | セッション終了で消える | LLMのコンテキストウィンドウ |
| **Episodic Memory** | 過去の出来事・経緯 | 永続（時間軸で検索） | ai-conversations/ |
| **Semantic Memory** | 事実・知識・ドメイン情報 | 永続（内容で検索） | knowledge/ → 将来: ベクトルDB |
| **Procedural Memory** | やり方・スキル・ルール | 永続（システムプロンプト） | CLAUDE.md / skills/ |

**落とし穴**: Working Memoryの容量上限（Claude: 約200kトークン）を超えると古い文脈が無音で消える。重要情報はEpisodic/SemanticへオフロードするHookが必要。

**あなたの環境でのマッピング**:

| メモリ層 | 実装 |
|---------|------|
| Working Memory | Claude Codeのコンテキストウィンドウ |
| Episodic Memory | ai-conversations/ + Stop Hookで自動保存 |
| Semantic Memory | knowledge/（Grep検索）→ 500ファイル超でGraphRAG移行 |
| Procedural Memory | CLAUDE.md + skills/ + .claude/settings.json |

### 4. Backend (Control Layer)

チートシートで最も説明が薄い層。**実際のエンジニアリングの9割はここで発生する**。

#### エラー処理の3パターン（先に設計しないと本番で詰まる）

```
① リトライ (Retry with Exponential Backoff)
   対象: 一時的な障害（API timeout / rate limit / 一過性の500エラー）
   方法: 指数バックオフ（1s → 2s → 4s → 8s）
   打ち切り: 最大3回。それ以上はフォールバックへ

② フォールバック (Fallback)
   対象: ツール失敗・モデル応答不良・スキーマ不一致
   方法: 代替ツール・軽量モデルへ切り替え
   例: Opus呼び出し失敗 → Sonnetで再試行 / MCP接続失敗 → 手動フォールバック

③ ヒューマンハンドオフ (Human Handoff)
   対象: 確信度<70% / 高リスク操作（削除・送信・決済）/ ループ検出
   方法: 人間に確認を求めてブロック
   あなたの環境: Claude Codeの「y/n確認プロンプト」+ CLAUDE.md「信頼度チェック」
```

#### バリデーション設計

- **ツール呼び出し前**: 入力スキーマ検証（型・必須フィールド・値域チェック）
- **ツール呼び出し後**: 出力の事実確認（エージェントによる自己検証ステップ）
- **ループ検出**: 同一ツールを5回以上連続呼び出しで強制停止→ヒューマンハンドオフ

**あなたの環境**: .claude/settings.json のhooks + CLAUDE.md「信頼度チェック（≥90%/70-89%/<70%の3段階）」がBackend制御に相当。

### 5. Queue (Async Layer)

**非同期Queueが必要になる条件（1つでも当てはまれば必要）**:

- 処理時間 > 10秒（ユーザーをブロックする）
- 外部API依存（障害時にリクエストを保留したい）
- 並列タスク（複数エージェントを協調させる）

**あなたの環境**:

| Queue相当 | 用途 |
|----------|------|
| Make.com Webhookシナリオ | 非同期ワークフロー実行 |
| CronCreate / scheduled-tasks | 定時実行Queue |
| Claude Codeサブエージェント並列実行 | 軽量マルチエージェントQueue |

---

## 実際のフロー（8ステップ詳細）

```
User → Understand Intent → Think (Reasoning) → Decide Next Action
     → Call Tool (if needed) → Fetch Memory (Context)
     → Process Result → Respond to User → [ループ]
```

**チャットボットとの本質的な違い**: このループが繰り返されるのがエージェント。1往復で終わるのはチャットボット。

**ループ終了の判定**（チートシートにない重要設計ポイント）:

- 終了条件を明示的に設計しないと**無限ループ → コスト爆発**
- 最大ループ回数の上限を必ず設定（推奨: 10〜20回）
- 各ループで「ゴールに近づいているか」を評価するサブチェックを入れる
- タスク完了の判定基準を事前に定義する（曖昧な完了条件はループを長引かせる）

---

## プロダクションスタック vs あなたの現在の環境

| 役割 | プロダクション標準 | あなたの環境（現在） | スケールアップ候補 |
|------|-----------------|------------------|----------------|
| LLM/Brain | OpenAI / Anthropic | Claude Sonnet/Opus | ← 現状最適 |
| Engine | FastAPI / Node.js | Make.com + Claude Code hooks | FastAPI（複雑化時） |
| Memory | Pinecone / Chroma | knowledge/（Markdownファイル） | GraphRAG（500ファイル超） |
| Buffer | Redis / Kafka | Make.com Webhook Queue | Redis（遅延問題発生時） |
| Orchestration | LangChain / LlamaIndex | CLAUDE.md + skills/ | LangGraph（マルチエージェント化時） |

> **現状評価**: 現在の.secretaryシステムはプロダクションスタックの**機能等価な簡易版として動作している**。knowledge/のMarkdownファイルDB → ベクトルDB移行は500ファイル到達時まで不要。Make.com = Redis/Kafka相当として十分機能する。

---

## よくある失敗パターン（チートシート補足）

| 失敗パターン | 根本原因 | 対策 |
|-------------|---------|------|
| 「LLMが全部やってくれる」 | Tools層の設計欠如 | MCP/API接続を先に設計する |
| Memory層なし | 毎回コンテキストゼロからスタート | Stop Hookで自動保存を仕込む |
| ツール統合なし | LLMが外界に出られない | 1ツール1MCPサーバーから始める |
| システム設計なし | Backend無設計で本番投入 | エラー処理3パターンを事前に決める |
| **ループ制御なし** | 終了条件の未定義 | 最大回数 + 達成判定ロジックを設計 |
| **Memory過負荷** | 全情報をWorking Memoryに詰め込む | 4層分類 + 自動オフロードHookを設計 |
| **1ツール多責任** | デバッグのために後から分割が困難 | 設計段階で1ツール1責任を徹底 |

---

## ゴールデンルール（拡張版）

> **LLM ≠ プロダクト / システム = プロダクト**

LLMは部品の1つ。5層が協調して初めて製品になる。

| 設計原則 | 詳細 |
|---------|------|
| Memory設計から始める | 何を記憶するかが設計全体の核心 |
| エラー処理は3パターンを先に決める | 後回しにすると本番で詰まる |
| Queueは「10秒ルール」で判断 | 処理時間が閾値を超えたら非同期化 |
| ツールは1責任1ツール | 複合ツールはデバッグの地獄への入口 |
| ループには必ず終了条件 | 無限ループはコスト爆発の直接原因 |
| バリデーションはシステム境界のみ | 内部コードを信頼する。外部入力のみ検証 |

---

## 設計チェックリスト（新規エージェント構築時）

```
[ ] LLM: モデル選定完了（コスト vs 精度 vs レイテンシのトレードオフ確認）
[ ] Tools: 必要なMCPサーバー/APIをリストアップ。1ツール1責任で分割
[ ] Memory: 4層（Working/Episodic/Semantic/Procedural）それぞれの内容を決定
[ ] Backend: エラー処理3パターン（リトライ/フォールバック/ハンドオフ）の設計完了
[ ] Queue: 処理時間 > 10秒のタスクを特定し非同期化
[ ] ループ制御: 最大回数（推奨10〜20回）と終了条件を定義
[ ] コスト試算: 月あたりAPIコール数 × 平均トークン数の見積もり完了
[ ] ヒューマンハンドオフ: 高リスク操作の一覧と確認条件を定義
```

---

## 接続先

- [[knowledge/mcp-claude-integration]] — Tools層: MCPによる実行層の実装詳細
- [[knowledge/agentic-graphrag-architecture]] — Semantic Memory → GraphRAGへの進化パス
- [[knowledge/claude-memory-management]] — Claude Codeのメモリ管理実装
- [[knowledge/claude-code-knowledge-pipeline]] — あなたの現在のMemoryシステム（.secretary）実装
