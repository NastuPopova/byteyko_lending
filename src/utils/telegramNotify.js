const BOT_URL = 'https://breathing-lead-bot.bothost.ru';

// Fallback: прямой Telegram если bothost недоступен
// Используем @breathing_diagnostic_bot (единый бот)
const BOT_TOKEN = '7416243262:AAE8mDCuV2o9FtYE_iO8sVsn8Sg-db3CfaM';
const CHAT_ID   = '981828628';

const QUESTION_LABELS = {
  age_group:          'Возраст',
  main_goal:          'Цель',
  stress_level:       'Уровень стресса',
  sleep_quality:      'Качество сна',
  breathing_type:     'Тип дыхания',
  breathing_problems: 'Проблемы с дыханием',
  shallow_breathing:  'Поверхностное дыхание',
  stress_breathing:   'Дыхание при стрессе',
  activity_level:     'Физическая активность',
  chronic_conditions: 'Хронические заболевания',
};

function fetchWithTimeout(url, options, ms = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
}

async function sendViaBothost({ contact, userData, result }) {
  const payload = {
    name:    contact.name,
    email:   contact.email  || '',
    phone:   contact.phone  || '',
    segment: result?.level  || 'mild',
    score:   result?.scores?.urgency ?? 0,
    profile: result?.title  || '',
    tech:    result?.technique || '',
    goals:   Array.isArray(userData.main_goal)
               ? userData.main_goal.join(', ')
               : (userData.main_goal || ''),
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

async function sendViaTelegramDirect({ contact, userData, result }) {
  const answers = Object.entries(userData)
    .filter(([key]) => QUESTION_LABELS[key])
    .map(([key, val]) => {
      const label = QUESTION_LABELS[key];
      const value = Array.isArray(val) ? val.join(', ') : val;
      return `• ${label}: ${value}`;
    })
    .join('\n');

  const levelEmoji = { good: '🟢', mild: '🟡', moderate: '🟠', severe: '🔴' }[result?.level] || '⚪';

  const text = [
    '🔔 *Новая запись (лендинг)!*',
    '',
    `👤 *${contact.name}*`,
    contact.email ? `📧 ${contact.email}` : '',
    contact.phone ? `📞 ${contact.phone}` : '',
    '',
    `${levelEmoji} *Результат:* ${result?.title || '—'} — ${result?.scores?.urgency ?? '?'}/100`,
    '',
    '📝 *Ответы:*',
    answers,
    '',
    `⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })}`,
  ].filter(Boolean).join('\n');

  const resp = await fetchWithTimeout(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    },
    8000
  );

  return resp.ok;
}

export async function sendLeadToTelegram({ contact, userData, result }) {
  try {
    await sendViaBothost({ contact, userData, result });
    console.log('✅ Лид отправлен через bothost (статистика)');
    return true;
  } catch (err) {
    console.warn('⚠️ bothost недоступен, fallback:', err.message);
    return sendViaTelegramDirect({ contact, userData, result });
  }
}
