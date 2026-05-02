# 引継ぎメモ: 電験法規Wiki Phase 3（2026-05-02）

## このメモを読んだら最初にやること

1. `knowledge/denken-hoki-hub-body-architecture.md` を Read（責務境界・5AI議論結果）
2. `denken-hoki-wiki.html` を起動確認: http://127.0.0.1:8092/denken-hoki-wiki.html
3. mkdocs本サイト（kfurufuru.github.io/denken-wiki/）が現在も配信されているか確認
4. 本メモのPhase 3タスクから着手

## Phase 1+2 完了状況（2026-05-02 セッション）

### ✅ Phase 0: 責務境界書（10分）
- `knowledge/denken-hoki-hub-body-architecture.md` 作成済み
- 一行境界: **「Hubは入口と進捗、Bodyは条文と解説」**

### ✅ Phase 1: 新サイト止血（90分）
- WIKI_DATA に `ready:true` フラグを実装済み7ページに追加
- Sidebar に「未実装ページも表示」トグル追加（デフォルトOFF・localStorage永続化）
- ROADMAP嘘数字を実態化（"62%/78ページ" → 実態反映）
- HOT_TOPICS を実装済み6＋準備中2に再構成、ready:falseはdashed border
- 「前回のつづき」をlocalStorage連動・実態進捗化
- HeroのCTA を「過去問10問にチャレンジ」に修正
- スタブページに🚧アイコン

### ✅ Phase 2: mkdocs外部リンク化（60分）
- `MKDOCS_BASE = 'https://kfurufuru.github.io/denken-wiki/'` 定数追加
- WIKI_DATA 全47ページに `ext:` フィールドでmkdocs記事URLマッピング
- StubPage に「本サイトで読む（新規タブ）↗」ボタン追加（最優先動線）
- Sidebar の未実装ページに ↗ ext直接遷移リンク
- HOT_TOPICS の準備中カードに「本サイトで読む ↗」リンク
- Glossary検索結果に「📖 本サイトで詳しく読む ↗」リンク

## 現状の構成

```
新サイト（Hub）= denken-hoki-wiki.html
  ├─ 実装済み: 7ページ（top・一覧表4・工事士法・ランダム10問）
  ├─ Hub専有機能: ROADMAP・HOT_TOPICS・DAILY_Q・Lv.2履歴・Glossary検索
  └─ 未実装46ページ: 各ページの ext で mkdocs 記事に外部リンク

mkdocs本サイト（Body）= kfurufuru.github.io/denken-wiki/
  ├─ themes/ 33テーマ
  ├─ articles/kijun/ 21条文
  ├─ articles/kaishaku/ 30条文
  └─ index.md（mkdocs Material theme）
```

## Phase 3 の残タスク（優先度順）

### P1: link-check.py 作成（必須・1-2h）

**目的**: mkdocs slug変更でHubのリンクが死ぬのを週次検出

**仕様**:
- 入力: `denken-hoki-wiki.html` から `ext:` フィールドを正規表現で全抽出
- 処理: 各 `MKDOCS_BASE + ext` に対して HEAD リクエストで存在確認
- 出力: 死んでいるリンクを `inbox/link-check-YYYY-MM-DD.md` に書き出し
- 配置: `C:/Users/kfuru/.secretary/scripts/link-check.py`

**実装スケッチ**:
```python
import re, requests
content = open('denken-hoki-wiki.html', encoding='utf-8').read()
exts = re.findall(r'ext:\s*["\']([^"\']+)["\']', content)
base = 'https://kfurufuru.github.io/denken-wiki/'
broken = []
for slug in set(exts):
    r = requests.head(base + slug, allow_redirects=True, timeout=5)
    if r.status_code >= 400:
        broken.append((slug, r.status_code))
# Markdownレポート出力
```

**cron化**: `health-monitor/` ディレクトリに統合し、月曜08:00に実行
（既存の health-monitor 構成は要確認）

### P2: mkdocs index.md に Hub への戻り導線追加（30分）

**目的**: Body→Hub の動線を作り、責務分離を完成させる

**作業**:
- `C:/Users/kfuru/Projects/denken-wiki/docs/index.md` の冒頭に以下追加：
  ```markdown
  > 🎯 **動的な学習機能**（進捗管理・タイマー・ランダム10問演習・PDCA）は
  > [**法規Wiki Hub**](http://127.0.0.1:8092/denken-hoki-wiki.html) でご利用ください。
  ```
- ローカル参照URLは将来的にGitHub Pages公開時にURLを更新
- mkdocs build → デプロイ確認

### P3: portal-summary.json への進捗データ統合（2-3h・任意）

**現状**: 「前回のつづき」「ROADMAP」は localStorage と ハードコードの混在
**理想**: `denken3-study-dashboard/data/portal-summary.json` を Hub から fetch して全進捗を一元化

**作業**:
- portal-summary.json のスキーマ確認
- denken-hoki-wiki.html の `// TODO(Phase2)` コメント箇所を fetch ベースに置換
- dev-server.py 経由配信時のCORSが問題ないか確認

### P4: Hub のGitHub Pages公開検討（任意）

**現状**: Hubはローカルファイル（`C:/Users/kfuru/.secretary/denken-hoki-wiki.html`）
**選択肢**:
- A. ローカル運用継続（git管理せず・localStorage完結）
- B. `kfurufuru/secretary-portal` リポにpushしてGitHub Pages公開
- C. 別リポ `kfurufuru/denken-hoki-hub` 作成

→ Hubを共有しないなら A 継続でOK。共有したいなら B/C 検討

### P5: ext URL の手動検証（30分・推奨）

**理由**: 今回マッピングしたext URLは私の推測ベース。実際のmkdocs記事と一致するか確認推奨

**確認対象（特に怪しいもの）**:
- `denatsu-kouka` → `themes/haisen-koji/` （電圧降下が配線工事に含まれているか？）
- `bshu-setsuchi` → `articles/kaishaku/18/` （B種接地は第18条で正しいか？）
- `gijutsu-kijun-gaiyou` → `articles/kijun/` （indexに飛ばすが妥当か？）
- `furyoku-gijutsukijun` / `taiyouchi-gijutsukijun` → `themes/bunsan-dengen/` （該当ページがない場合の代替）

**手順**: link-check.py（P1）が出来てから一括確認

## 重要: 同一リポ並列セッション疑惑

**今回の現象**: WIKI_DATA / HOT_TOPICS の `ready:true` フラグが、私が編集していない箇所に複数回出現した（特に shunin-gijutsusya）

**疑い**: 別のClaudeセッションが同時稼働している可能性。CLAUDE.mdの「同一リポへの並列Claudeセッション禁止」ルール該当

**対策**: Phase 3 着手前に以下確認
- 他のClaude Codeセッションが `denken-hoki-wiki.html` を編集していないか
- 並列セッションがあれば終了させる
- 不審な変更があれば `git diff` で確認

## 検証チェックリスト

Phase 3 着手前に下記を実施：

- [ ] `python -c "..."` で括弧バランス確認（`{ }: 1760/1760` `( ): 1114/1114` `[ ]: 303/303` が現状の数値）
- [ ] dev-server経由で http://127.0.0.1:8092/denken-hoki-wiki.html がエラーなく表示
- [ ] サイドバーに7ページ＋セクション3-4個のみ表示（デフォルト）
- [ ] トグルONで46ページ全表示＋🚧アイコン
- [ ] 未実装ページのStubPageに「本サイトで読む（新規タブ）↗」ボタン
- [ ] HOT_TOPICSの準備中カード2つに「本サイトで読む ↗」リンク
- [ ] Glossary検索で用語クリック→該当ページ→mkdocsへ飛べる

## 関連ファイル

| ファイル | 役割 |
|---|---|
| `denken-hoki-wiki.html` | Hub本体（4076行） |
| `dev-server.py` | ローカル配信（Cache-Control: no-store） |
| `knowledge/denken-hoki-hub-body-architecture.md` | 責務境界書（5AI議論結果） |
| `C:/Users/kfuru/Projects/denken-wiki/` | Body本体（mkdocs） |
| `denken3-study-dashboard/data/portal-summary.json` | 学習進捗データ |
| `inbox/handoff-2026-05-02-denken-hoki-phase3.md` | 本メモ |

## コミット推奨

Phase 1+2の変更をまだコミットしていない可能性。`git status` 確認のうえ：

```
git add denken-hoki-wiki.html knowledge/denken-hoki-hub-body-architecture.md inbox/handoff-2026-05-02-denken-hoki-phase3.md
git commit -m "denken-hoki-wiki: Hub-Body分離Phase 1+2 (47ページ ext マッピング)"
```

## 試験日リマインダー

**2026-08-30（日）**。残り約120日。

Phase 3 のP1（link-check）は試験前にやっておきたい。
P3（portal-summary統合）・P4（GitHub Pages公開）は試験後でも可。
