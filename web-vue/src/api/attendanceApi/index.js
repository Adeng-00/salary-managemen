/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 11:31:39
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 11:35:27
 * @Description: 出勤模块 api文件
 * @FilePath: \vue-salary-management\src\api\attendanceApi\index.js
 */

import http from '@/utils/http';

// 查询出勤数据 分页
export function getAttendanceListPort(payload) {
  return http('/api/attendance/list', payload, 'get')
}

// 修改出勤
export function putAttendancePort(payload) {
  return http('/api/attendance/update', payload, 'put')
}

// 删除出勤
export function delAttendancePort(payload) {
  return http('/api/attendance/del', payload, 'delete')
}

// 添加出勤
export function addAttendancePort(payload) {
  return http('/api/attendance/add', payload, 'post')
}