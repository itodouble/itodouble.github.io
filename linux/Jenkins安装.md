```
wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins.io/redhat-stable/jenkins.repo

rpm --import http://pkg.jenkins.io/redhat-stable/jenkins.io.key
```

```
yum install jenkins
```

将本地安装的jdk路径配置到Jenkins中
```
vim /etc/rc.d/init.d/jenkins
```
```
# Search usable Java as /usr/bin/java might not point to minimal version required by Jenkins.
# see http://www.nabble.com/guinea-pigs-wanted-----Hudson-RPM-for-RedHat-Linux-td25673707.html
candidates="
/etc/alternatives/java
/usr/lib/jvm/java-1.8.0/bin/java
/usr/lib/jvm/jre-1.8.0/bin/java
/usr/lib/jvm/java-1.7.0/bin/java
/usr/lib/jvm/jre-1.7.0/bin/java
/usr/bin/java
/usr/local/jdk1.8.0_191/bin/java
"
```

### 全局工具配置 不要忘


在Jenkins使用shell脚本时会报没有权限 可以把权限提升至root
```
vim /etc/sysconfig/jenkins
```
```
JENKINS_USER="root"
```