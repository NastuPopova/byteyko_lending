// =============================================
// SURVEY ENGINE — движок анкеты для сайта
// Перенесён из extended_questions.js (бот)
// =============================================

(function () {

  // ---- ВОПРОСЫ ----
  var QUESTIONS = {

    age_group: {
      id: 'age_group', type: 'single', allowBack: false,
      text: 'Расскажите о себе:',
      sub: 'Выберите ваш возраст или укажите, что заполняете для ребёнка.',
      options: [
        { label: '18–30 лет',               value: '18-30' },
        { label: '31–45 лет',               value: '31-45' },
        { label: '46–60 лет',               value: '46-60' },
        { label: '60+ лет',                 value: '60+' },
        { label: '👨‍👩‍👧‍👦 Заполняю для ребёнка', value: 'for_child' }
      ]
    },

    occupation: {
      id: 'occupation', type: 'single', allowBack: true,
      text: 'Основная деятельность:',
      sub: 'Разные виды деятельности создают разные паттерны дыхания и стресса.',
      options: [
        { label: '💻 Офисная работа',         value: 'office_work' },
        { label: '🏠 Работа дома / фриланс',  value: 'home_work' },
        { label: '🏗️ Физический труд',        value: 'physical_work' },
        { label: '🎓 Учёба',                  value: 'student' },
        { label: '👶 В декрете',              value: 'maternity_leave' },
        { label: '🌅 На пенсии',              value: 'retired' },
        { label: '👔 Руководящая должность',  value: 'management' }
      ]
    },

    physical_activity: {
      id: 'physical_activity', type: 'single', allowBack: true,
      text: 'Физическая активность:',
      sub: 'Как часто занимаетесь спортом или физическими упражнениями?',
      options: [
        { label: '🔥 Ежедневно',               value: 'daily' },
        { label: '💪 3–4 раза в неделю',       value: 'regular' },
        { label: '🚶 1–2 раза в неделю',       value: 'sometimes' },
        { label: '📚 Несколько раз в месяц',   value: 'rarely' },
        { label: '🛋️ Практически не занимаюсь', value: 'never' }
      ]
    },

    current_problems: {
      id: 'current_problems', type: 'multiple', allowBack: true,
      minSelections: 1, maxSelections: 3,
      text: 'Какие проблемы беспокоят вас СЕЙЧАС?',
      sub: 'Выберите до 3 наиболее важных. Чем честнее ответы — тем точнее рекомендации.',
      options: [
        { label: '😰 Хронический стресс, напряжение',    value: 'chronic_stress' },
        { label: '😴 Плохой сон, бессонница',            value: 'insomnia' },
        { label: '🫁 Одышка, нехватка воздуха',         value: 'breathing_issues' },
        { label: '💔 Повышенное давление',              value: 'high_pressure' },
        { label: '🤕 Частые головные боли',             value: 'headaches' },
        { label: '😵 Постоянная усталость',             value: 'fatigue' },
        { label: '😨 Тревожность, панические атаки',    value: 'anxiety' },
        { label: '🧠 Проблемы с концентрацией',         value: 'concentration_issues' },
        { label: '🔙 Боли в шее, плечах, спине',        value: 'back_pain' },
        { label: '🍽️ Проблемы с пищеварением',          value: 'digestion_issues' }
      ]
    },

    stress_level: {
      id: 'stress_level', type: 'scale', min: 1, max: 10, allowBack: true,
      text: 'Оцените уровень стресса:',
      sub: '1 — почти нет стресса,  10 — критический, не справляюсь'
    },

    sleep_quality: {
      id: 'sleep_quality', type: 'scale', min: 1, max: 10, allowBack: true,
      text: 'Качество сна за последний месяц:',
      sub: '1 — сплю очень плохо,  10 — высыпаюсь, сон отличный'
    },

    priority_problem: {
      id: 'priority_problem', type: 'single', allowBack: true,
      text: 'Что беспокоит БОЛЬШЕ ВСЕГО прямо сейчас?',
      sub: 'Выберите одну главную проблему, которую хотите решить в первую очередь.',
      options: [
        { label: '😰 Не могу справиться со стрессом',        value: 'chronic_stress' },
        { label: '😴 Плохо сплю, не высыпаюсь',              value: 'insomnia' },
        { label: '🫁 Проблемы с дыханием',                  value: 'breathing_issues' },
        { label: '💔 Высокое давление, проблемы с сердцем',  value: 'high_pressure' },
        { label: '😨 Постоянная тревога, панические атаки',  value: 'anxiety' },
        { label: '😵 Хроническая усталость, нет энергии',   value: 'fatigue' },
        { label: '🧠 Не могу сосредоточиться',              value: 'concentration_issues' }
      ]
    },

    breathing_method: {
      id: 'breathing_method', type: 'single', allowBack: true,
      text: 'Как вы обычно дышите в течение дня?',
      sub: 'Понаблюдайте за своим дыханием прямо сейчас и ответьте честно.',
      options: [
        { label: '👃 В основном носом',                   value: 'nose' },
        { label: '👄 Часто дышу ртом',                    value: 'mouth' },
        { label: '🔄 Попеременно носом и ртом',           value: 'mixed' },
        { label: '🤷 Не обращаю внимания на дыхание',     value: 'unaware' }
      ]
    },

    breathing_frequency: {
      id: 'breathing_frequency', type: 'single', allowBack: true,
      text: 'Как часто замечаете проблемы с дыханием?',
      sub: 'Одышка, нехватка воздуха, учащённое дыхание, дыхание ртом.',
      options: [
        { label: '🔴 Постоянно (каждый день)',              value: 'constantly' },
        { label: '🟡 Часто (несколько раз в неделю)',       value: 'often' },
        { label: '🟠 Периодически (несколько раз в месяц)', value: 'sometimes' },
        { label: '🟢 Редко (несколько раз в год)',          value: 'rarely' },
        { label: '⚪ Никогда не замечаю проблем',           value: 'never' }
      ]
    },

    shallow_breathing: {
      id: 'shallow_breathing', type: 'single', allowBack: true,
      text: 'Замечали поверхностное дыхание или задержки?',
      sub: 'Особенно во время работы, концентрации или стрессовых ситуаций.',
      options: [
        { label: '✅ Да, часто ловлю себя на этом',         value: 'yes_often' },
        { label: '🤔 Иногда замечаю в стрессе',            value: 'sometimes' },
        { label: '❌ Нет, дышу нормально и глубоко',        value: 'no' }
      ]
    },

    stress_breathing: {
      id: 'stress_breathing', type: 'single', allowBack: true,
      text: 'Что происходит с дыханием, когда нервничаете?',
      sub: 'Вспомните последнюю стрессовую ситуацию.',
      options: [
        { label: '💨 Дыхание учащается, становится поверхностным', value: 'rapid_shallow' },
        { label: '⏸️ Начинаю задерживать дыхание',               value: 'breath_holding' },
        { label: '😤 Чувствую нехватку воздуха',                  value: 'air_shortage' },
        { label: '👄 Дышу ртом вместо носа',                      value: 'mouth_breathing' },
        { label: '🤷 Не замечаю изменений',                       value: 'no_change' },
        { label: '🧘 Стараюсь дышать глубже',                    value: 'conscious_breathing' }
      ]
    },

    breathing_experience: {
      id: 'breathing_experience', type: 'single', allowBack: true,
      text: 'Ваш опыт с дыхательными практиками:',
      sub: 'Йога, медитация, специальные дыхательные упражнения.',
      options: [
        { label: '🆕 Никогда не пробовал(а)',                          value: 'never' },
        { label: '🔍 Пробовал(а) пару раз, не пошло',                  value: 'few_times' },
        { label: '📚 Изучал(а) теорию, но не практиковал(а)',          value: 'theory_only' },
        { label: '📅 Иногда практикую (несколько раз в месяц)',        value: 'sometimes' },
        { label: '💪 Практикую регулярно (несколько раз в неделю)',    value: 'regularly' },
        { label: '🎯 Опытный практик (ежедневно)',                     value: 'expert' }
      ]
    },

    time_commitment: {
      id: 'time_commitment', type: 'single', allowBack: true,
      text: 'Время для дыхательных практик:',
      sub: 'Сколько времени готовы уделять ежедневно? Будьте реалистичны!',
      options: [
        { label: '⚡ 3–5 минут (в перерывах, по дороге)',      value: '3-5_minutes' },
        { label: '🎯 10–15 минут (утром или вечером)',          value: '10-15_minutes' },
        { label: '💎 20–30 минут (полноценная практика)',       value: '20-30_minutes' },
        { label: '🏆 30+ минут (глубокое изучение)',           value: '30+_minutes' }
      ]
    },

    format_preferences: {
      id: 'format_preferences', type: 'multiple', allowBack: true,
      minSelections: 1, maxSelections: 4,
      text: 'Удобные форматы изучения:',
      sub: 'Как вам комфортнее изучать дыхательные техники? Выберите до 4.',
      options: [
        { label: '🎥 Видеоуроки с демонстрацией',      value: 'video' },
        { label: '🎧 Аудиопрактики с голосом',         value: 'audio' },
        { label: '📖 Текст с картинками',             value: 'text' },
        { label: '💻 Живые онлайн-занятия',           value: 'online_live' },
        { label: '👨‍⚕️ Индивидуальные консультации',  value: 'individual' },
        { label: '📱 Мобильное приложение',           value: 'mobile_app' }
      ]
    },

    main_goals: {
      id: 'main_goals', type: 'multiple', allowBack: true,
      minSelections: 1, maxSelections: 2,
      text: 'Главные цели на ближайший месяц:',
      sub: 'Выберите максимум 2 самые важные цели.',
      options: [
        { label: '😌 Научиться быстро расслабляться в стрессе', value: 'quick_relaxation' },
        { label: '💪 Повысить стрессоустойчивость',             value: 'stress_resistance' },
        { label: '😨 Избавиться от тревожности и паники',       value: 'reduce_anxiety' },
        { label: '😴 Наладить качественный сон',               value: 'improve_sleep' },
        { label: '⚡ Повысить энергию и работоспособность',     value: 'increase_energy' },
        { label: '💔 Нормализовать давление / пульс',          value: 'normalize_pressure' },
        { label: '🫁 Улучшить работу лёгких и дыхания',       value: 'improve_breathing' },
        { label: '🧠 Улучшить концентрацию внимания',          value: 'improve_focus' },
        { label: '⚖️ Поддержать процесс похудения',           value: 'weight_management' },
        { label: '💚 Общее оздоровление организма',            value: 'general_health' }
      ]
    },

    // ---- БЛОК Ф: АДАПТИВНЫЕ (взрослые) ----

    chronic_conditions: {
      id: 'chronic_conditions', type: 'multiple', allowBack: true,
      minSelections: 1,
      condition: function(a) { return a.age_group !== 'for_child'; },
      text: 'Есть ли у вас хронические заболевания?',
      sub: 'Важно для безопасного подбора техник. Вся информация конфиденциальна.',
      options: [
        { label: '🫁 Астма / бронхит / ХОБЛ',                value: 'respiratory_diseases' },
        { label: '💔 Гипертония / аритмия',                  value: 'cardiovascular_diseases' },
        { label: '🩸 Диабет 1 или 2 типа',                   value: 'diabetes' },
        { label: '🦴 Остеохондроз / грыжи',                  value: 'spine_problems' },
        { label: '🧠 Мигрени / головные боли',               value: 'chronic_headaches' },
        { label: '😰 Панические атаки / ВСД',                value: 'panic_disorder' },
        { label: '🔥 Заболевания щитовидной железы',         value: 'thyroid_diseases' },
        { label: '🍽️ Гастрит / язва / рефлюкс',              value: 'digestive_diseases' },
        { label: '💚 Нет хронических заболеваний',           value: 'none' }
      ]
    },

    current_medications: {
      id: 'current_medications', type: 'single', allowBack: true,
      condition: function(a) {
        return a.age_group !== 'for_child' &&
          Array.isArray(a.chronic_conditions) &&
          a.chronic_conditions.length > 0 &&
          !a.chronic_conditions.includes('none');
      },
      text: 'Принимаете ли вы регулярно медикаменты?',
      sub: 'Некоторые препараты влияют на дыхание и требуют адаптации техник.',
      options: [
        { label: '💊 Да, от давления',                     value: 'pressure_medications' },
        { label: '🫁 Да, ингаляторы / от астмы',          value: 'respiratory_medications' },
        { label: '🧠 Да, успокоительные / антидепрессанты', value: 'mental_medications' },
        { label: '💉 Да, инсулин / от диабета',           value: 'diabetes_medications' },
        { label: '🔥 Да, гормональные препараты',         value: 'hormonal_medications' },
        { label: '💊 Да, другие препараты',               value: 'other_medications' },
        { label: '❌ Не принимаю регулярно',              value: 'no_medications' }
      ]
    },

    panic_experience: {
      id: 'panic_experience', type: 'single', allowBack: true,
      condition: function(a) {
        return a.age_group !== 'for_child' && (
          (a.stress_level >= 7) ||
          (Array.isArray(a.current_problems) && a.current_problems.includes('anxiety')) ||
          a.priority_problem === 'anxiety' ||
          (Array.isArray(a.chronic_conditions) && a.chronic_conditions.includes('panic_disorder'))
        );
      },
      text: 'Были ли у вас панические атаки?',
      sub: 'Это поможет подобрать специальные успокаивающие техники дыхания.',
      options: [
        { label: '🚨 Да, регулярно (раз в неделю и чаще)', value: 'panic_regular' },
        { label: '😟 Да, иногда (раз в месяц)',            value: 'panic_sometimes' },
        { label: '😔 Да, редко (несколько раз в год)',     value: 'panic_rarely' },
        { label: '🤔 Были раньше, сейчас нет',             value: 'panic_past' },
        { label: '✅ Нет, не было',                        value: 'panic_never' }
      ]
    },

    work_environment: {
      id: 'work_environment', type: 'multiple', allowBack: true,
      minSelections: 1, maxSelections: 5,
      condition: function(a) {
        return a.age_group !== 'for_child' &&
          ['office_work', 'home_work', 'management'].includes(a.occupation);
      },
      text: 'Особенности вашей работы:',
      sub: 'Это поможет подобрать техники для рабочего дня. Выберите подходящие.',
      options: [
        { label: '💻 Работаю за компьютером 8+ часов',  value: 'long_computer_work' },
        { label: '📞 Много разговариваю / переговоры',  value: 'frequent_talking' },
        { label: '✈️ Частые перелёты / командировки',  value: 'frequent_travel' },
        { label: '🏢 Работа в душном помещении',        value: 'stuffy_environment' },
        { label: '⏰ Ненормированный график',           value: 'irregular_schedule' },
        { label: '🌙 Ночные смены',                    value: 'night_shifts' },
        { label: '👥 Постоянный стресс от общения',    value: 'social_stress' }
      ]
    },

    weight_goals: {
      id: 'weight_goals', type: 'multiple', allowBack: true,
      minSelections: 1,
      condition: function(a) {
        return a.age_group !== 'for_child' &&
          Array.isArray(a.main_goals) && a.main_goals.includes('weight_management');
      },
      text: 'Цели по снижению веса:',
      sub: 'Расскажите подробнее о ваших целях.',
      options: [
        { label: '📏 Нужно сбросить до 5 кг',                         value: 'up_to_5kg' },
        { label: '📐 Нужно сбросить 5–15 кг',                         value: '5_to_15kg' },
        { label: '📊 Нужно сбросить более 15 кг',                     value: 'more_than_15kg' },
        { label: '🍽️ Проблемы с аппетитом (переедание)',              value: 'appetite_control' },
        { label: '🐌 Медленный обмен веществ',                        value: 'slow_metabolism' },
        { label: '😰 Заедаю стресс',                                  value: 'stress_eating' },
        { label: '🥗 Хочу поддержать диету дыханием',                 value: 'diet_support' },
        { label: '🧘 Интересуют дыхательные методики для фигуры',     value: 'breathing_methods' }
      ]
    },

    // ---- БЛОК Е: ДЕТСКИЙ ПОТОК ----

    child_age_detail: {
      id: 'child_age_detail', type: 'single', allowBack: true,
      condition: function(a) { return a.age_group === 'for_child'; },
      text: 'Уточните возраст ребёнка:',
      sub: 'Возраст важен для подбора подходящих техник и упражнений.',
      options: [
        { label: '👶 3–4 года',   value: '3-4' },
        { label: '🧒 5–6 лет',   value: '5-6' },
        { label: '👦 7–8 лет',   value: '7-8' },
        { label: '👧 9–10 лет',  value: '9-10' },
        { label: '🧑 11–12 лет', value: '11-12' },
        { label: '👨‍🎓 13–15 лет', value: '13-15' },
        { label: '👩‍🎓 16–17 лет', value: '16-17' }
      ]
    },

    child_education_status: {
      id: 'child_education_status', type: 'single', allowBack: true,
      condition: function(a) { return a.age_group === 'for_child'; },
      text: 'Где учится / воспитывается ребёнок?',
      sub: 'Образовательная среда влияет на стресс и дыхательные привычки.',
      options: [
        { label: '🏠 Дома (не посещает учреждения)',                value: 'home_only' },
        { label: '🌟 Частный детский сад',                         value: 'private_kindergarten' },
        { label: '🏢 Государственный детский сад',                 value: 'public_kindergarten' },
        { label: '🎯 Частная школа',                               value: 'private_school' },
        { label: '🏫 Государственная школа',                       value: 'public_school' },
        { label: '🏆 Гимназия / лицей',                           value: 'gymnasium' },
        { label: '💻 Семейное обучение / экстернат',               value: 'homeschooling' },
        { label: '🎨 Альтернативная школа (Монтессори, Вальдорф)', value: 'alternative_school' }
      ]
    },

    child_schedule_stress: {
      id: 'child_schedule_stress', type: 'single', allowBack: true,
      condition: function(a) { return a.age_group === 'for_child'; },
      text: 'Насколько загружен день ребёнка?',
      sub: 'Загруженность влияет на стресс и потребность в релаксации.',
      options: [
        { label: '😌 Свободное расписание, много отдыха',          value: 'relaxed' },
        { label: '🎯 Учёба + 1–2 секции / кружка',                value: 'moderate' },
        { label: '⚡ Учёба + 3–4 дополнительных занятия',         value: 'busy' },
        { label: '🔥 Очень загружен: учёба + много секций',       value: 'overloaded' },
        { label: '📚 Интенсивная подготовка (экзамены, олимпиады)', value: 'intensive' }
      ]
    },

    child_problems_detailed: {
      id: 'child_problems_detailed', type: 'multiple', allowBack: true,
      minSelections: 1, maxSelections: 3,
      condition: function(a) { return a.age_group === 'for_child'; },
      text: 'Что беспокоит в поведении или состоянии ребёнка?',
      sub: 'Выберите до 3 наиболее важных проблем.',
      options: [
        { label: '😭 Частые истерики, капризы',              value: 'tantrums' },
        { label: '😴 Проблемы с засыпанием',                 value: 'sleep_problems' },
        { label: '🌙 Беспокойный сон, кошмары',             value: 'nightmares' },
        { label: '⚡ Гиперактивность, не может усидеть',    value: 'hyperactivity' },
        { label: '😰 Тревожность, страхи',                  value: 'anxiety' },
        { label: '👪 Боится разлуки с родителями',          value: 'separation_anxiety' },
        { label: '📚 Проблемы с концентрацией в учёбе',    value: 'concentration_issues' },
        { label: '👥 Сложности в общении со сверстниками', value: 'social_difficulties' },
        { label: '😤 Агрессивное поведение',                value: 'aggression' },
        { label: '🤧 Частые простуды, слабый иммунитет',  value: 'weak_immunity' },
        { label: '🫁 Астма или проблемы с дыханием',       value: 'breathing_issues' },
        { label: '💚 В целом здоров, профилактика',        value: 'prevention' }
      ]
    },

    child_parent_involvement: {
      id: 'child_parent_involvement', type: 'single', allowBack: true,
      condition: function(a) { return a.age_group === 'for_child'; },
      text: 'Кто будет заниматься с ребёнком дыхательными практиками?',
      sub: 'Это поможет адаптировать программу под ваши возможности.',
      options: [
        { label: '👩 Только мама',                          value: 'mother' },
        { label: '👨 Только папа',                          value: 'father' },
        { label: '👨‍👩‍👧‍👦 Оба родителя по очереди',            value: 'both_parents' },
        { label: '👵 Бабушка / дедушка',                   value: 'grandparent' },
        { label: '🎯 Ребёнок самостоятельно (с контролем)', value: 'child_independent' },
        { label: '👨‍🏫 Планируем групповые занятия',         value: 'group_sessions' }
      ]
    },

    child_motivation_approach: {
      id: 'child_motivation_approach', type: 'single', allowBack: true,
      condition: function(a) { return a.age_group === 'for_child'; },
      text: 'Как лучше мотивировать вашего ребёнка?',
      sub: 'Понимание мотивации поможет сделать практики увлекательными.',
      options: [
        { label: '🎮 Игровая форма, сказки',                value: 'games_stories' },
        { label: '🏆 Система наград и достижений',         value: 'reward_system' },
        { label: '👨‍👩‍👧‍👦 Совместные занятия с родителями',   value: 'family_activities' },
        { label: '📱 Интерактивные приложения',            value: 'digital_interactive' },
        { label: '🎨 Творческие задания',                  value: 'creative_tasks' },
        { label: '📚 Объяснение пользы «по-взрослому»',   value: 'adult_explanation' },
        { label: '👥 Занятия в группе со сверстниками',   value: 'peer_group' }
      ]
    },

    child_time_availability: {
      id: 'child_time_availability', type: 'single', allowBack: true,
      condition: function(a) { return a.age_group === 'for_child'; },
      text: 'Когда удобнее заниматься дыхательными упражнениями?',
      sub: 'Время занятий влияет на эффективность и регулярность.',
      options: [
        { label: '🌅 Утром перед садом / школой (5–10 мин)',       value: 'morning_routine' },
        { label: '🎒 После садика / школы (10–15 мин)',            value: 'after_school' },
        { label: '🍽️ После обеда / полдника',                     value: 'afternoon' },
        { label: '🌆 Вечером перед сном (успокаивающие)',         value: 'before_sleep' },
        { label: '📚 Во время выполнения домашних заданий',       value: 'during_homework' },
        { label: '🎯 В моменты стресса / капризов',              value: 'stress_situations' },
        { label: '🏖️ В выходные дни (больше времени)',           value: 'weekends' }
      ]
    }
  };

  // ---- ПОРЯДКИ ВОПРОСОВ ----
  var ADULT_FLOW = [
    'age_group','occupation','physical_activity',
    'current_problems','stress_level','sleep_quality','priority_problem',
    'breathing_method','breathing_frequency','shallow_breathing','stress_breathing',
    'breathing_experience','time_commitment','format_preferences','main_goals'
  ];

  var CHILD_FLOW = [
    'age_group',
    'child_age_detail','child_education_status','child_schedule_stress',
    'child_problems_detailed','child_parent_involvement',
    'child_motivation_approach','child_time_availability'
  ];

  var ADAPTIVE_FLOW = [
    'chronic_conditions','current_medications','panic_experience',
    'work_environment','weight_goals'
  ];

  // ---- КЛАСС ENGINE ----
  function SurveyEngine() {
    this.answers  = {};
    this.history  = [];
  }

  SurveyEngine.prototype.start = function() {
    this.answers = {};
    this.history = [];
    return 'age_group';
  };

  SurveyEngine.prototype.getQuestion = function(id) {
    return QUESTIONS[id] || null;
  };

  SurveyEngine.prototype.saveAnswer = function(id, value) {
    this.answers[id] = value;
  };

  SurveyEngine.prototype._isChild = function() {
    return this.answers.age_group === 'for_child';
  };

  SurveyEngine.prototype.getNext = function(currentId) {
    var a = this.answers;
    var isChild = this._isChild();

    // Запоминаем историю
    if (this.history[this.history.length - 1] !== currentId) {
      this.history.push(currentId);
    }

    // Первый вопрос — разветвление
    if (currentId === 'age_group') {
      return isChild ? 'child_age_detail' : 'occupation';
    }

    // Детский поток
    if (isChild) {
      var ci = CHILD_FLOW.indexOf(currentId);
      if (ci !== -1 && ci < CHILD_FLOW.length - 1) return CHILD_FLOW[ci + 1];
      return null; // конец
    }

    // Взрослый поток
    var ai = ADULT_FLOW.indexOf(currentId);
    if (ai !== -1 && ai < ADULT_FLOW.length - 1) return ADULT_FLOW[ai + 1];

    // Адаптивные вопросы
    var startIdx = 0;
    var adaptiveIdx = ADAPTIVE_FLOW.indexOf(currentId);
    if (adaptiveIdx !== -1) startIdx = adaptiveIdx + 1;

    for (var i = startIdx; i < ADAPTIVE_FLOW.length; i++) {
      var qid = ADAPTIVE_FLOW[i];
      var q   = QUESTIONS[qid];
      if (!q.condition || q.condition(a)) return qid;
    }

    return null; // анкета завершена
  };

  SurveyEngine.prototype.goBack = function() {
    if (this.history.length === 0) return null;
    var prev = this.history.pop();
    return prev;
  };

  SurveyEngine.prototype.getProgress = function(currentId) {
    var isChild = this._isChild();
    var flow    = isChild ? CHILD_FLOW : ADULT_FLOW;
    var total   = flow.length;

    // Для взрослых добавляем применимые адаптивные
    if (!isChild) {
      var a = this.answers;
      ADAPTIVE_FLOW.forEach(function(qid) {
        var q = QUESTIONS[qid];
        if (!q.condition || q.condition(a)) total++;
      });
    }

    var current = flow.indexOf(currentId) + 1;
    if (current === 0) current = flow.length + ADAPTIVE_FLOW.indexOf(currentId) + 1;
    if (current <= 0) current = 1;

    return {
      current: current,
      total:   total,
      pct:     Math.round((current / total) * 100)
    };
  };

  // Экспорт глобально
  window.SurveyEngine = SurveyEngine;

})();
