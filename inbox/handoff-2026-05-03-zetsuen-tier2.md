# 引継ぎメモ：絶縁耐力試験ページ Tier 2 拡張

**起点**: 2026-05-03 セッションA（古舘さん）／本セッションで Tier 1 完成
**次セッション開始時の最初の指示**: `inbox/handoff-2026-05-03-zetsuen-tier2.md を読んで実装続行して`

---

## 現状

### 完了済み（本セッションで実装）

`denken-hoki-wiki.html#zetsuen-ichiran` の以下が完成：

| セクション | 状態 |
|---|---|
| GoalQuestion | ✅ 修正済（「7,000V以下の交流電路」表現） |
| ZetsuenPositionMap（3ステップカード） | ✅ 新規追加 |
| 1. 全体像（HoukiOverviewSvg + 条文表） | ✅ 公式PDF照合済 |
| ConclusionBox | ✅ 15-1表 全7区分反映 |
| 4. 法規特有表現（ブロックA） | ✅ 6行 |
| 4-D. 電圧族の用語比較 | ✅ 新規（公称/最大使用/試験/基準電圧） |
| 6. ドメイン固有フレーム（ZetsuenFrameSvg） | ✅ 新規（試験4要素フレームSVG） |
| 7. 数値実装表 | ✅ 主表3行 + 折りたたみ完全版10行 |
| なぜ0.64倍/0.72倍だけ低いのか | ✅ 物理原理（1.1×1/√3 / 1.25×1/√3） |
| 11. 試験で問われること | ✅ 新規 P1〜P8 出題パターン |
| 12. よくあるひっかけ | ✅ 6項目（公称電圧vs最大使用電圧の罠等） |
| 15. 過去問実績 | ✅ 新規 H29〜R05 の7年分 |
| 最終チェック・1分復習 | ✅ 7問（170kV以下0.72倍・60分・第14条別ルート） |

### 未着手（Tier 2 で実装）

`denken-hoki-style.md` §2 の実装型B（16セクション）に対する不足：

| # | セクション | 推奨内容 |
|---|---|---|
| 2 | 条文原文（解釈14・15条 抜粋） | e-Gov 抜粋 + 引用枠 |
| 3 | 原文解析（主語・倍率・条件の構造分解） | 表で第14・15条を分解 |
| 4-B | 言い回し集 | 「電圧を加える」「絶縁破壊しない」等 |
| 5 | かみ砕き解説（独立セクション） | 散在しているのを集約 |
| 8 | 設計フロー（mermaid） | 試験電圧計算→印加→判定の擬似コード or mermaid |
| 10 | サブトピック特殊規定 | 回転機・変圧器・直流電路の例外 |
| 13 | 穴埋め過去問チャレンジ（折りたたみ解答） | R05・R04 を3問 |

これらを追加すれば 16セクション完全準拠（実装型B）になる。所要時間 60〜90分（1セッション分）。

### 公式PDF照合状況

- ✅ 江間ペルソナが `電気設備の技術基準の解釈(令和7年11月).pdf` から第14・15条本文・15-1表を抽出して反映済み
- ✅ 出典表記：「電技解釈第15条 第一号・15-1表（令和7年11月版）」「第15条 第三号」「第16条 16-1表」
- ⏳ 第16条 16-1表（機械器具）の数値は本ページで扱わず別ページ（個別機器）に委譲予定

## Tier 2 着手前の注意

### 1. 並列セッション禁止（再々発防止）

本セッション中、別セッションが私の絶縁耐力試験ページ全変更を **無関係なメッセージで commit** した事故が発生（`a9675b0`）。詳細は `inbox/parallel-session-incident-2026-05-03.md`。

**Tier 2 着手前にユーザーに確認**：
- 他のターミナル/Claude セッションで `denken-hoki-wiki.html` を触っていないか
- auto-commit プロセス（`auto: knowledge snapshot` を出すスクリプト）の所在は判明したか

判明していなければ、Tier 2 開始前に `inbox/lock-zetsuen-ichiran.md` を作成して「私が編集中」を明示する運用を推奨。

### 2. babel_check.py を必ず実行

本セッションで作成した `babel_check.py` を Tier 2 編集後にも必ず実行：

```bash
python babel_check.py hoki
```

pre-commit フック（`.claude/hooks/pre-commit`）にも統合済み。dev-server 起動時に自動実行される。

### 3. 編集ターン数に注意

絶縁耐力試験ページは現在 **400行超のJSXブロック** になっている（function ZetsuenIchiranPage 内）。Edit ツールでの大規模リライトは old_string マッチが失敗しやすい。事故時の対処：

- 全角・半角括弧の差を疑う（特に `（）` vs `()`）
- `Read` で正確な文字列を再取得してから Edit
- 失敗が3回続いたら **Python マーカー置換**にフォールバック（前回の `_zetsuen_replace.py` パターン）

### 4. ZetsuenIchiranPage の現在の場所

`denken-hoki-wiki.html` の関数定義位置（行番号）：
- `ZetsuenPositionMap`: 約 L1530 付近
- `ZetsuenFrameSvg`: 約 L1732 付近
- `ZetsuenIchiranPage`: 約 L8654 付近（"// 5-2. ZetsuenIchiranPage" で grep 可）

## Tier 2 推奨実装順

1. **Section 2 条文原文** → 公式PDFから引用、blockquote で表示（追加 ~30行）
2. **Section 3 原文解析** → 第14・15条の主語・原則・例外・委任 を表分解（追加 ~30行）
3. **Section 8 設計フロー（mermaid）** → 試験電圧計算→印加→判定の手順（追加 ~40行）
4. **Section 5 かみ砕き解説（独立化）** → 既存散在内容の集約（追加 ~30行）
5. **Section 10 特殊規定** → 回転機・変圧器・直流電路の例外（追加 ~30行）
6. **Section 13 穴埋め過去問** → R05・R04 を3問・details で折りたたみ（追加 ~40行）
7. **Section 4-B 言い回し集** → 「電圧を加える」「絶縁破壊しない」等の表（追加 ~20行）

合計追加 ~220行。ZetsuenIchiranPage は ~620行 になる見込み。

## 関連ファイル

- 本体: `denken-hoki-wiki.html`
- スタイル規範: `.claude/rules/denken-hoki-style.md` §2 §7
- HTML検証: `babel_check.py`、`wiki_verify.py`
- 公式PDF: `C:\Users\kfuru\OneDrive\デスクトップ\01_資格・勉強\電験3種\法令\電気関係法令\電気設備の技術基準の解釈(令和7年11月).pdf`
- 並列事故記録: `inbox/parallel-session-incident-2026-05-03.md`
- Babel事故知識: `knowledge/babel-inline-react-global-failure.md`

---

**最終確認**: 2026-05-03 / Tier 1 完了後の引継ぎ
