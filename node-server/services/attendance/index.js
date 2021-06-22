/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 11:28:07
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 11:28:39
 * @Description: 出勤模块 服务
 * @FilePath: \node-server\services\attendance\index.js
 */

const model = require('../model')

const m = model([
  'list',
  'add',
  'update',
  'del',
], 'attendance')

module.exports = {
  ...m
}
