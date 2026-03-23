// Moteur de quiz — gère l'affichage, la navigation et le score

class QuizEngine {
  constructor(questions, courseId, onComplete) {
    this.questions = this._shuffle(questions);
    this.courseId = courseId;
    this.onComplete = onComplete;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = []; // historique des réponses
    this.answered = false;
  }

  // Lance le quiz en rendant la première question
  start() {
    this.render();
  }

  // Mélange aléatoire des questions (Fisher-Yates)
  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Rendu de la question courante
  render() {
    const q = this.questions[this.currentIndex];
    const container = document.getElementById('quiz-container');
    this.answered = false;

    // Indicateur de progression
    const progressPct = ((this.currentIndex) / this.questions.length) * 100;

    container.innerHTML = `
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progressPct}%"></div>
      </div>
      <div class="quiz-header">
        <span class="quiz-counter">Question ${this.currentIndex + 1} / ${this.questions.length}</span>
        <span class="quiz-score-live">⭐ ${this.score} / ${this.currentIndex}</span>
      </div>
      <div class="quiz-question">
        <p>${q.question}</p>
      </div>
      <div class="quiz-answers" id="quiz-answers">
        ${q.answers.map((ans, i) => `
          <button class="quiz-answer-btn" data-index="${i}" onclick="quizEngine.selectAnswer(${i})">
            <span class="answer-letter">${['A', 'B', 'C', 'D'][i]}</span>
            <span class="answer-text">${ans}</span>
          </button>
        `).join('')}
      </div>
      <div id="quiz-feedback" class="quiz-feedback hidden"></div>
      <button id="quiz-next-btn" class="btn-primary hidden" onclick="quizEngine.nextQuestion()">
        ${this.currentIndex + 1 < this.questions.length ? 'Question suivante ➡️' : 'Voir mes résultats 🏆'}
      </button>
    `;
  }

  // Gère la sélection d'une réponse
  selectAnswer(selectedIndex) {
    if (this.answered) return; // empêche de répondre deux fois
    this.answered = true;

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === q.correct;

    if (isCorrect) this.score++;
    this.answers.push({ question: q.question, selected: selectedIndex, correct: q.correct, isCorrect });

    // Coloration des boutons
    const buttons = document.querySelectorAll('.quiz-answer-btn');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
    });

    // Feedback
    const feedback = document.getElementById('quiz-feedback');
    feedback.className = `quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`;
    feedback.innerHTML = isCorrect
      ? '✅ <strong>Bonne réponse !</strong> Excellent !'
      : `❌ <strong>Pas tout à fait...</strong> La bonne réponse était : <em>${q.answers[q.correct]}</em>`;

    document.getElementById('quiz-next-btn').classList.remove('hidden');
  }

  // Passe à la question suivante ou affiche les résultats
  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.render();
    } else {
      this.showResults();
    }
  }

  // Affiche l'écran de résultats final
  showResults() {
    const percentage = Math.round((this.score / this.questions.length) * 100);
    const { isNewBest } = saveQuizScore(this.courseId, this.score, this.questions.length);
    const user = getUser();

    // Émoji et message selon le score
    let medal, message;
    if (percentage >= 90)      { medal = '🏆'; message = 'Parfait ! Tu es un génie !'; }
    else if (percentage >= 70) { medal = '🥇'; message = 'Excellent travail !'; }
    else if (percentage >= 50) { medal = '🥈'; message = 'Pas mal du tout !'; }
    else                       { medal = '🥉'; message = 'Continue à apprendre, tu vas y arriver !'; }

    const xpGain = Math.round(10 + (40 * percentage) / 100);
    const levelInfo = getLevelForXp(user.xp);

    document.getElementById('quiz-container').innerHTML = `
      <div class="quiz-results">
        <div class="results-medal">${medal}</div>
        <h2>${message}</h2>
        <div class="results-score">${this.score} / ${this.questions.length}</div>
        <div class="results-percentage">${percentage}%</div>

        ${isNewBest ? `<div class="results-xp-badge">+${xpGain} XP gagnés ! 🌟</div>` : '<div class="results-xp-info">Score déjà enregistré — rejoue pour améliorer !</div>'}

        <div class="results-level">
          ${levelInfo.emoji} Niveau ${levelInfo.level} — ${levelInfo.title}<br>
          <small>${user.xp} XP total</small>
        </div>

        <div class="results-review">
          <h3>📋 Récapitulatif</h3>
          ${this.answers.map((a, i) => `
            <div class="review-item ${a.isCorrect ? 'review-correct' : 'review-wrong'}">
              <span>${a.isCorrect ? '✅' : '❌'}</span>
              <span class="review-q">Q${i + 1} : ${a.question}</span>
            </div>
          `).join('')}
        </div>

        <button class="btn-primary" onclick="showView('home')">🏠 Retour au tableau de bord</button>
      </div>
    `;

    // Notifie l'application parente si besoin
    if (typeof this.onComplete === 'function') this.onComplete(this.score, this.questions.length);
  }
}

// Instance globale du quiz (accessible par les onclick HTML)
let quizEngine = null;

// Démarre un quiz pour un cours donné
function startQuiz(courseId) {
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (!course) return;

  showView('quiz');
  document.getElementById('quiz-course-title').textContent = course.title;
  document.getElementById('quiz-course-emoji').textContent = course.emoji;

  quizEngine = new QuizEngine(course.quiz, courseId, () => {
    // Rafraîchit le tableau de bord quand on revient
    renderHome();
  });
  quizEngine.start();
}
