## Description
This Fullstack Skeleton should provides a quick start to start building a WebApp:

* VueJs Client 
* NestJs Server
* MongoDB
* Docker Compose
* NGINX configuration

## Installation

Because we do not want to add our .env files to git we have to create the .env files by replacing necessary variables in the given env-overrides templates.

### Follow steps in env-override files:
  1. ./env-override
  2. ./client/env-override
  3. ./server/env-override

## Development
```
$ docker-compose up
```

## Production

```
$ docker-compose -f docker-compose.prod.yml up -d --build
```
