import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
WORKSPACE = r"c:\Users\khlel5\Documents\ai_tools"
html_files = [f for f in os.listdir(WORKSPACE) if f.endswith(".html")]

print("CHECKING H1 ELEMENTS ACROSS ALL PAGES:")
for hfile in sorted(html_files):
    hpath = os.path.join(WORKSPACE, hfile)
    with open(hpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    print(f"\n{hfile} ({len(h1s)} H1s):")
    for i, h in enumerate(h1s, 1):
        clean_h = re.sub(r'\s+', ' ', h).strip()
        print(f"  {i}. {clean_h}")
