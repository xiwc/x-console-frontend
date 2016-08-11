#!/bin/bash

git pull
npm install
npm run build:prod

mkdir -p ./dist/login
cp ./login/login.html ./dist/login/login.html
cp -r ./locale ./dist/

docker build -t 192.168.205.11:5000/x-console-frontend:test .

docker-compose up -d