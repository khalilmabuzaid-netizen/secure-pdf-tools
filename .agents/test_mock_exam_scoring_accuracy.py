import sys
import os
import json
import urllib.request

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

sys.path.insert(0, os.path.abspath("."))
import models

def test_scoring_accuracy():
    print("=== TESTING MOCK EXAM SCORING ACCURACY ===")
    db = models.SessionLocal()
    user = db.query(models.User).first()
    user_id = user.id if user else 18
    
    # 1. Start a 10-question mock exam
    start_url = f"http://127.0.0.1:8000/api/mock-exam/start?exam_type=qudurat&count=10&user_id={user_id}"
    req = urllib.request.urlopen(start_url)
    assert req.getcode() == 200
    exam_data = json.loads(req.read().decode('utf-8'))
    questions = exam_data["questions"]
    print(f"✓ Fetched {len(questions)} questions from exam start.")
    
    # 2. Build answers: 6 CORRECT, 3 WRONG, 1 UNANSWERED
    answers_history = []
    expected_correct = 0
    expected_mistakes = 0
    
    for i, q in enumerate(questions):
        qid = q["id"]
        # Fetch true correct answer from DB to be 100% sure
        db_q = db.query(models.Question).filter(models.Question.id == qid).first()
        db_correct = db_q.correct_answer
        
        if i < 6:
            # CORRECT ANSWER (use exact DB correct answer)
            user_choice = db_correct
            expected_correct += 1
            status_label = "CORRECT"
        elif i < 9:
            # DELIBERATELY WRONG ANSWER
            opts = [o for o in (db_q.options or []) if str(o).strip() != str(db_correct).strip()]
            user_choice = opts[0] if opts else "إجابة خاطئة تماماً"
            expected_mistakes += 1
            status_label = "WRONG"
        else:
            # UNANSWERED
            user_choice = None
            expected_mistakes += 1
            status_label = "EMPTY"
            
        answers_history.append({
            "q_id": qid,
            "selected_option": user_choice,
            "user_answer": user_choice
        })
        print(f"  Q{i+1} (ID:{qid}) -> {status_label}: chosen='{user_choice}' vs DB='{db_correct}'")
        
    db.close()
    
    total_q = len(questions)
    expected_pct = round((expected_correct / total_q) * 100, 1)
    
    # 3. Submit to backend
    submit_payload = {
        "user_id": user_id,
        "exam_type": "qudurat",
        "exam_title": "اختبار تجريبي اختباري",
        "total_questions": total_q,
        "total_time_spent": 320.0,
        "time_limit_seconds": 600,
        "answers_history": answers_history
    }
    
    sub_req = urllib.request.Request(
        "http://127.0.0.1:8000/api/mock-exam/submit",
        data=json.dumps(submit_payload).encode('utf-8'),
        headers={"Content-Type": "application/json"}
    )
    sub_resp = urllib.request.urlopen(sub_req)
    assert sub_resp.getcode() == 200
    res = json.loads(sub_resp.read().decode('utf-8'))
    
    print("\n=== VERIFYING BACKEND RESPONSE ===")
    print(f"Backend correct_count: {res['correct_count']} (Expected: {expected_correct})")
    print(f"Backend score_percentage: {res['score_percentage']}% (Expected: {expected_pct}%)")
    print(f"Backend mistakes_count: {res['mistakes_count']} (Expected: {expected_mistakes})")
    
    assert res["correct_count"] == expected_correct, f"Expected {expected_correct} correct, got {res['correct_count']}"
    assert res["score_percentage"] == expected_pct, f"Expected {expected_pct}%, got {res['score_percentage']}%"
    assert res["mistakes_count"] == expected_mistakes, f"Expected {expected_mistakes} mistakes, got {res['mistakes_count']}"
    
    # 4. Check error analysis structure
    err_analysis = res.get("mistakes_analysis", {})
    assert err_analysis.get("total_mistakes") == expected_mistakes
    assert len(err_analysis.get("mistakes", [])) == expected_mistakes
    print(f"✓ Error analysis correctly contains {len(err_analysis.get('mistakes', []))} mistake items with explanations!")
    
    # 5. Verify answers_history flags in response
    resp_history = res.get("answers_history", [])
    correct_in_hist = sum(1 for h in resp_history if h.get("is_correct") is True)
    assert correct_in_hist == expected_correct
    print(f"✓ Response history has exactly {correct_in_hist} is_correct=True items.")

    print("\n🎉 ALL SCORING ACCURACY ASSERTIONS PASSED WITH FLYING COLORS!")

def test_edge_cases():
    print("\n=== TESTING EDGE CASES: ALL WRONG, ALL CORRECT, DIGIT NORMALIZATION ===")
    db = models.SessionLocal()
    q1 = db.query(models.Question).filter(models.Question.id == 1).first() # '24', ['24', '12', '10', '2']
    q2 = db.query(models.Question).filter(models.Question.id == 2).first() # 'القيمتان متساويتان'
    db.close()

    # 1. Arabic digits normalization: "٢٤" matching "24"
    payload_arabic = {
        "user_id": 999,
        "total_questions": 2,
        "total_time_spent": 40.0,
        "answers_history": [
            {"q_id": 1, "selected_option": "٢٤"}, # Should be CORRECT (converted to 24)
            {"q_id": 2, "selected_option": "إجابة خاطئة"} # WRONG
        ]
    }
    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/mock-exam/submit",
        data=json.dumps(payload_arabic).encode('utf-8'),
        headers={"Content-Type": "application/json"}
    )
    res = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))
    assert res["correct_count"] == 1, f"Expected 1, got {res['correct_count']}"
    assert res["score_percentage"] == 50.0
    print("✓ Arabic digits '٢٤' successfully matched '24' (1/2 = 50.0%)")

    # 2. All wrong (0%)
    payload_wrong = {
        "user_id": 999,
        "total_questions": 2,
        "total_time_spent": 30.0,
        "answers_history": [
            {"q_id": 1, "selected_option": "10"}, # WRONG
            {"q_id": 2, "selected_option": "القيمة الأولى أكبر"} # WRONG
        ]
    }
    req2 = urllib.request.Request(
        "http://127.0.0.1:8000/api/mock-exam/submit",
        data=json.dumps(payload_wrong).encode('utf-8'),
        headers={"Content-Type": "application/json"}
    )
    res2 = json.loads(urllib.request.urlopen(req2).read().decode('utf-8'))
    assert res2["correct_count"] == 0
    assert res2["score_percentage"] == 0.0
    assert res2["mistakes_count"] == 2
    print("✓ All wrong test passed (0/2 = 0.0%, 2 mistakes)")

    # 3. All correct (100%)
    payload_correct = {
        "user_id": 999,
        "total_questions": 2,
        "total_time_spent": 30.0,
        "answers_history": [
            {"q_id": 1, "selected_option": "24"}, # CORRECT
            {"q_id": 2, "selected_option": "القيمتان متساويتان"} # CORRECT
        ]
    }
    req3 = urllib.request.Request(
        "http://127.0.0.1:8000/api/mock-exam/submit",
        data=json.dumps(payload_correct).encode('utf-8'),
        headers={"Content-Type": "application/json"}
    )
    res3 = json.loads(urllib.request.urlopen(req3).read().decode('utf-8'))
    assert res3["correct_count"] == 2
    assert res3["score_percentage"] == 100.0
    assert res3["mistakes_count"] == 0
    print("✓ All correct test passed (2/2 = 100.0%, 0 mistakes)")

if __name__ == "__main__":
    test_scoring_accuracy()
    test_edge_cases()

