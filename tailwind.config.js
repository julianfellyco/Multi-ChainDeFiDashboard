// tailwind.config.js - Modern Tailwind Configuration for Web3 Dashboard

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom Web3 color palette
        web3: {
          primary: '#7c3aed', // Purple
          secondary: '#ec4899', // Pink  
          accent: '#06b6d4', // Cyan
          success: '#10b981', // Emerald
          warning: '#f59e0b', // Amber
          error: '#ef4444', // Red
        },
        // Glassmorphism colors
        glass: {
          50: 'rgba(255, 255, 255, 0.1)',
          100: 'rgba(255, 255, 255, 0.2)',
          200: 'rgba(255, 255, 255, 0.3)',
          300: 'rgba(0, 0, 0, 0.1)',
          400: 'rgba(0, 0, 0, 0.2)',
          500: 'rgba(0, 0, 0, 0.3)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'web3-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'defi-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'ethereum-gradient': 'linear-gradient(135deg, #627eea 0%, #8b5cf6 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 25px 50px rgba(0, 0, 0, 0.4)',
        'neon': '0 0 20px rgba(124, 58, 237, 0.5)',
        'neon-lg': '0 0 40px rgba(124, 58, 237, 0.7)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Custom plugin for glassmorphism utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.glass-card': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(16px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        '.glass-button': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'transition': 'all 0.3s ease',
          '&:hover': {
            'background': 'rgba(255, 255, 255, 0.2)',
            'border-color': 'rgba(255, 255, 255, 0.3)',
          },
        },
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.web3-gradient': {
          'background': 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
        },
        '.ethereum-gradient': {
          'background': 'linear-gradient(135deg, #627eea 0%, #8b5cf6 100%)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
