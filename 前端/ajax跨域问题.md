## 1.如果引入的是静态页面：
```
<meta http-equiv="Access-Control-Allow-Origin" content="*">
```

## 2.动态
需要在response中加入：
```
// 编码
response.setHeader("content-type:application", "json;charset=utf8");
// 允许域名 支持全域名访问
response.setHeader("Access-Control-Allow-Origin", "*");
// 支持的http 动作 请求方式
response.setHeader("Access-Control-Allow-Methods", "POST");
// 响应头 请按照自己需求添加
response.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
```
最好把callback放进去
```
Map<String, Object> returnMap = new HashMap<String, Object>();
String callback = null;
if(request.getParameter("callback")!=null) {
callback = request.getParameter("callback");
}
if(callback!=null && !"".equals(callback)) {
returnMap.put("callback", callback);
}
returnMap.put("callback", callback);
List<Map<String, Object>> list = messageService.getRadomMsg();
returnMap.put("list", list);
returnMap.put("status", "1");
response.setHeader("content-type:application", "json;charset=utf8");
response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Methods", "POST");
response.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
write(JSONUtil.serialize(returnMap));
return null;
```