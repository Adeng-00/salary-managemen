/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:35:24
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-15 12:39:27
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

// 返回示例
// router.get('/api/admin/add',(cxt)=>{})

routes.forEach(item => {
  // `../services/admin`
  const service = require(`../services/${item.service}`)

  // router.get('/api/admin/add',(cxt)=>{})
  router[item.method](item.path, service[item.action])
})

module.exports = router
