/*
 * @Author: cui DengKe
 * @Date: 2021-06-11 21:34:56
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 13:56:22
 * @Description: 格式化响应给客户端的数据结构
 * @FilePath: \node-server\utils\response-format.js
 */

const { errLogger } = require('./log-format');

/**
 *@description 一维数组转 tree (目前用于获取所有的菜单，目前前端最多二级菜单) 
 *@param {Array} arr 被转换的数据源
 @returns {Array} 转换后的tree数据 [{id:'1',pid:'0',children:[{id:'2',pid:'1'}]},{id:'3',pid:'0',children:[]}]
 */
const formatTree = (arr) => {
  // 判断数据是否存在
  if (!arr || !arr.length || arr.length < 1) {
    throw new Error("要转换为tree的数据，不存在或者是空数据！");
  }

  let kData = {} // 父数据 对象 以id做key
  let lData = [] // 最终的数据 arr

  arr.forEach(m => {
    // m.children = []
    kData[m.id] = m
    if (m.pid === '0') {
      lData.push(kData[m.id])
    } else {
      kData[m.pid] = kData[m.pid] || {}
      kData[m.pid].children = kData[m.pid].children || [];
      kData[m.pid].children.push(kData[m.id]);
    }
  })

  // 最终的数据
  return lData
}

/**
 *@description 响应到客户端数据格式
 *@param {number} code 状态码：成功：200 失败：500
 *@param {number} data 返回的数据
 *@param {number} msg 信息提示
 */

// 成功
const success = (result) => {
  return {
    code: 200,
    data: result,
    msg: 'OK'
  }
}

// 失败
const failed = (error) => {
  errLogger.error(error); // 记录sql 异常
  return {
    code: 500,
    data: null,
    msg: error.message || '服务器异常'
  }
}

/**
 * @description: 下划线变量名称 转驼峰
 * @param {String} value 'format_hump'
 * @return {String} 'formatHump'
 */
const formatHump = (value) => {
  const sArr = value.split("_");
  let sRte = sArr[0];
  for (let i = 1; i < sArr.length; i++) {
    // sRte = sRte + sArr[i].slice(0, 1).toUpperCase() + sArr[i].slice(1);
    sRte = sRte + sArr[i].charAt(0).toUpperCase() + sArr[i].slice(1);
  }
}

/**
 * @description: 中间件 响应给客户端时 下划线变量名称 转驼峰
 * @param {Object} ctx
 * @param {Function} next
 * @return {*} Object
 */
const toHump = async (ctx, next) => {
  ctx.write = (obj) => ctx.body = toHumpFun(obj)
  await next()
}
/**
 * @description: 下划线变量名称 转驼峰
 * @param {Object} obj 要转换的变量
 * @return {Object} 转换后的变量
 */
function toHumpFun(obj) {
  const result = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      const index = key.indexOf('_')
      let newKey = key
      if (index === -1 || key.length === 1) {
        result[key] = element
      } else {
        const keyArr = key.split('_')
        const newKeyArr = keyArr.map((item, index) => {
          if (index === 0) return item
          return item.charAt(0).toLocaleUpperCase() + item.slice(1)
        })
        newKey = newKeyArr.join('')
        result[newKey] = element
      }

      if (typeof element === 'object' && element !== null) {
        result[newKey] = toHumpFun(element)
      }
    }
  }
  return result
}


module.exports = {
  success,
  failed,
  formatHump,
  toHump,
  formatTree
}