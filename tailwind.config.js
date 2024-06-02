/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        custom: '#050214',
        pinky:' #C10C99',
        bluely:'#4D47C3'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


