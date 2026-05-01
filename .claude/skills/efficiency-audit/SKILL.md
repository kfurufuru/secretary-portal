---
name: efficiency-audit
description: Claudeセッションの無駄トークン消費を自動検知し、Python化・並列化などの効率化提案を出力するスキル。.archiveのJSONLログを解析して、繰り返しgrep/find・重複Read・連続Bash等のパターンを検知する。
triggers: ["効率チェック", "トークン監査", "無駄検知", "efficiency audit", "token audit", "無駄なツール", "トークン無駄"]
dependencies: ["audit_efficiency.py"]
---

# Efficiency Audit スキル

## 概要

`audit_efficiency.py` を実行してClaudeセッションの非効率パターンを自動検知する。
`.claude/projects/.archive/` のJSONLログを解析し、改善提案をランキング形式で出力。

## 検知パターン

| パターン | 検知条件 | 提案 |
|---------|---------|------|
| repeated_bash | grep/find/ls が3回以上 | Python一括処理化 |
| duplicate_read | 同一ファイルを2回以上Read | 変数に保持して再利用 |
| sequential_bash | 独立Bashが4件以上連続 | 並列tool call or Agentに |
| grep_without_python | grep 4回以上かつPython未使用 | evaluate_wiki.pyパターン化 |
| find_glob_mix | findコマンドとGlobツール混在 | Globツールに統一 |

## 実行コマンド

```bash
# 基本実行（直近20セッション）
python C:/Users/kfuru/.secretary/audit_efficiency.py

# セッション数を増やす
python C:/Users/kfuru/.secretary/audit_efficiency.py --sessions 50

# ワーストN件の詳細
python C:/Users/kfuru/.secretary/audit_efficiency.py --worst 3

# JSON出力のみ
python C:/Users/kfuru/.secretary/audit_efficiency.py --json-only
```

## 出力

- **ターミナル表**: セッション別wasteスコア(棒グラフ) + パターン横断ランキング
- **JSONレポート**: `C:/Users/kfuru/.secretary/efficiency-audit.json`

## 実行手順（スキルとして呼び出された場合）

1. `python audit_efficiency.py` を実行
2. 検知パターンランキングを表示
3. 上位2〜3パターンについて具体的な改善案を提示
4. 必要に応じて `--worst 3` で詳細確認

## 改善優先度

```
1. repeated_bash / grep_without_python → Pythonスクリプト化（最大削減効果）
2. sequential_bash → 並列tool call（即効性高）
3. duplicate_read → セッション設計改善
4. find_glob_mix → Globツール統一（即座に修正可能）
```

## 参考: evaluate_wiki.py パターン

`grep N回` を `python evaluate_wiki.py` に置き換えた実績:
- 6,000 tokens → 800 tokens（**87%削減**）
- 新しい反復Bashパターンを発見したら、同様のPythonスクリプトとして切り出す
