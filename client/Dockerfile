FROM node:17-alpine

COPY "./"  "/var/www/app"

WORKDIR "/var/www/app"

RUN npm install

RUN npm run build

WORKDIR "/var/www/app/build"

EXPOSE 80