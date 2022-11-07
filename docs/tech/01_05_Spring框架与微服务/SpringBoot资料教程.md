---
title: SpringBoot资料教程
date: 2022-11-02 18:24:47
category:
    - Spring
tag:
    - SpringBoot
---

> 一定要建立自己的知识结构体系，先主干后细节，网上的视频、博客、文档都只是参考资料，没有万能、完美的教程资源。
>
> 自己整理的文档体系不用追求完美，相当于一个重难点和错题记录本，自己看懂且便于记忆就行，又不是写书籍或者当讲师出教程，没必要什么内容都摘抄搬运，非常耗费时间和精力，效率和价值都很低。
>
> 根据自己要进的公司目标，设置一个准备程度，比如要进 ”BATJM“ 等一线大厂，那准备的程度肯定是非常高（80%+），如果是中型公司，准备的程度可以适当低一点（60%+），但想要在技术行业长久做下去，技术水平肯定要达到（80%+），欠下的技术债迟早要补上，否则真的很可能就被后浪们淘汰了！



## 一、Spring Boot 基础

### Spring Boot 概述

- [Spring Boot 简介](https://www.cnblogs.com/hellokuangshen/p/12447995.html)

#### 什么是 Spring Boot

开发一个 Java Web 应用，从最初开始接触 Servlet 结合 Tomcat ,跑出一个 Hello Wolrld 程序，是要经历特别多的步骤。后来就用了 Struts 框架，再后来是 Spring MVC，到了现在的 Spring Boot，过一两年又会有其他 web 框架出现了。

Spring Boot 其实就是一个 Java Web 的开发框架，和 Spring MVC 类似，对比其他 Java Web 框架的好处，官方说是简化开发，约定大于配置，  you can "just run"，能迅速的开发 web 应用，几行代码开发一个 http 接口。

所有的技术框架的发展似乎都遵循了一条主线规律：从一个复杂应用场景**衍生**一种规范框架，人们只需要进行各种配置而不需要自己去实现它，这时候强大的配置功能成了优点；发展到一定程度之后，人们根据实际生产应用情况，选取其中实用功能和设计精华，重构出一些轻量级的框架；之后为了提高开发效率，嫌弃原先的各类配置过于麻烦，于是开始提倡“约定大于配置”，进而衍生出一些一站式的解决方案。

这就是 Java 企业级应用-> J2EE -> Spring -> Spring Boot 的过程。

随着 Spring 不断的发展，涉及的领域越来越多，项目整合开发需要配合各种各样的文件，慢慢变得不那么易用简单，违背了最初的理念，甚至人称配置地狱。Spring Boot 正是在这样的一个背景下被抽象出来的开发框架，目的为了让大家更容易的使用 Spring 、更容易的集成各种常用的中间件、开源软件。

Spring Boot 基于 Spring 开发，Spirng Boot 本身并不提供 Spring 框架的核心特性以及扩展功能，只是用于快速、敏捷地开发新一代基于 Spring 框架的应用程序。也就是说，它并不是用来替代 Spring 的解决方案，而是和 Spring 框架紧密结合用于提升 Spring 开发者体验的工具。Spring Boot 以**约定大于配置的核心思想**，默认帮我们进行了很多设置，多数 Spring Boot 应用只需要很少的 Spring 配置。同时它集成了大量常用的第三方库配置（例如 Redis、MongoDB、Jpa、RabbitMQ、Quartz 等等），Spring Boot 应用中这些第三方库几乎可以零配置的开箱即用。

> 简单来说，Spring Boot 其实不是什么新的框架，它默认配置了很多框架的使用方式，就像 maven 整合了所有的 jar 包，Spring Boot 整合了所有的框架 。Spring Boot 出生名门，从一开始就站在一个比较高的起点，又经过这几年的发展，生态足够完善，Spring Boot 已经当之无愧成为 Java 领域最热门的技术。



#### Spring Boot 核心功能

- 《JavaEE开发的颠覆者 Spring Boot实战》

1. 独立运行地 Spring 项目

Spring Boot 可以以 jar 包的形式独立运行，运行一个 Spring Boot 项目只需要通过 java -jar xxx.jar 来运行。



2. 内嵌 Servlet 容器

Spring Boot 可以选择内嵌 Tomcat 、Jetty 或者其他容器，这样就无须以 war 包的形式部署项目。



3. 提供 starter 简化 Maven 配置

Spring 提供了一系列的 starter pom 来简化 Maven 的依赖加载，例如，当你使用 spring-boot-starter-web 时，会自动加入 Spring 的核心依赖和 Web 依赖。

![image-20201224173936722](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224173936722-1608821676371.png)



4. 自动配置 Spring

Spring Boot 会根据在类路径中的 jar 包、类，为 jar 包里的类自动配置 Bean，这样会减少很多手动配置。但 Spring Boot 只是考虑了大多数的开发场景，并不是所有的场景，使用 Spring Boot 没有集成的框架，则需要自定义自动配置类。



5. 准生产的应用监控

Spring Boot 提供了基于 http、ssh、telnet 对运行时的项目进行监控。



6. 无代码生成和 xml 配置

Spring 4.x 提倡使用 Java 配置和注解配置组合，而 Spring Boot 不需要任何 xml 配置即可实现 Spring 的所有配置及 Bean 的自动装配。



#### Spring Boot 的优缺点

优点：

- 为所有 Spring 开发者更快的入门
- **开箱即用**，提供各种默认配置来简化项目配置
- 内嵌式容器简化 Web 项目
- 没有冗余代码生成和 xml 配置的要求



缺点：

- 版本更新快且改动大，导致项目升级 Spring Boot 版本需要处理的问题更多
- Spring Boot 高度整合了各种技术框架，需要开发人员花费更多的时间研究搞懂其内部机制原理
- Spring Boot 不停地集成新的技术功能，未来可能变得非常庞大，甚至臃肿，占用系统资源更大，需要高性能地服务器支持



### Spring Boot 快速搭建

#### 使用 Spring Initializr 的 Web 页面创建项目

![image-20201222202453487](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201222202453487-1608821711002.png)



1. 打开  https://start.spring.io/（网站可能有时会打不开，多试几次，或等一会再试）
2. 填写项目信息
3. 点击”Generate Project“按钮生成项目；下载此项目
4. 解压项目包，并用IDEA以Maven项目导入，一路下一步即可，直到项目导入完毕
5. 如果是第一次使用，可能速度会比较慢，包比较多、需要耐心等待一切就绪



#### 使用 IDEA 直接创建项目

![image-20201224170054213](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224170054213-1608821859718.png)

![image-20201224170340951](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224170340951-1608821862669.png)



1. 创建一个新项目


2. 选择spring initalizr ， 可以看到默认就是去官网的快速构建工具那里实现
3. 填写项目信息
4. 选择初始化的组件（初学勾选 Web 即可）
5. 填写项目路径
6. 等待项目构建成功（可能会因为网络原因，导致项目初始化失败，看不到 pom 文件，删掉重新创建）
7. 如果报 connect time out，可以在新建项目时，spring Initializr下选择阿里云的源，在Custom下输入https://start.aliyun.com
8. 注意问题，新IDEA版本（用的2020.3）的maven配置可能会在创建项目后自动变回默认的，很坑！创建项目后先检查maven配置。



创建完项目后，检查项目编码：

![image-20201224231825352](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224231825352.png)



#### 创建模块

在项目名称右键，选择 New -> Module

![image-20210225120142635](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210225120142635.png)



创建 Spring 项目，设置模块信息

![image-20210225120549303](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210225120549303.png)



选择基础的 web 依赖即可，后续再手动加入

![image-20210225115813554](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210225115813554.png)



### **项目结构分析**

![image-20201224184508882](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224184508882.png)



#### pom.xml 分析

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- 上方为 Maven xml 的约束，创建项目后默认不用改动 -->

    <!-- Maven 模型的版本，对于 Maven2 和 Maven3 来说，它只能是 4.0.0 -->
    <modelVersion>4.0.0</modelVersion>

    <!-- 父依赖 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.1</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <!-- 当前项目信息 -->
    <groupId>com.vegetable</groupId>
    <artifactId>mypage</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>mypage</name>
    <description>Define your web pages.</description>

    <!-- 参数配置 -->
    <properties>
        <java.version>1.8</java.version>
    </properties>

    <!-- 项目依赖 -->
    <dependencies>
        <!-- web场景启动器 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- springboot单元测试 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <!-- 剔除依赖 -->
            <!--
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
            -->
        </dependency>

    </dependencies>

    <!-- 项目构建 -->
    <build>
        <!-- 所有插件配置 -->
        <plugins>
            <!-- maven打包插件 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```



### 第一个 Spring Boot 程序

#### 编写 Controller 类

在主程序的同级目录下，新建一个controller包，**一定要在同级目录下，否则识别不到**。

在包中新建一个 TestController 类。

```java
package com.vegetable.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // @RestController 注解表明当前 controller 都是 json 形式的接口
public class TestController {

    @RequestMapping("/hello")
    public String testHello() {
        return "Hello, Spring Boot!";
    }
}

```



编写完毕后，从主程序启动项目，浏览器发起请求，看页面显示结果。（Tomcat 的端口号在控制台打印了，默认是8080）

![image-20201224191603590](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224191603590.png)

### 将项目打成 jar 包

双击右侧栏 maven 的 package。

![image-20201224192032943](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224192032943.png)

![image-20201224192239030](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224192239030.png)

![image-20201224192320681](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224192320681.png)



控制台没有提示错误，就能在项目的 target 目录下看到打包生成的 jar 包了。



不同的 IDEA 版本或者 Spring Boot 版本，可能会出现打包测试不通过的错误，可以直接配置跳过测试，因为就几行代码，很清楚有没有问题。

```xml
<!--
    在工作中，很多情况下我们打包是不想执行测试用例的
    可能是测试用例不完善，或是测试用例会影响数据库数据
    跳过测试用例执
    -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <configuration>
        <!-- 跳过项目运行测试用例 -->
        <skipTests>true</skipTests>
    </configuration>
</plugin>
```

如果修改后还是出现问题，可能是新版本的设置变动了，最直接的办法就是复制报错信息到网上搜一下，基本上都能找到最新的处理方法。



## 二、Spring Boot 核心

> 目录参考《JavaEE开发的颠覆者 Spring Boot实战》，没有必要把这本书上的内容完全照搬过来，没有多大意义而且还非常耗费时间！
>
> 技术细节结合实际项目开发经验，按自己的理解表达记录就可以了，真按照写书籍的标准会把自己拖死，时间就是金钱！
>
> ==**先主干，后细节！**==（细节内容可以通过大厂面试题，归纳整理，查漏补缺，加深理解）



### 基本配置

#### pom.xml

1. 第一个父依赖，主要是管理项目的资源过滤和插件。

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.4.1</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

![image-20201224211725020](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224211725020.png)



2. 点进去，可以看到还有一个父依赖，是真正管理 Spring Boot 应用里面所有依赖版本的地方。

```xml
<parent>
	<groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.4.1</version>
</parent>
```



以后我们导入依赖默认是不需要写版本了；但是如果导入的包没有在依赖中管理着就需要手动配置版本了。

如果想指定与 Spring Boot 配置不同的版本怎么办？**加入依赖的时候显示指定版本就行了？**



3. 启动器 spring-boot-starter

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

**springboot-boot-starter-xxx**：就是spring-boot的场景启动器.

**spring-boot-starter-web**：帮我们导入了web模块正常运行所依赖的组件.

Spring Boot 将所有的功能场景都抽取出来，做成一个个的 starter （启动器），只需要在项目中引入这些starter即可，所有相关的依赖都会导入进来 ， 我们要用什么功能就导入什么样的场景启动器即可 ；我们未来也可以自己自定义 starter。



#### 入口启动类

默认的主启动类（也可以自定义启动类）。

```java
//@SpringBootApplication 来标注一个主程序类
//说明这是一个 Spring Boot 应用
@SpringBootApplication
public class SpringbootApplication {

   public static void main(String[] args) {
		//看似是启动了一个方法，其实是启动了一个服务
      	SpringApplication.run(SpringbootApplication.class, args);
   }

}
```

**一个简单的启动类并不简单！**



**启动类主要做了以下四件事情：**

1. 推断应用的类型是普通的项目还是Web项目。
2. 查找并加载所有可用初始化器，设置到initializers属性中。
3. 找出所有的应用程序监听器，设置到listeners属性中。
4. 推断并设置main方法的定义类，找到运行的主类。



**run方法流程分析**

查看构造器：

```java
public SpringApplication(ResourceLoader resourceLoader, Class... primarySources) {
    this.resourceLoader = resourceLoader;
    Assert.notNull(primarySources, "PrimarySources must not be null");
    this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
    this.webApplicationType = WebApplicationType.deduceFromClasspath();
    this.bootstrappers = new ArrayList<>(getSpringFactoriesInstances(Bootstrapper.class));
    setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
    setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
    this.mainApplicationClass = deduceMainApplicationClass();
}
```

跟着源码和流程图就可以一探究竟了。

![Spring Boot run 方法流程分析](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/SpringBoot-run-%E6%96%B9%E6%B3%95%E6%B5%81%E7%A8%8B%E5%88%86%E6%9E%90.jpg)



#### 使用指定的  jar 包依赖版本

Spring Boot 官方内置的 jar 包依赖版本可能存在一些问题，或者公司就想用其他的版本，加入依赖的时候直接显示指定版本可行吗？



#### 关闭特定的自动配置

```java
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
```



#### 定制 Banner

没多大意义，网上很多教程。



#### 配置文件

- application.properties

- - 语法结构 ：key=value

- application.yml

- - 语法结构 ：key：空格 value

**配置文件的作用 ：**修改 Spring Boot 自动配置的默认值，因为 Spring Boot 在底层都给我们自动配置好了。

比如，可以在配置文件中修改Tomcat 默认启动的端口号。

properties 配置：

```properties
server.port=8081
```

yaml 配置：

```yaml
server:
  prot: 8080
```

- [yaml 配置注入](https://mp.weixin.qq.com/s?__biz=Mzg2NTAzMTExNg==&mid=2247483744&idx=1&sn=b4ec762e71b2ddf9403c035635299206&scene=19#wechat_redirect)



#### starter pom

starter 相当于聚合了一些功能的 jar 包，使用官方提供的组件 starter 或者自定义的 starter，可以直接使用封装好的功能和依赖，而不用再逐个导入依赖。



#### 使用 xml 配置

使用 @ImportResource 加载 xml 配置。



#### 使用 @validated 校验数据

@validated 遵循 `JSR-303` 规范。

注解使用：

```java
@Component //注册bean
@ConfigurationProperties(prefix = "person") // 配置文件属性注入
@Validated  //数据校验
public class Person {

    @Email(message="邮箱格式错误") // 必须是邮箱格式
    private String email;
}
```



常见参数：

```java
@NotNull(message="名字不能为空")
private String userName;
@Max(value=120,message="年龄最大不能查过120")
private int age;
@Email(message="邮箱格式错误")
private String email;

空检查
@Null       验证对象是否为null
@NotNull    验证对象是否不为null, 无法查检长度为0的字符串
@NotBlank   检查约束字符串是不是Null还有被Trim的长度是否大于0,只对字符串,且会去掉前后空格.
@NotEmpty   检查约束元素是否为NULL或者是EMPTY.
    
Booelan检查
@AssertTrue     验证 Boolean 对象是否为 true  
@AssertFalse    验证 Boolean 对象是否为 false  
    
长度检查
@Size(min=, max=) 验证对象（Array,Collection,Map,String）长度是否在给定的范围之内  
@Length(min=, max=) string is between min and max included.

日期检查
@Past       验证 Date 和 Calendar 对象是否在当前时间之前  
@Future     验证 Date 和 Calendar 对象是否在当前时间之后  
@Pattern    验证 String 对象是否符合正则表达式的规则

.......等等
除此以外，我们还可以自定义一些数据校验规则
```

![img](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/3145530-8ae74d19e6c65b4c.webp)

![img](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/3145530-10035c6af8e90a7c.webp)



### 外部配置

使用 properties 文件、yml 文件或者命令行参数作为外部配置。



#### 命令行参数配置

java -jar XXX.jar --server.port=8081



#### 常规属性配置



#### 类型安全配置





### 日志配置

#### Spring Boot 使用 logback

Spring Boot 默认是用 logback 日志框架，spring-boot-starter 已经添加了 logback 的依赖，不用再手动添加依赖，直接使用即可。

```java
package com.vegetable;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MyPageApplicationTests {

    private static final Logger logger = LoggerFactory.getLogger(Test.class);

    @Test
    void contextLoads() {
        //<!-- 日志级别：TRACE < DEBUG < INFO < WARN < ERROR [< FATAL（致命）] -->
        logger.trace("====测试日志级别TRACE====");
        logger.debug("====测试日志级别DEBUG====");
        logger.info("====测试日志级别INFO====");
        logger.warn("====测试日志级别WARN====");
        logger.error("====测试日志级别ERROR====");

    }

}
```



#### logback 参数配置

```yaml
## logback 日志配置
## xml 中配置的日志目录，相对路径对直接运行的项目不生效，需要部署后才能生效。IDEA 直接运行使用的是内置代理运行环境，指定的相对路径在内部环境无效
## 【IDEA运行环境】
## path 和 name 同时设置的话，只有name生效，文件位置在项目根目录
## 建议直接配置 name: E:/DevRes/Projects/mypage/logs/mypage.log
## 部署后运行环境，xml中的配置会生效
logging:
  file:
    name: E:/DevRes/Projects/mypage/logs/mypage.log

```





### Profile 配置

用于支持配置多套环境，通过在主配置文件中修改`spring.profiles.active=dev/prod`来切换环境配置。

格式：application-{profile}.properties 或者 application-{profile}.yml



**yaml 的多文档块**

```yaml
server:
  port: 8081
#选择要激活那个环境块
spring:
  profiles:
    active: prod

---
server:
  port: 8083
spring:
  profiles: dev #配置环境的名称


---
server:
  port: 8084
spring:
  profiles: prod  #配置环境的名称
```

**注意：如果yml和properties同时都配置了端口，并且没有激活其他环境 ， 默认会使用properties配置文件的！**



**配置文件加载位置**

官方外部配置文件说明：

![外部加载配置文件的路径](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/%E5%A4%96%E9%83%A8%E5%8A%A0%E8%BD%BD%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%9A%84%E8%B7%AF%E5%BE%84.png)

优先级1：项目路径下的config文件夹配置文件
优先级2：项目路径下配置文件
优先级3：资源路径下的config文件夹配置文件
优先级4：资源路径下配置文件

**优先级由高到底，高优先级的配置会覆盖低优先级的配置。**



### Spring Boot 的运行原理

> 研究工作原理的一手资料是官方文档和技术书籍，其次是别人看了官方文档或书籍之后整理的技术博客和视频教程，最后是别人看视频教程整理的笔记文档。
>
> 通常视频教程是最容易学习的资料，但最新的视频教程可能收费，你能看到的视频教程可能都是几年前的了。
>
> 建议逐渐养成看官方文档、买最新的技术书籍学习新技术的习惯，保持像苍蝇一样灵敏的嗅觉，才能尝到肉的滋味。



#### 核心注解

**@SpringBootApplication**

作用：标注在某个类上说明这个类是 Spring Boot 的主配置类 ， Spring Boot 就应该运行这个类的 main 方法来启动 Spring Boot 应用；

进入这个注解：可以看到上面还有很多其他注解！

```java
@Target(ElementType.TYPE) // Java的元注解，表示作用目标，这里是类
@Retention(RetentionPolicy.RUNTIME) // Java的元注解，表示作用范围，这里是运行时有效
@Documented // Java的元注解，表示JDK文档支持
@Inherited // Java的元注解，表示被修饰的注解可以被继承，但接口继承、实现不适用
@SpringBootConfiguration // Spring Boot的配置注解
@EnableAutoConfiguration // Spring Boot的注解，允许自动配置，相当于一个开关标识
@ComponentScan // Spring注解，组件扫描
(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
	// ...
}
```



**@ComponentScan**

作用：自动扫描并加载符合条件的组件或者 bean，将这个 bean 定义加载到 IOC 容器中。



**@SpringBootConfiguration**
作用：Spring Boot 的配置类 ，标注在某个类上 ， 表示这是一个 Spring Boot 的配置类。

```xml
// 点进去得到下面的 @Component
@Configuration
public @interface SpringBootConfiguration {}

@Component
public @interface Configuration {}
```



**@Configuration**

Spring注解，说明这是一个配置类 ，配置类对应 Spring 的 xml 配置文件。

**@Component** 

Spring注解，说明启动类本身也是 Spring 中的一个组件而已，负责启动应用。



**@EnableAutoConfiguration **

开启自动配置功能。以前需要自己配置的东西，现在 Spring Boot 可以自动进行配置。

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
    // ...
}
```



**@AutoConfigurationPackage**

自动配置包。

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Import(AutoConfigurationPackages.Registrar.class)
public @interface AutoConfigurationPackage {
    // ...
}
```

**@import** 

Spring 底层注解，给容器中导入一个组件。

Registrar.class 作用：将主启动类的所在包及包下面所有子包里面的所有组件扫描到 Spring 容器 。

AutoConfigurationImportSelector.class 作用：自动配置导入选择器，那么它会导入哪些组件的选择器呢？



#### 运行原理初探

接着上小节的注解初步熟悉 Spring Boot 启动类的执行原理。查看 AutoConfigurationImportSelector 类的源码，有一个获取候选配置的方法：

```java
// 获得候选的配置
protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
    //这里的getSpringFactoriesLoaderFactoryClass()方法
    //返回的就是最开始看的启动自动导入配置文件的注解类：EnableAutoConfiguration
    List<String> configurations = SpringFactoriesLoader.loadFactoryNames(getSpringFactoriesLoaderFactoryClass(), getBeanClassLoader());
    Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you are using a custom packaging, make sure that file is correct.");
    return configurations;
}
```



这个方法又调用了  SpringFactoriesLoader 类的静态方法，进入 SpringFactoriesLoader 类 loadFactoryNames() 方法：

```java
public static List<String> loadFactoryNames(Class<?> factoryType, @Nullable ClassLoader classLoader) {
    ClassLoader classLoaderToUse = classLoader;
    if (classLoaderToUse == null) {
        classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
    }
    String factoryTypeName = factoryType.getName();
    return loadSpringFactories(classLoaderToUse).getOrDefault(factoryTypeName, Collections.emptyList());
}
```



继续查看 loadSpringFactories 方法：

```java
private static Map<String, List<String>> loadSpringFactories(ClassLoader classLoader) {
    Map<String, List<String>> result = cache.get(classLoader);
    if (result != null) {
        return result;
    }

    result = new HashMap<>();
    try {
        //FACTORIES_RESOURCE_LOCATION = "META-INF/spring.factories"
        //去获取一个资源 "META-INF/spring.factories"
        Enumeration<URL> urls = classLoader.getResources(FACTORIES_RESOURCE_LOCATION);
        
        //将读取到的资源遍历，封装成为一个Properties
        while (urls.hasMoreElements()) {
            URL url = urls.nextElement();
            UrlResource resource = new UrlResource(url);
            Properties properties = PropertiesLoaderUtils.loadProperties(resource);
            for (Map.Entry<?, ?> entry : properties.entrySet()) {
                String factoryTypeName = ((String) entry.getKey()).trim();
                String[] factoryImplementationNames =
                    StringUtils.commaDelimitedListToStringArray((String) entry.getValue());
                for (String factoryImplementationName : factoryImplementationNames) {
                    result.computeIfAbsent(factoryTypeName, key -> new ArrayList<>())
                        .add(factoryImplementationName.trim());
                }
            }
        }

        // Replace all lists with unmodifiable lists containing unique elements
        result.replaceAll((factoryType, implementations) -> implementations.stream().distinct()
                          .collect(Collectors.collectingAndThen(Collectors.toList(), Collections::unmodifiableList)));
        cache.put(classLoader, result);
    }
    catch (IOException ex) {
        throw new IllegalArgumentException("Unable to load factories from location [" +
                                           FACTORIES_RESOURCE_LOCATION + "]", ex);
    }
    return result;
}
```



发现一个多次出现的文件：spring.factories，`Ctrl + Shift + F` 全局搜索它，因为在依赖包里面，可能搜不到，直接到 Spring Boot 的依赖包下去找。

![image-20201224230327368](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224230327368.png)



**spring.factories**

打开 spring.factories， 看到了很多自动配置的类信息，这就是自动配置根源所在。

![image-20201224230548975](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201224230548975.png)

（只截了一部分）



从中找到自己熟悉的配置类，比如，WebMvcAutoConfiguration，可以发现，里面还有很多新的注解，后续再深入。

```java
@Configuration(proxyBeanMethods = false) // Spring的配置注解
@ConditionalOnWebApplication(type = Type.SERVLET) // Spring Boot的条件注解
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class }) 
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10) // 自动配置权重顺序
@AutoConfigureAfter({ DispatcherServletAutoConfiguration.class, TaskExecutionAutoConfiguration.class,
		ValidationAutoConfiguration.class })  // 自动配置依赖顺序，必须在哪些配置先加载完成后再加载
public class WebMvcAutoConfiguration {
    // ...
}
```



**小结：**

1. Spring Boot 在启动的时候从类路径下的 META-INF/spring.factories 中获取 EnableAutoConfiguration 指定的值。
2. 将这些值作为自动配置类导入容器 ，自动配置类就生效，帮我们进行自动配置工作。
3. 整个 J2EE 的整体解决方案和自动配置都在 springboot-autoconfigure 的 jar 包中。
4. 启动类会给容器中导入非常多的自动配置类 （xxxAutoConfiguration）, 就是给容器中导入这个场景需要的所有组件 ， 并配置好这些组件 。（是装配所有配置类吗？如果不是，在哪里判断？肯定不是加载所有的，通过 **@Conditional 的派生注解判断**）
5. 有了自动配置类 ，免去了我们手动编写配置注入功能组件等的工作。



#### ★自动装配原理

- [SpringBoot 自动装配原理详解](https://javaguide.cn/system-design/framework/spring/spring-boot-auto-assembly-principles.html)



**请讲述一下 SpringBoot 自动装配原理**

大多数面试官也不喜欢听你长篇大论地讲具体实现原理（大厂面试官除外），回答描述在主干要点上，稍微加上一些自己理解的细节内容，看面试官神情，他要是愿意听，可以适当详细一点，要是不耐烦了，讲完主干内容就结束吧。

看到网上有面试经验说，在自己擅长的技术上可以跟面试官多扯一些，这样他就没时间问那些你不太擅长的内容了。这经验估计只对中小公司面试官有用，大厂面试官有的是时间，就好像专门做面试工作的，“八股文”、技术深度广度全都懂，经常是夺命连环击，问到你哑口无言为止。



问题展开：

1. **什么是 SpringBoot 自动装配？**组件依赖配置不用自己手动配置，springboot 自动完成，有需要再自定义修改
2. **SpringBoot 是如何实现自动装配的？如何实现按需加载？**
   1. 入口类 @SpringBootApplication 注解中的 @EnableAutoConfiguration 开启了自动配置，EnableAutoConfiguration 注解类中导入的 AutoConfigurationImportSelector 类中的 getAutoConfigurationEntry 方法实现了加载自动配置类。读取 META-INF/spring.factories，加载里面的自动配置类
   2. @ConditionalOnXXX 系列注解可以实现按需加载
3. **如何实现一个 Starter？**哪些场景？（技术扩展，助于理解自动装配的，没问你可以不答）
   1. 正常创建一个 springboot 项目，打包类型为 pom
   2. 引入 spring-boot-starter 基础依赖
   3. 创建业务需要的 xxxxAutoConfiguration 自动配置类
   4. 创建配置类属性绑定类，通过 @EnableConfigurationProperties({xxxxProperties.class})  绑定属性值（可选）
   5. 其他 springboot 项目引入这个 starter 依赖，测试注入使用是否正常

场景：自己写的组件或项目模块，或者修改了开源组件重新打包



> 自己照着网上资料写一个简单的 spring boot 应用，能跑起来就行，然后从启动类入口开始，一步一步跟着梳理一遍，就能明白大概。

**入口启动类**

```java
@SpringBootApplication
public class MypagesAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(MypagesAdminApplication.class, args);
    }

}
```



**@SpringBootApplication 注解**

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
    // ......
}
```



**@EnableAutoConfiguration 开启自动配置注解**

`EnableAutoConfiguration` 只是一个简单地注解，自动装配核心功能的实现实际是通过 `AutoConfigurationImportSelector`类。

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
    // ......
}
```



**AutoConfigurationImportSelector 加载自动装配类**

`AutoConfigurationImportSelector` 类的继承体系如下：

```java
public class AutoConfigurationImportSelector implements DeferredImportSelector, BeanClassLoaderAware, ResourceLoaderAware, BeanFactoryAware, EnvironmentAware, Ordered {

}

public interface DeferredImportSelector extends ImportSelector {

}

public interface ImportSelector {
    String[] selectImports(AnnotationMetadata var1);
}
```



可以看出，`AutoConfigurationImportSelector` 类实现了 `ImportSelector`接口，也就实现了这个接口中的 `selectImports`方法，该方法主要用于**获取所有符合条件的类的全限定类名，这些类需要被加载到 IoC 容器中**。

```java
private static final String[] NO_IMPORTS = new String[0];

public String[] selectImports(AnnotationMetadata annotationMetadata) {
        // <1>.判断自动装配开关是否打开
        if (!this.isEnabled(annotationMetadata)) {
            return NO_IMPORTS;
        } else {
          //<2>.获取所有需要装配的bean
            AutoConfigurationMetadata autoConfigurationMetadata = AutoConfigurationMetadataLoader.loadMetadata(this.beanClassLoader);
            AutoConfigurationImportSelector.AutoConfigurationEntry autoConfigurationEntry = this.getAutoConfigurationEntry(autoConfigurationMetadata, annotationMetadata);
            return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
        }
    }
```



**getAutoConfigurationEntry() 加载自动配置类**

结合`getAutoConfigurationEntry()`的源码来详细分析一下：

```java
private static final AutoConfigurationEntry EMPTY_ENTRY = new AutoConfigurationEntry();

AutoConfigurationEntry getAutoConfigurationEntry(AutoConfigurationMetadata autoConfigurationMetadata, AnnotationMetadata annotationMetadata) {
    //<1>.
    if (!this.isEnabled(annotationMetadata)) {
        return EMPTY_ENTRY;
    } else {
        //<2>.
        AnnotationAttributes attributes = this.getAttributes(annotationMetadata);
        //<3>.
        List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);
        //<4>.
        configurations = this.removeDuplicates(configurations);
        Set<String> exclusions = this.getExclusions(annotationMetadata, attributes);
        this.checkExcludedClasses(configurations, exclusions);
        configurations.removeAll(exclusions);
        configurations = this.filter(configurations, autoConfigurationMetadata);
        this.fireAutoConfigurationImportEvents(configurations, exclusions);
        return new AutoConfigurationImportSelector.AutoConfigurationEntry(configurations, exclusions);
    }
}
```



**第 1 步**:

判断自动装配开关是否打开。默认`spring.boot.enableautoconfiguration=true`，可在 `application.properties` 或 `application.yml` 中设置。



**第 2 步** ：

用于获取`EnableAutoConfiguration`注解中的 `exclude` 和 `excludeName`。



**第 3 步**：

获取需要自动装配的所有配置类，读取`META-INF/spring.factories`

不仅本项目下的`META-INF/spring.factories`被读取到，项目依赖的 Spring Boot Starter 下的`META-INF/spring.factories`都会被读取到。



**第 4 步** ：

到这里可能面试官会问你:“`spring.factories`中这么多配置，每次启动都要全部加载么？”。

会进行条件筛选，`@ConditionalOnXXX` 中的所有条件都满足，自动配置类才会生效。

```java
@Configuration
// 检查相关的类：RabbitTemplate 和 Channel是否存在
// 存在才会加载
@ConditionalOnClass({ RabbitTemplate.class, Channel.class })
@EnableConfigurationProperties(RabbitProperties.class)
@Import(RabbitAnnotationDrivenConfiguration.class)
public class RabbitAutoConfiguration {
}
```



具体调用链：

```java
AutoConfigurationImportSelector#getAutoConfigurationEntry

SpringFactoriesLoader#loadFactoryNames

SpringFactoriesLoader#loadSpringFactories

```





**实例分析：**

以**HttpEncodingAutoConfiguration（Http编码自动配置）**为例解释自动配置原理。

```java

//表示这是一个配置类，和以前编写的配置文件一样，也可以给容器中添加组件；
@Configuration 

//启动指定类的ConfigurationProperties功能；
  //>>>>进入这个HttpProperties查看，将配置文件中对应的值和HttpProperties绑定起来；
  //并把HttpProperties加入到ioc容器中
@EnableConfigurationProperties({HttpProperties.class}) 

//Spring底层@Conditional注解
  //根据不同的条件判断，如果满足指定的条件，整个配置类里面的配置就会生效；
  //这里的意思就是判断当前应用是否是web应用，如果是，当前配置类生效
@ConditionalOnWebApplication(
    type = Type.SERVLET
)

//判断当前项目有没有这个类CharacterEncodingFilter；SpringMVC中进行乱码解决的过滤器；
@ConditionalOnClass({CharacterEncodingFilter.class})

//判断配置文件中是否存在某个配置：spring.http.encoding.enabled；
  //如果不存在，判断也是成立的
  //即使我们配置文件中不配置pring.http.encoding.enabled=true，也是默认生效的；
@ConditionalOnProperty(
    prefix = "spring.http.encoding",
    value = {"enabled"},
    matchIfMissing = true
)

public class HttpEncodingAutoConfiguration {
    //他已经和SpringBoot的配置文件映射了
    private final Encoding properties;
    //只有一个有参构造器的情况下，参数的值就会从容器中拿
    public HttpEncodingAutoConfiguration(HttpProperties properties) {
        this.properties = properties.getEncoding();
    }
    
    //给容器中添加一个组件，这个组件的某些值需要从properties中获取
    @Bean
    @ConditionalOnMissingBean //判断容器没有这个组件？
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
        filter.setEncoding(this.properties.getCharset().name());
        filter.setForceRequestEncoding(this.properties.shouldForce(org.springframework.boot.autoconfigure.http.HttpProperties.Encoding.Type.REQUEST));
        filter.setForceResponseEncoding(this.properties.shouldForce(org.springframework.boot.autoconfigure.http.HttpProperties.Encoding.Type.RESPONSE));
        return filter;
    }
    //。。。。。。。
}
```

```java
//从配置文件中获取指定的值和bean的属性进行绑定
@ConfigurationProperties(prefix = "spring.http") 
public class HttpProperties {
    // .....
}
```



**一句话总结 ：根据当前不同的条件判断，决定这个配置类是否生效！**

- 一但这个配置类生效；这个配置类就会给容器中添加各种组件；
- 这些组件的属性是从对应的 properties 类中获取的，这些类里面的每一个属性又是和配置文件绑定的；
- 所有在配置文件中能配置的属性都是在 xxxxProperties 类中封装着；
- 配置文件能配置什么就可以参照某个功能对应的这个属性类。



去配置文件里面试试前缀，看提示即可。

![image-20201225023605743](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201225023605743.png)



#### @Conditional 条件注解

作用：必须是 @Conditional 指定的条件成立，才给容器中添加组件，配置配里面的所有内容才生效。

| @Conditional派生注解            | 作用(都是判断是否符合指定的条件)               |
| ------------------------------- | ---------------------------------------------- |
| @ConditionalOnJava              | 系统的java版本是否符合要求                     |
| @ConditionalOnBean              | 有指定的Bean类                                 |
| @ConditionalOnMissingBean       | 没有指定的bean类                               |
| @ConditionalOnExpression        | 符合指定的SpEL表达式                           |
| @ConditionalOnClass             | 有指定的类                                     |
| @ConditionalOnMissingClass      | 没有指定的类                                   |
| @ConditionalOnSingleCandidate   | 容器只有一个指定的bean，或者这个bean是首选bean |
| @ConditionalOnProperty          | 指定的property属性有指定的值                   |
| @ConditionalOnResource          | 路径下存在指定的资源                           |
| @ConditionalOnWebApplication    | 系统环境是web环境                              |
| @ConditionalOnNotWebApplication | 系统环境不是web环境                            |
| @ConditionalOnjndi              | JNDI存在指定的项                               |



**怎么知道哪些自动配置类生效？**

可以通过在配置文件中设置 debug=true 属性，写个测试类，运行来让控制台打印自动配置报告，这样就可以知道哪些自动配置类生效。

```properties
#开启springboot的调试类
debug=true
```

```java
@SpringBootTest
class MyPageApplicationTests {

    @Test
    void contextLoads() {
        System.out.println("====查看自动配置类是否生效====");
    }

}
```



![image-20201225024801121](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201225024801121.png)



Positive matches:（自动配置类启用的：正匹配）

Negative matches:（没有启动，没有匹配成功的自动配置类：负匹配）

Unconditional classes: （没有条件的类）



#### 自定义 starter

- [自定义starter](https://mp.weixin.qq.com/s?__biz=Mzg2NTAzMTExNg==&mid=2247483767&idx=1&sn=4c23abf553259052f335086dba1ce80c&scene=19#wechat_redirect)





## 三、Spring Boot 的 Web 开发

### Web 开发支持



### Thymeleaf 模板引擎

#### Thymeleaf 基础知识



#### 与 Spring MVC 集成



#### Spring Boot 的 Thymeleaf 支持





### Web 相关配置

#### Spring Boot 提供的自动配置

1. 自动配置的 ViewResolver



2. 自动配置的静态资源



3. 自动配置的 Formatter 和 Converter



4. 自动配置的 HttpMessageConverters



5. 静态首页的支持



#### 接管 Spring Boot 的 Web 配置





#### 注册 Servlet、Filter、Listener





### Tomcat 配置

#### 配置 Tomcat



#### 代码配置 Tomcat



#### 替换 Tomcat



#### SSL 配置





### Favicon 配置

#### 默认的 Favicon



#### 关闭 Favicon



#### 设置自己的 Favicon





### WebSocket

#### 什么是 WebSocket



#### Spring Boot 提供的自动配置





## 四、Spring Boot 的数据访问

### Spring Boot 整合数据源（数据库连接池）

Spring Boot 2.0+ 默认使用 HikariDataSource 数据源，而以前版本，如 Spring Boot 1.5 默认使用  org.apache.tomcat.jdbc.pool.DataSource 作为数据源。

**HikariDataSource 号称 Java WEB 当前速度最快的数据源，相比于传统的 C3P0 、DBCP、Tomcat jdbc 等连接池更加优秀；**

**可以使用 spring.datasource.type 指定自定义的数据源类型，值为 要使用的连接池实现的完全限定名。**



但是，Druid 的 maven 依赖使用的人数很少，单个最大都不过百。HikariCP 的使用人数比 Druid 多几倍。



#### Druid 和 HikariCP 对比

1. 性能方面 hikari\>druid\>tomcat-jdbc\>dbcp\>c3p0。hikari 的高性能得益于最大限度的避免锁竞争。

2. druid 功能最为全面，sql拦截等功能，统计数据较为全面，具有良好的扩展性。

![img](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/db-pool.png)



#### HikariCP 配置参数

- [参数配置说明](https://github.com/brettwooldridge/HikariCP)



```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/bg-learnsp?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=UTF-8&useSSL=false
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.zaxxer.hikari.HikariDataSource
    hikari:
      auto-commit: true ## 自动提交从池中返回的连接
      minimum-idle: 5 #最小空闲连接，默认值10，小于0或大于maximum-pool-size，都会重置为maximum-pool-size
      maximum-pool-size: 10 ## 最大连接数，小于等于0会被重置为默认值10；大于零小于1会被重置为minimum-idle的值
      idle-timeout: 50000 ## 空闲连接超时时间，默认值600000（10分钟），大于等于max-lifetime且max-lifetime>0，会被重置为0；不等于0且小于10秒，会被重置为10秒
      max-lifetime: 60000 ## 连接最大存活时间，不等于0且小于30秒，会被重置为默认值30分钟.设置应该比mysql设置的超时时间短
      connection-timeout: 60000 ## 连接超时时间：毫秒，小于250毫秒，否则被重置为默认值30秒
      connection-test-query: select 1 ## 用于测试连接是否可用的查询语句
      pool-name: mybatis01 ## 连接池的用户定义名称，主要出现在日志记录和JMX管理控制台中以识别池和池配置
      read-only: false ## 从池中获取的连接是否默认处于只读模式
```



| name                      | 描述                                                         | 构造器默认值                   | 默认配置validate之后的值 | validate重置                                                 |
| ------------------------- | ------------------------------------------------------------ | ------------------------------ | ------------------------ | ------------------------------------------------------------ |
| autoCommit                | 自动提交从池中返回的连接                                     | TRUE                           | TRUE                     | -                                                            |
| connectionTimeout         | 等待来自池的连接的最大毫秒数                                 | SECONDS.toMillis(30) = 30000   | 30000                    | 如果小于250毫秒，则被重置回30秒                              |
| idleTimeout               | 连接允许在池中闲置的最长时间                                 | MINUTES.toMillis(10) = 600000  | 600000                   | 如果idleTimeout+1秒>maxLifetime 且 maxLifetime>0，则会被重置为0（代表永远不会退出）；如果idleTimeout!=0且小于10秒，则会被重置为10秒 |
| maxLifetime               | 池中连接最长生命周期                                         | MINUTES.toMillis(30) = 1800000 | 1800000                  | 如果不等于0且小于30秒则会被重置回30分钟                      |
| connectionTestQuery       | 如果您的驱动程序支持JDBC4，我们强烈建议您不要设置此属性      | null                           | null                     | -                                                            |
| minimumIdle               | 池中维护的最小空闲连接数                                     | -1                             | 10                       | minIdle<0或者minIdle>maxPoolSize,则被重置为maxPoolSize       |
| maximumPoolSize           | 池中最大连接数，包括闲置和使用中的连接                       | -1                             | 10                       | 如果maxPoolSize小于1，则会被重置。当minIdle<=0被重置为DEFAULT_POOL_SIZE则为10;如果minIdle>0则重置为minIdle的值 |
| metricRegistry            | 该属性允许您指定一个 Codahale / Dropwizard MetricRegistry 的实例，供池使用以记录各种指标 | null                           | null                     | -                                                            |
| healthCheckRegistry       | 该属性允许您指定池使用的Codahale / Dropwizard HealthCheckRegistry的实例来报告当前健康信息 | null                           | null                     | -                                                            |
| poolName                  | 连接池的用户定义名称，主要出现在日志记录和JMX管理控制台中以识别池和池配置 | null                           | HikariPool-1             | -                                                            |
| initializationFailTimeout | 如果池无法成功初始化连接，则此属性控制池是否将 fail fast     | 1                              | 1                        | -                                                            |
| isolateInternalQueries    | 是否在其自己的事务中隔离内部池查询，例如连接活动测试         | FALSE                          | FALSE                    | -                                                            |
| allowPoolSuspension       | 控制池是否可以通过JMX暂停和恢复                              | FALSE                          | FALSE                    | -                                                            |
| readOnly                  | 从池中获取的连接是否默认处于只读模式                         | FALSE                          | FALSE                    | -                                                            |
| registerMbeans            | 是否注册JMX管理Bean（MBeans）                                | FALSE                          | FALSE                    | -                                                            |
| catalog                   | 为支持 catalog 概念的数据库设置默认 catalog                  | driver default                 | null                     | -                                                            |
| connectionInitSql         | 该属性设置一个SQL语句，在将每个新连接创建后，将其添加到池中之前执行该语句。 | null                           | null                     | -                                                            |
| driverClassName           | HikariCP将尝试通过仅基于jdbcUrl的DriverManager解析驱动程序，但对于一些较旧的驱动程序，还必须指定driverClassName | null                           | null                     | -                                                            |
| transactionIsolation      | 控制从池返回的连接的默认事务隔离级别                         | null                           | null                     | -                                                            |
| validationTimeout         | 连接将被测试活动的最大时间量                                 | SECONDS.toMillis(5) = 5000     | 5000                     | 如果小于250毫秒，则会被重置回5秒                             |
| leakDetectionThreshold    | 记录消息之前连接可能离开池的时间量，表示可能的连接泄漏       | 0                              | 0                        | 如果大于0且不是单元测试，则进一步判断：(leakDetectionThreshold < SECONDS.toMillis(2) or (leakDetectionThreshold > maxLifetime && maxLifetime > 0)，会被重置为0 . 即如果要生效则必须>0，而且不能小于2秒，而且当maxLifetime > 0时不能大于maxLifetime |
| dataSource                | 这个属性允许你直接设置数据源的实例被池包装，而不是让HikariCP通过反射来构造它 | null                           | null                     | -                                                            |
| schema                    | 该属性为支持模式概念的数据库设置默认模式                     | driver default                 | null                     | -                                                            |
| threadFactory             | 此属性允许您设置将用于创建池使用的所有线程的java.util.concurrent.ThreadFactory的实例。 | null                           | null                     | -                                                            |
| scheduledExecutor         | 此属性允许您设置将用于各种内部计划任务的java.util.concurrent.ScheduledExecutorService实例 | null                           | null                     | -                                                            |



### Spring Boot 整合 MyBatis

官方文档：http://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/



1. 导入 MyBatis 所需要的依赖

``` xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.3</version>
</dependency>
```

依赖版本，自己开发尽量选最新的。想要稳定的话，选使用人多的。



2. 配置数据库连接信息

```yaml
## 数据源配置
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/spring-boot-demo?useUnicode=true&characterEncoding=UTF-8&useSSL=false&autoReconnect=true&failOverReadOnly=false&serverTimezone=GMT%2B8
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
    type: com.zaxxer.hikari.HikariDataSource
    initialization-mode: always
    continue-on-error: true
    hikari:
      auto-commit: true ## 自动提交从池中返回的连接
      minimum-idle: 5 #最小空闲连接，默认值10，小于0或大于maximum-pool-size，都会重置为maximum-pool-size
      maximum-pool-size: 10 ## 最大连接数，小于等于0会被重置为默认值10；大于零小于1会被重置为minimum-idle的值
      idle-timeout: 50000 ## 空闲连接超时时间，默认值600000（10分钟），大于等于max-lifetime且max-lifetime>0，会被重置为0；不等于0且小于10秒，会被重置为10秒
      max-lifetime: 60000 ## 连接最大存活时间，不等于0且小于30秒，会被重置为默认值30分钟.设置应该比mysql设置的超时时间短
      connection-timeout: 60000 ## 连接超时时间：毫秒，小于250毫秒，否则被重置为默认值30秒
      connection-test-query: select 1 ## 用于测试连接是否可用的查询语句
      pool-name: mybatis01 ## 连接池的用户定义名称，主要出现在日志记录和JMX管理控制台中以识别池和池配置
      read-only: false ## 从池中获取的连接是否默认处于只读模式
```



### 非关系型数据库 NoSQL

#### Redis



#### MongoDB





## 五、Spring Boot 企业级开发

### Spring Security



### Shiro



### 异步消息

#### MQ 中间件对比



#### AMQP 实战（RabbitMQ）





## 六、Spring Boot 的部署、测试和监控

### 热部署



### 常规部署

#### jar 形式



#### war 形式

##### 自动部署 war 包到 tomcat

**修改项目 pom.xml 文件，将 jar 修改为 war**

```xml
<packaging>war</packaging>

```



**在`spring-boot-starter-web`依赖中移除 tomcat 模块**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- 或者设置部署时移除 tomcat -->
<!-- web 启动器 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<!-- tomcat 设置 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <!-- 打包阶段 exclude 剔除 -->
    <scope>provided</scope>
</dependency>

```



**新建启动类 Servlet 启动类**

与项目 Application 启动类同级

```java
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * 打 war 包导入外部 tomcat 运行，需要改变启动方式
 */
public class ServletInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // 此处的 Application.class 为带有 @SpringBootApplication 注解的启动类
        return builder.sources(MypagesAdminApplication.class);
    }
}

```



**配置 tomcat 的 manager**

编辑远程 tomcat 服务器下的 conf/tomcat-users.xml，在末尾增加（其实只要拉到文件末尾，去掉注释改一下就可以了）

```xml
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<user username="admin" password="123456" roles="manager-script"/>
<user username="root" password="123456.a" roles="manager-gui"/>
```



**在 tomcat 服务器的 conf/Catalina/localhost/ 目录下创建一个 manager.xml 文件**

为什么要加这个配置？不加行不行？

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context privileged="true" antiResourceLocking="false"
         docBase="${catalina.home}/webapps/manager">
             <Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="^.*$" />
</Context>
```



然后在浏览器中输入http://serverip:port/manager/html，此时会弹出要求输入用户名和密码对话框，输入manager-gui对应的用户和密码登录管理控制台(其中serverip为服务器ip，如果服务器在本地就是localhost，端口为tomcat端口，默认8080)。

![img](./SpringBoot%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/661702-20180626220642306-220143454.png)



**在 maven 项目中添加配置**

配置位置，自行调整

```xml
<tomcat8-maven-plugin.version>3.0-r1756463</tomcat8-maven-plugin.version>

<!-- tomcat 插件 -->
<dependency>
    <groupId>org.apache.tomcat.maven</groupId>
    <artifactId>tomcat8-maven-plugin</artifactId>
    <version>${tomcat8-maven-plugin.version}</version>
</dependency>

<!-- TODO 这个仓库用来下载 tomcat8-maven-plugin，如果不需要这个插件，这个插件仓库地址配置可以去掉 -->
<pluginRepositories>
    <pluginRepository>
        <id>alfresco-public</id>
        <url>https://artifacts.alfresco.com/nexus/content/groups/public</url>
    </pluginRepository>
    <pluginRepository>
        <id>alfresco-public-snapshots</id>
        <url>https://artifacts.alfresco.com/nexus/content/groups/public-snapshots</url>
        <snapshots>
            <enabled>true</enabled>
            <updatePolicy>daily</updatePolicy>
        </snapshots>
    </pluginRepository>
</pluginRepositories>

<plugins>
    <!-- 你的其他插件 -->
    <plugin>
        <groupId>org.apache.tomcat.maven</groupId>
        <artifactId>tomcat8-maven-plugin</artifactId>
        <configuration>
            <url>http://192.168.3.151:8081/manager/text</url>
            <username>tomcat</username>
            <password>123456.a</password>
            <path>/mypages</path><!-- tomcat webapps 下的项目目录名称 -->
            <port>8081</port>
            <update>true</update><!-- 自动解压，重启部署 -->
            <uriEncoding>UTF-8</uriEncoding>
        </configuration>
    </plugin>
</plugins>

```



然后进行部署，如果是第一次部署，在 maven 菜单栏，点击 tomcat 下的 deploy，或者运行 mvn tomcat7:deploy 进行自动部署(对于tomcat8,9，也是使用 tomcat7 命令)，如果是更新了代码后重新部署更新，运行mvn tomcat7:redeploy，如果第一次部署使用 mvn tomcat7:redeploy，则只会执行上传war文件，服务器不会自动解压部署。如果路径在 tomcat 服务器中已存在并且使用 mvn tomcat7:deploy 命令的话，上面的配置中一定要配置`<update>true</update>`，不然会报错。



如果出现 war 包大小限制，修改 /webapps/manager/WEB-INF/web.xml

```xml
<max-file-size>200000000</max-file-size>
<max-request-size>200000000</max-request-size>
```



### 云部署——基于 Docker 的部署



### Spring Boot 的测试



### 应用监控

#### http



#### JMX



#### SSH



