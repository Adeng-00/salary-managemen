/*
 * @Author: cui DengKe
 * @Date: 2021-06-20 15:44:17
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 20:50:15
 * @Description:  权限模块  服务
 * @FilePath: \node-server\services\permission\index.js
 */

const model = require('../model')

const m = model([
  'add',
  'update',
  'del',
  'getPermission',
  'getPermissionAll'
], 'permission')

module.exports = {
  ...m
}
