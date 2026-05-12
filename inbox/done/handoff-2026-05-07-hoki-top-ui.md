# 引き継ぎ: denken-hoki-wiki トップページ UI改修

**作成日**: 2026-05-07  
**引継ぎ先タスク**: トップページ（HomePage）のUI全面改修  
**CWD**: `C:\Users\kfuru\.secretary\.claude\worktrees\gallant-williams-a3243e`

---

## 現状

### リポジトリ
- GitHub: `kfurufuru/secretary-portal`
- GH Pages: https://kfurufuru.github.io/secretary-portal/denken-hoki-wiki.html
- ローカルworktree: `C:\Users\kfuru\.secretary\.claude\worktrees\gallant-williams-a3243e`

### 直近のコミット（push済み）
```
c211a10 feat(top): トップページに用語クイズクイックアクセスカード追加
64a5a1a feat(glossary): テーブル5列化＋操作ボタン2×2グリッド化
677e98a fix(hoki-wiki): 8.5用語クイズ 一覧テーブルの縦書き崩れ修正
67bf817 feat(hoki-wiki): sec08.5 用語クイズ・SRS 新規追加（§58 10語パイロット）
```

### 現在のトップページ構成（HomePage コンポーネント）
ファイル: `hoki-pages.jsx` の `function HomePage({ onNav, data })` （229行目〜）

セクション順:
1. `ExamCountdownBanner` — 試験まで115日カウントダウン
2. Hero — h1キャッチコピー + 棲み分けルールボックス
3. **前回のつづきカード** — localStorage から最後に見たページを自動選出
4. **用語クイズクイックアクセスカード** — ★今回追加（`yqStats` useMemo + `<div>` ベタ書き）
5. 教材CH対応表（`<details>` 折りたたみ）
6. 今日の一問（4択クイズ、固定問題）
7. HOT TOPICS（Sランクテーマ一覧）
8. ROADMAP（5ステップ進捗）
9. 過去問タグフィルター + 演習開始ボタン

### ユーザーの要求
「トップ画面のUIを改修する」

**改修の目的**: 受験者が復習しやすい導線に。

---

## ビルド手順

```bash
cd C:\Users\kfuru\.secretary\.claude\worktrees\gallant-williams-a3243e
python build-hoki-wiki.py
# → denken-hoki-wiki.html が再生成される（6100行超のSPA）
```

**禁止事項（重要）**: `denken-hoki-wiki.html` を直接編集しない。  
必ず `hoki-pages.jsx` / `hoki-components.jsx` を編集してビルドすること。

### プレビュー
```bash
python -m http.server 8766
# → http://localhost:8766/denken-hoki-wiki.html
```

### Push
```bash
git add hoki-pages.jsx hoki-components.jsx denken-hoki-wiki.html
git commit -m "feat(top): UI改修"
git push origin HEAD:main
```

---

## ファイル構成

| ファイル | 役割 |
|---------|------|
| `hoki-pages.jsx` | **全ページコンポーネント**（HomePage含む）←メイン編集対象 |
| `hoki-components.jsx` | Sidebar・共通コンポーネント・CSS変数 |
| `hoki-data.js` | WIKI_DATA（チャプター・ページ定義） |
| `hoki-glossary-data.js` | GLOSSARY_TERMS_V1（§58の10語） |
| `hoki-glossary.jsx` | ChokuzenYougoPage（用語クイズページ） |
| `build-hoki-wiki.py` | ビルドスクリプト |

---

## CSS変数（共通デザイントークン）

```css
--bg           /* ページ背景 */
--bg-elev      /* カード背景（少し明るい） */
--border       /* ボーダー色 */
--ink-1        /* 本文テキスト */
--ink-2        /* サブテキスト */
--ink-3        /* ミュートテキスト */
--accent       /* アクセントカラー（オレンジ系） */
--radius       /* 角丸 */
```

`.btn.primary` / `.btn.secondary` — 共通ボタンクラス  
`.rank.rank-S` / `.rank.rank-A` / `.rank.rank-B` / `.rank.rank-C` — 重要度バッジ  
`.tag` — タグチップ

---

## 注意事項

- ライトモード固定（ダークモード対応不要）
- モバイル対応は**不要**（PCオンリー）
- React + Babel CDN（`<script type="text/babel">`）— JSX記法OK、ES6+ OK
- localStorage キー: `hoki_lastSeen_<pageId>` / `hoki_quiz_glossary_progress`
- `onNav(pageId)` でページ遷移
- `data.chapters[].pages[]` でチャプター・ページ一覧取得可能
