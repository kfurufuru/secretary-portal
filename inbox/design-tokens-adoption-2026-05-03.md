---
title: design-tokens.css 採用手順（電験Wiki）
created: 2026-05-03
status: draft
owner: スティーブ・ショガー（Refactoring UI実装監修）
related: ["denken-wiki/docs/stylesheets/design-tokens.css", "denken-wiki/docs/stylesheets/custom.css"]
---

# design-tokens.css 採用手順

DENKEN-WIKI監修部 デザイン班（アイブ・ラムス・原研哉・佐藤可士和・ショガー）の合議で策定したデザイントークンを電験Wikiに段階導入するロールアウト計画。

## 完了済み（2026-05-03）

- [x] `denken-wiki/docs/stylesheets/design-tokens.css` 作成
- [x] `denken-wiki/mkdocs.yml` に `extra_css` 登録（design-tokens.css → custom.css の順）
- [x] `mkdocs build` PASS（8.62秒・トークンロード確認）
- [x] preview検証: 全トークン解決OK、`--font-jp` body適用、MkDocs Material 互換エイリアスも橋渡し済み

## トークン全体像

| カテゴリ | スケール段階 | 監修担当 |
|---|---|---|
| グレー（cool tinted neutral） | 10段階 `--gray-50`〜`--gray-900` | ショガー原則3 |
| プライマリ（teal） | 5段階 `--primary-50/100/300/500/700/900` | ショガー |
| アクセント（blue） | 5段階 `--accent-*` | ショガー |
| セマンティック | 各1色 success/warning/danger/info | アイブ（装飾色禁止） |
| spacing | 8段階 `--space-1`(4px)〜`--space-16`(64px) | ショガー（4の倍数） |
| radius | 4段階 `sm/md/lg/full` | ショガー |
| **影** | **2種のみ** `--shadow-sm` / `--shadow-md` | **アイブ・ラムス** |
| 行間 | 4種 `--lh-jp-tight/jp/jp-loose/en` | 原研哉 |
| 字間 | 4種 `--ls-jp/jp-loose/en/uppercase` | 原研哉 |
| font-size | 8段階 `--text-xs`〜`--text-4xl` | ショガー |
| transition | 2段階 `--ease-out-fast/base` | アイブ |

## 段階移行プラン（custom.css → トークン参照に置換）

### Phase 1: 色のトークン化（次セッション着手推奨）

`custom.css` 内のハードコード色を CSS変数参照に置換。grep で検出可能：

```bash
grep -nE "#[0-9A-Fa-f]{3,6}" denken-wiki/docs/stylesheets/custom.css
```

| 現在のハードコード | 置換先トークン |
|---|---|
| `#2E8B8E` `#2F6F73` `#1F4F52` | `var(--primary-500)` / `var(--primary-700)` |
| `#5BB8BB` | `var(--primary-300)` |
| `#3A7FC0` `#2B6CB0` `#3B6EA8` | `var(--accent-500)` / `var(--accent-700)` |
| `#F8F8F6` `#FFFFFF` `#fff` | `var(--color-bg)` / `var(--color-surface)` |
| `#2C3A45` `#1F2933` | `var(--color-text)` |
| `#637080` `#5F6B7A` | `var(--color-text-muted)` |
| `#E4E2D9` `#E5E1D8` | `var(--color-border)` |
| `#FFF9C4` `#FFF8E6` | `var(--color-highlight)` |
| `#F0E0A0` (tip-banner border) | `var(--color-warning)` 派生 or 別途追加 |
| `#F4F4F2` (code-bg) | `var(--gray-100)` |

### Phase 2: 影のトークン化

```bash
grep -nE "box-shadow:" denken-wiki/docs/stylesheets/custom.css
```

| 現在 | 置換先 |
|---|---|
| `box-shadow: 0 4px 16px rgba(0,0,0,0.1)` (theme-card hover) | `box-shadow: var(--shadow-md)` |

**ルール（アイブ・ラムス）**: 新規CSSを書くとき `box-shadow` は `--shadow-sm` / `--shadow-md` のどちらかだけ使う。直書き禁止。

### Phase 3: spacing・radius のトークン化

| 現在 | 置換先 |
|---|---|
| `padding: 1.25rem` | `padding: var(--space-6)` (=1.5rem) or `var(--space-4)` (=1rem) |
| `padding: 0.65rem 1rem` | `padding: var(--space-3) var(--space-4)` |
| `gap: 1rem` | `gap: var(--space-4)` |
| `border-radius: 8px / 10px / 12px` | `var(--radius-md)` / `var(--radius-lg)` |
| `border-radius: 999px` | `var(--radius-full)` |

**ルール（ショガー）**: 新規CSSの spacing は `--space-*` のスケールから外れない。`0.65rem` のような中間値を書かない（`--space-3` か `--space-4` のどちらかに丸める）。

### Phase 4: font-size のトークン化

| 現在 | 置換先 |
|---|---|
| `font-size: 0.65rem` | `var(--text-xs)` (=0.75rem に丸める) |
| `font-size: 0.75rem` | `var(--text-xs)` |
| `font-size: 0.8rem` `0.875rem` | `var(--text-sm)` |
| `font-size: 0.9rem` | `var(--text-sm)` か `var(--text-base)` |
| `font-size: 1rem` | `var(--text-base)` |
| `font-size: 1.4rem` (icon) | `var(--text-xl)` (=1.25rem) もしくはトークン外で残す |

### Phase 5: 和文タイポの底上げ（原研哉）

`custom.css` の `.theme-card-body p { line-height: 1.5 }` 等を以下のように一括引き上げ：

```css
.md-typeset p {
  line-height: var(--lh-jp);        /* 1.8 */
  letter-spacing: var(--ls-jp);     /* 0.04em */
}
.md-typeset h1, .md-typeset h2, .md-typeset h3 {
  line-height: var(--lh-jp-tight);  /* 1.6 */
  letter-spacing: var(--ls-jp-loose);
}
```

**注意**: MkDocs Material のデフォルトCSSが高specificityで上書きされる箇所がある。導入時は preview で確認しながら進める。

## 監修フロー

1. **ショガー**: Phase 1〜4 のCSS置換を担当（実装作業）
2. **アイブ・ラムス**: Phase 2終了後に「装飾削減チェック」（影2種以外が残っていないか / 不要な色が残っていないか）
3. **原研哉**: Phase 5終了後に「和文組版チェック」（行間・字間・約物処理）
4. **早川 義晴**: 各Phase終了後に「学習者目線チェック」（読みにくくなっていないか）
5. **不動・江間**: 内容に影響していないことの最終確認

## 検証コマンド

```bash
# build確認
cd C:/Users/kfuru/Projects/denken-wiki && mkdocs build 2>&1 | tail -3

# preview起動
# .claude/launch.json の "denken-wiki" を起動 → http://localhost:8005

# トークン解決確認（preview_eval）
getComputedStyle(document.documentElement).getPropertyValue('--space-4')
# → "1rem" が返れば OK

# ハードコード残検出
grep -nE "#[0-9A-Fa-f]{3,6}" denken-wiki/docs/stylesheets/custom.css | wc -l
# 0件 → Phase 1 完了
```

## 横展開予定

design-tokens.css は最終的に以下にも展開する：

- `denken3-riron-wiki.html` (629KB) — 単独HTMLなので `<style>` ブロックに :root 部分を埋め込む
- `denken-hoki-wiki.html` (479KB)
- `denken3-kikai-wiki.html` (136KB)
- `learning-science-wiki.html` (67KB)

これらは MkDocs ではないので、`design-tokens.css` の :root 〜 :root[scheme=slate] 部分だけ `<style>` に転記して使う。

## 次の一手候補

| 優先度 | 内容 | 工数 |
|---|---|---|
| P1 | Phase 1（色トークン化）を custom.css 全体に適用 | 30分 |
| P2 | アイブ・ラムスによる「装飾削減」レビュー実施（実Wikiページで） | 60分 |
| P3 | denken3-riron-wiki.html への横展開（:root 部分転記） | 30分 |
