// import React, { useState, useEffect } from 'react';
// import { Send, CheckCircle, Loader, Upload, X, Image } from 'lucide-react';
// import { useQuote } from './QuoteContext';
// import { createQuote } from '../config/api';

// interface QuoteFormProps {
//   isDark: boolean;
//   isArabic: boolean;
// }

// // Interface pour les données structurées à envoyer au backend
// interface QuoteSubmissionData {
//   personal_info: {
//     name: string;
//     phone: string;
//     city: string;
//   };
//   service_info: {
//     service_type: string;
//     has_fabric: string | null;
//   };
//   measurements: {
//     mode: 'manual' | 'standard';
//     manual_measurements?: {
//       bust: number | null;
//       waist: number | null;
//       hip: number | null;
//       height: number | null;
//       shoulder: number | null;
//       arm_length: number | null;
//     };
//     standard_size?: string;
//   };
//   style_preferences: {
//     selected_style: string;
//     color: string;
//     fabric: string;
//     budget: string;
//   };
//   delivery_info: {
//     preferred_date: string;
//   };
//   additional_info: {
//     details: string;
//   };
//   images: {
//     inspiration_images: string[];
//     selected_model_image: string | null;
//   };
// }

// const QuoteForm: React.FC<QuoteFormProps> = ({ isDark, isArabic }) => {
//   const { selectedModelImage, setSelectedModelImage } = useQuote();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     city: '',
//     service: '',
//     bust: '',
//     waist: '',
//     hip: '',
//     height: '',
//     shoulder: '',
//     armLength: '',
//     style: '',
//     color: '',
//     fabric: '',
//     budget: '',
//     deliveryDate: '',
//     details: '',
//     size: '',
//     hasFabric: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [selectedStyle, setSelectedStyle] = useState('');
//   const [uploadedImages, setUploadedImages] = useState<File[]>([]);
//   const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
//   const [measurementMode, setMeasurementMode] = useState<"manual" | "standard">("manual");

//   // Ajouter l'image du modèle sélectionné automatiquement
//   useEffect(() => {
//     if (selectedModelImage) {
//       // Convertir l'URL de l'image en File
//       fetch(selectedModelImage)
//         .then(res => res.blob())
//         .then(blob => {
//           const file = new File([blob], 'selected-model.png', { type: 'image/png' });
//           setUploadedImages(prev => [file, ...prev].slice(0, 5));
//           setImagePreviewUrls(prev => [selectedModelImage, ...prev].slice(0, 5));
//         })
//         .catch(err => console.error('Error loading model image:', err));
//     }
//   }, [selectedModelImage]);

//   const translations = {
//     en: {
//       title: 'Get Your Custom Quote 💎',
//       subtitle: 'Tell us about your dream outfit',
//       personalInfo: 'Personal Information',
//       name: 'Full Name',
//       phone: 'Phone Number',
//       city: 'City',
//       serviceType: 'Model',
//       hasFabric: 'Do you have your own fabric?',
//       hasFabricYes: 'Yes, I have my fabric',
//       hasFabricNo: 'No, I need fabric',
//       measurements: 'Measurements (cm)',
//       chooseMode: "Choose an option",
//       manual: "Manual Measurements",
//       standard: "Standard Size",
//       sizeLabel: "Select Your Size",
//       sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//       bust: 'Bust',
//       waist: 'Waist',
//       hip: 'Hip',
//       height: 'Height',
//       shoulder: 'Shoulder Width',
//       armLength: 'Arm Length',
//       styleGallery: 'Choose Your Style',
//       inspirationImages: 'Upload Inspiration Images',
//       inspirationSubtitle: 'Share your Pinterest finds, style references, or any images that inspire you',
//       uploadButton: 'Click to upload images',
//       uploadHint: 'or drag and drop files here',
//       supportedFormats: 'PNG, JPG, JPEG up to 5MB each',
//       maxImages: 'Maximum 5 images',
//       modelSelected: 'Selected Model',
//       styles: {
//         classic: 'Classic 👗',
//         elegant: 'Elegant ✨',
//         romantic: 'Romantic 🌸',
//         modern: 'Modern 🔥',
//         luxury: 'Luxury 💎',
//         evening: 'Evening 🌙'
//       },
//       preferences: 'Preferences',
//       color: 'Preferred Color',
//       fabric: 'Fabric Type',
//       budget: 'Budget Range',
//       deliveryDate: 'Preferred Delivery Date',
//       details: 'Additional Details',
//       detailsPlaceholder: 'Tell us more about your vision, special requirements, or any other details...',
//       submit: 'Submit Quote Request',
//       submitting: 'Submitting...',
//       success: 'Quote request submitted successfully!',
//       cities: ['Casablanca', 'Rabat', 'Marrakech','Ben Guerir','El Kelâa des Sraghna', 'Fes', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan'],
//       services: ['Blouses', 'Pyjamas', 'Dresses','Hijabis','Kids','Vestes & Gilet'],
//       fabrics: ['Cotton', 'Silk', 'Chiffon', 'Satin', 'Lace', 'Velvet', 'Linen', 'Wool'],
//       budgets: ['300-500 DH', '500-800 DH', '800-1200 DH', '1200-2000 DH', '2000+ DH'],
//     },
//     ar: {
//       title: '💎 احصلي على عرضك المخصص',
//       subtitle: 'أخبرينا عن زيك المثالي',
//       personalInfo: 'المعلومات الشخصية',
//       name: 'الاسم الكامل',
//       phone: 'رقم الهاتف',
//       city: 'المدينة',
//       serviceType: 'موديل',
//       hasFabric: 'هل لديك القماش الخاص بك؟',
//       hasFabricYes: 'نعم، لدي القماش',
//       hasFabricNo: 'لا، أحتاج إلى قماش',
//       measurements: 'المقاسات (سم)',
//       chooseMode: "اختر خيارًا",
//       manual: "مقاسات يدوية",
//       standard: "مقاس جاهز",
//       sizeLabel: "اختاري مقاسك",
//       sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//       bust: 'الصدر',
//       waist: 'الخصر',
//       hip: 'الورك',
//       height: 'الطول',
//       shoulder: 'عرض الكتف',
//       armLength: 'طول الذراع',
//       styleGallery: 'اختاري أسلوبك',
//       inspirationImages: 'تحميل صور الإلهام',
//       inspirationSubtitle: 'شاركي أفكارك من Pinterest، مراجع الأناقة، أو أي صور تلهمك',
//       uploadButton: 'اضغطي لتحميل الصور',
//       uploadHint: 'أو اسحبي الملفات هنا',
//       supportedFormats: 'PNG, JPG, JPEG حتى 5 ميجابايت لكل صورة',
//       maxImages: 'حد أقصى 5 صور',
//       modelSelected: 'الموديل المختار',
//       styles: {
//         classic: 'كلاسيكي 👗',
//         elegant: 'أنيق ✨',
//         romantic: 'رومانسي 🌸',
//         modern: 'عصري 🔥',
//         luxury: 'فاخر 💎',
//         evening: 'سهرة 🌙'
//       },
//       preferences: 'التفضيلات',
//       color: 'اللون المفضل',
//       fabric: 'نوع القماش',
//       budget: 'نطاق الميزانية',
//       deliveryDate: 'تاريخ التسليم المفضل',
//       details: 'تفاصيل إضافية',
//       detailsPlaceholder: 'أخبرينا المزيد عن رؤيتك، المتطلبات الخاصة، أو أي تفاصيل أخرى...',
//       submit: 'إرسال طلب العرض',
//       submitting: 'جاري الإرسال...',
//       success: 'تم إرسال طلب العرض بنجاح!',
//       cities: ['الدار البيضاء', 'الرباط', 'مراكش','بن جرير','قلعة السراغنة', 'فاس', 'طنجة', 'أكادير', 'مكناس', 'وجدة', 'القنيطرة', 'تطوان'],
//       services: ['سترات وجيليهات', 'بيجامات', 'فساتين','حجابات','بلوزات','أطفال'],
//       fabrics: ['قطن', 'حرير', 'شيفون', 'ساتان', 'دانتيل', 'مخمل', 'كتان', 'صوف'],
//       budgets: ['300-500 درهم', '500-800 درهم', '800-1200 درهم', '1200-2000 درهم', '2000+ درهم']
//     }
//   };

//   const t = translations[isArabic ? 'ar' : 'en'];
//   const isSpecialCity = ['Marrakech', 'Ben Guerir', 'El Kelâa des Sraghna', 'مراكش', 'بن جرير', 'قلعة السراغنة'].includes(formData.city);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleStyleSelect = (style: string) => {
//     setSelectedStyle(style);
//     setFormData(prev => ({ ...prev, style }));
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const validFiles = files.filter(file => {
//       const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
//       const isValidSize = file.size <= 5 * 1024 * 1024;
//       return isValidType && isValidSize;
//     });

//     if (uploadedImages.length + validFiles.length > 5) {
//       alert(isArabic ? 'يمكنك تحميل 5 صور كحد أقصى' : 'Maximum 5 images allowed');
//       return;
//     }

//     setUploadedImages(prev => [...prev, ...validFiles]);

//     validFiles.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index: number) => {
//     // Si c'est l'image du modèle sélectionné (index 0 et selectedModelImage existe)
//     if (index === 0 && selectedModelImage) {
//       setSelectedModelImage(null);
//     }
//     setUploadedImages(prev => prev.filter((_, i) => i !== index));
//     setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     const files = Array.from(e.dataTransfer.files);
//     const validFiles = files.filter(file => {
//       const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
//       const isValidSize = file.size <= 5 * 1024 * 1024;
//       return isValidType && isValidSize;
//     });

//     if (uploadedImages.length + validFiles.length > 5) {
//       alert(isArabic ? 'يمكنك تحميل 5 صور كحد أقصى' : 'Maximum 5 images allowed');
//       return;
//     }

//     setUploadedImages(prev => [...prev, ...validFiles]);

//     validFiles.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   // Convertir les images en base64
//   const convertImagesToBase64 = async (files: File[]): Promise<string[]> => {
//     const promises = files.map(file => {
//       return new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => resolve(reader.result as string);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });
//     });
//     return Promise.all(promises);
//   };

//   // Préparer les données pour l'API
//   const prepareSubmissionData = async (): Promise<QuoteSubmissionData> => {
//     const inspirationImagesBase64 = await convertImagesToBase64(uploadedImages);

//     return {
//       personal_info: {
//         name: formData.name,
//         phone: formData.phone,
//         city: formData.city,
//       },
//       service_info: {
//         service_type: formData.service,
//         has_fabric: isSpecialCity ? formData.hasFabric : null,
//       },
//       measurements: {
//         mode: measurementMode,
//         ...(measurementMode === 'manual' ? {
//           manual_measurements: {
//             bust: formData.bust ? parseFloat(formData.bust) : null,
//             waist: formData.waist ? parseFloat(formData.waist) : null,
//             hip: formData.hip ? parseFloat(formData.hip) : null,
//             height: formData.height ? parseFloat(formData.height) : null,
//             shoulder: formData.shoulder ? parseFloat(formData.shoulder) : null,
//             arm_length: formData.armLength ? parseFloat(formData.armLength) : null,
//           }
//         } : {
//           standard_size: formData.size
//         })
//       },
//       style_preferences: {
//         selected_style: formData.style,
//         color: formData.color,
//         fabric: formData.fabric,
//         budget: formData.budget,
//       },
//       delivery_info: {
//         preferred_date: formData.deliveryDate,
//       },
//       additional_info: {
//         details: formData.details,
//       },
//       images: {
//         inspiration_images: inspirationImagesBase64,
//         selected_model_image: selectedModelImage,
//       },
//     };
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       // Préparer les données structurées
//       const submissionData = await prepareSubmissionData();
      
//       console.log('📤 Sending data to backend:', submissionData);
      
//       // Envoi au backend FastAPI
//       const response = await fetch('http://localhost:8000/api/quotes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(submissionData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to submit quote');
//       }

//       const result = await response.json();
//       console.log('✅ Response from API:', result);
      
//       // Afficher un message de succès détaillé
//       if (result.email_sent && result.whatsapp_sent) {
//         console.log('✓ Email et WhatsApp envoyés avec succès');
//       } else if (result.email_sent) {
//         console.log('✓ Email envoyé, WhatsApp échoué');
//       } else if (result.whatsapp_sent) {
//         console.log('✓ WhatsApp envoyé, Email échoué');
//       }
      
//       setIsSubmitting(false);
//       setIsSubmitted(true);
      
//       // Reset après 3 secondes
//       setTimeout(() => {
//         setIsSubmitted(false);
//         setFormData({
//           name: '', phone: '', city: '', service: '', bust: '', waist: '', hip: '',
//           height: '', shoulder: '', armLength: '', style: '', color: '', fabric: '',
//           budget: '', deliveryDate: '', details: '', size: '', hasFabric: ''
//         });
//         setSelectedStyle('');
//         setUploadedImages([]);
//         setImagePreviewUrls([]);
//         setSelectedModelImage(null);
//       }, 3000);
      
//     } catch (error) {
//       console.error('❌ Error submitting quote:', error);
      
//       // Message d'erreur détaillé
//       let errorMessage = isArabic 
//         ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.' 
//         : 'Error submitting quote. Please try again.';
      
//       if (error instanceof Error) {
//         errorMessage += `\n${error.message}`;
//       }
      
//       alert(errorMessage);
//       setIsSubmitting(false);
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <section id="quote-form-section" className={`py-20 ${
//         isDark 
//           ? 'bg-gradient-to-br from-gray-900 to-green-900' 
//           : 'bg-gradient-to-br from-green-50 to-blue-50'
//       }`}>
//         <div className="container mx-auto px-4">
//           <div className="max-w-2xl mx-auto text-center">
//             <div className="animate-bounce mb-8">
//               <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
//             </div>
//             <h2 className={`text-4xl font-bold mb-4 ${
//               isDark ? 'text-white' : 'text-gray-800'
//             }`}>
//               {t.success}
//             </h2>
//             <p className={`text-xl ${
//               isDark ? 'text-gray-300' : 'text-gray-600'
//             }`}>
//               We'll contact you soon with your personalized quote! ✨
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="quote-form-section" className={`py-20 ${
//       isDark 
//         ? 'bg-gradient-to-br from-purple-900 to-gray-900' 
//         : 'bg-gradient-to-br from-purple-50 to-blue-50'
//     }`}>
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6366F1] to-[#F59E0B] bg-clip-text text-transparent">
//             {t.title}
//           </h2>
//           <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
//             {t.subtitle}
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           <form onSubmit={handleSubmit} className={`p-8 rounded-3xl backdrop-blur-md border ${
//             isDark ? 'bg-white/10 border-purple-500/20' : 'bg-white/80 border-purple-200'
//           }`}>
            
//             {/* Personal Information - identique à votre code */}
//             <div className="mb-8">
//               <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
//                 {t.personalInfo}
//               </h3>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {t.name} *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                       isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                     }`}
//                   />
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {t.phone} *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     required
//                     className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                       isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                     }`}
//                   />
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {t.city} *
//                   </label>
//                   <select
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     required
//                     className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                       isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                     }`}
//                   >
//                     <option value="">{isArabic ? 'اختر المدينة' : 'Select City'}</option>
//                     {t.cities.map((city) => (
//                       <option key={city} value={city}>{city}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Fabric Question */}
//             {isSpecialCity && (
//               <div className="mb-8">
//                 <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                   {t.hasFabric} *
//                 </label>
//                 <div className="flex space-x-4">
//                   <label className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     <input
//                       type="radio"
//                       name="hasFabric"
//                       value="yes"
//                       checked={formData.hasFabric === 'yes'}
//                       onChange={handleInputChange}
//                       required
//                       className="w-4 h-4 text-purple-600"
//                     />
//                     <span>{t.hasFabricYes}</span>
//                   </label>
//                   <label className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     <input
//                       type="radio"
//                       name="hasFabric"
//                       value="no"
//                       checked={formData.hasFabric === 'no'}
//                       onChange={handleInputChange}
//                       required
//                       className="w-4 h-4 text-purple-600"
//                     />
//                     <span>{t.hasFabricNo}</span>
//                   </label>
//                 </div>
//               </div>
//             )}

//             {/* Service Type */}
//             <div className="mb-8">
//               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                 {t.serviceType} *
//               </label>
//               <select
//                 name="service"
//                 value={formData.service}
//                 onChange={handleInputChange}
//                 required
//                 className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                   isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                 }`}
//               >
//                 <option value="">{isArabic ? 'اختر الموديل' : 'Select Model'}</option>
//                 {t.services.map((service) => (
//                   <option key={service} value={service}>{service}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Measurements */}
//             <div className="mb-8">
//               <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
//                 {t.measurements}
//               </h3>
//               <div className="flex space-x-4 mb-6">
//                 <button
//                   type="button"
//                   onClick={() => setMeasurementMode("manual")}
//                   className={`px-6 py-3 rounded-lg font-medium transition-all ${
//                     measurementMode === "manual"
//                       ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
//                       : isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
//                   }`}
//                 >
//                   {t.manual}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setMeasurementMode("standard")}
//                   className={`px-6 py-3 rounded-lg font-medium transition-all ${
//                     measurementMode === "standard"
//                       ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
//                       : isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
//                   }`}
//                 >
//                   {t.standard}
//                 </button>
//               </div>

//               {measurementMode === "manual" && (
//                 <div className="grid md:grid-cols-3 gap-6">
//                   {[
//                     { key: "bust", label: t.bust },
//                     { key: "waist", label: t.waist },
//                     { key: "hip", label: t.hip },
//                     { key: "height", label: t.height },
//                     { key: "shoulder", label: t.shoulder },
//                     { key: "armLength", label: t.armLength },
//                   ].map(({ key, label }) => (
//                     <div key={key}>
//                       <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                         {label}
//                       </label>
//                       <input
//                         type="number"
//                         name={key}
//                         value={formData[key as keyof typeof formData]}
//                         onChange={handleInputChange}
//                         className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                           isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                         }`}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {measurementMode === "standard" && (
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {t.sizeLabel}
//                   </label>
//                   <select
//                     name="size"
//                     value={formData.size}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                       isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                     }`}
//                   >
//                     <option value="">{isArabic ? "اختر" : "Select"}</option>
//                     {t.sizes.map((s) => (
//                       <option key={s} value={s}>{s}</option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//             </div>

//             {/* Style Gallery */}
//             {/* <div className="mb-8">
//               <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
//                 {t.styleGallery}
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {Object.entries(t.styles).map(([key, label]) => (
//                   <button
//                     key={key}
//                     type="button"
//                     onClick={() => handleStyleSelect(key)}
//                     className={`p-4 rounded-xl border-2 transition-all duration-200 ${
//                       selectedStyle === key
//                         ? 'border-purple-500 bg-purple-500/20'
//                         : isDark ? 'border-gray-600 bg-gray-800 hover:border-purple-400' : 'border-gray-300 bg-white hover:border-purple-400'
//                     }`}
//                   >
//                     <div className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
//                       {label}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div> */}

//             {/* Inspiration Images */}
//             <div className="mb-8">
//               <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
//                 {t.inspirationImages}
//               </h3>
//               <p className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
//                 {t.inspirationSubtitle}
//               </p>

//               {/* Badge du modèle sélectionné - Plus visible */}
//               {selectedModelImage && (
//                 <div className={`mb-6 p-6 rounded-2xl border-2 animate-slideUp ${
//                   isDark 
//                     ? 'bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/50' 
//                     : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
//                 }`}>
//                   <div className="flex items-center space-x-4">
//                     {/* Icône animée */}
//                     <div className="flex-shrink-0">
//                       <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse-custom">
//                         <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       </div>
//                     </div>
                    
//                     {/* Texte */}
//                     <div className="flex-1">
//                       <p className={`text-lg font-bold mb-1 ${isDark ? 'text-green-300' : 'text-green-700'}`}>
//                         ✓ {t.modelSelected}
//                       </p>
//                       <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
//                         {isArabic 
//                           ? 'تم إضافة الموديل المحدد إلى طلبك. يمكنك إضافة المزيد من الصور أدناه.'
//                           : 'Your selected model has been added. You can add more inspiration images below.'}
//                       </p>
//                     </div>

//                     {/* Mini preview */}
//                     <div className="flex-shrink-0 hidden md:block">
//                       <img 
//                         src={selectedModelImage} 
//                         alt="Selected model preview" 
//                         className="w-20 h-20 object-cover rounded-lg border-2 border-green-500 shadow-lg"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               <div
//                 onDragOver={handleDragOver}
//                 onDrop={handleDrop}
//                 className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
//                   isDark ? 'border-gray-600 bg-gray-800/50 hover:border-purple-400' : 'border-gray-300 bg-gray-50 hover:border-purple-400'
//                 }`}
//               >
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/png,image/jpeg,image/jpg"
//                   onChange={handleImageUpload}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   disabled={uploadedImages.length >= 5}
//                 />
//                 <div className="flex flex-col items-center">
//                   <Upload className={`w-12 h-12 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
//                   <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
//                     {t.uploadButton}
//                   </p>
//                   <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
//                     {t.uploadHint}
//                   </p>
//                   <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
//                     <p>{t.supportedFormats}</p>
//                     <p>{t.maxImages}</p>
//                   </div>
//                 </div>
//               </div>

//               {imagePreviewUrls.length > 0 && (
//                 <div className="mt-6">
//                   <h4 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
//                     {isArabic ? 'الصور المرفوعة' : 'Uploaded Images'} ({imagePreviewUrls.length}/5)
//                   </h4>
//                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                     {imagePreviewUrls.map((url, index) => (
//                       <div key={index} className="relative group">
//                         <img
//                           src={url}
//                           alt={`Preview ${index + 1}`}
//                           className={`w-full h-32 object-cover rounded-lg border-2 transition-all duration-300 ${
//                             index === 0 && selectedModelImage 
//                               ? 'border-green-500 shadow-lg shadow-green-500/50' 
//                               : 'border-gray-200 group-hover:border-purple-400'
//                           }`}
//                         />
                        
//                         {/* Button de suppression */}
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 shadow-lg z-10"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
                        
//                         {/* Badge "Selected Model" */}
//                         {index === 0 && selectedModelImage && (
//                           <div className="absolute inset-0 bg-gradient-to-t from-green-600/90 to-transparent rounded-lg flex items-end p-2">
//                             <div className="w-full bg-green-500 text-white text-xs font-bold py-1.5 px-2 rounded text-center flex items-center justify-center space-x-1">
//                               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                               </svg>
//                               <span>{isArabic ? 'الموديل المختار' : 'Selected Model'}</span>
//                             </div>
//                           </div>
//                         )}

//                         {/* Numéro de l'image */}
//                         {!(index === 0 && selectedModelImage) && (
//                           <div className="absolute top-2 left-2 w-6 h-6 bg-gray-800/80 text-white rounded-full flex items-center justify-center text-xs font-bold">
//                             {index + 1}
//                           </div>
//                         )}

//                         {/* Hover overlay pour images normales */}
//                         {!(index === 0 && selectedModelImage) && (
//                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
//                             <Image className="w-6 h-6 text-white" />
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Preferences */}
//             <div className="mb-8">
//               <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
//                 {t.preferences}
//               </h3>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {t.color}
//                   </label>
//                   <input
//                     type="text"
//                     name="color"
//                     value={formData.color}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                       isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                     }`}
//                   />
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {t.fabric}
//                   </label>
//                   <select
//                     name="fabric"
//                     value={formData.fabric}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                       isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                     }`}
//                   >
//                     <option value="">{isArabic ? 'اختر القماش' : 'Select Fabric'}</option>
//                     {t.fabrics.map((fabric) => (
//                       <option key={fabric} value={fabric}>{fabric}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {t.budget}
//                   </label>
//                   <select
//                     name="budget"
//                     value={formData.budget}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                       isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                     }`}
//                   >
//                     <option value="">{isArabic ? 'اختر الميزانية' : 'Select Budget'}</option>
//                     {t.budgets.map((budget) => (
//                       <option key={budget} value={budget}>{budget}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                     {t.deliveryDate}
//                   </label>
//                   <input
//                     type="date"
//                     name="deliveryDate"
//                     value={formData.deliveryDate}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
//                       isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
//                     }`}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Additional Details */}
//             <div className="mb-8">
//               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                 {t.details}
//               </label>
//               <textarea
//                 name="details"
//                 value={formData.details}
//                 onChange={handleInputChange}
//                 rows={4}
//                 maxLength={500}
//                 placeholder={t.detailsPlaceholder}
//                 className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 resize-none ${
//                   isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500 placeholder-gray-500'
//                 }`}
//               />
//               <div className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
//                 {formData.details.length}/500 characters
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader className="w-5 h-5 animate-spin" />
//                   <span>{t.submitting}</span>
//                 </>
//               ) : (
//                 <>
//                   <Send className="w-5 h-5" />
//                   <span>{t.submit}</span>
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default QuoteForm;

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Loader, Upload, X, Image } from 'lucide-react';
import { useQuote } from './QuoteContext';
import { createQuote } from '../config/api';

interface QuoteFormProps {
  isDark: boolean;
  isArabic: boolean;
}

// Interface pour les données structurées à envoyer au backend
interface QuoteSubmissionData {
  personal_info: {
    name: string;
    phone: string;
    city: string;
  };
  service_info: {
    service_type: string;
    has_fabric: string | null;
  };
  measurements: {
    mode: 'manual' | 'standard';
    manual_measurements?: {
      bust: number | null;
      waist: number | null;
      hip: number | null;
      height: number | null;
      shoulder: number | null;
      arm_length: number | null;
    };
    standard_size?: string;
  };
  style_preferences: {
    selected_style: string;
    color: string;
    fabric: string;
    budget: string;
  };
  delivery_info: {
    preferred_date: string;
  };
  additional_info: {
    details: string;
  };
  images: {
    inspiration_images: string[];
    selected_model_image: string | null;
  };
}

const QuoteForm: React.FC<QuoteFormProps> = ({ isDark, isArabic }) => {
  const { selectedModelImage, setSelectedModelImage } = useQuote();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    service: '',
    bust: '',
    waist: '',
    hip: '',
    height: '',
    shoulder: '',
    armLength: '',
    style: '',
    color: '',
    fabric: '',
    budget: '',
    deliveryDate: '',
    details: '',
    size: '',
    hasFabric: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [measurementMode, setMeasurementMode] = useState<"manual" | "standard">("manual");

  // Ajouter l'image du modèle sélectionné automatiquement
  useEffect(() => {
    if (selectedModelImage) {
      // Convertir l'URL de l'image en File
      fetch(selectedModelImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'selected-model.png', { type: 'image/png' });
          setUploadedImages(prev => {
            // Éviter les doublons
            const exists = prev.some(f => f.name === 'selected-model.png');
            if (exists) return prev;
            return [file, ...prev].slice(0, 5);
          });
          
          // Créer le preview
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreviewUrls(prev => {
              // Éviter les doublons
              if (prev[0] === selectedModelImage) return prev;
              return [e.target?.result as string, ...prev].slice(0, 5);
            });
          };
          reader.readAsDataURL(file);
        })
        .catch(err => console.error('Error loading model image:', err));
    }
  }, [selectedModelImage]);

  const translations = {
    en: {
      title: 'Get Your Custom Quote 💎',
      subtitle: 'Tell us about your dream outfit',
      personalInfo: 'Personal Information',
      name: 'Full Name',
      phone: 'Phone Number',
      city: 'City',
      serviceType: 'Model',
      hasFabric: 'Do you have your own fabric?',
      hasFabricYes: 'Yes, I have my fabric',
      hasFabricNo: 'No, I need fabric',
      measurements: 'Measurements (cm)',
      chooseMode: "Choose an option",
      manual: "Manual Measurements",
      standard: "Standard Size",
      sizeLabel: "Select Your Size",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      bust: 'Bust',
      waist: 'Waist',
      hip: 'Hip',
      height: 'Height',
      shoulder: 'Shoulder Width',
      armLength: 'Arm Length',
      styleGallery: 'Choose Your Style',
      inspirationImages: 'Upload Inspiration Images',
      inspirationSubtitle: 'Share your Pinterest finds, style references, or any images that inspire you',
      uploadButton: 'Click to upload images',
      uploadHint: 'or drag and drop files here',
      supportedFormats: 'PNG, JPG, JPEG up to 5MB each',
      maxImages: 'Maximum 5 images',
      modelSelected: 'Selected Model',
      styles: {
        classic: 'Classic 👗',
        elegant: 'Elegant ✨',
        romantic: 'Romantic 🌸',
        modern: 'Modern 🔥',
        luxury: 'Luxury 💎',
        evening: 'Evening 🌙'
      },
      preferences: 'Preferences',
      color: 'Preferred Color',
      fabric: 'Fabric Type',
      budget: 'Budget Range',
      deliveryDate: 'Preferred Delivery Date',
      details: 'Additional Details',
      detailsPlaceholder: 'Tell us more about your vision, special requirements, or any other details...',
      submit: 'Submit Quote Request',
      submitting: 'Submitting...',
      success: 'Quote request submitted successfully!',
      cities: ['Casablanca', 'Rabat', 'Marrakech','Ben Guerir','El Kelâa des Sraghna', 'Fes', 'Tangier', 'Agadir', 'Meknes', 'Oujda', 'Kenitra', 'Tetouan'],
      services: ['Blouses', 'Pyjamas', 'Dresses','Hijabis','Kids','Vestes & Gilet'],
      fabrics: ['Cotton', 'Silk', 'Chiffon', 'Satin', 'Lace', 'Velvet', 'Linen', 'Wool'],
      budgets: ['300-500 DH', '500-800 DH', '800-1200 DH', '1200-2000 DH', '2000+ DH'],
    },
    ar: {
      title: '💎 احصلي على عرضك المخصص',
      subtitle: 'أخبرينا عن زيك المثالي',
      personalInfo: 'المعلومات الشخصية',
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      city: 'المدينة',
      serviceType: 'موديل',
      hasFabric: 'هل لديك القماش الخاص بك؟',
      hasFabricYes: 'نعم، لدي القماش',
      hasFabricNo: 'لا، أحتاج إلى قماش',
      measurements: 'المقاسات (سم)',
      chooseMode: "اختر خيارًا",
      manual: "مقاسات يدوية",
      standard: "مقاس جاهز",
      sizeLabel: "اختاري مقاسك",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      bust: 'الصدر',
      waist: 'الخصر',
      hip: 'الورك',
      height: 'الطول',
      shoulder: 'عرض الكتف',
      armLength: 'طول الذراع',
      styleGallery: 'اختاري أسلوبك',
      inspirationImages: 'تحميل صور الإلهام',
      inspirationSubtitle: 'شاركي أفكارك من Pinterest، مراجع الأناقة، أو أي صور تلهمك',
      uploadButton: 'اضغطي لتحميل الصور',
      uploadHint: 'أو اسحبي الملفات هنا',
      supportedFormats: 'PNG, JPG, JPEG حتى 5 ميجابايت لكل صورة',
      maxImages: 'حد أقصى 5 صور',
      modelSelected: 'الموديل المختار',
      styles: {
        classic: 'كلاسيكي 👗',
        elegant: 'أنيق ✨',
        romantic: 'رومانسي 🌸',
        modern: 'عصري 🔥',
        luxury: 'فاخر 💎',
        evening: 'سهرة 🌙'
      },
      preferences: 'التفضيلات',
      color: 'اللون المفضل',
      fabric: 'نوع القماش',
      budget: 'نطاق الميزانية',
      deliveryDate: 'تاريخ التسليم المفضل',
      details: 'تفاصيل إضافية',
      detailsPlaceholder: 'أخبرينا المزيد عن رؤيتك، المتطلبات الخاصة، أو أي تفاصيل أخرى...',
      submit: 'إرسال طلب العرض',
      submitting: 'جاري الإرسال...',
      success: 'تم إرسال طلب العرض بنجاح!',
      cities: ['الدار البيضاء', 'الرباط', 'مراكش','بن جرير','قلعة السراغنة', 'فاس', 'طنجة', 'أكادير', 'مكناس', 'وجدة', 'القنيطرة', 'تطوان'],
      services: ['سترات وجيليهات', 'بيجامات', 'فساتين','حجابات','بلوزات','أطفال'],
      fabrics: ['قطن', 'حرير', 'شيفون', 'ساتان', 'دانتيل', 'مخمل', 'كتان', 'صوف'],
      budgets: ['300-500 درهم', '500-800 درهم', '800-1200 درهم', '1200-2000 درهم', '2000+ درهم']
    }
  };

  const t = translations[isArabic ? 'ar' : 'en'];
  const isSpecialCity = ['Marrakech', 'Ben Guerir', 'El Kelâa des Sraghna', 'مراكش', 'بن جرير', 'قلعة السراغنة'].includes(formData.city);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);
    setFormData(prev => ({ ...prev, style }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (uploadedImages.length + validFiles.length > 5) {
      alert(isArabic ? 'يمكنك تحميل 5 صور كحد أقصى' : 'Maximum 5 images allowed');
      return;
    }

    setUploadedImages(prev => [...prev, ...validFiles]);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    // Si c'est l'image du modèle sélectionné (index 0 et selectedModelImage existe)
    if (index === 0 && selectedModelImage) {
      setSelectedModelImage(null);
    }
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const isValidType = ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (uploadedImages.length + validFiles.length > 5) {
      alert(isArabic ? 'يمكنك تحميل 5 صور كحد أقصى' : 'Maximum 5 images allowed');
      return;
    }

    setUploadedImages(prev => [...prev, ...validFiles]);

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Convertir les images en base64
  const convertImagesToBase64 = async (files: File[]): Promise<string[]> => {
    const promises = files.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    return Promise.all(promises);
  };

  // Préparer les données pour l'API
  const prepareSubmissionData = async (): Promise<QuoteSubmissionData> => {
    const inspirationImagesBase64 = await convertImagesToBase64(uploadedImages);

    return {
      personal_info: {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
      },
      service_info: {
        service_type: formData.service,
        has_fabric: isSpecialCity ? formData.hasFabric : null,
      },
      measurements: {
        mode: measurementMode,
        ...(measurementMode === 'manual' ? {
          manual_measurements: {
            bust: formData.bust ? parseFloat(formData.bust) : null,
            waist: formData.waist ? parseFloat(formData.waist) : null,
            hip: formData.hip ? parseFloat(formData.hip) : null,
            height: formData.height ? parseFloat(formData.height) : null,
            shoulder: formData.shoulder ? parseFloat(formData.shoulder) : null,
            arm_length: formData.armLength ? parseFloat(formData.armLength) : null,
          }
        } : {
          standard_size: formData.size
        })
      },
      style_preferences: {
        selected_style: formData.style,
        color: formData.color,
        fabric: formData.fabric,
        budget: formData.budget,
      },
      delivery_info: {
        preferred_date: formData.deliveryDate,
      },
      additional_info: {
        details: formData.details,
      },
      images: {
        inspiration_images: inspirationImagesBase64,
        selected_model_image: selectedModelImage,
      },
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Préparer les données structurées
      const submissionData = await prepareSubmissionData();
      
      console.log('📤 Sending data to backend:', submissionData);
      
      // Envoi au backend FastAPI via la fonction helper
      const result = await createQuote(submissionData);
      
      console.log('✅ Response from API:', result);
      
      // Afficher un message de succès détaillé
      let successDetails = '';
      if (result.email_sent && result.whatsapp_sent) {
        successDetails = isArabic 
          ? '✓ تم إرسال البريد الإلكتروني و WhatsApp بنجاح'
          : '✓ Email and WhatsApp sent successfully';
        console.log('✓ Email and WhatsApp sent successfully');
      } else if (result.email_sent) {
        successDetails = isArabic
          ? '✓ تم إرسال البريد الإلكتروني بنجاح'
          : '✓ Email sent successfully';
        console.log('✓ Email sent, WhatsApp failed');
      } else if (result.whatsapp_sent) {
        successDetails = isArabic
          ? '✓ تم إرسال WhatsApp بنجاح'
          : '✓ WhatsApp sent successfully';
        console.log('✓ WhatsApp sent, Email failed');
      }
      
      // Optionnel : Afficher les détails dans la console
      console.log(`Quote ID: ${result.quote_id}`);
      console.log(`Status: ${result.status}`);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset après 4 secondes pour laisser le temps de lire le message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '', phone: '', city: '', service: '', bust: '', waist: '', hip: '',
          height: '', shoulder: '', armLength: '', style: '', color: '', fabric: '',
          budget: '', deliveryDate: '', details: '', size: '', hasFabric: ''
        });
        setSelectedStyle('');
        setUploadedImages([]);
        setImagePreviewUrls([]);
        setSelectedModelImage(null);
      }, 4000);
      
    } catch (error) {
      console.error('❌ Error submitting quote:', error);
      
      // Message d'erreur détaillé et traduit
      let errorMessage = '';
      
      if (error instanceof Error) {
        // Gestion des erreurs spécifiques
        if (error.message.includes('timeout')) {
          errorMessage = isArabic
            ? 'انتهت مهلة الاتصال. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.'
            : 'Connection timeout. Check your internet connection and try again.';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = isArabic
            ? 'لا يمكن الاتصال بالخادم. تأكد من أن الخادم يعمل على http://localhost:8000'
            : 'Cannot connect to server. Make sure the backend is running on http://localhost:8000';
        } else {
          errorMessage = isArabic
            ? `خطأ: ${error.message}`
            : `Error: ${error.message}`;
        }
      } else {
        errorMessage = isArabic
          ? 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'
          : 'An unexpected error occurred. Please try again.';
      }
      
      alert(errorMessage);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="quote-form-section" className={`py-20 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 to-green-900' 
          : 'bg-gradient-to-br from-green-50 to-blue-50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-bounce mb-8">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            </div>
            <h2 className={`text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {t.success}
            </h2>
            <p className={`text-xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We'll contact you soon with your personalized quote! ✨
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote-form-section" className={`py-20 ${
      isDark 
        ? 'bg-gradient-to-br from-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 to-blue-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6366F1] to-[#F59E0B] bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className={`p-8 rounded-3xl backdrop-blur-md border ${
            isDark ? 'bg-white/10 border-purple-500/20' : 'bg-white/80 border-purple-200'
          }`}>
            
            {/* Personal Information - identique à votre code */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {t.personalInfo}
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.name} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.phone} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.city} *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                    }`}
                  >
                    <option value="">{isArabic ? 'اختر المدينة' : 'Select City'}</option>
                    {t.cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Fabric Question */}
            {isSpecialCity && (
              <div className="mb-8">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.hasFabric} *
                </label>
                <div className="flex space-x-4">
                  <label className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <input
                      type="radio"
                      name="hasFabric"
                      value="yes"
                      checked={formData.hasFabric === 'yes'}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-purple-600"
                    />
                    <span>{t.hasFabricYes}</span>
                  </label>
                  <label className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <input
                      type="radio"
                      name="hasFabric"
                      value="no"
                      checked={formData.hasFabric === 'no'}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-purple-600"
                    />
                    <span>{t.hasFabricNo}</span>
                  </label>
                </div>
              </div>
            )}

            {/* Service Type */}
            <div className="mb-8">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.serviceType} *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                  isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                }`}
              >
                <option value="">{isArabic ? 'اختر الموديل' : 'Select Model'}</option>
                {t.services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            {/* Measurements */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {t.measurements}
              </h3>
              <div className="flex space-x-4 mb-6">
                <button
                  type="button"
                  onClick={() => setMeasurementMode("manual")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    measurementMode === "manual"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {t.manual}
                </button>
                <button
                  type="button"
                  onClick={() => setMeasurementMode("standard")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    measurementMode === "standard"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {t.standard}
                </button>
              </div>

              {measurementMode === "manual" && (
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { key: "bust", label: t.bust },
                    { key: "waist", label: t.waist },
                    { key: "hip", label: t.hip },
                    { key: "height", label: t.height },
                    { key: "shoulder", label: t.shoulder },
                    { key: "armLength", label: t.armLength },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {label}
                      </label>
                      <input
                        type="number"
                        name={key}
                        value={formData[key as keyof typeof formData]}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                          isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {measurementMode === "standard" && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.sizeLabel}
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                    }`}
                  >
                    <option value="">{isArabic ? "اختر" : "Select"}</option>
                    {t.sizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Style Gallery */}
            {/* <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {t.styleGallery}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(t.styles).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleStyleSelect(key)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedStyle === key
                        ? 'border-purple-500 bg-purple-500/20'
                        : isDark ? 'border-gray-600 bg-gray-800 hover:border-purple-400' : 'border-gray-300 bg-white hover:border-purple-400'
                    }`}
                  >
                    <div className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {label}
                    </div>
                  </button>
                ))}
              </div>
            </div> */}

            {/* Inspiration Images */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {t.inspirationImages}
              </h3>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.inspirationSubtitle}
              </p>

              {/* Badge du modèle sélectionné - Plus visible */}
              {selectedModelImage && (
                <div className={`mb-6 p-6 rounded-2xl border-2 animate-slideUp ${
                  isDark 
                    ? 'bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-green-500/50' 
                    : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                }`}>
                  <div className="flex items-center space-x-4">
                    {/* Icône animée */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse-custom">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Texte */}
                    <div className="flex-1">
                      <p className={`text-lg font-bold mb-1 ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                        ✓ {t.modelSelected}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {isArabic 
                          ? 'تم إضافة الموديل المحدد إلى طلبك. يمكنك إضافة المزيد من الصور أدناه.'
                          : 'Your selected model has been added. You can add more inspiration images below.'}
                      </p>
                    </div>

                    {/* Mini preview */}
                    <div className="flex-shrink-0 hidden md:block">
                      <img 
                        src={selectedModelImage} 
                        alt="Selected model preview" 
                        className="w-20 h-20 object-cover rounded-lg border-2 border-green-500 shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
                  isDark ? 'border-gray-600 bg-gray-800/50 hover:border-purple-400' : 'border-gray-300 bg-gray-50 hover:border-purple-400'
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={uploadedImages.length >= 5}
                />
                <div className="flex flex-col items-center">
                  <Upload className={`w-12 h-12 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {t.uploadButton}
                  </p>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.uploadHint}
                  </p>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p>{t.supportedFormats}</p>
                    <p>{t.maxImages}</p>
                  </div>
                </div>
              </div>

              {imagePreviewUrls.length > 0 && (
                <div className="mt-6">
                  <h4 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {isArabic ? 'الصور المرفوعة' : 'Uploaded Images'} ({imagePreviewUrls.length}/5)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className={`w-full h-32 object-cover rounded-lg border-2 transition-all duration-300 ${
                            index === 0 && selectedModelImage 
                              ? 'border-green-500 shadow-lg shadow-green-500/50' 
                              : 'border-gray-200 group-hover:border-purple-400'
                          }`}
                        />
                        
                        {/* Button de suppression */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 shadow-lg z-10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        
                        {/* Badge "Selected Model" */}
                        {index === 0 && selectedModelImage && (
                          <div className="absolute inset-0 bg-gradient-to-t from-green-600/90 to-transparent rounded-lg flex items-end p-2">
                            <div className="w-full bg-green-500 text-white text-xs font-bold py-1.5 px-2 rounded text-center flex items-center justify-center space-x-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{isArabic ? 'الموديل المختار' : 'Selected Model'}</span>
                            </div>
                          </div>
                        )}

                        {/* Numéro de l'image */}
                        {!(index === 0 && selectedModelImage) && (
                          <div className="absolute top-2 left-2 w-6 h-6 bg-gray-800/80 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                        )}

                        {/* Hover overlay pour images normales */}
                        {!(index === 0 && selectedModelImage) && (
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                            <Image className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preferences */}
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {t.preferences}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.color}
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.fabric}
                  </label>
                  <select
                    name="fabric"
                    value={formData.fabric}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                    }`}
                  >
                    <option value="">{isArabic ? 'اختر القماش' : 'Select Fabric'}</option>
                    {t.fabrics.map((fabric) => (
                      <option key={fabric} value={fabric}>{fabric}</option>
                    ))}
                  </select>
                </div>
                {/* <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.budget}
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                    }`}
                  >
                    <option value="">{isArabic ? 'اختر الميزانية' : 'Select Budget'}</option>
                    {t.budgets.map((budget) => (
                      <option key={budget} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div> */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t.deliveryDate}
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 ${
                      isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="mb-8">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t.details}
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                rows={4}
                maxLength={500}
                placeholder={t.detailsPlaceholder}
                className={`w-full px-4 py-3 rounded-xl border transition-colors duration-200 resize-none ${
                  isDark ? 'bg-gray-800 border-gray-600 text-white focus:border-purple-500 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 focus:border-purple-500 placeholder-gray-500'
                }`}
              />
              <div className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {formData.details.length}/500 characters
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>{t.submitting}</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{t.submit}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;