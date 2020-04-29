### http
```
upstream quit_member  {
    # 有时候启动报错 是因为"_"
    server 127.0.0.1:9200;
}

server {
    listen  80;
    listen  [::]:80;
    server_name member.com;
    
    large_client_header_buffers 4 16k;
    charset utf-8;
    access_log  D:/nginx-1.14.2/logs/quit.member.access.log   main;
    error_log D:/nginx-1.14.2/logs/quit.member.error.log;

    location / {
        proxy_pass  http://quit_member;
        proxy_redirect     off;
        # 设置 http header中的信息
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;
        proxy_connect_timeout      90;
        proxy_send_timeout         90;
        proxy_read_timeout         90;
        proxy_buffer_size          64k;
        proxy_buffers              32 32k;
        proxy_busy_buffers_size    64k;
        proxy_temp_file_write_size 64k;
    }
    
}
```

### https
```
upstream wiz-9008 {
    server 127.0.0.1:9008;
}
server {
    listen 80;
    server_name wiz.deeeper.top;
    rewrite ^(.*)$ https://wiz.deeeper.top;
}
server {
    listen  443 ssl;
    server_name wiz.deeeper.top;
    large_client_header_buffers 4 16k;
    charset utf-8;
    access_log /data/logs/nginx/wiz.access.log main;
    error_log /data/logs/nginx/wiz.error.log;

    ssl_certificate /etc/ssl/wiz-deeeper.top-cert.pem;
    ssl_certificate_key /etc/ssl/wiz-deeeper.top-key.pem;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers HIGH:!aNULL:!MD5:!EXP;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;


    location / {
        add_header Content-Security-Policy upgrade-insecure-requests;
        proxy_pass http://wiz-9008;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header x-wiz-real-ip $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;

        client_max_body_size 10m;
        if ($ssl_protocol = "") {
            return 301 https://$host$request_uri;
        }
    }
}

```
