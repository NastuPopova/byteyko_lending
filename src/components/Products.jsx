import React, { useState } from 'react';
import { Check, Send, MessageCircle } from 'lucide-react';
import SectionTransition from './SectionTransition';
import ContactForm from './ContactForm';
import PurchaseModal from './PurchaseModal';

const plans = [
  {
    id: 'trial',
    badge: 'Начните здесь',
    badgeColor: '#2D6A4F',
    badgeBg: '#D8F3DC',
    title: 'Видеоурок',
    subtitle: 'Познакомьтесь с методом в удобное время',
    price: '1 500',
    unit: '₽',
    forWhom: null,
    features: [
      'Краткая теоретическая часть метода',
      'Измерение КП до и после упражнения',
      'Снятие симптома прямо во время урока',
      'Доступ к видео сразу после оплаты',
    ],
    cta: 'Получить доступ',
    highlight: false,
  },
  /* ВРЕМЕННО ОТКЛЮЧЕНО — Недельный интенсив (будет заменён другим продуктом)
  {
    id: 'intensive',
    badge: 'Быстрый результат',
    badgeColor: '#7B4F00',
    badgeBg: '#FFF3CD',
    title: 'Недельный интенсив',
    subtitle: '7 дней подряд — формируем привычку правильного дыхания',
    price: '14 000',
    unit: '₽ за неделю',
    forWhom: 'Астма, гипертония, хронические симптомы каждый день',
    features: [
      '7 занятий по 30 минут каждый день',
      'Контроль правильности выполнения в реальном времени',
      'Поддержка в Telegram между занятиями',
      'Ежедневное отслеживание КП — видите прогресс каждый день',
    ],
    cta: 'Записаться',
    highlight: false,
  },
  */
  {
    id: 'course',
    badge: 'Лучший выбор',
    badgeColor: '#1a3a5c',
    badgeBg: '#DBEAFE',
    title: 'Курс 5 занятий',
    subtitle: '5 × 45 мин, раз в неделю — 5 000 ₽ / занятие',
    price: '25 000',
    unit: '₽ за курс',
    forWhom: 'Стресс, общее оздоровление, продолжение после интенсива',
    features: [
      '5 занятий по 45 минут раз в неделю',
      'Полная программа упражнений метода',
      'Отслеживание КП в динамике',
      'Поддержка в Telegram между занятиями',
      'Видеозаписи всех занятий',
    ],
    cta: 'Начать курс',
    highlight: true,
  },
];

const Products = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [modalPlan, setModalPlan] = useState(null);

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-primary-100">
      <SectionTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Выберите формат обучения методу Бутейко
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Официальный метод с государственной апробацией — от первого знакомства до глубокой проработки
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 shadow-xl flex flex-col transition-all duration-300 hover:scale-105 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-primary-600 to-primary-800 text-white ring-4 ring-yellow-400'
                    : 'bg-white text-gray-900'
                }`}
              >
                <div className="mb-2">
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                    style={{ color: plan.badgeColor, backgroundColor: plan.badgeBg }}
                  >
                    {plan.badge}
                  </span>
                  <h3 className={`text-2xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.title}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.highlight ? 'text-primary-100' : 'text-gray-500'}`}>
                    {plan.subtitle}
                  </p>
                  {plan.forWhom && (
                    <p className={`text-xs italic mb-4 ${plan.highlight ? 'text-primary-200' : 'text-gray-400'}`}>
                      Для кого: {plan.forWhom}
                    </p>
                  )}
                </div>

                <div className="flex items-baseline mb-6">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-primary-600'}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-1 text-lg ${plan.highlight ? 'text-primary-100' : 'text-gray-500'}`}>
                    {plan.unit}
                  </span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-yellow-400' : 'text-primary-500'}`} />
                      <span className={`text-sm ${plan.highlight ? 'text-primary-100' : 'text-gray-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setModalPlan(plan)}
                  className={`w-full font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 ${
                    plan.highlight
                      ? 'bg-yellow-400 text-primary-900 hover:bg-yellow-300'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <Send className="h-5 w-5" />
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Есть вопросы? Напишите нам
            </button>
            {showFeedback && (
              <div className="mt-6 max-w-xl mx-auto">
                <ContactForm />
              </div>
            )}
          </div>
        </div>
      </SectionTransition>

      {modalPlan && (
        <PurchaseModal
          initialPlan={modalPlan}
          onClose={() => setModalPlan(null)}
        />
      )}
    </section>
  );
};

export default Products;
