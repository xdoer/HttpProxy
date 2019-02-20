const fs = require('fs')
const path = require('path')
const checkProxies = require('./checkProxies')
const proxyController = require('./proxyController')
const _isNaN = require('../utils/isNaN')

module.exports = async (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(path.resolve(__dirname, '../index.html'), function (err, data) {
      if (err) {
        res.writeHead(500)
        return res.end('Error loading index.html')
      }
      res.writeHead(200)
      res.end(data)
    })
  }

  /** 示例地址:/api?t=1000&src=1 */
  if (req.method === 'GET' && /\/api\??/i.test(req.url)) {
    let param = {}

    // 构造参数
    if (/\/api\?/i.test(req.url)) {
      const params = req.url.slice(req.url.indexOf("?") + 1).split("&").map(n => n.split('='))
      const _param = new Map(params)
      if (_param.get('t')) {
        if(_isNaN(_param.get('t'))) {
          param.t = 1000
        } else {
          param.t = Number.parseInt(_param.t)
        }
      } else {
        param.t = 1000
      }
      if (_param.get('s')) {
        if (_isNaN(_param.get('s'))) {
          param.s = 1
        } else {
          const s = Number.parseInt(_param.s)
          param.s = s > 2 || s < 1 ? 1 : s
        }
      } else {
        param.s = 1
      }
    } else {
      param.t = 1000,
      param.s = 1
    }
    const { name, time, proxies } = await proxyController(param.s)
    res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Encoding': 'utf-8' })
    res.end(JSON.stringify({
      name,
      time: new Date(Number.parseInt(time)).toLocaleString(),
      proxies:await checkProxies({ t: param.t, proxies })
    }))
  }
}