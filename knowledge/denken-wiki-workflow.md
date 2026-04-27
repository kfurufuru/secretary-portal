---
title: "電験Wiki構築スキャフォルド — ページ追加フロー・PDF読取・落とし穴"
category: "電験3種"
level: "published"
created: "2026-04-26"
last_reviewed: "2026-04-26"
understanding_score: 4
source: "denken-wiki構築セッション（2026-04-22）"
tags: ["電験3種", "Wiki", "PDF読取", "プロセス自動化", "知識管理"]
related: ["[[claude-code-knowledge-pipeline]]", "knowledge/cc-playbook.md"]
---

# 電験Wiki構築スキャフォルド — ページ追加フロー・PDF読取・落とし穴

## TL;DR

電験Wiki（denken-study/wiki/）の27ページ目基盤は完成。新規ページ追加は **5ステップフロー** で確実。PDF読取は **画像変換必須**（テキスト抽出不可の理由：MeiryoUIフォント埋め込み）。最大の落とし穴は推測タイトルの無検証化。

---

## 1. Wiki構造の完全な形

### ディレクトリ構成（構築済み・27ページ）

```
denken-study/wiki/
├── index.md                 # エントリーポイント
├── log.md                   # 操作記録（時系列追記のみ）
├── hot.md                   # 最新更新10件
├── overview.md              # 4分野の俯瞰図
│
├── themes/                  # 4科目ハブ
│   ├── 電気理論.md
│   ├── 電力.md
│   ├── 機械.md
│   └── 法規.md
│
├── entities/                # 学習対象13個
│   ├── 電磁気.md
│   ├── 電気回路.md
│   ├── 電子理論.md
│   ├── 電気及び電子計測.md
│   ├── 回転機.md
│   ├── 変圧器.md
│   ├── 自動制御.md
│   ├── 水力発電.md
│   ├── 火力発電.md
│   ├── 送電線路.md
│   ├── 電気事業法.md
│   ├── 電気設備技術基準及びその解釈.md
│   └── 電気施設管理.md
│
├── concepts/                # （未使用・拡張予定）
├── questions/               # 過去問（未開始）
├── synthesis/               # 統合分析（未開始）
├── sources/                 # PDF情報源・4個
│   ├── 電験王-法規-令和4年度版.md
│   ├── 電験王-理論-令和4年度版.md
│   ├── 電験王-機械-令和4年度版.md
│   └── 電験王-電力-令和4年度版.md
│
├── meta/
│   └── dashboard.md         # Dataviewクエリ（動作確認済み）
│
└── _templates/
    ├── concept.md           # 新規エンティティ用
    ├── question.md          # 過去問用
    └── source.md            # PDF情報源用
```

**ページ数実績**: entities 13 + themes 4 + sources 4 + その他 6 = **27ページ**

---

## 2. ページ追加の5ステップフロー

### 追加例：配電エンティティ（優先度：高）

**ステップ1: テンプレート確認と新規ファイル作成**
```
1. _templates/concept.md を Read
2. wiki/entities/配電.md を新規作成
3. frontmatter: title / date / related を埋める
4. 記載内容: 電圧降下計算 / 力率改善 / 単相3線式
```

**ステップ2: index.md にエントリ追加**
```
entities/ セクション内に [[配電]] リンク追加
```

**ステップ3: log.md に操作記録追加**
```
記入位置: 先頭（時系列は降順）
形式: "2026-04-26: 配電.md 新規作成 | 電圧降下・力率改善対応"
```

**ステップ4: hot.md を更新**
```
最新10件リストを手動編集（または Dataview で自動化）
```

**ステップ5: git commit**
```bash
git add denken-study/wiki/entities/配電.md denken-study/wiki/index.md denken-study/wiki/log.md
git commit -m "wiki: 配電エンティティ追加（電圧降下・力率改善）"
```

---

## 3. PDF読取の確実な手順

### 問題の背景

**電験王PDFはテキスト抽出不可** → 理由：MeiryoUIフォント埋め込みで OCR不可

### 解決方法：画像変換ルーチン

```python
import fitz, os

# Base directory
base = r'C:\Users\kfuru\OneDrive\デスクトップ\01_資格・勉強\電験3種'

# PDF を開く
pdf_path = os.path.join(base, '電験王 過去問_法規.pdf')
doc = fitz.open(pdf_path)

# 特定ページを画像化（1.5倍アップスケーリング）
mat = fitz.Matrix(1.5, 1.5)  # 解像度: 1.5倍（150%）
pix = doc[page_index].get_pixmap(matrix=mat)

# temp.png に保存（workspace: denken-study/.raw/）
pix.save(r'C:\Users\kfuru\.secretary\denken-study\.raw\temp.png')
doc.close()
```

### その後のフロー

1. 画像ファイル生成 → `.raw/temp.png`
2. Claude Code で `Read('.raw/temp.png')` → ビジョン読取で内容取得
3. マークダウンに手書き変換（計算式・複雑図は正確性重視）

### 電力PDFのファイル名に注意

**`電験王 過去問‗電力.pdf`** — `‗` は U+2017（DOUBLE LOW LINE）。通常の `_`（U+005F）ではない。

**安全な取得方法**:
```python
files = os.listdir(base)
denki_pdf = [f for f in files if '電力' in f][0]  # ファイル名判定で確実
```

---

## 4. 落とし穴と検証パターン

### 大落とし穴：推測タイトルの無検証

**現象**: by-field.md の「電力系統・需給運用」セクション → 外部検証なしで AI推測タイトル入力 → 実際の出題問題と不一致

**被害例**:
- 旧セクション名は存在しない可能性あり（電験王3で確認不可）
- 当該問問のセクション分類を再調査する手間発生

**検証ルール**:
1. **電験王3で確認必須**: 各セクション名・問番号を `https://denken-ou.com/` で照合
2. **URL規則の把握**:
   - R04〜R07: `https://denken-ou.com/denryoku{科目}r{N}-{1|2}-{問番号}/`（上下期あり）
   - R01〜R03: `https://denken-ou.com/denryoku{科目}r{N}-{問番号}/`（上下期なし）
   - 科目プレフィックス: `denryoku`(電力) / `riron`(理論) / `houki`(法規)
3. **スポット照合フロー**:
   - セクション作成前に該当年度の問を2-3問サンプル確認
   - セクション名・タイトルに疑問あれば複数年度比較

---

## 5. 優先度別タスク一覧

### 優先度：高

**タスク1: 配電エンティティ作成** (電力)
- ファイル: `wiki/entities/配電.md`
- テーマ: 電圧降下計算（√3×I×(Rcosφ+Xsinφ)） / 力率改善 / 単相3線式
- 推定工数: 30分

**タスク2: パワーエレクトロニクスエンティティ作成** (機械)
- ファイル: `wiki/entities/パワーエレクトロニクス.md`
- テーマ: 三相整流回路の出力電圧計算 / インバータ / PWM
- 推定工数: 40分

**タスク3: 変圧器↔電気施設管理 クロス参照リンク追加**
- 既存ファイル: `entities/変圧器.md` / `entities/電気施設管理.md`
- 対応: 全日効率計算式の重複 → `related` 相互リンク追加
- 推定工数: 15分

### 優先度：通常

**タスク4: 過去問ページ作成開始** (questions/)
- 開始対象: 令和3年法規 全13問
- ファイル名形式: `R03-法規-問01.md` 〜 `R03-法規-問13.md`
- 読取方法: PDF画像化 → ビジョン読取 → マークダウン整形
- 推定工数: 3-4時間（全13問）

**タスク5: 電力 送電線路 追加トピック**
- 既存ファイル: `entities/送電線路.md`
- 追加内容: コロナ放電 / 誘電損 / 充電電流（地中ケーブル）
- 推定工数: 20分

### 優先度：低

**タスク6: Dataviewダッシュボード動作確認**
- ファイル: `wiki/meta/dashboard.md`
- 検証: Obsidian上で開いて Dataviewクエリが正常レンダリングするか確認
- 推定工数: 10分

---

## 6. 実践メモ

### テンプレート継承の順序

新規 entities/ ページを作成する際の frontmatter 最小セット:

```markdown
---
title: "エンティティ名"
date: 2026-04-26
field: "理論 | 電力 | 機械 | 法規"
related: [["関連エンティティ1"], ["関連エンティティ2"]]
---
```

### wiki 運用を効率化するモード

- **対話モード**: Claude Code + 画像化ルーチンで 1ページ 20-40分
- **自動モード**: questions/ 大量作成時は並列エージェント推奨（複数ページ並走）
- **検証モード**: 月1回のスポット確認で推測タイトル弱点発見・修正

---

## 関連ナレッジ

- [[denken-wiki-expansion]] — 監査・検証チェックリスト・推測タイトル問題パターン
- [[claude-code-knowledge-pipeline]] — L1→L2 昇格フロー・知識蓄積メカニズム
