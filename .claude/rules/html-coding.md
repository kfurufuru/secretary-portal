# HTMLコーディングルール（追補）

CLAUDE.md「HTMLコーディングルール」と「Wiki編集ワークフロー」の補完。
本ファイルは portal-v2.html・ダッシュボード系のローカルHTML全般に適用される。

## クリック可能要素の規約

- **クリック可能テキスト（「すべて見る」「詳細」「もっと見る」「記録を見る」等）は必ず `<a>` または `<button>`**
- `<span class="more">`・`<div class="link">` などの「リンクっぽい装飾要素」は禁止。クリックして動かない要素が並ぶと portal 全体への信頼が崩れる
- 例外: 純粋な装飾アイコン（dot pulse 等）や日付表示（"2026.08" 等）は span で可

## 静的数字の規約（動的計算が必須）

- **時間と共に変化する数字は必ず JS で動的計算**: 残日数 / 進捗％ / サイト数 / 連続学習日数 / アクティブ日数 / heatmap 等
- 固定値で書く場合は `id="..."` または `data-*` 属性を付与し JS 上書き前提にする
- fetch 失敗時のフォールバックとして初期ハードコード値を残してよい（グレースフル劣化）
- データソース対応表:

  | 表示内容 | データソース | 生成タイミング |
  |---|---|---|
  | 学習進捗（科目別％・連続学習・heatmap） | `denken3-study-dashboard/data/portal-summary.json` | `python denken3-study-dashboard/update_dashboard.py` 実行時 |
  | サイト数 | DOM カウント（`.sites-cols .site` 数） | ページロード時 |
  | TODO 5項目 | `todos/today.md` | （未実装。`/api/today-todos` 構想） |
  | アクティビティ | git log | （未実装。`logs/recent-commits.json` 構想） |

## fetch 設計の原則

- **`http://localhost:8092` 経由前提**: `dev-server.py`（Cache-Control: no-store）で配信する
- file:// で開くと CORS で fetch が失敗する → 動作確認時は必ず dev-server 経由
- fetch には `cache: "no-store"` を必ず指定する
- `.catch()` で console.warn にとどめ、UI を壊さない

## 参照
- 上位ルール: `CLAUDE.md` §HTMLコーディングルール / §Wiki編集ワークフロー
- 学習データ生成: `denken3-study-dashboard/update_dashboard.py`
- 引継ぎ起点: `inbox/handoff-2026-05-01-portal-v2-p3.md`
