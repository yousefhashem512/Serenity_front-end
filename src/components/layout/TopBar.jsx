// src/components/layout/TopBar.jsx
import { useLanguage } from '../../context/LanguageContext';
import { Phone, Clock, Menu } from 'lucide-react';
import { useSidebar } from '../../hooks/useSidebar';
import { Link } from 'react-router-dom'; // تأكد من استيراد Link

const TopBar = () => {
  const { lang, setLang } = useLanguage();
  const isRtl = lang === 'ar';
  const { toggleSidebar } = useSidebar();

  return (
    <div className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} w-full h-[40px] bg-spa-bg border-b border-spa-border z-[100] flex items-center px-4 md:px-10 justify-between text-[13px] font-cairo`}>
      {/* جهة اليسار (في RTL): تبديل اللغة */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-1 rounded hover:bg-spa-border/50">
          <Menu size={18} />
        </button>
        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="hover:text-spa-gold transition-colors font-bold"
        >
          {lang === 'ar' ? 'EN' : 'AR'}
        </button>
      </div>

      {/* المنتصف: الهاتف ومواعيد العمل */}
      <div className="hidden md:flex items-center gap-6 text-spa-brown-mid">
        <div className={`flex ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}  items-center gap-2`}>
          <span >01006768004</span>
          <span className="text-spa-gold"><Phone size={16} /></span>
        </div>
        <div className={`flex ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}  items-center gap-2`}>
          <span>{lang === 'ar' ? 'السبت - الجمعة:09:00ص – 12:00ص' : 'SAT - FRI: 09:00AM – 12:00AM'}</span>
          <span className="text-spa-gold"><Clock size={16} /></span>
        </div>
      </div>

      {/* جهة اليمين (في RTL): اسم المركز الصغير */}
      <div className="flex items-center gap-3 text-spa-brown-mid font-bold">

        {/* رابط الشروط: يستخدم Link الخاص برياكت روتر */}
        <Link
          to="/terms"
          className="hover:text-spa-gold transition-colors cursor-pointer whitespace-nowrap"
        >
          {lang === 'ar' ? 'الشروط' : 'Terms'}
        </Link>


        {/* رابط السياسات: يستخدم Link الخاص برياكت روتر */}
        <Link
          to="/policies"
          className="hover:text-spa-gold transition-colors cursor-pointer whitespace-nowrap"
        >
          {lang === 'ar' ? 'السياسات' : 'Policies'}
        </Link>
      </div>
    </div>
  );
};

export default TopBar;