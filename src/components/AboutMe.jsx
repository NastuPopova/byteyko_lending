import React from 'react';
import { Star, Sparkles, BookOpen } from 'lucide-react';

const achievements = [
  {
    icon: <Star className="h-16 w-16 text-primary-600 fill-primary-600 stroke-[1.5]" />,
    title: 'Индивидуальный подход',
    description: 'Адаптация практик под ваши особенности'
  },
  {
    icon: <Sparkles className="h-16 w-16 text-primary-600 fill-primary-600 stroke-[1.5]" />,
    title: 'Простые техники',
    description: 'Понятные даже для новичков'
  },
  {
    icon: <BookOpen className="h-16 w-16 text-primary-600 fill-primary-600 stroke-[1.5]" />,
    title: 'Современные методики',
    description: 'Регулярно изучаю новые практики'
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
          {/* Image */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:-mt-20">
            <div className="relative">
              <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={process.env.PUBLIC_URL + '/images/instruktor.png'}
                  alt="Александр Попов - инструктор по дыхательным практикам"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    console.error('Error loading image');
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-200 rounded-full opacity-50 blur-2xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Александр Попов
            </h2>
            <div className="text-xl text-gray-600 space-y-4 mb-8">
              <p>
                Сертифицированный инструктор по дыхательным практикам, практикующий современные методики оздоровления.
              </p>
              <p>
                Как мама двоих детей, я не понаслышке знаю, что такое постоянный стресс и тревога. Именно дыхательные практики помогли мне справиться с этими проблемами и обрести внутреннее спокойствие. Обучив своих детей правильному дыханию, я заметила, что они стали реже болеть и лучше справляться с нагрузками.
              </p>
              <p>
                Испытав на себе и своей семье удивительную эффективность правильного дыхания, я решила помогать другим людям, особенно мамам и их детям, открывать для себя этот естественный путь к здоровью и гармонии.
              </p>
              <p>
                Моя миссия — сделать дыхательные практики доступными и понятными для каждого. Я знаю, как важно найти свой путь к здоровому дыханию, и готова поддержать вас на этом пути.
              </p>
              <p>
                В своей работе я использую индивидуальный подход, адаптируя техники под особенности и цели каждого ученика, будь то взрослый или ребенок. Это позволяет достигать результатов максимально комфортно и эффективно.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;