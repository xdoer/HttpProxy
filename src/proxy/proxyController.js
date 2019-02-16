const Proxy = require('./model')
const getProxies = require('./getProxies')
const { PROXY: { INTERVAL } } = require('../config')

/**
 * 代理控制器
 * 控制检测的代理来自爬虫抓取的还是数据库中的
 * @param { Number } src 1 || 2 代表代理来源
 */
module.exports = async src => {
  const config = await Proxy.get()
  if (config.state) {
    const { xici, freeproxylist } = config.data[0].proxies
    const t = src === 1 ? xici.time : freeproxylist.time
    if ((Date.now() - Number.parseInt(t)) / (3600 * 1000) > INTERVAL ) {
      const proxies = await getProxies(src)
      const update = await Proxy.update(
        {
          id: config.data[0].id 
        },
        {
          proxies: {
            xici: {
              time: src === 1 ? '' + Date.now() : xici.time,
              proxies: src === 1 ? proxies.state ? proxies.data : xici.proxies : xici.proxies
            },
            freeproxylist: {
              time: src === 2 ? '' + Date.now() : freeproxylist.time,
              proxies: src === 2 ? proxies.state ? proxies.data : freeproxylist.proxies : freeproxylist.proxies
            }
        }
      })
      if (!update.state) {
        console.log('更新失败')
      }
      return {
        name: src === 1 ? '西刺代理' : 'FreeProxyList',
        proxies: proxies.state ? proxies.data : [],
        time: '' + Date.now()
      }
    } else {
      return {
        name: src === 1 ? '西刺代理' : 'FreeProxyList',  
        ...src === 1 ? xici : freeproxylist
      }
    }
  } else {
    const proxies = await getProxies(src)
    const save = await new Proxy({
      proxies: {
        xici: {
          time: '' + Date.now(),
          proxies: src === 1 ? proxies.state ? proxies.data : [] : []
        },
        freeproxylist: {
          time: '' + Date.now(),
          proxies: src === 2 ? proxies.state ? proxies.data : [] : []
        }
      }
    }).save()
    if (!save.state) {
      console.log('保存失败')
    }
    return {
      name: src === 1 ? '西刺代理' : 'FreeProxyList',
      proxies: proxies.state ? proxies.data : [],
      time: '' + Date.now()
    }
  }
}
