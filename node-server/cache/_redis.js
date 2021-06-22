/*
 * @Author: cui DengKe
 * @Date: 2021-06-17 08:50:07
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 09:17:21
 * @Description: redis 配置 连接redis的方法，get set
 * @FilePath: \node-server\cache\_redis.js
 */

const redis = require('redis')
const { redis_conf } = require('../config/default')

const { errLogger } = require('../utils/log-format');


//创建客户端
const redisClient = redis.createClient(redis_conf.port, redis_conf.host)



/**
 * @description 设置键值
 * @param {string} key 键
 * @param {string} value 值
 * @param {number} expire 过期时间 单位s 
 * @param {string} dbNum 库号
 * @return {Promise<*>}
 */
const set = (key, value, expire = 60 * 60, dbNum) => {
  if (typeof value == 'object') {
    value = JSON.stringify(value)
  }

  // console.log(`[redis]set key=${key}  value=${value}  expire=${expire}  dbNum=${dbNum}`)
  if (!dbNum) {
    dbNum = 0
  }

  return new Promise((resolve, reject) => {
    redisClient.select(dbNum, function (err) { // 设置库
      if (err) {
        errLogger.error('redis set 选库失败：' + err); // 记录redis 异常
        reject('redis set 选库失败：' + err)
        console.error('redis set 选库失败：' + err)
        // throw new Error('redis set 选库失败：'+err);
      } else {
        redisClient.set(key, value, function (err, result) { // 设置值
          if (err) {
            errLogger.error('redis插入失败：' + err); // 记录redis 异常
            reject('redis插入失败：' + err)
            console.error('redis插入失败：' + err)
            // throw new Error('redis插入失败：'+err);
          } else {
            if (!isNaN(expire) && expire > 0) {
              redisClient.expire(key, parseInt(expire));//设置过期时间
            }
            resolve(result);
          }
        })
      }

    })
  })
  // 简化版 set
  // redisClient.set(key, val)
  // redisClient.expire(key, timeout)
}

/**
 * @description 获取缓存
 *  @param {string} key 键
 * @param {string} dbNum 库号
 * @return {Promise<*>}
 */
const get = (key, dbNum) => {
  // console.log(`[redis]get key=${key} dbNum=${dbNum}`)
  if (!dbNum) {
    dbNum = 0
  }

  return new Promise((resolve, reject) => {
    redisClient.select(dbNum, function (err) { // 连接库
      if (err) {
        errLogger.error('redis set 选库失败：' + err); // 记录redis 异常
        reject('redis set 选库失败：' + err)
        console.error('redis set 选库失败：' + err)
        // throw new Error('redis get 选库失败：'+err);
      } else {
        redisClient.get(key, function (err, result) { // 获取值
          if (err) {
            errLogger.error('redis读取失败：' + err); // 记录redis 异常
            reject('redis读取失败：' + err)
            console.error('redis读取失败：' + err)
            // throw new Error('redis get 获取失败：'+err);
          } else {
            resolve(result);
          }
        })
      }
    })
  })
}

module.exports = {
  get,
  set
}