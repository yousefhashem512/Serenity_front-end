import axios from 'axios';
const baseURL = import.meta.env.VITE_API_LINK

const api = axios.create({
  baseURL: baseURL, // الرابط المذكور في API Documentation
});
// إضافة التوكن تلقائياً في الطلبات الخاصة بالأدمن
api.interceptors.request.use((config) => {
  // Replace the localStorage line with this:
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('adminToken='))
    ?.split('=')[1];
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;