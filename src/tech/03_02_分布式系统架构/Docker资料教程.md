---
title: Docker资料教程
date: 2024-06-08 18:02:35
category:
    - 分布式架构
tag:
    - Docker
    - 容器部署
---

## Docker 概述

### Docker 为什么出现

一款产品从开发到上线，从操作系统，到运行环境，再到应用配置。作为开发+运维之间的协作需要关心很多东西，这也是很多互联网公司都不得不面对的问题，特别是各种版本的迭代之后，不同版本环境的兼容，对运维人员是极大的考验！

环境配置如此麻烦，换一台机器，就要重来一次，费力费时。很多人想到，能不能从根本上解决问题，`软件可以带环境安装？`也就是说，安装的时候，把原始环境一模一样地复制过来。解决开发人员说的“ 在我的机器上可正常工作”的问题。

之前在服务器配置一个应用的运行环境，要安装各种软件，就拿一个基本的工程项目的环境来说吧，Java/Tomcat/MySQL/JDBC驱动包等。安装和配置这些东西有多麻烦就不说了，它还不能跨平台。假如是在 Windows 上安装的这些环境，到了 Linux 又得重新装。况且就算不跨操作系统，换另一台同样操作系统的服务器，要移植应用也是非常麻烦的。

传统上认为，软件编码开发/测试结束后，所产出的成果即是程序或是能够编译执行的二进制字节码文件等（Java为例）。而为了让这些程序可以顺利执行，开发团队也得准备完整的部署文件，让维运团队得以部署应用程式，**开发需要清楚的告诉运维部署团队，用的全部配置文件+所有软件环境。不过，即便如此，仍然常常发生部署失败的状况。**

Docker之所以发展如此迅速，也是因为它对此给出了一个标准化的解决方案。

Docker镜像的设计，`使得Docker得以打破过去「程序即应用」的观念。通过Docker镜像 ( images ) 将应用程序所需要的系统环境，由下而上打包，达到应用程序跨平台间的无缝接轨运作。`



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker.jpeg)



Docker的思想来自于集装箱，集装箱解决了什么问题？在一艘大船上，可以把货物规整的摆放起来。并且各种各样的货物被集装箱标准化了，集装箱和集装箱之间不会互相影响。那么我就不需要专门运送水果的船和专门运送化学品的船了。只要这些货物在集装箱里封装的好好的，那我就可以用一艘大船把他们都运走。

docker就是类似的理念。



### Docker 历史

2010年，几个搞IT的年轻人，在美国旧金山成立了一家名叫“dotCloud”的公司。这家公司主要提供基于Pass的云计算技术服务。具体来说，是和LXC有关的容器技术。

后来，dotCloud公司将自己的容器技术进行了简化和标准化，并命名为——**Docker**。

Docker技术诞生之后，并没有引起行业的关注。而dotCloud公司，作为一家小型创业企业，在激烈的竞争之下，也步履维艰。

正当他们快要坚持不下去的时候，脑子里蹦出了“开源”的想法。

什么是“开源”？开源，就是开放源代码。也就是将原来内部保密的程序源代码开放给所有人，然后让大家一起参与进来，贡献代码和意见。

有的软件是一开始就开源的。也有的软件，是混不下去，创造者又不想放弃，所以选择开源。自己养不活，就吃“百家饭”嘛。

2013年3月，dotCloud公司的创始人之一，Docker之父，28岁的**Solomon Hykes**正式决定，将Docker项目开源。

不开则已，一开惊人。

越来越多的IT工程师发现了Docker的优点，然后蜂拥而至，加入Docker开源社区。Docker的人气迅速攀升，速度之快，令人瞠目结舌。

开源当月，Docker 0.1 版本发布。此后的每一个月，Docker都会发布一个版本。到2014年6月9日，Docker 1.0 版本正式发布。

此时的Docker，已经成为行业里人气最火爆的开源技术，没有之一。甚至像Google、微软、Amazon、VMware这样的巨头，都对它青睐有加，表示将全力支持。

Docker和容器技术为什么会这么火爆？说白了，就是因为它“轻”。

在容器技术之前，业界的网红是**虚拟机**。虚拟机技术的代表，是**VMWare**和**OpenStack**。相信很多人都用过虚拟机。虚拟机，就是在你的操作系统里面，装一个软件，然后通过这个软件，再模拟一台甚至多台“子电脑”出来。

在“子电脑”里，你可以和正常电脑一样运行程序，例如开QQ。如果你愿意，你可以变出好几个“子电脑”，里面都开上QQ。“子电脑”和“子电脑”之间，是**相互隔离**的，互不影响。

虚拟机属于虚拟化技术。而Docker这样的容器技术，也是虚拟化技术，属于**轻量级的虚拟化**。

虚拟机虽然可以隔离出很多“子电脑”，但占用空间更大，启动更慢，虚拟机软件可能还要花钱（例如VMWare）。

而容器技术恰好没有这些缺点。它不需要虚拟出整个操作系统，只需要虚拟一个小规模的环境（类似“沙箱”）。

它启动时间很快，几秒钟就能完成。而且，它对资源的利用率很高（一台主机可以同时运行几千个Docker容器）。此外，它占的空间很小，虚拟机一般要几GB到几十GB的空间，而容器只需要MB级甚至KB级。

正因为如此，容器技术受到了热烈的欢迎和追捧，发展迅速。



Docker是基于Go语言实现的云开源项目。

Docker的主要目标是“Build，Ship and Run Any App , Anywhere”，也就是通过对应用组件的封装、分发、部署、运行等生命周期的管理，使用户的APP（可以是一个WEB应用或数据库应用等等）及其运行环境能够做到“一次封装，到处运行”。

Linux 容器技术的出现就解决了这样一个问题，而 Docker 就是在它的基础上发展过来的。将应用运行在Docker 容器上面，而 Docker 容器在任何操作系统上都是一致的，这就实现了跨平台、跨服务器。只需要一次配置好环境，换到别的机子上就可以一键部署好，大大简化了操作。



### Docker 能干什么

> 之前的虚拟机技术

虚拟机（virtual machine）就是带环境安装的一种解决方案。

它可以在一种操作系统里面运行另一种操作系统，比如在Windows 系统里面运行Linux 系统。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。这类虚拟机完美的运行了另一套系统，能够使应用程序，操作系统和硬件三者之间的逻辑不变。



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200630162457580.png)



**虚拟机的缺点：** 1、资源占用多 2、冗余步骤多 3 、启动慢



>虚拟容器化技术

由于前面虚拟机存在这些缺点，Linux 发展出了另一种虚拟化技术：Linux 容器（Linux Containers，缩写为 LXC）。

`Linux 容器不是模拟一个完整的操作系统`，而是对进程进行隔离。有了容器，就可以将软件运行所需的所有资源打包到一个隔离的容器中。容器与虚拟机不同，不需要捆绑一整套操作系统，只需要软件工作所需的库资源和设置。系统因此而变得高效轻量并保证部署在任何环境中的软件都能始终如一地运行。



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200630162621319.png)



比较了 Docker 和传统虚拟化方式的不同之处：

- 传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；
- 而容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核，而且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。
- 每个容器之间互相隔离，每个容器有自己的文件系统 ，容器之间进程不会相互影响，能区分计算资源。



### 开发/运维（DevOps）

**更快速的应用交付和部署：**

传统的应用开发完成后，需要提供一堆安装程序和配置说明文档，安装部署后需根据配置文档进行繁杂的配置才能正常运行。Docker化之后只需要交付少量容器镜像文件，在正式生产环境加载镜像并运行即可，应用安装配置在镜像里已经内置好，大大节省部署配置和测试验证时间。

**更便捷的升级和扩缩容：**

随着微服务架构和Docker的发展，大量的应用会通过微服务方式架构，应用的开发构建将变成搭乐高积木一样，每个Docker容器将变成一块“积木”，应用的升级将变得非常容易。当现有的容器不足以支撑业务处理时，可通过镜像运行新的容器进行快速扩容，使应用系统的扩容从原先的天级变成分钟级甚至秒级。

**更简单的系统运维：**

应用容器化运行后，生产环境运行的应用可与开发、测试环境的应用高度一致，容器会将应用程序相关的环境和状态完全封装起来，不会因为底层基础架构和操作系统的不一致性给应用带来影响，产生新的BUG。当出现程序异常时，也可以通过测试环境的相同容器进行快速定位和修复。

**更高效的计算资源利用：**

Docker是内核级虚拟化，其不像传统的虚拟化技术一样需要额外的Hypervisor [管理程序] 支持，所以在一台物理机上可以运行很多个容器实例，可大大提升物理服务器的CPU和内存的利用率。



### Docker 的基本组成

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/9893541.jpg)



**镜像（image)：**

docker镜像就好比是一个目标，可以通过这个目标来创建容器服务，tomcat镜像==>run==>容器（提供服务器），通过这个镜像可以创建多个容器（最终服务运行或者项目运行就是在容器中的）。

**容器(container)：**

Docker利用容器技术，独立运行一个或者一组应用，通过镜像来创建的.
启动，停止，删除，基本命令
目前就可以把这个容器理解为就是一个简易的 Linux系统。

**仓库(repository)：**

仓库就是存放镜像的地方！
仓库分为公有仓库和私有仓库。(很类似git)
Docker Hub是国外的。
阿里云…都有容器服务器(配置镜像加速!)



### 学习参考资料

[Docker官网](http://www.docker.com/)

[Docker文档地址](https://docs.docker.com/)

[Docker中文网站](https://www.docker-cn.com/)

[Docker Hub官网（仓库）](https://hub.docker.com/)



## Docker 安装

### 安装 Docker

#### 环境准备

1. Linux要求内核3.0以上

2. CentOS 7

```shell
[root@iz2zk7sgji7hrg862gft54d ~]# uname -r
3.10.0-514.26.2.el7.x86_64	#要求3.0以上
[root@iz2zk7sgji7hrg862gft54d ~]# cat /etc/os-release 
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"
```



#### Docker 镜像加速

国内从 DockerHub 拉取镜像有时会遇到困难，此时可以配置镜像加速器。



https://segmentfault.com/a/1190000023117518

阿里云 docker hub mirror
[https://registry.cn-hangzhou.aliyuncs.com](https://registry.cn-hangzhou.aliyuncs.com/)



如果有账号的, 使用:

```
[系统分配前缀].mirror.aliyuncs.com
个人阿里云
https://qcjvwm2m.mirror.aliyuncs.com

#可能前缀是别人改动过的
https://c5uvansenbu.mirror.aliyuncs.com
https://ufcqvg33.mirror.aliyuncs.com

```

具体上阿里云[容器HUB控制台](https://cr.console.aliyun.com/?spm=a2c6h.12873639.0.0.5cc13b0cBV8vOp)查看.



腾讯云 docker hub mirror
[https://mirror.ccs.tencentyun.com](https://mirror.ccs.tencentyun.com/)



华为云
[https://05f073ad3c0010ea0f4bc00b7105ec20.mirror.swr.myhuaweicloud.com](https://05f073ad3c0010ea0f4bc00b7105ec20.mirror.swr.myhuaweicloud.com/)



docker 中国（可能也不好使了）
[https://registry.docker-cn.com](https://registry.docker-cn.com/)



网易
[https://hub-mirror.c.163.com](https://hub-mirror.c.163.com/)



中国科技大学（也慢）
https://docker.mirrors.ustc.edu.cn



daocloud
[http://f1361db2.m.daocloud.io](http://f1361db2.m.daocloud.io/)



创建或修改 /etc/docker/daemon.json 文件，修改为如下形式：

```json
{
  "registry-mirrors": [
    "https://registry.cn-hangzhou.aliyuncs.com",
    "https://c5uvansenbu.mirror.aliyuncs.com",
	"https://ufcqvg33.mirror.aliyuncs.com",
    "https://mirror.ccs.tencentyun.com",
    "https://hub-mirror.c.163.com",
    "https://docker.mirrors.ustc.edu.cn",
	"https://registry.docker-cn.com",
    "https://05f073ad3c0010ea0f4bc00b7105ec20.mirror.swr.myhuaweicloud.com"
  ]
}
```

通常配置一个即可。

```json
{"registry-mirrors":["https://qcjvwm2m.mirror.aliyuncs.com"]}
```



==**加载重启 docker**==

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```



**查看是否成功**

```shell
sudo docker info
#查看镜像配置
Registry Mirrors:
  https://qcjvwm2m.mirror.aliyuncs.com/

```



#### 开始安装

帮助文档：https://docs.docker.com/engine/install/



##### 安装

```shell
#查看是否已经安装过docker
yum list installed | grep docker

#如果之前有安装记录，可以先卸载之前的版本
#这是卸载老版本，最新版本卸载不掉
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

#查看已安装的版本
[root@dev0x01 dev0x01]# yum list installed|grep docker
containerd.io.x86_64                        1.4.3-3.1.el7              @docker-ce-stable
docker-ce.x86_64                            3:20.10.1-3.el7            @docker-ce-stable
docker-ce-cli.x86_64                        1:20.10.1-3.el7            @docker-ce-stable
docker-ce-rootless-extras.x86_64            20.10.1-3.el7              @docker-ce-stable

#卸载当前安装的 docker
yum -y remove containerd.io.x86_64
yum -y remove docker-ce.x86_64
yum -y remove docker-ce-cli.x86_64
yum -y remove docker-ce-rootless-extras.x86_64


#需要的安装包
sudo yum -y install yum-utils

#设置镜像的仓库
#上述方法默认是从国外的，不推荐

#推荐使用国内的，这里安装的是最新版本
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

#查看可安装的版本
$ yum list docker-ce --showduplicates | sort -r

docker-ce.x86_64  3:18.09.1-3.el7                     docker-ce-stable
docker-ce.x86_64  3:18.09.0-3.el7                     docker-ce-stable
docker-ce.x86_64  18.06.1.ce-3.el7                    docker-ce-stable
docker-ce.x86_64  18.06.0.ce-3.el7                    docker-ce-stable

#$ sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
#sudo yum install docker-ce-18.09.1 docker-ce-cli-18.09.1 containerd.io

#更新yum软件包索引
sudo yum makecache fast
centos8
sudo yum makecache

#安装docker相关的 docker-ce 社区版 而ee是企业版，这里使用社区版即可
#只安装docker核心组件
sudo yum install docker-ce docker-ce-cli containerd.io
#按需安装其他组件
sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

#添加用户到组
默认安装完后系统中有docker组，但是没有用户在这个组中，普通用户想要使用需要加入到这个组中
gpasswd -a 你的用户 docker
#切换当前组，以便使用 docker 功能
newgrp docker

#修改 docker 指令执行权限
sudo chown root:docker /usr/bin/docker*
sudo chown root:docker /usr/bin/containerd*
sudo chown root:docker /usr/bin/runc
sudo chown root:docker /usr/bin/ctr

#验证是否改变所属用户和所属组
ll /usr/bin/|grep docker
[Ming1@VM-0-7-centos ~]$ ll /usr/bin/|grep docker
-rwxr-xr-x  1 root docker   57091080 May 26 21:44 containerd
-rwxr-xr-x  1 root docker    7266304 May 26 21:44 containerd-shim
-rwxr-xr-x  1 root docker    9940992 May 26 21:44 containerd-shim-runc-v1
-rwxr-xr-x  1 root docker    9957376 May 26 21:44 containerd-shim-runc-v2
-rwxr-xr-x  1 root docker   30432744 May 26 21:44 ctr
-rwxr-xr-x  1 root docker   71563824 Jun  2 19:59 docker
-rwxr-xr-x  1 root docker  116463944 Jun  2 19:57 dockerd
-rwxr-xr-x  1 root docker      13348 Jun  2 19:53 dockerd-rootless-setuptool.sh
-rwxr-xr-x  1 root docker       4094 Jun  2 19:53 dockerd-rootless.sh
-rwxr-xr-x  1 root docker     849104 Jun  2 19:57 docker-init
-rwxr-xr-x  1 root docker    3751712 Jun  2 19:56 docker-proxy
-rwxr-xr-x  1 root root      9518032 Jun  2 20:02 rootlesskit-docker-proxy
-rwxr-xr-x  1 root docker   20107280 May 26 21:44 runc


#启动docker
sudo systemctl start docker

#查看 docker 运行状态
systemctl status docker

#使用docker version查看是否按照成功
docker version

#测试
docker run hello-world

#查看已经下载的镜像(从这里可以查看已有镜像的id)
[root@iz2zk7sgji7hrg862gft54d ~]# docker images
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
hello-world           latest              bf756fb1ae65        4 months ago      13.3kB

#查看运行的 docker 线程
[root@dev0x01 /]# ps aux|grep docker
root       3001  0.0  2.0 743448 77740 ?        Ssl  17:47   0:02 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
root       3719  0.0  0.0 112808   964 pts/0    S+   18:37   0:00 grep --color=auto docker

#结束docker 进程
[root@dev0x01 /]# systemctl stop docker
Warning: Stopping docker.service, but it can still be activated by:
  docker.socket

#提示 docker 的服务虽然停止了，但是还可能被 docker 后台的守护进程 socket 唤醒。
#果然，停止服务后，输入 docker -v 查看版本后，docker 的服务又启动了。

#怎样彻底停止 docker

#测试镜像用完了，可以删除
#镜像移除命令在后面

#设置 docker 服务开机自启
systemctl enable docker

#取消开机自启
systemctl disable docker

```



阿里云ECS

Alibaba Cloud Linux 3 (Soaring Falcon)

- [安装Docker并使用（Linux）](https://help.aliyun.com/zh/ecs/use-cases/deploy-and-use-docker-on-alibaba-cloud-linux-2-instances)



```shell
# 添加docker-ce的dnf源
sudo dnf config-manager --add-repo=https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装Alibaba Cloud Linux 3专用的dnf源兼容插件
sudo dnf -y install dnf-plugin-releasever-adapter --repo alinux3-plus

# 安装Docker
sudo dnf -y install docker-ce --nobest

# 安装docker-ce会自动安装以下组件
docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

#新买的ECS服务器，正常执行安装，如果有报错，具体细节参考阿里云官方docker安装教程。

#检查Docker是否安装成功
sudo docker -v
Docker version 26.1.1, build 4cf5afa

#启动Docker服务，并设置开机自启动
sudo systemctl start docker
sudo systemctl enable docker

#查看Docker是否启动
sudo systemctl status docker

#卸载docker
dnf list installed|grep docker
sudo dnf remove docker-ce
# 会提示卸载关联的依赖

#停用docker服务
sudo systemctl stop docker
sudo systemctl disable docker

#停用docker容器服务
sudo systemctl stop containerd
sudo systemctl disable containerd


```



##### 更新

```shell
#查看当前版本
[root@dev0x01 conf]# docker --version
Docker version 20.10.1, build 831ebea


```



##### 卸载

```shell
#1. 卸载依赖
yum remove docker-ce docker-ce-cli containerd.io
#2. 删除资源
rm -rf /var/lib/docker
#/var/lib/docker 是docker的默认工作路径！
```



## Docker 运行原理

### Run 运行流程

```shell
[root@dev0x01 /]# docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete 
Digest: sha256:1a523af650137b8accdaed439c17d684df61ee4d74feac151b5b337bd29e7eec
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-run.png)



### Docker 底层原理

#### Docker 是怎么工作的

Docker 是一个 Client-Server 结构的系统，Docker 的守护进程运行在主机上。通过 Socket 从客户端访问。

Docker-Server 接收到 Docker-Client 的指令，就会执行这个命令。

![image-20201228194054383](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201228194054383.png)



#### 为什么 Docker 比 VM 快

docker 有着比虚拟机更少的抽象层。由于 docker 不需要 Hypervisor 实现硬件资源虚拟化，运行在 docker 容器上的程序直接使用的都是实际物理机的硬件资源。因此在 CPU、内存利用率上 docker 将会在效率上有明显优势。
docker 利用的是宿主机的内核，而不需要 Guest OS。

> GuestOS： VM（虚拟机）里的的系统（OS）
>
> HostOS：物理机里的系统（OS）

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-vm.png)



当新建一个容器时，docker 不需要和虚拟机一样重新加载一个操作系统内核。从而避免引导、加载操作系统内核返个比较费时费资源的过程。当新建一个虚拟机时，虚拟机软件需要加载 GuestOS，返个新建过程是**分钟级别**的。而 docker 由于直接利用宿主机的操作系统，则省略了这个复杂的过程，新建一个 docker 容器只需要**几秒钟**。



## Docker 常用命令

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/59618-20170519215116432-38667527.png)



### 帮助命令

```shell
docker version    #显示docker的版本信息。
docker info       #显示docker的系统信息，包括镜像和容器的数量
docker --help     #帮助命令
```



### 镜像命令

```shell
docker images #查看所有本地主机上的镜像 可以使用docker image ls代替
docker search #搜索镜像
docker pull #下载镜像 docker image pull
docker rmi #删除镜像 docker image rm
```



1. **docker images 查看所有本地的主机上的镜像**

```shell
[root@iz2zk7sgji7hrg862gft54d ~]# docker images
REPOSITORY            TAG                 IMAGE ID            CREATED           SIZE
hello-world           latest              bf756fb1ae65        4 months ago     13.3kB
mysql                 5.7                 b84d68d0a7db        6 days ago       448MB

#解释
#REPOSITORY #镜像的仓库源
#TAG #镜像的标签(版本) ---lastest 表示最新版本
#IMAGE ID #镜像的id
#CREATED #镜像的创建时间
#SIZE #镜像的大小

#可选项
Options:
  -a, --all         Show all images (default hides intermediate images) #列出所有镜像
  -q, --quiet       Only show numeric IDs #只显示镜像的id
  
[root@iz2zk7sgji7hrg862gft54d ~]# docker images -a #列出所有镜像详细信息
[root@iz2zk7sgji7hrg862gft54d ~]# docker images -aq #列出所有镜像的id
d5f28a0bb0d0
f19c56ce92a8
1b6b1fe7261e
1b6b1fe7261e
```



2. **docker search 搜索镜像**

```shell
[root@iz2zk7sgji7hrg862gft54d ~]# docker search mysql

#--filter=STARS=3000 #过滤，搜索出来的镜像收藏STARS数量大于3000的
Options:
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print search using a Go template
      --limit int       Max number of search results (default 25)
      --no-trunc        Don't truncate output
      
[root@iz2zk7sgji7hrg862gft54d ~]# docker search mysql --filter=STARS=3000
NAME        DESCRIPTION         STARS            OFFICIAL        AUTOMATED
mysql       MySQL IS ...        9520             [OK]                
mariadb     MariaDB IS ...      3456             [OK]   
```



3. **docker pull 下载镜像**

建议先在 https://hub.docker.com 官网商店搜索，可以查看镜像应用的详细信息，然后再 pull 拉取下来。

```shell
#下载镜像 docker pull 镜像名[:tag]
[root@iz2zk7sgji7hrg862gft54d ~]# docker pull tomcat:8
8: Pulling from library/tomcat #如果不写tag，默认就是latest
90fe46dd8199: Already exists   #分层下载： docker image 的核心 联合文件系统
35a4f1977689: Already exists 
bbc37f14aded: Already exists 
74e27dc593d4: Already exists 
93a01fbfad7f: Already exists 
1478df405869: Pull complete 
64f0dd11682b: Pull complete 
68ff4e050d11: Pull complete 
f576086003cf: Pull complete 
3b72593ce10e: Pull complete 
Digest: sha256:0c6234e7ec9d10ab32c06423ab829b32e3183ba5bf2620ee66de866df #签名防伪
Status: Downloaded newer image for tomcat:8
docker.io/library/tomcat:8 #真实地址

#等价于
docker pull tomcat:8
docker pull docker.io/library/tomcat:8
```

```shell
#下载 MySQL 5.7/5.7.32 镜像
[root@dev0x01 /]# docker pull mysql:5.7
5.7: Pulling from library/mysql
#... 等待每一层资源下载完成

```



4. **docker rmi 删除镜像**

```shell
docker rmi -f 镜像id #删除指定id的镜像
[root@iz2zk7sgji7hrg862gft54d ~]# docker rmi -f f19c56ce92a8

docker rmi -f $(docker images -aq) #删除全部的镜像
[root@iz2zk7sgji7hrg862gft54d ~]# docker stop $(docker ps -a -q)

#出现删不掉的情况，镜像被一个已经停止的容器使用，需要强制删除
[root@dev0x01 /]# docker images
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
mysql         5.7       f07dfa83b528   6 days ago      448MB
hello-world   latest    bf756fb1ae65   12 months ago   13.3kB
[root@dev0x01 /]# docker rmi bf756fb1ae65
Error response from daemon: conflict: unable to delete bf756fb1ae65 (must be forced) - image is being used by stopped container 1fb99c8a6fff

#强制删除镜像
[root@dev0x01 /]# docker rmi -f bf756fb1ae65
Untagged: hello-world:latest
Untagged: hello-world@sha256:1a523af650137b8accdaed439c17d684df61ee4d74feac151b5b337bd29e7eec
Deleted: sha256:bf756fb1ae65adf866bd8c456593cd24beb6a0a061dedf42b26a993176745f6b
[root@dev0x01 /]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
mysql        5.7       f07dfa83b528   6 days ago   448MB

#镜像 id 一样的情况
[root@dev0x01 dev0x01]# docker images
REPOSITORY   TAG       IMAGE ID       CREATED      SIZE
mysql        5.7       f07dfa83b528   9 days ago   448MB
mysql        5.7.32    f07dfa83b528   9 days ago   448MB

docker rmi -f mysql:5.7.32


```



### 容器命令

说明：有了镜像才可以创建容器，Linux，下载centos镜像来学习。

```shell
#docker中下载centos
docker pull centos

docker run 镜像id/名称 #新建容器并启动 docker container run id/name
docker ps #列出所有运行的容器 docker container list/ls
docker rm 容器id/名称 #删除指定容器 docker container rm id/name

docker container prune #移除所有已停止的容器

docker start 容器id/名称	#启动容器
docker restart 容器id/名称	#重启容器
docker stop 容器id/名称	#停止当前正在运行的容器
docker kill 容器id/名称	#强制停止当前容器

```



#### 新建容器并启动

```shell
docker run --help
docker run [可选参数] image | docker container run [可选参数] image 
#参书说明
--name="Name"		#容器名字 tomcat01 tomcat02 用来区分容器
-d					#后台方式运行
-it 				#使用交互方式运行，进入容器查看内容
-p					#指定容器的端口 -p 8080(宿主机):8080(容器)
		-p ip:主机端口:容器端口
		-p 主机端口:容器端口(常用)
		-p 容器端口
		容器端口
-P(大写) 				随机指定端口

#测试、启动并进入容器
[root@iz2zk7sgji7hrg862gft54d ~]# docker run -it centos /bin/bash
[root@241b5abce65e /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@241b5abce65e /]# exit #从容器退回主机
exit
```



#### 列出所有运行的容器

```shell
docker ps --help #查看命令帮助
docker ps 命令  		#列出当前正在运行的容器
  -a, --all     	 #列出当前正在运行的容器 + 带出历史运行过的容器
  -n=?, --last int   #列出最近创建的?个容器 ?为1则只列出最近创建的一个容器,为2则列出2个
  -q, --quiet        #只列出容器的编号
```



#### 退出容器

```shell
exit 		#容器直接退出
ctrl +P +Q  #使用快捷键，容器不停止退出，很有用
```



#### 删除容器

```shell
docker rm 容器id   				#删除指定的容器，不能删除正在运行的容器，如果要强制删除 rm -rf
docker rm -f $(docker ps -aq)  	 #删除所有的容器
docker ps -a -q|xargs docker rm  #删除所有的容器
```



#### 启动和停止容器的操作

```shell
docker start 容器id/名称	#启动容器
docker restart 容器id/名称	#重启容器
docker stop 容器id/名称	#停止当前正在运行的容器
docker kill 容器id/名称	#强制停止当前容器
```

#### 后台启动运行命令

```shell
#命令 docker run -d 镜像名
[root@iz2zk7sgji7hrg862gft54d ~]# docker run -d centos
a8f922c255859622ac45ce3a535b7a0e8253329be4756ed6e32265d2dd2fac6c

[root@iz2zk7sgji7hrg862gft54d ~]# docker ps 
CONTAINER ID      IMAGE       COMMAND    CREATED     STATUS   PORTS    NAMES
#问题docker ps. 发现centos 停止了
#常见的坑，docker容器使用后台运行，就必须要有要一个前台进程，docker发现没有应用，就会自动停止
#nginx，容器启动后，发现自己没有提供服务，就会立刻停止，就是没有程序了
```



#### 查看日志

```shell
docker logs --help
Options:
      --details        Show extra details provided to logs 
*  -f, --follow         Follow log output
      --since string   Show logs since timestamp (e.g. 2013-01-02T13:23:37) or relative (e.g. 42m for 42 minutes)
*      --tail string    Number of lines to show from the end of the logs (default "all")
*  -t, --timestamps     Show timestamps
      --until string   Show logs before a timestamp (e.g. 2013-01-02T13:23:37) or relative (e.g. 42m for 42 minutes)
➜  ~ docker run -d centos /bin/sh -c "while true;do echo 6666;sleep 1;done" #模拟日志 
#显示日志
-tf		#显示日志信息（一直更新）
--tail number #需要显示日志条数
docker logs -t --tail n 容器id #查看n行日志
docker logs -f --tail=100 容器名称
docker logs -ft 容器id #跟着日志
docker logs --since 5m #容器id容器倒数五分钟内的日志

```



#### 查看容器中的进程信息

```shell
#docker top 容器id


```



#### 查看镜像元数据

```shell
#docker inspect 容器id

#查看容器的挂载目录
docker inspect nginx01


```



#### 进入当前正在运行的容器

通常容器都是使用后台方式运行的，需要进入容器，修改一些配置命令。

```shell
#方式一
#docker exec -it 容器id /bin/bash

#方式二
docker attach 容器id
#测试
docker attach 55321bcae33d 
正在执行当前的代码...
区别
#docker exec #进入当前容器后开启一个新的终端，可以在里面操作。（常用）
#docker attach #进入容器正在执行的终端

```



#### 从容器内拷贝到主机上

```shell
docker cp 容器id:容器内路径  主机目的路径

[root@iz2zk7sgji7hrg862gft54d ~]# docker ps
CONTAINER ID     IMAGE    COMMAND     CREATED         STATUS       PORTS      NAMES
56a5583b25b4     centos   "/bin/bash" 7seconds ago    Up 6 seconds      

#1. 进入docker容器内部
[root@iz2zk7sgji7hrg862gft54d ~]# docker exec -it 56a5583b25b4 /bin/bash
[root@55321bcae33d /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var

#新建一个文件
[root@55321bcae33d /]# echo "hello" > java.java
[root@55321bcae33d /]# cat hello.java 
hello
[root@55321bcae33d /]# exit
exit

#hello.java拷贝到home文件加下
[root@iz2zk7sgji7hrg862gft54d /]# docker cp 56a5583b25b4:/hello.java /home 
[root@iz2zk7sgji7hrg862gft54d /]# cd /home
[root@iz2zk7sgji7hrg862gft54d home]# ls -l #可以看见java.java存在
total 8
-rw-r--r-- 1 root root    0 May 19 22:09 haust.java
-rw-r--r-- 1 root root    6 May 22 11:12 java.java
drwx------ 3 www  www  4096 May  8 12:14 www

```



#### 容器内安装软件

##### 安装 vim

https://www.cnblogs.com/wicub/p/6924018.html

在使用docker容器时，有时候里边没有安装vim，敲vim命令时提示说：vim: command not found，这个时候就需要安装vim，可是当你敲apt-get install vim命令时，提示：
Reading package lists... Done
Building dependency tree
Reading state information... Done
E: Unable to locate package vim

这时候需要敲：

```
apt-get update
```

这个命令的作用是：同步 /etc/apt/sources.list 和 /etc/apt/sources.list.d 中列出的源的索引，这样才能获取到最新的软件包。
等更新完毕以后再敲命令：

```
apt-get install vim
```

命令即可。



##### 安装 net-tools 支持使用 ifconfig

```shell
apt-get update
apt-get install net-tools

#若出现 E: Unable to locate package xxx，重试上述两个步骤

```





## Docker 镜像

### 镜像是什么

按自己得方式理解：**一套运行环境**，执行 docker run 之后能产生多个容器实例。

镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，他包含运行某个软件所需的所有内容，包括代码、运行时库、环境变量和配置文件。

所有应用，直接打包 docker 镜像，就可以直接跑起来。



**如何得到镜像**

- 从远程仓库下载
- 别人拷贝给你
- 自己制作一个镜像 DockerFile



### Docker 镜像加载原理

> UnionFs （联合文件系统）

UnionFs（联合文件系统）：Union文件系统（UnionFs）是一种分层、轻量级并且高性能的文件系统，他支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下（ unite several directories into a single virtual filesystem)。Union文件系统是 Docker镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。
特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。



> Docker 镜像加载原理

Docker 的镜像实际上由一层一层的文件系统组成，这种层级的文件系统 UnionFS。
boots(boot file system）主要包含 bootloader 和 Kernel, bootloader 主要是引导加 kernel, Linux 刚启动时会加 bootfs 文件系统，在 Docker 镜像的最底层是 boots。这一层与典型的 Linux/Unix 系统是一样的，包含 boot 加载器和内核。当 boot 加载完成之后整个内核就都在内存中了，此时内存的使用权已由 bootfs 转交给内核，此时系统也会卸载 bootfs。
rootfs（root file system),在 bootfs 之上。包含的就是典型 Linux 系统中的 /dev,/proc,/bin,/etc 等标准目录和文件。rootfs 就是各种不同的操作系统发行版，比如 Ubuntu, Centos 等等。

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-image-work.png)



- **平时安装进虚拟机的CentOS都是好几个G，为什么Docker这里才200M？**

```shell
[root@localhost ~]# docker images
'REPOSITORY TAG IMAGE ID CREATED SIZE
centos latest 831691599b88 2 weeks ago 215MB

```

对于个精简的 OS,rootfs 可以很小，只需要包合最基本的命令，工具和程序库就可以了，因为底层直接用 Host 的 kernel，自己只需要提供 rootfs 就可以了。由此可见对于不同的 Linux 发行版，boots 基本是一致的，rootfs 会有差別，因此不同的发行版可以公用 bootfs。



### 分层理解

> 分层的镜像

Docker 的镜像下载是分层获取的。

```shell
[root@localhost ~]# docker pull redis
Using default tag: latest
latest: Pulling from library/redis
8559a31e96f4: Already exists 
85a6a5c53ff0: Pull complete 
b69876b7abed: Pull complete 
a72d84b9df6a: Pull complete 
5ce7b314b19c: Pull complete 
04c4bfb0b023: Pull complete 
Digest: sha256:800f2587bf3376cb01e6307afe599ddce9439deafbd4fb8562829da96085c9c5
Status: Downloaded newer image for redis:latest
docker.io/library/redis:latest
```



**为什么使用分层管理结构？**

- 细化、复用
- 避免重复下载



**通过 docker image inspect 可查看分层信息。**



所有的 Docker 镜像都起始于一个基础镜像层，当进行修改或增加新的内容时，就会在当前镜像层之上，创建新的镜像层。

举一个简单的例子，假如基于 Ubuntu Linux16.04 创建一个新的镜像，这就是新镜像的第一层；如果在该镜像中添加 Python 包，
就会在基础镜像层之上创建第二个镜像层；如果继续添加一个安全补丁，就会创健第三个镜像层该像当前已经包含3个镜像层，如下图所示（这只是一个用于演示的很简单的例子）。

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704155237947.png)



在添加额外的镜像层的同时，镜像始终保持是当前所有镜像的组合，理解这一点非常重要。下图中举了一个简单的例子，每个镜像层包含 3 个文件，而镜像包含了来自两个镜像层的 6 个文件。

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704155305110.png)



上图中的镜像层跟之前图中的略有区别，主要目的是便于展示文件。

下图中展示了一个稍微复杂的三层镜像，在外部看来整个镜像只有 6 个文件，这是因为最上层中的文件7 是文件 5 的一个更新版本。

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704155322163.png)



这种情况下，上层镜像层中的文件覆盖了底层镜像层中的文件。这样就使得文件的更新版本作为一个新镜像层添加到镜像当中。

Docker 通过存储引擎（新版本采用快照机制）的方式来实现镜像层堆栈，并保证多镜像层对外展示为统一的文件系统。

Linux 上可用的存储引擎有 AUFS、Overlay2、Device Mapper、Btrfs 以及 ZFS。顾名思义，每种存储引擎都基于 Linux 中对应的文件系统或者块设备技术，并且每种存储引擎都有其独有的性能特点。

Docker 在 Windows 上仅支持 windowsfifilter 一种存储引擎，该引擎基于 NTFS 文件系统之上实现了分层和 CoW。

下图展示了与系统显示相同的三层镜像。所有镜像层堆叠并合并，对外提供统一的视图。

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704155350469.png)



> 特点

Docker镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像的顶部！

这一层就是通常说的容器层，容器之下的都叫镜像层！

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704161245573.png)



### commit 镜像

**docker commit** 从容器创建一个新的镜像。

```shell
docker commit 提交容器成为一个新的副本

#命令和git原理类似
docker commit -m="描述信息" -a="作者" 容器id 目标镜像名:[版本TAG]
```



实战测试：

```shell
#1、启动一个默认的tomcat
[root@iz2zk7sgji7hrg862gft54d ~]# docker run -d -p 8080:8080 tomcat
de57d0ace5716d27d0e3a7341503d07ed4695ffc266aef78e0a855b270c4064e

#2、发现这个默认的tomcat 是没有webapps应用，官方的镜像默认webapps下面是没有文件的！
#docker exec -it 容器id /bin/bash
[root@iz2zk7sgji7hrg862gft54d ~]# docker exec -it de57d0ace571 /bin/bash
root@de57d0ace571:/usr/local/tomcat# 

#3、从webapps.dist拷贝文件进去webapp
root@de57d0ace571:/usr/local/tomcat# cp -r webapps.dist/* webapps
root@de57d0ace571:/usr/local/tomcat# cd webapps
root@de57d0ace571:/usr/local/tomcat/webapps# ls
ROOT  docs  examples  host-manager  manager

#4、将操作过的容器通过commit调教为一个镜像！以后就使用修改过的镜像即可，而不需要每次都重新拷贝webapps.dist下的文件到webapps了，这就是自己的一个修改的镜像。
docker commit -m="描述信息" -a="作者" 容器id 目标镜像名:[TAG]
docker commit -a="kuangshen" -m="add webapps app" 容器id tomcat02:1.0

[root@iz2zk7sgji7hrg862gft54d ~]# docker commit -a="csp提交的" -m="add webapps app" de57d0ace571 tomcat02.1.0
sha256:d5f28a0bb0d0b6522fdcb56f100d11298377b2b7c51b9a9e621379b01cf1487e

[root@iz2zk7sgji7hrg862gft54d ~]# docker images
REPOSITORY            TAG                 IMAGE ID            CREATED             SIZE
tomcat02.1.0          latest              d5f28a0bb0d0        14 seconds ago      652MB
tomcat                latest              1b6b1fe7261e        5 days ago          647MB
nginx                 latest              9beeba249f3e        5 days ago          127MB
mysql                 5.7                 b84d68d0a7db        5 days ago          448MB
elasticsearch         7.6.2               f29a1ee41030        8 weeks ago         791MB
portainer/portainer   latest              2869fc110bf7        2 months ago        78.6MB
centos                latest              470671670cac        4 months ago        237MB
hello-world           latest              bf756fb1ae65        4 months ago        13.3kB
```



理解概念， 但是一定要实践，最后实践和理论相结合。

如果想要保存当前容器的一个状态，就可以通过 commit 来提交，获得一个镜像！ 就好比以前学习 VM 的时候，快照！





## 容器数据卷

### 什么是容器数据卷

**docker的理念回顾：**

将应用和运行的环境打包形成容器运行，运行可以伴随着容器，但是对于数据的要求，是希望能够持久化的！

就好比，你安装一个MySQL，结果你把容器删了，就相当于删库跑路了，这TM也太扯了吧！

所以希望容器之间有可能可以共享数据，Docker容器产生的数据，如果不通过docker commit 生成新的镜像，使得数据作为镜像的一部分保存下来，那么当容器删除后，数据自然也就没有了！这样是行不通的！

为了能保存数据在Docker中就可以使用卷！让数据挂载到本地！这样数据就不会因为容器删除而丢失了！

**作用：**

卷就是目录或者文件，存在一个或者多个容器中，由docker挂载到容器，但不属于联合文件系统，因此能够绕过 Union File System ， 提供一些用于持续存储或共享数据的特性：卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此Docker不会在容器删除时删除其挂载的数据卷。

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704180607848.png)



**特点：**

1. 数据卷可在容器之间共享或重用数据

2. 卷中的更改可以直接生效

3. 数据卷中的更改不会包含在镜像的更新中

4. 数据卷的生命周期一直持续到没有容器使用它为止

**所以：总结一句话： 就是容器的持久化，以及容器间的继承和数据共享！**



### 使用数据卷

>方式一：容器中直接使用命令来挂载 -v

挂载

```shell
#命令 
docker run -it -v 宿主机绝对路径目录:容器内目录 镜像名 

#测试 
 docker run -it -v /home/ceshi:/home centos /bin/bash
```



查看数据卷是否挂载成功 **`docker inspect 容器id`**

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704181850032.png)



测试文件的同步

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704182225381.png)



再来测试

1. 停止容器

2. 宿主机修改文件

3. 启动容器

4. 容器内的数据依旧是同步的

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704182950246.png)



好处：**以后修改只需要在本地修改即可，容器内会自动同步！**



### 实战：安装mysql

参考 > [Docker 安装部署应用 - 部署 MySQL](#install_mysql)



### 具名和匿名挂载

```shell
#匿名挂载
-v 容器内路径!
$ docker run -d -P --name nginx01 -v /etc/nginx nginx

#查看所有的volume(卷)的情况
$ docker volume ls    
DRIVER              VOLUME NAME #容器内的卷名(匿名卷挂载)
local               21159a8518abd468728cdbe8594a75b204a10c26be6c36090cde1ee88965f0d0
local               b17f52d38f528893dd5720899f555caf22b31bf50b0680e7c6d5431dbda2802c
         
#这里发现，这种就是匿名挂载，在 -v只写了容器内的路径，没有写容器外的路径！

#具名挂载 -P:表示随机映射端口
$ docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
9663cfcb1e5a9a1548867481bfddab9fd7824a6dc4c778bf438a040fe891f0ee

#查看所有的volume(卷)的情况
$ docker volume ls                  
DRIVER              VOLUME NAME
local               21159a8518abd468728cdbe8594a75b204a10c26be6c36090cde1ee88965f0d0
local               b17f52d38f528893dd5720899f555caf22b31bf50b0680e7c6d5431dbda2802c
local               juming-nginx #多了一个名字


#通过 -v 卷名：查看容器内路径
#查看一下这个卷
$ docker volume inspect juming-nginx
[
    {
        "CreatedAt": "2020-05-23T13:55:34+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/juming-nginx/_data", #默认目录
        "Name": "juming-nginx",
        "Options": null,
        "Scope": "local"
    }
]
```



所有的docker容器内的卷，没有指定目录的情况下都是在**/var/lib/docker/volumes/自定义的卷名/_data**下，
**如果指定了目录，docker volume ls 是查看不到的**。



**区分三种挂载方式**

```shell
#三种挂载： 匿名挂载、具名挂载、指定路径挂载
-v 容器内路径			#匿名挂载
-v 卷名：容器内路径		  #具名挂载
-v /宿主机路径：容器内路径 #指定路径挂载 docker volume ls 是查看不到的
```



拓展：

```shell
#通过 -v 容器内路径： ro rw 改变读写权限
ro #readonly 只读
rw #readwrite 可读可写
$ docker run -d -P --name nginx05 -v juming:/etc/nginx:ro nginx
$ docker run -d -P --name nginx05 -v juming:/etc/nginx:rw nginx

#ro 只要看到ro就说明这个路径只能通过宿主机来操作，容器内部是无法操作！
```



### 初识 DockerFile

**Dockerfile 就是用来构建docker镜像的构建文件**！命令脚本！先体验一下！

通过这个**脚本可以生成镜像**，镜像是一层一层的，脚本是一个个的命令，每个命令都是一层！

```shell
#创建一个dockerfile文件，名字可以随便 建议Dockerfile
#文件中的内容： 指令(大写) + 参数
$ vim dockerfile1
    FROM centos 					#当前这个镜像是以centos为基础的

    VOLUME ["volume01","volume02"] 	#挂载卷的卷目录列表(多个目录)

    CMD echo "-----end-----"		#输出一下用于测试
    CMD /bin/bash					#默认走bash控制台

#这里的每个命令，就是镜像的一层！
#构建出这个镜像 
-f dockerfile1 			#f代表file，指这个当前文件的地址(这里是当前目录下的dockerfile1)
-t caoshipeng/centos 	#t就代表target，指目标目录(注意caoshipeng镜像名前不能加斜杠‘/’)
. 						#表示生成在当前目录下
$ docker build -f dockerfile1 -t caoshipeng/centos .
Sending build context to Docker daemon   2.56kB
Step 1/4 : FROM centos
latest: Pulling from library/centos
8a29a15cefae: Already exists 
Digest: sha256:fe8d824220415eed5477b63addf40fb06c3b049404242b31982106ac204f6700
Status: Downloaded newer image for centos:latest
 ---> 470671670cac
Step 2/4 : VOLUME ["volume01","volume02"] 			#卷名列表
 ---> Running in c18eefc2c233
Removing intermediate container c18eefc2c233
 ---> 623ae1d40fb8
Step 3/4 : CMD echo "-----end-----"					#输出 脚本命令
 ---> Running in 70e403669f3c
Removing intermediate container 70e403669f3c
 ---> 0eba1989c4e6
Step 4/4 : CMD /bin/bash
 ---> Running in 4342feb3a05b
Removing intermediate container 4342feb3a05b
 ---> f4a6b0d4d948
Successfully built f4a6b0d4d948
Successfully tagged caoshipeng/centos:latest

#查看自己构建的镜像
$ docker images
REPOSITORY          TAG          IMAGE ID            CREATED              SIZE
caoshipeng/centos   latest       f4a6b0d4d948        About a minute ago   237MB
```



> 启动自己写的容器镜像

```shell
$ docker run -it f4a6b0d4d948 /bin/bash	#运行自己写的镜像
$ ls -l 								#查看目录
```

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704220615428.png)



这个卷和外部一定有一个同步的目录！

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704220711639.png)



查看一下卷挂载的路径

```shell
#docker inspect 容器id
$ docker inspect ca3b45913df5
```



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704221227521.png)



测试一刚才的文件是否同步出去了。

这种方式未来使用的十分多，因为通常会构建自己的镜像！

假设构建镜像的时候没有挂载卷，要手动挂载卷 -v 卷名:容器内的路径！



### 数据卷容器

**多个MySQL同步数据**！

命名的容器挂载数据卷！

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200704221931787.png)



```shell
#测试 启动3个容器，通过刚才自己写的镜像启动
#创建docker01：因为我本机是最新版，故这里用latest，狂神老师用的是1.0如下图
$ docker run -it --name docker01 caoshipeng/centos:latest

#查看容器docekr01内容
$ ls
bin  home   lost+found	opt   run   sys  var
dev  lib    media	proc  sbin  tmp  volume01
etc  lib64  mnt		root  srv   usr  volume02

#不关闭该容器退出
CTRL + Q + P  

#创建docker02: 并且让docker02 继承 docker01
$ docker run -it --name docker02 --volumes-from docker01 caoshipeng/centos:latest

#查看容器docker02内容
$ ls
bin  home   lost+found	opt   run   sys  var
dev  lib    media	proc  sbin  tmp  volume01
etc  lib64  mnt		root  srv   usr  volume02
```



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-volume.png)



![在这里插入图片描述](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/20200524154539606.png)



```shell
#再新建一个docker03同样继承docker01
$ docker run -it --name docker03 --volumes-from docker01 caoshipeng/centos:latest
$ cd volume01	#进入volume01 查看是否也同步docker01的数据
$ ls 
docker01.txt

#测试：可以删除docker01，查看一下docker02和docker03是否可以访问这个文件
#测试发现：数据依旧保留在docker02和docker03中没有被删除
```

![image-20200705105609708](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200705105609708.png)



>多个mysql实现数据共享

```shell
$ docker run -d -p 3306:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7

$ docker run -d -p 3310:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql02 --volumes-from mysql01  mysql:5.7

#这个时候，可以实现两个容器数据同步！
```



结论：

**容器之间的配置信息的传递，数据卷容器的生命周期一直持续到没有容器使用为止**。

**但是一旦你持久化到了本地，这个时候，本地的数据是不会删除的**！





## DockerFile

> 实际项目开发基本上是参照已有的项目案例配置，死记硬背只是应付面试，久了不用，还是会忘得一干二净！

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200710191931055.png)



### DockerFile 介绍

`dockerfile`是用来构建docker镜像的文件，命令参数脚本。



构建步骤：

1. 编写一个dockerfile文件

2. docker build 构建称为一个镜像

3. docker run运行镜像

4. docker push发布镜像（DockerHub 、阿里云仓库)



> 查看 Centos 7 的 DockerFile 文件

官方镜像地址：https://hub.docker.com/_/centos

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200705113444073.png)



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200705113921348.png)



很多官方镜像都是基础包，很多功能没有，通常会自己搭建自己的镜像！



### DockerFile 构建过程

**基础知识**：

1. 每个保留关键字（指令）都是必须是大写字母

2. 执行从上到下顺序

3. #表示注释

4. 每一个指令都会创建提交一个新的镜像曾，并提交



![image-20200705114834702](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200705114834702.png)



**流程：**

1. Docker 从基础镜像运行一个容器

2. 执行一条指令并对容器做出修改

3. 执行类似 docker commit 的操作提交一个新的镜像层

4. Docker 再基于刚提交的镜像运行一个新容器

5. 执行 Dockerfifile 中的下一条指令直到所有指令都执行完成

**说明：**

从应用软件的角度来看，DockerFile，docker 镜像与 docker 容器分别代表软件的三个不同阶段。

- DockerFile 是软件的原材料，构建文件，定义了一切的步骤，源代码 （代码）
- Docker 镜像则是软件的交付品 ，通过DockerFile构建生成的镜像，最终发布和运行的产品（.apk）
- Docker 容器则是软件的运行状态 （客户下载安装执行）

DockerFile 是面向开发的，以后要发布项目，做镜像，就需要编写 dockerfile 文件，这个文件十分简单！

Docker 镜像成为交付标准，Docker 容器则涉及部署与运维，三者缺一不可！



### DockerFile 指令

```shell
FROM        #基础镜像，当前新镜像是基于哪个镜像的 
MAINTAINER #镜像维护者的姓名混合邮箱地址 
RUN        #容器构建时需要运行的命令 
EXPOSE        #当前容器对外保留出的端口 
WORKDIR    #指定在创建容器后，终端默认登录的进来工作目录，一个落脚点 
ENV        #用来在构建镜像过程中设置环境变量 
ADD        #将宿主机目录下的文件拷贝进镜像且ADD命令会自动处理URL和解压tar压缩包 
COPY       #类似ADD，拷贝文件和目录到镜像中！ 
VOLUME     #容器数据卷，用于数据保存和持久化工作 
CMD        #指定一个容器启动时要运行的命令，dockerFile中可以有多个CMD指令，但只有最后一个生效！ ，会被替代！
ENTRYPOINT #指定一个容器启动时要运行的命令！和CMD一样 ，但是可以追加命令
ONBUILD    #当构建一个被继承的DockerFile时运行命令，父镜像在被子镜像继承后，父镜像的 ONBUILD被触发
```



**简单记忆：开头-中间-结尾**

开头 FROM 指定镜像

EXPOSE 暴露端口

中间配置参数变量和工作目录

最后执行启动命令



### 实战测试

Docker Hub种99%镜像都是从基础镜像过来的FROM scratch，然后配置需要的软件和配置来进行的构建。

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200705170314507.png)



scratch 镜像

```shell
FROM scratch
ADD centos-7-x86_64-docker.tar.xz /

LABEL \
    org.label-schema.schema-version="1.0" \
    org.label-schema.name="CentOS Base Image" \
    org.label-schema.vendor="CentOS" \
    org.label-schema.license="GPLv2" \
    org.label-schema.build-date="20200504" \
    org.opencontainers.image.title="CentOS Base Image" \
    org.opencontainers.image.vendor="CentOS" \
    org.opencontainers.image.licenses="GPL-2.0-only" \
    org.opencontainers.image.created="2020-05-04 00:00:00+01:00"

CMD ["/bin/bash"]
```





>创建一个自己的centos

```shell
#1./home下新建dockerfile目录
$ mkdir dockerfile

#2. dockerfile目录下新建mydockerfile-centos文件
$ vim mydockerfile-centos

#3.编写Dockerfile配置文件
FROM centos							#基础镜像是官方原生的centos
MAINTAINER cao<1165680007@qq.com> 	#作者

ENV MYPATH /usr/local				#配置环境变量的目录 
WORKDIR $MYPATH						#将工作目录设置为 MYPATH

RUN yum -y install vim				#给官方原生的centos 增加 vim指令
RUN yum -y install net-tools		#给官方原生的centos 增加 ifconfig命令

EXPOSE 80							#暴露端口号为80

CMD echo $MYPATH					#输出下 MYPATH 路径
CMD echo "-----end----"				
CMD /bin/bash						#启动后进入 /bin/bash

#4.通过这个文件构建镜像
#命令： docker build -f 文件路径 -t 镜像名:[tag] .
$ docker build -f mydockerfile-centos -t mycentos:0.1 .
```



对比：之前的原生centos

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200705193805715.png)



增加命令之后的镜像

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200705203058920.png)



列出本地镜像的变更历史

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200705204533675.png)



拿到一个镜像，可以研究一下他是怎末做的！

>CMD 和 ENTRYPOINT 的区别

两个命令都是指定一个容器启动时要运行的命令。

```shell
CMD					#指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代。
ENTRYPOINT			#指定这个容器启动的时候要运行的命令，可以追加命令
```



**测试 cmd**

```shell
#编写dockerfile文件
$ vim dockerfile-test-cmd
FROM centos
CMD ["ls","-a"]					#启动后执行 ls -a 命令

#构建镜像
$ docker build  -f dockerfile-test-cmd -t cmd-test:0.1 .

#运行镜像
$ docker run cmd-test:0.1		#由结果可得，运行后就执行了 ls -a 命令
.
..
.dockerenv
bin
dev
etc
home

#想追加一个命令 -l 成为ls -al：展示列表详细数据
$ docker run cmd-test:0.1 -l
docker: Error response from daemon: OCI runtime create failed: container_linux.go:349: starting container process caused "exec: \"-l\":
executable file not found in $PATH": unknown.
ERRO[0000] error waiting for container: context canceled 

#cmd的情况下 -l 替换了CMD["ls","-l"] 而 -l 不是命令所以报错
```



**测试 ENTRYPOINT**

```shell
#编写dockerfile文件
$ vim dockerfile-test-entrypoint
FROM centos
ENTRYPOINT ["ls","-a"]

#构建镜像
$ docker build  -f dockerfile-test-entrypoint -t cmd-test:0.1 .

#运行镜像
$ docker run entrypoint-test:0.1
.
..
.dockerenv
bin
dev
etc
home
lib
lib64
lost+found ...

#的命令，是直接拼接在得ENTRYPOINT命令后面的
$ docker run entrypoint-test:0.1 -l
total 56
drwxr-xr-x   1 root root 4096 May 16 06:32 .
drwxr-xr-x   1 root root 4096 May 16 06:32 ..
-rwxr-xr-x   1 root root    0 May 16 06:32 .dockerenv
lrwxrwxrwx   1 root root    7 May 11  2019 bin -> usr/bin
drwxr-xr-x   5 root root  340 May 16 06:32 dev
drwxr-xr-x   1 root root 4096 May 16 06:32 etc
drwxr-xr-x   2 root root 4096 May 11  2019 home
lrwxrwxrwx   1 root root    7 May 11  2019 lib -> usr/lib
lrwxrwxrwx   1 root root    9 May 11  2019 lib64 -> usr/lib64 ....
```



Dockerfile 中很多命令都十分的相似，需要了解它们的区别，对比它们然后测试效果！



### 实战：Tomcat DockerFile

1. 准备镜像文件

准备 tomcat 和 jdk 到当前目录，编写好 README。



2. 编写 dokerfile

```shell
$ vim dockerfile
FROM centos 										#基础镜像centos
MAINTAINER cao<1165680007@qq.com>					#作者
COPY README /usr/local/README 						#复制README文件
ADD jdk-8u231-linux-x64.tar.gz /usr/local/ 			#添加jdk，ADD 命令会自动解压
ADD apache-tomcat-9.0.35.tar.gz /usr/local/ 		#添加tomcat，ADD 命令会自动解压
RUN yum -y install vim								#安装 vim 命令
ENV MYPATH /usr/local 								#环境变量设置 工作目录
WORKDIR $MYPATH

ENV JAVA_HOME /usr/local/jdk1.8.0_231 				#环境变量： JAVA_HOME环境变量
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.35 	#环境变量： tomcat环境变量
ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.35

#设置环境变量 分隔符是：
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin 	

EXPOSE 8080 										#设置暴露的端口

CMD /usr/local/apache-tomcat-9.0.35/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.35/logs/catalina.out 					#设置默认命令
```



3. 构建镜像

```shell
#因为dockerfile命名使用默认命名 因此不用使用-f 指定文件
$ docker build -t mytomcat:0.1 .
```



4. run 运行镜像

```shell
#-d:后台运行 -p:暴露端口 --name:别名 -v:绑定路径 
$ docker run -d -p 8080:8080 --name tomcat01 
-v /home/kuangshen/build/tomcat/test:/usr/local/apache-tomcat-9.0.35/webapps/test 
-v /home/kuangshen/build/tomcat/tomcatlogs/:/usr/local/apache-tomcat-9.0.35/logs mytomcat:0.1
```



5. 测试访问

```shell
$ docker exec -it 自定义容器的id /bin/bash

$ cul localhost:8080
```



6. 发布项目

（由于做了卷挂载，直接在本地编写项目就可以发布了！）

发现：项目部署成功，可以直接访问！

以后开发的步骤：需要掌握Dockerfile的编写！之后的一切都是使用docker镜像来发布运行！



### 发布自己镜像

>发布到 Docker Hub

1. 地址 https://hub.docker.com/

2. 确定这个账号可以登录

3. 登录

```shell
$ docker login --help
Usage:  docker login [OPTIONS] [SERVER]

Log in to a Docker registry.
If no server is specified, the default is defined by the daemon.

Options:
  -p, --password string   Password
      --password-stdin    Take the password from stdin
  -u, --username string   Username

$ docker login -u 你的用户名 -p 你的密码
```

4. 提交 push镜像

```shell
#将镜像发布出去,发现失败   docker push 仓库名/镜像名:镜像版本
[root@localhost ~]# docker push jiayoushrimp/diytomcat
The push refers to repository [docker.io/jiayoushrimp/diytomcat]
An image does not exist locally with the tag: jiayoushrimp/diytomcat

#本地镜像名无帐号信息，解决加 tag即可 
[root@localhost ~]# docker tag diytomcat jiayoushrimp/diytomcat:0.1

#然后再次push  （过程比较慢，需要慢慢等待）
[root@localhost ~]# docker push jiayoushrimp/diytomcat:0.1
The push refers to repository [docker.io/jiayoushrimp/diytomcat]
f701d34e9936: Pushed 
fcb2e2c95cfe: Pushed 
116dcd02ee40: Pushed 
189924725d39: Pushed 
eb29745b8228: Mounted from library/centos 
0.1: digest: sha256:7f1d040b43fd9df68b7146fee77b334be895bdf721b2d936d4ff931133b1a88b size: 1373
#过程截取
```



5. 到自己的仓库查看

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200711192715523.png)



>发布到 阿里云镜像服务上

参考官网，很详细：https://cr.console.aliyun.com/repository/





## Docker 网络

### 理解Docker 0

学习之前**清空下前面的 docker 镜像、容器**。

```shell
#删除全部容器
$ docker rm -f $(docker ps -aq)

#删除全部镜像
$ docker rmi -f $(docker images -aq)
```



> 测试



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200710200411741.png)



三个网络分别代表了三种不同的环境。

问题：docker是如何处理容器给网络访问的？

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200710200840340.png)



```shell
#测试 运行一个tomcat
$ docker run -d -P --name tomcat01 tomcat

#查看容器内部网络地址
$ docker exec -it 容器id ip addr

#发现容器启动的时候会得到一个 eth0@if91 ip地址，docker分配！
$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
261: eth0@if91: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:12:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.18.0.2/16 brd 172.18.255.255 scope global eth0
       valid_lft forever preferred_lft forever

       
#思考？ linux能不能ping通容器内部！ 可以 容器内部可以ping通外界吗？ 可以！
$ ping 172.18.0.2
PING 172.18.0.2 (172.18.0.2) 56(84) bytes of data.
64 bytes from 172.18.0.2: icmp_seq=1 ttl=64 time=0.069 ms
64 bytes from 172.18.0.2: icmp_seq=2 ttl=64 time=0.074 ms
```



> 原理

每启动一个docker容器，docker就会给docker容器分配一个ip，只要安装了docker，就会有一个网卡docker0

这是个桥接网卡，使用了veth-pair技术！

veth-pair 参考：https://www.cnblogs.com/bakari/p/10613710.html



再次测试 ip addr

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-network-pair-1.png)



再启动一个容器测试，发现又多了一对网络

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-network-pair-2.png)



进入容器查看

```shell
[root@localhost ~]# docker exec -it tomcat02 ip addr
1: lo:  mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
162: eth0@if163:  mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

#启动了一个tomcat01，主机的ip地址多了一个 161: veth0356eee@if160
#然后在tomcat01容器中查看容器的ip是 160: eth0@if161

#再启动一个tomcat02观察 
#然后发现linux主机上又多了一个网卡 163: vethe8ebf2a@if162 
#看下tomcat02的容器内ip地址是 162: eth0@if163

#观察现象： 
#tomcat01 --- linux主机 veth0356eee@if160 ---- 容器内 eth0@if161 
#tomcat02 --- linux主机 vethe8ebf2a@if162 ---- 容器内 eth0@if163 
#相信到了这里，大家都能看出来只要启动一个容器，就有一对网卡

#发现这个容器带来的网卡，都是一对一对的
#evth-pair 就是一对的虚拟设备接口，他们都是成对出现的，一段连着协议，一段彼此相连
#正因为有这个特性，evth-pair 充当一个桥梁，连接各种虚拟网络设备的
#OpenStac，Docker容器之间的连接，OVS的连接，都是使用evth-pair技术
```



测试下tomcat01和tomcat02是否可以ping通

```shell
#获取tomcat01的ip 172.17.0.2
$ docker-tomcat docker exec -it tomcat01 ip addr  
550: eth0@if551: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
       
#让tomcat02 ping tomcat01 
$ docker-tomcat docker exec -it tomcat02 ping 172.17.0.2
PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.
64 bytes from 172.17.0.2: icmp_seq=1 ttl=64 time=0.098 ms
64 bytes from 172.17.0.2: icmp_seq=2 ttl=64 time=0.071 ms

#结论：容器和容器之间是可以互相ping通
```



网络模型

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-net-model.png)



结论：tomcat01和tomcat02公用一个路由器，docker0。

所有的容器不指定网络的情况下，都是docker0路由的，docker会给的容器分配一个默认的可用ip。



> 小结

Docker使用Linux桥接，在宿主机虚拟一个Docker容器网桥(docker0)，Docker启动一个容器时会根据Docker网桥的网段分配给容器一个IP地址，称为Container-IP，同时Docker网桥是每个容器的默认网关。因为在同一宿主机内的容器都接入同一个网桥，这样容器之间就能够通过容器的Container-IP直接通信。



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200711215648899.png)



Docker中所有的网络接口都是虚拟的，虚拟的转发效率高，（比如内网传递文件！）

只要删除容器，对应的一对网桥就没了。

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200711222505329.png)



### --link

思考一个场景，**编写一个微服务，数据库连接地址原来是使用ip的，如果ip变化就不行了，那能不能使用服务名访问呢？**

jdbc:mysql://mysql:3306，这样的话哪怕mysql重启，也不需要修改配置了！docker提供了 –link的操作！



```shell
#可以直接ping两个容器的名称，发现是无法实现的  那如何解决呢
[root@localhost ~]# docker exec tomcat02 ping tomcat01
ping: tomcat01: Name or service not known

#发现通过--link就可以解决了网络连通问题
[root@localhost ~]# docker run -d -p 8083:8080 --name tomcat03 --link tomcat02 tomcat
9657009be6153f1e0325b65becda3c103e71b61d925b8aedb5b0ca426e016971
[root@localhost ~]# docker exec -it tomcat03 ping tomcat02
PING tomcat02 (172.17.0.3) 56(84) bytes of data.
64 bytes from tomcat02 (172.17.0.3): icmp_seq=1 ttl=64 time=0.235 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=2 ttl=64 time=0.050 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=3 ttl=64 time=0.050 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=4 ttl=64 time=0.060 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=5 ttl=64 time=0.055 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=6 ttl=64 time=0.067 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=7 ttl=64 time=0.062 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=8 ttl=64 time=0.062 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=9 ttl=64 time=0.062 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=10 ttl=64 time=0.136 ms
64 bytes from tomcat02 (172.17.0.3): icmp_seq=11 ttl=64 time=0.057 ms

#反向可以ping通吗？
[root@localhost ~]# docker exec -it tomcat02 ping tomcat03
ping: tomcat03: Name or service not known
```



**探究：**

docker network inspect 网络id 网段相同

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-tomcat-net-01.png)



docker inspect tomcat03

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-net-tomcat-03.png)



查看tomcat03里面的/etc/hosts发现有tomcat02的配置

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-net-tomcat-02.png)



--link 本质就是在 hosts 配置中添加映射。

==现在使用 Docker 已经不建议使用 --link 了！==

自定义网络，不适用docker0！

docker0问题：不支持容器名连接访问！



### 自定义网络

>查看所有的docker网络

```shell
[root@localhost ~]# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
a11c41ae040c        bridge              bridge              local
161757eb41a6        host                host                local
df9ca309ffb9        none                null                local
```



网络模式

| **网络模式**  | **配置**                | **说明**                                                     |
| :------------ | :---------------------- | :----------------------------------------------------------- |
| bridge模式    | –net=bridge             | 默认值，在Docker网桥docker0上为容器创建新的网络栈            |
| none模式      | –net=none               | 不配置网络，用户可以稍后进入容器，自行配置                   |
| container模式 | --net=container:name/id | 容器和另外一个容器共享Network namespace。kubernetes中的pod就是多个容器共享一个Networknamespace。 |
| host模式      | –net=host               | 容器和宿主机共享Network namespace                            |
| 用户自定义    | –net=自定义网络         | 用户自己使用network相关命令定义网络，创建容器的时候可以指定为自己定义的网络 |

bridge：桥接模式 docker上面搭桥 （默认）

none：不配置网络

host：和宿主机共享网络

container：容器网络连通！（用的少！局限很大）



测试

```shell
#默认不配置网络，也就相当于默认值 --net bridge 使用的docker0
[root@localhost ~]# docker run -d -p 8081:8080 -net bridge tomcat

#docker0网络的特点 1.它是默认的 2.域名访问不通 3.--link 域名通了，但是删了又不行

#可以自定义一个网络
#--driver bridge 桥接
#--subnet 192.168.0.0/16  子网地址   192.168.0.0-192.168.255.255
#-gateway 192.168.0.1     网关（可以当作路由器地址）
[root@localhost ~]# docker network create --driver bridge  --subnet 192.168.0.0/16  --gateway 192.168.0.1 mynet
961bf773a1ab169ba91297b963fc33fd7d46451931946e6d8f08de87ae3e2ff9
[root@localhost ~]# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
a11c41ae040c        bridge              bridge              local
161757eb41a6        host                host                local
961bf773a1ab        mynet               bridge              local
df9ca309ffb9        none                null                local

#查看配置  这时候自己的网络就创建好了
[root@localhost ~]# docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "961bf773a1ab169ba91297b963fc33fd7d46451931946e6d8f08de87ae3e2ff9",
        "Created": "2020-07-11T22:48:47.063913725+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.168.0.0/16",
                    "Gateway": "192.168.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]

#创建容器
[root@localhost ~]# docker run -d -p 8081:8080 --name tomcat01-net-01 --net mynet tomcat
5305d5fcb68e4e83a37bb219254f17546e826b81d839fcbf74a4ca28ccf78234.
[root@localhost ~]# docker run -d -p 8082:8080 --name tomcat01-net-02 --net mynet tomcat
1e0f7406c764a32ba9d134bbeafdf7568f9b6517267c8e50bb9fd8c14d0d34b1
[root@localhost ~]# docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "961bf773a1ab169ba91297b963fc33fd7d46451931946e6d8f08de87ae3e2ff9",
        "Created": "2020-07-11T22:48:47.063913725+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.168.0.0/16",
                    "Gateway": "192.168.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "1e0f7406c764a32ba9d134bbeafdf7568f9b6517267c8e50bb9fd8c14d0d34b1": {
                "Name": "tomcat01-net-02",
                "EndpointID": "5b2a472a9a89862d832aab0149100b471b69096fcd6a2523fe8afb39f74e58fa",
                "MacAddress": "02:42:c0:a8:00:03",
                "IPv4Address": "192.168.0.3/16",
                "IPv6Address": ""
            },
            "5305d5fcb68e4e83a37bb219254f17546e826b81d839fcbf74a4ca28ccf78234": {
                "Name": "tomcat01-net-01",
                "EndpointID": "67c5ef6f722af6b637c3e0ae3284abfc0cbc553514482c24e374f9ce67ae1a53",
                "MacAddress": "02:42:c0:a8:00:02",
                "IPv4Address": "192.168.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]

#再次测试ping连接
[root@localhost ~]# docker exec -it tomcat01-net-01 ping 192.168.0.3
PING 192.168.0.3 (192.168.0.3) 56(84) bytes of data.
64 bytes from 192.168.0.3: icmp_seq=1 ttl=64 time=0.184 ms
64 bytes from 192.168.0.3: icmp_seq=2 ttl=64 time=0.140 ms
^C
--- 192.168.0.3 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1ms
rtt min/avg/max/mdev = 0.140/0.162/0.184/0.022 ms

#不使用 --link  也可以ping名字了
[root@localhost ~]# docker exec -it tomcat01-net-01 ping tomcat01-net-02
PING tomcat01-net-02 (192.168.0.3) 56(84) bytes of data.
64 bytes from tomcat01-net-02.mynet (192.168.0.3): icmp_seq=1 ttl=64 time=0.073 ms
64 bytes from tomcat01-net-02.mynet (192.168.0.3): icmp_seq=2 ttl=64 time=0.101 ms
^C
--- tomcat01-net-02 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 2ms
rtt min/avg/max/mdev = 0.073/0.087/0.101/0.014 ms
```



结论：自定义的网络docker都已经维护好了对应的关系，推荐平时这样使用网络。

好处：

redis：不同的集群使用不同的网络，保证集群是安全和健康的。

mysql：不同的集群使用不同的网络，保证集群是安全和健康的。



### 网络连通

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200712111753824.png)



docker0和自定义网络肯定不通，使用自定义网络的好处就是网络隔离：

大家公司项目部署的业务都非常多，假设有一个商城，会有订单业务（操作不同数据），会有订单业务购物车业务（操作不同缓存）。如果在一个网络下，有的程序猿的恶意代码就不能防止了，所以就在部署的时候网络隔离，创建两个桥接网卡，比如订单业务（里面的数据库，redis，mq，全部业务 都在order-net网络下）其他业务在其他网络。

那关键的问题来了，**如何让自定义网络下的 tomcat01-net-01 访问 docker0 下的 tomcat01 ？**



```shell
#创建两个docker0网络的tomcat容器
[root@localhost ~]# docker run -d -p 8083:8080 --name tomcat01 tomcat
[root@localhost ~]# docker run -d -p 8084:8080 --name tomcat02 tomcat

#测试tomcat01能否ping通tomcat01-net-01   都不在一个网段肯定是ping不通的
[root@localhost ~]# docker exec -it tomcat01 ping tomcat01-net-01
ping: tomcat01-net-01: Name or service not known

#查看network命令 发现connect容器连接网络命令
[root@localhost ~]# docker network --help

Usage:    docker network COMMAND

Manage networks

Commands:
  connect     Connect a container to a network    #连接一个容器到网络
  create      Create a network
  disconnect  Disconnect a container from a network
  inspect     Display detailed information on one or more networks
  ls          List networks
  prune       Remove all unused networks
  rm          Remove one or more networks

Run 'docker network COMMAND --help' for more information on a command.

#查看connect命令
[root@localhost ~]# docker network connect --help

Usage:    docker network connect [OPTIONS] NETWORK CONTAINER

Connect a container to a network

Options:
      --alias strings           Add network-scoped alias for the container
      --driver-opt strings      driver options for the network
      --ip string               IPv4 address (e.g., 172.30.100.104)
      --ip6 string              IPv6 address (e.g., 2001:db8::33)
      --link list               Add link to another container
      --link-local-ip strings   Add a link-local address for the container

#将tomcat01连接到mynet
[root@localhost ~]# docker network connect mynet tomcat01

#查看mynet信息
[root@localhost ~]# docker network inspect mynet
[
    {
        "Name": "mynet",
        "Id": "961bf773a1ab169ba91297b963fc33fd7d46451931946e6d8f08de87ae3e2ff9",
        "Created": "2020-07-11T22:48:47.063913725+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "192.168.0.0/16",
                    "Gateway": "192.168.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "1e0f7406c764a32ba9d134bbeafdf7568f9b6517267c8e50bb9fd8c14d0d34b1": {
                "Name": "tomcat01-net-02",
                "EndpointID": "cc27fee98b0b813b51906a7769602b460734af9451efa50059ec740811f5af28",
                "MacAddress": "02:42:c0:a8:00:02",
                "IPv4Address": "192.168.0.2/16",
                "IPv6Address": ""
            },
            "5305d5fcb68e4e83a37bb219254f17546e826b81d839fcbf74a4ca28ccf78234": {
                "Name": "tomcat01-net-01",
                "EndpointID": "fc6cebde5ac078f0c9130d988c7417fb9fb7099550ec32bfcf332b1051a726fe",
                "MacAddress": "02:42:c0:a8:00:03",
                "IPv4Address": "192.168.0.3/16",
                "IPv6Address": ""
            },
            "cb486d4485ddaa2f1ca062a55bbe7fbef451886c148b36dee06322e1673e13e1": {
                "Name": "tomcat01",
                "EndpointID": "a8104a3c4aafaaa6823f4775b0828658b4b0da0a2b8cdfb75bc831321b308ba6",
                "MacAddress": "02:42:c0:a8:00:04",
                "IPv4Address": "192.168.0.4/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {}
    }
]

#再次ping测试  发现没有问题tomcat01已经可以看到mynet网段下的所有容器
[root@localhost ~]# docker exec -it tomcat01 ping tomcat01-net-01
PING tomcat01-net-01 (192.168.0.3) 56(84) bytes of data.
64 bytes from tomcat01-net-01.mynet (192.168.0.3): icmp_seq=1 ttl=64 time=0.116 ms
64 bytes from tomcat01-net-01.mynet (192.168.0.3): icmp_seq=2 ttl=64 time=0.127 ms
64 bytes from tomcat01-net-01.mynet (192.168.0.3): icmp_seq=3 ttl=64 time=0.081 ms

[root@localhost ~]# docker exec -it tomcat01 ping tomcat01-net-02
PING tomcat01-net-02 (192.168.0.2) 56(84) bytes of data.
64 bytes from tomcat01-net-02.mynet (192.168.0.2): icmp_seq=1 ttl=64 time=0.260 ms
64 bytes from tomcat01-net-02.mynet (192.168.0.2): icmp_seq=2 ttl=64 time=0.078 ms
```



### redis 集群部署实战

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20200712112907471.png)



```shell
#创建网卡
[root@localhost ~]# docker network create redis --subnet 172.38.0.0/16

#通过脚本创建六个redis配置
for port in $(seq 1 6); \
do \
mkdir -p /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat << EOF >/mydata/redis/node-${port}/conf/redis.conf
port 6379
bind 0.0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.38.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF
done

#启动六个容器
docker run -p 6371:6379 -p 16371:16379 --name redis-1 \
-v /mydata/redis/node-1/data:/data \
-v /mydata/redis/node-1/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.11 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf

docker run -p 6372:6379 -p 16372:16379 --name redis-2 \
-v /mydata/redis/node-2/data:/data \
-v /mydata/redis/node-2/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.12 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf

docker run -p 6373:6379 -p 16373:16379 --name redis-3 \
-v /mydata/redis/node-3/data:/data \
-v /mydata/redis/node-3/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.13 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf

docker run -p 6374:6379 -p 16374:16379 --name redis-4 \
-v /mydata/redis/node-4/data:/data \
-v /mydata/redis/node-4/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.14 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf

docker run -p 6375:6379 -p 16375:16379 --name redis-5 \
-v /mydata/redis/node-5/data:/data \
-v /mydata/redis/node-5/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.15 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf

docker run -p 6376:6379 -p 16376:16379 --name redis-6 \
-v /mydata/redis/node-6/data:/data \
-v /mydata/redis/node-6/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172.38.0.16 redis:5.0.9-alpine3.11 redis-server /etc/redis/redis.conf

#查看容器启动情况
[root@localhost home]# docker ps
CONTAINER ID        IMAGE                    COMMAND                  CREATED              STATUS              PORTS                                              NAMES
bcd29566d189        redis:5.0.9-alpine3.11   "docker-entrypoint.s…"   3 seconds ago        Up 3 seconds        0.0.0.0:6376->6379/tcp, 0.0.0.0:16376->16379/tcp   redis-6
ee4f7388bdb6        redis:5.0.9-alpine3.11   "docker-entrypoint.s…"   10 seconds ago       Up 9 seconds        0.0.0.0:6375->6379/tcp, 0.0.0.0:16375->16379/tcp   redis-5
18853b8fa471        redis:5.0.9-alpine3.11   "docker-entrypoint.s…"   15 seconds ago       Up 15 seconds       0.0.0.0:6374->6379/tcp, 0.0.0.0:16374->16379/tcp   redis-4
0c63ca2a1925        redis:5.0.9-alpine3.11   "docker-entrypoint.s…"   21 seconds ago       Up 20 seconds       0.0.0.0:6373->6379/tcp, 0.0.0.0:16373->16379/tcp   redis-3
e6cf65c1927c        redis:5.0.9-alpine3.11   "docker-entrypoint.s…"   26 seconds ago       Up 26 seconds       0.0.0.0:6372->6379/tcp, 0.0.0.0:16372->16379/tcp   redis-2
249ef6ef75e3        redis:5.0.9-alpine3.11   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:6371->6379/tcp, 0.0.0.0:16371->16379/tcp   redis-1

#进入到容器的内部
[root@localhost home]# docker exec -it redis-1 /bin/sh
/data # ls
appendonly.aof  nodes.conf


 redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 --cluster-replicas 1

#创建集群的命令
/data # redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 --cluster-replicas 1
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica 172.38.0.15:6379 to 172.38.0.11:6379
Adding replica 172.38.0.16:6379 to 172.38.0.12:6379
Adding replica 172.38.0.14:6379 to 172.38.0.13:6379
M: d9220a40b83f24f9e08a6aad7ea936a7d8a82913 172.38.0.11:6379
   slots:[0-5460] (5461 slots) master
M: a8f8dc3945edf0efa80661b83bc032d9342fc2ca 172.38.0.12:6379
   slots:[5461-10922] (5462 slots) master
M: a00ae86e8245afb5029fb9c51b5261044cef7caa 172.38.0.13:6379
   slots:[10923-16383] (5461 slots) master
S: 79482f12bb8bb23f42228e1da2c504700c736f5c 172.38.0.14:6379
   replicates a00ae86e8245afb5029fb9c51b5261044cef7caa
S: f5a62d24eb0c52cdde152495fb10eb2e52516e65 172.38.0.15:6379
   replicates d9220a40b83f24f9e08a6aad7ea936a7d8a82913
S: 60e1fc4a84573e210e3612a235d6a2e16671886a 172.38.0.16:6379
   replicates a8f8dc3945edf0efa80661b83bc032d9342fc2ca
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join
....
>>> Performing Cluster Check (using node 172.38.0.11:6379)
M: d9220a40b83f24f9e08a6aad7ea936a7d8a82913 172.38.0.11:6379
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
S: 79482f12bb8bb23f42228e1da2c504700c736f5c 172.38.0.14:6379
   slots: (0 slots) slave
   replicates a00ae86e8245afb5029fb9c51b5261044cef7caa
M: a00ae86e8245afb5029fb9c51b5261044cef7caa 172.38.0.13:6379
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
M: a8f8dc3945edf0efa80661b83bc032d9342fc2ca 172.38.0.12:6379
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: f5a62d24eb0c52cdde152495fb10eb2e52516e65 172.38.0.15:6379
   slots: (0 slots) slave
   replicates d9220a40b83f24f9e08a6aad7ea936a7d8a82913
S: 60e1fc4a84573e210e3612a235d6a2e16671886a 172.38.0.16:6379
   slots: (0 slots) slave
   replicates a8f8dc3945edf0efa80661b83bc032d9342fc2ca
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.


#查看集群配置
/data #clear
/data #redis-cli -c
127.0.0.1:6379> cluster info
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:1
cluster_stats_messages_ping_sent:131
cluster_stats_messages_pong_sent:126
cluster_stats_messages_sent:257
cluster_stats_messages_ping_received:121
cluster_stats_messages_pong_received:131
cluster_stats_messages_meet_received:5
cluster_stats_messages_received:257
127.0.0.1:6379> cluster nodes
79482f12bb8bb23f42228e1da2c504700c736f5c 172.38.0.14:6379@16379 slave a00ae86e8245afb5029fb9c51b5261044cef7caa 0 1594551513456 4 connected
a00ae86e8245afb5029fb9c51b5261044cef7caa 172.38.0.13:6379@16379 master - 0 1594551512000 3 connected 10923-16383
a8f8dc3945edf0efa80661b83bc032d9342fc2ca 172.38.0.12:6379@16379 master - 0 1594551512449 2 connected 5461-10922
f5a62d24eb0c52cdde152495fb10eb2e52516e65 172.38.0.15:6379@16379 slave d9220a40b83f24f9e08a6aad7ea936a7d8a82913 0 1594551512549 5 connected
d9220a40b83f24f9e08a6aad7ea936a7d8a82913 172.38.0.11:6379@16379 myself,master - 0 1594551512000 1 connected 0-5460
60e1fc4a84573e210e3612a235d6a2e16671886a 172.38.0.16:6379@16379 slave a8f8dc3945edf0efa80661b83bc032d9342fc2ca 0 1594551512953 6 connected

#set一个值  可以看到是redis-3这个服务处理的
127.0.0.1:6379> set a b
-> Redirected to slot [15495] located at 172.38.0.13:6379
OK

#让把redis-3服务停止
[root@localhost ~]# docker stop redis-3
redis-3

#再次get值查看，发现可以得到，高可用搭建成功
127.0.0.1:6379> get a
-> Redirected to slot [15495] located at 172.38.0.14:6379
"b"

#再次查看集群信息
172.38.0.14:6379> cluster nodes
60e1fc4a84573e210e3612a235d6a2e16671886a 172.38.0.16:6379@16379 slave a8f8dc3945edf0efa80661b83bc032d9342fc2ca 0 1594551670303 6 connected
a8f8dc3945edf0efa80661b83bc032d9342fc2ca 172.38.0.12:6379@16379 master - 0 1594551669295 2 connected 5461-10922
f5a62d24eb0c52cdde152495fb10eb2e52516e65 172.38.0.15:6379@16379 slave d9220a40b83f24f9e08a6aad7ea936a7d8a82913 0 1594551669598 5 connected
d9220a40b83f24f9e08a6aad7ea936a7d8a82913 172.38.0.11:6379@16379 master - 0 1594551669000 1 connected 0-5460
a00ae86e8245afb5029fb9c51b5261044cef7caa 172.38.0.13:6379@16379 master,fail - 1594551620429 1594551619000 3 connected
79482f12bb8bb23f42228e1da2c504700c736f5c 172.38.0.14:6379@16379 myself,master - 0 1594551669000 7 connected 10923-16383
```



**使用了docker之后，所有的技术都变得简单了起来。**



### SpringBoot 微服务打包 Docker 镜像

1. 构建springboot项目

随便构建一个springboot项目，然后在controller层测试。



2. 打包项目

将项目打成一个 jar 包再次测试有没有问题。



3. 编写 dockerfile

```shell
FROM java:8
COPY *.jar /app.jar
CMD ["--server.port=8080"]
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```



4. 构建镜像

把打好的 jar 包和写好的 dockerfile 放到服务器（虚拟机）上。

```shell
#查看
[root@localhost idea]# ll
总用量 16116
-rw-r--r--. 1 root root 16494922 7月  12 19:20 demo-0.0.1-SNAPSHOT.jar
-rw-r--r--. 1 root root      120 7月  12 19:20 Dockerfile

#构建
[root@localhost idea]# docker build -t shrimpdemo .
Sending build context to Docker daemon   16.5MB
Step 1/5 : FROM java:8
8: Pulling from library/java
5040bd298390: Pull complete 
fce5728aad85: Pull complete 
76610ec20bf5: Pull complete 
60170fec2151: Pull complete 
e98f73de8f0d: Pull complete 
11f7af24ed9c: Pull complete 
49e2d6393f32: Pull complete 
bb9cdec9c7f3: Pull complete 
Digest: sha256:c1ff613e8ba25833d2e1940da0940c3824f03f802c449f3d1815a66b7f8c0e9d
Status: Downloaded newer image for java:8
 ---> d23bdf5b1b1b
Step 2/5 : COPY *.jar /app.jar
 ---> f93193bf9288
Step 3/5 : CMD ["--server.port=8080"]
 ---> Running in 330c3eb669c2
Removing intermediate container 330c3eb669c2
 ---> de02777a2e40
Step 4/5 : EXPOSE 8080
 ---> Running in 853b5be2f672
Removing intermediate container 853b5be2f672
 ---> 1b829a1ea7ec
Step 5/5 : ENTRYPOINT ["java","-jar","/app.jar"]
 ---> Running in a99ce2f2c4b9
Removing intermediate container a99ce2f2c4b9
 ---> c4c00b21c913
Successfully built c4c00b21c913
Successfully tagged shrimpdemo:lates

#查看镜像，已经构建成功
[root@localhost idea]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
shrimpdemo          latest              c4c00b21c913        22 seconds ago      660MB
tomcat              latest              6055d4d564e1        5 days ago          647MB
redis               5.0.9-alpine3.11    3661c84ee9d0        2 months ago        29.8MB
java                8                   d23bdf5b1b1b        3 years ago         643MB

#运行测试
[root@localhost idea]# docker run -d -p 8080:8080 --name shrimpdemo01 shrimpdemo
eae3ff271bcebc42d4cb4cdb6f638523ec3eeb4f8ba81cff216d80728c962732
#在浏览器测试是否可以访问
```

以后使用了Docker之后，给别人交付的就是一个镜像即可！



5. 发布运行





## Docker 安装部署应用

### Docker 可视化图形界面管理

#### Portainer

**什么是portainer？**

Docker 图形化界面管理工具，提供一个后台面板供操作。

```shell
#安装命令
[root@iz2zk7sgji7hrg862gft54d ~]# docker run -d -p 8080:9000 \
> --restart=always -v /var/run/docker.sock:/var/run/docker.sock --privileged=true portainer/portainer

Unable to find image 'portainer/portainer:latest' locally
latest: Pulling from portainer/portainer
d1e017099d17: Pull complete 
a7dca5b5a9e8: Pull complete 
Digest: sha256:4ae7f14330b56ffc8728e63d355bc4bc7381417fa45ba0597e5dd32682901080
Status: Downloaded newer image for portainer/portainer:latest
81753869c4fd438cec0e31659cbed0d112ad22bbcfcb9605483b126ee8ff306d
```



#### Rancher

CI/CD再用。



### <span id="install_mysql">部署 MySQL</span>

> 注意一个大坑：防火墙。
>
> - 宿主机（centos）的防火墙。
>
> - 如果宿主机是安装在物理机上的虚拟机，==还要把物理机的防火墙关闭了！或者开放端口==。
>
> 
>
> 【centos7】
>
> 查看防火墙服务状态
>
> systemctl status firewalld.service
>
> 查看防火墙运行状态
>
> firewall-cmd --state
>
> 关闭防火墙
>
> systemctl stop firewalld.service
>
> 禁用防火墙
>
> systemctl disable firewalld.service
>
> 查看开放的端口列表
>
> firewall-cmd --list-ports
>
> 开放指定端口
>
> firewall-cmd --zone=public --add-port=6379/tcp --permanent
>
> 重启服务生效
>
> firewall-cmd --reload 或 service firewalld restart
>
> 
>
> 第二个大坑：==**杀毒软件联网防护！**==硬生生坑了一个晚上！！
>
> ![image-20201230041438879](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201230041438879.png)
>
> 
>
> 如果后续出现端口不能正常暴露的情况，虚拟机可以通过 netstat -ntlp 查到，但外部主机无法访问不到虚拟机暴露的端口。
>
> 可以尝试以下操作：
>
> 重新添加防火墙端口，重启防火墙
>
> 重启 docker 服务，重启 MySQL
>
> 



#### 镜像下载

```shell
#搜索 Mysql 镜像
$ docker search mysql
#注意，下载镜像之前，先设置镜像加速【龟速变秒速】
#下载 Mysql 5.7 镜像，会默认下载 5.7 的最新版本。也可以自己指定小版本，比如5.7.34
#tag 标签可以在 docker hub 查看
$ sudo docker pull mysql:5.7
#查看下载镜像
$ sudo docker images

```



#### 镜像启动运行

```shell
#运行 Mysql 容器，映射目录，设置必须 Mysql 参数
$ docker run -d -p 127.0.0.1:3306:3306 --name mysql \
-v /home/mysql/conf:/etc/mysql/conf.d \
-v /home/mysql/data:/var/lib/mysql \
-v /home/mysql/logs:/var/log/mysql \
-v /etc/localtime:/etc/localtime \
-e MYSQL_GENERAL_LOG=1 \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:5.7 \
--lower_case_table_names=1 \
--max-allowed-packet=1073741824 \
--character_set_server=utf8 \
--innodb_log_file_size=256m

#注意，-p 127.0.0.1:3306:3306，需要指定外部主机的IP，否则外部主机只有tcp6/ipv6的3306端口，tcp/ipv4的3306端口没有绑定成功。官网的配置是带了外部主机IP的，按官网配置来。
#外部主机，防火墙需要开启 3306 端口，否则连接不上！

#简化版
sudo docker run -d -p 3306:3306 -v /home/mysql/mysql01/conf:/etc/mysql/conf.d -v /home/mysql/mysql01/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7 

#提前准备目录和文件
sudo docker run -d -p 3306:3306 -v /home/mysql/mysql01/conf:/etc/mysql/conf.d -v /home/mysql/mysql01/data:/var/lib/mysql -v /etc/localtime:/etc/localtime -e MYSQL_ROOT_PASSWORD=123456.a --privileged=true --name mysql01 mysql:5.7 --lower_case_table_names=1

#停止容器运行
#docker stop id/name
docker stop mysql01

#完全停止 docker 服务
sudo systemctl stop docker
sudo systemctl stop docker.socket

[Ming1@VM-0-7-centos ~]$ sudo systemctl stop docker
Warning: Stopping docker.service, but it can still be activated by:
  docker.socket
[Ming1@VM-0-7-centos ~]$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[Ming1@VM-0-7-centos ~]$ sudo systemctl stop docker.socket
[Ming1@VM-0-7-centos ~]$ docker ps
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?



```



#### Docker 运行参数说明

```shell
#docker run --help
#docker run 参数说明：
-d 后台运行容器，并返回容器 ID
-p 指定端口映射，格式为：主机(宿主)端口:容器端口
-v 宿主机和容器的目录映射关系，宿主机目录:容器目录
-e 环境参数配置，比如：用户名、密码
-- name 容器名字
--privileged=true #容器内的root拥有外部主机root权限，否则容器内root只是外部普通用户权限。【特别注意，root权限影响大】

#其他运行参数说明 $PWD 当前用户工作目录
-v $PWD/mysql/conf:/etc/mysql/conf.d #映射配置目录
-v /home/mysql/data:/var/lib/mysql #映射数据目录
-v /home/mysql/logs:/var/log/mysql #映射日志目录
-v /etc/localtime:/etc/localtime #时区同步
-e MYSQL_GENERAL_LOG=1 #开启日志
--privileged=true #容器内的root拥有真正root权限，否则容器内root只是外部普通用户权限

#Mysql 参数说明（业务需要时设置）：
--lower_case_table_names=1 #设置表名参数名等忽略大小写，解决 Crowd 无法识别大写表名问题
--max-allowed-packet=1073741824 #设置最大插入和更新数据限制为 1G（1024 * 1024 * 1024 = 1073741824），单位：字节，解决 Confluence 数据迁移时大数据插入问题
--character_set_server=utf8 #设置 utf8字符集，解决 Confluence 添加修改中文乱码问题
--innodb_log_file_size=256m  #设置日志文件大小，Confluence 健康检查推荐大小
```



#### MySQL 5.7 的映射目录

| Docker                      | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| /var/lib/mysql              | MySQL data dir                                               |
| /var/log/mysql              | MySQL log dir                                                |
| /var/sock/mysqld            | MySQL socket dir                                             |
| /etc/mysql/conf.d           | MySQL configuration directory (used to overwrite MySQL config) |
| /etc/mysql/docker-default.d | MySQL configuration directory (used to overwrite MySQL config) |



#### 设置mysql字符编码（通常默认）

```shell
#mysql 容器内 /etc/mysql/my.cnf 和 /etc/mysql/mysql.cnf 没有具体配置，而是引用其他的目录
!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mysql.conf.d/

#所以，参照 mysql 官方官方镜像映射目录，
#修改 mysql 容器挂载出来的目录下的 my.cnf，因为是目录映射，两边文件实时同步修改
vim /home/mysql/mysql01/conf/my.cnf

```

```properties
[client]
port=3306
socket=/var/lib/mysql/mysql.sock
default-character-set=utf8mb4


[mysqld]
port=3306
socket=/var/lib/mysql/mysql.sock
character_set_server=utf8mb4
collation_server=utf8mb4_general_ci


[mysql]
no-auto-rehash
default-character-set=utf8mb4

```

详细的配置可以参考，docker 官方文档：https://hub.docker.com/r/cytopia/mysql-5.7/



#### Docker 运行验证

```shell
#查看容器运行情况
$ sudo docker ps
#查看log
$ sudo docker logs mysql01

#进入mysql容器内：
sudo docker exec -it mysql01 /bin/bash

#进入mysql
mysql -u root -p

#或者使用 navicat、sqlyog 等数据库应用连接验证

```



#### 宿主机安装 mysql-client 客户端

```shell
#centos7下yum下找不到mysql客户端的rpm包了，需要从官网下载
wget https://repo.mysql.com//mysql57-community-release-el7-11.noarch.rpm

#安装rpm源
rpm -ivh https://repo.mysql.com//mysql57-community-release-el7-11.noarch.rpm

#安装客户端
#可以通过yum搜索
#yum search mysql
#若是64位的话直接安装
yum install mysql-community-client.x86_64

#测试连接
mysql -h ip -u root -p password

```



#### 检查是否给 root 用户授权了远程访问

连接上数据库，执行sql：

```mysql
select host,user,plugin,authentication_string from mysql.user;

-- 看user为root,host为%数据，我这里是已经开启了远程访问，如果没有的话，可以进行以下操作

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456'; -- WITH GRANT OPTION
-- 这里的123456为你给新增权限用户设置的密码，%代表所有主机，也可以具体到你的主机ip地址

-- mysql 8.0
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

flush privileges;          
-- 这一步一定要做，不然无法成功！ 这句表示从mysql数据库的grant表中重新加载权限数据，因为MySQL把权限都放在了cache中，所以在做完更改后需要重新加载。

quit

```



#### 修改 MySQL 数据库访问密码

- [MySQL 修改root密码](https://www.jianshu.com/p/894314392704)
- [MySQL修改root密码的几种方法](https://blog.csdn.net/weixin_30404433/article/details/114343524)



太简单的密码，如：123456，容易被局域网内”想搞恶作剧“的人搞破坏，一般测试数据都没有备份，一旦被破坏，又得重新造数据。

```shell
#客户端连接到数据库
mysql -h ip -u root -p
mysql -h 192.168.3.151 -u root -p
mysql -h 127.0.0.1 -u root -p


方法1：用 SET PASSWORD 命令

首先登录MySQL。

格式：mysql>set password for 用户名@localhost = PASSWORD('新密码');

例子：mysql>set password for root@localhost  = PASSWORD('123456');
set password for root@localhost = PASSWORD('Ad234@MRIie');
set password for root@% = PASSWORD('Ad234@MRIie'); -- 不行啊

方法2：用mysqladmin

格式：mysqladmin -u用户名 -p旧密码 password 新密码

例子：mysqladmin -uroot -p123456 password 12345678
mysqladmin -uroot -pAd233@MRIie password Ad234@MRIie;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'mysqladmin -u root -p Ad234@MRIie password ' at line 1

方法3：用UPDATE直接编辑user表
其实 MySQL 所以的账号信息都存储在 mysql.user 表里面，也可以直接通过 update user 表来修改密码。

首先登录MySQL

mysql> use mysql;
#5.7及之后版本
mysql> update mysql.user set authentication_string = password ('Ad234@MRIie') where user = 'root' and host = '%';
#localhost 和 % 都修改
update mysql.user set authentication_string = password('Ad234@MRIie') where user = 'root';
Query OK, 1 row affected, 1 warning (0.06 sec)
Rows matched: 1  Changed: 1  Warnings: 1

mysql> flush privileges;
Query OK, 0 rows affected (0.01 sec)

#5.6及之前版本
update mysql.user set password=password('新密码') where user='用户名' and host='host'; 

#更新设置
mysql> flush privileges;


方法4：在忘记root密码的时候，可以这样。

以windows为例：

1.关闭正在运行的MySQL服务。

2.打开DOS窗口，转到mysql\bin目录。

3.输入 mysqld --skip-grant-tables回车。--skip-grant-tables 的意思是启动MySQL服务的时候跳过权限表认证。

4.再打开一个DOS窗口(因为刚才那个DOS窗口已经不能动啦)，转到mysql\bin目录。

5.输入mysql回车，如果成功，将出现MySQL提示符 > 。

6.改密码：update user set password = password('123456') where user = 'root' ;

7.刷新权限(必须步骤)：flush priviliges;

8.退出 quit;

9.注销系统，在进入，是用户名root和刚才设置的新密码123456登录。
————————————————
版权声明：本文为CSDN博主「星象馆」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_30404433/article/details/114343524

```



#### MySQL 的数据持久化的问题

设置了数据目录映射到外部主机，能防止容器删除后数据丢失。



测试将包含mysql的容器删除：

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/docker-mysql-volume-data.png)



发现，**挂载到本地的数据卷依旧没有丢失，这就实现了容器数据持久化功能**。



#### 容器报错的情况

##### iptables failed

```shell
Error response from daemon: driver failed programming external connectivity on endpoint mmysql (ea2bb5fc455b0d5255c435b5444214982249cbd373ad46b781557aec22c571f0):  (iptables failed: iptables --wait -t nat -A DOCKER -p tcp -d 0/0 --dport 3306 -j DNAT --to-destination 172.21.1.1:3306 ! -i docker0: iptables: No chain/target/match by that name.
 (exit status 1))
Error: failed to start containers: mmysql
```

docker 服务启动的时候，docker 服务会向 iptables 注册一个链，以便让 docker 服务管理的 containner 所暴露的端口之间进行通信。

命令 iptables -L 可以查看 iptables 链。

如果你删除了 iptables 中的 docker 链，或者 iptables 的规则被丢失了（例如重启或关闭 firewalld ），docker 就会报如上错误。

只需要重启docker服务即可。



##### centos7 systemctl start docker 失败 start-limit 解决方案

```shell
[root@dev0x01 dev0x01]# systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; disabled; vendor preset: disabled)
   Active: failed (Result: start-limit) since Wed 2020-12-30 02:47:02 CST; 43s ago
     Docs: https://docs.docker.com
  Process: 3155 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock (code=exited, status=1/FAILURE)
 Main PID: 3155 (code=exited, status=1/FAILURE)

Dec 30 02:47:00 dev0x01.com systemd[1]: docker.service failed.
Dec 30 02:47:02 dev0x01.com systemd[1]: docker.service holdoff time over, scheduling restart.
Dec 30 02:47:02 dev0x01.com systemd[1]: Stopped Docker Application Container Engine.
Dec 30 02:47:02 dev0x01.com systemd[1]: start request repeated too quickly for docker.service
Dec 30 02:47:02 dev0x01.com systemd[1]: Failed to start Docker Application Container Engine.
Dec 30 02:47:02 dev0x01.com systemd[1]: Unit docker.service entered failed state.
Dec 30 02:47:02 dev0x01.com systemd[1]: docker.service failed.
Dec 30 02:47:02 dev0x01.com systemd[1]: start request repeated too quickly for docker.service
Dec 30 02:47:02 dev0x01.com systemd[1]: Failed to start Docker Application Container Engine.
Dec 30 02:47:02 dev0x01.com systemd[1]: docker.service failed.
```



**原因：**

参考一些说法是自己 配置了国内镜像，比如阿里云的docker镜像
比如我用了：yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo



**解决方法：**

如果是配置了国内镜像，并且镜像文件为 /etc/docker/daemon.json，则修改文件后缀为 .conf 即可正常启动 docker 服务。

```shell
[root@dev0x01 docker]# mv daemon.json daemon.conf
[root@dev0x01 docker]# ll
total 8
-rw-r--r--. 1 root root  60 Dec 28 18:53 daemon.conf
-rw-------. 1 root root 244 Dec 28 17:47 key.json
```



##### 客户端连接报错，Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2)

https://stackoverflow.com/questions/4448467/cant-connect-to-local-mysql-server-through-socket-var-lib-mysql-mysql-sock

Are you connecting to "localhost" or "127.0.0.1" ? I noticed that when you connect to "localhost" the socket connector is used, but when you connect to "127.0.0.1" the TCP/IP connector is used. You could ==**try using "127.0.0.1"**== if the socket connector is not enabled/working.



```shell
mysql -h 127.0.0.1 -u root -p
```



### 部署 Redis

参考一个博客资料可能会存在疏漏和错误的地方，多参考几个教程，四个左右，通常就能得到较为正确的资料教程。



```bash
#搜索可用镜像
docker search redis

#搜索的方式，不容易看明白自己想要下载的版本
建议到 docker 官方镜像库搜索下载，官网可能有时进不去，多试几次，或等一会再进
https://hub.docker.com/search?q=redis&type=image

#拉取官方最新版本的 redis 镜像
docker pull redis
#或者
docker pull redis:latest

#或者下载指定版本
docker pull redis:5.0.8
docker pull redis:6.0.9
docker pull redis:6.0.14
#docker pull redis:6.2.4 版本太新，连接出错


#新增挂在配置文件夹
因为 redis 默认配置你会发现只能够本地连接，不能进行远程访问，使用 Redis Desktop Manager连接都会报错，因此需要手动挂载 redis 配置文件

#新建data和conf两个文件夹，位置随意
mkdir -p /home/web/redis/redis01/conf
mkdir -p /home/web/redis/redis01/data

#新增Redis配置文件
vim /home/web/redis/redis01/conf/redis.conf

#修改内容
bind 0.0.0.0 
protected-mode no
appendonly yes
requirepass 123456.a

appendonly yes	启动Redis持久化功能 (默认 no , 所有信息都存储在内存 [重启丢失] 。 设置为 yes , 将存储在硬盘 [重启还在])
protected-mode no	关闭protected-mode模式，此时外部网络可以直接访问 (docker貌似自动开启了)
bind 0.0.0.0 将 bind 127.0.0.1 注释掉，或者写 bind 0.0.0.0，保证可以从远程访问到该Redis，不单单是从本地
requirepass 密码	设置密码

#创建 redis 容器并启动
sudo docker run --name redis01 -p 6379:6379 -v /home/redis/redis01/data:/data -v /home/redis/redis01/conf/redis.conf:/etc/redis/redis.conf -v /etc/localtime:/etc/localtime -d redis:6.0.14 redis-server /etc/redis/redis.conf

--name redis	启动容器的名字
-d	后台运行
-p 6379:6379	将容器的 6379(后面那个) 端口映射到主机的 6379(前面那个) 端口
-restart unless-stopped	容器重启策略
-v /mydata/redis/data:/data	将Redis储存文件夹挂在到主机
-v /mydata/redis/conf/redis.conf:/etc/redis/redis.conf	将配置文件夹挂在到主机
-d redis:buster	启动哪个版本的 Redis (本地镜像的版本)
redis-server /etc/redis/redis.conf	Redis 容器中设置 redis-server 每次启动读取 /etc/redis/redis.conf 这个配置为准
\	shell 命令换行


#查看版本号
redis-server -v
redis-server --version
#Redis server v=6.0.9 sha=00000000:0 malloc=jemalloc-5.1.0 bits=64 build=11509227cb1fdf31

#进入Redis容器
docker exec -it redis01 /bin/bash

#通过密码进入Redis控制台
redis-cli --raw -h 127.0.0.1 -p 6379 -a 123456.a
#直接输入密码登录，提示不安全

redis-cli --raw -h 127.0.0.1 -p 6379
auth default passwd
#这种方式也是明文密码输入啊

#redis-cli 中文乱码
127.0.0.1:6379> set mykey 北京
OK
127.0.0.1:6379> get mykey
"\xe5\x8c\x97\xe4\xba\xac"

#默认redis不转义中文，如果在平常开发中 想要看到中文内容。
#在打开客户端时：./redis-cli  命令后面  加上  --raw 即可。

#用户管理
https://blog.csdn.net/wsdc0521/article/details/106765856

127.0.0.1:6379> acl list
user default on #3e46f229718f9e2773bf64e46880fb348641ddf8859393173ea0f7710ccca328 ~* &* +@all

127.0.0.1:6379> acl whoami
default

其中user为关键词，default为用户名，后面的内容为ACL规则描述，on表示活跃的，nopass表示无密码， ~* 表示所有key，+@all表示所有命令。所以上面的命令表示活跃用户default无密码且可以访问所有命令以及所有数据。



```



### 部署 MongoDB

```shell
#直接拉取最新版本镜像
docker pull mongo
或者
docker pull mongo:latest

#查看可用版本
docker search mongo

#指定镜像版本，tag 为版本号或者版本标签
docker pull mongo:tag

#查看镜像
docker images

#mongodb 配置文件及数据文件目录
#/etc/mongo/mongod.conf #这是后续自定义的，刚开始不存在
/etc/mongod.conf.orig #这是默认配置文件，里面配置项不多，有指明官网可以查看更多配置项
/data/db

#挂载主机目录启动，注意，指定配置文件得确保文件存在，否则会启动失败
docker run -d -p 27017:27017 --name mongodb01 \
-v /home/mongodb/mongodb01/mongod.conf:/etc/mongodb.conf \
-v /home/mongodb/mongodb01/data/db:/data/db \
--privileged=true mongo:latest --auth

#--privileged=true 完全 root 权限
#--auth 需要认证授权，也就是要配置用户名和密码
#--config /etc/mongo/mongod.conf 指定配置文件启动，前提是配置文件得存在

#指定 MongoDB 配置文件，方式二
#在宿主机上创建一个mongodb.conf文件，并将该文件所在的文件夹映射到容器的/data/configdb文件夹中，同时，在容器的启动命令中添加--configsvr参数即可。
#docker run --name some-mongo -d mongo --configsvr

#查看是否启动
docker ps

#有进程信息说明启动成功，没有则进一步查看
#查看最近启动记录
docker ps -a

#挂载目录启功，会因为主机挂载目录为空，没有配置文件，导致启动失败，需要提前准备配置文件

#删除启动失败的容器
docker rm mongodb01

#先启动一个普通不挂载目录的容器
docker run -d -p 27017:27017 --name mongodb01 \
--privileged=true mongo:latest --auth /etc/mongo/mongod.conf
#还是失败，就再普通一点
docker run -d -p 27017:27017 --name mongodb01 mongo:latest

#进入容器
docker exec -it mongodb01 /bin/bash
或者直接连接 mongodb 并使用 admin 身份
docker exec -it mongodb01 mongo admin

#赋值容器内的配置文件，到主机挂载目录
docker cp mongodb01:/etc/mongod.conf.orig /home/mongodb/mongodb01/conf

#设置用户及权限
#创建用户
#进入容器
docker exec -it mongodb01 /bin/bash
#进入 mongo
mongo
#进入 admin 的数据库
use admin
#创建管理员用户
db.createUser({ user: 'root', pwd: '123456.a', roles: [ { role: "root", db: "admin" } ] });
#db.createUser({ user: 'root', pwd: '123456.a', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
#创建成功用户后，命令操作会提示需要授权认证
#必须要授权认证之后，才能进行后续的操作
db.auth('root', '123456.a')
#进入自己创建的数据库，会自动创建
use mypages
#创建有可读写权限的用户. 对于一个特定的数据库
db.createUser({ user: 'mypages', pwd: '123456.a', roles: [ {role: "readWrite", db: "mypages"} ] });
#创建完角色之后，需要退出，重新连接


#配置外网访问
#修改 mongo 配置文件
vim /etc/mongod.conf.orig
#将其中的bindIp: 127.0.0.1注释掉#bindIp: 127.0.0.1或者改成bindIp: 0.0.0.0 即可开启远程连接
#重启容器
docker restart mongodb01

#开放端口
firewall-cmd --zone=public --add-port=27017/tcp --permanent
firewall-cmd --reload 或 service firewalld restart


#简单 CRUD
#探索帮助命令
随便输入 help -> db.help()

#数据库CRUD
#查看当前使用的数据库
db

#查看有权限的数据库
show dbs;
show databases;

#创建数据库，不存在则自动创建
use your_db_name

#删除数据库
db.dropDatabase('your_db_name');

#查看数据使用编码格式



```





### 部署 Tomcat

#### 安装与基本操作

```shell
#下载 tomcat9.0
#之前的启动都是后台，停止了容器，容器还是可以查到， docker run -it --rm 镜像名 一般是用来测试，用完就删除
[root@iz2zk7sgji7hrg862gft54d ~]# docker run -it --rm tomcat:9.0

#--rm Automatically remove the container when it exits 用完即删

#下载 最新版
[root@iz2zk7sgji7hrg862gft54d ~]# docker pull tomcat

#下载指定版本，注意，9.0.x 后面的小版本会自动匹配
#tag 标签在 docker hub 上查看
sudo docker pull tomcat:9.0
sudo docker pull tomcat:8.5.65-jdk8
sudo docker pull tomcat:9.0.46-jdk8

#查看下载的镜像
[root@iz2zk7sgji7hrg862gft54d ~]# docker images

#以后台方式，暴露端口方式，启动运行
[root@iz2zk7sgji7hrg862gft54d ~]# docker run -d -p 8080:8080 --name tomcat01 tomcat

#挂载目录启动
#确认 tomcat 配置文件目录 https://hub.docker.com/_/tomcat
CATALINA_BASE:   /usr/local/tomcat
CATALINA_HOME:   /usr/local/tomcat
CATALINA_TMPDIR: /usr/local/tomcat/temp
JRE_HOME:        /usr
CLASSPATH:       /usr/local/tomcat/bin/bootstrap.jar:/usr/local/tomcat/bin/tomcat-juli.jar


#挂载容器的 webapps 目录到本机（宿主机）自己设置的目录
#把容器里的tomcat里的webapp，logs，conf挂载到宿主机tomcat目录下，方便上传代码，同步持久化日志，以及方便配置tomcat；关掉容器，启动容器
#【注意！！直接这样运行，不能正常启动】
docker run -d -p 8081:8081 --name tomcat01 \
-v /home/tomcat/tomcat01/conf/:/usr/local/tomcat/conf \
-v /home/tomcat/tomcat01/webapps:/usr/local/tomcat/webapps \
-v /home/tomcat/tomcat01/logs:/usr/local/tomcat/logs \
--privileged=true tomcat:8.5.65-jdk8


#用新的 9.0.46 代替 8.5.65
#正式挂载启动
sudo docker run -d -p 8081:8081 --name tomcat01 \
-v /home/tomcat/tomcat01/bin/:/usr/local/tomcat/bin \
-v /home/tomcat/tomcat01/conf/:/usr/local/tomcat/conf \
-v /home/tomcat/tomcat01/webapps:/usr/local/tomcat/webapps \
-v /home/tomcat/tomcat01/logs:/usr/local/tomcat/logs \
-v /etc/localtime:/etc/localtime \
--privileged=true tomcat:9.0.46-jdk8

#排错启动
docker run -d -p 8081:8081 --name tomcat01 \
-v /home/tomcat/tomcat01/webapps:/usr/local/tomcat/webapps \
-v /home/tomcat/tomcat01/logs:/usr/local/tomcat/logs \
--privileged=true tomcat:9.0.46-jdk8


sudo docker run -d -p 8082:8082 --name tomcat02 \
-v /home/tomcat/tomcat02/conf/:/usr/local/tomcat/conf \
-v /home/tomcat/tomcat02/webapps:/usr/local/tomcat/webapps \
-v /home/tomcat/tomcat02/logs:/usr/local/tomcat/logs \
-v /etc/localtime:/etc/localtime \
--privileged=true tomcat:9.0.46-jdk8


#直接挂载空目录启动，会报错
WARNING: Unable to load server configuration from [/usr/local/tomcat/conf/server.xml]
java.io.FileNotFoundException: /usr/local/tomcat/conf/server.xml (No such file or directory)


#【方式一 下载官方对应版本的安装包，解压之后，挂载到 docker 容器目录即可】
cd ~
wget https://mirrors.bfsu.edu.cn/apache/tomcat/tomcat-9/v9.0.46/bin/apache-tomcat-9.0.46.tar.gz
tar -zxvf apache-tomcat-9.0.46.tar.gz -C /home/tomcat/tomcat01

#【方式二 复制容器内文件到主机目录，操作繁琐】
#先不挂载目录启动，复制 conf 下的配置文件到主机挂载目录，再按需求标准启动
#随便运行一个tomcat容器
docker run --name tomcat01 -p 8080:8080 -d tomcat
docker run --name tomcat01 -p 8081:8081 -d tomcat:9.0.46-jdk8
#可以进入容器内部，查看需要复制哪些文件
docker exec -it tomcat01 /bin/bash

#复制容器内 /usr/local/tomcat 的所有内容到宿主机
#直接全部复制，或者只复制 conf 目录
docker cp tomcat01:/usr/local/tomcat/* /home/tomcat/tomcat01
#有系统版本不支持 /*

#注意，如果复制不生效，可以尝试删除主机挂载目录，再复制
#删除临时实验容器
docker stop tomcat01
docker rm tomcat01

#执行上方正式挂载启动命令


#查看宿主机的文件目录和挂载情况
[root@localhost webapps]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
27c6b82b56e8        tomcat              "catalina.sh run"        4 minutes ago       Up 4 minutes        0.0.0.0:8080->8080/tcp              tomcat
3b013a36bbb6        mysql:5.7           "docker-entrypoint.s…"   About an hour ago   Up About an hour    0.0.0.0:3306->3306/tcp, 33060/tcp   mysql
[root@localhost webapps]# docker inspect 27c6b82b56e8
......
   "Mounts": [
       {
           "Type": "bind",
           "Source": "/data/docker/tomcat/logs",
           "Destination": "/usr/local/tomcat/logs",
           "Mode": "",
           "RW": true,
           "Propagation": "rprivate"
       },
       {
           "Type": "bind",
           "Source": "/data/docker/tomcat/webapps",
           "Destination": "/usr/local/tomcat/webapps",
           "Mode": "",
           "RW": true,
           "Propagation": "rprivate"
       }
   ],
#查看宿主机文件目录
[root@localhost webapps]# pwd
/data/docker/tomcat/webapps
[root@localhost webapps]# ll
total 4
drwxr-xr-x. 16 root root 4096 Jul 18 20:22 docs
drwxr-xr-x.  6 root root   83 Jul 18 20:22 examples
drwxr-xr-x.  5 root root   87 Jul 18 20:22 host-manager
drwxr-xr-x.  5 root root  103 Jul 18 20:22 manager
drwxr-xr-x.  3 root root  283 Jul 18 20:22 ROOT
#文件映射成功，且创建文件后能自动同步


#复制容器里conf,webapps到宿主机
docker cp  容器id:/usr/local/tomcat/conf  /home/tomcat/
docker cp  容器id:/usr/local/tomcat/webapps  /home/tomcat/


#测试访问有没有问题
curl localhost:8080

#根据容器id进入tomcat容器
[root@iz2zk7sgji7hrg862gft54d ~]# docker exec -it 645596565d3f /bin/bash
root@645596565d3f:/usr/local/tomcat# 
#查看tomcat容器内部内容：
root@645596565d3f:/usr/local/tomcat# ls -l
total 152
-rw-r--r-- 1 root root 18982 May  5 20:40 BUILDING.txt
-rw-r--r-- 1 root root  5409 May  5 20:40 CONTRIBUTING.md
-rw-r--r-- 1 root root 57092 May  5 20:40 LICENSE
-rw-r--r-- 1 root root  2333 May  5 20:40 NOTICE
-rw-r--r-- 1 root root  3255 May  5 20:40 README.md
-rw-r--r-- 1 root root  6898 May  5 20:40 RELEASE-NOTES
-rw-r--r-- 1 root root 16262 May  5 20:40 RUNNING.txt
drwxr-xr-x 2 root root  4096 May 16 12:05 bin
drwxr-xr-x 1 root root  4096 May 21 11:04 conf
drwxr-xr-x 2 root root  4096 May 16 12:05 lib
drwxrwxrwx 1 root root  4096 May 21 11:04 logs
drwxr-xr-x 2 root root  4096 May 16 12:05 native-jni-lib
drwxrwxrwx 2 root root  4096 May 16 12:05 temp
drwxr-xr-x 2 root root  4096 May 16 12:05 webapps
drwxr-xr-x 7 root root  4096 May  5 20:37 webapps.dist
drwxrwxrwx 2 root root  4096 May  5 20:36 work
root@645596565d3f:/usr/local/tomcat# 
#进入webapps目录
root@645596565d3f:/usr/local/tomcat# cd webapps
root@645596565d3f:/usr/local/tomcat/webapps# ls
root@645596565d3f:/usr/local/tomcat/webapps# 
#发现问题：1、linux命令少了。 2.webapps目录为空 
#原因：阿里云镜像的原因，阿里云默认是最小的镜像，所以不必要的都剔除掉
#保证最小可运行的环境！
#解决方案：
#将webapps.dist下的文件都拷贝到webapps下即可
root@645596565d3f:/usr/local/tomcat# ls 找到webapps.dist
BUILDING.txt	 LICENSE  README.md	 RUNNING.txt  conf  logs  temp     webapps.dist
CONTRIBUTING.md  NOTICE   RELEASE-NOTES  bin   lib   native-jni-lib  webapps  work

root@645596565d3f:/usr/local/tomcat# cd webapps.dist/ #进入webapps.dist 
root@645596565d3f:/usr/local/tomcat/webapps.dist# ls #查看内容
ROOT  docs  examples  host-manager  manager

root@645596565d3f:/usr/local/tomcat/webapps.dist# cd ..
root@645596565d3f:/usr/local/tomcat# cp -r webapps.dist/* webapps #拷贝webapps.dist 内容给webapps
root@645596565d3f:/usr/local/tomcat# cd webapps #进入webapps
root@645596565d3f:/usr/local/tomcat/webapps# ls #查看拷贝结果
ROOT  docs  examples  host-manager  manager


```



#### 项目配置

**server.xml**

```xml
<!-- 端口号配置 -->
<Connector port="8081" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />

<!--
      解决 tomcat 中的项目启动两次问题，将 appBase="webapps" 的值改为 ""
      appBase：指定 tomcat 容器存放项目的目录，默认是 webapps
      -->
      <Host name="localhost"  appBase=""
            unpackWARs="false" autoDeploy="false">


<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
          
<!--
	path 是虚拟路径
	
	docBase 是应用程序的物理路径
	
	workDir 是这个应用的工作目录，存放运行时生成的与这个应用相关的文件
	
	debug 则是设定debug level, 0表示提供最少的信息，9表示提供最多的信息
	
	privileged 设置为true的时候，才允许Tomcat的Web应用使用容器内的Servlet
	
	reloadable 如果为true，则tomcat会自动检测应用程序的/WEB-INF/lib 和/WEB-INF/classes目录的变化，自动装载新的应用程序，可以在不
	重起tomcat的情况下改变应用程序，实现热部署
	
	antiResourceLocking和antiJARLocking 热部署是需要配置的参数，默认false避免更新了某个webapp。
	有时候Tomcat并不能把旧的webapp完全删除，通常会留下WEB-INF/lib下的某个jar包，必须关闭Tomcat才能删除，这就导致自动部署失败。
	设置为true，Tomcat在运行对应的webapp时，会把相应的源文件和jar文件复制到一个临时目录里。
	
	注意： 删除一个Web应用同时也要删除webapps下相应的文件夹和server.xml中相应的Context，
	还要将Tomcat的conf\catalina\localhost目录下相应的xml文件删除，否则Tomcat仍会去配置并加载。
	-->
	
	<!-- 启动 manager 项目，用于远程自动部署。
	     如果不需要 manager，注释掉 context，并把 Catalina/localhost/manager.xml 也删除，避免启动报错 -->
	<!--<Context path="/manager" docBase="/usr/local/tomcat/webapps/manager" debug="0" privileged="true" reloadable="false"/>-->
	<!-- 启动实际项目，可以有多个，但 path 路径不能重复 -->
	<Context path="" docBase="/usr/local/tomcat/webapps/mypages" debug="0" privileged="true" reloadable="false"/>


```





### 部署 Jenkins

参考官方文档：

https://www.jenkins.io/zh/doc/book/installing/

建议使用的Docker映像是[`jenkinsci/blueocean` image](https://hub.docker.com/r/jenkinsci/blueocean/)(来自 the [Docker Hub repository](https://hub.docker.com/))。 该镜像包含当前的[长期支持 (LTS) 的Jenkins版本](https://www.jenkins.io/download) （可以投入使用） ，捆绑了所有Blue Ocean插件和功能。这意味着你不需要单独安装Blue Ocean插件。



A docker image to give BlueOcean a try

- run as `docker run -p 8080:8080 jenkinsci/blueocean`
- note the admin password dumped on log
- open a browser on [http://localhost:8080](http://localhost:8080/)
- run the initial setup wizard. Choose "recommended plugins"
- browse to http://localhost:8080/blue

This image has a tag for every release of blue ocean, to run the latest, ensure you run `docker pull jenkinsci/blueocean` from time to time.



```shell
#下载最新镜像
docker pull jenkinsci/blueocean

#运行
docker run \
  --name jenkins \
  -u root \
  -d \
  -p 8090:8080 \
  -p 50000:50000 \
  -v /home/jenkins:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean

#启动后，浏览器访问 ip+端口的地址
#会生成随机访问密码，在主机查看容器的日志
docker logs jenkins --since 5 #查看最近 5 min 日志

#按照官网文档说明，找到密码，填写进去

#图形界面设置，自定义安装插件，在推荐的基础上，选择项目需要的
Git 相关
SSH 相关
Maven 相关

#由于官网网络问题，可能一些插件安装不成功，建议找一些别人下好的插件资源，复制到 jenkins 插件目录，重启


#设置初始用户和密码
docker-jenkins
123456.a
Hwerwesdfu
Hwerwesdfu@162.cc

#设置完成后，重启启动会比较慢
#注意，如果进入不了系统，需要稍等一下，或者刷新页面。如果等了超过5分钟，并且后台日志没有动，还是进入不了，尝试重新启动 jenkins 服务器。


#生成 gitee token
https://gitee.com/personal_access_tokens
a6ba441fcdd0c0fee92d107da39fb18c

#如果测试连接失败，检查密码凭据是否正确。重新生成token再试一遍，我是试了第二遍就测试连接成功了。



```



### 部署 Nginx

#### openresty 与 nginx 的使用区别

https://xiaogenban1993.github.io/19.07/nginx_openresty.html

**什么是 openresty**
openresty = nginx + 很多插件

通过 Lua 扩展 NGINX 实现的可伸缩的 Web 平台。



openresty 和 nginx 没有区别，配置文件格式也是一样。启动 openresty 的 docker，进入`/usr/local/openresty/nginx/conf`可以找到`nginx.conf`这就是配置文件了，这个文件引用了`/etc/nginx/conf.d/*.conf`，因而docker的映射文件只需要映射后者即可。

默认有个`/etc/nginx/conf.d/default.conf`这个conf文件是以server开始的。



#### 安装与基本操作

```shell
#搜索镜像 search 建议大家去docker搜索，可以看到帮助文档
[root@iz2zk7sgji7hrg862gft54d ~]# docker search nginx

#拉取下载镜像 pull
[root@iz2zk7sgji7hrg862gft54d ~]# docker pull nginx

#查看是否下载成功镜像
[root@iz2zk7sgji7hrg862gft54d ~]# docker images

#查看配置文件及数据目录，查询官网 Dockerfile，或者运行进入容器查看
#https://hub.docker.com/_/nginx

#运行测试
#-d 后台运行
#--name 给容器命名
#-p 宿主机端口：容器内部端口
[root@iz2zk7sgji7hrg862gft54d ~]# docker run -d --name nginx01 -p 3344:80 nginx
aa664b0c8ed98f532453ce1c599be823bcc1f3c9209e5078615af416ccb454c2

【先准备nginx运行所需的文件和目录，再运行容器，否则可能会各种报错】
#复制容器内的配置文件到主机挂载目录。docker启动容器进行挂载的时候，如果路径不存在，docker会自动创建目录
#也可以手动创建目录，mkdir -p ./nginx/{conf,html,logs} 目录名自定
#【先简单挂载，复制配置文件到主机】
sudo docker run -d -p 80:80 --name nginx01 -v /home/nginx/nginx01/html:/usr/share/nginx/html -v /home/nginx/nginx01/logs:/var/log/nginx --privileged=true nginx


#把默认生成的 nginx.conf 目录删掉，nginx.conf 是文件不是目录，否则会报错
sudo rm -rf nginx.conf/

sudo docker cp nginx01:/etc/nginx/nginx.conf /home/nginx/nginx01
sudo docker cp nginx01:/etc/nginx/conf.d /home/nginx/nginx01
#【注意！！！】有可能挂载了目录没生效，需要手动复制到容器内
sudo docker cp /home/nginx/nginx01/conf.d/ nginx01:/etc/nginx/

#查看挂载目录
docker inspect nginx01


#挂载目录运行，注意，文件或文件夹都可以对应挂载
#注意，这里会因为挂载的目录和文件不存在而报错，需要先准备宿主机的 nginx 配置文件
sudo docker run -d -p 80:80 --name nginx01 -v /home/nginx/nginx01/html:/usr/share/nginx/html -v /home/nginx/nginx01/conf.d:/etc/nginx/conf.d -v /home/nginx/nginx01/nginx.conf:/etc/nginx/nginx.conf -v /home/nginx/nginx01/logs:/var/log/nginx --privileged=true nginx

#丫的，被 docker 的端口映射坑了一天！nginx 配置了 ssl，443 端口一直未启动监听
sudo docker run -d -p 80:80 -p 443:443 --name nginx01 -v /home/nginx/nginx01/html:/usr/share/nginx/html -v /home/nginx/nginx01/conf.d:/etc/nginx/conf.d -v /home/nginx/nginx01/nginx.conf:/etc/nginx/nginx.conf -v /home/nginx/nginx01/logs:/var/log/nginx -v /etc/localtime:/etc/localtime --privileged=true nginx

#conf.d/default.conf 配置了 ssl 相关文件地址，但容器中还没有，导致启动报错。先只监听80，启动成功后，再把ssl key文件复制到容器，再监听 443 ssl
#可以查看logs/error.log，准确定位问题


#查看正在启动的镜像
[root@iz2zk7sgji7hrg862gft54d ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
75943663c116        nginx               "nginx -g 'daemon of…"   41 seconds ago      Up 40 seconds       0.0.0.0:82->80/tcp   nginx00

#进入容器
[root@iz2zk7sgji7hrg862gft54d ~]# docker exec -it nginx01 /bin/bash #进入
root@aa664b0c8ed9:/# whereis nginx #找到nginx位置
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
root@aa664b0c8ed9:/# cd /etc/nginx/
root@aa664b0c8ed9:/etc/nginx# ls
conf.d	fastcgi_params	koi-utf  koi-win  mime.types  modules  nginx.conf  scgi_params	uwsgi_params  win-utf

#退出容器
root@aa664b0c8ed9:/etc/nginx# exit
exit

#停止容器
[root@iz2zk7sgji7hrg862gft54d ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
aa664b0c8ed9        nginx               "nginx -g 'daemon of…"   10 minutes ago      Up 10 minutes       0.0.0.0:3344->80/tcp   nginx01
[root@iz2zk7sgji7hrg862gft54d ~]# docker stop aa664b0c8ed9

#验证访问
#这时候，会出现403，不要惊慌。因为主机挂载的 html 目录还为空，复制一个静态 html 页面，或自己的项目，就能正常访问了


```



#### 项目配置

**nginx.conf**

通常用来配置多匹配规则

```properties
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```



**default.conf**

默认配置文件，通用公共配置

```properties
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;
    
    
语法规则： location [=|~|~*|^~] /uri/ { … }

= 开头表示精确匹配
~ 开头表示区分大小写的正则匹配
~* 开头表示不区分大小写的正则匹配
^~ 开头表示uri以某个常规字符串开头


    location / {
        root   /usr/share/nginx/html/mypages-web;
        index  index.html index.htm;
		#try_files $uri $uri/ /index.html;
    }

如果在proxy_pass后面的url加/，表示绝对根路径；如果没有/，表示相对路径，把匹配的路径部分也给代理走

    #配置代理，解决跨域问题
    #api 接口跨域
    #^~是代表某个字符作为开头匹配
    #/api/ 会自动移除
    location /api/ {
    #location ^~ /api/ {
    	#add_header 'Access-Control-Allow-Origin' '*';
		add_header 'Access-Control-Allow-Origin' '127.0.0.1, 192.168.3.151, 192.168.3.100, 8.129.220.131, 172.23.199.172'; 
        add_header 'Access-Control-Allow-Credentials' 'true'; 
        #proxy_set_header Host $host;
        #proxy_set_header X-Real-IP $remote_addr;
        #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #proxy_set_header X-NginX-Proxy true;
        proxy_pass 127.0.0.1:8081/;
		#rewrite "^/api/(.*)$" /$1 break;
    }
    
    #静态资源跨域
location /static/ {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        proxy_pass http://172.23.199.172:8081/;
    }
    
    
    #防盗链
    location ~* \.(jpg|jpeg|png|gif|bmp|ico|jfif)$ {
        valid_referers none blocked server_names *.m1yellow.cn m1yellow.* gitee.* 8.129.220.131/ 172.23.199.172/ ~\.google\. ~\.baidu\. ~\.github\. ~\.gitee\.;
        if ($invalid_referer) {
            return 403;
            #rewrite ^/ http://www.m1yellow.cn/images/error/403.jpg;
        }
        #proxy_pass http://172.23.199.172:8081/;
        #rewrite "^/static/(.*)$" http://172.23.199.172:8081/$1 break;
    }
    
    
说明
none：表示没有 referer 的可以访问
blocked：表示 referer 没有值的可以访问
server_names：表示本机 server_name 也就是 referer.ziyang.com 可以访问
*.ziyang.com：匹配上了正则的可以访问
www.ziyang.org.cn/nginx/：该页面发起的请求可以访问
~\.google\.：google 前后都是正则匹配
arbitrary string：任意字符串，定义服务器名称或可选的URI前缀，主机名可以使用*号开头或结尾，Referer字段中的服务器端口将被忽略掉。
regular expression：正则表达式，以“~”开头，在“http://”或"https://"之后的文本匹配。
    

    #error_page  404              /404.html;

    #redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    #proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #   proxy_pass   http://127.0.0.1;
    #}

    #pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #   root           html;
    #   fastcgi_pass   127.0.0.1:9000;
    #   fastcgi_index  index.php;
    #   fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #   include        fastcgi_params;
    #}

    #deny access to .htaccess files, if Apache's document root
    #concurs with nginx's one
    #
    #location ~ /\.ht {
    #   deny  all;
    #}
}
```



测试环境配置

```shell
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


    #配置代理，解决跨域问题
    #api 接口跨域
    #^~是代表某个字符作为开头匹配
    #/api/ 会自动移除
    location /api/ {
    #location ^~ /api/ {
    	add_header 'Access-Control-Allow-Origin' '*'; 
        add_header 'Access-Control-Allow-Credentials' 'true'; 
        #proxy_set_header Host $host;
        #proxy_set_header X-Real-IP $remote_addr;
        #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #proxy_set_header X-NginX-Proxy true;
        #proxy_pass http://127.0.0.1:8081/;
		#proxy_pass http://172.23.199.172:8081/;
		proxy_pass http://192.168.137.151:8081/;
		#rewrite "^/api/(.*)$" /$1 break;
    }

    #静态资源跨域
    location /static/ {
	#服务端已经添加了 header 参数
        #add_header 'Access-Control-Allow-Origin' '*';
        #add_header 'Access-Control-Allow-Credentials' 'true';
	
	#防盗链
	valid_referers server_names *.m1yellow.cn m1yellow.* gitee.* 8.129.220.131/ 172.23.199.172/ ~\.google\. ~\.baidu\. ~\.github\. ~\.gitee\.;
        if ($invalid_referer) {
            return 403;
            #rewrite ^/ http://www.m1yellow.cn/images/error/403.jpg;
        }
	
        #proxy_pass http://172.23.199.172:8081/;
        proxy_pass http://192.168.137.151:8081/;
    }


    #error_page  404              /404.html;

    #redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    #proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #   proxy_pass   http://127.0.0.1;
    #}

    #pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #   root           html;
    #   fastcgi_pass   127.0.0.1:9000;
    #   fastcgi_index  index.php;
    #   fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #   include        fastcgi_params;
    #}

    #deny access to .htaccess files, if Apache's document root
    #concurs with nginx's one
    #
    #location ~ /\.ht {
    #   deny  all;
    #}
}

```



**问题**：以后要部署项目，如果每次都要进入容器是不是十分麻烦？要是可以在容器外部提供一个映射路径，比如 webapps，在外部放置项目，就自动同步内部就好了！



**宿主机端口** 和 **容器内部端口** 以及端口暴露：

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20201229010232723.png)

**问题：**每次改动nginx配置文件，都需要进入容器内部？十分麻烦，要是可以在容器外部提供一个映射路径，达到在容器外部修改文件名，容器内部就可以自动修改？-v 数据卷 技术！



### 部署 ELK

```shell
#创建目录
mkdir /home/elk
cd /home/elk

#创建docker-compose.yml文件
vim docker-compose.yml


#目录挂载注意事项
#- /home/elk/elasticsearch/config:/usr/share/elasticsearch/config #配置文件挂载，注意，直接挂载目录会把容器内的目录中的内容清空，导致启动找不到文件而报错

#需要先简单不挂载目录启动，复制容器内的配置文件或目录到主机，删除这个容器，重新配置挂载目录，再完整启动
sudo docker cp elasticsearch:/usr/share/elasticsearch/config/ /home/elk/elasticsearch/

#挂载文件，需要确保文件在主机目录中存在，否则也会报错
#- /home/elk/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml #挂载配置文件

#编辑内容
version: '3.9'
services:
  elasticsearch:
    image: elasticsearch:7.12.1
    container_name: elasticsearch
    environment:
      - "cluster.name=elasticsearch" #设置集群名称为elasticsearch
      - "discovery.type=single-node" #以单一节点模式启动
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m" #设置使用jvm内存大小，不设置的话，es会占用较大的内存，把主机拖卡顿
    volumes:
      - /home/elk/elasticsearch/config:/usr/share/elasticsearch/config #配置文件挂载，注意，直接挂载目录会把容器内的目录中的内容清空，导致启动找不到文件而报错
      - /home/elk/elasticsearch/plugins:/usr/share/elasticsearch/plugins #插件文件挂载
      - /home/elk/elasticsearch/data:/usr/share/elasticsearch/data #数据文件挂载
    ports:
      - 9200:9200
  kibana:
    image: kibana:7.12.1
    container_name: kibana
    volumes:
      - /home/elk/kibana/config/kibana.yml:/usr/share/kibana/config/kibana.yml #挂载配置文件
    depends_on:
      - elasticsearch #kibana在elasticsearch启动之后再启动
    environment:
      - ELASTICSEARCH_URL=http://elasticsearch:9200 #设置访问elasticsearch的地址
    ports:
      - 5601:5601
  logstash:
    image: logstash:7.12.1
    container_name: logstash
    volumes:
      - /home/elk/logstash/logstash-springboot.conf:/usr/share/logstash/pipeline/logstash.conf #挂载logstash的配置文件
    depends_on:
      - elasticsearch #kibana在elasticsearch启动之后再启动
    links:
      - elasticsearch:es #可以用es这个域名访问elasticsearch服务
    ports:
      - 4560:4560


#创建 logstash目录
mkdir /home/elk/logstash
cd logstash
#创建logstash-springboot.conf配置文件
vim logstash-springboot.conf
#编辑内容
input {
  tcp {
    mode => "server"
    host => "0.0.0.0"
    port => 4560
    codec => json_lines
  }
}
output {
  elasticsearch {
    hosts => "es:9200"
    index => "springboot-logstash-%{+YYYY.MM.dd}"
  }
}


#启动项目
cd /home/elk
docker-compose up -d

访问Kibana(访问地址：http://ip:5601),返回异常解决方案
异常信息：

Cannot connect to the Elasticsearch cluster currently configured for Kibana.
异常，有可能是elasticsearch启动不成功，可以查看启动日志是否报差错

docker logs -f elasticsearch

解决方法 => 提权
看错误会以为是es容器里的 /usr/share/elasticsearch/data/nodes 文件夹目录没有读写权限，其实给提示误导了，实际是挂载的目录没有读写权限。比如宿主主机的配置目录为:/usr/local/es/data，那么需要赋予它读写权限：

chmod 777 /usr/local/docker/elk/elasticsearch/data(宿主机目录)

然后重启 docker-compose restart


#启动成功后logstash中安装json_lines插件
#进入logstash容器
docker exec -it logstash /bin/bash
#进入bin目录
cd /bin/
#安装插件
logstash-plugin install logstash-codec-json_lines
#退出容器
exit
#重启logstash服务
docker restart logstash


#kibana 汉化
交互式进入kibana容器

docker exec -it kibana /bin/bash
在该镜像中编辑该配置文件

vi /opt/kibana/config/kibana.yml
修改该文件 在文件最后加上一行配置

i18n.locale: zh-CN
注意：zhe-CN和:号之间必须有个空格，否则kibana无法启动

复制容器内的 kibana.yml 到主机挂载目录
sudo docker cp kibana:/usr/share/kibana/config/kibana.yml /home/elk/kibana/config/

重新运行 kibana，即可看到访问的 kibana 已显示中文语言。






```



### 部署 Zookeeper

```shell
#拉取指定版本镜像
sudo docker pull zookeeper:3.4.14

#挂载目录启动
sudo docker run -d -p 2181:2181 --name zoo01 --privileged=true zookeeper:3.4.14



```





### 部署 springboot 项目

#### 手动部署

##### IDEA 安装 Docker 插件

file-settings-plugins 搜索 docker，安装后重启 IDEA。



##### 将 springboot 项目打包成 jar

```
【插件配置】
多模块打包：只需在启动类所在模块的POM文件：指定打包插件
在IDE打开Maven插件，然后在聚合父工程spring-boot-integration中点击 clean ，然后点击 package 进行打包。

【打jar包步骤】
单击IDEA菜单栏的 “File -> Project struct -> Artifact”命令，单击界面上的 “ + ”按钮，选择“JAR”，然后选择 “From modules with dependencies”。
在弹出的窗口中，在Main Class 框中选择入口类，单击“OK”按钮，在切换回来的窗口中，在单击“OK”按钮。
单击IDEA开发工具右侧的“Maven构造”按钮，在弹出的窗口中单击“lifeCycle -> clean”命令，IDEA就会运行“clean”命令，此时控制台会有执行情况提示。
根据控制台提示，稍等一会儿，等待提示完成之后，在继续单击IDEA开发工具右侧的“Maven构造”按钮，在弹出的窗口中单击“liftCycle -> package”命令，等待控制台提示，当提示完成时，代表JAR被成功打包。
打包成功后，控制台输出下方信息。可以根据这个控制台的提示找到JAR包的位置“Building.jar”后的值就是JAR包的地址。

如果需要打war包，在pom文件中把项目打包方式改为war即可。

```



##### 编写 Dockerfile

路径可以放在和 pom 文件同级目录，也可以 src/main/docker 中 。

```
#如果 docker 镜像中没有 java8，会自动下载
FROM java:8
#维护者信息
MAINTAINER M1Yellow
#将本地文件夹挂载到当前容器，指定/tmp目录并持久化到Docker数据文件夹，因为Spring Boot使用的内嵌Tomcat容器默认使用/tmp作为工作目录
VOLUME /tmp

#添加自己的项目到 app.jar 中，app 名字自定
ADD *.jar app.jar
#COPY *.jar /app.jar
#运行过程中创建一个app.jar文件
RUN bash -c 'touch /app.jar'

CMD ["--server.port=8081"]

#指定时区
#ENV TZ='Asia/Shanghai'

#开放端口
EXPOSE 8081

#ENTRYPOINT 指定容器运行后默认执行的命令
#java.security.egd=file:/dev/./urandom 的目的是为了缩短 Tomcat 启动的时间
#ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
ENTRYPOINT ["java","-jar","/app.jar", "--spring.profiles.active=dev"]

```



##### 配置启动命令

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/idea-set-docker-01.jpg)

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/idea-set-docker-02.jpg)

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/idea-set-docker-03.jpg)



#### 自动部署

##### 配置 docker 远程连接端口

```shell
vim /lib/systemd/system/docker.service
#修改ExecStart这行，注释掉原来的，新增配置
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock

#重新加载配置文件
systemctl daemon-reload
#重启服务
systemctl restart docker.service
#查看端口是否开启
netstat -ntlp
#开启端口，或者关闭防火墙，二者选其一即可
firewall-cmd --list-port
firewall-cmd --zone=public --add-port=2375/tcp --permanent  
chkconfig iptables off
#直接 curl 看是否生效
curl http://127.0.0.1:2375/info

```



##### idea 连接到 docker

File->Settings->Build,Execution,Deployment->Docker 打开配置界面

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210412001158233.png)



![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210412001254817.png)



##### 修改主项目 pom 文件

添加插件配置

```xml
<!-- 【dockerfile-maven-plugin 版本】 官方推荐 -->
<plugin>
    <groupId>com.spotify</groupId>
    <artifactId>dockerfile-maven-plugin</artifactId>
    <version>${dockerfile-maven-plugin.version}</version>
    <executions>
        <execution>
            <id>default</id>
            <goals>
                <goal>build</goal>
                <goal>push</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <repository>${project.name}</repository>
        <tag>${project.version}</tag>
        <buildArgs>
            <JAR_FILE>${project.build.finalName}.jar</JAR_FILE>
        </buildArgs>
        <dockerfile>Dockerfile</dockerfile>
    </configuration>
</plugin>

```



```xml
<!-- 【docker-maven-plugin 版本】 -->
<!-- configuration 标签里面的内容用来生成 dockerfile -->
<configuration>
    <!--指定生成的镜像名-->
    <imageName>${project.artifactId}</imageName>
    <!--指定标签-->
    <imageTags>
        <imageTag>${project.version}</imageTag>
    </imageTags>
    <!--指定基础镜像jdk1.8-->
    <baseImage>java:8</baseImage>
    <!--镜像制作人本人信息-->
    <maintainer>M1Yellow</maintainer>
    <!--切换到ROOT目录-->
    <!--<workdir>/ROOT</workdir>-->
    <workdir>/</workdir>
    <cmd>["java", "-version"]</cmd>
    <cmd>["ADD *.jar /${project.build.finalName}.jar"]</cmd>
    <entryPoint>["java", "-jar", "/${project.build.finalName}.jar"]</entryPoint>
    <!--指定远程 docker api地址-->
    <dockerHost>http://192.168.3.151:2375</dockerHost>

    <!-- 复制 jar 包到 docker 容器指定目录配置 -->
    <resources>
        <resource>
            <!--<targetPath>/ROOT</targetPath>-->
            <targetPath>/</targetPath>
            <!-- 用于指定需要复制的根目录，${project.build.directory}表示target目录 -->
            <directory>${project.build.directory}</directory>
            <!-- 用于指定需要复制的文件，${project.build.finalName}.jar指的是打包后的jar包文件 -->
            <include>${project.build.finalName}.jar</include>
        </resource>
    </resources>
</configuration>

```



##### 配置环境变量

IDEA 设置里添加 Maven 环境变量，告知 Docker Host 地址，具体操作如下：

1. 找到 Preference -> Build, Execution, Deployment -> Build Tools -> Maven -> Runner
2. 在 Environment variables 中填写 DOCKER_HOST=tcp://192.168.3.151:2375

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210412012051894.png)



##### 运行容器

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/hQ7KBXTAGf6FMpl.png)

![img](https://www.m1yellow.cn/doc-img/Docker%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/8SsoM3VpTJnjIOv.png)





## Docker Compose

### 概述

单个容器场景：dockerfile build run 手动操作。

微服务场景：上百个微服务，启动依赖关系。

docker compose 可以轻松高效管理容器，定义运行多个容器。



> 官方介绍

https://docs.docker.com/compose/

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. To learn more about all the features of Compose, see [the list of features](https://docs.docker.com/compose/#features).

Compose works in all environments: production, staging, development, testing, as well as CI workflows. You can learn more about each case in [Common Use Cases](https://docs.docker.com/compose/#common-use-cases).

**三个步骤：**

Using Compose is basically a three-step process:

1. Define your app’s environment with a `Dockerfile` so it can be reproduced anywhere.
   - Dockerfile 保证项目在任何地方可以运行
2. Define the services that make up your app in `docker-compose.yml` so they can be run together in an isolated environment.
   - service 什么是服务
   - docker-compose.yml 这个文件怎么写
3. Run `docker-compose up` and Compose starts and runs your entire app.
   - 启动项目



作用：批量编排容器。



```yaml
version: "3.9"  #optional since v1.27.0
services: #服务项
  web: #web 服务
    build: . #编译目录下的 Dockerfile 文件，. 代表当前目录
    ports: #端口映射
      - "5000:5000"
    volumes: #挂载目录
      - .:/code
      - logvolume01:/var/log
    links: #服务关联依赖
      - redis
  redis: #redis 服务
    image: redis #redis 镜像
volumes:
  logvolume01: {}
```



### 安装

```shell
#官方地址
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

#国内地址
curl -L https://get.daocloud.io/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

#添加执行权限
chmod +x /usr/local/bin/docker-compose

#创建软连接，方便全局调用
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

#测试是否安装成功
docker-compose --version
docker-compose version 1.27.4, build 40524192

#停止
docker compose stop
#或
docker compose down


```



在 Alibaba Cloud Linux 3 上安装

- [安装并使用docker-compose](https://help.aliyun.com/zh/ecs/use-cases/deploy-and-use-docker-on-alibaba-cloud-linux-2-instances#cf0f71c0der9g)



```shell
安装setuptools。
sudo pip3 install -U pip setuptools

安装docker-compose。
sudo pip3 install docker-compose

验证docker-compose是否安装成功。
docker-compose --version

```





### 常用管理命令

```shell
#帮助命令
docker-compose --help

#基于docker-compose.yml启动管理的容器
docker-compose up -d

#如果项目启动时报错，尝试重新构建
docker-compose up -d --build

#关闭并删除容器
docker-compose down

#开启|关闭|重启已经存在的由docker-compose维护的容器
docker-compose start|stop|restart

#查看由docker-compose管理的容器
docker-compose ps

#查看日志
docker-compose logs -f

#删除所有容器
docker stop `docker ps -q -a` | xargs docker rm
#删除所有标签为none的镜像
docker images|grep none|awk '{print $3}'|xargs docker rmi
#查找容器IP地址
docker inspect 容器名或ID | grep "IPAddress"
#创建网段, 名称: mynet, 分配两个容器在同一网段中 (这样子才可以互相通信)
docker network create mynet
docker run -d --net mynet --name container1 my_image
docker run -it --net mynet --name container1 another_image

```



### yaml 规则

docker-compose.yml 核心。

yml文件以key:value方式指定配置信息
多个配置信息以换行+缩进的方式来区分
docker-compose.yml文件中，不要使用制表符
关键词：后面都是有一个空格的，比如：restart: always



**以一个管理 mysql + tomcat 的 yaml 的容器为例：** 

可配置的参数，参考官网。

https://docs.docker.com/compose/compose-file/compose-file-v3/

```yaml
#三层
version: '3.9' #版本
services: #服务
  mysql:                     #服务的名称
    restart: always          #代表只要Docker启动，那么这个容器就跟着一起启动
    image: daocloud.io/library/mysql:5.7.4     #指定镜像路径
    container_name: mysql    #指定容器名称
    ports:
      - 3306:3306        #指定端口号的映射
    environment:
      MYSQL_ROOT_PASSWORD: root         #指定MySQL的ROOT用户登录密码
      TZ: Asia/Shanghai                 #指定时区
    volumes:
      - /opt/docker_mysql-tomcat/mysql_data:/var/lib/mysql        #映射数据卷
  
  tomcat:
    restart: always          #代表只要Docker启动，那么这个容器就跟着一起启动
    image: daocloud.io/library/tomcat:8.5.15-jre8     #指定镜像路径
    container_name: tomcat    #指定容器名称
    ports:
      - 8080:8080        #指定端口号的映射
    environment:
      MYSQL_ROOT_PASSWORD: root         #指定MySQL的ROOT用户登录密码
      TZ: Asia/Shanghai                 #指定时区
    volumes:
      - /opt/docker_mysql-tomcat/tomcat_webapps:/usr/local/tomcat/webapps        #映射数据卷
      - /opt/docker_mysql-tomcat/tomcat_logs:/usr/local/tomcat/logs        #映射数据卷

networks: #网路
  frontend:
  backend:

volumes: #目录挂载
  db-data: {}

configs: #全局配置


```



### docker compose 配置

- [docker compose 配置](https://gitee.com/zhengqingya/docker-compose/tree/master/Liunx)



#### docker-compose-mysql.yml

```yaml
version: '3'
services:
  mysql:
    image: registry.cn-hangzhou.aliyuncs.com/zhengqing/mysql5.7  #原镜像`mysql:5.7`
    container_name: mysql                                        #容器名为'mysql'
    restart: always                                              #指定容器退出后的重启策略为始终重启
    volumes:                                                     #数据卷挂载路径设置,将本机目录映射到容器目录
      - "./mysql/my.cnf:/etc/mysql/my.cnf"
      - "./mysql/data:/var/lib/mysql"
      - "./mysql/conf.d:/etc/mysql/conf.d"
    environment:                        #设置环境变量,相当于docker run命令中的-e
      TZ: Asia/Shanghai
      LANG: en_US.UTF-8
      MYSQL_ROOT_PASSWORD: root         #设置root用户密码
      MYSQL_DATABASE: demo              #初始化的数据库名称
    ports:                              #映射端口
      - "3306:3306"
```



#### docker-compose-redis.yml

```yaml
version: '3'
services:
  redis:
    image: redis:latest #镜像'redis:latest'
    container_name: redis #容器名为'redis'
    restart: always #指定容器退出后的重启策略为始终重启
#command: redis-server /etc/redis/redis.conf --requirepass 123456 --appendonly yes #启动redis服务并添加密码为：123456,并开启redis持久化配置
    command: redis-server --requirepass 123456 --appendonly yes #启动redis服务并添加密码为：123456,并开启redis持久化配置
    environment:  #设置环境变量,相当于docker run命令中的-e
      TZ: Asia/Shanghai
      LANG: en_US.UTF-8
    volumes: #数据卷挂载路径设置,将本机目录映射到容器目录
      - "./redis/data:/data"
      #- "./redis/redis.conf:/etc/redis/redis.conf"  #`redis.conf`文件内容`http://download.redis.io/redis-stable/redis.conf`
    ports: #映射端口
      - "6379:6379"
```



#### docker-compose-tomcat.yml

```yaml
version: '3'
services:
  tomcat:
    image: tomcat                                                #原镜像`tomcat`
    container_name: tomcat                                       #容器名为'tomcat'
    restart: always                                              #指定容器退出后的重启策略为始终重启
    volumes:                                                     #数据卷挂载路径设置,将本机目录映射到容器目录
      - "./tomcat/webapps:/usr/local/tomcat/webapps"
    ports:                              #映射端口
      - "8081:8080"
```



#### docker-compose-nginx.yml

```yaml
version: '3'
services:
  nginx:
    image: nginx:latest                 #镜像`nginx:latest`
    container_name: nginx               #容器名为'nginx'
    restart: always                     #指定容器退出后的重启策略为始终重启
    volumes:                            #数据卷挂载路径设置,将本机目录映射到容器目录
      - "./nginx/conf/nginx.conf:/etc/nginx/nginx.conf"
      - "./nginx/conf/conf.d/default.conf:/etc/nginx/conf.d/default.conf"
      - "./nginx/html:/usr/share/nginx/html"
      - "./nginx/log:/var/log/nginx"
    environment:                        #设置环境变量,相当于docker run命令中的-e
      TZ: Asia/Shanghai
      LANG: en_US.UTF-8
    ports:                              #映射端口
      - "80:80"
```



#### docker-compose-rabbitmq.yml

```yaml
version: '3'
services:
  redis:
    image: rabbitmq:3-management        #镜像`rabbitmq:3-management` 【 注：该版本包含了web控制页面 】
    container_name: rabbitmq            #容器名为'rabbitmq'
    hostname: my-rabbit
    restart: always                     #指定容器退出后的重启策略为始终重启
    environment:                        #设置环境变量,相当于docker run命令中的-e
      TZ: Asia/Shanghai
      LANG: en_US.UTF-8
      RABBITMQ_DEFAULT_VHOST: my_vhost  #主机名
      RABBITMQ_DEFAULT_USER: admin      #登录账号
      RABBITMQ_DEFAULT_PASS: admin      #登录密码
    volumes:                            #数据卷挂载路径设置,将本机目录映射到容器目录
      - "./rabbitmq/data:/var/lib/rabbitmq"
    ports:                              #映射端口
      - "5672:5672"
      - "15672:15672"
```



### Docker Compose 搭建 Redis Cluster 集群环境

直接参考教程，步骤非常详细：

https://www.cnblogs.com/mrhelloworld/p/docker14.html



整体搭建步骤主要分为以下几步：

- 下载 Redis 镜像（其实这步可以省略，因为创建容器时，如果本地镜像不存在，就会去远程拉取）
- 编写 Redis 配置文件
- 编写 Docker Compose 模板文件
- 创建并启动所有服务容器
- 创建 Redis Cluster 集群



> 只是为了练习 redis-cluster 功能，这里就只在一台服务器上，开启六个 redis 服务

#### 编写 redis 配置文件

**创建目录及文件**

在 redis 集群的每一台服务器上执行以下操作：

```shell
#创建目录
mkdir -p /usr/local/docker-redis/redis-cluster
#切换至指定目录
cd /usr/local/docker-redis/redis-cluster/
#编写 redis-cluster.tmpl 文件
vi redis-cluster.tmpl

```



**编写配置文件**

`redis-cluster.tmpl` 文件内容如下：

```properties
port ${PORT}
requirepass 123456
masterauth 123456
protected-mode no
daemonize no
appendonly yes
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 10000
cluster-announce-ip 192.168.1.151
cluster-announce-port ${PORT}
cluster-announce-bus-port 1${PORT}
```

- `port`：节点端口；
- `requirepass`：添加访问认证；
- `masterauth`：如果主节点开启了访问认证，从节点访问主节点需要认证；
- `protected-mode`：保护模式，默认值 yes，即开启。开启保护模式以后，需配置 `bind ip` 或者设置访问密码；关闭保护模式，外部网络可以直接访问；
- `daemonize`：是否以守护线程的方式启动（后台启动），默认 no；
- `appendonly`：是否开启 AOF 持久化模式，默认 no；
- `cluster-enabled`：是否开启集群模式，默认 no；
- `cluster-config-file`：集群节点信息文件；
- `cluster-node-timeout`：集群节点连接超时时间；
- `cluster-announce-ip`：集群节点 IP，填写宿主机的 IP；
- `cluster-announce-port`：集群节点映射端口；
- `cluster-announce-bus-port`：集群节点总线端口。



每个 Redis 集群节点都需要打开**两个 TCP 连接**。一个用于为客户端提供服务的正常 Redis TCP 端口，例如 6379。还有一个基于 6379 端口加 10000 的端口，比如 16379。

第二个端口用于集群总线，这是一个使用二进制协议的节点到节点通信通道。节点使用集群总线进行故障检测、配置更新、故障转移授权等等。客户端永远不要尝试与集群总线端口通信，与正常的 Redis 命令端口通信即可，但是请确保防火墙中的这两个端口都已经打开，否则 Redis 集群节点将无法通信。



`redis-cluster` 目录下执行以下命令，批量创建配置文件：

```shell
for port in `seq 6371 6376`; do \
  mkdir -p ${port}/conf \
  && PORT=${port} envsubst < redis-cluster.tmpl > ${port}/conf/redis.conf \
  && mkdir -p ${port}/data;\
done

#执行后的结果
[root@dev0x01 redis-cluster]# ll
total 4
drwxr-xr-x. 4 root root  30 Jan 16 18:48 6371
drwxr-xr-x. 4 root root  30 Jan 16 18:48 6372
drwxr-xr-x. 4 root root  30 Jan 16 18:48 6373
drwxr-xr-x. 4 root root  30 Jan 16 18:48 6374
drwxr-xr-x. 4 root root  30 Jan 16 18:48 6375
drwxr-xr-x. 4 root root  30 Jan 16 18:48 6376
-rw-r--r--. 1 root root 275 Jan 16 18:46 redis-cluster.tmpl

[root@dev0x01 redis-cluster]# cd 6371
[root@dev0x01 6371]# ll
total 0
drwxr-xr-x. 2 root root 24 Jan 16 18:48 conf
drwxr-xr-x. 2 root root  6 Jan 16 18:48 data
[root@dev0x01 6371]# cd conf
[root@dev0x01 conf]# ll
total 4
-rw-r--r--. 1 root root 266 Jan 16 18:48 redis.conf
[root@dev0x01 conf]# cat redis.conf 
port 6371
requirepass 123456
masterauth 123456
protected-mode no
daemonize no
appendonly yes
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 10000
cluster-announce-ip 192.168.1.151
cluster-announce-port 6371
cluster-announce-bus-port 16371


```



#### 编写 Docker Compose 模板文件

在 `/usr/local/docker-redis` 目录下创建 `docker-compose.yml` 文件并编辑。

```yaml
version: "3.9"

services:
  redis-6371:
    image: redis
    container_name: redis-6371
    restart: always
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6371/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6371/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf

  redis-6372:
    image: redis
    container_name: redis-6372
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6372/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6372/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf

  redis-6373:
    image: redis
    container_name: redis-6373
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6373/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6373/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf

  redis-6374:
    image: redis
    container_name: redis-6374
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6374/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6374/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf

  redis-6375:
    image: redis
    container_name: redis-6375
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6375/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6375/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf

  redis-6376:
    image: redis
    container_name: redis-6376
    network_mode: "host"
    volumes:
      - /usr/local/docker-redis/redis-cluster/6376/conf/redis.conf:/usr/local/etc/redis/redis.conf
      - /usr/local/docker-redis/redis-cluster/6376/data:/data
    command: redis-server /usr/local/etc/redis/redis.conf

```



#### 创建并启动所有服务容器

在 `/usr/local/docker-redis` 目录下执行以下命令：

```shell
[root@dev0x01 docker-redis]# docker-compose up -d
Creating redis-6374 ... done
Creating redis-6375 ... done
Creating redis-6373 ... done
Creating redis-6376 ... done
Creating redis-6372 ... done
Creating redis-6371 ... done
[root@dev0x01 docker-redis]# docker-compose ps
   Name                 Command               State   Ports
-----------------------------------------------------------
redis-6371   docker-entrypoint.sh redis ...   Up           
redis-6372   docker-entrypoint.sh redis ...   Up           
redis-6373   docker-entrypoint.sh redis ...   Up           
redis-6374   docker-entrypoint.sh redis ...   Up           
redis-6375   docker-entrypoint.sh redis ...   Up           
redis-6376   docker-entrypoint.sh redis ...   Up  

```



#### 创建 Redis Cluster 集群

先确保你的两台机器可以互相通信，然后随便进入一个容器节点，并进入 `/usr/local/bin/` 目录：

```shell
#进入容器
docker exec -it redis-6371 bash
#切换至指定目录
cd /usr/local/bin/

#通过以下命令实现 Redis Cluster 集群的创建
redis-cli -a 123456 --cluster create 192.168.1.151:6371 192.168.1.151:6372 192.168.1.151:6373 192.168.1.151:6374 192.168.1.151:6375 192.168.1.151:6376 --cluster-replicas 1

#出现选择提示信息，输入 yes
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
>>> Performing hash slots allocation on 6 nodes...
Master[0] -> Slots 0 - 5460
Master[1] -> Slots 5461 - 10922
Master[2] -> Slots 10923 - 16383
Adding replica 192.168.1.151:6375 to 192.168.1.151:6371
Adding replica 192.168.1.151:6376 to 192.168.1.151:6372
Adding replica 192.168.1.151:6374 to 192.168.1.151:6373
>>> Trying to optimize slaves allocation for anti-affinity
[WARNING] Some slaves are in the same host as their master
M: dc0c59a1c472b12ea4117c71ea1e645ff12ff8f6 192.168.1.151:6371
   slots:[0-5460] (5461 slots) master
M: bd07c3866b6097789c6c1be45a50b75b774f00bc 192.168.1.151:6372
   slots:[5461-10922] (5462 slots) master
M: 005556d2f2c26f45dec59fe6e1cf901b4a348174 192.168.1.151:6373
   slots:[10923-16383] (5461 slots) master
S: b38d6f43185ef09ce0b0836fdbf603e271e2d02d 192.168.1.151:6374
   replicates dc0c59a1c472b12ea4117c71ea1e645ff12ff8f6
S: 5307fc85392e99c059297ff143f3536eba97b2dc 192.168.1.151:6375
   replicates bd07c3866b6097789c6c1be45a50b75b774f00bc
S: b8a358529b6028fb4758a5f7d17791f6d3af8143 192.168.1.151:6376
   replicates 005556d2f2c26f45dec59fe6e1cf901b4a348174
Can I set the above configuration? (type 'yes' to accept): yes
>>> Nodes configuration updated
>>> Assign a different config epoch to each node
>>> Sending CLUSTER MEET messages to join the cluster
Waiting for the cluster to join

>>> Performing Cluster Check (using node 192.168.1.151:6371)
M: dc0c59a1c472b12ea4117c71ea1e645ff12ff8f6 192.168.1.151:6371
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
S: b8a358529b6028fb4758a5f7d17791f6d3af8143 192.168.1.151:6376
   slots: (0 slots) slave
   replicates 005556d2f2c26f45dec59fe6e1cf901b4a348174
M: bd07c3866b6097789c6c1be45a50b75b774f00bc 192.168.1.151:6372
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: b38d6f43185ef09ce0b0836fdbf603e271e2d02d 192.168.1.151:6374
   slots: (0 slots) slave
   replicates dc0c59a1c472b12ea4117c71ea1e645ff12ff8f6
S: 5307fc85392e99c059297ff143f3536eba97b2dc 192.168.1.151:6375
   slots: (0 slots) slave
   replicates bd07c3866b6097789c6c1be45a50b75b774f00bc
M: 005556d2f2c26f45dec59fe6e1cf901b4a348174 192.168.1.151:6373
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.


```



#### 查看集群状态

```shell
#进入容器
docker exec -it redis-6371 bash
#切换至指定目录
cd /usr/local/bin/

#检查集群中的某一个节点
redis-cli -a 123456 --cluster check 192.168.1.151:6375


root@dev0x01:/usr/local/bin# redis-cli -a 123456 --cluster check 192.168.1.151:6375
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
192.168.1.151:6371 (dc0c59a1...) -> 0 keys | 5461 slots | 1 slaves.
192.168.1.151:6373 (005556d2...) -> 0 keys | 5461 slots | 1 slaves.
192.168.1.151:6372 (bd07c386...) -> 0 keys | 5462 slots | 1 slaves.
[OK] 0 keys in 3 masters.
0.00 keys per slot on average.
>>> Performing Cluster Check (using node 192.168.1.151:6375)
S: 5307fc85392e99c059297ff143f3536eba97b2dc 192.168.1.151:6375
   slots: (0 slots) slave
   replicates bd07c3866b6097789c6c1be45a50b75b774f00bc
M: dc0c59a1c472b12ea4117c71ea1e645ff12ff8f6 192.168.1.151:6371
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
M: 005556d2f2c26f45dec59fe6e1cf901b4a348174 192.168.1.151:6373
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: b38d6f43185ef09ce0b0836fdbf603e271e2d02d 192.168.1.151:6374
   slots: (0 slots) slave
   replicates dc0c59a1c472b12ea4117c71ea1e645ff12ff8f6
M: bd07c3866b6097789c6c1be45a50b75b774f00bc 192.168.1.151:6372
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: b8a358529b6028fb4758a5f7d17791f6d3af8143 192.168.1.151:6376
   slots: (0 slots) slave
   replicates 005556d2f2c26f45dec59fe6e1cf901b4a348174
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.


```



#### 查看集群信息和节点信息

```shell
#连接至集群某个节点
redis-cli -c -a 123456 -h 192.168.1.151 -p 6376
#查看集群信息
cluster info
#查看集群结点信息
cluster nodes


root@dev0x01:/usr/local/bin# redis-cli -c -a 123456 -h 192.168.1.151 -p 6376
Warning: Using a password with '-a' or '-u' option on the command line interface may not be safe.
192.168.1.151:6376> cluster info
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:3
cluster_stats_messages_ping_sent:410
cluster_stats_messages_pong_sent:389
cluster_stats_messages_meet_sent:1
cluster_stats_messages_sent:800
cluster_stats_messages_ping_received:389
cluster_stats_messages_pong_received:411
cluster_stats_messages_received:800
192.168.1.151:6376> cluster nodes
b38d6f43185ef09ce0b0836fdbf603e271e2d02d 192.168.1.151:6374@16374 slave dc0c59a1c472b12ea4117c71ea1e645ff12ff8f6 0 1610796150516 1 connected
dc0c59a1c472b12ea4117c71ea1e645ff12ff8f6 192.168.1.151:6371@16371 master - 0 1610796151541 1 connected 0-5460
005556d2f2c26f45dec59fe6e1cf901b4a348174 192.168.1.151:6373@16373 master - 0 1610796151028 3 connected 10923-16383
5307fc85392e99c059297ff143f3536eba97b2dc 192.168.1.151:6375@16375 slave bd07c3866b6097789c6c1be45a50b75b774f00bc 0 1610796151000 2 connected
b8a358529b6028fb4758a5f7d17791f6d3af8143 192.168.1.151:6376@16376 myself,slave 005556d2f2c26f45dec59fe6e1cf901b4a348174 0 1610796150000 3 connected
bd07c3866b6097789c6c1be45a50b75b774f00bc 192.168.1.151:6372@16372 master - 0 1610796148475 2 connected 5461-10922

```



#### SET/GET 测试

在 6371 节点中执行写入和读取，命令如下：

```shell
#进入容器并连接至集群某个节点
docker exec -it redis-6371 /bin/bash
redis-cli -c -a 123456 -h 192.168.1.151 -p 6371
#写入数据
set name mrhelloworld
set aaa 111
set bbb 222
#读取数据
get name
get aaa
get bbb
```


- 首先进入容器并连接至集群某个节点；
- 然后执行**第一个** set 命令 `set name mrhelloworld`，`name` 键根据哈希函数运算以后得到的值为 `[5798]`。当前集群环境的槽分配情况为：`[0-5460] 6371节点`，`[5461-10922] 6374节点`，`[10923-16383] 6372节点`，所以该键的存储就被分配到了 **6374** 节点上；
- 再来看**第二个** set 命令 `set aaa`，这里大家可能会有一些疑问，为什么看不到 `aaa` 键根据哈希函数运算以后得到的值？因为刚才重定向至 **6374** 节点插入了数据，此时如果还有数据插入，正好键根据哈希函数运算以后得到的值也还在该节点的范围内，那么直接插入数据即可；
- 接着是**第三个** set 命令 `set bbb`，`bbb` 键根据哈希函数运算以后得到的值为 `[5287]`，所以该键的存储就被分配到了 **6371** 节点上；
- 然后是读取操作，**第四个**命令 `get name`，`name` 键根据哈希函数运算以后得到的值为 `[5798]`，被重定向至 **6374** 节点读取；
- **第五个**命令 `get aaa`，`aaa` 键根据哈希函数运算以后得到的值也在 **6374** 节点，直接读取；
- **第六个**命令 `get bbb`，`bbb` 键根据哈希函数运算以后得到的值为 `[5287]`，被重定向至 **6371** 节点读取。



通过以上操作得知 `name` 键的存储被分配到了 6374 节点，如果直接连接 6374 节点并获取该值会怎么样？那就不需要重定向节点，因为数据就在该节点，所以直接读取返回。



## Docker Swarm









