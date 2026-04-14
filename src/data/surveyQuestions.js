// Вопросы анкеты диагностики — перенесены из бота
// Формат адаптирован для React без Telegraf

export const QUESTIONS = {
  // БЛОК А
  age_group: {
    id: 'age_group',
    block: 'A',
    text: '📅 Расскажите о себе:\n\nВыберите ваш возраст или укажите, что заполняете анкету для ребёнка.',
    type: 'single_choice',
    allowBack: false,
    options: [
      { label: '👨‍💼 18–30 лет', value: '18-30' },
      { label: '👩‍💼 31–45 лет', value: '31-45' },
      { label: '👨‍🦳 46–60 лет', value: '46-60' },
      { label: '👴 60+ лет', value: '60+' },
      { label: '👨‍👩‍👧‍👦 Заполняю для ребёнка', value: 'for_child' },
    ],
  },

  occupation: {
    id: 'occupation',
    block: 'A',
    text: '💼 Основная деятельность:\n\nРазные виды деятельности создают разные паттерны дыхания и стресса.',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '💻 Офисная работа', value: 'office_work' },
      { label: '🏠 Работа дома / фриланс', value: 'home_work' },
      { label: '🏗️ Физический труд', value: 'physical_work' },
      { label: '🎓 Учёба', value: 'student' },
      { label: '👶 В декрете', value: 'maternity_leave' },
      { label: '🌅 На пенсии', value: 'retired' },
      { label: '👔 Руководящая должность', value: 'management' },
    ],
  },

  physical_activity: {
    id: 'physical_activity',
    block: 'A',
    text: '🏃 Физическая активность:\n\nКак часто занимаетесь спортом или физическими упражнениями?',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '🔥 Ежедневно', value: 'daily' },
      { label: '💪 3–4 раза в неделю', value: 'regular' },
      { label: '🚶 1–2 раза в неделю', value: 'sometimes' },
      { label: '📚 Несколько раз в месяц', value: 'rarely' },
      { label: '🛋️ Практически не занимаюсь', value: 'never' },
    ],
  },

  // БЛОК Б
  current_problems: {
    id: 'current_problems',
    block: 'B',
    text: '⚠️ Какие проблемы беспокоят вас СЕЙЧАС?\n\nВыберите до 3 наиболее важных проблем.',
    type: 'multiple_choice',
    maxSelections: 3,
    minSelections: 1,
    allowBack: true,
    options: [
      { label: '😰 Хронический стресс, напряжение', value: 'chronic_stress' },
      { label: '😴 Плохой сон, бессонница', value: 'insomnia' },
      { label: '🫁 Одышка, нехватка воздуха', value: 'breathing_issues' },
      { label: '💔 Повышенное давление', value: 'high_pressure' },
      { label: '🤕 Частые головные боли', value: 'headaches' },
      { label: '😵 Постоянная усталость', value: 'fatigue' },
      { label: '😨 Тревожность, панические атаки', value: 'anxiety' },
      { label: '🧠 Проблемы с концентрацией', value: 'concentration_issues' },
      { label: '🔙 Боли в шее, плечах, спине', value: 'back_pain' },
      { label: '🍽️ Проблемы с пищеварением', value: 'digestion_issues' },
    ],
  },

  stress_level: {
    id: 'stress_level',
    block: 'B',
    text: '😰 Оцените уровень стресса:\n\nНасколько часто вы испытываете стресс? (1 — минимальный, 10 — критический)',
    type: 'scale',
    min: 1,
    max: 10,
    allowBack: true,
    options: [
      { label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 },
      { label: '4', value: 4 }, { label: '5', value: 5 }, { label: '6', value: 6 },
      { label: '7', value: 7 }, { label: '8', value: 8 }, { label: '9', value: 9 },
      { label: '10', value: 10 },
    ],
  },

  sleep_quality: {
    id: 'sleep_quality',
    block: 'B',
    text: '😴 Качество сна за последний месяц:\n\n1 — сплю очень плохо, 10 — отличный сон, всегда высыпаюсь',
    type: 'scale',
    min: 1,
    max: 10,
    allowBack: true,
    options: [
      { label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3', value: 3 },
      { label: '4', value: 4 }, { label: '5', value: 5 }, { label: '6', value: 6 },
      { label: '7', value: 7 }, { label: '8', value: 8 }, { label: '9', value: 9 },
      { label: '10', value: 10 },
    ],
  },

  priority_problem: {
    id: 'priority_problem',
    block: 'B',
    text: '🎯 Что беспокоит БОЛЬШЕ ВСЕГО прямо сейчас?\n\nВыберите одну главную проблему.',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '😰 Не могу справиться со стрессом', value: 'chronic_stress' },
      { label: '😴 Плохо сплю, не высыпаюсь', value: 'insomnia' },
      { label: '🫁 Проблемы с дыханием', value: 'breathing_issues' },
      { label: '💔 Высокое давление, проблемы с сердцем', value: 'high_pressure' },
      { label: '😨 Постоянная тревога, панические атаки', value: 'anxiety' },
      { label: '😵 Хроническая усталость, нет энергии', value: 'fatigue' },
      { label: '🧠 Не могу сосредоточиться', value: 'concentration_issues' },
    ],
  },

  // БЛОК В
  breathing_method: {
    id: 'breathing_method',
    block: 'C',
    text: '👃 Как вы обычно дышите в течение дня?\n\nПонаблюдайте за своим дыханием прямо сейчас.',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '👃 В основном носом', value: 'nose' },
      { label: '👄 Часто дышу ртом', value: 'mouth' },
      { label: '🔄 Попеременно носом и ртом', value: 'mixed' },
      { label: '🤷 Не обращаю внимания на дыхание', value: 'unaware' },
    ],
  },

  breathing_frequency: {
    id: 'breathing_frequency',
    block: 'C',
    text: '🫁 Как часто замечаете проблемы с дыханием?\n\nОдышка, нехватка воздуха, учащённое дыхание.',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '🔴 Постоянно (каждый день)', value: 'constantly' },
      { label: '🟡 Часто (несколько раз в неделю)', value: 'often' },
      { label: '🟠 Периодически (несколько раз в месяц)', value: 'sometimes' },
      { label: '🟢 Редко (несколько раз в год)', value: 'rarely' },
      { label: '⚪ Никогда не замечаю проблем', value: 'never' },
    ],
  },

  shallow_breathing: {
    id: 'shallow_breathing',
    block: 'C',
    text: '💨 Замечали ли поверхностное дыхание или задержки?\n\nОсобенно во время работы или стресса.',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '✅ Да, часто ловлю себя на этом', value: 'yes_often' },
      { label: '🤔 Иногда замечаю в стрессе', value: 'sometimes' },
      { label: '❌ Нет, дышу нормально и глубоко', value: 'no' },
    ],
  },

  stress_breathing: {
    id: 'stress_breathing',
    block: 'C',
    text: '😰 Что происходит с дыханием, когда нервничаете?\n\nВспомните последнюю стрессовую ситуацию.',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '💨 Дыхание учащается, становится поверхностным', value: 'rapid_shallow' },
      { label: '⏸️ Начинаю задерживать дыхание', value: 'breath_holding' },
      { label: '😤 Чувствую нехватку воздуха', value: 'air_shortage' },
      { label: '👄 Дышу ртом вместо носа', value: 'mouth_breathing' },
      { label: '🤷 Не замечаю изменений', value: 'no_change' },
      { label: '🧘 Стараюсь дышать глубже', value: 'conscious_breathing' },
    ],
  },

  // БЛОК Г
  breathing_experience: {
    id: 'breathing_experience',
    block: 'D',
    text: '🧘 Ваш опыт с дыхательными практиками:\n\nЙога, медитация, специальные упражнения.',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '🆕 Никогда не пробовал(а)', value: 'never' },
      { label: '🔍 Пробовал(а) пару раз, не пошло', value: 'few_times' },
      { label: '📚 Изучал(а) теорию, но не практиковал(а)', value: 'theory_only' },
      { label: '📅 Иногда практикую (несколько раз в месяц)', value: 'sometimes' },
      { label: '💪 Практикую регулярно (несколько раз в неделю)', value: 'regularly' },
      { label: '🎯 Опытный практик (ежедневно)', value: 'expert' },
    ],
  },

  time_commitment: {
    id: 'time_commitment',
    block: 'D',
    text: '⏰ Время для дыхательных практик:\n\nСколько времени готовы уделять ежедневно? Будьте реалистичны!',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '⚡ 3–5 минут (в перерывах, по дороге)', value: '3-5_minutes' },
      { label: '🎯 10–15 минут (утром или вечером)', value: '10-15_minutes' },
      { label: '💎 20–30 минут (полноценная практика)', value: '20-30_minutes' },
      { label: '🏆 30+ минут (глубокое изучение)', value: '30+_minutes' },
    ],
  },

  format_preferences: {
    id: 'format_preferences',
    block: 'D',
    text: '📱 Удобные форматы изучения:\n\nКак вам комфортнее изучать дыхательные техники? До 4 форматов.',
    type: 'multiple_choice',
    maxSelections: 4,
    minSelections: 1,
    allowBack: true,
    options: [
      { label: '🎥 Видеоуроки с демонстрацией', value: 'video' },
      { label: '🎧 Аудиопрактики с голосом', value: 'audio' },
      { label: '📖 Текст с картинками', value: 'text' },
      { label: '💻 Живые онлайн-занятия', value: 'online_live' },
      { label: '👨‍⚕️ Индивидуальные консультации', value: 'individual' },
      { label: '📱 Мобильное приложение', value: 'mobile_app' },
    ],
  },

  main_goals: {
    id: 'main_goals',
    block: 'D',
    text: '🎯 Главные цели на ближайший месяц:\n\nВыберите максимум 2 самые важные цели.',
    type: 'multiple_choice',
    maxSelections: 2,
    minSelections: 1,
    allowBack: true,
    options: [
      { label: '😌 Научиться быстро расслабляться в стрессе', value: 'quick_relaxation' },
      { label: '💪 Повысить стрессоустойчивость', value: 'stress_resistance' },
      { label: '😨 Избавиться от тревожности и паники', value: 'reduce_anxiety' },
      { label: '😴 Наладить качественный сон', value: 'improve_sleep' },
      { label: '⚡ Повысить энергию и работоспособность', value: 'increase_energy' },
      { label: '💔 Нормализовать давление/пульс', value: 'normalize_pressure' },
      { label: '🫁 Улучшить работу лёгких и дыхания', value: 'improve_breathing' },
      { label: '🧠 Улучшить концентрацию внимания', value: 'improve_focus' },
      { label: '⚖️ Поддержать процесс похудения', value: 'weight_management' },
      { label: '💚 Общее оздоровление организма', value: 'general_health' },
    ],
  },

  // БЛОК Д: Хронические состояния
  chronic_conditions: {
    id: 'chronic_conditions',
    block: 'E',
    condition: (data) => data.age_group !== 'for_child',
    text: '🏥 Есть ли у вас хронические заболевания?\n\nВажно для безопасного подбора техник. Всё конфиденциально.',
    type: 'multiple_choice',
    maxSelections: 9,
    minSelections: 1,
    allowBack: true,
    options: [
      { label: '🫁 Астма / бронхит / ХОБЛ', value: 'respiratory_diseases' },
      { label: '💔 Гипертония / аритмия', value: 'cardiovascular_diseases' },
      { label: '🩸 Диабет 1 или 2 типа', value: 'diabetes' },
      { label: '🦴 Остеохондроз / грыжи', value: 'spine_problems' },
      { label: '🧠 Мигрени / головные боли', value: 'chronic_headaches' },
      { label: '😰 Панические атаки / ВСД', value: 'panic_disorder' },
      { label: '🔥 Заболевания щитовидной железы', value: 'thyroid_diseases' },
      { label: '🍽️ Гастрит / язва / рефлюкс', value: 'digestive_diseases' },
      { label: '💚 Нет хронических заболеваний', value: 'none' },
    ],
  },

  // БЛОК Е: Детские вопросы
  child_age_detail: {
    id: 'child_age_detail',
    block: 'F',
    condition: (data) => data.age_group === 'for_child',
    text: '👶 Уточните возраст ребёнка:\n\nВозраст важен для подбора подходящих техник.',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '👶 3–4 года', value: '3-4' },
      { label: '🧒 5–6 лет', value: '5-6' },
      { label: '👦 7–8 лет', value: '7-8' },
      { label: '👧 9–10 лет', value: '9-10' },
      { label: '🧑 11–12 лет', value: '11-12' },
      { label: '👨‍🎓 13–15 лет', value: '13-15' },
      { label: '👩‍🎓 16–17 лет', value: '16-17' },
    ],
  },

  child_problems_detailed: {
    id: 'child_problems_detailed',
    block: 'F',
    condition: (data) => data.age_group === 'for_child',
    text: '🎭 Что беспокоит в поведении или состоянии ребёнка?\n\nВыберите до 3 наиболее важных проблем.',
    type: 'multiple_choice',
    maxSelections: 3,
    minSelections: 1,
    allowBack: true,
    options: [
      { label: '😭 Частые истерики, капризы', value: 'tantrums' },
      { label: '😴 Проблемы с засыпанием', value: 'sleep_problems' },
      { label: '🌙 Беспокойный сон, кошмары', value: 'nightmares' },
      { label: '⚡ Гиперактивность, не может усидеть', value: 'hyperactivity' },
      { label: '😰 Тревожность, страхи', value: 'anxiety' },
      { label: '📚 Проблемы с концентрацией в учёбе', value: 'concentration_issues' },
      { label: '🤧 Частые простуды, слабый иммунитет', value: 'weak_immunity' },
      { label: '🫁 Астма или проблемы с дыханием', value: 'breathing_issues' },
      { label: '💚 В целом здоров, профилактика', value: 'prevention' },
    ],
  },

  child_motivation_approach: {
    id: 'child_motivation_approach',
    block: 'F',
    condition: (data) => data.age_group === 'for_child',
    text: '🎯 Как лучше мотивировать вашего ребёнка?\n\nПоможет сделать практики увлекательными.',
    type: 'single_choice',
    allowBack: true,
    options: [
      { label: '🎮 Игровая форма, сказки', value: 'games_stories' },
      { label: '🏆 Система наград и достижений', value: 'reward_system' },
      { label: '👨‍👩‍👧‍👦 Совместные занятия с родителями', value: 'family_activities' },
      { label: '🎨 Творческие задания', value: 'creative_tasks' },
      { label: '📚 Объяснение пользы «по-взрослому»', value: 'adult_explanation' },
    ],
  },
};

// Порядок вопросов для взрослых
export const ADULT_FLOW = [
  'age_group',
  'occupation',
  'physical_activity',
  'current_problems',
  'stress_level',
  'sleep_quality',
  'priority_problem',
  'breathing_method',
  'breathing_frequency',
  'shallow_breathing',
  'stress_breathing',
  'breathing_experience',
  'time_commitment',
  'format_preferences',
  'main_goals',
  'chronic_conditions',
];

// Порядок вопросов для детского потока
export const CHILD_FLOW = [
  'age_group',
  'child_age_detail',
  'child_problems_detailed',
  'child_motivation_approach',
];

// Определить поток по данным пользователя
export function getFlow(userData) {
  if (userData.age_group === 'for_child') return CHILD_FLOW;
  return ADULT_FLOW;
}

// Получить следующий видимый вопрос
export function getNextQuestionId(currentId, userData) {
  const flow = getFlow(userData);
  const idx = flow.indexOf(currentId);
  for (let i = idx + 1; i < flow.length; i++) {
    const q = QUESTIONS[flow[i]];
    if (!q) continue;
    if (!q.condition || q.condition(userData)) return flow[i];
  }
  return null;
}

// Получить предыдущий видимый вопрос
export function getPrevQuestionId(currentId, userData) {
  const flow = getFlow(userData);
  const idx = flow.indexOf(currentId);
  for (let i = idx - 1; i >= 0; i--) {
    const q = QUESTIONS[flow[i]];
    if (!q) continue;
    if (!q.condition || q.condition(userData)) return flow[i];
  }
  return null;
}

// Посчитать общее число вопросов для прогресс-бара
export function getTotalQuestions(userData) {
  const flow = getFlow(userData);
  return flow.filter((id) => {
    const q = QUESTIONS[id];
    return q && (!q.condition || q.condition(userData));
  }).length;
}

// Посчитать номер текущего вопроса (1-based) среди видимых
export function getQuestionIndex(currentId, userData) {
  const flow = getFlow(userData);
  let idx = 0;
  for (let i = 0; i < flow.length; i++) {
    const q = QUESTIONS[flow[i]];
    if (!q) continue;
    if (q.condition && !q.condition(userData)) continue;
    if (flow[i] === currentId) return idx;
    idx++;
  }
  return 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// VERSE-АЛГОРИТМ — портирован из breathing-lead-bot / verse_analysis.js
// Urgency (40%) × Readiness (35%) × Fit (25%) → сегмент + персональный результат
// ─────────────────────────────────────────────────────────────────────────────

const SEGMENT_WEIGHTS = { urgency: 0.4, readiness: 0.35, fit: 0.25 };
const CHILD_WEIGHTS   = { urgency: 0.5, readiness: 0.3,  fit: 0.2  };

// ── Взрослый: срочность (0–100) ──────────────────────────────────────────────
function calcUrgency(d) {
  let s = 0;

  // Стресс × 4 (0–40)
  s += (Number(d.stress_level) || 0) * 4;

  // Критические проблемы +15 каждая
  const criticalProblems = ['chronic_stress', 'anxiety', 'insomnia', 'high_pressure', 'breathing_issues'];
  (d.current_problems || []).forEach(p => { if (criticalProblems.includes(p)) s += 15; });

  // Хронические заболевания
  const criticalConditions = ['respiratory_diseases', 'cardiovascular_diseases', 'panic_disorder'];
  (d.chronic_conditions || []).filter(c => c !== 'none').forEach(c => {
    s += criticalConditions.includes(c) ? 15 : 8;
  });

  // Частота проблем с дыханием
  s += { constantly: 20, often: 15, sometimes: 10, rarely: 5, never: 0 }[d.breathing_frequency] || 0;

  // Поверхностное дыхание
  s += { yes_often: 12, sometimes: 5, no: 0 }[d.shallow_breathing] || 0;

  // Дыхание в стрессе
  s += { rapid_shallow: 10, breath_holding: 8, air_shortage: 12, mouth_breathing: 10, no_change: 3, conscious_breathing: 0 }[d.stress_breathing] || 0;

  // Профессиональный риск
  s += { office_work: 10, home_work: 5, maternity_leave: 12, student: 8, physical_work: 5, management: 10, retired: 3 }[d.occupation] || 0;

  // Возрастной множитель
  const ageMult = { '18-30': 0.8, '31-45': 1.0, '46-60': 1.2, '60+': 1.3 }[d.age_group] || 1.0;
  s *= ageMult;

  return Math.min(Math.round(s), 100);
}

// ── Взрослый: готовность к практикам (0–100) ─────────────────────────────────
function calcReadiness(d) {
  let s = 20;

  s += { never: 20, few_times: 25, theory_only: 18, sometimes: 15, regularly: 10, expert: 8 }[d.breathing_experience] || 15;
  s += { '3-5_minutes': 30, '10-15_minutes': 25, '20-30_minutes': 15, '30+_minutes': 10 }[d.time_commitment] || 20;

  const specificGoals = ['reduce_stress', 'improve_sleep', 'reduce_anxiety', 'normalize_pressure', 'increase_energy',
    'quick_relaxation', 'stress_resistance', 'improve_breathing', 'improve_focus'];
  const goalCount = (d.main_goals || []).filter(g => specificGoals.includes(g)).length;
  s += Math.min(goalCount * 12, 25);

  if (d.breathing_method === 'mouth') s += 8;
  if (d.shallow_breathing === 'yes_often') s += 10;
  else if (d.shallow_breathing === 'sometimes') s += 5;

  const sleepQ = Number(d.sleep_quality) || 5;
  if (sleepQ <= 3) s += 10;
  else if (sleepQ <= 5) s += 5;

  return Math.min(s, 100);
}

// ── Взрослый: соответствие программе (0–100) ─────────────────────────────────
function calcFit(d) {
  let s = 30;

  const strengths = ['chronic_stress', 'anxiety', 'insomnia', 'high_pressure', 'fatigue', 'concentration_issues', 'breathing_issues'];
  (d.current_problems || []).forEach(p => { if (strengths.includes(p)) s += 10; });

  const strengthGoals = ['reduce_stress', 'improve_sleep', 'reduce_anxiety', 'normalize_pressure', 'increase_energy',
    'quick_relaxation', 'stress_resistance', 'improve_breathing', 'improve_focus'];
  (d.main_goals || []).forEach(g => { if (strengthGoals.includes(g)) s += 8; });

  s += { office_work: 15, home_work: 12, maternity_leave: 15, student: 10, physical_work: 5, management: 12, retired: 8 }[d.occupation] || 5;
  s += { '18-30': 5, '31-45': 15, '46-60': 12, '60+': 8 }[d.age_group] || 8;

  return Math.min(s, 100);
}

function determineSegment(total) {
  if (total >= 80) return 'HOT_LEAD';
  if (total >= 60) return 'WARM_LEAD';
  if (total >= 40) return 'COLD_LEAD';
  return 'NURTURE_LEAD';
}

function identifyPrimaryIssue(d) {
  const priority = {
    panic_attacks: 100, chronic_stress: 90, anxiety: 85, insomnia: 80,
    high_pressure: 75, breathing_issues: 70, fatigue: 60,
    headaches: 50, concentration_issues: 45,
  };
  let top = d.priority_problem || 'chronic_stress';
  let max = priority[top] || 0;
  (d.current_problems || []).forEach(p => {
    if ((priority[p] || 0) > max) { max = priority[p]; top = p; }
  });
  return top;
}

function getProfileName(d) {
  const profiles = {
    office_work: 'Офисный работник в стрессе',
    home_work: 'Фрилансер / работа из дома',
    student: 'Учебный стресс и перегрузки',
    maternity_leave: 'Материнское выгорание',
    physical_work: 'Физический труд и усталость',
    management: 'Руководящий стресс',
    retired: 'Возрастные изменения дыхания',
  };
  return profiles[d.occupation] || 'Профилактика и оздоровление';
}

// ── Персонализированные советы (только Бутейко, без других техник) ─────────────
function buildRecommendations(primaryIssue, segment, d) {
  const tips = [];
  const goals = d.main_goals || [];
  const problems = d.current_problems || [];
  const experience = d.breathing_experience || 'never';
  const isBeginnerFriendly = ['never', 'few_times', 'theory_only'].includes(experience);
  const timeCommit = d.time_commitment || '10-15_minutes';
  const timeLabel = { '3-5_minutes': '3–5 мин', '10-15_minutes': '10–15 мин', '20-30_minutes': '20–30 мин', '30+_minutes': '30+ мин' }[timeCommit] || '10–15 мин';

  // По сегменту — первый совет
  if (segment === 'HOT_LEAD') {
    tips.push('🚨 Начните прямо сегодня — даже одно занятие по Бутейко даёт ощутимый результат');
  } else if (segment === 'WARM_LEAD') {
    tips.push('💪 Регулярность важнее длительности — ' + timeLabel + ' в день по методу Бутейко достаточно для устойчивого результата');
  } else {
    tips.push('🌱 Начните с малого: ' + timeLabel + ' по методу Бутейко утром формируют привычку за 21 день');
  }

  // По главной проблеме
  if (primaryIssue === 'insomnia' || goals.includes('improve_sleep')) {
    tips.push('😴 Вечерние упражнения по Бутейко снижают возбуждение нервной системы и помогают быстрее засыпать');
  }
  if (primaryIssue === 'anxiety' || goals.includes('reduce_anxiety')) {
    tips.push('😌 Метод Бутейко устраняет гипервентиляцию — главную физиологическую причину тревоги и паники');
  }
  if (primaryIssue === 'fatigue' || goals.includes('increase_energy')) {
    tips.push('⚡ Нормализация CO₂ по Бутейко улучшает транспорт кислорода в клетки — энергия растёт без стимуляторов');
  }
  if (primaryIssue === 'high_pressure' || goals.includes('normalize_pressure')) {
    tips.push('❤️ Восстановление носового дыхания по Бутейко мягко снижает давление и нагрузку на сердце');
  }
  if (d.breathing_method === 'mouth') {
    tips.push('👃 Переход на носовое дыхание — первый и самый важный шаг метода Бутейко, меняет паттерн за 2 недели');
  }
  if (primaryIssue === 'breathing_issues' || problems.includes('breathing_issues')) {
    tips.push('🫁 Метод Бутейко разработан именно для устранения одышки и ощущения нехватки воздуха');
  }

  // Хронические заболевания — предостережения
  const conditions = (d.chronic_conditions || []).filter(c => c !== 'none');
  if (conditions.includes('respiratory_diseases')) {
    tips.push('🫁 При астме метод Бутейко особенно эффективен — работаем мягко, с учётом вашего состояния');
  }
  if (conditions.includes('cardiovascular_diseases')) {
    tips.push('💔 При гипертонии занятия по Бутейко проводятся в щадящем режиме — без задержек и форсирования');
  }
  if (conditions.includes('panic_disorder')) {
    tips.push('😰 При ВСД / панических атаках первые занятия по 3–5 минут — желательно с инструктором');
  }

  // Опытный практик
  if (!isBeginnerFriendly) {
    tips.push('🎯 Ваш опыт позволяет сразу работать с углублёнными упражнениями Бутейко');
  }

  return [...new Set(tips)].slice(0, 3);
}

function getCtaText(segment) {
  return {
    HOT_LEAD:    'Записаться на пробное занятие — 1 500 ₽',
    WARM_LEAD:   'Получить персональный план — 1 500 ₽',
    COLD_LEAD:   'Узнать подходящую программу',
    NURTURE_LEAD:'Получить бесплатные материалы',
  }[segment] || 'Записаться на пробное занятие';
}

function urgencyToLevel(urgency) {
  if (urgency >= 70) return 'severe';
  if (urgency >= 45) return 'moderate';
  if (urgency >= 25) return 'mild';
  return 'good';
}

const LEVEL_DATA = {
  good: {
    emoji: '🌟',
    title: 'Дыхание в хорошей форме',
    subtitle: 'Небольшая настройка даст заметный результат',
    description: 'Ваши показатели говорят о том, что дыхательная система работает неплохо. Тем не менее есть резервы: оптимизация дыхания по методу Бутейко повысит качество сна, снизит фоновую усталость и укрепит нервную систему.',
  },
  mild: {
    emoji: '🔆',
    title: 'Есть лёгкие нарушения дыхания',
    subtitle: 'Хорошая новость — это легко исправить',
    description: 'По вашим ответам видны признаки гипервентиляции или ситуативного дыхания ртом. Это типично для городского ритма жизни и хорошо поддаётся коррекции методом Бутейко за 2–4 недели практики.',
  },
  moderate: {
    emoji: '⚠️',
    title: 'Умеренные нарушения дыхания',
    subtitle: 'Пора начать работу — результат будет быстрым',
    description: 'Ваши ответы показывают заметные нарушения паттерна дыхания. Хронический стресс и неправильные привычки создают замкнутый круг. Метод Бутейко разорвёт его за 3–6 недель.',
  },
  severe: {
    emoji: '🚨',
    title: 'Выраженные нарушения дыхания',
    subtitle: 'Нужна персональная работа — я помогу',
    description: 'Комплекс симптомов указывает на серьёзное нарушение паттерна дыхания, влияющее на все системы организма. Метод Бутейко специально создан для таких случаев — изменения заметны уже с первого занятия.',
  },
};

// ── ДЕТСКИЙ ПОТОК ─────────────────────────────────────────────────────────────
function calcChildUrgency(d) {
  let s = 0;
  const ageU = { '3-4': 20, '5-6': 15, '7-8': 12, '9-10': 10, '11-12': 8, '13-15': 15, '16-17': 18 };
  s += ageU[d.child_age_detail] || 10;
  const criticalChild = ['breathing_issues', 'anxiety', 'nightmares', 'hyperactivity', 'sleep_problems'];
  (d.child_problems_detailed || []).forEach(p => { if (criticalChild.includes(p)) s += 20; });
  return Math.min(Math.round(s), 100);
}

function calcChildReadiness(d) {
  let s = 30;
  s += { games_stories: 25, reward_system: 20, family_activities: 30, creative_tasks: 22, adult_explanation: 10 }[d.child_motivation_approach] || 15;
  return Math.min(s, 100);
}

function calcChildFit(d) {
  let s = 40;
  const ageFit = { '3-4': 10, '5-6': 20, '7-8': 25, '9-10': 30, '11-12': 25, '13-15': 15, '16-17': 20 };
  s += ageFit[d.child_age_detail] || 20;
  const childStrengths = ['anxiety', 'hyperactivity', 'sleep_problems', 'concentration_issues', 'breathing_issues'];
  (d.child_problems_detailed || []).forEach(p => { if (childStrengths.includes(p)) s += 12; });
  return Math.min(s, 100);
}

function determineChildSegment(total) {
  if (total >= 75) return 'HOT_LEAD';
  if (total >= 55) return 'WARM_LEAD';
  if (total >= 35) return 'COLD_LEAD';
  return 'NURTURE_LEAD';
}

function buildChildResult(d) {
  const urgency   = calcChildUrgency(d);
  const readiness = calcChildReadiness(d);
  const fit       = calcChildFit(d);
  const total     = Math.round(urgency * CHILD_WEIGHTS.urgency + readiness * CHILD_WEIGHTS.readiness + fit * CHILD_WEIGHTS.fit);
  const segment   = determineChildSegment(total);

  const problems    = d.child_problems_detailed || [];
  const isSmall     = ['3-4', '5-6', '7-8'].includes(d.child_age_detail);
  const isPreventive = problems.includes('prevention') && problems.length === 1;

  if (isPreventive) {
    return {
      level: 'good', emoji: '🌱',
      title: 'Отличная профилактика!',
      subtitle: 'Дыхание ребёнка в норме',
      description: 'Ребёнок в хорошей форме. Дыхательные упражнения Бутейко в виде игры укрепят нервную систему, улучшат концентрацию и иммунитет.',
      segment, scores: { urgency, readiness, fit, total },
      recommendations: [
        isSmall ? '🎮 Игровые упражнения Бутейко — 5 мин/день в формате «дышим как животные»' : '🧘 Утреннее носовое дыхание по Бутейко — 3–5 минут перед школой',
        '🌬️ Носовое дыхание во время прогулок и игр — базовый принцип Бутейко',
        '💤 Дыхательное упражнение перед сном — быстрое засыпание',
      ],
      cta: segment === 'HOT_LEAD' ? 'Записаться на детскую консультацию' : 'Получить детскую программу',
    };
  }

  const hasBreathing = problems.includes('breathing_issues');
  const hasSleep     = problems.includes('sleep_problems') || problems.includes('nightmares');
  const hasAnxiety   = problems.includes('anxiety') || problems.includes('tantrums');
  const hasHyper     = problems.includes('hyperactivity');

  const mainIssue    = hasBreathing ? 'дыхание' : hasSleep ? 'сон и расслабление' : hasAnxiety ? 'тревожность и эмоции' : hasHyper ? 'гиперактивность' : 'общее состояние';
  const urgencyLabel = segment === 'HOT_LEAD' ? 'severe' : segment === 'WARM_LEAD' ? 'moderate' : 'mild';

  const recs = [];
  if (hasSleep)     recs.push('🌙 Дыхательное упражнение Бутейко перед сном — ребёнок засыпает спокойнее');
  if (hasBreathing) recs.push('👃 Тренировка носового дыхания через игры — ключевой принцип Бутейко');
  if (hasAnxiety)   recs.push('🧸 Упражнение «дыхание с игрушкой» на животе — успокаивает за 3–5 минут');
  if (hasHyper)     recs.push('🐢 Игра «Черепаха» по Бутейко — медленное дыхание снимает возбуждение');
  recs.push('📅 3 занятия в неделю по 7–10 минут достаточно для заметного результата');

  return {
    level: urgencyLabel,
    emoji: segment === 'HOT_LEAD' ? '🆘' : '🧒',
    title: segment === 'HOT_LEAD' ? 'Требуется срочная помощь ребёнку' : 'Есть точки роста',
    subtitle: `Особое внимание: ${mainIssue}`,
    description: `По ответам видно, что ребёнку нужна помощь в области: ${mainIssue}. Дыхательные упражнения Бутейко в игровой форме дают результат уже через 2–3 недели.`,
    segment,
    scores: { urgency, readiness, fit, total },
    recommendations: [...new Set(recs)].slice(0, 3),
    cta: segment === 'HOT_LEAD' ? 'Записаться на детскую консультацию' : 'Подобрать детскую программу',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Главная экспортируемая функция
// ─────────────────────────────────────────────────────────────────────────────
export function calculateResult(userData) {
  if (userData.age_group === 'for_child') {
    return buildChildResult(userData);
  }

  const urgency   = calcUrgency(userData);
  const readiness = calcReadiness(userData);
  const fit       = calcFit(userData);
  const total     = Math.round(urgency * SEGMENT_WEIGHTS.urgency + readiness * SEGMENT_WEIGHTS.readiness + fit * SEGMENT_WEIGHTS.fit);
  const segment   = determineSegment(total);
  const primaryIssue = identifyPrimaryIssue(userData);
  const level     = urgencyToLevel(urgency);
  const ld        = LEVEL_DATA[level];
  const recommendations = buildRecommendations(primaryIssue, segment, userData);

  const segmentLabel = {
    HOT_LEAD:    { badge: '🔴 Высокий приоритет', hint: 'Ситуация требует внимания — персональная работа даст быстрый результат' },
    WARM_LEAD:   { badge: '🟡 Хорошая мотивация', hint: 'Вы готовы к изменениям — регулярные занятия дадут результат через неделю' },
    COLD_LEAD:   { badge: '🟢 Умеренный интерес', hint: 'Небольшая настройка дыхания заметно улучшит самочувствие' },
    NURTURE_LEAD:{ badge: '🔵 Профилактика', hint: 'Дыхательные практики как инвестиция в долгосрочное здоровье' },
  }[segment];

  return {
    level,
    segment,
    scores: { urgency, readiness, fit, total },
    segmentLabel,
    emoji: ld.emoji,
    title: ld.title,
    subtitle: ld.subtitle,
    description: ld.description,
    profileName: getProfileName(userData),
    primaryIssue,
    recommendations,
    cta: getCtaText(segment),
    isBeginnerFriendly: ['never', 'few_times', 'theory_only'].includes(userData.breathing_experience || 'never'),
  };
}
