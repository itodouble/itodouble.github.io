```
#!/bin/bash
#
# 描述:定时切割mysql的慢查询日志
#
#

mv /opt/mysql/data/*-slow.log /opt/mysql/logs/slow-`date +%F`.log
mysql -h172.18.0.2 -P3308 -p****** -e "flush slow logs;"
```