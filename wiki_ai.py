#!/usr/bin/env python3
"""
wiki_ai.py — Wiki編集 外部AIオフロードツール
デフォルト: Groq無料 → 品質不足時のみ --model gemini/openai に切替

Usage:
  python wiki_ai.py find "TOC selector"  denken3-riron-wiki.html
  python wiki_ai.py find "TOC selector"  denken3-riron-wiki.html  --model openai
  python wiki_ai.py svg  "RC直列回路図"
  python wiki_ai.py ask  "useMemoとは"
  python wiki_ai.py ask  "TOCはどこ？" --file denken3-riron-wiki.html
  python wiki_ai.py models   # 使用可能なモデル一覧
"""

import sys, io, os, argparse, json, urllib.request, urllib.error
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

# ── APIキー ───────────────────────────────────────────
GROQ_API_KEY   = os.environ.get("GROQ_API_KEY",   "")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

MODELS = {
    "groq":   {"label": "Groq / Llama3-70b",    "free": True,  "ctx_k": 128},
    "gemini": {"label": "Gemini 2.0 Flash",      "free": False, "ctx_k": 1000},
    "openai": {"label": "GPT-4o-mini",           "free": False, "ctx_k": 128},
}
DEFAULT_MODEL = "groq"
MAX_SNIPPET   = 8_000   # Groq無料枠に収まるgrep出力上限

# ── バックエンド ──────────────────────────────────────
def groq_chat(messages):
    import groq
    r = groq.Groq(api_key=GROQ_API_KEY).chat.completions.create(
        model="llama-3.3-70b-versatile", messages=messages,
        max_tokens=4096, temperature=0.2)
    return r.choices[0].message.content.strip()

def openai_chat(messages):
    import openai
    if not OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY 未設定。platform.openai.com で課金後にキーを設定してください")
    r = openai.OpenAI(api_key=OPENAI_API_KEY).chat.completions.create(
        model="gpt-4o-mini", messages=messages, max_tokens=4096, temperature=0.2)
    return r.choices[0].message.content.strip()

def gemini_chat(messages):
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY 未設定")
    # messages → Gemini形式に変換
    text = "\n\n".join(f"[{m['role']}]\n{m['content']}" for m in messages)
    body = json.dumps({"contents": [{"parts": [{"text": text}]}]}).encode()
    url  = f"https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    req  = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
    try:
        r = urllib.request.urlopen(req)
        return json.loads(r.read())["candidates"][0]["content"]["parts"][0]["text"].strip()
    except urllib.error.HTTPError as e:
        err = json.loads(e.read()).get("error", {})
        raise RuntimeError(f"Gemini {err.get('code')} {err.get('message','')}")

def call_ai(messages, model=DEFAULT_MODEL):
    """指定モデルで実行。失敗時は auto モードのみフォールバック"""
    backends = {
        "groq":   groq_chat,
        "openai": openai_chat,
        "gemini": gemini_chat,
    }
    if model == "auto":
        # 無料→有料の優先順
        order = ["groq", "gemini", "openai"]
    else:
        order = [model]

    last_err = None
    for m in order:
        try:
            label = MODELS[m]["label"]
            print(f"[{label}]", file=sys.stderr)
            return backends[m](messages)
        except Exception as e:
            print(f"  → 失敗: {e}", file=sys.stderr)
            last_err = e
    raise last_err

# ── grep ─────────────────────────────────────────────
def grep_context(filepath, keywords, context=10):
    lines = Path(filepath).read_text(encoding="utf-8", errors="replace").splitlines()
    hits  = set()
    for i, line in enumerate(lines):
        if any(kw.lower() in line.lower() for kw in keywords):
            for j in range(max(0, i-context), min(len(lines), i+context+1)):
                hits.add(j)
    if not hits:
        return ""
    out, prev = [], -2
    for i in sorted(hits):
        if i > prev + 1:
            out.append(f"\n--- L{i+1} ---")
        out.append(f"{i+1:5}: {lines[i]}")
        prev = i
    return "\n".join(out)

# ── コマンド ──────────────────────────────────────────
def cmd_models():
    print("利用可能モデル:")
    for k, v in MODELS.items():
        cost  = "無料" if v["free"] else "有料（要課金）"
        print(f"  --model {k:<8} {v['label']:<25} {v['ctx_k']}K ctx  {cost}")
    print("\n品質不足時の切替例:")
    print("  python wiki_ai.py find '...' file.html --model gemini")

def cmd_find(query, filepath, model):
    keywords = [w for w in query.replace("　"," ").split() if len(w) >= 2] or [query[:20]]
    snippet  = grep_context(filepath, keywords)
    if not snippet:
        print(f"[grep: 該当なし] キーワード: {keywords}")
        return
    if len(snippet) > MAX_SNIPPET:
        snippet = snippet[:MAX_SNIPPET] + "\n...[省略]..."
    print(f"[grep: {len(snippet)}chars / ~{len(snippet)//4}tokens]", file=sys.stderr)
    messages = [
        {"role": "system", "content":
            "HTMLコードナビゲーター。該当コードを行番号付きで返せ。説明最小限。コードブロックで返す。"},
        {"role": "user", "content": f"スニペット:\n```\n{snippet}\n```\n\n質問: {query}"},
    ]
    print(call_ai(messages, model))

def cmd_svg(desc, model):
    messages = [
        {"role": "system", "content":
            "SVG専門家。React JSX用SVGを生成。viewBox='0 0 300 200'。日本語ラベル付き。コードブロックのみ。"},
        {"role": "user", "content": f"図を生成: {desc}"},
    ]
    print(call_ai(messages, model))

def cmd_ask(question, filepath, model):
    ctx = ""
    if filepath:
        raw = Path(filepath).read_text(encoding="utf-8", errors="replace")
        if len(raw) > MAX_SNIPPET * 4:
            raw = raw[:MAX_SNIPPET * 4] + "\n...[省略]..."
        ctx = f"\n\nファイル:\n```\n{raw}\n```"
    messages = [
        {"role": "system", "content": "簡潔・正確に日本語で答えよ。"},
        {"role": "user",   "content": question + ctx},
    ]
    print(call_ai(messages, model))

# ── main ─────────────────────────────────────────────
def main():
    p = argparse.ArgumentParser(description="Wiki AI オフロード（無料優先）")
    p.add_argument("--model", "-m", default=DEFAULT_MODEL,
                   choices=list(MODELS.keys()) + ["auto"],
                   help="groq(default/無料) | gemini | openai | auto(フォールバック)")
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("models", help="利用可能モデル一覧")

    pf = sub.add_parser("find", help="コード内の編集箇所を特定")
    pf.add_argument("query"); pf.add_argument("file")

    ps = sub.add_parser("svg",  help="SVG生成")
    ps.add_argument("description")

    pa = sub.add_parser("ask",  help="汎用質問")
    pa.add_argument("question")
    pa.add_argument("--file", "-f")

    args = p.parse_args()
    m    = args.model

    if args.cmd == "models":  cmd_models()
    elif args.cmd == "find":  cmd_find(args.query, args.file, m)
    elif args.cmd == "svg":   cmd_svg(args.description, m)
    elif args.cmd == "ask":   cmd_ask(args.question, getattr(args,"file",None), m)

if __name__ == "__main__":
    main()
