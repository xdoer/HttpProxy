# HttpProxy

------

配合[WebSplider](http://splider.docmobile.cn)爬虫，抓取并过滤西刺代理免费地址

### 特性
> * 简单高效
> * 结果准确


### 数据源
[FreeProxyList](https://free-proxy-list.net/)

删除了原有的[西刺代理](http://www.xicidaili.com)，一是Heroku访问不到西刺代理，二是西刺代理质量差。所以目前HttpProxy面板上的两种数据源都为[FreeProxyList](https://free-proxy-list.net/)，需要自己添加数据源的，可以修改config.json文件

### 本地测试
下载本项目
```
git clone https://github.com/LuckyHH/HttpProxy.git
npm install
npm start
```
浏览器打开localhost:3000即可

### API
返回有效的代理地址，测试代理默认响应时间500毫秒，数据源默认西刺代理
```
http://localhost:3000/fetchanswer
```

或者手动指定测试响应时间
```
http://localhost:3000/fetchanswer?testTime=1000
```

指定响应数据源
```
http://localhost:3000/fetchanswer?testTime=1000&testSrc=1
```
testSrc参数为1，为西刺代理，参数为2，为国外代理

### 在线实例
```
https://proxys.herokuapp.com
```

### 其他
配合[WebSplider](https://splider.herokuapp.com/)在线爬虫，修改数据源。定制自己的IP代理池

注:
自己在使用WebSplider抓取数据，定制数据源时，每个数据中必须有ip和port两个值。

例如:
```
{
    "ip":"123.234.345.456",
    "port":"8080",
    "speed":"0.23"
}
```
