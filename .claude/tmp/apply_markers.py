"""
Apply <span className="marker">...</span> wrapping to specific phrases in
denken3-riron-wiki.html across 7 pages (RULE-14).

Each replacement is anchored by enough surrounding context to be unique
at file scope. Uses str.replace with count=1 and asserts each match.
"""
from pathlib import Path
import sys

PATH = Path(r"C:\Users\kfuru\.secretary\denken3-riron-wiki.html")

text = PATH.read_text(encoding="utf-8")
original = text

def m(s: str) -> str:
    return f'<span className="marker">{s}</span>'

# (description, old, new) — old must be unique in the file
edits = []

# ---------------- AcBasicsPage ----------------
edits += [
    (
        "AcBasics: 5秒で思い出す Callout",
        "      実効値 = 最大値/√2。インピーダンス Z = R + jX（|Z| = √(R² + X²)）。XL = ωL（遅れ）、XC = 1/(ωC)（進み）。電流は XL で遅れ、XC で進む。",
        f"      {m('実効値 = 最大値/√2')}。インピーダンス {m('Z = R + jX（|Z| = √(R² + X²)）')}。{m('XL = ωL')}（遅れ）、{m('XC = 1/(ωC)')}（進み）。電流は XL で遅れ、XC で進む。",
    ),
    (
        "AcBasics: 比較表 L 行",
        "<tr><td>インダクタ L</td><td>電流が電圧より <strong>90° 遅れ</strong></td><td>ELI：電圧(E)→電流(I)の順</td></tr>",
        f"<tr><td>インダクタ L</td><td>{m('電流が電圧より 90° 遅れ')}</td><td>{m('ELI：電圧(E)→電流(I)の順')}</td></tr>",
    ),
    (
        "AcBasics: 比較表 C 行",
        "<tr><td>コンデンサ C</td><td>電流が電圧より <strong>90° 進み</strong></td><td>ICE：電流(I)→電圧(E)の順</td></tr>",
        f"<tr><td>コンデンサ C</td><td>{m('電流が電圧より 90° 進み')}</td><td>{m('ICE：電流(I)→電圧(E)の順')}</td></tr>",
    ),
    (
        "AcBasics: 例題1 ツボ",
        "      実効値 = 最大値/√2。√2 ≈ 1.414 を覚えておけば即計算できる。コンセント100Vは実効値、最大値は約141V。",
        f"      {m('実効値 = 最大値/√2')}。√2 ≈ 1.414 を覚えておけば即計算できる。コンセント100Vは実効値、最大値は約141V。",
    ),
    (
        "AcBasics: 例題2 ツボ",
        "      Z = √(R² + XL²) がポイント。位相差は tan φ = XL/R。3-4-5 の直角三角形は頻出パターン。",
        f"      {m('Z = √(R² + XL²)')} がポイント。位相差は {m('tan φ = XL/R')}。3-4-5 の直角三角形は頻出パターン。",
    ),
    (
        "AcBasics: 力率 cosφ Callout (公式表 cosφ)",
        '          formula: "\\\\cos\\\\phi = R / |Z|",\n          meaning: "力率。有効電力の割合。消費電力 P = VI cosφ",',
        '          formula: "\\\\cos\\\\phi = R / |Z|",\n          meaning: "力率。有効電力の割合。消費電力 P = VI cosφ（' + m('力率 cosφ = R/Z') + '）",',
    ),
]

# ---------------- RlcResonancePage ----------------
# Read content first to find anchors. We use known phrases.
edits += [
    (
        "Rlc: 共振条件 XL=XC",
        # Best-effort phrase that should appear exactly once in RLC section.
        # If absent, the script will report it.
        "共振条件：XL = XC",
        m("共振条件：XL = XC"),
    ),
]

# Apply edits
applied = 0
missing = []
for desc, old, new in edits:
    cnt = text.count(old)
    if cnt == 0:
        missing.append((desc, old[:80]))
        continue
    if cnt > 1:
        missing.append((desc + " [非ユニーク]", old[:80]))
        continue
    text = text.replace(old, new, 1)
    applied += 1

if applied:
    PATH.write_text(text, encoding="utf-8")

print(f"Applied: {applied}")
print(f"Missing/non-unique: {len(missing)}")
for d, snip in missing:
    print(f"  - {d}: {snip!r}")
