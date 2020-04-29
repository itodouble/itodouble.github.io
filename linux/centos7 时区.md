```bash
# 列出所有时区
timedatectl list-timezones

# 将硬件时钟调整为与本地时钟一致, 0 为设置为 UTC 时间
timedatectl set-local-rtc 1

#设置系统时区为上海
timedatectl set-timezone Asia/Shanghai

yum -y install ntp
# 通过阿里云时间服务器校准时间
ntpdate ntp1.aliyun.com
```

如果重启后失效

```vi /etc/sysconfig/clock```
```
ZONE="Asia/Shanghai"
UTC=false                          #设置为false，硬件时钟不于utc时间一致
ARC=false
```
linux的时区设置为上海时区
```
ln -sf /usr/share/zoneinfo/Asia/Shanghai   /etc/localtime
```
对准时间
```
ntpdate ntp1.aliyun.com
```
设置硬件时间和系统时间一致并校准
```
yum install ntp #安装ntp服务器
/sbin/hwclock --systohc  
```