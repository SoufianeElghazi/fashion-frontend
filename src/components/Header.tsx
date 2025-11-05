import React from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import logo from '../utils/logo.png';

interface HeaderProps {
  isDark: boolean;
  isArabic: boolean;
  isMobileMenuOpen: boolean;
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
  onMobileMenuToggle: () => void;
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  isDark,
  isArabic,
  isMobileMenuOpen,
  onThemeToggle,
  onLanguageToggle,
  onMobileMenuToggle,
  onNavigate
}) => {
  const translations = {
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      quote: 'Quote',
      contact: 'Contact'
    },
    ar: {
      home: 'الرئيسية',
      about: 'شكون حنا',
      services: 'خدماتنا',
      quote: 'طلب عرض',
      contact: 'اتصل بنا'
    }
  };

  const t = translations[isArabic ? 'ar' : 'en'];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/80 border-purple-500/20' 
        : 'bg-white/80 border-purple-200'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src={logo} 
                alt="Herfetlwala Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {Object.entries(t).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`font-medium transition-colors duration-200 hover:text-purple-600 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={onLanguageToggle}
              className={`p-2 rounded-lg transition-colors duration-200 flex items-center space-x-1 ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Globe size={20} />
              <span className="text-sm font-medium">{isArabic ? 'EN' : 'AR'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={onMobileMenuToggle}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className={`py-4 space-y-2 border-t ${
            isDark ? 'border-purple-500/20' : 'border-purple-200'
          }`}>
            {Object.entries(t).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  onNavigate(key);
                  onMobileMenuToggle();
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isDark 
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-purple-400' 
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;