---
title: "電技解釈 条番号マッピング表（kakomon.yml × kaishaku/index.md）"
category: "電験3種"
level: "draft"
created: "2026-05-02"
last_reviewed: "2026-05-02"
understanding_score: 3
source: "denken-wiki 第7条handoffで発覚した条番号食い違い（kakomon.yml §12 vs kaishaku/index.md §6）"
tags: ["denken-wiki", "電技解釈", "条番号", "法規", "kakomon"]
related: ["knowledge/houki/wiki-handoff-checklist.md"]
---

# 電技解釈 条番号マッピング表

## TL;DR

denken-wikiで「電技解釈第N条」を引用するとき、`docs/_data/kakomon.yml`（過去問DB・247問）と `docs/articles/kaishaku/index.md`（条文インデックス）の条番号が食い違うケースがある。**2013年（H25）改正で大幅に条番号変更があった**ため。マッピング確定にはeGov公式の改正履歴照合が必要。

## 現状把握（2026-05-02時点）

### kakomon.yml に出現する解釈§番号（50種類）

```
§1, §12, §14, §15, §17, §18, §21, §24, §29, §33,
§35, §36, §37, §38, §42, §44, §47, §53, §58, §59,
§61, §65, §68, §80, §82, §110, §111, §116, §117, §120,
§125, §143, §148, §152, §153, §155, §156, §163, §166, §167,
§168, §171, §175, §176, §181, §192, §200, §220, §224, §227
```

### kaishaku/ 実ファイル番号（39ファイル・2026-05-02時点）

```
§1, §10, §13, §14, §15, §16, §17, §18, §19, §22,
§29, §33, §36, §37, §38, §59, §65, §68, §71, §75,
§79, §81, §120, §133, §143, §147, §148, §149, §156, §159,
§164, §175, §176, §200, §220, §222, §227, §229, §232
```

### 食い違い分析

**kakomon.ymlにあるがファイル未作成（28件）**:
- §12, §21, §24, §35, §42, §44, §47, §53, §58, §61, §80, §82, §110, §111, §116, §117, §125, §152, §153, §155, §163, §166, §167, §168, §171, §181, §192, §224
- → これらは「kakomon.ymlの§番号で作成すべき or 現行§番号にマップしてから作成すべき」を確認する必要がある

**ファイルあるがkakomon.yml未参照（17件）**:
- §10, §13, §16, §19, §22, §71, §75, §79, §81, §133, §147, §149, §159, §164, §222, §229, §232
- → 過去問題に出ていない条文。実装優先度低い可能性

## 既知の食い違い実例（要eGov照合）

### Case 1: 電線の接続法（denken-wiki第7条handoffで発覚）

| ソース | §番号 | タイトル |
|--------|------|---------|
| kakomon.yml H23問4 article欄 | §12 | 電線の接続（と省令§7セット） |
| kaishaku/index.md | §6 | 電線の接続法（📝作成予定） |
| kaishaku/index.md | §12 | 電路の対地電圧の制限（📝作成予定） |

**仮説**: 2013年改正前の旧解釈では§12 = 電線の接続法だった可能性。改正後§6に番号変更され、§12は別タイトル（電路の対地電圧の制限）になったと推定。

**現状記載方針**: 7.md には [要確認] フラグ付きで両条番号を併記済み。

## 検証コマンド（再実行用）

```python
import yaml, re, os
d = yaml.safe_load(open('docs/_data/kakomon.yml', encoding='utf-8'))
# kakomon.yml の解釈§番号集計
kako_nums = set()
for p in d['problems']:
    for m in re.finditer(r'解釈§(\d+)', str(p.get('article','') or '')):
        kako_nums.add(int(m.group(1)))
# kaishaku/ 実ファイル番号
kai_files = {int(m.group(1)) for f in os.listdir('docs/articles/kaishaku/')
             if (m := re.match(r'(\d+)\.md$', f))}
print('kakomonにあるが未作成:', sorted(kako_nums - kai_files))
print('ファイルあるが未参照:', sorted(kai_files - kako_nums))
```

## 落とし穴

- 🔴 **kakomon.ymlの§番号を現行解釈条番号と決めつける** → 旧条番号の可能性。eGov公式で照合必須
- 🔴 **kaishaku/index.mdの§番号で本文を書いてしまう** → §番号は確定だがタイトルが正しいかはeGov未照合の場合が多い
- 🟡 **片方のソースだけで関連条文リンクを書く** → 食い違い時は両方併記+[要確認]フラグ

## 次のアクション（人間タスク）

1. eGov公式（https://elaws.e-gov.go.jp/document?lawid=337M50000400052）で現行解釈の全条番号一覧を取得
2. kakomon.yml の §番号と現行§番号の対応辞書を確定
3. このナレッジを level: review → published に昇格
4. denken-wiki 既存の条文ファイルの関連条文リンクを一括検証

## 実践メモ

- マッピング確定までは「片方のソースのみで断定しない」ルールで運用
- denken-wiki側の `.claude/rules/mkdocs-rules.md` にも同ルールを追記済み（2026-05-02）
- `wiki-handoff-checklist.md` のCheck項目3で「両方確認」を必須化
