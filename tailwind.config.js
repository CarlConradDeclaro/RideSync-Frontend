/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'homeHeaderBg': '#00A6CE',
        'textColorHeader': '#FFFFFF',
        'textPI': '#4A4545',
        'colorBlue': '#00A6CE',
        'termsText': '#4A4545',
        'sidebarBg': '#F3F3FB',
        'sidebarTxtOff': '#757575',
        'UHeaderText': '#F4F4F6',
        'amtBg': '#F0FAFB',
        'kmColor': '#DE1A1A',
        'dRouteBG': '#F3F4F6',
        'dRequest': '#F0FAFB'

      },
      boxShadow: {
        'customShadow': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(10%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)' },  // Start from off-screen
          '100%': { transform: 'translateX(0)' },    // End at its original position
        },

      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-in-out',
        slideInFromRight: 'slideInFromRight 0.5s ease-out',
        slideDown: 'slideDown 0.5s ease-out', // New slide-down animation
        slideRight: 'slideRight 0.5s ease-out',
      },
      screens: {
        'sm-500': '500px',
      },
    },
  },
  plugins: [],
}
