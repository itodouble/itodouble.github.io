安装方式1 yum 安装
```
# 安装yum源
yum install epel-release
# 安装aria2
yum -y install aria2
```

安装方式2 一键安装包
```
wget -N --no-check-certificate https://softs.fun/Bash/aria2.sh && chmod +x aria2.sh && bash aria2.sh

# 如果上面这个脚本无法下载，尝试使用备用下载：
wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/aria2.sh && chmod +x aria2.sh && bash aria2.sh

```
