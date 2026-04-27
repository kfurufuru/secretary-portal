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

### ✅ 全て完了（2026-04-27）
1. **KaTeX数式描画** ✅ — `C = Q/V`、`C = ε₀εᵣS/d` 正常描画確認済み
2. **PageNav prev/next 配線** ✅ — 全ページ正しく遷移。表示ラベルバグ3箇所を修正してコミット済み
3. **Ctrl+K検索** ✅ — デスクトップ幅で「テブナン」「引っかけ」正しくヒット確認
4. **TrapCardフィルタ** ✅ — 電磁気/直流/交流/三相/電子/計測 全6分野動作確認
5. **portal-v2.html リンク** ✅ — `denken3-riron-wiki.html#home` に正しく遷移

### 修正内容（riron-pages-batch1.jsx / コミット済み）
- CapacitorPage eyebrow: `1.1 → 1.2`
- CapacitorPage PageNav prev title: `"1.0 静電気" → "1.1 静電気・クーロンの法則"`
- CapacitorPage PageNav next title: `"1.2 電磁力" → "1.3 電磁力"`
- ThreePhasePage PageNav next title: `"4.2 半導体" → "5.1 半導体・ダイオード"`

### 次の大型タスク
6. **法規Wiki検討** — 電験3種 法規Wikiも同形式で作成予定

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
