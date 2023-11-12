# syntax=docker/dockerfile:1

# Define Node.js version
ARG NODE_VERSION=18.18.0

# Define Pnpm version
ARG PNPM_VERSION=8.9.2

# Use node image as the base image
FROM node:${NODE_VERSION}-alpine as base

# Set working directory
WORKDIR /backend

# Copy necessary files
COPY src ./src
COPY package.json .
COPY tsconfig.json .
COPY pnpm-lock.yaml .

# Install pnpm
RUN npm install -g pnpm@${PNPM_VERSION}

# Install dependencies for bcrypt, Python, and C++ (use python3 if you are targeting Python 3)
RUN apk add --update \
    python3 \
    make \
    g++

# Remove APK cache
RUN rm -rf /var/cache/apk/*

# Install Node.js dependencies
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Build the Node.js app
RUN pnpm build

# Expose port
EXPOSE 3001

# Set environment variables
ENV ALLOWED_ORIGINS=${ALLOWED_ORIGINS}
ENV DB_URI=${DB_URI}
ENV BUCKET_NAME=${BUCKET_NAME}
ENV BUCKET_GCP_ID=${BUCKET_GCP_ID}
ENV BUCKET_GCP_KEY_PATH=${BUCKET_GCP_KEY_PATH}
ENV BUCKET_S3_URI=${BUCKET_S3_URI}
ENV BUCKET_S3_KEY=${BUCKET_S3_KEY}
ENV BUCKET_S3_SECRET=${BUCKET_S3_SECRET}
ENV JWT_SECRET=${JWT_SECRET}
ENV PORT=${PORT}

# Run the app
CMD pnpm start
