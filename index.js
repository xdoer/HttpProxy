const koa = require("koa");
const tofindippool = require("./lib/toFindIpPool");
const axios = require("axios");
const proxySrc = require("./config.json").proxySrc;
const fs = require("fs");
const app = new koa();

async function getProxys(url) {
    return await (() => {
        return new Promise((resolve, reject) => {
            axios.get(url).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    })();
}

app.use(async function(ctx, next) {
    if (ctx.request.path === "/" && ctx.request.method === "GET") {
        ctx.response.type = "html";
        ctx.response.body = await fs.ReadStream("./index.html", (err) => {
            if (err) {
                console.error(err);
            }
        });
    } else {
        await next();
    }
})

app.use(async function(ctx, next) {
    if (ctx.request.path === "/getdata" && ctx.request.method === "GET") {
        const body = ctx.request.query;
        ctx.response.body = await getProxys(parseInt(body.testSrc) == 1 ? proxySrc[0] : proxySrc[1]);
    } else {
        await next();
    }
})

app.use(async function(ctx, next) {
    if (ctx.request.path === "/fetchanswer" && ctx.request.method === "GET") {
        const body = ctx.request.query;

        //提供API用。
        const testTime = body.testTime ? parseInt(body.testTime) : 500;
        const proxy = body.testSrc ? parseInt(body.testSrc) == 1 ? proxySrc[0] : proxySrc[1] : proxySrc[0];
        const testIp = await getProxys(proxy);

        if (testIp.state) {
            ctx.response.body = await tofindippool({
                testTime,
                testIp: testIp.data
            })
        } else {
            ctx.response.body = {
                state: false,
                time: new Date(),
                data: "爬虫API响应失败"
            };
        }

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

app.listen(process.env.PORT || 3000, () => {
    console.log("服务已开启");
});