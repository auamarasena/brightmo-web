import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import SubCategoryCard from '../components/SubCategoryCard';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import type { ProductWithImages } from '../types';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { getCategoryById, getSubCategoriesByCategory, getProductsByCategory } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<ProductWithImages | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  const category = getCategoryById(categoryId || '');
  const subCategories = getSubCategoriesByCategory(categoryId || '');
  const products = getProductsByCategory(categoryId || '');

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 pt-28 pb-16">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
          <h1 className="font-cinzel text-3xl font-bold text-neutral-900 mb-3">Collection Not Found</h1>
          <p className="font-body text-neutral-500 mb-6 text-sm">The category you requested could not be located in our active catalog.</p>
          <Link to="/categories" className="inline-block bg-royal-900 text-white px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:bg-royal-800 shadow-md">
            Browse All Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Category Hero Banner */}
      <section className="relative pt-16 sm:pt-24 md:pt-28">
        <div className="relative h-[32vh] min-h-[220px] sm:h-[40vh] sm:min-h-[300px] overflow-hidden bg-royal-950">
          <img
            src={category.imageUrl}
            alt={category.categoryName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-950/95 via-royal-950/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-body text-gold-300/80 mb-2 sm:mb-3 uppercase tracking-wider overflow-x-auto whitespace-nowrap pb-1">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/categories" className="hover:text-white transition-colors">Collections</Link>
                <span>/</span>
                <span className="text-white font-semibold truncate">{category.categoryName}</span>
              </nav>

              <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                {category.categoryName}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories (Shop by Type) */}
      {subCategories.length > 0 && (
        <section className="py-8 sm:py-14 bg-white border-b border-neutral-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 sm:mb-8">
              <span className="text-[11px] sm:text-xs font-body font-bold text-gold-600 tracking-[0.2em] uppercase">
                Classification
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-1">
                Shop by Style & Type
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {subCategories.map((sub, idx) => (
                <SubCategoryCard
                  key={sub.subCategoryId}
                  subCategory={sub}
                  categoryId={categoryId!}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products in Category */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-10 gap-3">
            <div>
              <span className="text-[11px] sm:text-xs font-body font-bold text-royal-600 tracking-[0.2em] uppercase">
                Catalog Pieces
              </span>
              <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 mt-1">
                {category.categoryName} Masterpieces
              </h2>
            </div>
            <span className="self-start sm:self-auto text-xs font-body font-semibold text-neutral-500 bg-white px-3 py-1.5 rounded-lg border border-neutral-200 shadow-sm">
              {products.length} {products.length === 1 ? 'Design' : 'Designs'}
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-7">
              {products.map((product, idx) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  index={idx}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-neutral-200 p-8 max-w-md mx-auto">
              <p className="font-body text-neutral-500 text-sm">
                No active products found in this category yet. Please check back soon or inquire via WhatsApp for custom designs.
              </p>
            </div>
          )}
        </div>
      </section>

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
