const isInvalidUrl = require('../utils/isInvalidUrl')
const time = require('../utils/time')
const async = require('async')
const superagent = require('superagent')
require('superagent-proxy')(superagent)

/**
 * @param { String } name 代理源名称
 * @param { Object } socket socket.io实例
 * @param { Number } t 超时时间
 * @param { Array } proxies 代理数组
 */
module.exports = async ({name, socket, t, proxies}) => {
  return await new Promise(function (resolve, reject) {
    async.mapLimit(proxies, 100, (proxy, fn) => {
      const _proxy = `http://${proxy.ip}:${proxy.port}`
      superagent.get('http://ip-api.com/json').timeout(t).proxy(_proxy).buffer(true).end((err, res) => {
        if (err) {
          fn(null, '')
        } else {
          if (res.body['status'] === 'success') {
            fn(null, _proxy)
          } else {
            fn(null, '')
          }
        }
        
        if (name) {
          socket.emit('proxies', {
            time: time(),
            name: name,
            status: res ? res.status : err.code,
            proxy: _proxy,
            text: res ? res.text : err,
          })
        }
      })
    }, (err, res) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      if (name) {
        socket.emit('checkDown')
      }
      resolve([...new Set(res)].filter(n => n !== '' || !isInvalidUrl(n)))
    })
  })
}
