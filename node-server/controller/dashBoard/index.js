/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 16:16:55
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 16:53:51
 * @Description: 首页=>考勤\图表情况模块  sql操作
 * @FilePath: \node-server\controller\dashBoard\index.js
 */

const { query } = require('../db-init')
const STATUS = require('../enum')

// 查询上个月考勤 数据
const lastMonthAttendance = val => {
  return query(`select sum(late)  as late,sum(leave_early)  as leave_early,sum(nog_not_written) 
  as nog_not_written,sum(no_clock_in)  as no_clock_in from attendance where status != ${STATUS.DEL} and 
  period_diff( date_format(now(), '%Y%m'), date_format(create_time, '%Y%m') ) = 1`, [])
}

module.exports = {
  lastMonthAttendance
}