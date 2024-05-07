---
title: Nginx资料教程
date: 2024-05-06 22:44:23
category:
    - 分布式架构
tag:
    - nginx
    - 反向代理
    - 负载均衡
---

> 需要配置的时候，按照资料参考配置。其他时候基本不会看，久了不用都会忘，都一样。
>
> 面试也不必死记硬背，看一遍，有些印象就可以了。如果是大厂面试，当我没说，能深挖自然会加分。

## 简介

官网：https://www.nginx.com/



## 概念

### 正向代理





### 反向代理





### 负载均衡

Nginx 默认提供了三种负载均衡的策略：

- **轮询**：将客户端发起的请求，平均的分配给每一台服务器
- **权重**：会将客户端的请求，根据服务求的权重值不同，分配不同的数量
- **ip_hash**：基于发起请求的客户端的ip地址不同，他始终会将请求发送指定的服务器上



### 动静分离





## 下载安装

### 下载

官网下载：http://nginx.org/en/download.html



### Linux



### Mac

暂不支持。



### Windows



### Docker

具体查看 Docker 资料教程。



## 常用命令





## 配置文件

### nginx.conf

```properties
# 全局块
# 从配置文件开始到 events 块之间，主要是设置一些影响 Nginx 服务器整体运行的配置指令。
user  nginx;
# 并发处理服务的配置，值越大，可以支持的并发处理量越多，但是会受到硬件、软件等设备的制约。通常设置成和cpu的数量相等。
worker_processes  1;

# 全局错误日志
error_log  /var/log/nginx/error.log warn;
# PID文件，记录当前启动的nginx的进程ID
pid        /var/run/nginx.pid;


# events 块
# 影响 Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 workprocess 下的网络连接进行序列化，是否允许同时接收多个网络连接等等。
events {
	# 支持的最大连接数
    worker_connections  1024;
}


# HTTP 块
# 反向代理和负载均衡都在此配置
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



### default.conf

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
	proxy_pass http://172.23.199.172:8081/;
	#rewrite "^/api/(.*)$" /$1 break;
    }

    # 静态资源跨域
    location /static/ {
	# 服务端已经添加了 header 参数
        #add_header 'Access-Control-Allow-Origin' '*';
        #add_header 'Access-Control-Allow-Credentials' 'true';
	
	# 防盗链
	valid_referers server_names *.m1yellow.cn m1yellow.* gitee.* 8.129.220.131/ 172.23.199.172/ ~\.google\. ~\.baidu\. ~\.github\. ~\.gitee\.;
        if ($invalid_referer) {
            return 403;
            #rewrite ^/ http://www.m1yellow.cn/images/error/403.jpg;
        }
	
        proxy_pass http://172.23.199.172:8081/;
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



### location 配置

语法规则： `location [=|~|~*|^~] /uri/ { … }`

- `=` 开头表示精确匹配
- `^~` 开头表示uri以某个常规字符串开头，理解为匹配 url路径即可。nginx不对url做编码，因此请求为/static/20%/aa，可以被规则^~ /static/ /aa匹配到（注意是空格）。（以xx开头）
- `~` 开头表示区分大小写的正则匹配（以xx结尾）
- `~*` 开头表示不区分大小写的正则匹配（以xx结尾）
- `!~`和`!~*`分别为区分大小写不匹配及不区分大小写不匹配 的正则
- `/` 通用匹配，任何请求都会匹配到。



**多个 location 配置的情况下匹配顺序**

精确匹配 = 

以xx开头匹配^~

按文件中顺序的正则匹配

/ 通用匹配

**当有匹配成功时候，停止匹配，按当前匹配规则处理请求。**



例子，有如下匹配规则：

```properties
location = / {
   #规则A
}
location = /login {
   #规则B
}
location ^~ /static/ {
   #规则C
}
location ~ \.(gif|jpg|png|js|css)$ {
   #规则D，注意：是根据括号内的大小写进行匹配。括号内全是小写，只匹配小写
}
location ~* \.png$ {
   #规则E
}
location !~ \.xhtml$ {
   #规则F
}
location !~* \.xhtml$ {
   #规则G
}
location / {
   #规则H
}
```



那么产生的效果如下：

访问根目录/， 比如http://localhost/ 将匹配规则A

访问 http://localhost/login 将匹配规则B，http://localhost/register 则匹配规则H

访问 http://localhost/static/a.html 将匹配规则C

访问 http://localhost/a.gif, http://localhost/b.jpg 将匹配规则D和规则E，但是规则D顺序优先，规则E不起作用， 而 http://localhost/static/c.png 则优先匹配到 规则C

访问 http://localhost/a.PNG 则匹配规则E， 而不会匹配规则D，因为规则E不区分大小写。

访问 http://localhost/a.xhtml 不会匹配规则F和规则G，

http://localhost/a.XHTML不会匹配规则G，（因为!）。规则F，规则G属于排除法，符合匹配规则也不会匹配到，所以想想看实际应用中哪里会用到。

访问 http://localhost/category/id/1111 则最终匹配到规则H，因为以上规则都不匹配，这个时候nginx转发请求给后端应用服务器，比如FastCGI（php），tomcat（jsp），nginx作为方向代理服务器存在。



所以实际使用中，个人觉得至少有三个匹配规则定义，如下：

```properties
#直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理。

#这里是直接转发给后端应用服务器了，也可以是一个静态首页

# 第一个必选规则

location = / {
    proxy_pass http://tomcat:8080/index
}

# 第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项
# 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用

location ^~ /static/ { //以xx开头
    root /webroot/static/;
}

location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ { //以xx结尾
    root /webroot/res/;
}


#第三个规则就是通用规则，用来转发动态请求到后端应用服务器
#非静态文件请求就默认是动态请求，自己根据实际把握

location / {
    proxy_pass http://tomcat:8080/
}
```



### rewrite

**ReWrite 语法**

`last` – 基本上都用这个Flag。
`break` – 中止Rewirte，不在继续匹配
`redirect` – 返回临时重定向的HTTP状态302
`permanent` – 返回永久重定向的HTTP状态301



下面是可以用来判断的表达式：

`-f`和`!-f`用来判断是否存在文件
`-d`和`!-d`用来判断是否存在目录
`-e`和`!-e`用来判断是否存在文件或目录
`-x`和`!-x`用来判断文件是否可执行



下面是可以用作判断的全局变量

例：http://localhost:88/test1/test2/test.php

```properties
$host：localhost
$server_port：88
$request_uri：http://localhost:88/test1/test2/test.php
$document_uri：/test1/test2/test.php
$document_root：D:\nginx/html
$request_filename：D:\nginx/html/test1/test2/test.php

```



附：一些可用的全局变量

```properties
$args ：这个变量等于请求行中的参数，同$query_string
$content_length ： 请求头中的Content-length字段。
$content_type ： 请求头中的Content-Type字段。
$document_root ： 当前请求在root指令中指定的值。
$host ： 请求主机头字段，否则为服务器名称。
$http_user_agent ： 客户端agent信息
$http_cookie ： 客户端cookie信息
$limit_rate ： 这个变量可以限制连接速率。
$request_method ： 客户端请求的动作，通常为GET或POST。
$remote_addr ： 客户端的IP地址。
$remote_port ： 客户端的端口。
$remote_user ： 已经经过Auth Basic Module验证的用户名。
$request_filename ： 当前请求的文件路径，由root或alias指令与URI请求生成。
$scheme ： HTTP方法（如http，https）。
$server_protocol ： 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
$server_addr ： 服务器地址，在完成一次系统调用后可以确定这个值。
$server_name ： 服务器名称。
$server_port ： 请求到达服务器的端口号。
$request_uri ： 包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
$uri ： 不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。
$document_uri ： 与$uri相同。

```





## 配置实例

### 静态资源服务器

```properties
server {
    listen       80;                                                         
    server_name  localhost;                                               
    client_max_body_size 1024M;
 
    location / {                
           root   e:wwwroot;            //思路：通过/将所有的请求，转发给root处理
           index  index.html;
       }
}

```

这样如果访问http://localhost 就会默认访问到E盘wwwroot目录下面的index.html，如果一个网站只是静态页面的话，那么就可以通过这种方式来实现部署。



### 反向代理

#### 区分 server_name url 名称

```properties
server {  
    listen       80;                                                         
    server_name  localhost;                                               
    client_max_body_size 1024M;

    location / {
        proxy_pass http://localhost:8080;   
        proxy_set_header Host $host:$server_port;    //思路：通过/，将所有的请求，转发给第3方处理
    }
}

```

localhost的时候，就相当于访问localhost:8080了。



#### 区分请求 url 中的特定路径

- 访问 [http://192.168.25.132:9001/edu/](https://links.jianshu.com/go?to=http%3A%2F%2F192.168.25.132%3A9001%2Fedu%2F) 直接跳转到 192.168.25.132:8080
- 访问 [http://192.168.25.132:9001/vod/](https://links.jianshu.com/go?to=http%3A%2F%2F192.168.25.132%3A9001%2Fvod%2F) 直接跳转到 192.168.25.132:8081

```properties
server {
    listen       9001;
    server_name  192.168.25.132;

    location /edu/ {
    	# 资源路径
    	root html;
		proxy_pass http://127.0.0.1:8080;
    }

    # 静态资源跨域
    location /vod/ {
    	root html;
		proxy_pass http://127.0.0.1:8080;
	}

}

```

实际上就是通过 Nginx 监听 9001 端口，然后通过正则表达式选择转发到 8080 还是 8081 的 Tomcat 上去。



### 负载均衡

> 没必要什么都记，累且无价值，能理解最好，理解不了就记两个就行了

**常见的负载均衡算法**

- 轮询法(Round Robin)
- 加权轮询法(Weight Round Robin)
- 平滑加权轮询法(Smooth Weight Round Robin)
- 随机法(Random)
- 加权随机法(Weight Random)
- 源地址哈希法(Hash)
- 最小连接数法(Least Connections)



**Nginx 的5种负载均衡算法**

- **轮询法(Round Robin)(默认)**
- **加权轮询法(Weight Round Robin)- weight**
- 源地址哈希法(Hash)- ip_hash
- fair(第三方)
- url_hash(第三方)



用户输入[http://test-openai.com](http://test-openai.com/) 时，访问80端口
nginx监听到80端口被访问，匹配到的/路径，被反向代理到[http://dramatic-offical-website](http://dramatic-offical-website/)
dramatic-offical-website集群管理着一堆机器地址，从而实现负载均衡。
如果匹配到http://test-openai.com/images/ 路径，则直接映射/data下的文件

```properties
# 虚拟主机配置
server {
    server_name test-openai.com; # 请求到达的服务器名,定义使用test-openai.com访问,
    listen 80; # 监听80端口
    listen 443 ssl; # https默认端口是443

    # 对 / 所有做负载均衡+反向代理
    location / {
        proxy_pass http://dramatic-offical-website; # 代理到目标地址
    }

    # 静态文件，nginx自己处理
    location /images/ {
        root /data; # 映射到/data/images
    }
}

# 设定负载均衡后台服务器列表
upstream dramatic-offical-website {
    server 10.192.106.133;
    server 10.192.106.134;
}

```



```properties
upstream mysvr {
    #weigth参数表示权值，权值越高被分配到的几率越大
    server 192.168.8.1x:3128 weight=5;#本机上的Squid开启3128端口
    server 192.168.8.2x:80  weight=1;
    server 192.168.8.3x:80  weight=6;
}

location ~* /mysvr/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://mysvr/$request_uri;    
}

```



### 防盗链

#### 通过 valid_referers 指令实现

可以同时携带多个参数，表示多个 referer 头部都生效。

**参数值**

- none
  - 允许缺失 referer 头部的请求访问
- block：允许 referer 头部没有对应的值的请求访问。例如可能经过了反向代理或者防火墙
- server_names：若 referer 中站点域名与 server_name 中本机域名某个匹配，则允许该请求访问
- string：表示域名及 URL 的字符串，对域名可在前缀或者后缀中含有 * 通配符，若 referer 头部的值匹配字符串后，则允许访问
- 正则表达式：若 referer 头部的值匹配上了正则，就允许访问

**invalid_referer 变量**

- 允许访问时变量值为空
- 不允许访问时变量值为 1



```properties
location ~* \.(jpg|jpeg|png|gif)$ {
    valid_referers none blocked server_names
        *.ziyang.com www.ziyang.org.cn/nginx/
        ~\.google\.;
    if ($invalid_referer) {
        rewrite ^/ http://$host/logo.png;
    }
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

```



#### 通过 secure_link 模块实现

详细参考：https://segmentfault.com/a/1190000022927612



### 访问控制（并发、访问频率、流量）

- [Nginx - 限制并发、限制访问速率、限制流量](https://www.cnblogs.com/hukey/p/10498544.html)

- [ngx_http_limit_conn_module](https://nginx.org/en/docs/http/ngx_http_limit_conn_module.html)

- [ngx_http_limit_req_module](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html)
- [ngx_http_core_module -> limit_rate](https://nginx.org/en/docs/http/ngx_http_core_module.html#limit_rate)



>limit_conn_zone 模块 - 限制同一 IP 地址并发连接数
>
>limit_request 模块 - 限制同一 IP 某段时间的访问量
>
>core 模块提供 - limit_rate 限制同一 IP 流量



#### limit_conn_zone 限制并发

- [Nginx 限制并发](https://www.w3cschool.cn/nginxsysc/nginxsysc-limit-conn.html)



**1. 添加limit_conn_zone**

这个变量只能在http使用



```
http{
  ...
  #定义一个名为one的limit_zone,大小10M内存来存储session，内存是启动后就立即占用
  #以$binary_remote_addr 为key
  #nginx 1.18以后用limit_conn_zone替换了limit_conn
  #且只能放在http作用域
  limit_conn_zone $binary_remote_addr zone=one:10m;
```



**2. 添加limit_conn**

这个变量可以在http, server, location使用
只限制一个站点，所以添加到server里面

```
server{
    ...
    location {
      ...
       limit_conn one 20;		  #连接数限制
       #带宽限制,对单个连接限数，如果一个ip两个连接，就是500x2k
       limit_rate 500k;		 
      ...
    }
    ...
  }
```



**3. 重启nginx**

```
service nginx restart
#或者重新加载 /usr/local/nginx/sbin/nginx -s reload
```



#### limit_req_zone 限制访问频率

- [Nginx 限制IP访问频率](https://w3cschool.cn/nginxsysc/nginxsysc-limit-req.html)



**1. 添加limit_req_zone**

这个变量只能在http使用



```
http{
  ...
  #定义一个名为allips的limit_req_zone用来存储session，大小是10M内存，
  #以$binary_remote_addr 为key,限制平均每秒的请求为5个，
  #1M能存储16000个状态，rete的值必须为整数，
  #如果限制两秒钟一个请求，可以设置成30r/m
  limit_req_zone $binary_remote_addr zone=allips:10m rate=5r/s;
  ...
```





**2. 添加limit_req**

这个变量可以在http, server, location使用
只限制一个站点，所以添加到server里面



```
 ...
  server{
    ...
    location {
      ...
      #限制每ip每秒不超过20个请求，漏桶数burst为5
      #brust的意思就是，如果第1秒、2,3,4秒请求为19个，
      #第5秒的请求为25个是被允许的。
      #但是如果你第1秒就25个请求，第2秒超过20的请求返回503错误。
      #nodelay，如果不设置该选项，严格使用平均速率限制请求数，
      #第1秒25个请求时，5个请求放到第2秒执行，
      #设置nodelay，25个请求将在第1秒执行。
      limit_req zone=allips burst=5 nodelay;
      ...
    }
    ...
  }
  ...
```



**3. 重启nginx**



#### limit_rate 限制流量

- [Nginx 限制IP带宽占用](https://www.w3cschool.cn/nginxsysc/nginxsysc-limit-rate.html)



**1. 添加limit_conn_zone**

这个变量只能在http使用



```
http{
  ...
  #定义一个名为one的limit_zone,大小10M内存来存储session，
  #以$binary_remote_addr 为key
  #nginx 1.18以后用limit_conn_zone替换了limit_conn
  #且只能放在http作用域
  limit_conn_zone $binary_remote_addr zone=one:10m;
```



**2. 添加limit_conn，limit_rate**

这两个变量可以在http, server, location使用
只限制一个站点，所以添加到server里面

limit_conn one 2; #限制每个IP只能发起两个并发连接。

limit_rate 300k; #对每个连接限速300k。

注意，这里是对连接限速，而不是对IP限速。
如果一个IP允许两个并发连接，那么这个IP就是限速limit_rate×limit_conn。比如 300k × 2 就是对ip的流量带宽控制

示例：

```
server{
    ...
    location {
      ...
       limit_conn one 2;		  #连接数限制
       #带宽限制,对单个连接限数，如果一个ip两个连接，就是300x2 k
       limit_rate 300k;		 
      ...
    }
    ...
  }
```



**3. 重启nginx**





### 根据文件类型设置过期时间

```properties
#静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp\views;
            #过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

```



### 禁止访问某个目录

```properties
location ~* \.(txt|doc)${
    root /data/www/wwwroot/linuxtone/test;
    deny all;
}

```



### gzip 压缩图片

```properties
#gzip on|off
gzip  on;

#消息体太小就没必要压缩(这里设置最小范围1K)
gzip_min_length  1024; 

#Nginx做为反向代理的时候启用，
#param:off|expired|no-cache|no-sotre|private|no_last_modified|no_etag|auth|any]
#expample:gzip_proxied no-cache;
#off – 关闭所有的代理结果数据压缩
#expired – 启用压缩，如果header中包含”Expires”头信息
#no-cache – 启用压缩，如果header中包含”Cache-Control:no-cache”头信息
#no-store – 启用压缩，如果header中包含”Cache-Control:no-store”头信息
#private – 启用压缩，如果header中包含”Cache-Control:private”头信息
#no_last_modified – 启用压缩，如果header中包含”Last_Modified”头信息
#no_etag – 启用压缩，如果header中包含“ETag”头信息
#auth – 启用压缩，如果header中包含“Authorization”头信息
#any – 无条件压缩所有结果数据

gzip_proxied     any;

#Nginx作为反向代理的时候启用，开启或者关闭后端服务器返回的结果，匹配的前提是后端服务器必须要返回包含"Via"的 header头。
gzip_proxied expired no-cache no-store private auth;

#压缩比例，比例越大，压缩时间越长。
#默认是1 
#建议 nginx gzip级别为4
gzip_comp_level  4;

#哪些文件可以被压缩
gzip_types       text/plain text/html text/javascript text/xml text/css application/x-javascript application/xml;

#无视IE6这个笨蛋
gzip_disable  "MSIE [1-6]\.";

```



### http header 请求头控制

```properties
add_header 这个指令用来增加协议头：
add_header Cache-Control no-cache;
add_header Cache-Control no-store;
add_header Cache-Control max-age=1296000;
add_header Content-Encoding gzip
add_header Content-Type 'text/html; charset=utf-8';

if ($request_uri ~* "^/$|^/search/.+/|^/company/.+/") {
    add_header    Cache-Control  max-age=3600;
}

if ($request_uri ~* "^/search-suggest/|^/categories/") {
    add_header    Cache-Control  max-age=86400;
}

```



### 隐藏版本号

通过你所用的版本，找其漏洞，进行攻击你

在http中添加该配置：server_tokens off;



### 配置 SSL HTTPS

1、去阿里云/腾讯云申请免费的

2、下载证书

3、证书放到/usr/local/nginx目录下（就是和conf同级，nginx.conf默认的配置文件的上一级）

4、在vhost目录下加入配置文件



```properties
server {
    listen 443;
    
    # 这里是ssl证书文件
    ssl on;
    ssl_certificate /app/certfull_chain.pem; # 换成自己的
    ssl_certificate_key /app/cert/private.key; # 换成自己的
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置
    ssl_prefer_server_ciphers on;    
}
server {
      # 80端口是http正常访问的接口
      listen 80;
      server_name xxxxx.com;
      # 在这里，我做了https全加密处理，在访问http的时候自动跳转到https
      rewrite ^(.*) https://$host$1 permanent;
}

```



```properties
server {
 listen 443;
 server_name lampol.edu0532.cn; #改域名
 ssl on;
 root /home/www/xcxtp5/public; #改项目路径
 ssl_certificate ../certbo/1523694051089.pem;    #改证书路径
 ssl_certificate_key ../certbo/1523694051089.key; #改私钥路径
 ssl_session_timeout 5m;
 ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
 ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
 ssl_prefer_server_ciphers on;
        location / {
            index  index.html index.htm index.php;
            autoindex  on;
            # 伪静态配置  
            if (!-e $request_filename) {
                rewrite  ^(.*)$  /index.php?s=$1  last;
                break;
            }
        }

        location ~ \.php$ {
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            include        fastcgi.conf;
        }

}

```



#### 动静分离

思路：动、静态的文件，请求时匹配不同的目录

当访问gif,jpeg时 直接访问`e:wwwroot;`,正则自行配置

```properties
server {  
  listen       80;  
  server_name  localhost;  

  location / {  
      root   e:wwwroot;  
      index  index.html;  
  }  

  # 所有静态请求都由nginx处理，存放目录为html  
  location ~ .(gif|jpg|jpeg|png|bmp|swf|css|js)$ {  
      root    e:wwwroot;  
  }  

  # 所有动态请求都转发给tomcat处理  
  location ~ .(jsp|do)$ {  
      proxy_pass  http://test;  
  }  

  error_page   500 502 503 504  /50x.html;  
  location = /50x.html {  
      root   e:wwwroot;  
  }  
}  

```



#### 高可用（主备）

![img](https://www.m1yellow.cn/doc-img/Nginx%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/HA-normal.webp)



![img](https://www.m1yellow.cn/doc-img/Nginx%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/HA-vip.webp)



前期准备：

- **两台 Nginx 服务器**
- **安装 Keepalived**
- **虚拟 ip**



**安装 Keepalived**

```shell
[root@192 usr]# yum install keepalived -y
[root@192 usr]# rpm -q -a keepalived
keepalived-1.3.5-16.el7.x86_64

```



修改配置文件：

```shell
[root@192 keepalived]# cd /etc/keepalived
[root@192 keepalived]# vi keepalived.conf

```

分别将如下配置文件复制粘贴，覆盖掉 keepalived.conf，虚拟 ip 为 192.168.25.50。



对应主机 ip 需要修改的是：

- smtp_server 192.168.25.147（主）smtp_server 192.168.25.147（备）
- state MASTER（主） state BACKUP（备）

```properties
global_defs {
   notification_email {
     acassen@firewall.loc
     failover@firewall.loc
     sysadmin@firewall.loc
   }
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server 192.168.25.147
   smtp_connect_timeout 30
   router_id LVS_DEVEL # 访问的主机地址
}

vrrp_script chk_nginx {
  script "/usr/local/src/nginx_check.sh"  # 检测文件的地址
  interval 2   # 检测脚本执行的间隔
  weight 2   # 权重
}

vrrp_instance VI_1 {
    state BACKUP    # 主机MASTER、备机BACKUP    
    interface ens33   # 网卡
    virtual_router_id 51 # 同一组需一致
    priority 90  # 访问优先级，主机值较大，备机较小
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.25.50  # 虚拟ip
    }
}

```



启动代码如下：

```shell
[root@192 sbin]# systemctl start keepalived.service

```


访问虚拟 ip 成功：

![ ](https://www.m1yellow.cn/doc-img/Nginx%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/access-by-vip.webp)



关闭主机 147 的 Nginx 和 Keepalived，发现仍然可以访问。



**原理解析**

![ ](https://www.m1yellow.cn/doc-img/Nginx%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/master&worker.webp)


启动一个 master，一个 worker，master 是管理员，worker是具体工作的进程。


worker 如何工作？如下图：

![ ](https://www.m1yellow.cn/doc-img/Nginx%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/worker-process.webp)



**小结**

worker 数应该和 CPU 数相等；一个 master 多个 worker 可以使用热部署，同时 worker 是独立的，一个挂了不会影响其他的。



