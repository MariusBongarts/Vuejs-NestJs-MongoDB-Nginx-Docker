## Description
Fullstack Starter Skeleton

VueJs Client + NestJs Server + MongoDB + Nginx

## Installation

Because we do not want to add our .env files to git we have to create the .env files by replacing necessary variables in the given env-overrides templates.

### Follow steps in env-override files:
  1. ./env-override
  2. ./client/env-override
  3. ./server/env-override

## Development
```bash
$ docker-compose up
```

## Production

```bash
$ docker-compose -f docker-compose.prod.yml up -d --build
```
