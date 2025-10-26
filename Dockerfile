
######################################################################################################
#############################           STAGE 1: INSTALL DEPENDENCIES            #####################
######################################################################################################

FROM node:24.10.0-alpine AS deps

# Set working directory.
WORKDIR /app

# Copy only package files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile


######################################################################################################
#############################                  STAGE 2: RUN APP                 ######################
######################################################################################################

FROM node:24.10.0-alpine AS production

# Set working directory
WORKDIR /app

# Use built-in node user for security and best practices.
USER node

# Copy only necessary files from builder with correct ownership.
COPY --from=deps --chown=node:node /app/package.json ./
COPY --from=deps --chown=node:node /app/pnpm-lock.yaml ./
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node ./src ./src

# Define environment variables.
# Avoid issues with internal ips on health checks and binding.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Expose the port the app runs on.
EXPOSE 3000

# Add a health check to ensure the application is running.
# NOTE: We use wget instead of curl to keep the image size smaller. 
HEALTHCHECK --interval=20s --timeout=2s --start-period=1s --retries=3 CMD wget -q --spider http://127.0.0.1:3000 || exit 1

# Start the application directly with node for production.
CMD ["node", "src/index.js"]
