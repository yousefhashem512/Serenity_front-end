import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginAdmin } from '../../api/adminApi';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      login(data.token);
      navigate('/dashboard/analytics', { replace: true });
    },
    onError: () => {
      setError('البريد الإلكتروني أو كلمة المرور خاطئة');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    mutation.mutate(form);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAF8F4] flex items-center justify-center px-4"
    >
      {/* خلفية زخرفية */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C49A3C]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#7A6455]/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* شعار / عنوان */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2C1810] mb-4 shadow-lg">
            <span className="text-[#C49A3C] text-2xl font-bold font-[Amiri]">S</span>
          </div>
          <h1 className="text-3xl font-bold text-[#2C1810] font-[Cairo]">Serenity</h1>
          <p className="text-[#7A6455] mt-1 text-sm">لوحة تحكم الإدارة</p>
        </div>

        {/* البطاقة */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#E8E0D5] p-8">
          <h2 className="text-xl font-semibold text-[#2C1810] mb-6 text-center">تسجيل الدخول</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* البريد الإلكتروني */}
            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@serenity.com"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] placeholder-[#7A6455]/50 focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition text-right"
                dir="ltr"
              />
            </div>

            {/* كلمة المرور */}
            <div>
              <label className="block text-sm font-medium text-[#2C1810] mb-1.5">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] placeholder-[#7A6455]/50 focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition pr-12"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A6455] hover:text-[#C49A3C] transition"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* رسالة الخطأ */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 text-center">
                {error}
              </div>
            )}

            {/* زر الدخول */}
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-[#2C1810] hover:bg-[#C49A3C] text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <LogIn size={18} />
              )}
              {mutation.isPending ? 'جارٍ الدخول...' : 'دخول'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
