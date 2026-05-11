import axios from 'axios';

const api = axios.create({
  baseURL: 'https://site--serenity-backend--szn96vspx9xb.code.run/api', // الرابط المذكور في API Documentation
});

// إضافة التوكن تلقائياً في الطلبات الخاصة بالأدمن
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;