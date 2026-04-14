const BOT_URL = 'https://breathing-lead-bot.bothost.ru';

// Fallback: прямой Telegram если бот недоступен
const BOT_TOKEN = '8170694947:AAE_Gqn0QBFYo8_meOjqvGW85PJ06uoc8fc';
const CHAT_ID = '981828628';

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

// Маппинг уровня → сегмент для бота
const LEVEL_TO_SEGMENT = {
  severe:   'hot',
  moderate: 'warm',
  mild:     'warm',
  good:     'cold',
};

async function sendViaBothost({ contact, userData, result }) {
  const payload = {
    source: 'landing',
    name:    contact.name,
    email:   contact.email   || '',
    phone:   contact.phone   || '',
    segment: LEVEL_TO_SEGMENT[result?.level] || 'warm',
    score:   result?.scores?.urgency ?? 0,
    level:   result?.level   || 'mild',
    title:   result?.title   || '',
    answers: userData,
  };

  const resp = await fetch(`${BOT_URL}/notify-lead`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  });

  if (!resp.ok) throw new Error(`bothost ${resp.status}`);
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
    '🔔 *Новая запись на пробное занятие!*',
    '',
    `👤 *${contact.name}*`,
    contact.email ? `📧 ${contact.email}` : '',
    contact.phone ? `📞 ${contact.phone}` : '',
    '',
    `${levelEmoji} *Результат:* ${result?.title || '—'} — ${result?.scores?.urgency ?? '?'}/100`,
    `*Уровень:* ${result?.level || '—'}`,
    '',
    '📝 *Ответы на анкету:*',
    answers,
    '',
    `⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })} (UTC+5)`,
  ].filter(Boolean).join('\n');

  const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
  });

  return resp.ok;
}

export async function sendLeadToTelegram({ contact, userData, result }) {
  try {
    // Сначала пробуем через бот (статистика + админка)
    await sendViaBothost({ contact, userData, result });
    console.log('✅ Лид отправлен через bothost');
    return true;
  } catch (err) {
    console.warn('⚠️ bothost недоступен, fallback на прямой Telegram:', err.message);
    // Fallback — прямой Telegram чтобы лид не потерялся
    return sendViaTelegramDirect({ contact, userData, result });
  }
}
