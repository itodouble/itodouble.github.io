- DOSHashTableSize 3097：定义哈希表大小。
- DOSPageCount 2：允许客户机访问同一页的间隔。
= DOSSiteCount 50：允许客户机的最大并发连接。
- DOSPageInterval 1：网页访问计数器间隔。
- DOSSiteInterval 1：全站访问计数器间隔。
- DOSBlockingPeriod 10：加入黑名单后拒绝访问时间。

解释2
- DOSHashTableSize : 这个是占用内存大小，如果服务器比较繁忙，这个数值要设定大一点。
- DOSPageCount : 同一个IP 在一个时间段内可以打开的页面次数，超过会被禁止。
- DOSSiteCount : 同一个IP在一个网站内可以占用多少个Object,超过会被禁止。
- DOSPageInterval — DOSPageCount 的时间段设定。
- DOSSiteInterval — DOSSiteCount 的时间设定，以秒为单位。
- DOSBlockingPeriod — 当发现怀疑是攻击时，使用者收到403Forbidden,这个是设定封锁时间，以秒为单位。