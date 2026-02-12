FROM node:25.6.1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY config/ ./config/
COPY public/ ./public/
COPY src/ ./src/
COPY types/ ./types/
COPY favicon.png ./
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Define build arguments (with defaults) and set environment variables
ARG HOST=0.0.0.0
ENV HOST=$HOST
ARG DATABASE_CLIENT=sqlite
ENV DATABASE_CLIENT=$DATABASE_CLIENT

# Create an entrypoint script that starts up the application based on the NODE_ENV variable
RUN echo '#!/bin/sh\n\
if [ "$NODE_ENV" = "production" ]; then\n\
  npm start\n\
else\n\
  npm run dev\n\
fi' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Set the default environment variable for NODE_ENV
ENV NODE_ENV=production

# Expose the port the app runs on
ARG PORT=1337
EXPOSE $PORT

# Set user to run the application and give them permissions to the app directory
RUN chown -R node:node /app
# The 'node' user in the official Node.js image has UID 1000
USER node

# Start the application
ENTRYPOINT ["/app/entrypoint.sh"]
