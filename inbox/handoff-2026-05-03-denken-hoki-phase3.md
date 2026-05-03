# 引継ぎメモ: 電験法規Wiki Phase 3（2026-05-03 更新）

## ⚠️ 重要：並列セッション稼働中

**denken-hoki-wiki.html には別の Claude Code セッションが現在進行形で実装を追加している**

- 直近24時間で12ページ＋5ページ（=17ページ）が新規実装された
- 私（このセッション）の Phase 1+2 編集は別セッションのコミットに自動で取り込まれている
- ただし `ready:true` フラグの整合性は手動メンテで追いつかない → **動的計算化で解決済み**（2026-05-03 f7da14c）

**Phase 3 着手前に必ず確認**:
```bash
# 並列セッションが進めた最新コミットを確認
git log --oneline --since="2026-05-02 12:00" -- denken-hoki-wiki.html | head -10
# 直近24時間のコミット件数
git log --oneline --since="24 hours ago" | wc -l
```

並列稼働は CLAUDE.md「同一リポへの並列Claudeセッション禁止」ルール違反。**本来は時間分離 or 別ブランチで運用すべき**。

## 現状（2026-05-03 朝時点）

### 実装ページ数の推移
| 日時 | ready:true | StubPage | 備考 |
|---|---|---|---|
| 2026-05-02 朝 | 7/53 | 46 | 私の Phase 1 開始時 |
| 2026-05-02 夕 | 18/53 | 35 | 別セッションが11ページ追加 |
| 2026-05-03 朝 | 23/53 (推定) | 30 | 別セッションがさらに5ページ追加 (cbc6433) |

### 実装済みページ確認方法
**真実のソース**: `denken-hoki-wiki.html` の `window.renderPage` switch 文
```bash
python -c "
import re
content = open('denken-hoki-wiki.html', encoding='utf-8').read()
m = re.search(r'window\.renderPage = function.*?default:', content, re.DOTALL)
sw = m.group(0)
stub = re.findall(r\"case '([^']+)':\s*return React\.createElement\(StubPage\", sw)
real = re.findall(r\"case '([^']+)':\s*return React\.createElement\((?!StubPage)([A-Z]\w+)\", sw)
print(f'StubPage: {len(stub)} / 本実装: {len(real)}')
"
```

### Phase 1+2 完了内容（2026-05-02）
- 責務境界書 `knowledge/denken-hoki-hub-body-architecture.md` 作成
- WIKI_DATA に `ready:true` フラグ＋ `ext` URL を全ページにマッピング
- Sidebar に「未実装ページも表示」トグル
- StubPage に「本サイトで読む（新規タブ）↗」ボタン
- HOT_TOPICS / Sidebar / Glossary に mkdocs 直接遷移リンク

### Phase 1+2 追補（2026-05-03 f7da14c）
- 「前回のつづき」を WIKI_DATA から動的計算（並列実装に自動追従）
- ROADMAP も同様に動的計算化（既に別セッションが先取りでコミット済み）

## Phase 3 の残タスク

### 🔴 P0: WIKI_DATA の ready:true フラグ廃止検討（30分・新規）

**問題**: 並列セッションが新ページを実装するたびに、誰かが `ready:true` を WIKI_DATA に追加する必要がある（メンテ負荷大・忘却リスク）

**解決策案**:
1. **renderPage を真実のソースに**: WIKI_DATA から `ready` フィールドを廃止し、ready 判定を `renderPage` の switch で行う
   ```js
   // App 起動時に renderPage の switch を解析して READY_PAGE_IDS を生成
   // または、各 PageComponent に `static ready = true` を持たせる
   ```
2. **暫定対策（このセッションで実施済み）**: ROADMAP・「前回のつづき」を `WIKI_DATA.chapters[].pages.filter(p => p.ready)` で動的計算するので、ready:true 追加忘れがあっても表示が壊れない（ただしサイドバーには出ない）

**推奨**: 並列セッション側に `ready:true` 追加ルールを伝える or 上記1を実装

### P1: link-check.py 作成（必須・1-2h）

mkdocs slug変更検出。仕様は前メモ通り（handoff-2026-05-02-denken-hoki-phase3.md 参照）。

### P2: mkdocs index.md に Hub への戻り導線追加（30分）

`C:/Users/kfuru/Projects/denken-wiki/docs/index.md` に追加：
```markdown
> 🎯 動的な学習機能（進捗管理・タイマー・PDCA）は
> [**法規Wiki Hub**](http://127.0.0.1:8092/denken-hoki-wiki.html) でご利用ください。
```

### P3: portal-summary.json 統合（任意・2-3h）
### P4: GitHub Pages公開検討（任意）
### P5: ext URL 手動検証（30分・推奨）

## 重要：並列セッション運用ルール（追記）

並列セッションが続いている限り、以下を厳守：

1. **編集前に必ず Read で最新状態を確認**（私は今回これで shunin-gijutsusya の謎ready:trueを発見した）
2. **commit 前に `git log --oneline -3` で最新コミットを確認**（衝突回避）
3. **動的計算（React.useMemo）で逃げる**: ハードコードは並列実装でズレる→動的化で根本解決
4. **denken-hoki-wiki.html は時間分離か別ブランチで触れ**（CLAUDE.md準拠）

## このセッションの出力物

| ファイル | コミット | 状態 |
|---|---|---|
| `knowledge/denken-hoki-hub-body-architecture.md` | 別セッションが取り込み済み | ✅ |
| `denken-hoki-wiki.html`（Phase 1+2 + 動的化） | f7da14c（自分）+ 別セッション複数 | ✅ |
| `inbox/handoff-2026-05-02-denken-hoki-phase3.md` | 別セッションが取り込み済み | ✅（古い・本ファイルが最新） |
| `inbox/handoff-2026-05-03-denken-hoki-phase3.md` | 未コミット | ⏳ |

## 試験日
**2026-08-30（日）**。残り約119日。

P1（link-check）は試験前に必須。P3/P4 は試験後でも可。
