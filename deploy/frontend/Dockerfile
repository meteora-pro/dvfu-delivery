FROM node:12 as builder
# Choose a workdir
WORKDIR /usr/src/app
# Copy sources
COPY package.json .
COPY .npmrc .
COPY angular.json .
COPY tools .
COPY decorate-angular-cli.js .
COPY nx.json .
COPY tsconfig.base.json .
COPY package-lock.json .
RUN npm ci

# Build app
RUN npm run build:frontend

COPY libs .
COPY apps/frontend .

FROM nginx:alpine

RUN mkdir -p /usr/frontend_app/www
WORKDIR /usr/frontend_app

# Copy custom configuration file from the current directory
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder dist/apps/frontend/ /usr/frontend_app/www/

EXPOSE 80
