with open('main.py', 'r', encoding='utf-8') as f:
    code = f.read()

import re
matches = [m.start() for m in re.finditer(r'record_user_quest_progress', code)]
print(f"Total calls to record_user_quest_progress in main.py: {len(matches)}")
for idx in matches:
    start = max(0, idx - 80)
    end = min(len(code), idx + 120)
    print("--- CALL ---")
    print(code[start:end].replace('\n', ' '))
