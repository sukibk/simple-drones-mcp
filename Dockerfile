FROM node:20-slim

WORKDIR /app

# Copy only package metadata first (for better Docker caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the code and build
COPY . .
RUN npm run build

CMD ["node", "dist/index.js"]
