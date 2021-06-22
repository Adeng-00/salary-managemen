/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 14:05:02
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 14:05:52
 * @Description: 薪资模块 api文件
 * @FilePath: \vue-salary-management\src\api\salaryApi\index.js
 */

import http from '@/utils/http';

// 查询薪资数据 分页
export function getSalaryListPort(payload) {
  return http('/api/salary/list', payload, 'get')
}

// 修改薪资
export function putSalaryPort(payload) {
  return http('/api/salary/update', payload, 'put')
}

// 删除薪资
export function delSalaryPort(payload) {
  return http('/api/salary/del', payload, 'delete')
}

// 添加薪资
export function addSalaryPort(payload) {
  return http('/api/salary/add', payload, 'post')
}