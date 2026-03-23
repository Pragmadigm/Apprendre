// Gestion de la persistance locale (localStorage)
// Toutes les données de l'apprenant sont stockées dans le navigateur

const STORAGE_KEY = 'apprendre_data';

// Structure par défaut d'un nouvel utilisateur
const DEFAULT_DATA = {
  user: null,         // { pseudo, avatar, xp, level }
  progress: {}        // { [courseId]: { completedChapters: [], quizScore: null, completed: false } }
};

// Niveaux XP
const LEVELS = [
  { level: 1, title: 'Débutant',    minXp: 0,    emoji: '🌱' },
  { level: 2, title: 'Explorateur', minXp: 100,  emoji: '🔭' },
  { level: 3, title: 'Développeur', minXp: 250,  emoji: '💻' },
  { level: 4, title: 'Expert',      minXp: 500,  emoji: '🧠' },
  { level: 5, title: 'Génie',       minXp: 1000, emoji: '🚀' }
];

// Lit toutes les données depuis localStorage
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { ...DEFAULT_DATA };
  } catch (e) {
    console.error('Erreur lecture localStorage:', e);
    return { ...DEFAULT_DATA };
  }
}

// Sauvegarde toutes les données dans localStorage
function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Erreur écriture localStorage:', e);
  }
}

// Crée ou met à jour le profil utilisateur
function saveUser(pseudo, avatar) {
  const data = loadData();
  data.user = {
    pseudo: pseudo.trim(),
    avatar,
    xp: data.user ? data.user.xp : 0,
    level: data.user ? data.user.level : 1
  };
  saveData(data);
  return data.user;
}

// Retourne l'utilisateur ou null si aucun profil
function getUser() {
  return loadData().user;
}

// Marque un chapitre comme lu et ajoute de l'XP
function markChapterRead(courseId, chapterId) {
  const data = loadData();
  if (!data.progress[courseId]) {
    data.progress[courseId] = { completedChapters: [], quizScore: null, completed: false };
  }
  const prog = data.progress[courseId];
  if (!prog.completedChapters.includes(chapterId)) {
    prog.completedChapters.push(chapterId);
    data.user.xp += 5; // +5 XP par chapitre lu
    data.user.level = getLevelForXp(data.user.xp).level;
  }
  saveData(data);
  return data;
}

// Enregistre le score d'un quiz et ajoute de l'XP
function saveQuizScore(courseId, score, totalQuestions) {
  const data = loadData();
  if (!data.progress[courseId]) {
    data.progress[courseId] = { completedChapters: [], quizScore: null, completed: false };
  }
  const prog = data.progress[courseId];
  const percentage = Math.round((score / totalQuestions) * 100);

  // Bonus XP seulement si c'est un meilleur score
  const isNewBest = prog.quizScore === null || percentage > prog.quizScore;
  if (isNewBest) {
    const xpGain = Math.round(10 + (40 * percentage) / 100); // entre 10 et 50 XP
    data.user.xp += xpGain;
    data.user.level = getLevelForXp(data.user.xp).level;
    prog.quizScore = percentage;
  }

  prog.completed = true;
  saveData(data);
  return { data, isNewBest, percentage };
}

// Retourne la progression d'un cours
function getCourseProgress(courseId) {
  const data = loadData();
  return data.progress[courseId] || { completedChapters: [], quizScore: null, completed: false };
}

// Retourne toute la progression
function getAllProgress() {
  return loadData().progress;
}

// Retourne le niveau correspondant à un montant d'XP
function getLevelForXp(xp) {
  let currentLevel = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXp) currentLevel = lvl;
  }
  return currentLevel;
}

// Retourne la prochaine étape de niveau (ou null si max)
function getNextLevel(xp) {
  const current = getLevelForXp(xp);
  return LEVELS.find(l => l.level === current.level + 1) || null;
}

// Supprime toutes les données (réinitialisation)
function resetAll() {
  localStorage.removeItem(STORAGE_KEY);
}
