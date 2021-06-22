/*
 * @Author: cui DengKe
 * @Date: 2021-06-15 14:20:14
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-15 15:45:17
 * @Description: log4js 配置文件
 * @FilePath: \node-server\config\log-config.js
 */

module.exports = {
  appenders: {
    console: {
      type: 'console'
    },
    success: {
      // encoding: "utf-8", // 使用的字符集
      // maxLogSize: 5 * 1000 * 1000, // 超过多少(byte)就切割
      // backups: 100, // 保留旧日志数量(default: 5)
      // compress: true, // 缩成.gz格式
      type: 'dateFile',
      filename: 'logs/SuccessLog', // 生成文件路径和文件名
      alwaysIncludePattern: true, //  文件名始终以日期区分 代表在最新的一个日志文件里追加日志(默认是在errors.log文件写入内容)
      pattern: '-yyyy-MM-dd.log', // 文件名始终以日期区分 通过日期来生成文件
      keepFileExt: true // 切割的日志保留文件扩展名，false(默认):生成类似default.log.1文件;true:生成类似default.1.log
    },
    errors: {
      // daysToKeep: 0, // 大于0则会删除x天之前的日志
      type: 'dateFile', // 日志类型为 dateFile
      filename: 'logs/ErrorsLog', // 日志输出位置
      alwaysIncludePattern: true, //  文件名始终以日期区分 代表在最新的一个日志文件里追加日志(默认是在errors.log文件写入内容)
      pattern: '-yyyy-MM-dd.log', // 文件名始终以日期区分 通过日期来生成文件
      keepFileExt: true // 切割的日志保留文件扩展名，false(默认):生成类似default.log.1文件;true:生成类似default.1.log
    }
  },
  categories: {
    default: { // 默认的
      appenders: ['console'],
      level: 'info'
    },
    success: {  // 成功的
      appenders: [
        'success'
      ],
      level: 'info'
    },
    errors: { // 错误
      appenders: [
        'errors'
      ],
      level: 'error'
    },
    // application: { appenders: ['application'], level: 'WARN' } // 应用级别
  }
}
