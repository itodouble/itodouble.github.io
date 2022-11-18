```
vim /etc/init.d/memcached
```
```
#!/bin/bash
#=======================================================================================
# chkconfig: - 80 12
# description: Distributed memory caching daemon
# processname: memcached
#=======================================================================================
IPADDR=`/sbin/ifconfig eth1 | awk -F ':' '/inet addr/{print $2}' | sed 's/[a-zA-Z ]//g'`
PORT="11211"
USER="root"
SIZE="2048"
CONNNUM="51200"
PIDFILE="/var/run/memcached.pid"
BINFILE="/usr/local/memcached/bin/memcached"
LOCKFILE="/var/lock/subsys/memcached"
RETVAL=0
            
start() {
    echo -n $"Starting memcached......"
    $BINFILE -d -l $IPADDR -p $PORT -u $USER -m $SIZE -c $CONNNUM -P $PIDFILE
    RETVAL=$?
    echo
    [ $RETVAL -eq 0 ] && touch $LOCKFILE
               
    return $RETVAL
}
            
stop() {
    echo -n $"Shutting down memcached......"
    /sbin/killproc $BINFILE
    RETVAL=$?
    echo
    [ $RETVAL -eq 0 ] && rm -f $LOCKFILE
               
    return $RETVAL
}
            
restart() {
    stop
    sleep 1
    start
}
            
reload() {
    echo -n $"Reloading memcached......"
    /sbin/killproc $BINFILE -HUP
    RETVAL=$?
    echo
               
    return $RETVAL
}
            
case "$1" in
start)
    start
    ;;
               
stop)
    stop
    ;;
               
restart)
    restart
    ;;
               
condrestart)
    [ -e $LOCKFILE ] && restart
    RETVAL=$?
    ;;
               
reload)
    reload
    ;;
               
status)
    status $prog
    RETVAL=$?
    ;;
               
*)
    echo "Usage: $0 {start|stop|restart|condrestart|status}"
    RETVAL=1
esac
            
exit $RETVAL
```
赋予权限添加服务：
```
chmod +x /etc/init.d/memcached
chkconfig --add memcached
chkconfig --level 235 memcached on
service memcached start
```