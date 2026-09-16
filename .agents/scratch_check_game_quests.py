with open('static/js/game.js', 'r', encoding='utf-8') as f:
    game_js = f.read()

import re
matches = [m.start() for m in re.finditer(r'quest', game_js, re.IGNORECASE)]
print(f"Total occurrences of 'quest' in game.js: {len(matches)}")
for idx in matches[:6]:
    start = max(0, idx - 100)
    end = min(len(code if 'code' in locals() else game_js), idx + 200)
    print("--- SNIPPET ---")
    print(game_js[start:end].replace('\n', ' '))
