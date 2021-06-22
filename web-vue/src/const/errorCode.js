/*
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-16 09:17:50
 * @Description: http 错误状态码 提示信息
 * @FilePath: \vue-salary-management\src\const\errorCode.js
 */
const errorCode = {
  '000': '操作太频繁，请勿重复请求',
  '401': '身份验证失败,请重新登录',
  '403': '当前操作没有权限',
  '404': '资源不存在',
  '417': '未绑定登录账号，请使用密码登录后绑定',
  '423': '演示环境不能操作',
  '426': '用户名不存在或密码错误',
  '428': '验证码错误,请重新输入',
  '429': '请求过频繁',
  '479': '演示环境，没有权限操作',
  'default': '系统未知错误,请反馈给管理员'
  // '000': ' Operation is too frequent, do not repeat the request！',
  // '401': ' The current operation has no permissions!',
  // '403': 'The current operation has no permissions!',
  // '404': 'Resources don not exist',
  // '417': ' Login account is not bound, please use password to bind after login! ',
  // '423': ' The demo environment did not work!',
  // '426': ' There is no username or password error!',
  // '428': ' Verification code error, please re-enter',
  // '429': 'Request too frequently!',
  // '479': 'Demo environment, no permission operation！',
  // 'default': ' System error unknown, please feedback to the administrator！'
}

export default errorCode