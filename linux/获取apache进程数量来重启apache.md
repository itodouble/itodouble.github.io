```
#/bin/bash
#
# 检查apache进程数量是否已经超过预设
# 如果超过预设 重启apache
#
#


httpd_count=$(ps aux|grep 'usr/local/apache/bin/httpd' |grep -v grep|wc -l)
httpd_count_max=10
curDate=$(date +%Y%m%d)
monitor_log=/opt/logs/httpd_state/apache_monitor_$curDate.log
cur_date_time=$(date "+%Y%m%d%H%M%S")
server_status_url=http://www.xxx.com/server-status/
save_status_file_name="/opt/logs/httpd_state/server-status"${cur_date_time}".html"


echo "" >> $monitor_log
echo "[info][`date "+%Y-%m-%d %H:%M:%S"`] 检查Apache进程数量:${httpd_count}" >> $monitor_log
if [ $httpd_count_max -gt $httpd_count ]; then
        echo "[info][`date "+%Y-%m-%d %H:%M:%S"`] apache 进程数量正常 在预设范围内" >> $monitor_log
else
        curl http://www.xxx.com/server-status/ --silent -o ${save_status_file_name}
        echo "[warn][`date "+%Y-%m-%d %H:%M:%S"`] apache 进程数量超过预设正在重启apache " >> $monitor_log
        service httpd restart
        echo "[info][`date "+%Y-%m-%d %H:%M:%S"`]  重启apache完成" >> $monitor_log
        sleep 10
        now_httpd_count=$(ps aux|grep 'usr/local/apache/bin/httpd' |grep -v grep|wc -l)
        echo "[info] Apache重启后进程数:${now_httpd_count}" >> $monitor_log
        # 短信内容不要改 此为互亿无线短信模版
        sms_content="连接数超出：${httpd_count},请检查服务器运行情况!"
        sms_mobile="xxx"
        sms_req_url="http://106.ihuyi.com/webservice/sms.php?method=Submit&account=xxx&password=xxx&mobile=${sms_mobile}&content=${sms_content}"
        echo "[info] 发送短信提醒给:${sms_mobile}" >> $monitor_log
        sms_res=`curl ${sms_req_url}`
        echo "${sms_res}" >> $monitor_log
        sms_mobile2="xxx"
        sms_req_url2="http://106.ihuyi.com/webservice/sms.php?method=Submit&account=xxx&password=xxx&mobile=${sms_mobile2}&content=${sms_content}"
        echo "[info] 发送短信提醒给:${sms_mobile2}" >> $monitor_log
        sms_res2=`curl ${sms_req_url2}`
        echo "${sms_res2}" >> $monitor_log
fi

```