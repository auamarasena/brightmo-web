/**
 * Local cache helpers to remember the user's selected finish / color variant across page refreshes.
 */

const STORAGE_PREFIX = 'brightmo_selected_color_';

export function getSavedProductColor(productId?: string): string | null {
  if (!productId || typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${productId}`);
  } catch {
    return null;
  }
}

export function saveProductColor(productId?: string, colorName?: string): void {
  if (!productId || !colorName || typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${productId}`, colorName.trim());
  } catch {
    // Graceful degradation in private browsing / full storage
  }
}
