key:
js获得当前域名
context:


```
<script language="javascript">
//获取域名
host = window.location.host;
host2=document.domain; 

//获取页面完整地址
url = window.location.href;

document.write("<br>host="+host)
document.write("<br>host2="+host2)
document.write("<br>url="+url)
</script>
```