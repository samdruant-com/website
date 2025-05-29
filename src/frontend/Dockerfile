FROM node:22.16.0-slim

WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copy the rest of the application code
COPY assets/ ./assets/
COPY components/ ./components/
COPY composables/ ./composables/
COPY layouts/ ./layouts/
COPY locales/ ./locales/
COPY middleware/ ./middleware/
COPY pages/ ./pages/
COPY plugins/ ./plugins/
COPY public/ ./public/
COPY server/ ./server/
COPY stores/ ./stores/
COPY types/ ./types/
COPY .npmrc .
COPY app.vue .
COPY nuxt.config.ts .
COPY tailwind.config.ts .
COPY tsconfig.json .

# Build the application
RUN npm run build

# Set node user for security
RUN chown -R node:node /app
USER node

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD [ "node", ".output/server/index.mjs" ]
