```
wget(选项)(参数)
```
选项
```
-a<日志文件>：在指定的日志文件中记录资料的执行过程；
-A<后缀名>：指定要下载文件的后缀名，多个后缀名之间使用逗号进行分隔；
-b：进行后台的方式运行wget； -B<连接地址>：设置参考的连接地址的基地地址；
-c：继续执行上次终端的任务；
-C<标志>：设置服务器数据块功能标志on为激活，off为关闭，默认值为on；
-d：调试模式运行指令；
-D<域名列表>：设置顺着的域名列表，域名之间用“，”分隔；
-e<指令>：作为文件“.wgetrc”中的一部分执行指定的指令；
-h：显示指令帮助信息；
-i<文件>：从指定文件获取要下载的URL地址； 
-l<目录列表>：设置顺着的目录列表，多个目录用“，”分隔；
-L：仅顺着关联的连接；
-r：递归下载方式；
-nc：文件存在时，下载文件不覆盖原有文件； -nv：下载时只显示更新和出错信息，不显示指令的详细执行过程；
-q：不显示指令执行过程；
-nh：不查询主机名称；
-v：显示详细执行过程；
-V：显示版本信息；
--passive-ftp：使用被动模式PASV连接FTP服务器； 
--follow-ftp：从HTML文件中下载FTP连接文件。
```
参数：
```
URL:下载地址
```

示例：
1. 使用wget下载单个文件
```
wget http://www.linuxde.net/testfile.zip
```
2. 下载并以不同的文件名保存
```
wget -O wordpress.zip http://www.linuxde.net/download.aspx?id=1080
```
wget默认会以最后一个符合/的后面的字符来命令，对于动态链接的下载通常文件名会不正确
3. wget限速下载
```
wget --limit-rate=300k http://www.linuxde.net/testfile.zip
```
4. 使用wget断点续传
```
wget -c http://www.linuxde.net/testfile.zip
```
5. 使用wget后台下载 
```
get -b http://www.linuxde.net/testfile.zip Continuing in background, pid 1840. Output will be written to `wget-log'.
```
可以使用以下命令来察看下载进度
```
tail -f wget-log
```
6. 伪装代理名称下载
```
wget --user-agent="Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.204 Safari/534.16" http://www.linuxde.net/testfile.zip 
```

7. 下载多个文件

```
wget -i filelist.txt

cat filelist.txt
url1
url2
url3
```

一般来说，网站的页面会有很多链接，点击之后可以链接到其他页面，其他页面也可能有链接，就这样一级一级链接下去，如果要把这些所有关联的页面都下载下来，用法是：

```
wget -r http://www.w3schools.com/
```
但是大部分网站不允许你下载所有网站的内容，如果网站检测不到浏览器标识，会拒绝你的下载连接或者给你发送回一个空白网页。这个时候在 wget 后面加上 user-agent 就可以：
```
wget -r -p -U Mozilla http://www.w3schools.com/
```
为了避免被网站加入黑名单，我们可以限制下载的速度以及两次下载之间的等待时间
```
wget --wait=20 --limit-rate=20K -r -p -U Mozilla http://www.w3schools.com/

```
如何只是想下载特定文件夹下的网页，使用 --no-parent:
```
//只下载 `/js` 下的所有页面
wget --wait=20 --limit-rate=20K --no-parent -r -p -U Mozilla http://www.w3schools.com/js/default.asp
```