# STEP: BUILD
FROM node:20.14.0-buster-slim as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# STEP: PRODUCTION
FROM node:20.14.0-buster-slim as production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/.env ./
RUN npm ci --only=production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3150
CMD npm start