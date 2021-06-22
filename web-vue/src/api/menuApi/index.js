/*
 * @Author: cui DengKe
 * @Date: 2021-06-20 15:47:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:48:34
 * @Description: 系统管理=>菜单管理模块 api文件
 * @FilePath: \vue-salary-management\src\api\menuApi\index.js
 */

import http from '@/utils/http';

// 查询菜单数据 分页
export function getMenuAllPort(payload) {
  return http('/api/menu/getMenuAll', payload, 'get')
}

// 修改菜单
export function putMenuPort(payload) {
  return http('/api/menu/update', payload, 'put')
}

// 删除菜单
export function delMenuPort(payload) {
  return http('/api/menu/del', payload, 'delete')
}

// 添加菜单
export function addMenuPort(payload) {
  return http('/api/menu/add', payload, 'post')
}