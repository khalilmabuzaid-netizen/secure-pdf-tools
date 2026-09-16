import sys

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

with open('main.py', 'r', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'ACHIEVEMENTS_LIST\s*=\s*\[(.*?)\]', text, re.S)
if m:
    print("Achievements found:")
    print(m.group(0)[:800])
else:
    print("Searching for badges in main.py...")
    for line in text.split('\n'):
        if 'badge' in line.lower() and ('dict' in line.lower() or '=' in line):
            print(line[:100])
