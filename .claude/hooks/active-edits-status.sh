#!/bin/sh
# UserPromptSubmit hook: アクティブな編集ロックを Claude のコンテキストに注入
# 並列セッション衝突防止（2026-05-03 a9675b0 事案）
#
# 動作:
# - claim_edit.py list を実行
# - エントリがあれば <system-reminder> として stdout に出力（Claude が読む）
# - エントリゼロなら何も出力しない（ノイズ抑制）

# .secretary ルートに移動
SECRETARY_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$SECRETARY_ROOT" || exit 0

# 必要ファイルが揃っていなければ何もしない
[ -f claim_edit.py ] || exit 0
[ -f inbox/active-edits.md ] || exit 0

# 期限切れエントリを掃除（heartbeat 更新もできない死んだエントリの自動削除）
python claim_edit.py expire >/dev/null 2>&1

# アクティブエントリ一覧を取得
OUTPUT=$(python claim_edit.py list 2>/dev/null)

# 「アクティブセッションなし」なら出力ゼロ（無音）
echo "$OUTPUT" | grep -q "アクティブセッションなし" && exit 0

# エントリがある場合のみ Claude に通知
cat <<EOF
<system-reminder>
🔒 編集ロック状況（並列セッション衝突防止）:

$OUTPUT

これらのファイルを編集する場合は必ず claim_edit.py check --target <file> --not-mine
で他セッションの claim と衝突しないか確認すること。
編集を始める時は claim_edit.py claim --target <file> --reason <text> で宣言。

詳細: inbox/active-edits.md / .claude/rules/html-coding.md
</system-reminder>
EOF

exit 0
