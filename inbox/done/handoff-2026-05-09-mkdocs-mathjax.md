# 引き継ぎ: denken-wiki MathJax（数式レンダリング）有効化

**日付**: 2026-05-09
**前任**: juyoritsu-fukaritsu v1.4 公開セッション
**対象**: denken-wiki（電験3種 法規Wiki）リポジトリ全体の数式レンダリング修正

---

## 🎯 ゴール

`docs/**/*.md` 内の `$$ \text{...} \frac{}{} $$` 形式の数式が、ブラウザ上で **生のLaTeXのまま表示** されているため、MathJax または KaTeX で正しく数式描画されるようにする。

例：現状は以下が画面上にそのまま表示される
```
$$
\text{需要率} = \frac{210}{350} = 0.6
$$
```

修正後の目標：分数式・記号・等号がレンダリングされた数式として表示される。

---

## 📋 影響範囲（事前調査済）

数式（`$$...$$`）を使用しているファイル：**13ファイル**

```
docs/articles/furyoku/5.md
docs/articles/kaishaku/17.md
docs/articles/kijun/14.md
docs/articles/kijun/15.md
docs/articles/kijun/56.md
docs/themes/juyoritsu-fukaritsu.md
docs/themes/kachiku-densen.md
docs/themes/koatsu-kiki-shisetsu.md
docs/themes/ritsuryo-kaizen-capacitor.md
docs/themes/setsuchi.md
docs/theory/deni-denkai-jikai.md
docs/theory/denkai-jikai-deni.md
docs/theory/transistor.md
```

確認コマンド: `grep -rln '\$\$' /c/Users/kfuru/denken-wiki-master/docs --include="*.md"`

---

## 🔧 必要な作業

### Step 1: mkdocs.yml に math 拡張を追加

現在 `mkdocs.yml` に以下の設定が **存在しない**（grep で `math|katex|arithmatex|mathjax` 0ヒット）:

```yaml
markdown_extensions:
  - pymdownx.arithmatex:
      generic: true

extra_javascript:
  - https://polyfill.io/v3/polyfill.min.js?features=es6
  - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
  # または既存の docs/javascripts/ 配下に置くスクリプトでもOK
```

公式ドキュメント参照: https://squidfunk.github.io/mkdocs-material/reference/math/

### Step 2: docs/javascripts/ に MathJax 設定スクリプトを追加（推奨）

```js
// docs/javascripts/mathjax.js
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};
```

そして `mkdocs.yml` の `extra_javascript` にも追加：
```yaml
extra_javascript:
  - javascripts/mathjax.js
  - https://polyfill.io/v3/polyfill.min.js?features=es6
  - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js
```

### Step 3: 既存記法との互換性確認

13ファイル全てで `$$...$$` 形式を使用。`pymdownx.arithmatex(generic: true)` は `$$...$$` を自動認識するため記法変更は不要のはず。ただし以下を確認：

- インライン数式（`$...$`）も使われているか？ → 使われていれば `arithmatex` で受ける
- 一部Markdownの `_` 記法（lodash等）と衝突しないか
- 既存の `\text{}` `\frac{}` `\sum` `\quad` 等が全てMathJax 3 でレンダリング可能か

### Step 4: ローカルビルド検証

```bash
cd /c/Users/kfuru/denken-wiki-master
mkdocs build 2>&1 | tail -20
mkdocs serve  # http://127.0.0.1:8000 で目視確認
```

13ファイル全てを順番にチェックして、数式レンダリングと既存表記が崩れていないか確認。

### Step 5: GH Pages デプロイと反映確認

push 後 50秒待ち、Chrome MCP で以下のページで mathJax 有効化を確認：

- https://kfurufuru.github.io/denken-wiki/themes/juyoritsu-fukaritsu/
- https://kfurufuru.github.io/denken-wiki/themes/ritsuryo-kaizen-capacitor/
- https://kfurufuru.github.io/denken-wiki/articles/kijun/56/
- https://kfurufuru.github.io/denken-wiki/theory/transistor/

検証JS:
```js
({
  hasMathJax: document.querySelectorAll('mjx-container').length,
  hasArithmatex: document.querySelectorAll('.arithmatex').length,
  rawLatexLeak: document.querySelector('article').textContent.match(/\\\\text\\{|\\\\frac\\{/g)?.length || 0
})
```
- `hasMathJax > 0` かつ `rawLatexLeak === 0` が成功条件

---

## ⚠ 注意事項

- リポジトリは `master` ブランチ運用（`main` ではない）。push 先は `origin master`
- GH Pages 配信元は `origin/master`（`docs/` ではなく `master` ルート + `mkdocs gh-deploy` 仕組み）
- 既存の `inject_hoki` フック（`build` 時に search_index.json に hoki-wiki エントリを注入）と干渉しないことを確認
- juyoritsu-fukaritsu.md は v1.4 完了済みのため、本作業で内容変更は不要（mkdocs.yml の拡張追加のみで自動的に効く）

---

## 📦 完了条件

- [ ] mkdocs.yml に pymdownx.arithmatex + MathJax 設定追加
- [ ] docs/javascripts/mathjax.js 作成（または equivalent）
- [ ] 13ファイル全てでローカル目視確認
- [ ] mkdocs build エラーなし
- [ ] commit & push
- [ ] GH Pages 反映確認（少なくとも juyoritsu-fukaritsu / ritsuryo-kaizen-capacitor / kijun/56 の3ページ）
- [ ] 数式レンダリング成功・生LaTeX残留ゼロ

---

## 🚦 想定リスク

- MathJax 3 の `\text{}` で日本語を含むときに表示が崩れる可能性 → ASCII にfallbackするか別の対応が必要かも
- 既存の `==マーカー==` 強調や `_イタリック_` と数式記号の衝突 → arithmatex(generic:true) で `$$` を独自タグに置換する仕組みなので原則問題なし、ただし要検証
- CDN 経由の MathJax は CSP（コンテンツセキュリティポリシー）で弾かれる可能性 → GH Pages 側ではCSP設定なしのはずだが念のため確認

---

## 参考: 過去のセッション情報

- `juyoritsu-fukaritsu.md` を v1.0 → v1.4 に改善（2026-05-09）したセッションで本問題を発見
- 数式自体は古舘さん（古舘さん）が以前から認識せず公開していた可能性あり、影響度は中（学習体験は劣化していたが致命的ではない）
- `feedback_session_switch.md`: コンテキスト上限・新タスク開始時は新セッション切り替え推奨 — 本タスクはこれに該当
