# Http代理检测

配抓取并过滤可用的西刺代理和FreeProxyList免费代理地址

### 特性
> * 简单高效
> * 结果准确

### 数据源
[FreeProxyList](https://free-proxy-list.net/)

[西刺代理](http://www.xicidaili.com)

[神鸡代理](https://www.kuaidaili.com/free/)

[快代理](https://www.kuaidaili.com/free/)

[89免费代理](http://www.89ip.cn/)

[云代理](http://www.ip3366.net/)

### 检测原理
将代理配置到请求中，检查返回结果是否与预期结果一致

### 本地测试
1、安装Node.js,MongoDB,Git

2、下载安装本项目
```
git clone https://github.com/LuckyHH/HttpProxy.git
npm install
```

3、修改配置文件`src/config/index.js`数据库配置项

4、启动项目
```
npm start
```

5、浏览器打开localhost:3000即可

**注意1:如果要修改端口的话，在配置文件中改完之后，需要将前端面板文件`src/index.html`中的端口也改掉，否则前后端不能通信**

**注意2:如果点击检测按钮后，没有查出可用代理，请切换检测源**

### API
返回有效的代理地址，测试代理默认响应时间500毫秒，数据源默认西刺代理
```
http://localhost:3000/api
```

或者手动指定测试响应时间
```
http://localhost:3000/api?t=1000
```

指定响应数据源
```
http://localhost:3000/api?t=5000&s=chick
```

t参数为超时值，数值越小，检测到的代理质量越好，代理越少。数值越大，检测到的代理质量越差，代理越多
s参数为xici、freeproxylist、quick、 chick、 _89ip、 _3366ip

### 在线实例
```
https://proxys.herokuapp.com
```

**注意:以上地址为预览地址,不可直接将API构造到正式应用中。若由此带来损失，由你个人承担。**

### 版本更新

#### 2.0.0/2019-02-17
添加数据库存储爬虫得到的代理

前端面板删除了Vue框架，只保留了必须的socket.io

前端采用WebSocket协议与后端通信，可以实时看到每隔代理的检测结果

后端删除了koa Web框架，路由使用原生Node.js编写，保持应用轻量

#### 1.0.0/2018-06-30

第一版发布

### 其他
当检测代理没有返回数据时，请首先检查主机能否访问到源网站。
