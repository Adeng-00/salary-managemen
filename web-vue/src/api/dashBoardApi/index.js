/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 16:31:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 16:38:24
 * @Description: 首页=>考勤\图表情况模块 api文件
 * @FilePath: \vue-salary-management\src\api\dashBoardApi\index.js
 */

import http from '@/utils/http';

// 查询上个月考勤 数据
export function lastMonthAttendance(payload) {
  return http('/api/dashBoard/lastMonthAttendance', payload, 'get')
}