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

---

# 追加タスク（P3 と並列で実行可）

## Task A: コミット（5分）

P1+P2 の変更を1コミットにまとめる:

```bash
cd /c/Users/kfuru/.secretary
git add portal-v2.html inbox/handoff-2026-05-01-portal-v2-p3.md
git commit -m "$(cat <<'EOF'
feat(portal): P1+P2適用 — dead link排除・動的カウント

P1: Studies タブ削除・Modules 5項目を実リンク化・残日数JS計算
P2: AI News重複削除・「すべて見る」5箇所を<a>化・サイト数動的化

ハードコード排除し portal-v2.html の信頼性を回復。
P3 引継ぎを inbox/handoff-2026-05-01-portal-v2-p3.md に保存。

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

**注意**: `git status` を先に確認。`denken3-study-dashboard/` などの未関係変更を巻き込まない。

## Task B: html-coding.md に規約追記（10分）

**目的**: 今回の `<span class="more">` 問題を再発させない

**対象ファイル**: `.claude/rules/html-coding.md`（存在しなければ新規作成）

**追記内容**:
```markdown
## クリック可能要素の規約

- **クリック可能テキスト（「すべて見る」「詳細」「もっと見る」等）は必ず `<a>` または `<button>`**
- `<span class="more">` 等の「リンクっぽい装飾要素」は禁止。クリックして動かないとユーザーが portal 全体を信用しなくなる
- 例外: 純粋な装飾アイコン（dot pulse 等）や日付表示（"2026.08" 等）は span で可

## 静的数字の規約

- 残日数・進捗％・サイト数・連続学習日数など**時間と共に変化する数字は必ず JS で動的計算**
- 固定値で書く場合は `id="..."` を付与し JS 上書き前提にする
- データソースは:
  - 学習データ: `denken3-study-dashboard/data/records.json`
  - サイト数: DOM カウント
  - TODO: `todos/today.md`
  - アクティビティ: git log
```

**追加理由**: portal-v2.html 改修中に「`<span class="more">` の存在自体が危険」と判明。CLAUDE.md 行動原則 12（自己学習）に従い、発見した規約を記録する。

## Task C: health-monitor に portal-v2.html を追加（5分）

**目的**: 月次でリンク切れ・古い数字を自動検知

**対象**: `health-monitor/` 配下（既存の link-check 設定）

**手順**:
1. `health-monitor/` のディレクトリ構造を確認
   ```bash
   ls health-monitor/
   cat health-monitor/link-check-results.json | head -20
   ```
2. portal-v2.html を月次チェック対象に追加
3. 検知すべき項目:
   - dead link（href="#" / 存在しないファイルパス）
   - 古い日付（30日以上前のハードコード）
   - 古いハードコード％（records.json と乖離 > 10pt）

**完了判定**: health-monitor 実行時に portal-v2.html の品質レポートが出力される

---

## 実行順序の推奨

1. **Task A（コミット）を最優先**: 今の変更を保護してから次へ
2. **P3 Task 1（科目別 fetch）**: 一番運用効果が高い
3. **Task B（規約追記）**: 短時間で完了・横展開価値大
4. **P3 Task 2/3（git log / todos fetch）**: dev-server.py 拡張が必要なので時間取れる時に
5. **Task C（health-monitor）**: 一番後回しでよい

## 全体所要時間目安

- Task A: 5分
- P3 Task 1: 30分
- Task B: 10分
- P3 Task 2: 30分
- P3 Task 3: 30分
- Task C: 5分
- **合計: 110分**（2セッション分割推奨）
