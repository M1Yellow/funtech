---
title: Vue资料教程
date: 2022-11-08 07:08:41
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
npm config set prefix E:\DevRes\npmRepository
npm config set cache E:\DevRes\npmRepository

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



### 安装 Node.js 淘宝镜像加速器（cnpm）

```shell
#-g 就是全局安装
npm install -g cnpm --registry=https://registry.npm.taobao.org

#或使用如下语句解决 npm 速度慢的问题
npm install --registry=https://registry.npm.taobao.org

#后续可能出现安装不了或者网速很慢的情况，可以使用 cnpm 代替 npm，当然能用 npm 最好。

```

详细参考：https://developer.aliyun.com/mirror/NPM



### 安装 vue-cli

```shell
#在命令台输入
npm install -g @vue/cli
#查看是否安装成功
vue list
#查看版本
vue -V

```



### 安装 webpack 

WebPack 是一款**模块加载器兼打包工具**，它能把各种资源，如 JS、JSX、ES6、SASS、LESS、图片等**都作为模块来处理和使用。**

```shell
npm install webpack -g
npm install webpack-cli -g

#验证安装
webpack -v
webpack-cli -v

```



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





## 开发实战

### 官方文档

中文 Api 文档：http://nodejs.cn/api/ （中文网站也一样）

官方英文文档：https://nodejs.org/dist/latest-v14.x/docs/api/ （可能访问不了）





