import React from 'react';
import { Send, Clock, Gift } from 'lucide-react';

const TELEGRAM_BOT = 'breathing_opros_bot';

const BuyCourse = () => {
  const handleTelegramRedirect = (product) => {
    const links = {
      starter: `https://t.me/${TELEGRAM_BOT}?start=starter`,
      consultation: `https://t.me/${TELEGRAM_BOT}?start=consultation`,
      package5: `https://t.me/${TELEGRAM_BOT}?start=package5`
    };
    window.open(links[product], '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary-600 to-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Готовы начать обучение методу Бутейко?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Выберите подходящий формат и сделайте первый шаг к здоровому дыханию
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Стартовый */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Стартовый</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-extrabold text-primary-600">990</span>
                <span className="text-xl text-gray-500 ml-1">₽</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Первое знакомство</p>
            </div>
            <button
              onClick={() => handleTelegramRedirect('starter')}
              className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Получить доступ
            </button>
          </div>

          {/* Разовая */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Разовая</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-extrabold text-primary-600">5 000</span>
                <span className="text-xl text-gray-500 ml-1">₽</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">1 консультация</p>
              <div className="mt-3 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                <Clock className="h-4 w-4" />
                Осталось 2 места
              </div>
            </div>
            <button
              onClick={() => handleTelegramRedirect('consultation')}
              className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Забронировать
            </button>
          </div>

          {/* Пакет 5 */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 ring-4 ring-yellow-400">
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-primary-900 px-4 py-2 rounded-xl text-sm font-bold transform rotate-12 shadow-lg">
              🔥 Хит 🔥
            </div>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Пакет 5</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-extrabold text-white">22 000</span>
                <span className="text-xl text-primary-100 ml-1">₽</span>
              </div>
              <p className="text-sm text-primary-100 mt-2 line-through">25 000 ₽</p>
              <p className="text-yellow-300 font-semibold mt-1">Экономия 3 000₽</p>
              <div className="mt-3 inline-flex items-center gap-2 bg-yellow-400 text-primary-900 px-3 py-1 rounded-full text-sm font-bold">
                <Gift className="h-4 w-4" />
                + бонусы
              </div>
            </div>
            <button
              onClick={() => handleTelegramRedirect('package5')}
              className="w-full bg-yellow-400 text-primary-900 font-bold py-3 px-6 rounded-xl hover:bg-yellow-300 transition-colors duration-300 flex items-center justify-center shadow-lg"
            >
              <Send className="h-5 w-5 mr-2" />
              Начать обучение
            </button>
            <p className="text-center text-primary-100 text-sm mt-4">
              🎯 87% клиентов выбирают этот пакет
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-primary-100 text-lg mb-4">
            Остались вопросы?
          </p>
          <a
            href="#faq"
            className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-full hover:bg-primary-50 transition-colors duration-300"
          >
            Смотреть FAQ
          </a>
        </div>
      </div>
    </section>
  );
};

export default BuyCourse;
