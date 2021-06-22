/*
 * @Author: cui DengKe
 * @Date: 2021-06-16 22:46:58
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-16 22:52:27
 * @Description: 用于生成uuid
 * @FilePath: \node-server\utils\guid.js
 */

const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

const guid = () => {
  return (S4() + S4() + "-" + S4() + S4() + "-" + S4() + S4() + "-" + S4() + S4());
}

/**
 * @description: 生成 guid
 * @param {String} tag 自己的标识
 * @return {String} guid
 */
const generateGuid = (tag = 'dk') => {
  return tag + guid();
}

module.exports = {
  S4,
  guid,
  generateGuid
}