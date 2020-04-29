
#### Apache和Tomcat整合配置实现JAVA应用的“动静”分离
来源
http://blog.sina.com.cn/s/blog_3c9872d00102w00y.html

Apache与Tomcat整合应用是一个老话题，不算新技能，但对非运维人员在配置过程中或许也会遇到一些问题。这里只是把自己多回配置的过程做一个摘录，供自己翻阅并望对过路的人有用。

Apache是当下在Windows、Unix、Linux 等操作系统中最流行的Web服务器软件之一，其反应速度快、运行效率高，不仅支持HTML等静态页面，在加载插件后也可支持 PHP 页面等。Tomcat是Apache软件基金协会与Sun公司联合开发的Web服务器，除支持HTML静态页面外，还是JSP、Servlet等JAVA WEB应用的服务器。在相同运行环境下，Tomcat对静态页面的反应速度没有Apache灵敏，整合 Apache与Tomcat能使系统运行于一个良好环境下，实现JAVA的动态与静态页面分离，不仅让系统更安全，同时也可提高系统效率。

##### JAVA应用基础架构
通用的JAVA应用架构如下，包括WEB Server、APP Server和DB Server三个部分：

![](http://markdown.itodouble.top/20200429215948.jpg)

1. WEB Server
WEB Server置于企业防火墙外，这个防火墙也可以认为是一个CISCO路由器，在CISCO路由器上开放两个端口为：80和443，其中：
80端口：用于正常的http访问
443端口：用于https访问，即如果你在ie里打入https://xxx.xxx.xx这样的地址，默认走的是443这个端口
WebServer专门用于解析HTML、JS（JavaScript）、CSS、JPG/GIF等图片格式文件、TXT、VBSCRIPT、PHP等“静态”网页内容。

2. APP Server
APP Server置于企业防火墙内，它和Web Server之间的连接必须且一定为内部IP连接。App Server用于解析我们的任何需要Java编译器才能解析的“动态”网页，其实App Server本身也能解析任何静态网页的。在应用中我们这样来想一下：我们让负责专门解析静态网页的Web Server来解析html等内容，而让App Server专门用于解析任何需要Java编译器才能解析的东西，让它们各司其职。这样作的好处：
	1. 为App Server“减压”，同时也提高了性能；
	2. 不用再把8080这个端口暴露在internet上，也很安全，毕竟我们的App Server上是有我们的代码的，就算是编译过的代码也容易被“反编译”，这是很不安全的；
	3. 为将来进一步的“集群扩展”打好了基础。
3. DB Server
 比方说我们用MySQL，它需要通过3306与App Server进行连接，那么这个1521我们称为数据库连接端口，如果把它暴露在Internet上就比较危险，就算密码很复杂，但 对于高明的黑客来说，要攻破你的口令也只是时间上的问题而己。因此我们把我们的DB Server也和App Server一样，置于内网的防火墙，任何的DB连接与管理只能通过内网来访问。
##### 系统安装与配置

系统安装包括MySQL的安装，WEB Server即Apache的安装，App Server即Tomcat的安装。关于这三个系统安装网上相关的文档很多，此处略去。以下主要摘录需要重点配置的内容。
1. Apache的配置
做技术的人应该都会Apache的基础配置，如果不会确实需要学一学。
Apache的配置主要集中在httpd.conf文件中，它位于Apache的安装目录下，比如我的是在“C:\webserver\apache\apache22\conf”目录下。用Ultraedit或Notepad++编辑器打开文件，通常需要修改的内容包括ServerName、DocumentRoot、VirtualHost内容等。此处我修改的内容包括：
	1. ```DocumentRoot```原目录为```C:/webserver/apache/apache22/htdocs```，修改为```D:/WWW/apache/htdocs```，将网站发布路径与Apache安装路径分开；
	2. 找到如下红色标示内容：
    ```
	Options FollowSymLinks
    AllowOverride None
    Order deny,allow
    deny from all
	```
	把这个”deny from all”改成”allow fromall’。
	```
    Options FollowSymLinks
    AllowOverride None
	Order deny,allow
    allow from all
	```
	以免访问Apache根目录下的文件时出现以下错误提示：

	3. 再找到下面这样的行
	```Options FollowSymLinks indexes```
	把它注掉改成下面这样
	```#Options FollowSymLinks indexes```
	Options None
	以免在访问Apache目录时出现直接列表显示子目录或目录下文件的不安全情况，如下图样子：
	以上配置修改完成后重启Apache服务，保证要能正常运行。
##### Apache与Tomcat的整合配置

Apache(Web Server)负责处理HTML静态内容，Tomcat(App Server)负责处理动态内容；原理图如下：

上述架构的原理是： 在Apache中装载一个模块，这个模块叫mod_jk； Apache通过80端口负责解析任何静态web内容； 任何不能解析的内容，用表达式告诉mod_jk，让mod_jk派发给相关的App Server去解释。

因此，首先把 mod_jk-1.2.31-httpd-2.2.3（可从网上搜索下载该模块，如http://download.csdn.net/detail/shangkaikuo/4494837）拷贝到 "/Apache2.2/modules" 目录下。接下来：
1. 添加workers.properties文件

在 “/Tomcat 8.0/conf ” 文件夹下（也可以是其它目录下）增加 workers.properties 文件，输入以下内容。（将其中相应目录替换成自己本地tomcat或jre安装目录）

让mod_jk模块认识Tomcat
```workers.tomcat_home=d:/webserver/tomcat/tomcat8```

让mod_jk模块认识JRE
```workers.java_home=C:/java/jdk1.8.0_45/jre```

指定文件路径分割符

工作端口，此端口应该与server.xml中Connector元素的AJP/1.3协议所使用的端口相匹配
```
worker.list=AJP13
worker.AJP13.port=8009
#Tomcat服务器的地址
worker.AJP13.host=localhost
worker.AJP13.type=ajp13
#负载平衡因数
worker.AJP13.lbfactor=1
```
> 注意：worker.list=AJP13中，AJP13为自定义名称，但此名称必须与下文所述的 “/Apache 2.2/conf/httpd.conf ” 文件中，JkMount指令对应的名称相匹配。

2. httpd.conf文件中添加配置内容

加入workers.properties文件后，可修改 “/Apache 2.2/conf/httpd.conf ” 文件，加入以下配置，注意JkMount指令中的变量必须与worker.list所配置的名称相同。

此处mod_jk-1.2.31-httpd-2.2.3文件为你下载的文件
```LoadModule  jk_module  modules/mod_jk-1.2.31-httpd-2.2.3.so```

指定tomcat监听配置文件地址
```
JkWorkersFile  "C:/webserver/tomcat/tomcat8/conf/workers.properties"
#JkWorkersFile  "C:/webserver/apache/apache22/conf/workers.properties"
```

指定日志存放位置
```
JkLogFile  "C:/webserver/tomcat/tomcat8/logs/mod_jk2.log"
JkLogLevel  info
-virtualhost *-
    ServerName  localhost
    DocumentRoot  "C:/webserver/tomcat/tomcat8/webapps"
    DirectoryIndex  index.html index.htm index.jsp index.action
    ErrorLog  logs/shsc-error_log.txt
    CustomLog  logs/shsc-access_log.txt common
    JkMount  /*WEB-INF AJP13
    JkMount  /*j_spring_security_check AJP13
    JkMount  /*.action AJP13
    JkMount  /servlet/* AJP13
    JkMount  /*.jsp AJP13
    JkMount  /*.do AJP13
    JkMount  /*.action AJP13
-/virtualhost-
```

上述配置中的红色内容是为了告诉Apache哪些交给Tomcat去处理，其它的都交由Apache自身去处理。
其中绿色的两句比较关键，分别告诉：Apache载入一个额外的插件，用于连接tomcat；  连接时的配置参数描述位于Tomcat安装目录的/conf目录下的一个叫workers.properties文件中，mod_jk一般使用ajp13协议连接，使用的是tomcat的8009端口。

完成以上配置后，重启 Apache、Tomcat。此时Apache、Tomcat的默认目录为 "C:/Program Files/Apache Software Foundation/Tomcat 7.0/webapps ”,Apache使用默认的80端口、Tomcat端口改成1080或其它非8080默认端口（修改是为了安全，也可以不用修改）。在Tomcat默认目录下添加test目录，在该目录下加入index.jsp页面，然后通过http://localhost/test/index.jsp试试是否可以正常访问，如页面可正常访问，证明整合配置已经成功。

至此，似乎整个配置工作已经完成，但是如果你想试着把静态的HTML页面放到Apache的htdocs发布目录下，把JSP等动态内容放到Tomcat的webapps目录下（该目录下不存放*.html文件），然后通过http://localhost/index.html想访问Apache目录下的内容，你会发现404之类的不能访问的错误。