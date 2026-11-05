import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import type { ProductWithImages } from "../types";
import WhatsAppButton from "./WhatsAppButton";
import ColorPicker from "./ColorPicker";
import { getImagesForColor } from "../store/useStore";
import { getSavedProductColor, saveProductColor } from "../utils/storage";

interface QuickViewModalProps {
  product: ProductWithImages | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    setSelectedImgIndex(0);
    if (product?.colors && product.colors.length > 0) {
      const cachedColor = getSavedProductColor(product.productId);
      const matchedCached = cachedColor
        ? product.colors.find((c) => c.name.toLowerCase() === cachedColor.toLowerCase())
        : null;
      setSelectedColor(matchedCached ? matchedCached.name : product.colors[0].name);
    } else {
      setSelectedColor('');
    }
  }, [product?.productId]);

  const handleSelectColor = (colorName: string) => {
    setSelectedColor(colorName);
    if (product?.productId) {
      saveProductColor(product.productId, colorName);
    }
  };

  // Reset image index when color switches so first image of new color is shown
  useEffect(() => {
    setSelectedImgIndex(0);
  }, [selectedColor]);

  useEffect(() => {
    if (!product) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product || typeof document === "undefined") return null;

  const activeColor = selectedColor || product.colors?.[0]?.name || '';
  const images = getImagesForColor(product.images || [], activeColor);
  const mainImage = images[selectedImgIndex]?.imageUrl || product.images?.[0]?.imageUrl || "";
  const isOutOfStock = product.inStock === false;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const currentSrc = target.src;
    const match = currentSrc.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/i);
    if (match && match[1]) {
      target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return createPortal(
    <div
      className="fixed inset-0 z-[99990] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-royal-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row border border-neutral-200 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-royal-950 hover:text-white border border-neutral-200 text-neutral-700 flex items-center justify-center transition-all duration-200 shadow-md active:scale-95"
          title="Close (Esc)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Column: Visual Showcase */}
        <div className="w-full md:w-1/2 bg-neutral-100/70 p-3 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200 flex-shrink-0">
          <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-inner group flex items-center justify-center p-2.5 sm:p-3 border border-neutral-200/60">
            {mainImage ? (
              <img
                key={mainImage}
                src={mainImage}
                alt={product.name}
                onError={handleImageError}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-102 animate-fade-in"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs sm:text-sm">
                No Image
              </div>
            )}
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-royal-950/80 backdrop-blur-md text-white text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md font-body font-medium border border-white/10">
              SKU: {product.businessCode}
            </div>
            {isOutOfStock && (
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-neutral-900/90 text-amber-300 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-amber-400/30">
                Out of Stock
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-2.5 sm:mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={img.imageId || idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-11 h-11 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 bg-white p-0.5 sm:p-1 ${
                    idx === selectedImgIndex
                      ? "border-gold-500 scale-105 shadow-md ring-2 ring-gold-500/20"
                      : "border-neutral-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.imageUrl} alt="" onError={handleImageError} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[85vh] flex flex-col justify-between">
          <div>
            {/* Category / SubCategory tags */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
              {product.category && (
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-royal-600 bg-royal-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-royal-100">
                  {product.category.categoryName}
                </span>
              )}
              {product.subCategory && (
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-gold-700 bg-gold-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-gold-200/60">
                  {product.subCategory.subCategoryName}
                </span>
              )}
            </div>

            {/* Title & Price */}
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mb-1.5 sm:mb-2 leading-tight">
              {product.name}
            </h2>
            <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-5 flex-wrap">
              <span className="font-body text-2xl sm:text-3xl font-extrabold text-royal-700">
                {formattedPrice}
              </span>
              {isOutOfStock ? (
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-300">
                  Currently Out of Stock
                </span>
              ) : (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  In Stock & Handcrafted
                </span>
              )}
            </div>

            {/* Color Swatch Picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80">
                <ColorPicker
                  colors={product.colors}
                  selectedColor={activeColor}
                  onSelectColor={handleSelectColor}
                />
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="font-body text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3">
                {product.description}
              </p>
            )}

            {/* Specifications summary */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200/80 mb-6 space-y-2.5 text-xs font-body">
              {product.dimensions && (
                <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                  <span className="text-neutral-500">Dimensions:</span>
                  <span className="font-semibold text-neutral-800">{product.dimensions}</span>
                </div>
              )}
              {product.warranty && (
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Warranty:</span>
                  <span className="font-semibold text-neutral-800">{product.warranty}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <WhatsAppButton
              productName={product.name}
              businessCode={product.businessCode}
              selectedColor={selectedColor}
              inStock={!isOutOfStock}
            />
            <Link
              to={`/product/${product.businessCode}`}
              onClick={onClose}
              className="block w-full text-center py-3 rounded-lg border-2 border-royal-700 text-royal-700 hover:bg-royal-700 hover:text-white font-body text-sm font-semibold transition-all duration-200"
            >
              View Complete Specifications & Gallery &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
