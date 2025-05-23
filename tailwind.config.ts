/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#111827', 
          light: '#1F2937',   
          dark: '#0F172A',    
        },
        secondary: {
          DEFAULT: '#6B7280', 
          light: '#D1D5DB',   
          dark: '#374151',    
        },
        accent: '#EF4444',     
        background: '#F9FAFB', 
        'background-dark': '#121212', 
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
