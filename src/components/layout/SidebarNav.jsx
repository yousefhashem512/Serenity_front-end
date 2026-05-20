import { useState, useEffect } from 'react';
import { Home, ClipboardList, Images as ImageIcon, Phone, ShieldAlert, X ,HeartHandshake } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSidebar } from '../../hooks/useSidebar';
import logoImg from '../../assets/image/Logo.png';
const navItems = [
  { id: 'hero', label: 'Home', labelAr: 'الرئيسية', icon: <Home size={18} strokeWidth={1.5} /> },
  { id: 'benefits', label: 'Benefits', labelAr: 'فوائد', icon: <ClipboardList size={18} strokeWidth={1.5} /> },
  { id: 'services', label: 'Services', labelAr: 'الخدمات', icon: <HeartHandshake size={18} strokeWidth={1.5} /> },
  { id: 'gallery', label: 'Gallery', labelAr: 'معرض الصور', icon: <ImageIcon size={18} strokeWidth={1.5} /> },
  { id: 'about', label: 'About', labelAr: 'عن سيرينتي', icon: <ShieldAlert size={18} strokeWidth={1.5} /> },
  { id: 'contact', label: 'Contact', labelAr: 'تواصل معنا', icon: <Phone size={18} strokeWidth={1.5} /> },
];

const SidebarNav = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const [activeId, setActiveId] = useState('hero'); // الحالة لتخزين القسم الحالي
  const { isOpen, toggleSidebar } = useSidebar();

  

  // دالة لمراقبة الأقسام وتغيير الـ Active ID تلقائياً
  useEffect(() => {
    // 1. الإعدادات (Options): دي المسطرة اللي بنقيس بيها
    const observerOptions = {
      root: null, // null معناها راقب بالنسبة لشاشة المتصفح (Viewport)

      // rootMargin: أهم جزء! ده بيعمل "منطقة وهمية" المتصفح بيراقب فيها.
      // '-20% 0px -70% 0px' معناها:
      // تجاهل أول 20% من الشاشة فوق، وتجاهل آخر 70% من تحت.
      // كأننا بنقول للمتصفح: "ركز بس على الحتة اللي في النص (الـ 10% اللي فاضلة)"
      // لو السيكشن دخل في الحتة دي، اعتبره هو اللي نشط (Active).
      rootMargin: '-20% 0px -70% 0px',

      threshold: 0, // 0 معناها بمجرد ما "طرف" السيكشن يلمس المنطقة اللي حددناها فوق، نفذ الكود.
    };

    // 2. الوظيفة (Callback): ده اللي هيحصل لما سيكشن يدخل المنطقة المحددة
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // لو السيكشن الحالي دخل (Is Intersecting) في نطاق الرؤية
        if (entry.isIntersecting) {
          // خد الـ id بتاع السيكشن ده وحطه في الـ ActiveId
          setActiveId(entry.target.id);
        }
      });
    };

    // 3. إنشاء المراقب (Observer): بنعرف المتصفح إننا عايزين نستخدم الخدمة دي
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 4. التشغيل (Execution): بنقول للمراقب يروح يدور على السيكشنز اللي في الـ Nav
    navItems.forEach((item) => {
      // بنجيب العنصر من الصفحة عن طريق الـ id (زي hero, gallery...)
      const element = document.getElementById(item.id);

      // لو العنصر موجود فعلاً في الصفحة، بنقول للمراقب: "خلي عينك عليه"
      if (element) observer.observe(element);
    });

    // 5. التنظيف (Cleanup): مهم جداً للأداء
    // لما المستحدم يقفل الصفحة أو الـ Component يتمسح، بنوقف المراقب
    // عشان ميفضلش شغال في الخلفية ويستهلك رامات على الفاضي
    return () => observer.disconnect();

  }, []);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // sidebar slides in/out using translateX; animation handled by tailwind classes
  const sidebarTransformClass = isRtl
    ? (isOpen ? 'translate-x-0' : 'translate-x-full')
    : (isOpen ? 'translate-x-0' : '-translate-x-full');

  return (
    <nav
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} h-screen w-[220px] bg-spa-bg border-spa-border z-[99] flex flex-col items-center py-8 shadow-sm transform transition-transform duration-300 ${sidebarTransformClass}`}
    >
      {/* mobile close button */}
      <button onClick={toggleSidebar} className={`md:hidden absolute top-4 ${isRtl ? 'right-4' : 'left-4'}`}>
        <X size={20} />
      </button>
      <div className="px-4 w-full mb-12 flex items-center justify-center">
        <img
          src={logoImg}
          alt="Serenity Logo"
          className="w-32 h-auto object-contain cursor-pointer"
          onClick={(e) => handleScroll(e, 'hero')}
        />
      </div>

      <div className="flex flex-col gap-4 w-full px-3">
        {navItems.map((item) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 w-full group
                ${isActive
                  ? 'bg-spa-gold/10 text-spa-gold translate-x-2' // شكل الـ Active
                  : 'text-spa-brown-mid hover:bg-spa-gold/5'     // الشكل العادي
                }
                ${isRtl && isActive ? '-translate-x-2' : ''} 
              `}
            >
              {/* أيقونة مميزة عند الـ Active */}
              <div className={`transition-all duration-300 ${isActive ? 'scale-110 shadow-spa-gold/20' : 'group-hover:scale-110'}`}>
                {item.icon}
              </div>

              {/* نص مميز عند الـ Active */}
              <span className={`text-[12px] font-cairo font-bold transition-colors whitespace-nowrap uppercase tracking-wider
                ${isActive ? 'text-spa-gold' : 'text-spa-brown-mid'}
              `}>
                {isRtl ? item.labelAr : item.label}
              </span>

              {/* خط صغير جانبي يظهر فقط للـ Active */}
              {isActive && (
                <div className={`absolute ${isRtl ? 'right-0' : 'left-0'} w-1 h-6 bg-spa-gold rounded-full`} />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarNav;