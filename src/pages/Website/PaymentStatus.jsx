import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import backgroundImg from '../../assets/image/HeroBack.png';
import backgroundImg2 from '../../assets/image/HeroBack2.png';
import Button from '../../components/ui/button';

/* ─────────────────────────────────────────────
   PayMob appends these query params on redirect:
   ?success=true/false
   &txn_response_code=APPROVED/DECLINED/...
   &order=<paymob_order_id>
   &id=<transaction_id>
   &pending=false
   &amount_cents=<amount>
   &currency=EGP
   &source_data.type=card
   &source_data.pan=xxxx
   &error_occured=false
───────────────────────────────────────────── */

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';

  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'pending' | 'failed'
  const [details, setDetails] = useState({});
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const success = searchParams.get('success');
    const pending = searchParams.get('pending');
    const errorOccured = searchParams.get('error_occured');
    const txnCode = searchParams.get('txn_response_code');
    const amountCents = searchParams.get('amount_cents');
    const orderId = searchParams.get('order_id');
    const transactionId = searchParams.get('id');
    const paymentType =
      searchParams.get('source_data.type') ||
      searchParams.get('source_data_type');
    const cardPan =
      searchParams.get('source_data.pan') ||
      searchParams.get('source_data_pan');

    setDetails({
      orderId,
      transactionId,
      amount: amountCents ? (parseInt(amountCents, 10) / 100).toFixed(2) : null,
      paymentType,
      cardPan,
      txnCode,
    });

    if (success === 'true' && errorOccured !== 'true') {
      setStatus('success');
    } else if (pending === 'true') {
      setStatus('pending');
    } else {
      setStatus('failed');
    }
  }, [searchParams]);

  // Auto-redirect to home after success
  useEffect(() => {
    if (status !== 'success') return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [status, navigate]);

  /* ── Copy transaction id ── */
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (details.transactionId) {
      navigator.clipboard.writeText(details.transactionId).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  /* ── Status config ── */
  const config = {
    loading: {
      icon: (
        <div className="relative w-20 h-20 mx-auto">
          <div className="w-20 h-20 rounded-full border-4 border-spa-border border-t-spa-gold animate-spin" />
        </div>
      ),
      title: isRtl ? 'جارٍ التحقق من حالة الدفع...' : 'Verifying payment status…',
      subtitle: '',
      accent: '#AA8453',
    },
    success: {
      icon: (
        <div className="relative w-20 h-20 mx-auto">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#AA8453] to-[#C5A059] flex items-center justify-center shadow-lg shadow-[#AA845340]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          {/* Ripple ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#AA845360] animate-ping"
            style={{ animationDuration: '1.5s' }}
          />
        </div>
      ),
      title: isRtl ? 'تم تأكيد الدفع بنجاح!' : 'Payment Confirmed!',
      subtitle: isRtl
        ? 'تم استلام إيداعك وتأكيد حجزك. سيتواصل معك فريقنا قريباً.'
        : 'Your deposit has been received and your booking is confirmed. Our team will reach out shortly.',
      accent: '#AA8453',
    },
    pending: {
      icon: (
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
      ),
      title: isRtl ? 'الدفع قيد المعالجة' : 'Payment Pending',
      subtitle: isRtl
        ? 'عمليتك قيد المراجعة. سيتم تأكيد حجزك فور اعتماد الدفع.'
        : 'Your transaction is under review. Your booking will be confirmed once the payment clears.',
      accent: '#F59E0B',
    },
    failed: {
      icon: (
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg shadow-red-200">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-10 h-10"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      ),
      title: isRtl ? 'فشلت عملية الدفع' : 'Payment Failed',
      subtitle: isRtl
        ? 'لم تتم عملية الدفع. يرجى المحاولة مرة أخرى أو التواصل معنا إذا استمرت المشكلة.'
        : 'Your payment was not processed. Please try again or contact us if the issue persists.',
      accent: '#EF4444',
    },
  };

  const current = config[status];

  return (
    <section
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen w-full relative flex justify-center items-center py-20 px-6 md:px-10 bg-spa-bg"
    >
      {/* Decorative backgrounds – same as Hero */}
      <div
        className={`absolute ${
          isRtl ? 'left-0' : 'right-0 scale-x-[-1]'
        } z-0 top-0 w-[200px] pointer-events-none`}
      >
        <img src={backgroundImg} alt="" />
      </div>
      <div
        className={`absolute ${
          isRtl ? 'left-0' : 'right-0 scale-x-[-1]'
        } bottom-0 w-[200px] pointer-events-none`}
      >
        <img src={backgroundImg2} alt="" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-2xl border border-spa-border shadow-xl overflow-hidden">
          {/* Coloured top strip */}
          <div
            className="h-1.5 w-full"
            style={{
              background: `linear-gradient(to right, ${current.accent}, ${current.accent}99)`,
            }}
          />

          <div className="p-8 md:p-10">
            {/* Icon */}
            <div className="mb-6">{current.icon}</div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-spa-brown-dark text-center mb-3 font-cairo">
              {current.title}
            </h1>

            {/* Subtitle */}
            {current.subtitle && (
              <p className="text-spa-brown-mid text-sm md:text-base text-center leading-relaxed mb-8">
                {current.subtitle}
              </p>
            )}

            {/* Transaction details */}
            {status !== 'loading' && (
              <div className="space-y-3 mb-8">
                {/* Amount */}
                {details.amount && (
                  <DetailRow
                    label={isRtl ? 'المبلغ المدفوع' : 'Amount Paid'}
                    value={`${details.amount} EGP`}
                    isRtl={isRtl}
                  />
                )}

                {/* Transaction ID with copy */}
                {details.transactionId && (
                  <div className="flex items-center justify-between gap-3 px-4 py-3 bg-spa-bg rounded-lg border border-spa-border">
                    <span className="text-xs font-bold text-spa-brown-dark uppercase tracking-wider">
                      {isRtl ? 'رقم المعاملة' : 'Transaction ID'}
                    </span>
                    <div
                      className={`flex items-center gap-2 ${
                        isRtl ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <span className="text-sm text-spa-brown-mid font-mono truncate max-w-[120px]">
                        {details.transactionId}
                      </span>
                      <button
                        onClick={handleCopy}
                        title={isRtl ? 'نسخ' : 'Copy'}
                        className="text-spa-gold hover:text-spa-brown-dark transition-colors"
                      >
                        {copied ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Payment method */}
                {details.paymentType && (
                  <DetailRow
                    label={isRtl ? 'طريقة الدفع' : 'Payment Method'}
                    value={
                      details.cardPan
                        ? `${details.paymentType} •••• ${details.cardPan}`
                        : details.paymentType
                    }
                    isRtl={isRtl}
                  />
                )}

                {/* Order reference */}
                {details.orderId && (
                  <DetailRow
                    label={isRtl ? 'رقم الطلب' : 'Order Reference'}
                    value={`#${details.orderId}`}
                    isRtl={isRtl}
                  />
                )}
              </div>
            )}

            {/* Auto-redirect notice */}
            {status === 'success' && (
              <p className="text-center text-xs text-spa-brown-mid mb-6">
                {isRtl
                  ? `سيتم توجيهك للصفحة الرئيسية خلال ${countdown} ثانية`
                  : `Redirecting to home in ${countdown}s`}
              </p>
            )}

            {/* CTAs */}
            {status === 'success' && (
              <Button
                variant="primary"
                size="md"
                className="w-full font-normal"
                onClick={() => navigate('/')}
              >
                {isRtl ? 'العودة للرئيسية' : 'BACK TO HOME'}
              </Button>
            )}

            {status === 'pending' && (
              <Button
                variant="secondary"
                size="md"
                className="w-full font-normal"
                onClick={() => navigate('/')}
              >
                {isRtl ? 'العودة للرئيسية' : 'BACK TO HOME'}
              </Button>
            )}

            {status === 'failed' && (
              <div className="flex flex-col gap-3">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-normal"
                  onClick={() => navigate('/')}
                >
                  {isRtl ? 'حاول مجدداً' : 'TRY AGAIN'}
                </Button>
                <a
                  href="tel:+201006768004"
                  className="flex items-center justify-center gap-2 text-spa-brown-mid text-sm hover:text-spa-gold transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {isRtl ? 'تواصل مع الدعم' : 'Contact Support'}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer brand */}
        <p className="text-center text-xs text-spa-brown-mid/60 mt-6 uppercase tracking-widest font-cairo">
          Serenity Recovery — Powered by Paymob
        </p>
      </div>
    </section>
  );
}

/* ── Reusable detail row ── */
function DetailRow({ label, value, isRtl }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-spa-bg rounded-lg border border-spa-border">
      <span className="text-xs font-bold text-spa-brown-dark uppercase tracking-wider">
        {label}
      </span>
      <span
        className={`text-sm text-spa-brown-mid ${
          isRtl ? 'text-left' : 'text-right'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
