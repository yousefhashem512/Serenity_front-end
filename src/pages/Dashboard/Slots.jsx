import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, LockOpen, Lock, CalendarX, CalendarOff } from 'lucide-react';
import {
  fetchCaptains,
  disableSlot,
  enableSlot,
  fetchDisabledSlots,
  fetchDisabledDays,
  disableFullDay,
  enableFullDay,
} from '../../api/adminApi';

const MORNING_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
const EVENING_SLOTS = ['05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM', '12:00 PM'];

// ===== مكون قسم تعطيل يوم كامل =====
const FullDaySection = ({ captains, loadingCaptains }) => {
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split('T')[0];
  const [dayForm, setDayForm] = useState({ captainId: '', date: today, reason: '' });
  console.log(captains);

  const { data: disabledDaysData, isLoading: loadingDays, isError: errorDays } = useQuery({
    queryKey: ['disabledDays'],
    queryFn: fetchDisabledDays,
    retry: 1,
  });

  const disableDayMutation = useMutation({
    mutationFn: disableFullDay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disabledDays'] });
      setDayForm((f) => ({ ...f, reason: '' }));
    },
  });

  const enableDayMutation = useMutation({
    mutationFn: enableFullDay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disabledDays'] });
      setDayForm((f) => ({ ...f, reason: '' }));
    }, onError: (e) => {
      console.log(e);
      console.log(dayForm);

    },
  });

  const disabledDays = disabledDaysData?.data ?? [];

  const handleDisableDay = (e) => {
    e.preventDefault();
    if (!dayForm.captainId || !dayForm.date) return;
    disableDayMutation.mutate(dayForm);
  };
  console.log(disabledDays);

  return (
    <div className="space-y-4">
      {/* نموذج تعطيل يوم كامل */}
      <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm overflow-hidden">
        <div className="border-b border-[#E8E0D5] px-6 py-4 flex items-center gap-2">
          <CalendarOff size={16} className="text-red-500" />
          <h2 className="font-semibold text-[#2C1810]">تعطيل يوم كامل لكابتن</h2>
        </div>
        <form onSubmit={handleDisableDay} className="p-6">
          {loadingCaptains ? (
            <div className="flex items-center justify-center h-20">
              <Loader2 size={24} className="animate-spin text-[#C49A3C]" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {/* اختيار الكابتن */}
              <select
                value={dayForm.captainId}
                onChange={(e) => setDayForm({ ...dayForm, captainId: e.target.value })}
                className="flex-1 min-w-[160px] px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
              >
                <option value="">اختر كابتن</option>
                {captains.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name} ({c.gender === 'male' ? 'ذكر' : 'أنثى'})
                  </option>
                ))}
              </select>

              {/* اختيار اليوم */}
              <input
                type="date"
                value={dayForm.date}
                min={today}
                onChange={(e) => setDayForm({ ...dayForm, date: e.target.value })}
                className="px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
                dir="ltr"
              />

              {/* السبب */}
              <input
                type="text"
                placeholder="السبب (اختياري)"
                value={dayForm.reason}
                onChange={(e) => setDayForm({ ...dayForm, reason: e.target.value })}
                className="flex-1 min-w-[160px] px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
              />

              {/* زر التعطيل */}
              <button
                type="submit"
                disabled={disableDayMutation.isPending || !dayForm.captainId || !dayForm.date}
                className="flex items-center gap-2 bg-[#2C1810] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {disableDayMutation.isPending
                  ? <Loader2 size={14} className="animate-spin" />
                  : <CalendarOff size={14} />}
                تعطيل اليوم
              </button>
            </div>
          )}
          {disableDayMutation.isError && (
            <p className="text-red-500 text-xs mt-3">حدث خطأ أثناء تعطيل اليوم</p>
          )}
          {disableDayMutation.isSuccess && (
            <p className="text-green-600 text-xs mt-3">تم تعطيل اليوم بنجاح ✓</p>
          )}
        </form>
      </div>

      {/* قائمة الأيام المعطّلة */}
      <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm overflow-hidden">
        <div className="border-b border-[#E8E0D5] px-6 py-4 flex items-center gap-2">
          <CalendarX size={16} className="text-red-500" />
          <h2 className="font-semibold text-[#2C1810]">
            الأيام المعطّلة
            {!loadingDays && (
              <span className="mr-2 text-xs font-normal text-[#7A6455]">
                ({disabledDays.length})
              </span>
            )}
          </h2>
        </div>
        <div className="p-6">
          {loadingDays ? (
            <div className="flex items-center justify-center h-20">
              <Loader2 size={24} className="animate-spin text-[#C49A3C]" />
            </div>
          ) : errorDays ? (
            <p className="text-center text-red-500 text-sm py-4">تعذّر تحميل الأيام المعطّلة</p>
          ) : disabledDays.length === 0 ? (
            <p className="text-center text-[#7A6455] text-sm py-4">لا توجد أيام معطّلة</p>
          ) : (
            <div className="space-y-2">
              {disabledDays.map((day) => (

                <div
                  key={day.captain?._id ?? `${day.captainId}-${day.date}`}
                  className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    {/* اسم الكابتن */}
                    {(day.captain?.name ?? day.captainName) && (
                      <span className="font-semibold text-[#2C1810]">
                        {day.captain?.name ?? day.captainName}
                      </span>
                    )}
                    <span className="text-[#7A6455]" dir="ltr">{day.date}</span>
                    {day.reason && (
                      <span className="text-xs bg-white border border-[#E8E0D5] text-[#7A6455] px-2 py-0.5 rounded-full">
                        {day.reason}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => enableDayMutation.mutate({
                      date: day.date,
                      captainId: day.captain?._id || day.captainId,
                    })}
                    disabled={enableDayMutation.isPending && enableDayMutation.variables?.id === day._id}
                    className="flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-700 bg-white border border-green-200 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                  >
                    {enableDayMutation.isPending && enableDayMutation.variables?.id === day._id
                      ? <Loader2 size={13} className="animate-spin" />
                      : <LockOpen size={13} />}
                    تفعيل
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ===== المكون الرئيسي =====
const Slots = () => {
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ captainId: '', date: today, timeSlot: '' });
  const [activeTab, setActiveTab] = useState('slots');

  const { data: captainsData, isLoading: loadingCaptains } = useQuery({
    queryKey: ['captains'],
    queryFn: fetchCaptains,
    retry: 1,
  });

  const { data: disabledData, isLoading: loadingDisabled, isError: errorDisabled } = useQuery({
    queryKey: ['disabledSlots'],
    queryFn: fetchDisabledSlots,
    retry: 1,
  });

  const disableMutation = useMutation({
    mutationFn: disableSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disabledSlots'] });
      setForm((f) => ({ ...f, timeSlot: '' }));
    },
  });

  const enableMutation = useMutation({
    mutationFn: enableSlot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disabledSlots'] });
    },
  });

  const captains = captainsData?.data ?? [];
  const disabledSlots = disabledData?.data ?? [];
  const selectedCaptain = captains.find((c) => c._id === form.captainId);
  const slots = selectedCaptain?.gender === 'female' ? MORNING_SLOTS : EVENING_SLOTS;

  const handleDisable = (e) => {
    e.preventDefault();
    if (!form.captainId || !form.date || !form.timeSlot) return;
    disableMutation.mutate(form);
  };

  const TABS = [
    { key: 'slots', label: 'مواعيد محددة', icon: Lock },
    { key: 'days', label: 'أيام كاملة', icon: CalendarOff },
  ];

  return (
    <div dir="rtl" className="space-y-6">
      {/* العنوان */}
      <div>
        <h1 className="text-2xl font-bold text-[#2C1810]">إدارة المواعيد</h1>
        <p className="text-sm text-[#7A6455] mt-1">تعطيل وتفعيل المواعيد والأيام للكباتن</p>
      </div>

      {/* معلومات الفترات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#2C1810]/5 border border-[#2C1810]/10 rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-lg">🌙</span>
          <div>
            <p className="text-sm font-semibold text-[#2C1810]">فترة الذكور (مسائية)</p>
            <p className="text-xs text-[#7A6455] mt-0.5">04:00 PM — 10:00 PM</p>
          </div>
        </div>
        <div className="bg-[#C49A3C]/8 border border-[#C49A3C]/20 rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-lg">☀️</span>
          <div>
            <p className="text-sm font-semibold text-[#2C1810]">فترة الإناث (صباحية)</p>
            <p className="text-xs text-[#7A6455] mt-0.5">09:00 AM — 03:00 PM</p>
          </div>
        </div>
      </div>

      {/* تبويبات */}
      <div className="flex gap-2 bg-white border border-[#E8E0D5] rounded-2xl p-1.5 w-fit shadow-sm">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === key
              ? 'bg-[#2C1810] text-white shadow-sm'
              : 'text-[#7A6455] hover:text-[#2C1810]'
              }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* تبويب: مواعيد محددة */}
      {activeTab === 'slots' && (
        <div className="space-y-4">
          {/* نموذج التعطيل */}
          <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm overflow-hidden">
            <div className="border-b border-[#E8E0D5] px-6 py-4 flex items-center gap-2">
              <Lock size={16} className="text-[#C49A3C]" />
              <h2 className="font-semibold text-[#2C1810]">تعطيل موعد محدد</h2>
            </div>
            <form onSubmit={handleDisable} className="p-6">
              {loadingCaptains ? (
                <div className="flex items-center justify-center h-20">
                  <Loader2 size={24} className="animate-spin text-[#C49A3C]" />
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  <select
                    value={form.captainId}
                    onChange={(e) => setForm({ ...form, captainId: e.target.value, timeSlot: '' })}
                    className="flex-1 min-w-[160px] px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
                  >
                    <option value="">اختر كابتن</option>
                    {captains.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name} ({c.gender === 'male' ? 'ذكر' : 'أنثى'})
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={form.date}
                    min={today}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
                    dir="ltr"
                  />
                  <select
                    value={form.timeSlot}
                    onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                    disabled={!form.captainId}
                    className="px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition disabled:opacity-50"
                  >
                    <option value="">اختر موعد</option>
                    {slots.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={disableMutation.isPending || !form.captainId || !form.date || !form.timeSlot}
                    className="flex items-center gap-2 bg-[#2C1810] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {disableMutation.isPending
                      ? <Loader2 size={14} className="animate-spin" />
                      : <Lock size={14} />}
                    تعطيل
                  </button>
                </div>
              )}
              {disableMutation.isError && (
                <p className="text-red-500 text-xs mt-3">حدث خطأ أثناء التعطيل</p>
              )}
              {disableMutation.isSuccess && (
                <p className="text-green-600 text-xs mt-3">تم تعطيل الموعد بنجاح ✓</p>
              )}
            </form>
          </div>

          {/* قائمة المواعيد المعطّلة */}
          <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm overflow-hidden">
            <div className="border-b border-[#E8E0D5] px-6 py-4 flex items-center gap-2">
              <CalendarX size={16} className="text-red-500" />
              <h2 className="font-semibold text-[#2C1810]">
                المواعيد المعطّلة
                {!loadingDisabled && (
                  <span className="mr-2 text-xs font-normal text-[#7A6455]">
                    ({disabledSlots.length})
                  </span>
                )}
              </h2>
            </div>
            <div className="p-6">
              {loadingDisabled ? (
                <div className="flex items-center justify-center h-20">
                  <Loader2 size={24} className="animate-spin text-[#C49A3C]" />
                </div>
              ) : errorDisabled ? (
                <p className="text-center text-red-500 text-sm py-4">تعذّر تحميل المواعيد المعطّلة</p>
              ) : disabledSlots.length === 0 ? (
                <p className="text-center text-[#7A6455] text-sm py-4">لا توجد مواعيد معطّلة</p>
              ) : (
                <div className="space-y-2">
                  {disabledSlots.map((slot) => (
                    <div
                      key={slot._id}
                      className="flex items-center justify-between bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        {slot.captainId?.name && (
                          <span className="font-semibold text-[#2C1810]">
                            {slot.captainId.name}
                          </span>
                        )}
                        <span className="font-medium text-[#2C1810]" dir="ltr">{slot.date}</span>
                        <span className="text-[#7A6455]" dir="ltr">{slot.timeSlot}</span>
                      </div>
                      <button
                        onClick={() => enableMutation.mutate(slot._id)}
                        disabled={enableMutation.isPending && enableMutation.variables === slot._id}
                        className="flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-700 bg-white border border-green-200 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                      >
                        {enableMutation.isPending && enableMutation.variables === slot._id
                          ? <Loader2 size={13} className="animate-spin" />
                          : <LockOpen size={13} />}
                        تفعيل
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* تبويب: أيام كاملة — يستقبل الكباتن من المكون الرئيسي */}
      {activeTab === 'days' && (
        <FullDaySection captains={captains} loadingCaptains={loadingCaptains} />
      )}
    </div>
  );
};

export default Slots;