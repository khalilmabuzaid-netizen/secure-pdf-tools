import sys
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

with open('static/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

print("--- CSS VARIABLES ---")
root_match = re.search(r':root\s*\{([^}]+)\}', css)
if root_match:
    print(root_match.group(1)[:600])

print("\n--- BANNER STYLES ---")
for m in re.finditer(r'(\.[a-zA-Z0-9_-]*banner[a-zA-Z0-9_-]*)\s*\{', css):
    print(m.group(1))

print("\n--- VICTORY / RESULT STYLES ---")
for m in re.finditer(r'(\.[a-zA-Z0-9_-]*(?:victory|result|score)[a-zA-Z0-9_-]*)\s*\{', css):
    print(m.group(1))
