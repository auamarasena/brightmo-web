import { useParams, Link } from 'react-router-dom';
import { useStore, getImagesForColor } from '../store/useStore';
import ImageGallery from '../components/ImageGallery';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import ColorPicker from '../components/ColorPicker';
import type { ProductWithImages } from '../types';
import { useEffect, useState, useMemo } from 'react';

import { getSavedProductColor, saveProductColor } from '../utils/storage';

export default function ProductPage() {
  const { businessCode } = useParams<{ businessCode: string }>();
  const { getProductByCode, getProductsByCategory } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<ProductWithImages | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [businessCode]);

  const product = getProductByCode(businessCode || '');

  useEffect(() => {
    if (product?.colors && product.colors.length > 0) {
      const cachedColor = getSavedProductColor(product.productId);
      const matchedCached = cachedColor
        ? product.colors.find((c) => c.name.toLowerCase() === cachedColor.toLowerCase())
        : null;

      if (matchedCached) {
        setSelectedColor(matchedCached.name);
      } else {
        setSelectedColor(product.colors[0].name);
      }
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 pt-28 pb-16">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
          <div className="w-16 h-16 rounded-full bg-royal-50 text-royal-700 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="font-cinzel text-2xl font-bold text-neutral-900 mb-2">Item Not Found</h1>
          <p className="font-body text-neutral-500 mb-6 text-sm">This piece is currently unavailable or the catalog code may have updated.</p>
          <Link to="/categories" className="inline-block bg-royal-900 text-white px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:bg-royal-800 shadow-md">
            Browse All Collections
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.inStock === false;
  const isMasterpiece = product.isMasterpiece === true;

  // Active color defaults immediately to the first available color variant
  const activeColor = selectedColor || product.colors?.[0]?.name || '';

  // Filter images by selected color — guaranteed to return ONLY this color's images
  const visibleImages = useMemo(
    () => getImagesForColor(product.images, activeColor),
    [product.images, activeColor]
  );

  // Get related products (same category, exclude current)
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter((p) => p.productId !== product.productId)
    .slice(0, 3);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="bg-neutral-50">
      {/* Breadcrumb Navigation */}
      <div className="pt-16 sm:pt-24 md:pt-28 pb-3 sm:pb-4 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-body text-neutral-500 overflow-x-auto whitespace-nowrap pb-1">
            <Link to="/" className="hover:text-royal-700 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories" className="hover:text-royal-700 transition-colors">Collections</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link to={`/category/${product.categoryId}`} className="hover:text-royal-700 transition-colors truncate max-w-[120px] sm:max-w-none">
                  {product.category.categoryName}
                </Link>
              </>
            )}
            {product.subCategory && (
              <>
                <span>/</span>
                <Link to={`/category/${product.categoryId}/${product.subCategoryId}`} className="hover:text-royal-700 transition-colors truncate max-w-[120px] sm:max-w-none">
                  {product.subCategory.subCategoryName}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-royal-950 font-semibold truncate max-w-[150px] sm:max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase */}
      <section className="py-6 sm:py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-start">
            {/* Left Column: Image Gallery (6 cols) */}
            <div className="lg:col-span-7 bg-white p-3 sm:p-6 rounded-2xl border border-neutral-200/80 shadow-sm relative">
              {isMasterpiece && (
                <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 bg-gradient-to-r from-gold-500 to-gold-600 text-royal-950 font-cinzel text-[10px] sm:text-xs font-extrabold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-xl tracking-wider uppercase flex items-center gap-1.5">
                  <span>★</span>
                  <span>Masterpiece</span>
                </div>
              )}
              <ImageGallery images={visibleImages} productName={product.name} />
            </div>

            {/* Right Column: Specifications & Inquiries (5 cols) */}
            <div className="lg:col-span-5 bg-white p-4 sm:p-6 md:p-8 rounded-2xl border border-neutral-200/80 shadow-sm space-y-4 sm:space-y-6">
              {/* SKU & Stock Badges */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-block bg-royal-950 text-gold-300 text-[11px] sm:text-xs font-body font-semibold tracking-wider px-2.5 py-1 sm:px-3 rounded-md border border-gold-500/30 uppercase">
                  SKU: {product.businessCode}
                </span>

                {isOutOfStock ? (
                  <span className="text-[11px] sm:text-xs font-body font-bold text-amber-800 bg-amber-50 px-2.5 py-1 sm:px-3 rounded-md border border-amber-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500" />
                    Currently Out of Stock
                  </span>
                ) : (
                  <span className="text-[11px] sm:text-xs font-body font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock
                  </span>
                )}
              </div>

              {/* Title */}
              <div>
                <h1 className="font-cinzel text-xl sm:text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
                  {product.name}
                </h1>
                <div className="mt-2 sm:mt-3 flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="font-body text-2xl sm:text-3xl font-extrabold text-royal-900">
                    {formattedPrice}
                  </span>
                  <span className="text-[11px] sm:text-xs font-body text-neutral-400">
                    Delivery Rates Calculated at Checkout
                  </span>
                </div>
              </div>

              {/* Color Swatch Picker */}
              {product.colors && product.colors.length > 0 && (
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                  <ColorPicker
                    colors={product.colors}
                    selectedColor={activeColor}
                    onSelectColor={handleSelectColor}
                  />
                </div>
              )}

              <div className="border-t border-neutral-200" />

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-cinzel text-sm font-bold tracking-wider text-royal-900 uppercase mb-2">
                    Design Synopsis
                  </h3>
                  <p className="font-body text-neutral-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Specifications Box */}
              <div>
                <h3 className="font-cinzel text-sm font-bold tracking-wider text-royal-900 uppercase mb-3">
                  Architectural Specifications
                </h3>
                <div className="bg-neutral-50 rounded-xl divide-y divide-neutral-200 border border-neutral-200/80 text-xs font-body">
                  {product.dimensions && (
                    <div className="flex items-center justify-between p-3.5">
                      <span className="text-neutral-500 font-medium">Dimensions</span>
                      <span className="font-semibold text-neutral-900">{product.dimensions}</span>
                    </div>
                  )}
                  {product.warranty && (
                    <div className="flex items-center justify-between p-3.5">
                      <span className="text-neutral-500 font-medium">Warranty</span>
                      <span className="font-semibold text-neutral-900">{product.warranty}</span>
                    </div>
                  )}
                  {product.category && (
                    <div className="flex items-center justify-between p-3.5">
                      <span className="text-neutral-500 font-medium">Collection Category</span>
                      <span className="font-semibold text-neutral-900">{product.category.categoryName}</span>
                    </div>
                  )}
                  {product.subCategory && (
                    <div className="flex items-center justify-between p-3.5">
                      <span className="text-neutral-500 font-medium">Classification</span>
                      <span className="font-semibold text-neutral-900">{product.subCategory.subCategoryName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* WhatsApp Inquiry CTA */}
              <div className="space-y-3 pt-2">
                <WhatsAppButton
                  productName={product.name}
                  businessCode={product.businessCode}
                  selectedColor={activeColor}
                  inStock={!isOutOfStock}
                  className="w-full"
                />
                <p className="text-[11px] font-body text-neutral-400 text-center">
                  {isOutOfStock
                    ? 'Inquire to pre-order or receive an estimated restock timeline.'
                    : 'Direct connection with our design concierge • Inquire about custom dimensions or finishes.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-10 sm:py-16 bg-white border-t border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-10 gap-3">
              <div>
                <span className="text-gold-600 text-[11px] sm:text-xs font-body font-bold tracking-[0.2em] uppercase">
                  Harmonious Pairings
                </span>
                <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-1 sm:mt-2">
                  Complete the Ensemble
                </h2>
              </div>
              <Link to={`/category/${product.categoryId}`} className="text-xs font-body font-bold text-royal-700 hover:text-gold-600 transition-colors">
                View Entire Room Collection &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
              {relatedProducts.map((rp, idx) => (
                <ProductCard
                  key={rp.productId}
                  product={rp}
                  index={idx}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
