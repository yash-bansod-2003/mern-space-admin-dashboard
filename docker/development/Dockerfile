# Use the official Node.js Alpine image
FROM node:20-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]