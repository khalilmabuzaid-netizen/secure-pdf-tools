import sys
import requests

sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:8000"

def test_all():
    # 1. Test POST /api/login with existing user
    print("Testing /api/login with existing user...")
    res = requests.post(f"{BASE_URL}/api/login", json={"email": "khalilmabuzaid@gmail.com"})
    print("Status:", res.status_code)
    data = res.json()
    print("User Data:", data)
    assert res.status_code == 200, f"Expected 200 got {res.status_code}"
    assert data["is_admin"] == True, "Expected is_admin=True for khalilmabuzaid@gmail.com"
    print("PASS: Admin login working!")

    # 2. Test POST /api/login with case-insensitive email
    print("\nTesting case-insensitive email login...")
    res = requests.post(f"{BASE_URL}/api/login", json={"email": "KHALILMABUZAID@GMAIL.COM"})
    assert res.status_code == 200
    assert res.json()["id"] == data["id"]
    print("PASS: Case-insensitive login working!")

    # 3. Test POST /api/login with non-existing email
    print("\nTesting non-existing email login...")
    res = requests.post(f"{BASE_URL}/api/login", json={"email": "not_existing_12345@test.com"})
    assert res.status_code == 404
    print("PASS: 404 returned correctly for non-existing email!")

    # 4. Test POST /api/users/register with duplicate email
    print("\nTesting duplicate email register...")
    res = requests.post(f"{BASE_URL}/api/users/register", json={"name": "Test Duplicate", "email": "khalilmabuzaid@gmail.com"})
    assert res.status_code == 400
    print("PASS: 400 with 'مسجل بالفعل' returned correctly without 500 error!")

    # 5. Test Admin Question API
    print("\nTesting GET /api/admin/questions...")
    res = requests.get(f"{BASE_URL}/api/admin/questions")
    assert res.status_code == 200
    q_data = res.json()
    print(f"Total questions returned: {q_data['total']}")

    # 6. Test Admin Levels API
    print("\nTesting GET /api/admin/levels...")
    res = requests.get(f"{BASE_URL}/api/admin/levels")
    assert res.status_code == 200
    levels = res.json()
    print(f"Total levels returned: {len(levels)}")

    # 7. Test Admin Add/Edit/Delete Question
    print("\nTesting Add Question...")
    new_q_payload = {
        "level_id": levels[0]["id"] if levels else 1,
        "content": "ما ناتج جمع 15 + 25 في اختبار القدرات التجريبي؟",
        "options": ["30", "35", "40", "45"],
        "correct_answer": "40",
        "static_hint": "اجمع الآحاد مع الآحاد والعشرات مع العشرات",
        "explanation": "15 + 25 = 40"
    }
    res = requests.post(f"{BASE_URL}/api/admin/questions", json=new_q_payload)
    assert res.status_code == 200
    created_q = res.json()["question"]
    created_id = created_q["id"]
    print(f"Created Question ID: {created_id}")

    # Edit Question
    print("Testing Edit Question...")
    update_payload = {
        "content": "ما ناتج جمع 15 + 25 بعد التعديل؟",
        "correct_answer": "40"
    }
    res = requests.put(f"{BASE_URL}/api/admin/questions/{created_id}", json=update_payload)
    assert res.status_code == 200
    assert res.json()["question"]["content"] == "ما ناتج جمع 15 + 25 بعد التعديل؟"
    print("PASS: Edit question working!")

    # Delete Question
    print("Testing Delete Question...")
    res = requests.delete(f"{BASE_URL}/api/admin/questions/{created_id}")
    assert res.status_code == 200
    print("PASS: Delete question working!")

    # 8. Test Database Cleanup
    print("\nTesting POST /api/users/manage/cleanup...")
    res = requests.post(f"{BASE_URL}/api/users/manage/cleanup")
    assert res.status_code == 200
    print("Cleanup response:", res.json())
    print("\nAll Backend Tests PASSED Successfully!")

if __name__ == "__main__":
    test_all()
