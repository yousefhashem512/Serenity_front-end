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

// معالجة الأخطاء بدون عرض رابط API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // إنشء كائن خطأ آمن بدون إعرض الرابط الحساس
    const safeError = new Error();
    


    
    if (error.response) {
      // خطأ من السيرفر
      safeError.message = `خطأ: ${error.response.status}`;
      safeError.status = error.response.status;
      safeError.data = error.response.data;
    } else if (error.request) {
      // لا توجد استجابة من السيرفر
      safeError.message = 'لم يتمكن من الاتصال بالخادم';
    } else {
      // خطأ آخر
      safeError.message = 'حدث خطأ ما';
    }
    
    // تسجيل الخطأ الفعلي في الـ Development فقط
    if (import.meta.env.DEV) {
      console.debug('API Error:', error);
    }
    
    return Promise.reject(safeError);
  }
);

export default api;