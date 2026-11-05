import { Link } from 'react-router-dom';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category.categoryId}`}
      className={`group relative block overflow-hidden rounded-2xl border border-neutral-200/80 shadow-md hover:shadow-2xl hover:border-gold-400/80 transition-all duration-500 hover:-translate-y-1.5 active:scale-[0.98] animate-fade-in opacity-0 [animation-delay:${Math.min(index + 1, 6) * 100}ms]`}
    >
      <div className="aspect-[4/5] sm:aspect-[3/4] relative overflow-hidden bg-neutral-900">
        <img
          src={category.imageUrl}
          alt={category.categoryName}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-royal-950/90 via-royal-950/30 to-transparent transition-opacity duration-500 group-hover:from-royal-950/95" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
          <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1.5 sm:mb-2 transform transition-transform duration-500 group-hover:-translate-y-1 drop-shadow-md">
            {category.categoryName}
          </h3>

          <div className="flex items-center justify-between pt-1">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-gold-300 font-body uppercase tracking-wider group-hover:text-gold-200 transition-colors">
              Explore Collection
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
