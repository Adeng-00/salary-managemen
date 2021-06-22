/*
 * @Author: cui DengKe
 * @Date: 2021-06-12 11:38:04
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-13 23:01:51
 * @Description: 校验工具
 * @FilePath: \vue-salary-management\src\utils\validator\index.js
 */

/**
 * @description: 数据类型检测
 * @param {data} any 要进行数据类型检测的数据
 * @return {type} :string 对应的数据类型
 */
export const backType = (data) => {
  const template = {
    "[object Array]": "array",
    "[object Object]": "object",
    "[object Number]": "number",
    "[object Boolean]": "boolean",
    "[object String]": "string",
    "[object Null]": "null",
    "[object Date]": "date",
    "[object Function]": "function",
    "[object RegExp]": "regExp",
    "[object Symbol]": "symbol",
    "[object BigInt]": 'bigInt'
  }
  const result = Object.prototype.toString.call(data);
  return template[result];
}

/**
 * @description: 是否为空
 * @param {*} value
 * @return {Boolean} 
 */
export const isEmpty = value => {
  return (
    value == undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

/**
 * @description: 手机号验证
 * @param {String | Number} value
 * @return {Boolean} 
 */
export const isPhone = value => {
  let regPhone = /^1[3456789]\d{9}$/;
  return regPhone.test(value)
}

/**
 * @description: 密码格式验证 6-20个字符 数字 + 英文
 * @param {String} value
 * @return {Boolean}
 */
export const checkPassword = value => {
  let regPassword = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return regPassword.test(value)
}
