import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timeCategories = [
  {
    id: 'morning',
    title: 'Утром',
    emoji: '😴',
    description: 'Как неправильное дыхание влияет на ваше утро',
    bgColor: 'bg-[#ffc67a]',
    iconBgColor: 'bg-[#ffe0a5]',
    borderColor: 'border-[#ffc67a]',
    cardBgColor: 'bg-[#FFF8E1]/90',
    symptoms: [
      { emoji: '😪', text: 'Просыпаетесь усталым, даже после 8 часов сна' },
      { emoji: '🛌', text: 'Трудно встать с кровати и начать день' },
      { emoji: '☕', text: 'Нужно много кофе, чтобы проснуться' },
      { emoji: '🤕', text: 'Утренняя головная боль или заложенность носа' }
    ]
  },
  {
    id: 'day',
    title: 'Днем',
    emoji: '😓',
    description: 'Проблемы, возникающие в течение рабочего дня',
    bgColor: 'bg-[#ff9f7f]',
    iconBgColor: 'bg-[#ffcbb8]',
    borderColor: 'border-[#ff9f7f]',
    cardBgColor: 'bg-[#FFF3E0]/90',
    symptoms: [
      { emoji: '🥱', text: 'К обеду чувствуете полное истощение' },
      { emoji: '🧠', text: 'Трудно сосредоточиться на работе' },
      { emoji: '💤', text: 'Хочется прилечь и отдохнуть после обеда' },
      { emoji: '🤯', text: 'Частые головные боли во второй половине дня' }
    ]
  },
  {
    id: 'evening',
    title: 'Вечером',
    emoji: '😩',
    description: 'Как неправильное дыхание мешает отдыхать',
    bgColor: 'bg-[#9f7fff]',
    iconBgColor: 'bg-[#d0c0ff]',
    borderColor: 'border-[#9f7fff]',
    cardBgColor: 'bg-[#F3E5F5]/90',
    symptoms: [
      { emoji: '🏠', text: 'Приходите домой без сил' },
      { emoji: '🛋️', text: 'Трудно расслабиться после работы' },
      { emoji: '😴', text: 'Долго не можете уснуть' },
      { emoji: '😰', text: 'Тревожные мысли мешают заснуть' }
    ]
  }
];

const Symptoms = () => {
  const [openCards, setOpenCards] = useState(new Array(timeCategories.length).fill(true));

  const toggleCard = (index) => {
    const newOpenCards = [...openCards];
    newOpenCards[index] = !newOpenCards[index];
    setOpenCards(newOpenCards);
  };

  const scrollToTest = () => {
    const testSection = document.getElementById('breathing-test');
    if (testSection) {
      testSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="symptoms" className="py-20 bg-[#fce5e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Заголовок секции */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24 relative"
        >
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff6b6b] to-[#ff4b4b] flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-2xl">!</span>
            </motion.div>
          </div>
          <div className="pt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#912b2b] mb-4">
              Симптомы и проблемы
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Узнайте, как неправильное дыхание влияет на ваше самочувствие и здоровье
            </p>
          </div>
        </motion.div>

        {/* Карточки времени суток */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {timeCategories.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Заголовок карточки */}
              <div className={`${category.bgColor} p-6 flex items-center`}>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`${category.iconBgColor} w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-md`}
                >
                  {category.emoji}
                </motion.div>
                <h3 className="ml-4 text-2xl font-bold text-gray-900">{category.title}</h3>
              </div>

              {/* Описание */}
              <div className={`${category.cardBgColor} p-4 text-base text-gray-600 text-center border-b backdrop-blur-sm`}>
                {category.description}
              </div>

              {/* Список симптомов */}
              <AnimatePresence>
                {openCards[index] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={category.cardBgColor}
                  >
                    <div className="p-6 space-y-6">
                      {category.symptoms.map((symptom, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start space-x-4 symptom-item"
                        >
                          <motion.div 
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className={`${category.iconBgColor} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md symptom-icon`}
                          >
                            <span className="text-2xl">{symptom.emoji}</span>
                          </motion.div>
                          <p className="text-gray-700 text-lg font-medium symptom-text">
                            {symptom.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Кнопка переключения */}
              <div className="p-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleCard(index)}
                  className={`w-full py-3 px-6 rounded-full border-2 transition-colors duration-300 text-base font-semibold
                    ${openCards[index] 
                      ? `${category.borderColor} text-gray-700 bg-white/50` 
                      : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {openCards[index] ? 'Скрыть симптомы' : 'Показать симптомы'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Информационный блок */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[rgba(255,75,75,0.1)] backdrop-blur-sm rounded-xl p-8 mb-16"
        >
          <div className="flex items-center space-x-6">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="bg-[rgba(255,75,75,0.2)] w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
            >
              <span className="text-[#ff4b4b] text-4xl font-bold">!</span>
            </motion.div>
            <div>
              <p className="text-gray-800 text-lg leading-relaxed">
                <strong className="text-[#912b2b] text-xl">Важно!</strong> Эти симптомы не просто временный дискомфорт. Исследования показывают, что без коррекции дыхания они могут привести к более серьезным состояниям, включая гипертонию, хроническую усталость, ослабление иммунитета и другие заболевания.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA кнопка */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTest}
            className="bg-[#ff4b4b] text-white font-semibold py-5 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#ff3b3b] text-lg"
          >
            Пройти тест на качество дыхания
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .symptom-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          padding: 12px 0;
        }
        .symptom-item:last-child {
          border-bottom: none;
        }
        .symptom-text {
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
        }
        .symptom-icon {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
};

export default Symptoms;
