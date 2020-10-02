FROM node:12 as builder
# Choose a workdir
WORKDIR /usr/src/app
# Copy sources
COPY package.json .
COPY package-lock.json .
COPY .npmrc .
COPY angular.json .
COPY tools .
COPY decorate-angular-cli.js .
COPY nx.json .
COPY tsconfig.base.json .

RUN npm ci

COPY libs /usr/src/app/libs
COPY apps/frontend /usr/src/app/apps/frontend

# Build app
RUN npm run build:frontend

FROM nginx:alpine

RUN mkdir -p /usr/frontend_app/www
WORKDIR /usr/frontend_app

# Copy custom configuration file from the current directory
COPY ./deploy/frontend/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/app/dist/apps/frontend/ /usr/frontend_app/www/

EXPOSE 80
