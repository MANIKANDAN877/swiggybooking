// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://swiggybooking.onrender.com'
  : 'http://localhost:5000';

// Fallback URLs for testing
const FALLBACK_URLS = [
  'https://swiggybooking.onrender.com',
  'https://swiggybooking.onrender.com',
  'http://localhost:5000'
];

export const API_ENDPOINTS = {
  RESTAURANTS: `${API_BASE_URL}/api/restaurants`,
  RESTAURANT_BY_ID: (id: string) => `${API_BASE_URL}/api/restaurants/${id}`,
  USERS: `${API_BASE_URL}/api/users`,
  ORDERS: `${API_BASE_URL}/api/orders`,
};

// API helper function with fallback URLs
export const apiFetch = async (url: string, options?: RequestInit, retries = 3): Promise<any> => {
  const originalUrl = url;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      console.log(`API Attempt ${attempt + 1}: ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...options?.headers,
        },
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Success:', data);
      return data;
      
    } catch (error) {
      console.error(`API Attempt ${attempt + 1} failed:`, error);
      
      // Try fallback URL on last attempt
      if (attempt === retries - 1 && FALLBACK_URLS.length > 0) {
        const fallbackUrl = FALLBACK_URLS[attempt % FALLBACK_URLS.length];
        url = originalUrl.replace(API_BASE_URL, fallbackUrl);
        console.log(`Trying fallback URL: ${url}`);
      } else {
        // Add delay before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }
  
  throw new Error(`API failed after ${retries} attempts. Last URL: ${url}`);
};
