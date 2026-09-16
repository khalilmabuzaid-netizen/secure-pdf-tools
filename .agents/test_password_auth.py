import requests
import json

base_url = 'http://127.0.0.1:8000'

print('==================================================')
print('1. اختبار تسجيل دخول المشرف بدون كلمة مرور (يجب أن يُرفض)')
print('==================================================')
res_no_pw = requests.post(f'{base_url}/api/login', json={'email': 'khalilmabuzaid@gmail.com'})
print(f'Status: {res_no_pw.status_code}, Response: {res_no_pw.json()}')
assert res_no_pw.status_code == 401, f'Expected 401, got {res_no_pw.status_code}'
print('✅ نجح الاختبار: تم رفض الدخول لحساب المشرف بدون كلمة مرور.')

print('\n==================================================')
print('2. اختبار تسجيل دخول المشرف بكلمة مرور خاطئة (يجب أن يُرفض)')
print('==================================================')
res_wrong_pw = requests.post(f'{base_url}/api/login', json={'email': 'khalilmabuzaid@gmail.com', 'password': 'WrongPassword999'})
print(f'Status: {res_wrong_pw.status_code}, Response: {res_wrong_pw.json()}')
assert res_wrong_pw.status_code == 401, f'Expected 401, got {res_wrong_pw.status_code}'
print('✅ نجح الاختبار: تم رفض الدخول بكلمة المرور الخاطئة.')

print('\n==================================================')
print('3. اختبار تسجيل دخول المشرف بكلمة المرور الصحيحة')
print('==================================================')
res_correct_pw = requests.post(f'{base_url}/api/login', json={'email': 'khalilmabuzaid@gmail.com', 'password': 'admin123'})
data = res_correct_pw.json()
print(f"Status: {res_correct_pw.status_code}, User: {data.get('name')}, is_admin: {data.get('is_admin')}")
assert res_correct_pw.status_code == 200, f'Expected 200, got {res_correct_pw.status_code}'
assert data.get('is_admin') is True, 'Expected is_admin=True'
admin_user_id = data.get('id')
print('✅ نجح الاختبار: تم تسجيل دخول المشرف بكلمة المرور الصحيحة واسترجاع صلاحيات الـ Admin.')

print('\n==================================================')
print('4. اختبار تغيير كلمة المرور للمشرف')
print('==================================================')
res_change_pw = requests.post(f'{base_url}/api/user/change-password', json={
    'user_id': admin_user_id,
    'current_password': 'admin123',
    'new_password': 'NewAdminSecurePassword2026!'
})
print(f'Change Status: {res_change_pw.status_code}, Response: {res_change_pw.json()}')
assert res_change_pw.status_code == 200, 'Password change failed'

# التحقق بكلمة المرور القديمة (يجب أن تفشل الآن)
res_old = requests.post(f'{base_url}/api/login', json={'email': 'khalilmabuzaid@gmail.com', 'password': 'admin123'})
assert res_old.status_code == 401, 'Old password should now fail'

# التحقق بكلمة المرور الجديدة (يجب أن تنجح)
res_new = requests.post(f'{base_url}/api/login', json={'email': 'khalilmabuzaid@gmail.com', 'password': 'NewAdminSecurePassword2026!'})
assert res_new.status_code == 200, 'New password failed to log in'
print('✅ نجح الاختبار: تم تحديث كلمة المرور وتأكيد الحماية بكلمة المرور الجديدة.')

# إعادة كلمة المرور لـ admin123 للتسهيل على المشرف
requests.post(f'{base_url}/api/user/change-password', json={
    'user_id': admin_user_id,
    'current_password': 'NewAdminSecurePassword2026!',
    'new_password': 'admin123'
})
print('✅ تمت إعادة ضبط كلمة مرور المشرف الافتراضية إلى admin123')

print('\n==================================================')
print('5. اختبار إنشاء حساب مستخدم عادي محمي بكلمة مرور')
print('==================================================')
test_email = 'student_hero_secure@test.com'
res_reg = requests.post(f'{base_url}/api/users/register', json={
    'name': 'بطل التحدي',
    'email': test_email,
    'password': 'HeroPassword2026',
    'avatar_id': '🦅'
})

# تجربة تسجيل دخول المستخدم العادي بكلمة مرور صحيحة
res_user_login = requests.post(f'{base_url}/api/login', json={
    'email': test_email,
    'password': 'HeroPassword2026'
})
assert res_user_login.status_code == 200, f'User login failed: {res_user_login.text}'

# تجربة تسجيل دخول المستخدم العادي بكلمة مرور خاطئة
res_user_wrong = requests.post(f'{base_url}/api/login', json={
    'email': test_email,
    'password': 'BadPassword'
})
assert res_user_wrong.status_code == 401, f'Expected 401 for wrong user password, got {res_user_wrong.status_code}'
print('✅ نجح الاختبار: المستخدم العادي محمي وموثق بكلمة المرور المشفرة.')

print('\n🎉 كافة اختبارات الأمان والتحقق من كلمة المرور للمشرفين والمستخدمين اجتازت بنجاح 100%! 🎉')
