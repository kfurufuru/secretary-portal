---
title: 電験Wiki 理論・法規 再出題傾向ページ追加 引継ぎ
date: 2026-04-25
topic: denken-wiki-riron（理論）+ denken-wiki（法規）strategy/ 拡充
status: 理論Wiki完了・法規Wiki未着手
previous_handoff: inbox/handoff-2026-04-24-denken-wiki-expansion.md
---

# セッション（2026-04-25）の状況

## 実施済み

### 理論Wiki — `docs/strategy/retake-analysis-and-strategy.md` 追加 ✅
- リポジトリ: `C:\Users\kfuru\Projects\denken-wiki-riron\`
- URL（デプロイ後）: https://kfurufuru.github.io/denken-wiki-riron/strategy/retake-analysis-and-strategy/
- mkdocs.yml / strategy/index.md 更新済み
- git push 完了（2026-04-25 ジョブ実行中）

### 理論Wiki ファイル内容要点
1. ECEE公式出題方針（URL付き）
2. 完全一致率推移表（R5下期〜R7上下期）— **R7下期の数値は「要ブラウザ確認」と明記**
3. 分野別優先度マトリクス（直流/交流/三相★★★・電磁気/過渡★★・電子/計測★）
4. `!!! warning "古舘さん 重点箇所"` — 三相交流 相量→線量変換を最優先化
5. 最新10回リスト（R3上期〜R7下期、2026-04-25時点）
6. 周回数の目安（5.5ヶ月計画）

## ユーザーP1作業（次セッション前にユーザー自身が実施）

ブリュのブログをブラウザで確認し、以下の「要ブラウザ確認」数値を確定値に更新:

| 対象ファイル | 行番号目安 | 確認する数値 |
|------------|----------|------------|
| `denken-wiki-riron/docs/strategy/retake-analysis-and-strategy.md` | L44 | R7下期 理論：完全一致0%、類題83.3% |
| 同上 | L45 | R7上期 法規：84.6% |
| 同上 | L46 | R7下期 法規：類題30.8% |

ブリュのブログ URL: https://brionac-yu-yake.jp/denken3-trend-analysis/
（P2の法規Wikiでも同じ数値を使う。先にブラウザ確認してから P2 を着手すると効率的）

---

# P2: 法規Wiki strategy/ 拡充（未着手）

## 対象リポジトリ
- パス: `C:\Users\kfuru\Projects\denken-wiki\`
- URL: https://kfurufuru.github.io/denken-wiki/
- ブランチ: master

## 新規ファイル
`docs/strategy/reissue-patterns-and-regulations.md`

## 法規Wikiの既存 strategy/ 構成（2026-04-25時点）
```yaml
  - 攻略・直前対策:
    - strategy/index.md
    - 直前3日チェックリスト: strategy/last-3days.md
    - B問題戦略: strategy/b-problem.md
    - 引っかけパターン集: strategy/hikkkake-patterns.md
```
→ 理論Wikiと同構造。新ファイルを末尾に追加。

## コンテンツ構成（AI社員3者議論で決定済み）

```
# 再出題傾向と最適学習戦略（法規）

!!! info "読むタイミング"
    学習計画策定時（試験3〜6ヶ月前）。直前対策は直前3日チェックリストを使う。

## 1. 公式の出題方針
（ECEE公式URL + 法規の特殊性：サイバーセキュリティ・国際規格・レジリエンス・電力需給を明記）

## 2. 再出題傾向：完全一致率の推移（法規）
（数値表 + 「過去問暗記だけでは危険」な理由）
- R7上期: 完全一致84.6%（安定）
- R7下期: 類題含む30.8%（激減）→ 年度ブレが大きい

## 3. 法規の特性：過去問単独では危険
（法令改正リスク・電技解釈改正の具体例）

## 4. 法規の3本柱戦略
1. 最新10回（過去問）
2. 参考書・要点集（条文・技術基準の整理）
3. B問題計算（需要率・不等率・短絡・接地）

### B問題計算の重点リスト
| 計算タイプ | 頻度 | 重要度 |
|-----------|------|--------|
| 需要率・不等率・負荷率 | 毎回 | ★★★ |
| 短絡電流計算 | 高 | ★★★ |
| 接地抵抗計算 | 高 | ★★★ |
| 変圧器容量計算 | 中 | ★★☆ |

## 5. 効率的な学習範囲
（理論との違い：古い年度は法令改正リスクあり → 最新10回+参考書に絞る）

### まずやる：最新10回（2026-04-25時点）
（年度リスト：R3上期〜R7下期）

!!! warning "法規で古い年度に戻りすぎない"
    理論は物理法則なので古い年度も有効。
    法規は法令改正で不正解になる問題が存在する（特に平成年代）。
    最新10回を完璧に仕上げた後、15年分に広げる程度が上限。

## 6. 既存 strategy/ との使い分け
（読むタイミング別ガイド: 本ページ→3〜6ヶ月前 / B問題戦略→演習期 / 直前3日→試験直前）

## 参考情報
（URL一覧：ECEE公式・ブリュのブログ・せでぃあ・でんけんぱ）
```

## 調査済みURL（そのまま使用可）

| 用途 | URL | 状態 |
|------|-----|------|
| ECEE公式 過去問 | https://www.shiken.or.jp/chief/third/qa/ | 確認済み |
| R07問題作成方針PDF | https://www.shiken.or.jp/ecee-overview/news/upload/R07denkenpolicy_az.pdf | 確認済み |
| 再出題率分析（ブリュ） | https://brionac-yu-yake.jp/denken3-trend-analysis/ | URL有効・ブラウザ閲覧要 |
| 法規分析（各年度） | https://brionac-yu-yake.jp/reiwa7-h2-denken3-review/ | 要確認 |
| 15年分推奨 | https://cediablog.com/denken3-kakomon-15years/ | 確認済み |
| 10年分推奨 | https://denken-review.com/archives/10730 | 確認済み |

## 実装手順（次セッション）

1. このファイルを読む
2. **Haiku** でファイル構成確認（`docs/strategy/` + `mkdocs.yml`）
3. **Sonnet** でブリュブログの法規数値を最終確認（P1完了後の確定値を受け取る）
   - ただしP1がユーザー完了済みなら、確定値をこのファイルに書いておいてもらうとスムーズ
4. **Opus** で `reissue-patterns-and-regulations.md` 本体を作成
5. `mkdocs.yml` + `strategy/index.md` 更新
6. git commit & push

## 注意事項

- 法規Wikiは `master` ブランチ（理論Wikiは `main`）
- 引っかけパターン・B問題戦略との重複を避ける（B問題は既存 b-problem.md にリンクするだけ）
- 法令改正の警告（`!!! warning`）を必ず入れる
- 数値の出典は「ブリュのブログ（要ブラウザ確認）」で統一

---

引継ぎ先: `inbox/handoff-2026-04-25-denken-wiki-houkiron.md を読んで実装続行して`
