import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus, Trash2, Image, Upload } from 'lucide-react';
import { fetchGallery, addGalleryItem, deleteGalleryItem } from '../../api/adminApi';

const GalleryCard = ({ item, onDelete, isDeleting }) => (
  <div className="bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
    <div className="relative aspect-video overflow-hidden bg-[#FAF8F4]">
      <img
        src={`${item.imageURL}`}
        alt={item.title}
        crossOrigin="anonymous"

        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
      <button
        onClick={() => onDelete(item._id)}
        disabled={isDeleting}
        className="absolute cursor-pointer top-2 left-2 p-1.5 bg-white/90 hover:bg-red-50 text-red-500 rounded-lg shadow transition opacity-0 group-hover:opacity-100"
        title="حذف"
      >
        {isDeleting ? <Loader2 size={14} className="animate-spin " /> : <Trash2 size={14} />}
      </button>
    </div>
    <div className="p-4">
      <p className="font-semibold text-[#2C1810] text-sm truncate">{item.title}</p>
      {item.description && (
        <p className="text-xs text-[#7A6455] mt-1 line-clamp-2">{item.description}</p>
      )}
    </div>
  </div>
);

const Gallery = () => {
  const queryClient = useQueryClient();
  const fileRef = useRef(null);
  const [form, setForm] = useState({ title: '', description: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
    retry: 1,
  });

  const addMutation = useMutation({
    mutationFn: addGalleryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      setForm({ title: '', description: '' , titleAR: '', descriptionAR: ''});
      setFile(null);
      setPreview(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGalleryItem,
    onMutate: (id) => setDeletingId(id),
    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !form.title.trim()) return;
    const fd = new FormData();
    fd.append('image', file);
    fd.append('title', form.title);
    fd.append('titleAR', form.title);
    fd.append('description', form.description);
    fd.append('descriptionAR', form.description);
    addMutation.mutate(fd);
  };

  const gallery = data?.data ?? [];

  return (
    <div dir="rtl" className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2C1810]">إدارة المعرض</h1>
        <p className="text-sm text-[#7A6455] mt-1">رفع وحذف صور المركز</p>
      </div>

      {/* نموذج الرفع */}
      <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm overflow-hidden">
        <div className="border-b border-[#E8E0D5] px-6 py-4 flex items-center gap-2">
          <Upload size={16} className="text-[#C49A3C]" />
          <h2 className="font-semibold text-[#2C1810]">إضافة صورة جديدة</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* منطقة الرفع */}
            <div
              className="flex-shrink-0 w-40 h-28 border-2 border-dashed border-[#E8E0D5] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#C49A3C] transition overflow-hidden bg-[#FAF8F4]"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Image size={24} className="text-[#7A6455]" />
                  <span className="text-xs text-[#7A6455] mt-1">اضغط لاختيار صورة</span>
                  <span className="text-xs text-[#7A6455]/60">JPG / PNG • 5MB</span>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* الحقول */}
            <div className="flex-1  min-w-[200px] space-y-3">
              <input
                type="text"
                placeholder="عنوان الصورة *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
              />
              <input
                type="text"
                placeholder="عنوان الصورة بلغة العربيه*"
                value={form.titleAR}
                onChange={(e) => setForm({ ...form, titleAR: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
              />
              <textarea
                placeholder="وصف الصورة"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
              />
              <textarea
                placeholder="وصف الصورة بلغة العربيه"
                value={form.descriptionAR}
                onChange={(e) => setForm({ ...form, descriptionAR: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4] text-[#2C1810] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#C49A3C]/40 focus:border-[#C49A3C] transition"
              />
              <button
                type="submit"
                disabled={addMutation.isPending || !file || !form.title.trim()}
                className="flex items-center gap-2 bg-[#2C1810] hover:bg-[#C49A3C] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                رفع الصورة
              </button>
            </div>
          </div>
          {addMutation.isError && (
            <p className="text-red-500 text-xs">حدث خطأ أثناء الرفع</p>
          )}
          {addMutation.isSuccess && (
            <p className="text-green-600 text-xs">تمت إضافة الصورة بنجاح ✓</p>
          )}
        </form>
      </div>

      {/* شبكة الصور */}
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 size={28} className="animate-spin text-[#C49A3C]" />
        </div>
      ) : isError ? (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5 text-center text-sm">
          تعذّر تحميل المعرض. يرجى التحقق من الاتصال بالخادم.
        </div>
      ) : gallery.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8E0D5] p-10 text-center text-[#7A6455]">
          المعرض فارغ حتى الآن
        </div>
      ) : (
        <>
          <p className="text-xs text-[#7A6455]">{gallery.length} صورة</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <GalleryCard
                key={item._id}
                item={item}
                onDelete={(id) => deleteMutation.mutate(id)}
                isDeleting={deletingId === item._id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;
