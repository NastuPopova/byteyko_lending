require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Логгирование запросов
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} ${req.method} ${req.path}`);
  if (req.body) {
    console.log('Body:', req.body);
  }
  next();
});

// ===== Короткие ссылки → бот =====
const BOT = 'https://t.me/breathing_opros_bot';

// Пробное занятие
app.get('/trial', (req, res) => {
  res.redirect(301, `${BOT}?start=websiteCtaTrial`);
});

// Недельный интенсив
app.get('/week', (req, res) => {
  res.redirect(301, `${BOT}?start=websiteCtaIntensive`);
});

// Курс 5 занятий
app.get('/course', (req, res) => {
  res.redirect(301, `${BOT}?start=websiteCtaCourse`);
});

// Просто открыть бот (главная)
app.get('/bot', (req, res) => {
  res.redirect(301, `${BOT}?start=website`);
});
// =================================

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('Сервер работает');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер успешно запущен на порту ${port}`);
});
