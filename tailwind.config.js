/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'aws-primary': '#232F3E',
        'aws-secondary': '#FF9900',
        'aws-light': '#F8F9FA',
        'aws-dark': '#161E2D',
        'aws-gray': '#6B7280',
        'aws-border': '#E5E7EB',
        'aws-success': '#10B981',
        'aws-warning': '#F59E0B',
        'aws-error': '#EF4444',
        'aws-info': '#3B82F6',
      },
      fontFamily: {
        'aws': ['Inter', 'Amazon Ember', 'Helvetica Neue', 'Roboto', 'Arial', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'aws': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'aws-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'aws-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-aws': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      minHeight: {
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    // 添加自定义插件
    function({ addUtilities, addComponents, theme }) {
      // 添加AWS风格的组件类
      addComponents({
        '.btn-aws': {
          '@apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2': {},
          'box-shadow': theme('boxShadow.aws'),
          '&:hover': {
            'transform': 'translateY(-1px)',
            'box-shadow': theme('boxShadow.aws-lg'),
          },
          '&:active': {
            'transform': 'translateY(0)',
            'box-shadow': theme('boxShadow.aws'),
          },
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed': {},
            'transform': 'none',
            'box-shadow': theme('boxShadow.aws'),
          },
        },
        '.card-aws': {
          '@apply bg-white rounded-lg border': {},
          'border-color': theme('colors.aws-border'),
          'box-shadow': theme('boxShadow.aws'),
        },
        '.input-aws': {
          '@apply px-3 py-2 text-sm border rounded-md transition-colors duration-200': {},
          'border-color': theme('colors.aws-border'),
          'background-color': 'white',
          '&:focus': {
            '@apply outline-none ring-2 ring-offset-2': {},
            'border-color': theme('colors.aws-secondary'),
            'box-shadow': `0 0 0 2px ${theme('colors.aws-secondary')}20`,
          },
          '&:disabled': {
            '@apply bg-gray-50 text-gray-500 cursor-not-allowed': {},
          },
        },
      });

      // 添加实用工具类
      addUtilities({
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            'display': 'none',
          },
        },
      });
    },
  ],
  // 启用暗色模式
  darkMode: 'class',
  // 启用容器查询
  future: {
    hoverOnlyWhenSupported: true,
  },
}