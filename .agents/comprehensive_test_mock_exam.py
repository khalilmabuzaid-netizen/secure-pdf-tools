import sys
import os
import json
import urllib.request
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

sys.path.insert(0, os.path.abspath("."))
import models

def test_api():
    print("=== 1. TESTING API ENDPOINTS VIA HTTP ===")
    
    db = models.SessionLocal()
    target_user = db.query(models.User).first()
    target_user_id = target_user.id if target_user else 18
    db.close()
    print(f"✓ Using target user ID: {target_user_id}")

    # Start Qudurat
    url = f"http://127.0.0.1:8000/api/mock-exam/start?exam_type=qudurat&count=30&user_id={target_user_id}"
    req = urllib.request.urlopen(url)
    assert req.getcode() == 200, f"Error: {req.getcode()}"
    data = json.loads(req.read().decode('utf-8'))
    print("✓ GET /api/mock-exam/start (Qudurat 30):", data["total_questions"], "questions. Breakdown:", data["sections_breakdown"])
    assert data["total_questions"] == 30
    assert len(data["questions"]) == 30
    assert data["time_limit_seconds"] == 1800

    # Start Tahsili
    url_tahsili = f"http://127.0.0.1:8000/api/mock-exam/start?exam_type=tahsili&count=20&user_id={target_user_id}"
    req_t = urllib.request.urlopen(url_tahsili)
    data_t = json.loads(req_t.read().decode('utf-8'))
    print("✓ GET /api/mock-exam/start (Tahsili 20):", data_t["total_questions"], "questions. Breakdown:", data_t["sections_breakdown"])
    assert data_t["total_questions"] == 20

    # Start All
    url_all = f"http://127.0.0.1:8000/api/mock-exam/start?exam_type=all&count=50&user_id={target_user_id}"
    req_a = urllib.request.urlopen(url_all)
    data_a = json.loads(req_a.read().decode('utf-8'))
    print("✓ GET /api/mock-exam/start (All 50):", data_a["total_questions"], "questions. Breakdown:", data_a["sections_breakdown"])
    assert data_a["total_questions"] == 50

    # Submit Results using verified answers (27 correct, 3 wrong -> 90%)
    real_answers = []
    for i, q in enumerate(data["questions"]):
        if i < 27:
            real_answers.append({"q_id": q["id"], "selected_option": q["correct_answer"], "user_answer": q["correct_answer"]})
        else:
            real_answers.append({"q_id": q["id"], "selected_option": "خيار خاطئ", "user_answer": "خيار خاطئ"})

    submit_payload = {
        "user_id": target_user_id,
        "exam_type": "qudurat",
        "exam_title": "اختبار محاكي قياس الشامل 🎓",
        "total_questions": 30,
        "total_time_spent": 1050.5,
        "time_limit_seconds": 1800,
        "answers_history": real_answers
    }
    submit_req = urllib.request.Request(
        "http://127.0.0.1:8000/api/mock-exam/submit",
        data=json.dumps(submit_payload).encode('utf-8'),
        headers={"Content-Type": "application/json"}
    )
    submit_resp = urllib.request.urlopen(submit_req)
    assert submit_resp.getcode() == 200
    res_data = json.loads(submit_resp.read().decode('utf-8'))
    print("✓ POST /api/mock-exam/submit: Score:", res_data["score_percentage"], "% Rating:", res_data["performance_rating"], "XP Gained:", res_data["xp_earned"])
    assert res_data["score_percentage"] == 90.0

    # History
    hist_url = f"http://127.0.0.1:8000/api/mock-exam/history/{target_user_id}"
    hist_req = urllib.request.urlopen(hist_url)
    assert hist_req.getcode() == 200
    hist_data = json.loads(hist_req.read().decode('utf-8'))
    print("✓ GET /api/mock-exam/history:", hist_data["total_exams"], "exams. Best Score:", hist_data["best_score"], "%")
    assert hist_data["total_exams"] >= 1

def test_database():
    print("\n=== 2. TESTING DATABASE SCHEMA & MODELS ===")
    db = models.SessionLocal()
    try:
        user = db.query(models.User).first()
        target_user_id = user.id if user else 18
        print("✓ User total XP:", user.total_xp, "Title:", user.hero_title)
        print("✓ Total questions answered in analytics:", user.total_questions_answered)
        
        mock_records = db.query(models.UserMockExam).filter(models.UserMockExam.user_id == target_user_id).all()
        print(f"✓ UserMockExam records count: {len(mock_records)}")
        for r in mock_records:
            print(f"   Record ID={r.id}, Type={r.exam_type}, Score={r.score_percentage}%, Rating={r.performance_rating}")

        # Check badges
        achievements = db.query(models.UserAchievement).filter(models.UserAchievement.user_id == target_user_id).all()
        badge_ids = [a.badge_id for a in achievements]
        print(f"✓ Unlocked badges: {badge_ids}")
        assert "mock_exam_hero" in badge_ids, "mock_exam_hero badge should be unlocked!"
        print("✓ mock_exam_hero badge verified!")
    finally:
        db.close()

def test_frontend_integrity():
    print("\n=== 3. TESTING FRONTEND INTEGRITY ===")
    with open('static/index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    required_ids = [
        'mockExamHudBtn', 'mockExamBanner', 'mockExamModal',
        'mockExamArenaView', 'meSectionBadge', 'meArenaExamTitle',
        'meTimerWrap', 'meTimerClock', 'meFlagBtn', 'meQuestionCounterText',
        'meAnsweredSummaryText', 'meProgressBarFill', 'meQuestionContent',
        'meOptionsGrid', 'mePrevBtn', 'meNextBtn', 'mePaletteDrawer',
        'mePaletteGrid', 'mockExamResultView', 'meScorePercentText',
        'meScoreCircleVal', 'mePerformanceRatingBadge', 'meRatingDescriptionText',
        'meStatCorrectVal', 'meStatTotalTimeVal', 'meStatAvgSpeedVal',
        'meStatXpVal', 'meSecRowQuant', 'meSecRowVerbal', 'meSecRowTahsili'
    ]

    for elem_id in required_ids:
        assert f'id="{elem_id}"' in html or f"id='{elem_id}'" in html, f"Missing element ID in HTML: {elem_id}"
    print(f"✓ All {len(required_ids)} required HTML element IDs verified in index.html!")

    with open('static/css/style.css', 'r', encoding='utf-8') as f:
        css = f.read()

    required_classes = [
        '.mock-exam-banner', '.mock-exam-setup-dialog', '.me-track-card',
        '.me-count-btn', '.mock-exam-arena-container', '.me-timer-wrap',
        '.me-option-btn', '.me-palette-drawer', '.mock-exam-result-card',
        '.me-score-circle-widget'
    ]

    for cls in required_classes:
        assert cls in css, f"Missing CSS class: {cls}"
    print(f"✓ All {len(required_classes)} required CSS classes verified in style.css!")

    with open('static/js/game.js', 'r', encoding='utf-8') as f:
        js = f.read()

    required_js_methods = [
        'openMockExamModal', 'selectMockExamTrack', 'selectMockExamCount',
        'launchMockExam', 'startMockExam', 'startMockExamCountdown',
        'renderMockExamQuestion', 'selectMockExamOption', 'toggleMockExamFlag',
        'prevMockExamQuestion', 'nextMockExamQuestion', 'goToMockExamQuestion',
        'toggleQuestionPalette', 'renderMockExamPalette', 'confirmSubmitMockExam',
        'submitMockExamResults', 'renderMockExamResultScreen',
        'openMockExamReview', 'retryMockExamMistakes'
    ]

    for meth in required_js_methods:
        assert meth in js, f"Missing JS method in game.js: {meth}"
    print(f"✓ All {len(required_js_methods)} required JS methods verified in game.js!")

if __name__ == "__main__":
    test_api()
    test_database()
    test_frontend_integrity()
    print("\n🎉 ALL TESTS PASSED SUCCESSFULLY! EVERYTHING IS 100% READY!")
