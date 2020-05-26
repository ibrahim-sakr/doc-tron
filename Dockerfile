########################
## STAGE 0 as builder ##
########################

# from node:14.3.0-alpine3.10
FROM node:14.3.0-alpine3.10 AS builder

# env development
ENV NODE_ENV=development

# Create Directory for the Container
WORKDIR /usr/app

# copy package.json
COPY package.json .

# npm install
RUN npm install

# copy all other files
ADD . /usr/app

# npm build
RUN npm run build

###########################
## STAGE 1 as production ##
###########################
# from node:14.3.0-alpine3.10
FROM node:14.3.0-alpine3.10

# env production
ENV NODE_ENV=production
ENV APP_URL=127.0.0.1
ENV APP_PORT=3000
ENV MYSQL_USERNAME=root
ENV MYSQL_PASSWORD=toor
ENV MYSQL_HOST=127.0.0.1
ENV MYSQL_PORT=27017
ENV MYSQL_DATABASE=doc_tron
ENV SCHEDULER_INTERVAL=5000
ENV SCHEDULER_COEFFICIENT="[3, 3]"

# Create Directory for the Container
WORKDIR /usr/app

# from builder copy dist files
COPY --from=builder /usr/app/dist .

# npm start
CMD ["node", "src/index.js"]

EXPOSE 3000
