/*
 * @Author: cui DengKe
 * @Date: 2021-06-11 17:56:41
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-12 23:12:17
 * @Description: 初始化 mysql数据库
 * @FilePath: \node-server\controller\db-init.js
 */
const mysql = require('mysql')

const config = require('../config/default')

// 连接池
const pool = mysql.createPool(config.database)

/**
 * @description: 对数据库进行增删改查操作的基础
 * @param {string} sql sql 语句
 * @param {Array} values 参数
 * @return {Array} 查询结果
 */
const query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query
}