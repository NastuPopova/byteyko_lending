import React, { useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PageNavigation from './components/PageNavigation';
import BreathingIssues from './components/BreathingIssues';
import Symptoms from './components/Symptoms';
import BreathingConsequences from './components/BreathingConsequences';
import ScrollToTop from './components/ScrollToTop';
import PopupNotifications from './components/PopupNotifications';
import StickyCTA from './components/StickyCTA';
import './App.css';

// Отложенная загрузка — компоненты ниже первого экрана
const AboutBreathing = lazy(() => import('./components/AboutBreathing'));
const BreathingTest = lazy(() => import('./components/BreathingTest'));
const ScienceBlock = lazy(() => import('./components/ScienceBlock'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const Reviews = lazy(() => import('./components/Reviews'));
const Products = lazy(() => import('./components/Products'));
const ProductComparison = lazy(() => import('./components/ProductComparison'));
const FAQ = lazy(() => import('./components/FAQ'));
const BuyCourse = lazy(() => import('./components/BuyCourse'));
const Footer = lazy(() => import('./components/Footer'));
const ContactForm = lazy(() => import('./components/ContactForm'));

// Скелетон — плавный фон пока загружается секция
const SectionLoader = () => (
  <div className="w-full py-24 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin" />
  </div>
);

function App() {
  const [surveyOpen, setSurveyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PageNavigation />
      <BreathingIssues />
      <Symptoms />
      <BreathingConsequences />
      <Suspense fallback={<SectionLoader />}>
        <BreathingTest surveyOpen={surveyOpen} onSurveyToggle={setSurveyOpen} />
        <ScienceBlock />
        <AboutBreathing />
        <AboutMe />
        <Products />
        <ProductComparison />
        <Reviews />
        <FAQ />
        <BuyCourse />
        <Footer />
      </Suspense>
      <ScrollToTop hidden={surveyOpen} />
      <PopupNotifications hidden={surveyOpen} />
      <StickyCTA hidden={surveyOpen} />
    </div>
  );
}

export default App;
