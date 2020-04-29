获取http code
```
curl -m 10 -o /dev/null -s -w %{http_code} "https://m.nz86.com"
```
- -m 10 最多查询10s
- -o /dev/null 屏蔽原有输出信息
- -s silent 模式，不输出任何东西
- -w %{http_code} 控制额外输出
- 


选项```-o```将下载数据写入到指定名称的文件中，并使用```--progress```显示进度条：
```
curl http://man.linuxde.net/test.iso -o filename.iso --progress
```

用curl设置cookies
使用```--cookie "COKKIES"```选项来指定cookie，多个cookie使用分号分隔
```
curl http://man.linuxde.net --cookie "user=root;pass=123456"
```

用curl设置用户代理字符串
使用```--user-agent```或者```-A```选项
```
curl URL --user-agent "Mozilla/5.0"
curl URL -A "Mozilla/5.0"
```
其他HTTP头部信息也可以使用curl来发送，使用```-H```"头部信息" 传递多个头部信息
```
curl -H "Host:man.linuxde.net" -H "accept-language:zh-cn" URL
```

通过```-I```或者```-head```可以只打印出HTTP头部信息：
```
curl -I http://man.linuxde.net
```

文件
```
curl -H 'Content-Type:text/plain' --data-binary /xx/xxx/xml "url"
```