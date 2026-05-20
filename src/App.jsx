import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import WebLayout from './layouts/WebLayout';
import DashLayout from './layouts/DashLayout';

// Pages - سنقوم بإنشائها لاحقاً
import Home from './pages/Website/Home';
import Terms from './pages/Website/Terms';
import Policies from './pages/Website/Policies';

// صفحات لوحة التحكم
import Login from './pages/Dashboard/Login';
import Analytics from './pages/Dashboard/Analytics';
import Bookings from './pages/Dashboard/Bookings';
import Pricing from './pages/Dashboard/Pricing';
import Slots from './pages/Dashboard/Slots';
import Gallery from './pages/Dashboard/Gallery';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>

          <BrowserRouter>
            <Routes>
              {/* مسارات الموقع الرئيسي */}
              <Route path="/" element={<WebLayout />}>
                <Route index element={<Home />} />
                {/* أضف هنا صفحات المعرض والتواصل لاحقاً */}
              </Route>
              <Route path="/terms" element={<Terms />} />
              <Route path="/policies" element={<Policies />} />
              {/* تسجيل الدخول */}

              <Route path="/admin/login" element={<Login />} />
              {/* لوحة التحكم */}
              <Route path="/blacknode" element={<DashLayout />}>
                <Route index element={<Navigate to="analytics" replace />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="slots" element={<Slots />} />
                <Route path="gallery" element={<Gallery />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;