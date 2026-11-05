import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import type { ProductWithImages } from '../types';
import watermarkEagle from '../assets/watermark eagl2.png';

export default function HomePage() {
  const { categories, getFeaturedProducts, getMasterpiece, isLoading } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<ProductWithImages | null>(null);

  // Get featured products (first 6) & masterpiece of the month
  const featuredProducts = getFeaturedProducts(6);
  const masterpieceProduct = getMasterpiece() || featuredProducts[0];

  if (isLoading) return null;

  return (
    <div className="bg-neutral-50">
      {/* ── Modern Luxury Hero Section ── */}
      <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center overflow-hidden bg-royal-950 pt-20 sm:pt-32 lg:pt-36 pb-12 sm:pb-20">
        {/* Ambient Glowing Lighting & Radial Vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-royal-600/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[240px] sm:w-[450px] h-[240px] sm:h-[450px] bg-gold-500/10 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none" />

        {/* Regal Watermark Eagle Emblem in Hero Background */}
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-[0.06] select-none hidden lg:block">
          <img src={watermarkEagle} alt="" className="w-full h-full object-contain filter invert" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Narrative */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-8">
              {/* Luxury Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-royal-900/80 border border-gold-500/40 backdrop-blur-md shadow-lg shadow-gold-500/5 animate-fade-in">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gold-400 animate-pulse" />
                <span className="text-gold-300 text-[11px] sm:text-xs font-body font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                  Brightmo Atelier • Handcrafted Living
                </span>
              </div>

              {/* Title */}
              <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] sm:leading-[1.05] tracking-tight animate-slide-up">
                CRAFTED FOR <br />
                <span className="text-gold-gradient italic font-display font-medium">
                  Generations
                </span>
              </h1>

              {/* Subtitle */}
              <p className="font-body text-sm sm:text-base lg:text-lg text-neutral-300 max-w-xl leading-relaxed animate-slide-up opacity-0 [animation-delay:150ms]">
                Transform your everyday living into an inspiring sanctuary. Every Brightmo piece is sculpted with solid hardwoods, hand-finished metals, and architectural grace.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 animate-slide-up opacity-0 [animation-delay:250ms]">
                <Link
                  to="/categories"
                  className="gold-shine-button text-center bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-royal-950 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-body font-bold text-xs sm:text-sm tracking-wide uppercase shadow-xl hover:shadow-gold-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Collections
                </Link>
                <a
                  href="https://wa.me/+94743864343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/20 backdrop-blur-md font-body font-semibold text-xs sm:text-sm transition-all duration-300 hover:border-gold-400/60"
                >
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Custom Commission
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-royal-800/80 animate-slide-up opacity-0 [animation-delay:350ms]">
                <div>
                  <div className="font-cinzel text-lg sm:text-2xl font-bold text-gold-400">100%</div>
                  <div className="text-[11px] sm:text-xs font-body text-neutral-400">Solid Hardwoods</div>
                </div>
                <div>
                  <div className="font-cinzel text-lg sm:text-2xl font-bold text-gold-400">10-YR</div>
                  <div className="text-[11px] sm:text-xs font-body text-neutral-400">Structural Warranty</div>
                </div>
                <div>
                  <div className="font-cinzel text-lg sm:text-2xl font-bold text-gold-400">Custom</div>
                  <div className="text-[11px] sm:text-xs font-body text-neutral-400">Made to Measure</div>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Furniture Visual Spotlight */}
            <div className="lg:col-span-5 relative animate-fade-in [animation-delay:200ms]">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame with gold glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-gold-500/30 to-royal-500/30 rounded-3xl blur-xl opacity-70" />
                <div className="relative bg-royal-900/90 rounded-2xl p-3.5 sm:p-5 border border-royal-700/80 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden relative group bg-royal-950/40 flex items-center justify-center p-2">
                    <img
                      src={
                        masterpieceProduct?.images?.[0]?.imageUrl ||
                        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200'
                      }
                      alt={masterpieceProduct?.name || "Masterpiece of the Month"}
                      onError={(e) => {
                        const target = e.currentTarget;
                        const match = target.src.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/i);
                        if (match && match[1]) {
                          target.src = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
                        }
                      }}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-950/80 via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-royal-950/80 backdrop-blur-md text-gold-300 border border-gold-500/30 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                      Masterpiece
                    </div>
                    {masterpieceProduct?.inStock === false && (
                      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-neutral-900/90 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  <div className="pt-3.5 sm:pt-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white truncate">
                        {masterpieceProduct?.name || 'Solstice Handcrafted Sofa'}
                      </h3>
                      <p className="font-body text-xs text-neutral-400 truncate">
                        {masterpieceProduct?.colors && masterpieceProduct.colors.length > 0
                          ? `${masterpieceProduct.colors.length} Atelier Finishes Available`
                          : 'Available in Bespoke Finishes & Sizing'}
                      </p>
                    </div>
                    {masterpieceProduct ? (
                      <button
                        onClick={() => setQuickViewProduct(masterpieceProduct)}
                        className="flex-shrink-0 bg-gold-500/10 hover:bg-gold-500 hover:text-royal-950 text-gold-400 border border-gold-500/40 text-xs font-semibold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg transition-all duration-200"
                      >
                        Quick View
                      </button>
                    ) : (
                      <Link
                        to="/categories"
                        className="flex-shrink-0 bg-gold-500 text-royal-950 text-xs font-semibold px-3 py-1.5 sm:py-2 rounded-lg"
                      >
                        Browse
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand Pillars Strip ── */}
      <section className="bg-white border-y border-neutral-200/80 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-royal-50 border border-royal-100 flex items-center justify-center flex-shrink-0 text-royal-700">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-body font-bold text-xs sm:text-sm text-neutral-900 truncate">Artisanal Quality</h4>
                <p className="font-body text-[11px] sm:text-xs text-neutral-500 truncate">Meticulous joinery</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center flex-shrink-0 text-gold-600">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-body font-bold text-xs sm:text-sm text-neutral-900 truncate">10-Yr Warranty</h4>
                <p className="font-body text-[11px] sm:text-xs text-neutral-500 truncate">Built to endure</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-royal-50 border border-royal-100 flex items-center justify-center flex-shrink-0 text-royal-700">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-body font-bold text-xs sm:text-sm text-neutral-900 truncate">Custom Sizing</h4>
                <p className="font-body text-[11px] sm:text-xs text-neutral-500 truncate">Tailored to space</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-body font-bold text-xs sm:text-sm text-neutral-900 truncate">Direct Concierge</h4>
                <p className="font-body text-[11px] sm:text-xs text-neutral-500 truncate">WhatsApp support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Collections / Categories Section ── */}
      {categories.length > 0 && (
        <section className="py-12 sm:py-20 lg:py-28 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
              <span className="text-gold-600 text-[11px] sm:text-xs font-body font-bold tracking-[0.25em] uppercase bg-gold-50 px-3 py-1 rounded-full border border-gold-200">
                Curated Collections
              </span>
              <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mt-3 sm:mt-4 mb-2 sm:mb-4">
                Designed for Distinction
              </h2>
              <p className="font-body text-neutral-600 text-sm sm:text-base md:text-lg">
                Explore signature furniture designed for discerning living rooms, dining suites, executive studies, and restful bedrooms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-7">
              {categories.slice(0, 8).map((category, idx) => (
                <CategoryCard key={category.categoryId} category={category} index={idx} />
              ))}
            </div>

            {categories.length > 8 && (
              <div className="text-center mt-8 sm:mt-12">
                <Link
                  to="/categories"
                  className="inline-flex items-center justify-center gap-2 border-2 border-royal-900 text-royal-900 hover:bg-royal-900 hover:text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-body font-semibold text-xs sm:text-sm transition-all duration-300 w-full sm:w-auto"
                >
                  View All Collections
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Featured Products Section ── */}
      {featuredProducts.length > 0 && (
        <section className="py-12 sm:py-20 lg:py-28 bg-white border-t border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-14 gap-3">
              <div>
                <span className="text-royal-600 text-[11px] sm:text-xs font-body font-bold tracking-[0.25em] uppercase bg-royal-50 px-3 py-1 rounded-full border border-royal-100">
                  Featured Works
                </span>
                <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mt-2 sm:mt-3">
                  Signature Catalog
                </h2>
              </div>
              <Link
                to="/categories"
                className="text-xs sm:text-sm font-body font-bold text-royal-700 hover:text-gold-600 transition-colors flex items-center gap-1.5 sm:gap-2 group"
              >
                <span>View Full Catalog</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
              {featuredProducts.map((product, idx) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  index={idx}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bespoke Consultation CTA Section ── */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-royal-950 text-white overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gold-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-royal-600/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-block text-gold-400 text-xs font-body font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Custom Bespoke Living
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            Need a Custom Dimension or Exclusive Finish?
          </h2>
          <p className="font-body text-neutral-300 text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Our atelier crafts custom sizes, bespoke upholstery, and tailored wood finishes. Connect with our principal artisans for a direct consultation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href="https://wa.me/+94743864343"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-shine-button bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-body font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp Concierge</span>
            </a>
            <Link
              to="/contact"
              className="text-center border border-white/30 hover:border-gold-400 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-body font-semibold text-xs sm:text-sm transition-all duration-300 hover:bg-white/10"
            >
              Contact Our Studio
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quick View Product Popup ── */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
