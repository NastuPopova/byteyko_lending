import React from 'react';
import { Check, Gift, Send, Clock } from 'lucide-react';
import SectionTransition from './SectionTransition';

const TELEGRAM_BOT = 'breathing_opros_bot';

const Products = () => {
  // 🎯 КОМБИНИРОВАННЫЕ МЕТКИ: источник + продукт
  // Формат: website-cta-ПРОДУКТ
  // Позволяет отслеживать И откуда пришёл И что выбрал
  const handleTelegramRedirect = (product) => {
    const links = {
      starter: `https://t.me/${TELEGRAM_BOT}?start=website-cta-starter`,
      consultation: `https://t.me/${TELEGRAM_BOT}?start=website-cta-consultation`,
      package5: `https://t.me/${TELEGRAM_BOT}?start=website-cta-package5`
    };
    window.open(links[product], '_blank');
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
              От первого знакомства до полного сопровождения — выберите подходящий вариант
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Стартовый комплект */}
            <div id="basic" className="bg-white rounded-2xl shadow-xl group hover:shadow-2xl transition-all duration-300">
              <div className="relative p-8">
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-xl text-lg transform rotate-12 shadow-lg font-bold z-10 whitespace-nowrap">
                  💎 Самый доступный старт 💎
                </div>
                <div className="bg-teal-50 rounded-xl p-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Стартовый комплект</h3>
                  <p className="text-gray-600 mt-2">Первое знакомство с методом Бутейко</p>
                  <div className="mt-2 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    ⚡️ Мгновенный доступ
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900">Что получите:</h4>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Видеоурок 40 минут по методу Бутейко</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">PDF-инструкция для самостоятельной практики</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Доступ к материалам навсегда</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-8">
                  <div className="flex items-center gap-2 text-yellow-600 font-bold mb-2">
                    <Gift className="h-5 w-5" />
                    <span>Бонус:</span>
                  </div>
                  <div className="text-yellow-800 flex items-start">
                    <Check className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Урок по замеру контрольной паузы (CO₂)</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900">990</span>
                    <span className="text-xl text-gray-500 ml-1">₽</span>
                    <span className="ml-3 text-lg text-gray-400 line-through">2 600 ₽</span>
                    <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">-62%</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleTelegramRedirect('starter')}
                  className="w-full bg-primary-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Получить доступ
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Доступ открывается мгновенно после оплаты
                </p>
              </div>
            </div>

            {/* Разовая консультация */}
            <div id="consultation" className="bg-white rounded-2xl shadow-xl group hover:shadow-2xl transition-all duration-300">
              <div className="relative p-8">
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl text-lg transform rotate-12 shadow-lg font-bold z-10 whitespace-nowrap">
                  ⭐️ Персональный подход ⭐️
                </div>
                <div className="bg-teal-50 rounded-xl p-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Разовая консультация</h3>
                  <p className="text-gray-600 mt-2">Персональное занятие 1:1</p>
                  <div className="mt-2 inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base font-semibold">
                    <Clock className="h-5 w-5 animate-pulse" />
                    Осталось 2 места на этой неделе
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900">Что получите:</h4>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Разбор вашей техники дыхания</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Работа с вашими запросами</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Видеозапись консультации для повторного просмотра</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-8">
                  <div className="flex items-center gap-2 text-yellow-600 font-bold mb-2">
                    <Gift className="h-5 w-5" />
                    <span>Ваш бонус:</span>
                  </div>
                  <div className="text-yellow-800 font-medium">
                    Бесплатный краткий анализ вашего дыхания перед первой консультацией
                  </div>
                </div>
                
                <div className="flex flex-col items-center mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900">5 000</span>
                    <span className="text-xl text-gray-500 ml-1">₽</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">За 1 занятие 60 минут</p>
                </div>
                
                <button 
                  onClick={() => handleTelegramRedirect('consultation')}
                  className="w-full bg-primary-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Забронировать
                </button>
              </div>
            </div>

            {/* Пакет 5 занятий */}
            <div id="package5" className="bg-white rounded-2xl shadow-xl group hover:shadow-2xl transition-all duration-300 ring-2 ring-primary-500">
              <div className="relative p-8">
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-xl text-lg transform rotate-12 shadow-lg font-bold z-10 whitespace-nowrap">
                  🔥 Лучший выбор 🔥
                </div>
                <div className="bg-teal-50 rounded-xl p-4 mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Пакет 5 занятий</h3>
                  <p className="text-gray-600 mt-2">Полное сопровождение + поддержка</p>
                  <div className="mt-2 inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-base font-semibold">
                    <Clock className="h-5 w-5 animate-pulse" />
                    Скидка -3 000₽ действует 24 часа
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900">Что получите:</h4>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">5 персональных консультаций по 60 минут</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Отслеживание контрольной паузы (CO₂) в динамике</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Персональный план под вашу ситуацию</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Поддержка в Telegram между занятиями</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Видеозаписи всех консультаций</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-8">
                  <div className="flex items-center gap-2 text-yellow-600 font-bold mb-2">
                    <Gift className="h-5 w-5" />
                    <span>Ваши бонусы:</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-yellow-800 flex items-start">
                      <Check className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Бесплатный анализ дыхания перед первой консультацией</span>
                    </div>
                    <div className="text-yellow-800 flex items-start">
                      <Check className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Методичка по методу Бутейко (PDF)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center mb-8">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold text-gray-900">22 000</span>
                    <span className="text-xl text-gray-500 ml-1">₽</span>
                    <span className="ml-3 text-lg text-gray-400 line-through">25 000 ₽</span>
                  </div>
                  <p className="text-red-600 font-semibold mt-2">Экономия 3 000₽</p>
                  <p className="text-gray-500 text-sm mt-1">4 400₽ за консультацию</p>
                </div>
                
                <button 
                  onClick={() => handleTelegramRedirect('package5')}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Начать обучение
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  🎯 87% клиентов выбирают этот пакет
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>
    </section>
  );
};

export default Products;
