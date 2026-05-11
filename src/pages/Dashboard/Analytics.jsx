import { useQuery } from '@tanstack/react-query';
import {
  Users, UserCheck, UserX, Banknote,
  TrendingUp, Calendar, Activity, Loader2
} from 'lucide-react';
import { fetchAnalytics, fetchPrices } from '../../api/adminApi';

const StatCard = ({ icon: Icon, label, value, sub, accent }) => (
  <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div
      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
      style={{ backgroundColor: `${accent}18` }}
    >
      <Icon size={22} style={{ color: accent }} />
    </div>
    <div className="min-w-0">
      <p className="text-sm text-[#7A6455] font-medium">{label}</p>
      <p className="text-2xl font-bold text-[#2C1810] mt-0.5">{value}</p>
      {sub && <p className="text-xs text-[#7A6455] mt-1">{sub}</p>}
    </div>
  </div>
);

const GenderBar = ({ male, female, total }) => {
  if (!total) return null;
  const malePct = Math.round((male / total) * 100);
  const femalePct = 100 - malePct;
  return (
    <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 shadow-sm">
      <h3 className="text-base font-semibold text-[#2C1810] mb-4">توزيع الحجوزات حسب الجنس</h3>
      <div className="flex rounded-full overflow-hidden h-5 mb-3">
        <div
          className="transition-all duration-700"
          style={{ width: `${malePct}%`, backgroundColor: '#2C1810' }}
        />
        <div
          className="transition-all duration-700"
          style={{ width: `${femalePct}%`, backgroundColor: '#C49A3C' }}
        />
      </div>
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#2C1810] inline-block" />
          <span className="text-[#7A6455]">ذكور</span>
          <span className="font-bold text-[#2C1810]">{male} ({malePct}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#C49A3C] inline-block" />
          <span className="text-[#7A6455]">إناث</span>
          <span className="font-bold text-[#2C1810]">{female} ({femalePct}%)</span>
        </div>
      </div>
    </div>
  );
};

const PricingCard = ({ prices }) => (
  <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 shadow-sm">
    <h3 className="text-base font-semibold text-[#2C1810] mb-4 flex items-center gap-2">
      <Banknote size={18} className="text-[#C49A3C]" />
      الأسعار الحالية
    </h3>
    <div className="space-y-3">
      {[
        { label: 'جلسة حجامة', value: prices?.hijamaPrice },
        { label: 'جلسة ريكفري', value: prices?.recoveryPrice },
        { label: 'جلسة مساج وجه', value: prices?.facialMassagePrice },
        { label: 'جلسة مساج رياضي', value: prices?.sportsMassagePrice },
        { label: 'جلسه VIp مع كابتن يوسف', value: prices?.vipSeccionPrice },
      ].map((item) => (
        <div key={item.label} className="flex justify-between items-center py-2 border-b border-[#E8E0D5] last:border-0">
          <span className="text-sm text-[#7A6455]">{item.label}</span>
          <span className="font-bold text-[#2C1810]">
            {item.value !== undefined ? `${item.value} ج.م` : '—'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const Analytics = () => {
  const {
    data: analyticsData,
    isLoading: loadingAnalytics,
    isError: errAnalytics,
  } = useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
    retry: 1,
  });

  const {
    data: pricesData,
    isLoading: loadingPrices,
  } = useQuery({
    queryKey: ['prices'],
    queryFn: fetchPrices,
    retry: 1,
  });

  const analytics = analyticsData?.data;
  const prices = pricesData?.data;

  if (loadingAnalytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-[#C49A3C]" />
      </div>
    );
  }

  if (errAnalytics) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6 text-center">
        تعذّر تحميل الإحصائيات. يرجى التحقق من الاتصال بالخادم.
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2C1810]">لوحة الإحصائيات</h1>
        <p className="text-sm text-[#7A6455] mt-1">نظرة عامة على أداء المركز</p>
      </div>

      {/* بطاقات الإحصاء */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          icon={Calendar}
          label="إجمالي الحجوزات"
          value={analytics?.totalBookings ?? '—'}
          sub="حجز مُسجَّل"
          accent="#2C1810"
        />
        <StatCard
          icon={Users}
          label="حجوزات الذكور"
          value={analytics?.maleBookings ?? '—'}
          sub="جلسات مسائية"
          accent="#2C1810"
        />
        <StatCard
          icon={UserCheck}
          label="حجوزات الإناث"
          value={analytics?.femaleBookings ?? '—'}
          sub="جلسات صباحية"
          accent="#C49A3C"
        />

      </div>

      {/* صف ثانٍ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {analytics && (
          <GenderBar
            male={analytics.maleBookings}
            female={analytics.femaleBookings}
            total={analytics.totalBookings}
          />
        )}
        {!loadingPrices && prices && <PricingCard prices={prices} />}
      </div>

      {/* بطاقة معلومات */}
      <div className="bg-[#2C1810]/5 border border-[#2C1810]/10 rounded-2xl p-5 flex gap-3 items-start">
        <Activity size={20} className="text-[#C49A3C] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-[#2C1810]">معلومة</p>
          <p className="text-xs text-[#7A6455] mt-1">
            يتم تحديث الإحصائيات في الوقت الفعلي من قاعدة البيانات. الإيرادات تعكس العربون المحصّل فقط وليس المبلغ الكامل.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
