查看所有打开的端口
```
firewall-cmd --zone=public --list-ports
```
添加
```
firewall-cmd --zone=public --add-port=80/tcp --permanent
// （--permanent永久生效，没有此参数重启后失效）
```
重新载入
```
firewall-cmd --reload
```
查看这个端口是否开放
```
firewall-cmd --zone=public --query-port=80/tcp
```
删除
```
firewall-cmd --zone= public --remove-port=80/tcp --permanent
```

只针对某个IP开放端口
```
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="115.236.29.210" port protocol="tcp" port="2018" accept"
```

拒绝某个IP对某个端口的连接
```
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.0.200" port protocol="tcp" port="80" reject"
```
恢复
```
firewall-cmd --permanent --add-rich-rule="rule family="ipv4" source address="192.168.0.200" port protocol="tcp" port="80" accept"
```

拒绝某个IP的所有端口的连接
```
firewall-cmd --permanent --add-rich-rule='rule family=ipv4 source address="123.44.55.66" drop'
```