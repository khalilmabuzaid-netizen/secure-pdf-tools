import sqlite3
import sys

sys.stdout.reconfigure(encoding='utf-8')

def check_db():
    conn = sqlite3.connect('gamified_tests.db')
    c = conn.cursor()
    
    # 1. Check duplicate emails
    dup_emails = c.execute("SELECT lower(email), count(*) FROM users GROUP BY lower(email) HAVING count(*) > 1").fetchall()
    print("Duplicate emails:", dup_emails)
    
    # 2. Check empty or invalid emails/names
    invalid_users = c.execute("SELECT id, name, email FROM users WHERE email IS NULL OR trim(email) = '' OR name IS NULL OR trim(name) = ''").fetchall()
    print("Invalid users:", invalid_users)
    
    # 3. Check users list
    all_users = c.execute("SELECT id, name, email, total_xp, hero_title FROM users ORDER BY id ASC").fetchall()
    print(f"Total users: {len(all_users)}")
    for u in all_users:
        print(u)
        
    conn.close()

if __name__ == "__main__":
    check_db()
