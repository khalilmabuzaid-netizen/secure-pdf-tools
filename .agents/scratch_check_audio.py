with open('app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

with open('static/js/game.js', 'r', encoding='utf-8') as f:
    game_js = f.read()

with open('static/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

import re
print("Audio calls in app.js:")
for m in re.findall(r'(?:audio|gameAudio)\.[\w]+', app_js):
    print(" -", m)

print("\nAudio methods used in game.js:")
audio_calls = set(re.findall(r'window\.gameAudio\.(\w+)', game_js))
for ac in audio_calls:
    print(" - window.gameAudio." + ac)

print("\nAudio toggle in HTML:")
for btn in re.findall(r'<button[^>]*audio[^>]*>.*?</button>', html, re.DOTALL | re.IGNORECASE):
    print(btn)
