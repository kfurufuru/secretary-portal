---
date: 2026-04-22
topic: top3-monday APIキー認証エラー（401）の対処手順
understanding_score_before: 3
understanding_score_after: 5
gaps_found: 4
verification_method: "コード走査（top3-generator.py 78-480行）"
verification_date: 2026-04-22
---

# フェインマンセッション: APIキー認証エラー（401）対処手順

## 平易な説明（12歳向け）

Anthropicというサービスを使うには、特別な鍵（APIキー）が必要です。その鍵が「古い」「間違っている」「なくなっている」と、サービス側は「あ、あなたは使う権利がない（401エラー）」と返してきます。

月曜朝8時に自動で動く「TOP3を作るプログラム」がこのエラーで失敗しました。設定ファイルか環境変数のどちらか（または両方）のキーが古くなってたからです。

直すには：
1. 鍵の状態を確認する
2. 新しい鍵に変える
3. 本番の前に試し実行（--dry-run）で動くか確認する
4. 本番実行する

これです。

## 詰まったポイント（知識の穴）

### 穴1: 環境変数 vs 設定ファイルの優先順位が曖昧
記事には「環境変数が優先される可能性」と書かれているが、実際の優先度ロジックが明示されていない。どちらが確実に優先されるのか不明確。

### 穴2: --dry-run の検証内容が曖昧
`--dry-run` の役割は「本番影響なく検証」と書かれているが、「何が検証されるのか」（例：実際にAPIに通信するのか、ローカルシミュレーションか）が不明確。

### 穴3: 再発防止の「自動化スクリプト」の具体化がない
TL;DRで「キー更新フローを自動化スクリプトに組み込むことを検討」とあるが、具体的にどのスクリプト（top3-generator.py？）のどの部分に何を入れるのか書かれていない。

### 穴4: エラー診断の粒度が不十分
`Error code: 401 - invalid x-api-key` は認証失敗の総称。キーが古い場合・未設定の場合・形式が違う場合、それぞれ区別して診断する方法が書かれていない。

## 穴を埋める解説（コード検証版）

### 補完1: 環境変数と設定ファイルの優先度ロジック ✅ 確定

**top3-generator.py 78-91行**より：
```python
def check_api_key() -> anthropic.Anthropic:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        config_path = SECRETARY_DIR / "daily-review-config.json"
        try:
            with open(config_path, encoding="utf-8") as f:
                cfg = json.load(f)
            api_key = cfg.get("anthropic_api_key", "")
        except Exception:
            pass
    if not api_key or api_key.startswith("YOUR_"):
        logger.error("ERROR: ANTHROPIC_API_KEY が未設定です...")
        sys.exit(1)
    return anthropic.Anthropic(api_key=api_key)
```

**確定**：環境変数が存在すれば設定ファイルは読まれない。`if not api_key:` で二者択一。

**診断の定石**：
1. 環境変数を先に確認（`echo $ANTHROPIC_API_KEY`）
2. 設定ファイルを更新しても環変が古ければ効かない

### 補完2: --dry-run の検証内容 ✅ 確定

**top3-generator.py 439・476-480行**：
```python
parser.add_argument("--dry-run", action="store_true", help="APIを呼ぶが、ファイル書き込みのみスキップ")
...
if args.dry_run:
    logger.info("\n[DRY-RUN] Would write to:")
    logger.info(f"  {TODOS_DIR / f'{today.isoformat()}.md'}")
    logger.info("\n--- Content Preview (first 500 chars) ---")
    logger.info(todo_content[:500])
else:
    success = safe_write_todo_file(TODOS_DIR / f"{today.isoformat()}.md", todo_content)
```

**確定**：
- APIはすべて実行される（Phase 1-3：TODO収集・Haiku分析・Sonnet評価）
- スキップされるのは：**`safe_write_todo_file()` 呼び出し（ファイル書き込みのみ）**
- したがって、401エラーは `--dry-run` でも発生する（Phase 2・3のAPI呼び出しが実行されるため）

**判断ロジック**：
- `--dry-run` で401が出る → キーが無効
- `--dry-run` で成功 → キーは有効。本番実行で問題が出たら別原因

### 補完3: 再発防止の実装状況 ✅ 確認完了

**top3-generator.py に実装されている対策**：

**Timeout対策**（94-106行）：
```python
def call_with_retry(
    client: anthropic.Anthropic,
    model: str,
    system_prompt: str,
    user_prompt: str,
    max_retries: int = 3
) -> str:
    for attempt in range(1, max_retries + 1):
        try:
            response = client.messages.create(
                model=model,
                max_tokens=2000,
                timeout=API_TIMEOUT_SEC,  # 30秒
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}]
            )
```

**リトライロジック**（112-119行）：
```python
except anthropic.APITimeoutError:
    if attempt < max_retries:
        wait = 2 ** (attempt - 1)
        logger.warning(f"Timeout (attempt {attempt}/{max_retries}), retrying in {wait}s...")
        time.sleep(wait)
    else:
        logger.error(f"API timeout after {max_retries} retries")
        raise
```

**401エラー処理**（125-127行）：
```python
except anthropic.APIError as e:
    logger.error(f"API error: {e}")
    raise
```

**現状**：
- ✅ Timeout（429・503）: リトライあり（3回、指数バックオフ2^0～2^2秒）
- ✅ Connection エラー: ログ出力後、即座に例外発生
- ❌ 401エラー: リトライされない。ログ出力後、即座に例外発生

**隙間**：401はリトライ対象外。これは正しい（キーが無効な限り何度呼んでも失敗）が、ログに「キー無効の可能性」を明記すると診断精度が上がる。

### 補完4: エラー診断の粒度 ✅ 確認

411-425行の実装（`safe_write_todo_file`）では単純なException全キャッチ。APIエラーの詳細メッセージはログに出力されるが、エラー分類は行われていない。

| 症状 | 原因 | 確認方法 |
|------|------|---------|
| キーが古い | API提供者がキーを無効化 | Anthropic管理画面でキー有効期限確認 |
| キーが未設定 | 環変・設定ファイル両方が空 | `echo $ANTHROPIC_API_KEY && grep anthropic_api_key daily-review-config.json` |
| キー形式エラー | 文字数・スペース混入 | キーの先頭15文字と末尾を確認。スペース・改行なし |

診断流れ：環変確認 → 設定ファイル確認 → `--dry-run` 実行 → ログを確認

## 結論: 理解度スコア更新

| 項目 | 評価 |
|------|------|
| スコア更新 | 3 → **5** |
| 昇格根拠 | コード検証により、以下を確定：①環変優先（78-91行）、②401はリトライされない（125-127行）、③--dry-runはAPIまで実行・ファイル書き込みのみスキップ（476-480行）。診断フロー（環変→設定ファイル→--dry-run実行→ログ解析）を独立して実装可能。応用問題（複数キーの自動切り替え、有効期限監視）も組み立て可能レベル。 |
| 教えられる範囲 | 「401が出た時どうするか」を他者に体系的に説明できる。実装証拠あり。 |

---

**セッション実施日**: 2026-04-22
**セッション時間**: 25分（コード検証15分含む）
**主な学習**: 
- 環変と設定ファイルの優先度ロジック（環変が存在すれば二者択一）
- 401エラーはリトライ対象外。ただしTimeout（APITimeoutError）は3回リトライ
- --dry-runはファイル書き込みをスキップするのみ。APIはすべて実行される
- Anthropic SDKのエラークラス（APIError・APITimeoutError・APIConnectionError）の使い分け
**検証ソース**: top3-generator.py（check_api_key関数78-91行、call_with_retry関数94-129行、main関数437-480行）
