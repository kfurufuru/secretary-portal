---
date: 2026-04-25
type: handoff
status: in-progress
---

# 引き継ぎ: business-skills/index.html 見直し

## 完了済み作業

### skills.json（`business-skills/data/skills.json`）
- 番号重複解消: 26×2 / 27×2 / 28×2 → 26〜36の連番に整理
- カテゴリ統合: `意思決定`(2件) → `思考・認知` / `人間力`(1件) → `セルフマネジメント`
- カテゴリ新設: `生活設計`（朝の仕事術・夜ルーティン・週次レビュー・脳活性化の4件）
- 採番ルール追加: `meta.nextNum: 37` / `meta._numbering` フィールド

### index.html（`business-skills/index.html`）
- タイトル: `Business Skills | 思考・行動の設計図` → `思考・行動の設計図 | Business Skills`
- h1: `思考・行動の` → `思考・行動・習慣の`
- eyebrow: `Business Skills Series` → `Performance Design Series`
- hero説明文: 5要素縛りを外し、脳科学・セルフマネジメントまで含む説明に更新
- hero統計: `175+ 要素（5×35）` → `8 カテゴリ`（JS側の stat-elements 更新行も削除）
- フィルターバー: 意思決定・人間力・全体像の3ボタン削除、`生活設計`ボタン追加（8→8ボタン）
- カードCTA: `5要素を確認する` → `内容を確認する`
- skills.json fetch: `fetch('data/skills.json?v=' + Date.now())` にキャッシュ回避を追加

## 未解決: 「生活設計」フィルターが絞り込まれない

### 現象
`http://localhost:8092/business-skills/index.html` で「生活設計」ボタンを押しても絞り込みが効かない。

### 診断済み（問題なし）
- skills.json の4件（asa-shigoto / yoru-routine / shukan-review / nou-kasseika）の `category` が `"生活設計"` に正しく変更されていることを node コマンドで確認済み
- index.html のフィルターボタン `data-filter="生活設計"` が正しく追加済み
- JS の filter ロジック（`card.dataset.category === f`）に論理的な問題はなし
- `?v=Date.now()` でキャッシュ回避済み

### 疑われる原因（優先順に）
1. **index.html 自体のブラウザキャッシュ**（index.html が古いままで ?v= 追加前のfetchを実行している）
   → DevTools > Network タブで `skills.json` のレスポンスヘッダーを確認
   → `Cache-Control` / `Age` の値を確認

2. **ポート8092のサーバーが別ディレクトリを参照している**
   → サーバーのルートが `C:\Users\kfuru\.secretary` であることを確認
   → `http://localhost:8092/business-skills/data/skills.json` を直接ブラウザで開いて `asa-shigoto` の `category` が `"生活設計"` かチェック

3. **サービスワーカーのキャッシュ**
   → DevTools > Application > Service Workers で確認・Unregister

### 次セッションの確認手順（DevToolsコンソール）
```js
// ① JSONが正しく読み込まれているか
fetch('data/skills.json?t=' + Date.now()).then(r=>r.json()).then(d => {
  const cats = d.skills.filter(s => s.category === '生活設計');
  console.log('生活設計スキル:', cats.map(s=>s.id));
});

// ② カードのdata-category属性を確認
[...document.querySelectorAll('.series-card')].filter(c => c.dataset.category === '生活設計').map(c => c.querySelector('.card-title')?.innerText);

// ③ フィルターボタンのdata-filter確認
[...document.querySelectorAll('.filter-btn')].map(b => b.dataset.filter);
```

① でスキルが出ない → JSONキャッシュが原因
② でカードが出ない → index.htmlキャッシュが原因（fetchが旧skillsで動いている）
③ で `"生活設計"` がない → index.htmlキャッシュが原因

### 根本解決策
フィルター動作確認後、fetch を `{ cache: 'no-cache' }` オプションに変更する方が確実：
```js
fetch('data/skills.json', { cache: 'no-cache' })
```

## ファイル構成（変更対象）
- `business-skills/data/skills.json` — スキルデータ（カテゴリ・番号管理）
- `business-skills/index.html` — インデックスページ（JS内の renderCard / init 関数）

## 次の引き継ぎ指示
```
inbox/handoff-2026-04-25-business-skills.md を読んで実装続行して
```
