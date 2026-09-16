with open('static/js/game.js', 'r', encoding='utf-8') as f:
    code = f.read()

import re
matches = [m.start() for m in re.finditer(r'leaderboard', code, re.IGNORECASE)]
print(f"Total occurrences of 'leaderboard' in game.js: {len(matches)}")
for idx in matches[:5]:
    start = max(0, idx - 100)
    end = min(len(code), idx + 200)
    print("--- SNIPPET ---")
    print(code[start:end])
