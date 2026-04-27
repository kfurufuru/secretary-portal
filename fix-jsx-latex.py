"""
fix-jsx-latex.py — Fix JSX text node issues in riron-pages-batch2/3.jsx
1. k<1 → k&lt;1 in JSX text (batch2 is already fixed)
2. $formula\backslash$ in JSX text → {String.raw`$formula$`} (batch3)
"""
import re, sys

BS = chr(92)   # backslash
BT = chr(96)   # backtick

def wrap_latex(formula):
    """Wrap a LaTeX formula in String.raw template literal for JSX."""
    return '{String.raw' + BT + formula + BT + '}'

def fix_batch3_line(line):
    """Find $...\...$ formulas in JSX text and wrap in String.raw."""
    if BS not in line:
        return line
    # Skip pure comment or attribute lines
    stripped = line.strip()
    if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
        return line

    # Find $...$ formulas containing backslash, replace them
    # Pattern: $ followed by non-$ chars (with optional backslash), then $
    result = ''
    i = 0
    while i < len(line):
        if line[i] == '$':
            # Find matching close $
            j = i + 1
            while j < len(line) and line[j] != '$' and line[j] != '\n':
                j += 1
            if j < len(line) and line[j] == '$':
                formula = line[i:j+1]
                if BS in formula:
                    result += wrap_latex(formula)
                else:
                    result += formula
                i = j + 1
            else:
                result += line[i]
                i += 1
        else:
            result += line[i]
            i += 1
    return result

# ── Fix batch3 ──
with open('C:/Users/kfuru/.secretary/riron-pages-batch3.jsx', encoding='utf-8') as f:
    lines = f.readlines()

fixed = 0
for idx, line in enumerate(lines):
    new = fix_batch3_line(line)
    if new != line:
        lines[idx] = new
        fixed += 1

with open('C:/Users/kfuru/.secretary/riron-pages-batch3.jsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

sys.stdout.buffer.write(f'batch3: fixed {fixed} lines with LaTeX backslash\n'.encode())

# ── Verify batch2 k<1 fix ──
with open('C:/Users/kfuru/.secretary/riron-pages-batch2.jsx', encoding='utf-8') as f:
    b2 = f.read()
# Find any remaining bare < in JSX text nodes (not in tags or strings)
# Simple check: line 987 should now have &lt;
lines2 = b2.split('\n')
for i, l in enumerate(lines2[983:993], start=984):
    if 'k<1' in l:
        sys.stdout.buffer.write(f'WARN: batch2 line {i} still has k<1\n'.encode())
    if 'k&lt;1' in l:
        sys.stdout.buffer.write(f'OK: batch2 line {i} has k&lt;1\n'.encode())

sys.stdout.buffer.write(b'Done\n')
