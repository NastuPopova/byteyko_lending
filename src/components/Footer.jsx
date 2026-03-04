import React, { useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* О проекте */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-100">Александр Попов</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Сертифицированный инструктор по дыхательной гимнастике Бутейко.
              Помогаю людям избавиться от астмы, аллергии и других проблем с дыханием.
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-100">Контакты</h3>
            <div className="space-y-4">
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 group w-full text-left"
              >
                <div className="bg-primary-600 p-3 rounded-lg group-hover:bg-primary-700 transition-colors duration-200">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Телефон</p>
                  {showPhone ? (
                    <a href="tel:+79224705187" className="text-lg font-semibold hover:text-primary-400">
                      +7 (922) 470-51-87
                    </a>
                  ) : (
                    <p className="text-lg font-semibold">Нажмите, чтобы показать</p>
                  )}
                </div>
              </button>

              <a
                href="https://t.me/AS_Popov87"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <div className="bg-blue-500 p-3 rounded-lg group-hover:bg-blue-600 transition-colors duration-200">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telegram</p>
                  <p className="text-lg font-semibold">@AS_Popov87</p>
                </div>
              </a>

              <a
                href="mailto:murchelon@yandex.ru"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 group"
              >
                <div className="bg-red-500 p-3 rounded-lg group-hover:bg-red-600 transition-colors duration-200">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-lg font-semibold">murchelon@yandex.ru</p>
                </div>
              </a>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-100">Навигация</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about-breathing"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#about-breathing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  О дыхании
                </a>
              </li>
              <li>
                <a
                  href="#about-me"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#about-me')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Обо мне
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#reviews')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Отзывы
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Купить курс
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Александр Попов, г. Тюмень. Все права защищены.
            </p>
            <p className="text-gray-400 text-center md:text-right">
              Дыхательная гимнастика по методу Бутейко
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;