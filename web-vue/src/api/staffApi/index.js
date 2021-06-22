/*
 * @Author: cui DengKe
 * @Date: 2021-06-12 16:09:01
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 11:34:59
 * @Description: 员工模块 api文件
 * @FilePath: \vue-salary-management\src\api\staffApi\index.js
 */
import http from '@/utils/http';

// 员工数据分页
export function getStaffListIdAndName(payload) {
  return http('/api/staff/listIdAndName', payload, 'get')
}

// 查询员工数据 分页
export function getStaffListPort(payload) {
  return http('/api/staff/list', payload, 'get')
}


// 修改员工
export function putStaffPort(payload) {
  return http('/api/staff/update', payload, 'put')
}

// 删除员工
export function delStaffPort(payload) {
  return http('/api/staff/del', payload, 'delete')
}

// 添加员工
export function addStaffPort(payload) {
  return http('/api/staff/add', payload, 'post')
}