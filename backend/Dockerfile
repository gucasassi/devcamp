# Base stage for installing pnpm
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Stage 1: Build Environment
FROM base AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install project dependencies
RUN pnpm install

# Copy all project files into the container
COPY . .

# Build the project here if necessary
# RUN pnpm build

# Stage 2: Runtime Environment
FROM base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy over the built files and installed dependencies from the builder stage
COPY --from=builder /usr/src/app .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "main.js"]
