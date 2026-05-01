---
name: claude-md-audit
description: CLAUDE.md と .claude/rules/*.md 内のファイルパス参照を実在チェックし、ゴーストファイル参照（書いてあるのに存在しないパス）を検出する。
triggers: ["claude-md監査", "CLAUDE.md整合性", "ゴースト参照チェック", "claude-md-audit"]
dependencies: ["claude_md_audit.py"]
---

# CLAUDE.md 整合性監査スキル

## 目的

CLAUDE.md は使うほど現実と乖離する（ファイル削除/移動時に参照側を更新しない事故）。
本スキルは Python 1パスで全パス参照を抽出 → 実在チェック → 破損参照を報告する。

## 実行手順

```bash
python C:/Users/kfuru/.secretary/claude_md_audit.py
```

## 出力例

```
=== CLAUDE.md 整合性監査 ===
対象: 5 ファイル / 抽出パス: 47
破損参照: 2

--- 破損参照一覧 ---
[CLAUDE.md:9] digital-twin/profile.md
  > - **デジタルツイン**: `digital-twin/profile.md` / `digital-twin/furutan-bot-spec.md`

[CLAUDE.md:9] digital-twin/furutan-bot-spec.md
  > - **デジタルツイン**: `digital-twin/profile.md` / `digital-twin/furutan-bot-spec.md`
```

## 抽出ルール

バッククォート内の以下を抽出:
- 拡張子付きパス（.md/.py/.html/.json/.jsx/.ts/.txt/.csv/.yaml/.yml）
- ディレクトリパス（`/` で終わる）

除外:
- `y/n`, `key/value` 等のキーワード
- `--xxx` 形式のコマンドラインオプション

## 推奨運用

- **月次1回実行** — 破損があれば即修正してコミット
- **大量ファイル削除/移動の直後** — ゴースト参照の早期検知
- **新CLAUDE.md行動原則追加時** — 追記したパスが正しいか確認

## 終了コード

- `0`: 破損なし
- `1`: 破損あり（CI連携可能）
