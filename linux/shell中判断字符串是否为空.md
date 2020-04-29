输出长度
```
echo “$str”|awk '{print length($0)}'
expr length “$str”
echo “$str”|wc -c
```
判断为空
```
if [ "$str" =  "" ] 
if [ x"$str" = x ]
if [ -z "$str" ] （-n 为非空）
if [ "$str" == "" ]
```

#### 不要漏掉双引号

#### 多个判断
```
-o = or
-a = and
```
```
if [ "${isRsync}" == "" ] || [ "${isRsync}" == "y" ]
if (( a > b )) || (( a < c ))
if [ $a -gt $b -o $a -lt $c ]


if (( a > b )) && (( a < c )) 
if [[ $a > $b ]] && [[ $a < $c ]] 
if [ $a -gt $b -a $a -lt $c ] 
```