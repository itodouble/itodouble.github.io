
生成密码
```
#安装生成密码工具
yum install httpd-tools
 
#第一次生成密码并且保存到指定文件
htpasswd -bc /data/yaaw-master/passwd admin lc123456
 
#之后添加用户和密码不需要-c参数
htpasswd -b /data/yaaw-master/passwd root 123456

```


nginx配置
```
server {
    # 监听端口 
    listen 60003;
 
    #这里是验证时的提示信息
    auth_basic "input password";
    #密码校验路径
    auth_basic_user_file /data/yaaw-master/passwd;
 
 
    # 项目的初始化页面
    location / {
       root  /data/yaaw-master/;
       index index.html;
    }
}
```