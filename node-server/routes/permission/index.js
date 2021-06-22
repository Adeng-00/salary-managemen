/*
 * @Author: cui DengKe
 * @Date: 2021-06-20 20:13:49
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 20:51:36
 * @Description:  权限模块 路由接口 地址
 * @FilePath: \node-server\routes\permission\index.js
 */

const methods = require('../methods')
const model = require('../model')

const { add, update, del } = model

module.exports = {
  add,
  update,
  del,
  getPermission: { method: methods.get },
  getPermissionAll: { method: methods.get }
}