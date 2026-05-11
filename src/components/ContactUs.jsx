import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

/* ─── Single info row ────────────────────────────────────────────────────────*/
const InfoRow = ({ icon, label, children }) => (
  <div className="flex flex-col  gap-3">
    <div className="text-spa-gold">
      {icon}
    </div>
    <span className="font-cairo text-spa-gold text-sm sm:text-base">{label}</span>
    <div className="font-cairo text-spa-brown-mid text-sm sm:text-base leading-relaxed">
      {children}
    </div>
  </div>
);

/* ─── Component ──────────────────────────────────────────────────────────────*/
const ContactUs = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';

  return (
    <section
      id="contact"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="bg-spa-bg py-16 xl:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Page title ───────────────────────────────────────────────────── */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="font-cairo text-3xl sm:text-4xl font-bold text-spa-gold mb-3 leading-snug">
            {isRtl ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="font-cairo text-spa-brown-mid text-sm sm:text-base">
            {isRtl
              ? 'نحن هنا لخدمتك ومساعدتك في أي وقت'
              : 'We are here to serve and assist you at any time'}
          </p>
        </div>

        {/* ── Two-column grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT — map */}
          <div className={`w-full `}>
            {/* Intro paragraph */}
            <p className={`font-cairo text-spa-brown-dark text-sm sm:text-base leading-8 mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
              {isRtl
                ? 'في سيرنيتي، راحتك هي أولويتنا. سواء كان لديك استفسار، أو ترغب في الحجز، أو تحتاج إلى مساعدة، فريقنا جاهز للرد عليك وتقديم أفضل تجربة ممكنة. لا تتردد في التواصل معنا.'
                : 'At Serenity, your comfort is our priority. Whether you have a question, wish to book, or need assistance, our team is ready to respond and provide the best experience possible. Do not hesitate to contact us.'}
            </p>
            <div className="w-full overflow-hidden  shadow-[0_20px_60px_rgba(54,41,27,0.13)] border border-spa-border aspect-[4/3] lg:aspect-auto lg:h-[420px]">
              <iframe
                title={isRtl ? 'خريطة الموقع' : 'Location Map'}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.4!2d31.3!3d30.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAzJzAwLjAiTiAzMcKwMTgnMDAuMCJF!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          {/* Right — info block */}
          <div className="flex flex-col  gap-2 lg:pt-16">
            <div className="flex flex-col gap-6">
              {/* Address */}
              <InfoRow icon={<MapPin className="w-5 h-5 shrink-0" />} label={isRtl ? 'العنوان' : 'Address'}>
                {isRtl
                  ? <>46 عباس العقاد مدينه نصر الدور السادس</>
                  : <>46 Abbas El Akkad Street, Nasr City, 6th Floor</>}
              </InfoRow>
              {/* Phone */}
              <InfoRow icon={<Phone className="w-5 h-5 shrink-0" />} label={isRtl ? 'رقم الهاتف' : 'Phone Number'}>
                <a href="tel:+201006768004" className="hover:text-spa-gold transition-colors">
                  +20 100 676 8004
                </a>
              </InfoRow>
              {/* Email */}
              <InfoRow icon={<Mail className="w-5 h-5 shrink-0" />} label={isRtl ? 'البريد الإلكتروني' : 'Email'}>
                <a href="mailto:Info@Serenityrecovery-eg.com" className="hover:text-spa-gold transition-colors">
                  Info@Serenityrecovery-eg.com
                </a>
              </InfoRow>
              {/* Working hours */}
              <InfoRow icon={<Clock className="w-5 h-5 shrink-0" />} label={isRtl ? 'مواعيد العمل' : 'Working Hours'}>
                {isRtl ? (
                  <>
                    <div>من السبت إلى الجمعة</div>
                    <div>09:00 صباحاً – 12:00 صباحاً</div>
                  </>
                ) : (
                  <>
                    <div>Saturday – Friday</div>
                    <div>09:00 AM – 12:00 AM</div>
                  </>
                )}
              </InfoRow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;