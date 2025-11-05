import React from 'react';
import { Sparkles, Heart, Crown } from 'lucide-react';
import backImage from '../utils/back.jpg';

interface HeroProps {
  isDark: boolean;
  isArabic: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDark, isArabic }) => {
  const translations = {
    en: {
      title: 'Herfetlwala',
      subtitle: 'حرفة اللوالى',
      description: 'Congrats! You found your personal stylist!',
      tagline: 'Custom dress design, sewing, embroidery & more',
      cta: 'Get Your Quote',
      heritage: '100+ Years of Heritage',
      experience: '40+ Years of Experience',
      clients: '100+ Happy Clients'
    },
    ar: {
      title: 'حرفة اللوالى',
      subtitle: 'Herfetlwala',
      description: 'مبروك! لقيتي الستيليست ديالك',
      tagline: 'تصميم فساتين مخصصة، خياطة، تطريز والمزيد',
      cta: 'احصلي على عرضك',
      heritage: '100+ سنة من التراث',
      experience: '40+ سنة من الخبرة',
      clients: '100+ عميلة سعيدة'
    }
  };

  const t = translations[isArabic ? 'ar' : 'en'];

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'
    }`}>

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backImage})` }}
      />

      {/* Black Overlay with opacity */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gold-500 rounded-full blur-3xl"></div>
      </div>
      

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className={`text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent animate-fade-in`}>
              {t.title}
            </h1>
            <p className={`text-2xl md:text-3xl font-light mb-6 text-gray-200 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t.subtitle}
            </p>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className={`text-3xl md:text-4xl font-semibold mb-4 text-white ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {t.description}
            </h2>
            <p className={`text-xl md:text-2xl text-gray-200 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t.tagline}
            </p>
          </div>

          {/* Heritage Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className={`p-6 rounded-2xl backdrop-blur-md border transition-transform duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-white/10 border-purple-500/20' 
                : 'bg-white/60 border-purple-200'
            }`}>
              <Crown className="w-12 h-12 text-gold-500 mx-auto mb-4" />
              <p className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {t.heritage}
              </p>
            </div>
            <div className={`p-6 rounded-2xl backdrop-blur-md border transition-transform duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-white/10 border-purple-500/20' 
                : 'bg-white/60 border-purple-200'
            }`}>
              <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <p className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {t.experience}
              </p>
            </div>
            <div className={`p-6 rounded-2xl backdrop-blur-md border transition-transform duration-300 hover:scale-105 ${
              isDark 
                ? 'bg-white/10 border-purple-500/20' 
                : 'bg-white/60 border-purple-200'
            }`}>
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <p className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {t.clients}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            {t.cta} ✨
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;