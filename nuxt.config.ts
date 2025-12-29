// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
export default defineNuxtConfig({
  app: {
    head: {
      title: "Zen Club Management",
      meta: [
        {name: "viewport", content: "width=device-width, initial-scale=1"},
        {name: "description", content: "這是一個社團管理系統，幫助幹部們盡可能最大化的同步社團資訊"}
      ]
    }
  },
  compatibilityDate: '2025-07-15',
  components: true,
  css: ['~/assets/scss/main.scss'],
  devtools: { enabled: true },
  fontawesome: {
    icons: {
      solid: ['house', 'user', 'pen', 'caret-right', 'check', 'ellipsis-vertical', 'id-card', 'money-check-dollar', 'square-plus', 'eye', 'eye-slash'],
      regular: ['user', 'face-smile']
    }
  },
  i18n: {
    defaultLocale: 'tw',
    locales: [
      {code: 'en', name: 'English', file: 'en.ts'},
      {code: 'tw', name: '繁體中文', file: 'tw.ts'}
    ]
  },
  imports: {
    dirs: ['app/composables']
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
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
  piniaPluginPersistedstate: {
    storage: 'sessionStorage'
  },
  plugins: [
    { src: '~/plugins/vant.client.ts', mode: 'client' },
  ],
  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/auth/register']
    },
  },
  ssr: true,
  typescript: {
    typeCheck: true,
    strict: true
  },
  vant: {
    defaultLocale: 'zh-TW'
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
  }
})