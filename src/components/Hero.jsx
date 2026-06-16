import { useLanguage } from '../context/LanguageContext';
import heroImg from '../assets/image/HeroImage.png';
import backgroundImg from '../assets/image/HeroBack.png';
import backgroundImg2 from '../assets/image/HeroBack2.png';
import { useEffect, useState } from 'react';
import '../assets/style/HeroSection.css';
import api from '../api/axios';
import Button from './ui/button';
import SubTitle from './ui/SubTitle';
import BookingConfirmPopup from './BookingConfirmPopup';
const Hero = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientAge: '20',
    gender: '',
    sessionType: '',
    branch: 'Cairo-Branch', // تقدر تثبته أو تخليه select بعدين
    captainId: '',
    date: '',
    timeSlot: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [prices, setPrices] = useState({});
  const [selectedServicePrice, setSelectedServicePrice] = useState(null);
  const [captains, setCaptains] = useState([]);
  const [loadingCaptains, setLoadingCaptains] = useState(false);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // filter captain in vip seesion
  const visibleCaptains = formData.sessionType === 'vip'
    ? captains.filter((c) => c.type === 'leader')
    : captains;

  // Load prices on component mount
  useEffect(() => {
    const loadPrices = async () => {
      try {
        const response = await api.get('/public/prices');
        setPrices(response.data.data);

      } catch (error) {
        console.error('Failed to load prices:', error);
      }
    };
    loadPrices();
  }, []);

  // Load Captains on component mount
  useEffect(() => {
    const fetchCaptains = async () => {
      try {
        setLoadingCaptains(true);
        const res = await api.get('/public/captains');
        setCaptains(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("Error fetching captains:", err);
      } finally {
        setLoadingCaptains(false);
      }
    };

    fetchCaptains();
  }, []);

  // Show Price when service type or captain changes, and reset time if any of these change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'sessionType' || name === 'captainId' || name === 'date' || name === 'gender' ? { timeSlot: '' } : {}),
      ...(name === 'sessionType' ? { captainId: '' } : {}),
    }));

    // Update selected service price when service type or captain changes
    if (name === 'sessionType' || name === 'captainId') {
      const serviceType = name === 'sessionType' ? value : formData.sessionType;
      let basePrice = 0;

      // تحديد سعر الخدمة
      if (serviceType === 'hijama') {
        basePrice = prices.hijamaPrice || 0;
      } else if (serviceType === 'hijama_upper') {
        basePrice = prices.hijamaUpperPrice || 0;
      } else if (serviceType === 'recovery') {
        basePrice = prices.recoveryPrice || 0;
      } else if (serviceType === 'recovery_upper') {
        basePrice = prices.recoveryUpperPrice || 0;
      } else if (serviceType === 'facial_massage') {
        basePrice = prices.facialMassagePrice || 0;
      } else if (serviceType === 'sports_massage') {
        basePrice = prices.sportsMassagePrice || 0;
      } else if (serviceType === 'vip') {
        basePrice = prices.vipSeccionPrice || 0;
      }

      const finalPrice = basePrice;

      setSelectedServicePrice(finalPrice);
    }

    // لو شال الخدمة
    if (name === 'serviceType' && !value) {
      setSelectedServicePrice(null);
    }
  };


  // Fetch available slots whenever captain, date, gender
  useEffect(() => {
    const fetchSlots = async () => {
      if (!formData.captainId || !formData.date || !formData.gender) {
        setAvailableSlots([]);
        return;
      }

      setSlotsError('');
      setLoadingSlots(true);
      setAvailableSlots([]);

      try {
        const response = await api.post('/bookings/available-slots', {
          gender: formData.gender,
          captainId: formData.captainId,
          date: formData.date,
        });

        setAvailableSlots(response.data?.availableSlots || []);
      } catch (error) {
        setSlotsError(error.message || 'Unable to load available slots');
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [formData.captainId, formData.date, formData.gender]);

  //Create booking
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setBookingError('');
  //   setBookingSuccess('');

  //   if (!formData.timeSlot) {
  //     setBookingError(isRtl ? 'يرجى اختيار موعد متاح' : 'Please select an available time');
  //     return;
  //   }

  //   try {
  //     const response = await api.post('/bookings/create', formData);
  //     setBookingSuccess(response.data?.message || (isRtl ? 'تم تأكيد الحجز' : 'Booking confirmed'));




  //     // make link to confirm oayment in response.data.data.paymentUrl
  //     // window.location.href = response.data?.paymentUrl;
  //   } catch (error) {
  //     setBookingError(error.response.data?.message || (isRtl ? 'فشل في تأكيد الحجز' : 'Unable to confirm booking'));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');
    setBookingSuccess('');

    if (!formData.timeSlot) {
      setBookingError(isRtl ? 'يرجى اختيار موعد متاح' : 'Please select an available time');
      return;
    }

    try {
      const response = await api.post('/bookings/create', formData);
      console.log("done");
      // حفظ بيانات الحجز لعرضها في الـ popup
      setConfirmedBooking({
        patientName: formData.patientName,
        sessionType: formData.sessionType,
        date: formData.date,
        timeSlot: formData.timeSlot,
        totalPrice: response.data?.data?.totalPrice ?? selectedServicePrice,
      });

      // إظهار الـ popup
      setShowConfirmPopup(true);

    } catch (error) {
      setBookingError(
        error.response?.data?.message ||
        (isRtl ? 'فشل في تأكيد الحجز' : 'Unable to confirm booking')
      );
    }
  };


  return (
    <section id="hero" className="min-h-screen w-full relative flex justify-center items-center  py-20 px-6 md:px-10 bg-spa-bg">
      <div className={`image absolute ${isRtl ? 'left-0 ' : 'right-0  scale-x-[-1]'} z-100 top-0 w-[200px] object-cover pointer-events-none`}>
        <img
          src={backgroundImg}
          alt="Background"
        />
      </div>
      <div className={`image absolute ${isRtl ? 'left-0' : 'right-0 scale-x-[-1]'} bottom-0 w-[200px] object-cover pointer-events-none`}>
        <img
          src={backgroundImg2}
          alt={isRtl ? 'صورة خلفية' : 'Background image'}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl w-full">
        {/*
          Unified responsive grid:
          - Mobile  (<lg)  : single column, stacked
          - Tablet  (lg)   : image + text side-by-side on row 1, form centred on row 2
          - Desktop (xl)   : all three side-by-side in one row
        */}
        <div className={`hero-grid ${isRtl ? 'hero-grid--rtl' : ''}`}>

          {/* ── HERO IMAGE ─────────────────────────────────────── */}
          <div className="hero-image h-full">
            <img
              src={heroImg}
              alt="Spa Experience"
              className="w-full h-full  object-cover rounded-3xl shadow-2xl"
            />
          </div>

          {/* ── HERO TEXT & CTA ─────────────────────────────────── */}

          <div className={`hero-text flex flex-col justify-center ${isRtl ? 'text-right' : ''}`}>
            <div className="mb-6">
              <span className="inline-block text-spa-gold text-xs md:text-sm font-bold tracking-widest uppercase">
                {isRtl ? 'التعافي الشامل' : 'HOLISTIC RECOVERY'}
              </span>
            </div>

            <h1 className="text-[32px] lg:text-[48px] text-color-spa-brown-text mb-6 xl:mb-8 leading-tight">
              {isRtl
                ? 'استمتع بعافية عميقة من الرأس إلى القدمين'
                : 'Experience Deep Wellness, Head to Toe.'}
            </h1>

            <p className="text-spa-brown-text text-base md:text-lg mb-6 xl:mb-8 leading-relaxed">
              {isRtl
                ? 'تجمع بروتوكولات الحجامة المخصصة لنا بين الحكمة القديمة والدقة الفسيولوجية الحديثة لاستعادة حيوية جسمك الطبيعية.'
                : "Our curated cupping protocols combine ancient wisdom with modern physiological precision to restore your body's natural vitality."}
            </p>

            <SubTitle />

            <div className="w-fit">
              <Button variant="primary" className='font-normal' size="md">
                {isRtl ? 'استكشف الفوائد' : 'EXPLORE BENEFITS'}
              </Button>
            </div>
          </div>

          {/* ── BOOKING FORM ─────────────────────────────────────── */}
          <div className="hero-form">
            <div className="bg-white rounded-xl border border-spa-border p-6 md:p-8 shadow-lg">
              <h2 className="text-xl md:text-2xl font-bold text-spa-gold mb-8 font-cairo text-center xl:text-left">
                {isRtl ? 'احجز جلسة سيرينتي الخاصة' : 'Book Your Serenity Session'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-spa-brown-dark uppercase mb-2 tracking-wider">
                    {isRtl ? 'الاسم الكامل' : 'FULL NAME'}
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={isRtl ? 'الاسم' : 'Name'}
                    className="w-full placeholder-spa-input px-4 py-2.5 border border-spa-border rounded focus:border-spa-gold focus:outline-none text-spa-brown-dark  text-sm transition-colors"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-spa-brown-dark uppercase mb-2 tracking-wider">
                    {isRtl ? 'رقم الهاتف' : 'PHONE NUMBER'}
                  </label>
                  <input
                    type="tel"
                    name="patientPhone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+20 111 111 1111"
                    className="w-full px-4 py-2.5 border border-spa-border rounded focus:border-spa-gold focus:outline-none text-spa-brown-dark placeholder-spa-brown-mid text-sm transition-colors"
                    required
                  />
                </div>

                {/* Gender */}
                <div>
                  <p className="text-xs font-bold text-spa-brown-dark uppercase mb-2 tracking-wider">
                    {isRtl ? 'الجنس' : 'GENDER'}
                  </p>
                  <div className="flex items-center gap-4">
                    {['male', 'female'].map((g) => (
                      <label key={g} className="inline-flex items-center gap-2 text-spa-brown-dark text-sm">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                          className="h-4 w-4 text-spa-gold border-spa-border focus:ring-spa-gold"
                        />
                        {g === 'male'
                          ? (isRtl ? 'ذكر' : 'Male')
                          : (isRtl ? 'أنثى' : 'Female')}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Service Type & Captain */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-spa-brown-dark uppercase mb-2 tracking-wider">
                      {isRtl ? 'نوع الخدمة' : 'SERVICE TYPE'}
                    </label>
                    <select
                      name="sessionType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-spa-border rounded focus:border-spa-gold focus:outline-none text-spa-brown-dark text-sm transition-colors"
                    >
                      <option value="">{isRtl ? 'اختر نوع الخدمة' : 'Select service type'}</option>
                      <option value="hijama">{isRtl ?  'حجامة كاملة' : 'Cupping Full body'}</option>
                      <option value="hijama_upper">{isRtl ? 'حجامة علوية' : 'Cupping Upper Body'}</option>
                      <option value="recovery">{isRtl ? 'المساج العلاجى كامل' : 'Therapeutic Massage Full Body'}</option>
                      <option value="recovery_upper">{isRtl ? 'المساج العلاجى العلوية' : 'Therapeutic Massage Upper Body'}</option>
                      <option value="facial_massage">{isRtl ? 'مساج الوجه' : 'Face Massage'}</option>
                      <option value="sports_massage">{isRtl ? 'مساج رياضي' : 'Sports Massage'}</option>
                      <option value="vip">{isRtl ? 'جلسه مميزة مع كابتن يوسف' : 'Vip Session With Catpian Yousef'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-spa-brown-dark uppercase mb-2 tracking-wider">
                      {isRtl ? 'المعالج' : 'CAPTAIN'}
                    </label>
                    <select
                      name="captainId"
                      value={formData.captainId}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-spa-border rounded focus:border-spa-gold focus:outline-none text-spa-brown-dark text-sm transition-colors"
                    >
                      <option value="">
                        {loadingCaptains
                          ? (isRtl ? 'جارٍ التحميل...' : 'Loading...')
                          : (isRtl ? 'اختر المعالج' : 'Choose captain')}
                      </option>
                      {visibleCaptains.map((captain) => (
                        <option key={captain._id} value={captain._id}>
                          {captain.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-spa-brown-dark uppercase mb-2 tracking-wider">
                      {isRtl ? 'التاريخ' : 'DATE'}
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-spa-border rounded focus:border-spa-gold focus:outline-none text-spa-brown-dark text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-spa-brown-dark uppercase mb-2 tracking-wider">
                      {isRtl ? 'الوقت' : 'TIME'}
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.time}
                      onChange={handleChange}
                      disabled={!availableSlots.length}
                      className="w-full px-4 py-2.5 border border-spa-border rounded focus:border-spa-gold focus:outline-none text-spa-brown-dark text-sm transition-colors disabled:cursor-not-allowed disabled:bg-[#F7F3E9]"
                    >
                      <option value="">
                        {availableSlots.length > 0
                          ? (isRtl ? 'اختر الوقت' : 'Select a time')
                          : (isRtl ? 'اختر المعالج والنوع والتاريخ' : 'Choose captain, service, and date')}
                      </option>
                      {availableSlots.map((slot, index) => (
                        <option key={index} value={slot.time || slot}>
                          {slot.time || slot}
                        </option>
                      ))}
                    </select>
                    {!loadingSlots && !availableSlots.length &&
                      formData.serviceType && formData.captainId && formData.gender && formData.date && (
                        <p className="mt-2 text-xs text-spa-brown-mid">
                          {isRtl
                            ? 'لا توجد مواعيد متاحة لهذا اليوم. حاول تغيير التفاصيل.'
                            : 'No available slots for this date. Try changing the details.'}
                        </p>
                      )}
                  </div>
                </div>

                {/* Price display */}
                {selectedServicePrice !== null && (
                  <div className="mt-6 p-4 bg-spa-gold/10 border border-spa-gold/30 rounded-lg text-center">
                    <p className="text-spa-brown-dark font-semibold">
                      {isRtl ? 'سعر الخدمة:' : 'Service Price:'}{' '}
                      {selectedServicePrice} {isRtl ? 'جنيه' : 'EGP'}
                    </p>
                  </div>
                )}
                <Button variant="primary" className="w-full mt-8 font-normal" type='submit' size="md">
                  {isRtl ? 'تأكيد الحجز' : 'CONFIRM RESERVATION'}
                </Button>
              </form>

              {loadingSlots && (
                <p className="mt-6 text-sm text-spa-brown-mid">
                  {isRtl ? 'جارٍ جلب المواعيد المتاحة...' : 'Fetching available slots...'}
                </p>
              )}
              {slotsError && <p className="mt-6 text-sm text-red-500">{slotsError}</p>}
              {bookingError && <p className="mt-4 text-sm text-red-500">{bookingError}</p>}
              {bookingSuccess && <p className="mt-4 text-sm text-green-600">{bookingSuccess}</p>}
            </div>
          </div>

        </div>
      </div>


      <BookingConfirmPopup
        isOpen={showConfirmPopup}
        onClose={() => setShowConfirmPopup(false)}
        isRtl={isRtl}
        booking={confirmedBooking}
      />

    </section>
  );
};

export default Hero;

