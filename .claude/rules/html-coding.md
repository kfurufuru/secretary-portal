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

## リスト表示の規約（Markdown / HTML 共通）

- **`/` 区切りで3個以上のリンクを1行に並べない**。読みにくく、横スクロールや折り返しでさらに崩れる
- 3個以上 → 箇条書き（`- ` 形式）またはテーブルに展開する
- テーブル化の判断: 各項目に重要度・要点など「列で揃えたい属性」があればテーブル、単純な列挙なら箇条書き
- 横展開チェック: 1ファイル内で同パターンが他にもないか `Grep "\) [🔥—].*/ \["` 等で確認してから完了
- **テーブル化前にソート基準を明示する**: 重要度順・出題頻度順・条文番号順・学習順のどれで並べるか先に決める。視覚整列だけでは改悪になる
- **同一データを複数列で重複表示しない**: 重要度を条文セル内とは別列にも書く等は禁止。1属性=1列の原則

## fetch 設計の原則

- **`http://localhost:8092` 経由前提**: `dev-server.py`（Cache-Control: no-store）で配信する
- file:// で開くと CORS で fetch が失敗する → 動作確認時は必ず dev-server 経由
- fetch には `cache: "no-store"` を必ず指定する
- `.catch()` で console.warn にとどめ、UI を壊さない

## 大型HTML編集後の必須検証（Babel構文チェック）

`denken-hoki-wiki.html` `denken3-riron-wiki.html` のような単一HTML React アプリは、**1ヶ所の構文エラーで全画面が「読み込み中」のまま停止**する（モジュール分離していないため、Babel が `<script type="text/babel">` 全体のトランスパイルに失敗するとレンダリングが起きない）。

事故事例: 2026-05-03、QuickReview の `{ q: "...", "..." }`（`a:` キー欠落）1ヶ所が原因で、編集していない絶縁耐力試験ページまで全画面停止。表面的には「私の編集が壊した」ように見えるが、実は別ページの既存バグが顕在化していた。

**ルール**: HTML 大型編集後・commit 前に必ず以下を実行：

```bash
python babel_check.py hoki    # denken-hoki-wiki.html
python babel_check.py riron   # denken3-riron-wiki.html
```

エラー時は **行番号・列番号・周辺コード5行** が表示されるので即修正できる。`wiki_verify.py` の前段（DOM検証より先）として位置付ける。

`pre-commit` フックに統合済み（`.claude/hooks/pre-commit` — `core.hooksPath` で `.git/hooks` ではなくこちらが使われる）。bypass 禁止（`--no-verify` 厳禁）。

## 参照
- 上位ルール: `CLAUDE.md` §HTMLコーディングルール / §Wiki編集ワークフロー
- 学習データ生成: `denken3-study-dashboard/update_dashboard.py`
- 引継ぎ起点: `inbox/handoff-2026-05-01-portal-v2-p3.md`
