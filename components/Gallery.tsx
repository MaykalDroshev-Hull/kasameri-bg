'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import DomeGallery from './DomeGallery';

const Gallery = () => {
  const { t } = useLanguage();
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Make images visible immediately on mount to prevent white space
    setMounted(true);
  }, []);

  useEffect(() => {
    // Intersection Observer for entrance animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const imageElements = document.querySelectorAll('.gallery-image');
    imageElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      imageElements.forEach((el) => {
        observerRef.current?.unobserve(el);
      });
    };
  }, [mounted]);
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#FFF7ED] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-[#C4312E] fill-current" size={36} />
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18]">{t('gallery.title')}</h2>
            <Heart className="text-[#C4312E] fill-current" size={36} />
          </div>
          <p className="text-[#6B4423] text-lg">{t('gallery.subtitle')}</p>
        </div>

        {/* Dome Gallery */}
        <div style={{ width: '100%', height: '80vh', minHeight: '600px' }}>
          <DomeGallery 
            overlayBlurColor="#FFF7ED"
            imageBorderRadius="20px"
            openedImageBorderRadius="20px"
            grayscale={false}
          />
        </div>
      </div>
    </section>
  );
};

export default Gallery;


