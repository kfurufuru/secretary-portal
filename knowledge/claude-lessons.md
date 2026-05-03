---
title: Claude Lessons — ミス→ルール蓄積ログ
level: published
tags: [claude-code, workflow, self-improvement]
related: ["knowledge/cc-playbook.md", "knowledge/claude-memory-management.md"]
---

# Claude Lessons

ユーザーからの訂正・フィードバックをミス→ルール化して蓄積する。
行動原則13に基づき、訂正を受けたら即記録する。

## フォーマット

```
## YYYY-MM-DD | [カテゴリ]
- ミス: 何をしたか
- ルール: 次回はどうするか
- 適用場面: どんな状況で発火するか
```

---

## 2026-05-03 | claim_edit.py 宣言漏れ（編集ロックルール違反）

### ミス
- denken-wiki/docs/articles/kijun/ 9件のmd編集（30分以上の作業）を `claim_edit.py claim` を打たずに開始した。
- 編集途中で 32.md に linter/別セッションによる modification が `system-reminder` として通知されていた（= 並列編集の明確な兆候）。**この時点で claim を打つべきだったが見過ごした**。
- 並行して PID-40432 が `denken-hoki-wiki.html` を claim 中だったことに気付かず、`inbox/active-edits.md` を作業開始時に確認していなかった。
- ユーザーから明示的な訂正：「記録するルールになっているだろう。確認しろ。再発防止実施。」「記録は重要な知見、今改造中というのを別のセッションに知らせるため。」

### ルール（次回必須）
1. **secretary / denken-wiki / その他依存リポジトリのファイル編集セッション開始時、最初の Edit/Write の前に必ず `python claim_edit.py list` を打つ → 並列セッションの有無を確認 → 自分の対象を `claim` する**
2. ファイル単体でも複数ファイル（ディレクトリ）でもtargetを指定して claim する。30分基準を待たない
3. `system-reminder` で「ファイルが modified された」通知を受けたら、即 `claim_edit.py list` を実行して並列セッションを確認
4. 完了時は必ず `release` を打つ。放置すると後続セッションが pre-commit hook でブロックされる
5. **CLAUDE.md #14d の active-edits hook を `.claude/settings.local.json` に登録すれば、UserPromptSubmit 時に自動通知される**（現状無効・有効化推奨）

### 適用場面
- `.secretary/` 配下の.md/.html を3件以上編集する場合
- `denken-wiki/` `denken-mailer/` 等の依存リポジトリで.md/.html/.py を3件以上編集する場合
- 単一ファイルでも30分以上の編集予定がある場合
- linter / 他セッションが触っている兆候を system-reminder で受け取った時点（タイミングを問わず）

### 関連
- CLAUDE.md #14c（claim 宣言ルール）
- CLAUDE.md #14d（hook自動通知・現状無効・要有効化）
- inbox/active-edits.md（claim 一覧・Obsidianで常時開いておくと視覚的衝突検知）
- inbox/parallel-session-incident-2026-05-03.md（過去衝突事故記録）

---

## 2026-04-30 | Wiki大型HTML編集ワークフロー（PDCA#1）

### トークン消費実測（今セッション推定）

| 操作 | 消費量推定 | 改善後 |
|------|-----------|--------|
| `preview_snapshot` 1回 | ~34,000 tokens（136K chars） | `wiki_verify.py` ~500 tokens |
| `preview_screenshot` タイムアウト×3 | ~3,000 tokens（無駄） | 不使用 |
| HTMLファイル全体Read | ~8,000 tokens | Grep+30行Read ~500 tokens |
| **合計削減可能量** | **~44,000 tokens/セッション** | **→ ~1,500 tokens** |

### ミス→ルール

**M1: preview_snapshot 多用**
- ミス: DOM確認に `preview_snapshot` を使った → 136K chars返却
- ルール: DOM確認は `python wiki_verify.py <page>` のみ。snapshot禁止
- 適用場面: HTML編集後の検証時は必ずwiki_verify.py

**M2: wiki_ai.py find にファイル全体を渡した**
- ミス: 「実務でどう活きる」でgrep抽出→127K tokens → Groq上限エラー
- ルール: `wiki_ai.py find` は複雑クエリ専用。単純パターンは `Grep` ツール直結
- 適用場面: 検索クエリが日本語1フレーズなら Grep → 「どのコンポーネントに追加すべきか」ならwiki_ai.py

**M3: Groqで汎用質問**
- ミス: 「3点をまとめて」などの汎用質問をGroqに投げた → 的外れな回答
- ルール: Groqは「このコードスニペット内の〇〇はどこ？」など具体的コード質問専用
- 適用場面: 抽象的質問はClaudeで直接回答、コード内検索はGroq

**M4: TOCテキスト抽出にregexを使った**
- ミス: `/^[§\d\.]+\s*/` で「実務」プレフィックスが取れなかった
- ルール: h-num除去は `cloneNode + querySelector('.h-num')?.remove()` が正解
- 適用場面: DOMのtextContent取得時、非数値プレフィックスがある場合

### 正しいワークフロー（確定版）

```
[Wiki編集フロー v2 — 2026-04-30確定]
1. Grep でパターン特定（行番号）
2. Read ±20行のみ
3. Edit 適用
4. python wiki_verify.py <page> で確認（2秒）
5. 複雑な探索のみ: python wiki_ai.py find "<英語KW>" <file>
```

---

## 2026-04-27 | Workflow設計

- ミス: Subagent戦略・Self-Improvement Loopの仕組みがCLAUDE.mdに未定義だった
- ルール: 「便利なものは取り込む」の判断基準 → 現行で網羅済みか確認→差分のみ取り込む
- 適用場面: 外部ガイドやベストプラクティスを参照した際
