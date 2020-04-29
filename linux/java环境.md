Java环境：
```
JAVA_HOME：     C:\Java\jdk1.7.0_80
PATH：          ;%JAVA_HOME%/bin;%JAVA_HOME%/jre/bin;
CLASSPATH：     .;%JAVA_HOME%/lib/dt.jar;%JAVA_HOME%/lib/tools.jar; 
```
linux:
接下来配置JDK：
 vi /etc/profile打开profile文件，在profile文件的末尾加上：

```
JAVA_HOME=/data/java/jdk1.8.0_221
PATH=$JAVA_HOME/bin:$PATH
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
M2_HOME=/data/maven
PATH=$M2_HOME/bin:$PATH

export JAVA_HOME
export M2_HOME
export PATH
export CLASSPATH
```

保存并关闭profile文件，执行source /etc/profile命令让修改生效。
运行下java -version 看一下java版本
