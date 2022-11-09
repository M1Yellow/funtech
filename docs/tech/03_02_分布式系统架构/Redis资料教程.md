---
title: Redis资料教程
date: 2022-11-02 19:39:19
category:
    - 分布式架构
tag:
    - Redis
---

## 概述

### 是什么

Redis（Remote Dictionary Server )，即远程字典服务。
是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。



### 使用场景

1. 内存存储、持久化，内存中的数据断电即失，重要数据必须持久化（rdb、aof）
2. 效率高，可以用于高速缓存
3. 发布订阅系统
4. 地图信息分析
5. 计时器、计数器（浏览量）



### 特性

1. 多样的数据类型

2. 持久化

3. 集群

4. 事务



### 安装

可以选择在 Windows、Linux 或者 Docker 中安装，建议使用后两种。

相关的安装教程，网上一搜一大堆，没必要再照搬一遍过来。

Docker 安装 Redis 的方式，参考整理的 Docker 资料教程。



### 用户配置

- [Redis 6.0 访问控制列表ACL说明](https://www.cnblogs.com/zhoujinyi/p/13222464.html)



在 Redis6.0 之前的版本中，登陆 Redis Server 只需要输入密码（前提配置了密码 requirepass ）即可，不需要输入用户名，而且密码也是明文配置到配置文件中，安全性不高。并且应用连接也使用该密码，导致应用有所有权限处理数据，风险也极高。在 Redis6.0 有了[ACL](https://redis.io/topics/acl)之后，终于解决了这些不安全的因素，可以按照不同的需求设置相关的用户和权限。本文来介绍下Redis 6.0 ACL相关的配置和使用。具体的说明可以查看官方文档：**[ACL](https://redis.io/topics/acl)** 



**查看用户信息**

```shell
127.0.0.1:6379> acl help
 1) ACL <subcommand> arg arg ... arg. Subcommands are:
 2) LOAD                             -- 从ACL文件中重新载入用户信息.
 3) SAVE                             -- 保存当前的用户配置信息到ACL文件.
 4) LIST                             -- 以配置文件格式显示用户详细信息.
 5) USERS                            -- 列出所有注册的用户名.
 6) SETUSER <username> [attribs ...] -- 创建或修改一个用户.
 7) GETUSER <username>               -- 得到一个用户的详细信息.
 8) DELUSER <username> [...]         -- 删除列表中的用户.
 9) CAT                              -- 列出可用的类别.
10) CAT <category>                   -- 列出指定类别中的命令.
11) GENPASS [<bits>]                 -- 生成一个安全的用户密码.
12) WHOAMI                           -- 返回当前的连接用户.
13) LOG [<count> | RESET]            -- 显示ACL日志条目.

127.0.0.1:6379> acl whoami
"default"

```



### 配置以普通用户启动

https://blog.51cto.com/jack88/2465169

为了保证生产环境服务器的安全，在工作中有一个规范，要求我们运行的服务都要求以非登陆的普通用户运行，从而防止程序本身的漏洞被利用被黑客提权！比如我们在编译安装nginx、mysql以及php之前都会通过useradd建立非登陆的普通用户，然后在编译的时候指定该用户。类似这种的服务都是本身原生支持以普通用户运行的。但是有些程序并不是原生支持，在编译时候没有提供这个功能。只能编译后我们重新修改指定普通用户来运行。



```shell
建立普通用户
groupadd redis useradd redis -M -g redis -s /sbin/nologin

提前创建必要的目录
mkdir /var/run/redis -pv   && chown redis.redis  /var/run/redis -R
mkdir /usr/local/redis/data/ -pv && chown redis.redis  /usr/local/redis/data/ -R mkdir /var/log/redis/ -pv && chown redis.redis /var/log/redis/ -R
(pid 目录，默认是/var/run/但是仅限root用户创建，如果普通用户运行的，必须在其下自创目录，并chown授权)

注意：我们的appendonly.aof文件默认是644权限，其他用户只读。所以修改普通用户前，看看该文件在哪个路径下，并且检查是否chown redis了，也可以给他直接加w权限，但是为了安全不推荐。

修改配置文件的pidfile,logfile以及dir的位置

修改服务启动文件
vim /usr/lib/systemd/system/redis.service
主要添加 Use,Group,PIDFile

```



### 基础知识

```bash
## Redis 默认有16个数据库，默认使用的是第0个
databases 16

## 可以使用 select 进行切换数据库
127.0.0.1:6379> select 3 ## 切换数据库
OK
127.0.0.1:6379[3]> DBSIZE ## 查看DB大小！
(integer) 0

## 清除当前数据库
flushdb
## 清除全部数据库的内容
flushall

## redis-cli 操作
## 通过密码进入Redis控制台
redis-cli --raw -h 127.0.0.1 -p 6379 -a 123456.a

## redis-cli 中文乱码
127.0.0.1:6379> set mykey 北京
OK
127.0.0.1:6379> get mykey
"\xe5\x8c\x97\xe4\xba\xac"

## 默认redis不转义中文，如果在平常开发中 想要看到中文内容。
## 在打开客户端时：./redis-cli  命令后面  加上  --raw 即可。
127.0.0.1:6379> get mykey
北京


```



> redis 是单线程的

为什么单线程还这么快？

- 误区1：高性能的服务器一定是多线程的？

- 误区2：多线程（CPU上下文切换）一定比单线程效率高！


redis 是将所有的数据全部放在内存中的，所以说使用单线程去操作效率就是最高的，多线程（ CPU 上下文会切换：耗时的操作），对于内存系统来说，如果没有上下文切换效率就是最高的。多次读写都是在一个 CPU 上的，在内存情况下，这个就是最佳的方案。



### 学习路径

> 社会目前程序员饱和（初级和中级）、高级程序员重金难求（提升自己！）

官网：https://redis.io/

中文网：http://www.redis.cn/

命令参考：http://www.redis.cn/commands.html





## 五大数据类型

**Redis-Key**

```bash
127.0.0.1:6379> keys * ## 查看所有的 key
(empty array)
127.0.0.1:6379> set name test01 ## 设置 key
OK
127.0.0.1:6379> keys *
1) "name"
127.0.0.1:6379> set age 18
OK
127.0.0.1:6379> keys *
1) "name"
2) "age"
127.0.0.1:6379> exists name ## 判断 key 是否存在
(integer) 1
127.0.0.1:6379> exists mobile
(integer) 0
127.0.0.1:6379> move age ## 注意移除格式
(error) ERR wrong number of arguments for 'move' command
127.0.0.1:6379> move age 1
(integer) 1
127.0.0.1:6379> keys *
1) "name"
127.0.0.1:6379> get name
"test01"
127.0.0.1:6379> expire name 10 ## 设置 key 过期时间，单位为秒
(integer) 1
127.0.0.1:6379> ttl name
(integer) 1
127.0.0.1:6379> ttl name ## 查看剩余有效时间，-2 表示失效，key 被移除
(integer) -2
127.0.0.1:6379> get name
(nil)
127.0.0.1:6379> set name test01
OK
127.0.0.1:6379> set age 18
OK
127.0.0.1:6379> type name ## 查看 key 类型
string
127.0.0.1:6379> type age ## 注意，数值类型显示也是 string，运算时自动识别
string

```



### string（字符串）

- [Redis 5种数据结构 及使用场景分析](https://segmentfault.com/a/1190000022800471)



#### string 数据结构

在 Redis 中 String 是可以修改的，称为动态字符串（Simple Dynamic String 简称 SDS），说是字符串但它的内部结构更像是一个  ArrayList，内部维护着一个字节数组，并且在其内部预分配了一定的空间，以减少内存的频繁分配。



Redis 的内存分配机制（了解）：

- 当字符串的长度小于 1MB时，每次扩容都是加倍现有的空间。
- 如果字符串长度超过 1MB时，每次扩容时只会扩展 1MB 的空间。

这样既保证了内存空间够用，还不至于造成内存的浪费，**字符串最大长度为 `512MB`**。

![在这里插入图片描述](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/1460000021770078.png)



字符串的基本结构，其中 content  里面保存的是字符串内容，`0x\0`作为结束字符不会被计算 len 中。



字符串的数据结构：

```c
struct SDS{
  T capacity;       //数组容量
  T len;            //实际长度
  byte flages;  //标志位,低三位表示类型
  byte[] content;   //数组内容
}
```



capacity 和 len 两个属性都是泛型，为什么不直接用int类型？因为 Redis 内部有很多优化方案，为更合理的使用内存，不同长度的字符串采用不同的数据类型表示，且在创建字符串的时候 len 会和 capacity 一样大，不产生冗余的空间，所以 String 值可以是字符串、数字（整数、浮点数) 或者 二进制。



#### string 的应用场景

- 存储key-value键值对，业务上用的最多
- 计数器
- 统计多单位的数量
- 粉丝数
- 对象缓存存储



#### string 的 CRUD

```shell
##########################################################################
## 新增
127.0.0.1:6379> set username test01
OK

##########################################################################
## 删除
127.0.0.1:6379> del username
(integer) 1
127.0.0.1:6379> get username
(nil)

##########################################################################
## 修改
127.0.0.1:6379> set username test02
OK
127.0.0.1:6379> get username
"test02"

##########################################################################
## 查询
127.0.0.1:6379> get username
"test01"

##########################################################################
## 操作
## 判断 key 是否存在
127.0.0.1:6379> exists username
(integer) 1

##########################################################################
## 追加字符串
127.0.0.1:6379> append username 0000
(integer) 10
127.0.0.1:6379> get username
"test020000"

##########################################################################
## 自增
127.0.0.1:6379> set register_count 0
OK
127.0.0.1:6379> get register_count
"0"
127.0.0.1:6379> incr register_count
(integer) 1
127.0.0.1:6379> get register_count
"1"
## 设置步长自增
127.0.0.1:6379> get register_count
"0"
127.0.0.1:6379> incrby register_count 5
(integer) 5
127.0.0.1:6379> get register_count
"5"

##########################################################################
## 自减
127.0.0.1:6379> decr register_count
(integer) 0
127.0.0.1:6379> get register_count
"0"
## 设置步长自减
127.0.0.1:6379> get register_count
"5"
127.0.0.1:6379> decrby register_count 5
(integer) 0
127.0.0.1:6379> get register_count
"0"

##########################################################################
## 字符串范围 range
## 字符串截取 [0, 5]
127.0.0.1:6379> get username
"test020000"
127.0.0.1:6379> getrange username 0 5
"test02"

##########################################################################
## 字符串范围修改
127.0.0.1:6379> get username
"test020000"
127.0.0.1:6379> setrange username 6 1111 
(integer) 10
127.0.0.1:6379> get username
"test021111"

##########################################################################
## setex (set with expire) 设置过期时间
127.0.0.1:6379> setex testkey 10 test
OK
127.0.0.1:6379> get testkey
"test"
127.0.0.1:6379> ttl testkey
(integer) 3
127.0.0.1:6379> ttl testkey
(integer) 1
127.0.0.1:6379> ttl testkey
(integer) -2
127.0.0.1:6379> get testkey
(nil)

##########################################################################
## setnx (set if not exist) 不存在则设置 （在分布式锁中经常使用）
127.0.0.1:6379> setnx userid01 1 
(integer) 1
127.0.0.1:6379> get userid01
"1"
127.0.0.1:6379> setnx userid01 2 ## 存在则设置失败
(integer) 0
127.0.0.1:6379> get userid01
"1"

##########################################################################
## 同时设置多个值
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3 ## 同时设置多个值
OK
127.0.0.1:6379> mget k1 k2 k3 ## 同时获取多个值
1) "v1"
2) "v2"
3) "v3"
127.0.0.1:6379> mset k1 v11 k4 v4
OK
127.0.0.1:6379> mget k1 k2 k3 k4
1) "v11"
2) "v2"
3) "v3"
4) "v4"

127.0.0.1:6379> msetnx k1 v1 k4 v4 ## msetnx 是一个原子性的操作，要么一起成功，要么一起失败！
(integer) 0
127.0.0.1:6379> get k4
(nil)

##########################################################################
## getset 先get然后在set
127.0.0.1:6379> getset db redis ## 如果不存在值，则返回 nil
(nil)
127.0.0.1:6379> get db
"redis
127.0.0.1:6379> getset db mongodb ## 如果存在值，获取原来的值，并设置新的值
"redis"
127.0.0.1:6379> get db
"mongodb"

##########################################################################
## 存储对象
set user:1 {name:zhangsan,age:3} ## 设置一个user:1 对象 值为 json字符来保存一个对象！
## 这里的key是一个巧妙的设计： user:{id}:{filed} , 如此设计在Redis中是完全OK了！
127.0.0.1:6379> get user:1
"{name:zhangsan,age:20}"
127.0.0.1:6379> get user:1:name
(nil)
127.0.0.1:6379> get user:1:age
(nil)

127.0.0.1:6379> mset user:1:name zhangsan user:1:age 22
OK
127.0.0.1:6379> mget user:1:name user:1:age
1) "zhangsan"
2) "22"


```



### list（列表）

#### list 数据结构

Redis 中的 list 和 Java 中的 LinkedList 很像，底层都是一种链表结构， list的插入和删除操作非常快，时间复杂度为 0(1)，不像数组结构插入、删除操作需要移动数据。

像归像，但是 redis 中的 list 底层可不是一个双向链表那么简单。

当数据量较少的时候它的底层存储结构为一块连续内存，称之为 ziplist（压缩列表），它将所有的元素紧挨着一起存储，分配的是一块连续的内存；当数据量较多的时候将会变成 quicklist （快速链表）结构。

可单纯的链表也是有缺陷的，链表的前后指针 prev 和 next 会占用较多的内存，会比较浪费空间，而且会加重内存的碎片化。在 redis 3.2 之后就都改用 ziplist + 链表的混合结构，称之为 quicklist （快速链表）。



**ziplist（压缩列表）**

ziplist 的数据结构：

```c
struct ziplist<T>{
    int32 zlbytes;            //压缩列表占用字节数
    int32 zltail_offset;    //最后一个元素距离起始位置的偏移量,用于快速定位到最后一个节点
    int16 zllength;            //元素个数
    T[] entries;            //元素内容
    int8 zlend;                //结束位 0xFF
}
```

int32 zlbytes： 压缩列表占用字节数
int32 zltail_offset： 最后一个元素距离起始位置的偏移量,用于快速定位到最后一个节点

int16 zllength：元素个数
T[] entries：元素内容
int8 zlend：结束位 0xFF



压缩列表为了支持双向遍历，所以才会有 ztail_offset 这个字段，用来快速定位到最后一个元素，然后倒着遍历。

![在这里插入图片描述](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/1460000021770077.png)



`entry`的数据结构：

```c
struct entry{
    int<var> prevlen;            //前一个 entry 的长度
    int<var> encoding;            //元素类型编码
    optional byte[] content;    //元素内容
}
```

entry 它的 prevlen 字段表示前一个 entry 的字节长度，当压缩列表倒着遍历时，需要通过这个字段来快速定位到下一个元素的位置。



#### list 的应用场景

- 消息队列 （Lpush Rpop），栈（ Lpush Lpop）。
- 朋友圈的点赞列表、评论列表、排行榜：lpush 命令和 lrange 命令能实现最新列表的功能，每次通过 lpush 命令往列表里插入新的元素，然后通过 lrange 命令读取最新的元素列表。



#### list 的 CRUD

Redis 的 list 可以作为栈、队列、阻塞队列。
所有的 list 命令都是用 l 开头的，Redis 不区分大小命令。

```shell
##########################################################################
## 新增
### 往左边新增元素
127.0.0.1:6379> lpush list l1
(integer) 1
127.0.0.1:6379> lpush list l1
(integer) 2
127.0.0.1:6379> lpush list l2 l3 l4
(integer) 5

### 往右边新增元素
127.0.0.1:6379> rpush list r1 r2 r3
(integer) 8
127.0.0.1:6379> lrange list 0 -1
1) "l4"
2) "l3"
3) "l2"
4) "l1"
5) "l1"
6) "r1"
7) "r2"
8) "r3"

##########################################################################
## 删除，没有直接移除 key 的命令，需要逐个移除元素，元素全部移除后，key 也就被移除了
lrem key count value
count > 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。
count < 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。
count = 0 : 移除表中所有与 VALUE 相等的值。

127.0.0.1:6379> rpush r1 r2 r3
(integer) 2
127.0.0.1:6379> keys *
1) "list"
2) "r1"
127.0.0.1:6379> lrem r1 1 r2
(integer) 1
127.0.0.1:6379> lrem r1 1 r3
(integer) 1
127.0.0.1:6379> keys *
1) "list"

### lpop rpop 移除元素
127.0.0.1:6379> lrange list 0 -1
1) "l4"
2) "l3"
3) "l2"
4) "l1"
5) "l1"
6) "r1"
7) "r2"
8) "r3"
127.0.0.1:6379> lpop list
"l4"
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "l1"
4) "l1"
5) "r1"
6) "r2"
7) "r3"
127.0.0.1:6379> rpop list
"r3"
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "l1"
4) "l1"
5) "r1"
6) "r2"

##########################################################################
## 修改
### lset 指定下标修改值，没有 rset，这里的 l 是 list 的缩写
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "l1"
127.0.0.1:6379> lset list 2 r1
OK
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "r1"

##########################################################################
## 查询
### 只有 lrange 范围查询，没有 rrange，这里的 l 是 list 的缩写
127.0.0.1:6379> lrange list 0 1
1) "l4"
2) "l3"
127.0.0.1:6379> lrange list 0
(error) ERR wrong number of arguments for 'lrange' command
127.0.0.1:6379> lrange list 0 0
1) "l4"
127.0.0.1:6379> lrange list 0 -1
1) "l4"
2) "l3"
3) "l2"
4) "l1"
5) "l1"

### lindex 通过下标取元素，没有 rindex，这里的 l 是 list 的缩写
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "l1"
4) "l1"
5) "r1"
6) "r2"
127.0.0.1:6379> lindex list 2 ## 下标从 0 开始，取下标为 2 的元素
"l1"

##########################################################################
## 操作
### llen 获取元素长度，这里的 l 是 list 的缩写
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "l1"
4) "l1"
5) "r1"
6) "r2"
127.0.0.1:6379> llen list
(integer) 6

##########################################################################
### ltrim 截取 list，没有 rtrim，这里的 l 是 list 的缩写
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "l1"
4) "l1"
5) "r1"
6) "r2"
127.0.0.1:6379> ltrim list 0 3
OK
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "l1"
4) "l1"

##########################################################################
## rpoplpush 移除列表的最后一个元素，将他移动到新的列表中
## 注意就只有这一个命令有效，其他 rpoprpush lpoplpush lpoprpush 无效
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "l1"
4) "l1"
127.0.0.1:6379> rpoplpush list list2
"l1"
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "l1"
127.0.0.1:6379> lrange list2 0 -1
1) "l1"

##########################################################################
### linsert 将某个具体的 value 插入到列表中某个元素的前面或者后面，这里的 l 是 list 的缩写
127.0.0.1:6379> lrange list 0 -1
1) "l3"
2) "l2"
3) "r1"
127.0.0.1:6379> linsert list before l3 l4 ## 前面插入元素
(integer) 4
127.0.0.1:6379> lrange list 0 -1
1) "l4"
2) "l3"
3) "l2"
4) "r1"
127.0.0.1:6379> linsert list after r1 r2 ## 后面插入元素
(integer) 5
127.0.0.1:6379> lrange list 0 -1
1) "l4"
2) "l3"
3) "l2"
4) "r1"
5) "r2"


```



**小结：**

- list 实际上是一个链表，before、after、left、right 都可以插入值
- 如果 key 不存在，创建新的链表
- 如果 key 存在，新增内容
- 如果移除了所有值，空链表，list 也相当于被移除了，查不到 key 了
- 在两边插入或者改动值，效率最高， 中间元素，相对来说效率会低一点



### hash（字典）

#### hash 数据结构

Redis 中的 Hash 和 Java的 HashMap 更加相似，都是数组+链表的结构，当发生 hash 碰撞时将会把元素追加到链表上，值得注意的是在 Redis 的 Hash 中 value 只能是字符串。

Hash 和String 都可以用来存储用户信息 ，但不同的是 Hash 可以对用户信息的每个字段单独存储；String 存的是用户全部信息经过序列化后的字符串，如果想要修改某个用户字段必须将用户信息字符串全部查询出来，解析成相应的用户信息对象，修改完后在序列化成字符串存入。而 hash 可以只对某个字段修改，从而节约网络流量，不过 hash 内存占用要大于 String，这是 hash 的缺点。



#### hash 的应用场景

- 购物车：hset [key] [field] [value] 命令， 可以实现以用户 id，商品 id 为 field，商品数量为 value，恰好构成了购物车的 3 个要素。
- 存储对象：hash 类型的 (key, field, value) 的结构与对象的 (对象id, 属性, 值) 的结构相似，也可以用来存储对象。



#### hash 的 CRUD

```shell
##########################################################################
## 新增
127.0.0.1:6379> hset myhash field1 test ## 单个设置
(integer) 1
127.0.0.1:6379> hmset myhash field1 hello field2 test field3 hash0 ## 批量设置
OK

##########################################################################
## 删除
127.0.0.1:6379> hdel myhash field1 ## 单个删除
(integer) 1
127.0.0.1:6379> hgetall myhash
1) "field2"
2) "test"
3) "field3"
4) "hash0"

##########################################################################
## 修改
127.0.0.1:6379> hget myhash field3
"hash0"
127.0.0.1:6379> hset myhash field3 5
(integer) 0
127.0.0.1:6379> hget myhash field3
"5"

##########################################################################
## 查询
127.0.0.1:6379> hget myhash field1 ## 单个获取值
"hello"

127.0.0.1:6379> hmget myhash field1 field2 field3 ## 批量获取值
1) "hello"
2) "test"
3) "hash0"

127.0.0.1:6379> hgetall myhash ## 获取全部键值
1) "field1"
2) "hello"
3) "field2"
4) "test"
5) "field3"
6) "hash0"

##########################################################################
## 操作
### hlen 获取 hash 的长度
127.0.0.1:6379> hgetall myhash
1) "field1"
2) "test"
3) "field2"
4) "hello"
5) "field3"
6) "hash0"
127.0.0.1:6379> hlen myhash
(integer) 3

##########################################################################
### hexists 判断 hash 中指定字段是否存在
127.0.0.1:6379> hgetall myhash
1) "field1"
2) "test"
3) "field2"
4) "hello"
5) "field3"
6) "hash0"
127.0.0.1:6379> hexists myhash field3
(integer) 1
127.0.0.1:6379> hexists myhash field4
(integer) 0

##########################################################################
### hkeys 只获得所有 field
### hvals 只获得所有 value
127.0.0.1:6379> hgetall myhash
1) "field1"
2) "test"
3) "field2"
4) "hello"
5) "field3"
6) "hash0"
127.0.0.1:6379> hkeys myhash
1) "field1"
2) "field2"
3) "field3"
127.0.0.1:6379> hvals myhash
1) "test"
2) "hello"
3) "hash0"

##########################################################################
### hincrby hdecrby 注意，没有 hincr hdecr
127.0.0.1:6379> hset myhash field3 5
(integer) 0
127.0.0.1:6379> hget myhash field3
"5"
127.0.0.1:6379> hincr myhash field3
(error) ERR unknown command `hincr`, with args beginning with: `myhash`, `field3`, 
127.0.0.1:6379> hincrby myhash field3 1
(integer) 6
127.0.0.1:6379> hincrby myhash field3 -1
(integer) 5

##########################################################################
### hsetnx 不存在则设置
127.0.0.1:6379> hget myhash field4
(nil)
127.0.0.1:6379> hsetnx myhash field4 0000
(integer) 1
127.0.0.1:6379> hget myhash field4
"0000"
127.0.0.1:6379> hsetnx myhash field4 1111
(integer) 0
127.0.0.1:6379> hget myhash field4
"0000"


```





### set（集合）

#### set 数据结构

Redis 中的 set 和 Java 中的 HashSet 有些类似，它内部的键值对是无序的、唯一的，**set 中的值是不能重读的**。它的内部实现相当于一个特殊的字典，字典中所有的 value 都是一个值 NULL。当集合中最后一个元素被移除之后，数据结构被自动删除，内存被回收。



#### set 的应用场景

- 好友、关注、粉丝、感兴趣的人集合：
  - `sinter`命令可以获得A和B两个用户的共同好友；
  - `sismember`命令可以判断A是否是B的好友；
  - `scard`命令可以获取好友数量；
  - 关注时，`smove`命令可以将B从A的粉丝集合转移到A的好友集合
- 首页展示随机：美团首页有很多推荐商家，但是并不能全部展示，set类型适合存放所有需要展示的内容，而`srandmember`命令则可以从中随机获取几个。
- 存储某活动中中奖的用户ID ，因为有去重功能，可以保证同一个用户不会中奖两次。



#### set 的 CRUD

```shell
##########################################################################
## 新增
127.0.0.1:6379> sadd set1 a ## 新增一个
(integer) 1
127.0.0.1:6379> sadd set1 a b c d d e f f g ## 新增多个，重复的不设置
(integer) 6
127.0.0.1:6379> sadd set2 b c c d d e d f f g d g
(integer) 6

##########################################################################
## 删除
127.0.0.1:6379> smembers set2
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"
6) "g"
127.0.0.1:6379> srem set2 g
(integer) 1
127.0.0.1:6379> smembers set2
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"

##########################################################################
## 修改

##########################################################################
## 查询
127.0.0.1:6379> smembers set1
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"
6) "g"
7) "a"

##########################################################################
## 操作
### sismember 判断元素是否存在
127.0.0.1:6379> sismember set1 a
(integer) 1
127.0.0.1:6379> sismember set2 a
(integer) 0

##########################################################################
### scard 获取集合成员数量
127.0.0.1:6379> scard set1
(integer) 7

##########################################################################
### srandmember 随机获取一个元素
127.0.0.1:6379> srandmember set1
"b"
127.0.0.1:6379> srandmember set1
"c"
127.0.0.1:6379> srandmember set1
"c"
127.0.0.1:6379> srandmember set1
"b"
127.0.0.1:6379> srandmember set1
"e"

127.0.0.1:6379> srandmember set1 2 ## 随机获取指定个数的元素
1) "b"
2) "g"
127.0.0.1:6379> srandmember set1 3
1) "b"
2) "f"
3) "a"
127.0.0.1:6379> srandmember set1 100
1) "e"
2) "b"
3) "d"
4) "f"
5) "c"
6) "g"
7) "a"

##########################################################################
### spop 随机移除一个元素
127.0.0.1:6379> smembers set1
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"
6) "g"
7) "a"
127.0.0.1:6379> spop set1
"g"
127.0.0.1:6379> spop set1
"a"
127.0.0.1:6379> smembers set1
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"

##########################################################################
### smove 将一个指定的值，移动到另外一个set集合
127.0.0.1:6379> smembers set1
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"
6) "g"
7) "a"
127.0.0.1:6379> smembers set2
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"
127.0.0.1:6379> smove set2 set1 c
(integer) 1
127.0.0.1:6379> smembers set1
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"
6) "g"
7) "a"
127.0.0.1:6379> smembers set2
1) "b"
2) "d"
3) "f"
4) "e"

##########################################################################
微博，B站，共同关注（并集）
数字集合类：
- 差集 sdiff
- 交集 sinter
- 并集 sunion

127.0.0.1:6379> smembers set1
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"
6) "g"
7) "a"
127.0.0.1:6379> smembers set2
1) "b"
2) "d"
3) "f"
4) "e"
127.0.0.1:6379> sdiff set1 set2 ## 差集
1) "c"
2) "g"
3) "a"

127.0.0.1:6379> sinter set1 set2 ## 交集
1) "b"
2) "d"
3) "f"
4) "e"

127.0.0.1:6379> sunion set1 set2 ## 并集
1) "b"
2) "d"
3) "f"
4) "e"
5) "c"
6) "g"
7) "a"


```



### zset（有序集合）

#### zset 数据结构

zset 也叫 Sorted Set一方面它是个 set ，保证了内部 value 的唯一性，另方面它可以给每个 value 赋予一个 score，代表这个 value 的排序权重。它的内部实现用的是一种叫作“跳跃列表”的数据结构。



#### zset 的应用场景

- zset 可以用做排行榜，但是和 list 不同的是 zset 它能够实现动态的排序，例如： 可以用来存储粉丝列表，value 值是粉丝的用户 ID，score 是关注时间，我们可以对粉丝列表按关注时间进行排序。

- zset 还可以用来存储学生的成绩， value 值是学生的 ID, score 是他的考试成绩。 我们对成绩按分数进行排序就可以得到他的名次。



#### zset 的 CRUD

```shell
##########################################################################
## 新增
127.0.0.1:6379> zadd myset 1 one ## 添加一个值
(integer) 1
127.0.0.1:6379> zadd myset 2 two 3 three ## 添加多个值
(integer) 2

##########################################################################
## 删除
127.0.0.1:6379> zrange salary 0 -1
1) "uu5"
2) "uu4"
3) "uu3"
4) "uu2"
5) "uu1"
127.0.0.1:6379> zrem salary uu5
(integer) 1
127.0.0.1:6379> zrange salary 0 -1
1) "uu4"
2) "uu3"
3) "uu2"
4) "uu1"

##########################################################################
## 修改


##########################################################################
## 查询
127.0.0.1:6379> ZRANGE myset 0 -1
1) "one"
2) "two"
3) "three"

### 排序查询
127.0.0.1:6379> zadd salary 100000 uu1 50000 uu2 20000 uu3 10000 uu4 5000 uu5
(integer) 5
127.0.0.1:6379> zrangebyscore salary -inf +inf ## 从小到大排序
1) "uu5"
2) "uu4"
3) "uu3"
4) "uu2"
5) "uu1"
127.0.0.1:6379> zrangebyscore salary -inf +inf withscores ## 带数值
 1) "uu5"
 2) "5000"
 3) "uu4"
 4) "10000"
 5) "uu3"
 6) "20000"
 7) "uu2"
 8) "50000"
 9) "uu1"
10) "100000"
127.0.0.1:6379> zrevrange salary 0 -1 withscores ## 从大到小排序
 1) "uu1"
 2) "100000"
 3) "uu2"
 4) "50000"
 5) "uu3"
 6) "20000"
 7) "uu4"
 8) "10000"
 9) "uu5"
10) "5000"
127.0.0.1:6379> zrangebyscore salary -inf 10000 withscores ## 数值小于等于 10000，在 (-∞, 10000]
1) "uu5"
2) "5000"
3) "uu4"
4) "10000"
127.0.0.1:6379> zrangebyscore salary 10000 +inf withscores ## 数值大于等于 10000，在 [10000, +∞)
1) "uu4"
2) "10000"
3) "uu3"
4) "20000"
5) "uu2"
6) "50000"
7) "uu1"
8) "100000"

##########################################################################
## 操作
### zcard 获取集合成员数量
127.0.0.1:6379> zrange salary 0 -1
1) "uu5"
2) "uu4"
3) "uu3"
4) "uu2"
5) "uu1"
127.0.0.1:6379> zcard salary
(integer) 5

### zcount 获取指定范围的成员数量
127.0.0.1:6379> zrange salary 0 -1 withscores
 1) "uu5"
 2) "5000"
 3) "uu4"
 4) "10000"
 5) "uu3"
 6) "20000"
 7) "uu2"
 8) "50000"
 9) "uu1"
10) "100000"
127.0.0.1:6379> zcount salary 10000 100000 ## [10000, 100000]
(integer) 4


```





## 三种特殊数据类型

### Geospatial 地理位置

朋友的定位，附近的人，打车距离计算？

Redis 的 Geo 在Redis3.2 版本就推出了！ 这个功能可以推算地理位置的信息，两地之间的距离，方圆
几里的人！



**工作原理**

sorted set使用一种称为[Geohash](https://en.wikipedia.org/wiki/Geohash)的技术进行填充。经度和纬度的位是交错的，以形成一个独特的52位整数. 我们知道，一个sorted set 的double score可以代表一个52位的整数，而不会失去精度。

这种格式允许半径查询检查的1 + 8个领域需要覆盖整个半径，并丢弃元素以外的半径。通过计算该区域的范围，通过计算所涵盖的范围，从不太重要的部分的排序集的得分，并计算得分范围为每个区域的sorted set中的查询。

**使用什么样的地球模型（Earth model）？**

这只是假设地球是一个球体，因为使用的距离公式是Haversine公式。这个公式仅适用于地球，而不是一个完美的球体。当在社交网站和其他大多数需要查询半径的应用中使用时，这些偏差都不算问题。但是，在最坏的情况下的偏差可能是0.5%，**所以一些地理位置很关键的应用还是需要谨慎考虑。**



经纬度数据查询

http://api.map.baidu.com/lbsapi/getpoint/index.html

http://www.jsons.cn/lngcode/



中文文档

https://www.redis.net.cn/order/3685.html



```shell
##########################################################################
## geoadd 添加地理位置
## 规则：两级无法直接添加，我们一般会下载城市数据，直接通过java程序一次性导入！
## 有效的经度从-180度到180度。
## 有效的纬度从-85.05112878度到85.05112878度。
## 当坐标位置超出上述指定范围时，该命令将会返回一个错误。

127.0.0.1:6379> geoadd china:city 116.431784 39.910924 beijing
(integer) 1
127.0.0.1:6379> geoadd china:city 121.462143 31.256305 shanghai
(integer) 1
127.0.0.1:6379> geoadd china:city 113.265105 23.15554 guangzhou
(integer) 1
127.0.0.1:6379> geoadd china:city 114.035088 22.615863 shenzhen
(integer) 1
127.0.0.1:6379> geoadd china:city 113.071376 28.154917 changsha
(integer) 1
127.0.0.1:6379> geoadd china:city 120.300023 30.17968 hangzhou
(integer) 1

##########################################################################
## geopos 获取指定的城市的经度和纬度
127.0.0.1:6379> geopos china:city beijing
1) 1) "116.43178313970565796"
   2) "39.9109247398676743"
127.0.0.1:6379> geopos china:city changsha
1) 1) "113.07137757539749146"
   2) "28.15491588478636942"

##########################################################################
## geodist 两地之间的距离
单位：
m 表示单位为米
km 表示单位为千米
mi 表示单位为英里
ft 表示单位为英尺

127.0.0.1:6379> geodist china:city shenzhen changsha km
"623.6430"
127.0.0.1:6379> geodist china:city shenzhen beijing km
"1936.8987"

##########################################################################
## georadius 以给定的经纬度为中心， 找出某一半径内的元素
附近的人（获得所有附近的人的地址，定位！）通过半径来查询！
获得指定数量的人，200
所有数据应该都录入：china:city ，才会让结果更加请求！

127.0.0.1:6379> georadius china:city 110 30 1000 km ## 以110，30 这个经纬度为中心，寻找方圆1000km内的城市
1) "guangzhou"
2) "shenzhen"
3) "changsha"
4) "hangzhou"
127.0.0.1:6379> georadius china:city 110 30 1000 km withdist ## 显示到中间距离的位置
1) 1) "guangzhou"
   2) "827.5358"
2) 1) "shenzhen"
   2) "914.3371"
3) 1) "changsha"
   2) "362.2640"
4) 1) "hangzhou"
   2) "991.1126"
127.0.0.1:6379> georadius china:city 110 30 1000 km withdist withcoord ## 显示他人的定位信息
1) 1) "guangzhou"
   2) "827.5358"
   3) 1) "113.2651028037071228"
      2) "23.15554086311607307"
2) 1) "shenzhen"
   2) "914.3371"
   3) 1) "114.03508991003036499"
      2) "22.61586324219657484"
3) 1) "changsha"
   2) "362.2640"
   3) 1) "113.07137757539749146"
      2) "28.15491588478636942"
4) 1) "hangzhou"
   2) "991.1126"
   3) 1) "120.30002206563949585"
      2) "30.17967902879907882"
127.0.0.1:6379> georadius china:city 110 30 1000 km withdist withcoord count 1 ## 筛选结果条数
1) 1) "changsha"
   2) "362.2640"
   3) 1) "113.07137757539749146"
      2) "28.15491588478636942"

##########################################################################
## georadiusbymember 找出位于指定元素周围的其他元素
127.0.0.1:6379> georadiusbymember china:city changsha 1000 km
1) "guangzhou"
2) "shenzhen"
3) "changsha"
4) "hangzhou"
5) "shanghai"
127.0.0.1:6379> georadiusbymember china:city changsha 1000 km withdist
1) 1) "guangzhou"
   2) "556.4007"
2) 1) "shenzhen"
   2) "623.6430"
3) 1) "changsha"
   2) "0.0000"
4) 1) "hangzhou"
   2) "737.1302"
5) 1) "shanghai"
   2) "880.6263"

##########################################################################
## geohash 返回一个或多个位置元素的 geohash 表示
## 将二维的经纬度转换为一维的字符串，如果两个字符串越接近，那么则距离越近
127.0.0.1:6379> geohash china:city shenzhen changsha
1) "ws10dvjffn0"
2) "wt02jj2n600"

##########################################################################
## geo 底层的实现原理其实就是 zset，可以使用 zset 命令来操作 geo
127.0.0.1:6379> zrange china:city 0 -1
1) "guangzhou"
2) "shenzhen"
3) "changsha"
4) "hangzhou"
5) "shanghai"
6) "beijing"
127.0.0.1:6379> zrem china:city guangzhou
(integer) 1
127.0.0.1:6379> zrange china:city 0 -1
1) "shenzhen"
2) "changsha"
3) "hangzhou"
4) "shanghai"
5) "beijing"


```



### Hyperloglog 基数统计

#### 简介

Redis 2.8.9 版本就更新了 Hyperloglog 数据结构。
Redis Hyperloglog 基数统计的算法。

优点：占用的内存是固定，2^64 不同的元素的技术，只需要废 12KB内存！如果要从内存角度来比较的话 Hyperloglog 首选！

**网页的 UV （一个人访问一个网站多次，但是还是算作一个人！）**
传统的方式， set 保存用户的 id，然后就可以统计 set 中的元素数量作为标准判断 !
这个方式如果保存大量的用户 id，就会比较麻烦，特别是用户 id 为 uuid 类型的情况！我们的目的是为了计数，而不是保存用户 id；
0.81% 错误率！统计UV任务，可以忽略不计的！



#### 什么是基数

A {1,3,5,7,8,3,7}
B {1,3,5,7,8}
基数（不重复的元素） = 5，可以接受误差！



#### 测试使用

```shell
127.0.0.1:6379> pfadd mykey1 a b c d f e g f d d a b
(integer) 1
127.0.0.1:6379> pfcount mykey1
(integer) 7
127.0.0.1:6379> pfadd mykey2 h i j k j i h g l i m g n
(integer) 1
127.0.0.1:6379> pfcount mykey2
(integer) 8
127.0.0.1:6379> pfmerge mykey3 mykey1 mykey2 ## 合并两组 mykey mykey2 => mykey3 并集
OK
127.0.0.1:6379> pfcount mykey3
(integer) 14

```



如果允许容错，那么就可以使用 Hyperloglog 。
如果不允许容错，就使用 set 或者自己的数据类型。



### ▲Bitmap 位存储

#### bitmap 原理

Bitmap 位图，是操作二进制位来进行记录，就只有 0 和 1 两个状态！

位图主要用于快速检索关键字状态，通常要求关键字是一个连续的序列（或者关键字是一个连续序列中的大部分）， 最基本的情况，使用1bit标示一个关键字的状态（可标示两种状态），但根据需要也可以使用2bit（标示4种状态），3bit（标示8种状态）。 

主要应用场合：标示连续（或接近连续，即大部分会出现）的关键字序列的状态（状态数/关键字个数 越小越好）。



#### Bitmap 空间计算
因为 BitMap 中的 bit 位 是 字符串的映射，字符串在 value 中的存储是有上限的，所以 BitMap 的valu额存储空间可以用相同的方式计算。

Redis 中字符串的最大长度是 512M，所以 BitMap 的 offset （偏移量）最大值为：
512 * 1024 *1024 * 8 = 2^32^ = 4,294,967,296 



#### 应用场景

https://cloud.tencent.com/developer/news/387248

**1、磁盘空闲块的管理**

很多文件系统采用bitmap管理磁盘空闲块，如果该块是空闲的，标为0，已使用则标为1； Ext3文件系统中使用位图来管理磁盘空闲块（空闲inode节点）。文件系统创建后，该文件系统拥有的块数以及inode节点数都是确定的，数据块区包含一系列连续的块（块号是连续的），于是可以用位图来标示数据块的分配状态（已分配、未分配两种状态，1bit即可标示）。

如下图，假设ext3的数据块从128开始，一直到1024，则需要1024-128 = 996bit = 128字节的位图空间。如下图，第1bit标示128号块已经被分配，第2bit标示129号块未被分配，依次类推。使用位图的高效性在于：1bit标示状态，节省存储空间，通过关键字来定位位图（偏移是固定的），效率高。

**2、区域服务器路由场景**

腾讯的QQ号用一个数字标示，范围从0到20亿，每个QQ号都有可能出现，所有的QQ号被分散的存储北京、上海、深圳、武汉四个城市的服务器中，现在需要一个路由服务器快速的将登陆的QQ路由到正确的服务器，路由服务器可以读取四个QQ服务器的数据，并构建路由表（需全部存在内存中，内存限制1G），路由表该如何存储？

关键：QQ号从0-20亿，每个号码都有可能出现；服务器通过0、1、2、3标示，这四种状态可以用2bit来标示，于是可以考虑使用位图来描述路由表。

解法：从0~20亿，为每个QQ号分配2bit，路由服务器从QQ服务器中获取信息，并设置QQ于服务器号的对应关系。当QQ登录时，路由服务器根据QQ号定位到其对应的状态，并返回对应的服务器号。总的内存大小20亿 * 2 /8 = 5亿字节(约为0.5G)。

**3、大量数据的快速排序、查找、去重**

关键：去掉电话号码的800后面就是7位的十进制整数，每个整数都有可能出现而且不会重复出现，可以采用各种排序算法对这些数据进行排序，但时间复杂度都在O(NlogN)及以上。

解法：因每个七位以内的整数都有可能出现，可以用1bit来标示电话号是否出现，遍历整个电话号序列，设置相应的位，遍历位图收集位被设置的号码即可，时间复杂度为O(N)；



##### 去重

2.5亿个整数中找出不重复的整数的个数，内存空间不足以容纳这2.5亿个整数。 关键：一个数字的状态只有三种，分别为不存在，只有一个，有重复。因此，我们只需要2bits就可以对一个数字的状态进行存储了，假设我们设定一个数字不存在为00，存在一次01，存在两次及其以上为11。那我们大概需要存储空间几十兆左右。

解法：遍历一次这2.5亿个数字，如果对应的状态位为00，则将其变为01；如果对应的状态位为01，则将其变为11；如果为11，,对应的状态位保持不变。 最后，我们将状态位为01的进行统计，就得到了不重复的数字个数，时间复杂度为O(n)。



##### 手机号是否注册校验

- [给你一个含有1亿个手机号码的文件，如何快速的查找某个手机号码？](https://www.oschina.net/question/4243879_2318359)
- [如何用最小内存快速判断10W个手机号是否在10亿个手机号中？](https://blog.csdn.net/weixin_39658966/article/details/110923735)



互联网时代，几乎所有的网站都想要你用手机号注册，为什么？实名要求？方便快捷？

且不说公司业务和用户数量都跟 BATJM 一线大厂一样，成百上千万用户也不小了。

当然，千万级数据，MySQL 数据库使用索引查询，一样能达到毫秒级响应。所以，换用 redis 的 bitmap，性能不一定能提升多少。但如果数据量达到上亿级别，可以考虑用 bitmap 优化校验。



**一亿个手机号占用多大存储空间？**

假设是 UTF-8 编码格式的 txt 文件。

11 位手机号，一个手机号字符串占用 11 个字节。没有算上换行符（2 字节）、字符串变量的存储空间。

1,000,000,000 = 1*10^8

1G=1024MB，1MB=1024KB，1KB=1024字节（byte）

1 * 10^8 * 11 = 1.1 * 10^9 byte ≈ 1.1 * 10^6 KB ≈ 1.1 * 10^3 MB ≈ 1.1 * 10 GB = 11 GB



**一亿个手机号文件（约11GB）怎样读取，限制 512 MB内存**

- 文件分割后逐个读取

- 文件分段读取，每段读完重置变量存储



##### 用户签到

1个用户1年会占用大约：1bit*365/8=45.625字节；

如果使用普通的 key/value，每个用户要记录 365 个，当用户量巨大时，需要的存储空间是惊人的。



```shell
## 每周签到
0  1  2 3  4  5 6
日 一 二 三 四 五 六

127.0.0.1:6379> setbit weeksign 0 1
(integer) 0
127.0.0.1:6379> setbit weeksign 1 0
(integer) 0
127.0.0.1:6379> setbit weeksign 2 1
(integer) 0
127.0.0.1:6379> setbit weeksign 3 1
(integer) 0
127.0.0.1:6379> setbit weeksign 4 1
(integer) 0
127.0.0.1:6379> setbit weeksign 5 0
(integer) 0
127.0.0.1:6379> setbit weeksign 6 0
(integer) 0

## 查看签到
127.0.0.1:6379> getbit weeksign 1
(integer) 0
127.0.0.1:6379> getbit weeksign 4
(integer) 1
127.0.0.1:6379> getbit weeksign 6
(integer) 0

## 统计每周签到次数
127.0.0.1:6379> bitcount weeksign
(integer) 4

## 注意统计周期，按字节统计，即每 8 bit 一组统计
127.0.0.1:6379> setbit test 0 1
(integer) 0
127.0.0.1:6379> setbit test 2 1
(integer) 0
127.0.0.1:6379> setbit test 7 1
(integer) 0
127.0.0.1:6379> setbit test 8 1 ## 8 为第二个字节
(integer) 0
127.0.0.1:6379> bitcount test 0 -1 ## 统计全部字节中 1 的数量
(integer) 4
127.0.0.1:6379> bitcount test 0 0 ## 统计 [0, 0] 1 个字节中 1 的数量
(integer) 3
127.0.0.1:6379> bitcount test 0 1 ## 统计 [0, 1] 2 个字节中 1 的数量
(integer) 4
127.0.0.1:6379> bitcount test 1 1 ## 统计 [1, 1] 1 个字节中 1 的数量
(integer) 1


```



##### 用户在线状态

只需要一个key，用户ID为offset，如果在线就设置为1，不在线就设置为0，1000万用户只需要100000000bit/8=1.2MB的空间。



##### 统计活跃用户

使用时间作为cacheKey，然后用户ID为offset，如果当日活跃过就设置为1;

如果想计算某几天的活跃用户呢（暂且约定，统计时间内只要有一天在线就称为活跃）。



#### bitmap 的优缺点

**优点**

1. 基于最小的单位bit进行存储，所以非常省空间。
2. 设置时候时间复杂度O(1)、读取时候时间复杂度O(n)，操作是非常快的。
3. 二进制数据的存储，进行相关计算的时候非常快。
4. 方便扩容。



**缺陷**

1. **redis 中 bit 映射被限制在 512 MB 之内，所以最大是 2^32 位。**建议每个 key 的位数都控制下，因为读取时候时间复杂度 O(n)，越大的串读的时间花销越多。
2. 不要给一个很短的 bigmap 设置很长位的偏移量的值，这样有可能堵塞。



#### bitmap 进阶

http://www.infoq.com/cn/articles/the-secret-of-bitmap/

##### 空间
redis的bitmap已经是最小单位的存储了，有没有办法对二进制存储的信息再进行压缩呢？进一步省空间？

答案是有的。
可以对记录的二进制数据进行压缩。常见的二进制压缩技术都是基于RLE（Run Length Encoding，详见http://en.wikipedia.org/wiki/Run-length_encoding）。

RLE编码很简单，比较适合有很多连续字符的数据，比如以下边的Bitmap为例：

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/bitmap-value-like.png)



可以编码为0,8,2,11,1,2,3,11

其意思是:第一位为0，连续有8个，接下来是2个1，11个0，1个1，2个0，3个1，最后是11个0（当然此处只是对RLE的基本原理解释，实际应用中的编码并不完全是这样的）。

可以预见，对于一个很大的Bitmap，如果里边的数据分布很稀疏（说明有很多大片连续的0），采用RLE编码后，占用的空间会比原始的Bitmap小很多。



##### 时间

redis虽然是在内存操作，但是超过redis指定存储在内存的阀值之后，会被搞到磁盘中。要是进行大范围的计算还需要从磁盘中取出到内存在计算比较耗时，效率也不高，有没有办法尽可能内存中多放一些数据，缩短时间？

答案是有的。

基于第一点同时引入一些对齐的技术，可以让采用RLE编码的Bitmap不需要进行解压缩，就可以直接进行AND/OR/XOR等各类计算；因此采用这类压缩技术的Bitmap，加载到内存后还是以压缩的方式存在，从而可以保证计算时候的低内存消耗；而采用word（计算机的字长，64位系统就是64bit）对齐等技术又保证了对CPU资源的高效利用。因此采用这类压缩技术的Bitmap，保持了Bitmap数据结构最重要的一个特性，就是高效的针对每个bit的逻辑运算。

常见的压缩技术包括BBC（有专利保护,WAH（http://code.google.com/p/compressedbitset/）和EWAH（http://code.google.com/p/javaewah/）。



### Redis bitmap 实现布隆过滤器

- [Google Guava之BloomFilter源码分析及基于Redis的重构](https://segmentfault.com/a/1190000012620152)
- [基于Redis的BloomFilter实现](https://segmentfault.com/a/1190000017370384)





## Stream 消息队列

- [数据类型：Stream详解](https://pdai.tech/md/db/nosql-redis/db-redis-data-type-stream.html)





## 底层数据结构

- [底层数据结构详解](https://pdai.tech/md/db/nosql-redis/db-redis-x-redis-ds.html)



![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/db-redis-object-2-3.png)





## Redis 事务

- [Redis事务详解](https://pdai.tech/md/db/nosql-redis/db-redis-x-trans.html)



### 概念

Redis 事务本质：一组命令的集合， 一个事务中的所有命令都会被序列化，在事务执行过程的中，会按照顺序执行。
一次性、顺序性、排他性，执行一系列的命令。



```shell
------ 队列 set set get 执行------
```



**Redis 事务没有隔离级别的概念。**

所有的命令在事务中，并没有直接被执行，只有发起执行命令（exec）的时候才会执。

==**Redis 单条命令式保存原子性的，但是事务不保证原子性！**==



### Redis 的事务定义

- 开启事务（multi）
- 命令入队（......）
- 执行事务（exec）



```shell
127.0.0.1:6379> multi ## 开启事务
OK
127.0.0.1:6379> set k1 v1 ## 系列命令入队
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> get v2
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> exec ## 执行事务
1) OK
2) OK
3) "v2"
4) OK

## discard 放弃事务
127.0.0.1:6379> multi ## 开启事务
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> set k4 v4
QUEUED
127.0.0.1:6379> discard ## 取消事务
OK
127.0.0.1:6379> get k4 ## 事务队列中命令都不会被执行！
(nil)

## 编译型异常（代码有问题、命令有错），事务中所有的命令都不会被执行
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set k1 v1
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> getset k3 ## 错误的命令
(error) ERR wrong number of arguments for 'getset' command
127.0.0.1:6379> set k4 v4
QUEUED
127.0.0.1:6379> set k5 v5
QUEUED
127.0.0.1:6379> exec ## 执行事务报错！
(error) EXECABORT Transaction discarded because of previous errors.
127.0.0.1:6379> get k5 ## 所有的命令都不会被执行！
(nil)

## 运行时异常（1/0）， 如果事务队列中存在语法性，那么执行命令的时候，其他命令是可以正常执行的，错误命令抛出异常
127.0.0.1:6379> set k1 "v1"
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> incr k1 ## 会执行的时候失败！
QUEUED
127.0.0.1:6379> set k2 v2
QUEUED
127.0.0.1:6379> set k3 v3
QUEUED
127.0.0.1:6379> get k3
QUEUED
127.0.0.1:6379> exec
1) (error) ERR value is not an integer or out of range ## 虽然第一条命令报错了，但是依旧正常执行成功了！
2) OK
3) OK
4) "v3"
127.0.0.1:6379> get k2
"v2"
127.0.0.1:6379> get k3
"v3"


```



> 监控！ watch （面试常问！）

**悲观锁：**
很悲观，认为什么时候都会出问题，无论做什么都会加锁！



**乐观锁：**

- 很乐观，认为什么时候都不会出问题，所以不会上锁！ 更新数据的时候去判断一下，在此期间是否有人修改过这个数据

- 获取 version

- 更新的时候比较 version



```shell
127.0.0.1:6379> set money 100
OK
127.0.0.1:6379> set out 0
OK
127.0.0.1:6379> watch money ## 监视 money 对象
OK
127.0.0.1:6379> multi ## 事务正常结束，数据期间没有发生变动，这个时候就正常执行成功！
OK
127.0.0.1:6379> DECRBY money 20
QUEUED
127.0.0.1:6379> INCRBY out 20
QUEUED
127.0.0.1:6379> exec
1) (integer) 80
2) (integer) 20
```



**测试多线程修改值 , 使用 watch 可以当做redis的乐观锁操作**

```shell
127.0.0.1:6379> watch money ## 监视 money
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> DECRBY money 10
QUEUED
127.0.0.1:6379> INCRBY out 10
QUEUED
127.0.0.1:6379> exec ## 执行之前，另外一个线程，修改了我们的值，这个时候，就会导致事务执行失败！
(nil)
## 执行失败，使用 unwatch 取消监视（非必须，不用取消也能继续重新定义并执行事务），再重新监视，执行事务


## 另一个 bash 窗口
127.0.0.1:6379> get money
"100"
127.0.0.1:6379> decrby money 50
(integer) 50
127.0.0.1:6379> get money
"50"

```





## ★Redis 持久化

- [持久化：RDB和AOF机制详解](https://pdai.tech/md/db/nosql-redis/db-redis-x-rdb-aof.html)



Redis 是内存数据库，如果不将内存中的数据库状态保存到磁盘，那么一旦服务器进程退出，或者断电，服务器中的数据库状态也会消失。所以 Redis 中重要数据需要及时保存到磁盘。



### RDB（Redis DataBase）模式

#### 什么是 RDB

在指定时间间隔后，将内存中的数据集快照写入数据库 ；在恢复时候，直接读取快照文件，进行数据的恢复。

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/RDB-%E4%BB%80%E4%B9%88%E6%98%AFRDB.jpg)



默认情况下，Redis 将数据库快照保存在名字为 dump.rdb 的二进制文件中。文件名可以在配置文件中进行自定义。



#### 工作原理

在进行 **`RDB`** 的时候，**`redis`** 的主线程是不会做 **`io`** 操作的，主线程会 **`fork`** 一个子线程来完成该操作。

1. Redis 调用forks。同时拥有父进程和子进程。
2. 子进程将数据集写入到一个临时 RDB 文件中。
3. 当子进程完成对新 RDB 文件的写入时，Redis 用新 RDB 文件替换原来的 RDB 文件，并删除旧的 RDB 文件。

这种工作方式使得 Redis 可以从写时复制（copy-on-write）机制中获益(因为是使用子进程进行写操作，而父进程依然可以接收来自客户端的请求。)

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/bd0c49a47635b7a93241f3398157191be15.png)



#### 触发机制

1. save 的规则满足的情况下，会自动触发 rdb 原则。
2. 执行 flushall 命令，也会触发 rdb 原则。
3. 退出 redis，也会自动产生 rdb 文件。



##### save

使用 `save` 命令，会立刻对当前内存中的数据进行持久化，但是会阻塞，也就是不接受其他操作了。



> 由于 `save` 命令是同步命令，会占用Redis的主进程。若Redis数据非常多时，`save`命令执行速度会非常慢，阻塞所有客户端的请求。

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/20200513215150892.jpg)



![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/20200513215220858.jpg)



##### bgsave

`bgsave` 是异步进行，进行持久化的时候，`redis` 还可以将继续响应客户端请求 。

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/2020051321523151.jpg)



**bgsave和save对比**

| 命令   | save               | bgsave                             |
| ------ | ------------------ | ---------------------------------- |
| IO类型 | 同步               | 异步                               |
| 阻塞？ | 是                 | 是（阻塞发生在fock()，通常非常快） |
| 复杂度 | O(n)               | O(n)                               |
| 优点   | 不会消耗额外的内存 | 不阻塞客户端命令                   |
| 缺点   | 阻塞客户端命令     | 需要fock子进程，消耗内存           |



#### RDB 优缺点

**优点：**

1. 适合大规模的数据恢复
2. 对数据的完整性要求不高



**缺点：**

1. 需要一定的时间间隔进行操作，如果 redis 意外宕机了，这个最后一次修改的数据就没有了。
2. fork 进程的时候，会占用一定的内存空间。



### AOF（Append Only File）模式

#### 什么是 AOF

快照功能（RDB）并不是非常耐久（durable）： 如果 Redis 因为某些原因而造成故障停机， 那么服务器将丢失最近写入、以及未保存到快照中的那些数据。 从 1.1 版本开始， Redis 增加了一种完全耐久的持久化方式： AOF 持久化。



`appendonly no yes`则表示启用 AOF。

默认是不开启的，我们需要手动配置，然后重启 redis，就可以生效了。

如果这个 aof 文件有错误或损坏，这时候 redis 是启动不起来的，可以尝试修改这个 aof 文件。

redis 给我们提供了一个工具`redis-check-aof --fix`



#### 重写规则说明

aof 默认就是文件的无限追加，文件会越来越大！

```ini
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```

如果 aof 文件大于 64m， fork 一个新的进程来将我们的文件进行重写。



#### AOF 优缺点

**优点**

1. 每一次修改都会同步，文件的完整性会更加好。
2. 每秒同步一次，可能会丢失一秒的数据。
3. 从不同步，效率最高。



**缺点**

1. 相对于数据文件来说，aof 远远大于 rdb，修复速度比 rdb 慢。
2. Aof 运行效率也要比 rdb 慢，所以 redis 默认的配置就是 rdb 持久化。



### RDB 和 AOP 选择

| 特性       | RDB    | AOF          |
| ---------- | ------ | ------------ |
| 启动优先级 | 低     | 高           |
| 体积       | 小     | 大           |
| 恢复速度   | 快     | 慢           |
| 数据安全性 | 丢数据 | 根据策略决定 |



**如何选择使用哪种持久化方式？**

一般来说， 如果想达到足以媲美 PostgreSQL 的数据安全性， 你应该同时使用两种持久化功能。

如果你非常关心你的数据， 但仍然可以承受数分钟以内的数据丢失， 那么你可以只使用 RDB 持久化。

有很多用户都只使用 AOF 持久化， 但并不推荐这种方式： 因为定时生成 RDB 快照（snapshot）非常便于进行数据库备份， 并且 RDB 恢复数据集的速度也要比 AOF 恢复的速度要快。



**扩展：**

1. RDB 持久化方式能够在指定的时间间隔内对你的数据进行快照存储。

2. AOF 持久化方式记录每次对服务器写的操作，当服务器重启的时候会重新执行这些命令来恢复原始的数据，AOF 命令以 Redis 协议追加保存每次写的操作到文件末尾，Redis 还能对 AOF 文件进行后台重写，使得 AOF 文件的体积不至于过大。

3. 只做缓存，如果你只希望你的数据在服务器运行的时候存在，你也可以不使用任何持久化。

4. 同时开启两种持久化方式

- 在这种情况下，当 redis 重启的时候会优先载入 AOF 文件来恢复原始的数据，因为在通常情况下 AOF 文件保存的数据集要比 RDB 文件保存的数据集要完整。

- RDB 的数据不实时，同时使用两者时服务器重启也只会找 AOF 文件，那要不要只使用 AOF 呢？建议不要，因为 RDB 更适合用于备份数据库（ AOF 在不断变化不好备份），快速重启，而且不会有 AOF 可能潜在的 Bug，留着作为一个万一的手段。

5. 性能建议

- 因为 RDB 文件只用作后备用途，建议只在 Slave 上持久化 RDB 文件，而且只要 15 分钟备份一次就够了，只保留 save 900 1 这条规则。

- 如果 Enable AOF，好处是在最恶劣情况下也只会丢失不超过两秒数据，启动脚本较简单只 load 自己的 AOF 文件就可以了，代价一是带来了持续的 IO，二是 AOF rewrite 的最后将 rewrite 过程中产生的新数据写到新文件造成的阻塞几乎是不可避免的。只要硬盘许可，应该尽量减少 AOF rewrite 的频率，AOF重写的基础大小默认值 64M 太小了，可以设到 5G 以上，默认超过原大小 100% 大小重写可以改到适当的数值。

- 如果不 Enable AOF ，仅靠 Master-Slave Repllcation 实现高可用性也可以，能省掉一大笔 IO，也减少了 rewrite 时带来的系统波动。代价是如果 Master/Slave 同时倒掉，会丢失十几分钟的数据，启动脚本也要比较两个 Master/Slave 中的 RDB 文件，载入较新的那个，微博就是这种架构。





## Redis 发布与订阅

### 概念

Redis 发布订阅(pub/sub)是一种消息通信模式：发送者(pub)发送消息，订阅者(sub)接收消息。



下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的关系：

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/20200513215523258.png)



当有新消息通过 PUBLISH 命令发送给频道 channel1 时， 这个消息就会被发送给订阅它的三个客户端：

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/2020051321553483.png)



### 命令

| 命令                                     | 描述                             |
| ---------------------------------------- | -------------------------------- |
| `PSUBSCRIBE pattern [pattern..]`         | 订阅一个或多个符合给定模式的频道 |
| `PUNSUBSCRIBE pattern [pattern..]`       | 退订一个或多个符合给定模式的频道 |
| `PUBSUB subcommand [argument[argument]]` | 查看订阅与发布系统状态           |
| `PUBLISH channel message`                | 向指定频道发布消息               |
| `SUBSCRIBE channel [channel..]`          | 订阅给定的一个或多个频道         |
| `SUBSCRIBE channel [channel..]`          | 退订一个或多个频道               |



### 实例

```shell
---------------------- 订阅端 ----------------------
127.0.0.1:6379> pubsub channels ## 查看活跃的频道

127.0.0.1:6379> subscribe sub01 ## 订阅 sub01 频道
subscribe
sub01
1
message ## 接收到来自 sub01 频道的消息 "hello"
sub01
hello
message ## 接收到来自 sub01 频道的消息 "吃饭了吗"
sub01
吃饭了吗

---------------------- 消息发布端 ----------------------
127.0.0.1:6379> publish sub01 hello ## 发布消息到 sub01 频道
1
127.0.0.1:6379> publish sub01 吃饭了吗
1


```



### 原理

每个 Redis 服务器进程都维持着一个表示服务器状态的 redis.h/redisServer 结构， 结构的 pubsub_channels 属性是一个字典， 这个字典就用于保存订阅频道的信息，其中，字典的键为正在被订阅的频道， 而字典的值则是一个链表， 链表中保存了所有订阅这个频道的客户端。

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/2020051321554964.png)



客户端订阅，就被链接到对应频道的链表的尾部，退订则就是将客户端节点从链表中移除。



### 缺点

1. 如果一个客户端订阅了频道，但自己读取消息的速度却不够快的话，那么不断积压的消息会使 redis 输出缓冲区的体积变得越来越大，这可能使得 redis 本身的速度变慢，甚至直接崩溃。
2. 这和数据传输可靠性有关，如果在订阅方断线，那么他将会丢失所有在短线期间发布者发布的消息。



### 应用

1. 消息订阅：公众号订阅，微博关注等等（其实更多是使用消息队列来进行实现）。
2. 多人在线聊天室。

稍微复杂的场景，会使用消息中间件 MQ 处理。





## 项目实战

### SpringBoot 整合 Redis

> 在 SpringBoot2.x 之后，原来使用的 jedis 被替换为了 lettuce。

jedis：采用的直连，多个线程操作的话，是不安全的，如果想要避免不安全的，使用 jedis pool 连接
池！ 更像 BIO 模式。

lettuce：采用 netty，实例可以再多个线程中进行共享，不存在线程不安全的情况，可以减少线程数据
了，更像 NIO 模式。



#### 添加依赖

```xml
<!-- spring boot redis 缓存引入 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- lettuce pool 缓存连接池 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```



#### redis 的自动装配

```java
/*
因为 springboot 默认集成了 redis，所以包含了 redis 的自动装配
IDEA ctrl + n 搜索 RedisAutoConfiguration redis 的自动装配类
*/
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(RedisOperations.class)
@EnableConfigurationProperties(RedisProperties.class)
@Import({ LettuceConnectionConfiguration.class, JedisConnectionConfiguration.class })
public class RedisAutoConfiguration {

	@Bean
	@ConditionalOnMissingBean(name = "redisTemplate") // 可以自己定义一个 redisTemplate 来替换这个默认的
	@ConditionalOnSingleCandidate(RedisConnectionFactory.class)
	public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
		// 默认的 RedisTemplate 没有过多的设置，redis 对象都是需要序列化
		// 两个泛型都是 Object, Object 的类型，我们后使用需要强制转换 <String, Object>
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
		template.setConnectionFactory(redisConnectionFactory);
		return template;
	}

	@Bean
	@ConditionalOnMissingBean // 由于 String 是redis中最常使用的类型，所以说单独提出来了一个 bean
	@ConditionalOnSingleCandidate(RedisConnectionFactory.class)
	public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
		StringRedisTemplate template = new StringRedisTemplate();
		template.setConnectionFactory(redisConnectionFactory);
		return template;
	}

}

```



#### 查看 redis 可配置参数

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210113233325617.png)



#### jedis 配置不生效

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210113231817716.png)



==**注意：因为 jedis 配置不会生效，redis 相关参数配置需要使用 lettuce 的参数。**==

#### RedisTemplate 默认序列化导致乱码问题

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210113232453417.png)



因为 RedisTemplate 默认使用的是 JDK 序列化，反序列化也只能使用JDK反序列化。所以 Redis 服务器并不能正确地反序列化 Key 和 args 参数，导致反序列化的结果为乱码。



**自定义 RedisTemplate，重新指定序列化方式，解决乱码问题**

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        // 将 template 泛型设置为 <String, Object>
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        // 连接工厂，默认
        template.setConnectionFactory(redisConnectionFactory);

        // key、hash 的 key 采用 String 序列化方式
        template.setKeySerializer(RedisSerializer.string());
        //template.setHashKeySerializer(RedisSerializer.string());
        // value、hash 的 value 采用 Jackson 序列化方式
        template.setDefaultSerializer(RedisSerializer.json());
        //template.setValueSerializer(RedisSerializer.json());
        //template.setHashValueSerializer(RedisSerializer.json());
        template.afterPropertiesSet();
        return template;
    }
}
```



或者：

```java
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
    @Bean
    @SuppressWarnings("all")
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
        template.setConnectionFactory(factory);
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        // key采用String的序列化方式
        template.setKeySerializer(stringRedisSerializer);
        // hash的key也采用String的序列化方式
        template.setHashKeySerializer(stringRedisSerializer);
        // value序列化方式采用jackson
        template.setValueSerializer(jackson2JsonRedisSerializer);
        // hash的value序列化方式采用jackson
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        template.afterPropertiesSet();
        return template;
    }
}
```





#### redis 配置

```yaml
spring:
  application:
    name: lizz-gateway
  #***********************redis***********************
  redis: #redis配置
    lettuce: #lettuce客户端配置
      pool: #连接池配置
        max-active: 5000 ## 连接池最大连接数（使用负值表示没有限制） 默认 8
        max-wait: 1000 ## 连接池最大阻塞等待时间（使用负值表示没有限制） 默认 -1
        max-idle: 2000 ## 连接池中的最大空闲连接 默认 8
        min-idle: 1000 ## 连接池中的最小空闲连接 默认 0
      cluster:
        refresh: #集群刷新
          adaptive: true #自动刷新集群 默认false关闭
##          period: 10M #定时刷新
    timeout: 1000 ## 连接超时时间（毫秒）
    cluster: #集群配置
      nodes: #集群节点
        - 10.2.55.88:7001
        - 10.2.55.88:7002
        - 10.2.55.88:7003
        - 10.2.55.88:7004
        - 10.2.55.88:7005
        - 10.2.55.88:7006
      max-redirects: 3 #集群中重定向最大次数
```



> redis 是单线程的，那 redis 连接池的作用意义大吗？

一个应用程序中的一个 Redis 驱动实例不需要太多的连接（一般情况下只需要一个连接实例就可以，如果有多个连接的需要可以考虑使用连接池，其实 Redis 目前处理命令的模块是单线程，在客户端多个连接多线程调用理论上没有效果）。



**SpringBoot2.3.4 配置 redis 基于 lettuce 同时支持集群与单机配置 密码加密 并使用redisson分布式锁**

https://cloud.tencent.com/developer/article/1707823

```java
import com.alibaba.druid.filter.config.ConfigTools;
import lombok.extern.slf4j.Slf4j;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.ClusterServersConfig;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.MapPropertySource;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.HashMap;
import java.util.Map;

/**
 * 自定义redis connection factory 同时支持单机与集群配置 并支持redis密码的加密
 * 若要增加更多配置项 则在lettuceConnectionFactory()中进行对应设置即可
 *
 * @author wyh
 * @date 2020/9/25 11:29
 **/
@Slf4j
@Configuration
@ConditionalOnClass(RedisTemplate.class)
public class RedisConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.password}")
    private String password;

    @Value("${public-key}")
    private String publicKey;

    private static final String SEPARATOR = ",";
    private static final String HOST_PORT_SEPARATOR = ":";

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(redisConnectionFactory);
        template.setKeySerializer(new StringRedisSerializer());
        template.setDefaultSerializer(RedisSerializer.json());
        template.afterPropertiesSet();
        return template;
    }

    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory redisConnectionFactory) {
        StringRedisTemplate template = new StringRedisTemplate();
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }

    @Bean
    public RedissonClient redissonClient() {
        Config config = new Config();
        try {
            //解密redis密码 若配置文件使用的明文密码则不需要
            String pwd = ConfigTools.decrypt(publicKey, password);
            if (host.split(SEPARATOR).length == 1) {
                config.useSingleServer().setAddress("redis://" + host).setPassword(pwd);
                return Redisson.create(config);
            } else {
                String[] split = host.split(SEPARATOR);
                ClusterServersConfig clusterServersConfig = new ClusterServersConfig();
                for (String hostAndPort : split){
                    clusterServersConfig= config.useClusterServers().addNodeAddress("redis://" + hostAndPort);
                }
                if (!clusterServersConfig.getNodeAddresses().isEmpty()){
                    clusterServersConfig.setPassword(pwd);
                }
                return Redisson.create(config);
            }
        } catch (Exception e) {
            log.error("redis连接失败 请检查密码配置", e);
        }
        return null;

    }

    @Bean
    public LettuceConnectionFactory lettuceConnectionFactory() {
        try {
            //解密redis密码 若配置文件使用的明文密码则不需要
            String pwd = ConfigTools.decrypt(publicKey, password);
            if (host.split(SEPARATOR).length == 1) {
                //单机模式
                RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration();
                configuration.setHostName(host.split(HOST_PORT_SEPARATOR)[0]);
                configuration.setPort(Integer.parseInt(host.split(HOST_PORT_SEPARATOR)[1]));
                configuration.setPassword(pwd);
                return new LettuceConnectionFactory(configuration);
            } else {
                //集群模式
                Map<String, Object> source = new HashMap<>();
                source.put("spring.redis.cluster.nodes", host);
                source.put("spring.redis.cluster.password", pwd);
                RedisClusterConfiguration redisClusterConfiguration = new RedisClusterConfiguration(
                        new MapPropertySource("RedisClusterConfiguration", source));
                return new LettuceConnectionFactory(redisClusterConfiguration);
            }
        } catch (Exception e) {
            log.error("redis连接失败 请检查密码配置", e);
        }
        return null;
    }

}
```





### redis.conf 配置文件详解

#### unit 单位

```ini
## 1k => 1000字节
## 1kb => 1024字节
## 1m => 1000000字节
## 1mb => 1024 * 1024字节
## 1g => 1000000000字节
## 1gb => 1024 * 1024 * 1024字节
## 
## 单位不区分大小写，因此1GB 1Gb 1gB都相同。
```



#### include 包含

```ini
## 包含外部配置文件
## include /path/to/local.conf
## include /path/to/other.conf
```



#### module 模块

```ini
## 在启动时加载模块。如果服务器无法加载模块
## 它会中止。可以使用多个loadmodule指令。
## 
## loadmodule /path/to/my_module.so
## loadmodule /path/to/other_module.so
```



#### network 网络

```ini
bind 127.0.0.1 ## 绑定的ip
protected-mode yes ## 保护模式
port 6379 ## 端口设置

## 客户端闲置N秒后关闭连接（0禁用）
timeout 0
```



#### general 通用

```ini
daemonize yes ## 以守护进程的方式运行，默认是 no，我们需要自己开启为yes！
pidfile /var/run/redis_6379.pid ## 如果以后台的方式运行，我们就需要指定一个 pid 文件！

## 指定服务器的详细级别。
## 这可以是以下之一：
## debug 调试（很多信息，对于开发/测试很有用）
## verbose 详细（很多很少有用的信息，但不会像调试级别那样混乱）
## notice 通知（适度冗长，可能是您想要的产品）
## warning 警告（仅记录非常重要/重要的消息）
loglevel notice
logfile "" ## 日志的文件位置名
databases 16 ## 数据库的数量，默认是 16 个数据库
always-show-logo yes ## 是否总是显示LOGO
```



#### snapshotting 快照

```ini
## 持久化，在规定的时间内，执行了多少次操作，则会持久化到文件 .rdb/.aof

## 如果900s内，如果至少有一个1 key进行了修改，我们及进行持久化操作
save 900 1
## 如果300s内，如果至少10 key进行了修改，我们及进行持久化操作
save 300 10
## 如果60s内，如果至少10000 key进行了修改，我们及进行持久化操作
save 60 10000
## 我们之后学习持久化，会自己定义这个测试！
stop-writes-on-bgsave-error yes ## 持久化如果出错，是否还需要继续工作！
rdbcompression yes ## 是否压缩 rdb 文件，需要消耗一些cpu资源！
rdbchecksum yes ## 保存rdb文件的时候，进行错误的检查校验！
dir ./ ## rdb 文件保存的目录！

```



#### replication 复制

```ini
## 主副本复制。 使用copyof作为Redis实例的副本

```



#### security 安全

```ini
## 设置redis的密码，默认是没有密码
127.0.0.1:6379> config get requirepass ## 获取redis的密码
1) "requirepass"
2) ""
127.0.0.1:6379> config set requirepass "123456" ## 设置redis的密码
OK
127.0.0.1:6379> config get requirepass ## 发现所有的命令都没有权限了
(error) NOAUTH Authentication required.
127.0.0.1:6379> ping
(error) NOAUTH Authentication required.
127.0.0.1:6379> auth 123456 ## 使用密码进行登录！
OK
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "123456"

```



#### client 客户端

```ini
maxclients 10000 ## 设置能连接上redis的最大客户端的数量

```



#### memory 内存管理

```ini
maxmemory <bytes> ## redis 配置最大的内存容量

maxmemory-policy noeviction ## 内存到达上限之后的处理策略
1、volatile-lru：只对设置了过期时间的key进行LRU（默认值）
2、allkeys-lru ： 删除lru算法的key
3、volatile-random：随机删除即将过期key
4、allkeys-random：随机删除
5、volatile-ttl ： 删除即将过期的
6、noeviction ： 永不过期，返回错误

```



#### APPEND ONLY 模式 aof 配置

```ini
appendonly no ## 默认是不开启aof模式的，默认是使用rdb方式持久化的，在大部分所有的情况下，rdb完全够用
appendfilename "appendonly.aof" ## 持久化的文件的名字
## appendfsync always ## 每次修改都会 sync。消耗性能
appendfsync everysec ## 每秒执行一次 sync，可能会丢失这1s的数据
## appendfsync no ## 不执行 sync，这个时候操作系统自己同步数据，速度最快

```





### 使用 Jedis 操作 Redis

Jedis 是 Redis 官方推荐的 java 连接开发工具。



#### 添加依赖

```xml
<!--导入jedis的包-->
<dependencies>
    <!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
    <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
        <version>3.2.0</version>
    </dependency>
    <!--fastjson-->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.62</version>
    </dependency>
</dependencies>
```



#### 常用的 API

- string
- list
- set
- hash
- zset



jedis 也只是对 redis 的命令做了对象封装，所有命令跟命令行一致。



#### 简单测试

- 连接数据库
- 操作命令
- 断开连接



```java
@Test
public void testJedis() {
    // 建立连接
    Jedis jedis = new Jedis("192.168.1.151", 6379);
    // 授权认证，默认用户是 default
    jedis.auth("default", "123456");
    // 执行 redis 命令
    System.out.println(jedis.ping());
    // 关闭连接
    jedis.close();
}
```



**事务测试**

```java
@Test
public void testTX() {
    // 建立连接
    Jedis jedis = new Jedis("192.168.1.151", 6379);
    // 授权认证，默认用户是 default
    jedis.auth("default", "123456");

    // 准备数据
    JSONObject jsonObject = new JSONObject();
    jsonObject.put("name", "test01");
    jsonObject.put("pass", "123456");
    String objStr = jsonObject.toJSONString();

    // 执行 redis 命令
    jedis.flushDB(); // 清空当前数据库数据，注意，生产环境别乱用
    Transaction multi = jedis.multi(); // 开启事务
    try {
        // 事务监视器，注意，不能使用 jedis.multi，会报错，Cannot use Jedis when in Multi. Please use Transaction or reset jedis state.
        multi.watch(objStr);
        multi.set("u1", objStr);
        multi.set("u2", objStr);
        multi.exec(); // 执行事务
    } catch (Exception e) {
        logger.error(e.getMessage());
        logger.error(e.toString());
        multi.discard(); // 放弃事务
    } finally {
        logger.info(jedis.get("u1"));
        logger.info(jedis.get("u2"));
        jedis.close(); // 关闭连接
    }
}

```





### ★缓存穿透、击穿和雪崩

#### 缓存穿透（查不存在的数据）

- **问题来源**

缓存穿透是指**缓存和数据库中都没有的数据**，而用户不断发起请求。由于缓存是不命中时被动写的，并且出于容错考虑，如果从存储层查不到数据则不写入缓存，这将导致这个不存在的数据每次请求都要到存储层去查询，失去了缓存的意义。

在流量大时，可能DB就挂掉了，要是有人利用不存在的key频繁攻击我们的应用，这就是漏洞。

如发起为id为“-1”的数据或id为特别大不存在的数据。这时的用户很可能是攻击者，攻击会导致数据库压力过大。



- **解决方案**

1. 接口层增加校验，如用户鉴权校验，id做基础校验，id\<=0的直接拦截。
2. 从缓存取不到的数据，在数据库中也没有取到，这时也可以将key-value对写为key-null，缓存有效时间可以设置短点，如30秒（设置太长会导致正常情况也没法使用）。这样可以防止攻击用户反复用同一个id暴力攻击。
3. 布隆过滤器。bloomfilter就类似于一个hash set，用于快速判某个元素是否存在于集合中，其典型的应用场景就是快速判断一个key是否存在于某容器，不存在就直接返回。布隆过滤器的关键就在于hash算法和容器大小。





**缓存空对象**

当存储层不命中后，即使返回的空对象也将其缓存起来，同时会设置一个过期时间，之后再访问这个数据将会从缓存中获取，保护了后端数据源。



![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/849c3b097effde3c0213ddbbfeabc6dd.png)



 缓存空对象会有两个问题：

1. 空值做了缓存，意味着缓存层中存了更多的键，需要更多的内存空间（如果是攻击，问题更严重），比较有效的方法是针对这类数据设置一个较短的过期时间，让其自动剔除。
2. 缓存层和存储层的数据会有一段时间窗口的不一致，可能会对业务有一定影响。例如过期时间设置为5分钟，如果此时存储层添加了这个数据，那此段时间就会出现缓存层和存储层数据的不一致，此时可以利用消息系统或者其他方式清除掉缓存层中的空对象。



**布隆过滤器**

布隆过滤器是一种数据结构，对所有可能查询的参数以 hash 形式存储，在控制层先进行校验，不符合则丢弃，从而避免了对底层存储系统的查询压力。

例如：一个推荐系统有4亿个用户id，每个小时算法工程师会根据每个用户之前历史行为计算出推荐数据放到存储层中，但是最新的用户由于没有历史行为，就会发生缓存穿透的行为，为此可以将所有推荐数据的用户做成布隆过滤器。如果布隆过滤器认为该用户id不存在，那么就不会访问存储层，在一定程度保护了存储层。



![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/02513cc8b2619d4dad87a396bc22f525.png)





**缓存空对象与布隆过滤器方案对比**

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/5602321be0a5ce097676219fb912c10f.png)



#### 缓存击穿（热点key失效）

- **问题来源**

缓存击穿是指**缓存中没有但数据库中有的数据**（一般是缓存时间到期），这时由于并发用户特别多，同时读缓存没读到数据，又同时去数据库去取数据，引起数据库压力瞬间增大，造成过大压力。

- **解决方案**

1. 设置热点数据永远不过期。
2. 接口限流与熔断，降级。重要的接口一定要做好限流策略，防止用户恶意刷接口，同时要降级准备，当接口中的某些服务不可用时候，进行熔断，失败快速返回机制。
3. 加互斥锁。



**设置热点数据永不过期**
从缓存层面来看，没有设置过期时间，所以不会出现热点 key 过期后产生的问题。



**重要接口防刷**

注册、登录、短信等重要业务接口，设置验证码，或者限制访问频率次数，防止恶意攻击。



**加互斥锁（mutex key）**
分布式锁：使用分布式锁，保证对于每个 key 同时只有一个线程去查询后端服务，其他线程没有获得分布式锁的权限，因此只需要等待即可。这种方式将高并发的压力转移到了分布式锁，因此对分布式锁的考验很大。

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210113201926608.png)



```java
public String get(key) {
      String value = redis.get(key);
      if (value == null) { // 代表缓存值过期
          // 设置3min的超时，防止del操作失败的时候，下次缓存过期一直不能load db
          // SETNX，是「SET if Not eXists」的缩写，也就是只有不存在的时候才设置，可以利用它来实现锁的效果。
          if (redis.setnx(key_mutex, 1, 3 * 60) == 1) { // 代表设置成功
              value = db.get(key);
              redis.set(key, value, expire_secs);
              redis.del(key_mutex);
          } else { // 这个时候代表同时候的其他线程已经load db并回设到缓存了，这时候重试获取缓存值即可
              sleep(50);
              get(key); // 重试
          }
      } else {
          return value;      
      }
 }
```





#### 缓存雪崩（整体同时失效）

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/a7f0e46f62863f0453d3cb53102125c5.png)



- **问题来源**

缓存雪崩是指缓存中**数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至down机**。和缓存击穿不同的是，缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。

- **解决方案**

1. 缓存数据的过期时间设置随机，防止同一时间大量数据过期现象发生。
2. 使用 redis 集群或分布式部署，热点数据分散在多个主机，分担并发压力。
3. 数据预热，在正式部署之前，先把可能的数据先预先访问一遍，这样部分可能大量访问的数据就会加载到缓存中。
4. 设置热点数据永远不过期，会占用一些内存。





#### 缓存污染（缓存垃圾）

缓存污染问题说的是缓存中一些只会被访问一次或者几次的的数据，被访问完后，再也不会被访问到，但这部分数据依然留存在缓存中，消耗缓存空间。

缓存污染会随着数据的持续增加而逐渐显露，随着服务的不断运行，缓存中会存在大量的永远不会再次被访问的数据。缓存空间是有限的，如果缓存空间满了，再往缓存里写数据时就会有额外开销，影响Redis性能。这部分额外开销主要是指写的时候判断淘汰策略，根据淘汰策略去选择要淘汰的数据，然后进行删除操作。



解决方案：

1. 尽可能规范设置缓存使用时长，谨慎使用不过期缓存。
2. 排查代码内部、缓存内部是否存在不过期且不再使用的缓存。





#### 数据库和缓存一致性

**不管是先写MySQL数据库，再删除Redis缓存；还是先删除缓存，再写库，都有可能出现数据不一致的情况**。



举一个例子：

1. 如果删除了缓存Redis，还没有来得及写库MySQL，另一个线程就来读取，发现缓存为空，则去数据库中读取数据写入缓存，此时缓存中为脏数据。

2. 如果先写了库，在删除缓存前，写库的线程宕机了，没有删除掉缓存，则也会出现数据不一致情况。





#### 缓存空间分配

系统的设计选择是一个权衡的过程：大容量缓存是能带来性能加速的收益，但是成本也会更高，而小容量缓存不一定就起不到加速访问的效果。一般来说，**建议把缓存容量设置为总数据量的 15% 到 30%，兼顾访问性能和内存空间开销**。

```bash
CONFIG SET maxmemory 1gb
```



#### 缓存更新策略

 缓存中的数据会和数据源中的真实数据有一段时间窗口的不一致，需要利用某些策略进行更新。



主要的缓存更新策略：

1. LRU/LFU/FIFO算法剔除：剔除算法通常用于缓存使用量超过了预设的最大值时候，如何对现有的数据进行剔除。例如Redis使用maxmemory-policy这个配置作为内存最大值后对于数据的剔除策略。

2. 超时剔除：通过给缓存数据设置过期时间，让其在过期时间后自动删除，例如Redis提供的expire命令。如果业务可以容忍一段时间内，缓存层数据和存储层数据不一致，那么可以为其设置过期时间。在数据过期后，再从真实数据源获取数据，重新放到缓存并设置过期时间。例如一个视频的描述信息，可以容忍几分钟内数据不一致，但是涉及交易方面的业务，后果可想而知。

3. 主动更新：应用方对于数据的一致性要求高，需要在真实数据更新后，立即更新缓存数据。例如可以利用消息系统或者其他方式通知缓存更新。



**三种常见更新策略的对比**

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/f8339324f02d765e7913a5091f90f8d5.png)



建议：

1. 低一致性业务建议配置最大内存和淘汰策略的方式使用。
2. 高一致性业务可以结合使用超时剔除和主动更新，这样即使主动更新出了问题，也能保证数据过期时间后删除脏数据。





### ★主从复制

- [主从复制详解](https://pdai.tech/md/db/nosql-redis/db-redis-x-copy.html)



![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/db-redis-copy-1.png)



#### 概念

 主从复制，是指将一台Redis服务器的数据，复制到其他的Redis服务器。前者称为主节点（Master/Leader）,后者称为从节点（Slave/Follower）， **数据的复制是单向的！只能由主节点复制到从节点**（主节点以写为主、从节点以读为主）。

默认情况下，每台Redis服务器都是主节点，一个主节点可以有0个或者多个从节点，但每个从节点只能由一个主节点。



#### 作用

1. **数据冗余**：主从复制实现了数据的热备份，是持久化之外的一种数据冗余的方式。
2. **故障恢复**：当主节点故障时，从节点可以暂时替代主节点提供服务，是一种服务冗余的方式
3. **负载均衡**：在主从复制的基础上，配合读写分离，由主节点进行写操作，从节点进行读操作，分担服务器的负载；尤其是在多读少写的场景下，通过多个从节点分担负载，提高并发量。
4. **高可用**：主从复制还是哨兵和集群能够实施的基础。



#### 原理

- `全量（同步）复制`：比如第一次同步时
- `增量（同步）复制`：只会把主从库网络断连期间主库收到的命令，同步给从库



#### 优缺点

**优点：**

- 支持主从复制，主机会自动将数据同步到从机，可以进行读写分离。
- 为了分载 Master 的读操作压力，Slave 服务器可以为客户端提供只读操作的服务，写服务仍然必须由Master来完成。
- Slave 同样可以接受其它 Slaves 的连接和同步请求，这样可以有效的分载 Master 的同步压力。
- Master Server 是以非阻塞的方式为 Slaves 提供服务。所以在 Master-Slave 同步期间，客户端仍然可以提交查询或修改请求。
- Slave Server 同样是以非阻塞的方式完成数据同步。在同步期间，如果有客户端提交查询请求，Redis则返回同步之前的数据。

**缺点：**

- Redis不具备自动容错和恢复功能，主机从机的宕机都会导致前端部分读写请求失败，需要等待机器重启或者手动切换前端的IP才能恢复（**也就是要人工介入**）。
- 主机宕机，宕机前有部分数据未能及时同步到从机，切换IP后还会引入数据不一致的问题，降低了系统的可用性。
- 如果多个 Slave 断线了，需要重启的时候，尽量不要在同一时间段进行重启。因为只要 Slave 启动，就会发送sync 请求和主机全量同步，当多个 Slave 重启的时候，可能会导致 Master IO 剧增从而宕机。
- Redis 较难支持在线扩容，在集群容量达到上限时在线扩容会变得很复杂。



#### 环境配置

在讲解配置文件的时候，注意到有一个`replication`模块。

```shell
127.0.0.1:6379> info replication ## 查看当前库的信息
## Replication
role:master ## 角色
connected_slaves:0 ## 从机数量
master_replid:12718893ecb6bcdc4880ab2217c38b4ce5477f2a
master_replid2:0000000000000000000000000000000000000000
master_repl_offset:0
second_repl_offset:-1
repl_backlog_active:0
repl_backlog_size:1048576
repl_backlog_first_byte_offset:0
repl_backlog_histlen:0

```



既然需要启动多个服务，就需要多个配置文件。每个配置文件对应修改以下信息：

- 端口号
- pid文件名
- 日志文件名
- rdb文件名



启动单机多服务集群：

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/20200513215610163.png)



#### 一主二从配置

> 实际开放工作中，单机多服务的集群方式，几乎作用不大，通常是多台主机服务搭建集群。

==默认情况下，每台 Redis 服务器都是主节点；==一般情况下只用配置从机就好了。

认老大！一主（6379）二从（6380，6381）



使用`slaveof host port`就可以为从机配置主机了。

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/20200513215637483.png)



主机上也能看到从机的状态：

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/20200513215645778.png)



注意：

使用命令搭建，是暂时的，==真实开发中应该在从机的配置文件中进行配置，==配置文件设置是永久的。

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/20200513215654634.png)



**使用规则**

1. 从机只能读，不能写，主机可读可写但是多用于写。

```shell
127.0.0.1:6381> set name test0000 ## 从机6381写入失败
(error) READONLY You can't write against a read only replica.

127.0.0.1:6380> set name test0000 ## 从机6380写入失败
(error) READONLY You can't write against a read only replica.

127.0.0.1:6379> set name test0000
OK
127.0.0.1:6379> get name
"test0000"

```



2. 当主机断电宕机后，默认情况下从机的角色不会发生变化 ，集群中只是失去了写操作，当主机恢复以后，又会连接上从机恢复原状。

3. 当从机断电宕机后，若不是使用配置文件配置的从机，再次启动后作为主机是无法获取之前主机的数据的，若此时重新配置称为从机，又可以获取到主机的所有数据。这里就要提到一个同步原理。

4. 第二条中提到，默认情况下，主机故障后，不会出现新的主机，有两种方式可以产生新的主机：

- 从机手动执行命令`slaveof no one`,这样执行以后从机会独立出来成为一个主机
- 使用哨兵模式（自动选举）



> 如果没有老大了，这个时候能不能选择出来一个老大呢？手动！

如果主机断开了连接，我们可以使用`SLAVEOF no one`让自己变成主机。其他的节点就可以手动连接到最新的主节点（手动）。如果这个时候老大修复了，那么就重新连接。



**层层链路**

上一个 M 链接下一个 S。

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210114222625270.png)



这种情况也可以完成主从复制。



#### ▲哨兵模式

- [Redis 哨兵模式实战](https://www.jianshu.com/p/252df87af1ae)
- [Redis-主从复制+哨兵](https://blog.51cto.com/u_15372150/5173202)



![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/5ee7092c00ac42abbc835b494639df44.png)



注意：redis 入口 IP 为虚拟 IP，并不是固定某一台主机的IP，否则不能实现高可用。



##### 概述

自动选取老大的模式。

主从切换技术的方法是：当主服务器宕机后，需要手动把一台从服务器切换为主服务器，这就需要人工干预，费事费力，还会造成一段时间内服务不可用。这不是一种推荐的方式，更多时候，我们优先考虑哨兵模式。Redis从2.8开始正式提供了Sentinel（哨兵） 架构来解决这个问题。

谋朝篡位的自动版，能够后台监控主机是否故障，如果故障了根据投票数自动将从库转换为主库。

哨兵模式是一种特殊的模式，首先 Redis 提供了哨兵的命令，哨兵是一个独立的进程，作为进程，它会独立运行。其原理是哨兵通过发送命令，等待 Redis 服务器响应，从而监控运行的多个 Redis 实例。



![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/11320039-57a77ca2757d0924.png)



这里的哨兵有两个作用

- 通过发送命令，让 Redis 服务器返回监控其运行状态，包括主服务器和从服务器。
- 当哨兵监测到 master 宕机，会自动将 slave 切换成 master，然后通过**发布订阅模式**通知其他的从服务器，修改配置文件，让它们切换主机。

然而一个哨兵进程对 Redis 服务器进行监控，可能会出现问题，为此，可以使用多个哨兵进行监控。各个哨兵之间还会进行监控，这样就形成了多哨兵模式。

假设主服务器宕机，哨兵1先检测到这个结果，系统并不会马上进行 failover 过程，仅仅是哨兵1主观的认为主服务器不可用，这个现象成为**主观下线**。当后面的哨兵也检测到主服务器不可用，并且数量达到一定值时，那么哨兵之间就会进行一次投票，投票的结果由一个哨兵发起，进行 failover 操作。切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的从服务器实现切换主机，这个过程称为**客观下线**。这样对于客户端而言，一切都是透明的。



##### 场景

适用于中型项目，能都承担多台 redis 服务器的成本。



- 一主一从一哨兵：两台 redis 服务器
- 一主两从三哨兵：三台 redis 服务器





##### 配置

配置3个哨兵和1主2从的Redis服务器来演示这个过程。

| 服务类型 | 是否是主服务器 | IP地址         | 端口  |
| -------- | -------------- | -------------- | ----- |
| Redis    | 是             | 192.168.11.128 | 6379  |
| Redis    | 否             | 192.168.11.129 | 6379  |
| Redis    | 否             | 192.168.11.130 | 6379  |
| Sentinel | -              | 192.168.11.128 | 26379 |
| Sentinel | -              | 192.168.11.129 | 26379 |
| Sentinel | -              | 192.168.11.130 | 26379 |



![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/11320039-3f40b17c0412116c.png)



首先配置Redis的主从服务器，修改redis.conf文件

> 注意：修改配置文件之前记得先备份，免得操作失误无法回滚，切记！！！

```ini
## 使得Redis服务器可以跨网络访问
bind 0.0.0.0
## 设置密码
requirepass "123456"
## 指定主服务器，注意：有关slaveof的配置只是配置从服务器，主服务器不需要配置
slaveof 192.168.11.128 6379
## 主服务器密码，注意：有关slaveof的配置只是配置从服务器，主服务器不需要配置
masterauth 123456
```



上述内容主要是配置Redis服务器，从服务器比主服务器多一个slaveof的配置和密码。

配置3个哨兵，每个哨兵的配置都是一样的。在Redis安装目录下有一个sentinel.conf文件，copy一份进行修改

```ini
## 禁止保护模式
protected-mode no
## 配置监听的主服务器，这里sentinel monitor代表监控，mymaster代表服务器的名称，可以自定义，192.168.11.128代表监控的主服务器，6379代表端口，2代表只有两个或两个以上的哨兵认为主服务器不可用的时候，才会进行failover操作。
sentinel monitor mymaster 192.168.11.128 6379 2
## sentinel author-pass定义服务的密码，mymaster是服务名称，123456是Redis服务器密码
## sentinel auth-pass <master-name> <password>
sentinel auth-pass mymaster 123456
```



上述关闭了保护模式，便于测试。

有了上述的修改，我们可以进入Redis的安装目录的src目录，通过下面的命令启动服务器和哨兵

```shell
## 启动Redis服务器进程
./redis-server ../redis.conf
## 启动哨兵进程
./redis-sentinel ../sentinel.conf
```



注意启动的顺序。**首先是主机（192.168.11.128）的Redis服务进程，然后启动从机的服务进程，最后启动3个哨兵的服务进程。**

线上 Redis 集群的高可用推荐`一主两从三哨兵`（至少一主一从三哨兵），内存淘汰策略为`allkey-lru`。



> 完整的哨兵模式配置文件 sentinel.conf

```properties
## Example sentinel.conf

## 哨兵sentinel实例运行的端口 默认26379
port 26379

## 哨兵sentinel的工作目录
dir /tmp

## 哨兵sentinel监控的redis主节点的 ip port 
## master-name 可以自己命名的主节点名字 只能由字母A-z、数字0-9 、这三个字符".-_"组成。
## quorum 当这些quorum个数sentinel哨兵认为master主节点失联 那么这时 客观上认为主节点失联了
## sentinel monitor <master-name> <ip> <redis-port> <quorum>
sentinel monitor mymaster 127.0.0.1 6379 1

## 当在Redis实例中开启了requirepass foobared 授权密码 这样所有连接Redis实例的客户端都要提供密码
## 设置哨兵sentinel 连接主从的密码 注意必须为主从设置一样的验证密码
## sentinel auth-pass <master-name> <password>
sentinel auth-pass mymaster MySUPER--secret-0123passw0rd

## 指定多少毫秒之后 主节点没有应答哨兵sentinel 此时 哨兵主观上认为主节点下线 默认30秒
## sentinel down-after-milliseconds <master-name> <milliseconds>
sentinel down-after-milliseconds mymaster 30000

## 这个配置项指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行 同步，
这个数字越小，完成failover所需的时间就越长，
但是如果这个数字越大，就意味着越 多的slave因为replication而不可用。
可以通过将这个值设为 1 来保证每次只有一个slave 处于不能处理命令请求的状态。
## sentinel parallel-syncs <master-name> <numslaves>
sentinel parallel-syncs mymaster 1

## 故障转移的超时时间 failover-timeout 可以用在以下这些方面： 
#1. 同一个sentinel对同一个master两次failover之间的间隔时间。
#2. 当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那里同步数据时。
#3.当想要取消一个正在进行的failover所需要的时间。 
#4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来了
## 默认三分钟
## sentinel failover-timeout <master-name> <milliseconds>
sentinel failover-timeout mymaster 180000

## SCRIPTS EXECUTION

#配置当某一事件发生时所需要执行的脚本，可以通过脚本来通知管理员，例如当系统运行不正常时发邮件通知相关人员。
#对于脚本的运行结果有以下规则：
#若脚本执行后返回1，那么该脚本稍后将会被再次执行，重复次数目前默认为10
#若脚本执行后返回2，或者比2更高的一个返回值，脚本将不会重复执行。
#如果脚本在执行过程中由于收到系统中断信号被终止了，则同返回值为1时的行为相同。
#一个脚本的最大执行时间为60s，如果超过这个时间，脚本将会被一个SIGKILL信号终止，之后重新执行。

#通知型脚本:当sentinel有任何警告级别的事件发生时（比如说redis实例的主观失效和客观失效等等），将会去调用这个脚本，
#这时这个脚本应该通过邮件，SMS等方式去通知系统管理员关于系统不正常运行的信息。调用该脚本时，将传给脚本两个参数，
#一个是事件的类型，
#一个是事件的描述。
#如果sentinel.conf配置文件中配置了这个脚本路径，那么必须保证这个脚本存在于这个路径，并且是可执行的，否则sentinel无法正常启动成功。
#通知脚本
## sentinel notification-script <master-name> <script-path>
  sentinel notification-script mymaster /var/redis/notify.sh

## 客户端重新配置主节点参数脚本
## 当一个master由于failover而发生改变时，这个脚本将会被调用，通知相关的客户端关于master地址已经发生改变的信息。
## 以下参数将会在调用脚本时传给脚本:
## <master-name> <role> <state> <from-ip> <from-port> <to-ip> <to-port>
## 目前<state>总是“failover”,
## <role>是“leader”或者“observer”中的一个。 
## 参数 from-ip, from-port, to-ip, to-port是用来和旧的master和新的master(即旧的slave)通信的
## 这个脚本应该是通用的，能被多次调用，不是针对性的。
## sentinel client-reconfig-script <master-name> <script-path>
sentinel client-reconfig-script mymaster /var/redis/reconfig.sh

```



##### 哨兵模式优缺点

**优点：**

1. 哨兵集群，基于主从复制模式，所有主从复制的优点，它都有。
2. 主从可以切换，故障可以转移，系统的可用性更好。
3. 哨兵模式是主从模式的升级，手动到自动，更加健壮。



**缺点：**

1. 写并发压力。只有一个写主节点，高并发压力大。
2. 海量数据存储压力。哨兵模式水平扩展麻烦，不满足高可拓需求。
3. 主节点宕机重启之后，不会自动设置为主节点？



##### SpringBoot 整合 redis sentinel

- [SpringBoot结合Redis哨兵模式的实现 (lettuce)](https://juejin.cn/post/6844904134181666824)
- [Spring Boot 整合Redis哨兵，集群模式实践 (jedis)](https://www.cnblogs.com/spec-dog/p/12572120.html)





### ▲Redis Cluster

- [Redis Cluster 详解](https://pdai.tech/md/db/nosql-redis/db-redis-x-cluster.html)

- [那些年用过的Redis集群架构（含面试解析）](https://www.cnblogs.com/rjzheng/p/10360619.html)



#### 概述

Redis Cluster 是一种服务器 Sharding 技术，3.0版本开始正式提供。

Redis 的哨兵模式基本已经可以实现高可用，读写分离 ，但是在这种模式下每台 Redis 服务器都存储相同的数据，很浪费内存，所以在 redis3.0上加入了 Cluster 集群模式，实现了 Redis 的分布式存储，**也就是说每台 Redis 节点上存储不同的内容**。



**Redis 支持三种集群方案**

- 主从复制模式
- Sentinel（哨兵）模式
- Cluster 模式



#### 工作原理

![img](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/725429-20190210232938106-559726452.png)



- 客户端与 Redis 节点直连，不需要中间 Proxy 层，直接连接任意一个 Master 节点。
- 根据公式`HASH_SLOT=CRC16(key) mod 16384`，计算出映射到哪个分片上，然后 Redis 会去相应的节点进行操作。



> 为什么 Redis 集群有 16384 个 hash slot 哈希槽？

- [为什么Redis集群有16384个槽](https://www.cnblogs.com/rjzheng/p/11430592.html)



**结论：**

1. **如果槽位为 65536，发送心跳信息的消息头达 8k，发送的心跳包过于庞大。**

如上所述，在消息头中，最占空间的是`myslots[CLUSTER_SLOTS/8]`。
当槽位为 65536 时，这块的大小是：
`65536÷8÷1024=8kb`
因为每秒钟，redis 节点需要发送一定数量的 ping 消息作为心跳包，如果槽位为 65536，这个 ping 消息的消息头太大了，浪费带宽。



2. **redis 的集群主节点数量基本不可能超过 1000 个。**

如上所述，集群节点越多，心跳包的消息体内携带的数据越多。如果节点过 1000 个，也会导致网络拥堵。因此 redis 作者，不建议 redis cluster 节点数量超过 1000 个。
那么，对于节点数在 1000 以内的 redis cluster 集群，16384 个槽位够用了。没有必要拓展到 65536 个。



3. **槽位越小，节点少的情况下，压缩比高。**

Redis 主节点的配置信息中，它所负责的哈希槽是通过一张 bitmap 的形式来保存的，在传输过程中，会对 bitmap 进行压缩，但是如果bitmap 的填充率 slots/N 很高的话(N表示节点数)，bitmap 的压缩率就很低。
如果节点数很少，而哈希槽数量很多的话，bitmap 的压缩率就很低。

`ps`：文件压缩率指的是，文件压缩前后的大小比。



**综上所述，作者决定取 16384 个槽，不多不少，刚刚好！**



#### Redis Cluster 优缺点

**优点：**

1. 无需 Sentinel 哨兵监控，如果 Master 挂了，Redis Cluster 内部自动将 Slave 切换 Master。
2. 可以进行水平扩容。
3. 支持自动化迁移，当出现某个 Slave 宕机了，那么就只有 Master 了，这时候的高可用性就无法很好的保证了，万一 master 也宕机了，咋办呢？ 针对这种情况，如果说其他 Master 有多余的 Slave ，集群自动把多余的 Slave 迁移到没有 Slave 的 Master 中。



**缺点：**

1. 批量操作是个坑。
2. 资源隔离性较差，容易出现相互影响的情况。



#### Redis Cluster 项目实战

##### 集群规划

根据官方推荐，集群部署至少要 3 台以上的master节点，最好使用 3 主 3 从六个节点的模式。



| 节点            | 配置           | 端口 |
| --------------- | -------------- | ---- |
| cluster-master1 | redis7001.conf | 7001 |
| cluster-master2 | redis7002.conf | 7002 |
| cluster-master3 | redis7003.conf | 7003 |
| cluster-slave1  | redis7004.conf | 7004 |
| cluster-slave2  | redis7006.conf | 7005 |
| cluster-slave3  | redis7006.conf | 7006 |



##### 配置文件

咱们准备 6 个配置文件 ，端口 7001，7002，7003，7004，7005，7006

分别命名成 redis7001.conf ......redis7006.conf

redis7001.conf 配置文件内容如下(记得复制6份并替换端口号)

```properties
## 端口
port 7001  
## 启用集群模式
cluster-enabled yes 
## 根据你启用的节点来命名，最好和端口保持一致，这个是用来保存其他节点的名称，状态等信息的
cluster-config-file nodes_7001.conf 
## 超时时间
cluster-node-timeout 5000
## 开启 aof 持久化模式
appendonly yes
## 后台运行
daemonize yes
## 测试环境关闭保护模式
protected-mode no 
pidfile /var/run/redis_7001.pid
```



##### 启动 redis 节点

- 挨个启动节点

```shell
redis-server redis7001.conf
...
redis-server redis7006.conf
```

![image-20200601002803562](https://www.m1yellow.cn/doc-img/Redis%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/1460000022808591.png)



- 启动集群

```shell
## 执行命令
## --cluster-replicas 1 命令的意思是创建master的时候同时创建一个slave

$ redis-cli --cluster create 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 127.0.0.1:7006 --cluster-replicas 1


## 执行成功结果如下
## 我们可以看到 7001，7002，7003 成为了 master 节点，
## 分别占用了 slots [0-5460]，[5461-10922]，[10923-16383]
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica 127.0.0.1:7005 to 127.0.0.1:7001
Adding replica 127.0.0.1:7006 to 127.0.0.1:7002
Adding replica 127.0.0.1:7004 to 127.0.0.1:7003
>>> Trying to optimize slaves allocation for anti-affinity
[WARNING] Some slaves are in the same host as their master
M: 0313641a28e42014a48cdaee47352ce88a2ae083 127.0.0.1:7001
   slots:[0-5460] (5461 slots) master
M: 4ada3ff1b6dbbe57e7ba94fe2a1ab4a22451998e 127.0.0.1:7002
   slots:[5461-10922] (5462 slots) master
M: 719b2f9daefb888f637c5dc4afa2768736241f74 127.0.0.1:7003
   slots:[10923-16383] (5461 slots) master
S: 987b3b816d3d1bb07e6c801c5048b0ed626766d4 127.0.0.1:7004
   replicates 4ada3ff1b6dbbe57e7ba94fe2a1ab4a22451998e
S: a876e977fc2ff9f18765a89c12fbd2c5b5b1f3bf 127.0.0.1:7005
   replicates 719b2f9daefb888f637c5dc4afa2768736241f74
S: ac8d6c4067dec795168ca705bf16efaa5f04095a 127.0.0.1:7006
   replicates 0313641a28e42014a48cdaee47352ce88a2ae083
Can I set the above configuration? (type 'yes' to accept): yes 
## 这里有个要手动输入 yes 确认的过程
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
...
>>> Performing Cluster Check (using node 127.0.0.1:7001)
M: 0313641a28e42014a48cdaee47352ce88a2ae083 127.0.0.1:7001
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
M: 4ada3ff1b6dbbe57e7ba94fe2a1ab4a22451998e 127.0.0.1:7002
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: ac8d6c4067dec795168ca705bf16efaa5f04095a 127.0.0.1:7006
   slots: (0 slots) slave
   replicates 0313641a28e42014a48cdaee47352ce88a2ae083
S: a876e977fc2ff9f18765a89c12fbd2c5b5b1f3bf 127.0.0.1:7005
   slots: (0 slots) slave
   replicates 719b2f9daefb888f637c5dc4afa2768736241f74
M: 719b2f9daefb888f637c5dc4afa2768736241f74 127.0.0.1:7003
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: 987b3b816d3d1bb07e6c801c5048b0ed626766d4 127.0.0.1:7004
   slots: (0 slots) slave
   replicates 4ada3ff1b6dbbe57e7ba94fe2a1ab4a22451998e
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.

```



##### 数据验证

```shell
## 注意 集群模式下要带参数 -c，表示集群，否则不能正常存取数据！！！
[root@localhost redis-5.0.5]## redis-cli -p 7100 -c
## 设置 k1 v1
127.0.0.1:7001> set k1 v1
-> Redirected to slot [12706] located at 127.0.0.1:7003
OK
## 这可以看到集群的特点:把数据存到计算得出的 slot，这里还自动跳到了 7003
127.0.0.1:7003> get k1
"v1"

## 我们还回到 7001 获取 k1 试试
[root@localhost redis-5.0.5]## redis-cli -p 7001 -c
127.0.0.1:7001> get k1
-> Redirected to slot [12706] located at 127.0.0.1:7003
"v1"
## 我们可以看到重定向的过程
127.0.0.1:7003> 

```



#### 相关面试题











