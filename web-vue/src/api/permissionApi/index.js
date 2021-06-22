/*
 * @Author: cui DengKe
 * @Date: 2021-06-20 20:16:22
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 20:55:18
 * @Description: 系统管理=>菜单管理模块=> 权限 api文件
 * @FilePath: \vue-salary-management\src\api\permissionApi\index.js
 */

import http from '@/utils/http';

// 查询所有权限
export function getPermissionAllPort(payload) {
  return http('/api/permission/getPermissionAll', payload, 'get')
}

// 查询某个菜单下的权限数据
export function getPermissionPort(payload) {
  return http('/api/permission/getPermission', payload, 'get')
}

// 修改某个菜单下的权限数据
export function putPermissionPort(payload) {
  return http('/api/permission/update', payload, 'put')
}

// 删除某个菜单下的权限数据
export function delPermissionPort(payload) {
  return http('/api/permission/del', payload, 'delete')
}

// 添加某个菜单下的权限数据
export function addPermissionPort(payload) {
  return http('/api/permission/add', payload, 'post')
}