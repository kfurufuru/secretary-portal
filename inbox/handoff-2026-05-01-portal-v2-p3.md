# 引継ぎ: portal-v2.html P3 改善（実データ連携）

**作成日**: 2026-05-01
**前段**: P1（Studies削除・Modules実リンク・残日数動的化）+ P2（AI News重複削除・「すべて見る」リンク化・サイト数動的化）完了済み
**目的**: portal-v2.html のハードコードされた数字・固定リストを実データから動的読込に置換し、運用品質を確保する

---

## 背景

portal-v2.html は Fカンパニー全体のハブ。P1+P2 で「動かないリンク」「嘘の日数」は排除したが、以下が**固定値のまま**残っており、放置すると再び信用を失う:

1. **科目別進捗**（理論94%・電力78%・法規62%・機械55%）→ Notion実データと乖離
2. **連続学習 24/28日 + heatmap 28日分**（固定配列）→ 学習日次と連動していない
3. **アクティビティ5件**（04/26〜04/19）→ 古い日付がそのまま
4. **今日のフォーカス5項目**（08:30/11:00 等の架空スケジュール）→ todos/ と連動なし

## P3 タスク

### Task 1: 科目別進捗・heatmap を records.json から fetch（30分）

**データソース**: `denken3-study-dashboard/data/records.json`
**参照メモリ**: `.claude/projects/C--Users-kfuru--secretary/memory/project_denken3_notion_sync.md`

**実装手順**:
1. `denken3-study-dashboard/data/records.json` の構造を確認
   ```bash
   python -c "import json; print(json.dumps(json.load(open('denken3-study-dashboard/data/records.json'))[:3], ensure_ascii=False, indent=2))"
   ```
2. portal-v2.html の `<script>` 内に fetch 追加:
   ```js
   fetch('denken3-study-dashboard/data/records.json')
     .then(r=>r.json())
     .then(data=>{
       // 科目別: 理論/電力/法規/機械 ごとに正答数を集計
       // heatmap: 過去28日の日次学習有無を [0-4] で量子化
     });
   ```
3. 修正対象:
   - 科目別 `.sub` 4要素（[portal-v2.html:524-527](portal-v2.html#L524) 付近）の `data-subject` 属性を付与し JS で動的更新
   - heatmap `var heat=[2,3,...]` を fetch 結果から生成
   - 連続学習 `<b>24</b>` を実カウントに置換

**注意**: ローカル file:// で開くと CORS エラーになる。`http://localhost:8092` 経由前提。

### Task 2: アクティビティを git log から動的生成（30分）

**データソース**: 直近 git commit 5件
**実装手順**:
1. ローカルで動かす場合は `dev-server.py` に `/api/recent-commits` エンドポイントを追加するか、ビルド時に `recent-commits.json` を生成
2. シンプル案: `cron-jobs/` で日次 `git log --pretty=format:'{"date":"%ad","msg":"%s"}' --date=short -5 > logs/recent-commits.json` を実行
3. portal-v2.html で fetch して `.news .nitem` 5件を生成

**修正対象**: [portal-v2.html:553-559](portal-v2.html#L553) の固定 5 行

### Task 3: フォーカス5項目を todos/today.md から読込（30分）

**データソース**: `todos/today.md`（CLAUDE.md で `- [ ] 内容 | 優先度: ... | 期限: YYYY-MM-DD` 形式と規定）
**実装手順**:
1. `dev-server.py` に `/api/today-todos` を追加（マークダウン → JSON 変換）
2. portal-v2.html で fetch → `.row` 5件を動的生成
3. 完了済み（`- [x]`）は `.row.done` クラス付与

**修正対象**: [portal-v2.html:452-456](portal-v2.html#L452) のフォーカス5項目

---

## 現在のハードコード一覧（P3で消すべき）

| 行 | 内容 | データソース候補 |
|---|---|---|
| 452-456 | フォーカス5項目（08:30/11:00...） | `todos/today.md` |
| 504 | 連続学習 `24` 日 | `records.json` 集計 |
| 524-527 | 科目別 4 行 | `records.json` 集計 |
| 538-543 | システム稼働 6 行 | `health-monitor/link-check-results.json` |
| 553-559 | アクティビティ 5 行 | `git log` |
| 568-602 | Trending Links 6 行 | `links.html` と重複（メンテ二重化リスク） |
| 776 | heatmap `[2,3,4,...]` 配列 | `records.json` 日次集計 |

---

## 設計判断

- **非同期 fetch にする理由**: 静的ページのまま運用するため。サーバーサイドレンダリング不要
- **`http://localhost:8092` 前提**: CLAUDE.md 記載の `dev-server.py` を必ず経由する。file:// は禁止
- **既存固定値は表示用フォールバックとして残す**: fetch 失敗時のグレースフル劣化（数字を消すか、`—` 表示にする）
- **更新頻度**: records.json は Notion 同期コマンドで更新済み。portal を開くたびに最新値が反映される

---

## 完了判定

1. portal-v2.html を開いた時、科目別％が `records.json` の最新値と一致する
2. 試験日まで毎日カウントダウンが進む（既に P1 で達成）
3. 1週間放置しても古い数字が表示されない
4. fetch 失敗時にコンソールエラーが出ても UI が壊れない

---

## 関連ファイル

- `portal-v2.html`: 本体
- `denken3-study-dashboard/data/records.json`: 過去問実データ
- `denken3-study-dashboard/update_dashboard.py`: Notion 同期スクリプト
- `dev-server.py`: ローカル開発サーバー（Cache-Control: no-store）
- `todos/today.md`: 当日 TODO（規約: CLAUDE.md 参照）

## 関連メモリ

- `project_denken3_notion_sync.md` — Notion → records.json 同期メカニズム
- `feedback_completion_rules.md` — 完了宣言は push まで・JS構文検証手順
