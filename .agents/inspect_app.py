import re

with open('static/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("--- ALL VIEW-SECTIONS OR MAINS ---")
for m in re.finditer(r'<(main|section|div)[^>]*\bid=["\']([^"\']+)["\'][^>]*>', html):
    tag, id_str = m.group(1), m.group(2)
    line_no = html[:m.start()].count('\n') + 1
    if 'view' in id_str.lower() or 'screen' in id_str.lower() or 'section' in id_str.lower() or 'game' in id_str.lower() or 'result' in id_str.lower() or 'duel' in id_str.lower() or 'flash' in id_str.lower() or 'map' in id_str.lower() or 'auth' in id_str.lower():
        print(f"Line {line_no:4d}: <{tag}> id='{id_str}'")

print("\n--- APP.JS STRUCTURE ---")
with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

methods = re.findall(r'(\b[a-zA-Z0-9_]+\s*\([^)]*\)\s*\{)', app_js)
print(f"Total methods/functions in app.js: {len(methods)}")
for fn in re.findall(r'^\s*([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{', app_js, re.M):
    if any(k in fn.lower() for k in ['view', 'show', 'start', 'submit', 'exam', 'quiz', 'game', 'result', 'time', 'duel', 'flash', 'daily', 'bootcamp']):
        print(f"  Method: {fn}")
