export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'http://srv802017.hstgr.cloud'  // Try HTTPS
  : 'http://localhost:8081';

export const API_ENDPOINTS = {
  login: '/authentication/pf/login',
  register: '/authentication/pf/register',
  // Add all your other endpoints here
  social: '/social',
  chat: '/api/chat',
  survey: '/survey',
  forum: '/forum',
  dashboard: '/dashboard',
  statistics: '/statistics'
};