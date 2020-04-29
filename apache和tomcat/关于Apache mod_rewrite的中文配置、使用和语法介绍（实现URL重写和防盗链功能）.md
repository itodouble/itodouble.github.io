来源
http://chinablog.blog.51cto.com/276793/280278

#### 介绍和配置

以数据库后台驱动的动态内容的网站，经常会遇到这些的问题：
- 当在浏览器的地址栏输入一个无效的参数时，会出现数据库的错误提示，这是一个安全的隐患
- 搜索引擎无法收录你的所有网页
- 网页的链接地址是一系列的参数，对浏览用户和搜索引擎都不易理解

这些问题都可以通过Apache服务器的一个基本的模块mod_rewrite来解决，默认的安装的Apache就会装有这个模块。要启用这个模块，打开 httpd.conf文件，察看下面的两行是否被屏蔽，第一行是载入```mod_rewrite```模块，第二行是启用这个模块。
```
LoadModule rewrite_module modules/mod_rewrite.so
AddModule mod_rewrite.c
```

##### mod_rewrite这个模块是如何工作的呢？

```mod_rewrite```截获符合特定条件的URL，并按照设定的规则将它们改写成需要的URL。

比如，可以将```http://www.mysite.com/product.php?pid=123312```这样的URL改写成```http://www.mysite.com/product-123312.html```这样的静态URL，或者是更具体的```http://www.mysite.com/product/thinkpad-t42.html```

##### 重写的规则
重写的规则的表达式：
```
RewriteRule 模式 替换 [选项]
```
```RewriteRule``` 是一个简单的命令告诉```mod_rewrite```这个模块如何去重写，关键的地方在于可以在模式和替换中使用正则表达式来匹配相应的字符，正则表达式的广泛的灵活性能将动态的URL转换成各式各样的符合要求的静态URL。看看这个重写规则：
```
RewriteRule /products/([0-9]+)
/fancy/products.php?id=$1
```
当你在浏览器地址栏输入```http://www.mysite.com/product/123```时，这个地址被重写为```http://www.mysite.com/fancy/product.php?id=123```

这样，访问者就无法知道你的程序真正放在那个目录，程序的真正名字是什么，这也提高了网站的安全系数；这样的URL也去掉了？=这些字符，易于搜索引擎的机器人爬行你的网站。

通过正则表达式，可以写出更复杂的重写规则：
```
RewriteRule ^/products$ /content.php
RewriteRule ^/products/([0-9]+)$ /content.php?id=$1
RewriteRule ^/products/([0-9]+),([ad]*),([0-9]{0,3}),([0-9]*),([0-9]*$)
```
重写规则的选项有
```
‘forbidden’ 或 ‘f’ - 403 禁止
‘gone’ 或 ‘g’ - 410 gone
‘nocase’ 或 ‘NC’ - 大小写敏感
‘next’/N’ - 回到第一条规则
’skip=N’ 或 ‘S=N’ - 跳过下面的N条规则
```

##### 流程控制

```mod_rewrite```是按照从上到下的顺序执行重写的规则，如果URL匹配了第一条规则,则按照第一条规则进行重写，如果不匹配，就执行第二条规则，直到最后。通过流程控制，可以定义在不同情况下采用不同的重写规则。格式是：
```
RewriteCond 测试条件 Condition
```
这些测试条件有：
- HTTP变量: HTTP_USER_AGENT, HTTP_REFERER, HTTP_COOKIE, HTTP_FORWARDED, HTTP_HOST, HTTP_PROXY_CONNECTION, HTTP_ACCEPT
- 连结和请求的变量: REMOTE_ADDR, REMOTE_HOST, REMOTE_USER, REMOTE_IDENT, REQUEST_METHOD, SCRIPT_FILENAME, PATH_INFO, QUERY_STRING, AUTH_TYPE
- 服务器内部变量: DOCUMENT_ROOT, SERVER_ADMIN, SERVER_NAME, SERVER_ADDR, SERVER_PORT, SERVER_PROTOCOL, SERVER_SOFTWARE
- 系统变量: TIME_YEAR, TIME_MON, TIME_DAY, TIME_HOUR, TIME_MIN, TIME_SEC, TIME_WDAY, TIME
- mod_rewrite特殊值: API_VERSION, THE_REQUEST, REQUEST_URI

例如，利用mod_rewrite可以禁止从其他的网站链接到你的图片：
```
RewriteCond %{HTTP_REFERER} !^$
RewriteCond %{HTTP_REFERER} !^http://localhost/.*$ [OR,NC]
RewriteCond %{HTTP_REFERER} !^http://mysite.com/.*$ [OR,NC]
RewriteCond %{HTTP_REFERER} !^http://www.mysite.com/.*$ [OR,NC]
RewriteRule .*\.(gif|GIF|jpg|JPG)$ http://mysite/images/bad.gif [L,R]
```

配置apache mod_rewrite最简单的方法：

1. 通过php提供的```phpinfo()```函数查看环境配置，通过Ctrl+F查找到```Loaded Modules```，其中列出了所有apache2handler已经开启的模块，如果里面包括```mod_rewrite```，则已经支持，不再需要继续设置。
如果没有开启```mod_rewrite```，则打开目录 您的apache安装目录```/apache/conf/``` 下的 httpd.conf 文件，通过Ctrl+F查找到```LoadModule rewrite_module```，将前面的”#”号删除即可。如果没有查找到，则到```LoadModule``` 区域，在最后一行加入```LoadModule rewrite_module modules/mod_rewrite.so```（必选独占一行），然后重启apache服务器即可。
2. 让apache服务器支持```.htaccess```
如何让自己的本地APACHE服务器支持```.htaccess```呢?其实只要简单修改一下apache的httpd.conf设置就可以让APACHE支 持```.htaccess```了。打开httpd.conf文件(在那里? APACHE目录的CONF目录里面),用文本编辑器打开后,查找
```
<Directory />
Options FollowSymLinks
AllowOverride None
</Directory>
```
改为
```
<Directory />
Options FollowSymLinks
AllowOverride All
</Directory>
```
就可以了
3. 建立 ```.htaccess```文件
如果是在windows平台下，刚开始还真不知道怎么建立```.htaccess```文件，因为这个文件实际上没有文件名，仅仅只有扩展名，通过普通方式是无法建立这个文件的，别着急，马上告诉你三种方法：
三种方法都是先建立一个htaccess.txt的文本文件（当然，这个文本文件的名字你可以随便取），然后有三种方式给这个文件重命名：
	1. 用记事本 打开，点击文件–另存为，在文件名窗口输入```.htaccess```，注意是整个绿色部分，也就是包含英文引号，然后点击保存就行了。
	2. 进入cmd命令 窗口，通过cd切换当刚建立htaccess.txt文件的文件夹，然后输入命令：```rename htaccess.txt .htaccess``` ，然后点击键盘Enter键即可。
	3. 通过ftp连接htaccess.txt所在文件夹，通过ftp软件重命名。
那么我们须要建立几个```.htaccess``` 文件，里面又输入什么内容呢？基本的原则是这样，根目录必须有一个，用于重定向（URl重写）所有的请求都会转到到index.php（交给前端控制 器）；```./application```文件夹下须要一个，用于拒绝所有针对该文件夹内容的直接访问（比如 ```http://localhost/application/models/User.php```）,这样做是因为所有访问请求必选通过前端控制器来分配访 问，其次为了安全；```./library```文件夹下的“.htaccess”同前；```./public```文件夹下必选建一个，因为这个文件夹的文件全部是 供前端直接访问的，因此须要撤销URl重写。
以下是4个```./htaccess```文件的内容：
./.htaccess
```
RewriteEngine on
RewriteRule !\.(js|ico|gif|jpg|png|css)$ index.php
```
./application/.htaccess
```
deny from all
```
./library/.htaccess
```
deny from all
```
./public
```
RewriteEngine off
```
实际上，apache的url重写功能也可以直接在httpd.conf文件中进行设置，这里就不具体讲了，网上相关的教程也很多。

##### Apache的RewriteRule规则详细介绍：
```
R[=code](force redirect) 强制外部重定向
强制在替代字符串加上http://thishost[:thisport]/前缀重定向到外部的URL.如果code不指定，将用缺省的302 HTTP状态码。
F(force URL to be forbidden)禁用URL,返回403HTTP状态码。
G(force URL to be gone) 强制URL为GONE，返回410HTTP状态码。
P(force proxy) 强制使用代理转发。
L(last rule) 表明当前规则是最后一条规则，停止分析以后规则的重写。
N(next round) 重新从第一条规则开始运行重写过程。
C(chained with next rule) 与下一条规则关联
如果规则匹配则正常处理，该标志无效，如果不匹配，那么下面所有关联的规则都跳过。
T=MIME-type(force MIME type) 强制MIME类型
NS (used only if no internal sub-request) 只用于不是内部子请求
NC(no case) 不区分大小写
QSA(query string append) 追加请求字符串
NE(no URI escaping of output) 不在输出转义特殊字符
例如：RewriteRule /foo/(.*) /bar?arg=P1\%3d$1 [R,NE] 将能正确的将/foo/zoo转换成/bar?arg=P1=zed
PT(pass through to next handler) 传递给下一个处理
例如：
RewriteRule ^/abc(.*) /def$1 [PT] # 将会交给/def规则处理
Alias /def /ghi
S=num(skip next rule(s)) 跳过num条规则
E=VAR:VAL(set environment variable) 设置环境变量
```

##### rewrite时服务器变量：
```
HTTP headers:HTTP_USER_AGENT, HTTP_REFERER, HTTP_COOKIE, HTTP_HOST, HTTP_ACCEPT
connection & request: REMOTE_ADDR, QUERY_STRING
server internals: DOCUMENT_ROOT, SERVER_PORT, SERVER_PROTOCOL
system stuff: TIME_YEAR, TIME_MON, TIME_DAY
```

##### Rewrite规则表达式的说明：
```
. 匹配任何单字符
[chars] 匹配字符串:chars
[^chars] 不匹配字符串:chars
text1|text2 可选择的字符串:text1或text2
? 匹配0到1个字符
* 匹配0到多个字符
+ 匹配1到多个字符
^ 字符串开始标志
$ 字符串结束标志
\n 转义符标志
反向引用 $N 用于 RewriteRule 中匹配的变量调用(0 <= N <= 9)
反向引用 %N 用于 RewriteCond 中最后一个匹配的变量调用(1 <= N <= 9)
```

##### RewriteCond标志符
```
'nocase|NC'(no case)忽略大小
'ornext|OR' (or next condition)逻辑或，可以同时匹配多个RewriteCond条件
```

##### RewriteRule适用的标志符
```
'redirect|R [=code]' (force redirect)强迫重写为基于http开头的外部转向(注意URL的变化) 如：[R=301,L]
'forbidden|F' (force URL to be forbidden)重写为禁止访问
'proxy|P' (force proxy)重写为通过代理访问的http路径
'last|L' (last rule)最后的重写规则标志，如果匹配，不再执行以后的规则
'next|N' (next round)循环同一个规则，直到不能满足匹配
'chain|C' (chained with next rule)如果匹配该规则，则继续下面的有Chain标志的规则。
'type|T=MIME-type' (force MIME type)指定MIME类型
'nosubreq|NS' (used only if no internal sub-request)如果是内部子请求则跳过
'nocase|NC' (no case)忽略大小
'qsappend|QSA' (query string append)附加查询字符串
'noescape|NE' (no URI escaping of output)禁止URL中的字符自动转义成%[0-9]+的形式。
'passthrough|PT' (pass through to next handler)将重写结果运用于mod_alias
'skip|S=num' (skip next rule(s))跳过下面几个规则
'env|E=VAR:VAL' (set environment variable)添加环境变量
```

#### 实际操作

例子：
```
RewriteEngine on
RewriteCond %{HTTP_USER_AGENT} ^MSIE [NC,OR]
RewriteCond %{HTTP_USER_AGENT} ^Opera [NC]
RewriteRule ^.* - [F,L] 这里”-”表示没有替换，浏览器为IE和Opera的访客将被禁止访问。
```
例子：
```
RewriteEngine On
RewriteBase /test
RewriteCond %{REQUEST_FILENAME}.php -f
RewriteRule ([^/]+)$ /test/$1.php
#for example: /test/admin => /test/admin.php
RewriteRule ([^/]+)\.html$ /test/$1.php [L]
#for example: /test/admin.html => /test/admin.php
限制目录只能显示图片
< IfModule mod_rewrite.c>
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !^.*\.(gif|jpg|jpeg|png|swf)$
RewriteRule .*$ - [F,L]
< /IfModule>
```

