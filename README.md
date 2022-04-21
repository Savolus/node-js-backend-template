# Template for Node.js Backend application

This is template to quick start developing process of developing Node.js backend application with next stack:

- TypeScript
- Express.js
- MongoDB (Mongoose)
- Socket.io (Potential)

## Start

In this section contains information how to build application for the first time

Firstly you need to install all dependencies with clean-install

```bash
npm ci
```

Secondarly you need to create `.env` file and build Docker containers

```bash
cat .env.example > .env

docker-compose up --build
```

## Next runs

In this section contains information how to run application after building for the first time

Just up the Docker containers

```bash
docker-compose up
```
