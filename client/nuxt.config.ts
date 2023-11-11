import { resolve, dirname } from 'node:path' 
import { fileURLToPath } from 'url' 
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite' 

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: [
      'vue-sonner',
      'vue-i18n'
    ]
  },
	
  /**
   * Use styling globally in app
   */
  css: [
		'~/assets/styles/fonts.css'
	],

	/**
   * Use components in this array globaly without having to import
   * the explicitly
   */
	components: [
		{ path: '~/components/app' },
		{ path: '~/components/base' },
		{ path: '~/components/buttons' },
		{ path: '~/components/cards' },
		{ path: '~/components/forms' }
	],

  /**
   * Adds modules to app
   */
	modules: [
		'@invictus.codes/nuxt-vuetify',
    '@nuxtjs/i18n',
		'@pinia/nuxt'
	],

	/**
   * NOTE: `runtimeConfig.public.restApi` is available in the client
   * and server side while `runtimeConfig.secret` is only available
   * in the server side.
   */
	runtimeConfig: {
    secret: '',
    public: { apiUrl: '' }
  },

  vite: { 
    plugins: [ 
      VueI18nVitePlugin({ 
        include: [ 
          resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json') 
        ] 
      }) 
    ] 
  } 
});
