ARG NODE_VERSION=18.18.0
FROM node:${NODE_VERSION}

WORKDIR /app

COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

ARG PNPM_VERSION=8.9.2
RUN npm install -g pnpm@${PNPM_VERSION}

RUN pnpm install --shamefully-hoist --frozen-lockfile

COPY . .
RUN pnpm build

ENV NUXT_PUBLIC_BASE_URL=${NUXT_PUBLIC_BASE_URL}

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
