拉取官方centos镜像
```
docker pull centos
```
以允许使用systemctl方式启动该镜像
```
docker run --privileged=true -d -name testcentos centos /usr/sbin/init
```
安装必要的服务或软件
```
yum -y install openssh-server openssh-clients
# 启动
systemctl start sshd
# 设置开机启动
systemctl enable sshd
```
安装passwd如果没有的话
```
yum install passwd
```
修改root密码
```
passwd root
```
退出容器 提交镜像以便后续使用
```
docekr commit testcentos mycentos:0.1
```
停止刚才制作镜像时创建的容器并删除
```
docker stop testcentos
docker rm testcentos
```
启动新的容器 映射端口
```
docker run -it -d --privileged=true --name testcentos -p223:22 mycentos:0.1 init
```