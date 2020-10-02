FROM nginx:alpine

RUN mkdir -p /usr/frontend_app/www
WORKDIR /usr/frontend_app

# Copy custom configuration file from the current directory
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY dist/apps/frontend/ /usr/frontend_app/www/

EXPOSE 80
