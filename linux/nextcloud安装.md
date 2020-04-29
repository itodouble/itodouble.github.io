获取nextcloud
```
wget https://download.nextcloud.com/server/releases/nextcloud-15.0.0.zip
unzip nextcloud-15.0.0.zip
mv nextcloud /data/www/
cd /data/www/
# 为NextCloud创建文件储存文件夹，并授予一定的权限
mkdir -p nextcloud/data
chown nginx:nginx -R nextcloud/
# 手动指定文件储存位置
```

安装php
```
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm

yum -y install php72w-fpm php72w-cli php72w-gd php72w-mcrypt php72w-mysql php72w-pear php72w-xml php72w-mbstring php72w-pdo php72w-json php72w-pecl-apcu php72w-pecl-apcu-devel
```

安装nginx
```
rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm

yum install nginx
```
nginx配置
nextcloud.conf
```
upstream php-handler {
    server 127.0.0.1:9000;
}


server {
    listen       81;
    server_name  192.168.2.100;

    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Robots-Tag none;
    add_header X-Download-Options noopen;
    add_header X-Permitted-Cross-Domain-Policies none;

    root /data/www/nextcloud;
    
    location = /robots.text {
        allow all;
        log_not_found off;
        access_log off;
    }

    location = /.well-know/carddav {
        return 301 $scheme://$host/remote.php/dav;
    }       
            
    location = /.well-know/caldav {
        return 301 $scheme://$host/remote.pgp/dav;
    }      

    # 最大上传
    client_max_body_size 512M;
    fastcgi_buffers 64 4K; 
    
    # 压缩
    gzip on;
    gzip_vary on; 
    gzip_comp_level 4;
    gzip_min_length 256;
    gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;
    gzip_types application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json application/vnd.ms-fontobject application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/bmp image/svg+xml image/x-icon text/cache-manifest text/css text/plain text/vcard text/vnd.rim.location.xloc text/vtt text/x-component text/x-cross-domain-policy;

    location / {
        rewrite ^ /index.php$uri;
    }

    location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)/ {
        deny all;
    }

    location ~ ^/(?:\.|autotest|occ|issue|indie|db_|console) {
        deny all;
    }

    location ~ ^/(?:index|remote|public|cron|core/ajax/update|status|ocs/v[12]|updater/.+|ocs-provider/.+)\.php(?:$|/){
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
        fastcgi_param HTTPS on;
        fastcgi_param modHeadersAvailable true;
        fastcgi_param front_controller_active true;
        fastcgi_pass php-handler;
        fastcgi_intercept_errors on;
        fastcgi_request_buffering off;
    }

    location ~ ^/(?:updater|ocs-provider)(?:$|/) {
        try_files $uri/ =404;
        index index.php;
    }

    location ~ \.(?:css|js|woff|svg|gif)$ {
        try_files $uri /index.php$uri$is_args$args;
        add_header Cache-Control "public, max-age=15778463";
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Robots-Tag none;
        add_header X-Download-Options noopen;
        add_header X-Permitted-Cross-Domain-Policies none;
        access_log off;
    }

    location ~ \.(?:png|html|ttf|ico|jpg|jpeg)$ {
        try_files $uri /index.php$uri$is_args$args;
        access_log off;
    }
}
``

安装配置mysql
