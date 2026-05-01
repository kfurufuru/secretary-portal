---
title: "学習ロードマップ判定フレームワーク（作る側/使う側 × ROI）"
category: "AI活用"
level: "draft"
created: "2026-05-01"
last_reviewed: "2026-05-01"
understanding_score: 4
source: "inbox/2026-05-01-ai-master-tree-review.md（Python+AI+DS Master Tree評価）"
tags: ["学習戦略", "判断フレームワーク", "ROI", "キャリア", "AI活用"]
related: ["knowledge/ai-gyomu-sentaku.md", "knowledge/business-skill-gap-analysis.md", "knowledge/f-company-session-framework.md"]
---

# 学習ロードマップ判定フレームワーク（作る側/使う側 × ROI）

## TL;DR

SNSで流れてくる「○○マスターツリー」「○○完全ロードマップ」系の学習地図は、9割が**作る側のキャリアパス図**である。電気エンジニア管理職（=使う側）が真に受けて全項目を学ぶと、機会費用（電験3種・設備専門性）を失う。判定は5ステップ：①キャリアパス部分から逆算 →②自分の立ち位置と照合 →③要・有・不要に分類 →④機会費用と比較 →⑤ノイズ7割超なら丸ごと不採用。

---

## なぜこのフレームが必要か

### 観測した失敗パターン

- SNSの学習ロードマップ（@BharukaShraddha "Python+AI+DS Master Tree" 全15項目）を見て「全部やらないと」と感じる心理が働く
- 14項目中、現職で価値があるのは3項目（Python for DS / Generative AI & RAG / Data Visualization）のみ
- 残り11項目（ML / Deep Learning / NLP / MLOps / Cloud Deployment 等）は **GenAI Engineer 志望者向け** であり、設備管理職の業務には無関係
- 「親切な総合学習図」のように見えて、実態は **特定キャリア（GenAI Engineer）への誘導図**

### 落とし穴

> 「網羅的＝価値が高い」という錯覚 → ノイズ7割の地図を真面目に追って機会費用を失う

---

## 判定フレーム（5ステップ）

```
SNS/書籍/動画で学習ロードマップを見たら：
  ① キャリアパス部分（最下部・最後尾）を最初に見る
       → 誰向けの図か即判定
  ② 自分の立ち位置を「使う側 / 作る側」で確定
       → 古舘の場合: 業務AI活用（=使う側）
  ③ 各項目を3段階分類
       ◎要: 現業務で即使える / ROI明確
       ○有: 概念把握で十分（深掘り不要）
       ✕不要: 別キャリア向け
  ④ 機会費用と比較
       → 電験3種 / 設備投資専門性 / マネジメント熟達 と比べてROI高い？
  ⑤ ✕不要が7割超なら丸ごと不採用
       → 抜粋3項目だけ採る
```

---

## 「作る側 / 使う側」の境界

| 軸 | 作る側 | 使う側（古舘の立ち位置） |
|----|--------|------------------------|
| ML/DL アルゴリズム | 実装できる | 概念把握のみ |
| Python ライブラリ | 自作・拡張 | pandas/matplotlib 程度 |
| Cloud Deployment | EC2/Lambda 構築 | 既存サービス利用 |
| プロンプトエンジニアリング | （該当なし） | **深く実践** |
| RAG システム | フルスクラッチ構築 | **業務適用・運用** |
| 設備データ分析 | （該当なし） | **本業の核** |

> 「使う側」は **プロンプト + RAG + データ分析最低限** の3点で十分。残りは概念止まりでROI最大化。

---

## 適用例: Python + AI + DS Master Tree (2026-05-01)

| 判定 | 項目 | 理由 |
|------|------|------|
| ◎要 | Python for Data Science | 設備データ・電力ログ解析で即使える |
| ◎要 | Generative AI & RAG | 業務活用中。社内ナレッジ検索に直結 |
| ○有 | Data Visualization | 稟議資料・トラブル分析の可視化 |
| ✕不要 | Python Fundamentals | 既に十分（pandas以前は不要） |
| ✕不要 | Mathematics for AI/ML | 作る側のスキル |
| ✕不要 | Databases (MySQL/MongoDB) | 業務でDB構築しない |
| ✕不要 | AI概論 | 抽象論。実践に勝るものなし |
| ✕不要 | ML / Deep Learning / NLP | 作る側 |
| ✕不要 | Model Deployment / Cloud / MLOps | GenAI Engineer志望者向け |
| ✕不要 | Real-World Projects（Recommendation等） | 別業界向け |
| ✕不要 | Career Path | そもそも転職志向の人向け |

**結果**: 14項目中◎2 / ○1 / ✕11 → ノイズ79% → 抜粋3項目のみ採用

---

## 古舘向け絞り込み（最終形）

業務でAI活用を深めるなら、以下3点だけで十分：

1. **プロンプトエンジニアリング**（Claude Code活用で実践中）
2. **RAGシステム構築**（trouble-log.md の業務適用に直結）
3. **Pythonデータ分析の最低限**（pandas + matplotlib のみ）

> 残り11項目に時間を割くなら、**電験3種**と**設備投資設計の専門性深化**に投資する方がROI圧倒的に高い。

---

## 落とし穴

1. **「網羅性の罠」**: 全項目並べた図は親切に見えるが、特定キャリアへの誘導図である
2. **「キラキラ用語の罠」**: Transformer / MLOps / Vector Database など響きが新しい単語に引っ張られる
3. **「無料の罠」**: 無料学習リソースは追跡コスト（時間）が見えにくい
4. **「同調の罠」**: SNSで皆が学んでいるから自分も、と機会費用を見失う

---

## 実践メモ

- このフレームは AI/Tech 系以外（マーケ・財務・組織論ロードマップ）にも適用可能
- 月1回 SNS で見かけた学習地図を本フレームで判定し、`inbox/` に評価メモを残す → 同じ地図が再投稿されても秒で判断できる
- 部下に学習リソース推薦するときも、**部下の立ち位置（作る側/使う側）**を確認してから渡す

---

## 関連

- [knowledge/ai-gyomu-sentaku.md](ai-gyomu-sentaku.md): AI化対象業務の選定（学習性×失敗許容度）
- [knowledge/business-skill-gap-analysis.md](business-skill-gap-analysis.md): スキルギャップ分析
- [knowledge/f-company-session-framework.md](f-company-session-framework.md): 判断セッション設計
