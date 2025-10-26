// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
export default defineNuxtConfig({
  ssr: false,
  imports: {
    dirs: ['app/composables']
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: true,
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vesp/nuxt-fontawesome',
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
    '@vant/nuxt'
  ],
  i18n: {
    defaultLocale: 'tw',
    locales: [
      {code: 'en', name: 'English', file: 'en.ts'},
      {code: 'tw', name: '繁體中文', file: 'tw.ts'}
    ]
  },
  vite: {
    plugins: [
      Components({
        resolvers: [VantResolver()]
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            ` @use "~/assets/scss/_variables.scss" as *;
              @use "~/assets/scss/_mixin.scss" as *;
            `
        }
      }
    }
  },
  plugins: [
    { src: '~/plugins/vant.client.ts', mode: 'client' }
  ],
  typescript: {
    typeCheck: true,
    strict: true
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY
    }
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/auth/register']
    }
  },
  fontawesome: {
    icons: {
      solid: ['house', 'user', 'pen', 'caret-right', 'check', 'ellipsis-vertical', 'id-card', 'calendar-days', 'square-plus'],
      regular: ['user', 'face-smile']
    }
  },
  piniaPluginPersistedstate: {
    storage: 'sessionStorage'
  }
})