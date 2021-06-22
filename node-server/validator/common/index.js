/*
 * @Author: cui DengKe
 * @Date: 2021-06-11 22:07:43
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-12 11:30:44
 * @Description: 校验 common 模块
 * @FilePath: \node-server\validator\common\index.js
 */

const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.account, { min: 5, max: 12 })) {
    errors.account = '账号的长度不能小于3位且不能超过12位';
  }

  if (!Validator.isLength(data.password, { min: 5, max: 64 })) {
    errors.password = '密码的长度不能小于3位且不能超过64位';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}