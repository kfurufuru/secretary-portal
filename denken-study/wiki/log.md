---
type: meta
title: "Wiki Log"
---
# Wiki Log

_新エントリは先頭に追加（append-only）_

---

## [2026-04-22] ingest | 電験王 機械・電力 過去問PDF 2冊

- Source: 電験王 過去問_機械.pdf（404p）・電験王 過去問‗電力.pdf（334p）
- Summary: [[電験王-機械-令和4年度版]], [[電験王-電力-令和4年度版]]
- Pages created:
  - sources/: 機械・電力各1ページ
  - entities/機械: [[回転機]], [[変圧器]], [[自動制御]]
  - entities/電力: [[水力発電]], [[火力発電]], [[送電線路]]
- Key insight: 機械=回転機すべり比(1:s:1-s)が核心。電力=送電電圧と損失の2乗反比例が実務直結

---

## [2026-04-22] ingest | 電験王 法規・理論 過去問PDF 2冊

- Source: 電験王 過去問_法規.pdf（343p）・電験王 過去問_理論.pdf（363p）
- Summary: [[電験王-法規-令和4年度版]], [[電験王-理論-令和4年度版]]
- Pages created:
  - sources/: [[電験王-法規-令和4年度版]], [[電験王-理論-令和4年度版]]
  - entities/法規: [[電気事業法]], [[電気設備技術基準及びその解釈]], [[電気施設管理]]
  - entities/理論: [[電磁気]], [[電気回路]], [[電子理論]], [[電気及び電子計測]]
- Key insight: 法規頻出=接地工事数値・需要率/負荷率/不等率計算。理論頻出=テブナン・三相・RLC共振

---

## [2026-04-22] scaffold | 電験3種 Wiki 初期化

- 実施: SCAFFOLD（Mode F+E）
- 作成: wiki/ 全構造（index, log, hot, overview, 4分野themes, concepts, entities, meta, _templates）
- 次のステップ: .raw/ に電験テキストPDFを置いて `ingest [ファイル名]` を実行
