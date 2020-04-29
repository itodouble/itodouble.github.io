#### 是否已经配置swap交换空间 可以设置多个 一般一个就够了

如果没有返回结果则表示没有配置过swap
```
swapon -s
```

#### 检查可用空间
```
df -h
```

#### 创建swap文件
```
fallocate -l 4G /swapfile
```

#### 启用swap文件
```
# 赋予权限
chmod 600 /swapfile
# 告知系统该文件用于swap
mkswap /swapfile
# 开始使用swap
swapon /swapfile
# 确认是否已经生效
swapon -s
free -h
```

#### 使swap文件永久生效
```
vim /etc/fstab
```
末尾增加
```
/swapfile   swap    swap    sw  0   0
```

#### 更改swap配置
##### swappiness
swappiness参数决定了从内存交换到swap空间的频率 数值在0-100

越接近0 系统越不进行swap 仅在必要的时候进行swap操作,越接近100 系统越倾向于多进行swap

查看当前swappiness数值
```
cat /proc/sys/vm/swappiness
```
临时修改swappiness
```
sysctl vm.swappiness=10
```
永久生效
```
vim /etc/sysctl.conf
# 最后一行增加或修改
vm.swappiness = 10
```