```
vim /usr/lib/systemd/system/tomcat7_1.service
```
```
[Unit]  
Description=tomcat8_ip  
After=syslog.target network.target remote-fs.target nss-lookup.target  

[Service]  
Type=forking  
Environment='JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.65-3.b17.el7.x86_64'  
Environment='CATALINA_PID=/usr/local/tomcat8_ip/bin/tomcat.pid'  
Environment='CATALINA_HOME=/usr/local/tomcat8_ip/'  
Environment='CATALINA_BASE=/usr/local/tomcat8_ip/'  
Environment='CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC'  
  
WorkingDirectory=/usr/local/tomcat8_ip/ 
  
ExecStart=/usr/local/tomcat8_ip/bin/startup.sh  
ExecReload=/bin/kill -s HUP $MAINPID  
ExecStop=/bin/kill -s QUIT $MAINPID  
PrivateTmp=true  

[Install]  
WantedBy=multi-user.target



```