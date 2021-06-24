/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:35:24
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-24 09:54:27
 * @Description: 整合所有子路由
 * @FilePath: \node-server\routers\index.js
 */

const router = require('koa-router')()
// router.prefix('/salary')
const routes = require('../routes/index.js')

/**
 * @description service 是一个对象，item.action 是 key 
 * 根据 key 取里面有具体的方法 list add...
 * @returns router.get('/api/admin/add',(cxt)=>{})
 * @returnsParam item.path 路由接口地址'/api/admin/add' 
 * @returnsParam service[item.action] 回调函数 (cxt)=>{}
 */


/**
 * @swagger
 * /: # 接口地址
 *   post: # 请求体
 *     tags: [搞了个Swagger，但是我的项目架构不适合使用Swagger] # 模块名称
 *     description: 搞了个Swagger，但是我的项目架构不适合使用Swagger，因为我的接口使用函数包裹生成的 # 接口信息
 *     produces: 
 *       - application/x-www-form-urlencoded # 响应内容类型
 *     parameters: # 请求参数
 *       - name: password
 *         description: 用户密码
 *         in: formData # 参数的位置，可能的值有 "query", "header", "path" 或 "cookie" 没有formData，但是我加了不报错
 *         required: true
 *         type: string
 *       - name: name
 *         description: 用户名
 *         in: formData
 *         required: true
 *         type: string # 可能的值有string、number、file（文件）等
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: # 返回体说明
 *           type: 'object'
 *           properties:
 *             code:
 *               type: 'number'
 *             data:
 *               type: 'object'
 *               description: 返回数据
 *             message:
 *               type: 'string'
 *               description: 消息提示
 *       '400':
 *         description: 请求参数错误
 *       '404':
 *         description: not found
 */

routes.forEach(item => {
  // `../services/admin`
  const service = require(`../services/${item.service}`)

  // router.get('/api/admin/add',(cxt)=>{})
  router[item.method](item.path, service[item.action])
})

module.exports = router
