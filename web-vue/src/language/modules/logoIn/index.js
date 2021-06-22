/*
 * @Author: cui DengKe
 * @Date: 2021-06-18 13:17:51
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-18 22:31:43
 * @Description:  登录模块 国际化翻译
 * @FilePath: \vue-salary-management\src\language\modules\logoIn\index.js
 */

import formatI18n from '../formatI18n';

const lang = {
  Account: ['账号', 'Account'],
  Password: ['密码', 'Password'],
  verificationCode: ['验证码', 'Verification Code'],
  VerificationError: ['验证码有误，请注意大小写！', 'Verification code Error, please pay attention to the case!'],
  signIn: ['登录', 'Sign in'],
  Register: ['注册', 'Register'],
  ConfirmPassword: ['确认密码', 'Confirm Password'],
  PasswordMismatch: ['密码不匹配', 'Password Mismatch'],
  BackLogin: ['返回登录', 'Back to login'],
  LoginSuccess: ['登录成功，欢迎回来', 'Login success, welcome back'],
  RegistrationCompleted: ['注册完成，请保存好您的账号密码！', 'Registration completed, please save your account password!']
}

export default formatI18n(lang, 'logoInI18n')