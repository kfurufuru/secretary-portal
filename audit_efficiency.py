"""
audit_efficiency.py - Claudeセッションの無駄トークン自動検知・効率化提案スクリプト
.archive/ の JSONL ログを解析し、繰り返しパターンを検知して改善案を出力する
"""
import re, json, sys, os, glob, argparse, textwrap
from pathlib import Path
from datetime import datetime, timezone
from collections import defaultdict, Counter

BASE = Path("C:/Users/kfuru/.secretary")
INBOX_DIR  = BASE / "inbox"
KNOWLEDGE_DIR = BASE / "knowledge"
EFFICIENCY_LOG = KNOWLEDGE_DIR / "efficiency-log.md"

# --auto モードの閾値
AUTO_ALERT_SEVERITY = 15   # wasteスコアがこれ以上のセッションでアラート生成
AUTO_SCRIPT_THRESHOLD = 5  # 同パターンがN回以上 → Pythonスクリプト雛形を自動生成

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ARCHIVE_DIR = Path("C:/Users/kfuru/.claude/projects/C--Users-kfuru--secretary/.archive")

# ─── パターン定義 ──────────────────────────────────────────

BASH_WASTE_PATTERNS = [
    (re.compile(r'^grep\s'), "grep"),
    (re.compile(r'^find\s'), "find"),
    (re.compile(r'^wc\s'), "wc"),
    (re.compile(r'^ls\s'), "ls"),
    (re.compile(r'^cat\s'), "cat"),
    (re.compile(r'^head\s'), "head"),
    (re.compile(r'^tail\s'), "tail"),
]

PYTHON_ALTERNATIVES = {
    "grep": "Python: re.search / Path.read_text (ファイル1回読み込み + 全パターン同時マッチ)",
    "find": "Python: glob.glob / Path.rglob (Globツールも可)",
    "wc":   "Python: len(text.splitlines()) — ファイル読み込みと同時に実行",
    "ls":   "Python: list(Path('.').iterdir()) または Globツール使用",
    "cat":  "Readツール推奨 (フィルタリング・オフセット指定可)",
    "head": "Readツール推奨 (limit パラメータで先頭N行のみ取得)",
    "tail": "Readツール推奨 (offset + limit で末尾指定)",
}

# ─── ログ解析 ──────────────────────────────────────────────

def load_sessions(n_files=20):
    """直近 n_files 件の JSONL を読み込み、セッションごとにツール呼び出しリストを返す"""
    files = sorted(ARCHIVE_DIR.glob("*.jsonl"), key=os.path.getmtime, reverse=True)[:n_files]
    sessions = {}
    for fpath in files:
        sid = fpath.stem
        tool_calls = []
        try:
            with open(fpath, encoding="utf-8", errors="replace") as f:
                for line in f:
                    try:
                        entry = json.loads(line)
                    except json.JSONDecodeError:
                        continue
                    if entry.get("type") != "assistant":
                        continue
                    ts = entry.get("timestamp", "")
                    msg = entry.get("message", {})
                    for block in msg.get("content", []):
                        if not isinstance(block, dict):
                            continue
                        if block.get("type") != "tool_use":
                            continue
                        tool_calls.append({
                            "ts": ts,
                            "name": block.get("name", ""),
                            "input": block.get("input", {}),
                        })
        except Exception:
            continue
        if tool_calls:
            sessions[sid] = tool_calls
    return sessions


# ─── 検知器 ────────────────────────────────────────────────

def detect_repeated_bash(tool_calls, threshold=3):
    """同一セッション内で同種のBashコマンド（grep/find等）が threshold 回以上"""
    findings = []
    cmd_groups = defaultdict(list)
    for tc in tool_calls:
        if tc["name"] != "Bash":
            continue
        cmd = tc["input"].get("command", "").strip()
        for pat, label in BASH_WASTE_PATTERNS:
            if pat.match(cmd):
                cmd_groups[label].append(cmd[:80])
                break
    for label, cmds in cmd_groups.items():
        if len(cmds) >= threshold:
            findings.append({
                "type": "repeated_bash",
                "label": label,
                "count": len(cmds),
                "examples": cmds[:3],
                "severity": min(len(cmds), 10),
                "suggestion": PYTHON_ALTERNATIVES.get(label, "バッチ処理化を検討"),
            })
    return findings


def detect_duplicate_reads(tool_calls, threshold=2):
    """同一ファイルを threshold 回以上 Read している"""
    findings = []
    read_counter = Counter()
    for tc in tool_calls:
        if tc["name"] == "Read":
            fp = tc["input"].get("file_path", "")
            if fp:
                read_counter[fp] += 1
    for fp, count in read_counter.items():
        if count >= threshold:
            findings.append({
                "type": "duplicate_read",
                "file": fp,
                "count": count,
                "severity": count,
                "suggestion": f"1回読み込んでメモリに保持。変更がない限り再読不要。",
            })
    return findings


def detect_sequential_independent_bash(tool_calls, window=5, threshold=4):
    """連続した Bash 呼び出しが threshold 件以上（並列化候補）"""
    findings = []
    i = 0
    while i < len(tool_calls):
        if tool_calls[i]["name"] != "Bash":
            i += 1
            continue
        run = []
        j = i
        while j < len(tool_calls) and tool_calls[j]["name"] == "Bash":
            run.append(tool_calls[j]["input"].get("command", "")[:60])
            j += 1
        if len(run) >= threshold:
            findings.append({
                "type": "sequential_bash",
                "count": len(run),
                "examples": run[:4],
                "severity": len(run),
                "suggestion": "独立したコマンドは並列Bash呼び出し or Agentサブエージェント化で同時実行",
            })
        i = max(j, i + 1)
    return findings


def detect_grep_without_python(tool_calls, threshold=4):
    """grep が 4 回以上かつ Python スクリプトが未使用のセッション"""
    grep_count = sum(
        1 for tc in tool_calls
        if tc["name"] == "Bash" and tc["input"].get("command", "").strip().startswith("grep")
    )
    python_count = sum(
        1 for tc in tool_calls
        if tc["name"] == "Bash" and "python" in tc["input"].get("command", "").lower()
    )
    findings = []
    if grep_count >= threshold and python_count == 0:
        findings.append({
            "type": "grep_without_python",
            "count": grep_count,
            "severity": grep_count,
            "suggestion": (
                f"grep {grep_count}回 → evaluate_wiki.py のような一括解析スクリプト化を検討。"
                " Python: pathlib + re で全パターンを1パスで処理可能"
            ),
        })
    return findings


def detect_find_glob_mix(tool_calls):
    """find コマンドと Glob ツールを混在使用（Glob ツールに統一すべき）"""
    finds = [tc for tc in tool_calls if tc["name"] == "Bash" and tc["input"].get("command", "").strip().startswith("find")]
    globs = [tc for tc in tool_calls if tc["name"] == "Glob"]
    findings = []
    if finds and globs:
        findings.append({
            "type": "find_glob_mix",
            "find_count": len(finds),
            "glob_count": len(globs),
            "severity": len(finds),
            "suggestion": "Globツールに統一（find コマンドより軽量・トークン節約）",
        })
    return findings


ALL_DETECTORS = [
    detect_repeated_bash,
    detect_duplicate_reads,
    detect_sequential_independent_bash,
    detect_grep_without_python,
    detect_find_glob_mix,
]


# ─── 集計・出力 ────────────────────────────────────────────

def analyze_session(sid, tool_calls):
    findings = []
    for detector in ALL_DETECTORS:
        findings.extend(detector(tool_calls))
    total_severity = sum(f["severity"] for f in findings)
    return {
        "session_id": sid[:8],
        "tool_call_count": len(tool_calls),
        "findings": findings,
        "total_severity": total_severity,
    }


def aggregate_patterns(session_reports):
    """全セッション横断でパターンを集計"""
    pattern_counter = defaultdict(int)
    pattern_examples = defaultdict(list)
    for report in session_reports:
        for f in report["findings"]:
            t = f["type"]
            pattern_counter[t] += 1
            if f.get("examples"):
                pattern_examples[t].extend(f["examples"][:2])
            elif f.get("file"):
                pattern_examples[t].append(f["file"])
    return pattern_counter, pattern_examples


def format_report(session_reports, n_sessions):
    """ターミナル出力フォーマット"""
    sep = "=" * 72
    lines = [sep, f"  Token Efficiency Audit  ({n_sessions} sessions)", sep]

    # セッション別ランキング
    ranked = sorted(session_reports, key=lambda r: r["total_severity"], reverse=True)
    lines.append("\n【セッション別スコア（高いほど無駄が多い）】")
    for r in ranked[:10]:
        bar = "▓" * min(r["total_severity"], 30)
        lines.append(f"  {r['session_id']}  tools:{r['tool_call_count']:>4}  waste:{r['total_severity']:>3}  {bar}")

    # パターン横断集計
    pattern_counter, pattern_examples = aggregate_patterns(session_reports)
    lines.append("\n【検知パターン ランキング】")
    TYPE_LABELS = {
        "repeated_bash":           "繰り返しBash（grep/find/ls等）",
        "duplicate_read":          "同一ファイル重複Read",
        "sequential_bash":         "連続Bash（並列化候補）",
        "grep_without_python":     "Python未使用のgrep多用",
        "find_glob_mix":           "find+Glob混在（Globに統一推奨）",
    }
    SUGGESTIONS = {
        "repeated_bash":       "→ Python one-liner or バッチスクリプト化",
        "duplicate_read":      "→ 変数に保持して再利用",
        "sequential_bash":     "→ 独立コマンドを並列tool call or Agentに",
        "grep_without_python": "→ evaluate_wiki.py パターンで一括処理",
        "find_glob_mix":       "→ Globツールに統一（RTKフィルタ対応済み）",
    }
    for ptype, count in sorted(pattern_counter.items(), key=lambda x: -x[1]):
        label = TYPE_LABELS.get(ptype, ptype)
        suggestion = SUGGESTIONS.get(ptype, "")
        lines.append(f"\n  [{count}セッション] {label}")
        lines.append(f"  {suggestion}")
        examples = list(dict.fromkeys(pattern_examples[ptype]))[:3]
        for ex in examples:
            lines.append(f"    例: {ex[:70]}")

    # サマリ
    total_findings = sum(len(r["findings"]) for r in session_reports)
    waste_sessions = sum(1 for r in session_reports if r["total_severity"] > 0)
    lines.append(f"\n{sep}")
    lines.append(f"  分析: {n_sessions}セッション | 問題あり: {waste_sessions} | 検知件数: {total_findings}")
    lines.append(f"  改善優先度: repeated_bash > grep_without_python > sequential_bash")
    lines.append(sep)
    return "\n".join(lines)


def generate_script_template(ptype, examples):
    """パターン別Pythonスクリプト雛形を生成"""
    today = datetime.now().strftime("%Y-%m-%d")
    if ptype == "grep_without_python":
        targets = "\n".join(f'    "{ex[:50]}",' for ex in examples[:3])
        return textwrap.dedent(f"""\
            # auto-generated: {today} | pattern: {ptype}
            # 元のgrep呼び出しを1パスに集約する雛形
            import re
            from pathlib import Path

            BASE = Path("C:/Users/kfuru/.secretary")
            PATTERNS = [
            {targets}
            ]

            def search_all(directory: str, suffixes=(".md", ".jsx", ".html")):
                results = {{}}
                for path in Path(directory).rglob("*"):
                    if path.suffix not in suffixes:
                        continue
                    try:
                        text = path.read_text(encoding="utf-8", errors="ignore")
                    except Exception:
                        continue
                    hits = {{pat: [m.start() for m in re.finditer(pat, text)] for pat in PATTERNS}}
                    hits = {{k: v for k, v in hits.items() if v}}
                    if hits:
                        results[str(path)] = hits
                return results

            if __name__ == "__main__":
                import json
                r = search_all(BASE)
                print(json.dumps(r, ensure_ascii=False, indent=2))
            """)
    elif ptype == "repeated_bash" or ptype == "find_glob_mix":
        return textwrap.dedent(f"""\
            # auto-generated: {today} | pattern: {ptype}
            # find/ls の繰り返しをPython一括処理に置き換える雛形
            from pathlib import Path

            BASE = Path("C:/Users/kfuru/.secretary")

            def scan_directory(root=BASE, suffixes=None, max_depth=3):
                results = []
                for path in root.rglob("*"):
                    depth = len(path.relative_to(root).parts)
                    if depth > max_depth:
                        continue
                    if suffixes and path.suffix not in suffixes:
                        continue
                    results.append({{
                        "path": str(path),
                        "is_dir": path.is_dir(),
                        "size": path.stat().st_size if path.is_file() else 0,
                    }})
                return results

            if __name__ == "__main__":
                import json
                print(json.dumps(scan_directory(), ensure_ascii=False, indent=2))
            """)
    return None


def append_efficiency_log(session_reports, pattern_counter):
    """知識ログ(knowledge/efficiency-log.md)に今回の結果を追記"""
    EFFICIENCY_LOG.parent.mkdir(parents=True, exist_ok=True)
    today = datetime.now().strftime("%Y-%m-%d %H:%M")
    total = len(session_reports)
    waste = sum(1 for r in session_reports if r["total_severity"] > 0)
    avg_severity = sum(r["total_severity"] for r in session_reports) / total if total else 0
    top_patterns = sorted(pattern_counter.items(), key=lambda x: -x[1])[:3]
    top_str = " / ".join(f"{k}({v})" for k, v in top_patterns)

    entry = f"\n## {today}\n- 分析: {total}セッション | 問題あり: {waste} | 平均waste: {avg_severity:.1f}\n- 上位パターン: {top_str}\n"

    if not EFFICIENCY_LOG.exists():
        EFFICIENCY_LOG.write_text("# Efficiency Audit Log\n\n自動生成ログ。無駄パターンの推移を追跡する。\n", encoding="utf-8")
    with open(EFFICIENCY_LOG, "a", encoding="utf-8") as f:
        f.write(entry)


def auto_act(session_reports, pattern_counter):
    """
    --auto モード: A（Act）の半自動化
    - wasteスコア超過セッション → inbox/にアラートファイル生成
    - 同パターン連続検知 → Pythonスクリプト雛形を自動生成
    """
    today = datetime.now().strftime("%Y-%m-%d")
    actions_taken = []

    # 高wasteセッションのアラート
    hot_sessions = [r for r in session_reports if r["total_severity"] >= AUTO_ALERT_SEVERITY]
    if hot_sessions:
        alert_path = INBOX_DIR / f"efficiency-alert-{today}.md"
        lines = [
            f"---",
            f"date: {today}",
            f"type: efficiency-alert",
            f"priority: 高",
            f"---",
            f"",
            f"# 効率化アラート {today}",
            f"",
            f"wasteスコアが閾値({AUTO_ALERT_SEVERITY})を超えたセッションを検知。",
            f"",
            f"## 要対応セッション",
        ]
        for r in sorted(hot_sessions, key=lambda x: -x["total_severity"])[:5]:
            lines.append(f"\n### {r['session_id']} (waste: {r['total_severity']})")
            for f in r["findings"]:
                lines.append(f"- [{f['type']}] severity:{f['severity']} — {f['suggestion'][:70]}")
        lines += [
            f"",
            f"## 推奨アクション",
            f"1. `python audit_efficiency.py --worst 3` で詳細確認",
            f"2. 頻出パターンをPythonスクリプト化（evaluate_wiki.py参照）",
            f"3. スキル登録して再発防止",
        ]
        INBOX_DIR.mkdir(parents=True, exist_ok=True)
        alert_path.write_text("\n".join(lines), encoding="utf-8")
        actions_taken.append(f"アラート生成: {alert_path.name}")

    # 高頻度パターン → スクリプト雛形自動生成
    script_dir = BASE / "scripts" / "auto-generated"
    for ptype, count in pattern_counter.items():
        if count >= AUTO_SCRIPT_THRESHOLD and ptype in ("grep_without_python", "repeated_bash", "find_glob_mix"):
            script_path = script_dir / f"{ptype.replace('_', '-')}-template.py"
            if not script_path.exists():
                examples = []
                for r in session_reports:
                    for f in r["findings"]:
                        if f["type"] == ptype:
                            examples.extend(f.get("examples", []))
                template = generate_script_template(ptype, examples)
                if template:
                    script_dir.mkdir(parents=True, exist_ok=True)
                    script_path.write_text(template, encoding="utf-8")
                    actions_taken.append(f"スクリプト雛形生成: scripts/auto-generated/{script_path.name}")

    return actions_taken


def write_json(session_reports, output_path):
    data = {
        "meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "sessions_analyzed": len(session_reports),
        },
        "sessions": session_reports,
        "pattern_summary": {
            k: v for k, v in aggregate_patterns(session_reports)[0].items()
        },
    }
    Path(output_path).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


# ─── メイン ────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Claude session efficiency auditor")
    parser.add_argument("--sessions", type=int, default=20, help="分析セッション数 (default: 20)")
    parser.add_argument("--json-only", action="store_true")
    parser.add_argument("--worst", type=int, default=0, help="ワーストNセッションの詳細表示")
    parser.add_argument("--auto", action="store_true",
                        help="自動モード: アラート生成・スクリプト雛形生成・ログ蓄積を実行")
    args = parser.parse_args()

    sessions = load_sessions(args.sessions)
    if not sessions:
        # Stop hook からの実行時はエラーを黙って終了
        if args.auto:
            sys.exit(0)
        print("セッションログが見つかりません:", ARCHIVE_DIR)
        sys.exit(1)

    reports = [analyze_session(sid, calls) for sid, calls in sessions.items()]
    pattern_counter, _ = aggregate_patterns(reports)

    output_path = Path(__file__).parent / "efficiency-audit.json"
    write_json(reports, output_path)

    # P: knowledge/efficiency-log.md に結果蓄積（常に実行）
    append_efficiency_log(reports, pattern_counter)

    if args.auto:
        # A: 半自動Act（アラート + 雛形生成）
        actions = auto_act(reports, pattern_counter)
        if actions:
            print("[efficiency-audit] " + " | ".join(actions))
        else:
            print("[efficiency-audit] OK — 閾値超えなし")
        return

    if not args.json_only:
        print(format_report(reports, len(reports)))

        if args.worst > 0:
            ranked = sorted(reports, key=lambda r: r["total_severity"], reverse=True)
            print("\n【ワーストセッション 詳細】")
            for r in ranked[:args.worst]:
                print(f"\n  Session: {r['session_id']}  (tools: {r['tool_call_count']}, waste: {r['total_severity']})")
                for f in r["findings"]:
                    print(f"    [{f['type']}] severity:{f['severity']}")
                    print(f"      → {f['suggestion'][:80]}")
                    for ex in f.get("examples", [])[:2]:
                        print(f"      例: {ex[:65]}")

        print(f"\nJSON: {output_path}")


if __name__ == "__main__":
    main()
