import sys
import os
import re
import requests
import sqlite3

sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:8000"

def test_everything():
    print("==================================================")
    print("1. التحقق من قاعدة البيانات ونموذج المشرف (Database & Admin Role)")
    print("==================================================")
    conn = sqlite3.connect('gamified_tests.db')
    c = conn.cursor()
    admin_user = c.execute("SELECT id, name, email, is_admin FROM users WHERE lower(email) = 'khalilmabuzaid@gmail.com'").fetchone()
    print(f"المستخدم المشرف في قاعدة البيانات: {admin_user}")
    assert admin_user is not None, "المستخدم khalilmabuzaid@gmail.com غير موجود في قاعدة البيانات!"
    assert admin_user[3] == 1, "is_admin لم يتم تفعيله للمشرف!"
    print("✅ تم التحقق: المشرف يمتلك صلاحية is_admin = 1 بنجاح.")
    conn.close()

    print("\n==================================================")
    print("2. التحقق من مسارات الـ API (Auth & Admin API Endpoints)")
    print("==================================================")
    
    # أ. تسجيل الدخول لمستخدم المشرف
    res = requests.post(f"{BASE_URL}/api/login", json={"email": "khalilmabuzaid@gmail.com"})
    assert res.status_code == 200, f"خطأ في مسار تسجيل الدخول: {res.status_code}"
    user_data = res.json()
    print(f"بيانات الدخول: ID={user_data['id']}, Name={user_data['name']}, is_admin={user_data.get('is_admin')}")
    assert user_data.get("is_admin") == True, "is_admin ليس True في استجابة الـ API!"
    print("✅ تم التحقق: مسار /api/login يعيد is_admin=True للمشرف.")

    # ب. تسجيل الدخول بحالة أحرف مختلفة ومسافات
    res = requests.post(f"{BASE_URL}/api/login", json={"email": "  KHALILmabuzaid@GMAIL.COM  "})
    assert res.status_code == 200
    print("✅ تم التحقق: تسجيل الدخول مرن ويتعامل مع الأحرف الكبيرة والمسافات.")

    # ج. فحص محاولة التسجيل ببريد موجود مسبقاً (معالجة عدم حدوث خطأ 500)
    res = requests.post(f"{BASE_URL}/api/users/register", json={"name": "Khaled", "email": "khalilmabuzaid@gmail.com"})
    assert res.status_code == 400
    assert "مسجل بالفعل" in res.json().get("detail", "")
    print("✅ تم التحقق: التسجيل ببريد مكرر يعيد كود 400 واضح دون التسبب بانهيار في السيرفر أو تعليق الجلسة.")

    # د. جلب الأسئلة والمراحل من قبل المشرف
    res_levels = requests.get(f"{BASE_URL}/api/admin/levels")
    assert res_levels.status_code == 200
    levels = res_levels.json()
    print(f"عدد المراحل المتاحة في محرر الأسئلة: {len(levels)}")

    res_q = requests.get(f"{BASE_URL}/api/admin/questions")
    assert res_q.status_code == 200
    q_list = res_q.json()
    print(f"إجمالي الأسئلة في بنك الأسئلة: {q_list['total']}")

    # هـ. إضافة سؤال وتعديله وحذفه
    new_payload = {
        "level_id": levels[0]["id"],
        "content": "اختبار التحقق الآلي: ما قيمة س إذا كان 2س + 6 = 16؟",
        "options": ["3", "4", "5", "6"],
        "correct_answer": "5",
        "static_hint": "اطرح 6 من الطرفين ثم اقسم على 2",
        "explanation": "2س = 10 إذن س = 5"
    }
    create_res = requests.post(f"{BASE_URL}/api/admin/questions", json=new_payload)
    assert create_res.status_code == 200
    created_id = create_res.json()["question"]["id"]
    print(f"✅ تم إنشاء سؤال جديد بنجاح برقم ID: {created_id}")

    edit_res = requests.put(f"{BASE_URL}/api/admin/questions/{created_id}", json={
        "content": "اختبار التحقق الآلي: ما قيمة س إذا كان 2س + 6 = 16؟ (محدث)",
        "correct_answer": "5"
    })
    assert edit_res.status_code == 200
    print("✅ تم تعديل السؤال بنجاح.")

    del_res = requests.delete(f"{BASE_URL}/api/admin/questions/{created_id}")
    assert del_res.status_code == 200
    print("✅ تم حذف السؤال التجريبي بنجاح.")

    # و. تنظيف وفحص قاعدة البيانات
    clean_res = requests.post(f"{BASE_URL}/api/users/manage/cleanup")
    assert clean_res.status_code == 200
    print(f"✅ تم تشغيل مسار صيانة وتنظيف السجلات: {clean_res.json()}")

    print("\n==================================================")
    print("3. التحقق من تكامل ملفات الواجهة الأمامية (HTML & JS Integrity)")
    print("==================================================")
    
    # فحص index.html
    with open("static/index.html", "r", encoding="utf-8") as f:
        html_content = f.read()
    assert "adminEditorBtn" in html_content, "زر المشرف adminEditorBtn غير موجود في index.html!"
    assert "questionEditorModal" in html_content, "نافذة محرر الأسئلة questionEditorModal غير موجودة في index.html!"
    assert "adminQuestionsList" in html_content, "حاوية قائمة الأسئلة غير موجودة!"
    assert "adminQuestionForm" in html_content, "نموذج إدارة الأسئلة غير موجود!"
    print("✅ تم التحقق: جميع عناصر محرر الأسئلة وزر المشرف موجودة في index.html.")

    # فحص app.js
    with open("app.js", "r", encoding="utf-8") as f:
        app_js = f.read()
    assert "transitionToJourneyMap" in app_js, "دالة transitionToJourneyMap غير موجودة في app.js!"
    assert "/api/login" in app_js, "مسار /api/login غير مستدعى في app.js!"
    assert "applySuccessfulAuth" in app_js, "دالة تطبيق الدخول الناجح غير موجودة في app.js!"
    print("✅ تم التحقق: app.js يحتوي على المنطق المطور للتعامل مع الدخول وتفادي أخطاء التكرار.")

    # فحص game.js
    with open("static/js/game.js", "r", encoding="utf-8") as f:
        game_js = f.read()
    assert "openQuestionEditor" in game_js, "دالة openQuestionEditor غير موجودة في game.js!"
    assert "saveAdminQuestion" in game_js, "دالة saveAdminQuestion غير موجودة في game.js!"
    assert "deleteAdminQuestion" in game_js, "دالة deleteAdminQuestion غير موجودة في game.js!"
    assert "adminEditorBtn" in game_js, "منطق زر المشرف غير موجود في updateHud!"
    print("✅ تم التحقق: game.js يحتوي على جميع دوال إدارة الأسئلة وصلاحية المشرف.")

    print("\n🎉 جميع الاختبارات وفحوصات التكامل اجتازت بنجاح بنسبة 100%! 🎉")

if __name__ == "__main__":
    test_everything()
