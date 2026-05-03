# 並列セッション事故レポート 2026-05-03

## サマリ

denken-hoki-wiki.html の **絶縁耐力試験ページ大規模リライト中**、別セッション or auto-commit プロセスがファイル変更を巻き込んで **無関係なメッセージで commit してしまった**。CLAUDE.md「同一リポへの並列Claudeセッション禁止」が警告していた事故が実発生。

## タイムライン

| 時刻 | 出来事 |
|---|---|
| 〜11:46 | Claude セッションA（本セッション）が `denken-hoki-wiki.html` を編集中：ZetsuenPositionMap 追加・ZetsuenFrameSvg 追加・15-1表 全行反映・第14条/第15条の役割明確化・新規セクション 4-D/6/11/15 追加 |
| 11:58 | コミット `a9675b0` 「**hoki-wiki: 試験日カウントダウン Hero に追加 + 並列セッション残FAIL修正**」が発生。本来の主題は「試験日カウントダウン Hero」だが、私の絶縁耐力試験ページ全変更が **メッセージ無関係のまま混入** |
| 12:?? | 本セッションが `git status` で `denken-hoki-wiki.html` が unmodified を発見 → `git show a9675b0` で混入を特定 |

## 検出方法

```bash
# git statusでM denken-hoki-wiki.html が消えていることに気付く
git status --short denken-hoki-wiki.html
# → 何も表示されない（HEADと同じ状態）

# git logで最近のコミットを確認
git log --oneline -5
# → a9675b0 hoki-wiki: 試験日カウントダウン Hero に追加 + 並列セッション残FAIL修正

# git showで内容確認
git show a9675b0 -- denken-hoki-wiki.html | grep -E "ZetsuenPositionMap|ZetsuenFrameSvg|令和7年11月版PDF照合|15-1表"
# → 私の編集が含まれていることが確認できた
```

## 影響

- ✅ ファイル内容は失われていない（HEAD に正しく反映されている）
- ❌ コミットメッセージとファイル内容の対応が破壊された
- ❌ 「a9675b0 が何を変更したか」を後から追跡する人が混乱する
- ❌ revert したい時、「試験日カウントダウン Hero」を戻すと絶縁耐力試験ページの正確な数値も巻き戻る

## 原因（推定）

**並列セッションまたは auto-commit プロセス**が以下のいずれかを実行した：

1. `git add denken-hoki-wiki.html` してから commit（私が編集中の最新状態を取り込んだ）
2. `git add -A` または `git add .` で全変更を取り込んだ
3. auto: knowledge snapshot 系プロセスとは別の auto-commit が稼働

**特定できたこと**:
- `auto: knowledge snapshot` 系コミットは「1 files」しか変更しないので別物
- `a9675b0` は人為的なコミットメッセージ → 別 Claude セッションの可能性が極めて高い

**特定できなかったこと**:
- 並列セッションがどこで動いていたか
- そのセッションが何の作業をしていたか（「試験日カウントダウン Hero 追加」が真の主題）

## 再発防止策

### 即時対応（本セッション内で完了）
- ✅ `babel_check.py` を作成（Babel 構文チェック・行番号特定）
- ✅ `.claude/hooks/pre-commit` に babel_check.py を統合（`denken-(hoki|3-riron)-wiki.html` staged 時に自動実行）
- ✅ `.claude/rules/html-coding.md` に検証ルールを明文化

### 中期対応（次セッション以降）
- ⏳ **auto-commit メカニズムの特定**: `auto: knowledge snapshot` を生成しているスクリプトが見つけられなかった（`*.py` `.claude/hooks/` `.claude/scripts/` schtasks に該当なし）。ユーザーに所在を確認する必要あり
- ⏳ **ロックファイル方式**: `.git/.claude-session-lock` に現在のセッションID・PID・開始時刻を書き、別セッションは git add の前にチェックする pre-commit ロジック
- ⏳ **auto-commit の防衛的実装**: `git add -A` ではなく `git add knowledge/*.md` のように特定パスのみ stage する。他人の変更を巻き込まない

### 長期対応
- 並列セッションが必要な作業は **別ブランチ** または **時間分離** に必ず分ける（CLAUDE.md 既存ルール）
- 大型編集中は `inbox/handoff-YYYY-MM-DD-XXX.md` で「私はここを編集中・他セッション禁止」を明示

## 教訓

1. **「私の編集が消えた」と思ったら git log で別コミットに混入されていないか確認**
2. **`git status --short` で「あるはずの M がない」は混入のサイン**
3. **Babel/JSX 構文エラーで全画面停止するアーキテクチャは並列編集の事故を増幅する** — 1ヶ所の小さな衝突で全画面死ぬ
4. **commit メッセージとファイル内容の対応**: 並列セッション事故では破壊される。後から git log で何が起きたか分からなくなる

## 関連

- `CLAUDE.md` 「同一リポへの並列Claudeセッション禁止」セクション（既存ルール・本事故で再々発）
- `.claude/rules/html-coding.md` 「大型HTML編集後の必須検証」セクション（本事故で追加）
- 過去事例: 2026-05-02 第57条 audit 修正が「第7条fix」コミットにバンドルされた事故（同種の根本原因）

---

**記録**: 2026-05-03 12:?? / Claude セッションA（古舘さん本セッション）
