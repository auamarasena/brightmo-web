import { Link } from 'react-router-dom';
import type { SubCategory } from '../types';

interface SubCategoryCardProps {
  subCategory: SubCategory;
  categoryId: string;
  index?: number;
}

export default function SubCategoryCard({ subCategory, categoryId, index = 0 }: SubCategoryCardProps) {
  return (
    <Link
      to={`/category/${categoryId}/${subCategory.subCategoryId}`}
      className={`group block rounded-xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl hover:border-gold-400/80 transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] animate-fade-in opacity-0 [animation-delay:${Math.min(index + 1, 6) * 100}ms]`}
    >
      <div className="relative overflow-hidden bg-neutral-900 aspect-[3/2]">
        <img
          src={subCategory.imageUrl}
          alt={subCategory.subCategoryName}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-950/85 via-royal-950/30 to-black/20 group-hover:from-royal-950/90 transition-all duration-300" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-3.5 sm:p-5 z-10">
          <h3 className="font-display text-base sm:text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-md group-hover:text-gold-300 transition-colors line-clamp-1">
            {subCategory.subCategoryName}
          </h3>
          <span className="text-[11px] sm:text-xs font-body font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1 group-hover:text-gold-300 transition-colors">
            <span>Explore</span>
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
