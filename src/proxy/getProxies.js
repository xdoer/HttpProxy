const crawl = require('../crawl')
const Config = require('../data/config.json')

module.exports = async src => {
  return await new Promise((resolve, reject) => {
    try {
      resolve(crawl(Config[src] || Config['xici']))
    } catch (e) {
      reject(e)
    }
  }).catch(e => {
    console.log(e)
  })
}