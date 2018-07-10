# HttpProxy

------

配合WebSplider爬虫，抓取并过滤西刺代理免费地址

### 特性
> * 简单高效
> * 结果准确


### 本地测试
下载本项目
```
git clone https://github.com/LuckyHH/HttpProxy
```

进入项目目录，安装依赖
```
npm install
```

运行项目
```
npm start
```
浏览器打开localhost:3004即可

### API
返回有效的代理地址，测试代理默认响应时间500毫秒
```
http://localhost:3004/fetchanswer
```
或者手动指定测试响应时间
```
http://localhost:3004/fetchanswer?testTime=1000
```

### 在线实例
[HttpProxy](http://httpproxy.docmobile.cn/)

### 其他
配合[WebSplider](http://splider.docmobile.cn/)在线爬虫，修改数据源。定制自己的IP代理池