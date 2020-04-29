直接yum 安装的redis 不是最新版本

如果要安装最新的redis，需要安装Remi的软件源，官网地址：http://rpms.famillecollet.com/

```
yum install -y http://rpms.famillecollet.com/enterprise/remi-release-7.rpm

```

然后可以使用下面的命令安装最新版本的redis：
```
yum --enablerepo=remi install redis

```

