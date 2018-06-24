const koa = require("koa");
const tofindippool = require("./fun/toFindIpPool");
const Links = require("./model/Links");
const auto = require("./fun/autoUpdate");
const toupdate = require("./fun/toupdate")
const fs = require("fs");
const app = new koa();

//定时任务启动
//每20分钟更新数据库
auto();

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
        const result = await Links.get({});
        if (result.length < 1) {
            ctx.response.body = toupdate(result);
        } else {
            ctx.response.body = result[0].data;
        }
    } else {
        await next();
    }
})


app.use(async function(ctx, next) {
    if (ctx.request.path === "/fetchanswer" && ctx.request.method === "GET") {
        const body = ctx.request.query;
        ctx.response.body = await tofindippool({
            testLink: body.testLink,
            testTime: parseInt(body.testTime)
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