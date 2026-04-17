const BOT_URL = 'https://breathing-lead-bot.bothost.ru';

// Fallback: прямой Telegram если bothost недоступен
const BOT_TOKEN = '7416243262:AAE8mDCuV2o9FtYE_iO8sVsn8Sg-db3CfaM';
const CHAT_ID   = '981828628';

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
  // Детский поток
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

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function translateValue(val) {
  if (Array.isArray(val)) return val.map(v => VALUE_LABELS[v] || v).join(', ');
  if (typeof val === 'number') return String(val);
  return VALUE_LABELS[val] || val;
}

function formatAnswers(userData) {
  return Object.entries(QUESTION_LABELS)
    .filter(([key]) => userData[key] !== undefined && userData[key] !== null && userData[key] !== '')
    .map(([key, label]) => {
      const raw = userData[key];
      if (Array.isArray(raw) && raw.length === 0) return null;
      const value = esc(translateValue(raw));
      const isScale = key === 'stress_level' || key === 'sleep_quality';
      return `• <b>${esc(label)}:</b> ${value}${isScale ? '/10' : ''}`;
    })
    .filter(Boolean)
    .join('\n');
}

function fetchWithTimeout(url, options, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
}

// ── Отправка через bothost ─────────────────────────────────────────────────────
async function sendViaBothost({ contact, userData, result }) {
  const payload = {
    name:    contact.name,
    email:   contact.email  || '',
    phone:   contact.phone  || '',
    segment: result?.level  || 'mild',
    score:   result?.scores?.urgency ?? 0,
    profile: result?.title  || '',
    tech:    result?.technique || '',
    age_group:            userData.age_group            || '',
    occupation:           userData.occupation           || '',
    physical_activity:    userData.physical_activity    || '',
    current_problems:     Array.isArray(userData.current_problems)
                            ? userData.current_problems.join(', ')
                            : (userData.current_problems || ''),
    stress_level:         userData.stress_level         ?? '',
    sleep_quality:        userData.sleep_quality        ?? '',
    priority_problem:     userData.priority_problem     || '',
    breathing_method:     userData.breathing_method     || '',
    breathing_frequency:  userData.breathing_frequency  || '',
    shallow_breathing:    userData.shallow_breathing    || '',
    stress_breathing:     userData.stress_breathing     || '',
    breathing_experience: userData.breathing_experience || '',
    time_commitment:      userData.time_commitment      || '',
    format_preferences:   Array.isArray(userData.format_preferences)
                            ? userData.format_preferences.join(', ')
                            : (userData.format_preferences || ''),
    main_goals:           Array.isArray(userData.main_goals)
                            ? userData.main_goals.join(', ')
                            : (userData.main_goals || ''),
    chronic_conditions:   Array.isArray(userData.chronic_conditions)
                            ? userData.chronic_conditions.join(', ')
                            : (userData.chronic_conditions || ''),
    child_age_detail:          userData.child_age_detail          || '',
    child_problems_detailed:   Array.isArray(userData.child_problems_detailed)
                                 ? userData.child_problems_detailed.join(', ')
                                 : (userData.child_problems_detailed || ''),
    child_motivation_approach: userData.child_motivation_approach || '',
  };

  const resp = await fetchWithTimeout(
    `${BOT_URL}/notify-lead`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    },
    8000
  );

  if (!resp.ok) throw new Error(`bothost ответил ${resp.status}`);
  return true;
}

// ── Fallback: прямой Telegram (HTML — без Markdown-рисков) ────────────────────
async function sendViaTelegramDirect({ contact, userData, result }) {
  const answers = formatAnswers(userData);

  const levelEmoji = { good: '🟢', mild: '🟡', moderate: '🟠', severe: '🔴' }[result?.level] || '⚪';
  const isChild = userData.age_group === 'for_child';

  const lines = [
    `🔔 <b>Новая запись (лендинг)${isChild ? ' — РЕБЁНОК' : ''}!</b>`,
    '',
    `👤 <b>${esc(contact.name)}</b>`,
    contact.email ? `📧 ${esc(contact.email)}` : '',
    contact.phone ? `📞 ${esc(contact.phone)}` : '',
    '',
    `${levelEmoji} <b>Результат:</b> ${esc(result?.title || '—')} — ${result?.scores?.urgency ?? '?'}/100`,
    `🎯 <b>Сегмент:</b> ${esc(result?.segment || '—')}`,
    '',
    '📝 <b>Ответы на анкету:</b>',
    answers || '(нет данных)',
    '',
    `⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })}`,
  ];

  const text = lines.filter(l => l !== null && l !== undefined).join('\n');

  const resp = await fetchWithTimeout(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    },
    8000
  );

  if (!resp.ok) {
    const errData = await resp.json().catch(() => ({}));
    console.error('❌ Telegram API error:', errData);
    return false;
  }
  return true;
}

// ── Экспорт ───────────────────────────────────────────────────────────────────
export async function sendLeadToTelegram({ contact, userData, result }) {
  try {
    await sendViaBothost({ contact, userData, result });
    console.log('✅ Лид отправлен через bothost');
    return true;
  } catch (err) {
    console.warn('⚠️ bothost недоступен, fallback на Telegram API:', err.message);
    const ok = await sendViaTelegramDirect({ contact, userData, result });
    if (ok) {
      console.log('✅ Лид отправлен через Telegram API (fallback)');
    } else {
      console.error('❌ Не удалось отправить лид ни одним способом');
    }
    return ok;
  }
}
