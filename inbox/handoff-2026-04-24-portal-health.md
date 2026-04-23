---
title: "Fカンパニー ポータル健全性可視化 引き継ぎ"
date: "2026-04-24"
status: "pending"
---

# 引き継ぎ

## 完了項目（2026-04-23〜24セッション）

### 構造改善
- ✅ portal-v2.html の壊れた health-dashboard リンク削除
- ✅ business-skills/index.html の壊れたヘルスリンク削除
- ✅ 電験3サイト（denken-news / denken3-study-dashboard / Wiki群）相互リンク化
- ✅ denken-map.html の戻り先default を index.html に（localhost時のみJS swap）

### portalカード統合
- ✅ 🔗 リンクチェックサマリ（link-check-results.json fetch）
- ✅ 🩹 セルフヒールサマリ（heal_log.json fetch、直近24h件数）
- ✅ staleバッジ（24h超=yellow / 168h超=red でcron停止検知）
- ✅ 停止中サーバの起動.batをワンクリックコピーするボタン群

### スキャナ強化
- ✅ health-monitor/link_checker.py を本体repoに配備
- ✅ `.claude / node_modules / .git / __pycache__` 除外（worktree汚染解消）
- ✅ localhost URL を1秒HEAD実疎通判定（ok/warning自動振分）
- ✅ health-monitor/run-link-check.bat 週次cron登録（SecretaryLinkCheck / 月08:00）

### ナレッジ昇格
- ✅ knowledge/portal-health-observability.md（level: review）

## 現状の数値

| 指標 | 値 |
|------|-----|
| link-check対象 | 172 links |
| OK | 168 |
| broken | 0 |
| warning | 4（全てlocalhost停止中） |
| 監視対象HTML | 主要portal配下 |

## 次の実施項目

### P1: 外部GitHub Pages 4サイトに共通フッタ追加
対象リポ（各clone & PR必要）:
- https://github.com/kfurufuru/denken3-study
- https://github.com/kfurufuru/denken-wiki-riron
- https://github.com/kfurufuru/denken-wiki-denryoku
- https://github.com/kfurufuru/denken-wiki

**追加内容**: portal-v2（OneDrive/localhost）へのリンク + 相互リンク5本（news/study/理論Wiki/電力Wiki/法規Wiki）

**所要**: 30-40分（1リポあたり8-10分）

### P2: link_checker に `--check-external` を週次cronへ追加
現在の schtasks タスク（SecretaryLinkCheck）は内部リンクのみ。外部URLも週次で死活監視する案：

```bash
# run-link-check.bat に --check-external オプション追加
py health-monitor\link_checker.py --check-external > health-monitor\last-run.log 2>&1
```

**効果**: GitHub Pages / CDN / Google Fonts の死活を早期検知
**注意**: 実行時間が1-3分に延びる（外部HEAD multiply）

### P3: heal_log.json カテゴリ別トレンドsparkline
portalの🩹セルフヒールカードに、cat_id別の直近7日推移を小さなsparklineで表示。
- 対象フィールド: entries[].cat_id（gas / study / knowledge 等）
- 日別集計 → Chart.jsで mini-lineグラフ

### P4: warning 4件の根本解決
現状、portal-v2 から localhost:8765（denken-study）と localhost:8096（ai-news）を参照しているが、これらは別サーバ起動が必要。代替案：
- A) GitHub Pages 版（https://kfurufuru.github.io/denken3-study/）へのリンク統一 → localhost参照全削除
- B) localhostリンクはそのまま、portalにサーバ起動ボタン群を追加済み（現状これ）

Bで継続運用中。Aに切り替えるかは判断待ち。

## 関連ファイル

- portal-v2.html（ヘルスカード・電験カードでlocalhost参照あり）
- health-monitor/link_checker.py（スキャナ本体）
- health-monitor/link-check-results.json（portal fetch対象）
- health-monitor/heal_log.json（portal fetch対象）
- health-monitor/run-link-check.bat（週次cronラッパ）
- denken3-study-dashboard/（埋め込みgitリポ。内部で別コミット b68e82a）
- knowledge/portal-health-observability.md（設計パターン。review止め）

## 重要な設計判断（引き継ぐべき理由）

1. **ハブ埋込主義**: 別ページダッシュボードは見られない → portalカードに直接統合
2. **スキャナ除外必須**: rglob全走査は `.claude/` worktreeを必ず汚染源にする
3. **実疎通 > 未確認**: localhost URLはHEAD 1秒で自動判定、曖昧さ排除
4. **.bat はASCII only**: 日本語コメント（特にem-dash）は `'ry' is not recognized` 系エラー発生
5. **auto-snapshot競合注意**: バックグラウンドの `auto: knowledge snapshot` commitが走るため、git addと commit は**同一bashコマンド内で連結**すること
