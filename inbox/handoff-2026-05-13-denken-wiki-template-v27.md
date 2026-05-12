# 引き継ぎ — denken-wiki テンプレ v2.7 統一（Phase D-D）

**作成**: 2026-05-13
**前任セッション**: Phase Hoki-B 完了 + kaishaku/68.md v1.1 訂正 + Qiita 記事ドラフト + hoki_check.py 整備
**起動方法**: 新Claudeセッションで「`inbox/handoff-2026-05-13-denken-wiki-template-v27.md` を読んで実装続行して」と1行伝えるだけ

---

## ⚡ 30秒で把握

**目的**: denken-wiki の旧 v1.0 記事群を v2.7 ゴールドスタンダードに引き上げる
**現状**: 全106記事中、**v2.7 = 2記事**（kijun/58 + kaishaku/65）／**v2.x = 12記事**／**v1.0 = 92記事**
**所要**: 5〜10セッション（1記事 30分・10並列で1セッション約3時間）
**急ぎ度**: 🟢 低（誤記そのものは Phase A〜D で潰し済・残るのは「鮮度・体裁・新テンプレ要件」）

---

## ✅ 前任セッション完了分（2026-05-13）

| Task | 状態 | コミット |
|---|---|---|
| A. Phase Hoki-B（重要修正11件） | ✅ | `2c863c7`（.secretary） |
| B. kaishaku/68.md 訂正（旧v1.0の3大誤記） | ✅ | `c3a0904`（denken-wiki） |
| C. Qiita記事ドラフト v0.1 | ✅ | Notion + `inbox/qiita-draft-2026-05-13-denken-wiki-audit.md` |
| E. hoki_check.py 整備（4チェック） | ✅ | `094b849`（.secretary） |
| **D. テンプレ v2.7 統一**（本ハンドオフ） | ⏳ 未着手 | — |

---

## 🎯 Phase D-D の目的と境界

### v2.7 が要求する追加要素（v1.0 との差分）

`kijun/58.md` v2.7 をゴールドスタンダードとして以下を必須化：

| 領域 | v1.0 | v2.7 |
|---|---|---|
| メタ | 章だけ | **典拠（一次ソース）／照合日／隣接条文表** 必須 |
| 試験対策メタ | freq文字列 | **出題頻度（過去14年）／重要度／直近出題** |
| 条文原文 | 抜粋のみ | **eGov / METI 告示 PDF 由来の逐語テキスト** 全文折り畳み |
| マーカー | 自由配置 | **過去問で実際に空欄化された語句のみ** `<mark>`（実出題ゼロなら凡例で明示） |
| 根拠表 | なし | **空欄候補×根拠×出典** の対応表 |
| フッタ | 任意 | **ステータス3軸ラベル**（v2.7／監修済／公開）+ **監修ログ3行**（執筆者・監修者・最終照合日）必須 |
| § 記号 | 散在 | **`§N` 禁止・`第N条` に統一**（wiki_check.py 違反） |

詳細仕様: `denken-wiki/.claude/rules/denken-page-creation.md`（Single Source of Truth）

### 対象記事（90件）

- **kijun/**: 25記事中 v2.7 未達（具体的に: 1〜57 のうち template_version マーカー無し or 旧版）
- **kaishaku/**: 45記事中 v2.7 = 1記事（65.md）／残 44記事
- **jigyoho/**: 17記事 全件
- **furyoku/**: 3記事 全件

総 **約 90 記事**。`grep -L "^template_version:" docs/articles/*/*.md` で動的取得可能。

### 境界（やらないこと）

- 誤記の発見・修正（Phase A〜D で完了済）
- 新規記事作成
- kakomon.yml への 過去問追加（別タスク）
- hoki-wiki 側の v2.7 移行（denken-wiki と React SPA は別構造）

---

## 🚀 推奨実行戦略（10ページ並列×3〜5セッション）

### Step 1: 候補リスト動的取得（5分）

```bash
cd /c/Users/kfuru/Projects/denken-wiki
grep -L "^template_version:" docs/articles/*/*.md > /tmp/v27-candidates.txt
wc -l /tmp/v27-candidates.txt   # 約90件
```

### Step 2: 優先度ソート（10分）

優先度 = 出題頻度（kakomon.yml）× アクセス頻度。簡易には：

| バッチ | 優先 | 対象 |
|---|---|---|
| 1 | 🔴 最頻出 | kijun/14 / kaishaku/17, 18, 19 / kijun/15, 22 / kaishaku/14 |
| 2 | 🟠 頻出 | kijun/2, 4, 6, 8 / kaishaku/68（v1.1 → v2.7）, 75, 79 / jigyoho/39, 42, 43 |
| 3 | 🟡 中頻度 | kaishaku/33, 36, 37, 53, 59 / jigyoho/38, 40, 44, 48, 52 |
| 4 | 🟢 低頻度 | kaishaku/120, 143, 147, 200, 222 / furyoku/全件 / jigyoho/残 |

### Step 3: 10並列エージェント実装（1セッション 3時間）

エージェント1名 = 1記事の v2.7 改修。プロンプト雛形：

```
あなたは denken-wiki テンプレ v2.7 移行担当エージェント。
対象: docs/articles/kaishaku/{N}.md（v1.0 → v2.7）
SOT: docs/articles/kijun/58.md / .claude/rules/denken-page-creation.md
作業:
1. eGov / METI PDF（scripts/cache/）から条文原文の逐語テキスト取得
2. kakomon.yml で過去問実績照合（実出題語句にだけ <mark>）
3. v2.7 必須要件すべて反映（典拠・照合日・隣接条文・原文折り畳み・根拠表・監修ログ）
4. § 記号を「第N条」に統一
5. push しない・親 Claude に diff を返す
```

並列エージェント呼出は **同一ファイル競合なし**（1記事1ファイル）なので衝突しない。

### Step 4: 親 Claude が wiki_check.py + 目視で集約検証（30分）

- `python wiki_check.py` で § 違反 0 件を確認
- ビルド `python main.py serve` で MkDocs プレビュー
- ステータスラベル `v2.7／監修済／公開` の3行が全件揃っているか目視

### Step 5: バッチ単位コミット → push（10分）

10記事ずつコミットメッセージにまとめて push。

---

## 📊 セッション計画（目安）

| セッション | バッチ | 件数 | 累計 |
|---|---|---|---|
| 1 | 1 + 2 前半 | 15記事 | 15 / 90 |
| 2 | 2 後半 + 3 前半 | 20記事 | 35 / 90 |
| 3 | 3 後半 + 4 前半 | 20記事 | 55 / 90 |
| 4 | 4 後半 | 25記事 | 80 / 90 |
| 5 | 残・確認・整合 | 10記事 + QA | 90 / 90 |

5セッションで完遂目安。1セッション = Claude Code 1〜2時間（人間立ち会い込み）。

---

## ⚠️ 重要な注意事項

### 必読 memory（古舘さん不在時の自走パターン）

- `feedback_template_v23_evidence_first.md` — v2.7 必須要件（典拠/照合日/監修ログ）
- `feedback_law_verbatim_first.md` — 条文原文は eGov API 逐語限定・[要確認] grep 0件必須
- `feedback_kakomon_blank_verification.md` — 穴埋めは denken-ou.com 等で一次照合
- `feedback_section_ref_notation.md` — `§N` 禁止・`第N条` に統一
- `feedback_parallel_agent_prompt.md` — Haiku が独自例題を追加するリスク防止
- `feedback_external_ai_review_proactive.md` — v2.x 大型改修後は ChatGPT 第4監修者運用

### Phase Hoki-B/B' の連動課題（v2.7 移行と一緒に解決すべき）

1. **kaishaku/68.md v1.1 → v2.7 昇格**（前任セッションで v1.1 即時防御パッチ完了・v2.7 全面書き直しが残）
2. **kakomon.yml topic 文言の照合更新**（68.md v1.1 で[要再確認]フラグを残置・「低圧5m vs 高圧6m」等 v1.0 由来 topic 記述の棚卸し）
3. **kaishaku/65.md 隣接条文表の §75 主題訂正**（前任で1箇所訂正済・他の同型表現が他記事にもある可能性）
4. **hoki_check.py 検出の KakoDenryuPage 第36条 tags 問題**（hoki-wiki 側だが、denken-wiki kaishaku/36.md の v2.7 化と同時期に整合させると効率的）

### 編集禁止事項

- **直接 .html 編集禁止**（MkDocs が build 時に再生成）
- **kakomon.yml の年度ラベル削除禁止**（過去問DB の SOT）

### Git ブランチ状況

- **denken-wiki**: master ブランチ・最新 `c3a0904`（前任の kaishaku/68.md v1.1）
- **ローカル**: `feat/weakness-targeting-rule` ブランチが master 同期済（前任で rebase）

---

## 🔧 自走に必要な前提物

| 物 | 場所 | 状態 |
|---|---|---|
| 経産省告示PDF キャッシュ | `denken-wiki/scripts/cache/` | ✅ 配置済（kaishaku/kijun/jigyoho 全件） |
| eGov 法令API | online | ✅ 利用可（kijun/jigyoho/other 系のみ） |
| kakomon.yml | `denken-wiki/_data/kakomon.yml` | ✅ 247問・H23-R07上下19年分 |
| v2.7 ゴールドスタンダード | `kijun/58.md` + `kaishaku/65.md` | ✅ 2記事リファレンス可 |
| 作成ルール SOT | `.claude/rules/denken-page-creation.md` | ✅ 配置済 |
| wiki_check.py | `denken-wiki/wiki_check.py` | ✅ § / 簡体字 / 空要素 / 壊れリンク検出可 |
| hoki_check.py | `.secretary/hoki_check.py` | ✅ hoki-wiki 側の4チェック実装済（前任セッション） |

---

## 🎬 起動コマンド早見表

```
# Phase D-D 開始（推奨：バッチ1 から 10並列）
Phase D-D テンプレv2.7 統一を開始。バッチ1（最頻出15記事）を10並列エージェントで実行してください

# 個別記事だけ v2.7 化
kaishaku/68.md を v1.1 → v2.7 に昇格してください（denken-wiki kijun/58.md ゴールドスタンダード準拠）

# 進捗確認
grep -L "^template_version: 2.7" docs/articles/*/*.md | wc -l   # 残件数
```

---

## 📞 Notion のネタ帳ページ

Qiita 記事ドラフト v0.1 は Notion に保存済：
- https://www.notion.so/35e6ccc20ddf81c5aa7ced515ed30752
- 「Fカンパニー — 会社の憲法」配下

Phase D-D 完了時に **「v2.7 移行完了 → Wiki 全件 ChatGPT 第4監修通過」** という最終マイルストーンとして記事 §8（まとめ）に追記候補。

---

## メタ所感（古舘さんへ）

1. Phase D-D は **誤記殲滅は完了済の地味な体裁統一作業**。1記事30分の純粋作業で、AI 社員議論は基本不要。
2. ただし v2.7 の **「条文原文 逐語テキスト全文折り畳み」** は eGov / METI PDF キャッシュへの直接アクセスが必要。エージェントには PDF パスを明示せよ（自動探索させると失敗する）。
3. 完了後は **denken-wiki 全106記事が v2.7 ゴールドスタンダード統一** となり、Phase Hoki 横展開監査の SOT として真に機能する状態に到達する。Qiita 記事の説得力も最終版に。

---

*生成: Claude Opus 4.7 / 2026-05-13 / 前任セッションでタスクA・B・C・E 完遂後の最終引き継ぎ*
