---
title: "電験法規Wiki Hub-Body責務境界 — 新サイト=Hub・mkdocs=Body"
category: "電験3種"
level: "draft"
created: "2026-05-02"
last_reviewed: "2026-05-02"
understanding_score: 4
source: "denken-hoki-wiki再設計議論（2026-05-02・5AI社員議論）"
tags: ["電験3種", "Wiki", "アーキテクチャ", "責務分離"]
related: ["[[denken-wiki-workflow]]", "knowledge/wiki-validation-checklist.md"]
---

# 電験法規Wiki Hub-Body責務境界

## TL;DR

法規Wikiは2サイト構成。**Hub（denken-hoki-wiki.html・React）= 動く部屋**、**Body（denken-wiki/mkdocs）= 読む書庫**。境界を曖昧にすると半年で両方腐る。本書は5AI社員議論（2026-05-02）の合意結果。

---

## 1. 責務境界（一行で書く）

> **Hubは入口と進捗、Bodyは条文と解説。**

| 軸 | Hub（denken-hoki-wiki.html） | Body（denken-wiki / mkdocs） |
|---|---|---|
| 物理形態 | React + Babel CDN・SPA | mkdocs Material・SSG静的HTML |
| 配信URL | `localhost:8092/denken-hoki-wiki.html` | `kfurufuru.github.io/denken-wiki/` |
| 主役 | 動く・記憶する・推薦する | 読む・引く・暗記する |
| 状態管理 | localStorage（進捗・履歴・誤答） | なし（純粋静的） |
| 更新頻度 | UI機能・ロードマップ | 条文記事・過去問解析 |

## 2. 機能の振り分け（厳格）

### Hub のみが持つ責務

- Hero / 戦略宣言 / 学習マップSVG（俯瞰）
- 前回のつづきカード（進捗バー）
- Lv.2学習履歴カード（PDCA Check/Action導線）
- HOT_TOPICS（Sランク4 + Aランク4 グリッド）
- ROADMAP（5ステップ・done/current/next）
- DAILY_Q（今日の一問インタラクティブ）
- 過去問ランダム10問モード（65分タイマー）
- WIKI_GLOSSARY（用語検索・即時表示）
- 一覧表ページ（接地・絶縁・離隔距離・電圧区分）
- CH対応表（教材CH↔Wikiセクション）

### Body のみが持つ責務

- 条文ごとの詳細記事（5.md・56.md など）
- 過去問テーマ別解説
- 法令体系の解説記事
- 計算問題の手順分解
- 全文検索（mkdocs Material 標準）

### 重複禁止

- **本文（条文解説）は Body のみ**。Hubに本文は書かない
- **進捗・履歴は Hub のみ**。Body に localStorage を持ち込まない
- **同じ用語の定義は Glossary 一本化**。両方に書かない

## 3. リンク方針

### Hub → Body（外部遷移）

```
Hub上のクリック → 新規タブで Body の該当URL を開く
target="_blank" rel="noopener"
戻り導線: Body側の冒頭に「← 法規Wikiトップに戻る」リンクを置く
```

### Body → Hub（外部遷移）

```
mkdocs index.md の冒頭に
「動的学習機能（進捗・履歴・タイマー）はこちら → [法規Wiki Hub]」
```

### URL設計

| 種別 | URL例 |
|---|---|
| Hub一覧表ページ | `denken-hoki-wiki.html#setsuchi-ichiran` |
| Body条文記事 | `kfurufuru.github.io/denken-wiki/articles/kijun/5/` |
| Body過去問解説 | `kfurufuru.github.io/denken-wiki/kakomon/r5-1/` |

## 4. データソース一本化

| データ | 単一ソース | 読み手 |
|---|---|---|
| 学習進捗（％・連続日数・heatmap） | `denken3-study-dashboard/data/portal-summary.json` | Hub のみ |
| 用語辞書 | Hub内の `WIKI_GLOSSARY` 配列 | Hub のみ |
| 条文本文 | Body の `docs/articles/kijun/N.md` | Body のみ |
| 過去問テーマ別 | Body の `docs/_data/kakomon.yml` | Body 表示・Hub は件数集計のみ |

**禁止**: 同じデータを両方にコピーする。**ハードコード値は最終手段**。

## 5. 運用ルール（半年後に腐らせない）

### 更新時の判断フロー

```
更新内容は何？
├── 条文・過去問解説 → Body に書く（Hubは触らない）
├── UI改善・機能追加 → Hub に書く（Bodyは触らない）
├── 進捗データの計算ロジック → portal-summary.json生成スクリプトに書く
└── 学習マップの構成変更 → Hub の HomePage を更新、Body には影響なし
```

### リンク切れ防止

- **Body のページslug変更は禁止**（Hub からのリンクが全滅する）
- やむを得ず変更する場合は、Hub 側の以下を同時更新：
  - `HOT_TOPICS` 配列の `pageId`
  - `WIKI_GLOSSARY` の `related`
  - `CH_TABLE` の `wiki` フィールド
- 週次で `link-check.py`（Phase 3 で作成）を回す

### 嘘数字の禁止

- ROADMAP の `cur` / `total` / `prog` は `portal-summary.json` から読む
- 達成済みページ数・閲覧済みページ数を**手動で書かない**
- 初期実装でハードコードする場合は `// TODO: portal-summary.json から取得` コメント必須

## 6. 5AI社員の合意ポイント（2026-05-02）

| 社員 | 合意の核 |
|---|---|
| ジョブズ | 「Hubは入口、Bodyは図書館。混ぜるな」 |
| ホリエモン | 「境界を1行で書け、リンクチェック自動化」 |
| 落合陽一 | 「動的UI=React、静的本文=SSG。責務が物理的に違う」 |
| マンガー | 「二つの家を持つ男はどちらにも住まなくなる。Hubに住む」 |
| ひろゆき | 「試験まで日数があるなら、ちゃんと境界決めてから動け」 |

## 7. 実装フェーズ

| Phase | 内容 | 工数 | ステータス |
|---|---|---|---|
| 0 | **本ドキュメント作成**（責務境界の一枚化） | 10分 | ✅ 完了（2026-05-02） |
| 1 | 新サイト止血（46スタブ除外・嘘数字実態化・portal-summary.json接続） | 60-90分 | ⏳ 次 |
| 2 | HOT_TOPICS / 学習マップから Body 記事へ外部リンク化、WIKI_GLOSSARY 接続 | 2-3h | 未着手 |
| 3 | link-check.py 週次自動化（health-monitor統合）、データ同期検討 | 必要時 | 未着手 |

## 8. 落とし穴

- **境界を曖昧にすると半年で両方腐る**（マンガー指摘）
- **リンク切れは Body のslug変更で全滅する**（ホリエモン指摘）
- **進捗データの二重管理は嘘数字の温床**（ジョブズ指摘）
- **Hub→Body のフルリロード遷移は学習中断感を生む**（落合指摘）→ `target="_blank"` で緩和
- **Hub をリンク集に劣化させる誘惑あり**（ジョブズ指摘）→ DAILY_Q・進捗・タイマーは Hub 専有機能として死守

## 9. 関連

- 過去議論: 2026-05-02 / 5AI社員（ジョブズ・ホリエモン・落合陽一・ひろゆき・マンガー）
- 試験日: 2026-08-30（残り約120日・Phase 1〜3 を完遂する余裕あり）
- 上位ルール: `CLAUDE.md` §HTMLコーディングルール / §Wiki編集ワークフロー
- 関連ナレッジ: [[denken-wiki-workflow]]
