/*
 * @Author: cui DengKe
 * @Date: 2021-06-18 13:06:07
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-18 13:35:54
 * @Description: 生成i18n 需要的数据格式
 * @FilePath: \vue-salary-management\src\language\modules\formatI18n.js
 */

/**
 * @description: 生成i18n 需要的数据格式
 * @param {Object} lang 数据对象
 * @param {String} name 模块名称
 * @return {Object} 转化后的 数据对象： { 模块名称, 中文对象, 英文对象}
 */
export default (lang, name) => {
  const ch = {}
  const en = {}
  // 遍历 lang 数据对象 取出对应的 中文、英文 约定好 [0]中文 [1]英文
  Object.keys(lang).forEach(e => {
    ch[e] = lang[e][0]
    en[e] = lang[e][1]
  })
  return {
    name,
    ch,
    en
  }
}