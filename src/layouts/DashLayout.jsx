import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashSidebar from '../components/dashboard/DashSidebar';

const DashLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAF8F4] flex">
      {/* Sidebar */}
      <DashSidebar />

      {/* المحتوى الرئيسي */}
      <main className="flex-1 min-w-0 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashLayout;
