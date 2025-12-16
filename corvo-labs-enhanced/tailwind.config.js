/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Professional monochromatic palette - matching corvolabs.com
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
        // Charcoal for depth
        charcoal: {
          DEFAULT: '#1A1A1A',
          50: '#2A2A2A',
          100: '#333333',
          200: '#404040',
        },
        // Coral orange accent - vibrant and forward-thinking
        accent: {
          DEFAULT: '#FF6B47',
          50: '#FFF5F2',
          100: '#FFE8E2',
          200: '#FFD0C2',
          300: '#FFB8A1',
          400: '#FF9A7F',
          500: '#FF7C5D',
          600: '#FF6B47',
          700: '#E55531',
          800: '#CC4422',
          900: '#993319',
        },
        // Maintain some status colors but more muted
        success: {
          DEFAULT: '#059669',
          50: '#ECFDF5',
          100: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#D97706',
          50: '#FFFBEB',
          100: '#FEF3C7',
        },
        error: {
          DEFAULT: '#DC2626',
          50: '#FEF2F2',
          100: '#FEE2E2',
        },
      },
      fontFamily: {
        // Elegant serif-forward typography system
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Inter Variable', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        // Core animations
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',

        // Fluid organic animations
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',

        // Spring-based organic animations
        'spring-in': 'springIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'bounce-subtle': 'bounceSubtle 2.1s ease-out',
        'wave': 'wave 4s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',

        // Micro-interactions
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'tilt': 'tilt 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },

        // Fluid organic keyframes
        springIn: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(20px)' },
          '60%': { transform: 'scale(1.05) translateY(-5px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },

        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
          '60%': { transform: 'translateY(-4px)' },
        },

        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '75%': { transform: 'rotate(-3deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },

        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },

        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },

        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 107, 71, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 107, 71, 0.6)' },
        },

        tilt: {
          '0%, 100%': { transform: 'perspective(1000px) rotateX(0deg)' },
          '50%': { transform: 'perspective(1000px) rotateX(5deg)' },
        },
      },
    },
  },
  plugins: [],
}