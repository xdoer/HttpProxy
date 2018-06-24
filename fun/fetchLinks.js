const superagent = require("superagent");
const Links = require("../model/Links");

function fetchLinks() {
    return new Promise((resolve, reject) => {
        superagent.get("http://splider.docmobile.cn/interface?name=luckyhh&cid=1529834826055").end((err, res) => {
            if (err) {
                reject(err);
            } else {
                //返回的是字符串,转化为数组
                const result = eval(res.text)[0];
                const proxys = [];
                result.splice(0, 1);

                for (let i = 0; i < result.length; i++) {
                    let speed = result[i].speed.substring(0, result[i].speed.length - 1);
                    let connection = result[i].connection.substring(0, result[i].connection.length - 1);
                    if (speed <= 3 && connection <= 1) {
                        proxys.push(result[i]);
                    }
                }
                resolve(proxys);
            }
        })
    }).catch(err => {
        return '爬虫链接返回错误' + err;
    })
}

module.exports = fetchLinks;