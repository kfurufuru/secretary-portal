---
date: 2026-04-22
type: handoff
title: 電験3種 LLM Wiki 構築セッション
---

# 引継ぎ: 電験3種 LLM Wiki 構築（2026-04-22）

## 本セッションで完了したこと

### 1. SCAFFOLD（wiki/ 全構造）
- `denken-study/wiki/` 全ディレクトリ構成作成
- index / log / hot / overview + 4分野themes + concepts / entities / questions / synthesis / meta
- `_templates/` (concept, question, source)
- `.obsidian/snippets/vault-colors.css` (wiki カラーテーマ)

### 2. ingest 4科目コンプリート
**PDFパス**: `C:\Users\kfuru\OneDrive\デスクトップ\01_資格・勉強\電験3種\`

| PDF | ページ数 | 収録年度 |
|-----|---------|---------|
| 電験王 過去問_法規.pdf | 343p | 平成23〜令和3年 |
| 電験王 過去問_理論.pdf | 363p | 平成23〜令和3年 |
| 電験王 過去問_機械.pdf | 404p | 平成23〜令和3年 |
| 電験王 過去問‗電力.pdf | 334p | 平成23〜令和3年 |

**注意**: 電力PDFの`‗`はU+2017（DOUBLE LOW LINE）。通常の_（U+005F）ではない

### 3. 作成済みwikiページ（全27ページ）

**sources/ (4)**:
- 電験王-法規-令和4年度版.md
- 電験王-理論-令和4年度版.md
- 電験王-機械-令和4年度版.md
- 電験王-電力-令和4年度版.md

**entities/ (13)**:
- 法規: 電気事業法.md / 電気設備技術基準及びその解釈.md / 電気施設管理.md
- 理論: 電磁気.md / 電気回路.md / 電子理論.md / 電気及び電子計測.md
- 機械: 回転機.md / 変圧器.md / 自動制御.md
- 電力: 水力発電.md / 火力発電.md / 送電線路.md

**themes/ (4)**: 電気理論.md / 電力.md / 機械.md / 法規.md

**meta/ (1)**: dashboard.md（Dataviewクエリ）

---

## 残タスク（次セッションでやること）

### 優先度: 高
1. **配電エンティティ作成**（電力）
   - `wiki/entities/配電.md`
   - テーマ: 電圧降下計算（√3×I×(Rcosφ+Xsinφ)）・力率改善・単相3線式
   
2. **パワーエレクトロニクスエンティティ作成**（機械）
   - `wiki/entities/パワーエレクトロニクス.md`
   - テーマ: 三相整流回路の出力電圧計算・インバータ・PWM

3. **変圧器→電気施設管理クロス参照リンク追加**
   - [[変圧器]] と [[電気施設管理]] に `related` 相互リンク追加
   - 全日効率計算式が両ページに重複 → 統合コメント追加

### 優先度: 通常
4. **過去問ページ作成** (`wiki/questions/`)
   - 令和3年法規 全13問から開始推奨
   - ファイル名: `R03-法規-問01.md` 〜 `R03-法規-問13.md`
   - PDFはimageで読む（テキスト抽出不可。fitz+画像→Read）

5. **電力 送電線路 追加トピック**
   - `entities/配電.md` との分離整理
   - コロナ放電・誘電損・充電電流（地中ケーブル）

### 優先度: 低
6. **Dataviewダッシュボード確認**
   - `wiki/meta/dashboard.md` をObsidianで開いて動作確認

---

## 技術メモ（次セッションに必要な知識）

### PDF読み取り方法
MeiryoUIフォントの埋め込みでテキスト抽出不可。必ず画像変換して Read する:

```python
import fitz, os
base = r'C:\Users\kfuru\OneDrive\デスクトップ\01_資格・勉強\電験3種'
pdf_path = os.path.join(base, '電験王 過去問_法規.pdf')
doc = fitz.open(pdf_path)
mat = fitz.Matrix(1.5, 1.5)
pix = doc[page_index].get_pixmap(matrix=mat)
pix.save(r'C:\Users\kfuru\.secretary\denken-study\.raw\temp.png')
doc.close()
```
その後 `Read('...temp.png')` で画像として読む。

### 電力PDFのファイル名
`電験王 過去問‗電力.pdf` — `‗` は U+2017。コード内では:
```python
files = os.listdir(base)
denki_pdf = [f for f in files if '電力' in f][0]
```
で取得するのが確実。

### wikiページ追加フロー
1. entities/ または concepts/ に新規ファイル作成（_templates/concept.md 参照）
2. `wiki/index.md` にエントリ追加
3. `wiki/log.md` の先頭に操作記録追加
4. `wiki/hot.md` を更新
5. git commit

---

## 継続コマンド

```
inbox/handoff-2026-04-22-denken-wiki.md を読んで実装続行して
```
