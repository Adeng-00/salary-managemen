/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:37
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 21:10:33
 * @Description: file content
 * @FilePath: \vue-salary-management\src\store\index.js
 */

// VueX4.0 初始化store方法
import { createStore } from 'vuex'
// VueX 持久化插件
import createPersistedState from "vuex-persistedstate";

import getters from './getters'

// 获取modules 下以ts  结尾的文件
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


export default createStore({
  modules,
  getters,
  plugins: [createPersistedState({ // 持久化的数据 存入sessionStorage
    storage: window.sessionStorage
  })]
})