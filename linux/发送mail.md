```
yum install sendmail
```

```
vim /etc/mail.rc

set from=123@163.com
set smtp=smtp.163.com
set smtp-auth-password=客户端授权码
set smtp-auth-user=123
set smtp-auth=login
```


- from：发送的邮件地址，对方显示的发件人
- smtp：发送的外部smtp服务器的地址
- smtp-auth-user：外部smtp服务器认证的用户名
- smtp-auth-password：外部smtp服务器认证的用户密码
- smtp-auth：邮件认证的方式

```
echo "hello,this is the content of mail.welcome to 222.top" | mail -s "Hello from 123.top by 333" 123@163.com
```
```
#!/bin/bash
#### 发送邮件
CENTENT=$(cat /root/test.txt)
echo $CENTENT | mail -s "一定要成功!"  222@163.com
```