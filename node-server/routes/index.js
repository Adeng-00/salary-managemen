/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:35:21
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 20:20:45
 * @Description: 生成 路由地址 信息
 * @FilePath: \node-server\routes\index.js
 */

/**
 * @returns {Array} [{ path: '/api/admin/list', method: 'get', action: 'list', service: 'admin'}]
 * @returnsParam path 接口路径 '/api/common/logoIn'
 * @returnsParam method 接口方法 get post put delete
 * @returnsParam action 接口活动具体名字 固定有四个 list add update del or logoIn or...
 * @returnsParam service 那个模块 admin or common or...
 */

module.exports = (config => {
  return config.reduce((copy, name) => {
    // 拿到对应模块路由
    const obj = require(`./${name}`)
    // 路由地址 Array
    const newArr = Object.keys(obj).reduce((total, each) => {

      // 路由地址 请求方式 接口动作 模块方便从 service层 取方法
      let item = { path: `/api/${name}/${each}`, method: obj[each].method, action: each, service: name }
      total.push(item)
      return total
    }, [])

    copy = copy.concat(newArr)
    return copy
  }, [])
})([
  'common',
  'admin',
  'staff',
  'attendance',
  'salary',
  'dashBoard',
  'menu',
  'permission'
])
