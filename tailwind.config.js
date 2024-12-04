// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        fontcolor: '#ffffff',
        buttonBg: '#bb86fc',
        buttonHoverBg: 'rgb(80, 80, 80)',
        bgcolor: 'rgb(34, 34, 34)',
      },
      spacing: {
        '5vh': '5vh',
        '12vh': '12vh',
        '70vh': '70vh',
        '85vh': '85vh',
        '95vh': '95vh',
        '53vh': '53vh',
      },
    },
  },
  plugins: [],
}
