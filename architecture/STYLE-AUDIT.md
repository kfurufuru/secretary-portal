# Architecture Maps — Style & Consistency Audit (2026-05-16)

5枚のアーキマップ（ai-shain / hoki-wiki / denken-wiki / ei-wiki / setsubi-bumon）の **視覚スタイル・データスキーマ・index.html label の整合性** を読み取り専用で監査した結果。

## Summary

- Total maps audited: 5
- Major divergences (構造・スキーマ): **6**
- Minor divergences (見た目の微差): **7**
- 既存5枚は **2系統に分かれる**:
  - **系統A (3枚)** = denken-wiki / ei-wiki / setsubi-bumon — 同じCSSテンプレを共有 (node 168-170px、bg #131a2e、ハイライト yellow box-shadow 2px)
  - **系統B-1 (1枚)** = hoki-wiki — CSS変数 `--c-*` で色管理、box 160px、lane-label に背景チップ
  - **系統B-2 (1枚)** = ai-shain — CSS変数 `--bg-elev` で管理、node 180px、border-left 3px stripe
- 5枚すべて **canvas (1380-1860px) × sidebar (320-360px)** の dark theme SPA。基本構造は揃っている。

---

## Visual style matrix

| Aspect | ai-shain | hoki-wiki | denken-wiki | ei-wiki | setsubi-bumon | Verdict |
|---|---|---|---|---|---|---|
| Background (body) | `#0a0e1a` | `#0a0e1a` | `#0a0e1a` | `#0a0e1a` | `#0a0e1a` | ✓ unified |
| Background (header) | `#0a0e1a` (no override) | `#0c1224` | `#0d1325` | `#0d1325` | `#0d1325` | ✗ ai-shain/hoki が独自 |
| Background (node) | `var(--bg-elev)` `#121829` | `var(--bg2)` `#11172a` | `#131a2e` | `#131a2e` | `#131a2e` | ✗ 3系統 |
| Background (sidebar) | `var(--bg-elev)` `#121829` | `#0c1224` | `#0c1122` | `#0c1122` | `#0c1122` | ✗ 3系統 |
| Body color | `#e6ebf5` (`--fg`) | `#e8ecf5` (`--ink`) | `#d9e1f2` | `#d9e1f2` | `#d9e1f2` | ✗ 3系統 |
| Font family | `"SF Mono","Cascadia Mono","Consolas","Menlo", monospace` | `'SF Mono','Consolas','Menlo','Source Code Pro',ui-monospace,monospace` | `ui-monospace,"SF Mono","Cascadia Mono","Roboto Mono",Menlo,Consolas,monospace` | 同左 | 同左 | ✗ 3バリアント |
| Font size base | 13px | 13px | 13px | 13px | 13px | ✓ |
| H1 size | 20px | 18px | 19px | 19px | 19px | ✗ ai-shain 20 / hoki 18 / 他 19 |
| Sidebar width | 340px | 320px | 340px | 340px | 360px | ✗ 3バリアント |
| Canvas width | 1380px | 1400px | 1400px | 1860px | 1600px | (内容量による・許容) |
| Node width | 180px | 160px | 168px | 168px | 170px | ✗ 4バリアント |
| Node border-radius | 6px | 8px | 8px | 8px | 8px | ✗ ai-shain だけ 6 |
| Node border / stripe | `border-left:3px` solid (色は border-color) | `border:1px solid` + `.cat` chip | `border:1.5px solid #2a3556` + 別 `.stripe` 4px | 同 denken | 同 denken | ✗ 3系統 |
| Hover/highlight state | `border-color: --hl`, `box-shadow 0 0 0 1px + 16px rgba(255,213,79,0.25)` | 同左 (1px + 18px) | `border-color:#ffd54f`, `box-shadow 0 0 0 2px (0.35) + 18px (0.18)`, `transform: translateY(-1px)` | 同 denken | 同 denken | ✗ 2系統 |
| Highlight color (yellow) | `#ffd54f` | `#ffd166` (`--accent`) | `#ffd54f` | `#ffd54f` | `#ffd54f` | ✗ hoki だけ `#ffd166` |
| Dim opacity | 0.18 | 0.18 | 0.18 | 0.16 | 0.18 | ✗ ei-wiki だけ 0.16 |
| Lane label casing | `text-transform:uppercase` + 英語 (`ACTORS`, `FLOWS`) | `text-transform:uppercase` + 英語 (`SOURCE (.jsx / .js)`) | `text-transform:uppercase` + 英日混在 (`AI REVIEWERS (社内・三段監修)`) | 英日混在 (`06 TROUBLE — 症状逆引き`) | 日本語のみ (`設備技術部 上位 (1SL / 部長)`) | ✗ 3スタイル |
| Lane label size | 10px / letter-spacing 0.12em | 11px / 0.08em / 背景チップ付 | 10px / 1px | 10px / 1px | 10px / 1px | ✗ hoki だけサイズ・チップ独自 |
| Legend swatch | `.swatch` 12×12 / radius 3px | `.legend .chip` (background付丸ピル) + `.sw` 10×10 / radius 2px | `.legend .sw` 12×12 / radius 3px | 同 denken | 同 denken | ✗ hoki だけ chip 形式 |
| Flow list active | `border-color: --hl` + `background: rgba(255,213,79,0.08)` | active には `▸` プレフィックス追加 | `.flow-btn.active` background `#2a2818` (yellowish) | 同 denken | 同 denken | ✗ 3スタイル |
| Step numbering | sidebar `.step-n` テキスト `#ffd54f` 太字 (HTML側で `n` 表示) | CSS `counter-increment` で circular badge (yellow 16px 円) | `.step .n` 数字テキスト yellow | 同 denken | 同 denken | ✗ hoki だけ円バッジ |
| Connection line color | `#3a4a6a` (default), yellow on hl | `#2c3656`, yellow on hl, `stroke-width 1→1.8` | (HTML側 line color 要確認) | (同) | (同) | (おおむね揃う) |
| Arrowhead | 標準SVG marker (yellow on hl) | `defs marker id=ah` / `ah-hl` | (同 系統A) | (同) | (同) | ✓ |
| Header layout | 上部 full-width + main grid 2列 | `.app` grid 2列 + header `grid-column:1/-1` | `.layout` 2列 (header 上部 full) | 同 denken | 同 denken | (微差・許容) |

---

## Data schema divergences

### Top-level JSON keys

| Field | ai-shain | hoki | denken | ei | setsubi |
|---|:-:|:-:|:-:|:-:|:-:|
| `system` | ✓ | ✓ | ✓ | ✓ | ✗ (`metadata.title`) |
| `generated` | ✓ | ✓ | ✓ | ✓ | ✗ (`metadata.generated_on`) |
| `description` | ✓ | ✓ | ✓ | ✓ | ✗ (なし) |
| `categories` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `components` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `connections` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `flows` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `notes` | ✓ | ✓ | (なし) | (なし) | (なし) |
| `repo_path` / `site_url` | (なし) | ✓ | ✓ | ✓ | (`metadata.source_refs`) |

→ **Major #1**: `setsubi-bumon-map.json` だけ `metadata.*` ラップ。他4枚はフラット。

### Component object schema

| Field | ai | hoki | denken | ei | setsubi |
|---|:-:|:-:|:-:|:-:|:-:|
| `id` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `category` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `label` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `subtitle` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `file` | ✓ (null可) | ✓ | ✓ | ✓ | **✗ なし** |
| `verified` | 全件 true | 全件 (1件 false) | 全件 (3件 false) | **1件のみ true** (116件欠落) | 全件 (2件 false) |
| `note` (条件付) | (なし) | あり | あり | あり (1件) | あり |

→ **Major #2**: `ei-wiki` は components に `verified` をほぼ書いていない (117中1件)。他は全件記載。
→ **Major #3**: `setsubi-bumon` は `file:` フィールド自体が無い。

### Connection format

| | ai-shain | hoki | denken | ei | setsubi |
|---|:-:|:-:|:-:|:-:|:-:|
| 形式 | dict | dict | dict | **array [3]** | **array [3]** |
| 内訳 | `from`/`to`/`kind` | `from`/`to`/`label` | `from`/`to`/`label` | `[from,to,label]` | `[from,to,label]` |

→ **Major #4**: 2系統に分裂。さらに dict 系の中でも `kind:` (ai-shain) と `label:` (hoki/denken) で意味が違う。
- `kind` は "invokes/parallel-agent/writes-via" などの **関係タイプ** 語彙
- `label` は "ブラウザでアクセス" などの **自然文**

### Flow object schema

| Field | ai-shain | hoki | denken | ei | setsubi |
|---|:-:|:-:|:-:|:-:|:-:|
| `id` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `label` | ✓ | ✓ | ✓ | ✓ | ✓ |
| `color` | ✗ | ✗ | ✓ | ✓ | ✓ |
| `highlight` | ✗ | `highlight_components` / `highlight_connections` の **2分割** | `highlight` (合体) | `highlight` | `highlight` |
| `steps` | ✓ dict | ✓ dict | ✓ dict | ✓ array | ✓ array |

### Step format

| | ai | hoki | denken | ei | setsubi |
|---|:-:|:-:|:-:|:-:|:-:|
| 形式 | dict | dict | dict | **array [3]** | **array [3]** |
| 必須キー | `n`/`from`/`to`/`what`/`data` | `n`/`actor`/`action` | `n`/`label`/`detail` | `[n, title, detail]` | `[n, title, detail]` |

→ **Major #5**: dict系3枚の中でも step の dict キーが3バリアント (`what/data` vs `actor/action` vs `label/detail`)。

---

## Portal index.html label vs actual count

`index.html:698-702` の small text 表記と JSON 実数の突合 (`components` 件数 = nodes、`flows` 件数 = flows)。

| Map | 表記 (index.html) | 実数 (JSON) | 一致 |
|---|---|---|:-:|
| ai-shain | 19 nodes / 5 flows | 19 / 5 | ✓ |
| hoki-wiki | **45** nodes / 8 flows | **44** / 8 | ✗ -1 |
| denken-wiki | **45** nodes / 9 flows | **44** / 9 | ✗ -1 |
| ei-wiki | **96** nodes / 8 flows | **117** / 8 | ✗ +21 |
| setsubi-bumon | **60** nodes / 10 flows | **42** / 10 | ✗ -18 |

→ **Major #6**: 5枚中4枚で nodes 件数が一致しない。特に ei-wiki と setsubi-bumon は20件規模のズレ。flow 件数はすべて一致。

---

## Naming convention issues

### Component id casing

- すべて **kebab-case** で統一 (snake_case / camelCase 0件)。
- ただし接頭辞ポリシーは map ごとに違う:
  - ei-wiki: `<category>-<topic>` (`koatsu-trf`, `keiso-pid`) — 1パターン
  - setsubi-bumon: `<prefix>-<short>` (`p-hozen`, `d-kigyo`, `t-plantia`) — カテゴリ別1文字prefix
  - hoki-wiki: `comp-*`, `page-*`, `ls-*`, `cdn-*` — モジュール別prefix
  - denken-wiki: 自由 (`gold-58`, `audit-kakomon`, `ci-deploy`)
  - ai-shain: 自由 (`consult-skill`, `notion-mcp`)

→ 統一ルールなし。マップ間 cross-ref は無いので機能上の問題ではないが、可読性で揺れあり。

### Category id

- ほとんど短い英単語 1語: `actor`/`skill`/`page`/`build` 等。
- denken-wiki のみ **ハイフン入り** 2語あり: `ai-reviewer`, `external-ai`。他は単一語。
- ei-wiki は **ローマ字日本語** (`koatsu`, `teiatsu`, `keiso`, `sekkei`, `hozen`, `koji`, `hoantokei`)。他はすべて英語語彙。

### `file:` フィールドのパス表記

| Map | パス形式 | 例 |
|---|---|---|
| ai-shain | 混在: home `~/...` (7) + 相対 `.secretary/...` (8) | 統一感あり |
| hoki-wiki | 混在: 絶対 `C:/Users/kfuru/.secretary/...` (15) + 相対 (23) | "ファイル特定" と "シンボル参照" 混在 |
| denken-wiki | ほぼ相対 `denken-wiki-master/...` (32) + home (3 ペルソナ) | 揃っている |
| ei-wiki | 全件相対 `docs/*.md` | 統一 ✓ |
| setsubi-bumon | フィールド自体なし | (該当なし) |

- すべて **forward slash** で統一 (backslash は 0 件)。
- 絶対パスを使うのは hoki だけ。他は repo-relative。

---

## Recommendations (優先順)

### 優先度: 高 (公開ラベルの正確性)

1. **`index.html:698-702` の nodes/flows 件数を実数に直す** (Major #6) — 5枚中4枚ズレ。
   - hoki: 45 → 44, denken: 45 → 44, ei: 96 → 117, setsubi: 60 → 42
2. **`setsubi-bumon-map.json` をフラット top-level に正規化** (Major #1) — `metadata.title` → `system`、`metadata.generated_on` → `generated`、`metadata.notes` → `notes`。HTML 側のレンダラを書き直す必要なし (HTMLは別個に DATA を内蔵している)。

### 優先度: 中 (スキーマ統一)

3. **Connection 形式を dict `{from, to, label}` に統一** (Major #4) — ei-wiki / setsubi-bumon の `[from,to,label]` array を変換。さらに ai-shain の `kind:` を `label:` に rename (kind の語彙的価値を残したい場合は `kind` を別フィールドとして共存)。
4. **Step 形式を dict `{n, label, detail}` に統一** (Major #5) — denken-wiki が事実上の最大公約数。ai-shain の `what/data` と hoki の `actor/action` を `label/detail` に rename、ei / setsubi の array を dict 化。
5. **Component に `verified` 必須化** (Major #2) — ei-wiki の 116 件に `verified: true|false` を補完。
6. **Component に `file` 必須化 (or 明示 null)** (Major #3) — setsubi-bumon に追加 (社内ツールなので大半 null で良い)。

### 優先度: 低 (見た目の統一)

7. **CSSテンプレを 1つに統一** — 系統A (denken/ei/setsubi) の CSS をベースに、ai-shain と hoki も合わせる。具体的には:
   - body color: `#d9e1f2` に統一 (ai-shain `#e6ebf5`, hoki `#e8ecf5` を寄せる)
   - node width: `168px` に統一 (ai-shain 180 / hoki 160 / setsubi 170 を寄せる)
   - node border-radius: `8px` に統一 (ai-shain 6 → 8)
   - sidebar width: `340px` に統一 (hoki 320 / setsubi 360 を寄せる)
   - highlight yellow: `#ffd54f` に統一 (hoki `#ffd166` → `#ffd54f`)
   - H1: `19px` に統一
8. **Lane label の言語ポリシーを決める** — 現状 ei-wiki 「英日併記」が情報量で勝つ (`06 TROUBLE — 症状逆引き`)。これを標準にすれば setsubi（日本語のみ）と hoki/ai-shain/denken（英のみ or 英主体）を寄せられる。
9. **Lane label のスタイル** — hoki だけ「背景チップ + position:absolute top:-10px」で他と異質。系統A の「lane 内左上に薄色テキスト」に寄せる方が拡張時に楽。
10. **Step UI** — hoki の円バッジ numbering は視認性で勝つので、これを標準にする選択もあり (denken/ei/setsubi の「テキスト数字」を寄せる)。
11. **Connection の `kind` 語彙化** — もし `kind` を残すなら enum 一覧化 (`invokes`, `parallel-agent`, `reads-rules`, `writes-via`, ...) してドキュメント化。

### 優先度: 任意 (移植性)

12. **CSS変数化** — ai-shain と hoki は変数定義済み、denken/ei/setsubi はハードコード。`--bg`, `--bg-elev`, `--fg`, `--fg-mute`, `--hl`, `--line` の6変数を全マップに導入すれば配色変更が1箇所で済む。
13. **`file:` パス形式の統一** — hoki の絶対パスを repo-relative に揃える (例: `C:/Users/kfuru/.secretary/hoki-data.js` → `hoki-data.js`)。
14. **Category id ポリシー** — denken の `ai-reviewer` / `external-ai` のハイフン入りを 1語化 (`reviewer` / `externalai` または `ai_reviewer` ではなく `aireviewer`)、もしくは「ハイフン許容」を明文化。

---

## まとめ

5枚は **「インスパイア源は同じだが3世代の派生がある」** 状態。

- **第1世代 (ai-shain)**: CSS変数 / dict step `what/data`
- **第2世代 (hoki-wiki)**: CSS変数 / dict step `actor/action` / chip-style legend / counter badge
- **第3世代 (denken / ei / setsubi)**: 共通CSS / array vs dict が混在

致命的な機能差はない (全マップ動作する)。一方で **index.html の件数ラベルが4/5 でズレている (Major #6)** はユーザー向け数字なので最優先で修正推奨。スキーマ統一 (Major #1-5) は将来の集約マップ / グラフDB化を考えるなら今のうちに揃える価値あり。
