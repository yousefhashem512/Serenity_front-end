import { useState, useEffect } from 'react';
import Image1 from '../assets/image/Sec2Img1.png';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';
import Button from './ui/button';
import api from '../api/axios';

const Gallery = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get('/public/gallery');
        setGalleryItems(response.data.data || []);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // إخفاء القسم إذا كانت البيانات فارغة
  if (!loading && (!galleryItems || galleryItems.length === 0)) {
    return null;
  }


  const GoTOHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
      // make the first input in the hero section focused after scrolling
      const firstInput = heroSection.querySelector('input');
      if (firstInput) {
        setTimeout(() => {
          firstInput.focus();
        }, 500); // تأخير بسيط لضمان أن التمرير قد اكتمل
      }
    }
  };


  return (
    <section id="gallery" className="bg-[#FAF8F4] py-16 xl:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 xl:mb-16">
          <h2 className="mt-4 text-3xl font-bold text-spa-gold sm:text-4xl">
            {isRtl
              ? 'لحظات من تجربة سيرينتي'
              : 'Moments from the Serenity Experience'}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-spa-brown-text text-base sm:text-lg font-bold leading-relaxed text-center">
            {isRtl
              ? 'اكتشف نتائج وتجارب عملائنا الذين اختاروا الراحة والتوازن معنا.'
              : 'Discover the results and experiences of our clients who chose comfort and balance with us.'}

            <span className={`inline-flex items-center align-middle ${isRtl ? 'mr-2' : 'ml-2'}`}>
              <Sparkles className="text-spa-gold w-5 h-5" />
            </span>
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spa-gold"></div>
          </div>
        ) : (
          <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${isRtl ? 'text-right' : 'text-left'}`}>
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="group overflow-hidden p-2 rounded-[1rem] bg-white shadow-[0_20px_50px_rgba(54,41,27,0.08)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-[1rem]">
                  <img
                    src={item.imageURL || Image1}
                    crossOrigin="anonymous"
                    alt={isRtl ? item.titleAR : item.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-spa-brown-dark mb-3">
                    {isRtl ? item.titleAR : item.title}
                  </h3>
                  <p className="text-spa-brown-text text-sm leading-7 mb-4">
                    {isRtl ? item.descriptionAR : item.description}
                  </p>
                  <Button variant="text" onClick={GoTOHero} className="mt-3 px-[0px] " size="sm">
                    {isRtl ? 'احجز جلستك الآن' : 'Book your session now'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section >
  );
};

export default Gallery;
