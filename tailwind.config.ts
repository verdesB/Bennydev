import type { Config } from 'tailwindcss'
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gris: {
          50: '#FFFFFF',    
          100: '#F9FAFB',   
          200: '#F3F4F6',   
          300: '#E5E7EB',   
          400: '#D1D5DB',   
          500: '#9CA3AF',   
          600: '#6B7280',   
          700: '#4B5563',   
          800: '#1F2937',   
          900: '#111827',   
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
}

// Définition du type pour la fonction plugin
function addVariablesForColors({ addBase, theme }: { 
  addBase: (base: Record<string, any>) => void;
  theme: (path: string) => Record<string, string>;
}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config 