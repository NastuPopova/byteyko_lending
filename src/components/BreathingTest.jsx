import React, { useState } from 'react';
import { CheckCircle, Clock, Sparkles, TrendingUp, ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { QUESTIONS, getFlow, getNextQuestionId, getPrevQuestionId, getTotalQuestions } from '../data/surveyQuestions';

const features = [
  { icon: <Sparkles className="h-6 w-6" />, title: 'Адаптивные вопросы', description: 'Следующий вопрос формируется на основе ваших ответов' },
  { icon: <CheckCircle className="h-6 w-6" />, title: 'Персональные рекомендации', description: 'Получите индивидуальный план действий по результатам теста' },
  { icon: <TrendingUp className="h-6 w-6" />, title: 'Оценка состояния дыхания', description: 'Узнайте, насколько правильно вы дышите прямо сейчас' },
  { icon: <Clock className="h-6 w-6" />, title: 'Всего 2–3 минуты', description: 'Быстрое прохождение без регистрации и лишних данных' },
];

// ---- Движок анкеты ----
const SurveyEngine = ({ onClose }) => {
  const [screen, setScreen] = useState('start');
  const [userData, setUserData] = useState({});
  const [currentId, setCurrentId] = useState('age_group');
  const [multiSelected, setMultiSelected] = useState([]);
  const [animating, setAnimating] = useState(false);

  const flow = getFlow(userData);
  const total = getTotalQuestions(userData);
  const completedCount = flow.filter((id) => {
    const q = QUESTIONS[id];
    return q && userData[id] !== undefined && (!q.condition || q.condition(userData));
  }).indexOf(currentId);
  const progress = Math.max(0, Math.round((completedCount / total) * 100));

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
      setScreen('start');
    }
  };

  const handleSingle = (value) => goNext({ [currentId]: value });

  const handleMultiToggle = (value) => {
    setMultiSelected((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (question.maxSelections && prev.length >= question.maxSelections) return prev;
      return [...prev, value];
    });
  };

  const handleMultiDone = () => {
    if (multiSelected.length < (question.minSelections || 1)) return;
    goNext({ [currentId]: multiSelected });
  };

  const handleScale = (value) => goNext({ [currentId]: value });

  // Стартовый экран
  if (screen === 'start') {
    return (
      <ModalShell onClose={onClose} progress={0}>
        <div className="text-center px-2">
          <div className="text-6xl mb-5">🌬️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Узнайте состояние вашего дыхания</h3>
          <p className="text-gray-600 mb-7 leading-relaxed text-lg">
            Анкета содержит адаптивные вопросы — следующий вопрос зависит от вашего ответа.
            В конце вы получите персональный результат.
          </p>
          <ul className="text-left space-y-3 mb-9">
            {['✅ Без регистрации', '✅ Результат сразу', '✅ Персональные рекомендации'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700 text-base">{item}</li>
            ))}
          </ul>
          <button
            onClick={() => { setScreen('survey'); setCurrentId('age_group'); setUserData({}); setMultiSelected([]); }}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold py-5 rounded-xl text-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Начать диагностику →
          </button>
        </div>
      </ModalShell>
    );
  }

  // Экран результата
  if (screen === 'done') {
    return (
      <ModalShell onClose={onClose} progress={100}>
        <div className="text-center py-4">
          <div className="text-6xl mb-5">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Анкета завершена!</h3>
          <p className="text-gray-600 mb-7 leading-relaxed text-lg">
            Персональный результат будет готов в ближайшее время.
            Сейчас вы можете записаться на пробное занятие.
          </p>
          <a
            href="https://t.me/spokoinoe_dyhanie"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-5 rounded-xl text-xl hover:shadow-lg transition-all duration-300 mb-4"
          >
            📲 Записаться на пробное — 1 500 ₽ →
          </a>
          <button
            onClick={onClose}
            className="text-gray-400 text-base hover:text-gray-600 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </ModalShell>
    );
  }

  // Экран вопроса
  return (
    <ModalShell onClose={onClose} progress={progress} onBack={question?.allowBack ? goBack : null}>
      <div className={`transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        {/* Текст вопроса */}
        <p className="text-gray-900 font-semibold text-lg mb-6 leading-relaxed whitespace-pre-line">
          {question?.text}
        </p>

        {/* Одиночный выбор */}
        {question?.type === 'single_choice' && (
          <div className="flex flex-col gap-3">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSingle(opt.value)}
                className="w-full text-left px-5 py-4 rounded-xl border-2 border-gray-200 hover:border-teal-400 hover:bg-teal-50 transition-all duration-150 text-gray-800 font-medium text-base active:scale-[0.98]"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Шкала */}
        {question?.type === 'scale' && (
          <div className="flex flex-wrap gap-3 justify-center">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleScale(opt.value)}
                className="w-14 h-14 rounded-full border-2 border-gray-200 hover:border-teal-400 hover:bg-teal-100 font-bold text-gray-700 text-base transition-all duration-150 active:scale-95"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Множественный выбор */}
        {question?.type === 'multiple_choice' && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-500 mb-1">Макс. {question.maxSelections} варианта</p>
            {question.options.map((opt) => {
              const selected = multiSelected.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  onClick={() => handleMultiToggle(opt.value)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 text-base font-medium active:scale-[0.98] ${
                    selected
                      ? 'border-teal-500 bg-teal-50 text-teal-800'
                      : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-gray-800'
                  }`}
                >
                  <span className="mr-2">{selected ? '✅' : '○'}</span>
                  {opt.label}
                </button>
              );
            })}
            <button
              onClick={handleMultiDone}
              disabled={multiSelected.length < (question.minSelections || 1)}
              className="mt-3 w-full bg-teal-500 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-lg transition-all duration-150 hover:bg-teal-600 active:scale-[0.98]"
            >
              Готово →
            </button>
          </div>
        )}
      </div>
    </ModalShell>
  );
};

// ---- Оболочка модального окна ----
const ModalShell = ({ children, onClose, progress, onBack }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl relative overflow-hidden max-h-[92vh] flex flex-col">
      {/* Шапка */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-5 text-white flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors" aria-label="Назад">
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <span className="font-bold text-lg">🫁 Диагностика дыхания</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors" aria-label="Закрыть">
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Прогресс-бар */}
        <div className="w-full bg-white/30 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-teal-100 text-sm mt-1.5">{progress}% завершено</p>
      </div>
      {/* Тело скроллится */}
      <div className="px-6 py-7 overflow-y-auto">{children}</div>
    </div>
  </div>
);

// ---- Главный компонент ----
const BreathingTest = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showSurvey, setShowSurvey] = useState(false);

  const screens = [
    { image: '/images/bot-screen-1.jpg', alt: 'Интерфейс теста - экран 1' },
    { image: '/images/bot-screen-2.jpg', alt: 'Интерфейс теста - экран 2' },
    { image: '/images/bot-screen-3.jpg', alt: 'Интерфейс теста - экран 3' },
    { image: '/images/bot-screen-4.jpg', alt: 'Интерфейс теста - экран 4' },
  ];

  const nextScreen = () => setCurrentScreen((prev) => (prev + 1) % screens.length);
  const prevScreen = () => setCurrentScreen((prev) => (prev - 1 + screens.length) % screens.length);
  const goToTestBot = () => window.open('https://t.me/breathing_diagnostic_bot?start=website_test', '_blank');

  return (
    <>
      {showSurvey && <SurveyEngine onClose={() => setShowSurvey(false)} />}

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
                <button onClick={goToTestBot} className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                  <span>Пройти тест бесплатно</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
                <button onClick={() => setShowSurvey(true)} className="group bg-white border-2 border-teal-500 text-teal-600 font-bold py-4 px-8 rounded-full text-lg shadow-md hover:shadow-xl hover:bg-teal-50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2">
                  <span>🫁 Пройти анкету на сайте</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">{String.fromCharCode(64+i)}</div>
                  ))}
                </div>
                <span className="text-sm"><strong>1200+</strong> человек уже прошли</span>
              </div>
            </div>

            {/* Мокап */}
            <div className="relative">
              <div className="relative mx-auto" style={{ maxWidth: '380px' }}>
                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10" />
                  <div className="bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-inner relative" style={{ aspectRatio: '9/19.5' }}>
                    <img src={process.env.PUBLIC_URL + screens[currentScreen].image} alt={screens[currentScreen].alt} className="w-full h-full object-contain bg-white" style={{ objectPosition: 'center' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    {screens.length > 1 && (
                      <>
                        <button onClick={prevScreen} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-20" aria-label="Предыдущий"><ChevronLeft className="h-6 w-6 text-gray-800" /></button>
                        <button onClick={nextScreen} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-20" aria-label="Следующий"><ChevronRight className="h-6 w-6 text-gray-800" /></button>
                      </>
                    )}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                      {screens.map((_, index) => (
                        <button key={index} onClick={() => setCurrentScreen(index)} className={`transition-all duration-300 rounded-full ${index === currentScreen ? 'bg-orange-500 w-6 h-2' : 'bg-gray-400 hover:bg-gray-500 w-2 h-2'}`} aria-label={`Скриншот ${index+1}`} />
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
