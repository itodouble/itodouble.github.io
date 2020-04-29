把脚本加为redhat系统服务chkconfig
chkconfig 这个程序可以将```/etc/rc.d/init.d/``` 里面的可执行服务与 ```/etc/xinetd.d``` 里面的相关可执行的服务，连接到目前的 run-level 里头去，连接的目的文件夹为```/etc/rc.d/rc[0-6].d```这6个运行等级文件夹。或者可以定义 run-level 让该项服务在开机的时启动。

不过请注意：

service 是马上让该项服务立刻启动！
chkconfig 仅是设定该服务在开机时可以被启动！
要使用chkconfig必须遵照如下步骤：
1.把脚本放在/etc/init.d/下
2.chowm a+x 脚本名
3.必须在脚本里的#!/bin/bash下加上chkconfig程序规定的格式
也就是脚本开头格式必须是如下格式：
```
#!/bin/bash
#chkconfig: 2345 91 19
#description: 脚本说明如tocmat server
```
否则报错:
service 脚本名 does not support chkconfig
4.chkconfig --add 脚本名
5.chkconfig --level 2345 脚本名 on|off
举例：tomcat自启动脚本设置为系统服务


tomcat脚本说明：
该脚本是以普通用户tomcat执行-以jsvc后台进程来启动tomcat服务
（以root用户启动有安全漏洞）
步骤：
a.把tomcat脚本放在/etc/init.d/目录下，查看脚本内容
cat ```/etc/init.d/tomcat```
内容如下:
```
#!/bin/sh
#chkconfig: 2345 91 19
#description: tomcat Server
#其中：
#chkconfig: 2345 91 19 代表启动优先权将被设定为91而停止优先权设定为19
#description: tomcat Server对该服务进行描述
```

Linux下该脚本使用方法

1.configure时切记加java的jdk路径，否则无法使用普通用户开机自动启动tomcat
```./configure --with-java=/usr/java/jdk1.6.0_01```

2.先为tomcat生成catalina.out，catalina.err日志文件，存放在路径：```/usr/local/tomcat6/logs```，方便查看脚本调试时候出现的错误信息
```cd /usr/local/tomcat6```
先进入tomcat6的安装目录，再执行以下命令，生成日志文件！
```
./bin/jsvc -cp ./bin/bootstrap.jar \
    -outfile ./logs/catalina.out -errfile ./logs/catalina.err \
    org.apache.catalina.startup.Bootstrap
```

3.更改tomcat安装目录权限
切记：tomcat安装目录tomcat6文件权限应该属于运行tomcat的用户
这里更改整个tomcat6的文件夹及其下的文件为xiutuo用户和xiutuo组！
```chown -R xiutuo:xiutuo /usr/local/tomcat6```
不放心的话再执行一次
```chown -R xiutuo:xiutuo /usr/local/tomcat6/*```
```chmod -R 755 /usr/local/tomcat6```

cd /usr/local/tomcat6/bin/jsvc-src/native/
4.自动启动脚本编辑、赋权
```
cp tomcat5.sh /etc/init.d/tomcat
chown xiutuo:xiutuo tomcat
chmod 711 tomcat
```

建立软连接
```
# ln -s /etc/init.d/tomcat /etc/rc.d/rc3.d/K01tomcat
# ln -s /etc/init.d/tomcat /etc/rc.d/rc3.d/S99tomcat
# ln -s /etc/init.d/tomcat /etc/rc.d/rc5.d/K01tomcat
# ln -s /etc/init.d/tomcat /etc/rc.d/rc5.d/S99tomcat
```


5.如何查看该脚本已经工作了，方法如下：
启动脚本：```/etc/init.d/tomcat start```
a.通过web浏览器查看能不能访问tomcat的管理页面
b.通过查看有没有jsvc进程 ps -e | grep jsvc
   如果看到俩个jsvc进程，恭喜，你成功啦！

6.脚本无法正常工作的解决方法：
 启动脚本：```/etc/init.d/tomcat start```
查看```/usr/local/tomcat6/logs/```目录下的俩个日志文件：catalina.out，catalina.err, 使用cat查看。
a.错误
 Cannot find daemon loader org/apache/commons/daemon/support/DaemonLoader
 解决：更改tomcat安装目录权限为所有用户可以读，并属于xiutuo用户和xiutuo组
 命令：
 ```
 chmod -R 755 /usr/locat/tomcat6
 chown -R xiutuo:xiutuo /usr/locat/tomcat6
 ```
b.错误
   Cannot open PID file /var/run/jsvc.pid
 解决：
 ```
 chown xiutuo:xiutuo /var/run/jsvc.pid
 chown 744 /var/run/jsvc.pid
 JAVA_HOME=/usr/java/jdk1.6.0_01
 ```
```
#改成你java安装目录
CATALINA_HOME=/usr/local/tomcat6
#改成你tomcat安装目录
DAEMON_HOME=/usr/local/tomcat6/bin
#改成jsvc程序所在目录
TOMCAT_USER=xiutuo
#改成启动tomcat使用的普通用户
TMP_DIR=/var/tmp
CATALINA_OPTS=
#这个环境变量不管
CLASSPATH=\
$JAVA_HOME/lib/tools.jar:\
$DAEMON_HOME/commons-daemon.jar:\
$CATALINA_HOME/bin/bootstrap.jar
```
classpath这个很重要，一定要确保这三个```tools.jar```、```commons-daemon.jar```、```bootstrap.jar```的正确路径。

```
case "$1" in
start)
    #
    # Start Tomcat
    #
    $DAEMON_HOME/jsvc \
    -user $TOMCAT_USER \
    -home $JAVA_HOME \
    -Dcatalina.home=$CATALINA_HOME \
    -Djava.io.tmpdir=$TMP_DIR \
    -outfile $CATALINA_HOME/logs/catalina.out \
    -errfile '&1' \
    $CATALINA_OPTS \
    -cp $CLASSPATH \
    org.apache.catalina.startup.Bootstrap
    #
    # To get a verbose JVM
    #-verbose \
    # To get a debug of jsvc.
    #-debug \
    ;;
stop)
    #
    # Stop Tomcat
    #
    PID=`cat /var/run/jsvc.pid`
    kill $PID
    ;;
*)
    echo "Usage tomcat.sh start/stop"
    exit 1;;
esac
```
#
#

其中：
``` chkconfig: 2345 91 19``` 代表启动优先权将被设定为91而停止优先权设定为19
```description: tomcat Server```对该服务进行描述
b.使tomcat脚本有执行权限
```
cd /etc/init.d/
chmod a+x tomcat
```
c.把tomcat加载为系统服务
```
cd /etc/init.d/
chkconfig --add tomcat
```
d.设置tomcat在运行等级（runlevel）里开机运行
```
cd /etc/init.d/
chkconfig --level 2345 tomcat on
```
做完后我们验证一下tomcat在
```/etc/rc.d/rc[2-5].d因为值设置了2345等级啦：）
lrwxrwxrwx 1 root root 16 Dec 12 12:23 S91
tomcat -> ../init.d/tomcat
```
e.其他
删除tomcat服务
```
cd /etc/init.d/
chkconfig --del tomcat
```
在开机等级3里不自动运行
```chkconfig -level 3 tomcat off```

查看在各个运行等级里tomcat情况
```chkconfig --list tomcat```

查看所有服务在各个等级里情况
```chkconfig --list```

查看帮助
```chkconfig --help```

注意！
另外当我们手动添加服务启动连接时候，请注意。如
```
# ln -s /etc/init.d/tomcat /etc/rc.d/rc3.d/K01tomcat
# ln -s /etc/init.d/tomcat /etc/rc.d/rc3.d/S99tomcat
# ln -s /etc/init.d/tomcat /etc/rc.d/rc5.d/K01tomcat
# ln -s /etc/init.d/tomcat /etc/rc.d/rc5.d/S99tomcat
```
在某些redhat版本里如果添加了k开头的连接，开机时候脚本可能不能自动运行。


补充：
```debian```系的设置系统服务命令为```update-rc.d```，自定义脚本需先放在```/etc/init.d/``` 下.
```update-rc.d``` 脚本名 ```defaults```

会在```/etc/rc[0-6].d/```下建立链接脚本链向```init.d/```下的原脚本, S开头为服务开启，K开头为服务关闭.

如要删除该服务. 先移除```/etc/init.d/```下的原脚本, 再执行```update-rc.d``` 脚本名 ```remove```.
```rc[0-6].d/```下的链接脚本将被全部删除.
