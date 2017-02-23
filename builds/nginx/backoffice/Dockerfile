FROM nginx:alpine
MAINTAINER snappy.kop@gmail.com (http://snappytux.com)

RUN mkdir -p /etc/nginx/sites-available && mkdir -p /var/www/backoffice
ADD nginx.conf /etc/nginx/
COPY backoffice.conf /etc/nginx/sites-available/

RUN apk update \
    && apk upgrade \
    && apk add --no-cache bash \
    && adduser -D -H -u 1000 -s /bin/bash www-data \
    && rm /etc/nginx/conf.d/default.conf \
    && echo "upstream php-upstream { server backoffice-php:9000; }" > /etc/nginx/conf.d/upstream.conf
WORKDIR /var/www/backoffice
CMD ["nginx"]
EXPOSE 80 443