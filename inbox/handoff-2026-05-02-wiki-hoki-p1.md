# 引継ぎ: denken-hoki-wiki.html P1修正

**作成日**: 2026-05-02
**前セッション**: Wiki監修（不動・江間・早川 3名査読）完了
**ステータス**: P1修正実行待ち

## 起動時の指示（このまま貼り付け）

```
inbox/wiki-shusyu-2026-05-02-summary.md を読んで P1 の修正実行プラン作成して
```

## P1修正内容（要点）

**目標**: MemTable に `source` prop追加 + 接地/絶縁/離隔/電圧区分の4ページに出典行付与

**着手順（最大頻出maxの接地から）**:
1. **SetsuchiIchiranPage**（接地・freq:max・最優先）
2. **ZetsuenIchiranPage**（絶縁・freq:max）
   - **同時にC1修正**: 倍率 0.64倍の根拠1行追加（不動の指摘）
   - 内容: 「中性点直接接地で対地電圧が相電圧に抑制 → 1.1×(1/√3)≒0.64」
3. **DenAtsuKubunPage**（電圧区分・freq:high）
4. **RikkakuIchiranPage**（離隔・freq:high）

## 公式ソース（江間ペルソナ準拠）

ローカルPDF優先（CLAUDE.md #14a・#14b、`refs/_INDEX.md` 参照）:
- 電技解釈（令和7年11月）: `OneDrive/デスクトップ/01_資格・勉強/電験3種/法令/電気関係法令/電気設備の技術基準の解釈(令和7年11月).pdf`
- 電技解釈の解説（令和7年11月）: 同ディレクトリ
- 電技省令本体（令和5年）: `OneDrive/デスクトップ/01_資格・勉強/電験3種/法令/電気設備に関する技術基準を定める省令(令和5年).pdf`

**WebFetchでMETI PDF取得は禁止**（TCP接続不可・2026-05-02事故）。

**出典行フォーマット**: `出典：電技解釈第○条 別表第○（令和7年11月版）` 版数表記必須（取得日表記は不可）

## モデル戦略（メモリ参照: feedback_model_strategy.md）

新セッションは **`/model sonnet` でSonnetメイン**で開始。0.64倍の根拠文作成だけ `Agent({model:"opus", ...})` でOpusサブ起動推奨。

## 監修成果物（参照ファイル）

- [統合サマリー](inbox/wiki-shusyu-2026-05-02-summary.md) — 修正ロードマップP1〜P3
- [江間 監修](inbox/wiki-shusyu-2026-05-02-ema.md) — 出典なし数値表の詳細
- [不動 監修](inbox/wiki-shusyu-2026-05-02-fudo.md) — 0.64倍根拠の物理背景
- [早川 監修](inbox/wiki-shusyu-2026-05-02-hayakawa.md) — P2/P3の改善提案

## 想定工数

- P1（MemTable改修 + 4ページ出典付与 + 0.64倍根拠1行）: **約40分**
- P2（法規特有表現3列表 5ページ展開）: 次回機会・約2.5時間
- P3（SVG追加・全体像セクション）: 試験前・約4時間

## 完了判定

- [ ] MemTableコンポーネントに `source` prop追加済み
- [ ] 4ページの数値表全件に出典行 `（令和7年11月版）` 記載済み
- [ ] ZetsuenIchiranPage に 0.64倍の物理的根拠1行記載済み
- [ ] 公式PDFと数値が一致確認済み
- [ ] ブラウザで `http://localhost:8092/denken-hoki-wiki.html` 確認、レンダ正常
- [ ] 完了報告 + 確認URL提示
