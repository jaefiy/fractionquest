/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFEFA',
          100: '#FFFDF5',
          200: '#FFF8E7',
          300: '#FFF1D0',
          400: '#FFE8B3',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E6ECE5',
          200: '#C9D8C7',
          300: '#ACBFAB',
          400: '#8FA68F',
          500: '#738F73',
          600: '#5A735B',
        },
        peach: {
          50: '#FFF6F3',
          100: '#FFEEE8',
          200: '#FFD9CC',
          300: '#FFC0AD',
          400: '#FFA48C',
          500: '#FF886B',
        },
        lavender: {
          50: '#F9F8FD',
          100: '#F2EFFB',
          200: '#E2DAF6',
          300: '#CEBFEE',
          400: '#B8A1E4',
          500: '#A182DA',
        },
        skyblue: {
          50: '#F2F8FD',
          100: '#E4F0FB',
          200: '#C3DDF7',
          300: '#9EC5EF',
          400: '#78A9E6',
          500: '#528BDC',
        },
        fino: {
          orange: '#FF7A38',
          darkOrange: '#E05B18',
          teal: '#20B2AA',
          darkTeal: '#14857E',
          yellow: '#FFC83B',
        }
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        'storybook': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'storybook': '0 10px 30px -5px rgba(115, 143, 115, 0.15), 0 4px 12px rgba(0, 0, 0, 0.05)',
        'storybook-hover': '0 20px 40px -10px rgba(115, 143, 115, 0.25), 0 8px 16px rgba(0, 0, 0, 0.08)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.6)',
      }
    },
  },
  plugins: [],
}
