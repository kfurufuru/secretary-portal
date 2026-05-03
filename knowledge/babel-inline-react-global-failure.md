---
title: "インラインBabelのReactアプリは1ヶ所の構文エラーで全ページが死ぬ問題と検出ツール"
category: "AI活用"
level: "published"
created: "2026-05-03"
last_reviewed: "2026-05-03"
understanding_score: 4
source: "denken-hoki-wiki.html 2026-05-03 事故調査"
tags: ["Claude", "HTML", "React", "Babel", "検証", "事故分析"]
related: ["knowledge/claude-long-edit-syntax-risk.md", "knowledge/denken-hoki-hub-body-architecture.md"]
---

# インラインBabelのReactアプリは1ヶ所の構文エラーで全ページが死ぬ問題と検出ツール

## TL;DR

`<script type="text/babel">` 一発で全ページを束ねた単一HTML React アプリは、**1ヶ所の構文エラーで全ページの描画が停止**する（モジュール分離していないため）。表面症状は「読み込み中から進まない」のみで、コンソールにも分かりやすいエラーが出ない。`babel_check.py`（Playwright + ブラウザ内 `Babel.transform`）で **行番号・列番号・周辺コード5行付き** で2秒以内に特定可能。

## 発生事象（2026-05-03）

### 症状
ZetsuenIchiranPage（絶縁耐力試験ページ）を編集後、`http://localhost:8092/denken-hoki-wiki.html#zetsuen-ichiran` を開くと **「読み込み中...」のまま固まり**、いつまでも描画されない。

### 真の原因
**編集箇所と全く無関係な L4567 の QuickReview に `a:` キー欠落があった**：

```jsx
// 既存バグ（私の編集とは別ページ・JuyoritsuKeisanPage）
{ q: "負荷率が高いメリットは？", "設備効率良 + 電力料金軽減" },
//                            ↑ ここに a: が必要
```

これ1ヶ所が `<script type="text/babel">` 全体（338,000 chars）の Babel トランスパイルを停止させ、結果として **私が編集していない絶縁耐力試験ページまで含めて全ページが死んだ**。

## なぜ見逃したか

| 要因 | 詳細 |
|---|---|
| クロスページ汚染 | 編集していないページが死ぬので「私の編集が原因」と思い込みやすい |
| 表示が真っ白でない | `<div id="root">読み込み中...</div>` というプレースホルダ文字列が出るので「ロード中」に見える |
| コンソールが分かりにくい | Babel エラーはブラウザネイティブの `SyntaxError` ではなく、Babel の throw として出る。フィルタしないと TensorFlow.js extension の警告に埋もれる |
| `wiki_verify.py` で検出できない | DOM check ベースなので、そもそも DOM が空なら「DOMが空」としか報告できない |
| 既存バグの顕在化 | 該当ページ（JuyoritsuKeisanPage）を実際に閲覧する人がいなかったので、長期間気づかれなかった |

## 検出ツール: `babel_check.py`

Playwright で dev-server を開き、ブラウザ内 `Babel.transform` を全 `<script type="text/babel">` に対して実行：

```bash
python babel_check.py hoki    # → http://localhost:8092/denken-hoki-wiki.html
python babel_check.py riron   # → denken3-riron-wiki.html
```

エラー時の出力例：
```
=== babel_check: http://localhost:8092/denken-hoki-wiki.html ===
scripts: 1 / errors: 1

--- ERROR (script #0) ---
  msg : Unexpected token (3382:45)
  loc : line 3382 col 45
  周辺コード:
     3380:         { q: "負荷率の理想値は？",     a: "100%（高いほど稼働平準化）" },
     3381:         { q: "不等率の最小値は？",     a: "1.0（必ず1以上）" },
     3382:         { q: "負荷率が高いメリットは？","設備効率良 + 電力料金軽減" },
     3383:         { q: "不等率が高いメリットは？","変圧器容量を小型化できる" },
     3384:       ]} />
```

**所要時間 2秒**。pre-commit フック (`.claude/hooks/pre-commit`) に統合済みなので、commit 時に自動実行される（dev-server 起動時のみ）。

## 横展教訓

### 「読み込み中から進まない」= Babel全体停止 = 別ページの構文ミスを疑え

私の編集箇所だけ Read しても解決しない。`babel_check.py` で **ファイル全体を Babel に通す** のが唯一の正解。

### Chrome MCP での即時検出パターン

```javascript
// ブラウザコンソールで実行
(() => {
  const scripts = Array.from(document.querySelectorAll('script[type="text/babel"]'));
  return scripts.map((s, i) => {
    try { Babel.transform(s.textContent, { presets: ['react'] }); return { i, ok: true }; }
    catch (e) { return { i, msg: e.message, line: e.loc?.line }; }
  });
})()
```

### モジュール分離する選択肢（中長期）

`denken-hoki-wiki.html` は単一ファイル React + Babel CDN という構成。モジュール分離（Vite/esbuild ビルド）すれば「1ページの構文エラーで全ページが死ぬ」問題は構造的に消える。ただし学習サイト用途では**配信先（GitHub Pages 等）でビルド工程を増やす**コストが大きく、現状のシンプル構成は理にかなっている。トレードオフ：
- 単一HTML: シンプル・配信容易・編集者が React 知らなくても直せる ／ 1ヶ所のエラーで全画面死ぬ
- ビルド分離: ページ独立・型チェック可能 ／ ビルド設定・CIが必要

→ `babel_check.py` は単一HTML派でも安全に運用するための最小コスト解。

## 落とし穴

- **「自分の編集が原因」と決めつけない**: 別ページの既存バグが私の編集タイミングで顕在化することがある。事故時間と編集箇所の relevance を疑う前に `babel_check.py` を回す
- **`pre-commit` フックの場所**: このリポジトリは `core.hooksPath = .claude/hooks` なので `.git/hooks/pre-commit` を編集しても実行されない。`git config --get core.hooksPath` で必ず確認
- **dev-server 必須**: `babel_check.py` は dev-server 経由でしか動かない。CI 環境では Babel CDN にネットワーク到達可能か事前確認が必要

## 実践メモ

- denken-hoki-wiki.html / denken3-riron-wiki.html を編集したら **必ず `babel_check.py` を実行してから commit**
- 「読み込み中から進まない」報告を受けたら、まず `babel_check.py` → エラー位置を特定 → 修正 → ハードリフレッシュ確認
- pre-commit が `dev-server 未起動 → スキップ` を出した場合は、別ターミナルで `python dev-server.py 8092 .` を起動してから再 commit
