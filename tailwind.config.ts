import type { Config } from 'tailwindcss'

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
    },
  },
  plugins: [],
}

export default config 