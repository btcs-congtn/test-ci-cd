# Nest Boilerplate

## Description

- prisma - next gen DB ORM
- config .env
- auto validation
- API versioning
- swagger - OPENAPI docs generate
- helmet - security HTTP header
- cors

## Installation

```bash
$ yarn install
```

### Setup local db on Docker [optional]

1. Create and edit .env `cp .env.example .env`

Edit postgres user

```
# for docker compose
POSTGRES_USER="local_user"
POSTGRES_PASSWORD="local12345"
POSTGRES_DB="localdb"
```

2. Run docker compose

```bash
$ docker compose up -d
```

When you want to drop dockers, run a command below

```bash
$ docker compose down
```

### Edit variables in .env

Make sure you have changed ENVIRONMENT VARIABLES in .env

### Setup Prisma Client API

> View [Prisma - DB ORM](#prisma---db-orm) below for more information

```bash
$ npx prisma generate
```

## Running the app

1. Start server

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

2. Access to server

- API endpoint: http://localhost:3000/v1/users
- API docs: http://localhost:3000/api

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Prisma - DB ORM

### Generate Prisma Client - [Prisma doc](https://www.prisma.io/docs/concepts/components/prisma-client)

You have to run `npx prisma generate` or `npx prisma migrate dev` _after you clone this repo_ to generate your Prisma Client API.

> You have to config `DATABASE_URL` in .env before run prisma command

You will change DB schema by make changes to Prima schema file `prisma/schema.prisma`.

Whenever you make changes to your Prisma schema in the future, you manually need to invoke prisma generate in order to accomodate the changes in your Prisma Client API.

```bash
$ npx prisma generate
```

### Migrate - [Prisma doc](https://www.prisma.io/docs/concepts/components/prisma-migrate)

After changed prisma schema, you will use Prisma Migrate to update the tables in database.

> Note: generate is called under the hood by default, after running prisma migrate dev.

```bash
// migrate db
$ npx prisma migrate dev --name 'add user table'
```

### Prisma Studio - [Prisma doc](https://www.prisma.io/docs/concepts/components/prisma-studio)

Prisma Studio is a visual editor for the data in your database. Note that Prisma Studio is not open source but you can still create issues in the prisma/studio repo.

```bash
$ npx prisma studio
```
