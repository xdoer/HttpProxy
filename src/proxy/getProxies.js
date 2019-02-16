const crawl = require('../crawl')
const { XiCi, FreeProxyList } = require('../data/config.json')

module.exports = async src => {
  return await new Promise((resolve, reject) => {
    try {
      resolve(src === 1 ? crawl(XiCi) : crawl(FreeProxyList))
    } catch (e) {
      reject(e)
    }
  }).catch(e => {
    console.log(e)
  })
}