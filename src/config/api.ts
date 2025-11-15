// Configuration de l'API
const API_CONFIG = {
  // URL de base - à changer selon l'environnement
  BASE_URL: import.meta.env.VITE_API_URL || 'https://fashion-backend-nrg5.onrender.com',
  
  // Endpoints
  ENDPOINTS: {
    CREATE_QUOTE: '/api/quotes',
    GET_QUOTE: (id: string) => `/api/quotes/${id}`,
  },
  
  // Timeout en millisecondes
  TIMEOUT: 30000,
};

// Fonction helper pour faire des requêtes
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      ...defaultOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        errorData.message || 
        `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please check your connection');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};

// Fonction spécifique pour créer un devis
export const createQuote = async (quoteData: any) => {
  return apiRequest(API_CONFIG.ENDPOINTS.CREATE_QUOTE, {
    method: 'POST',
    body: JSON.stringify(quoteData),
  });
};

// Fonction pour récupérer un devis
export const getQuote = async (quoteId: string) => {
  return apiRequest(API_CONFIG.ENDPOINTS.GET_QUOTE(quoteId), {
    method: 'GET',
  });
};

export default API_CONFIG;
