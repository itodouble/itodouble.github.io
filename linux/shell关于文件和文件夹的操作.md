#### 判断文件夹是否存在 不存在则创建
```
#!/bin/bash
BACK_DIR="/opt/backup"
if [ ! -d "$BACK_DIR" ] ; then
        mkdir "$BACK_DIR"
fi
```
> 注意: 'if'和'[]'之前要有空格, '-d'和前面的'!'之间也要有空格, 如若想删除把mkdir换为'rm -rf',touch是创建文件


1. -f判断文件是否存在
2. -x判断文件或文件夹是否具有可执行权限
3. -d判断文件夹是否存在
4. -n判断文件中是否有内容

```
# 获取文件的行数
wc -l
```
例如:
```
cat /root/test.txt | wc -l
ps aux|grep httpd | wc -l
```