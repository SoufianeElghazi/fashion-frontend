import React, { useEffect, useState, useRef } from 'react';
import { Package, Heart, Crown, Sparkles } from 'lucide-react';

interface StatisticsProps {
  isDark: boolean;
  isArabic: boolean;
}

const Statistics: React.FC<StatisticsProps> = ({ isDark, isArabic }) => {
  const [counters, setCounters] = useState({
    products: 0,
    clients: 0,
    heritage: 0,
    experience: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const translations = {
    en: {
      products: 'Products Delivered',
      clients: 'Loyal Clients',
      heritage: 'Years of Heritage',
      experience: 'Years of Experience'
    },
    ar: {
      products: 'منتوج خرج',
      clients: 'كليان دايرين فينا الثيقة',
      heritage: 'سنة من التراث',
      experience: 'عام ديال الخبرة'
    }
  };

  const t = translations[isArabic ? 'ar' : 'en'];

  const stats = [
    { key: 'products', target: 10000, icon: Package, color: 'text-blue-500', emoji: '📦' },
    { key: 'clients', target: 100, icon: Heart, color: 'text-pink-500', emoji: '❤️' },
    { key: 'heritage', target: 100, icon: Crown, color: 'text-gold-500', emoji: '👑' },
    { key: 'experience', target: 40, icon: Sparkles, color: 'text-purple-500', emoji: '✨' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat) => {
      let current = 0;
      const increment = stat.target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [stat.key]: Math.floor(current)
        }));
      }, 20);
    });
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-20 ${
        isDark 
          ? 'bg-gradient-to-r from-gray-900 to-purple-900' 
          : 'bg-gradient-to-r from-purple-100 to-blue-100'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className={`relative overflow-hidden text-center p-6 rounded-2xl backdrop-blur-md border transition-transform duration-300 hover:scale-105 before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:rounded-t-2xl before:bg-gradient-to-r before:from-purple-500 before:to-orange-400 ${
                  isDark 
                    ? 'bg-white/10 border-purple-500/20' 
                    : 'bg-white/60 border-purple-200'
                }`}
              >
                <div className="flex items-center justify-center mb-4">
                  <Icon className={`w-8 h-8 ${stat.color} mr-2`} />
                  <span className="text-2xl">{stat.emoji}</span>
                </div>
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {counters[stat.key as keyof typeof counters].toLocaleString()}
                  {stat.key === 'products' && '+'}
                  {stat.key === 'clients' && '+'}
                  {stat.key === 'heritage' && '+'}
                  {stat.key === 'experience' && '+'}
                </div>
                <p className={`text-sm md:text-base font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {t[stat.key as keyof typeof t]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;