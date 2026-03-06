import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTransition from './SectionTransition';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 🆕 ГЛАВНАЯ КНОПКА: Запись через бота с отслеживанием источника
  const goToBot = () => {
    window.open('https://t.me/breathing_opros_bot?start=website_hero', '_blank');
  };

  // Оставляем диагностический бот для теста (опциональная кнопка)
  const goToTestBot = () => {
    window.open('https://t.me/breathing_diagnostic_bot', '_blank');
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full overflow-hidden pt-28 md:pt-36"
    >
      {/* Background Image */}
      <motion.div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000 ease-out ${
          isLoaded ? 'opacity-85 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
        }`}
        style={{
          backgroundImage: `url("${process.env.PUBLIC_URL}/hero.png")`,
          filter: 'brightness(0.9)',
          backgroundPosition: 'center 20%'
        }}
        animate={{
          scale: isLoaded ? [1.1, 1] : 1,
          transition: { duration: 1.5, ease: [0.645, 0.045, 0.355, 1.000] }
        }}
      />

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-teal-500/70 to-teal-700/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0, transition: { duration: 1, delay: 0.5 } }}
      />

      {/* Animated Particles */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0, transition: { duration: 0.5, delay: 1 } }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`
            }}
            animate={{
              y: [-100, 100],
              x: [-20, 20],
              opacity: [0, 0.2, 0],
              transition: {
                duration: Math.random() * 4 + 6,
                repeat: Infinity,
                delay: Math.random() * 5
              }
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative min-h-[calc(100vh-10rem)] flex items-center justify-center py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <SectionTransition>
            <motion.div
              className="bg-black/5 backdrop-blur-sm rounded-3xl p-10 md:p-14 mb-8 border border-white/10 hover:bg-black/10 hover:backdrop-blur-md"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-6 text-sm text-white/90"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } }}
              >
                <span>🏅</span>
                <span>Сертифицированный инструктор · Клиника Бутейко, Москва</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
              >
                Метод Бутейко — оздоровление при{' '}
                <span className="text-orange-400">179 заболеваниях</span>{' '}
                через нормализацию дыхания
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/95 drop-shadow max-w-4xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.7 } }}
              >
                Проверенный метод с двумя государственными апробациями Минздрава СССР и приказом о внедрении 1985 года.
                Устраняет первопричину болезней{' '}
                <span className="font-semibold text-orange-300">— дефицит CO₂</span>{' '}— а не заглушает симптомы.
              </motion.p>

              {/* 🆕 ГЛАВНАЯ КНОПКА - Запись через бота */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.9 } }}
              >
                <motion.button
                  onClick={goToBot}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 active:scale-95 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-teal-800 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🌬️ Записаться на консультацию
                </motion.button>

                {/* Опциональная кнопка для диагностического теста */}
                <motion.button
                  onClick={goToTestBot}
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-teal-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📊 Пройти тест дыхания
                </motion.button>
              </motion.div>

              <motion.p
                className="mt-4 text-sm text-white/90 drop-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5, delay: 1.1 } }}
              >
                ⚡️ Запись и оплата через удобного Telegram-бота
              </motion.p>
            </motion.div>
          </SectionTransition>

          {/* Statistics Card */}
          <SectionTransition>
            <motion.div
              className="bg-black/5 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/10 hover:bg-black/10 hover:backdrop-blur-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 1.3 } }}
            >
              <motion.h3
                className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 1.5 } }}
              >
                96,69%
              </motion.h3>
              <motion.p
                className="text-lg md:text-xl text-white/95 drop-shadow"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 1.7 } }}
              >
                пациентов получили значительное улучшение по данным официальной государственной апробации 1990 года.
                <span className="font-semibold text-orange-300"> Узнайте свой уровень CO₂ сейчас!</span>
              </motion.p>
              <motion.p
                className="text-xs md:text-sm text-white/50 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5, delay: 1.9 } }}
              >
                10 935 пациентов · Всесоюзный семинар врачей · Москва, 1990
              </motion.p>
            </motion.div>
          </SectionTransition>
        </div>
      </div>

      {/* Bottom Wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        initial={{ y: 100 }}
        animate={{ y: 0, transition: { duration: 0.8, delay: 1.9 } }}
      >
        <svg className="w-full h-24" viewBox="0 0 1440 74" preserveAspectRatio="none">
          <motion.path
            fill="white"
            d="M0,0 C280,74 720,74 1440,0 L1440,74 L0,74 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, transition: { duration: 1.5, delay: 2 } }}
          />
        </svg>
      </motion.div>
    </motion.header>
  );
};

export default Hero;
