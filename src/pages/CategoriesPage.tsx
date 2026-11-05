import { useStore } from '../store/useStore';
import CategoryCard from '../components/CategoryCard';
import watermarkEagle from '../assets/watermark eagl2.png';

export default function CategoriesPage() {
  const { categories } = useStore();

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Luxury Header Banner */}
      <section className="relative pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 bg-royal-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none opacity-5 hidden sm:block">
          <img src={watermarkEagle} alt="" className="w-full h-full object-contain filter invert" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-gold-400 text-xs font-body font-bold tracking-[0.25em] uppercase mb-2 sm:mb-3">
              Brightmo Atelier
            </span>
            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Curated Collections
            </h1>
            <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed">
              Explore our distinctive collections organized by living room, bedroom sanctuary, culinary dining, and executive studies.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 sm:py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {categories.map((category, idx) => (
                <CategoryCard key={category.categoryId} category={category} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200/80 p-8 max-w-lg mx-auto shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-cinzel text-lg font-bold text-neutral-800 mb-1">Catalog Synchronizing</h3>
              <p className="font-body text-sm text-neutral-500">
                Categories are loading from your spreadsheet catalog. If you just updated your sheet, please ensure the `Categories` tab contains active rows.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
