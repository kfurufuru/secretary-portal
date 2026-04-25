---
title: "Claude Code プレイブック — 全17スライドのエッセンス"
category: "AI活用"
level: "published"
created: "2026-04-25"
last_reviewed: "2026-04-25"
understanding_score: 4
source: "Claude Code Playbook 全17スライド（2026-04-25）"
tags: ["Claude Code", "Context Engineering", "Hooks", "Skills", "Task Diary", "TDD", "CI/CD", "トークン最適化"]
related: ["knowledge/mcp-claude-integration.md", "knowledge/claude-code-knowledge-pipeline.md", "knowledge/f-company-session-framework.md", "knowledge/top3-monday-api-key-401-error.md"]
---

# Claude Code プレイブック — 全17スライドのエッセンス

## TL;DR

Claude Codeの本質は「単発プロンプト」から「複利的コンテキスト設計」へのパラダイムシフト。CLAUDE.md + Hooks + Task Diary の3要素を組み合わせることで、使うたびに精度が上がる自律的システムになる。

---

## 1. パラダイムシフト：プロンプト → コンテキスト・エンジニアリング

| 従来 | 進化後 |
|------|--------|
| プロンプト・エンジニアリング | コンテキスト・エンジニアリング |
| 単発指示 | CLAUDE.md + Hooks + Task Diary |
| セッションごとにリセット | 複利的な知識蓄積 |

**核心**: AIへの指示を「上手く書く技術」から、「文脈を継続的に構造化する設計」に転換する。

---

## 2. 開発アプローチの分岐

| 状況 | アプローチ |
|------|-----------|
| ゴール明確 | Shift+Tab → Plan Mode → Auto-accept で一発実装 |
| 目標曖昧 | 使い捨てプロトタイプ → 観察 → 正式仕様定義 |

**落とし穴**: 目標が曖昧なまま Auto-accept すると、後戻りコストが爆増する。曖昧な段階では必ずプロトタイプ→仕様定義フェーズを踏む。

---

## 3. コンテキスト管理の3本柱

| 要素 | 役割 | コンテキスト消費 | 汎用性 |
|------|------|----------------|--------|
| CLAUDE.md | 社訓・プロジェクト全体の行動規範 | 常時（全文読み込み） | プロジェクト全体 |
| MCP | 会社が契約する汎用SaaS接続 | 接続中（常に注入） | 高 |
| Skills | 特定業務の専門マニュアル | 実行時のみ（段階的開示） | 低（特定ユースケース） |

**設計思想**: 常時読み込むものを最小化し（CLAUDE.md）、必要時だけ注入（Skills）で総コストを下げる。これが Progressive Disclosure の実装形態。

---

## 4. コマンドセンター9軸

Day1 Quick Wins: `/terminal-setup` / `/model(High)` / `/config(explanatory)`

| 軸 | 内容 |
|----|------|
| Effort | Low/Medium/High で思考深度を制御 |
| Plugins | マーケットプレイス経由の拡張 |
| MCPs | 外部リソースへの接続（→ [[mcp-claude-integration]]） |
| LSPs | 主要言語の型チェック・解析 |
| Skills | タスク自動化の定義（段階的開示） |
| Custom Agents | 専門特化AIの定義（`.claude/agents/` 配下） |
| Hooks | ライフサイクルへの決定論的介入（→ 項目5参照） |
| Status Lines | UI情報バーのパーソナライズ |
| Output Styles | 応答トーンの調整 |

---

## 5. Hooks 4タイプ — 決定論的介入

Hooksの本質: Claude の「判断」ではなく「確実な実行」を保証する仕組み。AIが気分で省略できない。

| タイプ | タイミング | 代表ユースケース |
|--------|-----------|----------------|
| SessionStart | セッション開始時 | 開発コンテキスト・特定データの自動読み込み |
| PreToolUse | ツール実行前 | `rm -rf` 等の危険コマンドブロック、RTKによる出力圧縮 |
| PostToolUse | ツール実行後 | Prettier 自動適用、Lint 強制実行 |
| Stop / SessionEnd | セッション終了時 | テスト強制、Task Diary への自動保存 |

---

## 6. サブエージェント設計 — Opponent Processor

**基本構成**:
- **Main Agent (Opus)**: 指示の受付と結果統合（コンテキストをクリーンに保つ）
- **Explore Agent (Haiku)**: 高速なコードベース検索（読み取り専用）
- **Code Review Agent**: `.claude/agents/` で定義する専用エージェント

**Opponent Processor（対立検証）**:
- 異なる視点・性格のサブエージェントに同じ課題を議論させる
- 単一視点では見落とすリスク・脆弱性を発見するための構造
- 本システムの「F カンパニー判断セッション（マンガー×ダリオ×羽生）」はこの実装例

---

## 7. 4層防御アーキテクチャ

| 層 | 内容 |
|----|------|
| 1 | プロンプトインジェクション検出 |
| 2 | 静的解析（PreToolUse）: `settings.json` の deny ルールで危険操作を検知 |
| 3 | OS レベル・サンドボックス（macOS: Seatbelt 等） |
| 4 | 人間の監視（deny > ask > allow のパーミッションシステム） |

**原則**: 外側の層は内側の層が破られた時のバックストップ。設計はインサイドアウト（deny から始めて必要な allow を開く）。

---

## 8. トークン3層コスト最適化

| 層 | ツール | 効果 |
|----|--------|------|
| Workflow層 | Skills / Plugins | AI の非効率なコード探索を防ぐ |
| Memory層 | Kizami / Task Diary | セッション間の知識を永続化。コンテキスト再構築コストをゼロに |
| I/O層 | RTK (Rust Token Killer) | Bash コマンド出力をリアルタイム圧縮 |

**RTK 実績数値**:
- `rtk read`: 16.7% 削減（907K tokens）
- `rtk find`: 53.9% 削減（790K tokens）
- `rtk curl`: 98.1% 削減（140K tokens）

---

## 9. TDD ワークフロー — 役割分担

| 担当 | 役割 |
|------|------|
| 人間 | ビジネス要件とアーキテクチャ決定、受け入れテストの設計 |
| Claude | テストコードの記述、実装コードの記述、テスト実行と自動イテレーション |

**Pro-Tip**: Claude Chrome 拡張や Playwright 連携で、UI テストが通るまで自動品質向上のループが回る。人間はテスト仕様を書くだけでよい。

---

## 10. Strangler Fig リファクタリング — 3ステップ

段階的リファクタリング手法。一括置換ではなく「新旧並走 → 徐々に切り替え」でリスクを最小化。

1. **影響範囲の事前分析**: プロジェクト全体を検索。依存関係と影響ファイルを一覧化
2. **新規インターフェースの定義と並列実装**: 既存コードはそのまま残し、新しい実装とテストを作成
3. **段階的切り替え**: 新しいコードへのルーティングを徐々に切り替え。安全確認後にレガシーを一掃

**落とし穴**: Step1 を省略すると「予期しない依存」が後から出現し、ロールバック不能になる。

---

## 11. CI/CD × GitHub Actions 自動化

```
Trigger  →  Analysis  →  Execution  →  Review/Merge
```

1. **Trigger**: PR 作成時や Issue コメントで `@claude` とメンション
2. **Analysis**: Claude Code Action が起動。CLAUDE.md のガイドラインを読み込む
3. **Execution**: 脆弱性スキャン・コード実装・バグ修正をランナー上で自律実行
4. **Review/Merge**: 修正内容を PR にプッシュ

**実務適用**: `@claude バグ修正して` を Issue コメントに書くだけで PR が飛んでくる運用が実現可能。

---

## 12. 非エンジニア向け業務自動化

### Cowork + Schedule（定期実行タスク）
- チャットで要件を伝え `/schedule` で定期実行
- ユースケース: ニュースの自動リサーチ、Excel マクロの自動生成、定型メールの一括処理

### Meta-Automation（自動化ツールの自動生成）
- ノーコードツールのワークフロー自体を Claude に記述させる
- ユースケース: Dify や n8n の YAML/DSL を自動生成

**本質**: コーディングではなく「何をしたいか」の記述だけで自動化が完成する段階になりつつある。

---

## 13. 統合：複利的エンジニアリング（The Synthesis）

3要素が揃って初めて「自律的・複利的なシステム」が完成する。

| 要素 | 働き |
|------|------|
| **Context Engineering** | CLAUDE.md と Skills がプロジェクトの暗黙知を形式知として定義 |
| **Hooks & Determinism** | 自動フォーマットやテスト強制が出力品質のブレを確実なものに固定 |
| **Task Diary & Memory** | セッション完了ごとに成功/失敗の学びを記録。次回以降のコンテキストに還元 |

> 「Claude Code は単なるアシスタントではない。使えば使うほど文脈を学習し精度が相互に強化され続ける自律的・複利的なシステムである。」

---

## 実践メモ（.secretary 環境への接続）

- CLAUDE.md が「Context Engineering」の実装体。今ある設計はプレイブックの模範例
- `.claude/skills/` 配下の各 Skill が「段階的開示」を実現している
- Stop Hook による知識自動保存は「Task Diary」と同等機能
- F カンパニーセッション（複数ペルソナ議論）は「Opponent Processor」パターンの実装
- RTK 相当のトークン圧縮は `mcp__token-optimizer__` 系ツールで対応可能

---

## 関連ナレッジ

- [[mcp-claude-integration]] — MCP の詳細設計と接続パターン
- [[claude-code-knowledge-pipeline]] — 会話履歴 → knowledge 昇格の自動化
- [[f-company-session-framework]] — Opponent Processor の実装例（F カンパニー）
