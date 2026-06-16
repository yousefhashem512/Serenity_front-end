import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Loader2, Search, CheckCircle, XCircle, Clock,
  Banknote, Plus, X, CreditCard,
} from 'lucide-react';
import {
  fetchBookings,
  updateBookingStatus,
  updatePaymentStatus,
  createBooking,
  fetchCaptains,
  fetchPrices,
} from '../../api/adminApi';
import api from '../../api/axios';

// ─── ثوابت ───────────────────────────────────────────────────────────────────
const STATUS_LABELS = {
  confirmed: { label: 'مؤكد', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  completed: { label: 'مكتمل', color: 'bg-green-50 text-green-700 border-green-200' },
  cancelled: { label: 'ملغى', color: 'bg-red-50 text-red-700 border-red-200' },
};

const PAYMENT_LABELS = {
  pending: { label: 'معلّق', icon: Clock, color: 'text-amber-600' },
  paidCash: { label: 'مدفوع كاش', icon: Banknote, color: 'text-green-600' },
  rejected: { label: 'مرفوض', icon: XCircle, color: 'text-red-600' },
};

const PAYMENT_OPTIONS = [
  { value: 'pending', label: 'معلّق' },
  { value: 'paidCash', label: 'مدفوع كاش' },
  { value: 'rejected', label: 'مرفوض' },
];

const SESSION_OPTIONS = [
  { value: 'hijama', label: 'حجامة كاملة', priceKey: 'hijamaPrice' },
  { value: 'hijama_upper', label: 'حجامة علوية', priceKey: 'hijamaUpperPrice' },
  { value: 'recovery', label: 'المساج العلاجى كامل', priceKey: 'recoveryPrice' },
  { value: 'recovery_upper', label: 'المساج العلاجى العلوية', priceKey: 'recoveryUpperPrice' },
  { value: 'facial_massage', label: 'مساج وجه', priceKey: 'facialMassagePrice' },
  { value: 'sports_massage', label: 'مساج رياضي', priceKey: 'sportsMassagePrice' },
  { value: 'vip', label: 'جلسة VIP مع كابتن يوسف', priceKey: 'vipSeccionPrice' },
];

const SESSION_AR = Object.fromEntries(SESSION_OPTIONS.map((s) => [s.value, s.label]));
const GENDER_AR = { male: 'ذكر', female: 'أنثى' };

// ─── مكوّنات مشتركة ──────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const s = STATUS_LABELS[status] || { label: status, color: 'bg-gray-100 text-gray-600 border-gray-200' };
  return (
    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${s.color}`}>
      {s.label}
    </span>
  );
};

const PaymentBadge = ({ status }) => {
  const p = PAYMENT_LABELS[status] || { label: status, icon: Clock, color: 'text-gray-500' };
  const Icon = p.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium ${p.color}`}>
      <Icon size={13} />
      {p.label}
    </span>
  );
};

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-semibold text-[#2C1810] uppercase tracking-wider mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition placeholder-[#7A6455]/50 disabled:opacity-50 disabled:cursor-not-allowed';

// ─── Dropdown لتحديث حالة الدفع ──────────────────────────────────────────────
const PaymentDropdown = ({ bookingId, current, onUpdate, isUpdating }) => {
  const [open, setOpen] = useState(false);

  const currentLabel = PAYMENT_LABELS[current] ?? { label: current, icon: Clock, color: 'text-gray-500' };
  const Icon = currentLabel.icon;

  const handleSelect = (value) => {
    if (value === current) { setOpen(false); return; }
    onUpdate(bookingId, value);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={isUpdating}
        className={`
          inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border
          transition whitespace-nowrap
          ${open ? 'border-[#C49A3C] bg-[#FAF8F4]' : 'border-[#E8E0D5] bg-white hover:border-[#C49A3C]/50 hover:bg-[#FAF8F4]'}
          ${currentLabel.color}
        `}
      >
        {isUpdating
          ? <Loader2 size={12} className="animate-spin" />
          : <Icon size={12} />}
        {currentLabel.label}
        <CreditCard size={11} className="opacity-50 mr-0.5" />
      </button>

      {open && (
        <>
          {/* إغلاق عند الضغط خارج القائمة */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full mt-1 right-0 z-20 bg-white border border-[#E8E0D5] rounded-xl shadow-lg overflow-hidden min-w-[150px]">
            {PAYMENT_OPTIONS.map(({ value, label }) => {
              const opt = PAYMENT_LABELS[value];
              const OptIcon = opt.icon;
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(value)}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2.5 text-xs text-right transition
                    ${value === current
                      ? 'bg-[#FAF8F4] font-bold text-[#2C1810]'
                      : 'hover:bg-[#FAF8F4] text-[#7A6455] hover:text-[#2C1810]'}
                  `}
                >
                  <OptIcon size={13} className={opt.color} />
                  {label}
                  {value === current && (
                    <CheckCircle size={12} className="mr-auto text-[#C49A3C]" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

// ─── مودال إنشاء الحجز ───────────────────────────────────────────────────────
const CreateBookingModal = ({ onClose, onSuccess }) => {
  const EMPTY = {
    patientName: '', patientPhone: '', patientAge: '20',
    gender: '', sessionType: '', branch: 'Cairo-Branch',
    captainId: '', date: '', timeSlot: '',
  };

  const [form, setForm] = useState(EMPTY);
  const [availableSlots, setSlots] = useState([]);
  const [loadingSlots, setLoadSlots] = useState(false);
  const [slotsError, setSlotsErr] = useState('');
  const [submitError, setSubmitErr] = useState('');
  const [price, setPrice] = useState(null);

  const { data: captainsData, isLoading: loadingCaptains } = useQuery({
    queryKey: ['captains'],
    queryFn: fetchCaptains,
    retry: 1,
  });
  const { data: pricesData } = useQuery({
    queryKey: ['prices'],
    queryFn: fetchPrices,
    retry: 1,
  });

  const captains = captainsData?.data ?? [];
  const prices = pricesData?.data ?? {};

  const filteredCaptains = form.gender
    ? captains.filter((c) => c.gender === form.gender)
    : captains;

  useEffect(() => {
    const session = SESSION_OPTIONS.find((s) => s.value === form.sessionType);
    setPrice(session && prices[session.priceKey] !== undefined ? prices[session.priceKey] : null);
  }, [form.sessionType, prices]);

  useEffect(() => {
    if (!form.captainId || !form.date || !form.gender) { setSlots([]); return; }
    let cancelled = false;
    setSlotsErr('');
    setLoadSlots(true);
    setSlots([]);
    api.post('/bookings/available-slots', { gender: form.gender, captainId: form.captainId, date: form.date })
      .then((res) => { if (!cancelled) setSlots(res.data?.availableSlots ?? []); })
      .catch((err) => { if (!cancelled) setSlotsErr(err.response?.data?.message || 'تعذّر جلب المواعيد'); })
      .finally(() => { if (!cancelled) setLoadSlots(false); });
    return () => { cancelled = true; };
  }, [form.captainId, form.date, form.gender]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'gender' ? { captainId: '', timeSlot: '' } : {}),
      ...(name === 'captainId' ? { timeSlot: '' } : {}),
      ...(name === 'date' ? { timeSlot: '' } : {}),
    }));
  };

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => { onSuccess(); onClose(); },
    onError: (err) => setSubmitErr(err.response?.data?.message || 'حدث خطأ أثناء إنشاء الحجز'),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitErr('');
    if (!form.timeSlot) { setSubmitErr('يرجى اختيار موعد متاح'); return; }
    mutation.mutate(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div dir="rtl" className="bg-white rounded-3xl shadow-2xl border border-[#E8E0D5] w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E0D5] sticky top-0 bg-white rounded-t-3xl z-10">
          <div>
            <h2 className="text-lg font-bold text-[#2C1810]">إنشاء حجز جديد</h2>
            <p className="text-xs text-[#7A6455] mt-0.5">حجز يدوي بواسطة الأدمن</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-[#7A6455] hover:text-[#2C1810] hover:bg-[#FAF8F4] transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="الاسم الكامل">
              <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="محمد أحمد" required className={inputCls} />
            </Field>
            <Field label="رقم الهاتف">
              <input name="patientPhone" value={form.patientPhone} onChange={handleChange} placeholder="+201111111111" required dir="ltr" className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="نوع الجلسة">
              <select name="sessionType" value={form.sessionType} onChange={handleChange} required className={inputCls}>
                <option value="">اختر نوع الجلسة</option>
                {SESSION_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </Field>
            <Field label="الجنس">
              <div className="flex gap-4 pt-1.5">
                {[{ v: 'male', l: 'ذكر' }, { v: 'female', l: 'أنثى' }].map(({ v, l }) => (
                  <label key={v} className="flex items-center gap-2 text-sm text-[#2C1810] cursor-pointer">
                    <input type="radio" name="gender" value={v} checked={form.gender === v} onChange={handleChange} className="h-4 w-4 accent-[#C49A3C]" />
                    {l}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <Field label="الكابتن / المعالج">
            {loadingCaptains
              ? <div className="flex items-center gap-2 py-2.5 text-sm text-[#7A6455]"><Loader2 size={14} className="animate-spin" /> جارٍ التحميل...</div>
              : (
                <select name="captainId" value={form.captainId} onChange={handleChange} required disabled={!form.gender} className={inputCls}>
                  <option value="">{form.gender ? 'اختر الكابتن' : 'اختر الجنس أولاً'}</option>
                  {filteredCaptains.map((c) => <option key={c._id} value={c._id}>{c.name} {c.type === 'leader' ? '⭐' : ''}</option>)}
                </select>
              )}
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="التاريخ">
              <input type="date" name="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required className={inputCls} />
            </Field>
            <Field label="الموعد">
              <select name="timeSlot" value={form.timeSlot} onChange={handleChange} disabled={!availableSlots.length && !loadingSlots} required className={inputCls}>
                <option value="">{loadingSlots ? 'جارٍ جلب المواعيد...' : availableSlots.length ? 'اختر الموعد' : 'اختر الكابتن والتاريخ أولاً'}</option>
                {availableSlots.map((slot, i) => <option key={i} value={slot.time ?? slot}>{slot.time ?? slot}</option>)}
              </select>
              {loadingSlots && <p className="text-xs text-[#7A6455] mt-1 flex items-center gap-1"><Loader2 size={11} className="animate-spin" /> جارٍ تحميل المواعيد...</p>}
              {slotsError && <p className="text-xs text-red-500 mt-1">{slotsError}</p>}
              {!loadingSlots && !availableSlots.length && form.captainId && form.date && <p className="text-xs text-amber-600 mt-1">لا توجد مواعيد متاحة لهذا اليوم</p>}
            </Field>
          </div>

          {price !== null && (
            <div className="bg-[#C49A3C]/8 border border-[#C49A3C]/25 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-[#7A6455]">سعر الجلسة</span>
              <span className="font-bold text-[#2C1810]">{price} ج.م</span>
            </div>
          )}

          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 text-center">{submitError}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#E8E0D5] text-[#7A6455] font-semibold text-sm hover:bg-[#FAF8F4] transition">
              إلغاء
            </button>
            <button type="submit" disabled={mutation.isPending} className="flex-1 flex items-center justify-center gap-2 bg-[#2C1810] hover:bg-[#C49A3C] text-white py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed">
              {mutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              {mutation.isPending ? 'جارٍ الإنشاء...' : 'إنشاء الحجز'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── الصفحة الرئيسية ─────────────────────────────────────────────────────────
const Bookings = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [updatingPaymentId, setUpdatingPaymentId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings,
    retry: 1,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, payload }) => updateBookingStatus(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookings'] }),
  });

  const paymentMutation = useMutation({
    mutationFn: ({ id, paymentStatus }) => updatePaymentStatus(id, { paymentStatus }),
    onMutate: ({ id }) => setUpdatingPaymentId(id),
    onSettled: () => {
      setUpdatingPaymentId(null);
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  const bookings = data?.data ?? [];

  const filtered = bookings.filter((b) => {
    const matchSearch = !search || b.patientName?.includes(search) || b.patientPhone?.includes(search);
    const matchStatus = !filterStatus || b.bookingStatus === filterStatus;
    const matchGender = !filterGender || b.gender === filterGender;
    const matchPayment = !filterPayment || b.paymentStatus === filterPayment;
    return matchSearch && matchStatus && matchGender && matchPayment;
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={32} className="animate-spin text-[#C49A3C]" />
    </div>
  );

  if (isError) return (
    <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6 text-center">
      تعذّر تحميل الحجوزات. يرجى التحقق من الاتصال بالخادم.
    </div>
  );

  const TABLE_HEADERS = [
    'المريض', 'الهاتف', 'الجنس', 'النوع', 'التاريخ',
    'الوقت', 'الكابتن', 'الإجمالي', 'حالة الدفع', 'الحالة', 'إجراءات الجلسة',
  ];

  return (
    <div dir="rtl" className="space-y-6">

      {/* العنوان + زر الإنشاء */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">إدارة الحجوزات</h1>
          <p className="text-sm text-[#7A6455] mt-1">عرض وتحديث حالة الحجوزات</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2C1810] hover:bg-[#C49A3C] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm"
        >
          <Plus size={16} />
          حجز جديد
        </button>
      </div>

      {/* فلاتر */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6455]" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بالاسم أو الهاتف..."
            className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-white text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
          />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-white text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition">
          <option value="">كل الحالات</option>
          <option value="confirmed">مؤكد</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغى</option>
        </select>
        <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} className="px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-white text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition">
          <option value="">كل الجنسين</option>
          <option value="male">ذكور</option>
          <option value="female">إناث</option>
        </select>
        <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)} className="px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-white text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition">
          <option value="">كل حالات الدفع</option>
          <option value="pending">معلّق</option>
          <option value="paid">مدفوع أونلاين</option>
          <option value="paidCash">مدفوع كاش</option>
        </select>
      </div>

      <p className="text-xs text-[#7A6455]">{filtered.length} حجز</p>

      {/* الجدول */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8E0D5] p-10 text-center text-[#7A6455]">
          لا توجد حجوزات مطابقة
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E8E0D5] bg-[#FAF8F4]">
                  {TABLE_HEADERS.map((h) => (
                    <th key={h} className="text-right px-4 py-3 font-semibold text-[#2C1810] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b._id} className="border-b border-[#E8E0D5] last:border-0 hover:bg-[#FAF8F4]/60 transition">
                    <td className="px-4 py-3 font-medium text-[#2C1810] whitespace-nowrap">{b.patientName}</td>
                    <td className="px-4 py-3 text-[#7A6455] whitespace-nowrap" dir="ltr">{b.patientPhone}</td>
                    <td className="px-4 py-3 text-[#7A6455]">{GENDER_AR[b.gender] ?? b.gender}</td>
                    <td className="px-4 py-3 text-[#7A6455]">{SESSION_AR[b.sessionType] ?? b.sessionType}</td>
                    <td className="px-4 py-3 text-[#7A6455] whitespace-nowrap" dir="ltr">{b.date}</td>
                    <td className="px-4 py-3 text-[#7A6455] whitespace-nowrap" dir="ltr">{b.timeSlot}</td>
                    <td className="px-4 py-3 text-[#7A6455]">{b.captainId?.name ?? '—'}</td>
                    <td className="px-4 py-3 font-semibold text-[#2C1810] whitespace-nowrap">{b.totalPrice} ج.م</td>

                    {/* ── عمود حالة الدفع القابل للتعديل ── */}
                    <td className="px-4 py-3">
                      <PaymentDropdown
                        bookingId={b._id}
                        current={b.paymentStatus}
                        isUpdating={updatingPaymentId === b._id}
                        onUpdate={(id, paymentStatus) =>
                          paymentMutation.mutate({ id, paymentStatus })
                        }
                      />
                    </td>

                    <td className="px-4 py-3"><Badge status={b.bookingStatus} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {b.bookingStatus !== 'completed' && (
                          <button
                            onClick={() => statusMutation.mutate({ id: b._id, payload: { bookingStatus: 'completed' } })}
                            title="إتمام"
                            className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition"
                          >
                            <CheckCircle size={15} />
                          </button>
                        )}
                        {b.bookingStatus !== 'cancelled' && (
                          <button
                            onClick={() => statusMutation.mutate({ id: b._id, payload: { bookingStatus: 'cancelled' } })}
                            title="إلغاء"
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition"
                          >
                            <XCircle size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <CreateBookingModal
          onClose={() => setShowModal(false)}
          onSuccess={() => queryClient.invalidateQueries({ queryKey: ['bookings'] })}
        />
      )}
    </div>
  );
};

export default Bookings;