---
name: "Monday TOP3 Fixation"
description: "月曜朝08:00に前週のTODO進捗をスコアリングし、今週のTOP3を自動生成・固定化する"
schedule: "0 8 * * 1"  # 月曜08:00 JST
trigger: "cron"
version: "1.0.0"
author: "古舘"
tags: ["priority", "weekly-planning", "automation"]
---

# Monday TOP3 Fixation Skill

## 概要

**目的**: 週ごとの優先度を機械的に固定し、振り返りサイクル（金曜）との連携を自動化する

**実行タイミング**: 毎週月曜朝 08:00（JST）

**入力**: `todos/` 配下の直近2週分ファイル（YYYY-MM-DD.md）

**出力**: 
- `todos/YYYY-MM-DD.md` に「## 最優先」セクションとしてTOP3を自動生成
- ログファイル `logs/top3-monday.log` に実行履歴を記録

**エラーハンドリング**: API失敗時は notify（メール/Slack互換形式）で通知

---

## 実行ロジック

### Phase 1: データ収集・前週分析（Haiku担当）

```
入力:
  - todos/YYYY-MM-DD.md (直近7日分)
  - 完了度、優先度タグ、期限情報の抽出

処理:
  1. 各日のTODOを解析
  2. 完了度（[x]数 / 総数）をパーセント化
  3. 優先度分布（高/通常/低）を集計
  4. 期限超過分を検出

出力形式 (JSON):
{
  "previous_week_start": "2026-04-13",
  "previous_week_end": "2026-04-19",
  "completion_rate": 71.4,
  "priority_distribution": {
    "high": 15,
    "normal": 42,
    "low": 8
  },
  "overdue_count": 2,
  "top_challenges": ["課題A", "課題B"]
}
```

**Haikuプロンプト**:
```
あなたはタスク分析エキスパートです。

以下のTODOデータから、先週1週間の進捗状況を5つの視点で分析してください。
回答はJSON形式のみ。

## 分析対象ファイル群
{todo_files_content}

## 5つの分析視点（必須）
1. **完了度** (completion_rate: 0-100%)
   - [x]タスク数 ÷ 総タスク数
   
2. **優先度分布** (priority_distribution)
   - "高", "通常", "低" 各カテゴリの件数
   
3. **期限管理** (deadline_adherence)
   - 期限超過タスク数
   - 今週期限のタスク数
   
4. **カテゴリ分析** (category_breakdown)
   - 未完了タスクの主要カテゴリ（電気計装, 電験, AI活用など）
   
5. **パターン認識** (pattern_insights)
   - 繰り返し出現するテーマ（最大3個）
   - 優先度・期限・カテゴリの相関

出力JSON必須フィールド:
{
  "previous_week_start": "YYYY-MM-DD",
  "previous_week_end": "YYYY-MM-DD",
  "completion_rate": 数値,
  "priority_distribution": {"high": 数値, "normal": 数値, "low": 数値},
  "overdue_count": 数値,
  "deadline_critical_count": 数値,
  "categories": ["カテゴリ1", "カテゴリ2"],
  "top_challenges": ["課題A", "課題B", "課題C"]
}
```

---

### Phase 2: TOP3スコアリング・優先度決定（Sonnet担当）

```
入力:
  - Phase 1の分析結果 (JSON)
  - 古舘さんのプロフィール（CLAUDE.md から自動読み込み）
  - デジタルツイン判断軸（digital-twin/priorities-framework.md）

処理:
  1. 優先度4段階フィルタ（P1必須 > P2推奨 > P3検討 > 保留）
  2. スコアリング（5軸）：
     - 期限緊急度（10pts）
     - 業務インパクト（10pts）
     - 学習効果（5pts）
     - 完了難度（5pts）
     - 継続性（5pts）
  3. TOP3候補の根拠記述（Why説明）

出力形式 (JSON):
{
  "top3_candidates": [
    {
      "rank": 1,
      "task": "タスク内容",
      "category": "category_name",
      "priority_level": "P1",
      "score": 38,
      "deadline": "2026-04-25",
      "rationale": "期限が〇日で緊急かつ、...",
      "blocking_other_tasks": ["task_id"],
      "estimated_hours": 4
    },
    ...
  ],
  "notes": "今週は〇〇フェーズ進行中のため、..."
}
```

**Sonnetプロンプト**:
```
あなたは古舘さん（36歳、電気エンジニア管理職、結論先・実務重視・根拠必須）の判断パートナーです。

前週の進捗分析結果に基づき、【今週のTOP3タスク】を確定してください。

## 入力データ
### 前週分析結果
{haiku_analysis_result}

### 優先度判定基準（古舘さん用）
{priorities_framework}

## スコアリング5軸（各10点満点）
1. **期限緊急度** (Deadline Criticality)
   - 期限残り ≤3日: 10pts
   - 期限残り 4-7日: 7pts
   - 期限残り 8-14日: 4pts
   - それ以外: 1pt

2. **業務インパクト** (Business Impact)
   - 設備停止時間に直結: 10pts
   - チーム進捗/納期に影響: 8pts
   - 個人タスク: 5pts
   - 学習・改善: 2pts

3. **学習効果** (Learning Value)
   - 電験・AI・電気計装の横展可能性: 5pts
   - 単純繰り返し: 1pt

4. **完了難度** (Complexity)
   - 簡潔（1-2時間）: 5pts
   - 中程度（3-8時間）: 3pts
   - 複雑（>8時間）: 1pt
   ※難度が低い=実行確率高→スコア加点

5. **継続性** (Continuity)
   - 先週から積み残し（継続タスク）: 5pts
   - 新規タスク: 2pts

## 出力形式（JSON必須）
{
  "top3_candidates": [
    {
      "rank": 1,
      "task": "タスク名",
      "category": "カテゴリ",
      "priority_level": "P1/P2/P3/Hold",
      "deadline": "YYYY-MM-DD",
      "score_breakdown": {
        "deadline_criticality": 数値,
        "business_impact": 数値,
        "learning_value": 数値,
        "complexity": 数値,
        "continuity": 数値
      },
      "total_score": 数値,
      "rationale": "〇〇が△日で緊急かつ、業務〇〇に直結するため、最優先",
      "blocking_other_tasks": ["task_id1", "task_id2"],
      "estimated_hours": 数値
    },
    {
      "rank": 2,
      ...
    },
    {
      "rank": 3,
      ...
    }
  ],
  "summary": "今週は...",
  "at_risk_tasks": ["task1", "task2"],
  "Friday_review_guidance": "金曜振り返り時の重点確認項目"
}
```

---

## 出力形式・テンプレート

### todos/YYYY-MM-DD.md に自動生成される TOP3セクション

```markdown
---
date: "2026-04-21"
type: "weekly-planning"
top3_auto_generated: true
haiku_score: 71.4
sonnet_priority_p1_count: 3
---

# 2026-04-21 (月)

## 最優先 [P1: 必須]

### 1. タスク A
- **期限**: 2026-04-25
- **スコア**: 38/50
- **理由**: 期限が4日で緊急。電験過去問実施遅延が学習スケジュールに影響するため最優先
- **見積時間**: 2h
- **ブロック関係**: なし
- **category**: `電験3種`

### 2. タスク B
- **期限**: 2026-04-26
- **スコア**: 36/50
- **理由**: 設備投資提案資料の粗案が〇〇進捗を決定。期限は5日だが、スケジュール上本週中の完了が必須
- **見積時間**: 4h
- **ブロック関係**: `タスク C` に依存
- **category**: `設備管理`

### 3. タスク C
- **期限**: 2026-04-27
- **スコア**: 35/50
- **理由**: AIツール導入試作が完了しないと、本体運用設計が進まない。ブロッカータスク
- **見積時間**: 3h
- **ブロック関係**: `タスク B`, `タスク D` をブロック
- **category**: `AI活用`

---

## 通常 [P2: 推奨]

- [ ] [P2-1] 過去問復習（4月分）| 期限: 2026-04-30
- [ ] [P2-2] 電計チーム定例準備 | 期限: 2026-04-25
- ...

## 余裕があれば [P3: 検討]

- [ ] [P3-1] 新しい電験テーマ調査 | 期限: 2026-05-10
- ...

---

## 進捗トラッキング & 金曜振り返り連携

### 生成時刻
2026-04-21 08:00:15 JST

### 前週実績サマリ
- **完了度**: 71.4%
- **超過期限**: 2件
- **優先度分布**: 高15件, 通常42件, 低8件

### 金曜日（2026-04-25）の振り返りチェックリスト
- [ ] TOP3すべて完了したか？
- [ ] スコア予測は実態に合致したか？
- [ ] 予期しなかった課題が発生したか？ ← デジタルツイン判断軸に追加
- [ ] カテゴリ別の時間配分は効率的だったか？

---

## メモ・振り返り

- 先週の超過期限タスク: `タスクA-1`, `タスクB-2`（引き継ぎ）
- 新規TOP3の平均スコア: 36.3/50
```

---

## ログ記録

ファイル: `logs/top3-monday.log`

```
[2026-04-21 08:00:15] ════════════════════════════════════════
[2026-04-21 08:00:15] TOP3 Fixation: STARTED
[2026-04-21 08:00:15] ════════════════════════════════════════

[2026-04-21 08:00:16] Phase 1 (Haiku): Reading todos/2026-04-{13..19}.md
[2026-04-21 08:00:16] ✓ Analyzed 7 files (65 total tasks)
[2026-04-21 08:00:18] ✓ Haiku analysis complete: 71.4% completion, 2 overdue
[2026-04-21 08:00:18] 
[2026-04-21 08:00:19] Phase 2 (Sonnet): Scoring & prioritization
[2026-04-21 08:00:22] ✓ TOP3 candidates ranked:
  Rank 1: [タスクA] score=38, P1, deadline=2026-04-25
  Rank 2: [タスクB] score=36, P1, deadline=2026-04-26
  Rank 3: [タスクC] score=35, P1, deadline=2026-04-27

[2026-04-21 08:00:24] Phase 3: Generating todos/2026-04-21.md
[2026-04-21 08:00:24] ✓ TOP3セクション生成完了
[2026-04-21 08:00:24] ✓ 金曜振り返りガイダンス自動生成

[2026-04-21 08:00:25] ════════════════════════════════════════
[2026-04-21 08:00:25] TOP3 Fixation: SUCCESS
[2026-04-21 08:00:25] elapsed: 10.2s | API calls: 2 (Haiku+Sonnet)
[2026-04-21 08:00:25] ════════════════════════════════════════
```

---

## エラーハンドリング & リトライ戦略

### 1. APIタイムアウト（retryロジック）

```python
def call_with_retry(client, model, system_prompt, user_prompt, max_retries=3):
    """
    Anthropic API呼び出しのリトライロジック
    指数バックオフ（1s → 2s → 4s）
    """
    for attempt in range(1, max_retries + 1):
        try:
            response = client.messages.create(
                model=model,
                max_tokens=2000,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}]
            )
            return response
        except anthropic.APITimeoutError as e:
            if attempt < max_retries:
                wait = 2 ** (attempt - 1)  # 1, 2, 4秒
                logger.warning(f"Timeout (attempt {attempt}/{max_retries}), retrying in {wait}s...")
                time.sleep(wait)
            else:
                logger.error(f"API timeout after {max_retries} retries: {e}")
                raise
        except anthropic.APIConnectionError as e:
            logger.error(f"API connection error: {e}")
            raise
```

### 2. JSON パース失敗 → フォールバック

```python
def parse_json_with_fallback(response_text, default_value=None):
    """
    JSON パース失敗時は構造化エラーをログして、デフォルト値を返す
    """
    try:
        return json.loads(response_text)
    except json.JSONDecodeError as e:
        logger.error(f"JSON parse error: {e}")
        logger.error(f"Response text: {response_text[:200]}...")
        
        # フォールバック: 既存の todos/YYYY-MM-DD.md を保持（スキップしない）
        if default_value:
            logger.info("Using fallback default value")
            return default_value
        raise
```

### 3. ファイル I/O エラー

```python
def safe_write_todo_file(filepath, content):
    """
    ファイル書き込み失敗時はバックアップを作成
    """
    try:
        # バックアップ作成（既存ファイルがあれば）
        if filepath.exists():
            backup_path = filepath.with_stem(filepath.stem + ".backup")
            shutil.copy2(filepath, backup_path)
            logger.info(f"Backup created: {backup_path}")
        
        filepath.write_text(content, encoding="utf-8")
        logger.info(f"✓ Written: {filepath}")
    except Exception as e:
        logger.error(f"✗ Failed to write {filepath}: {e}")
        raise
```

### 4. 通知（エラー時）

```python
def notify_error(subject, message):
    """
    エラーが発生した場合の通知先
    - Slack webhook（未設定時はスキップ）
    - メールログ（自動記録）
    """
    notify_payload = {
        "timestamp": datetime.now().isoformat(),
        "skill": "top3-monday-fixation",
        "level": "ERROR",
        "subject": subject,
        "message": message
    }
    
    # ログファイルに記録（必須）
    log_file = Path("logs/top3-monday.log")
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(f"[{notify_payload['timestamp']}] {notify_payload['level']}: {subject}\n")
        f.write(f"  {message}\n")
    
    # Slack通知（オプション、環境変数で制御）
    slack_webhook = os.environ.get("SLACK_WEBHOOK_TOP3", "")
    if slack_webhook:
        try:
            requests.post(slack_webhook, json=notify_payload, timeout=5)
            logger.info("✓ Slack notification sent")
        except Exception as e:
            logger.warning(f"Slack notification failed (non-critical): {e}")
```

---

## 金曜振り返りサイクル連携

### 金曜夜（17:00） — 自動サマリ生成

```python
def generate_friday_review_summary(week_start: date):
    """
    月曜のTOP3対比で、実績を集計し recommendations を生成
    """
    monday_file = Path(f"todos/{week_start.isoformat()}.md")
    friday_file = Path(f"todos/{(week_start + timedelta(days=4)).isoformat()}.md")
    
    # 月曜TOP3とのマッチング
    top3_planned = extract_top3(monday_file)
    tasks_completed = extract_completed(friday_file)
    
    summary = {
        "week_start": week_start,
        "top3_completion": sum(1 for t in top3_planned if t in tasks_completed) / 3,
        "insights": [
            "TOP3予測スコアと実績の乖離分析",
            "スコアリング精度改善案",
            "デジタルツイン判断軸への反映proposal"
        ]
    }
    
    # 次週への推奨
    summary["recommendations"] = analyze_patterns(summary)
    return summary
```

---

## 実装チェックリスト

- [ ] `todos/YYYY-MM-DD.md` テンプレート確認（日次更新時の互換性）
- [ ] `logs/top3-monday.log` 作成・初期化
- [ ] `CLAUDE.md`, `digital-twin/priorities-framework.md` 自動読み込み処理
- [ ] Haiku + Sonnet API 並列実行（タイムアウト 30秒）
- [ ] JSON パース → フォールバック チェーン
- [ ] 前週ファイル読み込みエラー時の safe fallback
- [ ] ログフォーマット統一（タイムスタンプ, プロセス ID, スタック トレース）
- [ ] Slack/Mail 通知（オプション）設定確認
- [ ] 金曜振り返りサイクル連携テンプレート準備
- [ ] CronCreate登録テスト（月曜08:00JST）

---

## 参考リンク

- Anthropic API Docs: `https://docs.anthropic.com/`
- CLAUDE.md: `file:///C:/Users/kfuru/.secretary/CLAUDE.md`
- Digital Twin: `file:///C:/Users/kfuru/.secretary/digital-twin/priorities-framework.md`
- promote.py (L1→L2昇格ロジック参考): `file:///C:/Users/kfuru/.secretary/promote.py`
