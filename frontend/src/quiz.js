import { state, t, currentStory, saveStateToStorage, toArabicNum } from "./state.js";

let audioMgr = null;
let onVictoryCb = null;
let onOpenCardCb = null;

// Store shuffled options per question for current quiz run
let activeShuffledQuestions = [];

export function initQuiz(audioManagerInstance, onVictory, onOpenCard) {
  audioMgr = audioManagerInstance;
  onVictoryCb = onVictory;
  onOpenCardCb = onOpenCard;
}

export function startQuiz() {
  state.quizIndex = 0;
  state.quizAnsweredCurrent = false;
  state.firstTryCorrect = [];

  const rawList = currentStory().quiz.questions;
  // Deep clone and shuffle options for each question
  activeShuffledQuestions = rawList.map((q) => {
    const optionsWithOrigIndex = q.options.map((optText, origIdx) => ({
      text: optText,
      origIdx,
      isCorrect: origIdx === q.correctIndex,
    }));

    // Fisher-Yates shuffle
    for (let i = optionsWithOrigIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithOrigIndex[i], optionsWithOrigIndex[j]] = [
        optionsWithOrigIndex[j],
        optionsWithOrigIndex[i],
      ];
    }

    return {
      ...q,
      shuffledOptions: optionsWithOrigIndex,
      hadWrongAttempt: false,
    };
  });

  const questionCard = document.getElementById("quiz-question-card");
  const victoryCard = document.getElementById("quiz-victory-card");
  if (questionCard) questionCard.hidden = false;
  if (victoryCard) victoryCard.hidden = true;

  setQuizAstronautText(t("quizIntroPrompt"));
  renderQuizQuestion();
}

export function renderQuizQuestion() {
  const qData = activeShuffledQuestions[state.quizIndex];
  if (!qData) {
    finishQuiz();
    return;
  }

  state.quizAnsweredCurrent = false;

  const stepEl = document.getElementById("quiz-step-indicator");
  const textEl = document.getElementById("quiz-question-text");
  const optionsEl = document.getElementById("quiz-options");
  const dotsEl = document.getElementById("quiz-dots");

  if (stepEl) {
    stepEl.textContent = currentStory().quiz.stepFormat(
      state.quizIndex + 1,
      activeShuffledQuestions.length
    );
  }

  if (textEl) {
    textEl.textContent = qData.question;
  }

  if (dotsEl) {
    dotsEl.innerHTML = activeShuffledQuestions
      .map((_, idx) => {
        let cls = "quiz-dot";
        if (idx === state.quizIndex) cls += " is-active";
        else if (idx < state.quizIndex) cls += " is-done";
        return `<span class="${cls}"></span>`;
      })
      .join("");
  }

  if (optionsEl) {
    optionsEl.innerHTML = "";
    qData.shuffledOptions.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option-btn";
      btn.textContent = opt.text;
      btn.addEventListener("click", () => handleOptionClick(btn, opt, qData));
      optionsEl.appendChild(btn);
    });
  }
}

function handleOptionClick(btnEl, optionObj, questionObj) {
  if (state.quizAnsweredCurrent) return;

  if (optionObj.isCorrect) {
    state.quizAnsweredCurrent = true;
    if (!questionObj.hadWrongAttempt) {
      state.firstTryCorrect.push(state.quizIndex);
    }

    btnEl.classList.add("is-correct");
    audioMgr.playChime("success");

    // Show explanation if available, otherwise friendly correct message
    const msg = questionObj.explanation
      ? `${t("quizCorrectMsg")} ${questionObj.explanation}`
      : t("quizCorrectMsg");
    setQuizAstronautText(msg);

    // Disable all options
    document.querySelectorAll(".quiz-option-btn").forEach((b) => (b.disabled = true));

    // Advance after ~2 seconds so kid reads explanation
    setTimeout(() => {
      state.quizIndex++;
      if (state.quizIndex < activeShuffledQuestions.length) {
        setQuizAstronautText(t("quizNextPrompt"));
        renderQuizQuestion();
      } else {
        finishQuiz();
      }
    }, 2200);
  } else {
    // Wrong answer
    questionObj.hadWrongAttempt = true;
    btnEl.classList.add("is-wrong");
    btnEl.disabled = true;
    audioMgr.playChime("tap");
    setQuizAstronautText(t("quizWrongMsg"));
  }
}

export function finishQuiz() {
  state.quizPassed = true;
  state.quizScore = state.firstTryCorrect.length;
  saveStateToStorage();

  const questionCard = document.getElementById("quiz-question-card");
  const victoryCard = document.getElementById("quiz-victory-card");
  if (questionCard) questionCard.hidden = true;
  if (victoryCard) victoryCard.hidden = false;

  audioMgr.playChime("unlock");
  audioMgr.playOutro();

  setQuizAstronautText(
    state.lang === "ar"
      ? "وده يا أصحابي آخر الحكاية... أو أول الحكاية! مع السلامة يا أبطال الفضاء، وخلّوا عينيكم على السما!"
      : t("quizVictoryPrompt")
  );

  // Render score badge/pill inside victory card
  renderScoreSection(victoryCard);

  if (onVictoryCb) onVictoryCb();
}

function renderScoreSection(victoryCard) {
  let scorePill = victoryCard.querySelector(".victory-score-pill");
  if (!scorePill) {
    scorePill = document.createElement("div");
    scorePill.className = "victory-score-pill";
    const victoryDesc = victoryCard.querySelector(".victory-desc");
    if (victoryDesc) {
      victoryDesc.parentNode.insertBefore(scorePill, victoryDesc);
    } else {
      victoryCard.prepend(scorePill);
    }
  }

  const scoreText =
    state.lang === "ar"
      ? `نتيجتك: ${toArabicNum(state.quizScore)} من ${toArabicNum(activeShuffledQuestions.length)} أسئلة!`
      : `Your Score: ${state.quizScore} of ${activeShuffledQuestions.length} correct on first try!`;

  const passBadge =
    state.quizScore >= 3
      ? `<span class="score-pass-tag">🌟 ${t("quizPassedMsg") || "ممتاز!"}</span>`
      : `<span class="score-review-tag">💡 ${t("quizRetryMsg") || "راجع وجرب تاني!"}</span>`;

  scorePill.innerHTML = `
    <div class="score-display">
      <strong>${scoreText}</strong>
      ${passBadge}
    </div>
  `;

  // Review suggestions if kid scored < 3
  let reviewArea = victoryCard.querySelector(".quiz-review-area");
  if (!reviewArea) {
    reviewArea = document.createElement("div");
    reviewArea.className = "quiz-review-area";
    scorePill.parentNode.insertBefore(reviewArea, scorePill.nextSibling);
  }

  if (state.quizScore < 3) {
    reviewArea.hidden = false;
    const cardsToReview = Array.from(
      new Set(
        activeShuffledQuestions
          .filter((q) => q.hadWrongAttempt && q.learnMoreCard)
          .map((q) => q.learnMoreCard)
      )
    );

    const buttonsHtml = cardsToReview
      .map((ck) => {
        return `<button type="button" class="btn btn-outline btn-sm btn-review-card" data-review-card="${ck}">📖 ${ck}</button>`;
      })
      .join(" ");

    reviewArea.innerHTML = `
      <p class="review-label">${t("quizReviewBtn") || "راجع معلومات الكروت"}:</p>
      <div class="review-buttons">${buttonsHtml}</div>
      <button type="button" id="btn-quiz-retry" class="btn btn-outline btn-sm" style="margin-top: 8px;">🔄 ${t("quizTryAgainBtn") || "جرب الاختبار تاني"}</button>
    `;

    reviewArea.querySelectorAll(".btn-review-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cardKey = btn.dataset.reviewCard;
        if (onOpenCardCb) onOpenCardCb(cardKey);
      });
    });

    reviewArea.querySelector("#btn-quiz-retry")?.addEventListener("click", () => {
      startQuiz();
    });
  } else {
    reviewArea.hidden = true;
    reviewArea.innerHTML = "";
  }
}

export function setQuizAstronautText(text) {
  const el = document.getElementById("quiz-speech-text");
  if (el) el.textContent = text;
}

