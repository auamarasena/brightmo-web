import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'skeleton-gradient': 'linear-gradient(90deg, #eeeeee 25%, #f5f5f5 50%, #eeeeee 75%)',
        'radial-vignette': 'radial-gradient(circle at 50% 30%, rgba(26,59,107,0.35) 0%, rgba(7,21,39,0.95) 70%, #050E1A 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #ECC876 0%, #D8A63A 40%, #FFE9B3 60%, #C18F2B 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
      },
      backgroundSize: {
        '200%': '200% 100%',
      },
      colors: {
        // Logo Core: Brushed Steel Royal Navy
        royal: {
          50: "#F0F5FC",
          100: "#E1EBF9",
          200: "#B9CEF0",
          300: "#81A9E1",
          400: "#4D83D1",
          500: "#1A3B6B", // Core oval badge color
          600: "#15315B",
          700: "#102547",
          800: "#0B1B34",
          900: "#071325",
          950: "#040B17",
        },
        // Alias denim to royal for seamless backward compatibility
        denim: {
          50: "#F0F5FC",
          100: "#E1EBF9",
          200: "#B9CEF0",
          300: "#81A9E1",
          400: "#4D83D1",
          500: "#1A3B6B",
          600: "#15315B",
          700: "#102547",
          800: "#0B1B34",
          900: "#071325",
          950: "#040B17",
        },
        // Logo Accent: Imperial Gold & Champagne
        gold: {
          50: "#FCF9EE",
          100: "#F7F0D6",
          200: "#EEDFAC",
          300: "#E3CB7D",
          400: "#D8B750",
          500: "#C8A236", // Warm embossed gold
          600: "#AA8524",
          700: "#866619",
          800: "#654C14",
          900: "#45330F",
          950: "#2B1F08",
        },
        // Silver / Platinum Bevel & Chrome Accents
        silver: {
          100: "#F8FAFC",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#1A1A1A",
          950: "#0D0D0D",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        cinzel: ['"Cinzel"', "Georgia", "serif"],
        body: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "shimmer": "shimmer 2s infinite linear",
        "float": "float 4s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        'html': {
          scrollBehavior: 'smooth',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        'body': {
          fontFamily: theme('fontFamily.body') as string,
          color: '#1a1a1a',
          backgroundColor: '#fafafa',
        },
        'h1, h2, h3, h4, h5, h6': {
          fontFamily: theme('fontFamily.display') as string,
        },
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#f5f5f5',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#bdbdbd',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#9e9e9e',
        },
      });
    }),
  ],
} satisfies Config;
