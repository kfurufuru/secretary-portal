---
description: コンテキスト効率化ルール。トークン節約・Progressive Disclosure・信頼度チェックのガイドライン
---

# コンテキスト効率化ルール

## 3層トークン原則

| 種別 | ロードタイミング | 例 |
|------|----------------|-----|
| 常時必要 | CLAUDE.md / rules/ に記述 | 行動原則・禁止ルール・報告書スタイル |
| コマンド時 | コマンド内で Read | commands-reference.md |
| オンデマンド | 要求時のみ Read | context/*.md・knowledge/・web-ui-style.md |

## Progressive Disclosure

- ファイル参照は Read してから使う（内容を会話に貼らない）
- `commands-reference.md` は「ヘルプ」コマンド時のみ Read（常時展開しない）
- `web-ui-style.md` は `.claude/refs/web-ui-style.md` に移動済み（UI 作成コマンド（「[名前] 作って」）時のみ Read）
- 1ファイル500行超 → 分割して Read 参照に切り替える

## 信頼度チェック（実装前に必ず自己評価）

| 確信度 | アクション |
|--------|-----------|
| ≥90% | 即実行 |
| 70〜89% | 代替案を先に提示してから実行 |
| <70% | 質問して確認 |

**ROI**: 100トークンの確認で最大50,000トークンの誤方向作業を防ぐ

## Lost-in-Middle 対策

- 絶対ルールは CLAUDE.md 冒頭か末尾に置く（中盤は認識精度低下）
- 重要な制約ほど先頭に

## 検索戦略（優先順位厳守）

| 局面 | 正解ツール | 禁止 |
|------|-----------|------|
| ファイル在否・参照箇所特定 | `Grep output_mode:"files_with_matches"` | Python subprocess |
| 特定行の内容確認 | `Grep output_mode:"content" head_limit:20` | grep/rg Bash |
| 複数ファイル横断集計 | Python `<<'PYEOF'` heredoc形式のみ | ワンライナー禁止（Windows+日本語でエスケープ地雷） |
| 大ファイル構造把握 | `Read offset:N limit:50` で分割 | 全読み禁止（1000行超） |
| ディレクトリ探索 | `Glob path:"直下ディレクトリ"` で範囲限定 | worktreeを含む広範囲Glob |

**worktree除外**: Glob/検索時は `.claude/worktrees` を含まないよう `path` を限定する。

## 編集単位最適化（ターン数削減）

- **同一ファイルの複数箇所変更は1回のEditにまとめる**（old_string を大きく取って一括置換）
- 小さなEditを連打しない。ターン数 ∝ トークン消費
- Edit範囲の目安：変更が2箇所以上あるなら、前後の共通ブロックを含めて1回でカバーする

## Tool Output 上限意識

- 🔴重コマンド後はコンパクション提案
- Tool Outputs はコンテキストの最大83.9%を消費し得る
- 重いエージェント実行後は新セッション推奨

## Reflexion（知識代謝）

- 🔴重コマンド後、または15往復ごとに気づきを knowledge/ か digital-twin/ へ昇格提案
- 重要な成果物は完成後に「3つの弱点を探す」を実行してから提出
