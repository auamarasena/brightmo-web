import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import type { ProductWithImages } from '../types';
import { useEffect, useState } from 'react';

export default function SubCategoryPage() {
  const { categoryId, subCategoryId } = useParams<{ categoryId: string; subCategoryId: string }>();
  const { getCategoryById, getSubCategoryById, getProductsBySubCategory } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<ProductWithImages | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId, subCategoryId]);

  const category = getCategoryById(categoryId || '');
  const subCategory = getSubCategoryById(subCategoryId || '');
  const products = getProductsBySubCategory(categoryId || '', subCategoryId || '');

  if (!category || !subCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 pt-28 pb-16">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-neutral-200">
          <h1 className="font-cinzel text-3xl font-bold text-neutral-900 mb-3">Style Not Found</h1>
          <p className="font-body text-neutral-500 mb-6 text-sm">The category and subcategory combination could not be found.</p>
          <Link to="/categories" className="inline-block bg-royal-900 text-white px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:bg-royal-800 shadow-md">
            Browse All Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-16 sm:pt-24 md:pt-28">
        <div className="relative h-[30vh] min-h-[200px] sm:h-[36vh] sm:min-h-[260px] overflow-hidden bg-royal-950">
          <img
            src={subCategory.imageUrl}
            alt={subCategory.subCategoryName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-950/95 via-royal-950/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-body text-gold-300/80 mb-2 sm:mb-3 uppercase tracking-wider overflow-x-auto whitespace-nowrap pb-1">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/categories" className="hover:text-white transition-colors">Collections</Link>
                <span>/</span>
                <Link to={`/category/${categoryId}`} className="hover:text-white transition-colors truncate max-w-[120px] sm:max-w-none">
                  {category.categoryName}
                </Link>
                <span>/</span>
                <span className="text-white font-semibold truncate max-w-[140px] sm:max-w-none">{subCategory.subCategoryName}</span>
              </nav>

              <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {subCategory.subCategoryName}
              </h1>
              <p className="font-body text-neutral-300 text-xs sm:text-sm mt-1.5 sm:mt-2">
                {products.length} {products.length === 1 ? 'handcrafted piece' : 'handcrafted pieces'} in {category.categoryName}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200/80 p-8 max-w-md mx-auto shadow-sm">
              <svg className="w-14 h-14 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h2 className="font-cinzel text-2xl font-bold text-neutral-900 mb-2">No Pieces Listed Yet</h2>
              <p className="font-body text-neutral-500 mb-6 text-sm">
                We are currently photographing new pieces for this collection. Custom commissions are open.
              </p>
              <Link to={`/category/${categoryId}`} className="inline-block border-2 border-royal-900 text-royal-900 hover:bg-royal-900 hover:text-white px-6 py-3 rounded-xl font-body font-semibold text-xs uppercase tracking-wider transition-all duration-300">
                Back to {category.categoryName}
              </Link>
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
