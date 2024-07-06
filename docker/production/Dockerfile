# Use the official Node.js image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /build

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci 

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Use a smaller base image for production
FROM node:20-alpine AS runner

# Set environment variables
ENV NODE_ENV=production

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /build/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy only the necessary files from the build stage
COPY --from=builder /build/dist ./dist

# Install serve it will helps to serve a single page application
RUN npm i -g serve

# Expose the port your application will run on
EXPOSE 4173

# Start the application
CMD [ "serve", "-s", "dist" , "-p" , "4173"]