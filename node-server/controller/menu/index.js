/*
 * @Author: cui DengKe
 * @Date: 2021-06-20 15:38:36
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:49:47
 * @Description: menu 菜单模块 sql操作
 * @FilePath: \node-server\controller\menu\index.js
 */

const { query } = require('../db-init')
const STATUS = require('../enum')

const { formatInsertSql, formatUpdateSql, formatSearchSql } = require('../../utils/sql-format')
const { formatTree } = require('../../utils/response-format')

// 查询所有的菜单 数据
const getMenuAll = async val => {
  const sql = `select * from menu where status != ${STATUS.DEL}`
  const hijack = await query(sql, [])
  return new Promise((resolve, reject) => {
    try {
      const resData = formatTree(hijack)
      resolve(resData)
    } catch (error) {
      reject(error)
    }
  })
}

// 删除某个菜单 数据
const del = (val) => {
  const { id } = val
  const sql = 'update menu set status = ? where id = ?'
  return query(sql, [STATUS.DEL, id])
}

// 修改某个菜单  数据
const update = (val) => {
  const { sql } = formatUpdateSql('update menu set ', val)
  return query(sql, [])
}

// 添加一个菜单  数据
const add = (val) => {
  const { args, sql } = formatInsertSql('insert into menu(', val)
  return query(sql, [...args, STATUS.NORMAL])
}

module.exports = {
  add,
  del,
  update,
  getMenuAll
}