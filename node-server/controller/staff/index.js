/*
 * @Author: cui DengKe
 * @Date: 2021-06-12 14:29:32
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-15 11:13:28
 * @Description: 员工模块  sql操作
 * @FilePath: \node-server\controller\staff\index.js
 */

const { query } = require('../db-init')
const STATUS = require('../enum')

const { formatInsertSql, formatUpdateSql, formatSearchSql } = require('../../utils/sql-format')

// 查询员工 只需要id,name
const listIdAndName = val => {
  const { sql } = formatSearchSql(`select id, name from staff where status != ${STATUS.DEL} `, val, 'staff')
  return query(sql, [])
}

// 查询员工 数据
const list = val => {
  const { sql } = formatSearchSql(`select * from staff where status != ${STATUS.DEL} `, val, 'staff')
  return query(sql, [])
}

// 删除员工 数据
const del = (val) => {
  const { id } = val
  const sql = 'update staff set status = ? where id = ?'
  return query(sql, [STATUS.DEL, id])
}

// 修改员工 数据
const update = (val) => {
  const { sql } = formatUpdateSql('update staff set ', val)
  return query(sql, [])
}

// 添加员工 数据
const add = (val) => {
  const { args, sql } = formatInsertSql('insert into staff(', val)
  return query(sql, [...args, STATUS.NORMAL])
}

module.exports = {
  add,
  del,
  update,
  list,
  listIdAndName
}