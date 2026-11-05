import { create } from 'zustand';
import type { Category, SubCategory, Product, ProductImage, ProductWithImages, CategoryWithSubs } from '../types';
import { fetchAllData, getColorHex, formatGoogleDriveImageUrl } from '../api/googleSheets';
import { demoCategories, demoSubCategories, demoProducts, demoProductImages } from '../api/demoData';

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;

interface StoreState {
  categories: Category[];
  subCategories: SubCategory[];
  products: Product[];
  productImages: ProductImage[];
  isLoading: boolean;
  error: string | null;
  isUsingDemo: boolean;

  fetchData: () => Promise<void>;
  getProductsByCategory: (categoryId: string) => ProductWithImages[];
  getProductsBySubCategory: (categoryId: string, subCategoryId: string) => ProductWithImages[];
  getProductByCode: (businessCode: string) => ProductWithImages | null;
  getSubCategoriesByCategory: (categoryId: string) => SubCategory[];
  getCategoryById: (categoryId: string) => Category | undefined;
  getSubCategoryById: (subCategoryId: string) => SubCategory | undefined;
  getCategoryWithSubs: (categoryId: string) => CategoryWithSubs | undefined;
  getProductImages: (productId: string) => ProductImage[];
  getFeaturedProducts: (limit?: number) => ProductWithImages[];
  getMasterpiece: () => ProductWithImages | undefined;
}

function validateProduct(product: Product): boolean {
  if (!product.productId || !product.businessCode || !product.name || !product.categoryId || !product.subCategoryId || product.price <= 0) {
    return false;
  }
  if (!product.isFinalized) return false;
  return true;
}

function enrichProduct(product: Product, images: ProductImage[], categories: Category[], subCategories: SubCategory[]): ProductWithImages {
  // Keep ALL images for this product sorted by order, and sanitize image URLs
  const productImages = images
    .filter((img) => img.productId === product.productId)
    .map((img) => ({
      ...img,
      imageUrl: formatGoogleDriveImageUrl(img.imageUrl),
    }))
    .sort((a, b) => a.imageOrder - b.imageOrder);

  // Extract all distinct color names from this product's images
  const imageColorNames: string[] = [];
  productImages.forEach((img) => {
    const cn = img.colorName?.trim();
    if (cn && !imageColorNames.some((c) => c.toLowerCase() === cn.toLowerCase())) {
      imageColorNames.push(cn);
    }
  });

  // Reconcile product.colors with colors specified in the images sheet
  let finalColors = [...(product.colors || [])];

  if (imageColorNames.length > 0) {
    // Check if the colors in Products sheet overlap with the ones in ProductImages
    const hasOverlap = imageColorNames.some((icn) =>
      finalColors.some(
        (c) =>
          c.name.toLowerCase() === icn.toLowerCase() ||
          c.name.toLowerCase().includes(icn.toLowerCase()) ||
          icn.toLowerCase().includes(c.name.toLowerCase())
      )
    );

    if (!hasOverlap) {
      // The Products sheet colors (e.g. old demo data) don't match the image sheet's actual variants.
      // Automatically generate the color options directly from the images sheet!
      finalColors = imageColorNames.map((name) => ({
        name,
        hex: getColorHex(name),
      }));
    } else {
      // Ensure any image color missing from finalColors is added
      imageColorNames.forEach((icn) => {
        const found = finalColors.find(
          (c) =>
            c.name.toLowerCase() === icn.toLowerCase() ||
            c.name.toLowerCase().includes(icn.toLowerCase()) ||
            icn.toLowerCase().includes(c.name.toLowerCase())
        );
        if (!found) {
          finalColors.push({
            name: icn,
            hex: getColorHex(icn),
          });
        }
      });
    }
  }

  return {
    ...product,
    colors: finalColors,
    images: productImages,
    category: categories.find((c) => c.categoryId === product.categoryId),
    subCategory: subCategories.find((s) => s.subCategoryId === product.subCategoryId),
  };
}

/**
 * Returns the images to display for a given color selection.
 * - Guarantees that only images belonging to ONE color variant are returned.
 * - Never returns all images combined when images are divided into color groups.
 */
export function getImagesForColor(images: ProductImage[], selectedColorName?: string): ProductImage[] {
  if (!images || images.length === 0) return [];

  // Check if any images have a colorName specified
  const hasColorVariants = images.some((img) => Boolean(img.colorName?.trim()));

  // If no images have colorName, this product has no color separation -> return all images
  if (!hasColorVariants) {
    return images;
  }

  // If a color is selected, try matching
  if (selectedColorName && selectedColorName.trim()) {
    const target = selectedColorName.trim().toLowerCase();

    // 1. Exact match (case-insensitive)
    let matched = images.filter(
      (img) => img.colorName?.trim().toLowerCase() === target
    );

    // 2. Substring match (e.g. "Emerald" matches "Emerald Velvet" or vice versa)
    if (matched.length === 0) {
      matched = images.filter((img) => {
        if (!img.colorName) return false;
        const cn = img.colorName.trim().toLowerCase();
        return cn.includes(target) || target.includes(cn);
      });
    }

    if (matched.length > 0) {
      return matched.sort((a, b) => a.imageOrder - b.imageOrder);
    }
  }

  // Fallback 1: Look for untagged / shared images
  const untagged = images.filter((img) => !img.colorName?.trim());
  if (untagged.length > 0) {
    return untagged.sort((a, b) => a.imageOrder - b.imageOrder);
  }

  // Fallback 2: Pick the first color group's images ONLY
  // (NEVER return all images mixed together from different colors!)
  const firstColor = images.find((img) => Boolean(img.colorName?.trim()))?.colorName?.trim();
  if (firstColor) {
    return images
      .filter((img) => img.colorName?.trim().toLowerCase() === firstColor.toLowerCase())
      .sort((a, b) => a.imageOrder - b.imageOrder);
  }

  return images;
}

export const useStore = create<StoreState>((set, get) => ({
  categories: [],
  subCategories: [],
  products: [],
  productImages: [],
  isLoading: true,
  error: null,
  isUsingDemo: false,

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      if (SHEET_ID && SHEET_ID !== 'YOUR_GOOGLE_SHEET_ID') {
        const data = await fetchAllData();
        const validProducts = data.products.filter(validateProduct);
        // Only keep products with at least one image
        const productsWithImages = validProducts.filter((p) =>
          data.productImages.some((img) => img.productId === p.productId)
        );
        set({
          categories: data.categories,
          subCategories: data.subCategories,
          products: productsWithImages,
          productImages: data.productImages,
          isUsingDemo: false,
          isLoading: false,
        });
      } else {
        // Use demo data
        const validProducts = demoProducts.filter(validateProduct);
        const productsWithImages = validProducts.filter((p) =>
          demoProductImages.some((img) => img.productId === p.productId)
        );
        set({
          categories: demoCategories,
          subCategories: demoSubCategories,
          products: productsWithImages,
          productImages: demoProductImages,
          isUsingDemo: true,
          isLoading: false,
        });
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      // Fallback to demo data on error
      const validProducts = demoProducts.filter(validateProduct);
      const productsWithImages = validProducts.filter((p) =>
        demoProductImages.some((img) => img.productId === p.productId)
      );
      set({
        categories: demoCategories,
        subCategories: demoSubCategories,
        products: productsWithImages,
        productImages: demoProductImages,
        isUsingDemo: true,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to load data',
      });
    }
  },

  getProductsByCategory: (categoryId: string) => {
    const { products, productImages, categories, subCategories } = get();
    return products
      .filter((p) => p.categoryId === categoryId)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((p) => enrichProduct(p, productImages, categories, subCategories));
  },

  getProductsBySubCategory: (categoryId: string, subCategoryId: string) => {
    const { products, productImages, categories, subCategories } = get();
    return products
      .filter((p) => p.categoryId === categoryId && p.subCategoryId === subCategoryId)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((p) => enrichProduct(p, productImages, categories, subCategories));
  },

  getProductByCode: (businessCode: string) => {
    const { products, productImages, categories, subCategories } = get();
    const product = products.find((p) => p.businessCode === businessCode);
    if (!product) return null;
    return enrichProduct(product, productImages, categories, subCategories);
  },

  getSubCategoriesByCategory: (categoryId: string) => {
    const { subCategories } = get();
    return subCategories
      .filter((s) => s.categoryId === categoryId)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  },

  getCategoryById: (categoryId: string) => {
    return get().categories.find((c) => c.categoryId === categoryId);
  },

  getSubCategoryById: (subCategoryId: string) => {
    return get().subCategories.find((s) => s.subCategoryId === subCategoryId);
  },

  getCategoryWithSubs: (categoryId: string) => {
    const { categories, subCategories, products } = get();
    const category = categories.find((c) => c.categoryId === categoryId);
    if (!category) return undefined;
    return {
      ...category,
      subCategories: subCategories
        .filter((s) => s.categoryId === categoryId)
        .sort((a, b) => a.displayOrder - b.displayOrder),
      productCount: products.filter((p) => p.categoryId === categoryId).length,
    };
  },

  getProductImages: (productId: string) => {
    return get().productImages
      .filter((img) => img.productId === productId)
      .sort((a, b) => a.imageOrder - b.imageOrder);
  },

  getFeaturedProducts: (limit = 6) => {
    const { products, productImages, categories, subCategories } = get();
    return products
      .slice(0, limit)
      .map((p) => enrichProduct(p, productImages, categories, subCategories));
  },

  getMasterpiece: () => {
    const { products, productImages, categories, subCategories } = get();
    const masterpiece = products.find((p) => p.isMasterpiece);
    const target = masterpiece || products[0];
    if (!target) return undefined;
    return enrichProduct(target, productImages, categories, subCategories);
  },
}));
