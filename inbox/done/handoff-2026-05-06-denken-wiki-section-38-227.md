# 引継ぎ: denken-wiki 第38条/第227条 §22同型事故 本格対応

**日付**: 2026-05-06
**前任セッション**: musing-golick-103939 worktree
**対象リポジトリ**: `C:/Users/kfuru/denken-wiki-master/`（master ブランチ・GitHub Pages 自動デプロイ）
**前段引継ぎ**: `inbox/handoff-2026-05-05-denken-wiki-kaishaku-21.md`

---

## 前任セッションで完了した作業

### kaishaku/index.md 3行のラベル更新（A案）

§22同型事故ではなくindex更新漏れと判明した3件を H1 と整合化＋リンク化＋ステータス「📄 作成済み」化。

| 条文 | 修正前 index | 修正後 index | 一次ソース |
|------|-------------|-------------|-----------|
| 第13条 | 特別高圧変圧器の混触防止（📝 作成予定） | [電路の絶縁を要しない部分](13.md)（📄 作成済み） | [JEEA](https://jeea.or.jp/course/contents/11102/) |
| 第37条 | 地絡遮断装置の性能（📝 作成予定） | [避雷器等の施設](37.md)（📄 作成済み） | [電験王3 R3問4](https://denken-ou.com/houkir3-4/) |
| 第148条 | 配線の使用電線（📝 作成予定） | [低圧幹線の施設](148.md)（📄 作成済み） | [電験王3 H24問9](https://denken-ou.com/houkih24-9/) |

audit結果: INDEX_DIFF 11件 → 8件（13/37/148 解消）。

---

## 未完了タスク（次セッションで実施）

### A. 【最優先・新規発見】解釈第38条 §22同型事故の本格対応

**問題**: 現状 `docs/articles/kaishaku/38.md` は「**避雷器等の施設（発電所・変電所等）**」として書かれているが、現行の電技解釈では **第38条 = 発電所等への取扱者以外の者の立入の防止** が一次ソースで確認された（複数Web検索で一致）。

§22 / §227 と同型の条番号誤記事故。

**確認方法**:
1. 経産省PDF: https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/dengikaishaku.pdf （直接DLしてからAcrobatで§38を確認推奨・WebFetchはタイムアウトする）
2. JEEA 解説: https://jeea.or.jp/course/contents/11101/
3. 電験王3で「電技解釈 第38条」検索

**確認の判断軸**:
- 現行§38のタイトルが本当に「発電所等への取扱者以外の者の立入の防止」か（一次ソースは経産省PDF最優先）
- 現状の§38記事の「避雷器（発変所版）」内容が、現行体系では何条なのか（§37の中に統合されている可能性／別条文に移管された可能性）

**修正範囲（仮）**:
- `docs/articles/kaishaku/38.md` の中身を「発電所等への取扱者以外の者の立入の防止」に書き直し（denken-page-creation.md Step1〜6 完全準拠）
- 既存の避雷器（発変所版）内容は §37 に統合 or 別条文へ移管 or 削除（要判断）
- `docs/articles/kaishaku/index.md` の §38 タイトル修正
- `docs/articles/index.md` の §38 タイトル修正
- `mkdocs.yml` のサイドナビ §38 タイトル修正
- `docs/themes/*.md` 内の §38 表記検証
- `docs/_data/kakomon.yml` の §38 タグ検証

### B. 【高優先・既知】解釈第227条 → 第229条 リネーム

前段引継ぎ（2026-05-05）から繰越。227.md 自身は ⚠️ admonition で条番号誤記を明示・URL互換のため暫定運用中。本格対応：

- `kaishaku/229.md` を新規作成（中身=現227.mdの「高圧連系時の系統連系用保護装置」）
- `kaishaku/227.md` を「低圧連系時の系統連系用保護装置」内容で書き直し
- `kakomon.yml` の §227 タグ → §229 へ全置換（H30問9・R02問10・R06上問7）
- `themes/bunsan-dengen.md` 等の §227 ↔ §229 整合
- リダイレクト設定 or 旧URL維持判断

### C. 【中優先】INDEX_DIFF 軽微案件 5件の整理

H1 を index に揃えるか、index を H1 に揃えるかの判断・統一。

| 記事 | H1 | index |
|------|----|----|
| 16.md | 機械器具等の絶縁性能 | 機械器具等の電路の絶縁性能 |
| 19.md | C種・D種接地工事 | C種接地工事・D種接地工事 |
| 59.md | 架空電線路の支持物の強度 | 架空電線路の支持物 |
| 68.md | 低圧架空電線の高さ | 低圧架空電線の施設 |
| 81.md | 架空電線と他の架空電線路との離隔（交差・接近） | 架空電線と他の架空電線路との離隔 |
| 143.md | 低圧配線の施設場所（引込線の施設） | 引込線の施設 |

---

## 重要な参照先

- **denken-wiki リポジトリ**: `C:/Users/kfuru/denken-wiki-master/`（master ブランチ）
- **GitHub Pages**: https://kfurufuru.github.io/denken-wiki/
- **ゴールドスタンダードテンプレ**: `docs/articles/kijun/58.md`
- **必読ルール**: `.claude/rules/denken-page-creation.md`（Step1〜6・Step6 ユーザー先見せ必須）
- **監査スクリプト**: `python scripts/audit_kaishaku_titles.py`
- **§38記事公開URL**: https://kfurufuru.github.io/denken-wiki/articles/kaishaku/38/
- **§227記事公開URL**: https://kfurufuru.github.io/denken-wiki/articles/kaishaku/227/

---

## 教訓

§22 / §227 / §38 の3件で同型事故が判明。**audit_kaishaku_titles.py の INDEX_DIFF 検出は条番号誤記の早期発見に有効**。今後の新規記事作成時も Step1（条番号→正式タイトル一次ソース照合）を省略しないこと。

軽微な「短縮表記違い」と分類された案件にも、内容ごとの条番号誤記が混入している可能性がある（§38がその実例）。前任セッションの分類を鵜呑みにせず、疑わしい場合は記事H1だけでなく**記事中身の主題**まで一次ソースと突き合わせる。

---

## 次セッションの推奨開始順

1. **§38 一次ソース再検証**（経産省PDFを直接DL推奨・WebFetchは6.5MB級でタイムアウトする）
2. §38 修正方針をユーザー先見せ（denken-page-creation.md Step6）
3. GO 後に §38 本格対応 → §227 → C案 軽微案件の順
