/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:35:30
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-10 20:44:22
 * @Description: file content
 * @FilePath: \node-server\services\admin\index.js
 */
const model = require('../model')
const m = model([
  'list',
  'add',
  'update',
  'del',
], 'admin')

// const login = async ctx => {
//   let res;
//   try {
//     await controller.login().then(result => {
//       res = success(result)
//     })
//   } catch (err) {
//     res = failed(err)
//   }
//   ctx.body = res
// }
module.exports = {
  ...m,
}

