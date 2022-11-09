---
title: Dubbo资料教程
date: 2022-11-02 19:42:40
category:
    - 分布式架构
tag:
    - Dubbo
---

## 是什么？

### 官方定义

> 概念性的内容真的不用死记硬背，用进废退是整个自然界的规律，结合项目使用，理解记忆，用自己的话表述。

http://dubbo.apache.org/

Dubbo 是一款高性能、轻量级的开源 Java 服务框架。 致力于提供高性能和透明化的 RPC 远程服务调用方案，以及 SOA 服务治理方案，使得应用可通过高性能 RPC 实现服务的输出和输入功能，和 Spring 框架可以无缝集成。



自己总结描述：

Dubbo 是一个基于 RPC **远程过程调用**的 SOA 分布式服务框架。



### 发展历程

要不是因为发展历史混乱，估计都没人会整理记录内容了吧。

![1.PNG](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/dubbo-history.png)



## 有什么用？

### 官方功能描述

Dubbo 提供了六大核心能力：

1. **面向接口代理的高性能RPC调用**：提供高性能的基于代理的远程调用能力，服务以接口为粒度，为开发者屏蔽远程调用底层细节。

2. **智能容错和负载均衡**：内置多种负载均衡策略，智能感知下游节点健康状况，显著减少调用延迟，提高系统吞吐量。

3. **服务自动注册和发现**：支持多种注册中心服务，服务实例上下线实时感知。

4. **高度可扩展能力**：遵循微内核+插件的设计原则，所有核心能力如Protocol、Transport、Serialization被设计为扩展点，平等对待内置实现和第三方实现。

5. **运行期流量调度**：内置条件、脚本等路由策略，通过配置不同的路由规则，轻松实现灰度发布，同机房优先等功能。

6. **可视化的服务治理与运维**：提供丰富服务治理、运维工具：随时查询服务元数据、服务健康状态及调用统计，实时下发路由策略、调整配置参数。



### 互联网应用的架构演进

http://dubbo.apache.org/zh/docs/v2.7/user/preface/background/



![image](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/dubbo-architecture-roadmap.jpg)



**传统单一应用架构**
当网站流量很小时，只需一个应用，将所有功能都部署在一起，以减少部署节点和成本。此时，用于简化增删改查工作量的数据访问框架(ORM)是关键。

**垂直应用架构**
当访问量逐渐增大，单一应用增加机器带来的加速度越来越小，提升效率的方法之一是将应用拆成互不相干的几个应用，以提升效率。此时，用于加速前端页面开发的Web框架(MVC)是关键。

**分布式服务架构**
当垂直应用越来越多，应用之间交互不可避免，将核心业务抽取出来，作为独立的服务，逐渐形成稳定的服务中心，使前端应用能更快速的响应多变的市场需求。此时，用于提高业务复用及整合的分布式服务框架(RPC)是关键。

**流动计算架构**
当服务越来越多，容量的评估，小服务资源的浪费等问题逐渐显现，此时需增加一个调度中心基于访问压力实时管理集群容量，提高集群利用率。此时，用于提高机器利用率的资源调度和治理中心(SOA)是关键。



### Dubbo 作用

1. 解耦合，提高复用性。使用 Dubbo 可以将核心业务抽取出来，作为独立的服务，逐渐形成稳定的服务中心，可用于提高业务复用灵活扩展。

2. 更好地支持`高并发`、`高可用`、`高可扩` 。





## 实现原理

### RPC 原理

RPC（Remote Procedure Call）是指远程过程调用。



![image-20210120213300056](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210120213300056.png)



RPC 两个核心模块：**通讯，序列化**。



### Netty 通信原理

Netty 是由 JBOSS 提供的一个 java 开源框架，现为 Github上的独立项目。Netty 提供异步的、事件驱动的网络应用程序框架和工具，用以快速开发高性能、高可靠性的网络服务器和客户端程序。

也就是说，Netty 是一个基于 NIO 的客户端、服务端的编程框架，使用 Netty 可以确保你快速和简单的开发出一个网络应用，例如实现了某种协议的客户、服务端应用。Netty 相当于简化和流线化了网络应用的编程开发过程，例如：基于 TCP 和 UDP 的 socket 服务开发。（百度百科）



#### BIO（Blocking IO）

![image-20210120221848982](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210120221848982.png)



#### NIO （Non-Blocking IO）

![image-20210120221927419](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210120221927419.png)



Selector 一般称为**选择器** ，也可以翻译为**多路复用器**

Connect（连接就绪）、Accept（接受就绪）、Read（读就绪）、Write（写就绪）



#### Netty 基本原理

![image-20210120222105049](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210120222105049.png)





### Dubbo 运行原理

#### 框架设计

**1、架构示意图**

![image-20210120212333136](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210120212333136.png)



**服务提供者（Provider）**：暴露服务的服务提供方，服务提供者在启动时，向注册中心注册自己提供的服务。

**服务消费者（Consumer）**：调用远程服务的服务消费方，服务消费者在启动时，向注册中心订阅自己所需的服务，服务消费者，从提供者地址列表中，基于软负载均衡算法，选一台提供者进行调用，如果调用失败，再选另一台调用。

**注册中心（Registry）**：注册中心返回服务提供者地址列表给消费者，如果有变更，注册中心将基于长连接推送变更数据给消费者。

**监控中心（Monitor）**：服务消费者和提供者，在内存中累计调用次数和调用时间，定时每分钟发送一次统计数据到监控中心。



**调用关系说明**

1. 服务容器负责启动，加载，运行服务提供者。
2. 服务提供者在启动时，向注册中心注册自己提供的服务。
3. 服务消费者在启动时，向注册中心订阅自己所需的服务。
4. 注册中心返回服务提供者地址列表给消费者，如果有变更，注册中心将基于长连接推送变更数据给消费者。
5. 服务消费者，从提供者地址列表中，基于软负载均衡算法，选一台提供者进行调用，如果调用失败，再选另一台调用。
6. 服务消费者和提供者，在内存中累计调用次数和调用时间，定时每分钟发送一次统计数据到监控中心。



#### 启动解析、加载配置信息



#### 服务暴露



#### 服务引用



#### 服务调用





## 为什么选择它？有无其他更优方案？（货比三家）

### Dubbo 与 Spring Cloud 对比

![img](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/dubbo-springCloud.png)





## 怎样使用？

### 版本选择

参考 maven 仓库中的版本：

阿里 `2.6.x`

https://mvnrepository.com/artifact/com.alibaba/dubbo

apache `2.7.x`

https://mvnrepository.com/artifact/org.apache.dubbo/dubbo



很多中小型公司，在早期项目搭建的时候，使用 dubbo 框架的版本是阿里停止维护的`2.5.3`版本。

新项目或自己练习的项目尽量选择新版本，2.7 或 3.0。

![image-20210118182333934](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210118182333934.png)



### 环境搭建

#### Linux

##### 安装 zookeeper



##### 安装 Dubbo-admin 管理控制台



##### 安装 dubbo-monitor-simple 简单监控中心



#### docker

##### 安装 zookeeper

```shell
## 拉取指定版本镜像
sudo docker pull zookeeper:3.4.14

## 启动容器
sudo docker run -d -p 2181:2181 --name zoo01 --privileged=true zookeeper:3.4.14
sudo docker run -d -p 2181:2181 --name zoo01 --privileged=true zookeeper:3.7.0


```



##### 安装 Dubbo-admin 管理控制台

https://hub.docker.com/r/apache/dubbo-admin

```shell
sudo docker pull apache/dubbo-admin:lasted

sudo docker run -d \
-p 8083:8080 \
--name dubbo-admin \
-e admin.registry.address=zookeeper://192.168.3.151:2181 \
-e admin.config-center=zookeeper://192.168.3.151:2181 \
-e admin.metadata-report.address=zookeeper://192.168.3.151:2181 \
apache/dubbo-admin


sudo docker run -d \
-p 8083:8080 \
--name dubbo-admin \
-e admin.config-center=zookeeper://192.168.3.151:2181 \
-e admin.metadata-report.address=zookeeper://192.168.3.151:2181 \
apache/dubbo-admin


```



https://github.com/apache/dubbo-admin/wiki/Dubbo-Admin%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E

**Dubbo Admin配置说明**

min edited this page on Jul 24, 2019 · [9 revisions](https://github.com/apache/dubbo-admin/wiki/Dubbo-Admin配置说明/_history)

[English Version](https://github.com/apache/incubator-dubbo-ops/wiki/Dubbo-Admin-configuration)
`application.properties`配置项说明

- admin.config-center

  - 推荐使用，配置中心地址，比如`admin.config-center="zookeeper://127.0.0.1:2181"`

  - 需要在配置中心中，配置注册中心和元数据中心地址配置格式如下：

  - zookeeper

    - path: `/dubbo/config/dubbo/dubbo.properties`

    - content:

      ```
      dubbo.registry.address=zookeeper://127.0.0.1:2181
      dubbo.metadata-report.address=zookeeper://127.0.0.1:2181
      ```

- admin.registry.address

  - 不推荐使用，老版本的配置中心地址，比如：`admin.registry.address="zookeeper://127.0.0.1:2181"`
  - 如使用该配置，Dubbo Admin会将其作为注册中心和配置中心使用，元数据中心将无法使用，会影响服务测试等功能。





##### 安装 dubbo-monitor-simple 简单监控中心





### Spring Boot 整合 Dubbo

#### 使用 @EnableDubbo 注解

- 引入 jar 包依赖
- 在 springboot 的启动类上加上 @EnableDubbo 注解开启 Dubbo
- 在 application-*.yml 中配置 Dubbo



参考：

- [springboot+dubbo+zookeeper项目搭建](https://www.jianshu.com/p/5121fb9ae533)
- [SpringBoot 集成 Dubbo](https://www.cnblogs.com/mengd/p/14213879.html)
- [SpringBoot整合Dubbo](https://www.cnblogs.com/chy18883701161/p/12783892.html)



优点：清晰、方便、快捷

缺点：注解侵入代码，对后续更换微服务架构，造成不便



#### 使用 dubbo-spring-boot-starter

- 引入 jar 包依赖
- 不需要添加 @EnableDubbo
- 在 application-*.yml 中配置 Dubbo



##### 服务提供者

**pom.xml**

这里只是做个记录，配置需要自己修改，不能直接照搬。

```xml
<!-- 父工程版本 -->
<apache-dubbo.version>2.7.8</apache-dubbo.version>
<zookeeper.version>3.4.12</zookeeper.version>
<curator.version>4.2.0</curator.version>

<!-- apache dubbo starter -->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-spring-boot-starter</artifactId>
</dependency>
<!-- zookeeper -->
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
</dependency>
<!-- apache-curator 是 Apache ZooKeeper的 Java 客户端库 -->
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
</dependency>

```



**application.yml**

```yaml
## dubbo 配置
dubbo:
  application:
    name: mypages-god
  registry:
    address: zookeeper://192.168.3.151:2181
  protocol:
    name: dubbo
    port: 20880
  provider:
    actives: 10 ## 最大并发调用
    timeout: 10000
  scan:
    base-packages: cn.m1yellow.mypages.god.service.impl
    
```



**暴露服务接口**

```java
package cn.m1yellow.mypages.god.service.impl;


import cn.m1yellow.mypages.god.entity.UserBase;
import cn.m1yellow.mypages.god.mapper.UserBaseMapper;
import cn.m1yellow.mypages.god.service.UserBaseService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.apache.dubbo.config.annotation.DubboService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 用户表 服务实现类
 * </p>
 *
 * @author M1Yellow
 * @since 2021-04-13
 */
@DubboService(interfaceClass = UserBaseService.class, version = "1.0.0")
//@Service("userBaseService")
public class UserBaseServiceImpl extends ServiceImpl<UserBaseMapper, UserBase> implements UserBaseService {

    private static final Logger logger = LoggerFactory.getLogger(UserBaseServiceImpl.class);

    @Override
    public UserBase getByUserName(String userName) {
        if (StringUtils.isBlank(userName)) {
            return null;
        }
        QueryWrapper<UserBase> userBaseQueryWrapper = new QueryWrapper<>();
        userBaseQueryWrapper.eq("user_name", userName);
        UserBase userBase = getOne(userBaseQueryWrapper);
        return userBase;
    }
}

```



##### 服务消费者

**pom.xml**

跟提供者保持一致。

```xml
<!-- 父工程版本 -->
<apache-dubbo.version>2.7.8</apache-dubbo.version>
<zookeeper.version>3.4.12</zookeeper.version>
<curator.version>4.2.0</curator.version>

<!-- apache dubbo starter -->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-spring-boot-starter</artifactId>
</dependency>
<!-- zookeeper -->
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
</dependency>
<!-- apache-curator -->
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
</dependency>

```



**application.yml**

```yaml
## dubbo 配置
dubbo:
  application:
    name: mypages-admin
  registry:
    address: zookeeper://192.168.3.151:2181
  protocol:
    name: dubbo
    port: 20881
  provider:
    actives: 10 ## 最大并发调用
    timeout: 10000
  consumer:
    check: false
  scan:
    base-packages: cn.m1yellow.mypages.god.service
    
```



**调用服务**

```java
@DubboReference(interfaceClass = UserBaseService.class, version = "1.0.0")
private UserBaseService userBaseService;

```



#### 使用 xml 配置文件

> xml 方式代码侵入性小，刚开始想用这种方式搭建项目，方便以后更改微服务框架。
>
> 结果消费者项目硬是识别不了 dubbo reference 的 bean，查看了很多资料教程，都拯救不了，卡了将近整整两天！
>
> 实在没办法了，配置都是按着之前老项目 xml 形式配置的，就是找不到 bean，放弃了，个人水平有限，时间也耗不起，网上使用 xml 形式配置的资料也越来越少。
>
> 可能是 springboot 新版本做了什么改动，先放一放吧，最终采用注解形式，参照网上博客资料，很快就成功运行起来了。
>
> 



参考：

- [Spring Boot 中使用 Dubbo 详解](https://segmentfault.com/a/1190000011760385)



优缺点正好跟使用注解相反，具体使用哪种形式，就看公司技术经理选择了。



##### 服务提供者

**pom.xml**

添加 dubbo 关联依赖，版本号在父工程定义。

```xml
<!-- apache dubbo starter -->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-spring-boot-starter</artifactId>
</dependency>
<!-- zookeeper -->
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
</dependency>
<!-- apache-curator -->
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
</dependency>

```



**dubbo.properties**

```properties
################################################################################
## dubbo config
## 服务接口类扫描
spring.dubbo.scan=cn.m1yellow.mypages
## 暴露服务端口
dubbo.protocol.port=20880
## 提供方超时时间
dubbo.provider.timeout=10000
## 提供方版本
dubbo.provider.version=1.0.0
## 表示该服务使用独立的5条长连接
dubbo.provider.connections=5
## 固定大小线程池，启动时建立线程，不关闭，一直持有。(缺省)
dubbo.protocol.threadpool=fixed
## 线程数量，根据实际业务配置
dubbo.protocol.threads=50
## 配置重试次数，第一次不算，最好只用于读的重试，写操作可能会引起多次写，默认retries="0"
dubbo.provider.retries=0
## dubbo缓存文件
dubbo.cache=/data/dubbo/dubbo.cache
################################################################################
## zookeeper config
zookeeper.connect=192.168.3.151:2181
################################################################################

```



**dubbo.xml**

```xml
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd
       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 注解扫描 -->
    <!--<context:component-scan base-package="cn.m1yellow.mypages.god.service.impl"/>-->

    <!-- 提供方应用信息，用于计算依赖关系 -->
    <dubbo:application name="${spring.application.name}"/>

    <!-- 使用multicast广播注册中心暴露服务地址 -->
    <dubbo:registry protocol="zookeeper" address="${zookeeper.connect}" file="${dubbo.cache}" client="curator"/>

    <!-- 用dubbo协议在20880端口暴露服务 -->
    <!-- 添加 accesslog="true"，可以使用 accesslog 输出到 log4j -->
    <!-- 添加 accesslog="http://localhost/log.txt"，输出日志到文件 -->
    <dubbo:protocol name="dubbo" port="${dubbo.protocol.port}" threadpool="${dubbo.protocol.threadpool}"
                    threads="${dubbo.protocol.threads}"/>

    <!-- 提供方的缺省值，当ProtocolConfig和ServiceConfig某属性没有配置时，采用此缺省值，可选。-->
    <dubbo:provider connections="${dubbo.provider.connections}" timeout="${dubbo.provider.timeout}"
                    retries="${dubbo.provider.retries}" version="${dubbo.provider.version}"/>

    <!-- 消费方缺省配置，当ReferenceConfig某属性没有配置时，采用此缺省值，可选。-->
    <!--<dubbo:consumer version="${dubbo.provider.version}" check="false"/>-->

    <!-- 监控中心配置，用于配置连接监控中心相关信息，可选。-->
    <!--<dubbo:monitor protocol="registry"/>-->


    <!-- 声明需要暴露的服务接口，ref：指向服务接口的真正实现 -->
    <dubbo:service interface="cn.m1yellow.mypages.god.service.UserBaseService" ref="userBaseService"/>
    <dubbo:service interface="cn.m1yellow.mypages.god.service.SysUserRoleService" ref="sysUserRoleService"/>
    <dubbo:service interface="cn.m1yellow.mypages.god.service.SysRoleService" ref="sysRoleService"/>
    <dubbo:service interface="cn.m1yellow.mypages.god.service.SysPermissionService" ref="sysPermissionService"/>
    <dubbo:service interface="cn.m1yellow.mypages.god.service.SysRolePermissionService" ref="sysRolePermissionService"/>

</beans>

```



**注解配置类**

```java
package cn.m1yellow.mypages.god.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:config/dubbo.properties")
@ImportResource({"classpath:config/dubbo.xml"})
public class PropertiesConfig {

}

```



##### 服务消费者

**pom.xml**

添加 dubbo 关联依赖，版本号在父工程定义。

```xml
<!-- apache dubbo starter -->
<dependency>
    <groupId>org.apache.dubbo</groupId>
    <artifactId>dubbo-spring-boot-starter</artifactId>
</dependency>
<!-- zookeeper -->
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
</dependency>
<!-- apache-curator -->
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
</dependency>

```



**dubbo.properties**

```properties
################################################################################
## dubbo config
## 服务接口类扫描
spring.dubbo.scan=cn.m1yellow.mypages
## 暴露服务端口
dubbo.protocol.port=20881
## 提供方超时时间
dubbo.provider.timeout=10000
## 提供方版本
dubbo.provider.version=1.0
## 表示该服务使用独立的5条长连接
dubbo.provider.connections=5
## 固定大小线程池，启动时建立线程，不关闭，一直持有。(缺省)
dubbo.protocol.threadpool=fixed
## 线程数量，根据实际业务配置
dubbo.protocol.threads=50
## 配置重试次数，第一次不算，最好只用于读的重试，写操作可能会引起多次写，默认retries="0"
dubbo.provider.retries=0
## dubbo缓存文件
dubbo.cache=/data/dubbo/dubbo.cache
################################################################################
## zookeeper config
zookeeper.connect=192.168.3.151:2181
################################################################################


```



**dubbo.xml**

```xml
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd
       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 注解扫描 -->
    <context:component-scan base-package="cn.m1yellow.mypages.god.service"/>

    <!-- 提供方应用信息，用于计算依赖关系 -->
    <dubbo:application name="${spring.application.name}"/>

    <!-- 连接 zookeeper 注册中心 -->
    <dubbo:registry protocol="zookeeper" address="${zookeeper.connect}" file="${dubbo.cache}" client="curator"/>

    <!-- 用dubbo协议在指定端口暴露服务 -->
    <!-- 添加 accesslog="true"，可以使用 accesslog 输出到 log4j -->
    <!-- 添加 accesslog="http://localhost/log.txt"，输出日志到文件 -->
    <dubbo:protocol name="dubbo" port="${dubbo.protocol.port}" threadpool="${dubbo.protocol.threadpool}"
                    threads="${dubbo.protocol.threads}"/>

    <!-- 提供方的缺省值，当ProtocolConfig和ServiceConfig某属性没有配置时，采用此缺省值，可选。-->
    <!--<dubbo:provider connections="${dubbo.provider.connections}" timeout="${dubbo.provider.timeout}"
                    retries="${dubbo.provider.retries}" version="${dubbo.provider.version}"/>-->

    <!-- 消费方缺省配置，当ReferenceConfig某属性没有配置时，采用此缺省值，可选。-->
    <dubbo:consumer version="${dubbo.provider.version}" check="false"/>

    <!-- 监控中心配置，用于配置连接监控中心相关信息，可选。-->
    <!--<dubbo:monitor protocol="registry"/>-->


    <!-- 增加调用远程服务配置 -->
    <!-- check：在启动时检查依赖的服务是否可用，不可用时抛出异常，阻止Spring初始化完成，以便上线时，能及早发现问题，默认check=true。没有提供者时还是会报错。 -->
    <dubbo:reference id="userBaseService" interface="cn.m1yellow.mypages.god.service.UserBaseService" check="false"/>
    <dubbo:reference id="sysUserRoleService" interface="cn.m1yellow.mypages.god.service.SysUserRoleService" check="false"/>
    <dubbo:reference id="sysRoleService" interface="cn.m1yellow.mypages.god.service.SysRoleService" check="false"/>
    <dubbo:reference id="sysPermissionService" interface="cn.m1yellow.mypages.god.service.SysPermissionService" check="false"/>
    <dubbo:reference id="sysRolePermissionService" interface="cn.m1yellow.mypages.god.service.SysRolePermissionService" check="false"/>

</beans>


```



**注解配置类**

```java
package cn.m1yellow.mypages.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:config/dubbo.properties")
@ImportResource({"classpath:config/dubbo.xml"})
public class PropertiesConfig {

}


```







### 主要配置

参考官方**用法示例**，比较详细！

https://dubbo.apache.org/zh/docs/v2.7/user/examples/



#### 启动时检查

在启动时检查依赖的服务是否可用

Dubbo 缺省会在启动时检查依赖的服务是否可用，不可用时会抛出异常，阻止 Spring 初始化完成，以便上线时，能及早发现问题，默认 `check="true"`。

可以通过 `check="false"` 关闭检查，比如，测试时，有些服务不关心，或者出现了循环依赖，必须有一方先启动。

另外，如果你的 Spring 容器是懒加载的，或者通过 API 编程延迟引用服务，请关闭 check，否则服务临时不可用时，会抛出异常，拿到 null 引用，如果 `check="false"`，总是会返回引用，当服务恢复时，能自动连上。在启动时检查依赖的服务是否可用

Dubbo 缺省会在启动时检查依赖的服务是否可用，不可用时会抛出异常，阻止 Spring 初始化完成，以便上线时，能及早发现问题，默认 `check="true"`。

可以通过 `check="false"` 关闭检查，比如，测试时，有些服务不关心，或者出现了循环依赖，必须有一方先启动。

另外，如果你的 Spring 容器是懒加载的，或者通过 API 编程延迟引用服务，请关闭 check，否则服务临时不可用时，会抛出异常，拿到 null 引用，如果 `check="false"`，总是会返回引用，当服务恢复时，能自动连上。



更多详细配置：https://dubbo.apache.org/zh/docs/v2.7/user/examples/preflight-check/



#### 配置原则

##### Dubbo 支持四种配置

- JVM System Properties，-D 参数
- Externalized Configuration，外部化配置
- ServiceConfig、ReferenceConfig 等编程接口采集的配置
- 本地配置文件 dubbo.properties



##### 配置参数覆盖关系

下图展示了配置覆盖关系的优先级，从上到下优先级依次降低：

![覆盖关系](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/configuration.jpg)



##### 不同粒度配置的覆盖关系

以 timeout 为例，下图显示了配置的查找顺序，其它 retries, loadbalance, actives 等类似：

- 方法级优先，接口级次之，全局配置再次之。
- 如果级别一样，则消费方优先，提供方次之。

其中，服务提供方配置，通过 URL 经由注册中心传递给消费方。



![dubbo-config-override](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/dubbo-config-override.jpg)



建议由服务提供方设置超时，因为一个方法需要执行多长时间，服务提供方更清楚，如果一个消费方同时引用多个服务，就不需要关心每个服务的超时设置。



#### 重试次数

在消费者的 dubbo:reference 标签中设置 retries="2"，不包含第一次调用。

注意事项：

根据接口类型设置，

幂等（接口方法执行一次和多次的结果是一样的）：可以设置重试次数

非幂等：不能设置重试次数，否则会造成方法重复执行，即重放攻击



#### 超时时间

**单个引用设置超时**

在 dubbo:reference 标签中添加 timeout="10000" 属性，单位毫秒，默认超时时间是 1000 ms。

**消费者 reference**

在 dubbo:consumer 标签中添加  timeout="10000" 属性，在 dubbo:reference 没有设置超时时间的情况下，取这个全局配置。



**超时配置优先级：（由高到低）**

消费者 reference 中的 method 调用设置的超时

消费者 reference 设置的超时

消费者 consumer 设置的超时

提供者 service 设置的超时



#### 多版本

在 dubbo:service 中可以设置 version="1.0.0"、version="1.0.1"等版本号，

在 dubbo:reference 中可以指定 version 版本，确认调用的方法版本，如果配置 version="*" 表示随机调用。



适用于新版本内测，即灰度测试。



#### 多协议

- [Dubbo协议（官网且很详细）](https://dubbo.apache.org/zh/docs3-v2/java-sdk/reference-manual/protocol/dubbo/)



| 协议       | 场景                                                         |
| ---------- | ------------------------------------------------------------ |
| Dubbo 协议 | 采用单一长连接和 NIO 异步通讯，适合于**小数据量大并发**的服务调用，以及服务消费者机器数远大于服务提供者机器数的情况。（缺省默认） |
|            |                                                              |
|            |                                                              |
|            |                                                              |



在 Dubbbo 中配置多协议

Dubbo 允许配置多协议，在不同服务上支持不同协议或者同一服务上同时支持多种协议。



**不同服务不同协议**

不同服务在性能上适用不同协议进行传输，比如大数据用短连接协议，小数据大并发用长连接协议

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd"> 
    <dubbo:application name="world"  />
    <dubbo:registry id="registry" address="10.20.141.150:9090" username="admin" password="hello1234" />
    <!-- 多协议配置 -->
    <dubbo:protocol name="dubbo" port="20880" />
    <dubbo:protocol name="rmi" port="1099" />
    <!-- 使用dubbo协议暴露服务 -->
    <dubbo:service interface="com.alibaba.hello.api.HelloService" version="1.0.0" ref="helloService" protocol="dubbo" />
    <!-- 使用rmi协议暴露服务 -->
    <dubbo:service interface="com.alibaba.hello.api.DemoService" version="1.0.0" ref="demoService" protocol="rmi" /> 
</beans>

```



**多协议暴露服务**

需要与 http 客户端相互操作

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd">
    <dubbo:application name="world"  />
    <dubbo:registry id="registry" address="10.20.141.150:9090" username="admin" password="hello1234" />
    <!-- 多协议配置 -->
    <dubbo:protocol name="dubbo" port="20880" />
    <dubbo:protocol name="hessian" port="8080" />
    <!-- 使用多个协议暴露服务 -->
    <dubbo:service id="helloService" interface="com.alibaba.hello.api.HelloService" version="1.0.0" protocol="dubbo,hessian" />
</beans>

```



#### 本地存根

https://dubbo.apache.org/zh/docs/v2.7/user/examples/local-stub/

在 Dubbo 中利用本地存根在客户端执行部分逻辑。**也就是在消费者调用提供者服务接口之前，先进行一些参数判断，满足条件才真正去调用远程的方法。**能一定程度地提升效率。

远程服务后，客户端通常只剩下接口，而实现全在服务器端，但提供方有些时候想在客户端也执行部分逻辑，比如：做 ThreadLocal 缓存，提前验证参数，调用失败后伪造容错数据等等，此时就需要在 API 中带上 Stub，客户端生成 Proxy 实例，会把 Proxy 通过构造函数传给 Stub [1](https://dubbo.apache.org/zh/docs/v2.7/user/examples/local-stub/#fn:1)，然后把 Stub 暴露给用户，Stub 可以决定要不要去调 Proxy。

![/user-guide/images/stub.jpg](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/stub.jpg)

在 spring 配置文件中按以下方式配置：

```xml
<dubbo:service interface="com.foo.BarService" stub="true" />
```

或

```xml
<dubbo:service interface="com.foo.BarService" stub="com.foo.BarServiceStub" />
```

提供 Stub 的实现 [2](https://dubbo.apache.org/zh/docs/v2.7/user/examples/local-stub/#fn:2)：

```java
package com.foo;
public class BarServiceStub implements BarService {
    private final BarService barService;
    
    // 构造函数传入真正的远程代理对象
    public BarServiceStub(BarService barService){
        this.barService = barService;
    }
 
    public String sayHello(String name) {
        // 此代码在客户端执行, 你可以在客户端做ThreadLocal本地缓存，或预先验证参数是否合法，等等
        try {
            return barService.sayHello(name);
        } catch (Exception e) {
            // 你可以容错，可以做任何AOP拦截事项
            return "容错数据";
        }
    }
}
```



#### 只订阅

**只订阅不注册**，服务我自己想用，但又不想让别人发现。

为方便开发测试，经常会在线下共用一个所有服务可用的注册中心，这时，如果一个正在开发中的服务提供者注册，可能会影响消费者不能正常运行。

可以让服务提供者开发方，只订阅服务(开发的服务可能依赖其它服务)，而不注册正在开发的服务，通过直连测试正在开发的服务。

![/user-guide/images/subscribe-only.jpg](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/subscribe-only.jpg)

禁用注册配置

```xml
<dubbo:registry address="10.20.153.10:9090" register="false" />
```

或者

```xml
<dubbo:registry address="10.20.153.10:9090?register=false" />
```



#### 只注册

**只注册不订阅**，服务我注册了，先占个坑，暂时不让你用。

如果有两个镜像环境，两个注册中心，有一个服务只在其中一个注册中心有部署，另一个注册中心还没来得及部署，而两个注册中心的其它应用都需要依赖此服务。这个时候，可以让服务提供者方只注册服务到另一注册中心，而不从另一注册中心订阅服务。

禁用订阅配置

```xml
<dubbo:registry id="hzRegistry" address="10.20.153.10:9090" />
<dubbo:registry id="qdRegistry" address="10.20.141.150:9090" subscribe="false" />
```

或者

```xml
<dubbo:registry id="hzRegistry" address="10.20.153.10:9090" />
<dubbo:registry id="qdRegistry" address="10.20.141.150:9090?subscribe=false" />
```





### 高可用（7x24）

#### zookeeper 宕机

zookeeper 注册中心宕机，还能访问 dubbo 服务吗？

能，只要连接过一次，就在本地缓存文件保存了连接信息，注册中心连不上，会从本地缓存中找接口连接信息。



- 监控中心宕掉不影响使用，只是丢失部分采样数据

- 数据库宕掉后，注册中心仍能通过缓存提供服务列表查询，但不能注册新服务

- 注册中心对等集群，任意一台宕掉后，将自动切换到另一台

-  **注册中心全部宕掉后，服务提供者和服务消费者仍能通过本地缓存通讯**

- 服务提供者无状态，任意一台宕掉后，不影响使用

- 服务提供者全部宕掉后，服务消费者应用将无法使用，并无限次重连等待服务提供者恢复



#### dubbo 直连

不用注册中心，能不能使用 dubbo 提供者的服务？

能，可以直接在 dubbo:reference 标签或 @Reference 注解中指定 dubbo 服务的 url 地址，就可以直连。



```
<dubbo:reference id="xxxService" interface="com.alibaba.xxx.XxxService" url="dubbo://localhost:20890" />

@Reference(url="dubbo://localhost:20890")

```



#### 集群容错

https://dubbo.apache.org/zh/docs/v2.7/user/examples/fault-tolerent-strategy/



集群调用失败时，Dubbo 提供的容错方案

在集群调用失败时，Dubbo 提供了多种容错方案，缺省为 failover 重试。

![cluster](https://www.m1yellow.cn/doc-img/Dubbo%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/cluster.jpg)



各节点关系：

- 这里的 `Invoker` 是 `Provider` 的一个可调用 `Service` 的抽象，`Invoker` 封装了 `Provider` 地址及 `Service` 接口信息
- `Directory` 代表多个 `Invoker`，可以把它看成 `List<Invoker>` ，但与 `List` 不同的是，它的值可能是动态变化的，比如注册中心推送变更
- `Cluster` 将 `Directory` 中的多个 `Invoker` 伪装成一个 `Invoker`，对上层透明，伪装过程包含了容错逻辑，调用失败后，重试另一个
- `Router` 负责从多个 `Invoker` 中按路由规则选出子集，比如读写分离，应用隔离等
- `LoadBalance` 负责从多个 `Invoker` 中选出具体的一个用于本次调用，选的过程包含了负载均衡算法，调用失败后，需要重选



集群模式配置

按照以下示例在服务提供方和消费方配置集群模式

```xml
<dubbo:service cluster="failsafe" />
```

或

```xml
<dubbo:reference cluster="failsafe" />
```



##### Failover Cluster

失败自动切换，当出现失败，重试其它服务器。通常用于读操作，但重试会带来更长延迟。可通过 `retries="2"` 来设置重试次数(不含第一次)。

重试次数配置如下：

```xml
<dubbo:service retries="2" />
```

或

```xml
<dubbo:reference retries="2" />
```

或

```xml
<dubbo:reference>
    <dubbo:method name="findFoo" retries="2" />
</dubbo:reference>
```



##### Failfast Cluster

快速失败，只发起一次调用，失败立即报错。通常用于非幂等性的写操作，比如新增记录。



> 幂等性：就是用户对于同一操作发起的一次请求或者多次请求的结果是一致的。



##### Failsafe Cluster

失败安全，出现异常时，直接忽略。通常用于写入审计日志等操作。



##### Failback Cluster

失败自动恢复，后台记录失败请求，定时重发。通常用于消息通知操作。



##### Forking Cluster

并行调用多个服务器，只要一个成功即返回。通常用于实时性要求较高的读操作，但需要浪费更多服务资源。可通过 `forks="2"` 来设置最大并行数。



##### Broadcast Cluster

广播调用所有提供者，逐个调用，任意一台报错则报错。通常用于通知所有提供者更新缓存或日志等本地资源信息。

现在广播调用中，可以通过 broadcast.fail.percent 配置节点调用失败的比例，当达到这个比例后，BroadcastClusterInvoker 将不再调用其他节点，直接抛出异常。 broadcast.fail.percent 取值在 0～100 范围内。默认情况下当全部调用失败后，才会抛出异常。 broadcast.fail.percent 只是控制的当失败后是否继续调用其他节点，并不改变结果(任意一台报错则报错)。broadcast.fail.percent 参数 在 dubbo2.7.10 及以上版本生效。

Broadcast Cluster 配置 broadcast.fail.percent。

broadcast.fail.percent=20 代表了当 20% 的节点调用失败就抛出异常，不再调用其他节点。

```text
@reference(cluster = "broadcast", parameters = {"broadcast.fail.percent", "20"})
```



#### 负载均衡

https://dubbo.apache.org/zh/docs/v2.7/user/examples/loadbalance/



在集群负载均衡时，Dubbo 提供了多种均衡策略，缺省为 `random` 随机调用。



##### Random LoadBalance

- **随机**，按权重设置随机概率。
- 在一个截面上碰撞的概率高，但调用量越大分布越均匀，而且按概率使用权重后也比较均匀，有利于动态调整提供者权重。



##### RoundRobin LoadBalance

- **轮询**，按公约后的权重设置轮询比率。
- 存在慢的提供者累积请求的问题，比如：第二台机器很慢，但没挂，当请求调到第二台时就卡在那，久而久之，所有请求都卡在调到第二台上。



##### LeastActive LoadBalance

- **最少活跃调用数**，相同活跃数的随机，活跃数指调用前后计数差。
- 使慢的提供者收到更少请求，因为越慢的提供者的调用前后计数差会越大。



##### ConsistentHash LoadBalance

- **一致性 Hash**，相同参数的请求总是发到同一提供者。
- 当某一台提供者挂时，原本发往该提供者的请求，基于虚拟节点，平摊到其它提供者，不会引起剧烈变动。
- 算法参见：http://en.wikipedia.org/wiki/Consistent_hashing
- 缺省只对第一个参数 Hash，如果要修改，请配置 `<dubbo:parameter key="hash.arguments" value="0,1" />`
- 缺省用 160 份虚拟节点，如果要修改，请配置 `<dubbo:parameter key="hash.nodes" value="320" />`



##### 具体配置

服务端服务级别

```xml
<dubbo:service interface="..." loadbalance="roundrobin" />
```



客户端服务级别

```xml
<dubbo:reference interface="..." loadbalance="roundrobin" />
```



服务端方法级别

```xml
<dubbo:service interface="...">
    <dubbo:method name="..." loadbalance="roundrobin"/>
</dubbo:service>
```



客户端方法级别

```xml
<dubbo:reference interface="...">
    <dubbo:method name="..." loadbalance="roundrobin"/>
</dubbo:reference>
```



#### 服务降级

官方文档：https://dubbo.apache.org/zh/docs3-v2/java-sdk/advanced-features-and-usage/service/service-downgrade/



什么是服务降级？

当服务器压力剧增的情况下，根据实际业务情况及流量，对一些服务和页面有策略的不处理或换种简单的方式处理，从而释放服务器资源以保证核心交易正常运作或高效运作。



简单理解：

**牺牲某一些细枝末节的功能，来确保主干业务功能的正常高效运转。**



**使用方式**

以 xml 配置为例：（通过注解方式配置类似）



1. 配置 `mock="true"`

例：

```xml
<dubbo:reference id="demoService" interface="com.xxx.service.DemoService" mock="true" />
```

这种方式需要在相同包下有类名 + `Mock`后缀的实现类，即`com.xxx.service`包下有`DemoServiceMock`类。



2. 配置 `mock="com.xxx.service.DemoServiceMock"`

例：

```xml
<dubbo:reference id="demoService" interface="com.xxx.service.DemoService" mock="com.xxx.service.DemoServiceMock" />
```

这种方式指定 Mock 类的全路径。



3. 配置 `mock="[fail|force]return|throw xxx"`

- fail 或 force 关键字可选，表示调用失败或不调用强制执行 mock 方法，如果不指定关键字默认为 fail
- return 表示指定返回结果，throw 表示抛出指定异常
- xxx 根据接口的返回类型解析，可以指定返回值或抛出自定义的异常

例：

```xml
<dubbo:reference id="demoService" interface="com.xxx.service.DemoService" mock="return" />
<dubbo:reference id="demoService" interface="com.xxx.service.DemoService" mock="return null" />
<dubbo:reference id="demoService" interface="com.xxx.service.DemoService" mock="fail:return aaa" />
<dubbo:reference id="demoService" interface="com.xxx.service.DemoService" mock="force:return true" />
<dubbo:reference id="demoService" interface="com.xxx.service.DemoService" mock="fail:throw" />
<dubbo:reference id="demoService" interface="com.xxx.service.DemoService" mock="force:throw java.lang.NullPointException" />
```



4. 配合 dubbo-admin 使用（页面实时修改配置）

- 应用消费端引入 [`dubbo-mock-admin`](https://github.com/apache/dubbo-spi-extensions/tree/master/dubbo-mock-extensions)依赖
- 应用消费端启动时设置 JVM 参数，`-Denable.dubbo.admin.mock=true`
- 启动 dubbo-admin，在服务 Mock-> 规则配置菜单下设置 Mock 规则

以服务方法的维度设置规则，设置返回模拟数据，动态启用/禁用规则



**注意事项**

Dubbo 启动时会检查配置，当 mock 属性值配置有误时会启动失败，可根据错误提示信息进行排查

- 配置格式错误，如 `return+null` 会报错，被当做 mock 类型处理，`return` 后面可省略不写或者跟空格后再跟返回值
- 类型找不到错误，如自定义 mock 类、throw 自定义异常，请检查类型是否存在或是否有拼写错误





#### 整合 hystrix

Hystrix 旨在通过控制那些访问远程系统、服务和第三方库的节点，从而对延迟和故障提供更强大的容错能力。Hystrix具备拥有回退机制和断路器功能的线程和信号隔离，请求缓存和请求打包，以及监控和配置等功能。



##### 配置 spring-cloud-starter-netflix-hystrix

spring boot官方提供了对hystrix的集成，直接在pom.xml里加入依赖：

```xml
 <dependency>
     <groupId>org.springframework.cloud</groupId>
     <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
     <version>1.4.4.RELEASE</version>
</dependency>  

```

然后在Application类上增加@EnableHystrix来启用hystrix starter：

  @SpringBootApplication  @EnableHystrix  public class ProviderApplication {     

 

##### 配置 Provider 端

在Dubbo的Provider上增加@HystrixCommand配置，这样子调用就会经过Hystrix代理。

```java
@Service(version = "1.0.0")
public class HelloServiceImpl implements HelloService {
    @HystrixCommand(commandProperties = {
     @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
     @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "2000") })
    @Override
    public String sayHello(String name) {
        // System.out.println("async provider received: " + name);
        // return "annotation: hello, " + name;
        throw new RuntimeException("Exception to show hystrix enabled.");
    }
}

```



##### 配置 Consumer 端

对于Consumer端，则可以增加一层method调用，并在method上配置@HystrixCommand。当调用出错时，会走到fallbackMethod = "reliable"的调用里。

```java
@Reference(version = "1.0.0")
private HelloService demoService;

@HystrixCommand(fallbackMethod = "reliable")
public String doSayHello(String name) {
    return demoService.sayHello(name);
}
public String reliable(String name) {
    return "hystrix fallback value";
}

```





## 六、存在的缺陷和问题，及是否有应对措施？





## 七、后期维护升级的难度和成本





## 八、面试题（主干、重难点）

- [Dubbo夺命17连问](https://youle.zhipin.com/articles/8dc92004107d8093qxB709y9Fw~~.html)



> 看着像八股文，其实是考查对 dubbo 的理解和熟练程度。
>
> 八股文和底层源码实现原理，足够卷退一大批人了！要不是为了生活，讨口饭吃，谁特么愿意拿大好的年华去看这些

- Dubbo是什么？RPC又是什么？
- Dubbo能做什么？
- 能说下Dubbo的总体的调用过程吗？
- 说说Dubbo 支持哪些协议，每种协议的应用场景和优缺点
- Dubbo中都用到哪些设计模式？
- 如果Dubbo中provider提供的服务由多个版本怎么办？
- 服务暴露的流程是怎么样的？
- 服务引用的流程是怎么样的？
- Dubbo的注册中心有哪些？
- 聊聊Dubbo SPI机制？
- Dubbo的SPi和JAVA的SPI有什么区别？
- 有哪些负载均衡策略？
- 集群容错方式有哪些？
- 说说Dubbo的分层？
- 服务提供者能实现失效踢出是什么原理？
- 为什么要通过代理对象通信？
- 怎么设计一个RPC框架？



