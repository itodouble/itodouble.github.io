安装wget 如果有不需要
```
yum install wget
```
备份源
```
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```
```
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
wget -P /etc/yum.repos.d/ http://mirrors.aliyun.com/repo/epel-6.repo
```
