import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { ProductImage } from "../types";

interface ImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ImageGallery({
  images,
  productName,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset to first image whenever the images set changes (e.g. color switch)
  useEffect(() => {
    setSelectedIndex(0);
    setIsZoomed(false);
  }, [images]);

  // Lock scroll & handle keyboard navigation when zoomed
  useEffect(() => {
    if (!isZoomed) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsZoomed(false);
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && images.length > 1) {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed, images.length]);

  if (images.length === 0) {
    return (
      <div className='aspect-[4/3] bg-neutral-100 rounded-lg flex items-center justify-center border border-neutral-200'>
        <svg
          className='w-16 h-16 text-neutral-300'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
      </div>
    );
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const currentSrc = target.src;
    const match = currentSrc.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/i);
    if (match && match[1]) {
      target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
    }
  };

  return (
    <div className='space-y-4'>
      {/* Main Image */}
      <div
        className='group aspect-[4/3] relative overflow-hidden rounded-xl bg-neutral-50/90 cursor-zoom-in border border-neutral-200/90 shadow-sm transition-all duration-300 hover:shadow-xl flex items-center justify-center p-2.5 sm:p-6'
        onClick={() => setIsZoomed(true)}>
        <img
          key={images[selectedIndex]?.imageUrl || `${productName}-${selectedIndex}`}
          src={images[selectedIndex]?.imageUrl || ""}
          alt={`${productName} - View ${selectedIndex + 1}`}
          onError={handleImageError}
          className='w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-102 animate-fade-in'
        />

        {/* Zoom Hint Badge */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-royal-950/75 hover:bg-royal-950/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-body font-medium px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-lg border border-white/10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
          <span>Zoom</span>
        </div>

        {/* Navigation Arrows on Hover / Mobile persistent */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1,
                );
              }}
              className='absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white text-royal-950 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95'
              aria-label='Previous image'>
              <svg
                className='w-4 h-4 sm:w-5 sm:h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1,
                );
              }}
              className='absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white text-royal-950 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95'
              aria-label='Next image'>
              <svg
                className='w-4 h-4 sm:w-5 sm:h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className='absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-royal-950/80 backdrop-blur-md text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-body font-medium border border-white/10'>
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails — displays all images for the current active color variant */}
      {images.length > 1 && (
        <div className='flex gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-1 px-1'>
          {images.map((image, idx) => (
            <button
              key={image.imageId || `${image.imageUrl}-${idx}`}
              onClick={() => setSelectedIndex(idx)}
              className={`relative flex-1 min-w-[70px] aspect-square overflow-hidden rounded-md border-2 transition-all duration-300 bg-white p-1 ${
                idx === selectedIndex
                  ? "border-gold-500 shadow-md ring-2 ring-gold-500/20 scale-[1.02]"
                  : "border-neutral-200 opacity-70 hover:opacity-100 hover:border-royal-300"
              }`}>
              <img
                src={image.imageUrl}
                alt={`${productName} thumbnail ${idx + 1}`}
                onError={handleImageError}
                className='w-full h-full object-contain transition-opacity duration-300'
                loading='lazy'
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox (Rendered via React Portal directly to body to avoid stacking context bugs) */}
      {isZoomed &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className='fixed inset-0 z-[99999] bg-royal-950/95 backdrop-blur-xl flex flex-col items-center justify-between p-3 sm:p-8 animate-fade-in select-none'
            onClick={() => setIsZoomed(false)}>
            {/* Top Bar */}
            <div
              className='w-full max-w-7xl flex items-center justify-between text-white pb-3 sm:pb-4 z-10'
              onClick={(e) => e.stopPropagation()}>
              <div className='flex items-center gap-2 sm:gap-3 min-w-0'>
                <span className='font-display text-sm sm:text-lg font-semibold tracking-wide truncate max-w-[180px] sm:max-w-none'>
                  {productName}
                </span>
                <span className='text-[10px] sm:text-xs font-body font-medium px-2 py-0.5 sm:px-2.5 rounded-full bg-white/10 text-gold-300 border border-gold-500/30 flex-shrink-0'>
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>
              <button
                className='w-9 h-9 sm:w-11 sm:h-11 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 flex-shrink-0 ml-2'
                onClick={() => setIsZoomed(false)}
                title='Close (Esc)'>
                <svg
                  className='w-5 h-5 sm:w-6 sm:h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Main Zoomed Image Container */}
            <div
              className='relative flex-1 w-full flex items-center justify-center max-h-[72vh] sm:max-h-[78vh]'
              onClick={(e) => e.stopPropagation()}>
              <img
                src={images[selectedIndex]?.imageUrl || ""}
                alt={`${productName} - Full size ${selectedIndex + 1}`}
                className='max-w-full max-h-full object-contain rounded-md shadow-2xl transition-all duration-300'
              />

              {/* Prev / Next buttons inside lightbox */}
              {images.length > 1 && (
                <>
                  <button
                    className='absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 bg-royal-950/60 hover:bg-gold-500 hover:text-royal-950 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-95'
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1,
                      )
                    }
                    title='Previous image (Left Arrow)'>
                    <svg
                      className='w-5 h-5 sm:w-6 sm:h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                      />
                    </svg>
                  </button>
                  <button
                    className='absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 bg-royal-950/60 hover:bg-gold-500 hover:text-royal-950 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-95'
                    onClick={() =>
                      setSelectedIndex((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1,
                      )
                    }
                    title='Next image (Right Arrow)'>
                    <svg
                      className='w-5 h-5 sm:w-6 sm:h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {images.length > 1 && (
              <div
                className='flex gap-2 sm:gap-3 p-1.5 sm:p-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 mt-3 sm:mt-4 overflow-x-auto max-w-full'
                onClick={(e) => e.stopPropagation()}>
                {images.map((img, idx) => (
                  <button
                    key={img.imageId || idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-md overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                      idx === selectedIndex
                        ? "border-gold-400 scale-105 shadow-md"
                        : "border-transparent opacity-50 hover:opacity-90"
                    }`}>
                    <img
                      src={img.imageUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
