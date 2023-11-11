import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
import 'vuetify/styles'

const lightTheme: ThemeDefinition = {
  "dark": false,
  "colors": {
    "background": "#DBCBBD",
    "surface": "#C87941",
    "primary": "#50A6FF",
    "secondary": "#BBC3FF",
    "error": "#F44336",
    "info": "#2196F3",
    "success": "#4CAF50",
    "warning": "#FFC107",
    "on-background": "#212121",
    "on-surface": "#FFFFFF"
  }
}

const darkTheme: ThemeDefinition = {
  "dark": true,
  "colors": {
    "background": "#723B1C",
    "surface": "#C87941",
    "primary": "#BB86FC",
    "secondary": "#03DAC5",
    "error": "#CE3D57",
    "info": "#2196F3",
    "success": "#4CAF50",
    "warning": "#FB8C00",
    "on-background": "#fff",
    "on-surface": "#fff"
  }
}

function setupVuetify() {
  return createVuetify({
    components: {
      ...components,
      VSkeletonLoader
    },
    directives,
    theme: {
      defaultTheme: 'dark',
      themes: {
        light: lightTheme,
        dark: darkTheme
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