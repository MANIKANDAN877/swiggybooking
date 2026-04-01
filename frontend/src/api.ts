// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://swiggybooking.onrender.com'
  : 'http://localhost:5000';

export const API_ENDPOINTS = {
  RESTAURANTS: `${API_BASE_URL}/api/restaurants`,
  RESTAURANT_BY_ID: (id: string) => `${API_BASE_URL}/api/restaurants/${id}`,
  USERS: `${API_BASE_URL}/api/users`,
  ORDERS: `${API_BASE_URL}/api/orders`,
};

// API helper function
export const apiFetch = async (url: string, options?: RequestInit, retries = 3): Promise<any> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    
    // Retry logic
    if (retries > 0 && error instanceof Error && error.message.includes('CORS')) {
      console.log(`Retrying API call... (${4 - retries}/3)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return apiFetch(url, options, retries - 1);
    }
    
    throw error;
  }
};
