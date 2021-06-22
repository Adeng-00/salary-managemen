/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 16:23:42
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 16:26:03
 * @Description: 首页=>考勤\图表情况模块  服务
 * @FilePath: \node-server\services\dashBoard\index.js
 */

const model = require('../model')

const m = model([
  'lastMonthAttendance'
], 'dashBoard')

module.exports = {
  ...m
}