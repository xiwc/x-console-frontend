FROM 192.168.205.11:5000/nginx:stable-alpine

COPY ./dist /etc/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
