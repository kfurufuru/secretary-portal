---
title: "Weekly Digest"
category: "summary"
level: "published"
created: "2026-04-23"
last_reviewed: "2026-04-23"
---

# 週次レビュー & AI ニュース集計

> **最終更新**: 2026-04-23 | **期間**: 過去7日間

---

## 📌 高評価記事（スコア4-5）

学習優先度が高い記事。モデル更新や技術動向の背景理解に最適。

```dataview
TABLE title AS "記事", ai_category AS "カテゴリ", score AS "スコア", published_at AS "日付"
FROM "ai-news/feeds"
WHERE score >= 4
SORT published_at DESC
```

---

## 📂 カテゴリ別集計

トピック別の記事分布。最新の業務AI活用トレンドを領域ごとに把握。

```dataview
TABLE ai_category AS "カテゴリ", rows.title AS "記事一覧", length(rows) AS "件数"
FROM "ai-news/feeds"
GROUP BY ai_category
SORT length(rows) DESC
```

---

## 📅 過去7日間（新規記事）

直近1週間に追加されたニュース。最新情報の確認用。

```dataview
TABLE title AS "記事", ai_category AS "カテゴリ", score AS "スコア"
FROM "ai-news/feeds"
WHERE published_at >= date(now) - dur(7 days)
SORT published_at DESC
```

---

## 📊 スコア分布

記事の評価分布。3以上（実用価値あり）の割合が判定基準。

```dataview
TABLE score AS "スコア", length(rows) AS "件数", round(length(rows) * 100 / 16, 1) AS "割合(%)"
FROM "ai-news/feeds"
GROUP BY score
SORT score DESC
```

---

## 🔄 知識昇格実績

今週 L1（ログ）→ L2（知識）に昇格した記事・学習内容。

| テーマ | 出所 | 昇格日 | スコア |
|--------|------|--------|--------|
| （毎週月曜に集計） | - | - | - |

---

## 💡 気づき・つながり

週内に発見した「2つ以上の知識が接続した瞬間」。横展スタイルで記録。

- **気づき例**: 「Claudeのシステムプロンプト追跡機能 × 電験学習の不確実性」→ 生成AI選定時に「このバージョンではどう動作するのか」を事前検証できる設計思想が業務設備投資でも応用可能

---

## 📝 メモ・次週の検討課題

（随時追記）

