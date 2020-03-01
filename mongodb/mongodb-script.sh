#!/usr/bin/env bash

echo 'Creating MongoDB with user and db'

mongo ${MONGO_INITDB_DATABASE} \
        --host localhost \
        --port 27017 \
        -u ${MONGO_INITDB_ROOT_USERNAME} \
        -p ${MONGO_INITDB_ROOT_PASSWORD} \
        --authenticationDatabase admin \
        --eval "db.createUser({user: '${MONGO_USER}', pwd: '${MONGO_PASSWORD}', roles:[{role:'dbOwner', db: '${MONGO_INITDB_DATABASE}'}]});"

echo 'Connect to mongodb and create admin user for WebApp'

mongo ${MONGO_INITDB_DATABASE} -u ${MONGO_USER} -p ${MONGO_PASSWORD} \
        --eval "db.users.insert({ _id : ObjectId('5e5b929053d4ca0024f3323c'), email : '${ADMIN_USER}', password : '${ADMIN_PASSWORD}', activated : true});"





