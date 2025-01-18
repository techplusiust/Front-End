#FROM node:22.13.0-slim AS build
#WORKDIR /usr/local/app
#COPY package.json package-lock.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#FROM nginx:1.23.4-alpine
#COPY --from=build /usr/local/app/dist /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# FROM node:22.13.0-slim AS build
# WORKDIR /usr/local/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:22.13.0-slim
# WORKDIR /usr/local/app
# RUN ls -la /usr/local/app/
# COPY --from=build /usr/local/app/dist /usr/local/app/dist
# EXPOSE 3000
# CMD ["npm", "run", "start"]

# Build React App
FROM node:20-alpine as build

WORKDIR /app

# Install dependencies
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

RUN pnpm install

# Copy the local source code to the container
COPY . .

# Build the React application
RUN pnpm run build

# # Nginx server setup
FROM nginx:alpine

# # Copy build artifacts from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# # Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
# CMD ["pnpm", "open"]

