import sys
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

with open('static/js/game.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in game.js: {len(lines)}")
for idx, line in enumerate(lines, 1):
    if re.search(r'^\s*(class\s+|async\s+[a-zA-Z0-9_]+\s*\(|[a-zA-Z0-9_]+\s*\([^)]*\)\s*\{|window\.[a-zA-Z0-9_]+\s*=)', line):
        print(f"Line {idx:4d}: {line.strip()[:90]}")
