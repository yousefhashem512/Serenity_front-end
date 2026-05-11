import { Outlet } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import SidebarNav from '../components/layout/SidebarNav';
import Footer from '../components/layout/Footer';
// import FloatingBookButton from '../components/ui/FloatingBookButton';
import { useLanguage } from '../context/LanguageContext';
import { SidebarProvider } from '../context/SidebarContext';
import { useSidebar } from '../hooks/useSidebar';


const WebLayout = () => {
  return (
    <SidebarProvider>
      <LayoutBody />
    </SidebarProvider>
  );
};

const LayoutBody = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const { isOpen } = useSidebar();

  const padClass = isOpen ? (isRtl ? 'md:pr-[220px]' : 'md:pl-[220px]') : (isRtl ? 'md:pr-0' : 'md:pl-0');

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col md:flex-row-reverse overflow-x-hidden">

      {/* الـ Sidebar ثابت جهة اليمين في الـ RTL */}
      <SidebarNav />

      <main className={`flex-1 transition-all duration-300 ${padClass} relative pt-[40px]`}>
        {/* الـ TopBar ثابت في الأعلى */}
        <TopBar />
        <Outlet /> {/* هنا تظهر محتويات الصفحات */}
        <Footer />
      </main>
      {/* <FloatingBookButton /> */}
    </div>
  );
};

export default WebLayout;