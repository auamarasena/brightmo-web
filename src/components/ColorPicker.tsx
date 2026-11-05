import type { ProductColor } from "../types";

interface ColorPickerProps {
  colors?: ProductColor[];
  selectedColor?: string;
  onSelectColor: (colorName: string) => void;
  className?: string;
}

export default function ColorPicker({
  colors,
  selectedColor,
  onSelectColor,
  className = "",
}: ColorPickerProps) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className={`space-y-2.5 ${className}`}>
      <div className="flex items-center justify-between text-xs font-body">
        <span className="text-neutral-500 font-medium">Finish & Variety:</span>
        <span className="font-bold text-royal-950 font-body">
          {selectedColor || colors[0]?.name}
        </span>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {colors.map((color) => {
          const isSelected = (selectedColor || colors[0]?.name) === color.name;
          const isWhiteOrLight =
            color.hex?.toLowerCase() === "#ffffff" ||
            color.hex?.toLowerCase() === "#f8fafc" ||
            color.hex?.toLowerCase() === "#fffdd0" ||
            color.hex?.toLowerCase() === "#eaeaea";

          return (
            <button
              key={color.name}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSelectColor(color.name);
              }}
              title={color.name}
              className={`group relative w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center ${
                isSelected
                  ? "ring-2 ring-gold-500 ring-offset-2 scale-110 shadow-md"
                  : "hover:scale-105 opacity-80 hover:opacity-100 ring-1 ring-black/10"
              }`}
              style={{ backgroundColor: color.hex || "#718096" }}
              aria-label={`Select ${color.name} finish`}
            >
              {isWhiteOrLight && (
                <span className="absolute inset-0 rounded-full border border-neutral-300/80 pointer-events-none" />
              )}
              {isSelected && (
                <svg
                  className={`w-4 h-4 ${
                    isWhiteOrLight ? "text-neutral-900" : "text-white"
                  } drop-shadow-sm`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
