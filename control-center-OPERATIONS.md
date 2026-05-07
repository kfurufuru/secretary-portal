# Personal Control Center 運用ガイド

> **対象ファイル**: `control-center.html` (v1.3 / Material 3 Light+Dark / React+Babel CDN)
> **配信URL**: `http://localhost:8765/control-center.html` （ローカル python http.server 経由）

---

## 朝06:00 のフロー（標準動線）

```
1. iPhone/PCで PWA アイコン or ブックマークから開く
2. Core 5 カードが即表示
   - Command Bar (時計・天気・異常検知・Stakeholder)
   - AI Daily Brief (前夜キャッシュまたは06:00自動再生成)
   - TOP 3 ACTIONS (前日のチェック状態は維持)
   - Schedule | Recovery (本日の予定+昨夜の睡眠)
3. AI Brief 下の「TOP 3 ACTIONS に取り込む」ボタンで日次更新
4. 必要に応じて Ambient (Video/News) や Reference (External/Growth/Ammo) を展開
5. 各タスク完了時にチェックボックスを ON
6. 12:00 自動で「午後のフォーカス」brief 再生成
7. 17:00 自動で「夜のクロージング+明日の準備」brief 再生成
```

---

## 初回セットアップ（5分）

### 1. APIキー取得
1. <https://console.anthropic.com/settings/keys> にアクセス
2. "Create Key" → 名前 "Personal Control Center" → 作成
3. `sk-ant-api03-...` で始まるキーを **クリップボードにコピー**（再表示不可）

### 2. ダッシュボード設定
1. ヘッダー右上の `⚙` をクリック
2. **AI Daily Brief セクション**：
   - APIキー欄にペースト
   - 追加コンテキスト（任意）：本日の懸念事項・優先プロジェクトなど
   - 「AI設定を保存」
3. **Google Calendar 連携（推奨）**：
   - Client ID 取得（下記 §Google Calendar 参照）
   - ペースト → 「Client ID 保存」 → 「Googleで接続」
   - 権限承認 → 自動で本日の予定が Schedule に反映
4. **Today's Schedule セクション**（Calendar未使用時のみ）：
   - JSON で会議リスト編集（time/title/goal/prep%/status）
   - 「Schedule 保存」
5. **Recovery セクション**：
   - JSON で Apple Watch 値を入力
   - 「Recovery 保存」

### Google Calendar 連携手順（5分）
1. <https://console.cloud.google.com/apis/credentials> にアクセス
2. **プロジェクト作成**（例: "Personal Control Center"）
3. **APIライブラリ** → "Google Calendar API" 検索 → **有効化**
4. **認証情報** → 「OAuth クライアント ID を作成」
   - アプリケーションの種類: **Web application**
   - 名前: 任意（例: "Control Center Local"）
   - **承認済JavaScript生成元**: `http://localhost:8765` を**必ず追加**
   - 作成 → Client ID をコピー
5. ダッシュボードの ⚙ → Google Calendar セクション → ペースト → 接続

**トークン有効期限**: 1時間。期限切れになったら ⚙ → 「Googleで接続」で再接続。
**朝の運用**: 開始時に1回接続すれば、その後 1時間以内の自動同期はOK。長時間離席後は再接続必要。

### 3. PWA インストール（iPhone）
1. Safari で `http://[PC_IP]:8765/control-center.html` を開く
2. 共有ボタン → 「ホーム画面に追加」
3. ホーム画面アイコンをタップ → standalone で起動

---

## キーボードショートカット

| キー | 動作 |
|---|---|
| `?` | ヘルプ表示 |
| `1` `2` `3` `4` | Video Wall スロット切替 |
| `M` | Video Wall 全ミュート切替 |
| `P` | Video Wall 全停止/再開 |
| `Q` `F` `S` | Video Wall レイアウト (Quad/Focus/Single) |
| `Esc` | 編集モード解除・モーダル閉じる |

---

## モジュール一覧（10個・3 Tier構造）

### Core Tier（常時表示・5モジュール）
| モジュール | 機能 | 編集 |
|---|---|---|
| **Command Bar** | 時計・天気・異常検知・Stakeholder一行 | 異常検知/Stakeholderテキストをクリックで編集 |
| **AI Daily Brief** | Claude APIで朝/昼/夕に自動brief生成 | Settingsから |
| **TOP 3 ACTIONS** | 本日3アクション・チェックボックス完了管理 | AI Briefから取込 or Settings |
| **Today's Schedule** | 4会議の動的hero（時刻基準で次会議自動表示）| Settings JSON編集 |
| **Recovery** | Apple Watch風: 睡眠/HRV/心拍/カロリー/スタンド | Settings JSON編集 |

### Ambient Tier（折りたたみ・背景再生）
| モジュール | 機能 |
|---|---|
| **Video Wall** | 4タイル YouTube live・17プリセット・カスタムURL |
| **News Pulse** | 5タブ（世界/日本/業界/地震/芸能）・地震警報 |

### Reference Tier（折りたたみ・参照系）
| モジュール | 機能 |
|---|---|
| **External Viewers** | YouTube/TVer/ABEMA/Netflix等12サービス・新規タブ起動 |
| **Growth Today** | 30分投資先・必読・Time audit横棒 |
| **Conversation Ammo** | 雑談弾薬5項目・Google検索リンク |

---

## localStorage キー一覧

| キー | 用途 |
|---|---|
| `cc-anthropic-key` | Claude APIキー（センシティブ）|
| `cc-brief-context` | AI Briefに渡す追加コンテキスト |
| `cc-ai-brief` | 当日生成済 brief キャッシュ（segment毎）|
| `cc-google-client-id` | Google OAuth Client ID |
| `cc-google-token` | Google access token（1時間有効）|
| `cc-google-token-expiry` | Token失効タイムスタンプ（ms）|
| `cc-google-last-sync` | 最終 Calendar 同期時刻 |
| `cc-meetings` | Schedule の会議リスト JSON（Calendar同期で上書き）|
| `cc-recovery` | Recovery の Apple Watch 値 JSON |
| `cc-top-actions` | TOP 3 ACTIONS（AI Briefから自動同期可）|
| `cc-actions-done` | TOP 3 ACTIONS の完了状態 |
| `cc-stakeholder` | Stakeholder 一行テキスト |
| `cc-anomaly` | 異常検知バッジ本文 |
| `cc-user-name` `cc-user-title` `cc-user-avatar` | ユーザー情報 |
| `cc-theme` | Light/Dark テーマ |
| `cc-slots` `cc-muted` `cc-layout` `cc-paused` | Video Wall 状態 |
| `cc-url-history` | カスタムURL履歴（直近5）|
| `cc-ambient-open` `cc-reference-open` | Tier 折りたたみ状態 |

---

## トラブルシューティング

### ページが真っ白
1. `Ctrl+Shift+R` でハードリロード
2. それでも駄目なら `F12` → Console タブ → 赤エラー確認
3. localStorage 破損が疑われる場合：Console で
   ```js
   Object.keys(localStorage).filter(k => k.startsWith('cc-')).forEach(k => localStorage.removeItem(k));
   location.reload();
   ```

### AI Briefが生成されない
- ⚙ Settings から APIキーが正しく保存されているか確認
- ブラウザDevToolsの Network タブで `api.anthropic.com` への呼び出しを確認
- HTTPステータス：401=APIキー無効 / 429=レート制限 / 500+=Anthropic側問題

### YouTube動画が再生されない
- ライブストリームのID は時々変わる（要更新）
- カスタムURL欄に最新の動画IDを貼り付け
- 17プリセットの生死は半年〜1年ごとに見直し推奨

### モバイルで崩れる
- `<meta name="viewport">` 設定済み
- 375px以下では一部要素が縦積み
- Tier化により1画面5カードに圧縮済

---

## バックアップ・復元

### エクスポート
1. `⚙` → データ管理 → 「エクスポート」
2. JSON ファイルが `~/Downloads/control-center-settings-YYYY-MM-DD.json` にダウンロード

### インポート
1. `⚙` → データ管理 → 「インポート」
2. ファイル選択 → 自動的に再読込

### 全リセット
1. `⚙` → 危険な操作 → 「全リセット」
2. 確認ダイアログ → 全 `cc-*` localStorage 削除＋再読込

---

## 拡張ロードマップ（個人ツール継続）

### 短期（運用しながら判断）
- Schedule / Recovery の本格自動化（Google Calendar / Health Auto Export）
- Markets の実データ連携（CORS proxy or GitHub Actions）
- Stakeholder Pulse の手動メモ運用

### 中期（必要を感じた時）
- Apple Watch Health Auto Export パイプライン構築
- Notion同期（既存 update_dashboard.py 流用）
- GitHub Actions 日次更新（雑談弾薬・市況）

### 長期（やりたくなったら）
- マルチユーザー対応（B2B転換するなら）
- 真のSaaS化（モチベーション次第）
- AI Agent化（Bond/Ambient型のフル委任）

---

## 設計判断の記録

| 判断 | 理由 |
|---|---|
| **個人ツール継続（B2B転換せず）** | TAM=1の問題は商品化を否定するが、個人運用には最適 |
| **モジュール 11→10→Core 5表示** | Jobs/Rams/Ive 全員が「削れ」と批評。Tier化で両立 |
| **Markets DEMO 削除** | 偽データは使い続けるほど信頼を毀損。実データ繋がるまで非表示 |
| **AI Daily Brief を最上位** | 業界トレンド：表示型→AI生成型の流れに合致 |
| **localStorage 永続化中心** | OAuth実装の負担ゼロ・データ所有権はブラウザ |
| **Light/Dark両対応** | 「毎日見るので明るいほう」要件＋夜運用の両立 |

---

## バージョン履歴

| Version | 日付 | 変更 |
|---|---|---|
| v1.0 | 2026-05-06 | 初版（claude.ai生成）|
| v1.1 | 2026-05-06 | YouTube プリセット精査・スロット重複禁止・External Viewers追加 |
| v1.2 | 2026-05-06 | TOP 3 ACTIONS追加・Settings/Help/ErrorBoundary・PWA・Mobile対応 |
| v1.3 | 2026-05-06 | Markets削除・AI Daily Brief・Tier化・AI→TOP 3連携 |
| v1.4 | 2026-05-06 | Google Calendar OAuth連携（GIS Token Client）|

---

**運用開始可能。明朝06:00から朝の戦略コックピットとして稼働できます。**
