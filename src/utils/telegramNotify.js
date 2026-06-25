const BOT_URL = 'https://buteyko-api.bothost.tech/notify-lead';
const PURCHASE_URL = 'https://buteyko-api.bothost.tech/notify';

// ── Метки полей ───────────────────────────────────────────────────────────────
const QUESTION_LABELS = {
  age_group:                'Возраст',
  occupation:               'Деятельность',
  physical_activity:        'Физическая активность',
  current_problems:         'Текущие проблемы',
  stress_level:             'Уровень стресса',
  sleep_quality:            'Качество сна',
  priority_problem:         'Главная проблема',
  breathing_method:         'Тип дыхания',
  breathing_frequency:      'Частота проблем с дыханием',
  shallow_breathing:        'Поверхностное дыхание',
  stress_breathing:         'Дыхание при стрессе',
  breathing_experience:     'Опыт дыхательных практик',
  time_commitment:          'Время для практик',
  format_preferences:       'Удобные форматы',
  main_goals:               'Главные цели',
  chronic_conditions:       'Хронические заболевания',
  child_age_detail:         'Возраст ребёнка',
  child_problems_detailed:  'Проблемы ребёнка',
  child_motivation_approach:'Мотивация ребёнка',
};

// ── Переводы значений ─────────────────────────────────────────────────────────
const VALUE_LABELS = {
  '18-30':          '18–30 лет',
  '31-45':          '31–45 лет',
  '46-60':          '46–60 лет',
  '60+':            '60+ лет',
  'for_child':      'Заполняю для ребёнка',
  'office_work':    'Офисная работа',
  'home_work':      'Работа дома / фриланс',
  'physical_work':  'Физический труд',
  'student':        'Учёба',
  'maternity_leave':'В декрете',
  'retired':        'На пенсии',
  'management':     'Руководящая должность',
  'daily':          'Ежедневно',
  'regular':        '3–4 раза в неделю',
  'sometimes':      'Иногда / несколько раз в месяц',
  'rarely':         'Несколько раз в месяц',
  'never':          'Практически не занимаюсь',
  'chronic_stress':       'Хронический стресс, напряжение',
  'insomnia':             'Плохой сон, бессонница',
  'breathing_issues':     'Одышка, нехватка воздуха',
  'high_pressure':        'Повышенное давление',
  'headaches':            'Частые головные боли',
  'fatigue':              'Постоянная усталость',
  'anxiety':              'Тревожность, панические атаки',
  'concentration_issues': 'Проблемы с концентрацией',
  'back_pain':            'Боли в шее, плечах, спине',
  'digestion_issues':     'Проблемы с пищеварением',
  'nose':     'В основном носом',
  'mouth':    'Часто дышу ртом',
  'mixed':    'Попеременно носом и ртом',
  'unaware':  'Не обращаю внимания',
  'constantly': 'Постоянно (каждый день)',
  'often':      'Часто (несколько раз в неделю)',
  'yes_often':  'Да, часто ловлю себя на этом',
  'no':         'Нет, дышу нормально и глубоко',
  'rapid_shallow':      'Учащается, становится поверхностным',
  'breath_holding':     'Начинаю задерживать дыхание',
  'air_shortage':       'Чувствую нехватку воздуха',
  'mouth_breathing':    'Дышу ртом вместо носа',
  'no_change':          'Не замечаю изменений',
  'conscious_breathing':'Стараюсь дышать глубже',
  'few_times':    'Пробовал(а) пару раз, не пошло',
  'theory_only':  'Изучал(а) теорию, но не практиковал(а)',
  'regularly':    'Практикую регулярно (несколько раз в неделю)',
  'expert':       'Опытный практик (ежедневно)',
  '3-5_minutes':   '3–5 минут',
  '10-15_minutes': '10–15 минут',
  '20-30_minutes': '20–30 минут',
  '30+_minutes':   '30+ минут',
  'video':       'Видеоуроки с демонстрацией',
  'audio':       'Аудиопрактики с голосом',
  'text':        'Текст с картинками',
  'online_live': 'Живые онлайн-занятия',
  'individual':  'Индивидуальные консультации',
  'mobile_app':  'Мобильное приложение',
  'quick_relaxation':   'Быстро расслабляться в стрессе',
  'stress_resistance':  'Повысить стрессоустойчивость',
  'reduce_anxiety':     'Избавиться от тревожности и паники',
  'improve_sleep':      'Наладить качественный сон',
  'increase_energy':    'Повысить энергию и работоспособность',
  'normalize_pressure': 'Нормализовать давление/пульс',
  'improve_breathing':  'Улучшить работу лёгких и дыхания',
  'improve_focus':      'Улучшить концентрацию внимания',
  'weight_management':  'Поддержать процесс похудения',
  'general_health':     'Общее оздоровление организма',
  'respiratory_diseases':   'Астма / бронхит / ХОБЛ',
  'cardiovascular_diseases':'Гипертония / аритмия',
  'diabetes':               'Диабет 1 или 2 типа',
  'spine_problems':         'Остеохондроз / грыжи',
  'chronic_headaches':      'Мигрени / головные боли',
  'panic_disorder':         'Панические атаки / ВСД',
  'thyroid_diseases':       'Заболевания щитовидной железы',
  'digestive_diseases':     'Гастрит / язва / рефлюкс',
  'none':                   'Нет хронических заболеваний',
  '3-4':  '3–4 года',
  '5-6':  '5–6 лет',
  '7-8':  '7–8 лет',
  '9-10': '9–10 лет',
  '11-12':'11–12 лет',
  '13-15':'13–15 лет',
  '16-17':'16–17 лет',
  'tantrums':         'Частые истерики, капризы',
  'sleep_problems':   'Проблемы с засыпанием',
  'nightmares':       'Беспокойный сон, кошмары',
  'hyperactivity':    'Гиперактивность',
  'weak_immunity':    'Частые простуды, слабый иммунитет',
  'prevention':       'В целом здоров, профилактика',
  'games_stories':      'Игровая форма, сказки',
  'reward_system':      'Система наград и достижений',
  'family_activities':  'Совместные занятия с родителями',
  'creative_tasks':     'Творческие задания',
  'adult_explanation':  'Объяснение пользы «по-взрослому»',
};

// ── Вспомогательные функции ───────────────────────────────────────────────────

function translateValue(val) {
  if (Array.isArray(val)) return val.map(v => VALUE_LABELS[v] || v).join(', ');
  if (typeof val === 'number') return String(val);
  return VALUE_LABELS[val] || val;
}

function formatScale(value) {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return `${String(num).padStart(2, '0')}/10`;
}

function fetchWithTimeout(url, options, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
}

// ── Пауза между попытками ─────────────────────────────────────────────────────
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Лиды с дыхательного теста ────────────────────────────────────────────────
export async function sendLeadToTelegram({ contact, userData, result }) {
  const payload = {
    name:    contact.name,
    email:   contact.email  || '',
    phone:   contact.phone  || '',
    segment: result?.level  || 'mild',
    score:   result?.scores?.urgency ?? 0,
    profile: result?.title  || '',
    tech:    result?.technique || '',

    age_group:            VALUE_LABELS[userData.age_group] || userData.age_group || '',
    occupation:           VALUE_LABELS[userData.occupation] || userData.occupation || '',
    physical_activity:    VALUE_LABELS[userData.physical_activity] || userData.physical_activity || '',

    current_problems:     Array.isArray(userData.current_problems)
                            ? userData.current_problems.map(v => VALUE_LABELS[v] || v).join(', ')
                            : (VALUE_LABELS[userData.current_problems] || userData.current_problems || ''),

    stress_level:         userData.stress_level !== undefined && userData.stress_level !== null
                            ? formatScale(userData.stress_level)
                            : '',
    sleep_quality:        userData.sleep_quality !== undefined && userData.sleep_quality !== null
                            ? formatScale(userData.sleep_quality)
                            : '',

    priority_problem:     VALUE_LABELS[userData.priority_problem] || userData.priority_problem || '',
    breathing_method:     VALUE_LABELS[userData.breathing_method] || userData.breathing_method || '',
    breathing_frequency:  VALUE_LABELS[userData.breathing_frequency] || userData.breathing_frequency || '',
    shallow_breathing:    VALUE_LABELS[userData.shallow_breathing] || userData.shallow_breathing || '',
    stress_breathing:     VALUE_LABELS[userData.stress_breathing] || userData.stress_breathing || '',
    breathing_experience: VALUE_LABELS[userData.breathing_experience] || userData.breathing_experience || '',
    time_commitment:      VALUE_LABELS[userData.time_commitment] || userData.time_commitment || '',

    format_preferences:   Array.isArray(userData.format_preferences)
                            ? userData.format_preferences.map(v => VALUE_LABELS[v] || v).join(', ')
                            : (VALUE_LABELS[userData.format_preferences] || userData.format_preferences || ''),

    main_goals:           Array.isArray(userData.main_goals)
                            ? userData.main_goals.map(v => VALUE_LABELS[v] || v).join(', ')
                            : (VALUE_LABELS[userData.main_goals] || userData.main_goals || ''),

    chronic_conditions:   Array.isArray(userData.chronic_conditions)
                            ? userData.chronic_conditions.map(v => VALUE_LABELS[v] || v).join(', ')
                            : (VALUE_LABELS[userData.chronic_conditions] || userData.chronic_conditions || ''),

    child_age_detail:          VALUE_LABELS[userData.child_age_detail] || userData.child_age_detail || '',
    child_problems_detailed:   Array.isArray(userData.child_problems_detailed)
                                 ? userData.child_problems_detailed.map(v => VALUE_LABELS[v] || v).join(', ')
                                 : (VALUE_LABELS[userData.child_problems_detailed] || userData.child_problems_detailed || ''),
    child_motivation_approach: VALUE_LABELS[userData.child_motivation_approach] || userData.child_motivation_approach || '',
  };

  try {
    const resp = await fetchWithTimeout(
      BOT_URL,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      },
      8000
    );

    if (!resp.ok) throw new Error(`Proxy ответил ${resp.status}`);
    console.log('✅ Лид отправлен через Bothost Proxy');
    return true;
  } catch (err) {
    console.error('❌ Не удалось отправить лид:', err.message);
    return false;
  }
}

// ── Заявки на покупку с лендинга ──────────────────────────────────────────────
// Логика: 3 попытки с паузой 1с → 2с между ними.
// Успех = сервер ответил ok:true (Telegram) ИЛИ sheets:true (Google Sheets).
// Это значит: даже если Telegram временно недоступен — заявка в Sheets сохранена,
// и пользователь видит экран успеха, а не ошибку.
export async function sendPurchaseIntent({ plan, contacts }) {
  const MAX_ATTEMPTS = 3;
  const DELAYS = [1000, 2000]; // паузы между попытками 1 и 2, 2 и 3

  let lastError = '';

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      console.log(`📤 Попытка отправки заявки ${attempt}/${MAX_ATTEMPTS}...`);

      const resp = await fetchWithTimeout(
        PURCHASE_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan, contacts }),
        },
        8000
      );

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || `Proxy error ${resp.status}`);
      }

      const data = await resp.json();

      // Успех если Telegram ответил ok ИЛИ хотя бы Google Sheets записал
      if (data.ok === true || data.sheets === true) {
        console.log(`✅ Заявка принята (попытка ${attempt}): tg=${data.ok}, sheets=${data.sheets}`);
        return true;
      }

      throw new Error(`Сервер вернул ok=false, sheets=false`);

    } catch (err) {
      lastError = err.message;
      console.warn(`⚠️ Попытка ${attempt} не удалась: ${lastError}`);

      if (attempt < MAX_ATTEMPTS) {
        const pauseMs = DELAYS[attempt - 1] || 2000;
        console.log(`⏳ Пауза ${pauseMs / 1000}с перед следующей попыткой...`);
        await delay(pauseMs);
      }
    }
  }

  console.error(`❌ Все ${MAX_ATTEMPTS} попытки исчерпаны. Последняя ошибка: ${lastError}`);
  return false;
}
