import { useEffect, useState } from 'react';
import { CheckCircle, X, Smartphone, Copy, Phone, Check, MessageCircle } from 'lucide-react';

const BookingConfirmPopup = ({ isOpen, onClose, isRtl, booking }) => {
  const [copied, setCopied] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  const INSTAPAY_NUMBER = '01006768004';
  const depositAmount = 200

  const handleCopy = () => {
    navigator.clipboard?.writeText(INSTAPAY_NUMBER).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SESSION_AR = {
    hijama: 'حجامة',
    recovery: 'ريكفري',
    facial_massage: 'مساج وجه',
    sports_massage: 'مساج رياضي',
    vip: 'جلسة VIP',
  };

  return (
    <>
      {/* ── Backdrop — fills viewport, scrollable, centres panel ── */}
      <div
        className="fixed inset-0 z-[999] overflow-y-auto"
        style={{ backgroundColor: 'rgba(44, 24, 16, 0.55)', backdropFilter: 'blur(6px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Inner wrapper centres panel vertically when content is short,
            and lets it scroll naturally when content overflows */}
        <div className="flex min-h-full items-center justify-center px-4 py-10">

          {/* ── Panel ── */}
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="relative w-full max-w-md bg-white rounded-[1.75rem] shadow-[0_32px_80px_rgba(44,24,16,0.22)] overflow-hidden"
            style={{ animation: 'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold top bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#AA8453] to-[#C5A059]" />

            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute top-4 p-1.5 rounded-full text-spa-brown-mid hover:text-spa-brown-dark hover:bg-spa-bg transition z-10 ${isRtl ? 'left-4' : 'right-4'}`}
              aria-label={isRtl ? 'إغلاق' : 'Close'}
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="px-6 sm:px-8 pt-7 pb-8 space-y-6">

              {/* Success icon + title */}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle size={36} className="text-green-500" strokeWidth={1.8} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-spa-brown-dark font-cairo leading-snug">
                    {isRtl ? 'تم تأكيد الحجز!' : 'Booking Confirmed!'}
                  </h2>
                  <p className="text-sm text-spa-brown-mid font-cairo mt-1">
                    {isRtl
                      ? 'شكراً لك. لإتمام الحجز يرجى سداد العربون.'
                      : 'Thank you! Please pay the deposit to complete your booking.'}
                  </p>
                </div>
              </div>

              {/* Booking summary */}
              {booking && (
                <div className={`rounded-xl border border-spa-border bg-spa-bg px-4 py-3 space-y-2 text-sm font-cairo ${isRtl ? 'text-right' : 'text-left'}`}>
                  {booking.patientName && (
                    <div className="flex justify-between gap-2">
                      <span className="text-spa-brown-mid">{isRtl ? 'الاسم' : 'Name'}</span>
                      <span className="font-semibold text-spa-brown-dark truncate">{booking.patientName}</span>
                    </div>
                  )}
                  {booking.sessionType && (
                    <div className="flex justify-between gap-2">
                      <span className="text-spa-brown-mid">{isRtl ? 'الخدمة' : 'Service'}</span>
                      <span className="font-semibold text-spa-brown-dark">
                        {isRtl ? (SESSION_AR[booking.sessionType] ?? booking.sessionType) : booking.sessionType}
                      </span>
                    </div>
                  )}
                  {booking.date && (
                    <div className="flex justify-between gap-2">
                      <span className="text-spa-brown-mid">{isRtl ? 'التاريخ' : 'Date'}</span>
                      <span className="font-semibold text-spa-brown-dark" dir="ltr">{booking.date}</span>
                    </div>
                  )}
                  {booking.timeSlot && (
                    <div className="flex justify-between gap-2">
                      <span className="text-spa-brown-mid">{isRtl ? 'الوقت' : 'Time'}</span>
                      <span className="font-semibold text-spa-brown-dark" dir="ltr">{booking.timeSlot}</span>
                    </div>
                  )}
                  {depositAmount !== undefined && (
                    <div className="border-t border-spa-border pt-2 flex justify-between gap-2">
                      <span className="text-spa-brown-mid font-bold">{isRtl ? 'العربون المطلوب' : 'Deposit Due'}</span>
                      <span className="font-bold text-spa-gold text-base">
                        {depositAmount} {isRtl ? 'ج.م' : 'EGP'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-spa-border" />
                <span className="text-xs font-bold uppercase tracking-widest text-spa-brown-mid font-cairo whitespace-nowrap">
                  {isRtl ? 'طرق الدفع' : 'Payment Methods'}
                </span>
                <div className="flex-1 h-px bg-spa-border" />
              </div>

              {/* Payment options */}
              <div className="space-y-3">

                {/* InstaPay */}
                <div className={`flex items-center gap-4 rounded-xl border border-spa-border bg-spa-bg p-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                  <div className="w-11 h-11 rounded-xl bg-[#AA8453]/10 flex items-center justify-center flex-shrink-0">
                    <Smartphone size={20} className="text-spa-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-spa-gold font-cairo">InstaPay</p>
                    <p className="text-spa-brown-dark font-bold text-base font-cairo tracking-wide" dir="ltr">
                      {INSTAPAY_NUMBER}
                    </p>
                    <p className="text-xs text-spa-brown-mid font-cairo mt-0.5">
                      {isRtl ? 'أرسل العربون عبر إنستاباي' : 'Send the deposit via InstaPay'}
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    title={isRtl ? 'نسخ الرقم' : 'Copy number'}
                    className={`flex-shrink-0 p-2 rounded-lg transition border ${copied
                      ? 'text-green-600 bg-green-50 border-green-200'
                      : 'text-spa-brown-mid hover:text-spa-gold hover:bg-white border-transparent hover:border-spa-border'
                      }`}
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>

                {/* WhatsApp - Send Proof */}
                <a
                  href={`https://wa.me/201006768004?text=${isRtl ? 'مرحباً، أرسل لكم صورة التحويل للعربون' : 'Hello, I am sending you a screenshot of my payment transfer'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 rounded-xl border border-spa-border bg-spa-bg p-4 hover:bg-green-50 transition ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} className="text-[#25D366]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#25D366] font-cairo">WhatsApp</p>
                    <p className="text-spa-brown-dark font-semibold text-sm font-cairo mt-0.5">
                      {isRtl
                        ? 'قم بإرسال صورة التحويل عبر واتس اب'
                        : 'Send payment proof via WhatsApp'}
                    </p>
                  </div>
                </a>

              </div>

              {/* Warning note */}
              <div className={`rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 font-cairo leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
                {isRtl
                  ? '⚠️ يُرجى سداد العربون خلال 24 ساعة للحفاظ على موعدك. إذا احتجت مساعدة تواصل معنا.'
                  : '⚠️ Please pay the deposit within 24 hours to secure your slot. Contact us if you need assistance.'}
              </div>

              {/* CTA */}
              <a
                href="tel:+201006768004"
                className="flex items-center justify-center gap-2 w-full font-bold text-sm uppercase tracking-widest font-cairo text-white bg-gradient-to-r from-[#AA8453] to-[#C5A059] px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:opacity-90"
              >
                <Phone size={16} />
                {isRtl ? 'تواصل معنا' : 'Contact Us'}
              </a>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.88) translateY(16px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default BookingConfirmPopup;