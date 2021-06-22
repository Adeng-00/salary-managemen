/*
 * @Author: cui DengKe
 * @Date: 2021-06-20 20:11:49
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 20:51:03
 * @Description: 权限模块  服务
 * @FilePath: \node-server\controller\permission\index.js
 */

const { query } = require('../db-init')
const STATUS = require('../enum')

const { formatInsertSql, formatUpdateSql, formatSearchSql } = require('../../utils/sql-format')

// 查询所有权限 数据
const getPermissionAll = val => {
  const sql = `select * from permission where status!= ${STATUS.DEL}`
  return query(sql, [])
}

// 查询某个菜单下的权限 数据
const getPermission = val => {
  const { menuId } = val
  // const sql = `select p.* from menu as m inner join permission as p on m.id = p.menu_id and m.status!=1  and p.status!=1 `
  const sql = `select p.* from menu as m inner join permission as p on m.id = ${menuId} and p.menu_id = ${menuId}  and m.status!= ${STATUS.DEL}  and p.status!= ${STATUS.DEL}`
  return query(sql, [])
}

// 删除某个菜单的下的权限 数据
const del = (val) => {
  const { id } = val
  const sql = 'update permission set status = ? where id = ?'
  return query(sql, [STATUS.DEL, id])
}

// 修改某个菜单的下的权限 数据
const update = (val) => {
  const { sql } = formatUpdateSql('update permission set ', val)
  return query(sql, [])
}

// 添加某个菜单的下的权限 数据
const add = (val) => {
  const { args, sql } = formatInsertSql('insert into permission(', val)
  return query(sql, [...args, STATUS.NORMAL])
}

module.exports = {
  add,
  update,
  del,
  getPermission,
  getPermissionAll
}