/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:35:30
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 20:08:11
 * @Description: file content
 * @FilePath: \node-server\services\model\index.js
 */

/**
 * @description 接口工厂函数 生成回调方法
 * @param {Array} config 方法名字数组，需要生成的函数名字
 * @param {String} file 文件名 用于 require controller对应的文件里的sql语句
 * @returns {Object} {list: (ctx) => { },add: (ctx) => { }, ...} 
 * @returnsParam 每一个对象都事一个func key为config里需要生成的函数名字
 */

const { success, failed } = require('../../utils/response-format')

module.exports = (config, file) => {
  // `../../controller/admin`
  const controller = require(`../../controller/${file}`)

  return config.reduce((copy, name) => {
    // name 接口 动作list add or...
    copy[name] = async ctx => {
      let res;
      try {
        // 拿到前端传递的参数
        let val = ctx.request.body
        // 约定查询都是 list开头 并且是 get请求
        const isList = /^list/g.test(name)
        const isGet = /^get/g.test(name)
        if (isList || isGet) { // get请求 从query 拿数据
          val = ctx.query
        }
        // 根据动作 去controller 中拿到对应的 sql操作函数
        // controller['list'](val).then(result=> { })
        await controller[name](val).then(result => {
          const temp = {}
          temp.data = isGet ? result : result[0]
          if (isList) { // get请求 拿到total 数据
            temp.total = result[1][0].total
          }
          res = success(temp)
        })
      } catch (err) {
        res = failed(err)
      }
      // 返回body 数据 ctx.write(res) 下划线转驼峰
      ctx.write(res)
      // ctx.body = res
    }
    return copy
  }, {})
}
