import sys
import os
sys.path.insert(0, os.path.abspath("."))
import main
import models

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

db = models.SessionLocal()
try:
    print("1. Testing start_mock_exam_api (Qudurat):")
    res1 = main.start_mock_exam_api(exam_type="qudurat", count=30, db=db)
    print(f"   Success! Qs: {res1['total_questions']}, Breakdown: {res1['sections_breakdown']}")

    print("2. Testing start_mock_exam_api (Tahsili):")
    res2 = main.start_mock_exam_api(exam_type="tahsili", count=20, db=db)
    print(f"   Success! Qs: {res2['total_questions']}, Breakdown: {res2['sections_breakdown']}")

    print("3. Testing start_mock_exam_api (All):")
    res3 = main.start_mock_exam_api(exam_type="all", count=50, db=db)
    print(f"   Success! Qs: {res3['total_questions']}, Breakdown: {res3['sections_breakdown']}")

    print("4. Testing submit_mock_exam_api:")
    sub = main.submit_mock_exam_api(
        main.MockExamSubmitRequest(
            user_id=1,
            exam_type="qudurat",
            total_questions=30,
            correct_count=28,
            total_time_spent=1100.0,
            quant_correct=14,
            quant_total=15,
            verbal_correct=14,
            verbal_total=15
        ),
        db=db
    )
    print(f"   Success! Score: {sub['score_percentage']}%, Rating: {sub['performance_rating']}, XP: {sub['xp_earned']}")

    print("5. Testing get_mock_exam_history_api:")
    hist = main.get_mock_exam_history_api(user_id=1, db=db)
    print(f"   Success! Total exams: {hist['total_exams']}, Best score: {hist['best_score']}%")
finally:
    db.close()
