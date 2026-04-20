import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Clock, Sparkles, TrendingUp, ChevronLeft, ChevronRight, X, ArrowLeft, User, Mail, Phone } from 'lucide-react';
import { sendLeadToTelegram } from '../utils/telegramNotify';

// Данные вопросов теста
const questions = [
  {
    id: 1,
    text: 'Как часто вы испытываете затруднённое дыхание в покое?',
    options: [
      { value: 'never', label: 'Никогда' },
      { value: 'rarely', label: 'Редко (раз в месяц)' },
      { value: 'sometimes', label: 'Иногда (раз в неделю)' },
      { value: 'often', label: 'Часто (несколько раз в неделю)' },
      { value: 'always', label: 'Постоянно' },
    ],
  },
  {
    id: 2,
    text: 'Как вы обычно дышите?',
    options: [
      { value: 'nose', label: 'Только через нос' },
      { value: 'mostly_nose', label: 'Преимущественно через нос' },
      { value: 'mixed', label: 'Попеременно нос/рот' },
      { value: 'mostly_mouth', label: 'Преимущественно через рот' },
      { value: 'mouth', label: 'Только через рот' },
    ],
  },
  {
    id: 3,
    text: 'Просыпаетесь ли вы ночью из-за проблем с дыханием?',
    options: [
      { value: 'never', label: 'Никогда' },
      { value: 'rarely', label: 'Редко' },
      { value: 'sometimes', label: 'Иногда' },
      { value: 'often', label: 'Часто' },
    ],
  },
  {
    id: 4,
    text: 'Есть ли у вас хронические заболевания дыхательных путей?',
    options: [
      { value: 'none', label: 'Нет' },
      { value: 'rhinitis', label: 'Хронический ринит/насморк' },
      { value: 'asthma', label: 'Астма' },
      { value: 'bronchitis', label: 'Хронический бронхит' },
      { value: 'other', label: 'Другое' },
    ],
  },
  {
    id: 5,
    text: 'Как вы оцениваете свой уровень стресса?',
    options: [
      { value: 'low', label: 'Низкий — чувствую себя спокойно' },
      { value: 'medium', label: 'Средний — бывают напряжённые периоды' },
      { value: 'high', label: 'Высокий — стресс почти постоянный' },
      { value: 'very_high', label: 'Очень высокий — хронический стресс' },
    ],
  },
];

const TOTAL = questions.length;

const scoreMap = {
  // Q1
  never: 0, rarely: 1, sometimes: 2, often: 3, always: 4,
  // Q2
  nose: 0, mostly_nose: 1, mixed: 2, mostly_mouth: 3, mouth: 4,
  // Q3 (повтор ключей — но это нормально)
  // Q4
  none: 0, rhinitis: 1, asthma: 3, bronchitis: 2, other: 1,
  // Q5
  low: 0, medium: 1, high: 3, very_high: 4,
};

function getResult(total) {
  if (total <= 3) return { level: 'Отличный', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', emoji: '🟢', desc: 'Ваше дыхание близко к норме. Поддерживайте этот уровень профилактическими практиками Бутейко.' };
  if (total <= 7) return { level: 'Хороший', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', emoji: '🔵', desc: 'Есть незначительные нарушения. Несколько занятий помогут улучшить качество дыхания.' };
  if (total <= 12) return { level: 'Требует внимания', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', emoji: '🟡', desc: 'Дыхание нарушено умеренно. Рекомендуется курс занятий по методу Бутейко.' };
  return { level: 'Критический', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', emoji: '🔴', desc: 'Серьёзные нарушения дыхания. Необходима персональная работа с инструктором.' };
}

const BreathingTest = () => {
  const [step, setStep] = useState('intro'); // intro | questions | contact | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  const slides = [
    { image: '/images/bot-screen-1.jpg', alt: 'Интерфейс теста - экран 1' },
    { image: '/images/bot-screen-2.jpg', alt: 'Интерфейс теста - экран 2' },
    { image: '/images/bot-screen-3.jpg', alt: 'Интерфейс теста - экран 3' },
    { image: '/images/bot-screen-4.jpg', alt: 'Интерфейс теста - экран 4' },
  ];

  const goToTestBot = () => window.open('https://t.me/breathing_lead_diagnostic_bot?start=website_test', '_blank');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [current]: value }));
  };

  const handleNext = () => {
    if (current < TOTAL - 1) {
      setCurrent(c => c + 1);
    } else {
      setStep('contact');
    }
  };

  const handleBack = () => {
    if (current > 0) setCurrent(c => c - 1);
    else setStep('intro');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const score = Object.values(answers).reduce((sum, v) => sum + (scoreMap[v] ?? 0), 0);
    const result = getResult(score);

    const message = `
🧪 *Новый результат теста с сайта*

👤 *Имя:* ${contact.name}
📞 *Телефон:* ${contact.phone}
📧 *Email:* ${contact.email || 'не указан'}

📊 *Результат теста:* ${result.emoji} ${result.level} (${score} баллов)
📝 *Ответы:*
${questions.map((q, i) => `${i + 1}. ${q.text}\n   → ${q.options.find(o => o.value === answers[i])?.label || '—'}`).join('\n')}
    `.trim();

    const sent = await sendLeadToTelegram(message);
    setSending(false);
    setSent(sent);
    setStep('result');
  };

  const score = Object.values(answers).reduce((sum, v) => sum + (scoreMap[v] ?? 0), 0);
  const result = getResult(score);

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (step === 'intro') {
    return (
      <section id="breathing-test" className="py-20 bg-gradient-to-br from-orange-100 via-white to-teal-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full opacity-10 blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              🧪 Бесплатный тест
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Проверьте качество своего дыхания
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              5 вопросов — и вы узнаете, насколько ваше дыхание соответствует норме по методу Бутейко
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Слайдер скриншотов */}
            <div className="relative" ref={sliderRef}>
              <div className="relative w-full max-w-sm mx-auto">
                <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl bg-gray-900">
                  {slides.map((slide, i) => (
                    <img
                      key={i}
                      src={slide.image}
                      alt={slide.alt}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === activeSlide ? 'bg-white w-6' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-400 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-400 rounded-full opacity-20 blur-2xl animate-pulse" />
              </div>
            </div>

            {/* Описание и кнопки */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Что вы узнаете:</h3>
                <ul className="space-y-3">
                  {[
                    'Уровень CO₂ в вашем организме',
                    'Насколько правильно вы дышите',
                    'Какие симптомы связаны с дыханием',
                    'Персональные рекомендации',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setStep('questions')}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Пройти тест на сайте
                </button>

                <button
                  onClick={goToTestBot}
                  className="w-full bg-white border-2 border-teal-500 text-teal-600 font-semibold py-4 px-8 rounded-xl text-lg hover:bg-teal-50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.038 9.589c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 14.065l-2.965-.924c-.645-.204-.658-.645.136-.953l11.57-4.461c.537-.194 1.006.131.631.521z"/>
                  </svg>
                  Пройти в Telegram-боте
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>5 минут</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Персональный результат</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── QUESTIONS ──────────────────────────────────────────────────────────────
  if (step === 'questions') {
    const q = questions[current];
    const selected = answers[current];
    const progress = ((current + 1) / TOTAL) * 100;

    return (
      <section id="breathing-test" className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={handleBack} className="text-gray-400 hover:text-gray-600 transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <span className="text-sm font-medium text-gray-500">
                Вопрос {current + 1} из {TOTAL}
              </span>
              <button onClick={() => setStep('intro')} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Progress */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
              <div
                className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Question */}
            <h3 className="text-xl font-bold text-gray-900 mb-6">{q.text}</h3>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                    selected === opt.value
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50 text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={!selected}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {current < TOTAL - 1 ? (
                <>Далее <ChevronRight className="h-5 w-5" /></>
              ) : (
                <>Узнать результат <Sparkles className="h-5 w-5" /></>
              )}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── CONTACT ────────────────────────────────────────────────────────────────
  if (step === 'contact') {
    return (
      <section id="breathing-test" className="py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900">Тест завершён!</h3>
              <p className="text-gray-600 mt-2">Оставьте контакты, чтобы получить персональный разбор результатов</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={contact.name}
                    onChange={e => setContact(p => ({ ...p, name: e.target.value }))}
                    placeholder="Как вас зовут?"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={contact.phone}
                    onChange={e => setContact(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (необязательно)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={contact.email}
                    onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 disabled:opacity-60 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {sending ? 'Отправляем...' : (
                  <><Sparkles className="h-5 w-5" /> Получить результат</>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────────────────
  return (
    <section id="breathing-test" className="py-20 bg-gradient-to-br from-teal-50 to-white">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-5xl mb-4">{result.emoji}</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ваш результат</h3>

          <div className={`inline-block px-6 py-2 rounded-full text-lg font-bold mb-4 ${result.bg} ${result.color} border ${result.border}`}>
            {result.level}
          </div>

          <p className="text-gray-600 mb-6">{result.desc}</p>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-700 font-medium">✅ Ваши данные отправлены! Инструктор свяжется с вами.</p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 text-sm">Не удалось отправить данные. Напишите напрямую:</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={goToTestBot}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.038 9.589c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 14.065l-2.965-.924c-.645-.204-.658-.645.136-.953l11.57-4.461c.537-.194 1.006.131.631.521z"/>
              </svg>
              Подробный анализ в Telegram
            </button>

            <button
              onClick={() => { setStep('intro'); setCurrent(0); setAnswers({}); }}
              className="w-full border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Пройти тест снова
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreathingTest;
