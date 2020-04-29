1. 安装SVN
```
yum install -y subversion
```
2. 验证是否安装成功
```
svn --version
```
3. 创建版本库
```
vim /etc/sysconfig/svnserve
```
改```OPTIONS="-r /opt/svn"```
```
mkdir /opt/svn
svnadmin create /opt/svn/root
ls /opt/svn/root
 conf  db  format  hooks  locks  README.txt
```
4. 配置当前版本库
在conf中有
- svnserve.conf 配置文件
- passwd 用户名和密码
- authz 权限配置文件
5. 启动和关闭
```
systemctl start svnserve
```
或
```
svnserve -d -r /opt/svn/
```
```
ps aux|grep svn
kill -9 pid
```

```
svn://192.168.2.100/root
```