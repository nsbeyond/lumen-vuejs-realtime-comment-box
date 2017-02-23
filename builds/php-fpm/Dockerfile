FROM php:7-fpm-alpine
MAINTAINER snappy.kop@gmail.com (http://snappytux.com)

ENV DEV_DEPS libc-dev \
    readline-dev \
    libxml2-dev \
    curl-dev \
    openssl-dev \
    db-dev \
    enchant-dev \
    expat-dev \
    freetds-dev \
    gdbm-dev \
    gettext-dev \
    libevent-dev \
    libgcrypt-dev \
    libxslt-dev \
    unixodbc-dev \
    zlib-dev \
    krb5-dev \
    libical-dev \
    freetype-dev \
    libpng-dev \
    libjpeg-turbo-dev
ENV BUILD_DEPS build-base \
    git \
    autoconf \
    gcc \
    file \
    binutils \
    bison \
    freetype \
    libpng \
    libjpeg-turbo \
    libmcrypt-dev \
    cyrus-sasl \
    cyrus-sasl-dev \
    libmemcached \
    libmemcached-dev
    
RUN apk update && apk upgrade

RUN apk add --no-cache $BUILD_DEPS $DEV_DEPS

# Install the PHP mcrypt extention
RUN docker-php-ext-install mcrypt

# Install the PHP pdo_mysql extention
RUN docker-php-ext-install pdo_mysql
# Install the PHP pdo_pgsql extention
#RUN docker-php-ext-install pdo_pgsql
# Install the PHP gd library
RUN docker-php-ext-configure gd \
    --with-gd \
    --with-freetype-dir=/usr/include/ \
    --with-png-dir=/usr/include/ \
    --with-jpeg-dir=/usr/include/ && \
    NPROC=$(grep -c ^processor /proc/cpuinfo 2>/dev/null || 1) && \
    docker-php-ext-install -j${NPROC} gd 

RUN git clone -b php7 https://github.com/php-memcached-dev/php-memcached /usr/src/php/ext/memcached \
    && docker-php-ext-configure /usr/src/php/ext/memcached \
        --disable-memcached-sasl \
    && docker-php-ext-install /usr/src/php/ext/memcached \
    && rm -rf /usr/src/php/ext/memcached


# Install Composer
ENV COMPOSER_VERSION 1.2.1
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --version=${COMPOSER_VERSION}

# Config php-fpm
ADD ./laravel.ini /usr/local/etc/php/conf.d
ADD ./laravel.pool.conf /usr/local/etc/php-fpm.d/

# clean up
RUN apk del $DEV_DEPS \
    && rm -fr /var/cache/apk/* \
    && rm -fr /tmp/*

WORKDIR /var/www/
CMD ["php-fpm"]
EXPOSE 9000