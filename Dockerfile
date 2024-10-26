# Dockerfile
FROM node:18-alpine

# Install Python and other dependencies required by Serverless
RUN apk add --no-cache python3 py3-pip git curl bash
RUN pip3 install --upgrade pip
RUN pip3 install awscli

# Install Serverless Framework globally
RUN npm install -g serverless

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build TypeScript
RUN npm run build

# Expose port for serverless-offline
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
