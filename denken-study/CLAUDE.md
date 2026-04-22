# 電験3種学習wiki — LLM Wiki

Mode: F (Book/Course) + E (Research)
Purpose: 電験3種の理解深化・相互参照・矛盾検出による学習効率化
Owner: 古舘
Created: 2026-04-22

## Structure

denken-study/
├── .raw/              # テキスト・過去問・PDFの置き場（読み取り専用）
├── wiki/
│   ├── index.md       # 全ページカタログ
│   ├── log.md         # 操作ログ（append-only）
│   ├── hot.md         # ホットキャッシュ（最新コンテキスト ~500語）
│   ├── overview.md    # 全体概要
│   ├── concepts/      # 電気理論・法規・機械の概念ページ
│   │   └── _index.md
│   ├── themes/        # 分野別テーマ（理論・電力・機械・法規）
│   │   └── _index.md
│   ├── entities/      # 法令・参考書・出題傾向エンティティ
│   │   └── _index.md
│   ├── synthesis/     # 自分の理解・横断まとめ
│   ├── questions/     # 過去問Q&A・解説
│   └── meta/          # lint・ダッシュボード
├── WIKI.md            # LLM Wikiスキーマ（このシステムの仕様書）
└── CLAUDE.md          # このファイル

## Conventions

- 全ノートにYAML frontmatter必須（type, status, created, updated, tags）
- Wikilinkは [[ページ名]] 形式（パス不要・ファイル名はユニーク）
- .raw/ はソース文書置き場 — 絶対に変更しない
- wiki/index.md はマスターカタログ — ingest毎に更新
- wiki/log.md はappend-only — 新エントリは先頭に追加

## Domain Tags

- #theory（電気理論）
- #power（電力）
- #machine（機械）
- #regulation（法規）
- #calculation（計算問題）
- #concept（概念理解）

## 電験固有ルール

- 重要度ランク: A（頻出・必須）/ B（中頻度）/ C（低頻度・深堀り不要）
- 矛盾検出優先: 公式の導出過程と暗記値が食い違う場合は必ずフラグ
- 過去問リンク: wiki/questions/ に年度・問番号でファイル作成

## Operations

- Ingest: .raw/にファイルを置き「ingest [ファイル名]」と打つ
- Query: 何でも質問 → Claudeがindex→関連ページ→回答を合成
- Lint: 「lint the wiki」でヘルスチェック
- Hot cache更新: 各セッション終了時に wiki/hot.md を更新
