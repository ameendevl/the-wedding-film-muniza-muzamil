/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        cinzel: ['Cinzel', 'Cinzel Decorative', 'serif'],
        script: ['Alex Brush', 'cursive'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#FBF8F0',
          100: '#F4EEDB',
          200: '#E7D9B2',
          300: '#D9C187',
          400: '#C9A96E',
          500: '#B89354',
          600: '#9E7A40',
          700: '#7E5F32',
          800: '#5C4425',
          900: '#3D2D1A',
        },
        film: {
          black: '#0D0C0B',
          dark: '#141312',
          card: '#1C1A18',
          border: 'rgba(217, 193, 135, 0.15)',
          muted: '#8E887E',
          cream: '#F7F4EE',
          ivory: '#EFECE6',
        }
      },
      letterSpacing: {
        'luxury': '0.25em',
        'cinematic': '0.35em',
      },
      animation: {
        'slow-zoom': 'slowZoom 28s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'shimmer': 'shimmer 2.5s infinite',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
      },
      keyframes: {
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
