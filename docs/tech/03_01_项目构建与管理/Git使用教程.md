---
title: Git使用教程
date: 2024-04-24 14:56:21
category:
    - 项目构建管理
tag:
    - Git
---

> 官方资料教程：[Git Pro](https://git-scm.com/book/zh/v2)



## 下载安装

### Linux 平台



### Mac 平台



### Windows 平台

下载地址：https://gitforwindows.org/

国内镜像：https://npm.taobao.org/mirrors/git-for-windows/



软件是英文的，安装过程基本是无脑下一步，也可以自己先看看每一步的英文描述，不清楚的地方，可以搜索相关安装教程，网上很多教程了。



安装完成

![image-20210410233926204](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/image-20210410233926204.png)



Git CMD：Windows 风格的命令行

Git Bash：Linux 风格的命令行，推荐使用

Git GUI：图形界面的Git，不建议初学者使用，先熟悉常用命令





## 在线练习

https://learngitbranching.js.org/?locale=zh_CN





## 配置操作

### 常用 Linux 命令

cd  改变目录

cd . . 回退到上一个目录，直接 cd 进入默认目录

pwd 显示当前所在的目录路径

ls(ll) 都是列出当前目录中的所有文件，只不过ll(两个ll)列出的内容更为详细

touch 新建一个文件 如 touch index.js 就会在当前目录下新建一个 index.js 文件

rm 删除一个文件, rm index.js 就会把 index.js 文件删除

mkdir 新建一个目录,就是新建一个文件夹

rm -r 删除一个文件夹, rm -r src 删除 src 目录

> rm -rf / 切勿在 Linux 中尝试！会强行删除电脑中全部文件！！

mv 移动文件，mv index.html src index.html 是要移动的文件，src 是目标文件夹，当然，这样写，必须保证文件和目标文件夹在同一目录下

reset 重新初始化终端/清屏

clear 清屏

history 查看命令历史

help 帮助

exit 退出

`#` 表示注释



更多命令参考：https://www.runoob.com/linux/linux-tutorial.html



### 常用配置

#### 查看配置

```shell
$ git config -l
diff.astextplain.textconv=astextplain
filter.lfs.clean=git-lfs clean -- %f
filter.lfs.smudge=git-lfs smudge -- %f
filter.lfs.process=git-lfs filter-process
filter.lfs.required=true
http.sslbackend=openssl
http.sslcainfo=D:/Program Files/Git/mingw64/ssl/certs/ca-bundle.crt
core.autocrlf=true
core.fscache=true
core.symlinks=false
pull.rebase=false
credential.helper=manager-core
credential.https://dev.azure.com.usehttppath=true
init.defaultbranch=master

## 查看不同级别的配置
## 查看系统 config
git config --system --list
　　
## 查看当前用户（global）配置
git config --global --list


```



#### Git 相关的配置文件

Git\etc\gitconfig  ：Git 安装目录下的 gitconfig   --system 系统级。

C:\Users\Administrator\ .gitconfig   只适用于当前登录用户的配置  --global 全局。

可以直接修改配置文件，或者通过命令行配置，也会写入配置文件。



#### 设置用户名与邮箱（用户标识，必要）

每次 Git 提交都会使用用户信息，会嵌入到了每次的提交信息。

```shell
git config --global user.name "M1Yellow"
git config --global user.email "m1yellow@163.com"

## 查看配置信息
git config --global --list
user.name=M1Yellow
user.email=M1Yellow@163.com


```



### 版本升级

- [windows更新git版本， git版本升级](https://blog.csdn.net/RedaTao/article/details/104398408)



**重新下载新版本安装包，覆盖安装即可**

Git官网下载：https://git-scm.com/download/win

> 官网地址下载速度可能很慢！可以尝试使用代理（梯子）、IDM多线程下载，或者非官方下载地址（注意资源校验）



**注意：**

升级之后，可能导致之前的全局配置参数重置（名称、邮箱、快捷键），需要查看确认

```bash
git config -l

```



### Git 下载设置代理

拉取代码速度、更新下载龟速，这种感觉就像你裤子都脱了，片儿还在几十KB的下载！！

尝试设置代理，首先得自备`梯子`。

git bash 执行

```bash
## 查看当前代理设置 ，注意：必须有代理服务器
git config --global http.proxy
git config --global https.proxy

## 查看所有配置
git config -l

## 使用http或者https代理
git config --global https.proxy http://127.0.0.1:1080'
git config --global https.proxy 'https://127.0.0.1:1080'

## 或者使用sock5代理
git config --global http.proxy 'socks5://127.0.0.1:51837'
git config --global https.proxy 'socks5://127.0.0.1:51837'

## 不校验ssl（一般不配置，出问题再配置）
git config --global http.sslverify false

## 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy


```

配置代理之后的速度，就好像是开了 VVIP 一样爽了！





## 工作原理

### 基本概念

- [Git 工作区、暂存区和版本库](https://www.runoob.com/git/git-workspace-index-repo.html)



- **工作区：**就是你在电脑里能看到的目录。
- **暂存区：**英文叫 stage 或 index。一般存放在 **.git** 目录下的 index 文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
- **本地仓库：**工作区有一个隐藏目录 **.git**，这个不算工作区，而是 Git 的版本库，也叫本地仓库。
- **远程仓库：**自己搭建的 Git 服务器，或 GitHub、Gitee。



### ★工作流程

![img](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/1229247-20180607090351818-24720413.jpg)


- 当对工作区修改（或新增）的文件执行 **git add .** 命令时，暂存区的目录树被更新，同时工作区修改（或新增）的文件内容被写入到对象库中的一个新的对象中，而该对象的ID被记录在暂存区的文件索引中。
- 当执行提交操作（git commit -m）时，暂存区的目录树写到版本库（对象库）中，master 分支会做相应的更新。即 master 指向的目录树就是提交时暂存区的目录树。
- 当执行 **git reset HEAD** 命令时，暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响。
- 当执行 **git rm --cached file** 命令时，会直接从暂存区删除文件，工作区则不做出改变。
- 当执行 **git checkout .** 或者 **git checkout -- file** 命令时，会用暂存区全部或指定的文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区的改动。
- 当执行 **git checkout HEAD .** 或者 **git checkout HEAD file** 命令时，会用 HEAD 指向的 master 分支中的全部或者部分文件替换暂存区和以及工作区中的文件。这个命令也是极具危险性的，因为不但会清除工作区中未提交的改动，也会清除暂存区中未提交的改动。





## 项目实战

### 命令别名

Git 并不会在你输入部分命令时自动推断出你想要的命令。 如果不想每次都输入完整的 Git 命令，可以通过 `git config` 文件来轻松地为每一个命令设置一个别名。 

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

## 取消暂存
git config --global alias.unstage 'reset HEAD --'
git unstage fileA
git reset HEAD -- fileA

## 查看最后提交信息
git config --global alias.last 'log -1 HEAD'
git last

```



### 创建工作目录

工作目录（WorkSpace），Git 管理的文件夹，可以是你项目的目录，也可以是一个空目录，建议不要有中文。



### 本地仓库搭建

创建本地仓库的方法有两种：一种是创建全新的仓库，另一种是克隆远程仓库。



#### git init 创建全新仓库

```shell
## 使用当前目录作为Git仓库，执行完后会在当前目录生成一个 .git 目录
git init

## 指定目录
git init mypages


```



#### git clone 克隆远程仓库

```shell
## 克隆一个项目和它的整个代码历史（版本信息）
git clone [url]

```



git clone 时，可以所用不同的协议，包括 ssh, git, https 等，其中最常用的是 ssh，因为速度较快，还可以配置公钥免输入密码。各种写法如下：

```shell
git clone git@github.com:fsliurujie/test.git         --SSH协议
git clone git://github.com/fsliurujie/test.git       --GIT协议
git clone https://github.com/fsliurujie/test.git     --HTTPS协议

```



### ★实际项目开发操作

```
查看代码状态
git status

对比修改内容
git diff 
git diff origin/release origin/dbg_ci_int -- src/main/resources/properties/vendor.properties
git diff --cached

指定追踪单个文件，将想要快照的内容写入缓存区
git add src/main/java/com/weshare/giraffe/model/dubbo/SignatureReqParameter.java

查看提交日志
git log 英文状态下按q退出

提交代码
git commit -m "RUS-180:modify russia number" 将缓存区内容添加到仓库中

修改注释
git commit --amend


【工作空间修改的代码，代码还原到分支HEAD状态】
git stash
Saved working directory and index state WIP on dev: aa5a952 Json 类库改为 Jackson
查看暂存列表
git stash list
stash@{0}: WIP on dev: aa5a952 Json 类库改为 Jackson
弹出缓存列表最近一个缓存
git stash pop
git stash apply

区别
git stash pop 只能从栈顶取数据
git stash apply 不会删除 stash 中的记录

指定下标数据
git stash list //查看暂存区的所有暂存修改
git stash apply stash@{X} //取出相应的暂存
git stash drop stash@{X} //将记录列表中取出的对应暂存记录删除


【项目合代码】
切换到master分支
git checkout master
git co -b dbg_xxx_rus197_offline_repayment_overdue_201904031
再 reset master 最新一次提交  git reset commit id，保持代码最新
git st

指定提交id，合并代码
git log dbg_ci_int
git cherry-pick 一个或多个 commit id，多个用空格分开
解决冲突后 git add .
git cherry-pick --continue
不想继续合并，可以终止
git cherry-pick --abort

git add .
git commit -m "修改内容备注"
git log
git push origin 远程:本地
git push origin dbg_xxx_rus197_offline_repayment_overdue_20190403:dbg_xxx_rus197_offline_repayment_overdue_20190403
远程分支如果不存在，且不允许自动创建，则需要手动创建远程分支
在提交的时候创建分支
git push --set-upstream dbg_xxx_rus197_offline_repayment_overdue_20190403:dbg_xxx_rus197_offline_repayment_overdue_20190403

GitHub 在 git bash 命令行中没有权限创建远程分支，需要手动登录网站，手动创建
本地有分支，github 无，推不上
本地有分支，github 有不同名的分支，推不上
本地有分支，github 有同名分支，能推
就在本地，创建一个跟 github 一样的分支（名称+HEAD）


--merged 与 --no-merged 这两个有用的选项可以过滤这个列表中已经合并或尚未合并到当前分支的分支。
如果要查看哪些分支已经合并到当前分支，可以运行 git branch --merged：
$ git branch --merged
 iss53
* master

因为之前已经合并了 iss53 分支，所以现在看到它在列表中。 在这个列表中分支名字前没有 * 号的分支通常可以使用 git branch -d 删除掉；
你已经将它们的工作整合到了另一个分支，所以并不会失去任何东西。

查看所有包含未合并工作的分支，可以运行 git branch --no-merged：
$ git branch --no-merged
 testing

这里显示了其他分支。 因为它包含了还未合并的工作，尝试使用 git branch -d 命令删除它时会失败：
$ git branch -d testing
error: The branch 'testing' is not fully merged.
If you are sure you want to delete it, run 'git branch -D testing'.
如果真的想要删除分支并丢掉那些工作，如同帮助信息里所指出的，可以使用 -D 选项强制删除它。



## others
-- 把代码推送到自己的远端分支 master为当前修改的分支  远端分支格式 dbg_xxx_lnxxx_2017xxxx
git fetch --all
git checkout dbg_ci_int -- 切换到本地dbg_ci_int
视图界面查看提交信息
gitk --all &
git cherry-pick 16a050b447 -- 拉去上面提交的代码到dbg_ci_int 
git push origin dbg_ci_int -- 以dbg_ci_int为基础讲代码push到远端dbg_ci_int(测试分支)
若出现：
To git@git.xx.com:server/harbor.git
! [rejected]        dbg_ci_int -> dbg_ci_int (fetch first)
error: failed to push some refs to 'git@git.xx.com:server/harbor.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

git fetch --all
git push origin dbg_ci_int
git rebase origin dbg_ci_int


git rebase origin/master       ===========>>>>从远程以master 更新到本地
gitk --all &  查看git提交记录
git branch -D dbg_ci_int       //   删除本地  dbg_ci_int 分支  
git fetch --all       ------- 本地更新所有远程分支代码
git rebase -i origin/master    合并本地提交记录


```





### ★文件操作

#### 文件的状态变化

![img](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/1204574-20180425163547215-1719844952.png)



版本控制就是对文件的版本控制，要对文件进行修改、提交等操作，首先要知道文件当前在什么状态，不然可能会提交了现在还不想提交的文件，或者要提交的文件没提交上。

- Untracked：未跟踪，此文件在文件夹中，但并没有加入到git库，不参与版本控制。通过 git add 状态变为 Staged。

- Unmodify：文件已经入库，未修改，即版本库中的文件快照内容与文件夹中完全一致。这种类型的文件有两种去处，如果它被修改，而变为Modified。如果使用 git rm 移出版本库，则成为 Untracked 文件。

- Modified：文件已修改，仅仅是修改，并没有进行其他的操作。这个文件也有两个去处， 通过 git add 可进入暂存 staged 状态，使用 git checkout 则丢弃修改过，返回到 unmodify 状态，这个 git checkout 即从库中取出文件，覆盖当前修改，有风险 !

- Staged：暂存状态， 执行 git commit 则将修改同步到库中，这时库中的文件和本地文件又变为一致，文件为 Unmodify 状态。执行git reset HEAD filename 取消暂存，文件状态为 Modified。

  



#### 查看文件状态

Git 管理的文件有三种状态：已修改（modified）、已暂存（staged）、已提交（committed）。

```shell
#查看指定文件状态
git status [filename]

#查看所有文件状态
git status

modified：修改状态，表示文件已被修改，但是尚未被暂存。
staged：暂存状态。
committed：已提交状态，表示数据文件已经被提交到本地数据仓库。

## git add .                  添加所有文件到暂存区
## git commit -m "消息内容"    提交暂存区中的内容到本地仓库 -m 提交信息

```



#### 忽略文件

有些时候我们不想把某些文件纳入版本控制中，比如数据库文件、临时文件、设计文件等。

在主目录下建立 ".gitignore" 文件，此文件有如下规则：

1. 忽略文件中的空行或以井号（#）开始的行将会被忽略。
2. 可以使用Linux通配符。例如：星号（*）代表任意多个字符，问号（？）代表一个字符，方括号（[abc]）代表可选字符范围，大括号（{string1,string2,...}）代表可选的字符串等。
3. 如果名称的最前面有一个感叹号（!），表示例外规则，将不被忽略。
4. 如果名称的最前面是一个路径分隔符（/），表示要忽略的文件在此目录下，而子目录中的文件不忽略。
5. 如果名称的最后面是一个路径分隔符（/），表示要忽略的是此目录下该名称的子目录，而非文件（默认文件或目录都忽略）。



```shell
#为注释
*.txt        #忽略所有 .txt 结尾的文件
!lib.txt     #但 lib.txt 除外
/temp        #仅忽略项目根目录下的temp文件夹，不包括其它目录temp
build/       #忽略任意位置下的build/目录下的所有文件
doc/*.txt    #会忽略 doc/notes.txt 但不包括 doc/server/arch.txt

```



#### 常用命令

| 命令         | 说明                                             |
| :----------- | :----------------------------------------------- |
| `git fetch`  | 从远程仓库拉取对应分支的最新代码                 |
| `git merge`  | 快速合并分支                                     |
| `git pull`   | 从远程仓库拉取对应分支的最新代码，合并到当前分支 |
| `git add`    | 添加文件到仓库                                   |
| `git status` | 查看仓库当前的状态，显示有变更的文件             |
| `git diff`   | 比较文件的不同，即暂存区和工作区的差异           |
| `git commit` | 提交暂存区到本地仓库                             |
| `git reset`  | 回退版本                                         |
| `git rm`     | 删除工作区文件                                   |
| `git mv`     | 移动或重命名工作区文件                           |
| `git stash`  | 暂存修改                                         |
| `git push`   | 将本地仓库代码推送到远程仓库                     |
| `git remote` | 操作远程仓库                                     |



##### git fetch

**git fetch** 命令用于从远程获取代码库。

该命令执行完后需要执行 git merge 远程分支到你所在的分支。

从远端仓库提取数据并尝试合并到当前分支：

```
git merge
```

该命令就是在执行 git fetch 之后紧接着执行 git merge 远程分支到你所在的任意分支。

假设你配置好了一个远程仓库，并且你想要提取更新的数据，你可以首先执行:

```
git fetch [alias]
```

以上命令告诉 Git 去获取它有你没有的数据，然后你可以执行：

```
git merge [alias]/[branch]
```

以上命令将服务器上的任何更新合并到你的当前分支。



实际开发

```bash
git fetch origin ## 从远程仓库拉取当前分支最新修改
git merge origin/dev ## 将更新同步到本地仓库

```



##### git pull

**git pull** 命令用于从远程获取代码并合并本地的版本。

**git pull** 其实就是 **git fetch** 和 **git merge FETCH_HEAD** 的简写。 命令格式如下：

```
git pull <远程主机名> <远程分支名>:<本地分支名>
git pull origin <source>:<destination>
```

`git pull --rebase` 就是 fetch 和 rebase 的简写



更新当前分支：

```
$ git pull
$ git pull origin
```

切换分支后更新：

```
git checkout master
git pull
```



将远程主机 origin 的 master 分支拉取过来，与本地的 brantest 分支合并。

```
git pull origin master:brantest
```

如果远程分支是与当前分支合并，则冒号后面的部分可以省略。

```
git pull origin master
```

上面命令表示，取回 origin/master 分支，再与本地的 brantest 分支合并。



##### git add

**git add** 命令可将该文件添加到暂存区。

添加一个或多个文件到暂存区：

```
git add [file1] [file2] ...
```

添加指定目录到暂存区，包括子目录：

```
git add [dir]
```

添加当前目录下的所有文件到暂存区：

```
git add .
```



##### git status

**git status** 命令用于查看在你上次提交之后是否有对文件进行再次修改。

```
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

    new file:   README
    new file:   hello.php
```

通常我们使用 **-s** 参数来获得简短的输出结果：

```
$ git status -s
AM README
A  hello.php
```

**AM** 状态的意思是这个文件在我们将它添加到缓存之后又有改动。



##### git diff

git diff 命令比较文件的不同，即比较文件在暂存区和工作区的差异。

git diff 命令显示已写入暂存区和已经被修改但尚未写入暂存区文件对区别。

git diff 有两个主要的应用场景。

- 尚未缓存的改动：**git diff**
- 查看已缓存的改动： **git diff --cached**
- 查看已缓存的与未缓存的所有改动：**git diff HEAD**
- 显示摘要而非整个 diff：**git diff --stat**

显示暂存区和工作区的差异:

```
$ git diff [file]
```

显示暂存区和上一次提交(commit)的差异:

```
$ git diff --cached [file]
或
$ git diff --staged [file]
```

显示两次提交之间的差异:

```
$ git diff [first-branch]...[second-branch]
```



##### git commit

**git commit** 命令将暂存区内容添加到本地仓库中。

提交暂存区到本地仓库中:

```
git commit -m [message]
```

[message] 可以是一些备注信息。

提交暂存区的指定文件到仓库区：

```
$ git commit [file1] [file2] ... -m [message]
```

**-a** 参数设置修改文件后不需要执行 git add 命令，直接来提交

```
$ git commit -a
```

设置提交代码时的用户信息

开始前我们需要先设置提交的用户信息，包括用户名和邮箱：

```
$ git config --global user.name 'test'
$ git config --global user.email test@162.com
```

如果去掉 --global 参数只对当前仓库有效。



##### git reset

**git reset** 命令用于回退版本，可以指定退回某一次提交的版本。

git reset 命令语法格式如下：

```
git reset [--soft | --mixed | --hard] [HEAD]
```

**--mixed** 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。

```
git reset  [HEAD] 
```

实例：

```
$ git reset HEAD^            ## 回退所有内容到上一个版本  
$ git reset HEAD^ hello.php  ## 回退 hello.php 文件的版本到上一个版本  
$ git  reset  052e           ## 回退到指定版本
```

**--soft** 参数用于回退到某个版本：

```
git reset --soft HEAD
```

实例：

$ git reset --soft HEAD~3 ## 回退上上上一个版本

**--hard** 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交：

```
git reset --hard HEAD
```

实例：

```
$ git reset –hard HEAD~3  ## 回退上上上一个版本  
$ git reset –hard bae128  ## 回退到某个版本回退点之前的所有信息。 
$ git reset --hard origin/master    ## 将本地的状态回退到和远程的一样 
```

**注意：**谨慎使用 –hard 参数，它会删除回退点之前的所有信息。

**HEAD 说明：**

- HEAD 表示当前版本

- HEAD^ 上一个版本

- HEAD^^ 上上一个版本

- HEAD^^^ 上上上一个版本

  

- 以此类推...

  

可以使用 ～数字表示

- HEAD~0 表示当前版本
- HEAD~1 上一个版本
- HEAD^2 上上一个版本
- HEAD^3 上上上一个版本
- 以此类推...



##### git rm

git rm 命令用于删除文件。

如果只是简单地从工作目录中手工删除文件，运行 **git status** 时就会在 **Changes not staged for commit** 的提示。

git rm 删除文件有以下几种形式：

1、将文件从暂存区和工作区中删除：

```
git rm <file>
```

以下实例从暂存区和工作区中删除 test.txt 文件：

```
git rm test.txt 
```

如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 **-f**。

强行从暂存区和工作区中删除修改后的 test.txt 文件：

```
git rm -f test.txt 
```

如果想把文件从暂存区域移除，但仍然希望保留在当前工作目录中，换句话说，仅是从跟踪清单中删除，使用 **--cached** 选项即可：

```
git rm --cached <file>
```

以下实例从暂存区中删除 test.txt 文件：

```
git rm --cached test.txt
```



**实例**

删除 hello.php 文件：

```
$ git rm hello.php 
rm 'hello.php'
$ ls
README
```

文件从暂存区域移除，但工作区保留：

```
$ git rm --cached README 
rm 'README'
$ ls
README
```

可以递归删除，即如果后面跟的是一个目录做为参数，则会递归删除整个目录中的所有子目录和文件：

```
git rm –r * 
```

进入某个目录中，执行此语句，会删除该目录下的所有文件和子目录。



##### git mv

git mv 命令用于移动或重命名一个文件、目录或软连接。

```
git mv [file] [newfile]
```

如果新但文件名已经存在，但还是要重命名它，可以使用 **-f** 参数：

```
git mv -f [file] [newfile]
```

我们可以添加一个 README 文件（如果没有的话）：

```
$ git add README 
```

然后对其重命名:

```
$ git mv README  README.md
$ ls
README.md
```



##### git stash

https://www.git-scm.com/docs/git-stash

```bash
git stash list [<log-options>]
git stash show [-u|--include-untracked|--only-untracked] [<diff-options>] [<stash>]
git stash drop [-q|--quiet] [<stash>]
git stash ( pop | apply ) [--index] [-q|--quiet] [<stash>]
git stash branch <branchname> [<stash>]
git stash [push [-p|--patch] [-S|--staged] [-k|--[no-]keep-index] [-q|--quiet]
	     [-u|--include-untracked] [-a|--all] [-m|--message <message>]
	     [--pathspec-from-file=<file> [--pathspec-file-nul]]
	     [--] [<pathspec>…​]]
git stash clear
git stash create [<message>]
git stash store [-m|--message <message>] [-q|--quiet] <commit>

```



```bash
## 默认暂存位置、注释
git stash
Saved working directory and index state WIP on dev: aa5a952 Json 类库改为 Jackson
## 指定暂存注释
git stash -m "临时修改"
stash@{0}: On dev: 临时修改

#查看暂存列表
git stash list
stash@{0}: WIP on dev: aa5a952 Json 类库改为 Jackson

#弹出缓存列表最近一个缓存
git stash pop
git stash apply

区别
git stash pop 只能从栈顶取数据
git stash apply 不会删除 stash 中的记录

指定下标数据
git stash apply stash@{x}
git stash drop stash@{x}


```



##### git push

**git push** 命用于从将本地的分支版本上传到远程并合并。

命令格式如下：

```
git push <远程主机名> <本地分支名>:<远程分支名>
```

如果本地分支名与远程分支名相同，则可以省略冒号：

```
git push <远程主机名> <本地分支名>
```



将本地的 master 分支推送到 origin 主机的 master 分支。

```
$ git push origin master
```

相等于：

```
$ git push origin master:master
```

如果本地版本与远程版本有差异，但又要强制推送可以使用 --force 参数：

```
git push --force origin master
```

删除主机但分支可以使用 --delete 参数，以下命令表示删除 origin 主机的 master 分支：

```
git push origin --delete master
```



##### git log

- [Git 查看提交历史](https://www.runoob.com/git/git-commit-history.html)



Git 提交历史一般常用两个命令：

- **git log** - 查看历史提交记录。
- **git blame \<file\>** - 以列表形式查看指定文件的历史修改记录。



git log 查看当前仓库的历史记录

git log --oneline 查看历史记录的简洁的版本

git --graph 查看历史中什么时候出现了分支、合并

git log --reverse --oneline 可以用 --reverse 参数来逆向显示所有日志

git log --author=Linus --oneline -5 指定用户、指定记录条数的提交日志

 git log --oneline --before={3.weeks.ago} --after={2010-04-18} --no-merges 指定日期，可以执行几个选项：--since 和 --before，也可以用 --until 和 --after（例如，看 Git 项目中三周前且在四月十八日之后的所有提交，--no-merges 选项以隐藏合并提交）



按大写`Q`退出日志。



**git blame**

如果要查看指定文件的修改记录可以使用 git blame 命令，格式如下：

```bash
git blame <file>

git blame README.md
6c2706dc (M1Yellow 2021-04-11 16:09:12 +0800   1) ## mypages
18490293 (M1Yellow 2021-04-11 16:41:49 +0800   2)
dc443fad (M1Yellow 2021-04-12 14:01:00 +0800   3) **我的主页我定义！**<br>
6c2706dc (M1Yellow 2021-04-11 16:09:12 +0800   4) Define the homepage of your interest.

```



#### ★撤销操作

- [Git 基础 - 撤消操作](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)
- [Git 工具 - 重置揭密](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86)



##### git reset

> `git reset` 通过把分支记录回退几个提交记录来实现撤销改动。会改动提交记录。`git reset` 向上移动分支，原来指向的提交记录就跟从来没有提交过一样。
>
> reset 对已push到远程的提交无效，远程分支使用 `git revert`
>
> git reset、git checkout 需谨慎，会覆盖文件修改，导致修改内容丢失

```bash
【修改注释】
git commit --amend
git commit -m 'initial commit'
git add forgotten_file
git commit --amend

amend 修补提交，由于疏忽遗漏了文件，及时弥补


【git 取消文件追踪】
1、当被跟踪的文件里面有不想跟踪的文件时，使用命令git rm删除文件。如：
git rm --cached readme1.txt 删除readme1.txt的跟踪，并保留在本地。
git rm --f readme1.txt 删除readme1.txt的跟踪，并且删除本地文件。
git rm --cached .mvn -r
然后git commit即可。但是git status查看状态时还是会列出来。

2、每次用git status查看状态时总是列出未被跟踪的文件，可以通过.gitignore文件达到目的。


一、放弃修改，还原文件，修改丢失
未使用 git add 缓存代码时。
可以使用 git checkout -- filepathname (比如： git checkout -- readme.md  ，不要忘记中间的 “--” ，不写就成了检出分支了！！)。放弃所有的文件修改可以使用 "git checkout ." 命令。
当执行 git checkout . 或者 git checkout -- <file> 命令时，会用暂存区全部或指定的文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区的改动。

已使用 git add 缓存
执行 git checkout HEAD . 或者 git checkout HEAD <file> 命令，会用 HEAD 指向的 master 分支中的全部或者部分文件替换暂存区和以及工作区中的文件。这个命令也是极具危险性的，因为不但会清除工作区中未提交的改动，也会清除暂存区中未提交的改动。


二、已经使用了  git add 缓存了代码
可以使用  git reset HEAD filepathname （比如： git reset HEAD readme.md）来放弃指定文件的缓存，放弃所有缓存可以使用 "git reset HEAD" 命令。
此命令用来清除 git  对于文件修改的缓存。相当于撤销 git add 命令所在的工作。在使用本命令后，本地的修改并不会消失。


三、已经用 git commit  提交了代码，未push
git reset [ --mixed | --soft | --hard] [<commit ID>]

1.使用参数--mixed(默认参数)，如git reset --mixed <commit ID>或git reset <commit ID>
撤销git commit，撤销git add，保留编辑器改动代码
git reset --mixed HEAD^
保留工作区，回退暂存区、本地仓库

2.使用参数--soft，如git reset --soft<commit ID>
撤销git commit，不撤销git add，保留编辑器改动代码
只回退本地仓库HEAD修改，工作区和暂存区不回退

3.使用参数--hard，如git reset --hard <commit ID>——此方式非常暴力，全部撤销，慎用
撤销git commit，撤销git add，删除编辑器改动代码
工作区、暂存区、本地仓库全部回退，会导致本地修改丢失！！

4.使用参数--keep
工作区、本地仓库HEAD回退，暂存区保留，可能需要处理工作区和暂存区的冲突


详细回退原理细节，可以看官方文档：
[Git 工具 - 重置揭密](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86)


HEAD 说明：
HEAD 表示当前版本
HEAD^ 上一个版本
HEAD^^ 上上一个版本
HEAD^^^ 上上上一个版本
以此类推...

可以使用 ～数字表示
HEAD~0 表示当前版本
HEAD~1 上一个版本
HEAD~2 上上一个版本
HEAD~3 上上上一个版本
以此类推...

```



##### git revert

- [git-revert](https://git-scm.com/docs/git-revert/zh_HANS-CN)

- [【git revert】使用以及理解（详解）](https://blog.csdn.net/allanGold/article/details/111372750)
- [git-revert 如何撤销提交（回滚）](https://zhuanlan.zhihu.com/p/556113321)



```shell
revert 常规 commit
git revert <commit id>

revert merge commit
git revert -m <parent-number> <commit id>
git revert -m 1 C6

git revert HEAD 撤销前一次 commit
git revert HEAD^ 撤销前前一次 commit
git revert commit id 撤销指定的版本，撤销操作会产生提交记录

git revert -n C1..C4 连续撤销多个提交(C1, C4]，`-n` 不用确认提交信息

revert 冲突处理后
git revert --abort 啥也不干，回到原始状态
git revert --quit 退出，保留冲突现场
git revert --continue 继续往下

合并后解决冲突，继续操作
git add .
git commit -m "xxxx"

```



##### 两者区别

- git reset 回退到指定的 commit-id，相当于删除了 commit-id 以后的所有的提交，并且不会产生新的 commit-id 记录，提交远程仓库需要加上 `-f` 强制推送
- git revert 反做撤销指定的commit-id，不影响其他commit-id提交，会重新生成一个commit-id，提交远程仓库不需要强制推送



### 仓库管理

添加远程版本库：

```
git remote add [shortname] [url]
```

shortname 为本地的版本库，例如：

```
## 提交到 Github
$ git remote add origin git@github.com:test/test-git-test.git
$ git push -u origin master
```

- origin 是远程仓库的别名，可以任意取。
- 可能没有权限



删除远程仓库：

```
git remote rm name  ## 删除远程仓库，注意，可能没有权限

```



修改远程仓库：

```console
git remote rename old_name new_name  ## 修改仓库名
git remote rename pb paul

```



查看远程仓库：

```console
git remote -v ## 显示所有远程仓库
git remote show [remote] ## 显示某个远程仓库的信息

```





### ★分支管理

#### 创建分支

```shell
## 本地仓库创建分支
git branch (branchname)
git checkout -b (branchname) ## 创建新分支并立即切换到该分支下

## 创建空的远程分支
git checkout -b 分支名;  #创建分支
git push --set-upstream origin 分支名;  #提交分支到远程仓库，--set-upstream 提交新分支，并建立分支跟踪
#例如创建远程分支master_branch
git checkout -b master_branch
git push --set-upstream origin master_branch

## 以已有的远程分支为源创建新的远程分支
git checkout -b 分支名 origin/已有的远程分支; #创建分支
git push --set-upstream origin 分支名; #提交分支到远程仓库
#例如将已有的master为源，创建远程分支master_branch
git checkout -b master_branch origin/master
git push --set-upstream origin master_branch

```



#### 删除分支

```shell
## 删除本地仓库分支
git branch -d (branchname)
git branch -d test

## 删除远程分支
git push --delete origin [branch-name]
## 或者
git branch -r -d origin/分支名
git push origin :分支名
#例如 删除远程仓库中的test
git branch -r -d origin/test
git push origin :test

## git 删除缓存的远程分支列表
使用git 部署代码，git branch -a 里面列出的很多远程的分支，其实都是已经被删除了的。
可在git pull，他们仍旧是存在

git remote prune origin
## 或者
git fetch -p

```



#### 修改分支

##### 合并分支

###### git merge 常规合并

> 保留原有提交点和分支结构，新增一个提交点

```shell
## 合并指定分支到当前分支
git merge <source>
git checkout master
git merge dev
git log
git push

合并中断，回到合并前的状态
git merge --abort
合并退出，保留“车祸”冲突现场
git merge --quit

```



###### git rebase 变基合并

- [Git 分支 - 变基](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)



> Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。
>
> Rebase 的优势就是可以创造更线性的提交历史，这听上去有些难以理解。如果只允许使用 Rebase 的话，代码库的提交历史将会变得异常清晰。
>
> https://learngitbranching.js.org/?locale=zh_CN



```shell
git rebase <destination> 把当前分支变基合并到目标分支
git checkout bugFix
git rebase main

```



![image-20240424071943615](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/image-20240424071943615.png)



整理一个分支的提交到另一个分支上，只保留主要分支，让分支看起来更简洁。

在 Git 中整合来自不同分支的修改主要有两种方法：`merge` 以及 `rebase`。

可以使用 `rebase` 命令将提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样。



![分叉的提交历史。](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/basic-rebase-1.png)

整合分支最容易的方法是 `merge` 命令。 它会把两个分支的最新快照（`C3` 和 `C4`）以及二者最近的共同祖先（`C2`）进行三方合并，合并的结果是生成一个新的快照（并提交）。

![通过合并操作来整合分叉了的历史。](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/basic-rebase-2.png)

通过**变基（rebase）**合并，可以检出 `experiment` 分支，然后将它变基到 `master` 分支上：

```bash
$ git checkout experiment
$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: added staged command
```

它的原理是首先找到这两个分支（即当前分支 `experiment`、变基操作的目标基底分支 `master`） 的最近共同祖先 `C2`，然后对比当前分支相对于该祖先的历次提交，提取相应的修改并存为临时文件， 然后将当前分支指向目标基底 `C3`, 最后以此将之前另存为临时文件的修改依序应用。 （译注：写明了 commit id，以便理解，下同）

![将 `C4` 中的修改变基到 `C3` 上。](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/basic-rebase-3.png)

将 `C4` 中的修改变基到 `C3` 上

现在回到 `master` 分支，进行一次快进合并。

```bash
$ git checkout master
$ git merge experiment
```

![`master` 分支的快进合并。](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/basic-rebase-4.png)



**C4' 是一个新的提交id吗？**

不是，**变基（rebase）**最终没有产生新的提交。



实际项目开发，为了保留开发记录，通常不会进行变基操作。

如果是个人开发，为了保证分支的简洁性，一般都会进行变基（合并分支）操作。



变基的目的是为了确保在向远程分支推送时能保持提交历史的整洁——例如向某个其他人维护的项目贡献代码时。 在这种情况下，你首先在自己的分支里进行开发，当开发完成时你需要先将你的代码变基到 `origin/master` 上，然后再向主项目提交修改。 这样的话，该项目的维护者就不再需要进行整合工作，只需要快进合并便可。



**rebase 会自动关联分支上的提交点**

![image-20240423170605858](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/image-20240423170605858.png)

```shell
git rebase bugFix side 会把 C4 C5 C6 合并到 C3'

```



###### 交互式 rebase

弹出提交记录框，以便选择提交记录和顺序。

`cherry-pick` 可以指定提交记录和顺序，但需要提前知道提交ID

交互式 rebase 指的是使用带参数 `--interactive` 的 rebase 命令, 简写为 `-i`

如果你在命令后增加了这个选项, Git 会打开一个 UI 界面并列出将要被复制到目标分支的备选提交记录，它还会显示每个提交记录的哈希值和提交说明，提交说明有助于你理解这个提交进行了哪些更改。



##### 重命名分支

- [Git 分支重命名 git rename branch](https://blog.csdn.net/qq_37148270/article/details/107106392)



```shell
【本地分支】
在当前分支时
git branch -m new_branch_name

当不在当前分支时
git branch -m old_branch_name new_branch_name

【远程分支】
重命名远端分支（假设是在当前分支，并且远端分支与本地分支名是一致的）
重命名本地分支
git branch -m new_branch_name

删除远程分支
git push --delete origin old_branch_name

上传新命名的本地分支
git push origin new_branch_name

关联修改后的本地分支与远程分支
git branch --set-upstream-to origin/new_branch_name

```




#### 切换分支

```shell
git checkout (branchname)
git checkout dev

```

当你切换分支的时候，Git 会用该分支的最后提交的快照替换你的工作目录的内容， 所以多个分支不需要多个目录。



#### 查看分支

```shell
## 查看当前所在分支
git branch
## 查看所有分支
git branch -a

## 查看远程分支
git branch -r

## 查看远程各分支的最新提交
git branch -r -v

```



#### 查看和移动分支 HEAD

```shell
`cat .git/HEAD` 查看 HEAD 指向

`git symbolic-ref HEAD` 查看 HEAD 指向的引用

`git checkout CID` 指定提交id，即可移动 HEAD 指向

## 移动 HEAD
git checkout HEAD^^
git checkout HEAD~2
git checkout HEAD~^2~2	`^2`指定第二个父节点

## 分支强制将 HEAD 往前移动指定位置
git branch -f main CID
git branch -f main HEAD~3

```



[Level 两个 parent 节点](https://learngitbranching.js.org/?locale=zh_CN)

![image-20240424074719985](https://www.m1yellow.cn/doc-img/Git%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.assets/image-20240424074719985.png)



#### 跟踪分支

从一个远程跟踪分支检出一个本地分支会自动创建所谓的“跟踪分支”（它跟踪的分支叫做“上游分支”）。 跟踪分支是与远程分支有直接关系的本地分支。 如果在一个跟踪分支上输入 `git pull`，Git 能自动地识别去哪个服务器上抓取、合并到哪个分支。

当克隆一个仓库时，它通常会==自动地创建==一个跟踪 `origin/master` 的 `master` 分支。



##### 手动设置

如果想设置其他的跟踪分支，或是一个在其他远程仓库上的跟踪分支，又或者不跟踪 `master` 分支。

```console
$ git checkout --track origin/serverfix
Branch serverfix set up to track remote branch serverfix from origin.
Switched to a new branch 'serverfix'
```

由于这个操作太常用了，该捷径本身还有一个捷径。 如果你尝试检出的分支 (a) 不存在且 (b) 刚好只有一个名字与之匹配的远程分支，那么 Git 就会为你创建一个跟踪分支：

```console
$ git checkout serverfix
Branch serverfix set up to track remote branch serverfix from origin.
Switched to a new branch 'serverfix'
```

如果想要将本地分支与远程分支设置为不同的名字，你可以轻松地使用上一个命令增加一个不同名字的本地分支：

```console
$ git checkout -b sf origin/serverfix
Branch sf set up to track remote branch serverfix from origin.
Switched to a new branch 'sf'
```

现在，本地分支 `sf` 会自动从 `origin/serverfix` 拉取。



##### 修改跟踪分支

设置已有的本地分支跟踪一个刚刚拉取下来的远程分支，或者想要修改正在跟踪的上游分支， 你可以在任意时间使用 `-u` 或 `--set-upstream-to` 选项运行 `git branch` 来显式地设置。

```console
$ git branch -u origin/serverfix
Branch serverfix set up to track remote branch serverfix from origin.
```



##### 查看跟踪分支

如果想要查看设置的所有跟踪分支，可以使用 `git branch` 的 `-vv` 选项。 这会将所有的本地分支列出来并且包含更多的信息，如每一个分支正在跟踪哪个远程分支与本地分支是否是领先、落后或是都有。

```console
$ git branch -vv
  iss53     7e424c3 [origin/iss53: ahead 2] forgot the brackets
  master    1ae2a45 [origin/master] deploying index fix
* serverfix f8674d9 [teamone/server-fix-good: ahead 3, behind 1] this should do it
  testing   5ea463a trying something new
```


#### 仓库分支复制到另一个仓库分支

如果A是已有仓库，B是新建立的空仓库。

1、在本地拉一下（git clone）A仓库的代码，或者是git pull 下最新的代码。

2、git remote   ## 查看本地连接的有哪些 远程仓库，默认是 origin

3、git remote add origin2(这个名字随便起) master   ## 这里是在本地添加一个新的远程连接

4、git remote set-url origin2 B仓库的地址   ## 这里是新加个远程连接 设置上url地址

5、在A的本地仓库  git push origin2 dev:master   ## origin2 是你想push上哪个远程库，dev 是你想push哪个分支，master 是push到远程的哪个分支。    这个命令执行以后要输密码，记得是新仓库的密码。



#### 从一个git仓库拷贝到另一个git仓库（包含全部分支）

利用git从一个仓库拷贝一个项目到另一个仓库，并且log也能够一起过去。

1、从原地址克隆一份裸版本库，比如原本托管于 GitHub。

```
git clone --bare http://github....(原始仓库地址)
```

 2、进入克隆下来的目录

cd project.git（project即为你的项目名称）

3、以镜像推送的方式上传代码到新的仓库地址。

git push --mirror http：//...(目标仓库地址)



### 标签管理

#### 标签介绍

发布一个版本时，我们通常先在版本库中打一个标签（tag），这样就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。

所以，标签也是版本库的一个快照。

Git 的标签虽然是版本库的快照，但其实它就是指向某个 commit 的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。

> Git有commit，为什么还要引入tag？
>
> "请把上周一的那个版本打包发布，commit号是6a5819e…"
>
> "一串乱七八糟的数字不好找！"
>
> 如果换一个办法：
>
> "请把上周一的那个版本打包发布，版本号是v1.2"
>
> "好的，按照tag v1.2查找commit就行！"
>
> 所以，tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起。

同大多数 VCS 一样，Git 也可以对某一时间点上的版本打上标签。在发布某个软件版本（比如 v1.0 等等）的时候，经常这么做。



#### 标签操作

Git 使用的标签有两种类型：**轻量级的（lightweight）**和**含附注的（annotated）**。

轻量级标签就像是个不会变化的分支，实际上它就是个指向特定提交对象的引用。

而含附注标签，实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，电子邮件地址和日期，以及标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证。

一般我们都建议使用含附注型的标签，以便保留相关信息；

当然，如果只是临时性加注标签，或者不需要旁注额外信息，用轻量级标签也没问题。



```shell
## 给最新一次提交打上（HEAD）"v1.0"的标签
git tag -a v1.0 

## 查看带标签的日志
git log --decorate

## 追加标签
git tag -a v0.9 85fc7e7

## 查看所有标签
$ git tag
v0.9
v1.0

## 删除标签
git tag -d v0.9

## 查看此版本所修改的内容
git show v1.0

```

指定标签信息命令：

```shell
git tag -a <tagname> -m "测试标签"
```

PGP签名标签命令：

```shell
git tag -s <tagname> -m "测试标签"
```



### GitHub

- [Windows 环境中使用 Git 上传项目到 GitHub](https://learnku.com/articles/43312)
- [如何将本地的项目上传到github](https://blog.csdn.net/hacker_zrq/article/details/111595231)



#### 生成本机密钥

```shell
$ ssh-keygen -t rsa -C "m1yellow@163.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/xxx/.ssh/id_rsa):
Created directory '/c/Users/xxx/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/xxx/.ssh/id_rsa
Your public key has been saved in /c/Users/xxx/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:P2MejuHyxoaw1rmzFOnxeBkx3c7hv+Bv8XmEte7e4Iw m1yellow@163.com
The key's randomart image is:
+---[RSA 3072]----+
|                 |
|         . .     |
|        o . o    |
|       . o + .  .|
|      + S   +  o.|
|    .. = +   .o..|
|     +++= * . ++.|
|    o.*o+* = =.=+|
|   .  oO+ o EoBoo|
+----[SHA256]-----+

```



#### GitHub 添加 key

打开 **id_rsa.pub**，复制里面的 **key**。

回到 github 上，进入 Account => Settings（账户配置）。

点击 SSH and GPG keys，New SSH key



**验证是否成功**

```
$ ssh -T git@github.com
The authenticity of host 'github.com (52.74.223.119)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWhl7E1IGOCspRomTxdCwRLviKw6E5SY1.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes                   ## 输入 yes
Warning: Permanently added 'github.com,52.74.223.119' (RSA) to the list of known hosts.
Hi tianqixin! You've successfully authenticated, but GitHub does not provide shell access. ## 成功信息
```



ssh 访问 gitHub 出错如下：

```
$ ssh -T git@github.com
The authenticity of host 'github.com (140.82.118.4)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWhl7E1IGOCspRomTxdCwRLviKw6E5SY1.
Are you sure you want to continue connecting (yes/no)? 
Host key verification failed.
```

解决办法：（==将GitHub添加到信任主机列表==，可以成功访问）

```
$ ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
## github.com:22 SSH-2.0-babeld-d45c1532

$ ssh -T git@github.com
Warning: Permanently added the RSA host key for IP address '140.82.118.4' to the list of known hosts.
Hi earthnorth! You've successfully authenticated, but GitHub does not provide shell access.
```



#### 新建一个仓库

点击 Your repositiories



#### 提交 GitHub

```
git remote add origin git@github.com:M1Yellow/mypages.git
git push -u origin master

git remote add origin git@github.com:M1Yellow/mypages-web.git
git push -u origin master

```





### Gitee





### GitLab





