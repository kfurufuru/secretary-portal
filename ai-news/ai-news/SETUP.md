# AI News Dashboard — セットアップ手順

## ファイル構成

```
ai-news/
├── collector.py      # 収集スクリプト（毎朝自動実行）
├── dashboard.html    # ダッシュボード（ブラウザで開く）
├── news.json         # 収集データ（自動生成）
├── config.json       # 設定ファイル
├── collector.log     # 実行ログ（自動生成）
└── SETUP.md          # この手順書
```

---

## Step 1: パッケージインストール

```bash
pip install feedparser anthropic requests
```

---

## Step 2: APIキーを設定

**APIキーは `.env` ファイルで管理します（gitに含まれません）。**

`ai-news/.env` を作成し、以下を記載:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxx...
```

APIキーは https://console.anthropic.com/ から取得。
`config.json` の `anthropic_api_key` フィールドは空文字のままにしておく（`.env` が優先される）。

---

## Step 3: 動作確認（ドライラン）

APIを使わずに収集フィルタだけ確認:

```bash
cd C:\Users\kfuru\.secretary\ai-news
py collector.py --dry-run
```

問題なければ本番実行:

```bash
py collector.py
```

---

## Step 4: ダッシュボードを開く

`dashboard.html` をブラウザにドラッグ&ドロップ（またはダブルクリック）。

> **注意**: ブラウザのセキュリティ制限でnews.jsonが読めない場合は、
> VS Code の Live Server 拡張を使うか、以下のコマンドでローカルサーバを起動:
> ```bash
> cd C:\Users\kfuru\.secretary\ai-news
> py -m http.server 8080
> ```
> → http://localhost:8080/dashboard.html にアクセス

---

## Step 5: Windowsタスクスケジューラに登録

毎朝7:00に自動実行する設定:

1. `Win + R` → `taskschd.msc` → Enter
2. 「タスクの作成」をクリック
3. 設定:
   - **全般タブ**: 名前 = `AI News Collector`
   - **トリガータブ**: 毎日 7:00
   - **操作タブ**:
     - プログラム: `py`
     - 引数: `C:\Users\kfuru\.secretary\ai-news\collector.py`
     - 開始場所: `C:\Users\kfuru\.secretary\ai-news`
4. OK → パスワード入力

---

## Step 6: スマホからの手動追加（OneDrive経由）

1. OneDriveアプリをiPhoneにインストール
2. `C:\Users\kfuru\OneDrive\ドキュメント\ai-news-inbox.txt` を作成（空ファイル）
3. iPhoneのOneDriveアプリから `ai-news-inbox.txt` を開く
4. 気になるURLを1行1URLで追記して保存
5. 次回 `collector.py` 実行時に自動処理

---

## 運用ヒント

### エラーが出た時
```bash
cat C:\Users\kfuru\.secretary\ai-news\collector.log
```
ログの末尾を確認。

### 手動でいますぐ収集したい時
```bash
py C:\Users\kfuru\.secretary\ai-news\collector.py
```

### チャンネルリストやキーワードを変えたい時
`config.json` の `filter_keywords` や `rss_sources` を編集。

### コスト管理
- Haiku使用で1日あたり約$0.02〜0.10
- 月$0.6〜3.0程度の見込み
- 詳細は https://www.anthropic.com/pricing で確認
