/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 14:01:36
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 14:02:08
 * @Description: 薪资模块 服务
 * @FilePath: \node-server\services\salary\index.js
 */

const model = require('../model')

const m = model([
  'list',
  'add',
  'update',
  'del',
], 'salary')

module.exports = {
  ...m
}
