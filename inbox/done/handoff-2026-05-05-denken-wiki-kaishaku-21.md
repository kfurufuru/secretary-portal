# 引継ぎ: denken-wiki 解釈第21条 復旧 + §22 監査の宿題

**日付**: 2026-05-05
**前任セッション**: competent-murdock-dee357 worktree（claude/competent-murdock-dee357 ブランチ）
**対象リポジトリ**: `C:/Users/kfuru/denken-wiki-master/`（master ブランチ・GitHub Pages 自動デプロイ）

---

## 完了済み作業（このセッションでpush済み）

### 1. 解釈第21条「アークを生じる器具の施設」誤記事 → revert

- **誤記事の commit**: 75e92be（`feat(kaishaku/21): 解釈第21条「アークを生じる器具の施設」新規作成 v1.0`）
- **revert commit**: 396cfc3
- 原因: 私が条文番号を取り違えた。確信度<70%のまま「未確認」と書いて出してしまった。

### 2. 解釈第21条「高圧の機械器具の施設」正規版作成

- **新規ファイル**: `docs/articles/kaishaku/21.md`（662行・v1.0）
- **テンプレート**: `kijun/58.md` v2.2 ゴールドスタンダード準拠（14セクション＋監修ログ）
- **条文ソース**: 電験王3 R05下問4 解説（denken-ou.com/houkir5-2-4）と jeea.or.jp で照合
- **構造**: 5号構成＋ただし書（発電所・変電所・開閉所等は適用外）
    - 一号: 屋内・取扱者以外立入禁止
    - 二号: さく・へい等＋（高さ＋距離）= 5m以上＋危険である旨の表示（工場構内はロ・ハ省略可）
    - 三号: 地表上 4.5m（市街地外 4m）以上＋附属高圧電線=ケーブル/引下げ用絶縁電線
    - 四号: コンクリ箱 又は D種接地工事金属箱＋充電部露出なし
    - 五号: 充電部露出なし機械器具＋簡易接触防護等
- **過去問実績**: R06上問4・R05下問4・R04下問3・H21問6（4件・kakomon DB から反映）
- **重要度**: B（🔥🔥🔥🔥）

### 3. テーマページ §38→§21 修正

- **対象**: `docs/themes/koatsu-kiki-shisetsu.md`（v1.1→v1.2）
- 数値情報（5m / 4.5m / 4m / 危険である旨）は元から正しい。条文番号だけ全文置換。
- 関連条文表を整理し、§38（避雷器）との混同警告を強化。

### 4. 索引・ナビ整合

- `docs/articles/kaishaku/index.md`: 第1章「第1〜21条」へ拡張・第20条/21条追加
- `docs/articles/index.md`: 解釈件数 38→39件・第21条 🔥🔥🔥🔥 B 追加
- `mkdocs.yml`: サイドナビ第21条挿入・テーマナビ §38→§21

### コミット履歴（master）

```
最新 → e10c5b8 feat(kaishaku/21): 解釈第21条「高圧の機械器具の施設」正規版v1.0 + テーマ§38→§21修正
       426e093 Revert "feat(kaishaku/21): 解釈第21条「アークを生じる器具の施設」新規作成 v1.0"
       2e1823a fix: 117条記事の数値根拠ガード追加＋kakomon.yml R06上問6を§117へ訂正
       75e92be feat(kaishaku/21): 解釈第21条「アークを生じる器具の施設」新規作成 v1.0  ← revert済み
```

実コミットハッシュは `git -C C:/Users/kfuru/denken-wiki-master log --oneline -10` で再確認すること。

---

## 未完了タスク（次セッションで実施）

### A. 【最優先】解釈第22条 の中身検証

**問題**: 現状 `docs/articles/kaishaku/22.md` は「**変電所等からの電磁誘導障害の防止**」として書かれているが、現行の電技解釈（令和7年11月版）では **第22条 = 特別高圧用の機械器具の施設** の可能性が極めて高い（jeea.or.jp 解説で確認済）。

**確認方法**:
1. 電験王3 で「電技解釈 第22条」を検索
2. https://denken-ou.com/ で過去問を当たって §22 がどう参照されているか確認
3. 経産省 PDF（https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/dengikaishaku.pdf ）でも確認
4. 以下の検索クエリも有効: `"電気設備の技術基準の解釈" "第22条" "特別高圧"`

**修正範囲（仮）**:
- `docs/articles/kaishaku/22.md` の中身を「特別高圧用の機械器具の施設」に書き直し
- 既存の電磁誘導障害の内容は別条文（§52 か §49 付近？要確認）に移管 or 削除
- `docs/articles/kaishaku/index.md` の第2章ヘッダ「変電所等からの電磁誘導障害の防止」エントリ修正
- `docs/articles/index.md` の §22 タイトル修正
- `mkdocs.yml` のサイドナビ §22 タイトル修正

### B. 【中優先】wiki 全体の条文番号 sweep

ホリエモン提案: **forensics モードで条文番号誤記の総点検** を実施すべき。

**確認項目**:
- 各 `kaishaku/*.md` 記事のタイトルが現行解釈と一致しているか
- `themes/*.md` 内の §XX 表記が正しいか（特に避雷器系・接地系）
- `kakomon/*.md`（by-field・reuse-ranking 等）の §XX 表記
- `_data/kakomon.yml` の条文タグ

**有用なコマンド**:
```bash
grep -rn "解釈第[0-9]\+条" C:/Users/kfuru/denken-wiki-master/docs/ | head -50
```

### C. 【低優先】kaishaku/21.md の改善余地

- `<mark>` 穴埋めマーカーは未使用（凡例で明示）。R08結果次第で出題穴埋め語句を確定させて付加
- 過去問実績テーブルの論点記述をより具体化できる
- SVGの色味調整（5号図解は5色使用・モバイル可読性チェック未実施）

### D. 事故再発防止インフラ（2026-05-06 完了）

**D-1: pre-commit hook 化** ✅ 完了
- `.git/hooks/pre-commit` に `precommit_kakomon.py` ＋ `precommit_evidence_check.py` を登録
- 動作確認: hook 起動・正常通過

**D-2: 法規記事の「典拠」行必須化** ✅ 完了
- `scripts/precommit_evidence_check.py` 新規作成
- 法規記事 (kijun/kaishaku/jigyoho) の **新規追加** に対し、「典拠（一次ソース）」「照合日」行が無ければ commit 拒否
- 既存記事の部分編集は素通し（過度なブロックを回避）

### B. wiki 全体の条文番号 sweep（2026-05-06 完了）

**省令側**: `python scripts/audit_titles.py` で 24件 全OK（MISMATCH ゼロ）
**解釈側**: `python scripts/audit_kaishaku_titles.py` で 43件中 32件OK / **MISMATCH_FILE ゼロ**

§22 のような条番号取り違え事故は他にゼロ。ただし以下11件で H1↔index タイトル表記差を検出（INDEX_DIFF）:

- **軽微（短縮表記違い）**: 19, 38, 59, 68, 81 等
- **内容相違の疑い（要個別精査）**: **13, 37, 148, 227** の4件
    - 13.md: H1=「電路の絶縁を要しない部分」 / index=「特別高圧変圧器の混触防止」
    - 37.md: H1=「避雷器等の施設」 / index=「地絡遮断装置の性能」
    - 148.md: H1=「低圧幹線の施設」 / index=「配線の使用電線」
    - 227.md: H1=「系統連系用保護装置（高圧連系）」 / index=「高圧連系時の施設要件」

これら4件は §22 と同型の事故の可能性。次セッションで個別調査推奨（denken-page-creation.md Step1〜6 ワークフローに従う）。

---

## 重要な参照先

- **denken-wiki リポジトリ**: `C:/Users/kfuru/denken-wiki-master/`（master ブランチ）
- **GitHub Pages**: https://kfurufuru.github.io/denken-wiki/
- **解釈第21条 公開URL**: https://kfurufuru.github.io/denken-wiki/articles/kaishaku/21/
- **ゴールドスタンダードテンプレ**: `docs/articles/kijun/58.md`（v2.2）
- **kakomon DB**: `docs/_data/kakomon.yml` / `docs/kakomon/by-field.md` / `docs/kakomon/reuse-ranking.md`
- **テーマページ**: `docs/themes/koatsu-kiki-shisetsu.md`（§21中心・v1.2）

---

## 教訓（feedback memory 記録済み・2026-05-05）

以下4本のメモリに記録完了:

1. `feedback_law_article_number_verification.md`（並列セッションで保存）— 条文番号→正式タイトル一次ソース検証
2. `feedback_cross_article_numerics_verification.md`（このセッションで保存）— 関連条文の数値・タイトル引用も一次ソース照合
3. `feedback_project_rules_first_read.md`（このセッションで保存）— プロジェクト規約 CLAUDE.md/.claude/rules/ 必読
4. `feedback_law_article_drafting_workflow.md`（このセッションで保存）— 4工程ワークフロー（規約読込→一次ソース取得→**構造ドラフトをユーザー先見せ**→本文執筆）

**核心の教訓**: メモリの存在 ≠ メモリの適用。再発防止は **工程順序の固定** と **ユーザーチェックの早期介入** が必要（メモリ4と D-1/D-2 インフラ）。

---

## 次セッションの推奨開始順（2026-05-06 更新）

**A・D-1・D-2・B はすべて完了**。残る作業は以下:

1. **解釈第13・37・148・227 条の個別精査**（B 監査で内容相違の疑い検出・優先度高）
   - 各条文を `denken-page-creation.md` Step1〜6 で再検証
   - §22 と同型の事故の可能性あり
2. **解釈側 INDEX_DIFF の軽微案件整理**（19, 38, 59, 68, 81 等）
   - kaishaku/index.md の表記を H1 に揃えるか、その逆か判断
3. **kaishaku/22.md / 21.md の品質スコア改善**（v3.1 で 62点 → 80点 A への引き上げ）
   - ただし22条はテスト出題確率低いためユーザー判断で見送り済（2026-05-06）
4. **メモリ整理**: `feedback_law_article_drafting_workflow.md` を SSoT 形式に統合済

すべての残作業は `denken-wiki/.claude/rules/denken-page-creation.md` の **Step1〜6 必須チェックリスト** に従って進めること（特に Step6 ユーザー先見せは省略不可）。

---

*このファイルを読んだら、まず A（§22 検証）から着手してほしい。GO 判断はユーザーに確認すること（前任セッションでの誤記事公開を踏まえ慎重に）。*
