import React, { useState, useEffect } from 'react';
import { QuoteProvider, useQuote } from './components/QuoteContext';
import Toast from './components/Toast';
import Header from './components/Header';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import About from './components/About';
import Services from './components/Services';
import QuoteForm from './components/QuoteForm';
import Contact from './components/Contact';
import { useLocalStorage } from './hooks/useLocalStorage';

function AppContent() {
  const [isDark, setIsDark] = useLocalStorage('theme', false);
  const [isArabic, setIsArabic] = useLocalStorage('language', false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast, hideToast } = useQuote();

  // Apply theme and direction to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
  }, [isDark, isArabic]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const handleLanguageToggle = () => {
    setIsArabic(!isArabic);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <Header
          isDark={isDark}
          isArabic={isArabic}
          isMobileMenuOpen={isMobileMenuOpen}
          onThemeToggle={handleThemeToggle}
          onLanguageToggle={handleLanguageToggle}
          onMobileMenuToggle={handleMobileMenuToggle}
          onNavigate={handleNavigate}
        />
        
        <main>
          <section id="home">
            <Hero isDark={isDark} isArabic={isArabic} />
          </section>
          
          <Statistics isDark={isDark} isArabic={isArabic} />
          
          <section id="about">
            <About isDark={isDark} isArabic={isArabic} />
          </section>
          
          <section id="services">
            <Services isDark={isDark} isArabic={isArabic} />
          </section>
          
          <section id="quote">
            <QuoteForm isDark={isDark} isArabic={isArabic} />
          </section>
          
          <section id="contact">
            <Contact isDark={isDark} isArabic={isArabic} />
          </section>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <QuoteProvider>
      <AppContent />
    </QuoteProvider>
  );
}

export default App;