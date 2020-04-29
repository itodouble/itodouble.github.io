获取某个进程的pid
```
ps -ef | grep "tomcat-pc" | grep -v grep | awk '{print $2}'

pid=$(ps -ef | grep "tomcat-pc" | grep -v grep | awk '{print $2}')
```