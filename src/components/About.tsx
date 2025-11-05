import React from 'react';
import { Crown, Briefcase, Palette, Scissors, Sparkles, Users } from 'lucide-react';

interface AboutProps {
  isDark: boolean;
  isArabic: boolean;
}

const About: React.FC<AboutProps> = ({ isDark, isArabic }) => {
  const translations = {
    en: {
      title: 'Meet Our Artisans👑',
      subtitle: 'We are a mother-daughter duo carrying on a legacy over 100 years old-our craft has been passed from generation to generation, from mother to daughter',
      souad: {
        name: 'Souad',
        title: 'The Master Craftsperson 👑',
        skills: [
          'Technical drawing expert',
          'Sewing & embroidery expert', 
          'Knitting & crochet expert',
          '+40 years experience'
        ]
      },
      yasmine: {
        name: 'Yasmine',
        title: 'The Modern Touch 💼',
        skills: [
          'Social media & sales manager',
          'Fashion illustrator',
          'Fashion design apprentice',
          'Sewing apprentice'
        ],
        quote: 'I can be my mom\'s model too! 😄'
      }
    },
    ar: {
      title: 'تعرفي على حرفياتنا',
      subtitle: 'حنا أم و بنتها خدامات فميرات اللي بدى اكثر من 100 عام هادي حرفتنا بقات مستامرة من جيل لجيل من كل الأم للبنتها',
      souad: {
        name: 'سعاد',
        title: 'الحرفية الماهرة 👑',
        skills: [
          'معلمة فالفصالة',
          'معلمة فالخياطة و الطرز',
          'معلمة فالقتبان و الكروشي',
          'عندها أكثر من 40 عام ديال الخبرة',
        ]
      },
      yasmine: {
        name: 'ياسمين',
        title: 'اللمسة العصرية 💼',
        skills: [
          'مسؤولة على السوشيال ميديا والبيع و الشرا',
          'رسامة أزياء',
          'متعلمة فالفصالة',
          'متعلمة فالخياطة'
        ],
        quote: 'نقدر نكون مانكان ديال ماما! 😄'
      }
    }
  };

  const t = translations[isArabic ? 'ar' : 'en'];

  return (
    <section className={`py-20 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-purple-900' 
        : 'bg-gradient-to-br from-purple-50 to-blue-50'
    }`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6366F1] to-[#F59E0B] bg-clip-text text-transparent"
          >
            {t.title}
          </h2>
          <p className={`text-xl ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t.subtitle}
          </p>
        </div>

        {/* Profile Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Souad's Card */}
          <div className={`p-8 rounded-3xl backdrop-blur-md border transition-transform duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-white/10 border-purple-500/20' 
              : 'bg-white/80 border-purple-200'
          }`}>
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-gold-500 flex items-center justify-center">
                <Crown className="w-12 h-12 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {t.souad.name}
              </h3>
              <p className={`text-lg font-semibold text-purple-600 mb-4`}>
                {t.souad.title}
              </p>
            </div>

            <div className="space-y-3">
              {t.souad.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <Scissors className="w-6 h-6 text-purple-500" />
              <Palette className="w-6 h-6 text-blue-500" />
              <Sparkles className="w-6 h-6 text-gold-500" />
            </div>
          </div>

          {/* Yasmine's Card */}
          <div className={`p-8 rounded-3xl backdrop-blur-md border transition-transform duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-white/10 border-purple-500/20' 
              : 'bg-white/80 border-purple-200'
          }`}>
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {t.yasmine.name}
              </h3>
              <p className={`text-lg font-semibold text-blue-600 mb-4`}>
                {t.yasmine.title}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {t.yasmine.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            {/* Speech Bubble */}
            <div className={`relative p-4 rounded-2xl ${
              isDark ? 'bg-blue-900/50' : 'bg-blue-50'
            }`}>
              <div className="absolute -top-2 left-6 w-4 h-4 bg-blue-500 rotate-45"></div>
              <p className={`text-center font-medium ${
                isDark ? 'text-blue-300' : 'text-blue-700'
              }`}>
                {t.yasmine.quote}
              </p>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <Users className="w-6 h-6 text-blue-500" />
              <Palette className="w-6 h-6 text-purple-500" />
              <Sparkles className="w-6 h-6 text-pink-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;