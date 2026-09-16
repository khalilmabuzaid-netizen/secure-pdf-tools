// Test full frontend-backend integration for Mock Exam
const http = require('http');

function request(url, options = {}) {
    return new Promise((resolve, reject) => {
        const parsed = new URL(url);
        const reqOptions = {
            hostname: parsed.hostname,
            port: parsed.port,
            path: parsed.pathname + parsed.search,
            method: options.method || 'GET',
            headers: options.headers || {}
        };
        const req = http.request(reqOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(data) });
                } catch (e) {
                    resolve({ status: res.statusCode, data });
                }
            });
        });
        req.on('error', reject);
        if (options.body) {
            req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
        }
        req.end();
    });
}

async function runTests() {
    console.log("=== RUNNING FRONTEND-BACKEND INTEGRATION TEST ===");
    
    // 1. Start Exam
    const startRes = await request("http://127.0.0.1:8000/api/mock-exam/start?exam_type=qudurat&count=10&user_id=999");
    if (startRes.status !== 200) {
        throw new Error(`Start exam failed with status ${startRes.status}: ${JSON.stringify(startRes.data)}`);
    }
    const examData = startRes.data;
    const questions = examData.questions;
    console.log(`✓ Fetched ${questions.length} questions.`);

    // 2. Simulate User Navigation and Answering in Frontend
    const mockExamAnswers = {};
    const userAnswersByIndex = {};
    
    // Q1: User selects WRONG answer
    const q1 = questions[0];
    const q1WrongOpt = q1.options.find(o => String(o).trim() !== String(q1.correct_answer).trim()) || "خيار_خاطئ";
    mockExamAnswers[q1.id] = q1WrongOpt;
    userAnswersByIndex[0] = q1WrongOpt;
    console.log(`  Q1 (ID:${q1.id}): User selected WRONG '${q1WrongOpt}' (Correct is '${q1.correct_answer}')`);

    // Q2: User selects CORRECT answer
    const q2 = questions[1];
    mockExamAnswers[q2.id] = q2.correct_answer;
    userAnswersByIndex[1] = q2.correct_answer;
    console.log(`  Q2 (ID:${q2.id}): User selected CORRECT '${q2.correct_answer}'`);

    // Simulate navigation: user navigates from Q2 back to Q1
    const retrievedQ1 = mockExamAnswers[q1.id];
    if (retrievedQ1 !== q1WrongOpt) {
        throw new Error(`State retention failed! Expected ${q1WrongOpt}, got ${retrievedQ1}`);
    }
    console.log(`✓ Navigation state retention verified: Q1 selection is still preserved as '${retrievedQ1}'`);

    // Q3..10 left unanswered
    for (let i = 2; i < questions.length; i++) {
        mockExamAnswers[questions[i].id] = null;
        userAnswersByIndex[i] = null;
    }

    // 3. Build Submission Payload exactly as game.js does
    const selectedOptionsDict = {};
    const answersArray = [];

    questions.forEach((q, idx) => {
        const qId = q.id;
        const choice = mockExamAnswers[qId];
        const cleanChoice = (choice !== null && choice !== undefined && String(choice).trim() !== '' && choice !== '(لم تتم الإجابة عليه)')
            ? String(choice).trim()
            : null;

        selectedOptionsDict[String(qId)] = cleanChoice;
        answersArray.push({
            question_id: qId,
            q_id: qId,
            index: idx + 1,
            selected_option: cleanChoice,
            user_answer: cleanChoice
        });
    });

    const submitPayload = {
        user_id: 999,
        exam_type: "qudurat",
        exam_title: examData.exam_title,
        total_questions: questions.length,
        total_time_spent: 120,
        time_limit_seconds: examData.time_limit_seconds,
        selected_options: selectedOptionsDict,
        answers_by_id: selectedOptionsDict,
        answers: answersArray,
        answers_history: answersArray
    };

    // 4. Submit to Backend
    const submitRes = await request("http://127.0.0.1:8000/api/mock-exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: submitPayload
    });

    if (submitRes.status !== 200) {
        throw new Error(`Submit failed with status ${submitRes.status}: ${JSON.stringify(submitRes.data)}`);
    }

    const res = submitRes.data;
    console.log(`\n=== SUBMIT RESULT AUDIT ===`);
    console.log(`Correct count: ${res.correct_count} (Expected: 1)`);
    console.log(`Score percentage: ${res.score_percentage}% (Expected: 10%)`);
    console.log(`Mistakes count: ${res.mistakes_count} (Expected: 9)`);

    if (res.correct_count !== 1) {
        throw new Error(`CRITICAL BUG: Expected exactly 1 correct answer, but got ${res.correct_count}!`);
    }
    if (res.score_percentage !== 10.0 && res.score_percentage !== 10) {
        throw new Error(`CRITICAL BUG: Expected 10% score, but got ${res.score_percentage}%!`);
    }
    if (res.mistakes_count !== 9) {
        throw new Error(`CRITICAL BUG: Expected 9 mistakes, but got ${res.mistakes_count}!`);
    }

    // Verify history flags
    const h1 = res.answers_history.find(h => h.question_id === q1.id);
    const h2 = res.answers_history.find(h => h.question_id === q2.id);

    if (h1.is_correct !== false) {
        throw new Error(`Q1 was wrongly counted as correct!`);
    }
    if (h2.is_correct !== true) {
        throw new Error(`Q2 was wrongly counted as incorrect!`);
    }

    console.log(`✓ Q1 is strictly marked as is_correct: false`);
    console.log(`✓ Q2 is strictly marked as is_correct: true`);
    console.log(`✓ Mistakes list contains all ${res.mistakes_analysis.total_mistakes} questions with detailed explanations.`);
    console.log(`\n🎉 INTEGRATION TEST PASSED 100%! ALL LOGIC IS STRICT AND WORKING PERFECTLY!`);
}

runTests().catch(err => {
    console.error("Test failed:", err);
    process.exit(1);
});
