---
date: 2026-04-21
topic: dashboard改修・draft集計バグ修正・skill-dashboard統合
status: 継続中
---

# 引き継ぎ: ダッシュボード改修セッション

## 完了済み

1. **ダッシュボード機能追加**（generate_dashboard.py 改修済み）
   - 30日アクティブカウント表示を追加
   - デッド知識セクション（90日以上未更新の published）を追加・赤表示
   - dashboard.html を再生成済み → http://localhost:8092/dashboard.html

2. **Draft分類調査**（Haikuエージェントで実施）
   - draft 6件は全て `_template.md`（空テンプレート）のみ
   - published候補・削除候補の実コンテンツdraftはゼロ

## 🚨 未解決：Draft 31件カウントバグ

- ダッシュボードが「Draft 31件」と表示しているが、実体は `_template.md` を誤集計している疑い
- **次のアクション**: `generate_dashboard.py` の集計ロジックで `_template.md` を除外する修正を実施
  - 対象ファイル: `C:\Users\kfuru\.secretary\generate_dashboard.py`
  - 修正内容: `scan_knowledge()` 内でファイル名が `_template.md` のものをスキップ
  - 修正後: `python generate_dashboard.py` を再実行してdraft件数を確認

## Fカンパニーセッション合意事項（実施待ち）

| 時間軸 | アクション | 状態 |
|--------|-----------|------|
| 今週 | draft 2分類処理 | ✅ 実施（_template.mdのみと判明） |
| 今週 | TOP3タスク固定化・月曜5分ルーティン | ❌ 未実施 |
| 今月 | 再利用実績カウント追加 | ✅ 実装済み（30日アクティブ） |
| 今四半期 | promote.py アクセスログベース自動昇格 | ❌ 未着手 |

---

## ✅ 完了済み（別セッション）: skill-dashboard.html 統合

対象: `C:\Users\kfuru\.secretary\business-skills\skill-dashboard.html`  
確認URL: http://localhost:8092/business-skills/skill-dashboard.html#my-skill-level-section

### 実装内容
1. **診断スコアサマリーカード** — マイスキルセクション先頭に表示。ランクバッジ + スコア + 次レベル進捗バー + 再診断ボタン
2. **前回比 △表示** — サマリーカードのスコア横に `△+0.3` / `△-0.2` を緑/赤で表示（2回目以降）
3. **全スキルテーブル「診断」列** — 12スキルのクイズスコアを2列目（モバイル可視位置）に表示
4. **要学習バッジ** — 診断≤2 かつ 学習進捗≤40% の行を赤枠強調
5. **実践不足バッジ** — 診断≥4 かつ 学習進捗≤40% の行をアンバー枠強調
6. **診断履歴保存** — `bsk_result_history`（最大10件）に自動保存
7. **行内diff** — テーブル「診断」セルに前回比 `+1`/`-1` を表示

### AI社員評価で残った指摘（未実装）
| 優先度 | 内容 |
|--------|------|
| 🟡 | 診断スコア推移グラフ（`bsk_result_history`を折れ線で可視化） |
| 🟡 | 「前回から下がったスキル」を強調表示 |
| 🟠 | 診断がセルフ申告バイアスを持つことの注意書き（メタ認知支援） |

---

## 継続コマンド

```
inbox/handoff-2026-04-21-dashboard.md を読んで実装続行して
```
