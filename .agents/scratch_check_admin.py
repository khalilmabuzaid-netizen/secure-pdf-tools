import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('main.py', 'r', encoding='utf-8') as f:
    main_py = f.read()

with open('static/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
print("Search 'admin' in main.py:", len(re.findall(r'admin', main_py, re.I)))
print("Search 'question' endpoints in main.py:")
for m in re.findall(r'@app\.[a-z]+\([\'\"][^\'\"]*question[^\'\"]*[\'\"]\)', main_py):
    print(" -", m)

print("\nSearch 'admin' in index.html:", len(re.findall(r'admin', html, re.I)))
