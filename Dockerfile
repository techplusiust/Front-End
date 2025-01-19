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

