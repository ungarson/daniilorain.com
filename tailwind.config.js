/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    colors: {
      'black-soft': '#222222',
    },
    extend: {
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

