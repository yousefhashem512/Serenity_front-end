import Image1 from '../assets/image/AboutImg1.png';
import Image2 from '../assets/image/Sec2Img2.png';
import Avatar1 from '../assets/image/Avatar1.png';
import Avatar2 from '../assets/image/Avatar2.png';
import Avatar3 from '../assets/image/Avatar3.png';
import IconGiest from '../assets/image/BeGiestIcon3.svg';
import IconGiest2 from '../assets/image/BeGiestIcon2.png';
import LikeImage from '../assets/image/LikeImage.png';
import { useLanguage } from '../context/LanguageContext';

/* ─── Testimonials data ────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    avatar: Avatar1,
    nameAr: 'نور أحمد',
    nameEn: 'Nour Ahmed',
    textAr: 'من أول ما دخلت المكان حسيت بالهدوء والنظافة، والفريق كان محترف جداً.',
    textEn: 'From the moment I walked in, I felt calm. The place was spotless and the team was incredibly professional.',
  },
  {
    avatar: Avatar2,
    nameAr: 'محمد حامد',
    nameEn: 'Mohamed Hamed',
    textAr: 'من أول ما دخلت المكان حسيت بالهدوء والنظافة، والفريق كان محترف جداً.',
    textEn: 'Wonderful atmosphere and highly skilled practitioners. I left feeling completely renewed.',
  },
  {
    avatar: Avatar3,
    nameAr: 'يوسف هاشم',
    nameEn: 'Yousef Hashem',
    textAr: 'من أول ما دخلت المكان حسيت بالهدوء والفريق كان محترف جداً.',
    textEn: 'Best cupping experience I,ve ever had.Highly recommend Serenity to everyone.',
  },
];

/* ─── Main component ────────────────────────────────────────────────────────── */
const About = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';

  return (

    <section id="about" className="py-16 xl:py-24" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ══════════════════════════════════════════════
          SECTION 1 — About
      ══════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2 items-center">

          {/* Images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 overflow-hidden rounded-[10px] bg-white shadow-[0_30px_80px_rgba(54,41,27,0.12)]">
              <img
                src={Image1}
                alt={isRtl ? 'صورة جلسة استرخاء' : 'Relaxation session'}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="sm:col-span-1 overflow-hidden rounded-[10px] bg-white shadow-[0_30px_80px_rgba(54,41,27,0.12)]">
              <img
                src={Image2}
                alt={isRtl ? 'صورة الحجامة' : 'Cupping therapy'}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* About Content */}
          <div
            className={`
                relative h-full rounded-[2rem] bg-white p-4 sm:p-6
                shadow-[0_30px_80px_rgba(54,41,27,0.12)]
                ${isRtl
                ? 'text-right border-r-[5px] border-spa-gold'
                : 'text-left border-l-[5px] border-spa-gold'
              }
              `}
          >
            <div className="relative">
              <h2 className="text-2xl font-bold text-spa-gold leading-tight sm:text-3xl font-cairo">
                {isRtl ? 'من نحن' : 'About Us'}
              </h2>
              <p className="mt-5 text-spa-brown-text text-sm leading-7 sm:text-base font-cairo">
                {isRtl
                  ? 'في سيرنتي، نؤمن أن العلاج الحقيقي يبدأ من التوازن بين الجسد والعقل. نقدم لك تجربة متكاملة للعلاج بالحجامة بأسلوب علمي حديث، يجمع بين الطب النبوي وأحدث المعايير الصحية لضمان أفضل النتائج.'
                  : 'At Serenity, we believe that true healing begins with a balance between body and mind. We offer a comprehensive cupping therapy experience using modern scientific methods, combining Prophetic medicine with the latest health standards to ensure optimal results.'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ══════════════════════════════════════════════
          SECTION 2 — Testimonials
      ══════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 py-8 xl:py-12 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-cairo text-3xl sm:text-4xl font-bold text-spa-gold mb-3">
            {isRtl ? 'آراء ضيوفنا' : "Our Guests' Reviews"}
          </h2>
          <p className="font-cairo text-spa-brown-text text-sm sm:text-base">
            {isRtl
              ? 'تجارب حقيقية تعكس جودة الرعاية في سيرنيتي'
              : 'Real experiences reflecting the quality of care at Serenity'}
          </p>
        </div>
        {/* Cards — extra top padding so floating avatars don't clip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-10">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="relative bg-white border border-[#E8E0D5] rounded-2xl mt-10 pt-12 pb-6 px-6
                           shadow-[0_8px_40px_rgba(54,41,27,0.08)]
                           hover:shadow-[0_12px_48px_rgba(54,41,27,0.14)]
                           transition-shadow duration-300
                           flex flex-col items-center text-center"
            >
              {/* Floating avatar */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="w-20 h-20 rounded-full border-4 border-transparent  overflow-hidden">
                  <img
                    src={t.avatar}
                    alt={isRtl ? t.nameAr : t.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="font-cairo text-spa-gold2 text-base mb-3">
                {isRtl ? t.nameAr : t.nameEn}
              </h3>

              {/* Review */}
              <p className="font-cairo text-spa-brown-text text-sm leading-relaxed mb-5 flex-1">
                {isRtl ? t.textAr : t.textEn}
              </p>

              {/* Like icon */}
              <div className="mt-auto">
                <img src={LikeImage} alt={isRtl ? 'إعجاب' : 'Like'} className="mx-auto h-6 w-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ══════════════════════════════════════════════
          SECTION 3 — Be One of Our Guests (CTA)
      ══════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 pb-8 xl:pb-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#E8E0D5] bg-white px-4 py-8 sm:py-10 text-center shadow-[0_8px_40px_rgba(54,41,27,0.07)]">

          {/* Left icon — partially outside on the left */}
          <img
            src={IconGiest}
            alt=""
            aria-hidden="true"
            className="absolute left-[-25%] bottom-[-20px] w-48 h-48 object-contain opacity-30 pointer-events-none select-none"
          />

          {/* Right icon — partially outside on the right, mirrored */}
          <img
            src={IconGiest2}
            alt=""
            aria-hidden="true"
            className="absolute right-8 bottom-[-50px] w-48 h-48 object-contain opacity-30 pointer-events-none select-none scale-x-[-1]"
          />

          {/* Content */}
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="font-cairo text-3xl sm:text-4xl font-bold text-spa-gold mb-5 leading-snug">
              {isRtl ? 'كن أحد ضيوفنا' : 'Be One of Our Guests'}
            </h2>
            <p className="font-cairo text-spa-brown-text text-sm sm:text-base leading-relaxed mb-2">
              {isRtl
                ? 'انضم إلى مئات الضيوف الذين اختاروا سيرنيتي كوجهتهم للعلاج الطبيعي والتوازن الصحي.'
                : 'Join hundreds of guests who chose Serenity as their destination for natural healing and wellness balance.'}
            </p>
            <p className="font-cairo text-spa-brown-mid text-sm sm:text-base leading-relaxed">
              {isRtl
                ? 'احجز جلستك الآن وابدأ تجربتك بنفسك'
                : 'Book your session now and start your own experience.'}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;