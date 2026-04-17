// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Создаёт подписанный JWT для Google Service Account и обменивает его
 * на access_token через OAuth 2.0 token endpoint.
 * Работает без каких-либо npm-зависимостей (чистый Web Crypto API).
 */
async function getGoogleAccessToken() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  // Netlify хранит многострочные env как литеральные \n — разворачиваем
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

  // Импортируем приватный ключ PEM через Web Crypto
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

/**
 * Добавляет одну строку в Google Sheets (append).
 */
async function appendToSheet(data) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEET_ID не задан');

  const accessToken = await getGoogleAccessToken();

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' });

  const row = [
    now,                                      // Дата
    data.source || 'lending',                // Источник
    data.name || '',                          // Имя
    data.phone || '',                         // Телефон
    data.email || '',                         // Email
    data.segment || '',                       // Сегмент
    data.score ?? '',                         // Счёт
    data.profile || '',                       // Профиль
    data.age_group || '',                     // Возраст
    data.occupation || '',                    // Деятельность
    data.current_problems || '',              // Проблемы
    data.priority_problem || '',              // Главная проблема
    data.main_goals || '',                    // Цели
    data.time_commitment || '',               // Время
    data.chronic_conditions || '',            // Хр. заболевания
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
  const CHAT_ID = process.env.TG_CHAT_ID;

  try {
    const data = JSON.parse(event.body);

    // ── 1. Telegram уведомление ──────────────────────────────────────────────
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
      console.error('Telegram error:', err);
      // Не прерываем — всё равно пишем в Sheets
    }

    // ── 2. Google Sheets ─────────────────────────────────────────────────────
    try {
      await appendToSheet(data);
      console.log('✅ Лид записан в Google Sheets');
    } catch (sheetsErr) {
      // Логируем, но не роняем весь handler
      console.error('❌ Ошибка записи в Sheets:', sheetsErr.message);
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
