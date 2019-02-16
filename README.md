# Http代理检测

配抓取并过滤可用的西刺代理和FreeProxyList免费代理地址

### 特性
> * 简单高效
> * 结果准确

### 数据源
[FreeProxyList](https://free-proxy-list.net/)

[西刺代理](http://www.xicidaili.com)

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
可以抓取并检测**FreeProxyList**的代理地址
```
https://proxys.herokuapp.com
```
可以抓取并检测**西刺代理**中的代理地址
```
https://proxys.docmobile.cn
```
**注意:**两个地址均为预览地址,不可直接将API构造到正式应用中。若由此带来损失，由你个人承担。

### 其他
当检测代理没有返回数据时，请首先检查主机能否访问到源网站。
