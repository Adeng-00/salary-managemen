/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 18:03:35
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 08:51:41
 * @Description: config 配置 之后有时间 转用 env2中间件
 * @FilePath: \node-server\config\default.js
 */
/**
 * 项目的配置
 */

module.exports = {
  port: 3000,// 服务启动端口
  secret: 'dengKe', // token 信息 加密字段
  database: { // 数据库配置
    host: 'localhost', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    port: '3306', // mysql服务运行的端口
    database: 'salary_management', // 使用的库名
    user: 'root', // 用户名
    password: 'root', // 用户密码
    // 为了安全起见，默认情况下是不允许执行多条查询语句的。要使用多条查询语句的功能，就需要在创建数据库连接的时候打开这一功能：
    multipleStatements: true  // 允许执行多条sql 查询语句 
  },
  redis_conf: {
    port: 6379,
    host: '127.0.0.1'
  }
}
