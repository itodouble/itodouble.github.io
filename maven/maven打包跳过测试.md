```
<build>  
    <plugins>  
        <plugin>  
            <groupId>org.apache.maven.plugins</groupId>  
            <artifactId>maven-surefire-plugin</artifactId>  
            <version>2.18.1</version>  
            <configuration>  
                <skipTests>true</skipTests>  
            </configuration>  
        </plugin>
    </plugins>
</build>
```

方式2

```mvn install -Dmaven.test.skip=true```

```mvn package -Dmaven.test.skip=true -P prod```

启动时选择配置文件

```java -jar -Dspring.profiles.active=prod NCClient.jar```