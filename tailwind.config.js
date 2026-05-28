/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        sand: {
          50: '#F0EDE6',
          100: '#E8E0D0',
          200: '#D4B896',
          300: '#C9A96E',
          400: '#B8944F',
          500: '#A07D3A',
          600: '#8A6A2F',
        },
        dune: {
          900: '#0D0D0D',
          800: '#1A1A1A',
          700: '#252525',
          600: '#333333',
        },
        twilight: {
          DEFAULT: '#6B5B8D',
          light: '#8B7BAD',
          dark: '#4A3D6B',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-delay-1': 'fadeInUp 0.8s ease-out 0.2s forwards',
        'fade-in-delay-2': 'fadeInUp 0.8s ease-out 0.4s forwards',
        'fade-in-delay-3': 'fadeInUp 0.8s ease-out 0.6s forwards',
        'fade-in-delay-4': 'fadeInUp 0.8s ease-out 0.8s forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 169, 110, 0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 169, 110, 0.25)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
