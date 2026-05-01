---
title: 電験3種 法規Wiki — 過去問実績の誤記修正（第2条 他）引継ぎ
date: 2026-05-01
status: 完了（2026-05-01）— P1+P2+P3全て解消、頻度監査+pre-commitフックも追加
previous_session: 第5条ページ修正・チェッカースクリプト作成
completed_session: 2026-05-01
completion_summary: |
  - 2.md(第2条): 誤記6件→H26問5の1件に訂正、頻度★★★★★→★☆☆☆☆
  - 11.md/56.md/58.md: 過去問テーブル誤記を修正、by-field.md空欄補完
  - 全21ページの出題頻度を実データで再校正（11件不整合→0件）
  - 21/57.md: 出題実態を追加（過小評価を修正）
  - 32/59/64.md: 過大評価を下方修正
  - 5.md関連のby-field.md補完（H10問2/R01問3/R05下問3/R06下問3を追加）
  - 新規ツール: scripts/audit_frequency.py（自動頻度監査）
  - pre-commitフック追加: scripts/hooks/pre-commit（再発防止）
---

# 法規Wiki 過去問実績誤記修正 引継ぎ

## このセッションでやったこと（前セッション）

| 作業 | ファイル | 状態 |
|------|---------|------|
| 第5条 過去問実績の誤記訂正（R04上問12/R01問11/H29問12 → H10問2/H24問5/R01問3/R05下問3/R06下問3） | `denken-wiki/docs/articles/kijun/5.md` | 完了・push済 (cb004d1) |
| 第5条 出題頻度更新（2-3回 → 4回/14年 ★★★★☆） | 同上 | 完了・push済 |
| 第5条 セクション8/13 視覚改善（admonition + カテゴリ分け） | 同上 | 完了・push済 |
| pymdownx.tasklist 拡張有効化（クリック式チェックボックス） | `denken-wiki/mkdocs.yml` | 完了・push済 |
| task-checkbox.js 作成（localStorage保存・進捗ラベル） | `denken-wiki/docs/javascripts/task-checkbox.js` | 完了・push済 |
| custom.css 拡張（チェックボックスのprimary色塗り＋白チェック） | `denken-wiki/docs/stylesheets/custom.css` | 完了・push済 |
| 整合性チェッカー作成 | `denken-wiki/scripts/check_kakomon_consistency.py` | 完了・push済 |

---

## 検出された他ページの誤記（チェッカー実行結果）

`python scripts/check_kakomon_consistency.py` を実行したら、22ページ中 **14件の不整合** を検出。

### P1（最優先）— 第2条 6件すべて誤記の疑い

第5条と同じパターン（Notion DBに誤記が連続）。

| ページの主張 | by-field.md の実際 | 判定 |
|------|------|------|
| R05上 問11: 電圧の種別（直流・交流の境界値） | 2つの工場を合わせた需要率及び総合負荷率（計算） | ❌ |
| R03 問11: 低圧・高圧・特別高圧の定義 | 支線の引張荷重と必要条数 | ❌ |
| R01 問12: 直流・交流別の種別判定 | 力率改善 | ❌ |
| H30 問11: 電圧種別の数値 | （by-field.md に該当なし） | ❌ |
| H28 問11: 直流750V・交流600Vの根拠 | 地絡遮断装置 | ❌ |
| H26 問11: 種別境界値 | （by-field.md に該当なし） | ❌ |

**やること**: 第2条（電圧の種別）が実際にいつ出題されたかをネット調査して 2.md を修正。

第5条と同じ手順:
1. `denken-ou.com`, `yaku-tik.com`, `denken3web.com` で「電験三種 法規 第2条 電圧の種別 過去問」を検索
2. 各年度の問題タイトル一覧を取得して照合
3. 実際の出題年度・問番号・形式を確定
4. 2.md の `## XX. 過去問実績` テーブルを差し替え

### P2 — その他のページの不整合

| ページ | 件数 | 内容 |
|------|----|------|
| 11.md | 1件 | H25 問5（接地抵抗計算）→ by-field.md は「アーク器具」。**H25問13と取り違えの可能性** |
| 56.md | 3件 | by-field.md側の論点が「-」（空欄）→ **by-field.md の補完が必要** |
| 58.md | 2件 | H29問2「絶縁抵抗」 / H23問2「測定条件」 が by-field.md と完全に異なる |

### P3 — 5.md の補完

- H10 問2: H23-R07下範囲外（参考表記なので問題なし、ただしby-field.mdに「再出題系列の元」として追記する選択肢あり）
- R01 問3: by-field.md に未登録 → by-field.md 側に追加（既存の「電気事業法」セクション or 「その他技術基準」セクションに追加）

---

## 次セッションのメインタスク

### Plan A（推奨・60分）: 第2条修正をフルで実施

1. **ネット調査（20分）**
   - WebSearch: `電験三種 法規 第2条 電圧の種別 過去問 出題年度`
   - WebFetch で `denken-ou.com/h26/`, `denken-ou.com/h28/`, `denken-ou.com/h30/`, `denken-ou.com/r1/`, `denken-ou.com/r3/`, `denken-ou.com/r5-1/` を順に確認
   - **問11 が本当に第2条かを各年度で確認**

2. **2.md 修正（20分）**
   - `denken-wiki/docs/articles/kijun/2.md` を Read
   - 「過去問実績」テーブルを正データに差し替え
   - 出題頻度を実際の値に更新
   - 穴埋め過去問チャレンジセクションがあれば引用元を訂正
   - バージョンスタンプを v1.X → v1.X+1 に更新

3. **検証（10分）**
   - `python scripts/check_kakomon_consistency.py --page 2` で不整合が0件になるか確認
   - mkdocs build でレンダリング確認

4. **commit & push（10分）**
   - メッセージ例: `fix: kijun/2.md 過去問実績訂正（第2条の出題年度を実証ベースに更新）`

### Plan B（軽量・15分）: pre-commit hook追加

`.git/hooks/pre-commit` に以下を追加:
```bash
#!/bin/bash
cd "$(git rev-parse --show-toplevel)"
python scripts/check_kakomon_consistency.py --strict
```

これでコミット時に自動で整合性チェックが走り、誤記入りのコミットを防げる。

---

## 重要な作業ルール（必須）

### 電気法令の正確性（CLAUDE.md より）

> 電気法令の条文・数値はeGov公式未確認なら信頼度<70%扱い → エージェントプロンプトに含めず「要確認」フラグ付きで出力する

**今回の手順**:
1. ネット調査結果を **複数のソース（最低2つ）** で照合してから2.mdに書く
2. 単一ソースしかない情報は「要再確認」コメントを残す
3. e-Gov公式が確定情報源（ただしJSレンダリングのため WebFetch 不可 → 別手段必要）

### Wiki編集ワークフロー（CLAUDE.md より）

```
1. Grep → 行番号特定
2. Read ±20行のみ
3. Edit 適用
4. python scripts/check_kakomon_consistency.py --page 2  ← 検証
```

- HTMLファイル全体Read禁止（11K行 ≒ 8,000tokens）
- mkdocs build はフィルタする: `python -m mkdocs build 2>&1 | grep -iE "error|warning" | head -10`

---

## 関連ファイル一覧

| 役割 | パス |
|------|------|
| 第2条ページ（修正対象） | `C:\Users\kfuru\Projects\denken-wiki\docs\articles\kijun\2.md` |
| 一次ソース | `C:\Users\kfuru\Projects\denken-wiki\docs\kakomon\by-field.md` |
| 整合性チェッカー | `C:\Users\kfuru\Projects\denken-wiki\scripts\check_kakomon_consistency.py` |
| 第5条ページ（修正済み参考例） | `C:\Users\kfuru\Projects\denken-wiki\docs\articles\kijun\5.md` |

---

## 推奨ネット調査URL（信頼度順）

1. **電験王3** https://denken-ou.com/hoki/ — 法規問題一覧
2. **電験三種まとめました** https://yaku-tik.com/denken/category/kako/ — 年度別解説
3. **電験3種Web** https://denken3web.com/ — 個別問題解説
4. **e-Gov 法令検索** https://laws.e-gov.go.jp/document?lawid=409M50000400052 — 公式条文（JS必要・curl + 別パース）

---

## 学びと改善（前セッション）

### 内容面

- **Notion過去問DB は信頼度<70%** — 連続して誤記が発見される
- **再出題系列の追跡が重要** — 例：H10問2 → R05下問3 → R06下問3
- **by-field.md のカテゴリ分類が大ざっぱ** — R05下問3 を「保安原則§1〜§4」に括っているが実際は §5（電路の絶縁）

### プロセス面

- **mkdocs serve は extra_css の自動再ロードが不安定** — CSS編集後はサーバ再起動必須
- **getComputedStyle はライブ参照** — 状態比較するなら JSON.stringify で即時スナップショット
- **preview_eval は ?クエリ文字列でブロック** — cache buster は header で代替

### トークン消費改善 (CLAUDE.md追加候補)

```markdown
- mkdocs build/serve のログは必ずフィルタ: `... 2>&1 | grep -iE "error|warning" | head -10`
- e-Gov は `laws.e-gov.go.jp` 直URL（旧 elaws はリダイレクト往復ロス）
- CSS/JS の serve 反映確認は curl + grep（browser eval より軽い）
- getComputedStyle はライブ参照: 状態比較するなら JSON.stringify で即時スナップショット
- preview_eval / javascript_tool に `?` クエリ文字列を含めない（ブロックされる）
```

---

## 自分宛メモ

- 第2条修正の前に **必ず** `python scripts/check_kakomon_consistency.py --page 2` を実行して現状の不整合をリスト化してから着手
- 不整合の数（6件）を最後にゼロにすることが完了条件
- commit のメッセージは前回（cb004d1）のフォーマットに合わせる
- push後 GitHub Pages の反映に1-2分かかることを意識
