---
title: 電験Wiki 拡充タスク引継ぎ
date: 2026-04-23
topic: denken-wiki（法規/理論/電力）+ ei-wiki
status: 途中
---

# 前回セッション成果（2026-04-23）

## 完了
1. **電力Wiki `calc-patterns.md`** にパターン6追加
   - 変圧器計算（%インピーダンス・短絡電流・並列運転）
   - R08予測★★（2年空白・番外P2）警告ボックス
   - ファイル: `C:\Users\kfuru\Projects\denken-wiki-denryoku\docs\reference\calc-patterns.md`

2. **電力Wiki `by-field.md`** 問10セクション再構築（案3採用）
   - 旧「電力系統・需給運用（11問）」→ 新「送配電線路（問10枠・11問）」
   - 全11問のタイトル・形式を電験王3で照合し正題化
   - 内訳: 地中送電6／架空送電4／故障点標定1
   - R08予測note追記
   - ファイル: `C:\Users\kfuru\Projects\denken-wiki-denryoku\docs\kakomon\by-field.md` L253-281

3. **メモリ更新**
   - `project_denken_wiki.md`: 理論H18-H23完了反映、電力タスク完了マーク、ハブ再定義を新タスク追加

## 重大所見（次セッションで確認必須）
- 旧「電力系統・需給運用」セクションのタイトルはAI推測で入力されていた
- **同様の推測タイトルが他セクション・他Wikiにも存在する可能性あり**
- 電験王3 URL規則は確定:
  - R04〜R07上下期あり: `https://denken-ou.com/denryoku{科目}r{N}-{1|2}-{問番号}/`
  - R01〜R03上下期なし: `https://denken-ou.com/denryoku{科目}r{N}-{問番号}/`
- 科目プレフィックス: `denryoku`(電力)、`riron`(理論)、`houki`(法規)

# 未完了タスク

## P1: 電力Wiki `themes/denryoku-keitou.md` ハブの再定義
- **現状**: by-field.md から「電力系統・需給運用」セクションを削除したため、ハブページがリンク切れ状態の可能性
- **判断要**: 電力系統運用が実際に出題されている問番号（問17・18等？）を電験王3で調査 → ハブを立て直すか削除するか決める
- **参照**: `C:\Users\kfuru\Projects\denken-wiki-denryoku\docs\themes\denryoku-keitou.md` を読んで現状確認

## P2: 他セクション・他Wikiの推測タイトル監査（優先度中）
- **対象**: `denken-wiki-denryoku/docs/kakomon/by-field.md` の他セクションも電験王3で照合
- **対象**: `denken-wiki-riron/docs/kakomon/by-year.md`、`denken-wiki（法規）` 同様
- **方法**: 並列エージェントで年度別スポットチェック → 差分あれば修正

## P3: 理論Wiki v0.7 → v1.0 昇格
- **スコープ未定義**: 何を追加検証すれば v1.0 にできるかの基準が未決
- **判断要**: 法規・電力の v1.0 達成条件（公式検証済マーク・難易度補完・wave-analysis.md・strategy/ 等）と照らして不足を洗い出す

## P4: ei-wiki 業務マニュアル追加
- **スコープ未定義**: 残すべき追加トピック不明
- **参照**: `C:\Users\kfuru\Projects\ei-wiki\docs\guidelines\` で既存8ページ確認
- **判断要**: ユーザーに追加希望ジャンル（01-koatsu〜11-genai）を確認してから `ei-wiki-editor` スキル起動

# 実行手順（次セッション開始時）

1. このファイルを読む
2. P1から着手（影響範囲最小・ハブ整合性確保が優先）
3. P2は並列エージェントで効率化
4. P3・P4はユーザーにスコープ確認してから

# 参考資料
- メモリ: `C:\Users\kfuru\.claude\projects\C--Users-kfuru--secretary\memory\project_denken_wiki.md`
- 前回判断プロセス: 落合陽一（体系性・検証可能性）＋ひろゆき（工数効率）で案3（セクション改名＋正題化）を採用
