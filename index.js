const koa = require("koa");
const tofindippool = require("./lib/toFindIpPool");
const axios = require("axios");
const fs = require("fs");
const app = new koa();

app.use(async function(ctx, next) {
    if (ctx.request.path === "/" && ctx.request.method === "GET") {
        ctx.response.type = "html";
        ctx.response.body = await fs.ReadStream("./index.html", (err) => {
            if (err) {
                console.log(err);
            }
        });
    } else {
        await next();
    }
})

app.use(async function(ctx, next) {
    if (ctx.request.path === "/getdata" && ctx.request.method === "GET") {
        ctx.response.body = await gg();
    } else {
        await next();
    }
})

async function gg() {
    //保存请求爬虫的数据
    let result = null;
    return result || await (() => {
        return new Promise((resolve, reject) => {
            axios.get("http://splider.docmobile.cn/interface?name=luckyhh&cid=1529918820125").then(res => {
                result = res.data;
                resolve(result);
            }).catch(err => {
                reject(err);
            })
        })
    })();
}

app.use(async function(ctx, next) {
    if (ctx.request.path === "/fetchanswer" && ctx.request.method === "GET") {
        const body = ctx.request.query;

        //提供API用。
        const testTime = body.testTime ? parseInt(body.testTime) : 500;
        const testIp = await gg();

        ctx.response.body = await tofindippool({
            testTime,
            testIp
        });
    } else {
        await next();
    }
})

app.use(async function(ctx, next) {
    if (ctx.request.path === "/httptest" && ctx.request.method === "GET") {
        ctx.response.body = 1;
    } else {
        await next();
    }
})

app.listen(process.env.PORT || 3004, () => {
    console.log("服务已开启");
});