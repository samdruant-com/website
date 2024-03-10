# syntax=docker/dockerfile:1

# Define Node.js version
ARG NODE_VERSION=18.18.0

# Use node image as the base image
FROM node:${NODE_VERSION}-alpine as base

# Set working directory
WORKDIR /server

COPY package.json .
COPY pnpm-lock.yaml .

# Install pnpm
ARG PNPM_VERSION=8.9.2
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
COPY . .
RUN pnpm build

# Expose port
EXPOSE 5000

# Run the app
CMD pnpm start
