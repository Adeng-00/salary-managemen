/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:25:57
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-18 15:26:27
 * @Description: 操作token的工具函数 设置 检查 获取
 * @FilePath: \node-server\utils\token-tools.js
 */

const jwt = require('jsonwebtoken')
const config = require('../config/default')

/**
 * @description: 根据token解析 用户信息
 * @param {String} sToken token 要解析的token
 * @return {String} 用户信息
 */
const getTokenByUser = (sToken) => {
  return jwt.verify(sToken, config.secret)
}

/**
 * @description: 检查 token的中间件
 */
const checkToken = async (ctx, next) => {
  // koa-jwt 使用ctx.state.user就能判断是否有 权限
  if (ctx.state.user) {
    // 如果携带有效 Token 就对 Token 进行检查（由 kow-jwt 检查 Token 有效性）
    try {
      const token = ctx.headers.authorization
      const payload = jwt.verify(token.split(' ')[1], config.secret)
      if (payload.account === ctx.state.user.account && payload.create_time === ctx.state.user.create_time) {
        await next()
      }
    } catch (error) {
      // token过期 生成新的token 将新token放入Authorization中返回给前端
      // ctx.res.setHeader('Authorization', setToken()());
      ctx.body = {
        code: 401,
        msg: "Token 检查未通过"
      }
    }
  } else {
    // 如果没有携带 Token 就跳过检查
    await next()
  }
}

/**
 * @description: 设置token
 * @param {Object} user 用户信息  根据用户信息生成 token
 * @return {String} token
 */
const setToken = (user) => {
  return jwt.sign(user, config.secret, { expiresIn: '1h' })
}

module.exports = {
  setToken,
  checkToken,
  getTokenByUser
}