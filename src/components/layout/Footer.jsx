import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const currentYear = new Date().getFullYear();

  // أيقونات SVG مرسومة بدقة
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/serenity_recovry1?igsh=MTQyeWQ2bnR2c3h1cw==',
      path: (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      )
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@serenityrecovery1?_r=1&_t=ZS-96CLfdeeNAj',
      path: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    },
    {
      name: 'Call',
      url: 'tel:+201006768004',
      path: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    },
  ];

  return (
    <footer className="w-full bg-spa-bg py-6 border-t border-spa-border" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between md:gap-4">

          {/* Icons Group */}
          <div className="flex items-center gap-5 order-1">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                aria-label={link.name}
                className="text-spa-brown-mid hover:text-spa-gold transition-all duration-300 hover:-translate-y-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  {link.path}
                </svg>
              </a>
            ))}
          </div>

          {/* Copyright Text */}
          <div className="order-2 text-center">
            <p className="font-cairo text-[12px] md:text-[13px] text-spa-brown-mid font-medium tracking-wide uppercase">
              {isRtl
                ? `© ${currentYear} سيرينيتي للعلاج بالحجامة • جميع الحقوق محفوظة`
                : `© ${currentYear} Serenity cupping therapy • All Rights Reserved`}
            </p>
          </div>

          {/* Designer Info */}
          <div className="order-3 text-center md:text-right">
            <p className="font-cairo text-[10px] text-spa-brown-mid/60 uppercase tracking-[0.15em]">
              {isRtl ? (
                <>
                  تطوير وتصميم بواسطة <span className="text-spa-gold font-bold">ELBAYAN IT</span>
                </>
              ) : (
                <>
                  WEB DESIGN & DEVELOPMENT BY
                  <a href="https://www.albayan-eg.com" target="_blank" rel="noopener noreferrer" className="text-spa-gold font-bold">ALBAYAN IT</a>
                </>
              )}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;