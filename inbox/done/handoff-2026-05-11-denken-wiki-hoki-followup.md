# 引き継ぎ — denken-wiki & hoki-wiki Phase D 続編

**作成**: 2026-05-11 深夜
**前任セッション**: Phase A〜D（denken-wiki）+ Phase Hoki（hoki-wiki）累計56+並列エージェント完遂
**起動方法**: 新Claudeセッションで「`inbox/handoff-2026-05-11-denken-wiki-hoki-followup.md` を読んで実装続行して」と1行伝えるだけ

---

## ⚡ 30秒で把握

**完了済**: denken-wiki 88件＋hoki-wiki 4件 修正＋構造改善（コミット6本 push 済）
**残タスク**: A.重要修正続編 / B.連動課題 / C.外販記事化 / D.テンプレ統一

---

## ✅ 完了済（2026-05-10〜11 セッション）

| Phase | コミット | 件数 |
|---|---|---|
| denken-wiki Phase A（公開停止級） | `b1f7111` | 6件 |
| denken-wiki Phase B（要修正） | `dc3ff13` | 13件 |
| 参考文献拡充＋自動反映パイプライン | `e991ed7` | links.md + scripts/merge_refs.py |
| denken-wiki Phase C（warning＋追加監査） | `c4af1cd` | 44ページ |
| denken-wiki Phase D-A（kakomon.ymlベース） | `502471e` | 10件 |
| denken-wiki Phase D-B（経産省PDFベース） | `43a00bb` | 7件 |
| **hoki-wiki Phase Hoki-A（致命4件）** | `5b99738` | 4件 |

**新規 secretary memory feedback 6件追加**:
- feedback_retroactive_audit_after_rule.md
- feedback_parallel_audit_modify_pattern.md
- feedback_primary_source_cache_first.md
- feedback_refs_pending_log.md
- feedback_ai_persona_majority_bias.md
- feedback_offline_self_drive_pattern.md

---

## 🚨 残タスク（優先度順）

### A. Phase Hoki-B（重要約10件・hoki-wiki 続編）

**所要**: 1セッション 3-5時間（4-6並列エージェント）
**起動**: `Phase Hoki-B 開始してください`

**含まれる修正**:

| # | ページ | 内容 | 優先 |
|---|---|---|---|
| B1 | BunsangataDengenPage | 単独運転検出「**第227条→第232条**」訂正（kaishaku/232 主題と整合） | 🟠 |
| B2 | JuyoritsuKeisanPage | 「合算需要率」公式が用語集と DemandKwhKisoPage R05上問11解法と不整合 → 「合わせた需要率」に統一 | 🟠 |
| B3 | JikoHokokuPage | 感電要件「入院を要する」→ 条文「**病院・診療所に入院した**」 | 🟡 |
| B4 | GijutsuKijunGaiyouPage | 「一般用/事業用の2分体系」→ 4区分体系 | 🟡 |
| B5 | ShuninGijutsusyaPage | 第43条第5項「従業者→**従事者**」+ 許可選任の自家用限定追記 | 🟢 |
| B6 | KojiShiHoPage | 認定従事者「一般用工事不可」の直感反パターン補注 | 🟢 |
| B7 | RikkakuIchiranPage | §71（建造物との接近）への直接リンク追加 | 🟢 |
| B8 | DensenroPage | MetaStrip タグ「§49削除・§59追加」 | 🟢 |
| B9 | OkunaiHaisenPage | tags に §149/§158 追加 | 🟢 |
| B10 | 各ページ | 「必ず1以下/1以上」断定表現4箇所を「通常〜として検算」に統一 | 🟢 |
| B11 | 4ページ targets= 不整合 | BshuSetsuchi/ShiyoJishuKensa/DenkiYohinAnzen/HensyatsukiYoryo の主題ミスマッチ | 🟠 |

**詳細**: `inbox/audit-2026-05-10/SUMMARY-phaseHoki.md` の「Phase Hoki-B 持ち越し」セクション参照

### B. denken-wiki kaishaku/68.md 内部矛盾解消（連動課題）

**所要**: 1エージェント30分
**起動**: `kaishaku/68.md を経産省告示PDF（scripts/cache/kaishaku-meti-2025-11.txt L5781）に基づき「低高圧共通6m」に統一してください`

**背景**: hoki-wiki 監査で「§68 = 低高圧共通6m」と確定したが、denken-wiki kaishaku/68.md L34/L38-40 では「低圧 第68条 道路5m / 高圧 第75条 道路6m」と告示と矛盾した記述が残存。

### C. ホリエモン提案：Qiita/note 記事化（外販ノウハウ）

**所要**: 1セッション 3-4時間
**起動**: `Qiita記事「Claude Code で電験wiki 92件を1日で監査・修正した話」のドラフトを作ってください`

**素材**:
- AI社員（落合/ひろゆき/ホリエモン）3者議論パターン
- 並列エージェント56+α 累計実証
- 経産省PDF キャッシュ→条文抽出→並列分配パイプライン
- secretary memory feedback 6件
- denken-wiki + hoki-wiki **2システム実証**で説得力倍増

**候補タイトル3本**（SUMMARY-phaseC.md 末尾参照）:
1. 「Claude Code で電験Wiki 100記事を1日で監査した話」
2. 「AI社員（落合・ひろゆき・ホリエモン）の3者議論で意思決定する Claude Code 運用」
3. 「METI WebFetch 失敗から学ぶ：監査エージェントの一次ソース確保戦略」

### D. denken-wiki テンプレv2.7 統一（中長期構造改善）

**所要**: 5-10セッション（30+ 記事を v1.0 → v2.7 に引き上げ）
**起動**: `Phase D-D テンプレ統一を開始してください（10ページずつ並列）`

**対象**: kijun/2,4,6,8,9,10,15,20,23,24,32,56,59,64 / kaishaku/1,10,13,14,15,16,33,36,37,53,59,65,68,71,75,79,81,117,120,143,147,148,149,150,156,159,164,200,222 / jigyoho/全て / furyoku/全て

**急ぎではない**（学習機能は既に確保済）

### E. hoki-wiki 専用検査スクリプト整備

**所要**: 1セッション 1-2時間
**起動**: `hoki-wiki 用 hoki_check.py を作成してください（denken-wiki/wiki_check.py 相当）`

**検査内容**:
- ページ id と function 名の整合
- DenkenWikiCTA リンク先の denken-wiki 側 URL 存在確認
- MetaStrip tags の条文番号と本文の整合
- targets= 句と kakomon.yml の整合

---

## 📁 関連ファイル一覧

### 集約レポート（読む順序）

1. `inbox/audit-2026-05-10/SUMMARY.md` — 初期100記事監査
2. `inbox/audit-2026-05-10/SUMMARY-phaseC.md` — Phase C 致命候補10件詳細
3. `inbox/audit-2026-05-10/SUMMARY-phaseD-final.md` — denken-wiki Phase D 最終
4. `inbox/audit-2026-05-10/SUMMARY-phaseHoki.md` — hoki-wiki 横展開最終

### 個別監査レポート

- `phaseC-kaishaku-group{1..6}.md` — denken-wiki kaishaku 44記事 詳細
- `phaseHoki-{G1..G5,kakomon}.md` — hoki-wiki 32ページ 詳細
- `hoki-page-articles.yml` — hoki-wiki ページ→条文インデックス

### 一次ソースキャッシュ

`denken-wiki/scripts/cache/`:
- `kaishaku-meti-2025-11.pdf` (3.9MB) + `.txt` (15630行)
- `kaishaku-meti-kaisetsu-2025-11.pdf` (16.8MB)
- `kijun-meti-2023.pdf` + `kijun-meti-kaisetsu-2025-11.pdf`
- `jigyoho-meti.pdf` + `jigyoho-shikorei-2026.pdf`
- `egov-409M50000400052.xml`（電技省令 eGov）

### refs自動反映パイプライン

`denken-wiki/`:
- `_data/refs-pending.yml`（append-only ログ）
- `scripts/merge_refs.py`（YAML→links.md統合）
- `.claude/rules/refs-auto-reflect.md`（運用ルール）

---

## ⚠️ 重要な注意事項

### Git ブランチ状況

- **denken-wiki**: master ブランチ・最新 `5b99738` 直前は `43a00bb`（hoki-wiki 別repo）
- **hoki-wiki (.secretary)**: 現在 `tmp-merge-demand-page` ブランチで作業（main は worktree で別開放中）
  - push は `git push origin tmp-merge-demand-page:main` で main に直接反映可能
  - main worktree: `.claude/worktrees/nifty-williams-d655c2`

### 編集禁止事項

- **denken-hoki-wiki.html** は build artifact・**直接編集禁止**（必ず .jsx 経由）
- **build-hoki-wiki.py** で再生成（5秒程度）
- ビルド後の commit は `hoki-pages.jsx + denken-hoki-wiki.html` をセットで

### feedback memory 必読

新セッションで Claude が自動参照すべき memory:
- `feedback_offline_self_drive_pattern.md` — 古舘さん不在時の自走4ステップ
- `feedback_ai_persona_majority_bias.md` — AI社員2-1分裂時の判定ルール
- `feedback_parallel_audit_modify_pattern.md` — 並列×深掘りスケーリング法則
- `feedback_primary_source_cache_first.md` — 一次ソースキャッシュ先行
- `feedback_external_review_verification.md` — 上司の指示も一次照合で検証

### Phase Hoki-A の構造的発見

**「denken-wiki Phase B/D 修正が hoki-wiki に伝播していない」横展開ギャップ**を検出。今後は denken-wiki 修正時に「**hoki-wiki への波及チェック**」をセット運用すべき。memory 候補。

---

## 🎯 推奨実行順（古舘さん判断）

| 推奨度 | タスク | 理由 |
|---|---|---|
| 🥇 高 | A. Phase Hoki-B（重要10件） | 致命より軽症だが受験者誤解リスク残・3-5時間で完遂 |
| 🥈 中 | B. kaishaku/68.md 訂正 | 30分で完了・連動課題の片付け |
| 🥉 中 | C. Qiita/note 記事化 | ノウハウ鮮度のうちに資産化（ホリエモン推奨） |
| 後回し | D. テンプレv2.7統一 | 急ぎでない・大規模 |
| 後回し | E. hoki_check.py | 整備すれば次回監査が楽になる中期投資 |

---

## 📞 起動コマンド早見表

```
# Phase Hoki-B（最優先）
Phase Hoki-B 開始してください

# kaishaku/68.md 訂正
kaishaku/68.md を経産省告示PDFに基づき低高圧共通6mに統一してください

# Qiita記事化
Qiita記事ドラフトを作ってください

# テンプレ統一
Phase D-D テンプレv2.7統一を開始してください（10ページずつ並列）

# hoki_check.py 整備
hoki-wiki 用 hoki_check.py を作成してください
```

---

*生成: Claude Opus 4.7 / 2026-05-11 深夜・引き継ぎ準備完了*
