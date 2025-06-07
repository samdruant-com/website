// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /**
   * Use styling globally in app
   */
  css: ["~/assets/css/main.css"],

  /**
   * Adds modules to app
   */
  modules: [
    "@pinia/nuxt"
  ],

  /**
   * NOTE: `runtimeConfig.public.restApi` is available in the client
   * and server side while `runtimeConfig.secret` is only available
   * in the server side.
   */
  runtimeConfig: {
    apiUrl: "",
    apiToken: "",
    public: {
      mediaUrl: ""
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  compatibilityDate: "2024-11-30"
});
