Memcached启动
```
/usr/local/memcached/bin/memcached -d -m 10m -p 11211 -u root  
```
启动参数说明：
-d选项是启动一个守护进程，

-m是分配给Memcache使用的内存数量，单位是MB，这里是10MB，

-u是运行Memcache的用户，这里是root，

-l是监听的服务器IP地址，如果有多个地址的话，这里指定了服务器的IP地址192.168.0.200，

-p是设置Memcache监听的端口，这里设置了12000，最好是1024以上的端口，

-c选项是最大运行的并发连接数，默认是1024，这里设置了256，按照服务器的负载量来设定，

-P是设置保存Memcache的pid文件，我这里是保存在 /tmp/memcached.pid，也可以启动多个守护进程，不过端口不能重复。

Memcached配置日志
```
/usr/local/memcached/bin/memcached -d -m 2048 -p $1 -u root -vv >> /tmp/memcached.log 2>&1 
```