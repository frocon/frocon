import firebaseConfig from './infrastructures/firebaseConfig.json'

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
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    requestInterceptor(config, { store }) {
      if (store.state.csrfToken) {
        // config.headers.common['x-csrf-token'] = store.state.csrfToken
      }
      return config
    },
    proxy: true,
  },
  privateRuntimeConfig: {
    proxy: { '/api/': { target: process.env.API_URL } },
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BASE_APP_URL || 'http://localhost:3000/',
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

  router: {
    middleware: ['auth'],
  },

  firebase: {
    config: firebaseConfig,
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged',
        },
        ssr: true,
      },
    },
  },

  pwa: {
    meta: false,
    icon: false,

    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
    },
  },

  server: {
    host: '0',
  },
}
