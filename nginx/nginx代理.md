```
server {
  listen 443 ssl http2;
  ssl on;
  # 证书(一般为crt或pem格式)
  ssl_certificate cert/demo.crt;
  # 证书私钥
  ssl_certificate_key cert/demo.key;

  server_name demo.com;
  index index.html index.htm;

  root  e:/www/;
  access_log  logs/demo.access.log  main;
  error_log  logs/demo.error.log  notice;

  location / {
      index  index.html index.htm;
  }
  
  # 状态监控
  location /nginx_status {
  	stub_status on;
  	access_log on;
  }
}
```

强制跳转https
```
server {
  listen 80;
  server_name demo.com;
  rewrite ^(.*)$ https://$host$1 permanent;
}
```
