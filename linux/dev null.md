```/dev/null```属于字符特殊文件 他属于空设备 它会丢弃一切写入的数据 写入他的内容会永远丢失 且没有任何可以读取的内容

```2>&1```的意思就是将标准错误重定向到标准输出。这里标准输出已经重定向到了 /dev/null。那么标准错误也会输出到/dev/null

例如
把错误和输出 输出到```/dev/null```
```
java -jar quit.jar > /dev/null 2>&1
```

把错误和输出 输出到```out.txt```
```
java -jar xxx >out.txt 2>&1
```

```
0表示标准输入
1表示标准输出
2表示标准错误输出
> 默认为标准输出重定向，与 1> 相同
2>&1 意思是把 标准错误输出 重定向到 标准输出.
&>file 意思是把 标准输出 和 标准错误输出 都重定向到文件file中
```
