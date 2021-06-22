/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 16:26:23
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 20:15:42
 * @Description:  首页=>考勤\图表情况模块 路由接口 地址
 * @FilePath: \node-server\routes\dashBoard\index.js
 */

const methods = require('../methods')

module.exports = {
  lastMonthAttendance: { method: methods.get }
}

