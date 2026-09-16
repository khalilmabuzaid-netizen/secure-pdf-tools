import sys
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines, 1):
    stripped = line.strip()
    if re.search(r'^\s*(async\s+)?([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{', line):
        print(f"Line {idx:4d}: {stripped[:90]}")
