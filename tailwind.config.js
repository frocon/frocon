module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: '#F29191',
        dark: '#E76A6A',
        light: '#EEC4C4',
        accent: '#4CCEC5', // 9AD6D2, 4AD3CC
        hover: {
          accent: '#63B2AD',
        },
      },
      backgroundColor: {
        primary: '#D1D9D9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
