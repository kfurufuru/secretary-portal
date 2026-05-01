# 引き継ぎ: 法規Wiki HOT TOPICS フェーズB

## 前セッション完了内容（フェーズA）

`C:\Users\kfuru\.secretary\denken-hoki-wiki.html` に対して以下完了済：

1. **HOT_TOPICS を S・A 8枚構成に差し替え**（denken-hoki-wiki.html:1934-1944）
   - 電気工事士法（B・count:0）・分散型電源（B）を削除
   - 「電気工作物の区分」(kosakubutsu-bunrui, count:10 仮置き) を S 枠に追加
2. **9枚→8枚カードに `onClick={() => onNav && onNav(t.pageId)}`＋hoverフィードバック**（denken-hoki-wiki.html:2136-2154）
3. **StubPage に「過去問演習へ」誘導ボタン**（denken-hoki-wiki.html:1885付近・kakomon-randomへnav）

検証済: `python wiki_verify.py top --file hoki` で console_errors=[], js_errors=[] 確認。

## このセッションでやること

### 最優先タスク: kakomon-b（B問題）をハブ化

`kakomon-b` は現在 StubPage。B問題対策9ページへのリンクリスト＋年度別出題表を実装する。

#### 9ページの所在（denken-hoki-wiki.html:931-939）

```
sec01「B問題・計算問題対策」CH04
- zetsuen-tairyoku   (1.1) 絶縁耐力試験       freq:max
- denatsu-kouka      (1.2) 電圧降下           freq:high
- shisen-hikisama    (1.3) 支線の引張強さ     freq:high
- henshatsuki-koritu (1.4) 変圧器の全日効率   freq:high
- ryokuritsu-kaizen  (1.5) 力率改善           freq:mid
- juyoritsu-keisan   (1.6) 需要率・負荷率・不等率（計算） freq:max
- bshu-setsuchi      (1.7) B種接地抵抗値      freq:max
```
※ 7ページしか sec01 にない。「9ページ」の根拠は HOT_TOPICS 定義の `pages: 9` だが要再確認。WIKI_DATA 全体から B問題関連を grep して確定する。

#### 実装手順
1. `denken-hoki-wiki.html:1808` の `case 'kakomon-b':` を新コンポーネント `KakomonBHubPage` に差し替え
2. ハブページ構成案:
   - 冒頭: 「B問題は配点が大きく頻出。9ページを押さえれば得点源」
   - **対策ページ一覧**（カードグリッド・各ページへのonNav）
   - **年度別出題表**（freq:maxを上位）
   - **B問題の典型ひっかけ**（小セクション）
3. 既存 SetsuchiIchiranPage / ZetsuenIchiranPage と同じ構成パターンに揃える（h2 3つ・MemTable・TrapTable・QuickReview）

#### 設計上の注意（前セッション粗探し反映）
- `onNav` は HomePage 同様 `onNav && onNav(...)` ガードパターン必須
- a11y拡張（role/tabIndex）は今回もスコープ外
- StubPage 共通の「過去問演習へ」ボタンは残す（ハブはあくまで構造化された目次）
- count値の根拠なし数字は禁止（CLAUDE.md信頼度<70%）→ 出題年度の記載は確実なものだけ

### 次のフェーズB候補（kakomon-b 完了後）
優先順:
1. ✅ kakomon-b（このセッション）
2. kosakubutsu-bunrui（電気工作物の区分・法規基本）
3. shunin-gijutsusya（主任技術者）
4. hoan-kitei（保安規程）
5. jiko-hokoku（事故報告）
6. densenro（電線路）

### 検証手順
```bash
python wiki_verify.py kakomon-b --file hoki
# JSエラー無し・page_title="B問題だけ"以外の新タイトルになることを確認
```
ハードリフレッシュ Ctrl+Shift+R 必須（Babel再トランスパイル）。
確認URL: http://localhost:8092/denken-hoki-wiki.html#kakomon-b

### 完了条件
- 9ページへのリンクが全部動く
- 年度別表が表示
- JSエラー無し
- `git diff` でフェーズA分の変更が壊れていないこと

### 後回しTODO（このセッションでは触らない）
- 接地一覧・絶縁一覧の条文番号追加（既存ページ改善・別セッション）
- count値の過去問データ確定（Notion DB集計）
- HOT_TOPICS の `pages: 9` 数字根拠確認

## 関連ファイル
- 編集対象: `C:\Users\kfuru\.secretary\denken-hoki-wiki.html`
- 検証: `C:\Users\kfuru\.secretary\wiki_verify.py`
- プラン履歴: `C:\Users\kfuru\.claude\plans\http-localhost-8092-denken-hoki-wiki-htm-curried-frog.md`
