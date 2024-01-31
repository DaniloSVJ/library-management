# Use the official Node.js image as base
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which your application will run
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
