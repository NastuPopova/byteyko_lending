import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Clock, Sparkles, TrendingUp, ChevronLeft, ChevronRight, X, ArrowLeft, User, Mail, Phone } from 'lucide-react';
import { QUESTIONS, getNextQuestionId, getPrevQuestionId, getTotalQuestions, getQuestionIndex, calculateResult } from '../data/surveyQuestions';
import { sendLeadToTelegram } from '../utils/telegramNotify';

const features = [
  { icon: <Sparkles className="h-6 w-6" />, title: 'Адаптивные вопросы', description: 'Следующий вопрос формируется на основе ваших ответов' },
  { icon: <CheckCircle className="h-6 w-6" />, title: 'Персональные рекомендации', description: 'Получите индивидуальный план действий по результатам теста' },
  { icon: <TrendingUp className="h-6 w-6" />, title: 'Оценка состояния дыхания', description: 'Узнайте, насколько правильно вы дышите прямо сейчас' },
  { icon: <Clock className="h-6 w-6" />, title: 'Всего 2–3 минуты', description: 'Только имя и контакт — больше ничего лишнего' },
];

const levelColors = {
  good:     { bg: 'from-emerald-50 to-teal-50', bar: 'bg-emerald-400', border: 'border-emerald-200' },
  mild:     { bg: 'from-yellow-50 to-orange-50', bar: 'bg-yellow-400',  border: 'border-yellow-200' },
  moderate: { bg: 'from-orange-50 to-red-50',   bar: 'bg-orange-400',  border: 'border-orange-200' },
  severe:   { bg: 'from-red-50 to-rose-50',     bar: 'bg-red-400',     border: 'border-red-200' },
};

// ──── Контактная форма ────────────────────────────────────────────────────────
const ContactScreen = ({ onNext, onClose }) => {
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Введите ваше имя';
    if (!email.trim() && !phone.trim()) e.contact = 'Укажите email или телефон';
    if (email.trim() && !/^[^@]+@[^@]+\.[^@]+$/.test(email)) e.email = 'Некорректный email';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onNext({ name: name.trim(), email: email.trim(), phone: phone.trim() });
  };

  return (
    <ModalShell onClose={onClose} progress={0}>
      <div className="text-center mb-5">
        <div className="text-4xl mb-2">🫁</div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Бесплатная диагностика дыхания</h3>
        <p className="text-gray-500 text-sm">Укажите контакты — результат и рекомендации отправим вам</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Имя <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setErrors(p => ({...p, name: ''})); }}
              placeholder="Ваше имя"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-teal-400'
              }`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
            <span className="text-gray-400 font-normal ml-1">(или телефон)</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: '', contact: ''})); }}
              placeholder="example@mail.ru"
              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors ${
                errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-teal-400'
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Телефон
            <span className="text-gray-400 font-normal ml-1">(необязательно)</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="tel"
              value={phone}
              onChange={e => { setPhone(e.target.value); setErrors(p => ({...p, contact: ''})); }}
              placeholder="+7 999 000-00-00"
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-400 text-sm outline-none transition-colors"
            />
          </div>
          {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold py-3.5 rounded-xl text-base hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        Начать диагностику →
      </button>
      <p className="text-center text-gray-400 text-xs mt-2">Данные не передаются третьим лицам</p>
    </ModalShell>
  );
};

// ──── Движок анкеты ───────────────────────────────────────────────────────────
const SurveyEngine = ({ onClose }) => {
  const [screen, setScreen]               = useState('contact');
  const [contact, setContact]             = useState(null);
  const [userData, setUserData]           = useState({});
  const [currentId, setCurrentId]         = useState('age_group');
  const [multiSelected, setMultiSelected] = useState([]);
  const [animating, setAnimating]         = useState(false);
  const [result, setResult]               = useState(null);
  const [sending, setSending]             = useState(false);
  const [sent, setSent]                   = useState(false);

  const scaleClickedRef = useRef(null);
  const [scalePressedValue, setScalePressedValue] = useState(null);

  useEffect(() => {
    scaleClickedRef.current = null;
    setScalePressedValue(null);
  }, [currentId]);

  const total      = getTotalQuestions(userData);
  const currentIdx = getQuestionIndex(currentId, userData);
  const progress   = screen === 'contact' ? 0
                   : screen === 'done'    ? 100
                   : Math.max(5, Math.round((currentIdx / total) * 100));

  const question = QUESTIONS[currentId];

  const goNext = (newData) => {
    const updated = { ...userData, ...newData };
    setUserData(updated);
    const next = getNextQuestionId(currentId, updated);
    setAnimating(true);
    setTimeout(() => {
      setMultiSelected([]);
      if (next) {
        setCurrentId(next);
      } else {
        const res = calculateResult(updated);
        setResult(res);
        setScreen('done');
      }
      setAnimating(false);
    }, 200);
  };

  const goBack = () => {
    const prev = getPrevQuestionId(currentId, userData);
    if (prev) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentId(prev);
        setMultiSelected(userData[prev] || []);
        setAnimating(false);
      }, 200);
    } else {
      setScreen('contact');
    }
  };

  const handleSingle = (value) => goNext({ [currentId]: value });

  const handleScale = (value) => {
    setScalePressedValue(value);
    goNext({ [currentId]: value });
  };

  const handleMultiToggle = (value) => {
    setMultiSelected(prev => {
      if (prev.includes(value)) return prev.filter(v => v !== value);
      if (question.maxSelections && prev.length >= question.maxSelections) return prev;
      return [...prev, value];
    });
  };
  const handleMultiDone = () => {
    if (multiSelected.length < (question.minSelections || 1)) return;
    goNext({ [currentId]: multiSelected });
  };

  const handleBook = async () => {
    if (sent) { window.open('https://t.me/AS_Popov87', '_blank'); return; }
    setSending(true);
    try {
      await sendLeadToTelegram({ contact, userData, result });
      setSent(true);
    } catch(e) {
      console.error(e);
    } finally {
      setSending(false);
      window.open('https://t.me/AS_Popov87', '_blank');
    }
  };

  if (screen === 'contact') {
    return <ContactScreen onClose={onClose} onNext={(c) => { setContact(c); setScreen('survey'); }} />;
  }

  if (screen === 'done' && result) {
    const colors = levelColors[result.level] || levelColors.mild;
    const score  = result.scores?.urgency ?? null;
    return (
      <ModalShell onClose={onClose} progress={100}>
        <div className={`rounded-xl bg-gradient-to-br ${colors.bg} p-4 mb-4 ${colors.border} border`}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl flex-shrink-0">{result.emoji}</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{result.title}</h3>
              <p className="text-sm font-medium text-gray-600">{result.subtitle}</p>
            </div>
          </div>
          {score !== null && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Индекс нарушения дыхания</span>
                <span className="font-bold text-gray-700">{score}/100</span>
              </div>
              <div className="w-full bg-white/70 rounded-full h-2.5">
                <div className={`${colors.bar} rounded-full h-2.5 transition-all duration-700`} style={{ width: `${score}%` }} />
              </div>
            </div>
          )}
          <p className="text-sm text-gray-700 leading-relaxed">{result.description}</p>
        </div>

        {result.recommendations?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">📝 Что делать дальше</p>
            <ul className="space-y-1.5">
              {result.recommendations.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 flex-shrink-0">•</span><span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">АП</div>
            <div>
              <p className="text-sm font-bold text-gray-900">Александр Попов</p>
              <p className="text-xs text-gray-500">Методист по дыханию Бутейко · <span className="text-orange-600">@AS_Popov87</span></p>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {contact?.name ? `${contact.name}, запишитесь` : 'Запишитесь'} на <strong>пробное занятие</strong> — разберём ваш результат вместе и составим персональный план.
          </p>
        </div>

        <button
          onClick={handleBook}
          disabled={sending}
          className="inline-flex flex-col items-center justify-center gap-0.5 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3.5 rounded-xl text-base hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] mb-2 disabled:opacity-70 disabled:cursor-wait"
        >
          {sending ? (
            <span>⏳ Отправляем...</span>
          ) : sent ? (
            <span>✅ Записаться в Telegram →</span>
          ) : (
            <>
              <span>📲 Записаться на пробное занятие →</span>
              <span className="text-sm font-semibold opacity-90">1 500 ₽</span>
            </>
          )}
        </button>
        <button onClick={onClose} className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors py-1">Закрыть</button>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose} progress={progress} onBack={question?.allowBack ? goBack : null}>
      <div className={`transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-gray-900 font-semibold text-base mb-4 leading-relaxed whitespace-pre-line">{question?.text}</p>

        {question?.type === 'single_choice' && (
          <div className="flex flex-col gap-2">
            {question.options.map(opt => (
              <button key={opt.value} onClick={() => handleSingle(opt.value)}
                className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-teal-400 hover:bg-teal-50 transition-all duration-150 text-gray-800 font-medium text-sm active:scale-[0.98]">
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {question?.type === 'scale' && (
          <div className="flex flex-wrap gap-2 justify-center">
            {question.options.map(opt => {
              const isActive = !animating && scalePressedValue === opt.value;
              return (
                <button key={opt.value} onClick={() => handleScale(opt.value)}
                  className={`w-12 h-12 rounded-full border-2 font-bold text-sm transition-all duration-150 active:scale-95 ${
                    isActive
                      ? 'border-teal-500 bg-teal-500 text-white scale-110'
                      : 'border-gray-200 hover:border-teal-400 hover:bg-teal-100 text-gray-700'
                  }`}>
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {question?.type === 'multiple_choice' && (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-500 mb-1">Макс. {question.maxSelections} варианта</p>
            {question.options.map(opt => {
              const selected = multiSelected.includes(opt.value);
              return (
                <button key={opt.value} onClick={() => handleMultiToggle(opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 text-sm font-medium active:scale-[0.98] ${
                    selected ? 'border-teal-500 bg-teal-50 text-teal-800' : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-gray-800'
                  }`}>
                  <span className="mr-2">{selected ? '✅' : '○'}</span>{opt.label}
                </button>
              );
            })}
            <button onClick={handleMultiDone}
              disabled={multiSelected.length < (question.minSelections || 1)}
              className="mt-2 w-full bg-teal-500 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl text-base transition-all duration-150 hover:bg-teal-600 active:scale-[0.98]">
              Готово →
            </button>
          </div>
        )}
      </div>
    </ModalShell>
  );
};

// ──── Оболочка модалки ────────────────────────────────────────────────────────
const ModalShell = ({ children, onClose, progress, onBack }) => {
  useEffect(() => {
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl relative overflow-hidden flex flex-col"
        style={{ maxHeight: '92dvh' }}>
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-3 text-white flex-shrink-0">
          <div className="flex justify-center mb-2 sm:hidden">
            <div className="w-10 h-1 bg-white/40 rounded-full" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {onBack && (
                <button onClick={onBack}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  aria-label="Назад">
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <span className="font-bold text-sm">🫁 Диагностика дыхания</span>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Закрыть">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="w-full bg-white/30 rounded-full h-1.5">
            <div className="bg-white rounded-full h-1.5 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-teal-100 text-xs mt-1">{progress}% завершено</p>
        </div>
        <div className="px-4 py-5 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

// ──── Основная секция ─────────────────────────────────────────────────────────
const BreathingTest = ({ surveyOpen, onSurveyToggle }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const openSurvey  = () => onSurveyToggle(true);
  const closeSurvey = () => onSurveyToggle(false);

  const screens = [
    { image: '/images/bot-screen-1.jpg', alt: 'Интерфейс теста - экран 1' },
    { image: '/images/bot-screen-2.jpg', alt: 'Интерфейс теста - экран 2' },
    { image: '/images/bot-screen-3.jpg', alt: 'Интерфейс теста - экран 3' },
    { image: '/images/bot-screen-4.jpg', alt: 'Интерфейс теста - экран 4' },
  ];

  const nextScreen  = () => setCurrentScreen(p => (p + 1) % screens.length);
  const prevScreen  = () => setCurrentScreen(p => (p - 1 + screens.length) % screens.length);
  const goToTestBot = () => window.open('https://t.me/breathing_diagnostic_bot?start=website_test', '_blank');

  return (
    <>
      {surveyOpen && <SurveyEngine onClose={closeSurvey} />}

      <section id="breathing-test" className="py-20 bg-gradient-to-br from-orange-100 via-white to-teal-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full opacity-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full px-4 py-2 mb-6 shadow-lg">
                <Sparkles className="h-4 w-4" />
                <span className="font-semibold text-sm">Одна из лучших анкет в рунете</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Бесплатная диагностика вашего дыхания</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">Пройдите интерактивный тест и получите персональные рекомендации по улучшению качества дыхания.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                    <div><h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3><p className="text-sm text-gray-600">{feature.description}</p></div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
                <button onClick={goToTestBot}
                  className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>
                  <span>Пройти диагностику в Telegram</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
                <button onClick={openSurvey}
                  className="group bg-white border-2 border-teal-500 text-teal-600 font-bold py-4 px-8 rounded-full text-lg shadow-md hover:shadow-xl hover:bg-teal-50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                  <span>🫁 Пройти анкету на сайте</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mt-4">
                <span className="text-sm"><strong>200+</strong> человек уже прошли диагностику</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto" style={{ maxWidth: '380px' }}>
                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10" />
                  <div className="bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-inner relative" style={{ aspectRatio: '9/19.5' }}>
                    <img src={process.env.PUBLIC_URL + screens[currentScreen].image} alt={screens[currentScreen].alt}
                      className="w-full h-full object-contain bg-white" style={{ objectPosition: 'center' }}
                      onError={e => { e.target.style.display = 'none'; }} />
                    {screens.length > 1 && (
                      <>
                        <button onClick={prevScreen} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-20" aria-label="Предыдущий"><ChevronLeft className="h-6 w-6 text-gray-800" /></button>
                        <button onClick={nextScreen} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-20" aria-label="Следующий"><ChevronRight className="h-6 w-6 text-gray-800" /></button>
                      </>
                    )}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {screens.map((_, index) => (
                        <button key={index} onClick={() => setCurrentScreen(index)}
                          className={`transition-all duration-300 rounded-full ${index === currentScreen ? 'bg-orange-500 w-6 h-2' : 'bg-gray-400 hover:bg-gray-500 w-2 h-2'}`}
                          aria-label={`Скриншот ${index+1}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-400 rounded-full opacity-20 blur-2xl animate-pulse" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-400 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div><div className="text-4xl font-bold text-orange-600 mb-2">2–3 мин</div><p className="text-gray-600">Время прохождения теста</p></div>
              <div><div className="text-4xl font-bold text-orange-600 mb-2">15+</div><p className="text-gray-600">Адаптивных вопросов</p></div>
              <div><div className="text-4xl font-bold text-orange-600 mb-2">100%</div><p className="text-gray-600">Бесплатно и анонимно</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BreathingTest;
