import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('main.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx in range(3400, min(len(lines), 3760)):
    print(f"{idx+1}: {lines[idx]}", end="")
