---
title: JVM性能调优
date: 2024-06-08 18:02:02
category:
    - Java
tag:
    - JVM
    - GC
    - 性能调优
---

![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/jvm-overview.png)

## 一、前言

> 警惕一个社会规律：**技术知识日新月异，资料整不完，就算整得90%以上了，最佳的时期已经过去了，整理的资料将毫无用武之地！**
>
> 没有优秀的学历和专业、也没有大厂名企工作经验，一直在中小公司 CRUD，不适合做管理，高新技术项目接触不到，不擅长人脉交际，35岁左右，就会面临中年危机！公司基本不招大龄员工了，公务员也限制了，只能另谋出路，创业或者做小生意维持生计了！
>
> 技术知识是整理不完的，也没有那没多空闲时间整理，光是整理缺乏实战经验，最后还是付出远大于回报，并且最后没日没夜、辛辛苦苦的资料，因为过了关键时期，或者找不到出路了，只能全部扔掉！高考失败的惨痛教训啊！现在又来两三年整理资料？！会死得很惨！！！
>
> 资料可以整理，但是千万别搞得像出书一样，各种细节概念通篇大段摘抄，除非是当讲师！现在的学生也很不喜欢大段大段的文字概念，看着都烦，更不用说要记住！
>
> 抓主干重点记录，理论概念用自己的理解表述就行了。
>
> 一定要有工作！要工作！！利于工作之余和周末时间整理，千万别裸辞之后，花好几个月甚至一年去整理！技术知识浩瀚如海，整理得越多，只会发现还有很多，最后整个人都很郁闷很消极，因为付出长时间得不到反馈，周边人都不理解不支持，生活作息、饮食运动全都荒废，最后情况会很糟糕很惨痛！！
>
> 

整理原则，遵循自然规律，**用进废退**！理论概念记得再牢固，一旦停止记忆，并且工作生活都用不到，迟早会忘得一干二净！高中备战高考那么多门学科知识，现在可还记得多少啊？！

- 高考都因**“过度整理资料，缺乏练习实践”**失利，现在的状况和时间根本不允许一点一滴的梳理积累了，也没必要，等整理完，好的工作机会都没了。
- 为了有工作收入，**先从面试技术点切入，技术细节和理论概念后续补充完善**（没工作就没收入，没收入一切都会荒废，细节概念工作用不到就会忘得一干二净）。
- **先理清主干结构，然后再完善枝叶细节。**
- **不知道肯定或可能会犯错的技术点优先，不知道也基本不影响的往后放。**
- 工作中用到。
- 面试会问到且工作也用到。
- 面试问但工作几乎不用，直接说工作中用得少，记不太清了。
- 面试不问且工作也不用的概念细节，不当老师不出书不做教程，真没必要花时间整理，就算一时记住了，过不了几天就全忘光，没有意义。
- **快速入门学习，视频资料更合适。**纸质或电子版书籍资料不太适合**快速**自学，只有视觉一个维度（但最新一手资料往往都是文档形式）。书籍文档类资料适合做研究或者开发过程中查阅参考。
- **名师出高徒，优质资料成就高级工程师。**
- **理论+实践，道理+方法。**整理一大堆理论概念，可能就是为了通过面试，多一份可供选择对比的offer。入职工作之后呢，理论技术点很少使用，或者根本用不到，就算花再多的时间精力重复记忆，最终只是做了无用功。时间、精力、记忆力要用在当下工作和生活最紧要、重要的事情上，==海量细致末节的理论概念真的会把人拖垮！==同理，告诉你一大堆道理，却没有具体可行的方法，或者方法根本不适合自身情况。看一大堆成功励志书籍，懂很多道理，只会让自己陷入虚假的荣耀当中，以为自己精神境界很高、很厉害，很优秀，实际回看身边，生活、工作、人际可能很糟糕！
- **兴趣成果驱动，理论概念驱不动。**兴趣是最好的老师，也是最大的动力！成果奖励又能反哺助力兴趣生长，最终成为支撑一辈子的事业！而一大堆枯燥乏味的理论概念，看着就让人犯困，更不用说要记忆了，厌学的本质，是孩子根本就不想这样学！关爱鼓励的父母、因材施教的老师、强烈长期的兴趣、合适优质的资源，这些都是助力成长、成功的良好的土壤环境和养分补给。在这样一个优越的生长环境，想不成才都难啊！说句不好听的，就算是天生残障，这样的环境也能造就成栋梁之才！（有新闻事实验证）相反，出生在穷苦的家庭环境，营养匮乏，甚至连需要补充什么营养都不知道！学习资源跟不上、学习方法不合适，一系列生活繁琐的问题！孩子从出身那一刻，就注定了这辈子能达到的高度。“只生不养”，讲的是父母只知道传宗接代，其他什么都不知道，为了挣钱，把孩子抛给别人寄养，从小到大就知道给书籍费、生活费，其他不闻不问！这样的孩子成长都是问题，想要成才，真的很难很难！
- 学习方法：自己整理笔记+网上参考资料+书籍视频功底支撑+不断更新完善+知识点学完当天**实战练习**加以巩固。视频教程—\>可能过时 + 文档体系—\>更新完善 + 项目实战—\>熟练运用。
- 学习资源：充足的基础资料作为参考研究的功底支持（社区平台公众号、大V的通常做法，资料体系齐全，简单概念名词专有化，XX定理、XX理论）。垃圾堆（穷人家孩子）、书籍堆（中产阶级子女）、资源堆（豪门子弟），只要能上得了高处，没人管你是怎么上去的！
- **对新技术知识保持像苍蝇般的敏锐嗅觉**，更新完善已整理的知识体系，才能走在技术前沿，才能吃得上肉啊！
- 新技术/知识学习：先会用（为己所用，解决问题） —\> 货比三家，寻找其他解决方案 —\>
  剖析原理机制，解决深度问题，推陈出新（源码、原理图）【先有得吃-可以选择吃什么-吃出高级感】
- 清楚定位和目标：**16\~18\~20K的职位要你做什么事？**能做事，并且能把事情做得很好，至于算法和底层原理，你要真厉害，肯定也不止这个薪资了。一步一个圈，开发过程中挤时间提升。
- 产品比喻：你买了一款产品，里面有使用说明书，但说明书通常不会讲产品的工作原理，很多内部工作机制原理都是专利技术，都严格封装成模块了。由产品类比面试，大厂面试官几乎不会问你这款产品怎么使用，因为说明书（或者网上博客教程资料）上能找到，要问也是说明书上没有的，并且还会导致问题的内容，那些无关痛痒的细节内容，谁闲得没事天天记这些破玩意？时间要花在有价值的刀刃上！至于那些跟你死磕怎么使用方面的细节内容的面试官，要么是他们本身功底水平，或者技术认知境界也不高，要么是他们对你印象不好刻意刁难你，专挑偏门细节内容打击你的自信心，让你怀疑否定自己，营造细节内容很重要的假象，让你后续的面试准备偏离正规，都是技术开发同行，搞不懂为什么要下这么阴险的狠招，恶性竞争排挤？不想要就直说，为什么还要误导伤害？真正厉害的人根本不在意是否有人会超过自己！



![image-20210925215411512](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/image-20210925215411512.png)



## 二、JVM 家族体系

详细内容查阅《深入理解Java虚拟机：JVM高级特性与最佳实践（第3版）》

### 虚拟机始祖：Sun Classic/Exact VM

#### Sun Classic VM

- 1996年，JDK1.0，开始使用，第一款商用Java虚拟机。

- JDK1.4被HotSpot VM替代。

- 这款虚拟机只提供解释器。

- 如果要使用JIT编译器，需要使用外挂，但是一旦使用了JIT编译器，JIT就会接管虚拟机的执行系统，自带的解释器就不再工作，即自带解释器和外挂编译器不能协同工作。

- 现在HotSpot VM内置了此虚拟机。



解释器与JIT编译器工作原理示意图

![](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/4bedfbc862eb842ac2d1054933acd094.png)



#### Exact VM

- 为了解决上一个虚拟机问题，JDK1.2开始使用。

- 使用准确式内存管理Exact Memory
  Management，准确式内存管理是指虚拟机可以知道内存中某个位置的数据具体是什么类型。

- 具备现代高性能虚拟机的雏形。

  - 热点探测

  - 编译器与解释器混合工作模式

- 只在Solaris平台短暂使用，其他平台还是Classic VM。
  - 英雄气短，最终被HotSpot虚拟机替换



### 武林盟主：HotSpot VM

#### HotSpot VM历史

- 最初由一家名为“Longview Technologies”的小公司设计。

- 1997年，此公司被Sun公司收购；2009年Sun公司被Oracle公司收购。

- JDK1.3时，HotSpot VM成为默认虚拟机。



#### 市场地位

目前发行版JDK（Oracle JDK、OpenJDK）都使用HotSpot VM。



#### 应用领域

服务器、桌面、移动端、嵌入式都有应用。



#### 技术特性

- 通过计数器找到最具编译价值代码，触发及时编译或栈上替换。

- 通过编译器与解释器协同工作，在程序响应时间和执行性能之间达到最优平衡。



### 天下第二：BEA JRockit/IBM J9 VM

#### BEA JRockit



#### IBM J9 VM



## 三、JVM 类加载

### 类字节码

> 转载出处 https://www.pdai.tech/md/java/jvm/java-jvm-class.html

#### 多语言编译为字节码在 JVM 运行

计算机是不能直接运行java代码的，必须要先运行java虚拟机，再由java虚拟机运行编译后的java代码。这个编译后的java代码，就是本文要介绍的java字节码。

为什么jvm不能直接运行java代码呢，这是因为在cpu层面看来计算机中所有的操作都是一个个指令的运行汇集而成的，java是高级语言，只有人类才能理解其逻辑，计算机是无法识别的，所以java代码必须要先编译成字节码文件，jvm才能正确识别代码转换后的指令并将其运行。

- Java代码间接翻译成字节码，储存字节码的文件再交由运行于不同平台上的JVM虚拟机去读取执行，从而实现一次编写，到处运行的目的。
- JVM也不再只支持Java，由此衍生出了许多基于JVM的编程语言，如Groovy, Scala, Koltin等等。



![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/java-jvm-class-1.png)



#### Java 字节码文件

class文件本质上是一个以8位字节为基础单位的二进制流，各个数据项目严格按照顺序紧凑的排列在class文件中。jvm根据其特定的规则解析该二进制数据，从而得到相关信息。

Class文件采用一种伪结构来存储数据，它有两种类型：无符号数和表。暂不详细展开。



##### Class 文件的结构属性

java字节码文件包含了哪些类型的数据：

![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/java-jvm-class-2.png)



##### 从一个例子开始

下面以一个简单的例子来逐步讲解字节码。

```java
//Main.java
public class Main {
    
    private int m;
    
    public int inc() {
        return m + 1;
    }
}

```



通过以下命令, 可以在当前所在路径下生成一个Main.class文件。

```bash
javac Main.java

```



以文本的形式打开生成的class文件，内容如下:

```bash
cafe babe 0000 0034 0013 0a00 0400 0f09
0003 0010 0700 1107 0012 0100 016d 0100
0149 0100 063c 696e 6974 3e01 0003 2829
5601 0004 436f 6465 0100 0f4c 696e 654e
756d 6265 7254 6162 6c65 0100 0369 6e63
0100 0328 2949 0100 0a53 6f75 7263 6546
696c 6501 0009 4d61 696e 2e6a 6176 610c
0007 0008 0c00 0500 0601 0010 636f 6d2f
7268 7974 686d 372f 4d61 696e 0100 106a
6176 612f 6c61 6e67 2f4f 626a 6563 7400
2100 0300 0400 0000 0100 0200 0500 0600
0000 0200 0100 0700 0800 0100 0900 0000
1d00 0100 0100 0000 052a b700 01b1 0000
0001 000a 0000 0006 0001 0000 0003 0001
000b 000c 0001 0009 0000 001f 0002 0001
0000 0007 2ab4 0002 0460 ac00 0000 0100
0a00 0000 0600 0100 0000 0800 0100 0d00
0000 0200 0e

```



- 文件开头的4个字节("cafe babe")称之为 `魔数`，唯有以"cafe babe"开头的class文件方可被虚拟机所接受，这4个字节就是字节码文件的身份识别。
- 0000是编译器jdk版本的次版本号0，0034转化为十进制是52,是主版本号，java的版本号从45开始，除1.0和1.1都是使用45.x外,以后每升一个大版本，版本号加一。也就是说，编译生成该class文件的jdk版本为1.8.0。

通过java -version命令稍加验证, 可得结果。

```java
Java(TM) SE Runtime Environment (build 1.8.0_131-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.131-b11, mixed mode)

```



继续往下是常量池... 知道是这么分析的就可以了，然后通过工具反编译字节码文件继续去看。



##### 反编译字节码文件

> 使用到java内置的一个反编译工具javap可以反编译字节码文件, 用法: `javap <options> <classes>`

其中`<options>`选项包括:

```bash
  -help  --help  -?        输出此用法消息
  -version                 版本信息
  -v  -verbose             输出附加信息
  -l                       输出行号和本地变量表
  -public                  仅显示公共类和成员
  -protected               显示受保护的/公共类和成员
  -package                 显示程序包/受保护的/公共类
                           和成员 (默认)
  -p  -private             显示所有类和成员
  -c                       对代码进行反汇编
  -s                       输出内部类型签名
  -sysinfo                 显示正在处理的类的
                           系统信息 (路径, 大小, 日期, MD5 散列)
  -constants               显示最终常量
  -classpath <path>        指定查找用户类文件的位置
  -cp <path>               指定查找用户类文件的位置
  -bootclasspath <path>    覆盖引导类文件的位置

```



输入命令`javap -verbose -p Main.class`查看输出内容:

```java
Classfile /E:/JavaCode/TestProj/out/production/TestProj/com/rhythm7/Main.class
  Last modified 2018-4-7; size 362 bytes
  MD5 checksum 4aed8540b098992663b7ba08c65312de
  Compiled from "Main.java"
public class com.rhythm7.Main
  minor version: 0
  major version: 52
  flags: ACC_PUBLIC, ACC_SUPER
Constant pool:
   #1 = Methodref          #4.#18         // java/lang/Object."<init>":()V
   #2 = Fieldref           #3.#19         // com/rhythm7/Main.m:I
   #3 = Class              #20            // com/rhythm7/Main
   #4 = Class              #21            // java/lang/Object
   #5 = Utf8               m
   #6 = Utf8               I
   #7 = Utf8               <init>
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               LocalVariableTable
  #12 = Utf8               this
  #13 = Utf8               Lcom/rhythm7/Main;
  #14 = Utf8               inc
  #15 = Utf8               ()I
  #16 = Utf8               SourceFile
  #17 = Utf8               Main.java
  #18 = NameAndType        #7:#8          // "<init>":()V
  #19 = NameAndType        #5:#6          // m:I
  #20 = Utf8               com/rhythm7/Main
  #21 = Utf8               java/lang/Object
{
  private int m;
    descriptor: I
    flags: ACC_PRIVATE

  public com.rhythm7.Main();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 3: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/rhythm7/Main;

  public int inc();
    descriptor: ()I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: aload_0
         1: getfield      #2                  // Field m:I
         4: iconst_1
         5: iadd
         6: ireturn
      LineNumberTable:
        line 8: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       7     0  this   Lcom/rhythm7/Main;
}
SourceFile: "Main.java"
  
```



##### 字节码文件信息

开头的7行信息包括:Class文件当前所在位置，最后修改时间，文件大小，MD5值，编译自哪个文件，类的全限定名，jdk次版本号，主版本号。

然后紧接着的是该类的访问标志：ACC_PUBLIC, ACC_SUPER，访问标志的含义如下:

| 标志名称       | 标志值 | 含义                                                         |
| -------------- | ------ | ------------------------------------------------------------ |
| ACC_PUBLIC     | 0x0001 | 是否为Public类型                                             |
| ACC_FINAL      | 0x0010 | 是否被声明为final，只有类可以设置                            |
| ACC_SUPER      | 0x0020 | 是否允许使用invokespecial字节码指令的新语义．                |
| ACC_INTERFACE  | 0x0200 | 标志这是一个接口                                             |
| ACC_ABSTRACT   | 0x0400 | 是否为abstract类型，对于接口或者抽象类来说，次标志值为真，其他类型为假 |
| ACC_SYNTHETIC  | 0x1000 | 标志这个类并非由用户代码产生                                 |
| ACC_ANNOTATION | 0x2000 | 标志这是一个注解                                             |
| ACC_ENUM       | 0x4000 | 标志这是一个枚举                                             |



##### 常量池

`Constant pool`意为常量池。

常量池可以理解成Class文件中的资源仓库。主要存放的是两大类常量：字面量(Literal)和符号引用(Symbolic References)。字面量类似于java中的常量概念，如文本字符串，final常量等，而符号引用则属于编译原理方面的概念，包括以下三种:

- 类和接口的全限定名(Fully Qualified Name)
- 字段的名称和描述符号(Descriptor)
- 方法的名称和描述符

不同于C/C++, JVM是在加载Class文件的时候才进行的动态链接，也就是说这些字段和方法符号引用只有在运行期转换后才能获得真正的内存入口地址。当虚拟机运行时，需要从常量池获得对应的符号引用，再在类创建或运行时解析并翻译到具体的内存地址中。 直接通过反编译文件来查看字节码内容：

```java
#1 = Methodref          #4.#18         // java/lang/Object."<init>":()V
#4 = Class              #21            // java/lang/Object
#7 = Utf8               <init>
#8 = Utf8               ()V
#18 = NameAndType        #7:#8          // "<init>":()V
#21 = Utf8               java/lang/Object

```



**第一个常量**是一个方法定义，指向了第4和第18个常量。以此类推查看第4和第18个常量。最后可以拼接成第一个常量右侧的注释内容:

```java
java/lang/Object."<init>":()V

```



这段可以理解为该类的实例构造器的声明，由于Main类没有重写构造方法，所以调用的是父类的构造方法。此处也说明了Main类的直接父类是Object。 该方法默认返回值是V, 也就是void，无返回值。

**第二个常量**同理可得:

```java
#2 = Fieldref           #3.#19         // com/rhythm7/Main.m:I
#3 = Class              #20            // com/rhythm7/Main
#5 = Utf8               m
#6 = Utf8               I
#19 = NameAndType        #5:#6          // m:I
#20 = Utf8               com/rhythm7/Main

```



复制代码此处声明了一个字段m，类型为I, I即是int类型。关于字节码的类型对应如下：

| 标识字符 | 含义                                       |
| -------- | ------------------------------------------ |
| B        | 基本类型byte                               |
| C        | 基本类型char                               |
| D        | 基本类型double                             |
| F        | 基本类型float                              |
| I        | 基本类型int                                |
| J        | 基本类型long                               |
| S        | 基本类型short                              |
| Z        | 基本类型boolean                            |
| V        | 特殊类型void                               |
| L        | 对象类型，以分号结尾，如Ljava/lang/Object; |

对于数组类型，每一位使用一个前置的`[`字符来描述，如定义一个`java.lang.String[][]`类型的维数组，将被记录为`[[Ljava/lang/String;`



#####  方法表集合

在常量池之后的是对类内部的方法描述，在字节码中以表的集合形式表现，暂且不管字节码文件的16进制文件内容如何，直接看反编译后的内容。

```java
private int m;
  descriptor: I
  flags: ACC_PRIVATE

```



此处声明了一个私有变量m，类型为int，返回值为int

```java
public com.rhythm7.Main();
   descriptor: ()V
   flags: ACC_PUBLIC
   Code:
     stack=1, locals=1, args_size=1
        0: aload_0
        1: invokespecial #1                  // Method java/lang/Object."<init>":()V
        4: return
     LineNumberTable:
       line 3: 0
     LocalVariableTable:
       Start  Length  Slot  Name   Signature
           0       5     0  this   Lcom/rhythm7/Main;

```



这里是构造方法：Main()，返回值为void, 公开方法。

code内的主要属性为:

- **stack**: 最大操作数栈，JVM运行时会根据这个值来分配栈帧(Frame)中的操作栈深度,此处为1
- **locals**: 局部变量所需的存储空间，单位为Slot, Slot是虚拟机为局部变量分配内存时所使用的最小单位，为4个字节大小。方法参数(包括实例方法中的隐藏参数this)，显示异常处理器的参数(try catch中的catch块所定义的异常)，方法体中定义的局部变量都需要使用局部变量表来存放。值得一提的是，locals的大小并不一定等于所有局部变量所占的Slot之和，因为局部变量中的Slot是可以重用的。
- **args_size**: 方法参数的个数，这里是1，因为每个实例方法都会有一个隐藏参数this
- **attribute_info**: 方法体内容，0,1,4为字节码"行号"，该段代码的意思是将第一个引用类型本地变量推送至栈顶，然后执行该类型的实例方法，也就是常量池存放的第一个变量，也就是注释里的"java/lang/Object.""😦)V", 然后执行返回语句，结束方法。
- **LineNumberTable**: 该属性的作用是描述源码行号与字节码行号(字节码偏移量)之间的对应关系。可以使用 -g:none 或-g:lines选项来取消或要求生成这项信息，如果选择不生成LineNumberTable，当程序运行异常时将无法获取到发生异常的源码行号，也无法按照源码的行数来调试程序。
- **LocalVariableTable**: 该属性的作用是描述帧栈中局部变量与源码中定义的变量之间的关系。可以使用 -g:none 或 -g:vars来取消或生成这项信息，如果没有生成这项信息，那么当别人引用这个方法时，将无法获取到参数名称，取而代之的是arg0, arg1这样的占位符。 start 表示该局部变量在哪一行开始可见，length表示可见行数，Slot代表所在帧栈位置，Name是变量名称，然后是类型签名。

同理可以分析Main类中的另一个方法"inc()":

方法体内的内容是：将this入栈，获取字段#2并置于栈顶, 将int类型的1入栈，将栈内顶部的两个数值相加，返回一个int类型的值。



##### 类名

最后很显然是源码文件：

```java
SourceFile: "Main.java"

```



#### 示例

##### 分析 try-catch-finally

通过以上一个最简单的例子，可以大致了解源码被编译成字节码后是什么样子的。 下面利用所学的知识点来分析一些Java问题:

```java
public class TestCode {
    public int foo() {
        int x;
        try {
            x = 1;
            return x;
        } catch (Exception e) {
            x = 2;
            return x;
        } finally {
            x = 3;
        }
    }
}

```



试问当不发生异常和发生异常的情况下，foo()的返回值分别是多少。

```java
javac TestCode.java
javap -verbose TestCode.class

```



查看字节码的foo方法内容:

```java
public int foo();
    descriptor: ()I
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=5, args_size=1
         0: iconst_1 //int型1入栈 ->栈顶=1
         1: istore_1 //将栈顶的int型数值存入第二个局部变量 ->局部2=1
         2: iload_1 //将第二个int型局部变量推送至栈顶 ->栈顶=1
         3: istore_2 //!!将栈顶int型数值存入第三个局部变量 ->局部3=1
         
         4: iconst_3 //int型3入栈 ->栈顶=3
         5: istore_1 //将栈顶的int型数值存入第二个局部变量 ->局部2=3
         6: iload_2 //!!将第三个int型局部变量推送至栈顶 ->栈顶=1
         7: ireturn //从当前方法返回栈顶int数值 ->1
         
         8: astore_2 // ->局部3=Exception
         9: iconst_2 // ->栈顶=2
        10: istore_1 // ->局部2=2
        11: iload_1 //->栈顶=2
        12: istore_3 //!! ->局部4=2
        
        13: iconst_3 // ->栈顶=3
        14: istore_1 // ->局部1=3
        15: iload_3 //!! ->栈顶=2
        16: ireturn // -> 2
        
        17: astore        4 //将栈顶引用型数值存入第五个局部变量=any
        19: iconst_3 //将int型数值3入栈 -> 栈顶3
        20: istore_1 //将栈顶第一个int数值存入第二个局部变量 -> 局部2=3
        21: aload         4 //将局部第五个局部变量(引用型)推送至栈顶
        23: athrow //将栈顶的异常抛出
      Exception table:
         from    to  target type
             0     4     8   Class java/lang/Exception //0到4行对应的异常，对应#8中储存的异常
             0     4    17   any //Exeption之外的其他异常
             8    13    17   any
            17    19    17   any

```



在字节码的4,5，以及13,14中执行的是同一个操作，就是将int型的3入操作数栈顶，并存入第二个局部变量。这正是源码在finally语句块中内容。也就是说，JVM在处理异常时，会在每个可能的分支都将finally语句重复执行一遍。

通过一步步分析字节码，可以得出最后的运行结果是：

- 不发生异常时: return 1
- 发生异常时: return 2
- 发生非Exception及其子类的异常，抛出异常，不返回值

> 以上例子来自于《深入理解Java虚拟机 JVM高级特性与最佳实践》, 关于虚拟机字节码指令表，也可以在《深入理解Java虚拟机 JVM高级特性与最佳实践-附录B》中获取。



### 类的生命周期

一个类型从被加载到虚拟机内存中开始，到卸载出内存为止，它的整个生命周期将会经历加载（Loading）、验证（Verification）、准备（Preparation）、解析（Resolution）、初始化（Initialization）、使用（Using）和卸载（Unloading）七个阶段，其中验证、准备、解析三个部分统称为连接（Linking）。



类的生命周期示意图

![](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/8f43e895db3d2cf043f4d09dceae6c09.png)



-XX:+TraceClassLoading ，可以打印出类的加载顺序，可以用来排查 class 的冲突问题。

IDEA 中安装 JClassLib 插件，可查看反编译的代码，或者使用javap -c / javap -v 查看反编译代码。



#### Loading（加载阶段）

所谓加载，简而言之就是**将Java类的字节码文件加载到机器内存中，并在内存中构建出Java类的原型——类模板对象**。所谓类模板对象，其实就是Java类在]VM内存中的一个快照，JVM将从字节码文件中解析出的常量池、类字段、类方法等信息存储到类模板中，这样]VM在运行期便能通过类模板而获取Java类中的任意信息，能够对Java类的成员变量进行遍历，也能进行Java方法的调用。



反射的机制即基于这一基础。如果JVM没有将Java类的声明信息存储起来，则JVM在运行期也无法反射。



1.  **类的加载分类：显式加载 vs 隐式加载**

class文件的显式加载与隐式加载的方式是指JVM加载class文件到内存的方式。

**显式加载**指的是在代码中通过调用ClassLoader加载class对象，如直接使用Class.forName(name)或this.getClass().getClassLoader().loadClass()加载class对象。

**隐式加载**则是不直接在代码中调用ClassLoader的方法加载class对象，而是通过虚拟机自动加载到内存中，如在加载某个类的class文件时，该类的class文件中引用了另外一个类的对象，此时额外引用的类将通过JVM自动加载到内存中。



在日常开发以上两种方式一般会混合使用。

```java
User user=new User();//隐式加载
Class clazz=Class.forName("com.atguigu.java.User"); //指名道姓，显式加载并初始化
ClassLoader.getSystemClassLoader().loadClass("T1.Parent"); //显式加载，但不初始化
```



2. **加载完成的操作**

加载阶段，简言之，查找并加载类的二进制数据，生成Class的实例。

在加载类时，Java虚拟机必须完成以下3件事情：

- 通过类的全名，获取类的二进制数据流。

- 解析类的二进制数据流为方法区内的数据结构（Java类模型）。

- 创建java.lang.Class类的实例，表示该类型。作为方法区这个类的各种数据的访问入口。



3. **二进制流的获取方式**

对于类的二进制数据流，虚拟机可以通过多种途径产生或获得。（只要所读取的字节码符合JVM规范即可）

- 虚拟机可能通过文件系统读入一个class后缀的文件**（最常见）。**

- 读入jar、zip等归档数据包，提取类文件。

- 事先存放在数据库中的类的二进制数据。

- 使用类似于Http/Socket之类的协议通过网络进行加载。

- 运行时计算生成，使用最多的是：动态代理技术。

- 由其他文件生成，典型场景：JSP应用从专有数据库中提取.class文件，比较少见。

- 从加密文件中获取，典型的防Class文件被反编译的保护措施。



在获取到类的二进制信息后，Java虚拟机就会处理这些数据，并最终转为一个java.lang.Class的实例。



如果输入数据不是ClassFile的结构，则会抛出ClassFormatError。



4. **类模型与Class实例的存储位置**

**类模型的存储位置**

加载的类在JVM中创建相应的类结构，类结构会存储在方法区（JDKl.8之前：永久代；J0Kl.8及之后：元空间[直接使用物理内存]）。



**Class实例的存储位置**

类将.class文件加载至元空间后，会在堆中创建一个Java.lang.Class对象，用来封装类位于方法区内的数据结构，该Class对象是在加载类的过程中创建的，每个类都对应有一个Class类型的对象。



![](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/51c45e515e450d59932a65325af8c8cf.png)



5. **数组类的加载**

创建数组类的情况稍微有些特殊，因为数组类本身并不是由类加载器负责创建，而是由JVM在运行时根据需要而直接创建的，但数组的元素类型仍然需要依靠类加载器去创建。创建数组类（下述简称A）的过程：

1.  如果数组的元素类型是引用类型，那么就遵循定义的加载过程递归加载和创建数组A的元素类型。

2.  JVM使用指定的元素类型和数组维度来创建新的数组类。



如果数组的元素类型是引用类型，数组类的可访问性就由元素类型的可访问性决定。否则数组类的可访问性将被缺省定义为public。

比如int[]是基本类型数组，String[]和Object[]是引用类型数组。



#### Linking（链接阶段）

链接分为三个子阶段：验证 --\> 准备 --\> 解析

![](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/6b2ca30828dc924e68b0480c48b86e34.png)



##### 验证（Verify）

当类加载到系统后，就开始链接操作，验证是链接操作的第一步。

**它的目的是保证加载的字节码是合法、合理并符合规范的。**

简单记忆：

**验证字节码文件及格式是否正确。**



验证的步骤比较复杂，实际要验证的项目也很繁多，大体上Java虚拟机需要做以下检查，如图所示。

![https://img-blog.csdnimg.cn/20201008174452684.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FkbWluNzQxYWRtaW4=,size_16,color_FFFFFF,t_70\#pic_center](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/90d1debb5e9e59ca0389dad32f9704e2.png)



1. **整体说明**

验证的内容则涵盖了类数据信息的格式验证、语义检查、字节码验证，以及符号引用验证等。

- 其中格式验证会和加载阶段一起执行。验证通过之后，类加载器才会成功将类的二进制数据信息加载到方法区中。

- 格式验证之外的验证操作将会在方法区中进行。

链接阶段的验证虽然拖慢了加载速度，但是它避免了在字节码运行时还需要进行各种检查。（磨刀不误砍柴工）



2. **具体说明**

- 格式验证：是否以魔数0XCAFEBABE开头，主版本和副版本号是否在当前Java虚拟机的支持范围内，数据中每一个项是否都拥有正确的长度等。

- Java虚拟机会进行字节码的语义检查，但凡在语义上不符合规范的，虚拟机也不会给予验证通过。比如：

  - 是否所有的类都有父类的存在（在Java里，除了object外，其他类都应该有父类）。

  - 是否一些被定义为final的方法或者类被重写或继承了。
  - 非抽象类是否实现了所有抽象方法或者接口方法。



3. Java虚拟机还会进行字节码验证，字节码验证也是验证过程中最为复杂的一个过程。它试图通过对字节码流的分析，判断字节码是否可以被正确地执行。比如：

- 在字节码的执行过程中，是否会跳转到一条不存在的指令。

- 函数的调用是否传递了正确类型的参数。

- 变量的赋值是不是给了正确的数据类型等。



栈映射帧（StackMapTable）就是在这个阶段，用于检测在特定的字节码处，其局部变量表和操作数栈是否有着正确的数据类型。但遗憾的是，100%准确地判断一段字节码是否可以被安全执行是无法实现的，因此，该过程只是尽可能地检查出可以预知的明显的问题。如果在这个阶段无法通过检查，虚拟机也不会正确装载这个类。但是，如果通过了这个阶段的检查，也不能说明这个类是完全没有问题的。



**在前面3次检查中，已经排除了文件格式错误、语义错误以及字节码的不正确性。但是依然不能确保类是没有问题的。**



4. 校验器还将进行**符号引用验证**。Class文件在其常量池会通过字符串记录自己将要使用的其他类或者方法。因此，在验证阶段，**虚拟机就会检查这些类或者方法确实是存在的**，并且当前类有权限访问这些数据，如果一个需要使用类无法在系统中找到，则会抛出NoClassDefFoundError，如果一个方法无法被找到，则会抛出NoSuchMethodError。此阶段在解析环节才会执行。



##### 准备（Preparation）

准备阶段（Preparation），简言之，**为类的静态变量分配内存，并将其初始化为默认值。**

当一个类验证通过时，虚拟机就会进入准备阶段。在这个阶段，虚拟机就会为这个类分配相应的内存空间，并设置默认初始值。Java虚拟机为各类型变量默认的初始值如表所示。

![https://img-blog.csdnimg.cn/20201008211920804.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FkbWluNzQxYWRtaW4=,size_16,color_FFFFFF,t_70\#pic_center](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/f5f1aee74e0641f239b523121240dfa1.png)



注意：Java并不支持boolean类型，对于boolean类型，内部实现是int，由于int的默认值是0，故对应的，boolean的默认值就是false。

补充：

1.  这里不包含基本数据类型的字段用static final修饰的情况，因为final在编译的时候就会分配了，准备阶段会显式赋值。
    
2.  注意这里不会为实例变量分配初始化，类变量会分配在方法区中，而实例变量是会随着对象一起分配到Java堆中。

3.  在这个阶段并不会像初始化阶段中那样会有初始化或者代码被执行。



基本数据类型：

- 非final修饰的变量，在准备环节进行默认初始化时值。

- **final修饰以后，在准备环节直接进行显示赋值。**



引用类型String：

如果使用字面量的方式定义一个字符的常量的话，也是在准备环节直接进行显示赋值。

举例：变量a在准备阶段会赋初始值，但不是1，而是0，在初始化阶段会被赋值为 1

```java
public class HelloApp {
    private static int a = 1;   //prepare：a = 0 ---> initial : a = 1

    public static void main(String[] args) {
        System.out.println(a);
    }
}

```



##### 解析（Resolve)

在准备阶段完成后，就进入了解析阶段。解析阶段（Resolution），简言之，**将类、接口、字段和方法的符号引用转为直接引用。**



符号引用和直接引用理解：

- 符号引用，描述表达用的，比如菜谱上的步骤。

- 直接引用，实际操作用的，实际做菜操作。



1.  **具体描述**

符号引用就是一些字面量的引用，和虚拟机的内部数据结构和和内存布局无关。比较容易理解的就是在Class类文件中，通过常量池进行了大量的符号引用。

在程序实际运行时，只有符号引用是不够的，比如当println()方法被调用时，系统需要明确知道该方法的位置。

以方法为例，Java虚拟机为每个类都准备了一张方法表，将其所有的方法都列在表中，当需要调用一个类的方法的时候，只要知道这个方法在方法表中的偏移量就可以直接调用该方法。通过解析操作，符号引用就可以转变为目标方法在类的方法表中的位置，从而使得方法被成功调用。



2. **小结**

- 所调解析就是将符号引用转为直接引用，也就是得到类、字段、方法在内存中的指针或者偏移量。因此，可以说，如果直接引用存在，那么可以肯定系统中存在该类、方法或者字段。但只存在符号引用，不能确定系统中一定存在该结构。

- 不过Java虚拟机规范并没有明确要求解析阶段一定要按照顺序执行。在HotSpot VM中，加载、验证、准备和初始化会按照顺序有条不紊地执行，但链接阶段中的解析操作往往会伴随着JVM在执行完初始化之后再执行。



3. **字符串的复习**

最后，再来看一下CONSTANT_String的解析。由于字符串在程序开发中有着重要的作用，因此，读者有必要了解一下string在Java虚拟机中的处理。**当在Java代码中直接使用字符串常量时，就会在类中出现CONSTANT_String**，它表示字符串常量，并且会引用一 CONSTANT UTF8 的常量项。**在Java虚拟机内部运行中的常量池中，会维护一张字符串拘留表（intern），它会保存所有出现过的字符串常量，并且没有重复项。**只要以CONSTANT_String形式出现的字符串也都会在这张表中。使用String.intern()方法可以得到一个字符串在拘留表中的引用，因为该表中没有重复项，所以任何字面相同的字符串的String.intern()方法返回总是相等的。



#### Initialization（初始化阶段）

初始化阶段，简言之，为类的静态变量赋予正确的初始值。



1.  **具体描述**

类的初始化是类装载的最后一个阶段。如果前面的步骤都没有问题，那么表示类可以顺利装载到系统中。此时，类才会开始执行Java字节码。（即：到了初始化阶段，才真正开始执行类中定义的Java程序代码。）



初始化阶段的重要工作是执行**类的初始化方法：\<clinit\>()**。

- 该方法仅能由Java编译器生成并由JVM调用，程序开发者无法自定义一个同名的方法，更无法直接在Java程序中调用该方法，虽然该方法也是由字节码指令所组成。

- 它是由类静态成员的赋值语句以及static语句块合并产生的。



2. **说明**

- 在加载一个类之前，虚拟机总是会试图加载该类的父类，因此父类的\<clinit\>总是在子类\<clinit\>之前被调用。也就是说，父类的static块优先级高于子类。口诀：**由父及子，静态先行。**

- Java编译器并不会为所有的类都产生\<clinit\>()初始化方法。**哪些类在编译为字节码后，字节码文件中将不会包含\<clinit\>()方法？**

  - 一个类中并没有声明任何的类变量，也没有静态代码块时。

  - 一个类中声明类变量，但是没有明确使用类变量的初始化语句以及静态代码块来执行初始化操作时。

  - 一个类中包含static final修饰的基本数据类型的字段，这些类字段初始化语句采用编译时常量表达式。



简单理解，clinit\>() 方法是处理事情的，要有事情做，才会存在！



```java
/**
 * 哪些场景下，java编译器就不会生成<cLinit>()方法
 */
public class InitializationTest1 {
    //场景1：对应非静态的字段，不管是否进行了显式赋值，都不会生成<clinit>()方法
    public int num = 1;
    //场景2：静态的字段，没有显式的赋值，不会生成<clinit>()方法
    public static int numl;
    //场景3：比如对于声明为static final的基本数据类型的字段，不管是否进行了显式赋值，都不会生成<clinit>()方法
    public static final int num2 = 1;

}

```



##### static 与 final 搭配问题

使用static+final修饰，且显示赋值中不涉及到方法或构造器调用的基本数据类到或String类型的显式赋值，是在链接阶段的准备环节进行。

```java
/**
 * 说明：使用static+ final修饰的字段的显式赋值的操作，到底是在哪个阶段进行的赋值？
 * 情况1：在链接阶段的准备环节赋值
 * 情况2：在初始化阶段<cLinit>()中赋值
 * 
 * 结论：
 * 在链接阶段的准备环节赋值的情况：
 * 1.对于基本数据类型的字段来说，如果使用static final修饰，则显式赋值(直接赋值常量，而非调用方法)通常是在链接阶段的准备环节进行
 * 2.对于String来说，如果使用字面量的方式赋值，使用static final修饰的话，则显式赋值通常是在链接阶段的准备环节进行
 * 
 * 在初始化阶段<cLinit>()中赋值的情况：
 * 排除上述的在准备环节赋值的情况之外的情况。
 * 
 * 最终结论：使用static+final修饰，且显示赋值中不涉及到方法或构造器调用的基本数据类到或String类型的显式赋值，是在链接阶段的准备环节进行。
 */
public class InitializationTest2 {

    public static int a = 1; //在初始化阶段<clinit>()中赋值

    public static final int INT_CONSTANT = 10;     //在链接阶段的准备环节赋值

    public static final Integer INTEGER_CONSTANT1 = Integer.valueOf(100);     // 在初始化阶段<clinit>()中赋值

    public static Integer INTEGER_CONSTANT2 = Integer.valueOf(100);     // 在初始化阶段<clinit>()中概值

    public static final String se = "helloworlde";     // 在链接阶段的准备环节赋值

    public static final String s1 = new String("helloworld1");     // 在初始化阶段<clinit>()中赋值

    public static final int NUM1 = new Random().nextInt(10);//在初始化阶段clinit>()中赋值
}

```



##### \<clinit\>() 的线程安全性

对于\<clinit\>()方法的调用，也就是类的初始化，虚拟机会在内部确保其多线程环境中的安全性。

虚拟机会保证一个类的\<clinit\>()方法在多线程环境中被正确地加锁、同步，如果多个线程同时去初始化一个类，那么只会有一个线程去执行这个类的\<clinit\>()方法，其他线程都需要阻塞等待，直到活动线程执行\<clinit\>()方法完毕。

正是因为函数\<clinit\>()带锁线程安全的，因此，如果在一个类的\<clinit\>()方法中有耗时很长的操作，就可能造成多个线程阻塞，引发死锁。并且这种死锁是很难发现的，因为看起来它们并没有可用的锁信息。

如果之前的线程成功加载了类，则等在队列中的线程就没有机会再执行\<clinit\>()方法了。那么，当需要使用这个类时，虚拟机会直接返回给它已经准备好的信息。



##### 类的初始化情况：主动使用vs被动使用

Java程序对类的使用分为两种：主动使用和被动使用。

**主动使用才会调用\<clinit\>()进行初始化**，被动使用不会引起类的初始化。

被动使用不会引起类的初始化，但有可能只是加载了没进行初始化，比如调用类的final+static的字段，有加载能输出字段，但没经历初始化。



1.  **主动使用**

Class只有在首次使用的时候才会被装载，Java虚拟机不会无条件地装载Class类型。Java虚拟机规定，一个类或接口在初次使用前，必须要进行初始化。这里指的“使用”，是指主动使用，主动使用只有下列几种情况：（即：如果出现如下的情况，则会对类进行初始化操作。而初始化操作之前的加载、验证、准备已经完成。）

1.  当创建一个类的实例时，比如使用new关键字，或者通过反射、克隆、反序列化。
2.  当调用类的静态方法时，即当使用了字节码invokestatic指令。
3.  当使用类、接口的静态字段时（final修饰特殊考虑），比如，使用getstatic或者putstatic指令（对应访问变量、赋值变量操作）。
4.  当使用java.lang.reflect包中的方法反射类的方法时，比如：Class.forName（“com.atguigu.java.Test”）。
5.  当初始化子类时，如果发现其父类还没有进行过初始化，则需要先触发其父类的初始化。
6.  如果一个接口定义了default方法，那么直接实现或者间接实现该接口的类的初始化，该接口要在其之前被初始化。
7.  当虚拟机启动时，用户需要指定一个要执行的主类（包含main（）方法的那个类），虚拟机会先初始化这个主类。
8.  当初次调用MethodHandle 实例时，初始化该MethodHandle指向的方法所在的类（涉及解析REF getStatic、REF_putStatic、REF invokeStatic方法句柄对应的类）。



**针对5，补充说明：**

当Java虚拟机初始化一个类时，要求它的所有父类都已经被初始化，但是这条规则并不适用于接口。

在初始化一个类时，并不会先初始化它所实现的接口。

在初始化一个接口时，并不会先初始化它的父接口。

因此，一个父接口并不会因为它的子接口或者实现类的初始化而初始化。只有当程序首次使用特定接口的静态字段时，才会导致该接口的初始化。



**针对7，说明：**

VM启动的时候通过引导类加载器加载一个初始类。这个类在调用public static void
main（String[]）方法之前被链接和初始化。这个方法的执行将依次导致所需的类的加载，链接和初始化。



2. **被动使用**

除了以上的情况属于主动使用，其他的情况均属于被动使用。**被动使用不会引起类的初始化**。

也就是说：**并不是在代码中出现的类，就一定会被加载或者初始化。如果不符合主动使用的条件，类就不会初始化。**

1. 当访问一个静态字段时，只有真正声明这个字段的类才会被初始化。

   当通过子类引用父类的静态变量，不会导致子类初始化。

2. 通过数组定义类引用，不会触发此类的初始化。

3. 引用常量不会触发此类或接口的初始化。因为常量在链接阶段就已经被显式赋值了。

4. 调用ClassLoader类的LoadClass()方法加载一个类，并不是对类的主动使用，不会导致类的初始化。



#### Using（使用阶段）

任何一个类型在使用之前都必须经历过完整的加载、链接和初始化3个类加载步骤。一旦一个类型成功经历过这3个步骤之后，便“厉事俱备只欠东风”，就等着开发者使用了。

开发人员可以在程序中访问和调用它的静态类成员信息（比如：静态字段、静态方法），或者使用new关键字为其创建对象实例。



#### Unloading（卸载阶段）

1.  **类、类的加载器、类的实例之间的引用关系**

在类加载器的内部实现中，用一个Java集合来存放所加载类的引用。另一方面，一个Class对象总是会引用它的类加载器，调用Class对象的getclassLoader（）方法，就能获得它的类加载器。由此可见，代表某个类的Class实例与其类的加载器之间为双向关联关系。

一个类的实例总是引用代表这个类的Class对象。在Object类中定义了getclass（）方法，这个方法返回代表对象所属类的Class对象的引用。此外，所有的Java类都有一个静态属性class，它引用代表这个类的Class对象。

```java
Parent parent = new Parent(); // 类的实例
System.out.println(parent.getClass()); // 类
System.out.println(parent.getClass().getClassLoader()); // 类的加载器

```



2. **类的生命周期结束**

当Sample类被加载、链接和初始化后，它的生命周期就开始了。当代表Sample类的Class对象不再被引用，即不可触及时，Class对象就会结束生命周期，Sample类在方法区内的数据也会被卸载，从而结束Sample类的生命周期。

一个类何时结束生命周期，取决于代表它的Class对象何时结束生命周期。

![在这里插入图片描述](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/273a7be409e93169a68e956a835e3567.png)



- loader1变量和obj变量间接应用代表Sample类的Class对象，而objClass变量则直接引用它。

- 如果程序运行过程中，将上图左侧三个引用变量都置为null，此时Sample对象结束生命周期，MyClassLoader对象结束生命周期，代表Samp1e类的Class对象也结束生命周期，Sample类在方法区内的二进制数据被卸载。

- 当再次有需要时，会检查Sample类的Class对象是否存在，如果存在会直接使用，不再重新加载；如果不存在Sample类会被重新加载，在Java虚拟机的堆区会生成一个新的代表Sample类的Class实例（可以通过哈希码查看是否是同一个实例）。



3. **回顾：方法区（元空间）的垃圾回收**

方法区的垃圾收集主要回收两部分内容：**常量池中废弃的常量和不再使用的类型**。

HotSpot虚拟机对常量池的回收策略是很明确的，只要常量池中的常量没有被任何地方引用，就可以被回收。

判定一个常量是否“废弃”还是相对简单，而要判定一个类型是否属于“不再使用的类”的条件就比较苛刻了。需要同时满足下面三个条件：

1.  该类所有的实例都已经被回收。也就是Java堆中不存在该类及其任何派生子类的实例。

2.  加载该类的类加载器已经被回收。这个条件除非是经过精心设计的可替换类加载器的场景，如oSGi、JSP的重加载等，否则通常是很难达成的。

3.  该类对应的java.lang.Class对象没有在任何地方被引用，无法在任何地方通过反射访问该类的方法。



Java虚拟机被允许对满足上述三个条件的无用类进行回收，这里说的仅仅是“被允许”，而并不是和对象一样，没有引用了就必然会回收。



4. **类的卸载**

2.  启动类加载器加载的类型在整个运行期间是不可能被卸载的（jvm和jls规范）。

3.  被系统类加载器和扩展类加载器加载的类型在运行期间不太可能被卸载，因为系统类加载器实例或者扩展类的实例基本上在整个运行期间总能直接或者间接的访问的到，其达到unreachable的可能性极小。

4.  被开发者自定义的类加载器实例加载的类型只有在很简单的上下文环境中才能被卸载，而且一般还要借助于强制调用虚拟机的垃圾收集功能才可以做到。可以预想，稍微复杂点的应用场景中（比如：很多时候用户在开发自定义类加载器实例的时候采用缓存的策略以提高系统性能），被加载的类型在运行期间也是几乎不太可能被卸载的（至少卸载的时间是不确定的）。



综合以上三点，一个已经加载的类型被卸载的几率很小至少被卸载的时间是不确定的。同时可以看的出来，开发者在开发代码时候，不应该对虚拟机的类型卸载做任何假设的前提下，来实现系统中的特定功能（开发功能不依赖类的卸载）。



### 类加载器

![https://imgconvert.csdnimg.cn/aHR0cDovL2hleWdvLm9zcy1jbi1zaGFuZ2hhaS5hbGl5dW5jcy5jb20vaW1hZ2VzL2ltYWdlLTIwMjAwNzI3MTQ1MzIxMjIyLnBuZw?x-oss-process=image/format,png](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/f1ca6c83b5b831cf747f8971524b4492.png)

![](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/1b9510ec1f0d06c120b5bf22efe10948.png)



#### 启动类加载器（引导类加载器，Bootstrap ClassLoader）

- 这个类加载使用C/C++语言实现的，嵌套在JVM内部。

- 它用来加载Java的核心库（JAVA_HOME/jre/lib/rt.jar、resources.jar或sun.boot.class.path路径下的内容），用于提供JVM自身需要的类。

- 并不继承自java.lang.ClassLoader，没有父加载器。

- 加载扩展类和应用程序类加载器，并作为他们的父类加载器（当他俩的爹）。

- 出于安全考虑，Bootstrap启动类加载器只加载包名为java、javax、sun等开头的核心类。



#### 扩展类加载器（Extension ClassLoader）

- Java语言编写，由sun.misc.Launcher\$ExtClassLoader实现。

- 派生于ClassLoader类。

- 父类加载器为启动类加载器。

- 从java.ext.dirs系统属性所指定的目录中加载类库，或从JDK的安装目录的jre/lib/ext子目录（扩展目录）下加载类库。如果用户创建的JAR放在此目录下，也会自动由扩展类加载器加载。



#### 应用程序类加载器（系统类加载器，AppClassLoader）

- Java语言编写，由sun.misc.LaunchersAppClassLoader实现。

- 派生于ClassLoader类。

- 父类加载器为扩展类加载器。

- 它负责加载环境变量classpath或系统属性java.class.path指定路径下的类库。

- 该类加载是程序中默认的类加载器，一般来说，Java应用的类都是由它来完成加载。

- 通过classLoader.getSystemclassLoader()方法可以获取到该类加载器。



### ★自定义类加载器

#### 为什么需要自定义类加载器？

在Java的日常应用程序开发中，类的加载几乎是由上述3种类加载器相互配合执行的，在必要时，还可以自定义类加载器，来定制类的加载方式。那为什么还需要自定义类加载器？或者说哪些场景需要自定义加载器？

1.  隔离加载类

    中间件和应用中其他框架引用的jar包可能出现冲突，定义隔离加载类，避免冲突。

2.  修改类加载的方式

    JVM类加载器中的扩展类加载器和系统类加载器可能加载一些暂时不需要的jar包，可以通过修改类的加载方式，在需要的时候再加载。

3.  扩展加载源

    扩展更多加载字节码文件的渠道来源，比如，网络、数据库。

4.  防止源码泄漏

    对字节码加密，在加载运行时进行解密，防止源码泄漏。



#### 如何自定义类加载器？

1.  开发人员可以通过继承抽象类java.lang.ClassLoader类的方式，实现自己的类加载器，以满足一些特殊的需求。

2.  在JDK1.2之前，在自定义类加载器时，总会去继承ClassLoader类并重写loadClass()方法，从而实现自定义的类加载类，但是在JDK1.2之后已不再建议用户去覆盖loadClass()方法，而是**建议把自定义的类加载逻辑写在findClass()方法中。**

3.  在编写自定义类加载器时，如果没有太过于复杂的需求，可以直接继承 **URIClassLoader** 类，这样就可以避免自己去编写findclass()方法及其获取字节码流的方式，使自定义类加载器编写更加简洁。



```java
public class CustomClassLoader extends ClassLoader {
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {

        try {
            byte[] result = getClassFromCustomPath(name);
            if (result == null) {
                throw new FileNotFoundException();
            } else {
                return defineClass(name, result, 0, result.length);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        throw new ClassNotFoundException(name);
    }

    private byte[] getClassFromCustomPath(String name) {
        //从自定义路径中加载指定类:细节略
        //如果指定路径的字节码文件进行了加密，则需要在此方法中进行解密操作。
        return null;
    }

    public static void main(String[] args) {
        CustomClassLoader customClassLoader = new CustomClassLoader();
        try {
            Class<?> clazz = Class.forName("One", true, customClassLoader);
            Object obj = clazz.newInstance();
            System.out.println(obj.getClass().getClassLoader());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```



### 双亲委派机制

Java虚拟机对class文件采用的是**按需加载的方式**，也就是说当需要使用该类时才会将它的class文件加载到内存生成class对象。而且加载某个类的class文件时，Java虚拟机采用的是双亲委派模式，即把请求交由父类处理，它是一种任务委派模式。

各个类加载器各司其职，负责加载自己范围内类，做不了再交给下一个处理。

处于最低级别的应用类加载器或自定义加载器，不能自己先执行，必须先交给上级执行。



![](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/232a8756cbb84c1bdf063f69fc67a59b.png)



1.  如果一个类加载器收到了类加载请求，它并不会自己先去加载，而是把这个请求委托给父类的加载器去执行。
2.  如果父类加载器还存在其父类加载器，则进一步向上委托，依次递归，请求最终将到达顶层的启动类加载器。
3.  如果父类加载器可以完成类加载任务，就成功返回，倘若父类加载器无法完成此加载任务，子加载器才会尝试自己去加载，这就是双亲委派模式。
4.  父类加载器一层一层往下分配任务，如果子类加载器能加载，则加载此类，如果将加载任务分配至系统类加载器也无法加载此类，则抛出异常。



#### 为什么要使用双亲委派机制？

本来就是应用类加载器才能加载，非要向上委派一圈，最后还是自己加载，这样做不是浪费时间吗？不这样做行不行？会有什么问题？

1.  **使用原因：**

**为了防止恶意用户伪造核心类**，比如，自定义了一个String类，如果自定义加载类能执行这个String类，那么应用系统内部所有用到String的地方都将受到影响，甚至导致应用系统破坏，数据被窃取。



2. **优势**：

- 避免类的重复加载，确保一个类的全局唯一性（父类加载器已经加载了，没要子类加载器再重复加载一次，重复加载可能导致类引用问题）。

- 防止核心API被篡改。

  - 自定义类：java.lang.String （自动忽略）。

  - 自定义类：java.lang.TestClass（报错：阻止创建 java.lang开头的类）。



3. **弊端：**

- 检查类是否加载的委托过程是单向的，这个方式虽然从结构上说比较清晰，使各个ClassLoader的职责非常明确，但是同时会带来一个问题，即顶层的ClassLoader无法访问底层的ClassLoader所加载的类。

- 通常情况下，启动类加载器中的类为系统核心类，包括一些重要的系统接口，而在应用类加载器中，为应用类。按照这种模式，应用类访问系统类自然是没有问题，但是系统类访问应用类就会出现问题。比如在系统类中提供了一个接口，该接口需要在应用类中得以实现，该接口还绑定一个工厂方法，用于创建该接口的实例，而接口和工厂方法都在启动类加载器中。这时，就会出现该工厂方法无法创建由应用类加载器加载的应用实例的问题。



4. **代码支持**

双亲委派机制在java.lang.ClassLoader.loadClass(String，boolean)接口中体现。该接口的逻辑如下：

1.  先在当前加载器的缓存中查找有无目标类，如果有，直接返回。

2.  判断当前加载器的父加载器是否为空，如果不为空，则调用parent.loadClass(name，false)接口进行加载。

3.  反之，如果当前加载器的父类加载器为空，则调用findBootstrapClassorNull(name)接口，让引导类加载器进行加载。

4.  如果通过以上3条路径都没能成功加载，则调用findClass(name)接口进行加载。该接口最终会调用java.lang.ClassLoader接口的defineClass系列的native接口加载目标Java类。



双亲委派的模型在这第2和第3步中。



举例：

假设当前加载的是java.lang.Object这个类，很显然，该类属于JDK中核心得不能再核心的一个类，因此一定只能由引导类加载器进行加载。当]VM准备加载javaJang.Object时，JVM默认会使用系统类加载器去加载，按照上面4步加载的逻辑，在第1步从系统类的缓存中肯定查找不到该类，于是进入第2步。由于从系统类加载器的父加载器是扩展类加载器，于是扩展类加载器继续从第1步开始重复。由于扩展类加载器的缓存中也一定查找不到该类，因此进入第2步。扩展类的父加载器是null，因此系统调用findClass（String），最终通过引导类加载器进行加载。



思考：

如果在自定义的类加载器中重写java.lang.ClassLoader.loadClass(String)或java.lang.ClassLoader.loadclass(String，boolean)方法，抹去其中的双亲委派机制，仅保留上面这4步中的第1步与第4步，那么是不是就能够加载核心类库了呢？

这也不行！因为JDK还为核心类库提供了一层保护机制。不管是自定义的类加载器，还是系统类加载器抑或扩展类加载器，最终都必须调用 java.lang.ClassLoader.defineclass(String，byte[]，int，int，ProtectionDomain)方法，而该方法会执行**preDefineClass()**接口，该接口中提供了对JDK核心类库的保护。



虽然可以删除双亲委派机制，但核心仍受preDefineClass方法的保护。



#### 如何打破双亲委派机制？

##### 破坏双亲委派机制1

双亲委派模型的第一次“被破坏”其实发生在双亲委派模型出现之前一—即JDKl.2面世以前的“远古”时代。

由于双亲委派模型在JDK 1.2之后才被引入，但是类加载器的概念和抽象类java.lang.ClassLoader则在Java的第一个版本中就已经存在，面对经存在的用户自定义类加载器的代码，Java设计者们引入双亲委派模型时不得不做出一些妥协，为了兼容这些已有代码，无法再以技术手段避免loadClass()被子类覆盖的可能性，只能在JDK1.2之后的java.lang.ClassLoader中添加一个新的protected方法findClass()，并引导用户编写的类加载逻辑时尽可能去重写这个方法，而不是在loadClass()中编写代码。上节已经分析过loadClass()方法，双亲委派的具体逻辑就实现在这里面，按照loadClass()方法的逻辑，如果父类加载失败，会自动调用自己的findClass()方法来完成加载，这样既不影响用户按照自己的意愿去加载类，又可以保证新写出来的类加载器是符合双亲委派规则的。



##### ★破坏双亲委派机制2

第二次破坏双亲委派机制：**线程上下文类加载器**。



双亲委派模型的第二次“被破坏”是由这个模型自身的缺陷导致的，双亲委派很好地解决了各个类加载器协作时基础类型的一致性问题**（越基础的类由越上层的加载器进行加载）**，基础类型之所以被称为“基础”，是因为它们总是作为被用户代码继承、调用的API存在，但程序设计往往没有绝对不变的完美规则，**如果有基础类型又要调用回用户的代码，那该怎么办呢？**

这并非是不可能出现的事情，一个典型的例子便是JNDI服务，JNDI现在已经是Java的标准服务，它的代码由启动类加载器来完成加载（在JDK 1.3时加入到rt.jar的），肯定属于Java中很基础的类型了。但JNDI存在的目的就是对资源进行查找和集中管理，它需要调用由其他厂商实现并部署在应用程序的ClassPath下的JNDI服务提供者接口（Service Provider Interface，SPI）的代码，现在问题来了，启动类加载器是绝不可能认识、加载这些代码的，那该怎么办？（SPI：在Java平台中，通常把核心类rt.jar中提供外部服务、可由应用层自行实现的接口称为SPI）

为了解决这个困境，Java的设计团队只好引入了一个不太优雅的设计：线程上下文类加载器（Thread Context ClassLoader）。这个类加载器可以通过java.lang.Thread类的setContextClassLoader（）方法进行设置，如果创建线程时还未设置，它将会从父线程中继承一个，如果在应用程序的全局范围内都没有设置过的话，那这个类加载器默认就是应用程序类加载器。

有了线程上下文类加载器，程序就可以做一些“舞弊”的事情了。JNDI服务使用这个线程上下文类加载器去加载所需的SPI服务代码，这是一种父类加载器去请求子类加载器完成类加载的行为，这种行为实际上是打通了双亲委派模型的层次结构来逆向使用类加载器，已经违背了双亲委派模型的一般性原则，但也是无可奈何的事情。Java中涉及SPI的加载基本上都采用这种方式来完成，例如JNDI、JDBC、JCE、JAXB和JBI等。不过，当SPI的服务提供者多于一个的时候，代码就只能根据具体提供者的类型来硬编码判断，为了消除这种极不优雅的实现方式，在JDK6时，JDK提供了java.util.ServiceLoader类，以META-INF/services中的配置信息，辅以责任链模式，这才算是给SPI的加载提供了一种相对合理的解决方案。



![在这里插入图片描述](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/2a2812f56f8a97dd26a321c015c54c2a.png)



默认上下文加载器就是应用类加载器，这样以上下文加载器为中介，使得启动类加载器中的代码也可以访问应用类加载器中的类。



##### 破坏双亲委派机制3

双亲委派模型的第三次“被破坏”是由于用户对程序动态性的追求而导致的。如：**代码热替换**(Hot Swap)、**模块热部署**(Hot Deployment)等。

IBM公司主导的JSR-291(即OSGiR4.2)实现模块化热部署的关键是它自定义的类加载器机制的实现，每一个程序模块(osGi中称为Bundle)都有一个自己的类加载器，当需要更换一个Bundle时，就把Bund1e连同类加载器一起换掉以实现代码的热替换。在oSGi环境下，类加载器不再双亲委派模型推荐的树状结构，而是进一步发展为更加复杂的网状结构。



当收到类加载请求时，OSGi将按照下面的顺序进行类搜索：

1.  将以java.开头的类，委派给父类加载器加载。

2.  否则，将委派列表名单内的类，委派给父类加载器加载。

3.  否则，将Import列表中的类，委派给Export这个类的Bundle的类加载器加载。

4.  否则，查找当前Bundle的ClassPath，使用自己的类加载器加载。

5.  否则，查找类是否在自己的Fragment Bundle中，如果在，则委派给Fragment Bundle的类加载器加载。
    
6.  否则，查找Dynamic Import列表的Bundle，委派给对应Bund1e的类加载器加载。

7.  否则，类查找失败。



说明：只有开头两点仍然符合双亲委派模型的原则，其余的类查找都是在平级的类加载器中进行的。



小结：这里，使用了“被破坏”这个词来形容上述不符合双亲委派模型原则的行为，但这里“被破坏”并不一定是带有贬义的。只要有明确的目的和充分的理由，突破旧有原则无疑是一种创新。



正如：OSGi中的类加载器的设计不符合传统的双亲委派的类加载器架构，且业界对其为了实现热部署而带来的额外的高复杂度还存在不少争议，但对这方面有了解的技术人员基本还是能达成一个共识，认为OSGi中对类加载器的运用是值得学习的，完全弄懂了OSGi的实现，就算是掌握了类加载器的精粹。



##### ★热替换的实现

热替换是指在程序的运行过程中，不停止服，只通过替换程序文件来修改程序的行为。**热替换的关键需求在于服务不能中断，修改必须立即表现正在运行的系统之中。**基本上大部分脚本语言都是天生支持热替换的，比如：PHP，只要替换了PHP源文件，这种改动就会立即生效，而无需重启Web服务器。

但对Java来说，热替换并非天生就支持，如果一个类已经加载到系统中，通过修改类文件，并无法让系统再来加载并重定义这个类。因此，在Java中实现这一功能的一个可行的方法就是灵活运用ClassLoader。

注意：由不同ClassLoader加载的同名类属于不同的类型，不能相互转换和兼容。即两个不同的ClassLoader加载同一个类，在虚拟机内部，会认为这2个类是完全不同的。



根据这个特点，可以用来模拟热替换的实现，基本思路如下图所示：

![在这里插入图片描述](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/2fc23a283f0badc4d4dc169d627a5999.png)



**代码实现**

通过反射，循环加载指定目录下的class文件，生成对象实例，调用对象的方法。由于class文件没有缓存，修改内容替换原来的class之后，再被执行，就已经是修改后的代码了。

```java
package T1;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class MyClassLoader extends ClassLoader {
    private String rootDir;

    public MyClassLoader(String rootDir) {
        this.rootDir = rootDir;
    }

    // 编写findclass方法的逻辑
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        //获取类的cLass文件字节数组
        byte[] classData = getClassData(name);
        if (classData == null) {
            throw new ClassNotFoundException();
        } else {
            //直接生成cLass对象
            return defineClass(name, classData, 0, classData.length);
        }
    }


    // 编写获cLass文件并转换为字节码流的逻辑
    private byte[] getClassData(String className) {
        //读取类文件的字节
        String path = classNameToPath(className);
        try {
            InputStream ins = new FileInputStream(path);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int len = 0;

            //读取类文件的字节码
            while ((len = ins.read(buffer)) != -1) {
                baos.write(buffer, 0, len);
            }
            return baos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;

    }

    // 类文件的完全路径
    private String classNameToPath(String className) {
        return rootDir + "\\" + className.replace('.', '\\') + ".class";
    }
}


package T1;

import java.lang.reflect.Method;

public class LoopRun {
    public static void main(String[] args) {
        while (true) {
            try {
                // 1 创建自定义类加载器的实列
                MyClassLoader loader = new MyClassLoader("D:\\apache-maven-3.6.3\\maven_repo\\jvm\\jvm1\\src\\main\\webapp\\java");

                // 2 加载指定的类。TODO 思考：T1.Demo1.class这个类随着不停地被修改更新，不停地被加载，会不会导致元空间存储类元信息重复（原来的类元信息还没卸载掉，又新增了新的类元信息），引发内存泄漏问题？（用JVM调优工具验证加载的类）
                Class<?> loaderClass = loader.findClass("T1.Demo1");

                // 3 创建运行时类的实列
                Object demo1 = loaderClass.newInstance();

                // 4 获取运行时的方法
                Method hot = loaderClass.getMethod("hot");

                // 5 调用指定的方法
                hot.invoke(demo1);


                for (int i = 0; i < 10; i++) {
                    System.out.println("目前loader的地址:" + loader);
                    hot.invoke(demo1);
                }

                Thread.sleep(5000);

            } catch (Exception e) {
                System.out.println("not found");
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException ex) {
                    ex.printStackTrace();
                }
            }
        }
    }

}


package T1;

public class Demo1 {
    public void hot(){
        System.out.println("old1------------>new2");
    }
}


```



### 沙箱安全机制

自定义String类，执行main方法时：在加载自定义String类的时候会率先使用引导类加载器加载，而引导类加载器在加载的过程中会先加载jdk自带的文件（rt.jar包中java.lang.String.class），报错信息说没有main方法，就是因为加载的是rt.jar包中的String类。

这样可以保证对java核心源代码的保护，这就是沙箱安全机制。



### 其他

#### 命名空间

每个类加载器都有自己的命名空间，命名空间由该加载器及所有的父加载器所加载的类组成。

在同一命名空间中，不会出现类的完整名字（包括类的包名）相同的两个类。

在不同的命名空间中，有可能会出现类的完整名字（包括类的包名）相同的两个类。

在大型应用中，往往借助这一特性，来运行同一个类的不同版本。



#### 如何判断两个class对象是否相同？

在JVM中表示两个class对象是否为同一个类存在两个必要条件：

- 类的完整类名必须一致，包括包名。

- 加载这个类的ClassLoader（指ClassLoader实例对象）必须相同。

换句话说，在JVM中，即使这两个类对象（class对象）来源同一个Class文件，被同一个虚拟机所加载，但只要加载它们的ClassLoader实例对象不同，那么这两个类对象也是不相等的。



**类的唯一性**

对于任意一个类，都需要由加载它的类加载器和这个类本身一同确认其在Java虚拟机中的唯一性。每一个类加载器，都拥有一个独立的类名称空间：比较两个类是否相等，只有在这两个类是由同一个类加载器加载的前提下才有意义。否则，即使这两个类源自同一个Class文件，被同一个虚拟机加载，只要加载他们的类加载器不同，那这两个类就必定不相等。



#### 对类加载器的引用

JVM必须知道一个类型是由启动加载器加载的还是由用户类加载器加载的。如果一个类型是由用户类加载器加载的，那么JVM会**将这个类加载器的一个引用作为类型信息的一部分保存在方法区中。**当解析一个类型到另一个类型的引用的时候，JVM需要保证这两个类型的类加载器是相同的。



#### 类的主动使用和被动使用

Java程序对类的使用方式分为：主动使用和被动使用。

主动使用，又分为七种情况：

1.  创建类的实例。

2.  访问某个类或接口的静态变量，或者对该静态变量赋值。

3.  调用类的静态方法。

4.  反射（比如：Class.forName(“com.atguigu.Test”)）。

5.  初始化一个类的子类。

6.  Java虚拟机启动时被标明为启动类的类。

7.  JDK7开始提供的动态语言支持：java.lang.invoke.MethodHandle实例的解析结果REF_getStatic、REF putStatic、REF_invokeStatic句柄对应的类没有初始化，则初始化。



除了以上七种情况，其他使用Java类的方式都被看作是对类的被动使用，都不会导致类的初始化，即不会执行初始化阶段（不会调用
clinit() 方法和 init() 方法）。





## 四、Java 内存模型（JMM）

- [ Java 内存模型引入](https://www.pdai.tech/md/java/jvm/java-jvm-x-introduce.html)
- [Java 内存模型详解](https://www.pdai.tech/md/java/jvm/java-jvm-jmm.html)



> 很多人都无法区分Java内存模型和JVM内存结构，以及Java内存模型与物理内存之间的关系。
>
> 理论概念看着云里雾里的，建议结合面试题，加以理解。

![天天在用volatile，你知道它的底层原理吗？](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/1460000037486490.png)



Java 内存模型中规定所有变量都存储在主内存，主内存是共享内存区域，所有线程都可以访问，但线程对变量的操作(读取赋值等)必须在工作内存中进行，首先要将变量从主内存拷贝的自己的工作内存空间，然后对变量进行操作，操作完成后再将变量写回主内存，不能直接操作主内存中的变量，工作内存中存储着主内存中的变量副本拷贝。前面说过，工作内存是每个线程的私有数据区域，因此不同的线程间无法访问对方的工作内存，线程间的通信(传值)必须通过主内存来完成。



Java 内存模型会带来三个问题：

**1.可见性问题**

线程A和线程B同时操作共享数据C，线程A修改的结果，线程B是不知道的，即不可见的

**2.竞争问题**

刚开始数据C的值为1，线程A和线程B同时执行加1操作，正常情况下数据C应该为3，但是在并发的情况下，数据C却还是2

**3.重排序问题**

JVM为了优化指令的执行效率，会对一些代码指令进行重排序。



**如何解决问题呢？**

使用 volatile 关键字，保证多线程对主内存共享变量访问的可见性，避免指令重排序。

具体参考 [天天在用volatile，你知道它的底层原理吗？](https://segmentfault.com/a/1190000037486483)





## 五、JVM 内存结构

-   [内存与垃圾回收篇](https://blog.csdn.net/oneby1314/category_10647590.html)（包含以下资料，就不搬运摘抄了）
-   [2020最新版宋红康JVM教程](https://www.bilibili.com/video/BV1PJ411n7xZ)（b站公认不错的 JVM 教程）
-   [JVM 教程笔记](https://gitee.com/vectorx/NOTE_JVM/tree/main)
-   [JVM 内存结构](https://www.pdai.tech/md/java/jvm/java-jvm-struct.html)



![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/007S8ZIlly1gg9kuge8ovj32150tt7cd.jpg)



![](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/6370ba4acabfd1a67202aeeef7b7ca4b.png)



![](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/f7f448deadef4fde5efb40a124d9dc41.png)



**运行时数据区**

多个结构图对比，各有各的可取之处。

![image-20200705112416101](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/8b168998dd6f4ba9a9c5e3a7a441d134.png)



![jvm-framework](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/0082zybply1gc6fz21n8kj30u00wpn5v.jpg)



Java 虚拟机定义了若干种程序运行期间会使用到的运行时数据区，其中有一些会随着虚拟机启动而创建，随着虚拟机退出而销毁。另外一些则是与线程一一对应的，这些与线程一一对应的数据区域会随着线程开始和结束而创建和销毁。

- **线程私有**：程序计数器、虚拟机栈、本地方法区
- **线程共享**：堆、方法区, 堆外内存（Java7的永久代或JDK8的元空间、代码缓存）



### 程序计数器

程序计数寄存器（**Program Counter Register**），Register 的命名源于 CPU 的寄存器，寄存器存储指令相关的线程信息，CPU 只有把数据装载到寄存器才能够运行。

这里，并非是广义上所指的物理寄存器，叫程序计数器（或PC计数器或指令计数器）会更加贴切，并且也不容易引起一些不必要的误会。**JVM 中的 PC 寄存器是对物理 PC 寄存器的一种抽象模拟**。

程序计数器是一块较小的内存空间，可以看作是当前线程所执行的字节码的**行号指示器**。



#### 作用

PC 寄存器用来存储指向**下一条指令的地址**，即将要执行的指令代码。由执行引擎读取下一条指令。

![jvm-pc-counter](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/0082zybply1gc5kmznm1sj31m50u0wph.jpg)



（分析：进入class文件所在目录，执行 `javap -v xx.class` 反解析（或者通过 IDEA 插件 `Jclasslib` 直接查看，上图），可以看到当前类对应的Code区（汇编指令）、本地变量表、异常表和代码行偏移量映射表、常量池等信息。）



#### 概述

> 通过下面两个问题，理解下PC计数器

- **使用PC寄存器存储字节码指令地址有什么用呢？为什么使用PC寄存器记录当前线程的执行地址呢？**

因为CPU需要不停的切换各个线程，这时候切换回来以后，就得知道接着从哪开始继续执行。JVM的字节码解释器就需要通过改变PC寄存器的值来明确下一条应该执行什么样的字节码指令。

- **PC寄存器为什么会被设定为线程私有的？**

多线程在一个特定的时间段内只会执行其中某一个线程方法，CPU会不停的做任务切换，这样必然会导致经常中断或恢复。为了能够准确的记录各个线程正在执行的当前字节码指令地址，所以为每个线程都分配了一个PC寄存器，每个线程都独立计算，不会互相影响。

> 相关总结如下：

- 它是一块很小的内存空间，几乎可以忽略不计。也是运行速度最快的存储区域
- 在 JVM 规范中，每个线程都有它自己的程序计数器，是线程私有的，生命周期与线程的生命周期一致
- 任何时间一个线程都只有一个方法在执行，也就是所谓的**当前方法**。如果当前线程正在执行的是 Java 方法，程序计数器记录的是 JVM 字节码指令地址，如果是执行 native 方法，则是未指定值（undefined）
- 它是程序控制流的指示器，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成
- 字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令
- **它是唯一一个在 JVM 规范中没有规定任何 `OutOfMemoryError` 情况的区域**



### 虚拟机栈

#### 概述

> Java 虚拟机栈(Java Virtual Machine Stacks)，早期也叫 Java 栈。每个线程在创建的时候都会创建一个虚拟机栈，其内部保存一个个的栈帧(Stack Frame），对应着一次次 Java 方法调用，是线程私有的，生命周期和线程一致。

**作用**：主管 Java 程序的运行，它保存方法的局部变量、部分结果，并参与方法的调用和返回。

**特点**：

- 栈是一种快速有效的分配存储方式，访问速度仅次于程序计数器
- JVM 直接对虚拟机栈的操作只有两个：每个方法执行，伴随着**入栈**（进栈/压栈），方法执行结束**出栈**
- **栈不存在垃圾回收问题**

**栈中可能出现的异常**：

Java 虚拟机规范允许 **Java虚拟机栈的大小是动态的或者是固定不变的**

- 如果采用固定大小的 Java 虚拟机栈，那每个线程的 Java 虚拟机栈容量可以在线程创建的时候独立选定。如果线程请求分配的栈容量超过 Java 虚拟机栈允许的最大容量，Java 虚拟机将会抛出一个 **StackOverflowError** 异常
- 如果 Java 虚拟机栈可以动态扩展，并且在尝试扩展的时候无法申请到足够的内存，或者在创建新的线程时没有足够的内存去创建对应的虚拟机栈，那 Java 虚拟机将会抛出一个**OutOfMemoryError**异常

可以通过参数`-Xss`来设置线程的最大栈空间，栈的大小直接决定了函数调用的最大可达深度。

官方提供的参考工具，可查一些参数和操作：https://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html#BGBCIEFC



#### 栈的存储单位

栈中存储什么？

- 每个线程都有自己的栈，栈中的数据都是以**栈帧（Stack Frame）的格式存在**
- 在这个线程上正在执行的每个方法都各自有对应的一个栈帧
- 栈帧是一个内存区块，是一个数据集，维系着方法执行过程中的各种数据信息



#### 栈运行原理

- JVM 直接对 Java 栈的操作只有两个，对栈帧的**压栈**和**出栈**，遵循“先进后出/后进先出”原则
- 在一条活动线程中，一个时间点上，只会有一个活动的栈帧。即只有当前正在执行的方法的栈帧（**栈顶栈帧**）是有效的，这个栈帧被称为**当前栈帧**（Current Frame），与当前栈帧对应的方法就是**当前方法**（Current Method），定义这个方法的类就是**当前类**（Current Class）
- 执行引擎运行的所有字节码指令只针对当前栈帧进行操作
- 如果在该方法中调用了其他方法，对应的新的栈帧会被创建出来，放在栈的顶端，称为新的当前栈帧
- 不同线程中所包含的栈帧是不允许存在相互引用的，即不可能在一个栈帧中引用另外一个线程的栈帧
- 如果当前方法调用了其他方法，方法返回之际，当前栈帧会传回此方法的执行结果给前一个栈帧，接着，虚拟机会丢弃当前栈帧，使得前一个栈帧重新成为当前栈帧
- Java 方法有两种返回函数的方式，**一种是正常的函数返回，使用 return 指令，另一种是抛出异常，不管用哪种方式，都会导致栈帧被弹出**



IDEA 在 debug 时候，可以在 debug 窗口看到 Frames 中各种方法的压栈和出栈情况

![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/0082zybply1gc9lezaxrbj319v0u0k4w.jpg)



#### 栈帧的内部结构

每个**栈帧**（Stack Frame）中存储着：

- 局部变量表（Local Variables）
- 操作数栈（Operand Stack）(或称为表达式栈)
- 动态链接（Dynamic Linking）：指向运行时常量池的方法引用
- 方法返回地址（Return Address）：方法正常退出或异常退出的地址
- 一些附加信息

![jvm-stack-frame](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/0082zybply1gc8tjehg8bj318m0lbtbu.jpg)



##### 局部变量表

- 局部变量表也被称为局部变量数组或者本地变量表
- 是一组变量值存储空间，**主要用于存储方法参数和定义在方法体内的局部变量**，包括编译器可知的各种 Java 虚拟机**基本数据类型**（boolean、byte、char、short、int、float、long、double）、**对象引用**（reference类型，它并不等同于对象本身，可能是一个指向对象起始地址的引用指针，也可能是指向一个代表对象的句柄或其他与此相关的位置）和 **returnAddress** 类型（指向了一条字节码指令的地址，已被异常表取代）
- 由于局部变量表是建立在线程的栈上，是线程的私有数据，因此**不存在数据安全问题**
- **局部变量表所需要的容量大小是编译期确定下来的**，并保存在方法的 Code 属性的 `maximum local variables` 数据项中。在方法运行期间是不会改变局部变量表的大小的
- 方法嵌套调用的次数由栈的大小决定。一般来说，**栈越大，方法嵌套调用次数越多**。对一个函数而言，它的参数和局部变量越多，使得局部变量表膨胀，它的栈帧就越大，以满足方法调用所需传递的信息增大的需求。进而函数调用就会占用更多的栈空间，导致其嵌套调用次数就会减少。
- **局部变量表中的变量只在当前方法调用中有效**。在方法执行时，虚拟机通过使用局部变量表完成参数值到参数变量列表的传递过程。当方法调用结束后，随着方法栈帧的销毁，局部变量表也会随之销毁。
- 参数值的存放总是在局部变量数组的 index0 开始，到数组长度 -1 的索引结束



**槽 Slot**

- 局部变量表最基本的存储单元是 Slot（变量槽）
- 在局部变量表中，32 位以内的类型只占用一个 Slot(包括returnAddress类型)，64 位的类型（long和double）占用两个连续的 Slot
  - byte、short、char 在存储前被转换为int，boolean也被转换为int，0 表示 false，非 0 表示 true
  - long 和 double 则占据两个 Slot
- JVM 会为局部变量表中的每一个 Slot 都分配一个访问索引，通过这个索引即可成功访问到局部变量表中指定的局部变量值，索引值的范围从 0 开始到局部变量表最大的 Slot 数量
- 当一个实例方法被调用的时候，它的方法参数和方法体内部定义的局部变量将会**按照顺序被复制**到局部变量表中的每一个 Slot 上
- **如果需要访问局部变量表中一个 64bit 的局部变量值时，只需要使用前一个索引即可**。（比如：访问 long 或 double 类型变量，不允许采用任何方式单独访问其中的某一个 Slot）
- 如果当前帧是由构造方法或实例方法创建的，那么该对象引用 this 将会存放在 index 为 0 的 Slot 处，其余的参数按照参数表顺序继续排列（这里就引出一个问题：静态方法中为什么不可以引用 this，就是因为this 变量不存在于当前方法的局部变量表中）
- **栈帧中的局部变量表中的槽位是可以重用的**，如果一个局部变量过了其作用域，那么在其作用域之后申明的新的局部变量就很有可能会复用过期局部变量的槽位，从而**达到节省资源的目的**。（下图中，this、a、b、c 理论上应该有 4 个变量，c 复用了 b 的槽）

![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/0082zybply1gc9s12g5wlj31li0owdm9.jpg)

- 在栈帧中，与性能调优关系最为密切的就是局部变量表。在方法执行时，虚拟机使用局部变量表完成方法的传递
- **局部变量表中的变量也是重要的垃圾回收根节点，只要被局部变量表中直接或间接引用的对象都不会被回收**



##### 操作数栈

- 每个独立的栈帧中除了包含局部变量表之外，还包含一个**后进先出**（Last-In-First-Out）的操作数栈，也可以称为**表达式栈**（Expression Stack）
- **操作数栈，在方法执行过程中，根据字节码指令，往操作数栈中写入数据或提取数据，即入栈（push）、出栈（pop）**
- 某些字节码指令将值压入操作数栈，其余的字节码指令将操作数取出栈。使用它们后再把结果压入栈。比如，执行复制、交换、求和等操作



**概述**

- 操作数栈，**主要用于保存计算过程的中间结果，同时作为计算过程中变量临时的存储空间**
- 操作数栈就是 JVM 执行引擎的一个工作区，当一个方法刚开始执行的时候，一个新的栈帧也会随之被创建出来，**此时这个方法的操作数栈是空的**
- 每一个操作数栈都会拥有一个明确的栈深度用于存储数值，其所需的最大深度在编译期就定义好了，保存在方法的 Code 属性的 `max_stack` 数据项中
- 栈中的任何一个元素都可以是任意的 Java 数据类型
  - 32bit 的类型占用一个栈单位深度
  - 64bit 的类型占用两个栈单位深度
- 操作数栈并非采用访问索引的方式来进行数据访问的，而是只能通过标准的入栈和出栈操作来完成一次数据访问
- **如果被调用的方法带有返回值的话，其返回值将会被压入当前栈帧的操作数栈中**，并更新 PC 寄存器中下一条需要执行的字节码指令
- 操作数栈中元素的数据类型必须与字节码指令的序列严格匹配，这由编译器在编译期间进行验证，同时在类加载过程中的类检验阶段的数据流分析阶段要再次验证
- 另外，说**Java虚拟机的解释引擎是基于栈的执行引擎**，其中的栈指的就是操作数栈



**栈顶缓存（Top-of-stack-Cashing）**

HotSpot 的执行引擎采用的并非是基于寄存器的架构，但这并不代表 HotSpot VM 的实现并没有间接利用到寄存器资源。寄存器是物理 CPU 中的组成部分之一，它同时也是 CPU 中非常重要的高速存储资源。一般来说，寄存器的读/写速度非常迅速，甚至可以比内存的读/写速度快上几十倍不止，不过寄存器资源却非常有限，不同平台下的CPU 寄存器数量是不同和不规律的。寄存器主要用于缓存本地机器指令、数值和下一条需要被执行的指令地址等数据。

基于栈式架构的虚拟机所使用的零地址指令更加紧凑，但完成一项操作的时候必然需要使用更多的入栈和出栈指令，这同时也就意味着将需要更多的指令分派（instruction dispatch）次数和内存读/写次数。由于操作数是存储在内存中的，因此频繁的执行内存读/写操作必然会影响执行速度。为了解决这个问题，HotSpot JVM 设计者们提出了栈顶缓存技术，**将栈顶元素全部缓存在物理 CPU 的寄存器中，以此降低对内存的读/写次数，提升执行引擎的执行效率**



##### 动态链接（指向运行时常量池的方法引用）

- **每一个栈帧内部都包含一个指向运行时常量池中该栈帧所属方法的引用**。包含这个引用的目的就是为了支持当前方法的代码能够实现动态链接(Dynamic Linking)。
- 在 Java 源文件被编译到字节码文件中时，所有的变量和方法引用都作为**符号引用**（Symbolic Reference）保存在 Class 文件的常量池中。比如：描述一个方法调用了另外的其他方法时，就是通过常量池中指向方法的符号引用来表示的，那么**动态链接的作用就是为了将这些符号引用转换为调用方法的直接引用**

![jvm-dynamic-linking](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/0082zybply1gca4k4gndgj31d20o2td0.jpg)



**JVM 是如何执行方法调用的**

方法调用不同于方法执行，方法调用阶段的唯一任务就是确定被调用方法的版本（即调用哪一个方法），暂时还不涉及方法内部的具体运行过程。Class 文件的编译过程中不包括传统编译器中的连接步骤，一切方法调用在 Class文件里面存储的都是**符号引用**，而不是方法在实际运行时内存布局中的入口地址（**直接引用**）。也就是需要在类加载阶段，甚至到运行期才能确定目标方法的直接引用。

> 【这一块内容，除了方法调用，还包括解析、分派（静态分派、动态分派、单分派与多分派），这里先不介绍，后续再挖】

在 JVM 中，将符号引用转换为调用方法的直接引用与方法的绑定机制有关

- **静态链接**：当一个字节码文件被装载进 JVM 内部时，如果被调用的**目标方法在编译期可知**，且运行期保持不变时。这种情况下将调用方法的符号引用转换为直接引用的过程称之为静态链接
- **动态链接**：如果被调用的方法在编译期无法被确定下来，也就是说，只能在程序运行期将调用方法的符号引用转换为直接引用，由于这种引用转换过程具备动态性，因此也就被称之为动态链接

对应的方法的绑定机制为：早期绑定（Early Binding）和晚期绑定（Late Binding）。**绑定是一个字段、方法或者类在符号引用被替换为直接引用的过程，这仅仅发生一次**。

- 早期绑定：**早期绑定就是指被调用的目标方法如果在编译期可知，且运行期保持不变时**，即可将这个方法与所属的类型进行绑定，这样一来，由于明确了被调用的目标方法究竟是哪一个，因此也就可以使用静态链接的方式将符号引用转换为直接引用。
- 晚期绑定：如果被调用的方法在编译器无法被确定下来，只能够在程序运行期根据实际的类型绑定相关的方法，这种绑定方式就被称为晚期绑定。



**虚方法和非虚方法**

- 如果方法在编译器就确定了具体的调用版本，这个版本在运行时是不可变的。这样的方法称为非虚方法，比如静态方法、私有方法、final 方法、实例构造器、父类方法都是非虚方法
- 其他方法称为虚方法



**虚方法表**

在面向对象编程中，会频繁的使用到动态分派，如果每次动态分派都要重新在类的方法元数据中搜索合适的目标有可能会影响到执行效率。为了提高性能，JVM 采用在类的方法区建立一个虚方法表（virtual method table），使用索引表来代替查找。非虚方法不会出现在表中。

每个类中都有一个虚方法表，表中存放着各个方法的实际入口。

虚方法表会在类加载的连接阶段被创建并开始初始化，类的变量初始值准备完成之后，JVM 会把该类的方法表也初始化完毕。



##### 方法返回地址（return address）

用来存放调用该方法的 PC 寄存器的值。

一个方法的结束，有两种方式

- 正常执行完成
- 出现未处理的异常，非正常退出

无论通过哪种方式退出，在方法退出后都返回到该方法被调用的位置。方法正常退出时，调用者的 PC 计数器的值作为返回地址，即调用该方法的指令的下一条指令的地址。而通过异常退出的，返回地址是要通过异常表来确定的，栈帧中一般不会保存这部分信息。

当一个方法开始执行后，只有两种方式可以退出这个方法：

1. 执行引擎遇到任意一个方法返回的字节码指令，会有返回值传递给上层的方法调用者，简称**正常完成出口**

   一个方法的正常调用完成之后究竟需要使用哪一个返回指令还需要根据方法返回值的实际数据类型而定

   在字节码指令中，返回指令包含 ireturn(当返回值是 boolean、byte、char、short 和 int 类型时使用)、lreturn、freturn、dreturn 以及 areturn，另外还有一个 return 指令供声明为 void 的方法、实例初始化方法、类和接口的初始化方法使用。

2. 在方法执行的过程中遇到了异常，并且这个异常没有在方法内进行处理，也就是只要在本方法的异常表中没有搜索到匹配的异常处理器，就会导致方法退出。简称**异常完成出口**

   方法执行过程中抛出异常时的异常处理，存储在一个异常处理表，方便在发生异常的时候找到处理异常的代码。

本质上，**方法的退出就是当前栈帧出栈的过程**。此时，需要恢复上层方法的局部变量表、操作数栈、将返回值压入调用者栈帧的操作数栈、设置PC寄存器值等，让调用者方法继续执行下去。

正常完成出口和异常完成出口的区别在于：**通过异常完成出口退出的不会给他的上层调用者产生任何的返回值**



#####  附加信息

栈帧中还允许携带与 Java 虚拟机实现相关的一些附加信息。例如，对程序调试提供支持的信息，但这些信息取决于具体的虚拟机实现。





### 本地方法栈

#### 本地方法接口

简单的讲，一个 Native Method 就是一个 Java 调用非 Java 代码的接口。知道的 Unsafe 类就有很多本地方法。

> 为什么要使用本地方法（Native Method）?

Java 使用起来非常方便，然而有些层次的任务用 Java 实现起来也不容易，或者对程序的效率很在意时，问题就来了

- 与 Java 环境外交互：有时 Java 应用需要与 Java 外面的环境交互，这就是本地方法存在的原因。
- 与操作系统交互：JVM 支持 Java 语言本身和运行时库，但是有时仍需要依赖一些底层系统的支持。通过本地方法，可以实现用 Java 与实现了 jre 的底层系统交互， JVM 的一些部分就是 C 语言写的。
- Sun's Java：Sun的解释器就是C实现的，这使得它能像一些普通的C一样与外部交互。jre大部分都是用 Java 实现的，它也通过一些本地方法与外界交互。比如，类 `java.lang.Thread` 的 `setPriority()` 的方法是用Java 实现的，但它实现调用的是该类的本地方法 `setPrioruty()`，该方法是C实现的，并被植入 JVM 内部。



#### 本地方法栈（Native Method Stack）

- Java 虚拟机栈用于管理 Java 方法的调用，而本地方法栈用于管理本地方法的调用
- 本地方法栈也是线程私有的
- 允许线程固定或者可动态扩展的内存大小
  - 如果线程请求分配的栈容量超过本地方法栈允许的最大容量，Java 虚拟机将会抛出一个 `StackOverflowError` 异常
  - 如果本地方法栈可以动态扩展，并且在尝试扩展的时候无法申请到足够的内存，或者在创建新的线程时没有足够的内存去创建对应的本地方法栈，那么 Java虚拟机将会抛出一个`OutofMemoryError`异常
- 本地方法是使用 C 语言实现的
- 它的具体做法是 `Native Method Stack` 中登记 native 方法，在 `Execution Engine` 执行时加载本地方法库当某个线程调用一个本地方法时，它就进入了一个全新的并且不再受虚拟机限制的世界。它和虚拟机拥有同样的权限。
- 本地方法可以通过本地方法接口来访问虚拟机内部的运行时数据区，它甚至可以直接使用本地处理器中的寄存器，直接从本地内存的堆中分配任意数量的内存
- 并不是所有 JVM 都支持本地方法。因为 Java 虚拟机规范并没有明确要求本地方法栈的使用语言、具体实现方式、数据结构等。如果 JVM 产品不打算支持 native 方法，也可以无需实现本地方法栈
- 在 Hotspot JVM 中，直接将本地方法栈和虚拟机栈合二为一



------

> **栈是运行时的单位，而堆是存储的单位**。
>
> 栈解决程序的运行问题，即程序如何执行，或者说如何处理数据。堆解决的是数据存储的问题，即数据怎么放、放在哪。



### 堆内存

#### 内存划分

对于大多数应用，Java 堆是 Java 虚拟机管理的内存中最大的一块，被所有线程共享。此内存区域的唯一目的就是存放对象实例，几乎所有的对象实例以及数据都在这里分配内存。

为了进行高效的垃圾回收，虚拟机把堆内存**逻辑上**划分成三块区域（分代的唯一理由就是优化 GC 性能）：

- 新生带（年轻代）：新对象和没达到一定年龄的对象都在新生代
- 老年代（养老区）：被长时间使用的对象，老年代的内存空间应该要比年轻代更大
- 元空间（JDK1.8 之前叫永久代）：像一些方法中的操作临时对象等，JDK1.8 之前是占用 JVM 内存，JDK1.8 之后直接使用物理内存



![https://img-blog.csdn.net/20171008111931983](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/a9424eb5f163d76469425325fa102847.png)



Java 虚拟机规范规定，Java 堆可以是处于物理上不连续的内存空间中，只要逻辑上是连续的即可，像磁盘空间一样。实现时，既可以是固定大小，也可以是可扩展的，主流虚拟机都是可扩展的（通过 `-Xmx` 和 `-Xms` 控制），如果堆中没有完成实例分配，并且堆无法再扩展时，就会抛出 `OutOfMemoryError` 异常。



##### 新生代/年轻代 (Young Generation)

年轻代是所有新对象创建的地方。当填充年轻代时，执行垃圾收集。这种垃圾收集称为 **Minor GC**。年轻一代被分为三个部分——伊甸园（**Eden Memory**）和两个幸存区（**Survivor Memory**，被称为from/to或s0/s1），默认比例是`8:1:1`

- 大多数新创建的对象都位于 Eden 内存空间中
- 当 Eden 空间被对象填充时，执行**Minor GC**，并将所有幸存者对象移动到一个幸存者空间中
- Minor GC 检查幸存者对象，并将它们移动到另一个幸存者空间。所以每次，一个幸存者空间总是空的
- 经过多次 GC 循环后存活下来的对象被移动到老年代。通常，这是通过设置年轻一代对象的年龄阈值来实现的，然后他们才有资格提升到老一代



- 新生代 = 1 个 eden 区 + 2 个 Survivor 区

- \-Xmn 年轻代大小（1.4 or lator）

  -XX:NewSize,-XX:MaxNewSize (设置年轻代大小（for 1.3/1.4）) 默认大小为整个堆的
  3/8

- \-XX:NewRatio 年轻代（包括 eden 区 + 2个 Survivor 区）与年老代的比值（去除年老代）

  Xms=Xmx 并且设置 Xmn 的情况下，该参数不需要进行设置

- \-XX:SurvivorRatio

  Eden 区与 Survivor 区的大小比值，设置为 8，则两个 Survivor 区与一个 Eden
  区的比值为2:8，一个 Survivor 区占整个年期待的1/10




##### 老年代(Old Generation)

旧的一代内存包含那些经过许多轮小型 GC 后仍然存活的对象。通常，垃圾收集是在老年代内存满时执行的。老年代垃圾收集称为 主GC（Major GC），通常需要更长的时间。

大对象直接进入老年代（大对象是指需要大量连续内存空间的对象）。这样做的目的是避免在 Eden 区和两个Survivor 区之间发生大量的内存拷贝



-   老年代=整个堆-年轻代大小-持久代大小

-   年轻代中经过垃圾回收没有回收掉的对象被复制到年老代

-   年老代存储对象比年轻代年龄大的多，不乏大对象

-   新建对象也可能直接带入老年代

    大对象，可以通过启动参数-XX:PretenureSizeThreshold = 1024(单位字节，默认0)来代表超过多少时不在新生代分配，直接在老年代分配
    
    大数组对象，切数组中无引用的外部对象
    
- 老年代大小无配置参数



![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/007S8ZIlly1gg06065oa9j31kw0u0q69.jpg)



##### 持久代（JDK1.8之前）

-   持久代=整个堆-年轻代大小-老年代大小

- \-XX:PermSize -XX:MaxPermSize

  设置持久代的大小，一般情况下推荐把-XX:PermSize 和 -XX:MaxPermSize 的值设置为相同的值，因为持久代大小调整会导致堆内存需要出发fgc

- 存放 Class、Method 元信息、其大小与项目的规模、类、方法的数量有关
  
- 持久代的回收方式

  常量、无用的类信息

  对于无用类回收，必须保证以下3点：

  - 类的所有实例都已经被回收

  - 加载 ClassLoader 已经被回收

  - 类对象的 Class 对象没有被引用（即没有通过反射引用该类的地方）



##### 元空间

不管是 JDK8 之前的永久代，还是 JDK8 及以后的元空间，都可以看作是 Java 虚拟机规范中方法区的实现。

虽然 Java 虚拟机规范把方法区描述为堆的一个逻辑部分，但是它却有一个别名叫 Non-Heap（非堆），目的应该是与 Java 堆区分开。



详细内容在方法区中介绍。



#### 设置堆内存大小和 OOM

Java 堆用于存储 Java 对象实例，那么堆的大小在 JVM 启动的时候就确定了，可以通过 `-Xmx` 和 `-Xms` 来设定

- `-Xms` 用来表示堆的起始内存，等价于 `-XX:InitialHeapSize`
- `-Xmx` 用来表示堆的最大内存，等价于 `-XX:MaxHeapSize`

如果堆的内存大小超过 `-Xmx` 设定的最大内存， 就会抛出 `OutOfMemoryError` 异常。



> 通常会将 `-Xmx` 和 `-Xms` 两个参数配置为相同的值，其目的是为了能够在垃圾回收机制清理完堆区后不再需要重新分隔计算堆的大小，从而提高性能。

- 默认情况下，初始堆内存大小为：电脑内存大小/64
- 默认情况下，最大堆内存大小为：电脑内存大小/4



可以通过代码获取设置值，当然也可以模拟 OOM：

```java
public static void main(String[] args) {

  //返回 JVM 堆大小
  long initalMemory = Runtime.getRuntime().totalMemory() / 1024 /1024;
  //返回 JVM 堆的最大内存
  long maxMemory = Runtime.getRuntime().maxMemory() / 1024 /1024;

  System.out.println("-Xms : "+initalMemory + "M");
  System.out.println("-Xmx : "+maxMemory + "M");

  System.out.println("系统内存大小：" + initalMemory * 64 / 1024 + "G");
  System.out.println("系统内存大小：" + maxMemory * 4 / 1024 + "G");
}

```



**查看 JVM 堆内存分配**

1. 在默认不配置 JVM 堆内存大小的情况下，JVM 根据默认值来配置当前内存大小

2. 默认情况下新生代和老年代的比例是 1:2，可以通过 `–XX:NewRatio` 来配置

   - 新生代中的 **Eden**:**From Survivor**:**To Survivor** 的比例是 **8:1:1**，可以通过 `-XX:SurvivorRatio` 来配置

3. 若在 JDK 7 中开启了 `-XX:+UseAdaptiveSizePolicy`，JVM 会动态调整 JVM 堆中各个区域的大小以及进入老年代的年龄

   此时 `–XX:NewRatio` 和 `-XX:SurvivorRatio`  将会失效，而 JDK 8 是默认开启`-XX:+UseAdaptiveSizePolicy`

   在 JDK 8中，**不要随意关闭**`-XX:+UseAdaptiveSizePolicy`，除非对堆内存的划分有明确的规划

每次 GC 后都会重新计算 Eden、From Survivor、To Survivor 的大小

计算依据是**GC过程**中统计的**GC时间**、**吞吐量**、**内存占用量**

```text
java -XX:+PrintFlagsFinal -version | grep HeapSize
    uintx ErgoHeapSizeLimit                         = 0                                   {product}
    uintx HeapSizePerGCThread                       = 87241520                            {product}
    uintx InitialHeapSize                          := 134217728                           {product}
    uintx LargePageHeapSizeThreshold                = 134217728                           {product}
    uintx MaxHeapSize                              := 2147483648                          {product}
java version "1.8.0_211"
Java(TM) SE Runtime Environment (build 1.8.0_211-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.211-b12, mixed mode)


$ jmap -heap 进程号


```



#### 对象在堆中的生命周期

1. 在 JVM 内存模型的堆中，堆被划分为新生代和老年代
   - 新生代又被进一步划分为 **Eden区** 和 **Survivor区**，Survivor 区由 **From Survivor** 和 **To Survivor** 组成
2. 当创建一个对象时，对象会被优先分配到新生代的 Eden 区
   - 此时 JVM 会给对象定义一个**对象年轻计数器**（`-XX:MaxTenuringThreshold`）
3. 当 Eden 空间不足时，JVM 将执行新生代的垃圾回收（Minor GC）
   - JVM 会把存活的对象转移到 Survivor 中，并且对象年龄 +1
   - 对象在 Survivor 中同样也会经历 Minor GC，每经历一次 Minor GC，对象年龄都会+1
4. 如果分配的对象超过了`-XX:PetenureSizeThreshold`，对象会**直接被分配到老年代**



#### 对象的分配过程

为对象分配内存是一件非常严谨和复杂的任务，JVM 的设计者们不仅需要考虑内存如何分配、在哪里分配等问题，并且由于内存分配算法和内存回收算法密切相关，所以还需要考虑 GC 执行完内存回收后是否会在内存空间中产生内存碎片。

1. new 的对象先放在伊甸园区，此区有大小限制
2. 当伊甸园的空间填满时，程序又需要创建对象，JVM 的垃圾回收器将对伊甸园区进行垃圾回收（Minor GC），将伊甸园区中的不再被其他对象所引用的对象进行销毁。再加载新的对象放到伊甸园区
3. 然后将伊甸园中的剩余对象移动到幸存者 0 区
4. 如果再次触发垃圾回收，此时上次幸存下来的放到幸存者 0 区，如果没有回收，就会放到幸存者 1 区
5. 如果再次经历垃圾回收，此时会重新放回幸存者 0 区，接着再去幸存者 1 区
6. 什么时候才会去养老区呢？ 默认是 15 次回收标记
7. 在养老区，相对悠闲。当养老区内存不足时，再次触发 Major GC，进行养老区的内存清理
8. 若养老区执行了 Major GC  之后发现依然无法进行对象的保存，就会产生 OOM 异常



#### GC 垃圾回收简介

**Minor GC、Major GC、Full GC**

JVM 在进行 GC 时，并非每次都对堆内存（新生代、老年代；方法区）区域一起回收的，大部分时候回收的都是指新生代。

针对 HotSpot VM 的实现，它里面的 GC 按照回收区域又分为两大类：部分收集（Partial GC），整堆收集（Full  GC）

- 部分收集：不是完整收集整个 Java 堆的垃圾收集。其中又分为：
  - 新生代收集（Minor GC/Young GC）：只是新生代的垃圾收集
  - 老年代收集（Major GC/Old GC）：只是老年代的垃圾收集
    - 目前，只有 CMS GC 会有单独收集老年代的行为
    - 很多时候 Major GC 会和 Full GC  混合使用，需要具体分辨是老年代回收还是整堆回收
  - 混合收集（Mixed GC）：收集整个新生代以及部分老年代的垃圾收集
    - 目前只有 G1 GC 会有这种行为
- 整堆收集（Full GC）：收集整个 Java 堆和方法区的垃圾



#### TLAB

**什么是 TLAB （Thread Local Allocation Buffer）?**

- 从内存模型而不是垃圾回收的角度，对 Eden 区域继续进行划分，JVM 为每个线程分配了一个私有缓存区域，它包含在 Eden 空间内
- 多线程同时分配内存时，使用 TLAB 可以避免一系列的非线程安全问题，同时还能提升内存分配的吞吐量，因此可以将这种内存分配方式称为**快速分配策略**
- OpenJDK 衍生出来的 JVM 大都提供了 TLAB 设计



**为什么要有 TLAB ?**

- 堆区是线程共享的，任何线程都可以访问到堆区中的共享数据
- 由于对象实例的创建在 JVM 中非常频繁，因此在并发环境下从堆区中划分内存空间是线程不安全的
- 为避免多个线程操作同一地址，需要使用加锁等机制，进而影响分配速度

尽管不是所有的对象实例都能够在 TLAB 中成功分配内存，但 JVM 确实是将 TLAB 作为内存分配的首选。

在程序中，可以通过 `-XX:UseTLAB` 设置是否开启 TLAB 空间。

默认情况下，TLAB 空间的内存非常小，仅占有整个 Eden 空间的 1%，可以通过 `-XX:TLABWasteTargetPercent` 设置 TLAB 空间所占用 Eden 空间的百分比大小。

一旦对象在 TLAB 空间分配内存失败时，JVM 就会尝试着通过使用加锁机制确保数据操作的原子性，从而直接在 Eden 空间中分配内存。



#### 堆是分配对象存储的唯一选择吗

> 随着 JIT 编译期的发展和逃逸分析技术的逐渐成熟，栈上分配、标量替换优化技术将会导致一些微妙的变化，所有的对象都分配到堆上也渐渐变得不那么“绝对”了。  ——《深入理解 Java 虚拟机》



**逃逸分析**

**逃逸分析(Escape Analysis) 是目前 Java 虚拟机中比较前沿的优化技术。这是一种可以有效减少 Java 程序中同步负载和内存堆分配压力的跨函数全局数据流分析算法**。通过逃逸分析，Java Hotspot 编译器能够分析出一个新的对象的引用的使用范围从而决定是否要将这个对象分配到堆上。

逃逸分析的基本行为就是分析对象动态作用域：

- 当一个对象在方法中被定义后，对象只在方法内部使用，则认为没有发生逃逸。
- 当一个对象在方法中被定义后，它被外部方法所引用，则认为发生逃逸。例如作为调用参数传递到其他地方中，称为方法逃逸。

例如：

```java
public static StringBuffer craeteStringBuffer(String s1, String s2) {
   StringBuffer sb = new StringBuffer();
   sb.append(s1);
   sb.append(s2);
   return sb;
}

```



`StringBuffer sb`是一个方法内部变量，上述代码中直接将sb返回，这样这个 StringBuffer 有可能被其他方法所改变，这样它的作用域就不只是在方法内部，虽然它是一个局部变量，称其逃逸到了方法外部。甚至还有可能被外部线程访问到，譬如赋值给类变量或可以在其他线程中访问的实例变量，称为线程逃逸。

上述代码如果想要 `StringBuffer sb`不逃出方法，可以这样写：

```java
public static String createStringBuffer(String s1, String s2) {
   StringBuffer sb = new StringBuffer();
   sb.append(s1);
   sb.append(s2);
   return sb.toString();
}

```

不直接返回 StringBuffer，那么 StringBuffer 将不会逃逸出方法。



**参数设置：**

- 在 JDK 6u23 版本之后，HotSpot 中默认就已经开启了逃逸分析
- 如果使用较早版本，可以通过`-XX"+DoEscapeAnalysis`显式开启

开发中使用局部变量，就不要在方法外定义。

使用逃逸分析，编译器可以对代码做优化：

- **栈上分配**：将堆分配转化为栈分配。如果一个对象在子程序中被分配，要使指向该对象的指针永远不会逃逸，对象可能是栈分配的候选，而不是堆分配
- **同步省略**：如果一个对象被发现只能从一个线程被访问到，那么对于这个对象的操作可以不考虑同步
- **分离对象或标量替换**：有的对象可能不需要作为一个连续的内存结构存在也可以被访问到，那么对象的部分（或全部）可以不存储在内存，而存储在 CPU 寄存器

JIT 编译器在编译期间根据逃逸分析的结果，发现如果一个对象并没有逃逸出方法的话，就可能被优化成栈上分配。分配完成后，继续在调用栈内执行，最后线程结束，栈空间被回收，局部变量对象也被回收。这样就无需进行垃圾回收了。

常见栈上分配的场景：成员变量赋值、方法返回值、实例引用传递



**代码优化之同步省略（消除）**

- 线程同步的代价是相当高的，同步的后果是降低并发性和性能
- 在动态编译同步块的时候，JIT 编译器可以借助逃逸分析来判断同步块所使用的锁对象是否能够被一个线程访问而没有被发布到其他线程。如果没有，那么 JIT 编译器在编译这个同步块的时候就会取消对这个代码的同步。这样就能大大提高并发性和性能。这个取消同步的过程就叫做**同步省略，也叫锁消除**。

```java
public void keep() {
  Object keeper = new Object();
  synchronized(keeper) {
    System.out.println(keeper);
  }
}

```



如上代码，代码中对 keeper 这个对象进行加锁，但是 keeper 对象的生命周期只在 `keep()`方法中，并不会被其他线程所访问到，所以在 JIT编译阶段就会被优化掉。优化成：

```java
public void keep() {
  Object keeper = new Object();
  System.out.println(keeper);
}

```



**代码优化之标量替换**

**标量**（Scalar）是指一个无法再分解成更小的数据的数据。Java 中的原始数据类型就是标量。

相对的，那些的还可以分解的数据叫做**聚合量**（Aggregate），Java 中的对象就是聚合量，因为其还可以分解成其他聚合量和标量。

在 JIT 阶段，通过逃逸分析确定该对象不会被外部访问，并且对象可以被进一步分解时，JVM 不会创建该对象，而会将该对象成员变量分解若干个被这个方法使用的成员变量所代替。这些代替的成员变量在栈帧或寄存器上分配空间。这个过程就是**标量替换**。

通过 `-XX:+EliminateAllocations` 可以开启标量替换，`-XX:+PrintEliminateAllocations` 查看标量替换情况。

```java
public static void main(String[] args) {
   alloc();
}

private static void alloc() {
   Point point = new Point（1,2）;
   System.out.println("point.x="+point.x+"; point.y="+point.y);
}
class Point{
    private int x;
    private int y;
}

```



以上代码中，point 对象并没有逃逸出 `alloc()` 方法，并且 point 对象是可以拆解成标量的。那么，JIT 就不会直接创建 Point 对象，而是直接使用两个标量 int x ，int y 来替代 Point 对象。

```java
private static void alloc() {
   int x = 1;
   int y = 2;
   System.out.println("point.x="+x+"; point.y="+y);
}

```



**代码优化之栈上分配**

通过 JVM 内存分配可以知道 JAVA 中的对象都是在堆上进行分配，当对象没有被引用的时候，需要依靠 GC 进行回收内存，如果对象数量较多的时候，会给 GC 带来较大压力，也间接影响了应用的性能。为了减少临时对象在堆内分配的数量，JVM 通过逃逸分析确定该对象不会被外部访问。那就通过标量替换将该对象分解在栈上分配内存，这样该对象所占用的内存空间就可以随栈帧出栈而销毁，就减轻了垃圾回收的压力。



**总结：**

关于逃逸分析的论文在1999年就已经发表了，但直到JDK 1.6才有实现，而且这项技术到如今也并不是十分成熟的。

**其根本原因就是无法保证逃逸分析的性能消耗一定能高于他的消耗。虽然经过逃逸分析可以做标量替换、栈上分配、和锁消除。但是逃逸分析自身也是需要进行一系列复杂的分析的，这其实也是一个相对耗时的过程。**

一个极端的例子，就是经过逃逸分析之后，发现没有一个对象是不逃逸的。那这个逃逸分析的过程就白白浪费掉了。

虽然这项技术并不十分成熟，但是他也是即时编译器优化技术中一个十分重要的手段。



### 方法区

- 方法区（Method Area）与 Java 堆一样，是所有线程共享的内存区域。
- 虽然 Java 虚拟机规范把方法区描述为堆的一个逻辑部分，但是它却有一个别名叫 Non-Heap（非堆），目的应该是与 Java 堆区分开。
- 运行时常量池（Runtime Constant Pool）是方法区的一部分。Class 文件中除了有类的版本/字段/方法/接口等描述信息外，还有一项信息是常量池（Constant Pool Table），用于存放编译期生成的各种字面量和符号引用，这部分内容将类在加载后进入方法区的运行时常量池中存放。运行期间也可能将新的常量放入池中，这种特性被开发人员利用得比较多的是 `String.intern()`方法。受方法区内存的限制，当常量池无法再申请到内存时会抛出 `OutOfMemoryErro`r 异常。
- 方法区的大小和堆空间一样，可以选择固定大小也可选择可扩展，方法区的大小决定了系统可以放多少个类，如果系统类太多，导致方法区溢出，虚拟机同样会抛出内存溢出错误
- JVM 关闭后方法区即被释放



#### 解惑

你是否也有看不同的参考资料，有的内存结构图有方法区，有的又是永久代，元数据区，一脸懵逼的时候？

- **方法区（method area）是 JVM 规范中定义的一个概念**，用于存储类信息、常量池、静态变量、JIT编译后的代码等数据，并没有规定如何去实现它，不同的厂商有不同的实现。而**永久代（PermGen） 是 Hotspot 虚拟机特有的概念， Java8 的时候又被元空间**取代了，**永久代和元空间都可以理解为方法区的落地实现**。
- 永久代是堆的一部分，和新生代，老年代地址是连续的（受垃圾回收器管理），而元空间存在于本地内存（常说的堆外内存，不受垃圾回收器管理），这样就不受 JVM 限制了，也比较难发生OOM（都会有溢出异常）
- Java7 中通过`-XX:PermSize` 和 `-xx:MaxPermSize` 来设置永久代参数，Java8 之后，随着永久代的取消，这些参数也就随之失效了，改为通过`-XX:MetaspaceSize` 和 `-XX:MaxMetaspaceSize` 用来设置元空间参数
- 存储内容不同，元空间存储类的元信息，静态变量和常量池等并入堆中。相当于永久代的数据被分到了堆和元空间中
- 如果方法区域中的内存不能用于满足分配请求，则 Java 虚拟机抛出 `OutOfMemoryError`
- JVM 规范说方法区在逻辑上是堆的一部分，但目前实际上是与 Java 堆分开的（Non-Heap）



对于方法区，Java8 之后的变化：

- 移除了永久代（PermGen），替换为元空间（Metaspace）；
- 永久代中的 class metadata 转移到了 native memory（本地内存，而不是虚拟机）；
- 永久代中的 interned Strings 和 class static variables 转移到了 Java heap；
- 永久代参数 （PermSize MaxPermSize） -> 元空间参数（MetaspaceSize MaxMetaspaceSize）



#### 设置方法区内存的大小

JDK8 及以后：

- 元数据区大小可以使用参数 `-XX:MetaspaceSize` 和 `-XX:MaxMetaspaceSize` 指定，替代上述原有的两个参数
- 默认值依赖于平台。Windows 下，`-XX:MetaspaceSize` 是 21M，`-XX:MaxMetaspacaSize` 的值是 -1，即没有限制
- 与永久代不同，如果不指定大小，默认情况下，虚拟机会耗尽所有的可用系统内存。如果元数据发生溢出，虚拟机一样会抛出异常 `OutOfMemoryError:Metaspace`
- `-XX:MetaspaceSize` ：设置初始的元空间大小。对于一个 64 位的服务器端 JVM 来说，其默认的 `-XX:MetaspaceSize` 的值为20.75MB，这就是初始的高水位线，一旦触及这个水位线，Full GC 将会被触发并卸载没用的类（即这些类对应的类加载器不再存活），然后这个高水位线将会重置，新的高水位线的值取决于 GC 后释放了多少元空间。如果释放的空间不足，那么在不超过 `MaxMetaspaceSize`时，适当提高该值。如果释放空间过多，则适当降低该值
- 如果初始化的高水位线设置过低，上述高水位线调整情况会发生很多次，通过垃圾回收的日志可观察到 Full GC 多次调用。为了避免频繁 GC，建议将 `-XX:MetaspaceSize` 设置为一个相对较高的值。



#### 方法区内部结构

方法区用于存储已被虚拟机加载的类型信息、常量、静态变量、即时编译器编译后的代码缓存等。



##### 类型信息

对每个加载的类型（类 class、接口 interface、枚举 enum、注解 annotation），JVM 必须在方法区中存储以下类型信息

- 这个类型的完整有效名称（全名=包名.类名）
- 这个类型直接父类的完整有效名（对于 interface或是 java.lang.Object，都没有父类）
- 这个类型的修饰符（public，abstract，final 的某个子集）
- 这个类型直接接口的一个有序列表



##### 域（Field）信息

- JVM 必须在方法区中保存类型的所有域的相关信息以及域的声明顺序
- 域的相关信息包括：域名称、域类型、域修饰符（public、private、protected、static、final、volatile、transient 的某个子集）



##### 方法（Method）信息

JVM 必须保存所有方法的

- 方法名称
- 方法的返回类型
- 方法参数的数量和类型
- 方法的修饰符（public，private，protected，static，final，synchronized，native，abstract 的一个子集）
- 方法的字符码（bytecodes）、操作数栈、局部变量表及大小（abstract 和 native 方法除外）
- 异常表（abstract 和 native 方法除外）
  - 每个异常处理的开始位置、结束位置、代码处理在程序计数器中的偏移地址、被捕获的异常类的常量池索引



**栈、堆、方法区的交互关系**

![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/db050d0052a44605a13043a0bec204f0.png)



#### 运行时常量池

运行时常量池（Runtime Constant Pool）是方法区的一部分，理解运行时常量池的话，先来说说字节码文件（Class 文件）中的常量池（常量池表）



**常量池**

一个有效的字节码文件中除了包含类的版本信息、字段、方法以及接口等描述信息外，还包含一项信息那就是常量池表（Constant Pool Table），包含各种字面量和对类型、域和方法的符号引用。



**为什么需要常量池？**

一个 Java 源文件中的类、接口，编译后产生一个字节码文件。而 Java 中的字节码需要数据支持，通常这种数据会很大以至于不能直接存到字节码里，换另一种方式，可以存到常量池，这个字节码包含了指向常量池的引用。在动态链接的时候用到的就是运行时常量池。

如下，通过 jclasslib 查看一个只有 Main 方法的简单类，字节码中的 #2 指向的就是 Constant Pool

![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/007S8ZIlly1gg9i91ze2gj320i0riahe.jpg)



常量池可以看作是一张表，虚拟机指令根据这张常量表找到要执行的类名、方法名、参数类型、字面量等类型。



**运行时常量池**

- 在加载类和结构到虚拟机后，就会创建对应的运行时常量池
- 常量池表（Constant Pool Table）是 Class 文件的一部分，用于存储编译期生成的各种字面量和符号引用，**这部分内容将在类加载后存放到方法区的运行时常量池中**
- JVM 为每个已加载的类型（类或接口）都维护一个常量池。池中的数据项像数组项一样，是通过索引访问
- 运行时常量池中包含各种不同的常量，包括编译器就已经明确的数值字面量，也包括到运行期解析后才能够获得的方法或字段引用。此时不再是常量池中的符号地址了，这里换为真实地址
  - 运行时常量池，相对于 Class 文件常量池的另一个重要特征是：**动态性**，Java 语言并不要求常量一定只有编译期间才能产生，运行期间也可以将新的常量放入池中，String 类的 `intern()` 方法就是这样的
- 当创建类或接口的运行时常量池时，如果构造运行时常量池所需的内存空间超过了方法区所能提供的最大值，则 JVM 会抛出 OutOfMemoryError 异常。



#### 方法区在 JDK6、7、8中的演进细节

只有 HotSpot 才有永久代的概念

| jdk1.6及之前 | 有永久代，静态变量存放在永久代上                             |
| ------------ | ------------------------------------------------------------ |
| jdk1.7       | 有永久代，但已经逐步“去永久代”，字符串常量池、静态变量移除，保存在堆中 |
| jdk1.8及之后 | 取消永久代，类型信息、字段、方法、常量保存在本地内存的元空间，但字符串**常量池**、**静态变量**仍在堆中 |



**移除永久代原因**

http://openjdk.java.net/jeps/122

![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/007S8ZIlly1gg04ve34c2j30z00u0dp7.jpg)



- 为永久代设置空间大小是很难确定的。

  在某些场景下，如果动态加载类过多，容易产生 Perm 区的 OOM。如果某个实际 Web 工程中，因为功能点比较多，在运行过程中，要不断动态加载很多类，经常出现 OOM。而元空间和永久代最大的区别在于，元空间不在虚拟机中，而是使用本地内存，所以默认情况下，元空间的大小仅受本地内存限制

- 对永久代进行调优较困难



#### 方法区的垃圾回收

方法区的垃圾收集主要回收两部分内容：**常量池中废弃的常量和不再使用的类型**。

**主要是对常量池的回收和对类的卸载。**

先来说说方法区内常量池之中主要存放的两大类常量：字面量和符号引用。字面量比较接近 Java 语言层次的常量概念，如文本字符串、被声明为 final 的常量值等。而符号引用则属于编译原理方面的概念，包括下面三类常量：

- 类和接口的全限定名
- 字段的名称和描述符
- 方法的名称和描述符

HotSpot 虚拟机对常量池的回收策略是很明确的，只要常量池中的常量没有被任何地方引用，就可以被回收



判定一个类型是否属于“不再被使用的类”，需要同时满足三个条件：

- 该类所有的实例都已经被回收，也就是 Java 堆中不存在该类及其任何派生子类的实例
- 加载该类的类加载器已经被回收，这个条件除非是经过精心设计的可替换类加载器的场景，如 OSGi、JSP 的重加载等，否则通常很难达成
- 该类对应的 java.lang.Class 对象没有在任何地方被引用，无法在任何地方通过反射访问该类的方法



Java 虚拟机被允许堆满足上述三个条件的无用类进行回收，这里说的仅仅是“被允许”，而并不是和对象一样，不使用了就必然会回收。是否对类进行回收，HotSpot 虚拟机提供了 `-Xnoclassgc` 参数进行控制，还可以使用 `-verbose:class` 以及 `-XX:+TraceClassLoading` 、`-XX:+TraceClassUnLoading` 查看类加载和卸载信息。



在大量使用反射、动态代理、CGLib 等 ByteCode 框架、动态生成 JSP 以及 OSGi 这类频繁自定义 ClassLoader 的场景都需要虚拟机具备类卸载的功能，以保证永久代不会溢出。





## 六、垃圾收集算法

### 标记阶段

#### 引用计数算法

引用计数存在循环引用问题。

![image-20200712103230349](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/f5fd06e6ebd9c79ef973003a609511a8.png)



#### ★可达性分析算法

![image-20200712104149246](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/553384ce8e64cf5882638e4a371f0863.png)



>  **Which instances are roots?** 
>
>  Jvm  stack, native method stack, runtime constant pool, static references in  method area, Clazz
>
>  虚拟机栈、本地方法栈、运行时常量池、方法区中的静态应用



![image-20210926101048021](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/image-20210926101048021.png)



GC Roots 可以是哪些元素？

除了堆空间外的一些结构，比如：虚拟机栈、本地方法栈、方法区、字符串常量池等地方对堆空间进行引用的，都可以作为GC
Roots进行可达性分析。



1. 虚拟机栈中引用的对象，比如：各个线程被调用的方法中使用到的参数、局部变量等。
2. 本地方法栈内JNI（通常说的本地方法）引用的对象方法区中类静态属性引用的对象，比如：Java类的引用类型静态变量
3. 方法区中常量引用的对象，比如：字符串常量池（StringTable）里的引用
4. 所有被同步锁synchronized持有的对象
5. Java虚拟机内部的引用。
6. 基本数据类型对应的Class对象，一些常驻的异常对象（如：NullPointerException、OutofMemoryError），系统类加载器。
7. 反映java虚拟机内部情况的JMXBean、JVMTI中注册的回调、本地代码缓存等。



小技巧：

由于Root采用栈方式存放变量和指针，所以如果一个指针，它保存了堆内存里面的对象，但是自己又不存放在堆内存里面，那它就是一个Root。



#### 引用类型

无论是通过引用计算算法判断对象的引用数量，还是通过可达性分析算法判断对象是否可达，判定对象是否可被回收都与引用有关。

Java 具有四种强度不同的引用类型。

##### 强引用

被强引用关联的对象不会被回收。

使用 new 一个新对象的方式来创建强引用。

```java
Object obj = new Object();

```



##### 软引用

被软引用关联的对象只有在内存不够的情况下才会被回收。

使用 SoftReference 类来创建软引用。

```java
Object obj = new Object();
SoftReference<Object> sf = new SoftReference<Object>(obj);
obj = null;  // 使对象只被软引用关联

```



##### 弱引用

被弱引用关联的对象一定会被回收，也就是说它只能存活到下一次垃圾回收发生之前。

使用 WeakReference 类来实现弱引用。

```java
Object obj = new Object();
WeakReference<Object> wf = new WeakReference<Object>(obj);
obj = null;

```



##### 虚引用

又称为幽灵引用或者幻影引用。一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用取得一个对象。

为一个对象设置虚引用关联的唯一目的就是能在这个对象被回收时收到一个系统通知。

使用 PhantomReference 来实现虚引用。

```java
Object obj = new Object();
PhantomReference<Object> pf = new PhantomReference<Object>(obj);
obj = null;

```



### 回收阶段

#### 标记-清除算法（Mark-Sweep）

![image](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/a4248c4b-6c1d-4fb8-a557-86da92d3a294.jpg)



将存活的对象进行标记，然后清理掉未被标记的对象。



不足:

- 标记和清除过程效率都不高；
- 会产生大量不连续的内存碎片，导致无法给大对象分配内存。



#### 复制算法（Copying）

![image](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/e6b733ad-606d-4028-b3e8-83c3a73a3797.jpg)



**优点**

1. 没有标记和清除过程，实现简单，运行高效
2. 复制过去以后保证空间的连续性，不会出现“碎片”问题
3. 适合新生代大部分都是“朝生夕灭”对象的场景

------

**缺点**

1. 此算法的缺点也是很明显的，就是需要两倍的内存空间
2. 对于G1这种分拆成为大量region的GC，复制而不是移动，意味着GC需要维护region之间对象引用关系，不管是内存占用或者时间开销也不小



#### 标记-整理（压缩）算法（Mark-Compact）

![image](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/902b83ab-8054-4bd2-898f-9a4a0fe52830.jpg)



让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存。



**优点**

1. 消除了标记-清除算法当中，内存区域分散的缺点，需要给新对象分配内存时，JVM只需要持有一个内存的起始地址即可
2. 消除了复制算法当中，内存减半的高额代价

------

**缺点**

1. 从效率上来说，标记-整理算法要低于复制算法
2. 移动对象的同时，如果对象被其他对象引用，则还需要调整引用的地址
3. 移动过程中，需要全程暂停用户应用程序。即：STW



#### 分代收集

为什么要设计分代？

不同的对象的生命周期是不一样的。因此，不同生命周期的对象可以采取不同的收集方式，以便提高回收效率。



一般将堆分为新生代和老年代。

- 新生代使用: 复制算法
- 老年代使用: 标记 - 清除 或者 标记 - 整理 算法



#### 增量收集算法

如果一次性将所有的垃圾进行处理，需要造成系统长时间的停顿，那么就可以让垃圾收集线程和应用程序线程交替执行。每次，垃圾收集线程只收集一小片区域的内存空间，接着切换到应用程序线程。依次反复，直到垃圾收集完成。

总的来说，增量收集算法的基础仍是传统的标记-清除和复制算法。增量收集算法通过对线程间冲突的妥善处理，允许垃圾收集线程以分阶段的方式完成标记、清理或复制工作。

增量收集算法的缺点：

1.  使用这种方式，由于在垃圾回收过程中，间断性地还执行了应用程序代码，所以能减少系统的停顿时间。

2.  但是，**线程切换和上下文切换也会占用性能**，会使得垃圾回收的总体成本上升，造成系统吞吐量的下降。



#### 分区算法

![image-20200713215133839](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/3c4cc794a8b76e7ddb3a583397e743aa.png)





## 七、垃圾收集机制

### 7种经典的垃圾收集器

串行回收器：Serial、Serial old

并行回收器：ParNew、Parallel Scavenge、Parallel old

并发回收器：CMS、G1

![image-20200713093551365](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/a8c8c24da72cf761385df6d24a28d7f2.png)



#### 7款经典回收器与垃圾分代之间的关系

新生代收集器：Serial、ParNew、Parallel Scavenge；

老年代收集器：Serial old、Parallel old、CMS；

整堆收集器：G1；



#### 垃圾收集器的组合关系

两个收集器间有连线，表明它们可以搭配使用：

- Serial + Serial old

- Serial + CMS

- ParNew + Serial Old

- ParNew + CMS

- Parallel Scavenge + Serial Old

- Parallel Scavenge + Parallel Old

- G1



1.  其中Serial Old作为CMS出现"Concurrent Mode Failure"失败的后备预案。

2.  [红色虚线]由于维护和兼容性测试的成本，在JDK 8时将Serial+CMS、ParNew+Serial Old这两个组合声明为废弃（JEP173），并在JDK9中完全取消了这些组合的支持（JEP214），即：移除。
    
3.  [绿色虚线]JDK14中：弃用Parallel Scavenge和Serial Old GC组合（JEP366）。

4.  [青色虚线]JDK14中：删除CMS垃圾回收器（JEP363）。

![image-20200713094745366](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/0aa6f273f20c8678fe878f567f80bf72.png)



#### 7+1种垃圾回收器的比较

| **GC**                    | **区域**       | **线程**        | **算法**                 | **特点**     | **场景**                                         |
| ------------------------- | -------------- | --------------- | ------------------------ | ------------ | ------------------------------------------------ |
| **Serial**                | 新生代         | 串行            | 复制算法                 | 响应速度优先 | 单CPU环境下的Client模式                          |
| **ParNew**                | 新生代         | 并行            | 复制算法                 | 响应速度优先 | 多CPU环境Server模式下与CMS配合使用               |
| **Parallel** **Scavenge** | 新生代         | 并行            | 复制算法                 | 吞吐量优先   | 后台运算且不需要太多交互的场景                   |
| **Serial Old**            | 老年代         | 串行            | 标记-压缩算法            | 响应速度优先 | 单CPU环境下的Client模式                          |
| **Parallel Old**          | 老年代         | 并行            | 标记-压缩算法            | 吞吐量优先   | 后台运算且不需要太多交互的场景                   |
| **CMS**                   | 老年代         | 串行、并发 并行 | 标记-清除算法            | 响应速度优先 | 互联网 B/S 服务端                                |
| **G1**                    | 新生代、老年代 | 并发、并行      | 复制算法、 标记-压缩算法 | 响应速度优先 | 互联网服务端应用（B/S、App API） 大内存多CPU环境 |
| **ZGC**                   | 新生代、老年代 | 并发、并行      | 复制算法、 标记-压缩算法 | 响应速度优先 | 互联网服务端应用（B/S、App API） 大内存多CPU环境 |

GC发展阶段：Serial =\> Parallel（并行）=\> CMS（并发）=\> G1 =\> ZGC



- Parallel
  - JDK8 默认

- CMS

  - JDK9 被标记为废弃（deprecated）

  - JDK14 被移除

- G1

  - JDK7 正式启用

  - JDK9 默认

  - 官方推荐，目前使用较多



#### 垃圾回收器记忆要点

由来简介	由来

工作原理	原理

优势缺点	优势 缺点

适用场景	场景

主要配置参数	参数

调优实战操作	实战（选择、监控、调优）



### Serial & Serial Old

![image-20200713100703799](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/8a78506bdb4b7fc36e4e71d829cb5028.png)



#### Serial

作用在年轻代，串行、单线程进行垃圾回收。

优点是简单高效，适合单个 CPU 环境，由于没有线程交互的开销，因此拥有最高的单线程收集效率。

Client 模式下的默认新生代收集器，因为在用户的桌面应用场景下，分配给虚拟机管理的内存一般来说不会很大。Serial 收集器收集几十兆甚至一两百兆的新生代停顿时间可以控制在一百多毫秒以内。



#### Serial Old

作用在老年代，也是给 Client 模式下的虚拟机使用。如果用在 Server 模式下，它有两大用途:

- 在 JDK 1.5 以及之前版本(Parallel Old 诞生以前)中与 Parallel Scavenge 收集器搭配使用。
- **作为 CMS 收集器的后备预案**，在并发收集发生 Concurrent Mode Failure 时使用。



### ParNew

![image-20200713102030127](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/4d9ddf727249b5dda46f7a9baf5bdec6.png)



Server 模式下的虚拟机首选新生代收集器，除了性能原因外，主要是因为除了 Serial 收集器，只有它能与 CMS 收集器配合工作。



### ▲Parallel Scavenge & Parallel Old

![image-20200713110359441](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/f9177de86c740ec58e61c4ae287ea9c3.png)



#### Parallel Scavenge

**由来简介**

HotSpot 的年轻代中除了拥有 ParNew 收集器是基于并行回收的以外，Parallel Scavenge 收集器同样也采用了复制算法、并行回收和"Stop the World"机制。

那么 Parallel 收集器的出现是否多此一举？

- 和 ParNew 收集器不同，Parallel Scavenge 收集器的目标则是达到一个**可控制的吞吐量**（Throughput），它也被称为吞吐量优先的垃圾收集器。吞吐量指 CPU 用于运行用户代码的时间占总时间的比值。
- 自适应调节策略也是 Parallel Scavenge 与 ParNew 一个重要区别。

在程序吞吐量优先的应用场景中，Parallel 收集器和 Parallel Old 收集器的组合，在 Server 模式下的内存回收性能很不错。在 Java8 中，默认是此垃圾收集器。



**工作原理**

参照工作流程示意图。



**优势缺点**

优势

吞吐量优先，可控制的吞吐量

缺点

吞吐量和低延迟，顾此失彼



**适用场景**

后台运算而不需要太多交互的项目。比如，例如，定时任务、批量处理、数据统计等计算相关业务。



**主要配置参数**

- `-XX:+UseParallelGC` 手动指定年轻代使用 Parallel 并行收集器执行内存回收任务。

- `-XX:+UseParallelOldGC` 手动指定老年代都是使用并行回收收集器。

  - 分别适用于新生代和老年代。默认 jdk8 是开启的。
  - 上面两个参数，默认开启一个，另一个也会被开启。（互相激活）

- `-XX:ParallelGCThreads` 设置年轻代并行收集器的线程数。一般地，最好与 CPU 数量相等，以避免过多的线程数影响垃圾收集性能。

  ![image-20210926235911474](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/image-20210926235911474.png)

- `-XX:MaxGCPauseMillis` 设置垃圾收集器最大停顿时间（即 STW 的时间）。单位是毫秒。

  - 为了尽可能地把停顿时间控制在 MaxGCPauseMills 以内，收集器在工作时会调整 Java 堆大小或者其他一些参数。
  - 对于用户来讲，停顿时间越短体验越好。但是在服务器端，注重高并发，整体的吞吐量。所以服务器端适合 Parallel，进行控制。
  - ==该参数使用需谨慎==。

- `-XX:GCTimeRatio` 垃圾收集时间占总时间的比例（=1/（N+1））。用于衡量吞吐量的大小。

  - 取值范围（0, 100）。默认值 99，也就是垃圾回收时间不超过 1%。
  - 与前一个`-XX:MaxGCPauseMillis `参数有一定矛盾性。暂停时间越长，Radio 参数就容易超过设定的比例。

- `-XX:+UseAdaptivesizePolicy` 设置 Parallel Scavenge 收集器具有自适应调节策略

  - 在这种模式下，年轻代的大小、Eden 和 Survivor 的比例、晋升老年代的对象年龄等参数会被自动调整，已达到在堆大小、吞吐量和停顿时间之间的平衡点。
  - 在手动调优比较困难的场合，可以直接使用这种自适应的方式，仅指定虚拟机的最大堆、目标的吞吐量（`GCTimeRatio`）和停顿时间（`MaxGCPauseMills`），让虚拟机自己完成调优工作。



**调优实战操作**





#### Parallel Old

**由来简介**

Parallel 收集器在 JDK1.6 时提供了用于执行老年代垃圾收集的 Parallel Old 收集器，用来代替老年代的 Serial Old 收集器。



**工作原理**

参照工作流程示意图。



**优势缺点**



**适用场景**

在注重吞吐量以及 CPU 运算场景，都可以优先考虑 Parallel Scavenge 加 Parallel Old 收集器。



**主要配置参数**



**调优实战操作**





### ★CMS

![image-20200713205154007](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/73daaf167cf944b40515b8ea8837ddbf.png)



**由来简介**

在 JDK1.5 时期，Hotspot 推出了一款在**强交互应用**中几乎可认为有划时代意义的垃圾收集器：CMS（Concurrent-Mark-Sweep）收集器，这款收集器是 HotSpot 虚拟机中第一款真正意义上的并发收集器，它第一次实现了让垃圾收集线程与用户线程同时工作。

CMS 收集器的关注点是尽可能缩短垃圾收集时用户线程的停顿时间。停顿时间越短（低延迟）就越适合与用户交互的程序，良好的响应速度能提升用户体验。

- 目前很大一部分的 Java 应用集中在互联网站或者 B/S 系统的服务端上，这类应用尤其重视服务的响应速度，希望系统停顿时间最短，以给用户带来较好的体验。CMS 收集器就非常符合这类应用的需求。

CMS 的垃圾收集算法采用标记-清除算法，并且也会"Stop-the-World"

不幸的是，CMS 作为老年代的收集器，却无法与 JDK1.4.0 中已经存在的新生代收集器 Parallel Scavenge 配合工作，所以在 JDK1.5 中使用 CMS 来收集老年代的时候，新生代只能选择 ParNew 或者 Serial 收集器中的一个。

在 G1 出现之前，CMS 使用还是非常广泛的。一直到今天，仍然有很多系统使用 CMS GC。



JDK9 新特性：CMS 被标记为 Deprecate 了（JEP291）

- 如果对 JDK9 及以上版本的 HotSpot 虚拟机使用参数`-XX: +UseConcMarkSweepGC`来开启 CMS 收集器的话，用户会收到一个警告信息，提示 CMS 未来将会被废弃。

JDK14 新特性：删除 CMS 垃圾回收器（JEP363）

- 移除了 CMS 垃圾收集器，如果在 JDK14 中使用 `-XX:+UseConcMarkSweepGC`的话，JVM 不会报错，只是给出一个 warning 信息，但是不会 exit。JVM 会自动回退以默认 GC 方式启动 JVM



**工作原理**

CMS 整个过程分为 4 个主要阶段，即初始标记、并发标记、重新标记和并发清除：

- **初始标记**（Initial-Mark）阶段：在这个阶段中，程序中所有的工作线程都将会因为“Stop-the-World”机制而出现短暂的暂停，这个阶段的主要任务**仅仅只是标记出 GC Roots 能直接关联到的对象**。一旦标记完成之后就会恢复之前被暂停的所有应用线程。由于直接关联对象比较小，所以这里的**速度非常快**。
- **并发标记**（Concurrent-Mark）阶段：从 GC Roots 的直接关联对象开始遍历整个对象图的过程，这个过程耗时较长但是不需要停顿用户线程，可以与垃圾收集线程一起并发运行。
- **重新标记**（Remark）阶段：由于在并发标记阶段中，程序的工作线程会和垃圾收集线程同时运行或者交叉运行，因此为了修正并发标记期间，因用户程序继续运作而导致标记产生变动的那一部分对象的标记记录，这个阶段的停顿时间通常会比初始标记阶段稍长一些，但也远比并发标记阶段的时间短。
- **并发清理**（Concurrent-Sweep）阶段：此阶段清理删除掉标记阶段判断的已经死亡的对象，释放内存空间。由于不需要移动存活对象，所以这个阶段也是可以与用户线程同时并发的。

尽管 CMS 收集器采用的是并发回收（非独占式），但是还是会有两次停顿，**初始化标记**和**重新标记**这两个阶段中仍然需要执行“Stop-the-World”机制暂停程序中的工作线程，不过暂停时间并不会太长，因此可以说明目前所有的垃圾收集器都做不到完全不需要“stop-the-World”，只是尽可能地缩短暂停时间。

**由于最耗费时间的并发标记与并发清除阶段都不需要暂停工作，所以整体的回收是低停顿的。**

另外，由于在垃圾收集阶段用户线程没有中断，所以在 CMS 回收过程中，还应该确保应用程序用户线程有足够的内存可用。因此，CMS 收集器不能像其他收集器那样等到老年代几乎完全被填满了再进行收集，而是当堆内存使用率达到某一阈值时，便开始进行回收，以确保应用程序在 CMS 工作过程中依然有足够的空间支持应用程序运行。要是 CMS 运行期间预留的内存无法满足程序需要，就会出现一次“`Concurrent Mode Failure`” 失败，这时虚拟机将启动后备预案：临时启用 Serial Old 收集器来重新进行老年代的垃圾收集，这样停顿时间就很长了。

CMS 收集器的垃圾收集算法采用的是标记清除算法，这意味着每次执行完内存回收后，由于被执行内存回收的无用对象所占用的内存空间极有可能是不连续的一些内存块，不可避免地将会产生一些内存碎片。那么 CMS 在为新对象分配内存空间时，将无法使用指针碰撞（Bump the Pointer）技术，而只能够选择空闲列表（Free List）执行内存分配。



**优势缺点**

优势

- 并发收集
- 低延迟

缺点

- **吞吐量低**：在并发阶段，它虽然不会导致用户停顿，但是会因为占用了一部分线程而导致应用程序变慢，总吞吐量会降低。
- **无法处理浮动垃圾，可能出现 Concurrent Mode Failure。**浮动垃圾是指并发清除阶段由于用户线程继续运行而产生的垃圾，这部分垃圾只能到下一次 GC 时才能进行回收。由于浮动垃圾的存在，因此需要预留出一部分内存，意味着 CMS 收集不能像其它收集器那样等待老年代快满的时候再回收。如果预留的内存不够存放浮动垃圾，就会出现 Concurrent Mode Failure，这时虚拟机将临时启用 Serial Old 来替代 CMS，而串行收集速度相对很慢，导致响应停顿时间过长！
- **标记 - 清除算法导致的空间碎片**，往往出现老年代空间剩余，但无法找到足够大连续空间来分配当前对象，不得不提前触发一次 Full GC。



**适用场景**

追求低延迟，与用户有交互的应用项目。互联网 B/S 业务。



**主要配置参数**

- `-XX:+UseConcMarkSweepGC `手动指定使用 CMS 收集器执行内存回收任务。

  开启该参数后会自动将`-xx:+UseParNewGC`打开。即：ParNew（Young 区用）+CMS（Old 区用）+ Serial Old 的组合。

- `-XX:CMSInitiatingOccupanyFraction` 设置堆内存使用率的阈值，一旦达到该阈值，便开始进行回收。

  - JDK5 及以前版本的默认值为 68，即当老年代的空间使用率达到 68%时，会执行一次 CMS 回收。JDK6 及以上版本默认值为 92%
  - 如果内存增长缓慢，则可以设置一个稍大的值，大的阀值可以有效降低 CMS 的触发频率，减少老年代回收的次数可以较为明显地改善应用程序性能。反之，如果应用程序内存使用率增长很快，则应该降低这个阈值，以避免频繁触发老年代串行收集器。因此通过该选项便可以有效降低 Full GC 的执行次数。

- `-XX:+UseCMSCompactAtFullCollection` 用于指定在执行完 Full GC 后对内存空间进行压缩整理，以此避免内存碎片的产生。不过由于内存压缩整理过程无法并发执行，所带来的问题就是停顿时间变得更长了。

- `-XX:CMSFullGCsBeforeCompaction` 设置在执行多少次 Full GC 后对内存空间进行压缩整理。

- `-XX:ParallelCMSThreads` 设置 CMS 的线程数量。

  - CMS 默认启动的线程数是（ParallelGCThreads+3）/4，ParallelGCThreads 是年轻代并行收集器的线程数。当 CPU 资源比较紧张时，受到 CMS 收集器线程的影响，应用程序的性能在垃圾回收阶段可能会非常糟糕。



**调优实战操作**





### ★G1

![image-20200713225100632](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/013dfa4047fee478e7f01531ca55be3f.png)



#### 由来简介

**既然已经有了前面几个强大的 GC，为什么还要发布 Garbage First（G1）？**

> 业务量大、大内存、多CPU

原因就在于应用程序所应对的**业务越来越庞大、复杂，用户越来越多**，没有 GC 就不能保证应用程序正常进行，而经常造成 STW 的 GC 又跟不上实际的需求，所以才会不断地尝试对 GC 进行优化。G1（Garbage-First）垃圾回收器是在 Java7 update4 之后引入的一个新的垃圾回收器，是当今收集器技术发展的最前沿成果之一。

与此同时，**为了适应现在不断扩大的内存和不断增加的处理器数量**，进一步降低暂停时间（pause time），同时兼顾良好的吞吐量。

官方给 G1 设定的目标是在延迟可控的情况下获得尽可能高的吞吐量，所以才担当起“全功能收集器”的重任与期望。



**为什么名字叫 Garbage First(G1)呢？**

因为 G1 是一个并行回收器，它把堆内存分割为很多不相关的区域（Region）（物理上不连续的）。使用不同的 Region 来表示 Eden、幸存者 0 区，幸存者 1 区，老年代等。

G1 GC 有计划地避免在整个 Java 堆中进行全区域的垃圾收集。G1 跟踪各个 Region 里面的垃圾堆积的价值大小（回收所获得的空间大小以及回收所需时间的经验值），在后台维护一个优先列表，**每次根据允许的收集时间，优先回收价值最大的 Region**。

由于这种方式的侧重点在于回收垃圾最大量的区间（Region），所以给 G1 一个名字：垃圾优先（Garbage First）。

G1（Garbage-First）是一款面向服务端应用的垃圾收集器，主要针对配备多核 CPU 及大容量内存的机器，以极高概率满足 GC 停顿时间的同时，还兼具高吞吐量的性能特征。

在 JDK1.7 版本正式启用，移除了 Experimental 的标识，是JDK9 以后的默认垃圾回收器，取代了 CMS 回收器以及 Parallel+Parallel Old 组合。被 Oracle 官方称为“全功能的垃圾收集器”。



#### 工作原理

- [G1 回收器](https://gitee.com/vectorx/NOTE_JVM/tree/main/JVM%E4%B8%8A%E7%AF%87%EF%BC%9A%E5%86%85%E5%AD%98%E4%B8%8E%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E7%AF%87/13-%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E5%99%A8#137-g1-%E5%9B%9E%E6%94%B6%E5%99%A8%E5%8C%BA%E5%9F%9F%E5%8C%96%E5%88%86%E4%BB%A3%E5%BC%8F)
- [深入分析G1垃圾收集器实现原理](https://juejin.cn/post/7050324680875442183)
- [Java 垃圾回收器G1详解](https://www.pdai.tech/md/java/jvm/java-jvm-gc-g1.html)
- [总结《深入理解JVM》 G1 篇](https://www.cnblogs.com/dengchengchao/p/13255714.html)



##### 分区 Region：化整为零

- 使用G1收集器时，它将整个Java堆划分成约2048个大小相同的独立Region块，每个Region块大小根据堆空间的实际大小而定，整体被控制在1MB到32MB之间，且为2的N次幂，即1MB，2MB，4MB，8MB，16MB，32MB。可以通过-XX:G1HeapRegionsize设定。所有的Region大小相同，且在JVM生命周期内不会被改变。
- 虽然还保留有新生代和老年代的概念，但新生代和老年代不再是物理隔离的了，它们都是一部分Region（不需要连续）的集合。通过Region的动态分配方式实现逻辑上的连续。

- 一个region 有可能属于Eden， Survivor 或者Old/Tenured 内存区域。但是一个region只可能属于一个角色。图中的E表示该region属于Eden内存区域，s表示属于Survivor内存区域，O表示属于Old内存区域。图中空白的表示未使用的内存空间。
- G1垃圾收集器还增加了一种新的内存区域，叫做Humongous内存区域，如图中的H块。主要用于存储大对象，如果超过1. 5个region，就放到H。



![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/20200922184709753.png)



**设置 H 的原因**

对于堆中的对象，默认直接会被分配到老年代，但是如果它是一个短期存在的大对象就会对垃圾收集器造成负面影响。为了解决这个问题，G1划分了一个Humongous区，它用来专门存放大对象。如果一个H区装不下一个大对象，那么G1会寻找连续的H区来存储。为了能找到连续的H区，有时候不得不启动FullGC。G1的大多数行为都把H区作为老年代的一部分来看待。



**Region 空间**

![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/20200922184834632.png)

每个 Region 都是通过指针碰撞来分配空间。



##### Remembered Set（记忆集）

**G1 回收器垃圾回收过程存在的问题**

1. 一个对象被不同区域引用的问题
2. 一个Region不可能是孤立的，一个Region中的对象可能被其他任意Region中对象引用，判断对象存活时，是否需要扫描整个Java堆才能保证准确？
3. 在其他的分代收集器，也存在这样的问题（而G1更突出，因为G1主要针对大堆）
4. 回收新生代也不得不同时扫描老年代？这样的话会降低年轻代GC（Minor GC）的效率



**解决方法：**

1. 无论G1还是其他分代收集器，JVM都是使用Remembered Set来避免全局扫描；
2. 每个Region都有一个对应的Remembered Set；
3. 每次Reference类型数据写操作时，都会产生一个写屏障（Write Barrier）暂时中断操作；
4. 然后检查将要写入的引用指向的对象是否和该Reference类型数据在不同的Region（其他收集器：检查老年代对象是否引用了新生代对象）；
5. 如果不同，通过CardTable把相关引用信息记录到引用指向对象的所在Region对应的Remembered Set中；
6. 当进行垃圾收集时，在GC根节点的枚举范围加入Remembered Set；就可以保证不进行全局扫描，也不会有遗漏。

------

**几句话总结**

1. 在回收 Region 时，为了不进行全堆的扫描，引入了 Remembered Set
2. Remembered Set 记录了当前 Region 中的对象被哪个对象引用了
3. 这样在进行 Region 复制时，就不要扫描整个堆，只需要去 Remembered Set 里面找到引用了当前 Region 的对象
4. Region 复制完毕后，修改 Remembered Set 中对象的引用即可



![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/da2c96802932bc45c83b103d3633a263.png)





##### 三色标记

- [深入分析G1垃圾收集器实现原理](https://juejin.cn/post/7050324680875442183)



白色：未标记或可回收的对象

灰色：GC root 直接或间接关联的对象

黑色：有引用，不可回收的存活对象



**缺陷问题**

**错标**

标记黑色存活的对象，在并发标记过程中，用户线程使用完了，即变成了没有引用可回收对象。

少量错标问题不大，下一轮回收掉即可。但如果内存不够，可能引发 Full GC。



**漏标**

白色可回收的对象，在并发过程中，用户线程又引用了，结果被 GC 回收了，导致用户线程出现未知异常！



##### 增量更新





##### 并发快照 STAB（Snapshot-At-The-Beginning）

> 你知道的越多，会发现你不知道越多！
>
> 暂时没有再深入研究了。大厂肯定还得继续深挖！





##### G1 垃圾回收器回收过程

主要包括如下三个环节：

- 年轻代 GC（Young GC）

- 老年代并发标记过程（Concurrent Marking）

- 混合回收（Mixed GC）

  （如果需要，单线程、独占式、高强度的 Full GC 还是继续存在的。它针对 GC 的评估失败提供了一种失败保护机制，即强力回收。）



![image-20200713224113996](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/e8f79c3cdeb0969981703f7a026cf581.png)



应用程序分配内存，**当年轻代的 Eden 区用尽时开始年轻代回收过程**；G1 的年轻代收集阶段是一个**并行的独占式**收集器。

在年轻代回收期，G1 GC 暂停所有应用程序线程，启动**多线程并行**执行年轻代回收。

年轻代垃圾回收只会回收 Eden 区和 Survivor 区。

然后从年轻代区间移动存活对象到 Survivor 区间或者老年区间。



当堆内存使用达到一定值（默认 45%）时，开始老年代并发标记过程。



标记完成马上开始混合回收过程。对于一个混合回收期，G1 GC 从老年区间移动存活对象到空闲区间，这些空闲区间也就成为了老年代的一部分。和年轻代不同，老年代的 G1 回收器和其他 GC 不同，**G1 的老年代回收器不需要整个老年代被回收，一次只需要扫描/回收一小部分老年代的 Region 就可以了。**同时，这个老年代 Region 是和年轻代一起被回收的。



举个例子：一个 Web 服务器，Java 进程最大堆内存为 4G，每分钟响应 1500 个请求，每 45 秒钟会新分配大约 2G 的内存。G1 会每 45 秒钟进行一次年轻代回收，每 31 个小时整个堆的使用率会达到 45%，会开始老年代并发标记过程，标记完成后开始四到五次的混合回收。



**回收过程一：年轻代 GC**

JVM 启动时，G1 先准备好 Eden 区，程序在运行过程中不断创建对象到 Eden 区，当 Eden 空间耗尽时，G1 会启动一次年轻代垃圾回收过程。

年轻代垃圾回收只会回收 Eden 区和 Survivor 区。



首先 G1 停止应用程序的执行（Stop-The-World），G1 创建回收集（Collection Set），回收集是指需要被回收的内存分段的集合，年轻代回收过程的回收集包含年轻代 Eden 区和 Survivor 区所有的内存分段。

然后开始如下回收过程：

1. 第一阶段，**扫描 GC ROOT 根**。根是指 static 变量指向的对象，正在执行的方法调用链条上的局部变量等。根引用连同 RSet 记录的外部引用作为扫描存活对象的入口。
2. 第二阶段，**更新 RSet**。处理 dirty card queue（见备注）中的 card，更新 RSet。此阶段完成后，RSet 可以准确的反映老年代对所在的内存分段中对象的引用。
3. 第三阶段，**处理 RSet**。识别被老年代对象指向的 Eden 中的对象，这些被指向的 Eden 中的对象被认为是存活的对象。
4. 第四阶段，**复制对象**。此阶段，对象树被遍历，Eden 区内存段中存活的对象会被复制到 Survivor 区中空的内存分段，Survivor 区内存段中存活的对象如果年龄未达阈值，年龄会加 1，达到阀值会被会被复制到 Old 区中空的内存分段。**如果 Survivor 空间不够，Eden 空间的部分数据会直接晋升到老年代空间。**
5. 第五阶段，**处理引用**。处理 Soft，Weak，Phantom，Final，JNI Weak 等引用。最终 Eden 空间的数据为空，GC 停止工作，而目标内存中的对象都是连续存储的，没有碎片，所以复制过程可以达到内存整理的效果，减少碎片。



GC root - 更新 RSet - 处理 RSet - 清理复制



**备注：**

1. 对于应用程序的引用赋值语句 oldObject.field=new Object()，JVM会在之前和之后执行特殊的操作以在dirty card queue中入队一个保存了对象引用信息的card。
2. 在年轻代回收的时候，G1会对Dirty Card Queue中所有的card进行处理，以更新RSet，保证RSet实时准确的反映引用关系。
3. 那为什么不在引用赋值语句处直接更新RSet呢？这是为了性能的需要，RSet的处理需要线程同步，开销会很大，使用队列性能会好很多。



**回收过程二：并发标记过程**

`Mixed GC`分为两个阶段，第一个阶段是并发标记，第二个阶段是筛选回收。

并发标记过程如下：

- **初始标记（initial marking）**
- **并发标记（concurrent marking）**
- **最终标记（final marking,remarking）**
- **清理（cleanup）**



![img](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/f99ee771-c56f-47fb-9148-c0036695b5fe.jpg)



**初始标记（initial marking)**：`STW`(Stop The World)，从标记所有`GC Root`出发可以直接到达的对象。会触发 Yong GC 。这个过程虽然会暂停，但是它是借用的`Yong GC`的暂停阶段，因此没有额外的，单独的暂停阶段。

**并发标记（concurrent marking）** ： 并发阶段。从上一个阶段扫描的对象出发逐个遍历查找，每找到一个对象就将其标记为存活状态。在并发标记阶段，若发现区域对象中的所有对象都是垃圾，那这个区域会被立即回收。同时，并发标记过程中，会计算每个区域的对象活性（区域中存活对象的比例）。注意：此过程还会扫描`SATB`（Snapshot-At-The-Beginning 并发快照）所记录的引用。

> 并发快照：它是一个用来解决并发过程中由于用户修改引用关系而导致对象可能被误标的方案。`CMS`使用的是增量更新，这里`G1`使用的是并发快照，在并发标记开始的时候记录所有引用关系。
>
> **并发快照、增量更新原理，还有待深入研究。**

**最终标记（final marking，remarking）** ： `STW`，虽然前面的并发标记过程中扫描了`SATB`，但是毕竟上一个阶段依然是并发过程，因此需要在并发标记完成后，再次暂停所有用户线程，再次标记`SATB`。同时这个过程也会处理弱引用。

> 这三个阶段都和`CMS`比较类似，`CMS`也是在最终标记阶段处理弱引用。
>
> 不过`CMS`的最终标记阶段需要重新扫描整个`Yong gen`，因此可能`CMS`的`remark`阶段会慢一些。

**清理（clean up）** ：`STW`，暂停阶段。清理和重置标记状态。用来统计每个`region`中的中被标记为存活对象的数量比例，这个阶段如果发现完全没有活对象的region就会将其整体回收到可分配region列表中。

------

标记完成后，便是清理（`Evacuation`），这个阶段是完全暂停的。它负责把一部分`region`里活的对象拷贝到空的`region`里面，然后回收原本的`region`空间，此阶段可以选择任意多个`region`来构成收集集合（`Collection Set`），选定好收集集合之后，便可以将`Collection Set`中的对象并行拷贝到新的`region`中。

------

明白了`G1`整体回收过程，接下来对比`CMS`可以看看`G1`是如何处理并发过程中的一些问题的：

1. 记忆集（Remember Set）: 前面说过，对于跨代引用的问题，`CMS`选择了不维护新生代对老年代记忆集，因为新生代变化太快，维护起来开销比较大，而`G1`的解决方案是，不管`Yong GC`还是`Mixed GC`，都会将`Yong Gen`加入到`Collection Set`中，简单说就是要么是只回收新生代，要么整个新生代和老年代一起回收，这样就避免了新生代对老年代记忆集的维护。

   > 这里只讨论了新生代对老年代的引用的记忆集的维护，老年代对新生代的引用还是会维护一个记忆集的

2. 并发过程中引用变化： 这里在`Remarking`阶段已经说了，`CMS`使用的增量更新的方案，而`G1`则是使用的并发快照（`STAB snapshot-at-the-beginning`）

3. 关于记忆集和并发快照的维护，`G1`也是通过写屏障（`write barrier`）来进行维护。



> **增量更新、并发快照**

CMS 并发标记过程中的





**回收过程三：混合回收**

并发回收，不用`STW`

当越来越多的对象晋升到老年代 old region 时，为了避免堆内存被耗尽，虚拟机会触发一个混合的垃圾收集器，即 Mixed GC，该算法并不是一个 Old GC，除了回收整个 Young Region，还会回收**一部分的 Old Region**，优先回收垃圾占比高的 region。这里需要注意：是一部分老年代，而不是全部老年代。可以选择哪些 Old Region 进行收集，从而可以对垃圾回收的耗时时间进行控制。也要注意的是 Mixed GC 并不是 Full GC。



![image-20200713225810871](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/766b882cba7e709202005a3baeb596d0.png)



并发标记结束以后，老年代中百分百为垃圾的内存分段被回收了，部分为垃圾的内存分段被计算了出来。默认情况下，这些老年代的内存分段会分 8 次（可以通过`-XX:G1MixedGCCountTarget`设置）被回收。

混合回收的回收集（Collection Set）包括八分之一的老年代内存分段，Eden 区内存分段，Survivor 区内存分段。混合回收的算法和年轻代回收的算法完全一样，只是回收集多了老年代的内存分段。具体过程请参考上面的年轻代回收过程。

由于老年代中的内存分段默认分 8 次回收，G1 会优先回收垃圾多的内存分段。**垃圾占内存分段比例越高的，越会被先回收。**并且有一个阈值会决定内存分段是否被回收，`-XX:G1MixedGCLiveThresholdPercent`，默认为 65%，意思是垃圾占内存分段比例要达到 65%才会被回收。如果垃圾占比太低，意味着存活的对象占比高，在复制的时候会花费更多的时间。

混合回收并不一定要进行 8 次。有一个阈值`-XX:G1HeapWastePercent`，默认值为 10%，意思是允许整个堆内存中有 10%的空间被浪费，意味着如果发现可以回收的垃圾占堆内存的比例低于 10%，则不再进行混合回收。因为 GC 会花费很多的时间但是回收到的内存却很少。



**回收可选的过程四：Full GC** 

`STW`、`串行`、`很慢`

`G1 GC` 是使用的 `Serial Old` 的代码（后面被优化为多线程，但是速度相对来说依然比较慢），实际生产项目堆内存通常很大，`Full GC`会暂停很久，因此在生产环境中，一定注意`Full GC`，正常来说几天一次`Full GC`是可以接受的。

G1 的初衷就是要避免 Full GC 的出现。但是如果上述方式不能正常工作，G1 会停止应用程序的执行（Stop-The-World），使用单线程的内存回收算法进行垃圾回收，性能会非常差，应用程序停顿时间会很长。**确定是单线程吗？为什么不使用并行？容易出现并发异常？**

要避免 Full GC 的发生，一旦发生需要进行调整。什么时候会发生 Full GC 呢？比如堆内存太小，当 G1 在复制存活对象的时候没有空的内存分段可用，则会回退到 Full GC，这种情况可以通过增大内存解决。



`G1 Full GC`的原因一般有：

- `Mixed GC`赶不上内存分配的速度，只能通过`Full GC`来释放内存，可能是各年龄代分区空间分配问题，或者是内存泄漏，也可能就是用户量突然增多
- `MetaSpace`不足，对于大量使用反射，动态代理的类，由于动态代理的每个类都会生成一个新的类，同时`class`信息会存放在元空间，因此如果元空间不足，`G1`会靠`Full GC`来扩容元空间，这种情况解决方案就是扩大初始元空间大小
- `Humongous`分配失败，前面说过`G1`分配大对象时，回收是靠`Concurrent Marking`或`Full GC`，因此如果大对象分配失败，则可能会引发`Full GC`



**补充**

从 Oracle 官方透露出来的信息可获知，回收阶段（Evacuation）其实本也有想过设计成与用户程序一起并发执行，但这件事情做起来比较复杂，考虑到 G1 只是回一部分 Region，停顿时间是用户可控制的，所以并不迫切去实现，而选择把这个特性放到了 G1 之后出现的低延迟垃圾收集器（即 ZGC）中。另外，还考虑到 G1 不是仅仅面向低延迟，停顿用户线程能够最大幅度提高垃圾收集效率，为了保证吞吐量所以才选择了完全暂停用户线程的实现方案。



#### 优势缺点

优势（ 大堆性能优势、并发并行低延迟、可预测的停顿时间、避免内存碎片）

并行与并发

- 并行性：G1 在回收期间，可以有多个 GC 线程同时工作，有效利用多核计算能力。此时用户线程 STW。
- 并发性：G1 拥有与应用程序交替执行的能力，部分工作可以和应用程序同时执行，因此，一般来说，不会在整个回收阶段发生完全阻塞应用程序的情况。



分代收集

- 从分代上看，G1 依然属于分代型垃圾回收器，它会区分年轻代和老年代，年轻代依然有 Eden 区和 Survivor 区。但从堆的结构上看，它不要求整个 Eden 区、年轻代或者老年代都是连续的，也不再坚持固定大小和固定数量。
- 将堆空间分为若干个区域（Region），这些区域中包含了逻辑上的年轻代和老年代。
- 和之前的各类回收器不同，它同时兼顾年轻代和老年代。对比其他回收器，或者工作在年轻代，或者工作在老年代。



空间整合

- CMS：“标记-清除”算法、内存碎片、若干次 Gc 后进行一次碎片整理
- G1 将内存划分为一个个的 region。内存的回收是以 region 作为基本单位的。Region 之间是复制算法，但整体上实际可看作是标记-压缩（Mark-Compact）算法，两种算法都可以避免内存碎片。这种特性有利于程序长时间运行，分配大对象时不会因为无法找到连续内存空间而提前触发下一次 GC。尤其是当 Java 堆非常大的时候，G1 的优势更加明显。



可预测的停顿时间模型（即：软实时 soft real-time）

这是 G1 相对于 CMS 的另一大优势，G1 除了追求低停顿外，还能建立可预测的停顿时间模型，能让使用者明确指定在一个长度为 M 毫秒的时间片段内，消耗在垃圾收集上的时间不得超过 N 毫秒。

- 由于分区的原因，G1 可以只选取部分区域进行内存回收，这样缩小了回收的范围，因此对于全局停顿情况的发生也能得到较好的控制。
- G1 跟踪各个 Region 里面的垃圾堆积的价值大小（回收所获得的空间大小以及回收所需时间的经验值），在后台维护一个优先列表，每次根据允许的收集时间，优先回收价值最大的 Region。保证了 G1 收集器在有限的时间内可以获取尽可能高的收集效率。
- 相比于 CMS GC，G1 未必能做到 CMS 在最好情况下的延时停顿，但是最差情况要好很多。



缺点

相较于 CMS，G1 还不具备全方位、压倒性优势。比如在用户程序运行过程中，G1 无论是为了垃圾收集产生的内存占用（Footprint）还是程序运行时的额外执行负载（Overload）都要比 CMS 要高。

从经验上来说，在小内存应用上 CMS 的表现大概率会优于 G1，而 G1 在大内存应用上则发挥其优势。基本上双核4G的服务器起步。



#### 适用场景

面向服务端应用，针对具有大内存、多处理器的机器。（在普通大小的堆里表现并不惊喜）

最主要的应用是需要低 GC 延迟，并具有大堆的应用程序提供解决方案；如：在堆大小约 6GB 或更大时，可预测的暂停时间可以低于 0.5 秒；（G1 通过每次只清理一部分而不是全部的 Region 的增量式清理来保证每次 GC 停顿时间不会过长）。

用来替换掉 JDK1.5 中的 CMS 收集器；在下面的情况时，使用 G1 可能比 CMS 好：

- 超过 50%的 Java 堆被活动数据占用；
- 对象分配频率或年代提升频率变化很大；
- GC 停顿时间过长（长于 0.5 至 1 秒）

HotSpot 垃圾收集器里，除了 G1 以外，其他的垃圾收集器使用内置的 JVM 线程执行 GC 的多线程操作，而 G1 GC 可以采用应用线程承担后台运行的 GC 工作，即当 JVM 的 GC 线程处理速度慢时，系统会调用应用程序线程帮助加速垃圾回收过程。



#### 主要配置参数

- `-XX:+UseG1GC`：手动指定使用 G1 垃圾收集器执行内存回收任务
- `-XX:G1HeapRegionSize` 设置每个 Region 的大小。值是 2 的幂，范围是 1MB 到 32MB 之间，目标是根据最小的 Java 堆大小划分出约 2048 个区域。默认是堆内存的 1/2000。
- `-XX:MaxGCPauseMillis` 设置期望达到的最大 GC 停顿时间指标（JVM 会尽力实现，但不保证达到）。默认值是 200ms（人的平均反应速度）
- `-XX:+ParallelGCThread` 设置 STW 工作线程数的值。最多设置为 8（上面说过 Parallel 回收器的线程计算公式，当 CPU_Count > 8 时，ParallelGCThreads 也会大于 8）
- `-XX:ConcGCThreads` 设置并发标记的线程数。将 n 设置为并行垃圾回收线程数（ParallelGCThreads）的 1/4 左右。
- `-XX:InitiatingHeapOccupancyPercent` 设置触发**并发 GC** 周期的 Java 堆占用率阈值。超过此值，就触发 GC。默认值是 45。



#### 调优实战操作

G1 收集器的常见操作步骤

G1 的设计原则就是简化 JVM 性能调优，开发人员只需要简单的三步即可完成调优：

- 第一步：开启 G1 垃圾收集器
- 第二步：设置堆的最大内存
- 第三步：设置最大的停顿时间

G1 中提供了三种垃圾回收模式：Young GC、Mixed GC 和 Full GC，在不同的条件下被触发。



年轻代大小

- 避免使用`-Xmn`或`-XX:NewRatio`等相关选项显式设置年轻代大小
- 固定年轻代的大小会覆盖暂停时间目标

暂停时间目标不要太过严苛

- G1 GC 的吞吐量目标是 90% 的应用程序时间和 10% 的垃圾回收时间
- 评估 G1 GC 的吞吐量时，暂停时间目标不要太严苛。目标太过严苛表示你愿意承受更多的垃圾回收开销，而这些会直接影响到吞吐量。





### ★ZGC



**由来简介**



**工作原理**



**优势缺点**



**适用场景**



**主要配置参数**



**调优实战操作**





## 八、内存分配与回收策略

### GC 类型

#### Minor GC

发生在新生代上，因为新生代对象存活时间很短，因此 Minor GC 会频繁执行，执行的速度一般也会比较快。

#### Major GC

发生在老年代上，老年代对象其存活时间长，执行次数相对 Minor GC 少，执行速度会比 Minor GC 慢很多。

#### Full GC

发生在整个堆空间，年轻代、老年代都会进行一次垃圾回收，速度最慢。通常应该尽量优化以减少 Full GC 发生的次数，并缩短每次执行的时间。



### 内存分配策略

对象分配与晋升时何时会触发GC的详细流程图可以参考下图（参考了《码出高效：Java开发手册》第四章走进JVM中的图）：

![image-20220309140055547](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/image-20220309140055547.png)



1. **对象优先在 Eden 分配**

大多数情况下，对象在新生代 Eden 区分配，当 Eden 区空间不够时，发起 Minor GC。



2. **大对象直接进入老年代**

大对象是指需要连续内存空间的对象，最典型的大对象是那种很长的字符串以及数组。

经常出现大对象会提前触发垃圾收集以获取足够的连续空间分配给大对象。

-XX:PretenureSizeThreshold，大于此值的对象直接在老年代分配，避免在 Eden 区和 Survivor 区之间的大量内存复制。



3.**长期存活的对象进入老年代**

为对象定义年龄计数器，对象在 Eden 出生并经过 Minor GC 依然存活，将移动到 Survivor 中，年龄就增加 1 岁，增加到一定年龄则移动到老年代中。

-XX:MaxTenuringThreshold 用来定义年龄的阈值。



4.**动态对象年龄判定**

虚拟机并不是永远地要求对象的年龄必须达到 MaxTenuringThreshold 才能晋升老年代，如果在 Survivor 中相同年龄所有对象大小的总和大于 Survivor 空间的一半，则年龄大于或等于该年龄的对象可以直接进入老年代，无需等到 MaxTenuringThreshold 中要求的年龄。



5.**空间分配担保**

在发生 Minor GC 之前，虚拟机先检查老年代最大可用的连续空间是否大于新生代所有对象总空间，如果条件成立的话，那么 Minor GC 可以确认是安全的。

如果不成立的话虚拟机会查看 HandlePromotionFailure 设置值是否允许担保失败，如果允许那么就会继续检查老年代最大可用的连续空间是否大于历次晋升到老年代对象的平均大小，如果大于，将尝试着进行一次 Minor GC；如果小于，或者 HandlePromotionFailure 设置不允许冒险，那么就要进行一次 Full GC。



### Full GC 的触发条件

对于 Minor GC，其触发条件非常简单，当 Eden 空间满时，就将触发一次 Minor GC。而 Full GC 则相对复杂，有以下条件：

1. **调用 System.gc()**

只是建议虚拟机执行 Full GC，但是虚拟机不一定真正去执行。不建议使用这种方式，而是让虚拟机管理内存。



2. **老年代空间不足**

老年代空间不足的常见场景为前文所讲的大对象直接进入老年代、长期存活的对象进入老年代等。

为了避免以上原因引起的 Full GC，应当尽量不要创建过大的对象以及数组。除此之外，可以通过 -Xmn 虚拟机参数调大新生代的大小，让对象尽量在新生代被回收掉，不进入老年代。还可以通过 -XX:MaxTenuringThreshold 调大对象进入老年代的年龄，让对象在新生代多存活一段时间。



3. **空间分配担保失败**

使用复制算法的 Minor GC 需要老年代的内存空间作担保，如果担保失败会执行一次 Full GC。具体内容请参考上面的第五小节。



4. **JDK 1.7 及以前的永久代空间不足**

在 JDK 1.7 及以前，HotSpot 虚拟机中的方法区是用永久代实现的，永久代中存放的为一些 Class 的信息、常量、静态变量等数据。

当系统中要加载的类、反射的类和调用的方法较多时，永久代可能会被占满，在未配置为采用 CMS GC 的情况下也会执行 Full GC。如果经过 Full GC 仍然回收不了，那么虚拟机会抛出 java.lang.OutOfMemoryError。

为避免以上原因引起的 Full GC，可采用的方法为增大永久代空间或转为使用 CMS GC。



5. **Concurrent Mode Failure**

执行 CMS GC 的过程中同时有对象要放入老年代，而此时老年代空间不足(可能是 GC 过程中浮动垃圾过多导致暂时性的空间不足)，便会报 Concurrent Mode Failure 错误，并触发 Full GC。



## 九、JVM 调优工具

- [JVM监控及诊断工具-命令行篇](https://gitee.com/vectorx/NOTE_JVM/tree/main/JVM%E4%B8%8B%E7%AF%87%EF%BC%9A%E6%80%A7%E8%83%BD%E7%9B%91%E6%8E%A7%E4%B8%8E%E8%B0%83%E4%BC%98%E7%AF%87/02-JVM%E7%9B%91%E6%8E%A7%E5%8F%8A%E8%AF%8A%E6%96%AD%E5%B7%A5%E5%85%B7-%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%AF%87)

- [宋红康详解java虚拟机](https://www.bilibili.com/video/BV1PJ411n7xZ)



### ★JDK 命令行

JDK自带Jstat、Jinfo、Jmap、Jhat及Jstack调优命令。



#### jps：查看正在运行的Java进程

```
jps ## 显示进程的ID 和 类的名称
jps –l ## 输出输出完全的包名，应用主类名，jar的完全路径名 
jps –v ## 输出jvm参数
jps –q ## 显示java进程号
jps -m ## main 方法
jps -l xxx.xxx.xx.xx ## 远程查看
-Joption：传递参数到vm,例如:-J-Xms512m

jps
4528 Jps
12916

```



jps 原理

> java程序在启动以后，会在java.io.tmpdir指定的目录下，就是临时文件夹里，生成一个类似于hsperfdata_User的文件夹，这个文件夹里（在Linux中为/tmp/hsperfdata_{userName}/），有几个文件，名字就是java进程的pid，因此列出当前运行的java进程，只是把这个目录里的文件名列一下而已。 至于系统的参数什么，就可以解析这几个文件获得。



#### jinfo：实时查看和修改JVM配置参数

- [JDK 8 参数选项](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html)
- [JDK 17 参数选项](https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html)



jinfo 是 JDK 自带的命令，可以用来查看正在运行的 java 应用程序的扩展参数，包括 Java System 属性和 JVM 命令行参数；也可以动态的修改正在运行的 JVM 一些参数。当系统崩溃时，jinfo 可以从 core 文件里面知道崩溃的 Java 应用程序的配置信息。



```bash
no option 输出全部的参数和系统属性
-flag name 输出对应名称的参数
-flag [+|-]name 开启或者关闭对应名称的参数
-flag name=value 设定对应名称的参数
-flags 输出全部的参数
-sysprops 输出系统属性

## 输出当前 jvm 进程的全部参数和系统属性
jinfo 2815

## 输出所有的参数
jinfo -flags 2815

## 查看指定的 jvm 参数的值
jinfo -flag PrintGC 2815

## 开启/关闭指定的JVM参数
jinfo -flag +PrintGC 2815

## 设置flag的参数
jinfo -flag name=value 2815

## 输出当前 jvm 进行的全部的系统属性
jinfo -sysprops 2815

## 查看survivor利用率设置，minor GC后存活的对象超过这个比例，会被直接移动到老年代，这时候对象年龄限制不生效
jinfo -flag TargetSurvivorRatio 2622
\-XX:TargetSurvivorRatio=50

#查看新生代与老年代堆大小比例
jinfo -flag NewRatio 2622
\-XX:NewRatio=2

#查看新生代中eden和S0/S1空间的比例
jinfo -flag SurvivorRatio 2622
\-XX:SurvivorRatio=8

# idea64 Open JDK 17
jinfo -flags 12916
VM Flags:
-XX:CICompilerCount=2 -XX:CompileCommand=exclude,com/intellij/openapi/vfs/impl/FilePartNodeRoot,trieDescend -XX:ConcGCThreads=2 -XX:ErrorFile=C:\Users\fanmi\\java_error_in_idea64_%p.log -XX:+FlightRecorder -XX:G1ConcRefinementThreads=8 -XX:G1EagerReclaimRemSetThreshold=8 -XX:G1HeapRegionSize=1048576 -XX:GCDrainStackTargetSize=64 -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=C:\Users\fanmi\\java_error_in_idea64.hprof -XX:+IgnoreUnrecognizedVMOptions -XX:InitialHeapSize=134217728 -XX:MarkStackSize=4194304 -XX:MaxHeapSize=1073741824 -XX:MaxNewSize=643825664 -XX:MinHeapDeltaBytes=1048576 -XX:MinHeapSize=134217728 -XX:NonNMethodCodeHeapSize=5826188 -XX:NonProfiledCodeHeapSize=265522362 -XX:-OmitStackTraceInFastThrow -XX:ProfiledCodeHeapSize=265522362 -XX:ReservedCodeCacheSize=536870912 -XX:+SegmentedCodeCache -XX:SoftMaxHeapSize=1073741824 -XX:SoftRefLRUPolicyMSPerMB=50 -XX:SweeperThreshold=0.234375 -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseFastUnorderedTimeStamps -XX:+UseG1GC -XX:-UseLargePagesIndividualAllocation


jinfo -flags 13336
VM Flags:
-XX:CICompilerCount=2 -XX:CompileCommand=exclude,com/intellij/openapi/vfs/impl/FilePartNodeRoot,trieDescend -XX:CompressedClassSpaceSize=436207616 -XX:ConcGCThreads=2 -XX:ErrorFile=C:\Users\fanmi\\java_error_in_idea64_%p.log -XX:G1ConcRefinementThreads=8 -XX:G1EagerReclaimRemSetThreshold=8 -XX:G1HeapRegionSize=1048576 -XX:GCDrainStackTargetSize=64 -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=C:\Users\fanmi\\java_error_in_idea64.hprof -XX:+IgnoreUnrecognizedVMOptions -XX:InitialHeapSize=134217728 -XX:MarkStackSize=4194304 -XX:MaxHeapSize=838860800 -XX:MaxMetaspaceSize=536870912 -XX:MaxNewSize=503316480 -XX:MetaspaceSize=314572800 -XX:MinHeapDeltaBytes=1048576 -XX:MinHeapSize=134217728 -XX:NonNMethodCodeHeapSize=5826188 -XX:NonProfiledCodeHeapSize=154373306 -XX:-OmitStackTraceInFastThrow -XX:ProfiledCodeHeapSize=154373306 -XX:ReservedCodeCacheSize=314572800 -XX:+SegmentedCodeCache -XX:SoftMaxHeapSize=838860800 -XX:SoftRefLRUPolicyMSPerMB=50 -XX:SweeperThreshold=0.400000 -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseFastUnorderedTimeStamps -XX:+UseG1GC -XX:-UseLargePagesIndividualAllocation


-XX:CICompilerCount
并发编译线程数量，根据CPU数量和可用内存自动设置，可设置 1/4 * CPUs
-XX:CompileCommand
额外编译配置，具体配置参数参考官方文档

-XX:ConcGCThreads
GC 线程数量，默认根据 CPUs 自动设置，官方建议 1/4 of the number of parallel garbage collection threads

-XX:ErrorFile
irrecoverable error 严重错误记录文件，相当于报错运行不了，或者闪退日志
the current working directory and named hs_err_pidpid.log 默认生成位置

-XX:+FlightRecorder
开启飞行记录，用来记录和分析应用的运行情况，收集详细的性能数据和诊断信息。
-XX:StartFlightRecording
飞行记录具体配置

-XX:G1ConcRefinementThread




```





#### jstat：查看JVM统计信息

- [jstat查看gc状态](https://www.cnblogs.com/architectforest/p/16029171.html)
- [jstat查看类或编译器信息](https://www.cnblogs.com/architectforest/p/16029062.html)
- [Jstat - Monitoring your JVMs Statistics](https://dev.java/learn/jvm/tools/monitoring/jstat/)



```shell
#jps查看Java进程，需要安装Java
jps -v




```





#### jmap：导出内存映像文件&内存使用情况

命令jmap是一个多功能的命令。它可以生成 java 程序的 dump 文件， 也可以查看堆内对象示例的统计信息、查看 ClassLoader 的信息以及 finalizer 队列。



用途

```bash
## 查看堆的情况
jmap -heap 2815

## dump
jmap -dump:live,format=b,file=/tmp/heap2.bin 2815
jmap -dump:format=b,file=/tmp/heap3.bin 2815

## 查看堆的占用
jmap -histo 2815 | head -10

```



jmap参数

```bash
no option： 查看进程的内存映像信息,类似 Solaris pmap 命令。
heap： 显示Java堆详细信息
histo[:live]： 显示堆中对象的统计信息
clstats：打印类加载器信息
finalizerinfo： 显示在F-Queue队列等待Finalizer线程执行finalizer方法的对象
dump:<dump-options>：生成堆转储快照
F： 当-dump没有响应时，使用-dump或者-histo参数. 在这个模式下,live子参数无效.
help：打印帮助信息
J<flag>：指定传递给运行jmap的JVM的参数

```



更多请参考：[jvm 性能调优工具之 jmap  (opens new window)](https://www.jianshu.com/p/a4ad53179df3) 和 [jmap - Memory Map](https://docs.oracle.com/javase/1.5.0/docs/tooldocs/share/jmap.html)



#### jhat：JDK自带堆分析工具



#### jstack：打印JVM中线程快照

jstack是jdk自带的线程堆栈分析工具，使用该命令可以查看或导出 Java 应用程序中线程堆栈信息。



jstack常用命令:

```bash
## 基本
jstack 2815

## java和native c/c++框架的所有栈信息
jstack -m 2815

## 额外的锁信息列表，查看是否死锁
jstack -l 2815

```



jstack参数：

```bash
-l 长列表. 打印关于锁的附加信息,例如属于java.util.concurrent 的 ownable synchronizers列表.
-F 当’jstack [-l] pid’没有相应的时候强制打印栈信息
-m 打印java和native c/c++框架的所有栈信息.
-h | -help 打印帮助信息

```



更多请参考: [jvm 性能调优工具之 jstack](https://www.jianshu.com/p/025cb069cb69)



#### jcmd：多功能命令行



#### jstatd：远程主机信息收集





### Jconsole（视图监控）



### Jvisualvm（视图监控）



### Arthas（阿里）



### Jprofiler（收费）



### Eclipse：Memory Analyzer Tool



### Java Flight Recorder（实时监控）



### GCEasy



### GCViewer





## 十、GC 日志分析

- [分析GC日志](https://gitee.com/vectorx/NOTE_JVM/tree/main/JVM%E4%B8%8B%E7%AF%87%EF%BC%9A%E6%80%A7%E8%83%BD%E7%9B%91%E6%8E%A7%E4%B8%8E%E8%B0%83%E4%BC%98%E7%AF%87/05-%E5%88%86%E6%9E%90GC%E6%97%A5%E5%BF%97)


MinorGC（或 young GC 或 YGC）日志：
[GC (Allocation Failure) ---- GC 原因
[PSYoungGen: 31744K->2192K (36864K) ] ---- 年轻代总大小
31744K->2200K (121856K), ---- 年轻代和老年代总大小
0.0139308 secs] ---- YGC 耗时
[Times: user=0.05 ---- YGC 用户耗时
sys=0.01, ---- YGC 系统耗时
real=0.01 secs] ---- YGC 实际耗时



FullGC 日志：
[Full GC (Metadata GC Threshold)  ---- GC 原因
[PSYoungGen: 5104K->0K (132096K) ] ---- 年轻代总大小
[Par01dGen: 416K->5453K (50176K) ] ---- 老年代总大小
5520K->5453K (182272K), ---- 年轻代和老年代总大小
[Metaspace: 20637K->20637K (1067008K) ], ---- 方法区总大小
0.0245883 secs] ---- FGC 耗时
[Times: user=0.06 ---- FGC 用户耗时
sys=0.00, ---- FGC 系统耗时
real=0.02 secs] ---- FGC 实际耗时



规律：
[名称: GC前内存占用->GC后内存占用 (该区内存总大小) ]



三个时间：user，sys 和 real
user：进程执行用户态代码（核心之外）所使用的时间。这是执行此进程所使用的实际 CPU 时间，其他进程和此进程阻塞的时间并不包括在内。在垃圾收集的情况下，表示 GC 线程执行所使用的 CPU 总时间。
sys：进程在内核态消耗的 CPU 时间，即在内核执行系统调用或等待系统事件所使用的 CPU 时间
real：程序从开始到结束所用的时钟时间。这个时间包括其他进程使用的时间片和进程阻塞的时间（比如等待 I/O 完成）。对于并行 gc，这个数字应该接近（用户时间＋系统时间）除以垃圾收集器使用的线程数。

由于多核的原因，一般的 GC 事件中，real time 是小于 sys time ＋ user time 的，因为一般是多个线程并发的去做 GC，所以 real time 是要小于 sys ＋ user time 的。如果 real ＞ sys ＋ user 的话，则你的应用可能存在下列问题：IO 负载非常重或 CPU 不够用。



注意：Minor GC 堆内存总容量 = 9/10 年轻代 + 老年代。原因是 Survivor 区只计算 from 部分，而 JVM 默认年轻代中 Eden 区和 Survivor 区的比例关系，Eden:S0:S1=8:1:1。



### GCEasy



### GCViewer





## 十一、JVM 调优实战

### JVM 调优目的

- 减少GC（Minor[ˈmaɪnə(r)] GC、Major[ˈmeɪdʒə(r)] GC、Full GC） STW（Stop The World）的**发生次数和延迟时间**。Major GC 和 Full GC 出现 STW 的时间要长很多，可能达到 Minor GC 的10倍以上。
  
- 避免OOM（OutOfMemory），发现并解决**内存溢出**和**内存泄漏**问题。



### JVM 调优参数

- [【JVM】监控调优（一）：JVM常用参数](https://blog.csdn.net/weixin_43935927/article/details/109233111)



配置实例

```
## 主要业务模块 mypages-admin
JAVA_OPTS="-server -Xms800m -Xmx800m -Xmn480m -XX:MetaspaceSize=300m -XX:MaxMetaspaceSize=300m -XX:CompressedClassSpaceSize=300m -XX:PermSize=300m -XX:MaxPermSize=300m -XX:MaxDirectMemorySize=300m -XX:-UseAdaptiveSizePolicy -XX:SurvivorRatio=4 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=80 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=logs/gc/mypages -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintTenuringDistribution -Xloggc:logs/gc/mypages/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=10M"

# 减少内存 JDK1.8 CMS
JAVA_OPTS="-server -Xms512m -Xmx512m -Xmn400m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -XX:CompressedClassSpaceSize=64m -XX:-UseAdaptiveSizePolicy -XX:SurvivorRatio=4 -XX:TargetSurvivorRatio=90 -XX:+UseParNewGC -XX:+UseConcMarkSweepGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=80 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=logs/gc/mypages -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintTenuringDistribution -Xloggc:logs/gc/mypages/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=10M"

 S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT   
68224.0 68224.0 55592.7  0.0   273152.0 69513.9   114688.0     0.0     90112.0 85311.5 11520.0 10658.2     10    0.266   0      0.000    0.266

 S0C    S1C    S0U    S1U      EC       EU        OC         OU       MC     MU    CCSC   CCSU   YGC     YGCT    FGC    FGCT     GCT   
68224.0 68224.0 55592.7  0.0   273152.0 108841.5  114688.0     0.0     90112.0 85311.5 11520.0 10658.2     10    0.266   0      0.000    0.266


# JDK1.8 G1 在默认配置的基础上，逐步加入需要的配置。新手小白几乎干不过默认配置，瞎改动配置反而导致负作用
JAVA_OPTS="-server -Xms512m -Xmx512m -Xmn400m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -XX:CompressedClassSpaceSize=64m -XX:-UseAdaptiveSizePolicy -XX:SurvivorRatio=4 -XX:TargetSurvivorRatio=90 -XX:+UseParNewGC -XX:+UseConcMarkSweepGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=80 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=logs/gc/mypages -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintTenuringDistribution -Xloggc:logs/gc/mypages/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=10M"


jinfo -flags pid

Non-default VM flags: -XX:CICompilerCount=2 -XX:CMSFullGCsBeforeCompaction=5 -XX:CMSInitiatingOccupancyFraction=70 -XX:CompressedClassSpaceSize=134217728 -XX:+ExplicitGCInvokesConcurrent -XX:GCLogFileSize=10485760 -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=null -XX:InitialHeapSize=536870912 -XX:MaxDirectMemorySize=268435456 -XX:MaxHeapSize=536870912 -XX:MaxMetaspaceSize=268435456 -XX:MaxNewSize=314572800 -XX:MetaspaceSize=134217728 -XX:MinHeapDeltaBytes=196608 -XX:NewSize=314572800 -XX:NumberOfGCLogFiles=5 -XX:OldPLABSize=16 -XX:OldSize=222298112 -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+PrintGC -XX:+PrintGCDateStamps -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+PrintTenuringDistribution -XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90 -XX:-UseAdaptiveSizePolicy -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:+UseCompressedClassPointers -XX:+UseCompressedOops -XX:+UseConcMarkSweepGC -XX:+UseFastUnorderedTimeStamps -XX:+UseGCLogFileRotation -XX:+UseParNewGC

Command line: -Xms512m -Xmx512m -Xmn300m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -XX:CompressedClassSpaceSize=128m -XX:MaxDirectMemorySize=256m -XX:-UseAdaptiveSizePolicy -XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=logs/gc/mypages -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintTenuringDistribution -Xloggc:logs/gc/mypages/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=10M -Dspring.profiles.active=prod


```



尽可能让项目启动时，不发生 full gc，调整年轻代及survivor的比例。

另外，注意大对象达到survivor内存的一半，会直接进老年代，影响很大。



- JAVA_OPTS

Tomcat Catalina.sh 中配置 JVM 参数字段。



**查看 JVM 参数**

```cmd
java -XX:+PrintFlagsFinal -version > ﬂags.txt ## 将参数打印到 flag.txt 文件

```

![在这里插入图片描述](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/20201023161557848.png)



后面还有很多参数，这里就不一一列出来了。值得注意的是"=“表示默认值，”:="表示被用户或JVM修改后的值要想查看某个进程具体参数的值，可以使用jinfo，这块后面聊。一般要设置参数，可以先查看一下当前参数是什么，然后进行修改



#### 标准参数

```
-version
-help
-server
-cp
12341234
```

![在这里插入图片描述](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/20201023161523786.png)



#### -X参数

> 非标准参数，也就是在JDK各个版本中可能会变动

```
-Xint 		解释执行
-Xcomp		第一次使用就编译成本地代码
-Xmixed		混合模式，JVM自己来决定
123123
```

![在这里插入图片描述](https://www.m1yellow.cn/doc-img/JVM%E6%80%A7%E8%83%BD%E8%B0%83%E4%BC%98.assets/20201023161535645.png)



#### -XX参数（最常使用）

> 使用的最多的参数。非标准化参数，相对不稳定，主要用于JVM调优和Debug

```
a.Boolean类型 
格式：-XX:[+-]<name>            +或-表示启用或者禁用name属性
比如：-XX:+UseConcMarkSweepGC   表示启用CMS类型的垃圾回收器   
	 -XX:+UseG1GC              表示启用G1类型的垃圾回收器  
     
b.非Boolean类型 
格式：-XX:<name>=<value>		   表示name属性的值是value 
比如：-XX:MaxGCPauseMillis=500
1234567812345678
```



**JVM 内存相关参数**

| 参数                        | 含义                       | 说明                                                         |
| :-------------------------- | :------------------------- | :----------------------------------------------------------- |
| -Xms                        | 初始堆大小                 | 物理内存的1/64，默认(MinHeapFreeRatio参数可以调整)空余堆内存小于40%时，JVM就会增大堆直到-Xmx的最大限制 |
| -Xmx                        | 最大堆大小                 | 物理内存的1/4，默认(MaxHeapFreeRatio参数可以调整)空余堆内存大于70%时，JVM会减少堆直到 -Xms的最小限制 |
| -Xmn                        | 年轻代大小(1.4 or lator)   |                                                              |
| -Xss                        | 设置每个线程的堆栈大小     | 每个线程池的堆栈大小。在jdk5以上的版本，每个线程堆栈大小为1m，jdk5以前的版本是每个线程池大小为256k。一般在相同物理内存下，如果减少－xss值会产生更大的线程数，但不同的操作系统对进程内线程数是有限制的，是不能无限生成。经验值是3000-5000最佳 |
| -XX:ThreadStackSize         | Thread Stack Size          |                                                              |
| -XX:InitialHeapSize=100M    | 初始化堆大小               | 简写-Xms100M，默认物理内存的1/64                             |
| -XX:MaxHeapSize=100M        | 最大堆大小                 | 简写-Xmx100M ，默认物理内存的1/4                             |
| -XX:NewSize=20M             | 设置年轻代的大小           |                                                              |
| -XX:MaxNewSize=50M          | 年轻代最大大小             |                                                              |
| -XX:OldSize=50M             | 设置老年代大小             |                                                              |
| -XX:NewRatio                | 新老生代的比值比           | 默认-XX:Ratio=2，表示新生代占年老代的1/2，占整个堆内存的1/3  |
| -XX:SurvivorRatio           | 两个S区和Eden区比值        | 默认-XX:SurvivorRatio=8，也就是(S0+S1):Eden=2:8， 也就是一个S占整个新生代的1/10 |
| -XX:PermSize                | 设置持久代(perm gen)初始值 | 物理内存的1/64，jdk8 已移除                                  |
| -XX:MaxPermSize             | 设置持久代最大值           | 物理内存的1/4，jdk8 已移除                                   |
| -XX:MetaspaceSize=50M       | 设置元空间（方法区）大小   | 默认不受限制，JVM Metaspace 会进行动态扩展                   |
| -XX:MaxTenuringThreshold=15 | 提升年老代的最大临界值     | 默认值为 15                                                  |
| -XX:CICompilerCount=2       | 最大并行编译线程数量       | 默认根据 CPU 数量和可用内存自动设置。可设置 1/4 * CPUs       |



**GC 相关参数**

> 调整为按 GC 回收器分组，逐个回收器对应具体参数，而不是各个回收器的配置参数乱序。
>
> 详细配置参数，参照 GC 回收器内容。



**日志相关参数**

| 参数                                                         | 含义                   | 说明                                                |
| :----------------------------------------------------------- | :--------------------- | :-------------------------------------------------- |
| -XX:+HeapDumpOnOutOfMemoryError                              | 启动堆内存溢出打印     | 当JVM堆内存发生溢出时，也就是OOM，自动生成dump 文件 |
| -XX:HeapDumpPath=heap.hprof                                  | 指定堆内存溢出打印目录 | 表示在当前目录生成一个heap.hprof文件                |
| -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -XX:+PrintGCDateStamps -Xloggc:gc.log | 打印出GC日志           | 可以使用不同的垃圾收集器，对比查看GC情况            |



#### 其他参数

```
-Xms1000 等价于 -XX:InitialHeapSize=1000 // 初始堆内存
-Xmx1000 等价于 -XX:MaxHeapSize=1000  	// 最大堆内存
-Xss100  等价于 -XX:ThreadStackSize=100 	// 线程栈大小

```



#### 在哪里设置参数

- 开发工具中设置比如 IDEA，eclipse
- 运行jar包的时候：java -jar xxx.jar -XX:+UseG1GC xxx.jar
- web 容器比如 tomcat，可以在脚本中的进行设置
- 通过 jinfo 实时调整某个java进程的参数(参数只有被标记为manageable的ﬂags可以被实时修改)



### 查看默认垃圾收集器

\-XX:+PrintCommandLineFlags：查看命令行相关参数（包含使用的垃圾收集器）

使用命令行指令：jinfo -flag 相关垃圾回收器参数 进程ID



**设置 -XX:+PrintCommandLineFlags 查看**

在 JDK 8 下，设置 JVM 参数

\-XX:+PrintCommandLineFlags

程序打印输出：-XX:+UseParallelGC 表示使用使用 ParallelGC ，ParallelGC 默认和
Parallel Old 绑定使用。



**通过命令行指令查看**

jps

jinfo -flag UseParallelGC 进程id

jinfo -flag UseParallelOldGC 进程id

JDK 8 中默认使用 ParallelGC 和 ParallelOldGC 的组合。



### 怎么选择垃圾回收器

1. 优先调整堆的大小让JVM自适应完成。
2. 如果内存小于100M，使用串行收集器。
3. 如果是单核、单机程序，并且没有停顿时间的要求，串行收集器。
4. 如果是多CPU、需要高吞吐量、允许停顿时间超过1秒，选择并行或者JVM自己选择。
5. 如果是多CPU、追求低停顿时间，需快速响应（比如延迟不能超过1秒，如互联网应用），使用并发收集器。
6. 官方推荐G1，性能高。现在互联网的项目，基本都是使用G1。



最后需要明确一个观点：

没有最好的收集器，更没有万能的收集算法。**调优永远是针对特定场景、特定需求，不存在一劳永逸的收集器。**



### 显示 JVM 参数和 GC 日志

- \-XX:+PrintGc输出GC日志。类似：-verbose:gc

-   \-XX:+PrintGcDetails输出Gc的详细日志

-   \-XX:+PrintGcTimestamps 输出Gc的时间戳（以基准时间的形式）

-   \-XX:+PrintGCDatestamps 输出Gc的时间戳（以日期的形式，如2013-05-04T21：53：59.234+0800）
    
-   \-XX:+PrintHeapAtGC在进行Gc的前后打印出堆的信息

-   \-Xloggc:…/logs/gc.1og日志文件的输出路径



**查看JVM默认配置参数**

\-XX:+PrintFlagsInitial 查看初始值

\-XX:+PrintFlagsFinal 查看最终的值，因为初始值有可能被修改

\-XX:+UnlockExperimentalVMOptions 解锁实验参数，JVM中有些实验参数无法直接赋值，必须先使用此参数才能赋值

\-XX:+UnlockDiagnosticVMOptions 解锁诊断参数

\-XX:+PrintCommandLineFlags 打印命令行参数





### OOM 分析

> 转载出处 https://www.pdai.tech/md/java/jvm/java-jvm-oom.html

以两个简单的例子(`堆内存溢出`和`MetaSpace (元数据) 内存溢出`）解释Java 内存溢出的分析过程。



#### 堆内存溢出

在 Java 堆中只要不断的创建对象，并且 `GC-Roots` 到对象之间存在引用链，这样 `JVM` 就不会回收对象。

只要将`-Xms(最小堆)`,`-Xmx(最大堆)` 设置为一样禁止自动扩展堆内存。

当使用一个 `while(true)` 循环来不断创建对象就会发生 `OutOfMemory`，还可以使用 `-XX:+HeapDumpOutofMemoryErorr` 当发生 OOM 时会自动 dump 堆栈到文件中。

伪代码:

```java
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(10) ;
        while (true){
            list.add("1") ;
        }
    }

```



当出现 OOM 时可以通过工具来分析 `GC-Roots` [引用链  (opens new window)](https://github.com/crossoverJie/Java-Interview/blob/master/MD/GarbageCollection.md#可达性分析算法) ，查看对象和 `GC-Roots` 是如何进行关联的，是否存在对象的生命周期过长，或者是这些对象确实改存在的，那就要考虑将堆内存调大了。

```text
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
	at java.util.Arrays.copyOf(Arrays.java:3210)
	at java.util.Arrays.copyOf(Arrays.java:3181)
	at java.util.ArrayList.grow(ArrayList.java:261)
	at java.util.ArrayList.ensureExplicitCapacity(ArrayList.java:235)
	at java.util.ArrayList.ensureCapacityInternal(ArrayList.java:227)
	at java.util.ArrayList.add(ArrayList.java:458)
	at com.crossoverjie.oom.HeapOOM.main(HeapOOM.java:18)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at com.intellij.rt.execution.application.AppMain.main(AppMain.java:147)

Process finished with exit code 1

```

`java.lang.OutOfMemoryError: Java heap space`表示堆内存溢出。



#### MetaSpace 元空间内存溢出

> `JDK8` 中将永久代移除，使用 `MetaSpace` 来保存类加载之后的类信息。注意，字符串常量池、静态变量还是在堆内存。

`PermSize` 和 `MaxPermSize` 已经不能使用了，在 JDK8 中配置这两个参数将会发出警告。

JDK 8 中将类信息移到到了本地堆内存(Native Heap)中，将原有的永久代移动到了本地堆中成为 `MetaSpace` ,如果不指定该区域的大小，JVM 将会动态的调整。

可以使用 `-XX:MaxMetaspaceSize=10M` 来限制最大元数据。这样当不停的创建类时将会占满该区域并出现 `OOM`。

```java
    public static void main(String[] args) {
        while (true){
            Enhancer  enhancer = new Enhancer() ;
            enhancer.setSuperclass(HeapOOM.class);
            enhancer.setUseCache(false) ;
            enhancer.setCallback(new MethodInterceptor() {
                @Override
                public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
                    return methodProxy.invoke(o,objects) ;
                }
            });
            enhancer.create() ;

        }
    }

```



使用 `cglib` 不停的创建新类，最终会抛出:

```text
Caused by: java.lang.reflect.InvocationTargetException
	at sun.reflect.GeneratedMethodAccessor1.invoke(Unknown Source)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at net.sf.cglib.core.ReflectUtils.defineClass(ReflectUtils.java:459)
	at net.sf.cglib.core.AbstractClassGenerator.generate(AbstractClassGenerator.java:336)
	... 11 more
Caused by: java.lang.OutOfMemoryError: Metaspace
	at java.lang.ClassLoader.defineClass1(Native Method)
	at java.lang.ClassLoader.defineClass(ClassLoader.java:763)
	... 16 more

```

注意: 这里的 OOM 伴随的是 `java.lang.OutOfMemoryError: Metaspace` 也就是元空间溢出。





## 十二、面试题（重点、主干）

### 内存溢出（OOM）的原因

- Java虚拟机的堆内存设置不够。

比如：可能存在内存泄漏问题；也很有可能就是堆的大小不合理，比如要处理比较可观的数据量，但是没有显式指定JVM堆大小或者指定数值偏小。

可以通过参数-Xms 、-Xmx来调整。



- 代码中创建了大量大对象，并且长时间不能被垃圾收集器收集（存在被引用）。

对于老版本的Oracle JDK，因为永久代的大小是有限的，并且JVM对永久代垃圾回收（如，常量池回收、卸载不再需要的类型）非常不积极，所以当不断添加新类型的时候，永久代出现OutOfMemoryError也非常多见。

尤其是在运行时存在大量动态类型生成的场合；类似intern字符串缓存占用太多空间，也会导致OOM问题。

对应的异常信息，会标记出来和永久代相关：”java.lang.OutOfMemoryError:PermGen space”。

随着元数据区的引入，方法区内存已经不再那么窘迫，所以相应的OOM有所改观，出现OOM，异常信息则变成了：”java.lang.OutofMemoryError:Metaspace”。直接内存不足，也会导致OOM。



### 有GC垃圾回收，为什么还会出现OOM呢？

GC回收的内存比不上新对象占用的内存，用的多，回收少，自然就不够用了。



### 什么情况会导致GC无法回收内存？

1.  内存泄漏，对象不再使用了还一直被引用，导致GC无法回收，长时间积累，泄漏的内存可能越来越大，最后导致工作内存不够用，出现OOM。
2.  系统类库资源过多、常量或长期缓存过多，这些资源自系统运行多次GC后，最终存放在老年代，并且属于系统程序资源，只要程序还在运行，这些资源占用的内存就不会被回收，堆空间可利用的空间自然就少了许多。



### 内存泄漏的场景有哪些？

1.  **静态集合类。**静态集合具有与类相同的生命周期，集合中存放的对象元素使用完之后，除非手动清除，GC是清除不了的。

2.  **单例模式。**单例的生命周期和应用程序是一样长的，所以在单例程序中，如果持有对外部对象的引用的话，那么这个外部对象是不能被回收的，则会导致内存泄漏的产生。

3.  **内部类持有外部类属性。**多线程操作、监听器。

4.  **连接资源未关闭释放。**数据库连接、网络连接、IO连接等一些提供close()的资源未关闭导致内存泄漏。

5.  **变量不合理的作用域。**临时使用的对象，存放到了一个生命周期较长的外部对象，导致临时对象持续时间比实际的生命周期长。

6.  **改变哈希值。**Set集合添加元素后，中途改变元素的值，导致元素哈希值发生变化，remove的时候，根据哈希值找不到原来的元素位置，导致内存泄漏。

7.  **缓存泄漏。**没有指定过期时间的缓存，将会导致内存占用递增。可以适当使用弱引用，或指定缓存失效时间。

8.  **监听器和回调。**本质是内部类引用了外部类属性，导致内部类不能被释放。



简单归类记忆：

- 占用着不放。静态资源、缓存、连接
- 作用范围扩大。临时对象被长周期对象持有
- 找不着了。改变了哈希值，找不到了，还怎么释放



### 吞吐量优先和响应优先的垃圾收集器如何选择？

<https://blog.csdn.net/rlnLo2pNEfx9c/article/details/79722384>

-   **并行**（Parallel）：多个垃圾收集线程并行工作，此时用户线程处于等待状态

-   **并发**（Concurrent）：用户线程和垃圾收集线程同时执行

-   **吞吐量**：运行用户代码时间／（运行用户代码时间＋垃圾回收时间）



#### 吞吐量优先的并行收集器

参数配置：

\-Xmx4g -Xms4g -Xmn2g -Xss200k -XX:+UseParallelGC -XX:ParallelGCThreads=8

说明：选择Parallel
Scavenge收集器，然后配置多少个线程进行回收，最好与处理器数目相等。



\-Xmx4g -Xms4g -Xmn2g -Xss200k -XX:+UseParallelGC -XX:ParallelGCThreads=8
\-XX:+UseParallelOldGC

说明：配置老年代使用Parallel Old



\-Xmx4g -Xms4g -Xmn2g -Xss200k -XX:+UseParallelGC -XX:MaxGCPauseMills=100

说明：设置每次年轻代垃圾回收的最长时间。如何不能满足，那么就会调整年轻代大小，满足这个设置



\-Xmx4g -Xms4g -Xmn2g -Xss200k -XX:+UseParallelGC -XX:MaxGCPauseMills=100
\-XX:+UseAdaptiveSizePolicy

说明：并行收集器会自动选择年轻代区大小和Survivor区的比例。



#### 响应时间优先的并发收集器

\-Xmx4g -Xms4g -Xmn2g -Xss200k -XX:+UseConcMarkSweepGC -XX:+UseParNewGC

说明：设置老年代的收集器是CMS，年轻代是ParNew



\-Xmx4g -Xms4g -Xmn2g -Xss200k -XX:+UseConcMarkSweepGC
\-XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection

说明：首先设置运行多少次GC后对内存空间进行压缩，整理。同时打开对年老代的压缩（会影响性能）



参考

[JVM性能调优经验总结](https://www.cnblogs.com/yungyu16/p/13275201.html)

本地开放启动的小型项目

\-server -Xms256m -Xmx256m -Xmn128m -Xss512K -XX:MetaspaceSize=128m
\-XX:MaxMetaspaceSize=128m -XX:PermSize=128m -XX:MaxPermSize=128m
\-XX:MaxDirectMemorySize=128m -XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90
\-XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5
\-XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly
\-XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent
\-XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+PrintGCDetails
\-XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps
\-Xloggc:/home/logs/gc/mypages-god/gc-%t.log -XX:+UseGCLogFileRotation
\-XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M



提供页面的业务项目

\-Xms512m -Xmx512m -Xmn256m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m
\-XX:PermSize=128m -XX:MaxPermSize=256m -XX:MaxDirectMemorySize=256m
\-XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC
\-XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5
\-XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly
\-XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent
\-XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+PrintGCDetails
\-XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps
\-Xloggc:/home/logs/gc/jenkins/gc-%t.log -XX:+UseGCLogFileRotation
\-XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M



注意：

MetaspaceSize不是最终的大小，实际是按需分配，自动扩容，达到这个值会触发
Metaspace GC 和 Full GC。



配置实例

CATALINA_OPTS="\$CATALINA_OPTS -server -Djava.awt.headless=true -Xms5324m
\-Xmx5324m -Xss512k -XX:PermSize=350m -XX:MaxPermSize=350m -XX:MetaspaceSize=256m
\-XX:MaxMetaspaceSize=256m -XX:NewSize=2048m -XX:MaxNewSize=2048m
\-XX:SurvivorRatio=8 -XX:MaxTenuringThreshold=9 -XX:+UseConcMarkSweepGC
\-XX:+UseCMSInitiatingOccupancyOnly -XX:+CMSScavengeBeforeRemark
\-XX:+ScavengeBeforeFullGC -XX:+UseCMSCompactAtFullCollection
\-XX:+CMSParallelRemarkEnabled -XX:CMSFullGCsBeforeCompaction=9
\-XX:CMSInitiatingOccupancyFraction=80 -XX:+CMSClassUnloadingEnabled
\-XX:SoftRefLRUPolicyMSPerMB=0 -XX:-ReduceInitialCardMarks
\-XX:+CMSPermGenSweepingEnabled -XX:CMSInitiatingPerm OccupancyFraction=80
\-XX:+ExplicitGCInvokesConcurrent
\-Djava.nio.channels.spi.SelectorProvider=[sun.nio.ch](http://sun.nio.ch/).EPollSelectorProvider
\-Djava.util.logging.manager=org.apac he.juli.ClassLoaderLogManager
\-XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCApplicationConcurrentTime
\-XX:+PrintGCApplicationStoppedTime -XX:+PrintHeapAtGC
\-Xloggc:/data/applogs/heap_trace.txt -XX:+IgnoreUnrecognizedVMOptions
\-XX:-HeapDumpOnOutOfMemoryError
\-XX:HeapDumpPath=/data/applogs/HeapDumpOnOutOfMemoryError"
