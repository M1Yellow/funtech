---
title: Vue资料教程
date: 2024-04-26 15:41:53
category:
    - Web前端
tag:
    - Vue
---

```
记忆要点：
特性 MVVC
常用生命周期函数 created mounted destroy
常用标签 v-if v-else v-for v-bind:key/:key v-on:click/@click
常用操作
父子传值 provide inject
组件值传递 v-bind:item props['item']

```



## 环境搭建

### 安装 nodejs

官网下载安装包，安装

https://nodejs.org/zh-cn/download/



验证安装

```shell
#cmd 命令行
C:\Users\fanmi>where node
D:\Program Files\nodejs\node.exe

C:\Users\fanmi>node -v
v14.16.0

C:\Users\fanmi>npm -v
6.14.11
```



### 更新版本

#### nodejs 版本更新

从 https://nodejs.org/en/download 安装最新的 msi，不用卸载，覆盖之前的安装即可





### 修改 npm 本地仓库目录（可不改）

查看默认目录

```shell
C:\Users\fanmi>npm config ls
; cli configs
metrics-registry = "https://registry.npmjs.org/"
scope = ""
user-agent = "npm/6.14.11 node/v14.16.0 win32 x64"

; builtin config undefined
prefix = "C:\\Users\\fanmi\\AppData\\Roaming\\npm"

; node bin location = D:\Program Files\nodejs\node.exe
; cwd = C:\Users\fanmi
; HOME = C:\Users\fanmi
; "npm config ls -l" to show all defaults.

```

npm 本地仓库目录默认在 C 盘，emm，看个人习惯吧，我个人是不喜欢应用文件目录放 C 盘。后续仓库里面肯定会很多组件库，这种动态增长的仓库，C 盘空间通常不大，使用时间长了，很可能占用较大的空间，从而影响系统和应用文件的存储和读取。



命令行修改

修改prefix的值：npm config set prefix 【全局仓库地址】
修改cache的值：npm config set cache【全局缓存地址】
重新用 npm config ls 查看配置信息，如果配置成功，就直接能看到配置信息了。

```shell
npm config set prefix E:\DevRes\npmRepository\node_global
npm config set cache E:\DevRes\npmRepository\node_cache

#配置之后
C:\Users\fanmi>npm install -g pnpm
E:\DevRes\npmRepository\pnpm -> E:\DevRes\npmRepository\node_modules\pnpm\bin\pnpm.cjs
E:\DevRes\npmRepository\pnpx -> E:\DevRes\npmRepository\node_modules\pnpm\bin\pnpx.cjs
+ pnpm@7.8.0
added 1 package in 15.781s

```



直接修改配置文件

修改.npmrc，文件地址：`C:\Users\【用户名】`，如果文件不存在，新建一个，注意文件以 `.` 开头。



>  更改本地仓库地址导致的问题及处理

组件库命令识别不了

```shell
C:\Users\fanmi>cnpm -v
'cnpm' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

C:\Users\fanmi>vue list
'vue' 不是内部或外部命令，也不是可运行的程序
或批处理文件。

```

需要把之前设置的本地仓库目录添加到系统环境变量。



### build 构建报错

```
[webpack-cli] [Error: EPERM: operation not permitted, mkdir 'E:\'] {
  errno: -4048,
  code: 'EPERM',
  syscall: 'mkdir',
  path: 'E:\\'
}
```







### 安装 Node.js 淘宝镜像加速器（cnpm）

```shell
#查看配置
npm config list
npm config get registry

#【全局配置】
# 淘宝源
# 旧
npm config set registry https://registry.npm.taobao.org
# 新
npm config set registry https://registry.npmmirror.com
# 设置不验证ssl证书
npm config set strict-ssl false

#解除镜像并恢复到官方源
npm config set registry https://registry.npmjs.org

#【单次有效】
#-g 就是全局安装
npm install -g cnpm --registry=https://registry.npmmirror.com

#或使用如下语句解决 npm 速度慢的问题
npm install --registry=https://registry.npmmirror.com

#后续可能出现安装不了或者网速很慢的情况，可以使用 cnpm 代替 npm，当然能用 npm 最好。

```

详细参考：https://developer.aliyun.com/article/868238



### npm 切换到 pnpm

- [官方文档](https://pnpm.io/zh/)



```bash
建议先配置国内镜像
npm config set registry https://registry.npmmirror.com
npm config list
npm config get registry

全局安装
npm install -g pnpm
npm i -g pnpm

查看版本
pnpm -v
pnpm --version

查看设置
pnpm c list

配置pnpm环境变量
在系统变量，手动添加
PNPM_HOME
值为指定的目录，比如 E:\DevRes\pnpmRepository
系统Path追加%PNPM_HOME%

也可以使用 `pnpm setup` 自动配置环境变量
注意：
1. 这个自动配置的是用户级别的环境变量，不是系统变量
2. 用户变量优先级高于系统变量
3. 环境变量配置完成后，CMD窗口需要重新打开


修改默认的安装包存储路径（配置了 PNPM_HOME 基本上不修改也行）
https://pnpm.io/zh/npmrc#store-dir

On Windows: ~/AppData/Local/pnpm/store
On macOS: ~/Library/pnpm/store
On Linux: ~/.local/share/pnpm/store

全局bin目录
pnpm config set global-bin-dir "E:\DevRes\pnpmRepository"

cache缓存目录，不设置的话，还是在默认路径下
pnpm config set cache-dir "E:\DevRes\pnpmRepository\pnpm-cache"

state状态目录，不设置的话，还是在默认路径下
pnpm config set state-dir "E:\DevRes\pnpmRepository\pnpm-state"

指定储存全局依赖的目录，会在 PNPM_HOME 下自动生成
pnpm config set global-dir "E:\DevRes\pnpmRepository\global"

所有包被保存在磁盘上的位置，会在 PNPM_HOME 下自动生成
pnpm config set store-dir "E:\DevRes\pnpmRepository\store"

更新 pnpm
pnpm add -g pnpm to update



```





### 打包工具

- [如果能重来，你要选 Vite 还是 Webpack ？](https://juejin.cn/post/7106136866381889573)
- [Webpack vs Vite：编译器之争，谁才是你的最爱？](https://blog.csdn.net/m0_49768044/article/details/131640237)



#### Webpack



#### Vite





### 安装 vue-markdown-loader

参考：https://segmentfault.com/a/1190000019412548

用于解析 markdown 内容，也可以将 markdown 文件加载成 vue 组件。

由于该插件是基于 markdown-it 的，因此不需要单独安装 markdown-it。

```shell
#markdown 插件
#npm i vue-markdown-loader -D
npm install vue-markdown-loader --save-dev

```



修改 `vue.config.js` 配置文件（如果没有，在项目根目录新建一个）

```js
module.exports = {
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  }
}
```



### 安装 markdown-it

参考：

https://www.npmjs.com/package/vue3-markdown-it



```shell
#npm install markdown-it --save
npm install vue3-markdown-it

#安装 github-markdown-css 样式，否则可能有些符号标签样式不显示
npm install github-markdown-css --save-dev

```



安装完成后，内置支持的插件：

- [markdown-it](https://github.com/markdown-it/markdown-it) - **The one** that started it all
- [markdown-it-abbr](https://github.com/markdown-it/markdown-it-abbr) - Add abbreviations
- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) - Add anchors
- [markdown-it-deflist](https://github.com/markdown-it/markdown-it-deflist) - Add definition lists
- [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji) - Add emojis
- [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote) - Add footnotes
- [markdown-it-highlightjs](https://github.com/valeriangalliat/markdown-it-highlightjs) - Add highlighting for code blocks
- [markdown-it-ins](https://github.com/markdown-it/markdown-it-ins) - Add `<ins>` tags
- [markdown-it-mark](https://github.com/markdown-it/markdown-it-mark) - Add marking/highlighting
- [markdown-it-sub](https://github.com/markdown-it/markdown-it-sub) - Add subscript
- [markdown-it-sup](https://github.com/markdown-it/markdown-it-sup) - Add superscript
- [markdown-it-task-lists](https://github.com/revin/markdown-it-task-lists) - Add task lists
- [markdown-it-toc-done-right](https://github.com/nagaozen/markdown-it-toc-done-right) - Add table of contents



### 安装 mockjs

官方文档：https://github.com/nuysoft/Mock/wiki/Getting-Started



mockjs 可以拦截 ajax 请求，模拟后台返回数据，有助于前后端独立开发。

```shell
npm install mockjs --save-dev

```



简单使用

```js
// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))

```





## 开发实战

- [Node.js 中文文档](http://nodejs.cn/api/)

- [官方文档](https://nodejs.org/docs/latest/api/)

- [npm 中文文档](https://nodejs.cn/npm/)



### 入门基础

#### 依赖管理

- [dependencies](https://nodejs.cn/npm/cli/v7/configuring-npm/package-json/#dependencies)
- [node-semver](https://github.com/npm/node-semver#versions)



##### 版本号说明

**~ 范围 `~1.2.3` `~1.2` `~1`**

- `~1.2.3` := `>=1.2.3 <1.(2+1).0` := `>=1.2.3 <1.3.0-0`
- `~1.2` := `>=1.2.0 <1.(2+1).0` := `>=1.2.0 <1.3.0-0` (Same as `1.2.x`)
- `~1` := `>=1.0.0 <(1+1).0.0` := `>=1.0.0 <2.0.0-0` (Same as `1.x`)
- `~0.2.3` := `>=0.2.3 <0.(2+1).0` := `>=0.2.3 <0.3.0-0`
- `~0.2` := `>=0.2.0 <0.(2+1).0` := `>=0.2.0 <0.3.0-0` (Same as `0.2.x`)
- `~0` := `>=0.0.0 <(0+1).0.0` := `>=0.0.0 <1.0.0-0` (Same as `0.x`)
- `~1.2.3-beta.2` := `>=1.2.3-beta.2 <1.3.0-0` Note that prereleases in the `1.2.3` version will be allowed, if they are greater than or equal to `beta.2`. So, `1.2.3-beta.4` would be allowed, but `1.2.4-beta.2` would not, because it is a prerelease of a different `[major, minor, patch]` tuple.



**^ 范围 `^1.2.3` `^0.2.5` `^0.0.4`**

- `^1.2.3` := `>=1.2.3 <2.0.0-0`
- `^0.2.3` := `>=0.2.3 <0.3.0-0`
- `^0.0.3` := `>=0.0.3 <0.0.4-0`
- `^1.2.3-beta.2` := `>=1.2.3-beta.2 <2.0.0-0` Note that prereleases in the `1.2.3` version will be allowed, if they are greater than or equal to `beta.2`. So, `1.2.3-beta.4` would be allowed, but `1.2.4-beta.2` would not, because it is a prerelease of a different `[major, minor, patch]` tuple.
- `^0.0.3-beta` := `>=0.0.3-beta <0.0.4-0` Note that prereleases in the `0.0.3` version *only* will be allowed, if they are greater than or equal to `beta`. So, `0.0.3-pr.2` would be allowed.

- `^1.2.x` := `>=1.2.0 <2.0.0-0`
- `^0.0.x` := `>=0.0.0 <0.1.0-0`
- `^0.0` := `>=0.0.0 <0.1.0-0`

- `^1.x` := `>=1.0.0 <2.0.0-0`
- `^0.x` := `>=0.0.0 <1.0.0-0`





#### 更新项目依赖





### Vue3 脚手架搭建

- [Vue3脚手架搭建](https://haibin-007.github.io/vue3-scaffolding-tutorial/)







### 使用 vue-cli 创建基于 Webpack 的 Vue 项目

#### 安装 vue-cli

```shell
#在命令台输入
npm install -g @vue/cli
#查看是否安装成功
vue list
#查看版本
vue -V

```



#### 安装 webpack 

WebPack 是一款**模块加载器兼打包工具**，它能把各种资源，如 JS、JSX、ES6、SASS、LESS、图片等**都作为模块来处理和使用。**

```shell
npm install webpack -g
npm install webpack-cli -g

#验证安装
webpack -v
webpack-cli -v

```





### 使用 create-vue 创建基于 Vite 的 Vue 项目

```shell
#进入工作目录，在此目录下执行
npm create vue@latest

Need to install the following packages:
create-vue@3.10.2
Ok to proceed? (y)

Vue.js - The Progressive JavaScript Framework

√ 请输入项目名称： ... collide-try
√ 是否使用 TypeScript 语法？ ... 否 / 是
√ 是否启用 JSX 支持？ ... 否 / 是
√ 是否引入 Vue Router 进行单页面应用开发？ ... 否 / 是
√ 是否引入 Pinia 用于状态管理？ ... 否 / 是
√ 是否引入 Vitest 用于单元测试？ ... 否 / 是
√ 是否要引入一款端到端（End to End）测试工具？ » 不需要
√ 是否引入 ESLint 用于代码质量检测？ ... 否 / 是
√ 是否引入 Prettier 用于代码格式化？ ... 否 / 是
√ 是否引入 Vue DevTools 7 扩展用于调试? (试验阶段) ... 否 / 是

正在初始化项目 E:\DevRes\Projects\collide-try\collide-try...

项目初始化完成，可执行以下命令：

  cd collide-try
  npm install
  npm run format
  npm run dev




```





### 使用 tree 生成目录树结构

- https://juejin.cn/post/6844903861254094862



#### 使用DOS中的tree命令

```shell
TREE [drive:][path] [/F] [/A]

   /F   显示每个文件夹中文件的名称。
   /A   使用 ASCII 字符，而不使用扩展字符(会把当前目录下的结构给展出来)。
TREE [drive:][path] [/F] [/A]

#功能很局限，不好用

```



#### Git 添加 tree 支持



#### 基于 node 的 treer

treer 是一个生成目录结构树的命令行工具。

```shell
$ npm install --global treer 
#or globally 
$ npm install -g treer 

treer -V
1.0.4

treer --help
Usage: index [options]

Options:
  -V, --version          output the version number
  -d, --directory [dir]  Please specify a directory to generate structure tree (default: "E:\\DevRes\\Projects\\mypages-web")
  -i, --ignore [ig]      You can ignore specific directory name
  -e, --export [epath]   export into file
  -h, --help             output usage information

#-d 输出制定的目录:例如treer -d > 保存文件的名称,treer -d > result.txt,在当前目录下,它会将目录结构保存在result.txt的文件中
treer -d > result.txt

#-i 要跳过的目录名称模式，它也支持rege正则,过滤掉制定的目录结构
#-e 导出到文件中,treer -e 要导出到的指定文件 -i 忽略的目录 例如:treer -e ./result.txt -i node_modules,要注意treer相对应的参数顺序是固定的,不可随意调换,不然就违背本意了的

#缺陷:格式固定,参数顺序前后顺序不可随意调换

#不好用，卸载
npm uninstall -g treer


```



#### 基于 tree-node-cli

```shell
npm install -g tree-node-cli
或者
npm install --global tree-node-cli

$ tree --help
Usage: tree [options]

Options:
  -V, --version             output the version number
  -a, --all-files           All files, include hidden files, are printed.
  --dirs-first              List directories before files.
  -d, --dirs-only           List directories only.
  -I, --exclude [patterns]  Exclude files that match the pattern. | separates alternate patterns. Wrap your entire pattern in double quotes. E.g. `"node_modules|coverage".
  -L, --max-depth <n>       Max display depth of the directory tree.
  -r, --reverse             Sort the output in reverse alphabetic order.
  -F, --trailing-slash      Append a '/' for directories.
  -h, --help                output usage information

tree -a -L 2 --dirs-first -I "node_modules|dist|.git|.idea" E:\DevRes\Projects\mypages-web

tree -a -L 8 --dirs-first -I "node_modules|dist|target|logs|log|.git|.idea|.mvn|.iml" E:\DevRes\Projects\mypages > tree.txt

tree -a -L 4 --dirs-first -I "node_modules|dist|target|logs|log|.git|.idea|.mvn|.iml|.temp" E:\DevRes\Projects\funtech > docs-tree.txt


```



#### 基于 tree-cli

注意：如果你之前安装了`tree-node-cli`，而现在又继续安装`tree-cli`，现在安装的会覆盖之前安装的，避免命令的冲突，可以先卸载之前的`tree-node-cli`，使用的命令是：`npm uninstall -g tree-node-cli`

```shell
npm install -g tree-cli

USAGE

    tree <options>

  OPTIONS:

  --help
    outputs a verbose usage listing.
  --version
    outputs the version of tree-cli.
  --debug
    show debug info.
  --ignore
    ignores directory or file you specify.
  --fullpath
    prints the full path prefix for each file.
  --noreport
    omits printing of the file and directory report at the
    end of the tree listing and omits printing the tree on
    console.
  -a
    all files are printed. By default tree does not print
    hidden files (those beginning with a dot '.'). In no
    event does tree print the file system constructs '.'
    (current directory) and '..' (previous directory).
  -d
    list directories only.
  -f
    append a '/' for directories, a '=' for socket files
    and a '|' for FIFOs
  -i
    makes tree not print the indentation lines, useful
    when used in conjunction with the -f option.
  -l
    max display depth of the directory tree.
  -o
    send output to filename.

  EXAMPLE:

  $ tree

  $ tree -l 2, -o out.txt --ignore [node_modules, test] -d --noreport


```









