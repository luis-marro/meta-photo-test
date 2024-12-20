# Stage 1: Build
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Ensure TypeScript is installed globally (optional but helpful)
RUN npm install -g typescript

# Copy the TypeScript configuration and source code
COPY tsconfig.json .
COPY src ./src

# Compile TypeScript to JavaScript
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

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["node", "dist/server.js"]
