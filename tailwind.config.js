/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'homeHeaderBg':'#00A6CE',
        'textColorHeader': '#FFFFFF',
        'textPI': '#4A4545',
        'colorBlue': '#00A6CE',
        'termsText': '#4A4545',
        'sidebarBg':'#F3F3FB',
        'sidebarTxtOff':'#757575',
        'UHeaderText':'#F4F4F6',
        'amtBg': '#F0FAFB',
        kmColor:'#DE1A1A'
      },
      boxShadow: {
        'customShadow': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-in-out',
      },
      screens: {
        'sm-500': '500px',
        
      },
    },
  },
  plugins: [],
}

