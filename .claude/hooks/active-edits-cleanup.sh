#!/bin/sh
# Stop hook: 期限切れの編集ロックを自動削除
# セッション終了時に Deadline を過ぎたエントリを掃除（最大90分の手動運用 + 自動掃除）
#
# 注: 自セッションの claim を完全に release するには CLAUDE_SESSION_ID 環境変数 or
# プロセスID追跡が必要だが、ここでは安全策として「期限切れのみ削除」とする。
# Claude が明示的に release コマンドを呼ぶ運用が原則。

SECRETARY_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$SECRETARY_ROOT" || exit 0

[ -f claim_edit.py ] || exit 0
[ -f inbox/active-edits.md ] || exit 0

# 期限切れの自動削除のみ（誤削除リスクなし）
python claim_edit.py expire >/dev/null 2>&1

exit 0
