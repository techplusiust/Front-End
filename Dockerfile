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

FROM node:22.13.0-slim AS build
WORKDIR /usr/local/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22.13.0-slim
WORKDIR /usr/local/app
RUN ls -la /usr/local/app/
COPY --from=build /usr/local/app/dist /usr/local/app/dist
EXPOSE 3000
CMD ["npm", "run", "start"]
