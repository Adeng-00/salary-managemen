/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 13:58:52
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-16 13:29:33
 * @Description: 薪资模块  sql操作
 * @FilePath: \node-server\controller\salary\index.js
 */

const { query } = require('../db-init')
const STATUS = require('../enum')

const { formatInsertSql, formatUpdateSql, formatSearchSql } = require('../../utils/sql-format')

// 查询薪资 数据
const list = val => {
  const { sql } = formatSearchSql(`select * from salary where status != ${STATUS.DEL} `, val, 'salary')
  return query(sql, [])
}

// 删除薪资 数据
const del = (val) => {
  const { id } = val
  const sql = 'update salary set status = ? where id = ?'
  return query(sql, [STATUS.DEL, id])
}

// 修改薪资 数据
const update = (val) => {
  const { sql } = formatUpdateSql('update salary set ', val)
  return query(sql, [])
}

// 添加薪资 数据
const add = (val) => {
  const { args, sql } = formatInsertSql('insert into salary(', val)
  return query(sql, [...args, STATUS.NORMAL])
}

module.exports = {
  add,
  del,
  update,
  list
}