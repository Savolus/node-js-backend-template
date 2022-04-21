FROM --platform=arm64 node:lts-alpine

WORKDIR /usr/app/

COPY package*.json tsconfig*.json nodemon.json ./
COPY src/ ./src/

RUN npm ci
