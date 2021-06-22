/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 18:25:31
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-16 09:52:30
 * @Description: 公共模块 api文件
 * @FilePath: \vue-salary-management\src\api\commonApi\index.js
 */
import http from '@/utils/http';

// 查询前端日志

export function getWebLogListPort(payload) {
  return http('/api/common/listWebLogs', payload, 'get')
}

// 添加前端日志
export function addWebLogPort(payload) {
  return http('/api/common/addWebLog', payload, 'post')
}

// 上传文件
export function uploadFilePort(payload) {
  return http('/api/common/uploadFile', payload, 'post')
}

// 刷新token
export function refreshTokenPort(payload) {
  return http('/api/common/refreshToken', payload, 'post')
}

// 注册
export function registerPort(payload) {
  return http('/api/common/register', payload, 'post')
}

// 登录
export function logInPort(payload) {
  return http('/api/common/login', payload, 'post')
}