import type { Category, SubCategory, Product, ProductImage } from "../types";

// ── Configuration ──
// Replace YOUR_GOOGLE_SHEET_ID with your actual Google Sheet ID
// The sheet ID is the long string in the URL: https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || "YOUR_GOOGLE_SHEET_ID";

const SHEET_NAMES = {
  categories: "Categories",
  subCategories: "SubCategories",
  products: "Products",
  productImages: "ProductImages",
} as const;

// ── CSV Parser ──
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV<T>(csvText: string): T[] {
  const lines = csvText.split("\n").filter((line) => line.trim() !== "");
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.replace(/"/g, "").trim());
  const records: T[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]).map((v) =>
      v.replace(/"/g, "").trim(),
    );
    if (values.length === 0 || (values.length === 1 && values[0] === ""))
      continue;

    const record: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || "";
    });
    records.push(record as T);
  }

  return records;
}

// ── Fetch Helpers ──
async function fetchSheetData(sheetName: string): Promise<string> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${sheetName}: ${response.statusText}`);
  }
  return response.text();
}

// ── Google Drive Image Formatter ──
/**
 * Automatically converts Google Drive sharing/viewer URLs into direct image CDN URLs.
 * Handles:
 * - https://drive.google.com/file/d/{FILE_ID}/view?usp=drive_link
 * - https://drive.google.com/file/d/{FILE_ID}/view
 * - https://drive.google.com/file/d/{FILE_ID}
 * - https://drive.google.com/open?id={FILE_ID}
 * - https://drive.google.com/uc?id={FILE_ID}
 * - https://drive.google.com/thumbnail?id={FILE_ID}
 * - Regular URLs (Unsplash, Cloudinary, etc.) pass through unchanged
 */
export function formatGoogleDriveImageUrl(url?: string): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // If already an direct lh3 or thumbnail link, return as-is
  if (trimmed.includes("lh3.googleusercontent.com/d/") || trimmed.includes("drive.google.com/thumbnail")) {
    return trimmed;
  }

  // Handle https://drive.google.com/file/d/{FILE_ID}/...
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (fileDMatch && fileDMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileDMatch[1]}`;
  }

  // Handle ?id={FILE_ID} query parameter
  const idQueryMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (idQueryMatch && idQueryMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idQueryMatch[1]}`;
  }

  return trimmed;
}

// ── Public API ──

export async function fetchCategories(): Promise<Category[]> {
  const csv = await fetchSheetData(SHEET_NAMES.categories);
  const raw = parseCSV<Record<string, string>>(csv);
  return raw
    .map((row) => ({
      categoryId: row.categoryId || "",
      categoryName: row.categoryName || "",
      imageUrl: formatGoogleDriveImageUrl(row.imageUrl || ""),
      displayOrder: parseInt(row.displayOrder || "0", 10),
      isActive: row.isActive?.toLowerCase() === "true",
    }))
    .filter((c) => c.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function fetchSubCategories(): Promise<SubCategory[]> {
  const csv = await fetchSheetData(SHEET_NAMES.subCategories);
  const raw = parseCSV<Record<string, string>>(csv);
  return raw
    .map((row) => ({
      subCategoryId: row.subCategoryId || "",
      categoryId: row.categoryId || "",
      subCategoryName: row.subCategoryName || "",
      imageUrl: formatGoogleDriveImageUrl(row.imageUrl || ""),
      displayOrder: parseInt(row.displayOrder || "0", 10),
      isActive: row.isActive?.toLowerCase() === "true",
    }))
    .filter((s) => s.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export const COMMON_COLOR_MAP: Record<string, string> = {
  emerald: "#1F4D36",
  green: "#2E7D32",
  navy: "#1A3B6B",
  blue: "#1976D2",
  ochre: "#C8A236",
  gold: "#D4AF37",
  cognac: "#9E5A22",
  brown: "#795548",
  charcoal: "#333333",
  black: "#1A1A1A",
  white: "#F8FAFC",
  beige: "#E8D8C8",
  cream: "#FFFDD0",
  grey: "#757575",
  gray: "#757575",
  oak: "#D9BA8C",
  walnut: "#4A3525",
  teak: "#966F33",
  rust: "#B7410E",
  velvet: "#1F4D36",
};

export function getColorHex(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(COMMON_COLOR_MAP)) {
    if (lower.includes(key)) {
      return val;
    }
  }
  return "#718096";
}

export function parseColors(colorString?: string) {
  if (!colorString || typeof colorString !== "string") return [];
  return colorString
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean)
    .map((item) => {
      let hex: string | undefined;
      let name = item;

      if (item.includes("(") && item.includes(")")) {
        const parts = item.split(/\(([^)]+)\)/);
        name = parts[0].trim();
        const inside = parts[1]?.trim();
        if (inside && inside.startsWith("#")) {
          hex = inside;
        }
      } else if (item.includes(":")) {
        const parts = item.split(":");
        name = parts[0].trim();
        const candHex = parts[1]?.trim();
        if (candHex && candHex.startsWith("#")) hex = candHex;
      }

      if (!hex) {
        hex = getColorHex(name);
      }

      return {
        name,
        hex,
      };
    });
}

export async function fetchProducts(): Promise<Product[]> {
  const csv = await fetchSheetData(SHEET_NAMES.products);
  const raw = parseCSV<Record<string, string>>(csv);
  return raw
    .map((row) => ({
      productId: row.productId || "",
      businessCode: row.businessCode || "",
      name: row.name || "",
      categoryId: row.categoryId || "",
      subCategoryId: row.subCategoryId || "",
      price: parseFloat(row.price || "0"),
      dimensions: row.dimensions || "",
      warranty: row.warranty || "",
      description: row.description || "",
      isFinalized: row.isFinalized?.toLowerCase() === "true",
      displayOrder: parseInt(row.displayOrder || "0", 10),
      colors: parseColors(row.colors),
      isMasterpiece: row.isMasterpiece?.toLowerCase() === "true",
      inStock: row.inStock ? row.inStock.toLowerCase() !== "false" && row.inStock.toLowerCase() !== "0" : true,
    }))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function fetchProductImages(): Promise<ProductImage[]> {
  const csv = await fetchSheetData(SHEET_NAMES.productImages);
  const raw = parseCSV<Record<string, string>>(csv);
  return raw
    .map((row) => ({
      imageId: row.imageId || "",
      productId: row.productId || "",
      imageUrl: formatGoogleDriveImageUrl(row.imageUrl || ""),
      imageOrder: parseInt(row.imageOrder || "0", 10),
      // colorName is optional – if blank the image applies to all color variants
      colorName: row.colorName?.trim() || undefined,
    }))
    .sort((a, b) => a.imageOrder - b.imageOrder);
}

export async function fetchAllData() {
  const [categories, subCategories, products, productImages] =
    await Promise.all([
      fetchCategories(),
      fetchSubCategories(),
      fetchProducts(),
      fetchProductImages(),
    ]);

  return { categories, subCategories, products, productImages };
}
