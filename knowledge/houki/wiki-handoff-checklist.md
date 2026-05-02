---
title: "Wiki条文Handoff作成チェックリスト（5条品質化シリーズ）"
category: "電験3種"
level: "published"
created: "2026-05-02"
last_reviewed: "2026-05-02"
understanding_score: 4
source: "inbox/handoff-2026-05-02-kijun-7.md 実装で発覚した実データ食い違いの再発防止"
tags: ["denken-wiki", "handoff", "電技基準", "電技解釈", "kakomon", "法規"]
related: ["knowledge/houki/denken-wiki-versioning.md"]
---

# Wiki条文Handoff作成チェックリスト

## TL;DR

denken-wikiの条文ページ「5条品質化Handoff」を作成する際の必須チェック項目。**handoff指示の数値・条番号は鵜呑みにせず、kakomon.ymlで実証してから書く**。これを怠ると pre-commit hook で止まる + 実装側で記憶ベースの誤データを書いてしまう。

## 背景：今回発覚した3つの食い違い

| 項目 | handoff記載 | 実データ（kakomon.yml/index.md） | 結果 |
|------|------------|-----------------------------|------|
| 第7条出題頻度 | 2〜3回/14年 ★★★☆☆ | 1件/14年 ★☆☆☆☆ | pre-commit hook で commit拒否 |
| 第7条過去問実績 | H25頃/H29/R03（記憶） | H23問4のみ | 誤データのまま push しかけた |
| 解釈条番号「電線の接続法」 | §12（kakomon.yml由来） | §6（kaishaku/index.md） | 2013年改正の旧/新条番号食い違い |

## Handoff作成前の必須チェック（5項目）

```
1. [ ] kakomon.ymlでその条文の実出題件数を確認 → 出題頻度★を確定
2. [ ] kakomon.ymlの該当エントリ（year/num/topic/article）を過去問実績の元データに使う
3. [ ] 解釈条番号は kaishaku/index.md と kakomon.yml で必ず両方確認 → 食い違い時は[要確認]併記
4. [ ] 条文原文は eGov 未確認なら必ず「[要確認: e-Gov公式の本文をここに転記]」プレースホルダーで残す
5. [ ] handoff末尾に「制約」を書く: ①条文原文を独自に書かない ②[要確認]フラグ付き ③§記号禁止 ④SVGは<div>で囲む
```

## kakomon.yml 確認コマンド（即実行可）

```python
import yaml
d = yaml.safe_load(open('docs/_data/kakomon.yml', encoding='utf-8'))
hits = [p for p in d['problems'] if '省令§N' in str(p.get('article',''))]  # N=対象条文番号
print(f'出題件数: {len(hits)}')
for h in hits: print(h)
```

## ★数の対応表（pre-commit hook と同じ閾値）

| 件数 | ★表記 | 表記例 |
|------|-------|--------|
| 0件 | ★☆☆☆☆ | 0回/14年 ★☆☆☆☆ |
| 1件 | ★☆☆☆☆ | 1回/14年 ★☆☆☆☆ |
| 2件 | ★★☆☆☆ | 2回/14年 ★★☆☆☆ |
| 3件 | ★★★☆☆ | 3回/14年 ★★★☆☆ |
| 4件 | ★★★★☆ | 4回/14年 ★★★★☆ |
| 5件以上 | ★★★★★ | 5回/14年 ★★★★★ |

## 解釈条番号の慣用フォーマット

電技解釈は **2013年（H25）改正で大幅に条番号変更**があったため、kakomon.yml（旧条番号を残す可能性）と現行解釈条番号は別物として扱う。食い違い時の記載例：

```markdown
- 電技解釈 電線の接続法 — 具体的な施工方法と絶縁処理の数値規定 [要確認: 現行条番号。kaishaku/index.md は§6（作成予定）/ kakomon.yml H23問4 は§12と記載で食い違いあり。e-Gov公式で照合のこと]
```

## 落とし穴

- 🔴 **handoff指示の頻度値を実装側でそのままコピペする** → pre-commit hookで止まる。前段でDBチェックしてから書く
- 🔴 **記憶ベースの過去問実績を「H25頃」等あいまいな年度で書く** → 必ずkakomon.ymlに該当エントリがあるかで確認
- 🟡 **解釈条番号を片方のソース（index.mdだけ/kakomon.ymlだけ）で断定** → 2013年改正で変動済み。両方記載＋[要確認]
- 🟡 **eGov fetch を自動化したくなる** → 信頼度<70%領域。条文の一字一句は人間が公式PDF/eGovで照合する

## 実践メモ

- handoff作成スキル（仮）を将来作るなら、kakomon.yml チェックを最初のステップに組み込む
- 条番号マッピング辞書（旧→新）を `knowledge/houki/kaishaku-article-mapping.md` で別ナレッジ化したい（未着手）
- denken-wikiの `.claude/rules/mkdocs-rules.md` に「出題頻度・過去問実績の記載ルール」「解釈条番号の記載ルール」を追記済み（2026-05-02）
