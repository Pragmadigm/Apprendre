// Application principale — navigation, rendu des vues, gestion du profil

// Liste des 20 avatars disponibles
const AVATARS = [
  { id: 'fox',      emoji: '🦊', name: 'Renard' },
  { id: 'wolf',     emoji: '🐺', name: 'Loup' },
  { id: 'bear',     emoji: '🐻', name: 'Ours' },
  { id: 'panda',    emoji: '🐼', name: 'Panda' },
  { id: 'lion',     emoji: '🦁', name: 'Lion' },
  { id: 'tiger',    emoji: '🐯', name: 'Tigre' },
  { id: 'raccoon',  emoji: '🦝', name: 'Raton' },
  { id: 'frog',     emoji: '🐸', name: 'Grenouille' },
  { id: 'octopus',  emoji: '🐙', name: 'Pieuvre' },
  { id: 'butterfly',emoji: '🦋', name: 'Papillon' },
  { id: 'unicorn',  emoji: '🦄', name: 'Licorne' },
  { id: 'dragon',   emoji: '🐲', name: 'Dragon' },
  { id: 'eagle',    emoji: '🦅', name: 'Aigle' },
  { id: 'parrot',   emoji: '🦜', name: 'Perroquet' },
  { id: 'rocket',   emoji: '🚀', name: 'Fusée' },
  { id: 'robot',    emoji: '🤖', name: 'Robot' },
  { id: 'alien',    emoji: '👾', name: 'Alien' },
  { id: 'gamepad',  emoji: '🎮', name: 'Gamer' },
  { id: 'star',     emoji: '🌟', name: 'Étoile' },
  { id: 'lightning',emoji: '⚡', name: 'Éclair' }
];

// Vue actuellement affichée
let currentView = null;
// Cours actuellement ouvert
let currentCourse = null;
// Chapitre actuellement affiché
let currentChapterIndex = 0;

// ─── Navigation ─────────────────────────────────────────────────────────────

// Affiche une vue et cache les autres
function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(`view-${viewName}`);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }
  currentView = viewName;
}

// ─── Initialisation ──────────────────────────────────────────────────────────

// Point d'entrée appelé au chargement de la page
function init() {
  const user = getUser();
  if (user) {
    renderHome();
    showView('home');
  } else {
    renderProfile();
    showView('profile');
  }
}

// ─── Vue Profil (onboarding) ─────────────────────────────────────────────────

function renderProfile() {
  // Grille de sélection d'avatars
  const avatarGrid = document.getElementById('avatar-grid');
  avatarGrid.innerHTML = AVATARS.map(av => `
    <div class="avatar-option" data-id="${av.id}" onclick="selectAvatar('${av.id}')" title="${av.name}">
      <span class="avatar-emoji">${av.emoji}</span>
      <span class="avatar-name">${av.name}</span>
    </div>
  `).join('');

  // Sélectionne le premier avatar par défaut
  selectAvatar(AVATARS[0].id);
}

// Sélectionne visuellement un avatar
function selectAvatar(avatarId) {
  document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
  const selected = document.querySelector(`.avatar-option[data-id="${avatarId}"]`);
  if (selected) {
    selected.classList.add('selected');
    selected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  window._selectedAvatar = avatarId;
}

// Valide le formulaire de profil
function submitProfile() {
  const pseudoInput = document.getElementById('pseudo-input');
  const pseudo = pseudoInput.value.trim();

  if (!pseudo) {
    pseudoInput.classList.add('input-error');
    pseudoInput.placeholder = '⚠️ Entre ton pseudo !';
    pseudoInput.focus();
    return;
  }
  if (pseudo.length < 2) {
    pseudoInput.classList.add('input-error');
    return;
  }

  const avatar = AVATARS.find(a => a.id === window._selectedAvatar) || AVATARS[0];
  saveUser(pseudo, avatar);

  // Animation de transition
  document.getElementById('view-profile').classList.add('fade-out');
  setTimeout(() => {
    renderHome();
    showView('home');
  }, 400);
}

// ─── Vue Accueil (tableau de bord) ───────────────────────────────────────────

function renderHome() {
  const user = getUser();
  if (!user) return;

  const levelInfo = getLevelForXp(user.xp);
  const nextLevel = getNextLevel(user.xp);

  // En-tête utilisateur
  document.getElementById('user-avatar').textContent = user.avatar.emoji;
  document.getElementById('user-pseudo').textContent = user.pseudo;
  document.getElementById('user-xp').textContent = `${user.xp} XP`;
  document.getElementById('user-level').textContent = `${levelInfo.emoji} ${levelInfo.title}`;

  // Barre de progression vers le prochain niveau
  const xpBar = document.getElementById('xp-bar');
  if (nextLevel) {
    const prev = levelInfo.minXp;
    const pct = Math.min(100, ((user.xp - prev) / (nextLevel.minXp - prev)) * 100);
    xpBar.style.width = `${pct}%`;
    document.getElementById('xp-next').textContent = `${nextLevel.minXp - user.xp} XP pour le niveau ${nextLevel.level}`;
  } else {
    xpBar.style.width = '100%';
    document.getElementById('xp-next').textContent = 'Niveau maximum atteint ! 🏆';
  }

  // Grille des cours
  const grid = document.getElementById('courses-grid');
  grid.innerHTML = COURSES_DATA.map(course => renderCourseCard(course)).join('');
}

// Génère la carte HTML d'un cours
function renderCourseCard(course) {
  const prog = getCourseProgress(course.id);
  const totalChapters = course.chapters.length;
  const readChapters = prog.completedChapters.length;
  const pct = Math.round((readChapters / totalChapters) * 100);
  const hasScore = prog.quizScore !== null;

  return `
    <div class="course-card" onclick="openCourse('${course.id}')" style="--course-color: ${course.color}; --course-color-light: ${course.colorLight}">
      <div class="course-card-header">
        <span class="course-emoji">${course.emoji}</span>
        ${prog.completed ? '<span class="course-badge-done">✅ Terminé</span>' : ''}
      </div>
      <h3 class="course-title">${course.title}</h3>
      <p class="course-desc">${course.description}</p>
      <div class="course-progress-row">
        <div class="course-progress-bar">
          <div class="course-progress-fill" style="width: ${pct}%"></div>
        </div>
        <span class="course-progress-label">${readChapters}/${totalChapters} chapitres</span>
      </div>
      ${hasScore ? `<div class="course-score">Quiz : ${prog.quizScore}% 🏆</div>` : ''}
      <button class="course-btn" style="background: ${course.color}">
        ${readChapters === 0 ? '🚀 Commencer' : readChapters < totalChapters ? '📖 Continuer' : '🔁 Revoir'}
      </button>
    </div>
  `;
}

// ─── Vue Cours ───────────────────────────────────────────────────────────────

// Ouvre un cours et affiche le premier chapitre non lu (ou le premier)
function openCourse(courseId) {
  currentCourse = COURSES_DATA.find(c => c.id === courseId);
  if (!currentCourse) return;

  const prog = getCourseProgress(courseId);

  // Reprend là où l'apprenant s'est arrêté
  const nextUnread = currentCourse.chapters.findIndex(ch => !prog.completedChapters.includes(ch.id));
  currentChapterIndex = nextUnread >= 0 ? nextUnread : 0;

  renderCourseView();
  showView('course');
}

// Rendu complet de la vue cours
function renderCourseView() {
  const course = currentCourse;
  const chapter = course.chapters[currentChapterIndex];
  const prog = getCourseProgress(course.id);

  // Titre et couleur du cours
  document.getElementById('course-nav-title').textContent = course.title;
  document.getElementById('course-nav-emoji').textContent = course.emoji;

  // Liste des chapitres (sidebar)
  const chapterList = document.getElementById('chapter-list');
  chapterList.innerHTML = course.chapters.map((ch, i) => {
    const isDone = prog.completedChapters.includes(ch.id);
    const isActive = i === currentChapterIndex;
    return `
      <button class="chapter-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}"
              onclick="goToChapter(${i})">
        <span class="chapter-num">${isDone ? '✅' : (isActive ? '▶️' : (i + 1))}</span>
        <span>${ch.emoji} ${ch.title}</span>
      </button>
    `;
  }).join('');

  // Contenu du chapitre
  document.getElementById('chapter-content').innerHTML = chapter.content;

  // Marque le chapitre comme lu
  markChapterRead(course.id, chapter.id);

  // Boutons de navigation
  document.getElementById('btn-prev-chapter').disabled = currentChapterIndex === 0;
  const isLast = currentChapterIndex === course.chapters.length - 1;
  const nextBtn = document.getElementById('btn-next-chapter');
  nextBtn.textContent = isLast ? '🎯 Passer le Quiz !' : 'Chapitre suivant ➡️';
  nextBtn.onclick = isLast ? () => startQuiz(course.id) : () => goToChapter(currentChapterIndex + 1);

  // Scroll vers le haut du contenu
  document.getElementById('chapter-content').scrollTop = 0;
  window.scrollTo(0, 0);
}

// Navigation entre chapitres
function goToChapter(index) {
  if (index < 0 || index >= currentCourse.chapters.length) return;
  currentChapterIndex = index;
  renderCourseView();
}

// ─── Utilitaires UI ──────────────────────────────────────────────────────────

// Supprime le profil et recommence (accessible depuis l'accueil)
function resetProfile() {
  if (confirm('Veux-tu vraiment effacer ta progression et recommencer ?')) {
    resetAll();
    renderProfile();
    showView('profile');
  }
}

// Retour à l'accueil depuis n'importe quelle vue
function goHome() {
  renderHome();
  showView('home');
}

// Démarre quand le DOM est prêt
document.addEventListener('DOMContentLoaded', init);
