/*
 * @Author: cui DengKe
 * @Date: 2021-06-15 22:07:56
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 11:27:19
 * @Description: 全局 错误日志 处理
 * @FilePath: \vue-salary-management\src\plugins\errorLog.js
 */

// 安装 Vue.js 插件。如果插件是一个对象，它必须暴露一个 install 方法。如果它本身是一个函数，它将被视为安装方法。
// 该安装方法将以应用实例作为第一个参数被调用。传给 use 的其他 options 参数将作为后续参数传入该安装方法。

import { addWebLogPort } from '@/api/commonApi';

export default {
  install: (app) => {
    app.config.errorHandler = (err, vm, info) => {
      // 
      /* 
      `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
      `err：` 异常信息 异常名称 异常脚本url 异常行号 异常列号 异常堆栈信息
      const { message, name, script, line, column, stack } = err
      */
      const { message, name, stack } = err

      if (process.env.NODE_ENV === 'development') {
        console.group('>>>>>> Vue 特定的错误信息 >>>>>>')
        console.log(info)
        console.groupEnd()
        console.group('>>>>>> Vue 实例 >>>>>>')
        console.log(vm)
        console.groupEnd()
        console.group('>>>>>> Vue Catch Error >>>>>>')
        console.log(err)
        console.groupEnd()
      }
      else {
        // 异常名称 +  异常信息 + 异常堆栈信息 + Vue 特定的错误信息
        addWebLogPort({ name, info: message, stack, vueInfo: info }).then((result) => {
          console.log("result==>", result)
        }).catch((err) => {
          console.log("添加前端日志接口错误==>", err)
        })
      }
    }
  }
}