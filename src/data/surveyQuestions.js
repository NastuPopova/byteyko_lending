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

// ─────────────────────────────────────────────
// АЛГОРИТМ ПОДСЧЁТА РЕЗУЛЬТАТА
// ─────────────────────────────────────────────

/**
 * Вычисляет «индекс нарушения дыхания» (0–100).
 * Чем выше — тем серьёзнее проблема.
 * Затем на основе индекса + приоритетной проблемы
 * выдаётся персонализированный результат.
 */
export function calculateResult(userData) {
  // ── Детский поток ────────────────────────────────────────────────
  if (userData.age_group === 'for_child') {
    const childAge = userData.child_age_detail || '';
    const problems = Array.isArray(userData.child_problems_detailed)
      ? userData.child_problems_detailed
      : [];
    const isSmall = ['3-4', '5-6', '7-8'].includes(childAge);

    const hasSleep = problems.includes('sleep_problems') || problems.includes('nightmares');
    const hasBreathing = problems.includes('breathing_issues');
    const hasAnxiety = problems.includes('anxiety') || problems.includes('tantrums');
    const isPreventive = problems.includes('prevention');

    if (isPreventive) {
      return {
        level: 'good',
        emoji: '🌱',
        title: 'Отличная профилактика!',
        subtitle: 'Дыхание ребёнка в норме',
        description: 'Ребёнок в хорошей форме. Дыхательные практики в виде игры помогут укрепить нервную систему, улучшить концентрацию и иммунитет.',
        recommendations: [
          isSmall ? '🎮 «Дышим как животные» — игровые упражнения 5 мин/день' : '🧘 Утреннее дыхание носом — 3–5 минут перед школой',
          '🌬️ Носовое дыхание во время прогулок и игр',
          '💤 Дыхательная медитация перед сном — легко засыпать',
        ],
        cta: 'Получить детскую программу',
      };
    }

    const mainIssue = hasBreathing
      ? 'дыхание'
      : hasSleep
      ? 'сон и расслабление'
      : hasAnxiety
      ? 'тревожность и эмоции'
      : 'общее состояние';

    return {
      level: 'moderate',
      emoji: '🧒',
      title: 'Есть точки роста',
      subtitle: `Особое внимание: ${mainIssue}`,
      description: `По ответам видно, что ребёнку нужна помощь в области: ${mainIssue}. Дыхательные упражнения в игровой форме дают результат уже через 2–3 недели.`,
      recommendations: [
        hasSleep ? '🌙 «Дыхание 4-4-4» перед сном — засыпание за 10 минут' : '🎯 Игровые дыхательные паузы в течение дня',
        hasBreathing ? '👃 Тренировка носового дыхания через игры с перьями/мыльными пузырями' : '🎮 Дыхательные истории — метод «Дракончик»',
        '📅 3 занятия в неделю по 7–10 минут достаточно для заметного результата',
      ],
      cta: 'Подобрать детскую программу',
    };
  }

  // ── Взрослый поток ────────────────────────────────────────────────

  // Считаем индекс нарушения (0–100)
  let score = 0;

  // Стресс (0–10) → вес ×4
  const stressLevel = Number(userData.stress_level) || 0;
  score += stressLevel * 4;

  // Качество сна (инвертированное) → вес ×3
  const sleepQuality = Number(userData.sleep_quality) || 5;
  score += (10 - sleepQuality) * 3;

  // Способ дыхания
  const breathingMethodScore = {
    nose: 0,
    mixed: 8,
    mouth: 18,
    unaware: 12,
  }[userData.breathing_method] || 0;
  score += breathingMethodScore;

  // Частота проблем с дыханием
  const breathingFreqScore = {
    never: 0,
    rarely: 4,
    sometimes: 8,
    often: 14,
    constantly: 20,
  }[userData.breathing_frequency] || 0;
  score += breathingFreqScore;

  // Поверхностное дыхание
  const shallowScore = {
    no: 0,
    sometimes: 5,
    yes_often: 12,
  }[userData.shallow_breathing] || 0;
  score += shallowScore;

  // Дыхание в стрессе
  const stressBreathScore = {
    conscious_breathing: 0,
    no_change: 3,
    breath_holding: 8,
    rapid_shallow: 10,
    air_shortage: 12,
    mouth_breathing: 10,
  }[userData.stress_breathing] || 0;
  score += stressBreathScore;

  // Физическая активность (чем меньше — тем хуже)
  const activityScore = {
    daily: 0,
    regular: 0,
    sometimes: 3,
    rarely: 6,
    never: 10,
  }[userData.physical_activity] || 0;
  score += activityScore;

  // Хронические заболевания — небольшой бонус к тяжести
  const conditions = Array.isArray(userData.chronic_conditions) ? userData.chronic_conditions : [];
  if (!conditions.includes('none') && conditions.length > 0) {
    score += Math.min(conditions.length * 3, 12);
  }

  // Нормируем в диапазон 0–100
  // Теоретический максимум ≈ 157, но на практике ~120
  const normalized = Math.min(100, Math.round((score / 110) * 100));

  // ── Определяем уровень ──────────────────────────────────────────
  let level;
  if (normalized <= 25) level = 'good';
  else if (normalized <= 50) level = 'mild';
  else if (normalized <= 72) level = 'moderate';
  else level = 'severe';

  // ── Приоритетная проблема для персонализации ────────────────────
  const priority = userData.priority_problem || 'chronic_stress';
  const goals = Array.isArray(userData.main_goals) ? userData.main_goals : [];
  const experience = userData.breathing_experience || 'never';
  const timeCommit = userData.time_commitment || '10-15_minutes';

  const isBeginnerFriendly = ['never', 'few_times', 'theory_only'].includes(experience);

  // ── Рекомендации по приоритетной проблеме ───────────────────────
  const techniqueByPriority = {
    chronic_stress: {
      name: 'Техника 4-7-8',
      desc: 'вдох 4 сек → задержка 7 → выдох 8. Снижает кортизол за 5 минут',
    },
    insomnia: {
      name: 'Метод «Военного засыпания»',
      desc: 'диафрагмальное дыхание + прогрессивное расслабление — засыпание за 10–15 мин',
    },
    breathing_issues: {
      name: 'Метод Бутейко',
      desc: 'уменьшение объёма дыхания, восстановление нормы CO₂ — убирает одышку',
    },
    high_pressure: {
      name: 'Резонансное дыхание 5–5',
      desc: 'вдох 5 сек + выдох 5 сек — снижает давление на 5–10 мм рт.ст. за сеанс',
    },
    anxiety: {
      name: 'Физиологический вздох',
      desc: 'двойной вдох носом + долгий выдох ртом — снимает тревогу за 1–2 минуты',
    },
    fatigue: {
      name: 'Капалабхати (облегчённая)',
      desc: 'ритмичные короткие выдохи — активирует симпатику, даёт бодрость без кофеина',
    },
    concentration_issues: {
      name: 'Дыхание 4-4-4-4 (box breathing)',
      desc: 'квадратное дыхание — техника Navy SEALs для фокуса и ясности мышления',
    },
  };

  const technique = techniqueByPriority[priority] || techniqueByPriority['chronic_stress'];

  // ── Время практики ───────────────────────────────────────────────
  const timeMap = {
    '3-5_minutes': '3–5 минут в день',
    '10-15_minutes': '10–15 минут утром',
    '20-30_minutes': '20–30 минут — полноценный сеанс',
    '30+_minutes': '30+ минут — углублённая практика',
  };
  const timeLabel = timeMap[timeCommit] || '10–15 минут в день';

  // ── Дополнительные рекомендации по целям ────────────────────────
  const extraTips = [];
  if (goals.includes('improve_sleep') || priority === 'insomnia') {
    extraTips.push('😴 Дыхание 4-7-8 за 20 минут до сна — засыпание ускоряется втрое');
  }
  if (goals.includes('reduce_anxiety') || priority === 'anxiety') {
    extraTips.push('😌 Физиологический вздох в момент тревоги — работает за 30 секунд');
  }
  if (goals.includes('increase_energy') || priority === 'fatigue') {
    extraTips.push('⚡ Утреннее дыхание через нос — активирует симпатическую нервную систему');
  }
  if (goals.includes('normalize_pressure') || priority === 'high_pressure') {
    extraTips.push('❤️ Резонансное дыхание 5+5 — снижает давление без таблеток');
  }
  if (userData.breathing_method === 'mouth') {
    extraTips.push('👃 Tape-метод ночью — безопасно переключает на носовое дыхание во сне');
  }

  // Дополняем до 3 советов
  const fallbackTips = [
    '🧘 Диафрагмальное дыхание — основа всех техник, начните с него',
    isBeginnerFriendly
      ? '📱 Начните с 3 минут в день — малый старт даёт большой результат'
      : '💪 Ваш опыт позволяет быстро освоить продвинутые техники',
    `⏰ ${timeLabel} — оптимальный режим для вашего графика`,
  ];
  while (extraTips.length < 3) {
    const tip = fallbackTips.shift();
    if (tip && !extraTips.includes(tip)) extraTips.push(tip);
  }

  // ── Итоговые объекты по уровню ───────────────────────────────────
  const levelData = {
    good: {
      emoji: '🌟',
      title: 'Дыхание в хорошей форме',
      subtitle: 'Небольшая настройка даст заметный результат',
      description:
        `Ваши показатели говорят о том, что дыхательная система работает неплохо. Тем не менее есть резервы: оптимизация дыхания повысит качество сна, снизит фоновую усталость и укрепит нервную систему.`,
    },
    mild: {
      emoji: '🔆',
      title: 'Есть лёгкие нарушения дыхания',
      subtitle: 'Хорошая новость — это легко исправить',
      description:
        `По вашим ответам видны признаки гипервентиляции или ситуативного дыхания ртом. Это типично для городского ритма жизни и хорошо поддаётся коррекции за 2–4 недели практики.`,
    },
    moderate: {
      emoji: '⚠️',
      title: 'Умеренные нарушения дыхания',
      subtitle: 'Пора начать работу — результат будет быстрым',
      description:
        `Ваши ответы показывают заметные нарушения паттерна дыхания. Хронический стресс и неправильные привычки дыхания создают замкнутый круг. Метод Бутейко и целевые техники разорвут его за 3–6 недель.`,
    },
    severe: {
      emoji: '🚨',
      title: 'Выраженные нарушения дыхания',
      subtitle: 'Нужна персональная работа — я помогу',
      description:
        `Комплекс симптомов указывает на серьёзное нарушение паттерна дыхания. Это влияет на все системы организма. Хорошая новость: метод Бутейко специально разработан для таких случаев — изменения заметны уже с первого занятия.`,
    },
  };

  const ld = levelData[level];

  return {
    level,
    score: normalized,
    emoji: ld.emoji,
    title: ld.title,
    subtitle: ld.subtitle,
    description: ld.description,
    technique,
    recommendations: extraTips.slice(0, 3),
    cta: level === 'severe' || level === 'moderate'
      ? 'Записаться на пробное занятие'
      : 'Получить персональный план',
    timeLabel,
    isBeginnerFriendly,
  };
}
