import React from 'react';
import { Award, CheckCircle, BarChart2 } from 'lucide-react';

const achievements = [
  {
    icon: <Award className="h-16 w-16 text-primary-600 stroke-[1.5]" />,
    title: 'Официальный сертификат',
    description: 'Клиника Бутейко®, Москва · Выдан А.Е. Новожиловым · 2026'
  },
  {
    icon: <CheckCircle className="h-16 w-16 text-primary-600 stroke-[1.5]" />,
    title: 'Личный результат',
    description: '30 лет бронхиальной астмы — стойкая ремиссия без лекарств. Полипы рассосались. Аллергия ушла'
  },
  {
    icon: <BarChart2 className="h-16 w-16 text-primary-600 stroke-[1.5]" />,
    title: '96,69% эффективность',
    description: 'Официальная статистика гос. апробации · 10 935 пациентов · Москва, 1990'
  }
];

const AboutMe = () => {
  return (
    <section id="about-me" className="py-20 bg-gradient-to-b from-white to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group text-center"
            >
              <div className="flex justify-center mb-8 transform group-hover:scale-110 transition-transform duration-300">
                {achievement.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {achievement.title}
              </h3>
              <p className="text-gray-600 text-lg">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>

        <div className="lg:flex lg:items-center lg:space-x-12">
          {/* Image + Certificate */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:-mt-20">
            <div className="relative">
              <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={process.env.PUBLIC_URL + '/images/instruktor.png'}
                  alt="Александр Попов - инструктор по дыхательной гимнастике Бутейко"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    console.error('Error loading image');
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-200 rounded-full opacity-50 blur-2xl"></div>
            </div>

            {/* Certificate block */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-primary-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📜</span>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Клиника Бутейко® · Москва</p>
                  <a
                    href={process.env.PUBLIC_URL + '/sertifikat-buteiko.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-primary-600 hover:text-primary-700 underline underline-offset-2 transition-colors duration-200"
                  >
                    Официальный сертификат ↗
                  </a>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Разрешается использовать <strong>Дыхательную гимнастику по Бутейко©</strong> для практических занятий, консультаций и рекламы.
              </p>
              <div className="mt-3">
                <span className="text-sm font-semibold text-gray-800">Попов Александр Сергеевич</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Выдан А.Е. Новожиловым · 02 марта 2026 г.</p>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Александр Попов
            </h2>
            <div className="text-xl text-gray-600 space-y-4 mb-8">
              <p className="font-medium text-gray-800">
                Сертифицированный инструктор по методу Бутейко, практик с личным опытом полного изменения жизни через дыхание.
              </p>
              <p>
                С детства я жил с тяжёлой бронхиальной астмой, сильной аллергией и рецидивирующими полипами в носу. Три операции, бесконечные ингаляторы, приступы удушья по ночам, постоянный страх, что в любой момент снова «накроет» — это была моя реальность больше 30 лет.
              </p>
              <p>
                Пока в один момент я не открыл метод Бутейко по-настоящему глубоко. Не просто почитал — а стал жить по нему каждый день. Результат превзошёл все ожидания:
              </p>
              <ul className="space-y-2 text-lg">
                <li className="flex items-start gap-2"><span className="text-primary-600 font-bold mt-1">✓</span><span>астма ушла в стойкую ремиссию (уже годы без приступов и без гормонов)</span></li>
                <li className="flex items-start gap-2"><span className="text-primary-600 font-bold mt-1">✓</span><span>полипы в носу полностью рассосались (контрольные обследования это подтвердили)</span></li>
                <li className="flex items-start gap-2"><span className="text-primary-600 font-bold mt-1">✓</span><span>аллергия стала гораздо слабее, а качество жизни — совершенно другим</span></li>
              </ul>
              <p>
                Тогда я понял: это не просто гимнастика. Это способ вернуть телу то дыхание, которое ему от природы предназначено. И я не мог оставить этот инструмент только себе.
              </p>
              <p>
                Я получил официальный сертификат инструктора по методу Бутейко, прошёл серьёзное обучение и теперь помогаю другим людям проходить тот же путь — от удушья, страха и зависимости от лекарств к свободному дыханию и настоящему здоровью.
              </p>
              <p>
                Работаю индивидуально, с учётом именно вашей ситуации: астма, аллергия, хронический насморк, полипы, панические атаки от нехватки воздуха, гипервентиляция. Подход одинаково бережный для взрослых и для детей.
              </p>
              <p className="font-medium text-gray-800">
                Если вы устали от симптомов, которые «лечат», но не убирают причину, — давайте сделаем это вместе.<br />
                <span className="text-primary-600">Ваше свободное дыхание ближе, чем кажется.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
