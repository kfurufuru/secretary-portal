---
date: 2026-04-22
type: handoff
title: ポータルリンク監査・残課題
---

# 引継ぎ: portal-v2.html リンク整備

## 本日完了

- **P1**: `ai-news/dashboard.html` パス修正 → `ai-news/ai-news/dashboard.html`
- **P2**: 破損リンク6本削除（health-monitor, session-progress, reflection, marriage-dashboard, people/portal）
- **P3**: 孤立4サイトを「📊 ダッシュボード & ツール」グループとして portal に追加

## 残課題

### 1. `null` ファイル削除（5分）
- `.secretary/null`（0バイト、2026-04-19作成）
- コマンド: `rm null`

### 2. localhost:8765（denken-study.html）の実体不明
- `.secretary` 直下に `denken-study.html` が存在しない
- worktrees 内にのみ存在（.claude/worktrees/）→ 起動元スクリプト不明
- 対処: portal から一時的にリンク削除 or 実体ファイルを特定して配置
- 該当行: portal-v2.html 内「今日の学習（朝/昼/夜）」リンク2箇所

### 3. localhost:8096（AI News）起動方法の周知
- 実体: `ai-news/ai-news/start-server.bat`
- portal の「AI Newsダッシュボード」はサーバ起動時のみ有効
- 必要なら portal に「サーバ起動」ボタンを追加するか、起動手順をコメントに記載

## 継続作業の開始方法

```
inbox/handoff-2026-04-22-portal-linkcheck.md を読んで実装続行して
```
