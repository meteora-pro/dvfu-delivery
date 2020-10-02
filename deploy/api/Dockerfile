FROM node:12 as builder
# Choose a workdir
WORKDIR /usr/src/app
# Copy sources
COPY ../../apps/api/package.json .
COPY .npmrc .
COPY package-lock.json .
RUN npm ci
COPY api .
# Build app
RUN npm run build

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
