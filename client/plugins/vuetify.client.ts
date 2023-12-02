import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'

const lightTheme: ThemeDefinition = {
  "dark": false,
  "colors": {
    "background": "#FFD6D6",
    "surface": "#FFFFFF",
    "primary": "#A4AFFD",
    "secondary": "#92D09A",
    "error": "#FF6155",
    "info": "#2196F3",
    "success": "#7DFF82",
    "warning": "#F3E43E"
  }
}

function setupVuetify() {
  return createVuetify({
    components: components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: lightTheme
      }
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    }
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(setupVuetify())
})