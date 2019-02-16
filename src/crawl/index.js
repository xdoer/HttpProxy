/**
 * 爬虫主控模块
 * 控制爬虫运行流程
 */
const mapReqUrl = require('./mapReqUrl')
const _splice = require('../utils/splice')

/**
 * 控制器
 */
const bound = ({ res, tags, depth, form, charset, tagNum, proxy }) => depth > tagNum ? mapReqUrl({ urls: _splice(res), tags, depth, form, charset, tagNum, proxy }) : _splice(res)

/**
 * 主控函数
 * @param {array} urls 爬取的链接列表
 * @param {array} tags 分析的标签列表
 * @param {number} depth 抓取深度
 * @param {object} form 需要输出的形式
 * @param {string} charset 网页编码
 * @param {string} proxy 配置的请求代理
 */
module.exports = async ({ urls, tags, depth, form, charset, proxy }) => {
  let i = 0

  /**
   * tagNum参数-tags数组下标
   * 内部函数中需要判断当前深度与分析到的标签的个数来决定用不用继续向下分析
   * 流程中出现错误，catch会捕获到，并且返回false
   * */
  return mapReqUrl({ urls, tags, depth, form, charset, proxy, tagNum: i++ })
    .then(res => {
      return bound({ res, tags, depth, form, charset, proxy, tagNum: i++ })
    })
    .then(res => {
      return {
        state: true,
        data: bound({ res, tags, depth, form, charset, proxy, tagNum: i++ })
      }
    })
    .catch(err => {
      return {
        state: false,
        data: err
      }
    })
}
