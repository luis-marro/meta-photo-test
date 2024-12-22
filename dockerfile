# Stage 1: Build
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Compile TypeScript to JavaScript
COPY tsconfig.json .
COPY src ./src
RUN npm run build

# Stage 2: Production
FROM node:18 AS production

# Set working directory
WORKDIR /app

# Copy only the compiled output and dependencies from the build stage
COPY --from=build /app/dist /app/dist
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port for Cloud Run (default 8080)
ENV PORT=8080
EXPOSE 8080

# Run the application (use dynamic port from $PORT)
CMD ["node", "dist/server.js"]
