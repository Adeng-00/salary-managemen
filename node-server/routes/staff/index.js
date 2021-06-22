/*
 * @Author: cui DengKe
 * @Date: 2021-06-12 15:10:46
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 11:29:19
 * @Description: 员工模块 路由接口 地址
 * @FilePath: \node-server\routes\staff\index.js
 */

const model = require('../model')
const methods = require('../methods')

module.exports = {
  ...model,
  listIdAndName: { method: methods.get }
}

