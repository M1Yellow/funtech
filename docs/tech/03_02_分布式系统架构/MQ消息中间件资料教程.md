---
title: MQ消息中间件资料教程
date: 2022-11-02 19:45:23
category:
    - 分布式架构
tag:
    - 消息中间件
    - RabbitMQ
    - Kafka
---

> **警告！！！**
>
> 如果你不是讲师，也不是要出书籍，没必要把网上资料的所有细节都整理到自己的文档中，细节何其多，不工作专门整理文档资料都要耗费一两年啊！而且细节内容还不断在更新！死扣细节，心烦意乱、头秃颓废，直到把整个人拖垮！！！人的时间和精力都是有限且非常宝贵的！理清主干结构，就结合实践练习去掌握巩固技术要点，理论概念就用自己理解的话描述就行了！
>
> 别不信，曾经高考都是因为花费大量的实践在整理各个学科的知识体系，导致没有时间练习实践，最后耗费大量心血整理的资料达到的效果非常不理想，高考一结束，资料的价值基本就结束了。另外，书店里面都有各科知识体系小册子，并且也非常详细，为什么非要自己再从头到尾整理一份啊？



## 是什么？

### 官方定义

https://www.rabbitmq.com/

```
Quorum queues
A webinar on high availability and data safety in messaging.
有限队列
一款可以实现高可用和数据安全的消息中间件。

RabbitMQ is the most widely deployed open source message broker.
RabbitMQ 是部署最广泛的开源消息中间件。

```



### 个人理解

消息中间件是介于**两个或多个业务项目**之间的**第三方业务代理**。



RabbitMQ 是一个开源的遵循 AMQP（Advanced Message Queuing Protocol）高级消息队列协议实现的基于 Erlang 语言编写，支持多种客户端（语言）。用于在分布式系统中存储消息，转发消息，具有高可用，高可扩性，易用性等特征。





## 有什么用？

### 消息中间件的应用场景

- 跨系统数据传递

- 高并发的流量削峰

- 数据的分发和异步处理

- 大数据分析与传递

- 分布式事务



简单记忆：异步处理，可以用来实现分布式事务



比如你有一个数据要进行迁移或者请求并发过多的时候，比如你有 10W 的并发请求下订单，可以在这些订单入库之前，把订单请求堆积到消息队列中，让它稳健可靠的入库和执行。





## 实现原理

### 消息中间件的核心组成部分

- 消息的协议

- 消息的持久化机制

- 消息的分发策略

- 消息的高可用，高可靠

- 消息的容错机制



![img](https://www.m1yellow.cn/doc-img/MQ%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/becf4792d1aafac1858c9ad9222d5676.png)



核心概念：
**Server**：又称Broker ,接受客户端的连接，实现AMQP实体服务。 安装rabbitmq-server
**Connection**：连接，应用程序与Broker的网络连接 TCP/IP/ 三次握手和四次挥手
**Channel**：网络信道，几乎所有的操作都在Channel中进行，Channel是进行消息读写的通道，客户端可以建立对各Channel，每个Channel代表一个会话任务。
**Message** :消息：服务与应用程序之间传送的数据，由Properties和body组成，Properties可是对消息进行修饰，比如消息的优先级，延迟等高级特性，Body则就是消息体的内容。
**Virtual Host** 虚拟地址，用于进行逻辑隔离，最上层的消息路由，一个虚拟主机理由可以有若干个Exhange和Queueu，同一个虚拟主机里面不能有相同名字的Exchange
**Exchange**：交换机，接受消息，根据路由键发送消息到绑定的队列。(不具备消息存储的能力)
**Bindings**：Exchange和Queue之间的虚拟连接，binding中可以保护多个routing key.
**Routing key**：是一个路由规则，虚拟机可以用它来确定如何路由一个特定消息。
**Queue**：队列：也成为Message Queue,消息队列，保存消息并将它们转发给消费者。



### 消息确认

消息消费者如何通知 Rabbit 消息消费成功？

消息通过 ACK 确认是否被正确接收，每个 Message 都要被确认（acknowledged），可以手动去 ACK 或自动 ACK。

**自动确认会在消息发送给消费者后立即确认，存在丢失消息的可能。**

- 消费端消费逻辑抛出异常，也就是消费端没有处理成功这条消息，那么就相当于丢失了消息。

- 消息已经被处理，但后续代码抛出异常，使用 Spring 进行管理的话消费端业务逻辑会进行回滚，这也同样造成了实际意义的消息丢失。

- 手动确认则当消费者调用 ack、nack、reject 几种方法进行确认，手动确认可以在业务失败后进行一些操作，如果消息未被 ACK 则会发送到下一个消费者。
- 某个服务忘记 ACK 了，则 RabbitMQ 不会再发送数据给它，因为 RabbitMQ 认为该服务的处理能力有限 ACK 机制还可以起到限流作用，性能能好的应答快，性能差一点的应答慢，实现了按劳分配。



消息确认模式：

- AcknowledgeMode.NONE：自动确认
- AcknowledgeMode.MANUAL：手动确认，**实际开发通常使用手动应答，避免自动应答导致消息丢失。**
- AcknowledgeMode.AUTO：根据情况确认





### 消息分发策略对比

| 策略     | ActiveMQ | RabbitMQ | Kafka | RocketMQ |
| -------- | -------- | -------- | ----- | -------- |
| 发布订阅 | 支持     | 支持     | 支持  | 支持     |
| 轮询分发 | 支持     | 支持     | 支持  | /        |
| 公平分发 | /        | 支持     | 支持  | /        |
| 重发     | 支持     | 支持     | /     | 支持     |
| 消息拉取 | /        | 支持     | 支持  | 支持     |





## 为什么选择它？有无其他更优方案？（货比三家）

### 常见的消息中间件

ActiveMQ、RabbitMQ、Kafka、RocketMQ等。





## 怎样使用？

### 下载安装

#### Linux





#### Docker

```shell
## 拉取带有管理界面的镜像
sudo docker pull rabbitmq:management

## 运行容器，可以直接运行，会自动拉取镜像
sudo docker run -d --name rabbitmq01 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=123456.a -p 15672:15672 -p 5672:5672 -p 25672:25672 rabbitmq:management

## 相关端口
5672:RabbitMQ的通讯端口
25672:RabbitMQ的节点间的CLI通讯端口
15672:RabbitMQ HTTP_API的端口，管理员用户才能访问，用于管理RabbitMQ,需要启动Management插件
1883，8883：MQTT插件启动时的端口
61613、61614：STOMP客户端插件启用的时候的端口
15674、15675：基于webscoket的STOMP端口和MOTT端口

## 防火墙开放控制台窗口
sudo firewall-cmd --zone=public --add-port=15672/tcp --permanent
sudo systemctl restart firewalld
sudo firewall-cmd --list-port

## 启动web管理界面，容器运行后，管理界面也已经启动了，直接可以访问
#sudo docker exec -it myrabbit rabbitmq-plugins enable rabbitmq_management


```



### SpringBoot 整合 rabbitMQ

- [SpringBoot整合RabbitMQ](https://www.cnblogs.com/yif0118/p/14670751.html)



#### 添加依赖

SpringBoot 提供了spring-boot-starter-amqp 项目对消息各种支持，只需要引入依赖即可，版本号在 SpringBoot pom 文件中有。

```Xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```



#### 参数配置

```yaml
spring:
  ## rabbitmq 配置
  rabbitmq:
    host: 192.168.137.151
    port: 5672
    virtual-host: /mypages
    username: admin
    password: 123456.a
    ## 手动 ACK，防止报错后未正确处理消息丢失，默认为 none，自动应答
	acknowledge-mode: manual
```



#### 生产者配置类

```java
/**
 * @Description:  direct交换机类型采用routing key与Queue进行绑定，通过key不同一对一进行消息传递
 * @Author: fengye
 * @Date: 2021/4/16 14:29
 */
@Configuration
public class DirectRabbitConfig {
    //使用注入方式声明对应的Queue
    @Bean
    public Queue emailQueue() {
        // durable:是否持久化,默认是false,持久化队列：会被存储在磁盘上，当消息代理重启时仍然存在，暂存队列：当前连接有效
        // exclusive:默认也是false，只能被当前创建的连接使用，而且当连接关闭后队列即被删除。此参考优先级高于durable
        // autoDelete:是否自动删除，当没有生产者或者消费者使用此队列，该队列会自动删除。
        //一般设置一下队列的持久化就好,其余两个就是默认false
        return new Queue("email.direct.queue", true);
    }
    @Bean
    public Queue smsQueue() {
        return new Queue("sms.direct.queue", true);
    }
    @Bean
    public Queue weixinQueue() {
        return new Queue("weixin.direct.queue", true);
    }

    //声明交换机，不同的交换机类型不同：DirectExchange/FanoutExchange/TopicExchange/HeadersExchange
    @Bean
    public DirectExchange directOrderExchange() {
        return new DirectExchange("direct_order_exchange", true, false);
    }

    //绑定关系：将队列和交换机绑定, 并设置用于匹配键：routingKey
    @Bean
    public Binding bindingFanout1() {
        return BindingBuilder
                .bind(weixinQueue())  //绑定哪个Queue
                .to(directOrderExchange())  //是哪个交换机
                .with("weixin");   //对应什么key
    }
    @Bean
    public Binding bindingFanout2() {
        return BindingBuilder.bind(smsQueue()).to(directOrderExchange()).with("sms");
    }

    @Bean
    public Binding bindingFanout3() {
        return BindingBuilder.bind(emailQueue()).to(directOrderExchange()).with("email");
    }
}

```



#### 生产者

```java
@Service
public class OrderService {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    // 1: 定义交换机
    private String exchangeName = "";
    // 2: 路由key
    private String routeKey = "";

    //Direct类型交换机
    public void makeOrderDirect(Long userId, Long productId, int num) {
        exchangeName = "direct_order_exchange";
        routeKey = "weixin";
        // 1： 模拟用户下单
        String orderNumer = UUID.randomUUID().toString();
        // 2: 根据商品id productId 去查询商品的库存
        // int numstore = productSerivce.getProductNum(productId);
        // 3:判断库存是否充足
        // if(num >  numstore ){ return  "商品库存不足..."; }
        // 4: 下单逻辑
        // orderService.saveOrder(order);
        // 5: 下单成功要扣减库存
        // 6: 下单完成以后
        System.out.println("用户 " + userId + ",订单编号是：" + orderNumer);
        // 发送订单信息给RabbitMQ fanout
        rabbitTemplate.convertAndSend(exchangeName, routeKey, orderNumer);
    }
}
```



#### 消费者

```java
//通过@RabbitListener绑定队列接收消息
@RabbitListener(queues = {"weixin.direct.queue"})
@Component
public class DirectDuanxinConsumer {
    //队列中的消息会通过@RabbitHandler注解注入到方法参数中，就可以获取到队列中的消息
    @RabbitHandler
    public void reviceMessage(String message){
        System.out.println("duanxin direct queue----接收到了订单信息是：->" + message);
    }
}

@RabbitListener(queues = {"email.direct.queue"})
@Component
public class DirectEmailConsumer {
    @RabbitHandler
    public void reviceMessage(String message){
        System.out.println("email direct----接收到了订单信息是：->" + message);
    }
}

@RabbitListener(queues = {"sms.direct.queue"})
@Component
public class DirectSMSConsumer {
    @RabbitHandler
    public void reviceMessage(String message){
        System.out.println("sms direct----接收到了订单信息是：->" + message);
    }
}
```







死信队列的作用：

1. 防止消费失败的消息一直重试，导致队列阻塞
2. 创建一个专门监听处理死信队列消息的方法，统一处理失败消息（延时重试、标记失败、人工干预）
3. 不一定要设置死信队列，可以在消费者重试几次之后，立即处理失败消息



### RabbitMQ 消息模式应用

参考官网：https://www.rabbitmq.com/getstarted.html



**RabbitMQ Exchanges type 交换机支持类型**

![image-20210602150349084](https://www.m1yellow.cn/doc-img/MQ%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/image-20210602150349084.png)



- `fanout` 发布与订阅模式，是一种广播机制，没有路由 key
- `direct ` 有 routing-key 匹配模式
- `topic ` 模糊 routing-key 匹配模式
- `headers` 参数匹配模式



#### 简单模式 Simple

![img](https://www.m1yellow.cn/doc-img/MQ%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/python-one.png)



#### 工作模式 Work queues

![img](https://www.m1yellow.cn/doc-img/MQ%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/python-two.png)



- 类型：无
- 特点：分发机制



##### 一个队列有多个消费者时，消息会被哪个消费者消费？有哪些分配策略？

**轮询模式（Round-Robin）**

消费者轮流消费消息，直至消息消费完成。



**公平分发（Fair Dispatch）**

根据消费者的消费能力进行公平分发，能力强的处理的多，能力弱的处理的少，**按劳分配**。

**怎样设置公平分发？**

- 消费者一次接收一条消息，代码channel.BasicQos(0, 1, false)
- 公平分发需要消费者开启手动应答，关闭自动应答
- 关闭自动应答代码channel.BasicConsume(“queue_test”, false, consumer)
- 消费者开启手动应答代码：channel.BasicAck(ea.DeliveryTag, false)
- 处理完成了再应答，能力强的应答快，能力弱的应答慢，就实现了按劳分配。



**总结**

1. 当队列里消息较多时，通常会开启多个消费者处理消息；公平分发和轮询分发都是经常使用的模式。

2. 轮询分发的主要思想是“按均分配”，不考虑消费者的处理能力，所有消费者均分；这种情况下，处理能力弱的服务器，一直都在处理消息，而处理能力强的服务器，在处理完消息后，处于空闲状态。

3. 公平分发的主要思想是”能者多劳”，按需分配，能力强的干的多。



#### 发布订阅模式 Publish/Subscribe

![img](https://www.m1yellow.cn/doc-img/MQ%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/python-three.png)



- web操作查看视频
- 类型：fanout
- 特点：Fanout—发布与订阅模式，是一种广播机制，它是没有路由key的模式。



#### 路由模式 Routing

![img](https://www.m1yellow.cn/doc-img/MQ%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/python-four.png)



- web操作查看视频
- 类型：direct
- 特点：有routing-key的匹配模式



#### 主题模式 Topics

![img](https://www.m1yellow.cn/doc-img/MQ%E6%B6%88%E6%81%AF%E4%B8%AD%E9%97%B4%E4%BB%B6%E8%B5%84%E6%96%99%E6%95%99%E7%A8%8B.assets/python-five.png)



- 类型：topic
- 特点：模糊的routing-key的匹配模式



#### 参数模式

- 类型：headers
- 特点：参数匹配模式





## 存在的缺陷和问题，及是否有应对措施？





## 后期维护升级的难度和成本





## 面试题（主干、重难点）

1. **你们项目为什么没有用 kafka？**

kafka 优势：快、吞吐量大，更多的是在大数据业务使用

不足：消息延迟比 rabbitmq 高，实际项目参考资料比 rabbitmq 少





