<img src="https://img.shields.io/badge/%E5%AE%9E%E6%88%98%E4%BD%93%E9%AA%8C-%E5%85%B4%E8%B6%A3%E6%88%90%E6%9E%9C%E9%A9%B1%E5%8A%A8-yellow.svg?style=for-the-badge" alt="">
<br/>


# 说明

- 技术资料多数整理搬运自网络开源技术博客，各章节开头有标明参考出处，**仅供个人学习参考**。

- 后续会简化大篇幅的理论概念，加入实际生活案例，让技术更加生动有趣。而不是照搬照抄、用老掉牙的案列、照着书本PPT读各种理论概念。

- 后续技术架构的学习会同步更新，增加原创技术学习记录，一定是自己真正理解弄懂了才写文章，并且用合适案列展示，而不是像其他技术文章一样，大篇幅的代码。

<br/>


# 结构
```
funtech -- 项目目录
├── docs -- 文档目录
│   ├── .vuepress
│   │   ├── public -- 公共资源
│   │   │   ├── bg00.png
│   │   │   ├── favicon.ico
│   │   ├── styles -- 公共样式
│   │   │   ├── index.scss -- 在这里覆盖原有的样式
│   │   │   └── palette.scss -- 在这里新增样式
│   │   ├── config.ts -- 全局配置文件
│   │   ├── navbar.ts -- 顶部导航栏配置
│   │   ├── sidebar.ts -- 左侧菜单栏配置
│   │   └── theme.ts -- 主题配置
│   ├── note
│   │   ├── 关于博客.assets
│   │   ├── 生活感悟.assets
│   │   ├── 2022生活感悟摘要.md
│   │   └── 关于博客.md
│   ├── tech
│   │   ├── 00_01_计算机基础原理
│   │   ├── 00_02_计算机网络
│   │   │   ├── 计算机网络.assets
│   │   │   └── 计算机网络.md
│   │   ├── 00_03_操作系统
│   │   │   ├── 操作系统.assets
│   │   │   └── 进程与线程.md
│   │   ├── 00_04_Linux
│   │   │   ├── Linux服务器部署操作记录.assets
│   │   │   └── Linux服务器部署操作记录.md
│   │   ├── 00_05_汇编原理
│   │   ├── 01_01_Java
│   │   │   ├── Java基础.assets
│   │   │   ├── Java多线程并发编程.assets
│   │   │   ├── Java设计模式.assets
│   │   │   ├── JVM性能调优.assets
│   │   │   ├── Java基础.md
│   │   │   ├── Java多线程并发编程.md
│   │   │   ├── Java设计模式.md
│   │   │   └── JVM性能调优.md
│   │   ├── 01_02_数据结构与算法
│   │   │   ├── 数据结构与算法基础.assets
│   │   │   └── 数据结构与算法基础.md
│   │   ├── 01_03_数据库-核心原理与性能优化
│   │   │   ├── MySQL资料教程.assets
│   │   │   └── MySQL资料教程.md
│   │   ├── 01_04_Web后端
│   │   ├── 01_05_Spring框架与微服务
│   │   │   ├── SpringBoot资料教程.assets
│   │   │   ├── SpringCloud资料教程.assets
│   │   │   ├── Spring资料教程.assets
│   │   │   ├── SpringBoot资料教程.md
│   │   │   ├── SpringCloud资料教程.md
│   │   │   └── Spring资料教程.md
│   │   ├── 02_01_Web前端
│   │   ├── 03_01_项目构建与管理
│   │   │   ├── Git使用教程.assets
│   │   │   ├── Maven使用教程.assets
│   │   │   ├── Git使用教程.md
│   │   │   └── Maven使用教程.md
│   │   └── 03_02_分布式系统架构
│   │       ├── Docker资料教程.assets
│   │       ├── Dubbo资料教程.assets
│   │       ├── MQ消息中间件资料教程.assets
│   │       ├── Nginx资料教程.assets
│   │       ├── Redis资料教程.assets
│   │       ├── Docker资料教程.md
│   │       ├── Dubbo资料教程.md
│   │       ├── MQ消息中间件资料教程.md
│   │       ├── Nginx资料教程.md
│   │       └── Redis资料教程.md
│   ├── home.md -- 博客主页
│   └── README.md -- 项目首页
├── package-lock.json
├── package.json
└── README.md
```


<br/>

# 使用

- `npm run docs:dev` 本地运行

- `npm run docs:build` 编译打包

- `npm run docs:build --clean-temp --clean-cache` 清除缓存，编译打包

<br/>


# 提醒
- GitHub 上有很多这样的知识体系学习路线，千万别贪多，过分追求细节完美！整理再完美的资料，过了关键时期，可能就毫无用武之地了！
  
- 千万别想着裸辞之后，闭关修炼提升技术水平，很危险！！没工作、没收入，求职准备时间最长不要超过三个月，否则很容易被生活的饮食、作息搞垮身心！技术是学不完的，跟工作任务一样，傻乎乎裸辞长时间闭关修炼是非常糟糕的选择！

- **清楚自身职业竞争优劣势，明确目标定位**。名校生的学历关环，及大厂保姆级别的资料教程，是绝大多数“双非”打工人可望不可及的！

- 并不是说清楚自己进不了大厂就不努力，不去深究技术知识，明确自己的目标，选技术还是管理，还是尽早考公考研考教师、转行创业，在适合自己的方向上，努力提升。这不是卷，这是你我的生存策略！都没有活路，还说什么卷？

- **感恩积极对待每一份工作**，因为他给了你我活下去的资本！别总想着`中年危机`，关键是走好当下现在的路，好高骛远、杞人忧天只会徒生焦虑！别抱怨什么压榨剥削了，有的人连被剥削的资格都没有，先积累生存的资本，再谈下一步怎么走。举个可能不太雅观的例子，岛国AV妹子如果不笑，板着脸工作，她们以后的资源将会极速下沉！越是消极对待，之后的工作越是糟糕恶劣，甚至没有工作！


<br/>

<p align="right">
<img src="https://img.shields.io/badge/%E6%AD%BB%E8%AE%B0%E7%A1%AC%E8%83%8C-%E7%90%86%E8%AE%BA%E6%A6%82%E5%BF%B5%E9%A9%B1%E4%B8%8D%E5%8A%A8-yellow.svg?style=for-the-badge" alt="">
</p>
