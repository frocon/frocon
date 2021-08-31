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
        light: '#EEC4C4',
        accent: '9AD6D2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
