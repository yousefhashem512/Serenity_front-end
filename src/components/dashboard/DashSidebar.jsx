import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart2, CalendarCheck, DollarSign,  Images,
  CalendarX, LogOut, Menu, X
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard/analytics', icon: BarChart2, label: 'الإحصائيات' },
  { to: '/dashboard/bookings', icon: CalendarCheck, label: 'الحجوزات' },
  { to: '/dashboard/pricing', icon: DollarSign, label: 'الأسعار' },
  { to: '/dashboard/slots', icon: CalendarX, label: 'المواعيد' },
  { to: '/dashboard/gallery', icon: Images, label: 'المعرض' },
];

const DashSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* شعار */}
      <div className="px-6 py-6 border-b border-[#E8E0D5]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2C1810] flex items-center justify-center flex-shrink-0">
            <span className="text-[#C49A3C] font-bold text-base font-[Amiri]">S</span>
          </div>
          <div>
            <p className="font-bold text-[#2C1810] text-sm leading-tight">Serenity</p>
            <p className="text-xs text-[#7A6455]">لوحة التحكم</p>
          </div>
        </div>
      </div>

      {/* روابط */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#2C1810] text-white shadow-sm'
                  : 'text-[#7A6455] hover:bg-[#2C1810]/8 hover:text-[#2C1810]'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* تسجيل الخروج */}
      <div className="px-3 py-4 border-t border-[#E8E0D5]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={17} />
          تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* زر الموبايل */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-50 md:hidden p-2 bg-white border border-[#E8E0D5] rounded-xl shadow-sm text-[#2C1810]"
      >
        <Menu size={20} />
      </button>

      {/* Overlay الموبايل */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar الموبايل */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-white border-l border-[#E8E0D5] shadow-xl transform transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 left-4 p-1.5 rounded-lg text-[#7A6455] hover:text-[#2C1810]"
        >
          <X size={18} />
        </button>
        <SidebarContent />
      </div>

      {/* Sidebar الديسكتوب */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-l border-[#E8E0D5] h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
};

export default DashSidebar;
