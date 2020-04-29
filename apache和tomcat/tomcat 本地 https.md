```
<Connector port="443" protocol="org.apache.coyote.http11.Http11NioProtocol" maxThreads="2000" acceptCount="2000" scheme="https" 
	secure="true" SSLEnabled="true" keystoreFile="conf/zcaecp.keystore" keystorePass="zcaecp" clientAuth="false" sslProtocol="TLS" 
	connectionTimeout="20000" enableLookups="false" redirectPort="8443" URIEncoding="UTF-8" />
	<Connector port="5009" protocol="AJP/1.3" redirectPort="8443" URIEncoding="UTF-8" />
<Engine name="Catalina" defaultHost="localhost">
	<Realm className="org.apache.catalina.realm.UserDatabaseRealm" resourceName="UserDatabase"/>
```

原来的去掉