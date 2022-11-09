---
title: Maven使用教程
date: 2022-11-02 18:43:54
category:
    - 项目构建管理
tag:
    - Maven
---

## 下载安装配置

### 下载



### 安装



### 配置

#### 环境变量

MAVEN_HOME

D:\\\Dev\apache-maven-3.6.3



Path

%MAVEN_HOME%\\bin



验证安装

cmd命令行 mvn -v

Apache Maven 3.6.3 (cecedd343002696d0abb50b32b541b8a6ba2883f)



#### 本地仓库

D:\\\Dev\apache-maven-3.6.3\\conf\\settings.xml
```xml
<localRepository>E:\\localRepository</localRepository>
```


#### 资源下载镜像

D:\\\Dev\apache-maven-3.6.3\\conf\\settings.xml

配置阿里云资源镜像

```xml
<mirror>
	<id>nexus-aliyun</id>
	<mirrorOf>central</mirrorOf>
	<name>Nexus aliyun</name>
	<url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>

```



如果创建webapp出现插件找不到的情况可以换一下镜像源，阿里的也不一定全。



#### IDEA Maven 配置

file-settings 搜索 maven

![image-20220705185017490](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/image-20220705185017490.png)

![image-20220705185650666](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/image-20220705185650666.png)



配置之后，控制台报错

```
java.lang.RuntimeException: java.lang.RuntimeException: org.codehaus.plexus.component.repository.exception.ComponentLookupException: com.google.inject.ProvisionException: Unable to provision, see the following errors:

```

网上都说的是版本太高，咱也无可奈何，老老实实退回低版本

![img](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/image-20220705191012148.png)




## 技术原理及运用教程

- [Maven 教程.pdf](./assets/Maven%20教程.pdf)



### 为什么用 Maven

或者说 Maven 能干什么？



Maven 是 Apache 软件基金会组织维护的一款自动化构建工具，专注服务于 Java
平台的**项目构建**和**依赖管理**。



Maven 是目前最流行的自动化构建工具，对于生产环境下多框架、多模块整合开发有重要作用，Maven
是一款在大型项目开发过程中不可或缺的重要工具。

-   Maven
    可以整合多个项目之间的引用关系，我们可以根据业务和分层需要任意拆分一个项目。

-   Maven
    提供规范的管理各个常用jar包及其各个版本，并且可以自动下载和引入项目中。

-   Maven 可以根据指定版本自动解决 jar 包版本兼容问题。

-   Maven 可以把 jar 包所依赖的其它 jar 包自动下载并引入项目。



类似自动化构建工具有：Ant、 Maven、Gradle。



### Maven 构建过程

构建过程中的各个环节：清理、编译、测试、报告、打包、安装、部署。

构建（build），是面向过程的（从开始到结尾的多个步骤），涉及到多个环节的协同工作。

构建过程的几个主要环节：

1.  清理：删除以前的编译结果，为重新编译做好准备。

2.  编译：将Java源程序编译为字节码文件。

3.  测试：针对项目中的关键点进行测试，确保项目在迭代开发过程中关键点的正确性。

4.  报告：在每一次测试后以标准的格式记录和展示测试结果。

5.  打包：将一个包含诸多文件的工程封装为一个压缩文件用于安装或部署。Java
    工程对应 jar 包，Web 工程对应war包。

6.  安装：在Maven环境下特指将打包的结果——jar包或war包安装到本地仓库中。

7.  部署：将打包的结果部署到远程仓库或将war包部署到服务器上运行。



### Maven 核心概念

1.  约定的目录结构：创建 Maven 项目对应的目录结构

2.  POM：主配置文件

3.  坐标：用于定位确认具体版本的文件

4.  依赖管理

5.  仓库管理

6.  生命周期

7.  插件和目标

8.  继承

9.  聚合



#### Maven 工程约定目录结构

![https://img-blog.csdnimg.cn/20200703110657358.PNG](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/e19f0d2ab0043ef39d43b81a38502faa.png)



#### POM 文件

#### 坐标命名

使用如下三个向量在 Maven 的仓库中唯一的确定一个 Maven 工程。

1.  groupid：公司或组织的域名倒序+当前项目名称
2.  artifactId：当前项目的模块名称
3.  version：当前模块的版本



```xml
<groupId>com.vegetables.AllInOne</groupId>
<artifactId>HomePage</artifactId>
<version>0.0.1-SNAPSHOT</version>

```



#### ★依赖管理

##### 依赖的范围

依赖的范围：compile、test、provided，默认采用 compile。

![](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/d1c49adf3b384d06628c73ce14486c3f.png)



##### 依赖的传递性

只有 compile 打包具有传递性。

![https://img-blog.csdnimg.cn/20200703112636387.PNG](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/14bace8997106d281ff723a821e6ed91.png)



##### 依赖的排除

如果我们在当前工程中引入了一个依赖是 A，而 A 又依赖了 B，那么 Maven 会自动将 A 依赖的 B 引入当 前工程，但是个别情况下 B 有可能是一个不稳定版，或对当前工程有不良影响。这时我们可以在引入 A 的时 候将 B 排除。



![https://img-blog.csdnimg.cn/20200703112846771.PNG\#pic_center](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/b552f9cb15dc7886035e4d465edf14e8.png)



```xml
<dependency>      
   <groupId>com.atguigu.maven</groupId>     
   <artifactId>HelloFriend</artifactId>     
   <version>0.0.1-SNAPSHOT</version>     
   <type>jar</type>      
   <scope>compile</scope>     
   <!-- 排除不必要的依赖-->
   <exclusions>           
   	 <exclusion>               
	    <groupId>commons-logging</groupId>               
	    <artifactId>commons-logging</artifactId>           
   	 </exclusion>      
   </exclusions> 
</dependency>

```



![在这里插入图片描述](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/b892a9d771edbebc5c9f7c79305389b4.png)



##### 统一管理所依赖 jar 包的版本

**对同一个框架的一组 jar 包最好使用相同的版本。**为了方便升级框架，可以将 jar 包的版本信息统一提取出来（与 JSTL 表达式类似）。

```xml
<properties>
	<!-- youapp.spring.version 是自定义标签 -->
	<youapp.spring.version>4.1.1.RELEASE</youapp.spring.version>
</properties>

<!-- 引用前面声明的版本号 -->
<dependencies>
	<dependency>
		<groupId>org.springframework</groupId>
		<artifactId>spring-core</artifactId>
		<version>${youapp.spring.version}</version>
	</dependency>
</dependencies>

```



##### 依赖的原则：解决 jar 包冲突

![https://img-blog.csdnimg.cn/20200703114601200.PNG](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/b4bcc388211d3542b3558157d6a91427.png)



#### 仓库管理



#### 生命周期

![](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/d5fb2cefe6a3a3d4336683b507963564.png)



#### 插件和目标



#### 继承

##### 为什么需要继承机制

由于非 compile 范围的依赖信息是不能在“依赖链”中传递的，所以有需要的工程只能单独配置。例如：

![https://img-blog.csdnimg.cn/20200703121249317.PNG](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/f3fda70af57fe90eb58b589935a5ad5c.png)

![https://img-blog.csdnimg.cn/20200703121312942.png](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/7b55998c98bd9290009b78243fed4c58.png)



##### 创建父工程

创建父工程和创建一般的 Java 工程操作一致，唯一需要注意的是：打包方式处要设置为 pom。



在子工程中引用父工程 :

```xml
<parent>
	<groupId>com.atguigu.maven</groupId>
	<artifactId>Parent</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<!-- 指定从当前子工程的pom.xml文件出发，查找父工程的pom.xml的路径 -->  <relativePath>../Parent/pom.xml</relativePath>
</parent>

```



此时如果子工程的 groupId 和 version 如果和父工程重复则可以删除。



##### 在父工程中管理依赖

将 Parent 项目中的 dependencies 标签，用 dependencyManagement 标签括起来。

```xml
<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>
	</dependencies>
</dependencyManagement>

```



在子项目中重新指定需要的依赖，删除范围和版本号。

```xml
<dependencies>
	<dependency>
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
	</dependency>
</dependencies>

```



**Maven中的dependencyManagement意义**

```
https://www.cnblogs.com/zhangmingcheng/p/10984036.html

1、在Maven中dependencyManagement的作用其实相当于一个对所依赖jar包进行版本管理的管理器。

2、pom.xml文件中，jar的版本判断的两种途径
1）如果dependencies里的dependency自己没有声明version元素，那么maven就会到dependencyManagement里面去找有没有对该artifactId和groupId进行过版本声明，如果有，就继承它，如果没有就会报错，告诉你必须为dependency声明一个version。
2）如果dependencies中的dependency声明了version，那么无论dependencyManagement中有无对该jar的version声明，都以dependency里的version为准。

3、1）dependencies即使在子项目中不写该依赖项，那么子项目仍然会从父项目中继承该依赖项（全部继承）
   2）dependencyManagement里只是声明依赖，并不实现引入，因此子项目需要显示的声明需要用的依赖。如果不在子项目中声明依赖，是不会从父项目中继承下来的；只有在子项目中写了该依赖项，并且没有指定具体版本，才会从父项目中继承该项，并且version和scope都读取自父pom；另外如果子项目中指定了版本号，那么会使用子项目中指定的jar版本。

```



#### 聚合

##### 为什么要使用聚合

将多个工程拆分为模块后，需要手动逐个安装到仓库后依赖才能够生效。修改源码后也需要逐个手动进
行 clean 操作。而使用了聚合之后就可以批量进行 Maven 工程的安装、清理工作。



##### 如何配置聚合

在总的聚合工程中使用 modules/module 标签组合，指定模块工程的相对路径即可。

聚合时 Maven 会帮助我们自动管理其相互之间的依赖关系,帮助我们省了很多的时间和精力。

```xml
<modules>
	<module>../Hello</module>
	<module>../HelloFriend</module>
	<module>../MakeFriends</module>
</modules>

```





## 工作开发实战

### Maven 常用设置

#### 全局变量

在 Maven 的 pom.xml 文件中，\<properties\>用于定义全局变量，POM 中通过\${property_name}的形式引用变量的值。

定义全局变量：

```xml
<properties>
	<spring.version>4.3.10.RELEASE</spring.version>
</properties>

```



引用全局变量：

```xml
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-context</artifactId>
	<version>${spring.version}</version>
</dependency>

```



Maven 系统采用的变量：

```xml
<properties>
	<maven.compiler.source>1.8</maven.compiler.source><!--源码编译 jdk 版本-->
	<maven.compiler.target>1.8</maven.compiler.target><!--运行代码的 jdk 版本-->
	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding><!--项目构建使用的编码，避免中文乱码-->
	<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding><!--生成报告的编码-->
</properties>

```



#### 指定资源文件位置

src/main/java 和 src/test/java 这两个目录中的所有\*.java 文件会分别在 comile 和 test-comiple 阶段被编译，编译结果分别放到了 target/classes 和 targe/test-classes 目录中，但是这两个目录中的其他文件都会被忽略掉，如果需要把 src 目录下的文件包放到  target/classes 目录，作为输出的 jar 一部分。需要指定资源文件位置。以下内容放到\<buid\>标签中。



在pom.xml中加上如下的配置：

```xml
<buid>
	<resource>
		<directory>src/main/resources</directory>
		<includes><!--包括目录下的.properties,.xml 文件都会扫描到-->
			<include>**/*.properties</include>
			<include>**/*.xml</include>
			<include>**/*.txt</include>
		</includes>
		<!--filtering 选项 false 不启用过滤器， *.property 已经起到过滤的作用了 -->
		<filtering>false</filtering>
	</resource>
</buid>

```



### 导入 Maven 工程



### Maven 自动化构建



### Maven 自动化部署



### 问题记录

#### IDEA启动程序报jar包找不到错误

IDEA启动程序按钮和maven的build使用的jar包环境不一样，如果不将idea构建/运行操作委托给maven，test时会报jar包找不到错误。

解决办法：File \| Settings \| Build, Execution, Deployment \| Build Tools \| Maven \| Runner----\>勾选delegate ide build/run actions to maven

![](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/ca952ac20a76f60190daecfec3b9a9a1.png)

![](https://www.m1yellow.cn/doc-img/Maven%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/3736e1c1913ebf9c1b41df17602b51c4.png)

注意，每新建 maven 项目，都需再次要进行设置。



#### VM Options : -DarchetypeCatalog=internal

每次创建项目时， IDEA 要使用插件进行创建，这些插件当你创建新的项目时，它每次都会去中央仓库下载，这样使得创建比较慢。应该创建时，让它找本地仓库中的插件进行创建项目。



解决方式：

在 IDEA 的 Settings 窗口的 Build, Execution, Deployment \> Build Tools \> Maven > Runner 中对 VM Option 设置为 -DarchetypeCatalog=internal



#### 遇到爆红 clean + install + 刷新就完事了



