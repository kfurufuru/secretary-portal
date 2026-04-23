---
title: 電験Wiki 拡充タスク引継ぎ（第2版）
date: 2026-04-24
topic: denken-wiki（法規/理論/電力）+ ei-wiki
status: P1着手直後に中断
previous_handoff: inbox/handoff-2026-04-23-denken-wiki-expansion.md
---

# 今回セッション（2026-04-24）の状況

## 実施済
- `inbox/handoff-2026-04-23-denken-wiki-expansion.md` を読了
- P1着手のため `denken-wiki-denryoku/docs/themes/denryoku-keitou.md` を全文Read
  - **重要発見**: ハブページの「出題実績」テーブル（L248-262）は全11問が「問10」として記録されている
  - 前回セッションで by-field.md の「問10枠」は**送配電線路**に改名済み
  - → **矛盾発生**: ハブ `denryoku-keitou.md` の出題実績が「問10＝電力系統」と主張しているが、by-field.md では「問10＝送配電線路」になっている
  - どちらが正しいかは電験王3で再照合が必要

## 未実施（中断箇所）
- ハブ `denryoku-keitou.md` の改修判断
- 電験王3での出題実績再照合

# 優先度再整理（前回P1-P4を継承）

## P1: 電力Wiki `themes/denryoku-keitou.md` ハブ整合性確保 【最優先】
### 検証必要事項
1. **電力系統・需給運用は実際どの問番号で出題されているか**
   - ハブ出題実績は全て「問10」と記載 → by-field.md では問10は送配電線路 → 矛盾
   - 電験王3で R01〜R07 全年度の「電力系統・需給運用・系統連系・揚水」関連問題の問番号を確認
2. **判断選択肢**
   - (A) 出題実績テーブルを正しい問番号に修正 → ハブ維持
   - (B) 電力系統テーマは問17/18等に集約されている → by-field.md の該当セクション新設＋ハブリンク調整
   - (C) 単独問として出題されていない → ハブを横断解説として残す（by-field リンク削除）

### 電験王3 URL規則（前回セッションで確定済）
- R04〜R07（上下期あり）: `https://denken-ou.com/denryoku-r{N}-{1|2}-{問番号}/`
- R01〜R03（上下期なし）: `https://denken-ou.com/denryoku-r{N}-{問番号}/`
- 科目プレフィックス: `denryoku`(電力)、`riron`(理論)、`houki`(法規)

## P2: 他セクション・他Wikiの推測タイトル監査
- 前回と同じ。並列エージェント活用推奨

## P3: 理論Wiki v0.7 → v1.0 昇格
- スコープ未定義（ユーザー確認必要）

## P4: ei-wiki 業務マニュアル追加
- スコープ未定義（ユーザー確認必要）

# 実行手順（次セッション）

1. このファイルを読む
2. P1の検証1（電験王3で問番号確認）を並列WebFetchで実施
3. 判断選択肢A/B/Cから選択 → ユーザー承認後に実装
4. 完了後、メモリ `project_denken_wiki.md` を更新

# 参考資料
- 前回引継ぎ: `inbox/handoff-2026-04-23-denken-wiki-expansion.md`
- メモリ: `C:\Users\kfuru\.claude\projects\C--Users-kfuru--secretary\memory\project_denken_wiki.md`
- 対象ハブ: `C:\Users\kfuru\Projects\denken-wiki-denryoku\docs\themes\denryoku-keitou.md`
- 対象by-field: `C:\Users\kfuru\Projects\denken-wiki-denryoku\docs\kakomon\by-field.md`
