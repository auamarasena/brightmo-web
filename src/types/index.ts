// ── Google Sheets Data Types ──

export interface Category {
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SubCategory {
  subCategoryId: string;
  categoryId: string;
  subCategoryName: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ProductColor {
  name: string;
  hex?: string;
}

export interface Product {
  productId: string;
  businessCode: string;
  name: string;
  categoryId: string;
  subCategoryId: string;
  price: number;
  dimensions: string;
  warranty: string;
  description: string;
  isFinalized: boolean;
  displayOrder: number;
  colors?: ProductColor[];
  isMasterpiece?: boolean;
  inStock?: boolean;
}

export interface ProductImage {
  imageId: string;
  productId: string;
  imageUrl: string;
  imageOrder: number;
  /** Optional: links this image to a specific color variant name. Empty = shown for all colors. */
  colorName?: string;
}

// ── App State Types ──

export interface AppState {
  categories: Category[];
  subCategories: SubCategory[];
  products: Product[];
  productImages: ProductImage[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchData: (sheetId: string) => Promise<void>;
}

// ── Utility Types ──

export interface ProductWithImages extends Product {
  images: ProductImage[];
  category?: Category;
  subCategory?: SubCategory;
}

export interface CategoryWithSubs extends Category {
  subCategories: SubCategory[];
  productCount: number;
}
