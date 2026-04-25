---
title: "RSS Vault Sync 設計ノート"
category: "AI活用"
level: "published"
created: "2026-04-26"
updated: "2026-04-26"
understanding_score: 4
source: "inbox/handoff-2026-04-23-rss-dashboard-phase3b.md / inbox/handoff-2026-04-23-rss-phase6.md"
tags: ["RSS", "sync_to_vault", "Stop hook", "Obsidian", "archive", "wiki-link", "自動化"]
related:
  - "[[claude-code-knowledge-pipeline]]"
  - "[[portal-health-observability]]"
  - "digital-twin/decision-log/2026-04-23-phase6-p4-scheduler.md"
---

# RSS Vault Sync 設計ノート

## TL;DR

`sync_to_vault.py` + Stop hook でRSSフィード記事をObsidian Vault（feeds/）に自動変換。Phase6で `archive_rotation.py`（90日/score<3移動）と `link_generator.py`（wiki-link自動生成）を追加。5,400件/年の肥大化を制御しつつ、知識グラフへの接続を実現する設計。

---

## システム構成

```
ai-news/
├── ai-news/
│   ├── sync_to_vault.py          # JSON → Markdown 変換（Phase 3b/4）
│   ├── archive_rotation.py       # 90日超+score<3をarchive/へ移動（Phase 6）
│   └── link_generator.py         # 同カテゴリ+score≥3の関連記事を自動リンク（Phase 6）
├── feeds/                         # sync_to_vault が生成するMarkdownファイル群
├── archive/                       # archive_rotation が移動した古記事
└── ai-conversations/
    └── weekly-digest.md           # Dataviewダッシュボード（Phase 5）
```

---

## sync_to_vault.py + Stop hook 統合の設計判断

### 採用理由

- news.json（Claude生成スコア付きRSS）をObsidianで閲覧・Dataview検索可能にするため、Markdown変換が必要
- Stop hook に統合することで「セッション終了時に自動実行」を実現。手動実行ゼロを達成
- dry-run検証（16記事変換・0ファイル書き込み）で動作確認済みのうえで本番移行

### Stop hook 設定

```json
{
  "hooks": {
    "Stop": {
      "command": "py \"C:/Users/kfuru/.secretary/ai-news/ai-news/sync_to_vault.py\""
    }
  }
}
```

### Phase 6 拡張パターン（月1回実行）

```bash
py sync_to_vault.py && py link_generator.py && py archive_rotation.py
```

- 毎セッション終了時に sync のみ実行（低コスト）
- archive_rotation と link_generator は月1回手動 or cron（高コスト処理のため分離）

---

## Archive/Score 分布設計

### score の意味

- news.json の score は Claude が付与した主観スコア（1-5）
- score 5 = 高関連・高品質記事、score 1 = 低関連・ノイズ

### 設計判断: score 分布に基づく保持戦略

| score | 保持方針 | 根拠 |
|-------|---------|------|
| 4-5 | 無期限保持（feeds/に残す） | L2昇格候補・知識グラフの核になりうる |
| 3 | 90日保持 → 判断 | wiki-linkのリンク対象にはなる（score≥3条件） |
| 1-2 | 90日超で archive/ へ移動 | ノイズ記事を無期限保持するコストが高い |

---

## archive_rotation（90日/score<3）の設計根拠

### なぜ90日か

- 週次レビューサイクル（月曜）× 13週 = 約3ヶ月
- 3ヶ月見返されなかった記事は「活性化されなかった知識」と判定できる
- OneDrive/Obsidian Vaultの肥大化抑制: feeds/が5,400件/年になる試算に対し、スコア<3の記事が大半を占めると想定

### なぜ削除ではなくarchive/移動か

- **復帰可能性の担保**: 誤スコアリング・後から価値が上がる記事への対応
- archive/ は Obsidian から検索可能なため、完全消失しない
- 削除は不可逆。移動は確認してから削除できる

### 実行コマンド

```bash
cd /c/Users/kfuru/.secretary/ai-news/ai-news
python archive_rotation.py  # 90日超+score<3をarchive/へ移動
```

---

## link_generator（同カテゴリ/score≥3/上限5件）の設計根拠

### フィルタ条件の根拠

| 条件 | 根拠 |
|------|------|
| 同一 ai_category | カテゴリが異なる記事は「関連」ではなくノイズになる |
| score ≥ 3 | ノイズ記事（score 1-2）へのリンクは知識グラフを汚染する |
| 上限5件 | Obsidianのrelated: フィールドが長くなりすぎると視認性低下。5件で十分なクラスター形成 |

### 生成形式

feeds/*.md の frontmatter に `related: [...]` フィールドを追加。
Obsidianのグラフビューで知識クラスターが可視化される。

### 実行コマンド

```bash
python link_generator.py    # feeds/*.mdにrelated:フィールド追加
```

---

## 落とし穴・検証手順

### 落とし穴

1. **config.json のパスずれ**
   - `news_json_path` が相対パスになっていると dry-run 成功・本番失敗の非対称が起きる
   - 対策: 絶対パスで設定。`C:/Users/kfuru/.secretary/ai-news/ai-news/news.json`

2. **score フィールドの欠損**
   - news.json の一部記事で score が null または 0 の場合、archive_rotation の閾値判定が崩れる
   - 対策: archive_rotation.py で `score is None or score == 0` を score < 3 として扱う

3. **feeds/ の重複生成**
   - sync_to_vault.py を複数回実行すると同名ファイルが上書きされる
   - 対策: ファイル名に記事IDまたはハッシュを含める（既実装確認必須）

4. **Stop hook の実行時間**
   - feeds/ が1,000件を超えると link_generator.py の実行時間が数分になる可能性
   - 対策: link_generator は Stop hook から分離し、月1回cron推奨

5. **archive/ への誤移動**
   - archive_rotation のデフォルトは90日だが、スコアスレッシュルドを変更した場合に全記事が移動するリスク
   - 対策: 初回は `--dry-run` で確認してから実行

### 検証手順

```bash
# 1. dry-run で動作確認
py sync_to_vault.py --dry-run

# 2. 本番実行
py sync_to_vault.py

# 3. feeds/ ファイルをObsidianで開いてfrontmatter確認
# 4. link_generator 実行後、related: フィールドが追加されているか確認
python link_generator.py
# 5. archive_rotation dry-run
python archive_rotation.py --dry-run  # オプションがあれば
# 6. ログ確認
cat sync_to_vault.log
```

---

## 週次ワークフロー統合

- **毎セッション終了時**: `sync_to_vault.py` 自動実行（Stop hook）
- **月1回**: `link_generator.py` + `archive_rotation.py` を手動 or cron実行
- **週次レビュー**: `weekly-digest.md` の Dataview でスコア分布・新着記事を確認
- **L2昇格判定**: score ≥ 4 記事のうち理解度 ≥ 3 のものを `knowledge/` へ手動昇格

---

## 関連ファイル

- `C:/Users/kfuru/.secretary/ai-news/ai-news/sync_to_vault.py`
- `C:/Users/kfuru/.secretary/ai-news/ai-news/archive_rotation.py`
- `C:/Users/kfuru/.secretary/ai-news/ai-news/link_generator.py`
- `C:/Users/kfuru/.secretary/ai-news/ai-news/config.json`
- `C:/Users/kfuru/.secretary/ai-conversations/weekly-digest.md`
- `.claude/plans/vivid-stirring-pascal.md`（全体計画書）
