import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Save, RefreshCw, Info } from 'lucide-react';
import { fetchPrices, updatePricing } from '../../api/adminApi';

const Pricing = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    hijamaPrice: '', hijamaUpperPrice: '', recoveryPrice: '', recoveryUpperPrice: '',
    facialMassagePrice: '', sportsMassagePrice: '', vipSeccionPrice: ''
  });
  const [success, setSuccess] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['prices'],
    queryFn: fetchPrices,
    retry: 1,
  });

  useEffect(() => {
    if (data?.data) {
      const { hijamaPrice, hijamaUpperPrice, recoveryPrice, recoveryUpperPrice, facialMassagePrice, sportsMassagePrice, vipSeccionPrice } = data.data;
      setForm({
        hijamaPrice: hijamaPrice ?? '',
        hijamaUpperPrice: hijamaUpperPrice ?? '',
        recoveryPrice: recoveryPrice ?? '',
        recoveryUpperPrice: recoveryUpperPrice ?? '',
        facialMassagePrice: facialMassagePrice ?? '',
        sportsMassagePrice: sportsMassagePrice ?? '',
        vipSeccionPrice: vipSeccionPrice ?? '',
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updatePricing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prices'] });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      hijamaPrice: Number(form.hijamaPrice),
      hijamaUpperPrice: Number(form.hijamaUpperPrice),
      recoveryPrice: Number(form.recoveryPrice),
      recoveryUpperPrice: Number(form.recoveryUpperPrice),
      facialMassagePrice: Number(form.facialMassagePrice),
      sportsMassagePrice: Number(form.sportsMassagePrice),
      vipSeccionPrice: Number(form.vipSeccionPrice),
    });
  };

  const fieldConfig = [
    {
      key: 'hijamaPrice',
      label: 'سعر جلسة الحجامة كاملة',
      desc: 'السعر الأساسي لجلسة الحجامة بالجنيه المصري',
    },
    {
      key: 'hijamaUpperPrice',
      label: 'سعر جلسة الحجامة العلوية',
      desc: 'السعر الأساسي لجلسة الحجامة العلوية بالجنيه المصري',
    },
    {
      key: 'recoveryPrice',
      label: 'سعر جلسة الريكفري كاملة',
      desc: 'السعر الأساسي لجلسة الريكفري بالجنيه المصري',
    },
    {
      key: 'recoveryUpperPrice',
      label: 'سعر جلسة الريكفري العلوية',
      desc: 'السعر الأساسي لجلسة الريكفري العلوية بالجنيه المصري',
    },
    {
      key: 'facialMassagePrice',
      label: 'سعر جلسة مساج الوجه',
      desc: 'السعر الأساسي لجلسة مساج الوجه بالجنيه المصري',
    },
    {
      key: 'sportsMassagePrice',
      label: 'سعر جلسة المساج الرياضي',
      desc: 'السعر الأساسي لجلسة المساج الرياضي بالجنيه المصري',
    },
    {
      key: 'vipSeccionPrice',
      label: 'سعر الجلسة المميزة مع كابتن يوسف',
      desc: 'السعر الأساسي للجلسة المميزة مع كابتن يوسف بالجنيه المصري',
    },
  ];

  return (
    <div dir="rtl" className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2C1810]">إدارة الأسعار</h1>
        <p className="text-sm text-[#7A6455] mt-1">تحديث أسعار الجلسات والإضافات</p>
      </div>

      {/* مثال الحساب */}
      <div className="bg-[#C49A3C]/8 border border-[#C49A3C]/20 rounded-2xl p-5 flex gap-3 items-start">
        <Info size={18} className="text-[#C49A3C] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-[#2C1810]">مثال على حساب السعر</p>
          <p className="text-xs text-[#7A6455] mt-1">
            ذكر + حجامة + كابتن قيادي = سعر الحجامة + إضافة الكابتن. أنثى + ريكفري = سعر الريكفري فقط.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 size={28} className="animate-spin text-[#C49A3C]" />
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5 text-center text-sm">
          تعذّر تحميل الأسعار. يرجى التحقق من الاتصال بالخادم.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm overflow-hidden">
            <div className="border-b border-[#E8E0D5] px-6 py-4">
              <h2 className="font-semibold text-[#2C1810]">الأسعار الحالية</h2>
            </div>
            <div className="p-6 space-y-6">
              {fieldConfig.map(({ key, label, desc }) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-[#2C1810]">{label}</label>
                    <p className="text-xs text-[#7A6455] mt-0.5">{desc}</p>
                  </div>
                  <div className="relative w-full sm:w-48">
                    <input
                      type="number"
                      min="0"
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full pl-14 pr-4 py-3 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] font-semibold text-right focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7A6455] font-medium pointer-events-none">
                      ج.م
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E8E0D5] px-6 py-4 flex items-center justify-between gap-4 bg-[#FAF8F4]">
              {success && (
                <span className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                  <RefreshCw size={14} />
                  تم تحديث الأسعار بنجاح
                </span>
              )}
              {mutation.isError && (
                <span className="text-sm text-red-500">
                  حدث خطأ أثناء التحديث
                </span>
              )}
              {!success && !mutation.isError && <span />}

              <button
                type="submit"
                disabled={mutation.isPending}
                className="flex items-center gap-2 bg-[#2C1810] hover:bg-[#C49A3C] text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                {mutation.isPending ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Pricing;
