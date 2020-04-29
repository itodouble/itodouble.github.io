#### 负载均衡的作用
##### 1. 转发功能
按照一定的算法【权重、轮询】，将客户端请求转发到不同应用服务器上，减轻单个服务器压力，提高系统并发量。
##### 2. 故障移除
通过心跳检测的方式，判断应用服务器当前是否可以正常工作，如果服务器期宕掉，自动将请求发送到其他应用服务器。
##### 3. 恢复添加
如检测到发生故障的应用服务器恢复工作，自动将其添加到处理用户请求队伍中。

![](http://markdown.itodouble.top/20200429204543.png)



#### Nginx实现负载均衡
同样使用两个tomcat模拟两台应用服务器，端口号分别为8080 和8081
##### 1. Nginx的负载分发策略
Nginx 的 upstream目前支持的分配算法:
###### 1.轮询 ——1：1 轮流处理请求（默认）
每个请求按时间顺序逐一分配到不同的应用服务器，如果应用服务器down掉，自动剔除，剩下的继续轮询。 
###### 2. 权重 ——you can you up
通过配置权重，指定轮询几率，权重和访问比率成正比，用于应用服务器性能不均的情况。 
###### 3. ip_哈希算法
每个请求按访问ip的hash结果分配，这样每个访客固定访问一个应用服务器，可以解决session共享的问题

##### 2. 配置Nginx的负载均衡与分发策略
通过在upstream参数中添加的应用服务器IP后添加指定参数即可实现，如：
```
    upstream tomcatserver1 {  
    server 192.168.72.49:8080 weight=3;  
    server 192.168.72.49:8081;  
}
  
server {  
    listen       80;  
    server_name  8080.max.com;  
    #charset koi8-r;  
    #access_log  logs/host.access.log  main;  
    location / {  
        proxy_pass   http://tomcatserver1;  
        index  index.html index.htm;  
    }  
 }  
```
通过以上配置，便可以实现，在访问8080.max.com这个网站时，由于配置了proxy_pass地址，所有请求都会先通过nginx反向代理服务器，在服务器将请求转发给目的主机时，读取upstream为 tomcatsever1的地址，读取分发策略，配置tomcat1权重为3，所以nginx会将大部分请求发送给49服务器上的tomcat1，也就是8080端口；较少部分给tomcat2来实现有条件的负载均衡，当然这个条件就是服务器1、2的硬件指数处理请求能力

#### nginx其他配置
```
upstream myServer {    
  
    server 192.168.72.49:9090 down;   
    server 192.168.72.49:8080 weight=2;   
    server 192.168.72.49:6060;   
    server 192.168.72.49:7070 backup;   
}  
```
1）down

    表示单前的server暂时不参与负载

2）Weight

    默认为1.weight越大，负载的权重就越大。

3）max_fails

    允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误

4）fail_timeout

    max_fails 次失败后，暂停的时间。

5）Backup

    其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。
    

使用Nginx的高可用 

      除了要实现网站的高可用，也就是提供n多台服务器用于发布相同的服务，添加负载均衡服务器分发请求以保证在高并发下各台服务器能相对饱和的处理请求。同样，负载均衡服务器也需要高可用，以防如果负载均衡服务器挂掉了，后面的应用服务器也紊乱无法工作。

     实现高可用的方案：添加冗余。添加n台nginx服务器以避免发生上述单点故障。具体方案详见下文：keepalive+nginx实现负载均衡高可用