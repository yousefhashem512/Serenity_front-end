import Image1 from '../assets/image/Sec2Img1.png';
import Image2 from '../assets/image/Sec2Img2.png';
import Num1 from '../assets/image/num1.png';
import Num2 from '../assets/image/num2.png';

import { useLanguage } from '../context/LanguageContext';

const BenefitsOfCupping = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';

  return (
    <section id="benefits" className="relative overflow-hidden py-16 xl:py-24" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16">
          {/* Item 1 */}
          <div className="grid items-center gap-10 xl:grid-cols-12">
            <div className={`xl:col-span-6  xl:order-2 space-y-5 ${isRtl ? 'text-right' : 'text-left'}`}>
              <p className="text-xs font-semibold text-[16px] uppercase tracking-[0.35em] text-spa-gold">
                {isRtl ? 'تنشيط الجسم' : 'BODY ACTIVATION'}
              </p>
              <div className={`flex items-center gap-4 `}>
                <div className="w-20 h-20 flex-shrink-0">
                  <img src={Num1} alt={isRtl ? 'رقم 1' : 'Number 1'} className="w-full h-full object-contain" />
                </div>
                <span className="text-sm uppercase tracking-[0.35em] text-spa-brown-mid">
                  {isRtl ? 'تعزيز الدورة الدموية' : 'Enhance circulation'}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-spa-brown-dark sm:text-4xl">
                {isRtl
                  ? 'تعزيز الدورة الدموية وصحة الجسم'
                  : 'Boost circulation and total body wellness'}
              </h2>
              <p className="text-spa-brown-text text-base md:text-lg leading-relaxed">
                {isRtl
                  ? 'تساعد جلسات الحجامة على تنشيط الدورة الدموية وتحسين تدفق الدم في الجسم، مما يُسهم في تعزيز أداء الأعضاء وزيادة مستويات الطاقة العامة.'
                  : 'Our cupping treatment helps activate blood flow across the body, supporting organ function and lifting overall energy levels.'}
              </p>
              <p className="text-spa-brown-text text-base md:text-lg leading-relaxed">
                {isRtl
                  ? 'تعمل هذه الجلسات على تقوية الجهاز المناعي وتحسين قدرة الجسم على مقاومة الأمراض بشكل طبيعي.'
                  : 'It also supports the immune system, helping the body naturally defend against illness.'}
              </p>
            </div>

            <div className="xl:col-span-6 xl:order-1 relative">
              <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(54,41,27,0.18)]">
                <img
                  src={Image1}
                  alt={isRtl ? 'صورة جلسة الحجامة' : 'Cupping session image'}
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className={`grid items-center gap-10 xl:grid-cols-12 ${isRtl ? '' : 'xl:grid-flow-col-dense'}`}>
            <div className={`xl:col-span-6  space-y-5 ${isRtl ? 'text-right' : 'text-left'}`}>
              <p className="text-xs font-semibold text-[16px] uppercase tracking-[0.35em] text-spa-gold">
                {isRtl ? 'راحة واسترخاء' : 'REST & RELAXATION'}
              </p>
              <div className={`flex items-center gap-4 `}>
                <div className="w-20 h-20 flex-shrink-0">
                  <img src={Num2} alt={isRtl ? 'رقم 2' : 'Number 2'} className="w-full h-full object-contain" />
                </div>
                <span className="text-sm uppercase tracking-[0.35em] text-spa-brown-mid">
                  {isRtl ? 'تخفيف الألم والتوتر' : 'Reduce pain and tension'}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-spa-brown-dark sm:text-4xl">
                {isRtl
                  ? 'تخفيف الألم والتوتر بعمق'
                  : 'Relieve pain and tension deeply'}
              </h2>
              <p className="text-spa-brown-text text-base md:text-lg leading-relaxed">
                {isRtl
                  ? 'تساهم الحجامة في تهدئة الأعصاب وتخفيف الألم في الرقبة والكتف والرأس، مما يمنح الجسم شعورًا أكبر بالراحة والاسترخاء.'
                  : 'Cupping eases the nervous system and reduces discomfort in the neck, shoulders, and head for a calmer, more relaxed body.'}
              </p>
              <p className="text-spa-brown-text text-base md:text-lg leading-relaxed">
                {isRtl
                  ? 'هذه الجلسات تساعد على تحسين التركيز وتقليل التوتر اليومي بشكل تدريجي.'
                  : 'The treatment also improves focus and helps lower everyday stress gradually.'}
              </p>
            </div>

            <div className="xl:col-span-6 relative">
              <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(54,41,27,0.18)]">
                <img
                  src={Image2}
                  alt={isRtl ? 'صورة استرخاء' : 'Relaxation session image'}
                  className="w-full h-[420px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section >
  );
};

export default BenefitsOfCupping;
