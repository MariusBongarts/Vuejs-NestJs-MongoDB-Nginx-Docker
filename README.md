## Description
This Fullstack Skeleton provides a quick start for building Fullstack WebApps, it contains:


* VueJs Client (Typescript)
* NestJs Server
* MongoDB
* Docker Compose
* NGINX configuration


## Installation

### Development
```
$ docker-compose up
```

Go to http://localhost:8080

### Production

```
$ docker-compose -f docker-compose.prod.yml up -d --build
```

Go to http://localhost (nginx redirects the port 80 internally to 8080)

### Login Data

During the docker-compose build process a admin user is created to log into the WebApp within the client:

##### Username: admin@skeleton.de
##### Password: MariusBongarts
 

> Attention it is highly recommended to add *.env files to the **.gitignore** file to remove .env files from git


#### Steps in env-override files:

To make the start easier, .env files are inside of this Github repository. There are also env-override templates with steps to replace variables in case you want to add those .env files to gitignore.

  1. ./env-override
  2. ./client/env-override
  3. ./server/env-override

### Sign up new users 

You can create new users by creating them in the client.

> It is highly recommended to enable email activation in production mode. You have to set **createUserDto.activated to false** in the server´s users.service.ts and set your email configuration variables in the .env files


