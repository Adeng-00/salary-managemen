/*
 * @Author: cui DengKe
 * @Date: 2021-06-20 15:44:17
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:46:34
 * @Description:  菜单模块  服务
 * @FilePath: \node-server\services\menu\index.js
 */

const model = require('../model')

const m = model([
  'getMenuAll',
  'add',
  'update',
  'del'
], 'menu')

module.exports = {
  ...m
}
