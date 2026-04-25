---
title: "Claude長編集での構文破壊リスクと検証プロトコル"
category: "AI活用"
level: "published"
created: "2026-04-23"
last_reviewed: "2026-04-23"
understanding_score: 4
source: "python-dekirukoto.html Phase 1a検証（2026-04-23）"
tags: ["Claude", "HTML", "検証", "Haiku", "構文"]
related: ["knowledge/mcp-claude-integration.md", "knowledge/portal-health-observability.md"]
---

# Claude長編集での構文破壊リスクと検証プロトコル

## TL;DR

Haiku/Sonnetが長い配列やオブジェクトを編集すると、**閉じ括弧の誤配置で残りコードが宙に浮く**構文破壊が発生する。検証時に「完了」宣言を信じず、必ずブラウザで動作確認する。発見したバグは`console.error`ではなく**構文エラーで無音停止**するため気づきにくい。

## 発生事象（2026-04-23）

### 症状
`business-skills/python-dekirukoto.html` で Phase 1a（矢印フロー12本）実装後、ブラウザで矢印が**1本も表示されない**。Haikuは「完了」とhandoffを渡していた。

### 原因
ITEMS配列の編集で `];` が**途中に混入**。後続の items（pytest-auto等）が配列外の宙ぶらりんな記述となり、`Unexpected token ':'` で**JS全体が停止**。

```javascript
  }
];                    // ← 配列がここで閉じている
    can: "...",       // ← ここから宙ぶらりん（構文エラー）
    scene: "...",
```

結果: `ITEMS`, `FLOW_CONNECTIONS`, `renderCards`, `drawArrows` 全てが`undefined` となり、**ページが真っ白に近い状態**で表示されていた（統計0件）。

## なぜ見逃したか

1. **エラーがDOMに出ない**: JS構文エラーはブラウザコンソールにのみ出力。HTMLは構造上正常にレンダリングされる
2. **ヘッダー・フッターは表示される**: 一見「何か表示されている」ので気づきにくい
3. **Haikuの「完了」宣言**: 長編集の副作用を自己検証しない
4. **preview_eval で初めて判明**: `typeof ITEMS === 'undefined'` で即座に発覚

## 横展教訓（他の作業にも効く）

### 長い配列/オブジェクトの編集後は必ず構文チェック

```bash
# インラインJSを抽出してnodeで検証
sed -n '245,655p' file.html > /tmp/check.js
node -c /tmp/check.js
```

### 「完了」宣言の信頼度階層

| レベル | 信頼度 | 検証要件 |
|-------|-------|---------|
| Haikuの「完了」 | 低 | ブラウザ実機確認必須 |
| Sonnet/Opus の「完了」 | 中 | 構文チェック + DOM確認 |
| 自分でコード読み切った後 | 高 | スポット確認でOK |

### preview_eval の有効性
`cards.length`, `typeof ITEMS`, `svg.children.length` の3点セットで**30秒でバグ検出**可能。スクリーンショットより先に実行すべき。

## 落とし穴

- **「画面が表示されている＝動いている」は誤り**: JSが死んでも静的HTMLは出る
- **コンソールエラーを見ない検証は無意味**: `preview_console_logs` か `preview_eval` で確認
- **Haikuに長編集を任せた後はOpusで構文検証**: Haikuの自己検証は当てにならない

## 実践メモ

- HTML編集後の検証順序: ①構文チェック（node -c）→ ②preview_eval で主要変数の存在確認 → ③スクリーンショット
- 「http://localhost:xxxx/... で確認してください」と言う前に**自分でpreview_evalを実行**
- 編集範囲が100行超の配列/オブジェクトなら、編集後に必ず `wc -l` と `grep -c "^};"` で件数の妥当性確認
