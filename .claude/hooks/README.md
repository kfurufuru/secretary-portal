# Git Hooks

このリポジトリ専用の git hooks。`core.hooksPath = .claude/hooks` で有効化。

## 新規 clone 後のセットアップ

```bash
git config core.hooksPath .claude/hooks
chmod +x .claude/hooks/pre-commit  # macOS / Linux のみ
```

## hooks 一覧

| ファイル | 動作 | トリガー |
|---------|------|---------|
| `pre-commit` | API キー検知でブロック | `git commit` |

## pre-commit 検知パターン

| 種別 | 正規表現 |
|------|---------|
| Groq | `gsk_[A-Za-z0-9]{40,}` |
| Google / Gemini | `AIza[0-9A-Za-z_-]{35}` |
| OpenAI | `sk-[A-Za-z0-9]{40,}` |
| OpenAI Project | `sk-proj-[A-Za-z0-9_-]{40,}` |
| Notion | `ntn_[A-Za-z0-9]{40,}` |
| Slack Bot | `xoxb-[A-Za-z0-9-]{40,}` |
| GitHub PAT | `ghp_[A-Za-z0-9]{36}` |
| GitHub Server | `ghs_[A-Za-z0-9]{36}` |
| AWS Access Key | `AKIA[0-9A-Z]{16}` |

## 緊急回避

検知が誤検知の場合のみ:

```bash
git commit --no-verify -m "..."
```

**非推奨** — 本物のキーが含まれていれば即漏洩します。
