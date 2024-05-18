---
title: JDK新版本特性
date: 2024-05-09 17:57:52
category:
    - Java
tag:
    - JDK
    - Java
---

## 闲言碎语

### 为什么 JDK 版本发布那么快？跟主流版本相差那么大？

**版本发布快**

每 6 个月发布一个大版本，每两年发布一个 LTS 版本。

JDK 版本号迭代太快，Oracle 非要这么搞，至于具体功能改动大不大，解释权在他们那里。



**市场主流版本差距大**

1. 要的是长期稳定，而不是一直升级到最新版
2. 升级成本大于收益
3. 项目历史代码太多、依赖组件库太多，牵一发动全身，除非有致命漏洞，谁愿意每年花半月几月去升级



### JDK 与 OpenJDK 的区别？

- [ChatGAi](https://chatgai.lovepor.cn/)
- [OpenJDK 与 Oracle JDK](https://www.redhat.com/zh/topics/application-modernization/openjdk-vs-oracle-jdk)
- [Oracle JDK与OpenJDK：区别、关系与实际应用](https://developer.baidu.com/article/detail.html?id=3316588)
- [OpenJDK傻傻分不清楚？](https://zhuanlan.zhihu.com/p/677803584)



Java JDK（Java Development Kit）是Java开发工具包，包含了Java开发所需的工具和库。而OpenJDK则是一个免费、开源的Java开发工具包，是Oracle JDK（商业版Java开发工具包）的基础。以下是Java JDK和OpenJDK之间的一些主要区别：

1. 许可协议：Java JDK包括Oracle JDK和OpenJDK。Oracle JDK是Oracle公司提供的商业版Java开发工具包，通常需要商业许可。而OpenJDK是免费的、开源的，基于GPL（通用公共许可证）发行。

2. 官方支持：Oracle JDK提供商业支持和技术支持，包括定期的更新、安全补丁和技术支持。OpenJDK虽然也有社区支持，但不提供像Oracle JDK那样的官方商业支持。

3. 功能差异：Oracle JDK和OpenJDK的功能基本上是一致的，两者的API和库也是兼容的。不过Oracle JDK可能包含一些商业特性或高级功能，而OpenJDK则是一个纯粹的开源项目。

4. 发布频率：Oracle JDK的发布频率一般比OpenJDK快一些，可能会提供更即时的安全更新和新功能。OpenJDK的发布节奏可能受到社区贡献者和维护者的影响。

总的来说，Java JDK包含了商业版Oracle JDK和免费的OpenJDK两个版本，而OpenJDK是一个免费、开源的Java开发工具包。您可以根据自己的需求选择使用Oracle JDK还是OpenJDK。如果您只需要基本的Java开发工具包，并且不需要商业支持，OpenJDK可能是一个不错的选择。



### 到底选哪个 JDK 版本？

1. 商用免费

2. 官方还在维护支持的，当然最好是 LTS (Long-Term Support) 版本
3. 公司项目主流 JDK 版本，除非新项目要求用新版本
4. 公司项目升级 JDK 大版本，一定要经过老板或负责人同意，排期升级任务，出问题一起抗
5. 公司或个人新项目，可以考虑选用新的 LTS 版本



**开源免费商用的 JDK**

1. OpenJDK：OpenJDK是Java SE平台版的开源和免费实现，它是Sun Corporation（现在的Oracle Corporation）于2006年开始的开发结果。它是根据GNU GPL许可证授权的。它最初于2007年发布。它由Oracle Corporation，Red Hat，IBM，Apple Inc.，OpenJDK和Java Community等开发。它是使用C ++和Java编程语言编写的。它支持不同的操作系统，如FreeBSD，Linux，Microsoft Windows，Mac OS X. OpenJDK是Java SE Platform Edition的官方参考实现。
2. Adoptium Eclipse Temurin（AdoptOpenJDK）：AdoptOpenJDK，更新到jdk16后就停止更新了，因为AdoptOpenJDK移交给Eclipse基金会后改名为：Adoptium Eclipse Temurin，后续维护工作就交给Eclipse基金会了。
3. Red Hat OpenJDK： Red Hat 公司提供的一款基于 OpenJDK 的免费和开源的 Java 开发工具包。 在 OpenJDK 的基础上提供了增强和修复；提供及时的安全更新和修复程序；提供长期支持版本。
4. Azul Zulu：由Azul Systems提供的一款开源的Java开发工具包（JDK）。它基于OpenJDK项目，并通过对JVM进行优化和性能调整，提供了高性能、可靠性和稳定性的Java运行环境。也提供了长期支持（LTS）版本，以满足企业级应用的需求。
5. Alibaba Dragonwell（龙井）：阿里巴巴集团开发的一款定制的Java开发工具包（JDK）。Dragonwell是基于OpenJDK项目的自定义版本，旨在提供针对阿里巴巴内部应用场景的优化和性能调整。与Oracle JDK兼容，并遵循Java标准规范，有长期支持（LTS）版本。
6. Amazon Corretto：亚马逊提供的一款免费的、多功能的 OpenJDK 发行版。它基于 OpenJDK 并且是免费提供给开发者和企业使用的，提供了长期支持（LTS）的版本，并以一种经过优化和测试的形式向开发者呈现。



**Oracle JDK 免费商用版本**

- [JDK收费的各个版本（记录一下）](https://developer.aliyun.com/article/1451089)

Java收费的安装包使用的时候要闭坑

从2019年1月份开始，Oracle JDK 开始对 Java SE 8 之后的版本开始进行商用收费，确切的说是 8u201/202 之后的版本。如果你用 Java 开发的功能如果是用作商业用途的，如果还不想花钱购买的话，能免费使用的最新版本是 8u201/202。当然如果是个人客户端或者个人开发者可以免费试用 Oracle JDK 所有的版本。

Java11 的性能提升

仅通过切换到 Java 11 就有 16％ 的改进，这种改进可能是因为 Java 10 中引入了 JEP 307: Parallel Full GC for G1。

具体如下：

JDK8 之前版本，仍然免费。

JDK8 免费版本到 8u202，从 8u211版本开始收费。

JDK9、JDK10，全版本免费。

JDK11，免费版本到 11.0.2，从 11.0.3 版本开始商用收费。

JDK12、JDK13、JDK14、JDK15、JDK16，全版本商用收费。

JDK17、JDK18、JDK19、JDK20，全版本(二进制版本)免费。



一、免费版本

Java的免费版本包括以下几个版本：

4(1.4)

5(1.5)

6

7

8(update 211以前)

9

10

17

这些版本都可以供用户自由下载和使用，无需支付任何费用。用户不仅可以使用Java的基本功能，还可以无限制地发布和分发自己的应用程序。



- [Oracle JDK17及以后的版本真的都免费么？](https://zhuanlan.zhihu.com/p/414822476)

> 其实只是单个 LTS 版本发布的头三年可以免费商用，三年之后，这个 LTS 版本就要收费了！比如，JDK 17、21，头三年免费用，等公司项目形成依赖，离不开 Oracle JDK 了，发现后续的更新和维护要交费了！这套路真是绝了！
>
> 至于三年到期后，是否可以像 JDK 8 一样，只要不升级收费版，就可以一直商用？在网上找了半天没找到答案！有人说三年试用结束就不让用了；有人说只要不升级收费版，就可以一直用；还有人说一开始就不该去试用！别老听别人说，直接联系 Oracle 咨询不就知道了？或者请教其他买过的人！
>
> 但是可以用三年，然后无缝升级到下一个 LTS 版本续杯！不过以 Oracle 的商业本性，想白嫖 JDK 估计不太现实！



二、付费版本

Java的付费版本包括以下几个版本：

8(update 211以后)

11～16





### 后续 JDK 版本怎样升级？会遇到哪些问题？

1. 参考技术博客升级经验，重点关注可能出问题的地方
2. 大项目分模块逐个升级，做好模块对外接口测试





## LTS 新功能特性

- [JDK新特性](https://javaguide.cn/java/new-features/java8-common-new-features.html)

- [JDK新特性](https://blogres.github.io/java/new-features/)



> [blogres](https://blogres.github.io/article) 这个开源博客里面已经整理的很好了，咱去克隆一份到本地即可，没必要自己又整理一遍。实在要整理，就在他的基础上补充完善就好了。



### JDK 8（2014.03 ~ 2030.12）

- [Java 8 新特性实战](https://blogres.github.io/java/new-features/java8-common-new-features.html)



> 新版任你发，我用 Java 8



#### Lambda 表达式

- [Java8新特性之Lambda表达式](https://www.cnblogs.com/tanghaorong/p/11563226.html)



#### functional interface 函数式编程

- [Java 8 - 函数编程(lambda表达式)](https://www.pdai.tech/md/java/java8/java8-stream.html)



#### Stream API

- [Java8新特征之Stream API](https://www.cnblogs.com/tanghaorong/p/11605281.html)



#### Optional 类

- [Java8新特征之Optional类](https://www.cnblogs.com/tanghaorong/p/11644253.html)



使用Optional类可以避免显式的null值判断（null的防御性检查），避免null导致的NPE（NullPointerException）。

其实就是在对象外层封装，进行 null 判断，个人觉得，还是使用之前进行判断更加简单明了。



#### 接口 default、static 方法





#### 类型注解





#### 重复注解

https://www.pdai.tech/md/java/java8/java8-anno-repeat.html



**什么是重复注解**

允许在同一申明类型(类，属性，或方法)的多次使用同一个注解



**JDK8之前**

java 8之前也有重复使用注解的解决方案，但可读性不是很好，比如下面的代码:

```java
public @interface Authority {
     String role();
}

public @interface Authorities {
    Authority[] value();
}

public class RepeatAnnotationUseOldVersion {

    @Authorities({@Authority(role="Admin"),@Authority(role="Manager")})
    public void doSomeThing(){
    }
}

```



由另一个注解来存储重复注解，在使用时候，用存储注解Authorities来扩展重复注解。



 **Jdk8重复注解**

java 8里面的做法:

```java
@Repeatable(Authorities.class)
public @interface Authority {
     String role();
}

public @interface Authorities {
    Authority[] value();
}

public class RepeatAnnotationUseNewVersion {
    @Authority(role="Admin")
    @Authority(role="Manager")
    public void doSomeThing(){ }
}

```



不同的地方是，创建重复注解Authority时，加上@Repeatable,指向存储注解Authorities，在使用时候，直接可以重复使用Authority注解。从上面例子看出，java 8里面做法更适合常规的思维，可读性强一点



#### 类型推断





#### JRE 精简





#### LocalDate/LocalDateTime

理解时间和日期库需要理解如下问题:

- Java8之前的Date有哪些槽点?
- Java8之前使用哪些常用的第三方时间库?
- Java8关于时间和日期有哪些类和方法，变比Java8之前它的特点是什么?
- 其它语言时间库?



#### JavaFX





#### PermGen 移除





#### StampedLock





### JDK 11（2018.09 ~ 2026.09）

- 增加一些字符串处理方法
- 用于 Lambda 参数的局部变量语法
- Http Client重写，支持HTTP/1.1和HTTP/2 ，也支持 websockets
- 可运行单一Java源码文件，如：java Test.java
- ZGC：可伸缩低延迟垃圾收集器，ZGC可以看做是G1之上更细粒度的内存管理策略。由于内存的不断分配回收会产生大量的内存碎片空间，因此需要整理策略防止内存空间碎片化，在整理期间需要将对于内存引用的线程逻辑暂停，这个过程被称为"Stop the world"。只有当整理完成后，线程逻辑才可以继续运行。（并行回收）
- 支持 TLS 1.3 协议
- Flight Recorder（飞行记录器），基于OS、JVM和JDK的事件产生的数据收集框架
- 对Stream、Optional、集合API进行增强



**重要特性：**

对于JDK9和JDK10的完善，主要是对于Stream、集合等API的增强、新增ZGC垃圾收集器。



### JDK 17（2021.09 ~ 2029.09）

- [甲骨文正式发布Java 17](https://www.oracle.com/cn/news/announcement/oracle-releases-java-17-2021-09-14/)

- [Java 17 新特性概览（重要）](https://blogres.github.io/java/new-features/java17.html)



- Free Java License
- JDK 17 将取代 JDK 11 成为下一个长期支持版本
- Spring 6 和 Spring Boot 3需要JDK17
- 移除实验性的 AOT 和 JIT 编译器
- 恢复始终执行严格模式 (Always-Strict) 的浮点定义
- 正式引入密封类sealed class，限制抽象类的实现
- 统一日志异步刷新，先将日志写入缓存，然后再异步刷新



虽然JDK17也是一个LTS版本，但是并没有像JDK8和JDK11一样引入比较突出的特性，主要是对前几个版本的整合和完善。



### JDK 21（2023.09 ~ 2031.09）

- [Java 21 新特性概览（重要）](https://blogres.github.io/java/new-features/java21.html)







