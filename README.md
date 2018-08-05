# HttpProxy

------

配合[WebSplider](http://splider.docmobile.cn)爬虫，抓取并过滤西刺代理免费地址

### 特性
> * 简单高效
> * 结果准确


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
[HttpProxy](http://httpproxy.docmobile.cn/)

### HttpProxy镜像
```
https://httpproxys.herokuapp.com
```
该镜像使用的是国外的代理源，由同样部署在Heroku上的[WebSplider](https://websplider.herokuapp.com)提供API支持

### 其他
配合[WebSplider](http://splider.docmobile.cn/)在线爬虫，修改数据源。定制自己的IP代理池

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
