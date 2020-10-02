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

COPY libs .
COPY apps/api .

# Build app
RUN npm run build:api

RUN npm prune --production

FROM node:12-alpine
ENV NODE_ENV=production
RUN mkdir -p /usr/api

WORKDIR /usr/api

COPY --from=builder /usr/src/app/ormconfig.js /usr/api
COPY --from=builder /usr/src/app/config/api /usr/api/config/api
COPY --from=builder /usr/src/app/dist/apps/api /usr/api
COPY --from=builder /usr/src/app/node_modules /usr/api/node_modules

CMD ["node", "./apps/api/main.js"]
EXPOSE 3000
