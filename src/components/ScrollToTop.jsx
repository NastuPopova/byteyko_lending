import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = ({ hidden = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (hidden || !isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-6 bg-gradient-to-r from-primary-500 to-primary-600
               text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300
               hover:scale-110 group animate-bounce"
      aria-label="Прокрутить наверх"
    >
      <ArrowUp className="h-10 w-10 transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  );
};

export default ScrollToTop;
