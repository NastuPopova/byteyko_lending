// =============================================
// ВОПРОСЫ АНКЕТЫ ДИАГНОСТИКИ ДЫХАНИЯ
// Перенесено из breathing-lead-bot/modules/survey/
// =============================================

(function (global) {

  // --- ДАННЫЕ ВОПРОСОВ ---

  var QUESTIONS = {

    // ── БЛОК А: ДЕМОГРАФИЯ ──────────────────────────
    age_group: {
      id: 'age_group',
      text: '📅 Расскажите о себе:',
      sub: 'Выберите ваш возраст или укажите, что заполняете анкету для ребёнка.',
      type: 'single',
      options: [
        { label: '👨‍💼 18–30 лет',                value: '18-30' },
        { label: '👩‍💼 31–45 лет',               value: '31-45' },
        { label: '👨‍🦳 46–60 лет',               value: '46-60' },
        { label: '👴 60+ лет',                  value: '60+' },
        { label: '👨‍👩‍👧‍👦 Заполняю для ребёнка', value: 'for_child' }
      ],
      allowBack: false
    },

    occupation: {
      id: 'occupation',
      text: '💼 Основная деятельность:',
      sub: 'Разные виды деятельности создают разные паттерны дыхания и стресса.',
      type: 'single',
      options: [
        { label: '💻 Офисная работа',           value: 'office_work' },
        { label: '🏠 Работа дома / фриланс',   value: 'home_work' },
        { label: '🏗️ Физический труд',         value: 'physical_work' },
        { label: '🎓 Учёба',                   value: 'student' },
        { label: '👶 В декрете',               value: 'maternity_leave' },
        { label: '🌅 На пенсии',               value: 'retired' },
        { label: '👔 Руководящая должность',   value: 'management' }
      ],
      allowBack: true
    },

    physical_activity: {
      id: 'physical_activity',
      text: '🏃 Физическая активность:',
      sub: 'Как часто занимаетесь спортом или физическими упражнениями?',
      type: 'single',
      options: [
        { label: '🔥 Ежедневно',                        value: 'daily' },
        { label: '💪 3–4 раза в неделю',               value: 'regular' },
        { label: '🚶 1–2 раза в неделю',               value: 'sometimes' },
        { label: '📚 Несколько раз в месяц',           value: 'rarely' },
        { label: '🛋️ Практически не занимаюсь',       value: 'never' }
      ],
      allowBack: true
    },

    // ── БЛОК Б: ПРОБЛЕМЫ ────────────────────────────
    current_problems: {
      id: 'current_problems',
      text: '⚠️ Какие проблемы беспокоят вас СЕЙЧАС?',
      sub: 'Выберите до 3 наиболее важных проблем.',
      type: 'multiple',
      maxSelections: 3,
      minSelections: 1,
      options: [
        { label: '😰 Хронический стресс, напряжение',   value: 'chronic_stress' },
        { label: '😴 Плохой сон, бессонница',          value: 'insomnia' },
        { label: '🫁 Одышка, нехватка воздуха',       value: 'breathing_issues' },
        { label: '💔 Повышенное давление',             value: 'high_pressure' },
        { label: '🤕 Частые головные боли',           value: 'headaches' },
        { label: '😵 Постоянная усталость',           value: 'fatigue' },
        { label: '😨 Тревожность, панические атаки',  value: 'anxiety' },
        { label: '🧠 Проблемы с концентрацией',       value: 'concentration_issues' },
        { label: '🔙 Боли в шее, плечах, спине',     value: 'back_pain' },
        { label: '🍽️ Проблемы с пищеварением',       value: 'digestion_issues' }
      ],
      allowBack: true
    },

    stress_level: {
      id: 'stress_level',
      text: '😰 Оцените уровень стресса:',
      sub: 'Насколько часто вы испытываете стресс по шкале от 1 до 10?\n1–3: Низкий · 4–6: Умеренный · 7–10: Высокий',
      type: 'scale',
      min: 1, max: 10,
      allowBack: true
    },

    sleep_quality: {
      id: 'sleep_quality',
      text: '😴 Качество сна за последний месяц:',
      sub: '1 — сплю очень плохо, постоянно просыпаюсь\n10 — сон отличный, высыпаюсь и чувствую себя бодро',
      type: 'scale',
      min: 1, max: 10,
      allowBack: true
    },

    priority_problem: {
      id: 'priority_problem',
      text: '🎯 Что беспокоит БОЛЬШЕ ВСЕГО прямо сейчас?',
      sub: 'Выберите одну главную проблему, которую хотите решить в первую очередь.',
      type: 'single',
      options: [
        { label: '😰 Не могу справиться со стрессом',            value: 'chronic_stress' },
        { label: '😴 Плохо сплю, не высыпаюсь',                 value: 'insomnia' },
        { label: '🫁 Проблемы с дыханием',                     value: 'breathing_issues' },
        { label: '💔 Высокое давление, проблемы с сердцем',    value: 'high_pressure' },
        { label: '😨 Постоянная тревога, панические атаки',    value: 'anxiety' },
        { label: '😵 Хроническая усталость, нет энергии',      value: 'fatigue' },
        { label: '🧠 Не могу сосредоточиться',                 value: 'concentration_issues' }
      ],
      allowBack: true
    },

    // ── БЛОК В: ДЫХАНИЕ ─────────────────────────────
    breathing_method: {
      id: 'breathing_method',
      text: '👃 Как вы обычно дышите в течение дня?',
      sub: 'Понаблюдайте за своим дыханием прямо сейчас и ответьте честно.',
      type: 'single',
      options: [
        { label: '👃 В основном носом',                       value: 'nose' },
        { label: '👄 Часто дышу ртом',                       value: 'mouth' },
        { label: '🔄 Попеременно носом и ртом',              value: 'mixed' },
        { label: '🤷 Не обращаю внимания на дыхание',        value: 'unaware' }
      ],
      allowBack: true
    },

    breathing_frequency: {
      id: 'breathing_frequency',
      text: '🫁 Как часто замечаете проблемы с дыханием?',
      sub: 'Проблемы: одышка, нехватка воздуха, учащённое дыхание, дыхание ртом.',
      type: 'single',
      options: [
        { label: '🔴 Постоянно (каждый день)',                 value: 'constantly' },
        { label: '🟡 Часто (несколько раз в неделю)',         value: 'often' },
        { label: '🟠 Периодически (несколько раз в месяц)',   value: 'sometimes' },
        { label: '🟢 Редко (несколько раз в год)',            value: 'rarely' },
        { label: '⚪ Никогда не замечаю проблем',             value: 'never' }
      ],
      allowBack: true
    },

    shallow_breathing: {
      id: 'shallow_breathing',
      text: '💨 Замечали ли поверхностное дыхание или задержки?',
      sub: 'Особенно во время работы, концентрации или стрессовых ситуаций.',
      type: 'single',
      options: [
        { label: '✅ Да, часто ловлю себя на этом',          value: 'yes_often' },
        { label: '🤔 Иногда замечаю в стрессе',             value: 'sometimes' },
        { label: '❌ Нет, дышу нормально и глубоко',        value: 'no' }
      ],
      allowBack: true
    },

    stress_breathing: {
      id: 'stress_breathing',
      text: '😰 Что происходит с дыханием, когда нервничаете?',
      sub: 'Вспомните последнюю стрессовую ситуацию.',
      type: 'single',
      options: [
        { label: '💨 Дыхание учащается, становится поверхностным', value: 'rapid_shallow' },
        { label: '⏸️ Начинаю задерживать дыхание',               value: 'breath_holding' },
        { label: '😤 Чувствую нехватку воздуха',                 value: 'air_shortage' },
        { label: '👄 Дышу ртом вместо носа',                    value: 'mouth_breathing' },
        { label: '🤷 Не замечаю изменений',                     value: 'no_change' },
        { label: '🧘 Стараюсь дышать глубже',                   value: 'conscious_breathing' }
      ],
      allowBack: true
    },

    // ── БЛОК Г: ОПЫТ И ЦЕЛИ ─────────────────────────
    breathing_experience: {
      id: 'breathing_experience',
      text: '🧘 Ваш опыт с дыхательными практиками:',
      sub: 'Йога, медитация, специальные дыхательные упражнения.',
      type: 'single',
      options: [
        { label: '🆕 Никогда не пробовал(а)',                          value: 'never' },
        { label: '🔍 Пробовал(а) пару раз, не пошло',                 value: 'few_times' },
        { label: '📚 Изучал(а) теорию, но не практиковал(а)',         value: 'theory_only' },
        { label: '📅 Иногда практикую (несколько раз в месяц)',       value: 'sometimes' },
        { label: '💪 Практикую регулярно (несколько раз в неделю)',   value: 'regularly' },
        { label: '🎯 Опытный практик (ежедневно)',                     value: 'expert' }
      ],
      allowBack: true
    },

    time_commitment: {
      id: 'time_commitment',
      text: '⏰ Время для дыхательных практик:',
      sub: 'Сколько времени готовы уделять ежедневно? Будьте реалистичны!',
      type: 'single',
      options: [
        { label: '⚡ 3–5 минут (в перерывах, по дороге)',     value: '3-5_minutes' },
        { label: '🎯 10–15 минут (утром или вечером)',        value: '10-15_minutes' },
        { label: '💎 20–30 минут (полноценная практика)',    value: '20-30_minutes' },
        { label: '🏆 30+ минут (глубокое изучение)',         value: '30+_minutes' }
      ],
      allowBack: true
    },

    format_preferences: {
      id: 'format_preferences',
      text: '📱 Удобные форматы изучения:',
      sub: 'Как вам комфортнее изучать дыхательные техники? Можно выбрать до 4 форматов.',
      type: 'multiple',
      maxSelections: 4,
      minSelections: 1,
      options: [
        { label: '🎥 Видеоуроки с демонстрацией',           value: 'video' },
        { label: '🎧 Аудиопрактики с голосом',              value: 'audio' },
        { label: '📖 Текст с картинками',                  value: 'text' },
        { label: '💻 Живые онлайн-занятия',               value: 'online_live' },
        { label: '👨‍⚕️ Индивидуальные консультации',      value: 'individual' },
        { label: '📱 Мобильное приложение',               value: 'mobile_app' }
      ],
      allowBack: true
    },

    main_goals: {
      id: 'main_goals',
      text: '🎯 Главные цели на ближайший месяц:',
      sub: 'Выберите максимум 2 самые важные цели.',
      type: 'multiple',
      maxSelections: 2,
      minSelections: 1,
      options: [
        { label: '😌 Научиться быстро расслабляться в стрессе', value: 'quick_relaxation' },
        { label: '💪 Повысить стрессоустойчивость',             value: 'stress_resistance' },
        { label: '😨 Избавиться от тревожности и паники',      value: 'reduce_anxiety' },
        { label: '😴 Наладить качественный сон',               value: 'improve_sleep' },
        { label: '⚡ Повысить энергию и работоспособность',    value: 'increase_energy' },
        { label: '💔 Нормализовать давление / пульс',          value: 'normalize_pressure' },
        { label: '🫁 Улучшить работу лёгких и дыхания',       value: 'improve_breathing' },
        { label: '🧠 Улучшить концентрацию внимания',          value: 'improve_focus' },
        { label: '⚖️ Поддержать процесс похудения',           value: 'weight_management' },
        { label: '💚 Общее оздоровление организма',            value: 'general_health' }
      ],
      allowBack: true
    },

    // ── БЛОК Д: ХРОНИЧЕСКИЕ ЗАБОЛЕВАНИЯ ─────────────
    chronic_conditions: {
      id: 'chronic_conditions',
      text: '🏥 Есть ли у вас хронические заболевания?',
      sub: 'Это важно для безопасного подбора дыхательных техник. Вся информация конфиденциальна.',
      type: 'multiple',
      maxSelections: 9,
      minSelections: 1,
      condition: function(d) { return d.age_group !== 'for_child'; },
      options: [
        { label: '🫁 Астма / бронхит / ХОБЛ',              value: 'respiratory_diseases' },
        { label: '💔 Гипертония / аритмия',                value: 'cardiovascular_diseases' },
        { label: '🩸 Диабет 1 или 2 типа',               value: 'diabetes' },
        { label: '🦴 Остеохондроз / грыжи',              value: 'spine_problems' },
        { label: '🧠 Мигрени / головные боли',           value: 'chronic_headaches' },
        { label: '😰 Панические атаки / ВСД',            value: 'panic_disorder' },
        { label: '🔥 Заболевания щитовидной железы',     value: 'thyroid_diseases' },
        { label: '🍽️ Гастрит / язва / рефлюкс',        value: 'digestive_diseases' },
        { label: '💚 Нет хронических заболеваний',       value: 'none' }
      ],
      allowBack: true
    },

    // ── БЛОК Е: ДЕТСКИЕ ВОПРОСЫ ─────────────────────
    child_age_detail: {
      id: 'child_age_detail',
      text: '👶 Уточните возраст ребёнка:',
      sub: 'Возраст важен для подбора подходящих техник и упражнений.',
      type: 'single',
      condition: function(d) { return d.age_group === 'for_child'; },
      options: [
        { label: '👶 3–4 года',   value: '3-4' },
        { label: '🧒 5–6 лет',   value: '5-6' },
        { label: '👦 7–8 лет',   value: '7-8' },
        { label: '👧 9–10 лет',  value: '9-10' },
        { label: '🧑 11–12 лет', value: '11-12' },
        { label: '👨‍🎓 13–15 лет', value: '13-15' },
        { label: '👩‍🎓 16–17 лет', value: '16-17' }
      ],
      allowBack: true
    },

    child_problems_detailed: {
      id: 'child_problems_detailed',
      text: '🎭 Что беспокоит в поведении или состоянии ребёнка?',
      sub: 'Выберите до 3 наиболее важных проблем для точного подбора техник.',
      type: 'multiple',
      maxSelections: 3,
      minSelections: 1,
      condition: function(d) { return d.age_group === 'for_child'; },
      options: [
        { label: '😭 Частые истерики, капризы',            value: 'tantrums' },
        { label: '😴 Проблемы с засыпанием',              value: 'sleep_problems' },
        { label: '🌙 Беспокойный сон, кошмары',          value: 'nightmares' },
        { label: '⚡ Гиперактивность, не может усидеть', value: 'hyperactivity' },
        { label: '😰 Тревожность, страхи',               value: 'anxiety' },
        { label: '👪 Боится разлуки с родителями',       value: 'separation_anxiety' },
        { label: '📚 Проблемы с концентрацией в учёбе',  value: 'concentration_issues' },
        { label: '👥 Сложности в общении со сверстниками', value: 'social_difficulties' },
        { label: '😤 Агрессивное поведение',             value: 'aggression' },
        { label: '🤧 Частые простуды, слабый иммунитет', value: 'weak_immunity' },
        { label: '🫁 Астма или проблемы с дыханием',    value: 'breathing_issues' },
        { label: '💚 В целом здоров, профилактика',      value: 'prevention' }
      ],
      allowBack: true
    },

    child_parent_involvement: {
      id: 'child_parent_involvement',
      text: '👨‍👩‍👧‍👦 Кто будет заниматься с ребёнком дыхательными практиками?',
      sub: 'Это поможет адаптировать программу под ваши возможности.',
      type: 'single',
      condition: function(d) { return d.age_group === 'for_child'; },
      options: [
        { label: '👩 Только мама',                              value: 'mother' },
        { label: '👨 Только папа',                             value: 'father' },
        { label: '👨‍👩‍👧‍👦 Оба родителя по очереди',           value: 'both_parents' },
        { label: '👵 Бабушка / дедушка',                       value: 'grandparent' },
        { label: '🎯 Ребёнок самостоятельно (с контролем)',    value: 'child_independent' }
      ],
      allowBack: true
    }
  };

  // --- ПОРЯДОК ВОПРОСОВ ---

  var STANDARD_FLOW = [
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
    'chronic_conditions'
  ];

  var CHILD_FLOW = [
    'age_group',
    'child_age_detail',
    'child_problems_detailed',
    'child_parent_involvement'
  ];

  // --- ДВИЖОК АНКЕТЫ ---

  function SurveyEngine() {
    this.answers = {};
    this.history = [];  // стек пройденных id
  }

  SurveyEngine.prototype.isChildFlow = function () {
    return this.answers.age_group === 'for_child';
  };

  SurveyEngine.prototype.getFlow = function () {
    return this.isChildFlow() ? CHILD_FLOW : STANDARD_FLOW;
  };

  // Возвращает id первого вопроса
  SurveyEngine.prototype.start = function () {
    this.answers = {};
    this.history = [];
    return this.getFlow()[0];
  };

  // Следующий вопрос после текущего с учётом условий
  SurveyEngine.prototype.getNext = function (currentId) {
    var flow = this.getFlow();
    var idx = flow.indexOf(currentId);
    for (var i = idx + 1; i < flow.length; i++) {
      var q = QUESTIONS[flow[i]];
      if (!q) continue;
      if (!q.condition || q.condition(this.answers)) return flow[i];
    }
    return null; // анкета завершена
  };

  // Предыдущий вопрос (из истории)
  SurveyEngine.prototype.getPrev = function () {
    if (this.history.length < 2) return null;
    return this.history[this.history.length - 2];
  };

  SurveyEngine.prototype.saveAnswer = function (questionId, value) {
    this.answers[questionId] = value;
    // Добавляем в историю только если ещё нет
    if (this.history[this.history.length - 1] !== questionId) {
      this.history.push(questionId);
    }
  };

  SurveyEngine.prototype.goBack = function () {
    if (this.history.length < 2) return null;
    this.history.pop(); // убираем текущий
    var prev = this.history[this.history.length - 1];
    delete this.answers[prev]; // сбрасываем ответ на него
    return prev;
  };

  SurveyEngine.prototype.getQuestion = function (id) {
    return QUESTIONS[id] || null;
  };

  SurveyEngine.prototype.getProgress = function (currentId) {
    var flow = this.getFlow();
    var visibleFlow = flow.filter(function (id) {
      var q = QUESTIONS[id];
      return q && (!q.condition || q.condition(this.answers));
    }, this);
    var idx = visibleFlow.indexOf(currentId);
    var current = Math.max(0, idx);
    return {
      current: current + 1,
      total: visibleFlow.length,
      pct: Math.round(((current) / visibleFlow.length) * 100)
    };
  };

  // --- Экспорт ---
  global.SurveyEngine = SurveyEngine;
  global.SURVEY_QUESTIONS = QUESTIONS;

})(window);
