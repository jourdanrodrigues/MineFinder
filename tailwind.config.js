/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: '#ffffff',
        'primary-canvas': '#ffffff',
        // secondary: '#789abc',
        // neutral: '#f0f0f0',
        // accent: '#ff5733',
        contrast: '#000000',

        // Dark mode colors
        'primary-dark': '#000000',
        'primary-canvas-dark': 'rgb(43, 43, 43)',
        // 'secondary-dark': '#345678',
        // 'neutral-dark': '#1a1a1a',
        // 'accent-dark': '#ffa726',
        'contrast-dark': '#AFAFAF',
      },
    },
  },
  plugins: [],
};
