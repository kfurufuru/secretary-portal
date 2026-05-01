---
title: "rtk shell が curl 出力を自動フィルタする問題と回避策"
category: "AI活用"
level: "published"
created: "2026-05-01"
last_reviewed: "2026-05-01"
understanding_score: 4
source: "denken-wiki ビルド検証セッション 2026-05-01"
tags: ["rtk", "shell", "curl", "Claude Code", "デバッグ"]
related: []
---

# rtk shell が curl 出力をフィルタする問題

## TL;DR

Claude Code の rtk wrapper shell は `curl` の標準出力を自動的に短縮する（109KB → 584バイトに見える）。HTML/JSON 全文を解析したいときは **`-o` でファイル保存 → ファイル直読み** または **rtk が tee したログファイル直読み** で回避する。

## 症状

```bash
$ curl -s http://localhost:8001/some-page/ | wc -c
584
$ curl -s -o /dev/null -w "%{size_download}" http://localhost:8001/some-page/
109640
```

同じURLなのに `wc -c` では 584、`%{size_download}` では 109640。pipe 経由で受け取る際に rtk が出力を短縮している。

## 原因（推定）

rtk は token-optimizer として bash command 出力を圧縮している。HTML のような長文は「先頭部分 + 省略マーカー」に書き換えられている可能性が高い。標準出力には適用されるが、`-o file` で書き出した場合は対象外。

## 確認方法

```bash
curl -s http://example.com/ | head -c 500
# → 出力が短い場合、rtk が介入している
```

`[full output: ~/AppData\Local\rtk\tee\NNNNNNNN_curl.log]` のメッセージが表示されたらビンゴ。

## 回避策

### 方法1: tee log を直読み（最速）

rtk は出力を `~/AppData/Local/rtk/tee/<hash>_<cmd>.log` に保存している。Bashで該当ログを `cat` すれば全文取れる：

```bash
curl -s http://localhost:8001/page/
# → [full output: ~/AppData\Local\rtk\tee\1777635846_curl.log]
cat ~/AppData/Local/rtk/tee/1777635846_curl.log | python -c "..."
```

### 方法2: ファイル保存→分析

```bash
curl -s -o /tmp/page.html http://localhost:8001/page/
python -c "
import re
html = open('/tmp/page.html').read()
print(f'tables: {len(re.findall(r\"<table\", html))}')
"
```

### 方法3: サイズ確認のみで済む場合

```bash
curl -s -o /dev/null -w "%{size_download} %{http_code}\n" http://localhost:8001/page/
# → 109640 200
```

## 落とし穴

1. **`| head` `| wc -c` は信用できない**: pipe経由は短縮対象。サイズは `%{size_download}` で取る
2. **Python スクリプトでも同じ**: `curl ... | python` は短縮済み出力を受け取る → Python 内で `urllib.request.urlopen` するか、ファイル保存後に開く
3. **Grep ツールは安全**: rtk wrapper を経由しないため、ローカルファイルなら短縮されない

## 実践メモ

denken-wiki ビルド検証時（2026-05-01）：
- `curl ... | python -c '... print(html)' ` で「テーブル0件・ヘッダ0件」と誤認識
- 実際は 105KB のHTMLが短縮されて 584 バイトしか渡っていなかった
- tee log 直読みに切り替えて即解決（テーブル0件・リスト30件・全14見出し正常を確認）

## デバッグ手順テンプレ

```bash
# Step 1: サイズ確認
curl -s -o /tmp/check.html -w "%{size_download}\n" $URL

# Step 2: サイズが期待通りでも | で渡すと短縮される可能性あり → ファイル直読み
python -c "
import re
html = open('/tmp/check.html').read()
print(f'len: {len(html)}')
# 解析処理
"
```
