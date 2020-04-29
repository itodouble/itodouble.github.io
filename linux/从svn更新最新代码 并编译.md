```
#/bin/bash
#
# 更新编译ldsmms项目
# 覆盖原有项目
# 跳过指定配置文件
#
target_path=/opt/temp/ldsmms

#to_jsp_path=/opt/www/ldsmms/WEB-INF/jsp/
svn_path=svn://XXXX
class_path=/opt/temp/ldsmms/target/ldsmms/
web_path=/opt/www/ldsmms
username=XXX
userpwd=XXX
svn co ${svn_path} ${target_path} --username ${username} --password ${userpwd}
cd ${target_path}
mvn clean
mvn install

#################### 判断是否部署编译后的代码
printf "是否同步到web项目(y/n)(默认y)?"
read isRsync
if [ "${isRsync}" == "" ] || [ "${isRsync}" == "y" ]
then
    #rsync -av ${class_path} ${web_path} --exclude WEB-INF/classes/config.properties --exclude WEB-INF/classes/dbconfig.properties --exclude WEB-INF/classes/ehcache.xml --exclude WEB-INF/classes/log4j.properties --exclude WEB-INF/classes/log4j.xml
    echo "同步到web项目结束!"
fi

#################### 判断是否重启tomcat
printf "是否重启tomcat(y/n)(默认n)?"
read isRestartTomcat
if [ "${isRestartTomcat}" == "y" ] || [ "${isRestartTomcat}" == "Y" ]
then
    tomcat_pid=$(ps -ef | grep "tomcat-pc" | grep -v grep | awk '{print $2}')
    if [ ${tomcat_pid} ] ; then
        kill -9 ${tomcat_pid}
        service tomcat-pc start
    fi
fi
```