const request = require("request");
const async = require("async");

function check(obj) {
    let proxys = obj.testIp;

    return new Promise(function(resolve, reject) {
        async.mapLimit(proxys, 100, function(proxy, fn) {
                request({
                    url: "http://httpproxy.docmobile.cn/httptest",
                    proxy: `http://${proxy.ip}:${proxy.port}`,
                    method: 'GET',
                    timeout: obj.testTime,
                }, function(error, response, body) {
                    if (!error && response.statusCode == 200 && body == 1) {
                        fn(null, response.request['proxy']['href']);
                    } else {
                        fn(null, '');
                    }
                });

            },
            function(err, res) {
                //剔除重复
                let result = [...new Set(res)];

                //处理异常数据
                for (let i = 0; i < result.length; i++) {
                    if (result[i] == '' || !/^http:\/\/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?):\d{3,5}/g.test(result[i])) {
                        result.splice(i, 1);
                    }
                }
                resolve({
                    "state": true,
                    "time": new Date(),
                    "data": result
                });
            })
    });
}

module.exports = check;