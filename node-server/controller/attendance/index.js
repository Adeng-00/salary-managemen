/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 11:00:42
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-14 13:56:42
 * @Description: 出勤模块  sql操作
 * @FilePath: \node-server\controller\attendance\index.js
 */

const { query } = require('../db-init')
const STATUS = require('../enum')

const { formatInsertSql, formatUpdateSql, formatSearchSql } = require('../../utils/sql-format')

// 查询出勤 数据
const list = val => {
  const { sql } = formatSearchSql(`select * from attendance where status != ${STATUS.DEL} `, val, 'attendance')
  return query(sql, [])
}

// 删除出勤 数据
const del = (val) => {
  const { id } = val
  const sql = 'update attendance set status = ? where id = ?'
  return query(sql, [STATUS.DEL, id])
}

// 修改出勤 数据
const update = (val) => {
  const { sql } = formatUpdateSql('update attendance set ', val)
  return query(sql, [])
}

// 添加出勤 数据
const add = (val) => {
  // const { name, department, leaveEarly, late, noClockIn, workOvertime, nogNotWritten } = val
  // const _sql = `name,department,leave_early,late,no_clock_in,work_overtime,nog_not_written,status,create_time) values(?,?,?,?,?,?,?,?,now());`
  // return query(_sql, [name, department, leaveEarly, late, noClockIn, workOvertime, nogNotWritten, STATUS.NORMAL])
  const { args, sql } = formatInsertSql('insert into attendance(', val)
  return query(sql, [...args, STATUS.NORMAL])
}

module.exports = {
  add,
  del,
  update,
  list
}