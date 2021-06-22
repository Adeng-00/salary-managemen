/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:43:17
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-16 00:21:21
 * @Description: common模块 sql操作
 * @FilePath: \node-server\controller\common\index.js
 */

const { query } = require('../db-init')
const STATUS = require('../enum')
const { getTokenByUser } = require('../../utils/token-tools');
const { formatInsertSql, formatSearchSql } = require('../../utils/sql-format')

// 查询前端日志 数据
const listWebLogs = val => {
  const { sql } = formatSearchSql(`select * from web_log where status != ${STATUS.DEL} `, val, 'web_log')
  return query(sql, [])
}

// 添加前端日志
const addWebLog = (val) => {
  const { args, sql } = formatInsertSql('insert into web_log(', val)
  return query(sql, [...args, STATUS.NORMAL])
}

// 刷新token
const refreshToken = (val) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = getTokenByUser(val.refreshToken)
      resolve([payload])
    } catch (error) {
      reject(error)
    }
  })
}

// 注册
const register = (val) => {
  const { account, password } = val
  const _sql = 'insert into account(account,password,status,create_time) values(?,?,?,now());'
  return query(_sql, [account, password, STATUS.NORMAL])
}

// 登录
const login = (val) => {
  const { account, password } = val
  const _sql = 'select * from account where account = ? and password = ? and status = ?'
  return query(_sql, [account, password, STATUS.NORMAL])
}

module.exports = {
  register,
  login,
  refreshToken,
  addWebLog,
  listWebLogs
}