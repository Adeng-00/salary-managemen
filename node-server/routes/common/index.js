/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 20:39:41
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-24 09:55:51
 * @Description: 公共模块 路由接口 地址
 * @FilePath: \node-server\routes\common\index.js
 */

const methods = require('../methods')

module.exports = {
  login: { method: methods.post },
  register: { method: methods.post },
  refreshToken: { method: methods.post },
  uploadFile: { method: methods.post },
  addWebLog: { method: methods.post },
  listWebLogs: { method: methods.get }
}
