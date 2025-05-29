// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: [
      "vue-sonner"
    ]
  },

  /**
   * Use styling globally in app
   */
  css: ["~/assets/css/main.css"],

  /**
   * Use components in this array globaly without having to import
   * the explicitly
   */
  components: [
    { path: "~/components/app" },
    { path: "~/components/base" },
    { path: "~/components/cards" },
    { path: "~/components/forms" }
  ],

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
    public: { baseUrl: "" }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  compatibilityDate: "2024-11-30"
});
