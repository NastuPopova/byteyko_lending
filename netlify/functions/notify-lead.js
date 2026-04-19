// ─── helpers ────────────────────────────────────────────────────────────────

async function getGoogleAccessToken() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('GOOGLE_CLIENT_EMAIL или GOOGLE_PRIVATE_KEY не заданы');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const encode = obj =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  const pemBody = privateKey
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s+/g, '');
  const keyDer = Buffer.from(pemBody, 'base64');

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    Buffer.from(unsignedToken)
  );

  const signature = Buffer.from(signatureBuffer)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${unsignedToken}.${signature}`;

  const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenResp.ok) {
    const e = await tokenResp.text();
    throw new Error(`Google token error: ${e}`);
  }

  const { access_token } = await tokenResp.json();
  return access_token;
}

// ─── Перевод сегментов ───────────────────────────────────────────────────────

const SEGMENT_LABELS = {
  good:     'Без нарушений',
  mild:     'Лёгкие нарушения',
  moderate: 'Умеренные нарушения',
  severe:   'Выраженные нарушения',
};

// ─── Форматирование числового поля в "05/10" ─────────────────────────────────

function formatScale(value) {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (isNaN(num)) return String(value);
  return `${String(num).padStart(2, '0')}/10`;
}

// ─── Запись в Google Sheets ──────────────────────────────────────────────────

async function appendToSheet(data) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEET_ID не задан');

  const accessToken = await getGoogleAccessToken();

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' });

  const row = [
    now,                                            // Дата
    data.source || 'lending',                       // Источник
    data.name || '',                                // Имя
    data.phone || '',                               // Телефон
    data.email || '',                               // Email
    SEGMENT_LABELS[data.segment] || data.segment || '', // Сегмент (на русском)
    data.score ?? '',                               // Счёт
    data.profile || '',                             // Профиль
    data.age_group || '',                           // Возраст
    data.occupation || '',                          // Деятельность
    formatScale(data.stress_level),                 // Стресс
    formatScale(data.sleep_quality),                // Сон
    data.breathing_method || '',                    // Тип дыхания
    data.breathing_experience || '',                // Опыт практик
    data.current_problems || '',                    // Проблемы
    data.priority_problem || '',                    // Главная проблема
    data.main_goals || '',                          // Цели
    data.time_commitment || '',                     // Время
    data.format_preferences || '',                  // Форматы
    data.chronic_conditions || '',                  // Хр. заболевания
  ];

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}` +
    `/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!resp.ok) {
    const e = await resp.text();
    throw new Error(`Sheets append error: ${e}`);
  }

  return await resp.json();
}

// ─── handler ────────────────────────────────────────────────────────────────

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const BOT_TOKEN = process.env.TG_BOT_TOKEN;
  const CHAT_ID   = process.env.TG_CHAT_ID;

  try {
    const data = JSON.parse(event.body);

    // ── 1. Telegram уведомление ──────────────────────────────────────────────
    const segmentRu  = SEGMENT_LABELS[data.segment] || data.segment || '—';
    const levelEmoji = { good: '🟢', mild: '🟡', moderate: '🟠', severe: '🔴' }[data.segment] || '⚪';
    const isChild    = data.age_group === 'for_child';

    const lines = [
      `🔔 <b>Новая запись (лендинг)${isChild ? ' — РЕБЁНОК' : ''}!</b>`,
      '',
      `👤 <b>${data.name || '—'}</b>`,
      data.email ? `📧 ${data.email}` : '',
      data.phone ? `📞 ${data.phone}` : '',
      '',
      `${levelEmoji} <b>Результат:</b> ${data.profile || '—'} — ${data.score ?? '?'}/100`,
      `🎯 <b>Сегмент:</b> ${segmentRu}`,
      data.tech ? `🛠 <b>Техника:</b> ${data.tech}` : '',
      '',
      data.age_group          ? `• <b>Возраст:</b> ${data.age_group}` : '',
      data.occupation         ? `• <b>Деятельность:</b> ${data.occupation}` : '',
      data.stress_level !== null && data.stress_level !== undefined && data.stress_level !== ''
        ? `• <b>Уровень стресса:</b> ${formatScale(data.stress_level)}` : '',
      data.sleep_quality !== null && data.sleep_quality !== undefined && data.sleep_quality !== ''
        ? `• <b>Качество сна:</b> ${formatScale(data.sleep_quality)}` : '',
      data.breathing_method   ? `• <b>Тип дыхания:</b> ${data.breathing_method}` : '',
      data.breathing_frequency ? `• <b>Частота проблем:</b> ${data.breathing_frequency}` : '',
      data.shallow_breathing  ? `• <b>Поверхностное дыхание:</b> ${data.shallow_breathing}` : '',
      data.stress_breathing   ? `• <b>Дыхание при стрессе:</b> ${data.stress_breathing}` : '',
      data.breathing_experience ? `• <b>Опыт практик:</b> ${data.breathing_experience}` : '',
      data.current_problems   ? `• <b>Проблемы:</b> ${data.current_problems}` : '',
      data.priority_problem   ? `• <b>Главная проблема:</b> ${data.priority_problem}` : '',
      data.main_goals         ? `• <b>Цели:</b> ${data.main_goals}` : '',
      data.time_commitment    ? `• <b>Время:</b> ${data.time_commitment}` : '',
      data.format_preferences ? `• <b>Форматы:</b> ${data.format_preferences}` : '',
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
      console.error('Telegram error:', err);
    }

    // ── 2. Google Sheets ─────────────────────────────────────────────────────
    try {
      await appendToSheet(data);
      console.log('✅ Лид записан в Google Sheets');
    } catch (sheetsErr) {
      console.error('❌ Ошибка записи в Sheets:', sheetsErr.message);
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
