# 引き継ぎ: 電験3種 理論Wiki v1.0 完成後チェック

## 現在の状態（2026-04-26）

`C:\Users\kfuru\.secretary\denken3-riron-wiki.html` が **305KB / 6272行** で完成し、
ブラウザ動作確認済み（コアナビゲーション・TrapPatterns・sidebar開閉）。

## 完了済み
- [x] Phase 0: kikai-wiki.html → riron-wiki.html コピー + ブランド差替え（forest accent）
- [x] Phase 1: riron-data.js（37引っかけ+89用語）、riron-components.jsx（7コンポーネント）生成
- [x] Phase 2: riron-pages-batch1/2/3.jsx（17単元）、riron-pages-strategy.jsx（攻略章）生成
- [x] Phase 3: build-riron-wiki.py で統合（pages-core.jsx追加・JSX構文修正込み）
- [x] Phase 4: ブラウザ確認（HomePage / コンデンサ / 引っかけパターン集 動作確認）
- [x] portal-v2.html の理論Wikiリンク → `denken3-riron-wiki.html#home`（v1.0 表記）

## 残タスク

### 優先度高
1. **KaTeX数式描画の確認** — `file:///C:/Users/kfuru/.secretary/denken3-riron-wiki.html` をブラウザで開き、コンデンサページの公式（$C = \varepsilon S/d$ 等）が描画されているか確認。描画されていなければ KaTeX auto-render の設定確認。

2. **全25ページのPageNav prev/next 配線確認** — 各ページ末尾の「前へ/次へ」リンクが正しいページに飛ぶか総当たり確認。

3. **Ctrl+K 検索テスト** — 検索ボックスでCtrl+K→「テブナン」「引っかけ」で正しく表示されるか。

4. **TrapCard分野フィルタ確認** — 引っかけパターン集ページで電磁気/直流/交流/三相フィルタをクリックして絞り込みが機能するか。

### 優先度中
5. **portal-v2.html の確認** — `file:///C:/Users/kfuru/.secretary/portal-v2.html` を開いて「理論Wiki」リンクが正しく飛ぶか確認。

6. **法規Wiki検討** — 電験3種 法規Wikiも同形式で作成予定（次の大型タスク）。

## ファイル構成
```
C:\Users\kfuru\.secretary\
├── denken3-riron-wiki.html      # 完成品（305KB）
├── denken3-kikai-wiki.html      # 機械Wiki（参照用・編集禁止）
├── portal-v2.html               # ポータル（理論Wikiリンク更新済み）
├── build-riron-wiki.py          # 統合ビルドスクリプト
├── riron-data.js                # データ（chapters/glossary/trapPatterns 37個）
├── riron-components.jsx         # 専用コンポーネント7種
├── riron-pages-strategy.jsx     # 攻略章（HomePage/Last3Days/RetakeStrategy/Guide）
├── riron-pages-batch1.jsx       # 基幹4単元（Capacitor/AcPower/ThreePhase/Transistor）
├── riron-pages-batch2.jsx       # 9単元（CoulombField/DcCircuit/AcBasics/etc）
└── riron-pages-batch3.jsx       # Bridge/Transient/Semiconductor/Trends/Glossary/etc
```

## ビルド方法
```bash
cd C:/Users/kfuru/.secretary
py build-riron-wiki.py
```
→ `denken3-riron-wiki.html` に出力。ソースファイル（riron-*.jsx/js）を編集後に再実行で更新。

## 既知の問題・注意点
- `riron-pages-batch2.jsx` L987: `k&lt;1`（JSX text node内の < をエスケープ済み）
- `riron-pages-batch3.jsx`: LaTeXバックスラッシュを `{String.raw\`...\`}` でラップ済み
- `build-riron-wiki.py` は必ず `denken3-kikai-wiki.html` を構造テンプレとして読む（`denken3-riron-wiki.html` ではない）
