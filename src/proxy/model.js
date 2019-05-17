const monk = require('monk')
const { DB: { URL: url } } = require('../config')
const db = monk(url)
const collection = db.get('crawl')

class Proxy {
  constructor ({ name, time, proxies }) {
    this.id = '' + Date.now()
    this.name = name
    this.time = time
    this.proxies = proxies
  }
  save () {
    return collection.insert({
      id: this.id,
      name: this.name,
      time: this.time,
      proxies: this.proxies
    })
    .then(docs => ({
      state: true,
      time: new Date().toLocaleString(),
      data: docs,
      msg: '保存成功'
    }))
    .catch(err => ({
      state: false,
      time: new Date().toLocaleString(),
      data: err,
      msg: '保存失败'
    }))
  }
}

Proxy.get = (findFlag, option) => {
  return collection.find(findFlag, option)
    .then(docs => ({
      state: docs.length > 0,
      time: new Date().toLocaleString(),
      data: docs,
      msg: docs.length > 0 ? '获取成功' : '获取失败'
    }))
    .catch(err => ({
      state: false,
      time: new Date(),
      data: err,
      msg: '获取失败'
    }))
}

Proxy.update = (findFlag, newValue) => {
  return collection.update(findFlag, { $set: newValue })
    .then(docs => ({
      state: docs.n === 1 && docs.nModified === 1 && docs.ok === 1,
      time: new Date().toLocaleString(),
      data: docs,
      msg: docs.n === 1 && docs.nModified === 1 && docs.ok === 1 ? '更新成功' : '更新失败'
    }))
    .catch((err) => ({
      state: false,
      time: new Date().toLocaleString(),
      data: err,
      msg: '更新失败'
    }))
}

module.exports = Proxy