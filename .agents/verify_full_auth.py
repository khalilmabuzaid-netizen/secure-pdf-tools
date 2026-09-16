import sys
import urllib.request
import json
import urllib.error
import random

sys.stdout.reconfigure(encoding='utf-8')

base_url = 'http://127.0.0.1:8000'

def post_json(path, data):
    req = urllib.request.Request(
        f"{base_url}{path}",
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        try:
            return e.code, json.loads(body)
        except:
            return e.code, body

print('--- Test 1: Admin login with NO password (Should be 401) ---')
status, res = post_json('/api/login', {'email': 'khalilmabuzaid@gmail.com'})
print(f'Status: {status}, Response: {res}')
assert status == 401

print('\n--- Test 2: Admin login with WRONG password (Should be 401) ---')
status, res = post_json('/api/login', {'email': 'khalilmabuzaid@gmail.com', 'password': 'wrongpassword'})
print(f'Status: {status}, Response: {res}')
assert status == 401

print('\n--- Test 3: Admin login with CORRECT password (admin123) ---')
status, res = post_json('/api/login', {'email': 'khalilmabuzaid@gmail.com', 'password': 'admin123'})
print(f'Status: {status}, is_admin: {res.get("is_admin")}')
assert status == 200 and res.get('is_admin') is True

print('\n--- Test 4: Register New User with Password ---')
rnd = random.randint(1000, 9999)
new_email = f"hero_test_{rnd}@qudurat.sa"
status, res = post_json('/api/users/register', {
    'name': f'بطل الاختبار {rnd}',
    'email': new_email,
    'password': 'HeroPassword2026',
    'avatar_id': '🏹'
})
print(f'Status: {status}, Response User: {res.get("name")}, Email: {res.get("email")}')
assert status == 200

print('\n--- Test 5: Regular User Login with Wrong Password (Should be 401) ---')
status, res = post_json('/api/login', {'email': new_email, 'password': 'WrongPassword!'})
print(f'Status: {status}, Response: {res}')
assert status == 401

print('\n--- Test 6: Regular User Login with Correct Password ---')
status, res = post_json('/api/login', {'email': new_email, 'password': 'HeroPassword2026'})
print(f'Status: {status}, Name: {res.get("name")}, is_admin: {res.get("is_admin")}')
assert status == 200 and res.get('is_admin') is False

print('\n>>> ALL COMPLETE AUTHENTICATION & SECURITY TESTS PASSED PERFECTLY! <<<')
