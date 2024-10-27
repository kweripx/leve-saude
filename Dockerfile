FROM node:18-alpine as base

# Install Python and other dependencies required by Serverless
RUN apk add --no-cache \
    python3 \
    py3-pip \
    git \
    curl \
    bash \
    jq \
    make \
    g++ \
    gcc \
    openssh

# Create and activate a virtual environment
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python packages in the virtual environment
RUN pip3 install --no-cache-dir --upgrade pip awscli

# Install Node.js packages globally
RUN npm install -g aws-sdk serverless@3.38.0 serverless-localstack

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Development stage
FROM base as development

# Copy application files, excluding node_modules
COPY . .
RUN rm -rf node_modules

# Install dependencies
RUN npm install --legacy-peer-deps

# Set environment variables
ENV AWS_ACCESS_KEY_ID=localstack
ENV AWS_SECRET_ACCESS_KEY=localstack
ENV AWS_DEFAULT_REGION=us-east-1
ENV NODE_ENV=development

RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:dev"]