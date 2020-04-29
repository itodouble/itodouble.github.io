注入bean
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
	xmlns:p="http://www.springframework.org/schema/p"
	xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
	   http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context-3.0.xsd">
	
	<!-- 
	<bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig">
		<property name="maxActive" value="32"></property>
		<property name="maxIdle" value="6"></property>
		<property name="maxWait" value="15000"></property>
		<property name="minEvictableIdleTimeMillis" value="300000"></property>
		<property name="numTestsPerEvictionRun" value="3"></property>
		<property name="timeBetweenEvictionRunsMillis" value="60000"></property>
		<property name="whenExhaustedAction" value="1"></property>
	</bean>
	 -->
	
	<!-- 配置redis -->
	<bean id="jedisPoolConfig" class="redis.clients.jedis.JedisPoolConfig">
		<property name="maxActive" value="1024" />
		<property name="maxIdle" value="400" />
		<property name="maxWait" value="10000" />
		<property name="testOnBorrow" value="true" />
		<property name="testOnReturn" value="true" />
	</bean>
	<bean id="jedisConnectionFactory"
		class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory"
		destroy-method="destroy">
		<property name="poolConfig" ref="jedisPoolConfig"></property>
		<property name="hostName" value="${redis.host}"></property>
		<property name="port" value="${redis.port}"></property>
		<property name="password" value="${redis.password}"></property>
		<property name="timeout" value="15000"></property>
		<property name="usePool" value="true"></property>
		<property name="database" value="2"></property>
	</bean>

	<!-- redis template definition -->
	<bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">
		<property name="connectionFactory">
			<ref bean="jedisConnectionFactory"/>
		</property>
		    <property name="KeySerializer">
		       <bean class="org.springframework.data.redis.serializer.StringRedisSerializer"/>
		   </property>
		   <property name="ValueSerializer">
		       <bean class="org.springframework.data.redis.serializer.StringRedisSerializer"/>
		   </property>
	</bean>

	<bean id="serialization"
		class="org.springframework.data.redis.serializer.JdkSerializationRedisSerializer" />
</beans>
```

```java
// set 集合
redisTemplate.delete(REDIS_PRE.MDM_DEPT);
BoundHashOperations operations = redisTemplate.boundHashOps(REDIS_PRE.MDM_DEPT);
list.forEach(each->{
  operations.put(each.getId(), each);
});
```
