ARG NODE_VERSION=18.18.0
FROM node:${NODE_VERSION}

WORKDIR /app

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

ARG PNPM_VERSION=8.9.2
RUN npm install -g pnpm@${PNPM_VERSION}

RUN pnpm install --shamefully-hoist --frozen-lockfile

COPY app.vue /app/app.vue
COPY nuxt.config.ts /app/nuxt.config.ts
COPY tsconfig.json /app/tsconfig.json
COPY assets /app/assets
COPY components /app/components
COPY composables /app/composables
COPY layouts /app/layouts
COPY locales /app/locales
COPY pages /app/pages
COPY plugins /app/plugins
COPY public /app/public
COPY stores /app/stores
COPY types /app/types

RUN pnpm build

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
