---
last_updated: 2026-05-03T19:27:36+09:00
purpose: "Claude マルチセッション編集ロック — 並列編集事故防止"
---

# 🔒 アクティブな編集セッション

> **このファイルの目的**：複数の Claude セッション or 手動編集が同時に走る場合、
> 「いま誰が何を触っているか」を一覧化し、衝突を防ぐ。
>
> **使い方**：
> - 編集前: `python claim_edit.py claim --target <file> --reason <text>` で宣言
> - 完了時: `python claim_edit.py release --target <file>` で解除
> - 確認:  `python claim_edit.py list`
> - 強制: 30分間 heartbeat 更新がないエントリは expire コマンドで自動削除可能
>
> **Obsidian で常時開いておくと、視覚的にも衝突が分かる**。

## 運用ルール（CLAUDE.md と同期）

1. **大型編集前は必ず claim**：単一HTMLアプリ全般、knowledge/ の長文、30分以上の編集予定は claim 必須
2. **claim 中は他セッションは触らない**：他セッションが claim しているファイルを編集する場合は必ずユーザーに確認
3. **完了時は即 release**：放置すると後続セッションがブロックされる
4. **pre-commit が自動チェック**：claim と衝突する commit はブロックされる（bypass: `--no-verify` だが非推奨）

## 衝突履歴

過去の事故記録 → `inbox/parallel-session-incident-2026-05-03.md`

## 現在のアクティブセッション

<!-- BEGIN_ACTIVE -->
<!-- END_ACTIVE -->

（このセクションは `claim_edit.py` が自動更新する。手動編集禁止）
