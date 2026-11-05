import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ProductWithImages } from '../types';
import { getImagesForColor } from '../store/useStore';
import { getSavedProductColor, saveProductColor } from '../utils/storage';

interface ProductCardProps {
  product: ProductWithImages;
  index?: number;
  onQuickView?: (product: ProductWithImages) => void;
}

export default function ProductCard({ product, index = 0, onQuickView }: ProductCardProps) {
  const colors = product.colors || [];
  const [selectedColor, setSelectedColor] = useState<string>(() => {
    const cached = getSavedProductColor(product.productId);
    return cached && colors.some((c) => c.name.toLowerCase() === cached.toLowerCase()) ? cached : '';
  });

  const activeColor =
    selectedColor ||
    (() => {
      const cached = getSavedProductColor(product.productId);
      return cached && colors.some((c) => c.name.toLowerCase() === cached.toLowerCase())
        ? cached
        : colors[0]?.name || '';
    })();

  const handleSelectColor = (colorName: string) => {
    setSelectedColor(colorName);
    saveProductColor(product.productId, colorName);
  };

  const visibleImages = getImagesForColor(product.images || [], activeColor);
  const mainImage = visibleImages[0]?.imageUrl || product.images?.[0]?.imageUrl || '';
  const isOutOfStock = product.inStock === false;
  const isMasterpiece = product.isMasterpiece === true;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const currentSrc = target.src;
    const match = currentSrc.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/i);
    if (match && match[1]) {
      target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-xl overflow-hidden border border-neutral-200/90 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 hover:border-gold-400/60 animate-fade-in opacity-0 [animation-delay:${Math.min(index + 1, 6) * 100}ms] flex flex-col justify-between ${
        isOutOfStock ? 'opacity-90' : ''
      }`}
    >
      {/* Clickable Image & Quick View Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50/90 flex items-center justify-center">
        <Link to={`/product/${product.businessCode}`} className="block w-full h-full flex items-center justify-center p-3">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              onError={handleImageError}
              className={`w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-102 ${
                isOutOfStock ? 'grayscale-[35%] brightness-95' : ''
              }`}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-100">
              <svg className="w-12 h-12 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </Link>

        {/* Masterpiece Badge */}
        {isMasterpiece && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-gold-500 to-gold-600 text-royal-950 font-cinzel text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-lg tracking-wider uppercase flex items-center gap-1 z-10">
            <span>★</span>
            <span>Masterpiece</span>
          </div>
        )}

        {/* SKU Badge (Shifted down if Masterpiece badge exists) */}
        {/* <div
          className={`absolute ${
            isMasterpiece ? 'top-10 left-3' : 'top-3 left-3'
          } bg-royal-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10 shadow-sm pointer-events-none transition-all`}
        >
          <span className="text-[10px] font-body font-semibold text-gold-300 tracking-wider uppercase">
            {product.businessCode}
          </span>
        </div> */}

        {/* Out of Stock Overlay Ribbon */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
            <span className="bg-neutral-900/90 text-amber-300 border border-amber-400/50 text-xs font-body font-bold uppercase tracking-widest px-4 py-1.5 rounded-lg shadow-xl">
              Out of Stock
            </span>
          </div>
        )}

        {/* Image Count Badge */}
        {product.images && product.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-royal-950/80 backdrop-blur-md text-white px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-body border border-white/10 shadow-sm pointer-events-none">
            {/* <svg className="w-3 h-3 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg> */}
            {/* <span>{product.images.length}</span> */}
             {/* SKU Badge (Shifted down if Masterpiece badge exists) */}
            <span className="text-[10px] font-body font-semibold text-gold-300 tracking-wider uppercase">
            {product.businessCode}
          </span>
          </div>
        )}

        {/* Quick View Button: Mobile tap icon + Desktop hover button */}
        {onQuickView && (
          <>
            {/* Mobile quick-view icon button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="sm:hidden absolute bottom-2.5 right-2.5 z-20 bg-white/95 text-royal-950 p-2 rounded-lg shadow-md border border-neutral-200/90 active:bg-royal-950 active:text-white transition-colors"
              aria-label="Quick preview"
              title="Quick Preview"
            >
              <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>

            {/* Desktop hover bar */}
            <div className="hidden sm:flex absolute inset-x-4 bottom-3 items-center justify-center transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 z-20 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="w-full bg-white/95 hover:bg-royal-950 hover:text-white text-royal-950 font-body text-xs font-semibold py-2.5 px-4 rounded-lg shadow-xl backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 border border-neutral-200/80 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Quick Preview
              </button>
            </div>
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category / SubCategory tags */}
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            {product.category && (
              <span className="text-[10px] uppercase tracking-wider font-semibold text-royal-700 bg-royal-50 px-2 py-0.5 rounded border border-royal-100">
                {product.category.categoryName}
              </span>
            )}
            {product.subCategory && (
              <span className="text-[10px] uppercase tracking-wider font-medium text-neutral-500 truncate max-w-[140px]">
                • {product.subCategory.subCategoryName}
              </span>
            )}
          </div>

          <Link to={`/product/${product.businessCode}`}>
            <h3 className="font-display text-base sm:text-lg font-semibold text-neutral-900 group-hover:text-royal-600 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          {/* Color Varieties preview & interactive switcher */}
          {colors.length > 0 && (
            <div className="flex items-center gap-2 my-2 sm:my-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                {colors.slice(0, 5).map((c, i) => {
                  const isActive = activeColor === c.name;
                  return (
                    <button
                      key={i}
                      type="button"
                      title={c.name}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSelectColor(c.name);
                      }}
                      className={`w-5 h-5 sm:w-4 sm:h-4 rounded-full border transition-all duration-200 ${
                        isActive
                          ? 'ring-2 ring-gold-500 scale-110 border-white shadow-md z-10'
                          : 'border-neutral-300 hover:scale-110 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex || '#A0AEC0' }}
                      aria-label={`Show ${c.name} preview`}
                    />
                  );
                })}
              </div>
              <span className="text-[11px] font-body text-neutral-500 font-medium truncate max-w-[120px]">
                {activeColor || `${colors.length} finishes`}
              </span>
            </div>
          )}

          {product.dimensions && (
            <p className="text-xs font-body text-neutral-400 line-clamp-1 mb-2">
              {product.dimensions}
            </p>
          )}
        </div>

        {/* Footer info: Price & Stock/View CTA */}
        <div className="pt-2.5 sm:pt-3 border-t border-neutral-100 flex items-center justify-between mt-2">
          <div>
            <span className="font-body text-base sm:text-xl font-bold text-royal-900">
              {formattedPrice}
            </span>
          </div>

          <Link
            to={`/product/${product.businessCode}`}
            className="text-xs font-body font-semibold text-royal-700 group-hover:text-gold-600 flex items-center gap-1 transition-colors"
          >
            {isOutOfStock ? (
              <span className="text-amber-700 font-medium">Inquire</span>
            ) : (
              <span>Details</span>
            )}
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
