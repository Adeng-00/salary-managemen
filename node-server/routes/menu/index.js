/*
 * @Author: cui DengKe
 * @Date: 2021-06-20 15:45:04
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:47:21
 * @Description: 菜单模块 路由接口 地址
 * @FilePath: \node-server\routes\menu\index.js
 */

const methods = require('../methods')
const model = require('../model')

const { add, update, del } = model

module.exports = {
  add,
  update,
  del,
  getMenuAll: { method: methods.get }
}