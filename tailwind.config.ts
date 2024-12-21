import type { Config } from 'tailwindcss'
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
		  },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			gris: {
  				'50': '#FFFFFF',
  				'100': '#F9FAFB',
  				'200': '#F3F4F6',
  				'300': '#E5E7EB',
  				'400': '#D1D5DB',
  				'500': '#9CA3AF',
  				'600': '#6B7280',
  				'700': '#4B5563',
  				'800': '#1F2937',
  				'900': '#111827'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		animation: {
  			'fade-in': 'fade-in 0.3s ease-out',
  			'scale-up': 'scale-up 0.3s ease-out',
  			'aurora': 'aurora 60s linear infinite'
  		},
  		keyframes: {
			'fade-in': {
				'0%': { opacity: '0' },
				'100%': { opacity: '1' },
			  },
			  'scale-up': {
				'0%': { transform: 'scale(0.95)', opacity: '0' },
				'100%': { transform: 'scale(1)', opacity: '1' },
			  },
			  'aurora': {
				from: {
				  backgroundPosition: '50% 50%, 50% 50%'
				},
				to: {
				  backgroundPosition: '350% 50%, 350% 50%'
				}
			  }
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
	  
  },
  plugins: [addVariablesForColors, require("tailwindcss-animate"), require('@tailwindcss/typography'),require('tailwind-scrollbar')({ nocompatible: true }),],
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