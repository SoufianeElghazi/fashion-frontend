import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Instagram, Facebook, Clock } from 'lucide-react';

interface ContactProps {
  isDark: boolean;
  isArabic: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDark, isArabic }) => {
  const translations = {
    en: {
      title: 'Get in Touch 📞',
      subtitle: 'We\'re here to bring your fashion dreams to life',
      workingHours: 'Working Hours',
      monday: 'Monday - Friday',
      weekend: 'Saturday - Sunday',
      time1: '9:00 AM - 6:00 PM',
      time2: '10:00 AM - 4:00 PM',
      contacts: [
        {
          icon: Phone,
          title: 'Phone',
          value: '+212 6XX XXX XXX',
          description: 'Call us anytime',
          color: 'text-green-500'
        },
        {
          icon: MessageCircle,
          title: 'WhatsApp',
          value: '+212 6XX XXX XXX',
          description: 'Quick responses',
          color: 'text-green-500'
        },
        {
          icon: MapPin,
          title: 'Address',
          value: 'Casablanca, Morocco',
          description: 'Visit our atelier',
          color: 'text-red-500'
        },
        {
          icon: Mail,
          title: 'Email',
          value: 'info@herfetlwala.com',
          description: 'Send us details',
          color: 'text-blue-500'
        },
        {
          icon: Instagram,
          title: 'Instagram',
          value: '@herfetlwala',
          description: 'See our work',
          color: 'text-pink-500'
        },
        {
          icon: Facebook,
          title: 'Facebook',
          value: 'Herfetlwala',
          description: 'Follow updates',
          color: 'text-blue-600'
        }
      ]
    },
    ar: {
      title: '📞 تواصلي معنا',
      subtitle: 'نحن هنا لتحقيق أحلامك في الموضة',
      workingHours: 'ساعات العمل',
      monday: 'الاثنين - الجمعة',
      weekend: 'السبت - الأحد',
      time1: '9:00 صباحاً - 6:00 مساءً',
      time2: '10:00 صباحاً - 4:00 مساءً',
      contacts: [
        {
          icon: Phone,
          title: 'الهاتف',
          value: '+212 6XX XXX XXX',
          description: 'اتصلي بنا في أي وقت',
          color: 'text-green-500'
        },
        {
          icon: MessageCircle,
          title: 'واتساب',
          value: '+212 6XX XXX XXX',
          description: 'ردود سريعة',
          color: 'text-green-500'
        },
        {
          icon: MapPin,
          title: 'العنوان',
          value: 'الدار البيضاء، المغرب',
          description: 'زوري ورشتنا',
          color: 'text-red-500'
        },
        {
          icon: Mail,
          title: 'البريد الإلكتروني',
          value: 'info@herfetlwala.com',
          description: 'أرسلي لنا التفاصيل',
          color: 'text-blue-500'
        },
        {
          icon: Instagram,
          title: 'إنستغرام',
          value: '@herfetlwala',
          description: 'شاهدي أعمالنا',
          color: 'text-pink-500'
        },
        {
          icon: Facebook,
          title: 'فيسبوك',
          value: 'Herfetlwala',
          description: 'تابعي التحديثات',
          color: 'text-blue-600'
        }
      ]
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

        <div className="max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {t.contacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-3xl backdrop-blur-md border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    isDark 
                      ? 'bg-white/10 border-purple-500/20 hover:bg-white/20' 
                      : 'bg-white/80 border-purple-200 hover:bg-white'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 text-white`} />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {contact.title}
                    </h3>
                    <p className={`text-lg font-semibold mb-2 ${contact.color}`}>
                      {contact.value}
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {contact.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Working Hours */}
          <div className={`p-8 rounded-3xl backdrop-blur-md border text-center ${
            isDark 
              ? 'bg-white/10 border-purple-500/20' 
              : 'bg-white/80 border-purple-200'
          }`}>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {t.workingHours}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.monday}
                </p>
                <p className={`text-purple-600 font-medium`}>
                  {t.time1}
                </p>
              </div>
              <div>
                <p className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {t.weekend}
                </p>
                <p className={`text-purple-600 font-medium`}>
                  {t.time2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;