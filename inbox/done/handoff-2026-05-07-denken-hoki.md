# 引き継ぎ: denken-hoki-wiki 1.8/1.9 改善継続

**日付**: 2026-05-07
**前任**: priceless-galileo-ffb942 worktree（古舘さんとClaudeの協業セッション）
**対象**: hoki-wiki（電験3種 法規Wiki）特に 1.8 中性点非接地系の地絡電流 / 1.9 零相変流器（ZCT）の仕組み

---

## 🎯 これまでの到達点（v1.0 → v1.4）

### ライフサイクル
- **v1.0** (2026-05-06): 初版作成（R05下問11対応）
- **v1.1**: ChatGPT 10点アドバイス対応（接地方式比較表・フェーザ図SVG・実務メモ・関連法規）
- **v1.2**: Gemini Gem第一原理対応（条文要点引用・法規ピラミッド色分け・歴史的変遷・支配因子）
- **v1.3**: ChatGPT 7点アドバイス対応（最短解法カード・ZCT前提依存ボックス・GR整定値断定削除・R05下問11(a)(b)解法フロー完成）
- **v1.4**: 直前確認モード（30秒UI）+ MasteredToggle（localStorage 周回管理）

### 1.8 ページ構成（19セクション）
1. ⚡ 直前確認モード（最上部・公式・TOP3トラップ・ジャンプボタン・覚えたトグル）
2. ゴール問題（R05下問11(b)）
3. 結論ボックス（前提付き）
4. 📋 試験用最短解法カード
5. MetaStrip
6. §3 試験で問われること（5点）
7. §4 略号と役割（ZCT/GR/CB/I_g/I_zct/C₁C₂）
8. ⚠ ZCT検出電流の前提依存ボックス
9. §5 接地方式3種比較（時間軸補強）
10. §6 深掘り①：対地電圧変換（SVG含む）
11. §7 深掘り②：3相C考慮（電流経路SVG・ベクトル和SVG）
12. §8 深掘り③：健全相√3倍（フェーザ図SVG）
13. §9 深掘り④：C_b/C_c分流（回路図SVG）
14. §10 深掘り⑤：保護動作シーケンス（タイムラインSVG）
15. §11 解き方
16. §12 暗記ポイント
17. §13 ひっかけ全11項目
18. §14 過去問R05下問11(a)(b) 完成版
19. §15-19 類題/実務メモ/関連法規/1分復習/掛け算

### 1.9 ZCTページ（独立化済）
- §5 物理構造SVG（環状鉄心+3線一括貫通+二次巻線）
- §7 電流ベクトル比較SVG（平常時 vs 地絡時）
- §8「3線一括貫通の理由」（SNR論）

---

## 📚 重要な学び（未来セッション向け）

### 1. 段階的品質向上プロセス
- 1ページを v1.0 → v1.4 と4回バージョンアップ
- フィードバック→反映→push のサイクルを高速化
- UpdateLog にバージョン理由を必ず記録

### 2. SVGイラスト設計原則
- **6枚のSVG**で複雑な現象を分解（電圧定義/電流経路/フェーザ/ベクトル和/回路図/シーケンス）
- **番号付きステップ**でループを追えるように
- **レイアウト**：左右分割より**上下分割**が見やすい（§7改善で実証）
- **電流方向**：AC電流は半サイクルで反転するが、**電験テキスト慣例**（V_a→fault→大地）に合わせる
- **色**：穏やか設計（背景 --bg-elev、強調は**文字色のみ**、背景色禁止）

### 3. 教材構造の3層モデル
- **直前確認**（30秒UI）= 試験前ザッピング
- **最短解法カード**（思考順序）= 本番で式を選ぶ
- **深掘り解説**（理解）= 暗記でなく因果を理解

### 4. 断定回避と前提明示
- 「ZCT検出 = 自設備分のみ」 → 「**事故点・ZCT位置に依存**」
- 「GR整定値 = 200〜600mA」 → 「**設備条件で異なる**」
- ChatGPT/Gem アドバイスで「断定危険」指摘されたら受け入れる

### 5. AI社員ディスカッション
- **ひろゆき・落合陽一・ホリエモン** 3者検証パターン
- それぞれ役割：合理派/技術派/行動派
- 提案→GO待ち→実装で決断速度UP

### 6. Git運用パターン
- rebase前のorigin/main差分確認必須（[feedback_pre_rebase_diff_check.md](C:\Users\kfuru\.claude\projects\C--Users-kfuru--secretary\memory\feedback_pre_rebase_diff_check.md)）
- ビルドスクリプト `build-hoki-wiki.py` は `__file__` ベース自動検出
- `git push origin claude/branch:main` で fast-forward push

### 7. ChatGPT/Geminiアドバイスの取り入れ方
- 全部採用せず**選別**（採用/補強/不採用 の3段階）
- wiki本体への反映と**別Skill**への分離
  - `denken-deep-explain` Skill 作成済（C:/Users/kfuru/.claude/skills/）

---

## 🚧 未完了タスク（優先度順）

### 🔴 高優先度

#### A. 1.7 B種接地抵抗値ページ実装（stub解消）
- 現状: stub（[hoki-pages.jsx:17](hoki-pages.jsx:17)）
- freq: **max**（最頻出）
- 推奨構成（4層）:
  1. B種接地の意義（解釈17条1項・混触時保護）
  2. **地絡電流 Ig の算定式**（解釈17条別表・架空/ケーブル別・こう長補正）
  3. R_B 算定（150/300/600/Ig）
  4. 過去問演習（H29・R02・R04 等）
- 1.8（非接地系）と対比して「接地系 vs 非接地系」のCrossRefを作る
- 1.8と同じ構成（直前確認モード等）を踏襲

### 🟡 中優先度

#### B. 1.9 ZCTページに直前確認モード追加
- 1.8と同様の最上部UIを 1.9 にも追加
- MasteredToggle pageId="zerosou-henryuki" で周回管理

#### C. 他ページへのMasteredToggle展開
- 既存実装ページ（KojiShiHoPage, SetsuchiIchiranPage 等）
- 直前確認モードまでは要らないが、**覚えた/未習得ボタン** だけでも周回管理に有効

#### D. denken-deep-explain Skill の運用テスト
- C:/Users/kfuru/.claude/skills/denken-deep-explain/SKILL.md
- まだ実際に発動・出力していない
- 14章テンプレが実用的か検証

### 🟢 低優先度

#### E. 1.7/1.8/1.9 連携の整理
- 学習動線：1.7 B種接地 → 1.8 中性点非接地 → 1.9 ZCT → 2.1 接地工事一覧
- 各ページのCrossRefを整理して相互リンクを最適化
- DGRページ（将来1.10）の検討

#### F. 1.8 §7 SVG（番号付きトレース）の更なる改善
- ChatGPTフィードバック「見にくい」を上下分割で対応済だが、まだ番号バッジが小さい/位置が分かりにくい可能性
- ユーザーの再フィードバック待ち

#### G. localStorage 周回管理の集計UI
- 全ページのMasteredToggle状態をダッシュボードで一覧表示
- 「未習得ページ N件 / 全 M件」の進捗表示
- 既存の「弱点Top3」表示と統合検討

---

## 🛠️ 重要ファイル

### Wiki本体
- [hoki-pages.jsx](hoki-pages.jsx) — 全ページ定義（HichuseiJirakuPage, ZeroSouHenryukiPage 等）
- [hoki-components.jsx](hoki-components.jsx) — 共通コンポーネント（MasteredToggle, PlainExplain, MemTable 等）
- [hoki-data.js](hoki-data.js) — ページ一覧データ
- [denken-hoki-wiki.html](denken-hoki-wiki.html) — ビルド成果物（直接編集禁止）
- [build-hoki-wiki.py](build-hoki-wiki.py) — ビルドスクリプト（`__file__` ベース自動検出）

### Skill
- C:/Users/kfuru/.claude/skills/denken-deep-explain/SKILL.md — 14章超深掘り解説テンプレ

### Memory（重要参照先）
- [feedback_wiki_color_policy.md](C:\Users\kfuru\.claude\projects\C--Users-kfuru--secretary\memory\feedback_wiki_color_policy.md) — 色設計ポリシー
- [feedback_pre_rebase_diff_check.md](C:\Users\kfuru\.claude\projects\C--Users-kfuru--secretary\memory\feedback_pre_rebase_diff_check.md) — rebase前差分確認
- [feedback_no_direct_html_edit.md](C:\Users\kfuru\.claude\projects\C--Users-kfuru--secretary\memory\feedback_no_direct_html_edit.md) — HTML直接編集禁止
- [feedback_implementation_discipline.md](C:\Users\kfuru\.claude\projects\C--Users-kfuru--secretary\memory\feedback_implementation_discipline.md) — 実装前設計確定

### 関連コミット（最新）
- aba21d5 v1.4 直前確認モード
- 795a43a §7 SVG向き反転
- 9f7cbf0 1.9 ZCTページ新設
- 206b674 v1.1 ChatGPT 10点
- 212c311 v1.0 初版

---

## 🎬 次のセッション開始時の推奨手順

1. **状態把握** (5分)
   - `git fetch origin && git log --oneline HEAD..origin/main` で並列開発の差分確認
   - https://kfurufuru.github.io/secretary-portal/denken-hoki-wiki.html#hichusei-jiraku で公開状態を確認

2. **タスク選択**
   - 古舘さんの指示があればそれを優先
   - 指示がなければ「1.7 B種接地抵抗値ページ実装」が最優先（freq:max・stub）

3. **作業フロー**
   - AI社員ディスカッション → プラン提示 → GO → 実装 → ビルド → push
   - 1.8と同じ構成（直前確認モード/最短解法/深掘り/過去問）を踏襲

4. **コミットメッセージパターン**
   - `feat(hoki-wiki): X.Y タイトル - 主要追加項目`
   - 詳細は本文で構造化（- 箇条書き）
   - Co-Authored-By: Claude Opus 4.7 を必ず付ける

---

## 🚦 注意事項

- **HTML直接編集禁止** — 必ず *.jsx → build-hoki-wiki.py 経由
- **背景色禁止** — コンポーネント背景は --bg-elev 一択（PlainExplainのオレンジ事件参照）
- **断定回避** — 「常に」「必ず」「だけ」は前提条件と一緒に書く
- **rebase前fetch** — origin/main の並列開発を見落とさない
- **AC電流方向** — 電験テキスト慣例（V_a→fault→大地）に揃える
