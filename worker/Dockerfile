
# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies (including devDependencies, since you need TypeScript)
RUN npm install

# Copy the rest of the application code (including the "src" folder)
COPY . .

# Define the command to run your app
CMD ["npm", "start"]
