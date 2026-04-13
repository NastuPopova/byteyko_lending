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
