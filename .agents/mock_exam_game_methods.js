    // =========================================================================
    // قسم إدارة الاختبار التجريبي الشامل والمحاكي لقياس (Mock Exam & Qiyas Simulator)
    // =========================================================================

    openMockExamModal() {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        if (!this.selectedMockExamTrack) this.selectedMockExamTrack = 'qudurat';
        if (!this.selectedMockExamCount) this.selectedMockExamCount = 30;
        
        const modal = document.getElementById('mockExamModal');
        if (modal) {
            modal.classList.add('open');
        }
    }

    selectMockExamTrack(track, cardElement) {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        this.selectedMockExamTrack = track || 'qudurat';
        document.querySelectorAll('.me-track-card').forEach(c => c.classList.remove('active'));
        if (cardElement) {
            cardElement.classList.add('active');
        }
    }

    selectMockExamCount(count, btnElement) {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        this.selectedMockExamCount = parseInt(count) || 30;
        document.querySelectorAll('.me-count-btn').forEach(b => b.classList.remove('active'));
        if (btnElement) {
            btnElement.classList.add('active');
        }
    }

    launchMockExam() {
        this.closeModal('mockExamModal');
        const track = this.selectedMockExamTrack || 'qudurat';
        const count = this.selectedMockExamCount || 30;
        this.startMockExam(track, count);
    }

    async startMockExam(track = 'qudurat', count = 30) {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }

        if (!this.currentUser) {
            this.loginAsGuest();
        }

        // إعداد حالة الاختبار التجريبي
        this.mockExamState = {
            isActive: true,
            track: track,
            targetCount: count,
            questions: [],
            currentIdx: 0,
            userAnswers: [],
            flagged: [],
            startTime: Date.now(),
            timeLimitSeconds: count * 60,
            timeLeftSeconds: count * 60,
            paletteOpen: false,
            examTitle: track === 'qudurat' ? 'اختبار محاكي قياس (قدرات عامة) 🎓' : (track === 'tahsili' ? 'اختبار محاكي قياس (تحصيلي علمي) 🧪' : 'المحاكي الكوني الشامل 🌌')
        };

        try {
            const userId = this.currentUser ? this.currentUser.id : 999;
            let res = await fetch(`/api/mock-exam/start?exam_type=${track}&count=${count}&user_id=${userId}`);
            if (!res.ok) {
                res = await fetch(`http://localhost:8000/api/mock-exam/start?exam_type=${track}&count=${count}&user_id=${userId}`);
            }
            if (res.ok) {
                const data = await res.json();
                this.mockExamState.questions = data.questions || [];
                this.mockExamState.examTitle = data.exam_title || this.mockExamState.examTitle;
                this.mockExamState.timeLimitSeconds = data.time_limit_seconds || (count * 60);
                this.mockExamState.timeLeftSeconds = this.mockExamState.timeLimitSeconds;
                this.mockExamState.sectionsBreakdown = data.sections_breakdown || {};
            } else {
                this.mockExamState.questions = this.generateFallbackMockExamQuestions(track, count);
            }
        } catch (e) {
            console.warn('تعذر جلب أسئلة الاختبار التجريبي من السيرفر، جاري استخدام العينة الاحتياطية:', e);
            this.mockExamState.questions = this.generateFallbackMockExamQuestions(track, count);
        }

        if (!this.mockExamState.questions || this.mockExamState.questions.length === 0) {
            this.mockExamState.questions = this.generateFallbackMockExamQuestions(track, count);
        }

        const qLen = this.mockExamState.questions.length;
        this.mockExamState.userAnswers = new Array(qLen).fill(null);
        this.mockExamState.flagged = new Array(qLen).fill(false);
        this.mockExamState.currentIdx = 0;
        this.mockExamState.startTime = Date.now();

        // تحديث عناصر الواجهة
        const titleEl = document.getElementById('meArenaExamTitle');
        if (titleEl) titleEl.textContent = this.mockExamState.examTitle;

        // إغلاق أي درج قديم
        const drawer = document.getElementById('mePaletteDrawer');
        if (drawer) drawer.style.display = 'none';
        this.mockExamState.paletteOpen = false;

        this.showView('mockExamArenaView');
        this.startMockExamCountdown();
        this.renderMockExamQuestion();
        this.renderMockExamPalette();
    }

    startMockExamCountdown() {
        if (this.mockExamTimer) {
            clearInterval(this.mockExamTimer);
        }

        const updateClock = () => {
            const wrap = document.getElementById('meTimerWrap');
            const clock = document.getElementById('meTimerClock');
            if (!this.mockExamState || !this.mockExamState.isActive) {
                clearInterval(this.mockExamTimer);
                return;
            }

            const remaining = this.mockExamState.timeLeftSeconds;
            if (remaining <= 0) {
                clearInterval(this.mockExamTimer);
                if (clock) clock.textContent = '00:00';
                if (window.gameAudio && typeof window.gameAudio.playWrong === 'function') {
                    window.gameAudio.playWrong();
                }
                alert('⏳ انتهى الوقت المخصص للاختبار التجريبي! جاري تسليم إجاباتك وعرض تقرير النتيجة...');
                this.submitMockExamResults(true);
                return;
            }

            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            const timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
            if (clock) clock.textContent = timeStr;

            if (wrap) {
                wrap.classList.remove('warning', 'danger');
                if (remaining <= 120) {
                    wrap.classList.add('danger');
                    if (window.gameAudio && typeof window.gameAudio.playTick === 'function' && remaining <= 10) {
                        window.gameAudio.playTick();
                    }
                } else if (remaining <= 300) {
                    wrap.classList.add('warning');
                }
            }

            this.mockExamState.timeLeftSeconds--;
        };

        updateClock();
        this.mockExamTimer = setInterval(updateClock, 1000);
    }

    renderMockExamQuestion() {
        if (!this.mockExamState || !this.mockExamState.questions || this.mockExamState.questions.length === 0) return;
        
        const idx = this.mockExamState.currentIdx;
        const total = this.mockExamState.questions.length;
        const q = this.mockExamState.questions[idx];

        // تحديث الرأس والوسوم
        const secBadge = document.getElementById('meSectionBadge');
        if (secBadge) secBadge.textContent = q.section_label || q.subject || 'القسم العام ⚡';

        const qCounter = document.getElementById('meQuestionCounterText');
        if (qCounter) qCounter.textContent = `السؤال ${idx + 1} من ${total}`;

        const answeredCount = this.mockExamState.userAnswers.filter(a => a !== null).length;
        const ansSummary = document.getElementById('meAnsweredSummaryText');
        if (ansSummary) ansSummary.textContent = `تم حل: ${answeredCount} / ${total}`;

        const progressFill = document.getElementById('meProgressBarFill');
        if (progressFill) {
            const pct = Math.round(((idx + 1) / total) * 100);
            progressFill.style.width = `${pct}%`;
        }

        const qNumPill = document.getElementById('meQNumberPill');
        if (qNumPill) qNumPill.textContent = `سؤال ${idx + 1}`;

        const qSubjPill = document.getElementById('meQSubjectPill');
        if (qSubjPill) qSubjPill.textContent = q.subject || 'قدرات عامة';

        const qContent = document.getElementById('meQuestionContent');
        if (qContent) qContent.textContent = q.content || q.question_text || 'نص السؤال...';

        // خيارات الإجابة
        const optGrid = document.getElementById('meOptionsGrid');
        if (optGrid) {
            optGrid.innerHTML = '';
            const letters = ['A', 'B', 'C', 'D'];
            const arabicLetters = ['أ', 'ب', 'ج', 'د'];
            const chosen = this.mockExamState.userAnswers[idx];

            let optionsList = q.options;
            if (typeof optionsList === 'string') {
                try { optionsList = JSON.parse(optionsList); } catch (e) { optionsList = [optionsList]; }
            }
            if (!Array.isArray(optionsList)) optionsList = [];

            optionsList.forEach((optText, optIdx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `me-option-btn ${chosen === optText ? 'selected' : ''}`;
                btn.onclick = () => this.selectMockExamOption(optText, optIdx);

                const optLet = arabicLetters[optIdx] || letters[optIdx] || (optIdx + 1);
                btn.innerHTML = `
                    <span class="me-opt-letter">${optLet}</span>
                    <span class="me-opt-text">${optText}</span>
                `;
                optGrid.appendChild(btn);
            });
        }

        // حالة زر التحديد للمراجعة
        const flagBtn = document.getElementById('meFlagBtn');
        const flagIcon = document.getElementById('meFlagIcon');
        const flagText = document.getElementById('meFlagText');
        const isFlagged = this.mockExamState.flagged[idx];
        if (flagBtn) {
            flagBtn.classList.toggle('flagged', !!isFlagged);
            if (flagText) flagText.textContent = isFlagged ? 'محدد للمراجعة 🚩' : 'تحديد للمراجعة';
        }

        // أزرار التنقل
        const prevBtn = document.getElementById('mePrevBtn');
        if (prevBtn) prevBtn.disabled = (idx === 0);

        const nextBtn = document.getElementById('meNextBtn');
        if (nextBtn) {
            if (idx === total - 1) {
                nextBtn.innerHTML = 'مراجعة الأسئلة 📑';
            } else {
                nextBtn.innerHTML = 'السؤال التالي ⏭️';
            }
        }

        // تحديث مصغرات الشبكة
        this.renderMockExamPalette();
    }

    selectMockExamOption(chosenText, optIdx) {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        if (!this.mockExamState || !this.mockExamState.isActive) return;

        const idx = this.mockExamState.currentIdx;
        this.mockExamState.userAnswers[idx] = chosenText;

        // تحديث أزرار الخيارات الحالية
        const buttons = document.querySelectorAll('.me-option-btn');
        buttons.forEach((b, i) => {
            b.classList.toggle('selected', i === optIdx);
        });

        // تحديث عدادات الإجابات والشبكة
        const total = this.mockExamState.questions.length;
        const answeredCount = this.mockExamState.userAnswers.filter(a => a !== null).length;
        const ansSummary = document.getElementById('meAnsweredSummaryText');
        if (ansSummary) ansSummary.textContent = `تم حل: ${answeredCount} / ${total}`;

        this.renderMockExamPalette();
    }

    toggleMockExamFlag() {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        if (!this.mockExamState || !this.mockExamState.isActive) return;

        const idx = this.mockExamState.currentIdx;
        this.mockExamState.flagged[idx] = !this.mockExamState.flagged[idx];

        const flagBtn = document.getElementById('meFlagBtn');
        const flagText = document.getElementById('meFlagText');
        const isFlagged = this.mockExamState.flagged[idx];
        if (flagBtn) {
            flagBtn.classList.toggle('flagged', isFlagged);
            if (flagText) flagText.textContent = isFlagged ? 'محدد للمراجعة 🚩' : 'تحديد للمراجعة';
        }

        this.renderMockExamPalette();
    }

    prevMockExamQuestion() {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        if (!this.mockExamState || !this.mockExamState.isActive) return;
        if (this.mockExamState.currentIdx > 0) {
            this.mockExamState.currentIdx--;
            this.renderMockExamQuestion();
        }
    }

    nextMockExamQuestion() {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        if (!this.mockExamState || !this.mockExamState.isActive) return;
        if (this.mockExamState.currentIdx < this.mockExamState.questions.length - 1) {
            this.mockExamState.currentIdx++;
            this.renderMockExamQuestion();
        } else {
            this.toggleQuestionPalette(true);
        }
    }

    goToMockExamQuestion(targetIdx) {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        if (!this.mockExamState || !this.mockExamState.isActive) return;
        if (targetIdx >= 0 && targetIdx < this.mockExamState.questions.length) {
            this.mockExamState.currentIdx = targetIdx;
            this.renderMockExamQuestion();
        }
    }

    toggleQuestionPalette(forceOpen = null) {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        const drawer = document.getElementById('mePaletteDrawer');
        if (!drawer) return;

        if (forceOpen !== null) {
            this.mockExamState.paletteOpen = forceOpen;
        } else {
            this.mockExamState.paletteOpen = !this.mockExamState.paletteOpen;
        }

        drawer.style.display = this.mockExamState.paletteOpen ? 'flex' : 'none';
        if (this.mockExamState.paletteOpen) {
            this.renderMockExamPalette();
        }
    }

    renderMockExamPalette() {
        if (!this.mockExamState || !this.mockExamState.questions) return;
        const grid = document.getElementById('mePaletteGrid');
        const countAnsweredEl = document.getElementById('mePaletteAnsweredCount');
        const countTotalEl = document.getElementById('mePaletteTotalCount');

        const total = this.mockExamState.questions.length;
        const answeredCount = this.mockExamState.userAnswers.filter(a => a !== null).length;
        if (countAnsweredEl) countAnsweredEl.textContent = answeredCount;
        if (countTotalEl) countTotalEl.textContent = total;

        if (!grid) return;
        grid.innerHTML = '';

        for (let i = 0; i < total; i++) {
            const item = document.createElement('button');
            item.type = 'button';
            const isCurr = (i === this.mockExamState.currentIdx);
            const isAns = (this.mockExamState.userAnswers[i] !== null);
            const isFlag = (this.mockExamState.flagged[i] === true);

            let cls = 'me-pal-item';
            if (isCurr) cls += ' current';
            if (isAns) cls += ' answered';
            if (isFlag) cls += ' flagged';
            if (!isAns && !isCurr) cls += ' unanswered';

            item.className = cls;
            item.textContent = (i + 1);
            item.title = `سؤال ${i + 1} (${isAns ? 'تم الحل' : 'غير محلول'}${isFlag ? ' - مراجع 🚩' : ''})`;
            item.onclick = () => this.goToMockExamQuestion(i);
            grid.appendChild(item);
        }
    }

    confirmSubmitMockExam() {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        if (!this.mockExamState || !this.mockExamState.isActive) return;

        const total = this.mockExamState.questions.length;
        const answered = this.mockExamState.userAnswers.filter(a => a !== null).length;
        const unanswered = total - answered;

        let msg = `هل أنت متأكد من إنهاء وتسليم إجابات الاختبار التجريبي؟\n\n- عدد الأسئلة المحلولة: ${answered} من ${total}`;
        if (unanswered > 0) {
            msg += `\n- تنبيه: هناك ${unanswered} سؤالاً لم تقم بالإجابة عليها بعد!`;
        }

        if (confirm(msg)) {
            this.submitMockExamResults(false);
        }
    }

    async submitMockExamResults(isTimeExpired = false) {
        if (this.mockExamTimer) {
            clearInterval(this.mockExamTimer);
        }
        this.mockExamState.isActive = false;

        const questions = this.mockExamState.questions || [];
        const userAnswers = this.mockExamState.userAnswers || [];
        const totalQ = questions.length;
        const totalElapsedSec = Math.max(1, Math.round((Date.now() - this.mockExamState.startTime) / 1000));

        let correctCount = 0;
        let quantCorrect = 0, quantTotal = 0;
        let verbalCorrect = 0, verbalTotal = 0;
        let tahsiliCorrect = 0, tahsiliTotal = 0;

        const history = [];

        questions.forEach((q, idx) => {
            const userAns = userAnswers[idx];
            const letters = ['A', 'B', 'C', 'D'];
            const selTrim = String(userAns || '').trim();
            const corTrim = String(q.correct_answer || '').trim();

            let optIdx = -1;
            if (Array.isArray(q.options)) {
                optIdx = q.options.indexOf(userAns);
            }
            const letter = optIdx >= 0 ? letters[optIdx] : null;

            const isCorr = (
                userAns !== null && (
                    selTrim === corTrim ||
                    (letter && corTrim.toUpperCase() === letter) ||
                    (letter && corTrim.toUpperCase() === `OPTION_${letter}`.toUpperCase())
                )
            );

            if (isCorr) correctCount++;

            const cat = (q.category || '').toLowerCase();
            const subj = (q.subject || '').toLowerCase();

            if (cat === 'qudurat_quant' || subj.includes('كمي') || subj.includes('جبر') || subj.includes('حساب')) {
                quantTotal++;
                if (isCorr) quantCorrect++;
            } else if (cat === 'qudurat_verbal' || subj.includes('لفظي') || subj.includes('تناظر') || subj.includes('استيعاب')) {
                verbalTotal++;
                if (isCorr) verbalCorrect++;
            } else {
                tahsiliTotal++;
                if (isCorr) tahsiliCorrect++;
            }

            history.push({
                question: q,
                questionIdx: idx + 1,
                questionText: q.content || q.question_text || 'سؤال',
                userAnswer: userAns || '(لم تتم الإجابة عليه)',
                correctAnswer: q.correct_answer,
                isCorrect: isCorr,
                options: q.options,
                explanation: q.explanation || q.static_hint || q.hint || 'استيعاب الفكرة المحورية للسؤال وتطبيق قواعد الحل السريع واستبعاد الخيارات المستبعدة للوصول للإجابة الصحيحة.'
            });
        });

        this.roundHistory = history;
        this.currentLevel = {
            id: 9999,
            title: this.mockExamState.examTitle || 'اختبار محاكي قياس الشامل',
            subject: 'محاكي قياس الشامل 🎓'
        };

        const scorePct = Math.round((correctCount / Math.max(1, totalQ)) * 100);
        const baseReward = 400 + Math.round(scorePct * 3.5);

        const userId = this.currentUser ? this.currentUser.id : 999;
        const payload = {
            user_id: userId,
            exam_type: this.mockExamState.track || 'qudurat',
            exam_title: this.mockExamState.examTitle,
            total_questions: totalQ,
            correct_count: correctCount,
            total_time_spent: totalElapsedSec,
            time_limit_seconds: this.mockExamState.timeLimitSeconds,
            xp_gained: baseReward,
            quant_correct: quantCorrect,
            quant_total: quantTotal,
            verbal_correct: verbalCorrect,
            verbal_total: verbalTotal,
            tahsili_correct: tahsiliCorrect,
            tahsili_total: tahsiliTotal,
            answers_history: history.map(h => ({
                q_id: h.question.id,
                user_answer: h.userAnswer,
                is_correct: h.isCorrect
            }))
        };

        // تشغيل الاحتفال والكونفيتي
        if (window.gameAudio && typeof window.gameAudio.playFanfare === 'function') {
            window.gameAudio.playFanfare();
        }
        if (window.particleEngine) {
            window.particleEngine.spawnConfetti(window.innerWidth * 0.2, window.innerHeight * 0.45, 70);
            window.particleEngine.spawnConfetti(window.innerWidth * 0.5, window.innerHeight * 0.3, 140);
            window.particleEngine.spawnConfetti(window.innerWidth * 0.8, window.innerHeight * 0.45, 70);
        }

        let resData = null;
        try {
            let res = await fetch('/api/mock-exam/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                res = await fetch('http://localhost:8000/api/mock-exam/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }
            if (res.ok) {
                resData = await res.json();
            }
        } catch (e) {
            console.error('Error submitting mock exam results:', e);
        }

        // تحديث نقاط المستخدم والأوسمة
        const xpEarned = resData?.xp_earned || baseReward;
        if (this.currentUser) {
            this.currentUser.total_xp = (this.currentUser.total_xp || 0) + xpEarned;
            if (resData?.total_xp) this.currentUser.total_xp = resData.total_xp;
            if (resData?.hero_title) this.currentUser.hero_title = resData.hero_title;
            localStorage.setItem('qudurat_hero_user', JSON.stringify(this.currentUser));
            this.updateHud();

            if (resData?.newly_unlocked_badges && resData.newly_unlocked_badges.length > 0) {
                resData.newly_unlocked_badges.forEach((b, i) => {
                    setTimeout(() => this.showBadgeToast(b), 900 + i * 2000);
                });
            }
        }

        // تعبئة وعرض شاشة النتيجة النهائية
        this.renderMockExamResultScreen({
            scorePercentage: resData?.score_percentage ?? scorePct,
            correctCount: correctCount,
            totalQuestions: totalQ,
            totalTimeSpent: totalElapsedSec,
            performanceRating: resData?.performance_rating || (scorePct >= 85 ? 'ممتاز (جاهزية متقدمة) 🌟' : (scorePct >= 70 ? 'جيد جداً (مستوى واعد) ⚡' : 'يحتاج ممارسة وتدريب 🎯')),
            ratingDescription: resData?.rating_description || (scorePct >= 85 ? 'أداء رائع يعكس استيعاباً عميقاً لمفاهيم واستراتيجيات قياس.' : 'تدريبك المستمر ومراجعة الأخطاء ستمكنك من تحقيق أعلى الدرجات.'),
            xpEarned: xpEarned,
            quant: { correct: quantCorrect, total: quantTotal },
            verbal: { correct: verbalCorrect, total: verbalTotal },
            tahsili: { correct: tahsiliCorrect, total: tahsiliTotal }
        });

        this.showView('mockExamResultView');
    }

    renderMockExamResultScreen(data) {
        const scorePct = data.scorePercentage || 0;

        // مؤشر النسبة الدائري
        const scoreValText = document.getElementById('meScorePercentText');
        if (scoreValText) scoreValText.textContent = `${scorePct}%`;

        const circleVal = document.getElementById('meScoreCircleVal');
        if (circleVal) {
            const circumference = 2 * Math.PI * 58; // ~364.4
            const offset = circumference - (scorePct / 100) * circumference;
            circleVal.style.strokeDashoffset = offset;
        }

        // شارة التقييم والوصف
        const ratingBadge = document.getElementById('mePerformanceRatingBadge');
        if (ratingBadge) ratingBadge.textContent = data.performanceRating;

        const ratingDesc = document.getElementById('meRatingDescriptionText');
        if (ratingDesc) ratingDesc.textContent = data.ratingDescription;

        const accSummary = document.getElementById('meAccuracySummary');
        if (accSummary) accSummary.textContent = `${data.correctCount} من ${data.totalQuestions} (${scorePct}%)`;

        const xpSummary = document.getElementById('meXpSummary');
        if (xpSummary) xpSummary.textContent = `+${data.xpEarned} XP`;

        // إظهار بطاقة وسام محاكي قياس إن كانت النسبة 70% أو أكثر
        const badgeBox = document.getElementById('meBadgeCelebrationBox');
        if (badgeBox) {
            badgeBox.style.display = (scorePct >= 70) ? 'flex' : 'none';
        }

        // بطاقات الإحصائيات
        const statCorrect = document.getElementById('meStatCorrectVal');
        if (statCorrect) statCorrect.textContent = `${data.correctCount} / ${data.totalQuestions}`;

        const mins = Math.floor(data.totalTimeSpent / 60);
        const secs = data.totalTimeSpent % 60;
        const statTotalTime = document.getElementById('meStatTotalTimeVal');
        if (statTotalTime) statTotalTime.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

        const avgSpeed = (data.totalTimeSpent / Math.max(1, data.totalQuestions)).toFixed(1);
        const statAvgSpeed = document.getElementById('meStatAvgSpeedVal');
        if (statAvgSpeed) statAvgSpeed.textContent = `${avgSpeed} ث/سؤال`;

        const statXp = document.getElementById('meStatXpVal');
        if (statXp) statXp.textContent = `+${data.xpEarned} XP`;

        // تفاصيل الأقسام
        const updateSecBar = (rowId, scoreId, barId, secData) => {
            const row = document.getElementById(rowId);
            const scoreEl = document.getElementById(scoreId);
            const barEl = document.getElementById(barId);
            if (!row || !scoreEl || !barEl) return;

            if (!secData || secData.total === 0) {
                row.style.display = 'none';
            } else {
                row.style.display = 'flex';
                const p = Math.round((secData.correct / secData.total) * 100);
                scoreEl.textContent = `${secData.correct} / ${secData.total} (${p}%)`;
                setTimeout(() => { barEl.style.width = `${p}%`; }, 150);
            }
        };

        updateSecBar('meSecRowQuant', 'meSecScoreQuant', 'meSecBarQuant', data.quant);
        updateSecBar('meSecRowVerbal', 'meSecScoreVerbal', 'meSecBarVerbal', data.verbal);
        updateSecBar('meSecRowTahsili', 'meSecScoreTahsili', 'meSecBarTahsili', data.tahsili);

        // زر إعادة محاولة الأخطاء
        const mistakesCount = data.totalQuestions - data.correctCount;
        const retryBtn = document.getElementById('meRetryMistakesBtn');
        const countSpan = document.getElementById('meMistakesCountSpan');
        if (retryBtn) {
            if (mistakesCount > 0) {
                retryBtn.style.display = 'inline-flex';
                if (countSpan) countSpan.textContent = mistakesCount;
            } else {
                retryBtn.style.display = 'none';
            }
        }
    }

    openMockExamReview() {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        this.openReviewView();
    }

    retryMockExamMistakes() {
        if (window.gameAudio && typeof window.gameAudio.playClick === 'function') {
            window.gameAudio.playClick();
        }
        const mistakes = this.roundHistory.filter(h => !h.isCorrect);
        if (!mistakes || mistakes.length === 0) {
            alert('أحسنت يا بطل! ليس لديك أخطاء لإعادة محاولتها.');
            return;
        }

        this.mockExamState = {
            isActive: true,
            track: 'mistakes_retry',
            targetCount: mistakes.length,
            questions: mistakes.map(m => m.question),
            currentIdx: 0,
            userAnswers: new Array(mistakes.length).fill(null),
            flagged: new Array(mistakes.length).fill(false),
            startTime: Date.now(),
            timeLimitSeconds: mistakes.length * 60,
            timeLeftSeconds: mistakes.length * 60,
            paletteOpen: false,
            examTitle: 'إعادة محاولة أسئلة الأخطاء 🔄'
        };

        const titleEl = document.getElementById('meArenaExamTitle');
        if (titleEl) titleEl.textContent = this.mockExamState.examTitle;

        this.showView('mockExamArenaView');
        this.startMockExamCountdown();
        this.renderMockExamQuestion();
        this.renderMockExamPalette();
    }

    generateFallbackMockExamQuestions(track, count) {
        // تجهيز عينة أسئلة قياسية في حال انقطاع الاتصال
        const sampleQuant = [
            { id: 901, content: "إذا كان ٥^(س - ١) = ١٢٥ ، فما قيمة س؟", options: ["٢", "٣", "٤", "٥"], correct_answer: "٤", explanation: "بما أن ١٢٥ = ٥^٣، فإن س - ١ = ٣ ومنها س = ٤.", subject: "قدرات - كمي", category: "qudurat_quant", section_label: "القسم الكمي 📐" },
            { id: 902, content: "ما قيمة المقدار: (١٠٠^٢ - ٩٩^٢) ؟", options: ["١", "٩٩", "١٩٩", "٢٠٠"], correct_answer: "١٩٩", explanation: "فرق بين مربعين: (١٠٠ - ٩٩)(١٠٠ + ٩٩) = ١ × ١٩٩ = ١٩٩.", subject: "قدرات - كمي", category: "qudurat_quant", section_label: "القسم الكمي 📐" },
            { id: 903, content: "مثلث قائم الزاوية طولا ضلعيه ٦ سم و ٨ سم، فما طول الوتر؟", options: ["١٠ سم", "١٢ سم", "١٤ سم", "٩ سم"], correct_answer: "١٠ سم", explanation: "حسب نظرية فيثاغورس الشهيرة المثلث ٣: ٤: ٥ ومضاعفاتها ٦: ٨: ١٠.", subject: "قدرات - كمي", category: "qudurat_quant", section_label: "القسم الكمي 📐" }
        ];
        const sampleVerbal = [
            { id: 904, content: "تناظر لفظي: (رئة : تنفس)", options: ["عين : رؤية", "يد : بطش", "أذن : سماع", "قلب : ضخ"], correct_answer: "عين : رؤية", explanation: "علاقة العضو بوظيفته الأساسية، فالرئة وظيفتها التنفس والعين وظيفتها الرؤية.", subject: "قدرات - لفظي", category: "qudurat_verbal", section_label: "القسم اللفظي 📜" },
            { id: 905, content: "إكمال الجمل: حسن الخلق يذيب ......... كما تذيب الشمس .........", options: ["الخطايا - الجليد", "الذنوب - المطر", "الأحقاد - الصخر", "المشاكل - الثلج"], correct_answer: "الخطايا - الجليد", explanation: "المعنى السياقي الصحيح والمأثور: حسن الخلق يذيب الخطايا كما تذيب الشمس الجليد.", subject: "قدرات - لفظي", category: "qudurat_verbal", section_label: "القسم اللفظي 📜" }
        ];
        const sampleTahsili = [
            { id: 906, content: "أي مما يلي يُعد وحدة قياس القوة في النظام الدولي؟", options: ["الجول", "النيوتن", "الواط", "الباسكال"], correct_answer: "النيوتن", explanation: "النيوتن (N) هو وحدة قياس القوة في النظام الدولي للوحدات SI.", subject: "تحصيلي - فيزياء", category: "tahsili", section_label: "القسم التحصيلي 🧪" },
            { id: 907, content: "الرابطة المتكونة بين ذرتي الهيدروجين والأكسجين في جزيء الماء هي:", options: ["تساهمية قطبية", "أيونية", "فلزية", "هيدروجينية"], correct_answer: "تساهمية قطبية", explanation: "الرابطة داخل جزيء الماء بين الهيدروجين والأكسجين هي رابطة تساهمية قطبية.", subject: "تحصيلي - كيمياء", category: "tahsili", section_label: "القسم التحصيلي 🧪" }
        ];

        let pool = [];
        if (track === 'qudurat') pool = [...sampleQuant, ...sampleVerbal];
        else if (track === 'tahsili') pool = [...sampleTahsili];
        else pool = [...sampleQuant, ...sampleVerbal, ...sampleTahsili];

        const result = [];
        for (let i = 0; i < count; i++) {
            const base = pool[i % pool.length];
            result.push({
                ...base,
                index: i + 1,
                id: base.id + i * 10
            });
        }
        return result;
    }
