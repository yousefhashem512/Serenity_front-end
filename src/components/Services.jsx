import { useLanguage } from '../context/LanguageContext';

/* ─── Services data ──────────────────────────────────────────────────────────
   Five services matching the sessionType values used across the project.
   Icons are SVG inline so there are no extra dependencies.
─────────────────────────────────────────────────────────────────────────────── */
// const SERVICES = [
//   {
//     id: 'massage_benefits',
//     icon: (
//       <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
//         <path d="M12 36c0-10 4-18 12-20 8 2 12 10 12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//         <path d="M18 28c0-4 2-7 6-8 4 1 6 4 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//         <path d="M24 36v-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//         <circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="2.5" />
//       </svg>
//     ),

//     tagAr: 'فوائد العلاج',
//     tagEn: 'THERAPY BENEFITS',

//     titleAr: 'فوائد المساج العلاجى',
//     titleEn: 'Therapeutic Massage Benefits',

//     descAr: [
//       'تقليل الشد والتقلصات العضلية',
//       'تحسين الدورة الدموية',
//       'المساعدة في الاستشفاء العضلي',
//       'تقليل ألم الرقبة والظهر والكتف',
//       'تحسين المرونة والحركة',
//       'تقليل التوتر والإجهاد',
//       'تنشيط الجسم وتحسين النوم',
//       'إخراج الإرهاق العضلي واللاكتيك',
//       'تحفيز نقاط الطاقة بالجسم بالطريقة الصينية العلاجية',
//     ],

//     descEn: [
//       'Reducing muscle tension and spasms',
//       'Improving blood circulation',
//       'Supporting muscle recovery',
//       'Relieving neck, back, and shoulder pain',
//       'Enhancing flexibility and mobility',
//       'Reducing stress and fatigue',
//       'Boosting body activity and improving sleep',
//       'Eliminating muscle fatigue and lactic acid buildup',
//       'Stimulating body energy points through traditional Chinese therapeutic techniques',
//     ],
//   },
//   {
//     id: 'recovery',
//     icon: (
//       <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
//         <path d="M12 36c0-10 4-18 12-20 8 2 12 10 12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//         <path d="M18 28c0-4 2-7 6-8 4 1 6 4 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//         <path d="M24 36v-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//         <circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="2.5" />
//       </svg>
//     ),
//     tagAr: 'التعافي السريع',
//     tagEn: 'RAPID RECOVERY',
//     titleAr: 'جلسة الريكفري',
//     titleEn: 'Recovery Session',
//     descAr:
//       'بروتوكول متخصص لإعادة تأهيل العضلات وتعجيل الشفاء بعد الإجهاد البدني أو الإصابات، يمنحك طاقة متجددة وأداءً أعلى.',
//     descEn:
//       'A specialised protocol for muscle rehabilitation and accelerated healing after physical strain or injuries—restoring renewed energy and peak performance.',
//   },
//   {
//     id: 'facial_massage',
//     icon: (
//       <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
//         <circle cx="24" cy="20" r="10" stroke="currentColor" strokeWidth="2.5" />
//         <path d="M16 30c-4 3-6 6-4 8 2 2 6 1 12 1s10 1 12-1c2-2 0-5-4-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//         <path d="M20 18c0-1 1-2 4-2s4 1 4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//         <circle cx="20" cy="21" r="1.5" fill="currentColor" />
//         <circle cx="28" cy="21" r="1.5" fill="currentColor" />
//         <path d="M21 25c.8.8 1.8 1.2 3 1.2s2.2-.4 3-1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//       </svg>
//     ),
//     tagAr: 'العناية بالبشرة',
//     tagEn: 'SKIN CARE',
//     titleAr: 'مساج الوجه',
//     titleEn: 'Facial Massage',
//     descAr:
//       'جلسة مساج وجه متخصصة تُحفّز الدورة الدموية في الجلد وتُقلّل التوتر العضلي وتمنح بشرتك نضارة ملحوظة وإشراقة طبيعية دائمة.',
//     descEn:
//       'A specialised facial massage that stimulates skin circulation, reduces muscle tension, and delivers visible freshness and a lasting natural glow.',
//   },
//   {
//     id: 'sports_massage',
//     icon: (
//       <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
//         <path d="M10 38l8-16 6 8 5-10 9 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//         <circle cx="35" cy="13" r="5" stroke="currentColor" strokeWidth="2.5" />
//         <path d="M30 16l-4 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//       </svg>
//     ),
//     tagAr: 'الأداء الرياضي',
//     tagEn: 'SPORTS PERFORMANCE',
//     titleAr: 'المساج الرياضي',
//     titleEn: 'Sports Massage',
//     descAr:
//       'علاج موجّه للرياضيين والمجتهدين بدنياً؛ يُفكّك تشنجات العضلات العميقة ويُعيد المرونة الطبيعية ويُقلّل زمن التعافي بين الجلسات.',
//     descEn:
//       'Targeted treatment for athletes and the physically active—breaking deep muscle knots, restoring natural flexibility, and shortening recovery time between sessions.',
//   },
//   {
//     id: 'vip',
//     icon: (
//       <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
//         <path d="M24 6l4.5 9.1 10 1.5-7.2 7 1.7 10-9-4.7-9 4.7 1.7-10L9.5 16.6l10-1.5L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
//         <path d="M16 38h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//         <path d="M19 42h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
//       </svg>
//     ),
//     tagAr: 'تجربة حصرية',
//     tagEn: 'EXCLUSIVE EXPERIENCE',
//     titleAr: 'الجلسة المميزة VIP',
//     titleEn: 'VIP Premium Session',
//     descAr:
//       'تجربة فاخرة شاملة مع الكابتن يوسف؛ تدمج أفضل أساليب العلاج في جلسة واحدة مخصصة تُصمَّم حول احتياجاتك الفردية لنتائج استثنائية.',
//     descEn:
//       'A luxurious all-inclusive experience with Captain Yousef—merging the finest therapeutic techniques in one personalised session designed around your individual needs for exceptional results.',
//   },
// ];




const SERVICES = [
  {
    id: 'massage_benefits',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M12 36c0-10 4-18 12-20 8 2 12 10 12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 28c0-4 2-7 6-8 4 1 6 4 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 36v-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),

    tagAr: 'فوائد العلاج',
    tagEn: 'THERAPY BENEFITS',

    titleAr: 'فوائد المساج العلاجى',
    titleEn: 'Therapeutic Massage Benefits',

    descAr: [
      'تقليل الشد والتقلصات العضلية',
      'تحسين الدورة الدموية',
      'المساعدة في الاستشفاء العضلي',
      'تقليل ألم الرقبة والظهر والكتف',
      'تحسين المرونة والحركة',
      'تقليل التوتر والإجهاد',
      'تنشيط الجسم وتحسين النوم',
      'إخراج الإرهاق العضلي واللاكتيك',
      'تحفيز نقاط الطاقة بالجسم بالطريقة الصينية العلاجية',
    ],

    descEn: [
      'Reducing muscle tension and spasms',
      'Improving blood circulation',
      'Supporting muscle recovery',
      'Relieving neck, back, and shoulder pain',
      'Enhancing flexibility and mobility',
      'Reducing stress and fatigue',
      'Boosting body activity and improving sleep',
      'Eliminating muscle fatigue and lactic acid buildup',
      'Stimulating body energy points through traditional Chinese therapeutic techniques',
    ],
  },
  {
    id: 'recovery',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M12 36c0-10 4-18 12-20 8 2 12 10 12 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 28c0-4 2-7 6-8 4 1 6 4 6 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 36v-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="10" r="3" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
    tagAr: 'التعافي السريع',
    tagEn: 'RAPID RECOVERY',
    titleAr: 'جلسة الريكفري',
    titleEn: 'Recovery Session',
    descAr:
      'بروتوكول متخصص لإعادة تأهيل العضلات وتعجيل الشفاء بعد الإجهاد البدني أو الإصابات، يمنحك طاقة متجددة وأداءً أعلى.',
    descEn:
      'A specialised protocol for muscle rehabilitation and accelerated healing after physical strain or injuries—restoring renewed energy and peak performance.',
  },
  {
    id: 'facial_massage',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="24" cy="20" r="10" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 30c-4 3-6 6-4 8 2 2 6 1 12 1s10 1 12-1c2-2 0-5-4-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 18c0-1 1-2 4-2s4 1 4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="21" r="1.5" fill="currentColor" />
        <circle cx="28" cy="21" r="1.5" fill="currentColor" />
        <path d="M21 25c.8.8 1.8 1.2 3 1.2s2.2-.4 3-1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),

    tagAr: 'العناية بالبشرة',
    tagEn: 'SKIN CARE',

    titleAr: 'مساج الوجه',
    titleEn: 'Facial Massage',

    descAr: [
      'تحسين الدورة الدموية في الوجه',
      'تقليل الانتفاخ والإجهاد',
      'استرخاء عضلات الفك والوجه',
      'تنشيط البشرة وإعطاء نضارة طبيعية',
      'المساعدة على تقليل التوتر والصداع',
      'تحفيز نقاط الطاقة في الوجه',
      'تحسين الإحساس بالراحة والاسترخاء',
    ],

    descEn: [
      'Improving blood circulation in the face',
      'Reducing puffiness and fatigue',
      'Relaxing jaw and facial muscles',
      'Revitalising the skin and giving a natural glow',
      'Helping reduce stress and headaches',
      'Stimulating facial energy points',
      'Enhancing comfort and relaxation',
    ],
  },
  {
    id: 'sports_massage',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M10 38l8-16 6 8 5-10 9 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="35" cy="13" r="5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M30 16l-4 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),

    tagAr: 'الأداء الرياضي',
    tagEn: 'SPORTS PERFORMANCE',

    titleAr: 'المساج الرياضي',
    titleEn: 'Sports Massage',

    descAr: [
      'قبل التمرين أو المباراة: يساعد على تنشيط العضلات وزيادة تدفق الدم وتجهيز الجسم للحركة',
      'بعد التمرين: يقلل الشد العضلي والإجهاد ويساعد على الاستشفاء العضلي',
      'أثناء الإصابات أو الضغط العضلي: يحسن حركة العضلات ويقلل التشنجات والـ tightness',
    ],

    descEn: [
      'Before training or matches: activates muscles, increases blood flow, and prepares the body for movement',
      'After exercise: reduces muscle tension and fatigue while supporting muscle recovery',
      'During injuries or muscle stress: improves muscle mobility and reduces tightness and spasms',
    ],
  },
  {
    id: 'vip',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M24 6l4.5 9.1 10 1.5-7.2 7 1.7 10-9-4.7-9 4.7 1.7-10L9.5 16.6l10-1.5L24 6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M16 38h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M19 42h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    tagAr: 'تجربة حصرية',
    tagEn: 'EXCLUSIVE EXPERIENCE',
    titleAr: 'الجلسة المميزة VIP',
    titleEn: 'VIP Premium Session',
    descAr:
      'تجربة فاخرة شاملة مع الكابتن يوسف؛ تدمج أفضل أساليب العلاج في جلسة واحدة مخصصة تُصمَّم حول احتياجاتك الفردية لنتائج استثنائية.',
    descEn:
      'A luxurious all-inclusive experience with Captain Yousef—merging the finest therapeutic techniques in one personalised session designed around your individual needs for exceptional results.',
  },
];



const handleScroll = (e, id) => {
  e.preventDefault();
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });

    const firstInput = element.querySelector('input, textarea, select');
    if (firstInput) {
      // نستخدم setTimeout بسيط لضمان أن التركيز يحدث بعد بدء التمرير
      setTimeout(() => {
        firstInput.focus({ preventScroll: true });
      }, 500); // 500ms هي مدة تقريبية لتنفيذ الـ smooth scroll
    }
  }
};

/* ─── Service Card ──────────────────────────────────────────────────────────── */
const ServiceCard = ({ service, isRtl, index }) => {
  const isEven = index % 2 === 1;

  return (
    <div
      className={`
        group relative flex flex-col gap-5 rounded-[1.5rem] border border-spa-border bg-white
        p-6 sm:p-8 shadow-[0_8px_40px_rgba(54,41,27,0.07)]
        hover:shadow-[0_16px_56px_rgba(54,41,27,0.13)]
        hover:-translate-y-1 transition-all duration-300
        ${isRtl ? 'text-right' : 'text-left'}
      `}
    >
      {/* Decorative corner accent */}
      <div
        className={`
          absolute top-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none
          ${isEven ? 'bg-spa-gold/5' : 'bg-spa-brown-dark/4'}
          ${isRtl ? 'left-0 -translate-x-1/2 -translate-y-1/2' : 'right-0 translate-x-1/2 -translate-y-1/2'}
        `}
      />

      {/* Icon */}
      <div className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
        <div className="w-14 h-14 rounded-xl bg-spa-gold/10 flex items-center justify-center text-spa-gold
                        group-hover:bg-spa-gold group-hover:text-white transition-all duration-300 flex-shrink-0">
          {service.icon}
        </div>
      </div>

      {/* Tag */}
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-spa-gold">
        {isRtl ? service.tagAr : service.tagEn}
      </p>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-spa-brown-dark font-cairo leading-snug -mt-2">
        {isRtl ? service.titleAr : service.titleEn}
      </h3>

      {/* Divider */}
      <div className={`w-10 h-[2px] bg-spa-gold ${isRtl ? 'mr-0 ml-auto' : ''}`} />

      {/* Description */}

      <div className="text-spa-brown-text text-sm sm:text-base leading-relaxed font-cairo">
        {Array.isArray(isRtl ? service.descAr : service.descEn) ? (
          <ul className="space-y-2">
            {(isRtl ? service.descAr : service.descEn).map((item, index) => (
              <li
                key={index}
                className={`flex gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
              >
                <span className="text-spa-gold mt-[2px]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {isRtl ? service.descAr : service.descEn}
          </p>
        )}
      </div>

    </div>
  );
};

/* ─── Main Section ──────────────────────────────────────────────────────────── */
const Services = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';

  return (
    <section id="services" className="py-16 xl:py-24 bg-spa-bg" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className={`mb-14 ${isRtl ? 'text-right' : 'text-left'} sm:text-center`}>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-spa-gold mb-4">
            {isRtl ? 'خدماتنا' : 'OUR SERVICES'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-spa-brown-dark font-cairo leading-snug mb-5">
            {isRtl
              ? 'تجارب علاجية مصممة لاحتياجاتك'
              : 'Therapeutic Experiences Tailored for You'}
          </h2>
          <p className="text-spa-brown-text text-base md:text-lg leading-relaxed font-cairo max-w-2xl mx-auto">
            {isRtl
              ? 'نقدّم في سيرنتي مجموعة متكاملة من الجلسات العلاجية التي تجمع بين الأصالة والحداثة، لتُحقق توازناً حقيقياً في جسدك وراحتك.'
              : 'At Serenity, we offer a comprehensive range of therapeutic sessions that blend tradition and innovation, achieving true balance for your body and peace of mind.'}
          </p>
        </div>

        {/* ── Cards Grid ──
            Mobile  : 1 column
            sm-md   : 2 columns
            lg+     : 3 columns, last row centred via flex trick
        ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              isRtl={isRtl}
              index={index}
            />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className={`mt-14 flex items-center gap-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'} justify-center`}>
          <div className="flex-1 max-w-xs h-px bg-spa-border" />
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, "hero")}
            className="
              inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest
              text-white bg-gradient-to-r from-[#AA8453] to-[#C5A059]
              px-8 py-3 rounded transition-all duration-300
              shadow-md hover:shadow-lg hover:opacity-90 whitespace-nowrap font-cairo
            "
          >
            {isRtl ? 'احجز الآن' : 'BOOK NOW'}
          </a>
          <div className="flex-1 max-w-xs h-px bg-spa-border" />
        </div>

      </div>
    </section>
  );
};

export default Services;