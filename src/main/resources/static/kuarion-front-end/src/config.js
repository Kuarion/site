export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://168.231.91.164'  // Try HTTPS
  : 'http://localhost:8081';

export const API_ENDPOINTS = {
  login: '/authentication/pf/login',
  register: '/authentication/pf/register'
};