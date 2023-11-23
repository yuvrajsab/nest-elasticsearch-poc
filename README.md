# Nest Elasticsearch POC

This is a proof of concept showcasing the integration of NestJS with Elasticsearch.

## Postman collection

You can find Postman collection in this repo: `/elastictuts.postman_collection.json`.

Just download this file and import it in you Postman.

## Installation

### Pre-requisite

- Node 16
- Yarn 1
- Docker
- Docker compose

### Start services

Start the services that the project needs in-order to run.

```bash
docker-compose -f docker-compose.yml up -d
```

Give directory permission for Elasticsearch and Kibana.

```bash
sudo chown 1000:1000 -R ./elastic-data
sudo chown 1000:1000 -R ./kibana-data
```

### Install project dependencies

```bash
yarn install
```

### Create environment file

```bash
cp .env.sample .env
```

### Migrate database

```bash
yarn prisma migrate dev
```

### Start the app

```bash
yarn start
# or in watch mode `yarn start:dev`
```

### Stop the services

```bash
docker-compose -f docker-compose.yml down
```
