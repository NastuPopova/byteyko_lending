import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const StickyCTA = ({ hidden = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        const headerBottom = header.getBoundingClientRect().bottom;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(headerBottom < 0 && scrollTop > 300);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTestSection = () => {
    const section = document.querySelector('#breathing-test');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-5 left-5 md:left-8 z-50 transition-transform duration-300 ${
        isVisible && !hidden ? 'translate-y-0' : 'translate-y-[100px]'
      }`}
    >
      <button
        onClick={goToTestSection}
        className="group flex items-center justify-center bg-gradient-to-r from-[#ff7d3e] to-[#ff5c15] text-white font-semibold px-4 md:px-6 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden text-sm md:text-base"
      >
        <span className="absolute inset-0 bg-[#ff5c15] opacity-40 z-0 animate-pulse rounded-full"></span>
        <span className="relative z-10 flex items-center whitespace-nowrap">
          <span className="mr-2">Пройти бесплатный тест</span>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transform transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2" />
        </span>
      </button>
    </div>
  );
};

export default StickyCTA;
