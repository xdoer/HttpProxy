const fs = require('fs')
const path = require('path')
const checkProxies = require('./checkProxies')
const proxyController = require('./proxyController')
const Config = require('../data/config')
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
    const keys = Object.keys(Config)
    let param = {}

    // 构造参数
    if (/\/api\?/i.test(req.url)) {
      const params = req.url.slice(req.url.indexOf("?") + 1).split("&").map(n => n.split('='))
      const _param = new Map(params)
      const allNumber = [500, 1000, 2000, 5000]
      if (_param.get('t')) {
        if(_isNaN(_param.get('t'))) {
          param.t = 1000
        } else {
          const paramNumber = Number.parseInt(_param.get('t'))
          if (allNumber.indexOf(paramNumber) !== -1) {
            param.t = paramNumber
          } else {
            param.t = 1000
          }
        }
      } else {
        param.t = 1000
      }
      if (_param.get('s')) {
        param.s = keys.indexOf(_param.get('s')) === -1 ? 'xici' : _param.get('s')
      } else {
        param.s = 'xici'
      }
    } else {
      param.t = 1000,
      param.s = 'xici'
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