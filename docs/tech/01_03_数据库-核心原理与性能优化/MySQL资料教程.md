---
title: MySQL资料教程
date: 2022-11-02 16:28:41
category:
    - 数据库
tag:
    - MySQL
---

# 基础概念

> 只会照搬照抄代码和简单的 CRUD，基本混饭吃
> 熟练操作系统，数据结构与算法，当一个不错的程序猿
> 掌握离散数学、数字电路、编译原理、体系结构，+ 实战经验 = 高级/优秀程序猿



## 数据库概念

1. 数据库（DB 、DataBase）
2. 概念：数据仓库，**软件**，安装在操作系统（windows，linux，mac，…）之上！SQL，可以存储大量的数据。500万！
3. 作用：存储数据、管理数据



## 为什么学习数据库

1. 岗位需求
2. 现在的世界，大数据时代~，得数据库者得天下
3. 被迫需求：存数据
4. **数据库是所有软件体系中最核心的存在**



## 数据库分类

### 关系型数据库：（SQL）

- MySQL、Oracle、Sql server、 DB2、SQLlite
- 通过表和表之间，行和列之间的关系进行数据的存储，学员信息表，考勤表…



### 非关系型数据库：（NoSQL）not only

- Redis、MongDB
- 非关系型数据库，对象存储，通过对象的自身属性来决定



## 什么是 DBMS

**DBMS（数据库管理系统）**

- 数据库管理系统 ( **D**ata**B**ase **M**anagement **S**ystem )
- 数据库管理软件 , 科学组织和存储数据 , 高效地获取和维护数据

说白了就是一个管理数据的系统窗口，操作和管理存放在磁盘文件或内存中数据内容。



## MySQL 简介

**概念 :** 是现在**流行的**、**开源的**、**免费的**，**关系型**数据库。

**历史 :** 由瑞典 MySQL AB 公司开发，目前属于 Oracle 旗下产品。

**特点 :** 

- 免费 , 开源数据库
- 小巧 , 功能齐全
- 使用便捷
- 可运行于Windows或Linux操作系统
- 可适用于中小型甚至大型网站应用

**官网 :** https://www.mysql.com



## 安装 MySQL

这里使用压缩版安装。安装教程网上很多。

### 软件下载

mysql5.7 64位下载地址:

https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.19-winx64.zip

电脑系统是64位的就下载使用64位版本的！



### 安装步骤

1. 下载后得到zip压缩包.

2. 解压到自己想要安装到的目录，解压到的是D:\Environment\mysql-5.7.19

3. 添加环境变量：我的电脑->属性->高级->环境变量

```
选择PATH,在其后面添加: 你的mysql 安装文件下面的bin文件夹
```

4. 编辑 my.ini 文件 ,注意替换路径位置

```ini
[mysqld]
basedir=D:\Program Files\mysql-5.7\
datadir=D:\Program Files\mysql-5.7\data\
port=3306
skip-grant-tables
```

5. 启动管理员模式下的CMD，并将路径切换至mysql下的bin目录，然后输入mysqld –install (安装mysql)

6. 再输入  mysqld --initialize-insecure --user=mysql 初始化数据文件

7. 然后再次启动mysql 然后用命令 mysql –u root –p 进入mysql管理界面（密码可为空）

8. 进入界面后更改root密码

```mysql
update mysql.user set authentication_string=password('123456') where user='root' and Host = 'localhost';
```

9. 刷新权限

```mysql
flush privileges;
```

10. 修改 my.ini 文件删除最后一句 skip-grant-tables

11. 重启 mysql 即可正常使用

```bash
net stop mysql
net start mysql
```

12. 连接测试



### 配置文件 my.ini 详解

- [MySQL 配置文件 my.ini 详解](https://blog.csdn.net/qq_37141978/article/details/106906666)
- [配置文件my.ini或my.cnf的详解](https://blog.csdn.net/qq_34802511/article/details/89852340)
- [my.cnf配置文件常用选项说明](http://www.linuxe.cn/post-631.html)
- [MySQL——my.cnf参数设置说明](https://www.cnblogs.com/small-wei/p/11993241.html)
- [MySql5.7配置文件my.cnf设置](https://juejin.cn/post/6844904101755486222)



#### 配置文件 my.ini 或 my.cnf 的位置

```
/*
1、Windows下MySQL的配置文件是my.ini，一般会在安装目录的根目录。
 
2、Linux下MySQL的配置文件是my.cnf，一般会放在/etc/my.cnf，/etc/mysql/my.cnf。如果找不到，可以用find命令查找。
　(1)find /etc -name my.cnf　　 --在/etc目录下的文件my.cnf
　(2)find /etc -name '*cnf*'　　--使用通配符*(0或者任意多个)。表示在/etc目录下查找文件名中含有字符串‘cnf’的文件
　(3)find / -name my.cnf　　    --在根目录下查找文件my.cnf，表示在整个硬盘查找
　(4)find . -name 'cnf*' 　　   --表示当前目录下查找文件名开头是字符串‘cnf’的文件
　
　查看配置文件使用位置
　mysql --verbose --help|grep -A 1 'Default options';
　
 
3、Linux用rpm包安装的MySQL是不会安装/etc/my.cnf文件的。
至于为什么没有这个文件而MySQL却也能正常启动和作用，有两个说法：
第一种说法，my.cnf只是MySQL启动时的一个参数文件，可以没有它，这时MySQL会用内置的默认参数启动；
第二种说法，MySQL在启动时自动使用/usr/share/mysql目录下的my-medium.cnf文件，这种说法仅限于rpm包安装的MySQL。
解决方法：只需要复制一个/usr/share/mysql目录下的.cnf文件到/etc目录，并改名为my.cnf即可。
*/

# 常用配置，注意，复制内容的时候，检查一下内容完整性，别以为复制就完事了，特别是开头第一行，丫的，被坑了好久
[client]
port=3306
socket=/var/lib/mysql/mysql.sock
default-character-set=utf8mb4


[mysqld]
port=3306
socket=/var/lib/mysql/mysql.sock
character-set-server=utf8mb4
collation-server=utf8mb4_general_ci


[mysql]
no-auto-rehash
default-character-set=utf8mb4


```



#### 配置文件 my.cnf 的内容修改

```mysql
# 查看并发数
mysql> show status like 'Threads%';
# 查看mysql服务器的最大连接数值
mysql> show variables like '%max_connections%';
# 查看mysql服务器响应的最大连接数:
mysql> show global status like 'Max_used_connections';

# 设置mysql服务器的最大连接数值
mysql> set GLOBAL max_connections=256;

```



超长详细配置，使用 ctrl + f 搜索对应配置。

```ini
#[client]
#MySQL默认密码
#password=88888888
[mysqld]
#MySQL以什么用户运行
#user=mysql
#MySQL运行在哪个端口
#port=3306
#改参数指定了安装MySQL的安装路径，填写全路径可以解决相对路径所造成的问题
#basedir
#指定MySQL的数据库文件放在什么路径下
datadir=/usr/local/mysql/data
#mysql以socket方式运行的sock文件位置
socket=/usr/local/mysql/mysql.sock
#是否支持符号链接，即数据库或表可以存储在my.cnf中指定datadir之外的分区或者目录，为0不开启
symbolic-links=0
#服务器使用的字符集
character-set-server=utf8
#默认存储引擎
default-storage-engine=INNODB
#表示默认将日志文件存入文件，默认值是'FILE' 
#如果时候log-output=TABLE表示将日志存入数据库，这样日志信息就会被写入到mysql.slow_log表中
log-output=FILE
#1开启，0关闭 将所有到达MySQL Server的SQL语句记录下来
general-log=0
#设置日志文件保存位置
general_log_file="JOYWANG.log"
#慢查询日志是否开启1,0
slow-query-log=1
#慢查询日志文件保存
slow_query_log_file="JOYWANG-slow.log"
#慢查询日志设置时间单位秒 S
long_query_time=10
#是否启用错误日志的功能和错误日志的存储位置
log-error="JOYWANG.err"
#如果不设置则server-id是根据服务器ip地址后2位生成的，默认0或1
#当配置MySQL复制时，是必填项，用来区分复制拓扑中的各个实例
server-id=1
#限制导入和导出的目录权限NULL表示禁止、如果是文件目录，允许该目录下文件（测试子目录不行）、如果为空则表示不限制目录，一定要有等号，否则mysql无法启动
secure-file-priv=
#最大并发连接数，mysql会为每个连接提供缓冲区，会开销越多的内存，所以要适当的调整该值，不能盲目的提高设置值
max_connections=151
#指定高速缓存的大小，每当MySQL访问一个表时，如果在表缓冲区中还有空间，该表就被打开并放入其中，这样可以更快地访问表内容单位M
table_open_cache=2000
#增加一张临时表大小，提高查询速度
tmp_table_size=16M
#线程池缓存大小，当客户端断开连接后，将当前线程缓存起来，当在接到新的连接请求时快速响应，无需创建新的线程
thread_cache_size=10
#MySQL重建索引时允许使用的临时文件最大大小
myisam_max_sort_file_size=100G
#设置在REPAIR TABLE，或者用 CREATE INDEX 创建索引或 ALTER TABLE 的过程中排序索引所分配的缓冲区大小。可设置范围4Bytes 至 4GB，默认为8MB。
myisam_sort_buffer_size=8M
#指定索引缓冲区的大小，决定了索引处理的速度，尤其是索引读的速度，建议设置成物理内存的1/4，甚至物理内存的30%-40%，如果设置太大，系统就会频繁的换页，降低系统性能
key_buffer_size=8M
#MySQL读入缓冲区大小，对表进行顺序扫描的请求将分配一个读入缓冲区，MySQL会为它分配一段内存缓冲区。read_buffer_size变量控制这一缓冲区的大小。如果对表的顺序扫描请求非常频繁，并且你认为频繁扫描进行得太慢，可以通过增加该变量值以及内存缓冲区大小提高其性能。
read_buffer_size=0
#参数用在sort查询之后 ，以保证获取以顺序的方式获取到查询的数据。如果你有很多order by 查询语句，增长这值能够提升性能
read_rnd_buffer_size=0
#0：log buffer将每秒一次地写入log file中，并且log file的flush(刷到磁盘)操作同时进行。该模式下在事务提交的时候，不会主动触发写入磁盘的操作。
#1：每次事务提交时MySQL都会把log buffer的数据写入log file，并且flush(刷到磁盘)中去，该模式为系统默认。
#2：每次事务提交时MySQL都会把log buffer的数据写入log file，但是flush(刷到磁盘)操作并不会同时进行。该模式下，MySQL会每秒执行一次 flush(刷到磁盘)操作。
innodb_flush_log_at_trx_commit=1
#确保有足够大的日志缓冲区来保存脏数据在被写入到日志文件之前
innodb_log_buffer_size=1M
#指定表数据和索引存储的空间，可以是一个或者多个文件。最后一个数据文件必须是自动扩充的，也只有最后一个文件允许自动扩充。这样，当空间用完后，自动扩充数据文件就会自动增长（以8MB为单位）以容纳额外的数据。例如： innodb_data_file_path=/disk1/ibdata1:900M;/disk2/ibdata2:50M:autoextend两个数据文件放在不同的磁盘上。数据首先放在ibdata1中，当达到900M以后，数据就放在ibdata2中。一旦达到50MB，ibdata2将以 8MB为单位自动增长。如果磁盘满了，需要在另外的磁盘上面增加一个数据文件。
innodb_data_file_path=/disk1/ibdata1:900M;/disk2/ibdata2:50M:autoextend
#这是InnoDB最重要的设置，对InnoDB性能有决定性的影响。默认的设置只有8M，所以默认的数据库设置下面InnoDB性能很差。在只有InnoDB存储引擎的数据库服务器上面，可以设置60-80%的内存。更精确一点，在内存容量允许的情况下面设置比InnoDB tablespaces大10%的内存大小。
innodb_buffer_pool_size=8M
#放置表空间数据的目录，默认在mysql的数据目录，设置到和MySQL安装文件不同的分区可以提高性能。
innodb_data_home_dir=
#该参数决定了recovery speed。太大的话recovery就会比较慢，太小了影响查询性能，一般取256M可以兼顾性能和recovery的速度
innodb_log_file_size=48M
#该参数设定了事务提交时内存中log信息的处理。
1) =1时，在每个事务提交时，日志缓冲被写到日志文件，对日志文件做到磁盘操作的刷新。Truly ACID。速度慢。
2) =2时，在每个事务提交时，日志缓冲被写到文件， 但不对日志文件做到磁盘操作的刷新。只有操作系统崩溃或掉电才会删除最后一秒的事务，不然不会丢失事务。
3) =0时， 日志缓冲每秒一次地被写到日志文件，并且对日志文件做到磁盘操作的刷新。任何mysqld进程的崩溃会删除崩溃前最后一秒的事务
innodb_flush_logs_at_trx_commit=2
#设置InnoDB同步IO的方式：
) Default – 使用fsync（）。
2) O_SYNC 以sync模式打开文件，通常比较慢。
3) O_DIRECT，在Linux上使用Direct IO。可以显著提高速度，特别是在RAID系统上。避免额外的数据复制和double buffering（mysql buffering 和OS buffering）。
innodb_flush_method=Default
#InnoDB kernel最大的线程数。
1) 最少设置为(num_disks+num_cpus)*2。
2) 可以通过设置成1000来禁止这个限制
innodb_thread_concurrency=25
#此配置项作用主要是当tablespace 空间已经满了后，需要MySQL系统需要自动扩展多少空间，每次tablespace 扩展都会让各个SQL 处于等待状态。增加自动扩展Size可以减少tablespace自动扩展次数。
innodb_autoextend_increment=64
#可以开启多个内存缓冲池，把需要缓冲的数据hash到不同的缓冲池中，这样可以并行的内存读写。
innodb_buffer_pool_instances=8
#这个参数设置为一种tickets,默认是5000，我也不清楚到底它代表多久，从官方文档来看它和事物处理的行数有关，大事物需要处理的行数自然更多，小事物当然也就越少至少可以想成获得CPU的时间，干活期间他会不断减少，如果减少到0，这个线程将被提出innodb层次，进入前面说的等待队列，当然也就在队尾部了，这里假设有一个小的事物正在排队进入innodb层，又或者它已经进入了innodb层没有获得CPU时间轮片，突然一个大的事物tickets耗尽被提出了innodb层，那么这个小事物就自然而然能够获得CPU轮片干活，而小事物执行非常快，执行完成后，另外的事物又能尽快的获得CPU干活，不会由于OS线程调度不均匀的问题而造成的小事物饥饿问题，这很好理解。也就是前面我说的与其依赖OS的调度策略不如自己设置一种规则，让用到了一定时间轮片的线程先处于睡眠态放弃CPU的使用
innodb_concurrency_tickets=5000
innodb_old_blocks_time=1000
innodb_open_files=300
innodb_stats_on_metadata=0
#可以存储每个InnoDB表和它的索引在它自己的文件中。
innodb_file_per_table=1
#如果应用程序可以运行在READ-COMMITED隔离级别，做此设定会有一定的性能提升。
transaction-isolation=READ-COMITTED
#这个参数用来表示 页读取到mid位置后，需要等待多久才会被加入到LRU列表的热端。使LRU列表中的热点数据不被刷出
innodb_checksum_algorithm=0
#MySQL暂时停止回答新请求之前的短时间内多少个请求可以被存在堆栈中
back_log=80
flush_time=0
#如果按照检索的性能方式来细分，那么无论是两表 INNER JOIN 还是多表 INNER JOIN，都大致可以分为以下几类：1.JOIN KEY 有索引，主键2.JOIN KEY 有索引， 二级索引3.JOIN KEY 无索引；JOIN BUFFER 是 MySQL 用来缓存以上第二、第三这两类 JOIN 检索的一个 BUFFER 内存区域块。
join_buffer_size=256K
#可以增大此值以便于server端接收更大的SQL
max_allowed_packet=4M
#同一主机最大连续请求错误次数，如果还没成功建立连接，mysql服务器会组织这台主机后续的所有请求
max_connect_errors=100
#限制mysqld能打开文件的最大数
open_files_limit=4161
#一个connection级参数，在每个connection第一次需要使用这个buffer的时候，一次性分配设置的内存
sort_buffer_size=256K
#就是控制总frm文件的数量，还是个hash表，内部维护。如果打开的表实例的数量超过了table_definition_cache设置，LRU机制将开始标记表实例以进行清除，并最终将它们从数据字典缓存中删除。简单通俗点frm文件有多少，就设置多少了
table_definition_cache=1400
#指定基于行的二进制日志事件的最大大小
binlog_row_event_max_size=8K
#本参数用于主从库中配置从库大于0作用为每个命令之后刷盘，小与0作为为永不刷盘，默认均为1000
sync_master_info=10000
#这个参数和sync_binlog是一样的，当设置为1时，slave的I/O线程每次接收到master发送过来的binlog日志都要写入系统缓冲区，然后刷入relay log中继日志里，这样是最安全的，因为在崩溃的时候，你最多会丢失一个事务，但会造成磁盘的大量I/O。当设置为0时，并不是马上就刷入中继日志里，而是由操作系统决定何时来写入，虽然安全性降低了，但减少了大量的磁盘I/O操作。这个值默认是0，可动态修改，建议采用默认值。
sync_relay_log=10000
#这个参数和sync_relay_log参数一样，当设置为1时，slave的I/O线程每次接收到master发送过来的binlog日志都要写入系统缓冲区，然后刷入relay-log.info里，这样是最安全的，因为在崩溃的时候，你最多会丢失一个事务，但会造成磁盘的大量I/O。当设置为0时，并不是马上就刷入relay-log.info里，而是由操作系统决定何时来写入，虽然安全性降低了，但减少了大量的磁盘I/O操作。这个值默认是0，可动态修改，建议采用默认值
sync_relay_log_info=10000
#参数不可动态修改，必须重启数据库
#1:存储在磁盘是小写，比较时不区分大小写
#2:存储为给定的大小写但是比较时是小写
#0:存储为给定的大小写和比较时区分大小写的
lower_case_table_names = 1
#ONLY_FULL_GROUP_BY：归于GROUP BY聚合操作，如果在SELECT中的列，没有在GROUP BY中出现，那么这个SQL是不合法的，因为列不在GROUP BY从句中
#NO_AUTO_VALUE_ON_ZERO：该值影响自增常烈的插入。默认设置下，插入0或者NULL代表生成下一个自增长值。如果用户希望插入的值为0，而该列又是自增长的，那么这个选项就有用了
#STRICT_TRANS_TABLES：如果一个值不能插入到一个事物中，则中断当前操作，对非事物不做限制
#NO_ZERO_IN_DATE：在严格模式下，不允许日期和月份为零
#NO_ZERO_DATE：mysql不允许插入零日期，插入零日期会抛出错误而不是警告
#ERROR_FOR_DIVISION_BY_ZERO：在insert或update过程中，如果数据被清除，则产生错误而非警告。如果未给出该模式，那么数据被清除时Mysql返回NULL
#NO_AUTO_CREATE_USER：禁止GRANT创建密码为空的用户
#NO_ENGINE_SUBSTITUTION：如果需要的存储引擎被禁用或未编译，那么抛出错误。不设置此值时，用默认的存储引擎替代，并抛出一个异常
#PIPES_AS_CONCAT：将“||”是为字符串的链接操作符而非运算符，这和Oracle数据库是一样是，也和字符串的拼接函数Concat相类似
#ANSI_QUOTES：不能用双引号来引用字符串，因为它被解释为识别符
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```



```ini
[mysqld]
server-id=513306                        # Mysql唯一标识，一个集群中唯一；
port=3306                               # 服务端口，默认3306
user = mysql                            # 启动用户，建议用户mysql
bind_address= 0.0.0.0                   # 绑定的IP地址，建议使用具体地址
basedir=/mysql/app/mysql                # mysql安装路径，建议使用绝对路径
datadir=/mysql/data/3306/data           # 数据目录
socket=/mysql/data/3306/mysql.sock      # 指定套接字文件
pid-file=/mysql/data/3306/mysql.pid     # 指定pid文件
character-set-server=utf8               # 指定默认编码格式
skip-character-set-client-handshake=1   # 跳过mysql程序起动时的字符参数设置 ，使用服务器端字符集设置 0:不跳过  1：跳过
autocommit = 0                          # 是否开启自动提交， 0:不开启 1：开启
skip_name_resolve = 1                   # 禁止域名解析   建议开启
max_connections = 800                   # 最大连接数
max_connect_errors = 1000               # 最大连接错误
default-storage-engine=INNODB           # 设置默认引擎，常用引擎INNODB，MYISAN，建议使用INNODB
transaction_isolation = READ-COMMITTED  # 事务隔离级别，可选参数有：READ-UNCOMMITTED(读取未提交内容), READ-COMMITTED（读取提交内容）, REPEATABLE-READ(可重读), SERIALIZABLE(可串行化).
explicit_defaults_for_timestamp = 1     # 参数是否初始化
sort_buffer_size = 32M                  # 排序使用的缓存大小，MySQL5.7中，默认为1M(优化参数之一，一般情况下默认数值就够用了)
join_buffer_size = 128M                 # join操作所用用的缓存大小
tmp_table_size = 72M                    # 临时表大小
max_allowed_packet = 16M                # 服务端最大允许接收的数据包大小
sql_mode = "STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER"   # mysql支持的基本语法及校验规则
interactive_timeout = 1800              # 是MySQL在等待一个活动连接关闭连接前等待的秒数。默认28800秒，8小时
wait_timeout = 1800                     # 是MySQL在等待一个非活动连接关闭连接前等待的秒数。默认28800秒，8小时
read_buffer_size = 16M                  # （数据文件存储顺序）是MySQL读入缓冲区的大小，将对表进行顺序扫描的请求将分配一个读入缓冲区，MySQL会为它分配一段内存缓冲区，read_buffer_size变量控制这一缓冲区的大小，如果对表的顺序扫描非常频繁，并你认为频繁扫描进行的太慢，可以通过增加该变量值以及内存缓冲区大小提高其性能，read_buffer_size变量控制这一提高表的顺序扫描的效率 数据文件顺序。
read_rnd_buffer_size = 32M              # 是MySQL的随机读缓冲区大小，当按任意顺序读取行时（列如按照排序顺序）将分配一个随机读取缓冲区，进行排序查询时，MySQL会首先扫描一遍该缓冲，以避免磁盘搜索，提高查询速度，如果需要大量数据可适当的调整该值，但MySQL会为每个客户连接分配该缓冲区所以尽量适当设置该值，以免内存开销过大。表的随机的顺序缓冲 提高读取的效率。

#event_scheduler =1　　　　　　　　　　　　 # 事件调度器  1：开启   0:不开启

query_cache_type = 1                    # 控制着查询缓存工能的开启的关闭。0时表示关闭，1时表示打开，2表示只要select 中明确指定SQL_CACHE才缓存。
query_cache_size=1M                     # 查询缓存大小， 一般 1M很够用了
table_open_cache=2048                   # 文件描述符的缓存大小，4G内存的机器，建议设置为2048，
thread_cache_size=768                   # 线程池缓存大小，当客户端断开连接后 将当前线程缓存起来 当在接到新的连接请求时快速响应 无需创建新的线程
myisam_max_sort_file_size=10G           #  mysql重建索引时允许使用的临时文件最大大小
myisam_sort_buffer_size=64M             # MyISAM表发生变化时重新排序所需的缓冲。一般64M足矣。
key_buffer_size=32M                     #  Key Buffer大小，用于缓存MyISAM表的索引块。决定数据库索引处理的速度（尤其是索引读），对于内存在4GB左右的服务器该参数可设置为256M或384M。注意：该参数值设置的过大反而会是服务器整体效率降低！
read_buffer_size=8M                     # 用于对MyISAM表全表扫描时使用的缓冲区大小。针对每个线程进行分配（前提是进行了全表扫描）。进行排序查询时，MySql会首先扫描一遍该缓冲，以避免磁盘搜索，提高查询速度，如果需要排序大量数据，可适当调高该值。但MySql会为每个客户连接发放该缓冲空间，所以应尽量适当设置该值，以避免内存开销过大。
read_rnd_buffer_size=4M                 # 是MySQL的随机读缓冲区大小，当按任意顺序读取行时（列如按照排序顺序）将分配一个随机读取缓冲区，进行排序查询时，MySQL会首先扫描一遍该缓冲，以避免磁盘搜索，提高查询速度，如果需要大量数据可适当的调整该值，但MySQL会为每个客户连接分配该缓冲区所以尽量适当设置该值，以免内存开销过大。表的随机的顺序缓冲 提高读取的效率。

back_log=1024                           # 值指出在MySQL暂时停止回答新请求之前的短时间内多少个请求可以被存在堆栈中。由默认的50，每个连接256kb
#flush_time=0
open_files_limit=65536                  # MySQL打开了多少个文件描述符，默认最小1024
table_definition_cache=1400             # 表定义文件缓存相比表文件描述符缓存所消耗的内存更小，其默认值是400
#binlog_row_event_max_size=8K
# 有时候为了避免master.info和中继日志崩溃，在容忍额外的fsync()带来的开销，推荐设置
#sync_master_info=10000                 # 默认为10000，每间隔多少事务刷新master.info，如果是table（innodb）设置无效，每个事务都会更新，建议 设置为1
#sync_relay_log=10000                   # 默认为10000，即每10000次sync_relay_log事件会刷新到磁盘。为0则表示不刷新，交由OS的cache控制，建议设置为1
#sync_relay_log_info=10000              # 默认为10000，每间隔多少事务刷新relay-log.info，建议设置为1

########log settings########
log-output=FILE                         # 日志存储方式，TABLE、FILE，建议设置为FILE，默认为FILE
general_log = 0                         # 所有到达MySQL Server的SQL语句记录下来。通用日志，不建议开启，这个很消耗磁盘空间，用于优化及故障排查
general_log_file=/mysql/log/3306/itpuxdb-general.err    # 指定通用日志文件
slow_query_log = ON                     # ON 为开启慢查询日志，off表示关闭慢查询日志，用于优化SQL语句
slow_query_log_file=/mysql/log/3306/itpuxdb-query.err   #指定慢查询日志文件
long_query_time=10                      # 指定多少秒返回查询的结果为慢查询
log-error=/mysql/log/3306/itpuxdb-error.err     # 指定错误日志

log_queries_not_using_indexes = 1       # 开启 记录没有使用索引查询语句，1或者ON开启，记录至慢日志中
log_slow_admin_statements = 1           #记录那些慢的optimize table，analyze table和alter table语句，1或者ON开启，记录至慢日志中
log_slow_slave_statements = 1           # 记录由Slave所产生的慢查询
log_throttle_queries_not_using_indexes = 10     # 设定每分钟记录到日志的未使用索引的语句数目，超过这个数目后只记录语句数量和花费的总时间 
expire_logs_days = 90                   # 保留多少天
min_examined_row_limit = 100            # 对于查询扫描行数小于此参数的SQL，将不会记录到慢查询日志中
#log_bin = "/log/bin_log/binlog"        # bin 日志路径设置

########replication settings########    # 主从复制设置
#master_info_repository = TABLE         # 值如果为FILE，建议将其修改为TABLE
#relay_log_info_repository = TABLE
#log_bin = bin.log

  #sync_binlog = 1　　　　　　　　　　　　　　 # 默认，sync_binlog=0，表示MySQL不控制binlog的刷新，如果sync_binlog>0，表示每sync_binlog次事务提交，# sync_binlog=1了，表示每次事务提交，MySQL都会把binlog刷下去，是最安全但是性能损耗最大的设置。sync_binlog=1，多个事务同时提交，同样很大的影响MySQL和IO性能。# MySQL DBA设置的sync_binlog并不是最安全的1，而是100或者是0。这样牺牲一定的一致性，可以获得更高的并发和性能。

#gtid_mode = on                         # 是否开启开启 基于 gtid 的复制， 5.7之后才出现的新特性
#enforce_gtid_consistency = 1           # 
#log_slave_updates
#binlog_format = row 
#relay_log = relay.log
#relay_log_recovery = 1
#binlog_gtid_simple_recovery = 1
#slave_skip_errors = ddl_exist_errors

########innodb settings########
# 根据您的服务器IOPS能力适当调整,只有当你在频繁写操作的时候才有意义
# 一般配普通SSD盘的话，可以调整到 10000 - 20000
# 配置高端PCIe SSD卡的话，则可以调整的更高，比如 50000 - 80000 
innodb_io_capacity = 4000               # 动态调整刷新脏页的数量，一般设置最大值的1/2
innodb_io_capacity_max = 8000           #动态调整刷新脏页的最大数量
innodb_buffer_pool_size = 200M          # 缓存池大小，默认128M，建议设置为总内存大小的，设置为物理内存的80%
innodb_buffer_pool_instances = 8        # 可以开启多个内存缓冲池，把需要缓冲的数据hash到不同的缓冲池中，这样可以并行的内存读写。
innodb_buffer_pool_load_at_startup = 1  # 默认为关闭OFF。如果开启该参数，启动MySQL服务时，MySQL将本地热数据加载到InnoDB缓冲池中。
innodb_buffer_pool_dump_at_shutdown = 1 # 默认启用。指定在MySQL服务器关闭时是否记录在InnoDB缓冲池中缓存的页面，以便在下次重新启动时缩短预热过程。
innodb_lru_scan_depth = 2000            # LRU列表中可用页的数量，默认值为1024。
innodb_lock_wait_timeout = 5            # 事务锁超时时间 
#innodb_flush_method = O_DIRECT

innodb_log_file_size = 200M             # mysql事务日志文件（ib_logfile0）的大小；
innodb_log_files_in_group = 2           # 指定你有几个日志组。一般２-３个日值组。默认为两个。
innodb_log_buffer_size = 16M            # 事务在内存中的缓冲大小。

innodb_undo_logs = 128                  # InnoDB使用的回滚段个数，必须设置35个以上；，默认128
innodb_undo_tablespaces = 3             # 是控制undo是否开启独立的表空间的参数，为0表示：undo使用系统表空间，即ibdata1，不为0表示：使用独立的表空间，一般名称为 undo001 undo002，存放地址的配置项为：innodb_undo_directory，默认配置为0，参数必须大于或等于2，即回收（收缩）一个undo log日志文件时，要保证另一个undo log是可用的。
innodb_undo_log_truncate = 1            # 参数设置为1，即开启在线回收（收缩）undo log日志文件，支持动态设置。
innodb_max_undo_log_size = 2G           # 每一个undo日志文件大小，默认1G

innodb_flush_neighbors = 1              # 刷脏页的控制策略，参数就是用来控制这个行为的，值为 1 的时候会有上述的“连坐”机制，值为 0 时表示不找邻居，自己刷自己的。建议设置为0
innodb_purge_threads = 4                # 负责回收已经使用并分配的undo页，可以指定多个innodb_purge_threads来进一步加快和提高undo回收速度。
innodb_large_prefix = 1                 # 单索引限制，是否开启允许列索引最大达到3072，不开启只有767
innodb_thread_concurrency = 64          # 来限制并发线程的数量
innodb_print_all_deadlocks = 1          # 是否开启保存死锁日志，死锁日志存放到error_log配置的文件里面
innodb_strict_mode = 1                  # InnoDB严格检查模式，尤其采用了页数据压缩功能后，最好是开启该功能。开启此功能后，当创建表（CREATE TABLE）、更改表（ALTER TABLE）和创建索引（CREATE INDEX）语句时，如果写法有错误，不会有警告信息，而是直接抛出错误，这样就可直接将问题扼杀在摇篮
innodb_sort_buffer_size = 64M
innodb_flush_log_at_trx_commit=1        # sync_binlog 两个参数是控制MySQL 磁盘写入策略以及数据安全性的关键参数，当两个参数都设置为1的时候写入性能最差，但安全性最高，
# 设置为0，log buffer将每秒一次地写入log file中，并且log file的flush(刷到磁盘)操作同时进行.该模式下，在事务提交的时候，不会主动触发写入磁盘的操作。
# 设置为1，每次事务提交时MySQL都会把log buffer的数据写入log file，并且flush(刷到磁盘)中去.
# 设置为2，每次事务提交时MySQL都会把log buffer的数据写入log file.但是flush(刷到磁盘)操作并不会同时进行。该模式下,MySQL会每秒执行一次 flush(刷到磁盘)操作。
innodb_autoextend_increment=64          # 默认 8M ,单位为M，配置表空间自动扩展，每次扩展多大M
innodb_concurrency_tickets=5000         # 这个参数设置为一种tickets,默认是5000，
innodb_old_blocks_time=1000             # 页读取到mid位置后，需要等待多久才会被加入到LRU列表的热端。默认1000ms
innodb_open_files=65536                 # 限制Innodb能打开的表的数据。
innodb_stats_on_metadata=0              # 是否自动更新统计信息,默认为0关闭，
innodb_file_per_table=1                 # MySQL InnoDB引擎 默认会将所有的数据库InnoDB引擎的表数据存储在一个共享空间中：ibdata1，当增删数据库的时候，ibdata1文件不会自动收缩，单个数据库的备份也将成为问题。通常只能将数据使用mysqldump 导出，然后再导入解决这个问题。如果启用了innodb_file_per_talbe参数，需要注意的是每张表的表空间内存放的只是数据、索引和插入缓冲Bitmap页，其他数据如：回滚信息、插入缓冲索引页、系统事物信息、二次写缓冲（Double write buffer）等还是放在原来的共享表空间内。同时说明了一个问题：即使启用了innodb_file_per_table参数共享表空间还是会不断的增加其大小的。
#innodb_checksum_algorithm=0            # 是否开启checksum算法
innodb_data_file_path=ibdata1:200M;ibdata2:200M;ibdata3:200M:autoextend:max:5G      #可配置表空间相关参数。
innodb_temp_data_file_path = ibtmp1:200M:autoextend:max:20G         # 可配置临时表空间相关参数。

innodb_buffer_pool_dump_pct = 40        # 指定每个缓冲池最近使用的页面读取和转储的百分比，1-100，默认25
innodb_page_cleaners = 4                # 多个页面清理线程刷脏页，用于指定页面清理线程的数量。其默认值1，维持了之前单个页面清理线程的配置
innodb_purge_rseg_truncate_frequency = 128      # 指定purge操作被唤起多少次之后才释放rollback segments。当undo表空间里面的rollback segments被释放时，undo表空间才会被truncate。由此可见，该参数越小，undo表空间被尝试truncate的频率越高。
binlog_gtid_simple_recovery=1           #这个变量用于在MySQL重启或启动的时候寻找GTIDs过程中，控制binlog 如何遍历的算法？
#2. 当binlog_gtid_simple_recovery=FALSE 时：
#    为了初始化 gtid_executed，算法是： 从newest_binlog -> oldest_binlog 方向遍历读取，如果发现有Previous_gtids_log_event ， 那么就停止遍历
#    为了初始化 gtid_purged，算法是：   从oldest_binlog -> newest_binlog 方向遍历读取, 如果发现有Previous_gtids_log_event（not empty）或者 #至少有一个Gtid_log_event的文件，那么就停止遍历
#3. 当binlog_gtid_simple_recovery=TRUE 时：
#    为了初始化 gtid_executed ， 算法是： 只需要读取newest_binlog
#    为了初始化 gtid_purged， 算法是： 只需要读取oldest_binlog
#4. 当设置binlog_gtid_simple_recovery=TRUE ， 如果MySQL版本低于5.7.7 ， 可能会有gitd计算出错的可能，具体参考官方文档详细描述
log_timestamps=system                   # 主要是控制 error log、slow_log、genera log，等等记录日志的显示时间参数，但不会影响 general log 和 slow log 写到表 (mysql.general_log, mysql.slow_log) 中的显示时间
#transaction_write_set_extraction=MURMUR32      # 基于WRITESET的并行复制方式
show_compatibility_56=on                # mysql兼容性是否兼容mysql5.6，这是是开启兼容


lower_case_table_names=1        # 是否区分大小写 说明 0：区分大小写，1：不区分大小写
read_only=1                     # 普通是否可读， 0：关闭可读， 1：开启可读
super_read_only=1               # 管理员（super）用户是否可读，超级可读 ，0：关闭可读， 1：开启可读
```



### 连接数据库

打开 MySQL 命令窗口

- 在 DOS 命令行窗口进入 **安装目录 \mysql\bin**
- 可设置环境变量，设置了环境变量，可以在任意目录打开！

**连接数据库语句 :** mysql -h 服务器主机地址 -u 用户名 -p 用户密码

注意 : -p 后面不能加空格，否则会被当做密码的内容，导致登录失败 !

**几个基本的数据库操作命令：**

```mysql
update user set password=password('123456')where user='root'; -- 修改密码
flush privileges; -- 刷新数据库
show databases; -- 显示所有数据库
use dbname；-- 使用某个数据库
show tables; -- 显示数据库mysql中所有的表
describe user; -- 显示表mysql数据库中user表的列信息
create database name; -- 创建数据库
use databasename; -- 选择数据库

exit; -- 退出Mysql
-- ? 命令关键词 : 寻求帮助

-- 注释方式一
# 注释方式二
/* 注释方式三 */

```



# 基本操作

## SQL语言分类

### DDL（Data Definition Language）

数据定义语言：DDL 语句不用 commit

1. 创建（create）：create index，create tablespace ...

2. 删除（drop，truncate）：truncate删除整个数据，drop删除整个表（数据+表结构）两者都不用commit，也不能回滚

3. 修改（alter）：alter table，alter database，alter tablespace ...

4. 查看（show，desc），show parameter（查看参数的值），desc 对象-查看对象的结构

 

### DML（Data Manipulation Language）

数据操作语言：需要 commit

1. 插入（insert）
2. 删除（delete）：delete 只删除数据，可以回滚
3. 更新（update）

 

### DCL（Data Control Language）

数据控制语言：

1. 授权（grant）：grant create session to scott

2. 回滚（rollback）

3. 提交（commit）

4. 新建用户（create user）

 

### DQL（Data Query Language）

数据查询语言：

1. 查询（select）：select index，select ...



## 数据库操作

操作数据库 > 操作数据库中的表 > 操作数据库表中的字段

### 数据库的 CRUD

- 创建数据库：create database [if not exists] 数据库名
- 删除数据库：drop database [if exists] 数据库名
- 修改数据库： alter database 数据库名
- 查看数据库：show databases
- 使用数据库：use 数据库名



学习思路：

- 对照 sqlyog 可视化历史记录查看 sql
- 固定的语法和关键字必须记住



#### 创建数据库



#### 删除数据库



#### 修改数据库

**修改数据库字符集编码**

> 创建数据库、数据表，或表中字段均可指定其使用的字符集。若创建字段时没有指定字符集则字段沿用数据表的字符集，若创建数据表时没有指定字符集则数据表沿用数据库的字符集，创建数据库时若没有指定字符集则数据库沿用配置文件中[mysqld]或[mysqld]选项组中有关参数项的设置。



MySQL 数据库默认字符编码

![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210107235914935.png)



在 MySQL 中，可以使用 **ALTER DATABASE** 来修改已经被创建或者存在的数据库的相关参数。修改数据库的语法格式为：

```mysql
ALTER DATABASE [数据库名] {
[ DEFAULT ] CHARACTER SET <字符集名> |
[ DEFAULT ] COLLATE <校对规则名>}
```



语法说明如下：

- ALTER DATABASE 用于更改数据库的全局特性。
- 使用 ALTER DATABASE 需要获得数据库 ALTER 权限。
- 数据库名称可以忽略，此时语句对应于默认数据库。
- CHARACTER SET 子句用于更改默认的数据库字符集。



查看 test_db 数据库的定义声明的执行结果如下所示：

```mysql
mysql> SHOW CREATE DATABASE test_db;
+----------+--------------------------------------------------------+
| Database | Create Database                                        |
+----------+--------------------------------------------------------+
| test_db  | CREATE DATABASE `test_db` /*!40100 DEFAULT CHARACTER SET utf8 */|
+----------+--------------------------------------------------------+
1 row in set (0.05 sec)
```

使用命令行工具将数据库 test_db 的指定字符集修改为 gb2312，默认校对规则修改为 gb2312_unicode_ci，输入 SQL 语句与执行结果如下所示：

```mysql
mysql> ALTER DATABASE test_db
    -> DEFAULT CHARACTER SET gb2312
    -> DEFAULT COLLATE gb2312_chinese_ci;
mysql> SHOW CREATE DATABASE test_db;
+----------+--------------------------------------------------------+
| Database | ALTER Database                                        |
+----------+--------------------------------------------------------+
| test_db  | ALTER DATABASE `test_db` /*!40100 DEFAULT CHARACTER SET gb2312 */|
+----------+--------------------------------------------------------+
1 row in set (0.00 sec)
```



查看某个字符集对应的编码：

```mysql
show collation like ‘gb%’;
```



mysql 修改字符集 utf8 为 utf8mb4：

[mysql修改字符集utf8为utf8mb4](https://www.cnblogs.com/rainerl/p/10950472.html)

查看数据库的编码格式

```mysql
SHOW VARIABLES WHERE Variable_name LIKE 'character_set_%' OR Variable_name LIKE 'collation%';
或
SHOW VARIABLES Like '%char%'; 
```



修改配置文件my.cnf

```ini
[mysqld]
character-set-server=utf8mb4
 
[mysql]
default-character-set=utf8mb4
 
[client]
default-character-set=utf8mb4
```



如果不知道配置文件在哪里的话可以根据一下命令查找

```mysql
mysqld --verbose --help|grep -A 1 'Default options';
-- 或者是执行：
mysql --verbose --help|grep -A 1 'Default options';
```



服务器首先会读取/etc/my.cnf文件，如果发现该文件不存在，再依次尝试从后面的几个路径进行读取。

修改配置文件后保存，并重启mysql服务

```shell
service mysqld restart
# 或
service mysql restart
```



**如果数据库、表已经创建可以直接修改数据库或表的编码格式**

查看数据表的编码格式

```
show create table <表名>;
```

修改数据库的编码格式

```
mysql>alter database <数据库名> character set utf8mb4;
```

修改数据表格编码格式

```
alter table <表名> character set utf8mb4;
```

修改字段编码格式

```
alter table <表名> change <字段名> <字段名> <类型> character set utf8mb4;
```



**修改数据库索引引擎**

https://blog.csdn.net/eagle89/article/details/81743954

```mysql
-- 方式一
ALTER TABLE corr_alert_copy ENGINE=INNODB;
/*
优点：高效，按行复制表记录到新表中
缺点：可能消耗系统所有I/O，原表加锁
*/

-- 方式二
/*
手工导入与导出
使用MYSQL自带工具mysqldump导出到文件，修改文件中的CREATE TABLE引擎语句，同时修改表名，且默认在create table前加上drop table语句
*/

-- 方式三
CREATE TABLE corr_alert_copy LIKE corr_alert;
ALTER TABLE corr_alert_copy ENGINE=INNODB;
INSERT INTO corr_alert_copy SELECT * FROM corr_alert;

-- 数据量不大，工作很好；数据量大，分批处理，每一段数据一个事务，避免大事务产生的undo操作；
START TRANSACTION;
INSERT INTO corr_alert_copy select * from corr_alert WHERE id BETWEEN x AND y;
COMMIT;
-- 优点：原表还在，可在执行过程中对原表加锁，确保数据一致，操作简单；

```



案例1：需要把100张表的引擎，从InnoDB改为MYISAM。想到要手工执行，简直头大，还好有存储过程。可以利用存储过程来批量处理。

```mysql
-- 定义存储过程
DELIMITER //
CREATE PROCEDURE alter_table_enegine()
BEGIN
DECLARE `@i` INT(11);
DECLARE `@sqlstr` VARCHAR(2560);
SET `@i`=0;
WHILE `@i` < 100 DO
SET @sqlstr = CONCAT(
	"ALTER TABLE pt_course_",
	`@i`,
	" ENGINE=MYISAM"
);
PREPARE stmt FROM @sqlstr;
EXECUTE stmt;
SET `@i` = `@i` + 1;
END WHILE;
END;
-- 执行存储过程
CALL alter_table_enegine();
-- 执行完，删掉临时用的存储过程
DROP PROCEDURE alter_table_enegine;
```



查询数据库有什么引擎

```mysql
select table_name,`engine` from information_schema.tables where table_schema = 'database_name';
```



查询表引擎（查看MYISAM）

```mysql
SELECT CONCAT(table_name,' ', engine)  FROM information_schema.tables WHERE table_schema="bpm" AND ENGINE="MyISAM";  
```



生成修改sql（把MYISAM改成INNODB）

```mysql
select CONCAT('alter table ',table_name,' engine=InnoDB;') FROM information_schema.tables WHERE table_schema="bpm" AND ENGINE="MyISAM"; 
```



#### 查询数据库





### 数据库表的 CRUD

#### 创建表

属于DDL的一种，语法 :

```mysql
create table [if not exists] `表名` (
   '字段名1' 列类型 [属性][索引][注释],
   '字段名2' 列类型 [属性][索引][注释],
  #...
   '字段名n' 列类型 [属性][索引][注释]
)[表类型][表字符集][注释];
```

**说明：** 反引号用于区别 MySQL 保留字与普通字符而引入的 （键盘 Esc 下面的键）。



#### 删除表

DROP TABLE [if exists] 表名

```mysql
DROP TABLE if exists student1;
```

所有的创建和删除操作尽量加上判断是否存在（if exists），以免报错。



#### 修改表

**修改表名**

ALTER TABLE 旧表名 RENAME AS 新表名

```mysql
ALTER TABLE student RENAME AS student1;
```



**修改表的注释**

```mysql
alter table user comment '修改后的表的注释';
```



#### 建表后索引的 CRUD

```mysql
-- 增加索引
/*
alter table table_name add index index_name (column_list) ;
alter table table_name add unique (column_list) ;
alter table table_name add primary key (column_list) ;
*/
ALTER TABLE `result` ADD INDEX `ind`(`studentNo`,`subjectNo`);
-- 或者
create index idx_sex on t111(sex);

-- 删除索引
/*
drop index index_name on table_name ;
alter table table_name drop index index_name ;
alter table table_name drop primary key ;
*/
alter table user_following drop index idx_ftype_id;
-- 或者
drop index idx_ftype_id on user_following;

-- 修改索引
-- 对于MySQL 5.7及以上版本,可以执行以下命令：
ALTER TABLE tbl_name RENAME INDEX old_index_name TO new_index_name;

-- 对于MySQL 5.7以前的版本，可以执行下面两个命令：
ALTER TABLE tbl_name DROP INDEX old_index_name;
ALTER TABLE tbl_name ADD INDEX new_index_name(column_name);

-- 查询表索引
show index from user_following;

```



#### 查询数据库下的表信息

```mysql
show tables;
```



**查看表注释**

```mysql
-- 在生成的SQL语句中看
show create table test1;
-- 在元数据的表里面看
use information_schema;
select * from TABLES where TABLE_SCHEMA='my_db' and TABLE_NAME='test1';
```



**查看表索引**

```mysql
-- show index from 表名
show index from user;
```



### 数据库表字段的 CRUD

#### 增加表字段

ALTER TABLE 表名 ADD 字段名 类型(宽度)；
ALTER TABLE 表名 ADD 字段名 类型(宽度) 约束条件 ；
ALTER TABLE 表名 ADD 字段名 类型(宽度) 约束条件 first；
ALTER TABLE 表名 ADD 字段名 类型(宽度) 约束条件 after 字段名；

```mysql
ALTER TABLE student1 ADD phone int(11);

ALTER TABLE `mypage`.`user_following` 
ADD COLUMN `signature` varchar(100) NULL COMMENT '个性签名' AFTER `profile_photo`;

```



#### 删除表字段

ALTER TABLE DROP 字段名

```mysql
ALTER TABLE student1 DROP COLUMN phone1;
```



#### 修改表字段

**字段重命名**：ALTER TABLE 表名 CHANGE 旧字段名 新字段名

```mysql
ALTER TABLE student1 CHANGE phone phone1;
```



**修改字段属性**：ALTER TABLE 表名 MODIFY 字段名 属性

```mysql
ALTER TABLE student1 MODIFY phone1 VARCHAR(11);
```



**修改字段注释**

```mysql
alter table test1 modify column field_name int comment '修改后的字段注释';
-- 注意：字段名和字段类型照写就行

ALTER TABLE `mypage`.`user_opinion` 
MODIFY COLUMN `opinion_type` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '观点对应类型，0-平台；1-某一类型，默认0' AFTER `opinion_content`;

```



**修改列的数据类型，尺寸和默认值**

```mysql
ALTER TABLE user
MODIFY (last_name VARCHAR(30));

ALTER TABLE user
MODIFY (salary double(9,2) default 1000);
```

- 对默认值的修改只影响今后对表的修改。



#### 查询表字段

**查看字段注释**

```mysql
-- show
show full columns from test1;
-- 在元数据的表里面看
select * from COLUMNS where TABLE_SCHEMA='my_db' and TABLE_NAME='test1';
```



### 数据库表数据的 CRUD

#### 添加/插入数据

语法格式：INSERT INTO 表名（字段1，字段2，字段3…）VALUES (‘值1’,‘值2’,‘值3’…),(‘值1’,‘值2’,‘值3’…),(‘值1’,‘值2’,‘值3’…)

```mysql
-- 添加 一定要保证数据和字段一一对应！！！！
-- INSERT INTO 表名（字段1，字段2，字段3...）VALUES ('值1','值2','值3'...);

-- 由于主键自增可以省略（如果不写表的字段，它就会一一匹配）
INSERT INTO `grade`(`gradename`) VALUES ('大一');

-- 插入多条数据
INSERT INTO `grade`(`gradename`) VALUES ('大二'),('大三'),('大四');

INSERT INTO `students`(`name`) VALUES ('张三');

INSERT INTO `students`(`name`,`pwd`,`sex`) 
VALUES ('张三','bbbbb','男'),('李四','bbbbb','男'),('王五','bbbbb','男');

-- 省略字段
INSERT INTO `students` values ('5','麻子','wwww','男','2010-01-01','武汉','email');
```



**注意**：

- 字段和字段之间用英文逗号隔开
- 字段是可以省略的，但是插入的值必须一一对应
- 可以同时插入多条数据，每一条数据用 `(),` 隔开



#### 删除表数据

语法格式：delete from 表名 where 条件

```mysql
-- 删除数据
DELETE FROM `students` WHERE id=7;

-- 删除所有数据（避免） 表的自增列不会重置
DELETE FROM `students`;
```



TRUNCATE：完全清空一个数据库表的数据，表的结构和索引约束不变。

TRUNCATE TABLE 表名；清空表后表的自增列也会重置，计数器归0，而且不会影响事物。



**TRUNCATE 与 DELETE 的区别**

- 相同 : 都能删除数据 , 不删除表结构 , 但 TRUNCATE 速度更快

- 不同 :

- - 使用 TRUNCATE TABLE 重新设置 AUTO_INCREMENT 计数器
  - 使用 TRUNCATE TABLE 不会对事务有影响 （事务后面会说）



测试：

```mysql
-- 创建一个测试表
CREATE TABLE `test` (
`id` INT(4) NOT NULL AUTO_INCREMENT,
`coll` VARCHAR(20) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

-- 插入几个测试数据
INSERT INTO test(coll) VALUES('row1'),('row2'),('row3');

-- 删除表数据(不带where条件的delete)
DELETE FROM test;
-- 结论:如不指定Where则删除该表的所有列数据,自增当前值依然从原来基础上进行,会记录日志.

-- 删除表数据(truncate)
TRUNCATE TABLE test;
-- 结论:truncate删除数据,自增当前值会恢复到初始值重新开始;不会记录日志.

-- 同样使用DELETE清空不同引擎的数据库表数据.重启数据库服务后
-- InnoDB : 自增列从初始值重新开始 (因为是存储在内存中,断电即失)
-- MyISAM : 自增列依然从上一个自增数据基础上开始 (存在文件中,不会丢失)
```



#### 修改表数据

语法格式：update 表名 set 字段=value , 字段=value where 字段 = ?

```mysql
-- 修改学生的名字
UPDATE `students` SET `name`='周' WHERE id = 1;

-- 不指定条件会改动表中所有的名字
UPDATE `students` SET `name`='周';

-- 修改多个条件
UPDATE `students` SET `name`='李',`pwd`='666666' WHERE id =2;

-- 通过多个条件定位数据
UPDATE `students` SET `name`='王'  WHERE id=4 AND sex='男';

-- 变量
UPDATE `students` SET `birthday`=CURRENT_DATE  WHERE id=4 AND sex='男';
```



条件：where子句， id等于某个值 大于某个值 在某个区间

| 操作符       | 含义           | 范围 | 结果  |
| ------------ | -------------- | ---- | ----- |
| =            | 等于           | 5=6  | false |
| <>或！=      | 不等于         | 5<>6 | true  |
| >            | 大于           |      |       |
| <            | 小于           |      |       |
| <=           | 小于等于       |      |       |
| .>=          | 大于等于       |      |       |
| BETWEEN…and… | 在什么什么之间 |      |       |
| AND          | &&             |      |       |
| OR           | \|\|或         |      |       |



**注意**：

- 字段是数据库的列，尽量带上``
- where后面是筛选的条件，如果没有指定则会修改所有的列
- value是一个具体的值也可以是变量（比如时间，日期）
- 多个设置属性之间用英文的逗号隔开



#### 查询表数据

SELECT 语法

```mysql
SELECT [ALL | DISTINCT]
{* | table.* | [table.field1[as alias1][,table.field2[as alias2]][,...]]}
FROM table_name [as table_alias]
  [left | right | inner join table_name2]  -- 联合查询
  [WHERE ...]  -- 指定结果需满足的条件
  [GROUP BY ...]  -- 指定结果按照哪几个字段来分组
  [HAVING]  -- 过滤分组的记录必须满足的次要条件
  [ORDER BY ...]  -- 指定查询记录按一个或多个条件排序
  [LIMIT {[offset,]row_count | row_countOFFSET offset}];
   -- 指定查询的记录从哪条至哪条
```

**注意 : [ ] 括号代表可选的 , { }括号代表必选得**



```mysql
-- 查询所有学生信息
SELECT * FROM student;

-- 查询指定列(学号 , 姓名)
SELECT studentno,studentname FROM student;
```



------



#### AS 取别名

作用：

- 可给数据列取一个新别名
- 可给子查询取别名
- 可给表取一个新别名
- 可把经计算或总结的结果用另一个新名称来代替



```mysql
-- 这里是为列取别名(当然as关键词可以省略)
SELECT studentno AS 学号,studentname AS 姓名 FROM student;

-- 使用as也可以为表取别名
SELECT studentno AS 学号,studentname AS 姓名 FROM student AS s;

-- 使用as,为查询结果取一个新名字
-- CONCAT()函数拼接字符串
SELECT CONCAT('姓名:',studentname) AS 新姓名 FROM student;
```



#### DISTINCT 去重

```mysql
-- # 查看哪些同学参加了考试(学号) 去除重复项
SELECT * FROM result; -- 查看考试成绩
SELECT studentno FROM result; -- 查看哪些同学参加了考试
SELECT DISTINCT studentno FROM result; -- 了解:DISTINCT 去除重复项 , (默认是ALL)
```



#### 使用表达式

数据库中的表达式 : 一般由文本值 , 列值 , NULL , 函数和操作符等组成

应用场景 :

- SELECT语句返回结果列中使用
- SELECT语句中的ORDER BY , HAVING等子句中使用
- DML语句中的 where 条件语句中使用表达式
- 避免SQL返回结果中包含 ' . ' , ' * ' 和括号等干扰开发语言程序



```mysql
-- selcet查询中可以使用表达式
SELECT @@auto_increment_increment; -- 查询自增步长
SELECT VERSION(); -- 查询版本号
SELECT 100*3-1 AS 计算结果; -- 表达式

-- 学员考试成绩集体提分一分查看
SELECT studentno,StudentResult+1 AS '提分后' FROM result;
```



#### where 条件语句

作用：用于检索数据表中符合条件的记录。

搜索条件可由一个或多个逻辑表达式组成 , 结果一般为真或假。



> 逻辑操作符

| 运算符      | 语法               | 描述                               |
| ----------- | ------------------ | ---------------------------------- |
| AND 或 &&   | a AND b 或 a && b  | 逻辑与，同时为真结果才为真         |
| OR  或 \|\| | a OR b 或 a \|\| b | 逻辑或，只要有一个为真，则结果为真 |
| NOT 或 !    | NOT a 或 !a        | 逻辑非，若操作数为假，则结果为真   |



测试：

```mysql
-- 满足条件的查询(where)
SELECT Studentno,StudentResult FROM result;

-- 查询考试成绩在95-100之间的
SELECT Studentno,StudentResult
FROM result
WHERE StudentResult>=95 AND StudentResult<=100;

-- AND也可以写成 &&
SELECT Studentno,StudentResult
FROM result
WHERE StudentResult>=95 && StudentResult<=100;

-- 模糊查询(对应的词:精确查询)
SELECT Studentno,StudentResult
FROM result
WHERE StudentResult BETWEEN 95 AND 100;

-- 除了1000号同学,要其他同学的成绩
SELECT studentno,studentresult
FROM result
WHERE studentno!=1000;

-- 使用NOT
SELECT studentno,studentresult
FROM result
WHERE NOT studentno=1000;
```



> 模糊查询 ：比较操作符

| 运算符      | 语法              | 描述                      |
| ----------- | ----------------- | ------------------------- |
| IS NULL     | a is null         | 如果为null 则结果为真     |
| IS NOT NULL | a is not null     | 如果为not null 则结果为真 |
| BETWEEN     | a between b and c | a在b和c之间则结果为真     |
| **LIKE**    | a like b          | SQL匹配                   |
| **in**      | a in（a1,a2,a3…） | 假设a在a1，a2…中          |

注意：

- 数值数据类型的记录之间才能进行算术运算 
- 相同数据类型的数据之间才能进行比较 



测试：

```mysql
-- 模糊查询 between and \ like \ in \ null

-- =============================================
-- LIKE 按 * 的用法理解
-- =============================================
-- 查询姓刘的同学的学号及姓名
-- like结合使用的通配符 : % (代表0到任意个字符) _ (一个字符)
SELECT studentno,studentname FROM student
WHERE studentname LIKE '刘%';

-- 查询姓刘的同学,后面只有一个字的
SELECT studentno,studentname FROM student
WHERE studentname LIKE '刘_';

-- 查询姓刘的同学,后面只有两个字的
SELECT studentno,studentname FROM student
WHERE studentname LIKE '刘__';

-- 查询姓名中含有 嘉 字的
SELECT studentno,studentname FROM student
WHERE studentname LIKE '%嘉%';

-- 查询姓名中含有特殊字符的需要使用转义符号 '\'
-- 自定义转义符关键字: ESCAPE ':'

-- =============================================
-- IN
-- =============================================
-- 查询学号为1000,1001,1002的学生姓名
SELECT studentno,studentname FROM student
WHERE studentno IN (1000,1001,1002);

-- 查询地址在北京,南京,河南洛阳的学生
SELECT studentno,studentname,address FROM student
WHERE address IN ('北京','南京','河南洛阳');

-- =============================================
-- NULL 空
-- =============================================
-- 查询出生日期没有填写的同学
-- 不能直接写=NULL , 这是代表错误的 , 用 is null
SELECT studentname FROM student
WHERE BornDate IS NULL;

-- 查询出生日期填写的同学
SELECT studentname FROM student
WHERE BornDate IS NOT NULL;

-- 查询没有写家庭住址的同学(空字符串不等于null)
SELECT studentname FROM student
WHERE Address='' OR Address IS NULL;
```



#### 连表查询

> 笛卡尔乘积现象

![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210103212330051.png)



出现原因：没有有效的连接sh筛选条件

如何避免：添加有效的连接筛选条件



> 连接查询分类

按年代分类：

- sql92标准，MySQL只支持内连接
- sql99标准【推荐】，支持内连接 + 外连接（左外和右外） + 交叉连接



```mysql
/*
# sql92 语法，MySQL只支持内连接
select 查询列表 
from 表1 别名, 表2 别名
where 连接条件
[and 其他筛选条件]
[group by 分组]
[having 筛选条件]
[order by 排序列表]

*/

/*
# sql99 语法
select 查询列表 
from 表1 别名 [连接类型]
join 表2 别名 
on 连接条件
[where 筛选条件]
[group by 分组]
[having 筛选条件]
[order by 排序列表]

# 分类
★内连接：inner
外连接
	★左外连接：left [outer]
	★右外连接：right [outer]
	全外连接：full [outer]
交叉连接：cross

-- 应用场景
内连接：数据取交集，共同的部分
外连接：希望即使数据没有出现在另一张表，也保留下来
交叉连接：


*/
```



按功能分类：

- 内连接
  - 等值连接：筛选字段值相等（t1. id = t2.id）
  - 非等值连接：筛选条件在某个区间
  - 自连接：自己和自己连接（员工和领导的名称查找）

- 外连接
  - 左外连接：以左边的表为主表，右边关联的表行数据不存在则取null
  - 右外连接：以右边的表为主表，左边关联的表行数据不存在则取null
  - 全外连接：内连接结果 + 表1中有但表2没有的结果 + 表2中有但表1中没有的结果，最大化保留数据

- 交叉连接：使用 sql99 语法实现的笛卡尔乘积


![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/sql-join.png)



**常用 join 方式对比**

| 操作       | 描述                                                   |
| ---------- | ------------------------------------------------------ |
| inner join | 如果表中至少有一个匹配，就返回行                       |
| left join  | 以左表为主，会从左表中返回所有的值，即使右表中没有匹配 |
| right join | 以右表为主，会从右表中返回所有的值，即使左表中没有匹配 |



测试：

```mysql
/*
连接查询
   如需要多张数据表的数据进行查询,则可通过连接运算符实现多个查询
内连接 inner join
   查询两个表中的结果集中的交集
外连接 outer join
   左外连接 left join
       (以左表作为基准,右边表来一一匹配,匹配不上的,返回左表的记录,右表以NULL填充)
   右外连接 right join
       (以右表作为基准,左边表来一一匹配,匹配不上的,返回右表的记录,左表以NULL填充)
       
等值连接和非等值连接

自连接
*/

-- 查询参加了考试的同学信息(学号,学生姓名,科目编号,分数)
SELECT * FROM student;
SELECT * FROM result;

/*思路:
(1):分析需求,确定查询的列来源于两个类,student result,连接查询
(2):确定使用哪种连接查询?(内连接)
*/
SELECT s.studentno,studentname,subjectno,StudentResult
FROM student s
INNER JOIN result r
ON r.studentno = s.studentno

-- 右连接(也可实现)
SELECT s.studentno,studentname,subjectno,StudentResult
FROM student s
RIGHT JOIN result r
ON r.studentno = s.studentno

-- 等值连接
SELECT s.studentno,studentname,subjectno,StudentResult
FROM student s , result r
WHERE r.studentno = s.studentno

-- 左连接 (查询了所有同学,不考试的也会查出来)
SELECT s.studentno,studentname,subjectno,StudentResult
FROM student s
LEFT JOIN result r
ON r.studentno = s.studentno

-- 查一下缺考的同学(左连接应用场景)
SELECT s.studentno,studentname,subjectno,StudentResult
FROM student s
LEFT JOIN result r
ON r.studentno = s.studentno
WHERE StudentResult IS NULL

-- 思考题:查询参加了考试的同学信息(学号,学生姓名,科目名,分数)
SELECT s.studentno,studentname,subjectname,StudentResult
FROM student s
INNER JOIN result r
ON r.studentno = s.studentno
INNER JOIN `subject` sub
ON sub.subjectno = r.subjectno
```



> 自连接：把一张表拆成两张一样的表

```mysql
/*
自连接
   数据表与自身进行连接

需求:从一个包含栏目ID , 栏目名称和父栏目ID的表中
    查询父栏目名称和其他子栏目名称
*/

-- 创建一个表
CREATE TABLE `category` (
`categoryid` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主题id',
`pid` INT(10) NOT NULL COMMENT '父id',
`categoryName` VARCHAR(50) NOT NULL COMMENT '主题名字',
PRIMARY KEY (`categoryid`)
) ENGINE=INNODB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8

-- 插入数据
INSERT INTO `category` (`categoryid`, `pid`, `categoryName`)
VALUES('2','1','信息技术'),
('3','1','软件开发'),
('4','3','数据库'),
('5','1','美术设计'),
('6','3','web开发'),
('7','5','ps技术'),
('8','2','办公信息');



-- 编写SQL语句,将栏目的父子关系呈现出来 (父栏目名称,子栏目名称)
-- 核心思想:把一张表看成两张一模一样的表,然后将这两张表连接查询(自连接)
SELECT a.categoryName AS '父栏目',b.categoryName AS '子栏目'
FROM category AS a,category AS b
WHERE a.`categoryid`=b.`pid`



-- 思考题:查询参加了考试的同学信息(学号,学生姓名,科目名,分数)
SELECT s.studentno,studentname,subjectname,StudentResult
FROM student s
INNER JOIN result r
ON r.studentno = s.studentno
INNER JOIN `subject` sub
ON sub.subjectno = r.subjectno

-- 查询学员及所属的年级(学号,学生姓名,年级名)
SELECT studentno AS 学号,studentname AS 学生姓名,gradename AS 年级名称
FROM student s
INNER JOIN grade g
ON s.`GradeId` = g.`GradeID`

-- 查询科目及所属的年级(科目名称,年级名称)
SELECT subjectname AS 科目名称,gradename AS 年级名称
FROM SUBJECT sub
INNER JOIN grade g
ON sub.gradeid = g.gradeid

-- 查询 数据库结构-1 的所有考试结果(学号 学生姓名 科目名称 成绩)
SELECT s.studentno,studentname,subjectname,StudentResult
FROM student s
INNER JOIN result r
ON r.studentno = s.studentno
INNER JOIN `subject` sub
ON r.subjectno = sub.subjectno
WHERE subjectname='数据库结构-1'
```



#### union 联合查询

- union

- union all



UNION 与 UNION ALL 的区别

1. 对重复结果的处理：UNION 会去掉重复记录，UNION ALL 不会

2. 对排序的处理：UNION 会排序，UNION ALL 只是简单地将两个结果集合并

3. 效率方面的区别：因为 UNION 会做去重和排序处理，因此效率比 UNION ALL 慢很多



union 前后语句 select 查询的字段数量需一致，否则会报错。



#### 排序和分页

```mysql
/*============== 排序 ================
语法 : ORDER BY
   ORDER BY 语句用于根据指定的列对结果集进行排序。
   ORDER BY 语句默认按照ASC升序对记录进行排序。
   如果您希望按照降序对记录进行排序，可以使用 DESC 关键字。
   
*/

-- 查询 数据库结构-1 的所有考试结果(学号 学生姓名 科目名称 成绩)
-- 按成绩降序排序
SELECT s.studentno,studentname,subjectname,StudentResult
FROM student s
INNER JOIN result r
ON r.studentno = s.studentno
INNER JOIN `subject` sub
ON r.subjectno = sub.subjectno
WHERE subjectname='数据库结构-1'
ORDER BY StudentResult DESC

/*============== 分页 ================
语法 : SELECT * FROM table LIMIT [offset,] rows | rows OFFSET offset
好处 : (用户体验,网络传输,查询压力)

推导:
   第一页 : limit 0,5
   第二页 : limit 5,5
   第三页 : limit 10,5
   ......
   第N页 : limit (pageNo-1)*pageSzie,pageSzie
   [pageNo:页码,pageSize:单页面显示条数]
   
*/

-- 每页显示5条数据
SELECT s.studentno,studentname,subjectname,StudentResult
FROM student s
INNER JOIN result r
ON r.studentno = s.studentno
INNER JOIN `subject` sub
ON r.subjectno = sub.subjectno
WHERE subjectname='数据库结构-1'
ORDER BY StudentResult DESC , studentno
LIMIT 0,5

-- 查询 JAVA第一学年 课程成绩前10名并且分数大于80的学生信息(学号,姓名,课程名,分数)
SELECT s.studentno,studentname,subjectname,StudentResult
FROM student s
INNER JOIN result r
ON r.studentno = s.studentno
INNER JOIN `subject` sub
ON r.subjectno = sub.subjectno
WHERE subjectname='JAVA第一学年'
ORDER BY StudentResult DESC
LIMIT 0,10
```



#### 子查询

> 子查询的分类

按子查询出现的位置：

- select 后面
  - 仅仅支持标量子查询
- from 后面
  - 支持表子查询
- where 或 having 后面 ★
  - 标量子查询（单行） ✓
  - 列子查询（多行） ✓
  - 行自查询
- exists 后面（也叫做相关子查询）只关心子查询有没有结果，有则为1，没有则为0
  - 表子查询



按结果集的行、列数：

- 标量子查询（结果集只有一行一列）
- 列子查询（结果集只有一列多行）
- 行自查询（结果集有一行多列）
- 表子查询（结果集一般为多行多列）



```mysql
/*============== 子查询 ================
什么是子查询?
   在查询语句中的WHERE条件子句中,又嵌套了另一个查询语句
   嵌套查询可由多个子查询组成,求解的方式是由里及外;
   子查询返回的结果一般都是集合,故而建议使用IN关键字;
*/

-- 查询 数据库结构-1 的所有考试结果(学号,科目编号,成绩),并且成绩降序排列
-- 方法一:使用连接查询
SELECT studentno,r.subjectno,StudentResult
FROM result r
INNER JOIN `subject` sub
ON r.`SubjectNo`=sub.`SubjectNo`
WHERE subjectname = '数据库结构-1'
ORDER BY studentresult DESC;

-- 方法二:使用子查询(执行顺序:由里及外)
SELECT studentno,subjectno,StudentResult
FROM result
WHERE subjectno=(
   SELECT subjectno FROM `subject`
   WHERE subjectname = '数据库结构-1'
)
ORDER BY studentresult DESC;

-- 查询课程为 高等数学-2 且分数不小于80分的学生的学号和姓名
-- 方法一:使用连接查询
SELECT s.studentno,studentname
FROM student s
INNER JOIN result r
ON s.`StudentNo` = r.`StudentNo`
INNER JOIN `subject` sub
ON sub.`SubjectNo` = r.`SubjectNo`
WHERE subjectname = '高等数学-2' AND StudentResult>=80

-- 方法二:使用连接查询+子查询
-- 分数不小于80分的学生的学号和姓名
SELECT r.studentno,studentname FROM student s
INNER JOIN result r ON s.`StudentNo`=r.`StudentNo`
WHERE StudentResult>=80

-- 在上面SQL基础上,添加需求:课程为 高等数学-2
SELECT r.studentno,studentname FROM student s
INNER JOIN result r ON s.`StudentNo`=r.`StudentNo`
WHERE StudentResult>=80 AND subjectno=(
   SELECT subjectno FROM `subject`
   WHERE subjectname = '高等数学-2'
)

-- 方法三:使用子查询
-- 分步写简单sql语句,然后将其嵌套起来
SELECT studentno,studentname FROM student WHERE studentno IN(
   SELECT studentno FROM result WHERE StudentResult>=80 AND subjectno=(
       SELECT subjectno FROM `subject` WHERE subjectname = '高等数学-2'
  )
)

/*
练习题目:
   查 C语言-1 的前5名学生的成绩信息(学号,姓名,分数)
   使用子查询,查询郭靖同学所在的年级名称
*/
```



### 表数据处理转换

- [mysql 行转列 列转行](https://www.cnblogs.com/xiaoxi/p/7151433.html)



#### 行转列

1. 使用case…when…then
2. 使用SUM(IF()) 生成列
3. 使用SUM(IF()) 生成列 + WITH ROLLUP 生成汇总行
4. 使用SUM(IF()) 生成列，直接生成汇总结果，不再利用子查询
5. 使用SUM(IF()) 生成列 + UNION 生成汇总行,并利用 IFNULL将汇总行标题显示为 Total
6. 动态查询列值不确定的情况
7. 合并字段显示：group_concat()



> **with rollup**
>
> 有时候，你会发现有的题目很难解答，可能是你不知道有对应的语法或函数

使用 WITH ROLLUP，此函数是对聚合函数进行求和，注意 with rollup是对 group by 后的第一个字段，进行分组求和。

![](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/20210420205041855.png)



#### 列转行

使用 union all 联合查询，得到多行记录。





## 数据值和列类型

- [MySQL 数据类型](https://www.runoob.com/mysql/mysql-data-types.html)



### 数值

| 类型         | 大小                                     | 范围（有符号）                                               | 范围（无符号）                                               | 用途            |
| :----------- | :--------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :-------------- |
| TINYINT      | 1 byte                                   | (-128，127)                                                  | (0，255)                                                     | 小整数值        |
| SMALLINT     | 2 bytes                                  | (-32 768，32 767)                                            | (0，65 535)                                                  | 大整数值        |
| MEDIUMINT    | 3 bytes                                  | (-8 388 608，8 388 607)                                      | (0，16 777 215)                                              | 大整数值        |
| INT或INTEGER | 4 bytes                                  | (-2 147 483 648，2 147 483 647)                              | (0，4 294 967 295)                                           | 大整数值        |
| BIGINT       | 8 bytes                                  | (-9,223,372,036,854,775,808，9 223 372 036 854 775 807)      | (0，18 446 744 073 709 551 615)                              | 极大整数值      |
| FLOAT        | 4 bytes                                  | (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38) | 0，(1.175 494 351 E-38，3.402 823 466 E+38)                  | 单精度 浮点数值 |
| DOUBLE       | 8 bytes                                  | (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 双精度 浮点数值 |
| DECIMAL      | 对DECIMAL(M,D) ，如果M>D，为M+2否则为D+2 | 依赖于M和D的值                                               | 依赖于M和D的值                                               | 小数值          |



**MySQL中 int(M) 和 tinyint(M) 数值类型中 M 值的意义**

https://www.cnblogs.com/totian/p/7065123.html



1. 整数型的数值类型已经限制了取值范围，有符号整型和无符号整型都有，而M值并不代表可以存储的数值字符长度，它代表的是数据在显示时显示的最小长度。

2. 当存储的字符长度超过M值时，没有任何的影响，只要不超过数值类型限制的范围。

3. 当存储的字符长度小于M值时，只有在设置了zerofill用0来填充，才能够看到效果，换句话就是说，没有zerofill，M值就是无用的。

 

总结：int(11)，tinyint(1)，bigint(20)，后面的数字，不代表占用空间容量。而代表最小显示位数。这个东西基本没有意义，除非你对字段指定 zerofill。

所以在设计 mysql 数据库时，建表时，mysql会自动分配长度：int(11)、tinyint(4)、smallint(6)、mediumint(9)、bigint(20)。

所以，就用这些默认的显示长度就可以了。不用再去自己填长度，比如搞个int(10)、tinyint(1)之类的，基本没用。而且导致表的字段类型多样化。



### 日期和时间类型

| 类型      | 大小 ( bytes) | 范围                                                         | 格式                | 用途                     |
| :-------- | :------------ | :----------------------------------------------------------- | :------------------ | :----------------------- |
| DATE      | 3             | 1000-01-01/9999-12-31                                        | YYYY-MM-DD          | 日期值                   |
| TIME      | 3             | '-838:59:59'/'838:59:59'                                     | HH:MM:SS            | 时间值或持续时间         |
| YEAR      | 1             | 1901/2155                                                    | YYYY                | 年份值                   |
| DATETIME  | 8             | 1000-01-01 00:00:00/9999-12-31 23:59:59                      | YYYY-MM-DD HH:MM:SS | 混合日期和时间值         |
| TIMESTAMP | 4             | 1970-01-01 00:00:00/2038结束时间是第 **2147483647** 秒，北京时间 **2038-1-19 11:14:07**，格林尼治时间 2038年1月19日 凌晨 03:14:07 | YYYYMMDD HHMMSS     | 混合日期和时间值，时间戳 |



### 字符串类型

| 类型       | 大小                  | 用途                            |
| :--------- | :-------------------- | :------------------------------ |
| CHAR       | 0-255 bytes           | 定长字符串                      |
| VARCHAR    | 0-65535 bytes         | 变长字符串                      |
| TINYBLOB   | 0-255 bytes           | 不超过 255 个字符的二进制字符串 |
| TINYTEXT   | 0-255 bytes           | 短文本字符串                    |
| BLOB       | 0-65 535 bytes        | 二进制形式的长文本数据          |
| TEXT       | 0-65 535 bytes        | 长文本数据                      |
| MEDIUMBLOB | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据    |
| MEDIUMTEXT | 0-16 777 215 bytes    | 中等长度文本数据                |
| LONGBLOB   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据        |
| LONGTEXT   | 0-4 294 967 295 bytes | 极大文本数据                    |

**注意**：char(n) 和 varchar(n) 中括号中 n 代表字符的个数，并不代表字节个数，比如 CHAR(30) 就可以存储 30 个字符。

CHAR 和 VARCHAR 类型类似，但它们保存和检索的方式不同。它们的最大长度和是否尾部空格被保留等方面也不同。在存储或检索过程中不进行大小写转换。



**char 与 varchar 的区别：**

https://www.cnblogs.com/starfish29/p/12492028.html

1. 长度大小区别：

- CHAR(M)定义的列的长度为固定的，M取值可以为0～255之间。
- VARCHAR(M)定义的列的长度为可变长，M取值可以为0~65535之间，(VARCHAR的最大有效长度由最大行大小和使用 的字符集确定。整体最大长度是65,532字节）。

2. 存数据时的区别：

- CHAR值存储时，如果字符数没有达到定义的位数，会在后面用空格补全，再存入数据库中。比如定义 CHAR(10)，那么不论存储的数据是否达到了10个字节，都要占去10个字节的空间,不足的自动用空格填充。
- VARCHAR值保存时只保存需要的字符数，另加一个字节来记录长度（如果列声明的长度超过255，则使用两个字节），因为VARCHAR是长度可变，保存长度便于直接读取长度。VARCHAR值保存时不进行填充。

3. 取数据时的区别：

数据库取CHAR值时，尾部的空格会被删除；
数据库取VARCHAR值时，尾部的空格仍然保留。


总结：


CHAR定长，一般用于固定长度的表单提交数据存储 ；例如：身份证号，手机号，电话，密码等；而VARCHAR不定长。

从空间上考虑，VARCHAR更好，从效率上考虑，CHAR更好。



**何时使用char类型,何时使用varchar类型的列?**

在使用 myisam 引擎的情况下，定长表虽然可能占用较多的存储空间，但是它会加快检索和全表扫描的速度，此时适合选用 char 的列，而对于表中的变长的列，可以采用分表的方法把变长的列拆分出去，提高定长表的检索性能。而如果使用的是 innodb 的引擎，由于 innodb 的 mvcc 策略的实施，char 数据类型相对于 varchar 类型几乎没有任何优势，反而 varchar 列可能节省更多的存储空间，建议使用varchar数据类型。



BINARY 和 VARBINARY 类似于 CHAR 和 VARCHAR，不同的是它们包含二进制字符串而不要非二进制字符串。也就是说，它们包含字节字符串而不是字符字符串。这说明它们没有字符集，并且排序和比较基于列值字节的数值值。

BLOB 是一个二进制大对象，可以容纳可变数量的数据。有 4 种 BLOB 类型：TINYBLOB、BLOB、MEDIUMBLOB 和 LONGBLOB。它们区别在于可容纳存储范围不同。

有 4 种 TEXT 类型：TINYTEXT、TEXT、MEDIUMTEXT 和 LONGTEXT。对应的这 4 种 BLOB 类型，可存储的最大长度不同，可根据实际情况选择。



### NULL

- 理解为 ”没有值” 或 “未知值”
- 注意，==不要用 NULL 进行算术运算 , 结果仍为 NULL==



## 数据字段属性

**UnSigned**

- 无符号的
- 声明该数据列不允许负数

**ZEROFILL**

- 0填充的
- 不足位数的用0来填充 , 如int(3),5则为005

**Auto_InCrement**

- 自动增长的 , 每添加一条数据 , 自动在上一个记录数上加 1(默认)

- 通常用于设置**主键** , 且为整数类型

- 可定义起始值和步长

- - 当前表设置步长(AUTO_INCREMENT=100) : 只影响当前表
  - SET @@auto_increment_increment=5 ; 影响所有使用自增的表(全局)

**NULL 和 NOT NULL**

- 默认为NULL , 即没有插入该列的数值
- 如果设置为NOT NULL , 则该列必须有值

**DEFAULT**

- 默认的
- 用于设置默认值
- 例如,性别字段,默认为"男" , 否则为 "女" ; 若无指定该列的值 , 则默认值为"男"的值



> 测试实践，加深理解

```mysql
-- 目标 : 创建一个school数据库
-- 创建学生表(列,字段)
-- 学号int 登录密码varchar(20) 姓名,性别varchar(2),出生日期(datatime),家庭住址,email
-- 创建表之前 , 一定要先选择数据库

CREATE TABLE IF NOT EXISTS `student` (
`id` int(4) NOT NULL AUTO_INCREMENT COMMENT '学号',
`name` varchar(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
`pwd` varchar(20) NOT NULL DEFAULT '123456' COMMENT '密码',
`sex` varchar(2) NOT NULL DEFAULT '男' COMMENT '性别',
`birthday` datetime DEFAULT NULL COMMENT '生日',
`address` varchar(100) DEFAULT NULL COMMENT '地址',
`email` varchar(50) DEFAULT NULL COMMENT '邮箱',
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

-- 查看数据库的定义
SHOW CREATE DATABASE school;
-- 查看数据表的定义
SHOW CREATE TABLE student;
-- 显示表结构
DESC student;  -- 设置严格检查模式(不能容错了)SET sql_mode='STRICT_TRANS_TABLES';
```



## 数据表的类型

### 设置数据表的索引类型

```mysql
CREATE TABLE 表名(
   -- 省略一些代码
   -- Mysql注释
   -- 1. # 单行注释
   -- 2. /*...*/ 多行注释
)ENGINE = MyISAM (or InnoDB)

-- 查看mysql所支持的引擎类型 (表类型)
SHOW ENGINES;
```



### 数据库引擎概念

INNODB：默认使用

MYISAM：以前使用

MySQL的数据表的类型 : **MyISAM** , **InnoDB** , HEAP , BOB , CSV等...



常见的 MyISAM 与 InnoDB 类型：

| 名称       | INNODB        | MYISAM |
| ---------- | ------------- | ------ |
| 事务支持   | 支持          | 不支持 |
| 数据行锁定 | 支持          | 不支持 |
| 外键       | 支持          | 不支持 |
| 全文索引   | 不支持        | 支持   |
| 表空间大小 | 较大，约 2 倍 | 较小   |

常规使用操作：

- MYISAM：节约空间，速度较快
- INNODB：安全性高，事物的处理，多表多用户操作



### 设置数据库表的字符集编码

不设置的话 MySQL 的默认字符集编码（Latin1）不支持中文。



创建表的时候指定，每次建表都要设置。建议每次建表都指定，方便导出 SQL 给别人用。

```mysql
CHARSET=utf8
```



在 my.ini 中配置默认的编码，一次设置，永久生效。

注意，如果 SQL 中没有指定，导出 SQL 给别人用的时候，如果其他人没有配置编码，就会出现编码问题。

```ini
charter-set-server=utf8
```



## 数据库数据存放位置

所有的数据库文件都在date目录下，本质还是文件的存储！

MySQL引擎在物理文件上的区别：

- INNODB：在数据库中只有一个**.frm文件，以及上级目录下的ibdata1文件
- MYISAM：对应的文件
  - *.frm表结构的定义文件
  - *.MYD数据文件 (data)
  - *.MYI索引文件 (index)



## 数据管理

### 外键

**外键概念**

如果公共关键字在一个关系中是主关键字，那么这个公共关键字被称为另一个关系的外键。由此可见，外键表示了两个关系之间的相关联系。以另一个关系的外键作主关键字的表被称为**主表**，具有此外键的表被称为主表的**从表**。

在实际操作中，将一个表的值放入第二个表来表示关联，所使用的值是第一个表的主键值（在必要时可包括复合主键值）。此时，第二个表中保存这些值的属性称为外键（**foreign key**）。



**外键作用**

保持数据**一致性**，**完整性**，主要目的是控制存储在外键表中的数据,**约束**。使两张表形成关联，外键只能引用外表中的列的值或使用空值。



**创建外键**

方式一：建表时指定外键约束

```mysql
-- 创建外键的方式一 : 创建子表同时创建外键

-- 年级表 (id\年级名称)
CREATE TABLE `grade` (
`gradeid` INT(10) NOT NULL AUTO_INCREMENT COMMENT '年级ID',
`gradename` VARCHAR(50) NOT NULL COMMENT '年级名称',
PRIMARY KEY (`gradeid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

-- 学生信息表 (学号,姓名,性别,年级,手机,地址,出生日期,邮箱,身份证号)
CREATE TABLE `student` (
`studentno` INT(4) NOT NULL COMMENT '学号',
`studentname` VARCHAR(20) NOT NULL DEFAULT '匿名' COMMENT '姓名',
`sex` TINYINT(1) DEFAULT '1' COMMENT '性别',
`gradeid` INT(10) DEFAULT NULL COMMENT '年级',
`phoneNum` VARCHAR(50) NOT NULL COMMENT '手机',
`address` VARCHAR(255) DEFAULT NULL COMMENT '地址',
`borndate` DATETIME DEFAULT NULL COMMENT '生日',
`email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱',
`idCard` VARCHAR(18) DEFAULT NULL COMMENT '身份证号',
PRIMARY KEY (`studentno`),
KEY `FK_gradeid` (`gradeid`),
CONSTRAINT `FK_gradeid` FOREIGN KEY (`gradeid`) REFERENCES `grade` (`gradeid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8
```



方式二：建表后修改

```mysql
-- 创建外键方式二 : 创建子表完毕后,修改子表添加外键
ALTER TABLE `student`
ADD CONSTRAINT `FK_gradeid` FOREIGN KEY (`gradeid`) REFERENCES `grade` (`gradeid`);

```



**删除外键**

操作：删除 grade 年级表，发现报错。

![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201231145204294.png)



**注意** : 删除具有主外键关系的表时 , 要先删子表 , 后删主表。

```mysql
-- 删除外键
ALTER TABLE student DROP FOREIGN KEY FK_gradeid;
-- 发现执行完上面的,索引还在,所以还要删除索引
-- 注:这个索引是建立外键的时候默认生成的
ALTER TABLE student DROP INDEX FK_gradeid;
```



> 关于数据库外键的实践

- 不建议使用数据库级别的外键，以免数据库表过多造成==外键约束混乱==的困扰。
- 数据库就是单纯的表，只用来存数据，只有行（数据）和列（字段）。
- 业务中使用多张表关联数据，可以在应用层实现。



参考：

- 阿里开发手册：**【强制】不得使用外键与级联，一切外键概念必须在应用层解决。 **

- [数据库中为什么不推荐使用外键约束](https://www.cnblogs.com/rjzheng/p/9907304.html)



**每次做 DELETE 或者 UPDATE 都必须考虑外键约束，会导致开发的时候很痛苦，测试数据极为不方便。**

![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201231150825209.png)



### 触发器





# 函数

记录一些比较常用的函数，其他详细函数，可以搜索查找资料。

## 数据函数

```mysql
SELECT ABS(-8);  /*绝对值*/
SELECT CEILING(9.5); /*向上取整*/
SELECT FLOOR(9.5);   /*向下取整*/
SELECT RAND();  /*随机数,返回一个0-1之间的随机数*/
SELECT SIGN(0); /*符号函数: 负数返回-1,正数返回1,0返回0*/
```



## 字符串函数

```mysql
SELECT CHAR_LENGTH('面子有毛用？又不能换钱！'); /*返回字符串包含的字符数*/
SELECT CONCAT('我','爱','程序');  /*合并字符串,参数可以有多个*/
SELECT INSERT('我爱编程helloworld',1,2,'超级热爱');  /*替换字符串,从某个位置开始替换某个长度*/
SELECT LOWER('MySQL'); /*小写*/
SELECT UPPER('MySQL'); /*大写*/
SELECT LEFT('hello,world',5);   /*从左边截取*/
SELECT RIGHT('hello,world',5);  /*从右边截取*/
SELECT REPLACE('面子有毛用？又不能换钱！','毛','什么');  /*替换字符串*/
SELECT SUBSTR('面子有毛用？又不能换钱！',4,6); /*截取字符串,开始和长度*/
SELECT REVERSE('面子有毛用？又不能换钱！'); /*反转

-- 查询姓周的同学,改成邹
SELECT REPLACE(studentname,'周','邹') AS 新名字
FROM student WHERE studentname LIKE '周%';
```



## 日期和时间函数

```mysql
SELECT CURRENT_DATE();   /*获取当前日期*/
SELECT CURDATE();   /*获取当前日期*/
SELECT NOW();   /*获取当前日期和时间*/
SELECT LOCALTIME();   /*获取当前日期和时间*/
SELECT SYSDATE();   /*获取当前日期和时间*/
 
-- 获取年月日,时分秒
SELECT YEAR(NOW());
SELECT MONTH(NOW());
SELECT DAY(NOW());
SELECT HOUR(NOW());
SELECT MINUTE(NOW());
SELECT SECOND(NOW());
```



## 系统信息函数

```mysql
SELECT VERSION();  /*版本*/
SELECT USER();     /*用户*/
```



## 流程控制函数

### if 函数，达到 if-else 的效果

```mysql
-- if (exepr1, exepr2, exepr3)
select if (5 > 10, '大', '小'); 

-- if else 实现多重分支
if 条件1 then 语句1
elseif 条件2 then 语句2
...
else 语句n
end if;

```



### case 表达式使用方式一，switch case 的效果

```mysql
/*
[java]
switch (变量或表达式) {
	case 常量1: 语句1; break;
	...
	default: 语句n; break;
}

[mysql]
case 要判断的字段或表达式
when 常量1 then 要显示的值1或语句1; -- 显示值的时候，不用加“;”，否则语句就结束了
when 常量1 then 要显示的值2或语句2;
...
else 要显示的值n或语句n;
end
*/

select salary 原始工资, dept_id, 
case dept_id 
when 30 then salary*1.1 
when 40 then salary*1.2 
when 50 then salary*1.3 
else salary 
end as 新工资 
form employees;

```



### case 表达式使用方式二，类似多重 if

```mysql
/*
[java]
if (条件1) {
	语句1;
} else if (条件2) {
	语句2;
} else if (...) {
	...
} else {
	语句n;
}

[mysql]
case 
when 条件1 then 要显示的值1或语句1; -- 显示值的时候，不用加“;”，否则语句就结束了
when 条件2 then 要显示的值2或语句2;
...
else 要显示的值n或语句n;
end
*/

select salary, 
case  
when salary >= 20000 then 'A' 
when salary >= 15000 then 'B'
when salary >= 10000 then 'C'
else 'D' 
end as 工资级别 
form employees;

```



### 循环结构

```mysql
-- 分类
while、loop、repeat

-- 循环控制
iterate 类似 continue，跳出本次循环，开始下一次循环
leave 类似 break，结束循环，没有下一次

-- while 先判断后执行
[循环名称:]while(循环条件) do
	循环体;
end while 循环名称;

-- loop 没有条件，需要自己添加判断条件
[循环名称:]loop
	循环体;
end loop 循环名称;

-- repeat 先执行后判断，相当于 do-while
[循环名称:]repeat
	循环体;
	until 循环结束条件;
end repeat 循环名称;

```



## 分组函数

| 函数名称 | 描述                                                     |
| -------- | -------------------------------------------------------- |
| COUNT()  | 返回满足 Select 条件的记录总和数。                       |
| SUM()    | 返回数字字段或表达式列作统计，返回一列的总和。           |
| AVG()    | 通常为数值字段或表达列作统计，返回一列的平均值           |
| MAX()    | 可以为数值字段，字符字段或表达式列作统计，返回最大的值。 |
| MIN()    | 可以为数值字段，字符字段或表达式列作统计，返回最小的值。 |



```mysql
-- 聚合函数
/*COUNT:非空的*/
SELECT COUNT(studentname) FROM student;
SELECT COUNT(*) FROM student;
SELECT COUNT(1) FROM student;  /*推荐*/

-- 从含义上讲，count(1) 与 count(*) 都表示对全部数据行的查询。
-- count(字段) 会统计该字段在表中出现的次数，忽略字段为null 的情况。即不统计字段为null 的记录。
-- count(*) 包括了所有的列，相当于行数，在统计结果的时候，包含字段为null 的记录；
-- count(1) 用1代表代码行，在统计结果的时候，包含字段为null 的记录 。
/*
很多人认为count(1)执行的效率会比count(*)高，原因是count(*)会存在全表扫描，而count(1)可以针对一个字段进行查询。其实不然，count(1)和count(*)都会对全表进行扫描，统计所有记录的条数，包括那些为null的记录，因此，它们的效率可以说是相差无几。而count(字段)则与前两者不同，它会统计该字段不为null的记录条数，因为要判断是否为NULL，效率稍微低一点。

下面它们之间的一些对比：

1）在表没有主键时，count(1)比count(*)快
2）有主键时，主键作为计算条件，count(主键)效率最高；
3）若表格只有一个字段，则count(*)效率较高。

实际开发，通常使用 count(*) 统计行数就可以了。

*/

SELECT SUM(StudentResult) AS 总和 FROM result;
SELECT AVG(StudentResult) AS 平均分 FROM result;
SELECT MAX(StudentResult) AS 最高分 FROM result;
SELECT MIN(StudentResult) AS 最低分 FROM result;
```



> count(*) 与 count(1)  的理解

![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210103201739678.png)



练习：

```mysql
-- 查询不同课程的平均分,最高分,最低分
-- 前提:根据不同的课程进行分组

SELECT subjectname,AVG(studentresult) AS 平均分,MAX(StudentResult) AS 最高分,MIN(StudentResult) AS 最低分
FROM result AS r
INNER JOIN `subject` AS s
ON r.subjectno = s.subjectno
GROUP BY r.subjectno
HAVING 平均分>80;

/*
where写在group by前面.
要是放在分组后面的筛选
要使用HAVING
因为having是从前面筛选的字段再筛选，而where是从数据表中的>字段直接进行的筛选的
*/
```



## MD5 加密函数

**MD5 简介**

MD5即Message-Digest Algorithm 5（信息-摘要算法5），用于确保信息传输完整一致。是计算机广泛使用的杂凑算法之一（又译摘要算法、哈希算法），主流编程语言普遍已有MD5实现。将数据（如汉字）运算为另一固定长度值，是杂凑算法的基础原理，MD5的前身有MD2、MD3和MD4。



```mysql
select md5('123456');
```



## 常用函数小结

```mysql
-- ================ 内置函数 ================
-- 数值函数
abs(x)            -- 绝对值 abs(-10.9) = 10
format(x, d)    -- 格式化千分位数值 format(1234567.456, 2) = 1,234,567.46
ceil(x)            -- 向上取整 ceil(10.1) = 11
floor(x)        -- 向下取整 floor (10.1) = 10
round(x)        -- 四舍五入去整
mod(m, n)        -- m%n m mod n 求余 10%3=1
pi()            -- 获得圆周率
pow(m, n)        -- m^n
sqrt(x)            -- 算术平方根
rand()            -- 随机数
truncate(x, d)    -- 截取d位小数

-- 时间日期函数
now(), current_timestamp();     -- 当前日期时间
current_date();                    -- 当前日期
current_time();                    -- 当前时间
date('yyyy-mm-dd hh:ii:ss');    -- 获取日期部分
time('yyyy-mm-dd hh:ii:ss');    -- 获取时间部分
date_format('yyyy-mm-dd hh:ii:ss', '%d %y %a %d %m %b %j');    -- 格式化时间
unix_timestamp();                -- 获得unix时间戳
from_unixtime();                -- 从时间戳获得时间

-- 字符串函数
length(string)            -- string长度，字节
char_length(string)        -- string的字符个数
substring(str, position [,length])        -- 从str的position开始,取length个字符
replace(str ,search_str ,replace_str)    -- 在str中用replace_str替换search_str
instr(string ,substring)    -- 返回substring首次在string中出现的位置
concat(string [,...])    -- 连接字串
charset(str)            -- 返回字串字符集
lcase(string)            -- 转换成小写
left(string, length)    -- 从string2中的左边起取length个字符
load_file(file_name)    -- 从文件读取内容
locate(substring, string [,start_position])    -- 同instr,但可指定开始位置
lpad(string, length, pad)    -- 重复用pad加在string开头,直到字串长度为length
ltrim(string)            -- 去除前端空格
repeat(string, count)    -- 重复count次
rpad(string, length, pad)    --在str后用pad补充,直到长度为length
rtrim(string)            -- 去除后端空格
strcmp(string1 ,string2)    -- 逐字符比较两字串大小

-- 聚合函数
count()
sum();
max();
min();
avg();
group_concat()

-- 其他常用函数
md5();
default();

```



## 自定义函数

### 变量

**系统变量**

- 全局变量
- 会话变量

**自定义变量**

- 用户变量
- 局部变量



#### 系统变量

系统提供，不是用户定义，属于服务器层面。

注意：**服务器重启后，修改的全局变量会失效。**永久设置，需要在配置文件中设置。



```mysql
-- 查看系统/全局变量
show global variables;

-- 查看会话变量
show session variables;

-- 查看满足条件的部分系统变量
show global|session variables like %char%;

-- 查看指定变量
show @@global.变量名;
show @@session.变量名;

-- 变量赋值
set global|session key = value;
set @@global|session key = value;

```



#### 用户变量

作用域：仅在当前 session 会话有效。

```mysql
-- 方式一：通过 set 或 select
set @变量名 = 值;
set @变量名 := 值;
select @变量名 := 值;

-- 方式二：select 字段 into 变量 from 表;

-- 查看变量
select @变量名;

```



#### 局部变量

作用域：只能在 begin end中，且为第一句。

```mysql
-- 声明
declare 变量名 类型;
declare 变量名 类型 default 值;

-- 赋值
set 局部变量名 = 值;
set 局部变量名 := 值;
select @局部变量名 := 值;
select 字段 into 局部变量 from 表;

-- 使用
select 局部变量名;

```



### 函数的语法

```mysql
create function 函数名(参数列表) returns 返回类型
begin
	函数体
end

注意：
参数列表包含两部分
参数名 参数类型

函数体
必须有 return 返回值，如果没有会报错。

函数体只有一句的时候，可以省略 begin end
使用 delimiter 定义结束标记

调用函数
select 函数名(参数列表);

```



### 函数的 CRUD

```mysql
# 创建函数
-- 无参函数
drop function if exists f_test_empty;
delimiter // -- 自定义结束标记
create function f_test_empty() returns int
comment '测试无参函数'
begin
	declare c int default 0;
	select count(*) into c from user where user_name like 'test%';
	return c;
end //
delimiter ; -- 重置结束标记为 ;

-- 调用函数
select f_test_empty();


-- 有参函数
drop function if exists f_test_params;
delimiter // -- 自定义结束标记
create function f_test_params(name_str varchar(20), mobile_str varchar(20)) returns int
comment '测试有参函数'
begin
	declare c int default 0;
	select count(*) into c from user where user_name like name_str and mobile like mobile_str;
	return c;
end //
delimiter ; -- 重置结束标记为 ;

-- 调用函数
select f_test_params('%test%', '%3456%');

-- 查看函数
show create function f_test_empty;

```



### 函数与存储过程的区别

相同点：

1. 都是将一组 sql 封装成一个方法的形式，供调用执行。



不同点：

存储过程

1. 可以有 0 个或多个返回值。
2. 适合做批量插入、更新。



函数

1. 有且必须有一个返回值。
2. 适合在处理数据后返回一个处理结果。
3. **函数可以在 select 子查询中调用**。





# 存储过程

## 什么是存储过程

https://www.cnblogs.com/caozengling/p/5306288.html



百度的解释：

存储过程（Stored Procedure）是在大型数据库系统中，一组为了完成特定功能的SQL 语句集，存储在数据库中，经过第一次编译后再次调用不需要再次编译，用户通过指定存储过程的名字并给出参数（如果该存储过程带有参数）来执行它。存储过程是数据库中的一个重要对象，任何一个设计良好的数据库应用程序都应该用到存储过程。

 

**什么是存储过程**：存储过程可以说是一个记录集吧，它是由一些T-SQL语句组成的代码块，这些T-SQL语句代码像一个方法一样实现一些功能（对单表或多表的增删改查），然后再给这个代码块取一个名字，在用到这个功能的时候调用他就行了。



## 存储过程的好处

1. 由于数据库执行动作时，是先编译后执行的。然而存储过程是一个编译过的代码块，所以执行效率要比T-SQL语句高。

2. 一个存储过程在程序在网络中交互时可以替代大堆的T-SQL语句，所以也能降低网络的通信量，提高通信速率。

3. 通过存储过程能够使没有权限的用户在控制之下间接地存取数据库，从而确保数据的安全。



## 存储过程的语法

```mysql
-- 创建
create procedure 存储过程名(参数列表)
begin
	存储过程语句（一组有效的 sql 语句）
end

注意：
1.参数列表包含三部分
参数模式 参数名 参数类型
in user_name varchar(50)

参数模式：
in 输入/传参
out 输出/返回值
inout 即可作输入也可作输出

2.存储过程语句只有一句话的时候，begin end 可以省略。
存储过程中的 sql 语句必须以 ; 结尾。
存储过程的结尾，可以使用 delimiter 重新设置，避免跟 ; 号混淆。
声明语句结束符，可以自定义：
DELIMITER $ 或 DELIMITER $$ 或 DELIMITER //

-- 调用
call 存储过程名(实参列表);

```



### 无参类型

```mysql
-- 先删除之前创建的存储过程
drop procedure if exists p_test_empty;
delimiter // -- 自定义存储过程的开始结束标记，符号自定。避免跟 sql 语句的 “;” 混淆。
create procedure p_test_empty()
comment '测试无参类型存储过程'
begin
/*
自定义变量，只能接着 begin 定义，其他地方定义无效。
特别注意：存储过程的变量名不能与数据库表字段一样！否则表字段数据更新不了。
*/
declare no_str varchar(10) default '';
declare i int default 0;

/* 变量赋值 */
set no_str = replace(time(now()), ':', '');

/* 批量sql */
while i < 5 do
insert into user(user_name, `password`) values(concat('test', no_str, i), '123456');
set i=i+1;
end while; -- ; 必须加上，否则报错

end //
delimiter ; -- 重置标记

-- 调用存储过程
call p_test_empty();
select * from user order by id desc;

```



### in 参数类型

```mysql
drop procedure if exists p_test_in;
delimiter //
create procedure p_test_in(in no_str varchar(10))
comment '测试 in 参数类型存储过程' -- 这里不用加 ; ，加了报错
begin
    -- declare no_str varchar(10) default '';
    declare i int default 0;

    /* 变量赋值 */
    -- set no_str = replace(time(now()), ':', '');

    /* 批量sql */
    while i < 5 do
        insert into user(user_name, `password`) values(concat('test', no_str, i), '123456');
        set i=i+1;
    end while;

end //
delimiter ;

-- 调用存储过程
-- call p_test_in(replace(time(now()), ':', ''));
set @no_str = replace(time(now()), ':', '');
call p_test_in(@no_str);
select * from user order by id desc;

```



**多个参数类型**

```mysql
drop procedure if exists p_test_in2;
delimiter //
create procedure p_test_in2(in uname varchar(20), in upwd varchar(100))
comment '测试 in 多个参数类型存储过程'
begin
	declare rt tinyint default 0;
	select count(*) into rt from user where user_name = uname and `password` = upwd;
	
	select if(rt > 0, '成功', '失败');
	
end //
delimiter ;

-- 调用存储过程
call p_test_in2('admin2', '123456');
```



### out 参数类型

```mysql
drop procedure if exists p_test_out;
delimiter //
create procedure p_test_out(out str varchar(200))
comment '测试 out 参数类型存储过程'
begin
    declare uname varchar(20) default '';
    -- 定义游标相关变量，游标劝退？没见过也别怕，游标就相当于一个结果集合，查出多条结果，接着遍历集合里面的数据
    declare done int default 0;
    declare cur1 cursor for select user_name from user order by id desc limit 5; -- 查询结果集放入游标
    declare continue handler for not found set done=1; -- 设置游标遍历结束条件，注意！这句话只能放在定义语句最后


    /* 批量sql */
    set str = ''; -- out 类型参数不会接收传入参数值，默认为 null，null 与任何数值操作的结果都为 null，影响正常结果

    -- 循环遍历游标中的结果集
    open cur1;  
    cur1_loop: loop
        fetch cur1 into uname;
        if done=1 then 
            leave cur1_loop;
        end if;

        set str = concat(str, uname, '|');

    end loop cur1_loop;
    close cur1;

    -- 去掉最后一个“|”
    -- select str;
    set str = substring(str, 1, length(str)-1); -- 注意！MySQL 的 substring 下标从 1 开始，取 [start, end] 闭区间

end //
delimiter ;

-- 调用存储过程
set @out_str = '';
call p_test_out(@out_str); -- 参数名不要求一致
select @out_str;


-- 也可以同时定义 in 和 out 
-- create procedure p_test_in_out(in uid bigint, out mobile varchar(20))

-- in 和 out 参数都可以有多个

```



### inout 参数类型

```mysql
drop procedure if exists p_test_inout;
delimiter //
create procedure p_test_inout(inout str varchar(200))
comment '测试 inout 参数类型存储过程'
begin
	declare i int default 0;

	/* 批量sql */
	-- 循环插入数据
	while i < 5 do
        insert into user(user_name, `password`) values(concat('inout', str, i), '123456');
        set i=i+1;
	end while;
	
	-- 重置输入参数
	set str = '';
	-- 嵌套游标结果集查询
	begin
		declare uname varchar(20) default '';
		-- 定义游标相关变量
		declare done int default 0;
		declare cur1 cursor for select user_name from user order by id desc limit 5;
		declare continue handler for not found set done=1;
		
		-- 循环遍历游标中的结果集
		open cur1;  
		cur1_loop: loop
			fetch cur1 into uname;
			if done=1 then 
				leave cur1_loop;
			end if;
			
			set str = concat(str, uname, '|');
			
		end loop cur1_loop;
		close cur1;

		-- 去掉最后一个“|”
		-- select str;
		-- 注意！MySQL 的 substring 下标从 1 开始，取[start, end]
		set str = substring(str, 1, length(str)-1);
		
	end;

end //
delimiter ;

-- 调用存储过程
set @inout_str = replace(time(now()), ':', '');
call p_test_inout(@inout_str);
select @inout_str;

```





## 游标 cursor

https://www.cnblogs.com/loong-hon/p/11003189.html

### 游标概念

游标实际上是一种能从包括多条数据记录的结果集中每次提取一条记录的机制。

游标充当指针的作用。

尽管游标能遍历结果中的所有行，但他一次只指向一行。

游标的作用就是用于对查询数据库所返回的记录进行遍历，以便进行相应的操作。



### 游标的用法

```mysql
-- 在windows系统中写存储过程时，如果需要使用declare声明变量，需要添加这个关键字，否则会报错。  
delimiter //  
drop procedure if exists StatisticStore;  
CREATE PROCEDURE StatisticStore()  
BEGIN  
    -- 创建接收游标数据的变量  
    declare c int;  
    declare n varchar(20);  
    -- 创建总数变量  
    declare total int default 0;  
    -- 创建结束标志变量  
    declare done int default false;  
    -- 创建游标  
    declare cur cursor for select name, count from store where name = 'iphone';  
    -- 指定游标循环结束时的返回值  
    declare continue HANDLER for not found set done = true;  
    -- 设置初始值  
    set total = 0;  
    -- 打开游标  
    open cur;  
    -- 开始循环游标里的数据  
    read_loop:loop  
    -- 根据游标当前指向的一条数据  
    fetch cur into n,c;  
    -- 判断游标的循环是否结束  
    if done then  
        leave read_loop;    -- 跳出游标循环  
    end if;  
    -- 获取一条数据时，将count值进行累加操作，这里可以做任意你想做的操作，  
    set total = total + c;  
    -- 结束游标循环  
    end loop;  
    -- 关闭游标  
    close cur;  
  
    -- 输出结果  
    select total;  
END;

-- 调用存储过程  
call StatisticStore();

```



## 了解存储函数

存储函数与存储过程本质上是一样的，都是封装一系列SQL语句，简化调用。存储函数可以像 MySQL 函数那样自由的被调用。

实际工作开发，通常只用存储过程和函数，几乎不用存储函数这个杂交体。优势不明显，还搞乱了语法结构。



```mysql
DROP FUNCTION IF EXISTS getStuNameById;

DELIMITER // -- 定义存储过程标记
CREATE FUNCTION getStuNameById(stuId INT)  -- 默认是IN，但是不能写上去。stuId视为输入的临时变量
RETURNS VARCHAR(255)   -- 指明返回值类型
RETURN  (SELECT name FROM t_student WHERE id = stuId); //  -- 指明SQL语句,并使用结束标记。注意分号位置
DELIMITER ; -- 重置存储过程标记

-- 调用存储函数
SELECT getStuNameById(1);

```



存储函数与存储过程一样，只能返回一条结果记录，且只能指明一列数据作为结果，而存储过程能够指明多列数据作为结果。





# 视图

## 数据库视图的概念

MySQL从5.0.1版本开始提供视图功能。一种虚拟 存在的表，行和列的数据来自定义视图的查询中使用的表 ，并且是在使用视图时==动态生成的==，**只保存了sql逻辑，不保存查询结果**。



## 视图应用场景

- 多个地方用到同样的查询结果

- 该查询结果使用的sql语句较复杂



```mysql
CREATE VIEW my_v1
AS
SELECT studentname, majorname
FROM student s
INNER JOIN major m
ON s.majorid=m.majorid
WHERE s.majorid=1;
```



## 视图的优缺点

**优点：**

- 重用sql语句

- 简化复杂的sql操作，不必知道它的查询细节

- 保护数据，提高安全性（视图中的字段是从多个表中抽取出来的，对真实的数据表起到一层隔离保护作用；视图只保存sql逻辑，不保存数据）



**缺点：**

- 封装的东西，还是要看懂内部本质，有些复杂的视图，就好像别人写的一大段业务代码，理解内部逻辑需要花较多时间



## 视图的 CRUD

### 创建视图

```mysql
create [or replace] view view_name
As select_statement
[with|cascaded|local|check option]
```



### 删除视图

```mysql
-- 用户可以一次删除一个或者多个视图，前提是必须有该视图的drop权限。
drop view [if exists] view_name, view_name …[restrict|cascade]
```



### 修改视图

```mysql
/*
-- 方式一
create or replace view view_name 
as 
查询语句;
*/

-- 方式二
alter view view_name
As select_statement
[with|cascaded|local|check option]
```



视图的可更新性和视图中查询的定义有关系，以下类型的视图是不能更新的。

- 包含以下关键字的 sql 语句：分组函数、distinct、group by 、having、union 或者 union all

- 常量视图

- select 中包含子查询

- join

- from 一个不能更新的视图

- where 子句的子查询引用了 from 子句中的表



### 查看视图

```mysql
desc view_name;
-- 如果需要查询某个视图的定义，可以使用 show create view 命令进行查看
show create view view_name;
```



### 视图数据操作

视图数据操作跟表数据操作是一样的，并且视图数据修改后，**也会更新到原始表！**

实际项目开发，如果使用视图，通常将视图权限设置为**只读权限**。

通常只要不是简单一句查询的视图，一般都不能更新成功，实际开发也很少有人去更新视图。



#### 插入视图数据



#### 删除视图数据



#### 修改视图数据





# 事务

## 什么是事务

- 事务就是将一组SQL语句放在同一批次内去执行
- 如果一个SQL语句出错，则该批次内的所有SQL都将被取消执行
- MySQL事务处理只支持InnoDB和BDB数据表类型



## 事务的 ACID 原则

**原子性(Atomic)**

- 整个事务中的所有操作，要么全部完成，要么全部不完成，不可能停滞在中间某个环节。事务在执行过程中发生错误，会被回滚（ROLLBACK）到事务开始前的状态，就像这个事务从来没有执行过一样。

**一致性(Consist)**

- 一个事务可以封装状态改变（除非它是一个只读的）。事务必须始终保持系统处于一致的状态，不管在任何给定的时间并发事务有多少。也就是说：如果事务是并发多个，系统也必须如同串行事务一样操作。其主要特征是保护性和不变性(Preserving an Invariant)，以转账案例为例，假设有五个账户，每个账户余额是100元，那么五个账户总额是500元，如果在这个5个账户之间同时发生多个转账，无论并发多少个，比如在A与B账户之间转账5元，在C与D账户之间转账10元，在B与E之间转账15元，五个账户总额也应该还是500元，这就是保护性和不变性。

**隔离性(Isolated)**

- 隔离状态执行事务，使它们好像是系统在给定时间内执行的唯一操作。如果有两个事务，运行在相同的时间内，执行相同的功能，事务的隔离性将确保每一事务在系统中认为只有该事务在使用系统。这种属性有时称为串行化，为了防止事务操作间的混淆，必须串行化或序列化请求，使得在同一时间仅有一个请求用于同一数据。

**持久性(Durable)**

- 在事务完成以后，该事务对数据库所作的更改便持久的保存在数据库之中，并不会被回滚。



## 事务的隔离级别

### 数据库

```mysql
# 查看事务隔离级别 5.7.20 之后
show variables like 'transaction_isolation';
SELECT @@transaction_isolation;

# 5.7.20 之后
SELECT @@tx_isolation;
show variables like 'tx_isolation';

+---------------+-----------------+
| Variable_name | Value           |
+---------------+-----------------+
| tx_isolation  | REPEATABLE-READ |
+---------------+-----------------+

-- 设置事务隔离级别
set global transaction isolation level read committed;

```



![image-20210110001912627](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210110001912627.png)



| 隔离级别         | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| Read uncommitted | 最低级别，以上情况均无法保证。(读未提交)                     |
| Read committed   | 可避免脏读情况发生（读已提交）。                             |
| Repeatable read  | 数据库默认级别，可避免脏读、不可重复读情况的发生。（可重复读） |
| Serializable     | 最高级别，可避免脏读、不可重复读、幻读情况的发生。（串行化） |



**脏读：**
指一个事务读取了另外一个事务未提交的数据。

业务通常不希望读取到未提交事务的数据。脏读是要避免的。



**不可重复读：**
在一个事务内读取表中的某一行数据，多次读取结果不同。（这个不一定是错误，只是某些场合不对）

相同条件接着两次查询同一行数据，两次查到的结果不一样。对于用户量大的平台，用户高并发访问业务是很常见的，只要事务正常提交，数据是实时动态变化的。



**幻读**
是指在一个事务内读取到了别的事务插入的数据，导致前后读取不一致。
（一般是行影响，多了一行）

高并发场景常有的事，只要事务正常提交，都没问题。



### java

适当的 Connection 方法，比如 setAutoCommit 或 setTransactionIsolation。

| 设置                         | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| TRANSACTION_READ_UNCOMMITTED | 指示可以发生脏读 (dirty read)、不可重复读和虚读 (phantom read) 的常量。 |
| TRANSACTION_READ_COMMITTED   | 指示不可以发生脏读的常量；不可重复读和虚读可以发生。         |
| TRANSACTION_REPEATABLE_READ  | 指示不可以发生脏读和不可重复读的常量；虚读可以发生。         |
| TRANSACTION_SERIALIZABLE     | 指示不可以发生脏读、不可重复读和虚读的常量。                 |



### mysql 模拟事务隔离性测试

```mysql
SELECT @@session.tx_isolation;   
SELECT @@tx_isolation;  
  
SET SESSION TRANSACTION ISOLATION LEVEL read uncommitted;  
SET SESSION TRANSACTION ISOLATION LEVEL read committed;  
SET SESSION TRANSACTION ISOLATION LEVEL repeatable read;  
SET SESSION TRANSACTION ISOLATION LEVEL serializable;  

start transaction;

-- 建表
drop table AMOUNT;
CREATE TABLE `AMOUNT` (
`id`  varchar(10) NULL,
`money`  numeric NULL
)
;
-- 插入数据
insert into amount(id,money) values('A', 800);
insert into amount(id,money) values('B', 200);
insert into amount(id,money) values('C', 1000);
-- 测试可重复读，插入数据
insert into amount(id,money) values('D', 1000);

-- 设置事务
SET SESSION TRANSACTION ISOLATION LEVEL read uncommitted;  
SELECT @@tx_isolation;  
-- 开启事务
start transaction;

-- 脏读演示，读到其他事务未提交的数据
-- 案列1，事务一：A向B转200，事务二：查看B金额变化，事务一回滚事务
update amount set money = money - 200 where id = 'A';
update amount set money = money + 200 where id = 'B';

-- 不可重复读演示，读到了其他事务提交的数据
-- 案列2，事务一：B向A转200，事务二：B向C转200转100
SET SESSION TRANSACTION ISOLATION LEVEL read committed;  

-- 开启事务
start transaction;
-- 两个事务都查一下数据(转账之前需要，查一下金额是否够满足转账)
select * from amount;
-- 事务一：B向A转200
update amount set money = money - 200 where id = 'B';
update amount set money = money + 200 where id = 'A';

commit;
-- 事务二：B向C转200转100
update amount set money = money - 100 where id = 'B';
update amount set money = money + 100 where id = 'C';
commit;
-- 从事务二的角度来看，读到了事务一提交事务的数据，导致金额出现负数

-- 幻读演示
-- 案列3，事务一：B向A转200，事务二：B向C转200转100
SET SESSION TRANSACTION ISOLATION LEVEL repeatable read;  

-- 开启事务
start transaction;
-- 两个事务都查一下数据(转账之前需要，查一下金额是否够满足转账)
select * from amount;
-- 事务一：B向A转200
update amount set money = money - 200 where id = 'B';
update amount set money = money + 200 where id = 'A';

commit;
-- 事务二：B向C转200转100
update amount set money = money - 100 where id = 'B';
update amount set money = money + 100 where id = 'C';
commit;
-- 从事务二的角度来看，读到了事务一提交事务的数据，导致金额出现负数
```

- serializable 事务2会一直等着事务1提交再操作。



## 基本语法

```mysql
-- 使用set语句来改变自动提交模式
SET autocommit = 0;   /*关闭*/
SET autocommit = 1;   /*开启*/

-- 注意:
--- 1.MySQL中默认是自动提交
--- 2.使用事务时应先关闭自动提交

-- 开始一个事务,标记事务的起始点
START TRANSACTION  

-- 提交一个事务给数据库
COMMIT

-- 将事务回滚,数据回到本次事务的初始状态
ROLLBACK

-- 还原MySQL数据库的自动提交
SET autocommit =1;

-- 保存点
SAVEPOINT 保存点名称 -- 设置一个事务保存点
ROLLBACK TO SAVEPOINT 保存点名称 -- 回滚到保存点
RELEASE SAVEPOINT 保存点名称 -- 删除保存点
```



测试

```mysql
/*
课堂测试题目

A在线买一款价格为500元商品,网上银行转账.
A的银行卡余额为2000,然后给商家B支付500.
商家B一开始的银行卡余额为10000

创建数据库shop和创建表account并插入2条数据
*/

CREATE DATABASE `shop`CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `shop`;

CREATE TABLE `account` (
`id` INT(11) NOT NULL AUTO_INCREMENT,
`name` VARCHAR(32) NOT NULL,
`cash` DECIMAL(9,2) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

INSERT INTO account (`name`,`cash`)
VALUES('A',2000.00),('B',10000.00)

-- 转账实现
SET autocommit = 0; -- 关闭自动提交
START TRANSACTION;  -- 开始一个事务,标记事务的起始点
UPDATE account SET cash=cash-500 WHERE `name`='A';
UPDATE account SET cash=cash+500 WHERE `name`='B';
COMMIT; -- 提交事务
# rollback;
SET autocommit = 1; -- 恢复自动提交
```



# 索引

## 索引是什么

MySQL 官方对索引的定义：

索引（index）是帮助 MySQL 高效获取数据的的**数据结构**。



可以理解为，排好序便于快速查找的数据结构。



## 索引的作用

> 索引用于 where 后面的【筛选】和【排序】

- 提高查询速度
- 确保数据的唯一性
- 可以加速表和表之间的连接 , 实现表与表之间的参照完整性
- 使用分组和排序子句进行数据检索时 , 可以显著减少分组和排序的时间
- 全文检索字段进行搜索优化



## 索引的分类

- 主键索引 (Primary Key)
- *外键 foreign key*
- 唯一索引 (Unique)
- 常规索引 (Index)
- 全文索引 (FullText)



### 查看索引

- desc 表名； —> 显示结果中的Key列即是索引值
- show index from 表名；
  Table: user
  Column_name: Host
  Key_name: PRIMARY //即是索引值
  Index_type: BTREE //BTREE（B+tree），hash



### 主键索引

主键 : 某一个属性组能唯一标识一条记录

特点 :

- 一个表中只能有一个primary key字段
- 对应的字段值不允许有重复，且不允许赋NULL值
- 如果有多个字段都作为PRIMARY KEY，称为复合主键，必须一起创建。
- 主键字段的KEY标志是PRI
- 通常与 AUTO_INCREMENT 连用
- 经常把表中能够唯一标识记录的字段设置为主键字段[记录编号字段]



创建主键字段

```mysql
-- 建表时创建
create  table  t25( name  char(10), age   int(2), primary key(name));
create  table  t26( name  char(10) primary  key, age   int(2));

-- 在已有表里创建主键
alter table t5 add primary key(name);

```



**复合主键的使用**

多个字段一起做主键是复合主键，必须一起创建。
*字段的值不允许同时相同。*

```mysql
-- 建表时创建
create table t29(host char(10),db char(10),user char(10),primary key(host,db,user));

-- 对已有的表进行添加
alter table t29 add primary key(host,user,db);
```



通常和 AUTO_INCREMENT 连用，实现字段值的字段增长。
经常把表中能够唯一标识记录的字段设置为主键字段 [记录编号字段]。



### 外键

功能：
让当前表某个字段的值，在另一个表的某个字段值的范围内选择。

使用规则：

- 表的存储引擎必须是innodb
- 字段的数据类型要匹配
- 被参考的字段必须是key 中的一种 (primary key)



```mysql
create table platform (
	id bigint primary key auto_increment,
	name varchar(20)
) engine=innodb;

create table following (
    id bigint primary key auto_increment,
    platform_id bigint primary key auto_increment,
	name varchar(20),
	foreign key fk_platform_id(platform_id) references platform(id) -- on update cascade on delete cascade
) engine=innodb;
```



删除外键

```mysql
-- show create table 表名;
-- alter table 表名 drop foreign key 外键名;
alter table following drop foreign key fk_platform_id;
```



### 唯一索引

和普通索引类似，不同的就是索引的列必须是唯一存在的，可以为空。

作用：避免同一个表中某数据列中的值重复。

与主键索引的区别

- 主键索引只能有一个
- 唯一索引可能有多个



```mysql
CREATE TABLE `Grade`(
  `GradeID` INT(11) AUTO_INCREMENT PRIMARY KEY,
  `GradeName` VARCHAR(32) NOT NULL UNIQUE
   -- 或 UNIQUE KEY `uk_GradeID` (`GradeID`)
)

-- 在已有表里创建unique字段
-- create unique index 索引名 on 表名（字段名）;
create unique index stu_id on t29(stu_id);

```



### 常规索引

作用 : 快速定位特定数据

注意 :

- index 和 key 关键字都可以设置常规索引
- 应加在查询找条件的字段
- 不宜添加太多常规索引，影响数据的插入，删除和修改操作
- INDEX字段的KEY标志是MUL



常规索引按字段个数，又可以分为：

- 单独索引，一个字段
- 组合索引，两个及以上字段



#### 单独索引





#### 联合索引

> **组合/联合索引**
>
> 对多个字段同时建立的索引。联合索引是有顺序的，ABC，ACB是完全不同的两种联合索引。
>
> 以联合索引(a,b,c)为例，建立这样的索引相当于建立了索引a、ab、abc三个索引。
>
> 一个索引顶三个索引当然是好事，但是每多一个索引都会增加写操作的开销和磁盘空间的开销，需要谨慎使用。



为什么要用联合索引？

对于查询语句“SELECT E.* FROM E WHERE E.e1=1 AND E.e3=2”涉及到两列，这个时候一般采用一个联合索引(e1, e3)；而不用两个单列索引，==一条查询语句往往因为mysql优化器的关系只用一个索引==，就算你有两个索引，他也只用一个；在只用一个的基础之上，联合索引是会比单列索引要快。



### 全文索引

只支持老版本的 MySql，也就是引擎为 MyISAM 的数据表。

作用：快速定位特定数据

注意

- 只能用于 MyISAM 类型的数据表
- 只能用于 CHAR, VARCHAR, TEXT 数据列类型
- 适合大型数据集



```mysql
/*
#方法一：创建表时
  　　CREATE TABLE 表名 (
               字段名1 数据类型 [完整性约束条件…],
               字段名2 数据类型 [完整性约束条件…],
               [UNIQUE | FULLTEXT | SPATIAL ]   INDEX | KEY
               [索引名] (字段名[(长度)] [ASC |DESC])
               );


#方法二：CREATE在已存在的表上创建索引
       CREATE [UNIQUE | FULLTEXT | SPATIAL ] INDEX 索引名
                    ON 表名 (字段名[(长度)] [ASC |DESC]) ;


#方法三：ALTER TABLE在已存在的表上创建索引
       ALTER TABLE 表名 ADD [UNIQUE | FULLTEXT | SPATIAL ] INDEX
                            索引名 (字段名[(长度)] [ASC |DESC]) ;
                           
                           
#删除索引：DROP INDEX 索引名 ON 表名字;
#删除主键索引: ALTER TABLE 表名 DROP PRIMARY KEY;


#显示索引信息: SHOW INDEX FROM student;
*/

/*增加全文索引*/
ALTER TABLE `school`.`student` ADD FULLTEXT INDEX `studentname` (`StudentName`);

/*EXPLAIN : 分析SQL语句执行性能*/
EXPLAIN SELECT * FROM student WHERE studentno='1000';

/*使用全文索引*/
-- 全文搜索通过 MATCH() 函数完成。
-- 搜索字符串作为 against() 的参数被给定。搜索以忽略字母大小写的方式执行。对于表中的每个记录行，MATCH() 返回一个相关性值。即，在搜索字符串与记录行在 MATCH() 列表中指定的列的文本之间的相似性尺度。
EXPLAIN SELECT *FROM student WHERE MATCH(studentname) AGAINST('love');

/*
开始之前，先说一下全文索引的版本、存储引擎、数据类型的支持情况

MySQL 5.6 以前的版本，只有 MyISAM 存储引擎支持全文索引；
MySQL 5.6 及以后的版本，MyISAM 和 InnoDB 存储引擎均支持全文索引;
只有字段的数据类型为 char、varchar、text 及其系列才可以建全文索引。
测试或使用全文索引时，要先看一下自己的 MySQL 版本、存储引擎和数据类型是否支持全文索引。
*/
```



### 聚簇索引和非聚簇索引

- [聚簇索引和非聚簇索引有什么区别？](https://youle.zhipin.com/articles/407141b04c7afd61qxB73tS7Fw~~.html)



#### 聚簇索引

聚簇索引（Clustered Index）一般指的是主键索引（如果存在主键索引的话），聚簇索引也被称之为聚集索引。

聚簇索引在 InnoDB 中是使用 B+ 树实现的，比如创建一张 student 表，它的构建 SQL 如下：

```
drop table if exists student;
create table student(
    id int primary key, 
    name varchar(16),
    class_id int not null, 
    index (class_id)
)engine=InnoDB;
-- 添加测试数据
insert into student(id,name,class_id) values(1,'张三',100),
    (2,'李四',200),(3,'王五',300);
```

以上 student 表中有一个聚簇索引（也就是主键索引）id，和一个非聚簇索引 class_id。

聚簇索引 id 对应的 B+ 树如下图所示：

![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/primary-index.jpg)

在聚簇索引的叶子节点**直接存储用户信息的内存地址**，使用内存地址可以直接找到相应的行数据。



#### 非聚簇索引

非聚簇索引在 InnoDB 引擎中，也叫二级索引，以上面 student 表为例，在 student 中非聚簇索引 class_id 对应 B+ 树如下图所示：

![null](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/normal-index.jpg)

**在非聚簇索引的叶子节点上存储的并不是真正的行数据，而是主键 ID，所以当使用非聚簇索引进行查询时，首先会得到一个主键 ID，然后再使用主键 ID 去聚簇索引上找到真正的行数据，把这个过程称之为回表查询。**



**总结**

在 MySQL 的 InnoDB 引擎中，每个索引都会对应一颗 B+ 树，而聚簇索引和非聚簇索引最大的区别在于叶子节点存储的数据不同，聚簇索引叶子节点存储的是行数据，因此通过聚簇索引可以直接找到真正的行数据；而非聚簇索引叶子节点存储的是主键信息，所以使用非聚簇索引还需要回表查询。

因此可以得出聚簇索引和非聚簇索引的区别主要有以下几个：

- 聚簇索引叶子节点存储的是行数据；而非聚簇索引叶子节点存储的是聚簇索引（通常是主键 ID）。
- 聚簇索引查询效率更高，而非聚簇索引需要进行回表查询，因此性能不如聚簇索引。
- 聚簇索引一般为主键索引，而主键一个表中只能有一个，因此**聚簇索引一个表中只能有一个**，而非聚簇索引则没有数量上的限制。





### 索引操作

添加索引

```mysql
-- 创建表时添加
CREATE TABLE `result`(
    -- 省略一些代码
    -- INDEX KEY `ind` (`studentNo`,`subjectNo`)
    index `idx_name`(`name`),
    UNIQUE [indexName] (username(length))
)

-- 创建后添加
ALTER TABLE `result` ADD INDEX `ind`(`studentNo`,`subjectNo`);
-- 或者
create index idx_sex on t111(sex);

-- 添加PRIMARY KEY（主键索引）
ALTER TABLE `table_name` ADD PRIMARY KEY ( `column` );

-- 创建唯一索引
CREATE UNIQUE INDEX indexName ON mytable(username(length));
ALTER table mytable ADD UNIQUE [indexName] (username(length));

ALTER TABLE `mypages`.`user_platform_relation` 
ADD UNIQUE INDEX `uk_userId_platformId`(`user_id`, `platform_id`) USING BTREE;


```



删除索引

```mysql
alter table `user` drop index idx_name(name);
drop index idx_sex on t24;
```



修改索引

mysql中没有真正意义上的修改索引，只有先删除之后在创建新的索引才可以达到修改的目的，原因是mysql在创建索引时会对字段建立关系长度等，只有删除之后创建新的索引才能创建新的关系保证索引的正确性。

```mysql
DROP INDEX login_name_index ON `user`; 
ALTER TABLE `user` ADD UNIQUE login_name_index ( `login_name` );


ALTER TABLE `mypages`.`user_check_update` 
DROP INDEX `idx_user_id`,
DROP INDEX `idx_following_id`,
ADD INDEX `idx_userId_followingId`(`user_id`, `following_id`) USING BTREE;

-- 重命名
ALTER TABLE `mypages`.`user_following` 
RENAME INDEX `idx_where` TO `idx_platformId_typeId`;

```





查询索引

```mysql
SHOW INDEX FROM `user`;

```





### 索引测试

**建表 app_user**

```mysql
CREATE TABLE `app_user` (
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(50) DEFAULT '' COMMENT '用户昵称',
`email` varchar(50) NOT NULL COMMENT '用户邮箱',
`phone` varchar(20) DEFAULT '' COMMENT '手机号',
`gender` tinyint(4) unsigned DEFAULT '0' COMMENT '性别（0:男；1：女）',
`password` varchar(100) NOT NULL COMMENT '密码',
`age` tinyint(4) DEFAULT '0' COMMENT '年龄',
`create_time` datetime DEFAULT CURRENT_TIMESTAMP,
`update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='app用户表'
```



**批量插入数据：100w**

```mysql
-- 使用自定义函数
DROP FUNCTION IF EXISTS mock_data;

DELIMITER $$
CREATE FUNCTION mock_data()
RETURNS INT
BEGIN
DECLARE num INT DEFAULT 1000000;
DECLARE i INT DEFAULT 0;
WHILE i < num DO
  INSERT INTO app_user(`name`, `email`, `phone`, `gender`, `password`, `age`)
   VALUES(CONCAT('用户', i), '24736743@qq.com', CONCAT('18', FLOOR(RAND()*(999999999-100000000)+100000000)),FLOOR(RAND()*2),UUID(), FLOOR(RAND()*100));
  SET i = i + 1;
END WHILE;
RETURN i;
END;

SELECT mock_data();
```



**索引效率测试**

无索引

```mysql
SELECT * FROM app_user WHERE name = '用户9999'; -- 测三次，查看耗时
SELECT * FROM app_user WHERE name = '用户9999';
SELECT * FROM app_user WHERE name = '用户9999';

mysql> EXPLAIN SELECT * FROM app_user WHERE name = '用户9999';
*************************** 1. row ***************************
          id: 1
select_type: SIMPLE
       table: app_user
  partitions: NULL
        type: ALL
possible_keys: NULL
        key: NULL
    key_len: NULL
        ref: NULL
        rows: 992759
    filtered: 10.00
      Extra: Using where
1 row in set, 1 warning (0.00 sec)
```

创建索引

```mysql
CREATE INDEX idx_app_user_name ON app_user(name);
```

测试普通索引

```mysql
mysql> EXPLAIN SELECT * FROM app_user WHERE name = '用户9999';
*************************** 1. row ***************************
          id: 1
select_type: SIMPLE
       table: app_user
  partitions: NULL
        type: ref
possible_keys: idx_app_user_name
        key: idx_app_user_name
    key_len: 203
        ref: const
        rows: 1
    filtered: 100.00
      Extra: NULL
1 row in set, 1 warning (0.00 sec)

mysql> SELECT * FROM app_user WHERE name = '用户9999';
1 row in set (0.00 sec)

mysql> SELECT * FROM app_user WHERE name = '用户9999';
1 row in set (0.00 sec)

mysql> SELECT * FROM app_user WHERE name = '用户9999';
1 row in set (0.00 sec)
```



## 索引准则

### 适合加索引的场景

1. 索引一般应加在频繁**查寻或排序**的字段，比如，用户名、手机号、银行卡号、身份证号
2. 外键关联的id，比如，用户浏览记录表里面的用户id、商品id
3. 查询中**统计或分组**的字段
4. 单键/组合索引的选择，在高并发下倾向组合索引



### 不适合加索引的场景

1. 索引不是越多越好，建议控制在 5 个左右，索引过多，真正用到的几率小，比较占用存储空间
2. 频繁更新的字段不适合建索引，字段更新后索引也会更新，频繁更新影响性能
3. 经常增删改的表不适合创建索引，虽然提高了查询速度，但也降低了更新速度。因为表改动时，不仅要保存数据，还要保存索引文件
4. 表记录少的表建议不用加索引，记录没超过百万，性能提升不大
5. where 条件用不到的字段不创建索引
6. 值重复且分布平均的字段不适合创建索引，性能提升不大，比如，性别，是否标记位



## 索引的数据结构

```
-- 可以在创建上述索引的时候，为其指定索引类型，分两类
hash 类型的索引：查询单条快，范围查询慢
btree 类型的索引：b+树，层数越多，数据量指数级增长（就用它，因为innodb默认支持它）

-- 不同的存储引擎支持的索引类型也不一样
InnoDB 支持事务，支持行级别锁定，支持 B-tree、Full-text 等索引，不支持 Hash 索引；
MyISAM 不支持事务，支持表级别锁定，支持 B-tree、Full-text 等索引，不支持 Hash 索引；
Memory 不支持事务，支持表级别锁定，支持 B-tree、Hash 等索引，不支持 Full-text 索引；
NDB 支持事务，支持行级别锁定，支持 Hash 索引，不支持 B-tree、Full-text 等索引；
Archive 不支持事务，支持表级别锁定，不支持 B-tree、Hash、Full-text 等索引；
```



## 索引优化

### explain 性能分析

使用 explain + sql 语句，可以查看该条 sql 语句的执行计划，其中可以查看索引的使用情况。、



```mysql
-- 查找 b站类型为“参考资源”的最新5个用户
explain select * from user_following 
where platform_id = (select id from platform where `name` like 'b站%' limit 1) 
and ftype_id = (select id from user_following_type where type_name = '参考资源' limit 1) 
order by id desc limit 5;
```



![image-20210108010218464](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210108010218464.png)



**id**：表示 sql 语句中每条子语句的**执行顺序**。

- id 相同的情况，执行顺序由上至下
- id 不同，id 越大优先级越高，越先执行
- id 相同不同，同时存在，先执行 id 大的，然后 id 相同的从上到下执行



**select_type**：查询的类型，用于区别普通查询、联合查询、子查询。

SIMPLE：简单查询，只有一条 select 查询的简单语句，不包含其他子查询或联合查询。

PRIMARY：主要查询，最外层查询，也就是最后执行的语句，因为主查询会依赖其他子查询的结果。

SUBQUERY：子查询，在 select 或 where 列表中包含的子查询。

DERIVED：衍生查询，在 from 列表中包含的子查询，mysql 会递归执行这些子查询，把结果放在临时表中。

UNION：联合查询，union 后面的 select 查询被标记为 union，若 union 包含在 from 的子查询中，外层 select 将被标记为 derived。

UNION RESULT：联合结果查询，从 union 查询获取结果的 select 查询。两个 select 查询使用 union 合并的查询。



**table**：sql 语句对应的表。

**partitions**：使用的分区，5.7+新增，数据库没有分区则为 null。

**type**：查询使用的类型。

常见类型，从最好到最差顺序：

==**system > const > eq_ref > ref > range > index > ALL**==

还有其他一些不常见的类型，实际开发中很少碰到。

- **system**：表只有一行记录（相当于系统表），是 const 特例，可以忽略，实际业务开发中几乎不可能有只有一条记录的表。
- **const**：表示通过索引一次就查到了，const 用于比较 primary key 或 unique 索引。因为只匹配一行数据，所以很快。如将主键放在 where 列表中，mysql 就能将该查询转化为常量。
- **eq_ref**：唯一索引扫描，对于每个索引键，表中只有一条记录匹配，。常用于主键或唯一索引扫描。
- **ref**：非唯一性扫描，返回匹配查询条件的所有行。
- **range**：范围扫描，使用索引检索给定范围内的行。通常是 where 语句后的 between and、>、\<、in 等筛选条件。
- **index**：full index scan 扫面全部索引。
- **ALL**：全表扫描，性能最差。

一般来说，查询性能至少要达到 range 级别，最好能达到 ref 级别。



**possible_keys**：显示查询可能用到的索引，没有或一个或多个。

**key**：实际用到的索引，为 null 则说明没有使用到索引。查询中若使用到了`覆盖索引`，则该索引只出现在 key 列表中。

覆盖索引，简单理解，表中的几个字段创建了复合索引，select 查询的时候，**使用索引字段个数不能大于复合索引**，顺序可以不一致，这种情况就使用到了覆盖索引。

![image-20210108030755975](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210108030755975.png)



**key_len**：表示索引中使用的字节数，可以通过该列计算查询中使用的索引长度，在不损失精度的情况下，长度越短越好。

key_len 显示的是索引字段最大可能的长度，并非实际使用长度，即 key_len 是根据表定义计算得到的长度，而不是获取实际占用的长度。

复合索引的 key_len 长度要比单独索引的长度要大，同样的查询筛选结果，key_len 的长度越小越好。



**ref**：显示索引的哪一列被使用了，如果可能的话，最好是一个常数。哪些列或常量被用于查找索引上的值。

**rows**：根据表统计信息及索引使用情况，大致估算出找到所需记录需要读取的行数。

**filtered**：表示符合查询条件的数据百分比，最大100。用rows × filtered可获得和下一张表连接的行数。例如rows = 1000，filtered = 50%，则和下一张表连接的行数是500。

在MySQL 5.7之前，想要显示此字段需使用explain extended命令；

MySQL.5.7及更高版本，explain默认就会展示filtered。



**Extra**：其他额外但是也重要的信息。

这个列可以显示的信息非常多，有几十种，常用的有：

1. **Using filesort**：额外**文件排序**。MYSQL需要进行额外的步骤来发现如何对返回的行排序。它根据连接类型以及存储排序键值和匹配条件的全部行的行指针来排序全部行。==【需要优化】==使用有索引的字段或组合索引字段进行排序。Using filesort 一定得优化掉吗？using filesort 一般出现在使用了order by 的语句当中，遇到这种情况一般只要在 order by 的字段上建立索引即可。
   为什么有时候建立了索引还是会显示 using filesort 呢？那可能是你排序的数据量太大了。
   MySQL 会使用 sort_buffer_size 大小的内存进行排序，如果结果集超过了 sort_buffer_size 大小，会把这一个排序后的 chunk 转移到 file 上, 最后使用多路归并排序完成所有数据的排序操作。
2. **Using temporary**：额外**临时表**，比额外排序性能更差。MYSQL需要创建一个临时表来存储结果，这通常发生在 ORDER BY 和 GROUP BY 上。==【需要优化】==使用有索引的字段或组合索引字段进行排序和分组。using temporary 一般出现在多张表的数据需要排序的情况下。MySQl 会先使用 using temporary 保存临时数据，然后再在临时表上使用 file sort 进行排序。
   如果有 ORDER BY 子句和一个不同的 GROUP BY 子句，或者如果 ORDER BY 或 GROUP BY 中的字段都来自其他的表而非连接顺序中的第一个表的话，就会创建一个临时表了？是第一个表也创建了临时表！
   MySQL 首先创建 heap 引擎的临时表，如果临时的数据过多，超过 max_heap_table_size 配置的大小， 会自动把临时表转换成MyISAM 引擎的表来使用。
3. **Using index**：列数据是从仅仅使用了索引中的信息而没有读取实际的行动的表返回的，这发生在对表的全部的请求列都是同一个索引的部分的时候。
4. **Using where**：使用了WHERE从句来限制哪些行将与下一张表匹配或者是返回给用户。如果不想返回表中的全部行，并且连接类型ALL或index，这就会发生，或者是查询有问题。
5. **Using join buffer**：使用了连接缓存。
6. **Impossible where**：where 条件不成立，where name = 'admin' and name = 'test'。
7. **Distinct**：一旦MYSQL找到了与行相联合匹配的行，就不再搜索了。
8. **Not exists**：MYSQL优化了LEFT JOIN，一旦它找到了匹配LEFT JOIN标准的行，就不再搜索了。
9. **Range checked for each**：没有找到理想的索引，因此对于从前面表中来的每一个行组合，MYSQL检查使用哪个索引，并用它来从表中返回行。这是使用索引的最慢的连接之一。



### 索引失效及如何避免

![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/index-missing.png)



#### 全值匹配（索引最佳）

查询字段包含在索引字段里面，且字段个数跟索引字段个数一致，顺序不要求，这种情况就是全值匹配，能使用到索引。



#### 最佳左前缀法则

(A,B,C) 这样3列，mysql会首先匹配A，然后再B，C。如果用(B,C)这样的数据来检索的话，就会找不到A使得索引失效。如果使用(A,C)这样的数据来检索的话，就会先找到所有A的值然后匹配C，此时联合索引是失效的。==把最常用的，筛选数据最多的字段放在左侧==。

如果索引有多列，要遵守最左前缀法则，即查询从索引的最左前列开始，并且**不跳过索引中的列**。如果跳过中间的索引字段，则只能用到前面没有连续对应的索引字段。

对于有多个索引字段的复合索引，比如 idx_name_cardno_mobile(real_name, id_card_no, mobile)，real_name 即索引的最左前缀，只要查询用到了最左边的索引字段 real_name，就能使用到这个复合索引，相反，如果查询字段中没有用到最左索引字段，则整个查询用不到索引，导致索引失效。当然，索引字段的顺序你可以随意。（查询的时候如果索引字段条件都用上了，但是顺序不同，如 `id_card = xx and mobile ＝ xx and real_name = xx`，**查询引擎会自动优化为匹配联合索引的顺序，这样是能够命中索引的**。）



**最左前缀匹配的原因**
联合索引(A,B,C)是一棵B+Tree，其非叶子节点存储的是第一个关键字的索引，而叶节点存储的则是三个关键字A、B、C三个关键字的数据，且按照A、B、C的顺序进行排序。

当执行以下查询的时候，是无法使用这个联合索引的。

select * from STUDENT where B='b';

因为联合索引中是先根据A进行排序的。如果A没有先确定，直接对B和C进行查询的话，就相当于乱序查询一样，因此索引无法生效，查询是全表查询。


简单理解：

带头大哥不能没有，小弟多少无所谓。

火车不能没有火车头，车厢数量无所谓，有车头就能跑。



#### 避免在索引列上做任何操作

如计算、函数、（自动or手动）类型转换等操作，会导致索引失效从而全表扫描。

```mysql
explain select * from user where left(user_name, 4) = 'test' and mobile = '1234567890';
```



#### 索引范围条件右边的列

==**索引范围查询会导致后面的索引列失效。**==

注意，like 'test%' 可以用到索引，后面字段的索引依然有效。

range 范围之后的索引会失效。idx_name_age_mobile(name, age, mobile)，age 使用范围查询之后，mobile 字段的索引会失效。

```mysql
explain select * from user where name = 'test01' and age > 30 and mobile = '1234567890';
```

注意，并不是把 age > 30 放在筛选条件最后就能解决问题，索引位置在创建复合索引的时候就已经确定了，可以使用 `show index form 表名` 查看表中的索引。



注意，mysql 5.7+ 支持了 Index Condition Pushdown，即可以在 index 上过滤（Index Filter）。也就是说，即使范围查询导致后面的字段索引失效，但是依然能用来做索引过滤，只是不属于索引字段（index key）范畴。



#### 尽量使用覆盖索引

只访问索引查询（索引列和查询列一致），减少 select *，尽可能地按需取数据。

```mysql
explain select user_name, id_car_no, mobile from user where user_name = 'bigman1111';
```



#### 避免使用不等于（!=、\<>）

mysql 在使用不等于（!=、<>）的时候无法使用索引会导致全表扫描（除覆盖索引外）。

```mysql
explain select * from user where age != 20;
explain select * from user where age <> 20;
```



#### 避免使用 is null

is null 会导致索引失效，而 is not null 可以使用到索引。

```mysql
explain select * from user where mobile is null; -- 用不到 mobile 字段索引
explain select * from user where mobile is not null; -- 能用到 mobile 字段索引，索引 type 为 range
```



#### 避免使用 like 以通配符开头（'%abc'）

模糊查找匹配开头，这时候索引发挥不了作用，导致全表扫描。

```mysql
select * from user where user_name like '%test%'; -- 索引失效
select * from user where user_name like '%test'; -- 索引失效
select * from user where user_name like 'test%'; -- 索引有效
```



**解决 like '%字符串%' 时索引不生效的方法**

使用**覆盖索引**来解决。

```mysql
explain select * from user where user_name like '%test%'; -- 没有用到覆盖索引
explain select id from user where user_name like '%test%'; -- 使用到了 id 字段的覆盖索引
explain select user_name from user where user_name like '%test%'; -- 使用到了 user_name 字段的覆盖索引

-- 注意，select * 或者 没有索引字段，用不到覆盖索引，最终还是会导致索引失效。

```



#### 字符串不加单引号索引失效

```mysql
explain select * from user where mobile = 1234567890; -- mobile 为 varchar 类型，不加单引号，mysql 隐式类型转换会导致索引失效。
```



#### 少用 or

or 主要是针对复合索引查询，or 条件连接查询，也会导致索引失效。对于单独索引，or 条件查询的字段有索引，索引正常有效。

```mysql

```



#### order by

索引有两个作用：排序和查找。

order by 字段，违法最左前缀法则、含非索引字段排序、会导致文件排序、产生临时表，严重影响性能。



#### group by

group by 字段，违法最左前缀法则、含非索引字段排序、会导致文件排序、产生临时表，严重影响性能。



#### 单独索引的优先级高于组合索引

如果一张表创建了字段的单独索引，同时该字段又在其他组合索引中，默认优先使用单独索引，用不到组合索引，导致文件排序、临时表问题。



#### unique 唯一索引优先级高于 index 普通索引

唯一索引的优先级比普通索引的优先级高，可能导致普通索引用不到，而产生文件排序、临时表。





## 索引优化实践

### 热身案例

#### explain 分析 sql 语句执行顺序

![image-20210108032036308](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210108032036308.png)



#### 索引使用情况测试

![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210108210548805.png)



验证 `索引范围查询会导致后面的索引列失效` 

对于复合索引 index(a, b, c)，为什么同样是范围，like 'kk%' 后面的索引字段还生效，而 b > 4 后面的索引字段却不生效？

![image-20210108211022724](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210108211022724.png)





### 为什么使用复合索引

**复合索引的优缺点：**

优势：



缺点：





### 查询优化

**实际工作开发 sql 调优步骤：**

1. 开启慢查询并记录 sql
2. explain 分析慢查询 sql
3. show profile 查询 sql 在 mysql 服务器里面的执行细节和生命周期
4. mysql 服务器配置参数调优



#### 小表驱动大表

小表驱动大表，即小的数据集驱动大的数据集。

![image-20210108213829119](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210108213829119.png)



#### order by 排序优化

order by 排序，尽量使用 index 索引排序，尽可能地在索引列上完成排序，避免使用 filesort 方式排序。



如果碰到个别字段没有也不让建索引，但业务确实需要使用这个字段排序，就会产生 filesort。

既然免不了要用到 filesort，就需要明白 filesort 的排序原理。

filesort 使用的两种排序算法：双路排序和单路排序。

**双路排序：**

从磁盘读取排序字段内容，在 buffer 完成排序，再从磁盘读取其他字段内容。两次磁盘 I/O 完成排序。

**单路排序：**

从磁盘读取查询所需要的所有列，按照 order by 列在 buffer 对它们进行排序，然后扫描排序后的列表输出结果。

因为避免了二次读取数据，而且把随机 I/O 变成了顺序 I/O，提高了排序查询的效率。

但也因为一次加载了所有需要的数据，会占用更多的内存空间，一旦配置参数设置内存不够，反而会造成多次 I/O，效率反而不如多路排序。



![image-20210108221335374](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210108221335374.png)



#### group by （排序）分组优化

group by 的本质是先排序后进行分组，group by 的字段尽可能遵循索引最左前缀原则。

当无法使用索引列时，增大 sort_buffer_size 和 max_length_for_sort_data 的数值。

where 高于 having，能写在 where 后的限定条件就不要写在 having 后。



### 慢查询日志

执行实践超过设置的 long_query_time 阈值的 sql，会被认为是慢查询 sql，需要进一步分析和优化。



#### 开启慢查询日志

```mysql
-- 查看是否开启了慢查询日志，默认是关闭的
show variables like '%slow_query_log%';
-- 开启慢查询日志
set global slow_query_log = 1;

-- 查看慢查询时间阈值设置，默认是 10 s
show variables like 'long_query_time%';
-- 设置慢查询时间阈值
set global long_query_time = 3;

-- 注意，show variables 查看的是用户会话变量，修改了 global 全局配置，需要用 show global variables 变量名 查看
show global variables like 'long_query_time%';

-- 模拟慢查询
select sleep(4);

-- 到 mysql 服务器上查看日志文件

```

![image-20210108222112216](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210108222112216.png)



注意，如果不是调优需要，一般不建议开启，因为慢查询日志记录会有额外的性能开销。



#### 日志分析工具 mysqldumpslow

```
mysqldumpslow --help

参数解释

-s, 是表示按照何种方式排序
c: 访问计数
l: 锁定时间
r: 返回记录
t: 查询时间
al:平均锁定时间
ar:平均返回记录数
at:平均查询时间
-t, 是top n的意思，即为返回前面多少条的数据；
-g, 后边可以写一个正则匹配模式，大小写不敏感的；

基本用法

例：
得到返回记录集最多的10个SQL。
mysqldumpslow -s r -t 10 /database/mysql/mysql06_slow.log
得到访问次数最多的10个SQL
mysqldumpslow -s c -t 10 /database/mysql/mysql06_slow.log
得到按照时间排序的前10条里面含有左连接的查询语句。
mysqldumpslow -s t -t 10 -g “left join” /database/mysql/mysql06_slow.log
另外建议在使用这些命令时结合 | 和more 使用 ，否则有可能出现刷屏的情况。
mysqldumpslow -s r -t 20 /mysqldata/mysql/mysql06-slow.log | more

```



### show profile 性能分析

Show Profile 是 mysql 提供的可以用来分析当前会话中 sql 语句执行的资源消耗情况的工具，可用于 sql 调优的测量。

mysql 5.7+ 默认情况下处于开启状态，并保存最近 15 次的运行结果。

提供比 explain 更加细粒度的性能分析。



```mysql
-- 通过 select @@have_profiling 来显示当前 mysql 是否支持 profile

-- 查看 show profile 状态
show variables like '%profiling%';
-- 或者
select @@profiling;

-- 开启
set profiling = 1;

-- Query_ID为#3步骤中show profiles列表中的Query_ID
-- show profile cpu, block io for query Query_ID;
show profile cpu, block io for query 15;

/*
show profile 的常用查询参数
ALL：显示所有的开销信息。
BLOCK IO：显示块IO开销。
CONTEXT SWITCHES：上下文切换开销。
CPU：显示CPU开销信息。
IPC：显示发送和接收开销信息。
MEMORY：显示内存开销信息。
PAGE FAULTS：显示页面错误开销信息。
SOURCE：显示和Source_function，Source_file，Source_line相关的开销信息。
SWAPS：显示交换次数开销信息。

日常开发需注意的结论
converting  HEAP to MyISAM：查询结果太大，内存不够，数据往磁盘上搬了。
Creating tmp table：创建临时表。先拷贝数据到临时表，用完后再删除临时表。
Copying to tmp table on disk：把内存中临时表复制到磁盘上，危险！！！
locked

如果在show profile诊断结果中出现了以上4条结果中的任何一条，则sql语句需要优化。

*/

```



### 全局查询日志

**不要在生产环境开启这个配置。**



在 MySQL 的 my.cnf 中设置

```ini
#开启
general_log=1
#记录日志文件的路径
general_log_file=/path/logfile
#输出格式
log_output=file
```



修改全局配置

```mysql
set global general_log=1; #开启后会把所有的SQL偷偷的记录
set global log_output='TABLE';

-- 所编写的SQL语句，将会记录到MySQL库里的general_log表
select * from mysql.general_log;

```



# 存储引擎

## 什么是存储引擎

表的处理器，是mysql数据库服务软件自动程序，不同处理器有不同的功能和数据存储方式。



## MySQL 支持哪些存储引擎

使用 `show engines` 查看。

![img](./MySQL%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210101220952784.png)



## MySQL 常用的存储引擎及之间的区别

### InnoDB

- 支持行级锁
- 支持外键 、 事务 、事务回滚
- 共享表空间
- t3.frm 表结构
- t3.ibd 表记录+表索引



### MyISAM

- 独享表空间
- t1.frm 表结构
- t1.MYD 表记录
- t1.MYI 表索引



### MEMORY

Hash based, stored in memory, useful for temporary tables





# 锁机制

- [MySQL的锁机制和加锁原理](https://blog.csdn.net/qq_38238296/article/details/88362999)
- fdsgds
- [mysql锁机制详解](https://www.cnblogs.com/volcano-liu/p/9890832.html)



mysql 锁分类：

1. 按照锁的粒度划分：行锁、表锁、页锁

2. 按照锁的使用方式划分：共享锁、排它锁（悲观锁的一种实现）

3. 还有两种思想上的锁：悲观锁、乐观锁。

4. InnoDB中有几种行级锁类型：Record Lock、Gap Lock、Next-key Lock

   - Record Lock：在索引记录上加锁

   - Gap Lock：间隙锁

   - Next-key Lock：Record Lock+Gap Lock



## 行锁

行级锁是Mysql中锁定粒度最细的一种锁，表示只针对当前操作的行进行加锁。**行级锁能大大减少数据库操作的冲突。其加锁粒度最小，但加锁的开销也最大。有可能会出现死锁的情况。** 行级锁按照使用方式分为共享锁和排他锁。

**共享锁用法（S锁 读锁）**：

 若事务T对数据对象A加上S锁，则事务T**可以读A但不能修改A**，其他事务只能再对A加S锁，而不能加X锁，直到T释放A上的S锁。这保证了其他事务可以读A，但在T释放A上的S锁之前不能对A做任何修改。

```sql
select ... lock in share mode;
```

**共享锁就是允许多个线程同时获取一个锁，一个锁可以同时被多个线程拥有。**

**排它锁用法（X 锁 写锁）**：

 若事务T对数据对象A加上X锁，事务T**可以读A也可以修改A**，其他事务不能再对A加任何锁，直到T释放A上的锁。这保证了其他事务在T释放A上的锁之前不能再读取和修改A。

```sql
select ... for update;
```

 **排它锁，也称作独占锁，一个锁在某一时刻只能被一个线程占有，其它线程==阻塞等待==锁被释放之后才可能获取到锁。**



## 表锁

表级锁是mysql锁中粒度最大的一种锁，表示当前的操作对整张表加锁，**资源开销比行锁少，不会出现死锁的情况，但是发生锁冲突的概率很大**。被大部分的mysql引擎支持，MyISAM和InnoDB都支持表级锁，但是InnoDB默认的是行级锁。

**共享锁用法**：

```sql
LOCK TABLE table_name [ AS alias_name ] READ
```

**排它锁用法**：

```sql
LOCK TABLE table_name [AS alias_name][ LOW_PRIORITY ] WRITE
```

**解锁用法**：

```mysq
unlock tables;
```



## 页锁

页级锁是MySQL中锁定粒度介于行级锁和表级锁中间的一种锁。表级锁速度快，但冲突多，行级冲突少，但速度慢。所以取了折衷的页级，一次锁定相邻的一组记录。



## InnoDB 锁的特性

1. 在没有使用索引条件查询的时候，InnoDB 使用的是表锁。
2. 由于 MySQL 的行锁是针对索引加的锁，不是针对记录加的锁，所以虽然是访问不同行的记录，如果是使用相同的索引键，依然会出现锁冲突，后续操作的线程阻塞等待。
3. 当表有多个索引的时候，不同的事务可以使用不同的索引锁定不同的行，另外，不论是使用主键索引、唯一索引或普通索引，InnoDB  都会使用行锁来对数据加锁。
4. 即便在条件中使用了索引字段，但是否使用索引来检索数据是由 MySQL 通过判断不同 执行计划的代价来决定的，如果 MySQL 认为全表扫 效率更高，比如对一些很小的表，就不会使用索引，这种情况下 InnoDB 将使用表锁，而不是行锁。因此，在分析锁冲突时， 先检查 SQL 的执行计划（explain 查看），以确认是否真正使用了索引。



**通过非索引项检索数据，加表锁**

```mysql
-- price 属性并没有加索引，因此这时候添加的锁为表级锁！
窗口1：
mysql> select * from product where price=88 for update;
+----+------+-------+-----+
| id | name | price | num |
+----+------+-------+-----+
|  2 | 蒙牛 |    88 |   1 |
+----+------+-------+-----+

窗口2：
mysql> update product set price=price-100 where id=6;
这里会等待，直到窗口1 commit后显示下面结果！
Query OK, 1 row affected
Rows matched: 1  Changed: 1  Warnings: 0
```



**使用相同索引值但是不同行引发的冲突**

```mysql
这里的num属性 加上了普通索引，price属性并没有索引
窗口1：
mysql> set autocommit=0;
Query OK, 0 rows affected

mysql> select * from product where num=1 and price=68 for update;
+----+------+-------+-----+
| id | name | price | num |
+----+------+-------+-----+
|  1 | 伊利 |    68 |   1 |
+----+------+-------+-----+

窗口2：
mysql> update product set price=price+100 where num=1 and price=88;
这里会发生等待，直到窗口1 commit 显示下面结果
Query OK, 1 row affected
Rows matched: 1  Changed: 1  Warnings: 0
mysql> select * from product;
+----+----------+-------+-----+
| id | name     | price | num |
+----+----------+-------+-----+
|  1 | 伊利     |    68 |   1 |
|  2 | 蒙牛     |   188 |   1 |
```



**当使用索引检索数据时不同事务可以操作不同行数据**

```mysql
锁一行数据，DML操作其他行并没有影响
窗口1：
mysql> select * from user where id=1 for update;
+----+-------+
| id | price |
+----+-------+
|  1 |   400 |
+----+-------+

窗口2：
mysql> update user set price=price+100 where id=2;
无需等待窗口1 commit
Database changed
Rows matched: 1  Changed: 1  Warnings: 0
```



## Record Lock

单条索引上加锁，record lock 永远锁的是索引，而非数据本身，如果 innodb 表中没有索引，那么会自动创建一个隐藏的聚集索引，锁住的就是这个聚集索引。所以说当一条 sql 没有走任何索引时，那么将会在每一条聚集索引后面加 X 锁，会锁住整张表。



## Gap Lock

间隙锁，是在索引的间隙之间加上锁。

间隙锁案例

```mysql
mysql> select * from product_copy;
+----+--------+-------+-----+
| id | name   | price | num |
+----+--------+-------+-----+
|  1 | 伊利   |    68 |   1 |
|  2 | 蒙牛   |    88 |   1 |
|  6 | tom    |  2788 |   3 |
| 10 | 优衣库 |   488 |   4 |
+----+--------+-------+-----+
其中id为主键 num为普通索引
窗口A：
mysql> select * from product_copy where num=3 for update;
+----+------+-------+-----+
| id | name | price | num |
+----+------+-------+-----+
|  6 | tom  |  2788 |   3 |
+----+------+-------+-----+
1 row in set

窗口B：
mysql> insert into product_copy values(5,'kris',1888,2);
这里会等待  直到窗口A commit才会显示下面结果
Query OK, 1 row affected

但是下面是不需要等待的
mysql> update product_copy set price=price+100 where num=1;
Query OK, 2 rows affected
Rows matched: 2  Changed: 2  Warnings: 0
mysql> insert into product_copy values(5,'kris',1888,5);
Query OK, 1 row affected
```



**主键索引/唯一索引+当前读会加上Gap锁吗？**

```mysql
窗口A：
mysql> select * from product_copy where id=6 for update;
+----+------+-------+-----+
| id | name | price | num |
+----+------+-------+-----+
|  6 | tom  |  2788 |   3 |
+----+------+-------+-----+

窗口B：并不会发生等待
mysql> insert into product_copy values(5,'kris',1888,3);
Query OK, 1 row affected
```

只将 id=6 的行数据锁住，用 Gap 锁的原理来解释的话：因为主键索引和唯一索引的值只有一个，所以满足检索条件的只有一行，故并不会出现幻读，所以并不会加上 Gap 锁。



**通过范围查询是否会加上 Gap 锁**

```mysql
窗口A：
mysql> select * from product_copy where num>3 for update;
+----+--------+-------+-----+
| id | name   | price | num |
+----+--------+-------+-----+
| 10 | 优衣库 |   488 |   4 |
+----+--------+-------+-----+

窗口B：会等待
mysql> insert into product_copy values(11,'kris',1888,5);
Query OK, 1 row affected
不会等待
mysql> insert into product_copy values(3,'kris',1888,2);
Query OK, 1 row affected
```

只要在检索条件范围就会加上 Gap 锁。



## Next-Key Lock

这个锁机制是 record lock 和 gap lock 两个锁相结合的机制，既锁住记录本身还锁住索引之间的间隙。



## mysql 加锁过程详解

**[Mysql加锁过程详解（1）-基本知识](http://www.cnblogs.com/crazylqy/p/7611069.html)**

**[Mysql加锁过程详解（2）-关于mysql 幻读理解](http://www.cnblogs.com/crazylqy/p/7612230.html)**

**[Mysql加锁过程详解（3）-关于mysql 幻读理解](http://www.cnblogs.com/crazylqy/p/7614092.html)**

**[Mysql加锁过程详解（4）-select for update/lock in share mode 对事务并发性影响](http://www.cnblogs.com/crazylqy/p/7614245.html)**

**[Mysql加锁过程详解（5）-innodb MVCC 多版本并发控制原理详解](http://www.cnblogs.com/crazylqy/p/7610831.html)**

**[Mysql加锁过程详解（6）-数据库隔离级别（1）](http://www.cnblogs.com/crazylqy/p/7515020.html)**

**[Mysql加锁过程详解（6）-数据库隔离级别（2）-通过例子理解事务的4种隔离级别](http://www.cnblogs.com/crazylqy/p/7516066.html)**

**[Mysql加锁过程详解（7）-初步理解MySQL的gap锁](http://www.cnblogs.com/crazylqy/p/7689447.html)**

**[Mysql加锁过程详解（8）-理解innodb的锁(record,gap,Next-Key lock)](http://www.cnblogs.com/crazylqy/p/7773492.html)**

**[Mysql加锁过程详解（9）-innodb下的记录锁，间隙锁，next-key锁](http://www.cnblogs.com/crazylqy/p/7821481.html)**



# 权限管理

## 用户管理

### 基本命令

```mysql
/* 用户和权限管理 */ ------------------
用户信息表：mysql.user

-- 刷新权限
FLUSH PRIVILEGES

-- 增加用户 CREATE USER kuangshen IDENTIFIED BY '123456'
CREATE USER 用户名 IDENTIFIED BY [PASSWORD] 密码(字符串)
  - 必须拥有mysql数据库的全局CREATE USER权限，或拥有INSERT权限。
  - 只能创建用户，不能赋予权限。
  - 用户名，注意引号：如 'user_name'@'192.168.1.1'
  - 密码也需引号，纯数字密码也要加引号
  - 要在纯文本中指定密码，需忽略PASSWORD关键词。要把密码指定为由PASSWORD()函数返回的混编值，需包含关键字PASSWORD

-- 重命名用户 RENAME USER kuangshen TO kuangshen2
RENAME USER old_user TO new_user

-- 设置密码
SET PASSWORD = PASSWORD('密码')    -- 为当前用户设置密码
SET PASSWORD FOR 用户名 = PASSWORD('密码')    -- 为指定用户设置密码

-- 删除用户 DROP USER kuangshen2
DROP USER 用户名

-- 分配权限/添加用户
GRANT 权限列表 ON 表名 TO 用户名 [IDENTIFIED BY [PASSWORD] 'password']
  - all privileges 表示所有权限
  - *.* 表示所有库的所有表
  - 库名.表名 表示某库下面的某表

-- 查看权限   SHOW GRANTS FOR root@localhost;
SHOW GRANTS FOR 用户名
   -- 查看当前用户权限
  SHOW GRANTS; 或 SHOW GRANTS FOR CURRENT_USER; 或 SHOW GRANTS FOR CURRENT_USER();

-- 撤消权限
REVOKE 权限列表 ON 表名 FROM 用户名
REVOKE ALL PRIVILEGES, GRANT OPTION FROM 用户名    -- 撤销所有权限
```



### 权限解释

```mysql
-- 权限列表
ALL [PRIVILEGES]    -- 设置除GRANT OPTION之外的所有简单权限
ALTER    -- 允许使用ALTER TABLE
ALTER ROUTINE    -- 更改或取消已存储的子程序
CREATE    -- 允许使用CREATE TABLE
CREATE ROUTINE    -- 创建已存储的子程序
CREATE TEMPORARY TABLES        -- 允许使用CREATE TEMPORARY TABLE
CREATE USER        -- 允许使用CREATE USER, DROP USER, RENAME USER和REVOKE ALL PRIVILEGES。
CREATE VIEW        -- 允许使用CREATE VIEW
DELETE    -- 允许使用DELETE
DROP    -- 允许使用DROP TABLE
EXECUTE        -- 允许用户运行已存储的子程序
FILE    -- 允许使用SELECT...INTO OUTFILE和LOAD DATA INFILE
INDEX     -- 允许使用CREATE INDEX和DROP INDEX
INSERT    -- 允许使用INSERT
LOCK TABLES        -- 允许对您拥有SELECT权限的表使用LOCK TABLES
PROCESS     -- 允许使用SHOW FULL PROCESSLIST
REFERENCES    -- 未被实施
RELOAD    -- 允许使用FLUSH
REPLICATION CLIENT    -- 允许用户询问从属服务器或主服务器的地址
REPLICATION SLAVE    -- 用于复制型从属服务器（从主服务器中读取二进制日志事件）
SELECT    -- 允许使用SELECT
SHOW DATABASES    -- 显示所有数据库
SHOW VIEW    -- 允许使用SHOW CREATE VIEW
SHUTDOWN    -- 允许使用mysqladmin shutdown
SUPER    -- 允许使用CHANGE MASTER, KILL, PURGE MASTER LOGS和SET GLOBAL语句，mysqladmin debug命令；允许您连接（一次），即使已达到max_connections。
UPDATE    -- 允许使用UPDATE
USAGE    -- “无权限”的同义词
GRANT OPTION    -- 允许授予权限


/* 表维护 */

-- 分析和存储表的关键字分布
ANALYZE [LOCAL | NO_WRITE_TO_BINLOG] TABLE 表名 ...
-- 检查一个或多个表是否有错误
CHECK TABLE tbl_name [, tbl_name] ... [option] ...
option = {QUICK | FAST | MEDIUM | EXTENDED | CHANGED}
-- 整理数据文件的碎片
OPTIMIZE [LOCAL | NO_WRITE_TO_BINLOG] TABLE tbl_name [, tbl_name] ...
```





# 项目实战
## 库表设计

### 一切以实际项目需求为主

合适的，对项目有帮助的规范可以引入，不合适的，别管它！就好像公司是你的，项目是你的，却要你按照别人的规范要求约束自己，你受得了？！

**没有绝对的规范**，不管是几大范式，都不是强行要求，如果业务确实需要，并且能提高业务性能，为什么非要死板按照规范来呢？

你放心，是个正常人，按照正常逻辑创建的表和字段，基本上都符合要求！



> 可以适当参考一下阿里开源的开发手册，里面有关于数据库建表相关的规范建议。





### ~~三大范式~~

**第一范式（1st NF）**

第一范式的目标是确保每列的原子性，如果每列都是==**不可再拆分**==的最小数据单元，则满足第一范式。



**第二范式（2nd NF）**

第二范式是在第一范式的基础上建立起来的，即满足第二范式必须先满足第一范式。

第二范式要求每个表==**只描述一件事情**==。（**专注单一**就行了，把自己的事情做好，别瞎管闲事）



**第三范式（3rd NF）**

如果一个关系满足第二范式，并且除了主键以外的其他列都不传递依赖于主键列，则满足第三范式。

第三范式需要确保数据表中的==**每一列数据都和主键直接相关**==，而不能间接相关。（用户表，就建用户相关的字段就好了）



**规范化和性能的关系**

**没有绝对的规范**，不管是几大范式，都不是强行要求，如果业务确实需要，并且能提高业务性能，为什么非要死板按照规范来呢？

- 为满足某种商业目标，数据库性能比规范化数据库更重要。

- 在数据规范化的同时，要综合考虑数据库的性能。

- 通过在给定的表中添加额外的字段，以大量减少需要从中搜索信息所需的时间。

- 通过在给定的表中插入计算列，以方便查询。





## 数据备份

### 实时备份（复制）

#### 主从复制

- [mysql 主从复制](https://blog.51cto.com/u_15444123/4727074)



### 手动备份（导出）

导出为 sql 脚本，可以使用客户端操作，也可以使用命令操作。





## 读写分离

### Mycat





### 业务代码实现





### MySQL Router





## 负载均衡

- [如何使用Nginx实现MySQL数据库的负载均衡](https://zhuanlan.zhihu.com/p/161985895)



