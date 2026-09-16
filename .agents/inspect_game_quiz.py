import sys
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

with open('static/js/game.js', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.split('\n')
for idx, line in enumerate(lines, 1):
    if re.search(r'^\s*(async\s+)?(startLevel|startTimeAttack|startDailyChallenge|startQuiz|loadQuestions|renderQuestion|selectOption|nextQuestion|finishQuiz|submit|openReview|filterReview|retryMistakes|showView)\b', line):
        print(f"Line {idx:4d}: {line.strip()[:80]}")
