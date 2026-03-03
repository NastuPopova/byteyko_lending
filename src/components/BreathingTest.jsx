import React from 'react';
import { CheckCircle, Clock, Sparkles, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Адаптивные вопросы',
    description: 'Следующий вопрос формируется на основе ваших ответов'
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Персональные рекомендации',
    description: 'Получите индивидуальный план действий по результатам теста'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Оценка состояния дыхания',
    description: 'Узнайте, насколько правильно вы дышите прямо сейчас'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Всего 2-3 минуты',
    description: 'Быстрое прохождение без регистрации и лишних данных'
  }
];

const BreathingTest = () => {
  const goToTestBot = () => {
    window.open('https://t.me/breathing_diagnostic_bot', '_blank');
  };

  return (
    <section id="breathing-test" className="py-20 bg-gradient-to-br from-orange-50 via-white to-teal-50 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full opacity-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Левая колонка - контент */}
          <div className="mb-12 lg:mb-0">
            {/* Бейдж */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full px-4 py-2 mb-6 shadow-lg">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold text-sm">Одна из лучших анкет в рунете</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Бесплатная диагностика вашего дыхания
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Пройдите интерактивный тест в Telegram и получите персональные рекомендации по улучшению качества дыхания. Анкета адаптируется под ваши ответы и дает точную оценку текущего состояния.
            </p>

            {/* Преимущества */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA кнопка */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={goToTestBot}
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>Пройти тест бесплатно</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <div className="flex items-center gap-2 text-gray-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm"><strong>1200+</strong> человек уже прошли</span>
              </div>
            </div>
          </div>

          {/* Правая колонка - мокап телефона с интерфейсом */}
          <div className="relative">
            <div className="relative mx-auto" style={{ maxWidth: '380px' }}>
              {/* Мокап телефона */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                {/* Вырез для камеры */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10"></div>
                
                {/* Экран */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-inner" style={{ aspectRatio: '9/19.5' }}>
                  {/* Здесь будут ваши скриншоты */}
                  <div className="w-full h-full bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center p-6">
                    <div className="text-center space-y-6">
                      {/* Имитация интерфейса бота */}
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                          </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Диагностика дыхания</h3>
                        <p className="text-sm text-gray-600 mb-4">Ответьте на несколько вопросов</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>

                      {/* Кнопки ответов */}
                      <div className="space-y-3">
                        <div className="bg-white rounded-xl p-4 shadow-md text-left">
                          <p className="text-sm font-medium text-gray-900">Да, часто</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-left">
                          <p className="text-sm font-medium text-gray-900">Иногда</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-left">
                          <p className="text-sm font-medium text-gray-900">Редко</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Декоративные элементы */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-400 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Дополнительная информация внизу */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">2-3 мин</div>
              <p className="text-gray-600">Время прохождения теста</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">15+</div>
              <p className="text-gray-600">Адаптивных вопросов</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <p className="text-gray-600">Бесплатно и анонимно</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreathingTest;