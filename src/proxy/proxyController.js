const Proxy = require('./model')
const getProxies = require('./getProxies')
const { PROXY: { INTERVAL } } = require('../config')

/**
 * 代理控制器
 * 控制检测的代理来自爬虫抓取的还是数据库中的
 * @param { String } src
 */ 
module.exports = async src => {
  const config = await Proxy.get({name: src})
  if (config.state) {
    const target = config.data[0]
    const t = target.time
    if ((Date.now() - Number.parseInt(t)) / (3600 * 1000) > INTERVAL ) {
      const proxies = await getProxies(src)
      const update = await Proxy.update(
        {
          id: config.data[0].id 
        },
        {
          time: '' + Date.now(),
          proxies: proxies.state ? [...new Set(proxies.data)].filter(n => n.ip && n.port) : [],
        }
      )
      if (!update.state) {
        console.log('更新失败')
        return
      }
      return {
        name: src,
        proxies: proxies.state ? [...new Set(proxies.data)].filter(n => n.ip && n.port) : [],
        time: '' + Date.now()
      }
    } else {
      return {
        name: src,  
        proxies: [...new Set(target.proxies)].filter(n => n.ip && n.port),
        time: '' + Date.now()
      }
    }
  } else {
    const proxies = await getProxies(src)
    const save = await new Proxy({
      name: src,
      time: '' + Date.now(),
      proxies: proxies.state ? [...new Set(proxies.data)].filter(n => n.ip && n.port ) : [],
    }).save()
    if (!save.state) {
      console.log('保存失败,错误详情:', save.data)
    }
    return {
      name: src,
      proxies: proxies.state ? [...new Set(proxies.data)].filter(n => n.ip && n.port) : [],
      time: '' + Date.now()
    }
  }
}
