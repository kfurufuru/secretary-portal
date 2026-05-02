---
date: YYYY-MM-DD
type: handoff
title: [短いタイトル — 何を実装するか]
session: [A/B など]
---

# 引継ぎ: [タイトル]

## 対象ファイル

`絶対パス`

- 現状: [サイズ・セクション数等]
- 目標: [ベンチマーク名・到達条件]
- 出題頻度: ★★★★☆（N回/14年）— 優先度

## ベンチマーク

`絶対パス` を必ずRead。[何を再現するか]

## 既存セクション（維持）

```
## ⚡ 5秒で思い出す（line N）
...
```

## 追加すべきセクション（不足分）

### N. セクション名

[詳細仕様]

## 制約（必読）

1. **条文原文は独自に書かない**。`!!! info "条文原文の照合（要確認）"` プレースホルダー
2. **新規追加する数値・条文番号は `[要確認]` フラグ**（既存記事の数値はそのまま維持）
3. **SVGは `<div>...</svg></div>` で必ず囲む**（MkDocs Markdownバグ回避）
4. **`§` 記号禁止**。代わりに「第〜条」「1.」表記
5. **Edit回数最小化**: 同一ファイルの変更は1〜2回の大Editで実施

## 完了基準

- [ ] [セクション]完備
- [ ] `mkdocs build` エラーなし
- [ ] git diff で +N行以上（目安）
- [ ] コミット: `feat(...): ...`

---

## 📋 出題頻度確認チェックリスト（handoff作成時必須）

> **教訓（2026-05-02）**: 第11条handoffで「5回/14年 ★★★★☆」と書いたが、実際は kakomon.yml で 0件登録（接地関連は全て解釈§17に登録）だった。本文と自動メタが矛盾し29件の wiki 全体不整合を生んだ。

### 出題頻度を書く前に必ず実行

```bash
cd /c/Users/kfuru/Projects/denken-wiki

# 対象条文の出題実績を kakomon.yml で確認
python -c "
import yaml, re
data = yaml.safe_load(open('docs/_data/kakomon.yml', encoding='utf-8'))
LAW = '省令'  # or '解釈' '事業法'
NUM = 11      # 対象条文番号
for p in data.get('problems', []):
    a = p.get('article','') or ''
    if re.search(rf'{LAW}[§\\s]*{NUM}\\b', a):
        print(p.get('year'), '問', p.get('num'), '|', a, '|', p.get('topic',''))
"
```

### 結果別の対応

| 結果 | handoff記載方針 |
|------|----------------|
| N件ヒット (N≧5) | `**出題頻度**: N回/14年 ★★★★☆` を本文に書かない（自動メタが正） |
| N件ヒット (N=2-4) | 同上。メタブロック自動注入を信頼 |
| N件ヒット (N=1) | 同上 |
| 0件ヒット | 「過去14年で本条直接の出題なし」と明記。**関連条文（解釈側）に同テーマの登録があるか必ず確認**。あれば「解釈§Mとして登録」と注記 |

### 関連条文の確認コマンド

```bash
# 「接地」「絶縁」「保護」など、対象条文のテーマで kakomon.yml を逆引き
python -c "
import yaml
data = yaml.safe_load(open('docs/_data/kakomon.yml', encoding='utf-8'))
KEYWORD = '接地'  # 対象テーマ
for p in data.get('problems', []):
    t = p.get('topic','') or ''
    if KEYWORD in t:
        print(p.get('year'), '問', p.get('num'), '|', p.get('article',''), '|', t)
"
```

### 手書き「出題頻度」行を書かない理由

- `scripts/inject_frequency_meta.py` が kakomon.yml から自動メタを注入する
- 本文に手書き行を書くと**二重ソース**になり、kakomon.yml更新時に矛盾が発生
- pre-commit hook (`scripts/hooks/pre-commit`) が矛盾を検出してブロックするので、矛盾を残したままコミットできない
- handoff作成者は「過去問テーブル」「R08予測note」のみ記述し、頻度バッジは自動注入に任せる

---

*最終確認: YYYY-MM-DD | ベンチマーク = `絶対パス`*
