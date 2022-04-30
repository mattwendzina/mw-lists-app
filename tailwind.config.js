module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'oxford-blue': "#0E1428",
        seashell: "#FFF3F0",
        "honey-yellow": "#FDB321",
        "myrtle-green": "#32746D",
        'french-raspberry': "#C62F4F",
        'oxford-blue-light': 'rgb(13 20 40 / 84%)',
        "honey-yellow-light": 'hsl(40deg 98% 47% / 55%)',
        "honey-yellow-lighter": 'hsl(40deg 98% 47% / 35%)',
        'blue-munsell': '#3891A6',
        'pacific-blue': '#47ABC2',
        'cinnamon-slate': "#CC5A71",
        flame: "#D95D39",
        tangerine: "#F18805",
      }
    }
  },
  plugins: [],
}
