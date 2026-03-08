import React, { useState } from 'react';
import { Award, CheckCircle, BarChart2, Phone, MessageCircle, Send } from 'lucide-react';
import ContactForm from './ContactForm';

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <>
      <section id="about-me" className="py-20 bg-gradient-to-b from-white to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
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

          <div className="lg:flex lg:items-start lg:space-x-12">
            {/* Image + Certificate + Contacts */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="relative">
                <div className="relative w-full h-[750px] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={process.env.PUBLIC_URL + '/images/instruktor.jpg'}
                    alt="Александр Попов - инструктор по дыхательной гимнастике Бутейко"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      console.error('Error loading image');
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-100/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
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

              {/* Блок контактов */}
              <div className="mt-8 bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-lg border-2 border-primary-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Связаться со мной
                </h3>
                <div className="space-y-4">
                  <a
                    href="https://t.me/AS_Popov87"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 group border border-primary-100 hover:border-blue-300"
                  >
                    <div className="bg-blue-500 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Telegram</p>
                      <p className="text-lg font-semibold text-gray-900">@AS_Popov87</p>
                    </div>
                    <span className="text-blue-500 font-medium group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>

                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="w-full flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 group border border-primary-100 hover:border-primary-300"
                  >
                    <div className="bg-primary-600 p-3 rounded-lg group-hover:bg-primary-700 transition-colors duration-300">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm text-gray-500 font-medium">Телефон</p>
                      {showPhone ? (
                        <a href="tel:+79224705187" className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                          +7 (922) 470-51-87
                        </a>
                      ) : (
                        <p className="text-lg font-semibold text-gray-900">Нажмите, чтобы показать</p>
                      )}
                    </div>
                    <span className="text-primary-600 font-medium group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>

                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="w-full flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 group border border-primary-100 hover:border-orange-300"
                  >
                    <div className="bg-orange-500 p-3 rounded-lg group-hover:bg-orange-600 transition-colors duration-300">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm text-gray-500 font-medium">Форма обратной связи</p>
                      <p className="text-lg font-semibold text-gray-900">Написать сообщение</p>
                    </div>
                    <span className="text-orange-500 font-medium group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
                <p className="text-center text-gray-600 mt-6 text-sm">
                  Отвечу в течение дня. Готов обсудить вашу ситуацию и подобрать индивидуальную программу.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Сертифицированный инструктор по методу Бутейко
              </h2>
              <div className="text-xl text-gray-600 space-y-4">
                <p>
                  Больше 30 лет я жил с бронхиальной астмой, аллергией и полипами в носу. Операции, ингаляторы, постоянное лечение — всё это было частью моей жизни.
                </p>
                <p>
                  Метод Бутейко помог мне изменить ситуацию: астма ушла в стойкую ремиссию, полипы исчезли, дыхание стало свободным. Это произошло благодаря последовательной практике и терпению.
                </p>
                <p>
                  Сейчас я сертифицированный инструктор и помогаю людям с похожими проблемами — астмой, аллергией, хроническим насморком, полипами, паническими атаками, гипервентиляцией.
                </p>
                <p className="font-medium text-gray-800">
                  Важно: метод Бутейко — это не лечение и не замена врачебной помощи. Я не врач. Все назначения остаются за вашим доктором, любые изменения в приёме лекарств — только с его разрешения.
                </p>
                <p>
                  Моя задача — научить вас правильному дыханию, которое поддерживает здоровье и улучшает качество жизни. Работаю индивидуально, бережно, с учётом вашей ситуации.
                </p>
                <p className="font-medium text-primary-600">
                  Если вы хотите попробовать метод Бутейко под руководством человека, прошедшего этот путь сам — напишите мне.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
};

export default AboutMe;