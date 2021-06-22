/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:43:17
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-13 20:48:41
 * @Description: admin模块 sql操作
 * @FilePath: \node-server\controller\admin\index.js
 */

const { query } = require('../db-init')
const { formatUpdateSql, formatSearchSql } = require('../../utils/sql-format')
const STATUS = require('../enum')

// 修改用户
const update = (val) => {
  const { account, password, id } = val
  const _sql = 'update account set '
  const { sql, args } = formatUpdateSql({ account, password }, _sql)
  _sql = sql + 'where id = ?'
  return query(_sql, [...args, id])
}

// 查询用户
const list = val => {
  const sql = 'select * from account where status != ?'
  return query(sql, [STATUS.DEL])
}

// 删除用户
const del = val => {
  const { id } = val
  const sql = 'update account set status = ? where id = ?'
  return query(sql, [STATUS.DEL, id])
}

module.exports = {
  list,
  update,
  del,
}