# HttpProxy

------

配抓取并过滤可用的西刺代理和FreeProxyList免费代理地址

### 特性
> * 简单高效
> * 结果准确

### 数据源
[FreeProxyList](https://free-proxy-list.net/)

[西刺代理](http://www.xicidaili.com)

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
http://localhost:3000/api
```

或者手动指定测试响应时间
```
http://localhost:3000/api?t=1000
```

指定响应数据源
```
http://localhost:3000/api?t=1000&s=1
```

t参数为超时值，数值越小，检测到的代理质量越好，代理越少。数值越大，检测到的代理质量越差，代理越多
s参数为1，为西刺代理，参数为2，为国外代理

### 在线实例
```
https://proxys.herokuapp.com
```
