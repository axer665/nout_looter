FROM php:8.0-fpm
#FROM php:8.0-zts

 #Copy composer.lock and composer.json
#COPY  ./composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl 

RUN docker-php-ext-install pdo pdo_mysql

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
#    install-php-extensions mbstring pdo_mysql zip exif pcntl gd
    
#RUN pecl install parallel

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

#Installing node 17.x
RUN curl -sL https://deb.nodesource.com/setup_17.x| bash -
RUN apt-get install -y nodejs

#Include ReactJS
#RUN composer create-project laravel/laravel react-js
#RUN composer require laravel/ui
#RUN php artisan ui react
#RUN npm install
#RUN npm install redux
#RUN npm install @reduxjs/toolkit
#RUN npm install react-router-dom
#RUN npm install babel-cli@6 babel-preset-react-app

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

RUN chown -R www:www /var/www
# Copy existing application directory contents
#COPY ./src/. /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

#RUN composer install --no-scripts --no-autoloader

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
