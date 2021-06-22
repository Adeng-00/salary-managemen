/*
 * @Author: cui DengKe
 * @Date: 2021-06-12 15:13:10
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 10:16:19
 * @Description: 员工模块 服务
 * @FilePath: \node-server\services\staff\index.js
 */

const model = require('../model')

const m = model([
  'list',
  'add',
  'update',
  'del',
  'listIdAndName'
], 'staff')

module.exports = {
  ...m
}
