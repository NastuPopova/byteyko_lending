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

export async function sendLeadToTelegram({ contact, userData, result }) {
  const answers = Object.entries(userData)
    .filter(([key]) => QUESTION_LABELS[key])
    .map(([key, val]) => {
      const label = QUESTION_LABELS[key];
      const value = Array.isArray(val) ? val.join(', ') : val;
      return `• ${label}: ${value}`;
    })
    .join('\n');

  const levelEmoji = {
    good: '🟢', mild: '🟡', moderate: '🟠', severe: '🔴'
  }[result?.level] || '⚪';

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
  ].filter(line => line !== null && line !== undefined).join('\n');

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'Markdown',
    }),
  });
  if (!resp.ok) {
    const err = await resp.text();
    console.error('Telegram notify error:', err);
  }
  return resp.ok;
}
