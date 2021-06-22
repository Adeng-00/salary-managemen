/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:35:21
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 11:29:41
 * @Description: admin模块  路由接口 地址
 * @FilePath: \node-server\routes\admin\index.js
 */

const model = require('../model')

const { list, update, del } = model

module.exports = {
  list,
  update,
  del
}
