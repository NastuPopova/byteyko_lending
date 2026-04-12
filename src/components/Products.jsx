import React, { useState } from 'react';
import { Check, Send, MessageCircle } from 'lucide-react';
import SectionTransition from './SectionTransition';
import ContactForm from './ContactForm';

const TELEGRAM_BOT = 'breathing_opros_bot';

const plans = [
  {
    id: 'trial',
    badge: 'Начните здесь',
    badgeColor: '#2D6A4F',
    badgeBg: '#D8F3DC',
    title: 'Пробное занятие',
    subtitle: 'Почувствуйте результат за 40 минут',
    price: '1 500',
    unit: '₽ за занятие',
    forWhom: null,
    features: [
      'Замер контрольной паузы до и после',
      'Практика расслабления по Бутейко',
      'Снятие симптома прямо на занятии',
      'Домашнее задание и личная обратная связь',
    ],
    cta: 'Записаться',
    ctaKey: 'trial',
    highlight: false,
  },
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
    ctaKey: 'intensive',
    highlight: false,
  },
  {
    id: 'course',
    badge: 'Лучший выбор',
    badgeColor: '#1a3a5c',
    badgeBg: '#DBEAFE',
    title: 'Курс 5 занятий',
    subtitle: 'Полная программа метода Бутейко под личным контролем',
    price: '25 000',
    unit: '₽ за курс',
    forWhom: 'Стресс, общее оздоровление, продолжение после интенсива',
    features: [
      '5 занятий по 60 минут раз в неделю',
      'Полная программа упражнений метода',
      'Отслеживание КП в динамике',
      'Поддержка в Telegram между занятиями',
      'Видеозаписи всех занятий',
    ],
    cta: 'Начать курс',
    ctaKey: 'course',
    highlight: true,
  },
];

const Products = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleTelegramRedirect = (key) => {
    const links = {
      trial:     `https://t.me/${TELEGRAM_BOT}?start=websiteCtaTrial`,
      intensive: `https://t.me/${TELEGRAM_BOT}?start=websiteCtaIntensive`,
      course:    `https://t.me/${TELEGRAM_BOT}?start=websiteCtaCourse`,
    };
    window.open(links[key], '_blank');
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-primary-100">
      <SectionTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Выберите формат обучения методу Бутейко
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              От первого знакомства до устойчивого результата — каждый шаг подготавливает к следующему
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                id={plan.id}
                className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col${plan.highlight ? ' ring-2 ring-primary-500' : ''}`}
              >
                <div className="relative p-8 flex flex-col flex-1">
                  {/* Бейдж */}
                  <div
                    className="inline-block self-start px-4 py-1 rounded-full text-sm font-semibold mb-4"
                    style={{ background: plan.badgeBg, color: plan.badgeColor }}
                  >
                    {plan.badge}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">{plan.title}</h3>
                  <p className="text-gray-600 mt-1 mb-4">{plan.subtitle}</p>

                  {/* Для кого */}
                  {plan.forWhom && (
                    <p className="text-sm text-primary-700 bg-primary-50 rounded-lg px-3 py-2 mb-4">
                      <span className="font-semibold">Для кого:</span> {plan.forWhom}
                    </p>
                  )}

                  {/* Фичи */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Цена */}
                  <div className="flex flex-col items-center mb-2">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                      <span className="text-xl text-gray-500 ml-1">{plan.unit}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => handleTelegramRedirect(plan.ctaKey)}
                    className={`w-full mt-6 font-semibold py-4 px-8 rounded-full text-lg shadow-lg flex items-center justify-center transition-all duration-300${
                      plan.highlight
                        ? ' bg-primary-600 text-white hover:bg-primary-700 hover:scale-105'
                        : ' bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Блок обратной связи */}
          <div className="mt-12 pt-10 border-t border-primary-200 text-center">
            <p className="text-gray-500 text-base mb-4">
              Telegram не работает? Оставьте заявку — отвечу на почту
            </p>
            <button
              onClick={() => setShowFeedback(true)}
              className="inline-flex items-center justify-center bg-primary-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-primary-700 transition-colors duration-300 shadow-md"
            >
              <MessageCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              Написать инструктору
            </button>
          </div>
        </div>
      </SectionTransition>

      <ContactForm
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
      />
    </section>
  );
};

export default Products;
