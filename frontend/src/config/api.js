// Get the API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

/**
 * Get the full API URL for a given endpoint
 * @param {string} endpoint - API endpoint (e.g., '/api/products')
 * @returns {string} Full API URL
 */
export const getApiUrl = (endpoint) => {
  // If we're in development and using proxy, return relative URL
  if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
    return endpoint;
  }
  
  // In production or when VITE_API_BASE_URL is set, use absolute URL
  return `${API_BASE_URL}${endpoint}`;
};

export default API_BASE_URL;
