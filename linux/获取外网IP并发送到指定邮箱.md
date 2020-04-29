```
#!/bin/bash
#
# 获取外网IP
# 发送到指定邮箱
#
api_url="icanhazip.com";
save_file=/opt/logs/ip_public/now_ip.txt
log_dir=/opt/logs/ip_public/
now_time=`date "+%Y-%m-%d %H:%M:%S"`
now_date=`date "+%Y-%m-%d"`
log_file=$log_dir"ip_"$now_date".log"
receive_mails="123e@163.com 234@qq.com"
receive_mail_subject="主机外网IP改变"
old_ip=(`cat $save_file`)
new_ip=(`curl -B -s -L $api_url`)

if [[ $old_ip == $new_ip || -z "$new_ip" ]] ; then
    echo "" >> $log_file
    echo "当前时间:"$now_time >> $log_file
    echo "IP未改变"$old_ip",查询的IP为:"$new_ip >> $log_file
else
    echo "" >> $log_file
    echo "当前时间:"$now_time >> $log_file
    echo "IP改变 旧IP"$old_ip"  新IP"$new_ip >> $log_file
    mail_content="新的IP为:"$new_ip",原来IP为:"$old_ip
    receive_mail_subject=$receive_mail_subject$new_ip
    # 新IP写入文件中
    echo $new_ip > $save_file
    # 发送email
    echo $mail_content | mail -s $receive_mail_subject $receive_mails
fi
```