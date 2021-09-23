export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'frocon | %s',
    title: 'frocon',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        type: 'text/javascript',
        src: 'https://cdn.jsdelivr.net/pyodide/v0.18.0/full/pyodide.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css', '@/assets/css/highlightjs.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios-accessor',
    { src: '@/plugins/local-storage', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/date-fns',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    browserBaseURL: process.env.BASE_APP_URL || '/',
    requestInterceptor(config, { store }) {
      if (store.state.csrfToken) {
        // config.headers.common['x-csrf-token'] = store.state.csrfToken
      }
      return config
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: [{ path: '/api', handler: '~/api/index.ts' }],

  // Vue configuration
  vue: {
    config: {
      productionTip: false,
      ignoredElements: [
        'field',
        'block',
        'category',
        'xml',
        'mutation',
        'value',
        'sep',
      ],
      devtools: true,
    },
  },

  // disable telemetry
  telemetry: false,
}
