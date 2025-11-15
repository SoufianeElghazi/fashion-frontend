import React, { useState, useEffect } from "react";
import { useQuote } from './QuoteContext';

interface Service {
  icon: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  images: string[];
}

interface ServicesProps {
  isDark: boolean;
  isArabic: boolean;
}

const Services: React.FC<ServicesProps> = ({ isDark, isArabic }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [imageCache, setImageCache] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [clickedImage, setClickedImage] = useState<string | null>(null);
  const { setSelectedModelImage, scrollToQuoteForm } = useQuote();

  const translations = {
    en: {
      title: 'Our Service and Our Models ✨',
      subtitle: 'Personalized tailoring service to create your final product according to your specifications. Clients from Marrakech, Kelaa Sraghna, and Bengrir can bring their own fabric.',
      services: [
        {
          icon: '👚',
          title: 'Blouses',
          description: 'Elegant blouses tailored to perfection',
          price: 'From 150 DH',
          features: ['Custom fit', 'Quality fabrics', 'Modern designs', 'Expert craftsmanship']
        },
        {
          icon: '👗',
          title: 'Dresses',
          description: 'Beautiful dresses for every occasion',
          price: 'From 150 DH',
          features: ['Unique designs', 'Perfect measurements', 'Premium materials', 'Hand-finished details']
        },
        {
          icon: '🧕',
          title: 'Hijabis',
          description: 'Modest and stylish hijab fashion',
          price: 'From 150 DH',
          features: ['Traditional elegance', 'Modern style', 'Comfortable fit', 'Quality fabrics']
        },
        {
          icon: '👶',
          title: 'Kids',
          description: 'Adorable outfits for children',
          price: 'From 150 DH',
          features: ['Comfortable designs', 'Durable materials', 'Playful styles', 'Safe fabrics']
        },
        {
          icon: '🛌',
          title: 'Pyjamas',
          description: 'Comfortable sleepwear for all',
          price: 'From 150 DH',
          features: ['Soft materials', 'Relaxed fit', 'Quality stitching', 'Cozy designs']
        },
        {
          icon: '🧥',
          title: 'Vestes & Gilet',
          description: 'Stylish vests and jackets',
          price: 'From 150 DH',
          features: ['Tailored fit', 'Premium fabrics', 'Seasonal styles', 'Professional finish']
        }
      ],
      viewModels: 'View our models',
      loading: 'Loading...'
    },
    ar: {
      title: '✨ خدمتنا و موديلاتنا',
      subtitle: 'خدمة خياطة مخصصة للحصول على منتج نهائي حسب مواصفاتك. العملاء من مراكش و قلعة السراغنة و بنجرير يمكنهم إحضار أقمشتهم الخاصة.',
      services: [
        {
          icon: '👚',
          title: 'بلوزات',
          description: 'بلوزات أنيقة مفصلة بإتقان',
          price: 'ابتداءً من 150 درهم',
          features: ['قياس مخصص', 'أقمشة عالية الجودة', 'تصاميم عصرية', 'حرفية متقنة']
        },
        {
          icon: '👗',
          title: 'فساتين',
          description: 'فساتين جميلة لكل المناسبات',
          price: 'ابتداءً من 150 درهم',
          features: ['تصاميم فريدة', 'مقاسات مثالية', 'مواد فاخرة', 'تشطيب يدوي']
        },
        {
          icon: '🧕',
          title: 'حجابات',
          description: 'أزياء محتشمة وعصرية للمحجبات',
          price: 'ابتداءً من 150 درهم',
          features: ['أناقة تقليدية', 'أسلوب عصري', 'راحة في اللبس', 'أقمشة فاخرة']
        },
        {
          icon: '👶',
          title: 'أطفال',
          description: 'ملابس رائعة للأطفال',
          price: 'ابتداءً من 150 درهم',
          features: ['تصاميم مريحة', 'مواد متينة', 'أساليب مرحة', 'أقمشة آمنة']
        },
        {
          icon: '🛌',
          title: 'بيجامات',
          description: 'ملابس نوم مريحة للجميع',
          price: 'ابتداءً من 150 درهم',
          features: ['مواد ناعمة', 'قصة مريحة', 'خياطة عالية الجودة', 'تصاميم دافئة']
        },
        {
          icon: '🧥',
          title: 'سترات وجيليهات',
          description: 'سترات وجيليهات أنيقة',
          price: 'ابتداءً من 150 درهم',
          features: ['قصة مفصلة', 'أقمشة فاخرة', 'موديلات موسمية', 'تشطيب احترافي']
        }
      ],
      viewModels: 'عرض الموديلات',
      loading: 'جاري التحميل...'
    }
  };

  const currentLang = isArabic ? 'ar' : 'en';
  const t = translations[currentLang];

  const confirmationText = {
    en: {
      title: 'Add this model to your quote?',
      confirm: 'Yes, add it',
      cancel: 'Cancel'
    },
    ar: {
      title: 'إضافة هذا الموديل إلى طلبك؟',
      confirm: 'نعم، أضف',
      cancel: 'إلغاء'
    }
  };

  const handleImageClick = (imageSrc: string) => {
    setClickedImage(imageSrc);
  };

  const handleConfirmImage = () => {
    if (clickedImage) {
      setSelectedModelImage(clickedImage);
      setClickedImage(null);
      setSelectedService(null);
      
      setTimeout(() => {
        scrollToQuoteForm();
        
        const quoteSection = document.getElementById('quote-form-section');
        if (quoteSection) {
          quoteSection.classList.add('highlight-flash');
          setTimeout(() => {
            quoteSection.classList.remove('highlight-flash');
          }, 2000);
        }
      }, 300);
    }
  };

  const handleCancelImage = () => {
    setClickedImage(null);
  };

  // Map service titles to folder names
  const categoryMap: Record<string, string> = {
    'Blouses': 'Blouses',
    'Dresses': 'Dresses',
    'Hijabis': 'Hijabis',
    'Kids': 'Kids',
    'Pyjamas': 'Pyjamas',
    'Vestes & Gilet': 'VestesGilet',
    'بلوزات': 'Blouses',
    'فساتين': 'Dresses',
    'حجابات': 'Hijabis',
    'أطفال': 'Kids',
    'بيجامات': 'Pyjamas',
    'سترات وجيليهات': 'VestesGilet'
  };

  // Load manifest from root
  useEffect(() => {
    const loadManifest = async () => {
      try {
        console.log('🔍 Chargement du manifeste...');
        
        // Charger depuis la racine du projet
        const response = await fetch('/models-manifest.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const manifest = await response.json();
        console.log('✅ Manifeste chargé:', manifest);
        
        setImageCache(manifest);
      } catch (error) {
        console.error('❌ Erreur lors du chargement du manifeste:', error);
        
        // Fallback: essayer de charger quelques images par défaut
        const fallbackManifest = {
          Blouses: ['/models/Blouses/1.png', '/models/Blouses/2.png', '/models/Blouses/3.png', '/models/Blouses/4.png'],
          Dresses: ['/models/Dresses/1.png', '/models/Dresses/2.png', '/models/Dresses/3.png', '/models/Dresses/4.png', '/models/Dresses/5.png'],
          Hijabis: ['/models/Hijabis/1.png'],
          Kids: ['/models/Kids/1.png', '/models/Kids/2.png'],
          Pyjamas: ['/models/Pyjamas/1.png'],
          VestesGilet: ['/models/VestesGilet/1.png', '/models/VestesGilet/2.png']
        };
        
        console.log('🔄 Utilisation du manifeste de secours');
        setImageCache(fallbackManifest);
      } finally {
        setIsLoading(false);
      }
    };

    loadManifest();
  }, []);

  // Build services with dynamically loaded images
  const servicesWithImages: Service[] = t.services.map((service) => {
    const folderName = categoryMap[service.title];
    const images = imageCache[folderName] || [];
    
    return {
      ...service,
      images
    };
  });

  return (
    <section
      className={`py-20 ${
        isDark
          ? "bg-gradient-to-br from-purple-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-purple-50"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6366F1] to-[#F59E0B] bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p
            className={`text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t.subtitle}
          </p>
        </div>

        {/* Loading indicator */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {t.loading}
            </p>
          </div>
        ) : (
          /* Models as service cards */
          <div className="grid md:grid-cols-3 gap-8">
            {servicesWithImages.map((service, index) => (
              <div
                key={index}
                className={`p-8 rounded-3xl backdrop-blur-md border transition-transform transform hover:scale-105 ${
                  isDark
                    ? "bg-white/10 border-purple-500/20"
                    : "bg-white/80 border-purple-200"
                }`}
              >
                {/* Icon */}
                <div className="flex flex-col items-center mb-6">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-lg mb-4 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {service.description}
                  </p>
                  <p
                    className={`text-xl font-bold mb-4 ${
                      isDark ? "text-purple-300" : "text-purple-700"
                    }`}
                  >
                    {service.price}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span
                        className={`text-sm ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  {t.viewModels}
                  {service.images.length > 0 && (
                    <span className="ml-2 text-xs">({service.images.length})</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div
            className={`relative max-w-4xl w-full p-8 rounded-2xl overflow-y-auto max-h-[90vh] ${
              isDark ? "bg-gray-900" : "bg-white"
            }`}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
              onClick={() => setSelectedService(null)}
            >
              ✖
            </button>
            <h3
              className={`text-2xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              {selectedService.title}
            </h3>
            
            {selectedService.images.length === 0 ? (
              <p className={`text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {isArabic ? 'لا توجد موديلات متاحة بعد' : 'No models available yet'}
              </p>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {selectedService.images.map((src, i) => (
                  <div 
                    key={i} 
                    className="relative group cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => handleImageClick(src)}
                  >
                    {/* Image */}
                    <img
                      src={src}
                      alt={`${selectedService.title} model ${i + 1}`}
                      className="w-full h-80 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                    />
                    
                    {/* Overlay avec animation */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                      {/* Icône */}
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border-2 border-white/50">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Texte */}
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 text-center px-4">
                        <p className="text-white font-bold text-xl mb-2">
                          {isArabic ? 'اختر هذا الموديل' : 'Select this model'}
                        </p>
                        <p className="text-white/80 text-sm">
                          {isArabic ? 'اضغط لإضافة إلى طلبك' : 'Click to add to your quote'}
                        </p>
                      </div>
                      
                      {/* Badge numéro */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {i + 1}
                      </div>
                    </div>

                    {/* Border effet hover */}
                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-purple-500 rounded-xl transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {clickedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4 animate-fadeIn">
          <div
            className={`relative max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 ${
              isDark ? "bg-gray-900" : "bg-white"
            }`}
          >
            {/* Header avec gradient */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center">
              <h3 className="text-3xl font-bold text-white mb-2">
                {confirmationText[currentLang].title}
              </h3>
              <p className="text-white/80 text-sm">
                {isArabic ? 'سيتم إضافة هذا الموديل إلى طلب التسعير الخاص بك' : 'This model will be added to your quote request'}
              </p>
            </div>

            {/* Image avec effet */}
            <div className="p-6">
              <div className="relative group">
                <img
                  src={clickedImage}
                  alt="Selected model"
                  className="rounded-2xl shadow-xl w-full h-96 object-cover"
                />
                {/* Badge "Selected" */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{isArabic ? 'محدد' : 'Selected'}</span>
                </div>
              </div>

              {/* Info supplémentaire */}
              <div className={`mt-6 p-4 rounded-xl ${
                isDark ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                      {isArabic ? 'ما التالي؟' : 'What happens next?'}
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {isArabic 
                        ? 'سيتم نقلك تلقائيًا إلى نموذج الطلب حيث ستجد هذا الموديل مرفقًا'
                        : "You'll be automatically scrolled to the quote form where this model will be attached"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 flex space-x-4">
              <button
                onClick={handleConfirmImage}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{confirmationText[currentLang].confirm}</span>
              </button>
              <button
                onClick={handleCancelImage}
                className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 ${
                  isDark
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>{confirmationText[currentLang].cancel}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
