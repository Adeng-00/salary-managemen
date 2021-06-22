/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 19:43:22
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-15 23:30:06
 * @Description: 格式化sql语句
 * @FilePath: \node-server\utils\sql-format.js
 */

const STATUS = require('../controller/enum')

/**
 * @description: 驼峰变量名称 转下划线  配合格式化 sql查询语句 使用
 * @param {String} value 'jobNumber'
 * @return {*} 'job_number'
 */
const formatParamToLine = (value) => {
  return value.replace(/([A-Z])/g, "_$1").toLowerCase()
}

/**
 * 格式化 sql插入语句  insert into staff(
 * @param {String} sql 开始sql 主要为了确认查询的是那张表
 * @param {Object} params 客户端传入的参数
 * @returns {Object} args 插入数据的数据 和 key的顺序对应  sql 语句
 */
const formatInsertSql = (sql, params) => {
  let arr = []
  let arrData = []
  Object.keys(params).forEach((key) => {
    if (key !== 'id' && key !== 'createTime' && key !== 'status') {
      // 拼接 sql 语句
      sql = sql + `${formatParamToLine(key)},`
      arr.push('?')
      arrData.push(params[key])
    }
  })
  sql += 'status,create_time) values(' + arr.join() + ',?,now())'

  console.log("插入的sql===>", sql)
  console.log("------------------------")
  return {
    args: arrData,
    sql
  }
}

/**
 * @description: 格式化 sql查询语句 select * from staff where status != ? and name like '%大%' order by id desc limit 0,0; select FOUND_ROWS() as total
 * @description: 格式化 sql查询语句 查询需要执行多条sql语句  所以必须开启mysql可以执行多条查询语句
 * @param {String} sql 开始sql 主要为了确认查询的是那张表
 * @param {Object} params 客户端传入的参数
 * @param {String} tableName 要操作的表名
 * @return {Object} 返回 sql 语句 
 */
const formatSearchSql = (_sql, params, tableName) => {
  const oTemp = {} // 临时变量 储存要跳过的数据  要是展示的数据条数
  // 计算 要跳过的数据条数 limit 参数一定要是Number 类型
  oTemp.nSkip = Number(params.current) === 1 ? 0 : parseInt(Number(params.current) - 1) * Number(params.size)
  oTemp.pSize = Number(params.size)
  // 最后部分的sql 语句  limit 和 total
  let lastSql = `order by id desc limit ${oTemp.nSkip},${oTemp.pSize}; select count(*) as total from ${tableName}`
  // 这里约定 默认只有current、size两个参数 只是普通的分页查询需要limit 
  // 超过两个参数就是有别的参数 都当作中文 like 模糊查询 并且不需要limit 分页查询
  if (Object.keys(params).length > 2) {
    // 删除不需要的数据
    delete params.size
    delete params.current
    // 循环拼接sql
    for (const item in params) {
      _sql += `and ${formatParamToLine(item)} like '%${params[item]}%' `
    }
  }

  console.log("查询的sql===>", _sql + lastSql)
  console.log("------------------------")
  return {
    sql: _sql + lastSql
  }
}

/**
 * 格式化 sql更新语句  update tour_admin set account = ? ,phone = ? ,where id = ? ["account","phone","id"]
 * @param {String} sql 开始sql 主要为了确认查询的是那张表
 * @param {Object} params 客户端传入的参数
 * @returns {Object} 返回 sql 语句 
 */
const formatUpdateSql = (sql, params) => {
  Object.keys(params).forEach((key) => {
    if (key !== 'id' && key !== 'createTime' && key !== 'status') {
      // 拼接 sql 语句
      sql = sql + `${formatParamToLine(key)} = '${params[key]}',`
    }
  })
  // 删除最后一个 逗号 并添加  where id 语句
  sql = sql.substring(0, sql.length - 1) + ` where id = ${params.id}`

  console.log("修改的sql===>", sql)
  console.log("------------------------")
  return {
    sql: sql
  }
}

// const formatUpdateSql = (sql, params) => {
//   let keys = Object.keys(params)
//   let arr = []
//   keys.forEach((key) => {
//     if (key) {
//       // 拼接 sql 语句
//       sql = sql + `${key} = ? ,`
//       // 更新的数据
//       arr.push(params[key])
//     }
//   })
//   // 删除最后一个 逗号
//   sql = sql.substring(0, sql.length - 1)

//   return {
//     args: arr,
//     sql,
//   }
// }

module.exports = {
  formatParamToLine,
  formatInsertSql,
  formatUpdateSql,
  formatSearchSql
}
