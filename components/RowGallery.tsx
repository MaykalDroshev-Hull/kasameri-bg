'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';

interface RowGalleryProps {
  images: string[];
  imagesPerRow?: number;
  mobileImagesPerRow?: number;
}

const RowGallery: React.FC<RowGalleryProps> = ({ 
  images, 
  imagesPerRow = 5,
  mobileImagesPerRow = 4
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Split images into 3 rows
  const rowCount = 3;
  const imagesPerRowCount = Math.ceil(images.length / rowCount);
  const rows = Array.from({ length: rowCount }, (_, i) =>
    images.slice(i * imagesPerRowCount, (i + 1) * imagesPerRowCount)
  );

  // Track scroll position for each row
  const [scrollPositions, setScrollPositions] = useState<number[]>(
    Array(rowCount).fill(0)
  );

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentImagesPerRow = isMobile ? mobileImagesPerRow : imagesPerRow;

  const scrollRow = (rowIndex: number, direction: 'left' | 'right') => {
    const container = rowRefs.current[rowIndex];
    if (!container) return;

    const imageWidth = container.querySelector('.gallery-image-wrapper')?.clientWidth || 0;
    const gap = 16; // 1rem gap
    const scrollAmount = imageWidth + gap;

    const newPosition = direction === 'left'
      ? Math.max(0, scrollPositions[rowIndex] - 1)
      : Math.min(rows[rowIndex].length - currentImagesPerRow, scrollPositions[rowIndex] + 1);

    setScrollPositions(prev => {
      const newPositions = [...prev];
      newPositions[rowIndex] = newPosition;
      return newPositions;
    });

    container.scrollTo({
      left: newPosition * scrollAmount,
      behavior: 'smooth'
    });
  };

  const canScrollLeft = (rowIndex: number) => scrollPositions[rowIndex] > 0;
  const canScrollRight = (rowIndex: number) => 
    scrollPositions[rowIndex] < rows[rowIndex].length - currentImagesPerRow;

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  return (
    <div className="w-full space-y-6 md:space-y-8">
      {rows.map((rowImages, rowIndex) => (
        <div key={rowIndex} className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scrollRow(rowIndex, 'left')}
            disabled={!canScrollLeft(rowIndex)}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 ${
              canScrollLeft(rowIndex) 
                ? 'opacity-0 group-hover:opacity-100 hover:scale-110' 
                : 'opacity-0 cursor-not-allowed'
            }`}
            aria-label="Previous images"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#7A0B18]" />
          </button>

          {/* Images Container */}
          <div
            ref={(el) => { rowRefs.current[rowIndex] = el; }}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-4">
              {rowImages.map((imageSrc, imageIndex) => {
                // Calculate if this image should be lazy loaded
                const globalIndex = rowIndex * imagesPerRowCount + imageIndex;
                const shouldLazyLoad = globalIndex >= currentImagesPerRow * rowCount + 5;

                return (
                  <div
                    key={imageIndex}
                    className="gallery-image-wrapper flex-shrink-0 w-[calc(25%-0.75rem)] md:w-[calc(20%-0.8rem)] cursor-pointer group/item"
                    onClick={() => openLightbox(imageSrc)}
                  >
                    <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-[#FFF7ED] shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Image
                        src={imageSrc}
                        alt={`Gallery image ${globalIndex + 1}`}
                        fill
                        quality={85}
                        sizes="(max-width: 768px) 33vw, 20vw"
                        className="object-cover"
                        loading={shouldLazyLoad ? 'lazy' : 'eager'}
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#7A0B18]/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white text-sm font-medium">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollRow(rowIndex, 'right')}
            disabled={!canScrollRight(rowIndex)}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 ${
              canScrollRight(rowIndex) 
                ? 'opacity-0 group-hover:opacity-100 hover:scale-110' 
                : 'opacity-0 cursor-not-allowed'
            }`}
            aria-label="Next images"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#7A0B18]" />
          </button>
        </div>
      ))}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
            aria-label="Close"
          >
            <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </button>
          
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                quality={100}
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RowGallery;

