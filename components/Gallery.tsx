'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import RowGallery from './RowGallery';

// Gallery images - optimized for row-based gallery
const GALLERY_IMAGES = [
  '/images/Compressed/2277eea7-a75b-412b-b94d-a20a68b9fefc.avif',
  '/images/Compressed/2cac514c-ec21-45f3-8754-157b9e345811.avif',
  '/images/Compressed/att.3epNKmnBDk8GVSf-QL2DxUu3-BW2H7kJnpnxqIdg6i4.avif',
  '/images/Compressed/att.3SNb6F9f4c09VFiP76TuZQWzFkZgpIBIz3q1EbJHvUk.avif',
  '/images/Compressed/att.kIMYYorSGws9Qg1px-YO6TE1VBVL7QgnwBByJDoji08.avif',
  '/images/Compressed/att.Zw_KnCYzdSEQlM2SJy0AN7sQF04RBuW9lt39h7y3w64.avif',
  '/images/Compressed/IMG_0651.avif',
  '/images/Compressed/IMG_1099.avif',
  '/images/Compressed/IMG_1874.avif',
  '/images/Compressed/IMG_2362.avif',
  '/images/Compressed/IMG_3398.avif',
  '/images/Compressed/IMG_4201.avif',
  '/images/Compressed/IMG_4443.avif',
  '/images/Compressed/IMG_4465.avif',
  '/images/Compressed/IMG_4466.avif',
  '/images/Compressed/IMG_4505.avif',
  '/images/Compressed/IMG_4528.avif',
  '/images/Compressed/IMG_4607.avif',
  '/images/Compressed/IMG_4825.avif',
  '/images/Compressed/IMG_4827.avif',
  '/images/Compressed/IMG_4888.avif',
  '/images/Compressed/IMG_4911.avif',
  '/images/Compressed/IMG_4954.avif',
  '/images/Compressed/IMG_4963.avif',
  '/images/Compressed/IMG_5034.avif',
  '/images/Compressed/IMG_5039.avif',
  '/images/Compressed/IMG_5043.avif',
  '/images/Compressed/IMG_5218.avif',
  '/images/Compressed/IMG_5232.avif',
  '/images/Compressed/IMG_5287.avif',
  '/images/Compressed/IMG_5299.avif',
  '/images/Compressed/IMG_5304.avif',
  '/images/Compressed/IMG_5411.avif',
  '/images/Compressed/IMG_5538.avif',
  '/images/Compressed/IMG_9879.avif',
  '/images/Compressed/IMG_9894.avif'
];

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#FFF7ED] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-[#C4312E] fill-current" size={36} />
            <h2 className="font-serif text-4xl md:text-5xl text-[#7A0B18]">{t('gallery.title')}</h2>
            <Heart className="text-[#C4312E] fill-current" size={36} />
          </div>
          <p className="text-[#6B4423] text-lg">{t('gallery.subtitle')}</p>
        </div>

        {/* Row Gallery - Lightweight and Efficient */}
        <RowGallery 
          images={GALLERY_IMAGES}
          imagesPerRow={5}
          mobileImagesPerRow={4}
        />
      </div>
    </section>
  );
};

export default Gallery;


