import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  isVisible: boolean;
}

interface QuoteContextType {
  selectedModelImage: string | null;
  setSelectedModelImage: (image: string | null) => void;
  scrollToQuoteForm: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  toast: ToastState;
  hideToast: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedModelImage, setSelectedModelImage] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    isVisible: false
  });

  const scrollToQuoteForm = () => {
    const quoteSection = document.getElementById('quote-form-section');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <QuoteContext.Provider value={{ 
      selectedModelImage, 
      setSelectedModelImage, 
      scrollToQuoteForm,
      showToast,
      toast,
      hideToast
    }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within QuoteProvider');
  }
  return context;
};