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
    '@vant/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/supabase',
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  css: ['@/assets/scss/main.scss'],
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
            ` @use "~/assets/scss/_colors.scss" as *;
              @use "~/assets/scss/_mixin.scss" as *;
            `
        }
      }
    }
  },
  typescript: {
    typeCheck: true,
    strict: true
  },
  plugins: [
    { src: '~/plugins/vant.client.ts', mode: 'client' }
  ],
  i18n: {
    defaultLocale: 'tw',
    locales: [
      { code: 'en', name: 'English', file: 'en.ts' },
      { code: 'tw', name: '繁中', file: 'tw.ts' }
    ],
    detectBrowserLanguage: {

    }
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
    },
    types: '~/app/types/database.types.ts'
  },
  fontawesome: {
    icons: {
      solid: ['house', 'magnifying-glass', 'user', 'pen', 'caret-right', 'check', 'ellipsis-vertical'],
      regular: ['user', 'face-smile'],
      brands: ['rocketchat']
    }
  },
  piniaPluginPersistedstate: {
    storage: 'sessionStorage'
  }
})