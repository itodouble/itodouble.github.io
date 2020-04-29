```
now_data=`date "+%Y-%m-%d"`
database_name=ldsmmsv2
backup_dir=/data/backup/mysql/${database_name}.${now_data}.sql
src_host=192.168.2.5
src_uname=root
src_pwd=root1234
src_port=3306
dst_host=127.0.0.1
dst_uname=root
dst_pwd=root1234
dst_port=4399

echo "开始备份.......`date '+%Y-%m-%d %H:%M:%S'` "
mysqldump -h${src_host} -u${src_uname} -p${src_pwd} -P ${src_port} -q -e ${database_name} --events --triggers > ${backup_dir}
mysql -h${dst_host} -u${dst_uname} -p${dst_pwd} -P ${dst_port} ${database_name} < ${backup_dir}

echo "备份结束.......`date '+%Y-%m-%d %H:%M:%S'` "
```