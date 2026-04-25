---
description: Web UIデザインシステム。「[名前] 作って」コマンド時のみ参照。CSS変数・テイスト・カラーパレット・技術スタック
---

# Web UI デザインシステム

## CSS変数（:root に必ず定義）

```css
:root {
  --font-base: 'Inter', 'Noto Sans JP', sans-serif;
  --fs-h1: 2rem; --fs-h2: 1.5rem; --fs-h3: 1.25rem;
  --fs-body: 0.95rem; --fs-sm: 0.85rem; --lh-body: 1.6;
  --fw-normal: 400; --fw-bold: 700;
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px; --sp-4: 16px;
  --sp-6: 24px; --sp-8: 32px; --sp-12: 48px; --sp-16: 64px;
  --transition: 0.2s ease; --hover-lift: translateY(-2px);
  --radius-sm: 6px; --radius-md: 12px; --radius-lg: 20px;
  /* 日本語組版 */
  --lh-heading: 1.4; --lh-long: 1.8; --ls-heading: 0.04em; --ls-body: normal;
}
```

## テイストカタログ

| ID | 用途 | 特徴 |
|----|------|------|
| `cyber` | ダッシュボード | ダーク基調・ネオンアクセント・グラスモーフィズム |
| `minimal-card` | ポータル | 白orダーク・カードグリッド・微グラデーション |
| `hero-bold` | LP | フルスクリーンヒーロー・大胆グラデーション |
| `clean-system` | 社内ツール | 明快な階層構造・アクション明示・高視認性 |
| `warm-reader` | ドキュメント | 温かみ・広い行間・読みやすさ優先（`--lh-long: 2.0` にオーバーライド） |

## カラーパレット

| パレット名 | メインカラー（グラデ） | アクセント | 推奨テイスト |
|-----------|----------------------|-----------|-------------|
| Indigo Night | `#1e1b4b` → `#312e81` | `#f59e0b` | cyber |
| Forest Tech | `#064e3b` → `#065f46` | `#10b981` | clean-system |
| Rose Chrome | `#1c1917` → `#292524` | `#f43f5e` | hero-bold |
| Ocean Spark | `#0c4a6e` → `#155e75` | `#f97316` | hero-bold |
| Violet Pulse | `#2e1065` → `#4c1d95` | `#84cc16` | cyber / minimal-card |
| Slate Frost | `#0f172a` → `#1e293b` | `#38bdf8` | cyber / clean-system |
| Copper Dusk | `#1a1a2e` → `#16213e` | `#e2725b` | warm-reader |
| Midnight Mint | `#0d1117` → `#161b22` | `#2dd4bf` | cyber / minimal-card |

## 技術スタック

- 1ファイル完結（HTML + `<style>` + `<script>`）
- Lucide Icons: `https://unpkg.com/lucide@latest`
- Chart.js: `https://cdn.jsdelivr.net/npm/chart.js`
- Google Fonts: Inter + Noto Sans JP
- モバイル対応: 768px / 480px の2段階ブレークポイント必須
- viewport meta 必須
- 禁則処理（グローバル必須）: `line-break: strict; overflow-wrap: break-word; word-break: normal;`
