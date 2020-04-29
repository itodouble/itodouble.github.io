### 示例1
替换第一次出现的
```
var str1 = "ababcdefgh";
str = str.replace('a','');
console.log(str);
```
输出:
babcedffh

### 示例2
所有匹配的 '/g'是全文匹配的标识
```
var str1 = "ababcdefgh";
str = str.replace(/a/g,'');
console.log(str);
```
输出:
bbcdefgh


可以使用正则表达式


