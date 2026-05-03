# Secretary - パーソナル管理システム

## ユーザープロフィール

- **役割**: 電気エンジニア管理職・電計チームリーダー / 三菱ケミカル設備技術部（電気・計装） / 36歳
- **思考**: 合理主義・実務重視・結論先・根拠必須・抽象論嫌い・再現性重視
- **活動**: 設備投資設計・保全・生成AI業務活用・電験3種受験準備
- **言語**: 日本語
- **デジタルツイン**: `digital-twin/decision-framework.md` / `digital-twin/decision-log/`

## 行動原則

1. 複雑タスクは必ずPlanMode提案→承認後に実行。計画には①実装手順②依存関係③既存ロジックとの競合確認を含める（手戻り防止。1発で正しいコードを出す）
2. 読んでから書く（既存ファイル・テンプレート確認→追記/更新）
3. 新規ファイル作成時は必ず `_template.md` を Read してから Write
4. 検証してから完了宣言（「完了」と明記、HTML編集後はURL提示）。コード生成後はテスト/リンターを実行し、失敗した場合は自己修正してから完了宣言する。完了前に「シニアエンジニアはこれを承認するか？」を自問する
5. コンテキスト管理（15往復超で分割提案、重コマンドは確認後実行）
6. 結論先・数値付き・根拠必須（BLUF、曖昧表現禁止）
7. 有益スキル・機能を会話中に都度提案する
8. 作業中に最適解に気づいたら完了を待たず即報告・切り替え提案する
9. **信頼度チェック** — 実装・判断前に自己評価：≥90%→即実行、70-89%→代替案先提示、<70%→質問。誤方向作業を防ぐ（100トークンで最大50,000トークン節約）。**電気法令の数値・条文・別表は、eGov/METI公式PDFから WebFetch で取得すること。未確認なら数値そのものを記載しない**（[要確認]で誤魔化さない。2026-05-02事故：56条 1.6mm許容電流を11Aと誤記、正：27A）。**並列エージェントには公式URLとWebFetchテンプレを必ず同梱する**（denken-hoki-style.md §7.3 R3 参照）
10. **Progressive Disclosure** — ファイル参照は `Read` して使う（内容を会話に貼らない）。`web-ui-style.md` はUI作成コマンド時のみ参照
11. **次の一手** — Edit/Write/NotebookEdit/MCP書き込みを使った応答の末尾には必ず `## 次の一手` を付ける。モード判定：変更なし→付けない／軽微（1ファイル小修正）→自然文1行／通常以上→P1必須＋P2/P3任意
12. **CLAUDE.md自己学習** — プロジェクト固有の発見（ライブラリの必須オプション・繰り返しエラーと対策・ビルド/テストコマンド）を発見したら当該CLAUDE.mdに即記録する。使うほど精度が上がる設計にする
13. **Self-Improvement Loop** — ユーザーから訂正を受けたら `knowledge/claude-lessons.md` に即記録する（ミス・ルール・適用場面の3点）。同じミスを繰り返さない
14. **Subagent戦略** — 調査・探索・並列分析はサブエージェントにオフロードしてメインコンテキストを保護する。1エージェント=1タスク（集中実行）。並列エージェントでMarkdown生成を依頼する際は出力仕様に「プラン仕様に記載のない内容・例題・数値を独自に追記しないこと」を明示する。**電気法令の数値・条文・別表をエージェントに書かせる場合は、必ず WebFetch で公式PDFを取得させ、出典行を表下に必須化する**（denken-hoki-style.md §7.3 R1〜R5）。**「概念理解用」「目安」エクスキューズで誤値を載せることは禁止**（2026-05-02事故：エージェント推測値が誤魔化しタグで通過しサイト全体の信頼性を毀損）
14a. **エージェント委譲の禁止事項** — 以下はエージェント不可（本体で直接実行）：①ネットワークI/O（WebFetch/curl/PDF DL等）②mkdocs/build等の決定論的検証③小規模ファイル編集（3ファイル以下）。理由：エージェントは外部リソース失敗時にリトライ暴走する（2026-05-02 METI PDF取得で30分消費した実例）。本体並列ツール呼び出しのほうが起動コスト・トークンともに圧倒的に少ない
14b. **ローカル資産優先探索** — 外部リソース（WebFetch・curl・API）に取りに行く前に、必ず以下を `ls` で確認する：①`OneDrive/デスクトップ/`（電験PDF・各種資料の格納場所）②`.secretary/refs/`（公式ソース一次キャッシュ）③`OneDrive/ドキュメント/Claude/`（Fカンパニー資産）。実例：METI dengikaishaku.pdf を30分かけて取得失敗 → ユーザー指摘で `OneDrive/デスクトップ/01_資格・勉強/電験3種/法令/` に最新版（令和7年11月）が揃っていたことが判明（2026-05-02）
15. **学び・改善案の出力** — 一通りの対応が完了したタイミングで必ず以下を出力する：
    - **今回の学び**: 今回の作業で判明した事実・発見・失敗パターン（箇条書き、具体的に）
    - **改善案**: 次回以降に活かせる手順・ルール・自動化の提案（実装コスト付き）

## トークン節約ルール

- **100KB超ファイルは明示的な要求がない限りスキップ**
- 読んだファイルは再読しない（ファイルが変更された可能性がある場合を除く）
- セッションが長くなったら `/cost` でキャッシュ比率を確認するよう提案する
- 無関係な新タスクへ切り替わる際は新セッション開始を推奨する
- ひと言返答・確認は端的に。余計な前置き・締め言葉は書かない
- **大型HTML編集ルール**: HTMLファイル1本 = 1セッション（複数ファイルまたがない）。30分以上のセッションでは `/compact` を実行してからプロンプトを送る。**複数箇所の変更は1ターンにまとめて適用**（Obsidian同期等による巻き戻りリスク軽減）。Edit直後に `wiki_verify.py` で確定確認する
- **ファイル削除前の必須チェック**: `Grep output_mode:"files_with_matches"` でファイル名を検索し、残存リンクがないことを確認してから削除する
- **launch.json変更時**: `runtimeArgs` に指定したファイルパスが実在するか必ず確認する
- **新規HTMLファイル作成時**: portal-v2.html か関連ダッシュボードへのリンクを同時に追加する（孤立ファイル防止）
- **Claude Design → Claude Code ワークフロー**: Claude DesignのHTMLは「Design Filesタブ → index.htmlを右クリック → Download」で取得。ブラウザ経由コード抽出（React fiber / IndexedDB / fetch傍受）は試みない。ユーザーに「Downloads/index.htmlを読んで実装して」と言ってもらうのが最短
- **手動バックアップ禁止**: `.bak` `.old` `.tmp` `~` 付きファイルを作らない。退避は `git stash` または `git branch backup-XXX` を使う（`.gitignore` 登録済みだが、そもそも作成しないのが原則）
- **同一リポへの並列Claudeセッション禁止**: 同じgitリポジトリに対し複数のClaude Codeセッションを同時稼働させない。`git add`/`commit`/`pull --rebase` が他セッションのstaged変更を巻き込み、コミットメッセージとファイル内容の対応が壊れる（実例: 2026-05-02、第57条 audit修正が「第7条fix」コミットにバンドルされた）。並列が必要なら **別ブランチ** または **時間分離** で運用する
- **並列セッション発生時の引継ぎプロトコル**（2026-05-03 確立）: 並列稼働に気づいたら、止める側は以下を引継ぎ書として渡す：①該当アーキテクチャ書のパス（必読）②ext: フィールド等の実装規約 ③動的化の有無 ④残タスク（優先度付き）⑤試験日等のタイムライン。受け取る側は **着手前に** ①引継ぎ書を Read ②`git log --since="24 hours ago" -- <file>` で並列分の差分確認 ③矛盾を整理してから実装。実例: 2026-05-03、denken-hoki-wiki.html で並列稼働発生→引継ぎ書 `inbox/handoff-2026-05-03-denken-hoki-phase3.md` でクリーンに統合
- **denken-hoki-wiki.html 編集規約**（Phase 3 完了後・2026-05-03）: ①新ページ実装時は WIKI_DATA に `ready:true` 不要（renderPage の switch が真実のソース）②`ext:` フィールド変更時は `python scripts/denken_hoki_link_check.py` を実行し death link なし確認 ③編集後は `python denken_hoki_audit.py --quiet` で 全PASS 確認（pre-commit hook 自動実行）④Hub-Body 責務境界：本文・条文解説は Body (mkdocs)、進捗・履歴・横断まとめは Hub。重複禁止

## ファイルルール

- 迷ったら `inbox/` へ。テンプレート必須。上書き禁止（追記のみ）。タイムスタンプ付記
- 1トピック1ファイル（ideas/ research/ knowledge/ denken-study/）
- 命名: 日次=`YYYY-MM-DD.md` / トピック=`kebab-case.md` / テンプレート=`_template.md`
- TODO形式: `- [ ] 内容 | 優先度: 高/通常/低 | 期限: YYYY-MM-DD`

## Notion運用

- 勉強進捗（過去問 実施日・○×）・クイックキャプチャ → **Notion**（スマホ入力）
- AI会話→knowledge/同期: **Stop hookで自動化済み**（ai-exports/process_exports.pyは廃止）
- 日報・週次レビュー・e-log・トラブルログ → **OneDrive/.secretary**

### 過去問履歴同期コマンド（自動実行）

「過去問履歴を更新して」と言われたら → PowerShell で以下を実行：
```powershell
cd C:\Users\kfuru\.secretary\denken3-study-dashboard
python update_dashboard.py
```

**処理内容**:
- Notion DB（ff4fcb73cc14408caedf87c904ae2fd9）から551件の過去問データ取得
- data/records.json（SR追跡）と統合
- index.html へ統計を注入：達成率・分野別ブレークダウン・弱点抽出・PDCA記録・今日のセッション
- 成功時: `✅ 更新完了: YYYY-MM-DD` メッセージが表示される

**環境変数**: NOTION_TOKEN は Windows に永続設定済み（ntn_2920507337527...）

## Obsidian運用

- Vault: `.secretary/` フォルダ = Obsidian Vault（データ移行不要）
- **原本はObsidianのみ** — Notionは共有ビュー。Notionで直接編集しない
- **同期は手動** — 自動双方向同期プラグインは導入しない
- **データの流れ**: Obsidian(原本) → Claude Code(処理) → Notion(公開/共有)
- **電験過去問○×**: Notionに残す（DB管理・スマホ入力に最適）
- 推奨プラグイン: Dataview, Templater, Calendar, Obsidian Git
- 詳細: `knowledge/obsidian-notion-workflow.md`

## NotebookLM運用

- CLI: `notebooklm-py 0.3.4` インストール済み（Python 3.13）。`nblm` ショートカット推奨
- **デジタルツイン分析**: `digital-twin/` 配下の全ファイル（decision-framework.md + decision-log/配下）をソース登録 → 月1回更新 → 判断パターン横断分析
- **ドメイン検索**: `factory/trouble-log.md` + 主要knowledge/をソース登録 → 過去事例検索
- 詳細: `knowledge/notebooklm-py-integration.md` / コマンド: `commands-reference.md`の「分身訓練」「分身に聞く」
- **役割分担**: Claude Code = リアルタイム判断支援、NotebookLM = 過去の自分との対話（蓄積データ横断）

## サイト棲み分けルール

「サイトに追記して」と言われたら、以下の軸で追記先を判断する。

| 軸 | 外部公開 (GitHub Pages) | 内部参照 (ローカル HTML) |
|----|------------------------|------------------------|
| 対象 | 他者に見せる・共有したい | 自分専用・深い解説 |
| 例 | `genai-db` `ei-wiki` `denken-wiki系` | `it-wiki.html` `business-skills/` `claude-code-guide.html` |
| 追記判断 | 「共有したい」「polish済み」 | 「自分で引く」「アナロジー重視」 |

**AI用語の重複ルール**: `genai-db` が正（ツール・動向・最新情報）。`it-wiki.html` は概念理解・アナロジー用。

**追記フロー**: 「〇〇についてサイトに追記して」→ 内容と共有要否を確認 → 該当サイトのファイルを Read → 既存パターンに合わせて Edit

## HTMLコーディングルール（Wiki・ローカルHTMLファイル共通）

- **`§` 使用禁止**: 文字化けの原因になる。セクション番号は `1.` `2.`、条文番号は `第5条` `第14条` のように表記する（HTML・MkDocs markdown 両方に適用）
- 既存の `<span className="h-num">` パターンも同様（`§2` → `2.`）
- **数式は必ず `<Eq tex="..." />` を使う**: `{String.raw\`$...$\`}` や `$...$` 生テキストはKaTeXレンダリングされず文字化けになる
- **HTML編集後の検証必須**: 編集後は必ず Ctrl+Shift+R（ハードリフレッシュ）で確認する。`navigate` ツールは HTTP キャッシュを使うため Babel 再トランスパイルが走らず変更が反映されないことがある。ローカルサーバーは `dev-server.py`（Cache-Control: no-store）を使うこと（`launch.json` で設定済み）
- **MkDocs MarkdownのSVGは必ず`<div>`で囲む**: `<svg>`タグはPython-Markdownのブロックレベル要素リストに含まれないためインライン処理される。その結果rect/circle/line等の図形要素がDOMから欠落する。`<div><svg ...></svg></div>` の形式で必ず囲むこと。空白行も除去すること（両方必要）

## Wiki編集ワークフロー（確定版 2026-04-30）

### 編集フロー（毎回この順番）
```
1. Grep → 行番号特定
2. Read ±20行のみ
3. Edit 適用
4. python wiki_verify.py <page>  ← 検証はこれだけ
5. mkdocs記事の場合は配信内容確認（curl + grep でキーワード検索）
```

### mkdocs serve のファイル監視ロスト問題（2026-05-02事故）

**Windows mkdocs serve は編集後の自動再ビルドを頻繁に取りこぼす**。8000・8002ポートで連続再発。

**再発防止ルール**：

1. **mkdocs serve の表示を信用しない** — 編集後は必ず以下で実HTML確認：
   ```bash
   curl -s http://127.0.0.1:<PORT>/denken-wiki/articles/<path>/<N>/ | grep "編集したキーワード"
   # マッチ件数0なら旧ビルド配信中 → 新ポートで再起動
   ```
2. **編集セッション開始時に新ポート起動** — 旧ポートのキャッシュを避けるため、編集前に必ず新ポート（8003・8004…）で `mkdocs serve --dev-addr=127.0.0.1:<新PORT>` を起動
3. **`--no-livereload` オプション禁止** — ファイル監視も無効化される（2026-05-02の8001ポート事故）
4. **編集後の必須検証フロー**：
   ```bash
   # ① mkdocs build で site/ 再生成（配信に直接影響しないが、構文エラー検出）
   cd C:/Users/kfuru/Projects/denken-wiki && mkdocs build 2>&1 | tail -3
   # ② 実配信HTMLにキーワード含有確認（serveが新版を配信しているか）
   curl -s http://127.0.0.1:<PORT>/denken-wiki/articles/<path>/<N>/ -o /tmp/check.html
   grep -c "編集キーワード" /tmp/check.html
   # ③ 0件なら新ポート起動：mkdocs serve --dev-addr=127.0.0.1:<新PORT>
   ```
5. **ユーザーへURL提示前に必ず実HTML確認** — 自分で配信内容を確認してから提示

### 検証ツール（優先順位厳守）
| 優先 | ツール | トークン | 用途 |
|------|--------|---------|------|
| ✅ 最優先 | `python wiki_verify.py <page>` | ~500 | DOM確認・エラー検知 |
| ✅ 補助 | `preview_eval` + 最小JS | ~100 | 単一値確認 |
| ❌ 禁止 | `preview_snapshot` | ~34,000 | 136K chars = 使わない |
| ❌ 禁止 | `preview_screenshot` | タイムアウト | Babelで30秒→失敗 |

### wiki_ai.py 使い分け（無料優先ポリシー）
**原則: Groq無料 → 品質不足時だけ `--model gemini/openai`**

| クエリ種別 | 正解ツール |
|-----------|-----------|
| パターン検索（単語・記号） | `Grep` ツール直結（wiki_ai不要） |
| コード構造の複雑な探索 | `wiki_ai.py find "英語KW" <file>`（Groq） |
| SVG図生成（簡易） | `wiki_ai.py svg "説明"`（Groq） |
| SVG図生成（高品質） | `wiki_ai.py svg "説明" --model openai` |
| 大ファイル全体分析 | `wiki_ai.py find "..." <file> --model gemini`（1Mコンテキスト） |
| 汎用質問・抽象的な内容 | Claude直接（Groq不向き） |

### 禁止事項（実測による）
- HTMLファイル全体Read禁止（11K行 ≒ 8,000tokens）
- `wiki_ai.py find` に日本語1フレーズだけ渡さない（grep範囲が広くなりすぎる）
- Groqに抽象的な質問を投げない（的外れ回答になる）
- **ブラウザスクリーンショット（MCP Chrome）はセッション全体で最大1枚**。構造確認は `preview_eval` + JS queryで代替する

### 構造確認JS（~100トークン）
```js
// h2の構造確認（セクション番号・タイトル一覧）
Array.from(document.querySelectorAll('.main h2[id]')).map(h=>h.id+': '+h.textContent.trim())
// TOCアイテム数
document.querySelectorAll('.toc li').length
// JSエラー確認
window.__errors || []
```

### 教育的明瞭さ改善ワークフロー
外部で調査した内容をClaudeCodeで適用する手順：

1. **外部調査結果を保存**: `inbox/wiki-clarity-audit-<page>.md` に以下の形式で記録
   ```markdown
   # Wiki明瞭さ監査: <page名>
   ## 問題点
   - [セクション名] 問題の説明
   ## 改善案
   - [セクション名] 具体的な修正内容
   ```
2. **ClaudeCodeへ指示**: `「wiki明瞭さ修正 <ページハッシュ>」` と入力
3. **ClaudeCode動作**: `inbox/wiki-clarity-audit-<page>.md` を Read → 問題点を確認 → 編集フロー（Grep→Read→Edit→wiki_verify.py）で適用

**教育的明瞭さチェックリスト**（ページレビュー時に確認）
- [ ] 引っかけポイントは公式セクションの直後にあるか
- [ ] SVG図のラベルは重複・重なりがないか
- [ ] `[要確認]` などの未完成プレースホルダーが残っていないか
- [ ] `§` 記号を使っていないか（`1.` `2.` 形式に）
- [ ] TOCと本文の番号が一致しているか

### 外部AI活用コマンド
```bash
python wiki_ai.py find "search-chip CSS"  denken3-riron-wiki.html  # コード探索
python wiki_ai.py svg  "RC直列回路、電圧源付き"                    # SVG生成
python wiki_verify.py  transistor                                   # DOM検証
python wiki_verify.py  transistor --screenshot                      # PNG保存付き
```

### AI分業パターン
| タスク | 担当 |
|--------|------|
| 大ファイル内の編集箇所特定 | `wiki_ai.py find`（Groq 無料） |
| SVGダイアグラム生成 | `wiki_ai.py svg`（Groq 無料） |
| 実際のファイル編集 | Claude Code（Edit ツール精度が高い） |
| 検証・DOM確認 | `wiki_verify.py`（Python Playwright） |
| スクリーンショット | `wiki_verify.py --screenshot` |

### 設定済みAPIキー（Windows環境変数）
- `GROQ_API_KEY`: Llama3-70b 無料・128K context（メイン）
- `GEMINI_API_KEY`: 要課金（現在クレジット枯渇中 → 補充で有効化）
- `OPENAI_API_KEY`: 要課金（課金追加で有効化、GPT-4o-mini SVG生成向け）

## 参照

- **コマンド一覧詳細**: `commands-reference.md`（「ヘルプ」で表示）
- **Fカンパニー基盤**: `C:\Users\kfuru\OneDrive\ドキュメント\Claude\`
- **contextファイル（正）**: OneDrive側。更新時はOneDrive→secretaryにコピー
- **L1→L2自動昇格**: `promote.py`（`py promote.py` / `--dry-run`でプレビュー / `--list-drafts`でレビュー待ち一覧）
- **週次運用サイクル**: 月曜08:00自動昇格 → `py promote.py --list-drafts` でdraft確認 → level: draft→review→published に手動更新

---

## 📐 設計図セクション

> 以下は思想・設計図。実装と乖離する可能性あり。整合性は `python claude_md_audit.py` で監査。

### 知識3層モデル

| Layer | 役割 | 対応フォルダ（思想） |
|-------|------|------------|
| **L1: ログ** | 未加工の記録・メモ | `inbox/` `ai-conversations/` `factory/` |
| **L2: 知見** | 昇格した再利用可能な知識・手順 | `knowledge/` `skills/` `research/` `denken-study/` |
| **L3: 原則** | スキル横断の思想・意思決定軸 | `digital-twin/` `CLAUDE.md` |

> L1 → L2 → L3 の昇格方向のみ。逆方向には流れない。

### ディレクトリ構成

```
.secretary/
├── .obsidian/     （Obsidian設定・プラグイン）
├── CLAUDE.md
├── commands-reference.md
├── inbox/ / reviews/ / todos/ / ideas/ / research/ / knowledge/
├── digital-twin/   （decision-log / priorities-framework / communication-style）
├── ai-conversations/ （weekly-digest）
├── denken-study/   （e-log / knowledge-metabolism / feynman-sessions/）
├── factory/        （trouble-log）
├── context/        （facility.md / team.md）
├── personas/ / health-monitor/ / skills/
```

---

## 改訂ポリシー

- **200行超え** → 設計図セクションを `architecture.md` に分離検討
- **300行超え** → 必須分離（CLAUDE.mdは運用ルールのみに）
- **整合性監査**: `python claude_md_audit.py`（月次実行・破損参照を検出）
