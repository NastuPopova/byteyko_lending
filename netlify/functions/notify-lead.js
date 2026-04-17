exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const BOT_TOKEN = process.env.TG_BOT_TOKEN;
  const CHAT_ID = process.env.TG_CHAT_ID;

  try {
    const data = JSON.parse(event.body);

    const levelEmoji = { good: '🟢', mild: '🟡', moderate: '🟠', severe: '🔴' }[data.segment] || '⚪';
    const isChild = data.age_group === 'for_child';

    const lines = [
      `🔔 <b>Новая запись (лендинг)${isChild ? ' — РЕБЁНОК' : ''}!</b>`,
      '',
      `👤 <b>${data.name || '—'}</b>`,
      data.email ? `📧 ${data.email}` : '',
      data.phone ? `📞 ${data.phone}` : '',
      '',
      `${levelEmoji} <b>Результат:</b> ${data.profile || '—'} — ${data.score ?? '?'}/100`,
      `🎯 <b>Сегмент:</b> ${data.segment || '—'}`,
      data.tech ? `🛠 <b>Техника:</b> ${data.tech}` : '',
      '',
      data.age_group        ? `• <b>Возраст:</b> ${data.age_group}` : '',
      data.occupation       ? `• <b>Деятельность:</b> ${data.occupation}` : '',
      data.current_problems ? `• <b>Проблемы:</b> ${data.current_problems}` : '',
      data.priority_problem ? `• <b>Главная проблема:</b> ${data.priority_problem}` : '',
      data.main_goals       ? `• <b>Цели:</b> ${data.main_goals}` : '',
      data.time_commitment  ? `• <b>Время:</b> ${data.time_commitment}` : '',
      data.chronic_conditions ? `• <b>Хрон. заболевания:</b> ${data.chronic_conditions}` : '',
      '',
      `⏰ ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' })}`,
    ];

    const text = lines.filter(l => l !== null && l !== undefined && l !== '').join('\n');

    const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      return { statusCode: 502, body: JSON.stringify({ error: err }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
