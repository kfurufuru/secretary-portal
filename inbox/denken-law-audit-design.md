# denken_law_audit.py 設計案

**作成日**: 2026-05-02
**作成者**: Claude Code（古舘さん指示）
**ステータス**: 設計案（実装は次フェーズ）
**背景**: 電技省令56条記事 v3.0で許容電流値を完全誤記（1.6mm 11A → 正：27A 等）。サイトが使い物にならなくなる事故。再発防止の自動検証を導入する。

## BLUF（結論）

denken-wiki配下の `*.md` から法令数値を grep 抽出し、**既知の正解値マスタ**と照合する Python スクリプトを `C:\Users\kfuru\.secretary\denken_law_audit.py` に新設する。`claude_md_audit.py` と同じ位置・同じ運用思想（手元で `python` 一発／月次総点検／CI連携は将来）。

実装は次セッションで行う。本ドキュメントは仕様凍結用。

---

## 1. 機能仕様

### 機能1: 数値表の自動抽出

denken-wiki配下の `*.md`（`docs/articles/kijun/*.md` を主、`docs/articles/kaishaku/*.md` を将来拡張）から、**法令数値らしきパターン**を正規表現で抽出する。

| 種別 | 正規表現 | 例 |
|---|---|---|
| 許容電流 | `([0-9.]+\s*mm[²2]?)\s*[^\n]{0,30}?([0-9]+)\s*A` | `1.6mm ... 27A` |
| 絶縁抵抗 | `([0-9]+)\s*V[^\n]{0,30}?([0-9.]+)\s*MΩ` | `300V以下 0.2MΩ` |
| 遮断時間 | `([0-9.]+)\s*秒(以内|以下)?` | `0.1秒以内` |
| 電圧区分 | `([0-9,]+)\s*V` の前後10文字 | `7,000V以下` |
| 接地抵抗 | `([0-9]+)\s*Ω` | `10Ω以下` |
| 電流減少係数 | `([0-9]+)\s*条[^\n]{0,20}?(0\.[0-9]+)` | `4条 0.63` |

**抽出単位**: 1ファイル1リスト。Match オブジェクトには `(line_num, raw_text, category, key, value)` を保持する。

**抽出対象外**:
- コードブロック内（```...``` 間）の数値はスキップ（サンプルコード・例題のため誤検出を生む）
- `[要確認]` フラグ付き行は出力するがカテゴリを「unverified」にする

### 機能2: 既知の正解値との照合

**既知の正解値マスタ**を `KNOWN_VALUES` 辞書として保持（次節 §2 参照）。

照合ルール：
1. 抽出した `(category, key)` を `KNOWN_VALUES` で lookup
2. ヒット時：value が一致 → ✅ / 不一致 → ❌
3. ミス時：⚠️（未知の数値、人手確認が必要）

**正規化**:
- 全角→半角変換（`１．６ｍｍ` → `1.6mm`）
- 空白除去（`27 A` → `27A`）
- 単位記号統一（`Ω` `Ω`、`MΩ` `ＭΩ` 統一）

### 機能3: 検出結果のレポート

```
denken_law_audit.py 検査結果（2026-05-02 14:23）
==========================================

[ファイル] docs/articles/kijun/56.md
✅ L243 "1.6mm 27A" — 解釈第146条 別表第1 と一致
✅ L244 "2.0mm 35A" — 解釈第146条 別表第1 と一致
⚠️ L267 "管内 0.70" — 出典行（「電技解釈第146条 別表第3」等）が前後10行に未検出。出典追加推奨
❌ L42 "0.05秒以内" — 既知の正解値（0.1秒以内）と不一致。再確認必須

[ファイル] docs/articles/kijun/14.md
（記述なし）

集計：
- ✅ 一致: 18件
- ⚠️ 出典なし: 3件
- ❌ 不一致: 1件
- スキャン対象: 23ファイル / 7,432行
```

**出力先**:
- 標準出力（人間確認用）
- `health-monitor/denken-law-audit-results.json`（機械可読、portal-v2.html 連携可能性を将来検討）

### 機能4: 実行モード

```bash
# 全記事スキャン（既定）
python denken_law_audit.py

# 特定記事のみ
python denken_law_audit.py kijun/56.md

# 出典なしのみ警告
python denken_law_audit.py --warn-no-source

# 不一致のみ表示（CIモード相当）
python denken_law_audit.py --check-only

# 終了コードを問題件数に応じて変える（CI想定）
# 0: 全✅ / 1: ⚠️あり / 2: ❌あり
python denken_law_audit.py --strict
```

**追加オプション**:
- `--json`: JSON形式で stdout 出力
- `--quiet`: ✅ を抑制し ⚠️❌ のみ表示
- `--update-results`: `health-monitor/denken-law-audit-results.json` を更新する

---

## 2. 既知の正解値マスタ（構造案）

### 2.1 データ構造

```python
KNOWN_VALUES = {
    "denken-kaishaku-146-table1": {
        "_meta": {
            "title": "電技解釈第146条 別表第1（許容電流・600V PVC・周囲温度30℃以下）",
            "source_url": "https://www.meti.go.jp/policy/electricpower_partialamendment/...",  # 要WebFetch確認
            "verified_date": "2026-05-02",
            "verified_by": "[未確認]",
            "category": "ampacity",
        },
        "values": {
            ("許容電流", "1.6mm 単線"): "27A",
            ("許容電流", "2.0mm 単線"): "35A",
            ("許容電流", "2.6mm 単線"): "48A",
            ("許容電流", "3.2mm 単線"): "62A",
            ("許容電流", "2mm² 撚線"): "27A",
            ("許容電流", "3.5mm² 撚線"): "37A",
            ("許容電流", "5.5mm² 撚線"): "49A",
            ("許容電流", "8mm² 撚線"): "61A",
        },
    },
    "denken-kaishaku-146-table3": {
        "_meta": {
            "title": "電技解釈第146条 別表第3（電流減少係数）",
            "verified_date": "[要確認]",
        },
        "values": {
            ("電流減少係数", "3条以下"): "0.70",
            ("電流減少係数", "4条"): "0.63",
            ("電流減少係数", "5～6条"): "0.56",
            ("電流減少係数", "7～15条"): "0.49",
        },
    },
    "denken-shorei-58": {
        "_meta": {
            "title": "電技省令第58条（低圧電路の絶縁性能）",
            "verified_date": "[要確認]",
        },
        "values": {
            ("絶縁抵抗", "150V以下"): "0.1MΩ",
            ("絶縁抵抗", "150V超300V以下"): "0.2MΩ",
            ("絶縁抵抗", "300V超"): "0.4MΩ",
        },
    },
    # 以下、第14条（過電流遮断）・第15条（地絡遮断）・第16条（電圧低下）等を順次追加
}
```

### 2.2 サンプル20項目（次フェーズで WebFetch 検証）

| # | カテゴリ | キー | 値 | 出典（要確認） |
|---|---|---|---|---|
| 1 | 許容電流 | 1.6mm 単線 | 27A | 解釈第146条 別表第1 |
| 2 | 許容電流 | 2.0mm 単線 | 35A | 同上 |
| 3 | 許容電流 | 2.6mm 単線 | 48A | 同上 |
| 4 | 許容電流 | 3.2mm 単線 | 62A | 同上 |
| 5 | 許容電流 | 2mm² 撚線 | 27A | 同上 |
| 6 | 許容電流 | 3.5mm² 撚線 | 37A | 同上 |
| 7 | 許容電流 | 5.5mm² 撚線 | 49A | 同上 |
| 8 | 許容電流 | 8mm² 撚線 | 61A | 同上 |
| 9 | 電流減少係数 | 3条以下 | 0.70 | 解釈第146条 別表第3 |
| 10 | 電流減少係数 | 4条 | 0.63 | 同上 |
| 11 | 電流減少係数 | 5～6条 | 0.56 | 同上 |
| 12 | 電流減少係数 | 7～15条 | 0.49 | 同上 |
| 13 | 絶縁抵抗 | 150V以下 | 0.1MΩ | 省令第58条 |
| 14 | 絶縁抵抗 | 150V超300V以下 | 0.2MΩ | 同上 |
| 15 | 絶縁抵抗 | 300V超 | 0.4MΩ | 同上 |
| 16 | 過電流遮断時間（低圧配電線） | 定格の2倍 | 2分以内 | 解釈第33条（要確認） |
| 17 | 高圧電路 接地抵抗 | A種接地 | 10Ω以下 | 解釈第17条 |
| 18 | 低圧電路 接地抵抗 | D種接地 | 100Ω以下 | 同上 |
| 19 | 電圧区分 | 低圧（交流） | 600V以下 | 省令第2条 |
| 20 | 電圧区分 | 高圧（交流） | 600V超〜7,000V以下 | 同上 |

> **注**: 行動原則 #9（信頼度チェック）に従い、上記値のうち eGov公式PDF未確認のものは `[要確認]` フラグを `_meta.verified_date` に明記する。実装フェーズで WebFetch して確定させる。

---

## 3. ファイル構造

```
C:\Users\kfuru\.secretary\
├── denken_law_audit.py            # 本体
├── denken_law_audit_data.py        # KNOWN_VALUES のみ分離（メンテ性向上）
├── tests\
│   └── test_denken_law_audit.py    # pytest
└── health-monitor\
    └── denken-law-audit-results.json  # 機械可読レポート
```

### 3.1 関数構造

```python
# denken_law_audit.py
def extract_numbers(file_path: Path) -> List[Match]
def normalize_value(raw: str) -> str
def check_value(match: Match, known: Dict) -> Status  # OK / MISMATCH / UNKNOWN
def find_source_nearby(file_path: Path, line_num: int, span: int = 10) -> bool
def format_report(results: List[Result], mode: str = "human") -> str
def main(argv: List[str]) -> int  # 終了コード
```

### 3.2 設計判断

| 項目 | 採用 | 不採用 | 理由 |
|---|---|---|---|
| 配置 | `.secretary/` 直下 | `denken-wiki/scripts/` 配下 | `claude_md_audit.py` と同居・同コマンド体系で統一 |
| 言語 | Python | Node.js | 既存ツール資産（wiki_verify.py 等）と統一 |
| 抽出 | 正規表現 | パーサー（mistune等） | コードブロック除外さえできれば正規表現で十分。依存最小化 |
| マスタ | dict 直書き | YAML/JSON 外出し | 出典コメントを diff で追える方が保守性高い（行動原則 #12 に整合） |
| 出力 | stdout + JSON | DB | `claude_md_audit.py` と統一。portal-v2 連携は JSON 経由 |

---

## 4. CLAUDE.md行動原則との整合

| 原則 | 適用 |
|---|---|
| #1 PlanMode | 本ドキュメント＝事前計画 |
| #1 テスト・自己修正 | pytest 必須。56.md v4.0（修正済み）に対し全✅となること、意図的に値を壊した fixture で❌が出ることを確認 |
| #4 検証してから完了宣言 | 実装後に「シニアエンジニアはこれを承認するか？」を自問 |
| #9 信頼度チェック | KNOWN_VALUES の各値は eGov公式未確認なら `[要確認]` 付きで保持 |
| #12 自己学習 | 検出された誤記パターンを `knowledge/claude-lessons.md` に記録するフロー |
| #13 同じミス回避 | 56条事故を学びとして「数値=自動検証」をルール化 |
| #14 Subagent戦略 | 並列エージェントが書き換える数値も KNOWN_VALUES と不一致になれば検出される（誤魔化し防止） |

---

## 5. 運用フロー

| タイミング | 実行内容 | 担当 |
|---|---|---|
| 新規記事執筆後 | `python denken_law_audit.py kijun/<N>.md` | 執筆者 |
| 既存記事改訂後 | 同上 | 改訂者 |
| 月次総点検（月初） | `python denken_law_audit.py --strict` | 古舘さん |
| 並列エージェント完了直後 | 同上（吐かせた数値の自動検証） | Claude Code |
| CI連携（将来） | git pre-commit hook で `--strict` 自動実行、❌で commit 拒否 | 自動化フェーズ |

### 5.1 並列エージェントワークフローへの組み込み

```
1. handoff.md にプラン記載
2. 並列エージェント実行（Markdown生成）
3. ★ python denken_law_audit.py <生成ファイル> --strict
4. ❌があれば差し戻し、エージェント再実行
5. 全✅で human review へ
```

これにより「概念用の数値」と称した独自数値の混入を機械的に弾ける。

---

## 6. 既知の正解値マスタの拡張ルール

- 新しい数値・条文番号を確認したら `KNOWN_VALUES` に追加
- 追加時は **必ず** `_meta` に以下を明記：
  - `title`: 出典名（条文番号・別表番号まで）
  - `source_url`: eGov 公式URL
  - `verified_date`: 確認日（YYYY-MM-DD）
  - `verified_by`: 確認者（古舘さん／Claude Code＋WebFetch等）
- 月次レビューで `verified_date` が古い項目（>180日）を抽出し、公式PDF再確認
- 公式PDFが改訂された場合は `verified_date` を更新し、変更点を git commit メッセージに明記

### 6.1 追加運用コマンド（将来）

```bash
# 鮮度確認（180日超を一覧表示）
python denken_law_audit.py --list-stale --days 180

# マスタの全項目をMarkdownで出力（ドキュメント生成）
python denken_law_audit.py --dump-master > knowledge/denken-law-master.md
```

---

## 7. 制約と限界

1. **既知の数値のみチェック**: 未知の数値は検出できない。マスタ拡張で対応
2. **公式改訂への自動追従なし**: 改訂検知は手動。月次レビューで担保
3. **正規表現の限界**:
   - 「mm」表記揺れ（`mm` `ｍｍ` `ミリ`）は normalize で吸収するが完全ではない
   - 文脈依存の単位（「以下」「以上」「未満」）は別フィールドで保持しないと誤判定する
4. **コードブロック内のスキップ**: ` ``` ` のネストや indented code block には未対応（要件次第で対応）
5. **複数値の同居**: `1.6mm/2.0mm 27A/35A` のような圧縮表記は分解できない可能性あり。執筆ルールで「1行1値」を推奨

---

## 8. テスト計画

### 8.1 pytest 必須ケース

```python
# tests/test_denken_law_audit.py

def test_extract_ampacity_correct():
    """1.6mm 27A が正しく抽出される"""
def test_extract_ampacity_normalized():
    """１．６ｍｍ ２７Ａ（全角）も抽出される"""
def test_check_match_ok():
    """KNOWN_VALUES と一致する値は OK"""
def test_check_mismatch():
    """1.6mm 11A（誤記）は MISMATCH（56条事故の再現）"""
def test_check_unknown():
    """マスタにない値は UNKNOWN"""
def test_skip_codeblock():
    """``` ``` 内の数値はスキップ"""
def test_source_detection():
    """前後10行に「解釈第146条」があれば has_source=True"""
def test_exit_code_strict():
    """--strict で ❌があれば exit 2"""
```

### 8.2 回帰テスト fixture

`tests/fixtures/56-broken.md`（意図的に誤記した版）を用意し、❌が必ず検出されることを保証する。56条事故の自動回帰テスト。

---

## 9. 実装フェーズへの引き継ぎ

次セッションで以下を実行：

1. WebFetch で eGov公式PDFから KNOWN_VALUES サンプル20項目を確定
2. `denken_law_audit.py` 本体実装
3. `tests/test_denken_law_audit.py` 実装＋実行
4. `docs/articles/kijun/56.md`（v4.0）に対し全✅となるか確認
5. 意図的破損 fixture で❌検出を確認
6. `health-monitor/denken-law-audit-results.json` 初回生成
7. CLAUDE.md「Wiki編集ワークフロー」セクションに「数値変更後の必須検証」を追記
8. 完了宣言（pushまでがセット）

---

## 参照

- 上位: `CLAUDE.md` §HTMLコーディングルール / §Wiki編集ワークフロー / 行動原則 #9 #12 #13 #14
- 同列: `claude_md_audit.py`（CLAUDE.md整合性監査・参考実装）
- 同列: `wiki_verify.py`（DOM検証・並走ツール）
- 事故記録: 電技省令56条 v3.0 許容電流値誤記事故（2026-05-02）
- 関連スタイル: `.claude/rules/denken-hoki-style.md`（条文記事の14セクション化）
