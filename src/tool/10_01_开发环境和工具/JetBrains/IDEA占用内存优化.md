---
title: IDEA占用内存优化
date: 2024-05-30 09:53:26
category:
    - 开发工具
tag:
    - IDEA
star: 8.8
---

## 问题现象

Google、Adobe、JetBrains 等大厂软件 “吃内存” 问题，版本越新越严重！动不动就几个G！

新功能不管用不用得到，启动就加载进内存！他们的内存是大到不要钱吗？

绝大多数用户都没有任何应对办法，要么躺平；要么加内存；要么回退老版本。

专业人士搞 “技术霸凌”，普通用户压根反抗不了！如果各行各业都仰仗自己的技术本领搞 “技术霸凌”，“你坑我，我坑你”，现在就有不少这样的现象。


<br/>

## 优化目标

> **电脑配置** 👇
>
> Intel(R) Core(TM) i7-8550U CPU @ 1.80GHz   1.99 GHz
>
> 8.00 GB
>
> Windows 10 专业版 22H2


**怎么着也得让咱小 8G 低配电脑，跑一个中小型 SSM 吧！**

<br/>

> 公司电脑（台式、笔记本）配置都还可以，内存 16G
>
> 自己的笔记本配置有点老了，内存才 8G，因为可以带公司笔记本办公，自己的笔记本一直没升级配置！
>
> 别问为什么不加内存条，特么的单卡槽坑爹！当时是同事买了，我看着还可以，当时还搞活动减600，当时真是 “猴急” 糊涂了！买的时候**商品详情压根没提内存条卡槽只有一个，也没太仔细去看评价和网上评测！**后面跑项目卡的时候，才恍然大悟，丫的当时被 “立减600” 蒙蔽了脑子，不好的东西，才有这么大的优惠力度！不熟悉的地方，难免会吃亏上当。（应该是买到精简版了）

<br/>

Q: IDEA 用几年前的老版本就行了，修改 VM 内存、停用一些插件，跑个中小项目没问题啊！为什么非要用新版本？

A: 是的！用 2020 及之前的年份的版本，这样操作优化一下，小 8G 内存确实可以跑项目，体验也还不错。

可是新版本的一些 `新功能`、`新特性` 确实很香啊，各种智能提示、补全，写代码效率起飞！智能时代的工具，和工业时代或石器的工具，哪个效率高用哪个。

Q: 鱼和熊掌不能兼得啊！低配电脑跑最新版大软件，怎么可能不卡啊？（高配完整版，贵！配置要求高！）

A: 所以想精简优化啊，让最新版大软件，在低配电脑上也能正常跑中小型项目。（精简低配版，定位中低端市场需求）


<br/>

## 优化记录

> 对 IDEA 设置不熟悉的，有些专业配置英文看不太懂，可以安装官方中文插件。在 IDEA 插件-市场面板，搜索 `Chinese`，选择 `JetBrains`官方版安装即可。

同一个项目，不同版本，使用观察十分钟以上（为了避免重复卸载安装，下载官方免安装版压缩包）

- 默认设置打开项目
- 修改 VM 内存大小
- 停用一些可能用不到的插件，只保留基础插件
- 精简语法检查、错误提示等自动化功能
- 修改 IDEA 运行使用的 JDK


<br/>

### 导出 IDEA 配置

> 先把自己 “调教” 好的 IDEA 配置备份一下，新版本处不来，可以 “吃回头草” [狗头]

File | Manage IDE Settings | Export Settings 选择 IDEA 常用目录保存，不建议保存在默认目录，因为卸载后可能会被删除。



<br/>

### 彻底清除安装

> 我这是测试不同版本需要，你们不换版本的话，不用清除安装


<br/>

新建 `IDEA彻底清理.bat` 文件，批处理内容如下：

```cmd
@echo on

::需要管理员权限
::admin 01
REG QUERY "HKU\S-1-5-19">NUL 2>&1||(powershell -Command "Start-Process '%~sdpnx0' -Verb RunAs"&&exit)
::admin 02
::REG QUERY "HKU\S-1-5-19">NUL 2>&1||mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit

::del reg
reg delete "HKEY_CURRENT_USER\SOFTWARE\JavaSoft\Prefs\jetbrains" /f

::del dir
rmdir /s/q "%USERPROFILE%\IdeaProjects"
::cmd 不支持模糊删除目录，手动修改
::rmdir /s/q "%USERPROFILE%\.IntelliJIdea*"
rmdir /s/q "%USERPROFILE%\.IntelliJIdea2017.3"
rmdir /s/q "%USERPROFILE%\.IntelliJIdea2018.3"
rmdir /s/q "%USERPROFILE%\.IntelliJIdea2019.3"
::2020 版本开始，.IntelliJIdeaxxxx 目录改为了 JetBrains\IntelliJIdeaxxxx
rmdir /s/q "%USERPROFILE%\AppData\Roaming\JetBrains"
rmdir /s/q "%USERPROFILE%\AppData\Local\JetBrains"
rmdir /s/q "C:\用户\公用\.jetbrains"
rmdir /s/q "C:\Program Files\JetBrains"
::rmdir /s/q "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\JetBrains"

pause

```


<br/>

### 修改 VM 内存大小

**效果立竿见影**

不建议一味地降低内存配置，主要依据电脑内存大小及项目大小。

- 16G 以上内存不改动或者适当减少，跑一两个中大型项目够用，再多的话还是要限制每个项目的占用内存。
- 8G 内存肯定得改小 VM 了，不然跑一个中小型 SSM 项目，内存直接爆红！
- VM 内存大小具体设置多少？中小型 SSM 项目，512M 起步，由小到大、逐级调整；不报 OOM、不卡顿影响使用就行，本地开发环境不管 JVM 调优那一套也没多大事。（JVM 调优可参考本站《JVM性能调优》）



在安装目录，比如 `D:\Dev\ideaIU-2024.1.2.win\bin`，找到 `idea64.exe.vmoptions` 文件，这个文件主要是配置 `idea64.exe` 运行时的 JVM 参数，并不是每个项目启动后的 JVM 参数。

安装后的默认配置：

```properties
-Xms128m
-Xmx2048m
-XX:+HeapDumpOnOutOfMemoryError
-XX:-OmitStackTraceInFastThrow
-XX:+IgnoreUnrecognizedVMOptions
-ea
-Dsun.io.useCanonCaches=false
-Dsun.java2d.metal=true
-Djbr.catch.SIGABRT=true
-Djdk.http.auth.tunneling.disabledSchemes=""
-Djdk.attach.allowAttachSelf=true
-Djdk.module.illegalAccess.silent=true
-Dkotlinx.coroutines.debug=off
-XX:CICompilerCount=2
-XX:ReservedCodeCacheSize=512m
-XX:CompileCommand=exclude,com/intellij/openapi/vfs/impl/FilePartNodeRoot,trieDescend
-XX:SoftRefLRUPolicyMSPerMB=50
-Dide.show.tips.on.startup.default.value=false

```



这里只需要改动 `-Xmx` 最大堆内存这一个参数，内存不够可以改成 `-Xmx1024m`，16G 以上内存用默认配置不改也行。其他 JVM 参数配置和作用可以自己去搜索了解。




<br/>

### 停用插件

**效果不错**

- **备份IDEA配置**之后，大胆尝试，按最大力度禁用插件
- 纯 Java 后端项目，可以把前端、安卓、其他开发语言相关插件全禁用掉，用到的时候 IDEA 会提示启用，或者手动去启用



File | Settings | Plugins | installed 面板，大胆禁用，只保留跟自己项目相关的插件，以下是我个人保留的插件（19个）：

```
Chinese (Simplified) Language Pack / 中文语言包 (241.271)
Jakarta EE Platform (241.17011.79)
Jakarta EE: Web/Servlets (241.17011.79)
JVM Microservices Frameworks (241.17011.79)
Lombok (241.17011.79)
Spring (241.17011.79)
Spring Boot (241.17011.79)
Spring Cloud (241.17011.79)
Spring Initializr (241.17011.79)
Spring Security (241.17011.79)
Spring Web (241.17011.79)
Maven (241.17011.79)
Maven Extension (241.17011.79)
CSS (241.17011.79)
Git (241.17011.79)
Markdown (241.17011.79)
Properties (241.17011.79)
YAML (241.17011.79)
Java Internationalization (241.17011.79)
```




<br/>

### 精简语法检查

**效果不太明显**

插件停用之后，很多开发语言的语法检测自动也关闭了，剩下的其实都是需要用的，也不能为了减少内存，把基本的功能阉割了！



File | Settings | Editor | Inspections 面板，去掉一些不需要的检查，我也讲不准哪些不需要，自己尝试摸索，发现问题，可以在当前面板的设置按钮里面恢复默认。




<br/>

### 修改 IDEA 运行使用的 JDK

**效果不明显**

- JetBrains Runtime 修复了各种已知的 OpenJDK 和 Oracle JDK 错误，并提供了更好的性能和稳定性。比如界面字体抗锯齿。
- IDEA 的运行时跟应用程序使用的运行时不是同一个，可以在项目结构里面为每个项目指定 JDK。

- 更改 IDEA JBR 可能会导致意外问题。尽量选跟 IDEA 自身运行环境（JBR）版本相同/相近的 JDK，版本可以高，但不能低太多。比如，IDEA 2023.3.6 自身用的是 open JDK 17，改成 JDK 8，版本差距太大，难免会出现兼容问题！



官方教程：

- [更改 IDE 的启动 Java 运行时](https://intellijidea.com.cn/help/idea/switching-boot-jdk.html)
- [Selecting the JDK version the IDE will run under](https://intellij-support.jetbrains.com/hc/en-us/articles/206544879-Selecting-the-JDK-version-the-IDE-will-run-under)



<br/>

### 2024.1.2

跟 `2023.3.6` 差别不大。






<br/>

### 2023.3.6

| 操作                                                         | 内存             |
| :----------------------------------------------------------- | :--------------- |
| 默认配置打开项目（IDEA 会根据电脑内存自动配置 VM 大小）      | ≈3+G             |
| 改小 VM 内存（帮助-编辑自定义虚拟机选项 -Xmx1024m）[立竿见影] | ≈2+G             |
| 停用大部分插件（新版本不用怕玩坏，重新启动后会提示建议开启哪些必要插件）[效果不错] | ≈1.4+G           |
| 关掉一些不用的语法检查 [作用貌似不大]                        | ≈1.3+G           |
| 修改 IDEA 运行时环境（IDEA 版本太新，JBR 可选 17、11）[效果不明显] | ≈1.3+G           |
| 正常使用（写代码，不跑项目）[不改 JBR vs 改用 Oracle JDK]    | ≈1.6+G \| ≈1.6+G |
| 运行 SSM 小项目（JBR17 [92M] + JRE8 [435M] \| JRE17 [104M] + JRE17 [505M]）[不改 JBR vs 改用 Oracle JDK] | ≈2.1+G \| ≈2.1+G |

<br/>

版本很新，新功能特性确实也多。但市面上公司主流项目的 JDK、Spring Boot 版本都相差一大截，不太 “门当户对”，可能会导致跑 JDK 8 项目出现一些问题，比如，要用 `debug` 调试模式才能启动运行项目。

适合初创开发新项目，但存在内存占用、CPU 消耗、项目兼容等方面的问题，硬件和技术门槛要求偏高。（电脑配置高请忽略）


<br/>

### 2020.3.4

> 这个版本可能是兼顾【功能和性能】比较好的选择，支持官方中文插件。

| 操作                         | 内存   |
| :--------------------------- | :----- |
| 默认配置打开项目             | ≈2.0+G |
| 改小 VM 内存（-Xmx1024m）    | ≈1.5+G |
| 停用大部分插件               | ≈1.3+G |
| 关掉一些不用的语法检查       | ≈1.3+G |
| 修改 IDEA 运行时环境         | ≈1.3+G |
| 正常使用（写代码，不跑项目） | ≈1.5+G |
| 运行 SSM 小项目              | ≈1.9+G |

<br/>

### 2019.3.5

> 启动速度和编程体验跟新版差距挺大，不支持官方中文插件，不太想回来用老版本了，噗哈哈哈~😂

| 操作                         | 内存   |
| :--------------------------- | :----- |
| 默认配置打开项目             | ≈1.3+G |
| 改小 VM 内存（-Xmx1024m）    | ≈1.2+G |
| 停用大部分插件               | ≈1.0+G |
| 关掉一些不用的语法检查       | ≈1.0+G |
| 修改 IDEA 运行时环境         | ≈1.0+G |
| 正常使用（写代码，不跑项目） | ≈1.2+G |
| 运行 SSM 小项目              | ≈1.6+G |



<br/>
