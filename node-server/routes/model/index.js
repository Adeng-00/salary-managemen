/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:35:21
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 10:15:37
 * @Description: file content
 * @FilePath: \node-server\routes\model\index.js
 */
const methods = require('../methods')

/**
 * 每个路由模块公共的方法
 * @param list 查询列表
 * @param add 新增数据
 * @param update 修改数据
 * @param del 删除数据
 */

module.exports = {
  list: { method: methods.get },
  add: { method: methods.post },
  update: { method: methods.put },
  del: { method: methods.del }
}
