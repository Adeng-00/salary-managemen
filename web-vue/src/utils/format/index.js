/*
 * @Author: cui DengKe
 * @Date: 2021-06-12 17:42:08
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-13 22:40:40
 * @Description: file content
 * @FilePath: \vue-salary-management\src\utils\format\index.js
 */

import { isEmpty } from '../validator';

/**
 * @description: 根据Value 返回对应的 Label
 * @param {String} val 值
 * @param {Array} data 数据源
 * @return {String} 对应的 Label
 */
export const filterValueBackLabel = (val, data) => {
  if (isEmpty(val)) return val
  const oTemp = data.find(f => String(f.value) === String(val))
  if (oTemp) return oTemp.label
  else return val
}

/**
 * @description: 下划线变量名称 转驼峰
 * @param {String} value 'format_hump'
 * @return {String} 'formatHump'
 */
export const formatHump = (value) => {
  const sArr = value.split("_");
  let sRte = sArr[0];
  for (let i = 1; i < sArr.length; i++) {
    sRte = sRte + sArr[i].slice(0, 1).toUpperCase() + sArr[i].slice(1);
  }
}