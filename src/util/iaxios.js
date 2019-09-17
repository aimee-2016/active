/**
 * Created by yunrui001 on 2018-05-15.
 */
/*
 对于axios的引用，主要用于所有请求的拦截的统一处理
 */

import axios from 'axios'
import md5 from 'md5'

function appendMD5(params, type) {
  if (params === undefined) {
    return undefined
  }
  var str = '', count = 0
  for (let i in params) {
    str += i.substr(0, 1) + params[i]
    count++
  }
  str += count
  if (str !== '') {
    if (type != 'post') {
      str = encodeURI(str)
    }
    str = md5(str)
    count = count % 10
    var mac = str.substr(0, count) + count + str.substr(count)
    return {
      ...params,
      mac: mac.toUpperCase()
    }
  }
}

function macIntercept(config) {
  if (config.method == 'get') {
    if (config.params) {
      config.params = appendMD5(config.params)
    }
  } else if (config.method == 'post') {
    config.data = appendMD5(config.data, 'post')
  }
  return config
}
axios.interceptors.request.use(macIntercept)

axios.defaults.baseURL = 'https://pan.xrcloud.net/ruicloud/'
// axios.defaults.baseURL = 'https://wap.xrcloud.net/ruicloud/'
// axios.defaults.baseURL = 'https://zschj.xrcloud.net/ruicloud/'
// axios.defaults.baseURL = 'https://kaifa.xrcloud.net/ruicloud/'
// axios.defaults.withCredentials = true

export default axios
