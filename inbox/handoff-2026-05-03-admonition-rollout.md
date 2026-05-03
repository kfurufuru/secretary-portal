---
title: 残20条文記事への デザイン規約 R1/R2 一括適用 引き継ぎ
created: 2026-05-03
status: ready-for-execution
estimated: 45分
prerequisites:
  - .claude/rules/denken-hoki-style.md §9.7 デザイン規約 を理解していること
  - .claude/projects/C--Users-kfuru--secretary/memory/feedback_admonition_visibility.md を一読していること
related:
  - inbox/wiki-design-review-56-2026-05-03.md（56.md Pilot レポート）
  - inbox/design-tokens-adoption-2026-05-03.md（design-tokens 採用フェーズ）
  - .claude/rules/denken-hoki-style.md §9.7（強制ルール本文）
---

# 残20条文記事への デザイン規約 一括適用 引き継ぎ

## 目的

DENKEN-WIKI監修部 デザイン班が 56.md レビューで確立した**デザイン規約R1/R2**（admonition 4種類限定・マーカー穴埋め専用）を、残20条文記事に適用する。

## 前提（既に完了している作業）

- ✅ **R3（inline `<style>` 禁止）**: 3ファイル（56.md / 10.md / 15.md）から既に除去済。残20ファイルにはinline styleなし
- ✅ **56.md Pilot**: 改善1〜6 完了済（メタ表二重表記・装飾絵文字・inline style・admonition圧縮・マーカー限定・section 14圧縮）
- ✅ **design-tokens.css + custom.css**: 全面トークン化済
- ✅ **denken-hoki-style.md §9.7**: 強制ルールとして恒久化

## 対象ファイル一覧と統計（2026-05-03 計測）

| ファイル | abstract→note | info→note | example→tip | ==marker==総数 |
|---------|------:|------:|------:|------:|
| 1.md  | 1 | 2 | 0 | 21 |
| 2.md  | 1 | 0 | 1 | 8  |
| 4.md  | 2 | 0 | 0 | 10 |
| 5.md  | 2 | 1 | 1 | 16 |
| 6.md  | 1 | 0 | 0 | 2  |
| 7.md  | 2 | 1 | 0 | 22 |
| 8.md  | 1 | 0 | 0 | 3  |
| 9.md  | 1 | 0 | 0 | 5  |
| 10.md | 2 | 1 | 0 | 13 |
| 11.md | 2 | 1 | 1 | 31 |
| 14.md | 2 | 1 | 2 | 28 |
| 15.md | 2 | 1 | 1 | 19 |
| 20.md | 1 | 0 | 0 | 4  |
| 21.md | 1 | 0 | 0 | 4  |
| 32.md | 1 | 1 | 0 | 5  |
| 57.md | 2 | 1 | 0 | 37 |
| 58.md | 1 | 0 | 1 | 5  |
| 59.md | 1 | 1 | 0 | 7  |
| 63.md | 2 | 1 | 0 | 19 |
| 64.md | 1 | 0 | 0 | 8  |
| **合計** | **29** | **12** | **7** | **267** |

合計違反: admonition 48箇所 / マーカー検証要 20ファイル

## 実行手順（推奨：別セッションで実施）

### Step 1: ブランチ作成と現状確認

```bash
cd C:/Users/kfuru/Projects/denken-wiki
git checkout -b chore/admonition-marker-rollout
git status  # 編集中の変更がないことを確認
```

### Step 2: R1 admonition 一括変換（Python）

```bash
python << 'PYEOF'
import os, re
articles_dir = 'C:/Users/kfuru/Projects/denken-wiki/docs/articles/kijun'
EXCLUDE = {'56.md'}  # 既に変換済
total_changes = 0
for f in sorted(os.listdir(articles_dir)):
    if not f.endswith('.md') or f in EXCLUDE: continue
    p = os.path.join(articles_dir, f)
    with open(p, encoding='utf-8') as fp:
        text = fp.read()
    orig = text
    text = re.sub(r'^!!! abstract\b', '!!! note', text, flags=re.M)
    text = re.sub(r'^!!! info\b', '!!! note', text, flags=re.M)
    text = re.sub(r'^!!! example\b', '!!! tip', text, flags=re.M)
    if text != orig:
        with open(p, 'w', encoding='utf-8') as fp:
            fp.write(text)
        diff = sum(1 for a,b in zip(orig.split('\n'), text.split('\n')) if a != b)
        print(f'{f}: {diff} 行変換')
        total_changes += diff
print(f'\n合計: {total_changes} 行変換')
PYEOF
```

期待出力: 合計 48 行（abstract 29 + info 12 + example 7）

### Step 3: R2 ==マーカー== の section別判定

各ファイルで section 13（穴埋め過去問チャレンジ）の範囲を特定し、範囲外の `==X==` を `**X**` に置換。

```bash
python << 'PYEOF'
import os, re
articles_dir = 'C:/Users/kfuru/Projects/denken-wiki/docs/articles/kijun'
EXCLUDE = {'56.md'}  # 既に変換済
total_converted = 0
for f in sorted(os.listdir(articles_dir)):
    if not f.endswith('.md') or f in EXCLUDE: continue
    p = os.path.join(articles_dir, f)
    with open(p, encoding='utf-8') as fp:
        lines = fp.readlines()
    # section 13 範囲特定（該当なしのファイルもある）
    sec13_start = sec14_start = None
    for i, line in enumerate(lines):
        # ## 13. 穴埋め過去問チャレンジ パターン
        if re.match(r'^## 13\.', line):
            sec13_start = i
        elif sec13_start is not None and re.match(r'^## 1[4-9]\.|^## 2', line):
            sec14_start = i
            break
    if sec13_start is None:
        # section 13 が無い場合は全体で ==X==→**X** 変換
        sec13_start, sec14_start = -1, -1
    elif sec14_start is None:
        sec14_start = len(lines)
    # 変換
    new_lines = []
    converted = 0
    for i, line in enumerate(lines):
        if sec13_start >= 0 and sec13_start <= i < sec14_start:
            new_lines.append(line)
        else:
            before_pairs = line.count('==') // 2
            new_line = re.sub(r'==([^=\n]+?)==', r'**\1**', line)
            after_pairs = new_line.count('==') // 2
            converted += (before_pairs - after_pairs)
            new_lines.append(new_line)
    if converted > 0:
        with open(p, 'w', encoding='utf-8') as fp:
            fp.writelines(new_lines)
        sec_label = 'no §13' if sec13_start < 0 else f'§13={sec13_start+1}-{sec14_start}'
        print(f'{f}: {converted} 個変換 ({sec_label})')
        total_converted += converted
print(f'\n合計: {total_converted} 個変換（section 13 内マーカーは保持）')
PYEOF
```

### Step 4: build 検証

```bash
cd C:/Users/kfuru/Projects/denken-wiki
mkdocs build 2>&1 | grep -E "ERROR|WARN|built in" | tail -5
```

期待: ERROR / WARNING ゼロ・`built in N秒`

### Step 5: preview レンダリング検証（任意・推奨）

代表的な3ファイル（5.md / 14.md / 57.md）をブラウザで開いて視覚確認：

```javascript
// preview_eval で各ファイルの admonition counts と <mark> count を取得
(async () => {
  const targets = ['5','14','57'];
  const results = {};
  for (const t of targets) {
    const html = await fetch(`/articles/kijun/${t}/`).then(r=>r.text());
    const types = (html.match(/admonition\s+(abstract|info|tip|warning|example|note|success)/g) || []).map(s=>s.split(/\s+/)[1]);
    const counts = {};
    for (const x of types) counts[x] = (counts[x]||0)+1;
    results[t] = {
      counts,
      banned: (counts.abstract||0) + (counts.info||0) + (counts.example||0),
      mark_count: (html.match(/<mark>/g) || []).length
    };
  }
  return results;
})();
```

期待:
- `counts.abstract` `counts.info` `counts.example` がすべて 0
- `mark_count` は section 13 の正解数（通常3〜5）

### Step 6: コミット

```bash
git add docs/articles/kijun/
git diff --stat HEAD  # 変更行数を確認
git commit -m "デザイン規約R1/R2を残20条文記事に一括適用

- admonition: abstract/info → note、example → tip（48箇所）
- ==マーカー==: section 13外を **bold** に変換（267候補から section 13 維持）
- 既存ベンチマーク56.md と整合性確保
- 規約: .claude/rules/denken-hoki-style.md §9.7"
```

## エッジケース・注意点

### A. section 13 が存在しない条文

短い条文（21.md / 32.md / 64.md 等）は穴埋め過去問チャレンジが無い可能性。Step 3 のスクリプトは「section 13なし → 全体マーカー変換」に動作する。

### B. section番号がずれている条文

denken-hoki-style.md §2.5 で「規範型A=14・実装型B=16・構造型C=10〜11」とあり、section番号が条文タイプで異なる。Step 3 のスクリプトは `## 13.` パターンで判定するため、規範型A（14セクション）では section 13 が「穴埋め過去問チャレンジ」と一致するが、構造型Cでは異なる可能性。

**対応**: 各ファイルで `## 13.` の見出しテキストを目視確認。穴埋め過去問でない場合は「section 13なし」として全体変換にする。

### C. ==マーカー== の section 13外での意味あり使用

一部ファイルで「重要箇所のハイライト」として ==marker== を使っている可能性。**bold** に統一しても情報は失われないが、視覚的なインパクトは下がる。早川 caveat と同様、「削減後にユーザーが学習しづらくなったら戻す」前提で進める。

### D. 既に修正済の56.mdは除外

スクリプト内 `EXCLUDE = {'56.md'}` で除外済。

## 完了条件

- [ ] R1 違反 0件: `grep -nE "^!!! (abstract|info|example)" denken-wiki/docs/articles/kijun/*.md` で何も出ない
- [ ] R3 違反 0件: `grep -l "<style>" denken-wiki/docs/articles/kijun/*.md` で何も出ない（既に達成）
- [ ] mkdocs build エラー0件
- [ ] 代表3ファイル（5.md/14.md/57.md）で preview レンダリング正常
- [ ] コミット完了

## 次の引き継ぎ候補（このタスク完了後）

- **R4 装飾絵文字の削減**: `^\*\*[📜⚡🔌📏🔧📚🎯📊]` パターン検出 → 装飾絵文字のみ削除（索引アイコンは維持）
- **R5 重複情報の検出**: section 1 と section 14 の重複表チェック・圧縮
- **規範型/実装型/構造型のセクション数監査**: §2.5 の標準数（14/16/10）から外れたファイルの再構成

## 参照

- 上位規約: `.claude/rules/denken-hoki-style.md` §9.7 デザイン規約
- 56.md Pilot レポート: `inbox/wiki-design-review-56-2026-05-03.md`
- design-tokens 採用手順: `inbox/design-tokens-adoption-2026-05-03.md`
- F監修部メンバー: `personas/{jonathan-ive,dieter-rams,hara-kenya,sato-kashiwa,steve-schoger}.md`

---

**起動方法（次セッション開始時）**: 「inbox/handoff-2026-05-03-admonition-rollout.md を読んで実装続行して」
