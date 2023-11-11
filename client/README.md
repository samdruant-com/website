# Nuxt Template

> Build apps faster with templates 🔥

The purpose of this project is to provide a template for Nuxt projects so that I can quickly start new projects without having to set up the same things over and over again.

## 🧪 Features

- [x] Base Components (buttons, inputs, etc.)
- [x] State Management with `pinia`
- [x] Responsive UI Framework with `vuetify`
- [x] User-friendly editor with `tiptap`
- [x] Multi-language support with `vue-i18n` (See [locales/README.md](locales/README.md) for more info).

## Getting Started

> For the best experience, use `nodejs@18.18.0` and `pnpm@8.9.2`

```bash
# install dependencies (alternatively, use `npm install`)
pnpm install --shamefully-hoist

# serve with hot reload at localhost:3000 (alternatively, use `npm run dev`)
pnpm dev

# build for production and launch server (alternatively, use `npm run build`)
pnpm build
```

## 🚀 Deployment

### Docker Support

```bash
# build image (pnpm docker:build)
docker build -t nuxt-template .

# spin up container (pnpm docker:run)
docker run -p 3000:3000 --env-file .env nuxt-template
```

## ⛓️ Dependencies

- Base Components (buttons, inputs, etc.)
- State Management with `Pinia`
- Responsive UI Framework with `Vuetify`
- Multi-language support with `vue-i18n`
  - [@nuxt/i18n](https://i18n.nuxtjs.org/)
  - `@intlify/unplugin-vue-i18n/vite` (optimizes purposes as explained in this [guide](https://vue-i18n.intlify.dev/guide/integrations/nuxt3.html#optimize-with-intlify-unplugin-vue-i18n))
- User-friendly editor with `tiptap`
  - `@tiptap/vue-3` - core library
  - `@tiptap/pm` - prosemirror for tiptap
  - `@tiptap/starter-kit` - basic editor styling
  - `@tiptap/extension-placeholder` - placeholder for empty editor
  - `sass` for editor styling
