/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:23:32
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 13:33:51
 * @Description: 项目入口文件
 * @FilePath: \vue-salary-management\src\main.js
 */

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);
app.config.productionTip = false;

import router from './router'
app.use(router);

import store from './store'
app.use(store);

// 指定一个处理函数，来处理组件渲染方法执行期间以及侦听器抛出的未捕获错误。这个处理函数被调用时，可获取错误信息和应用实例。
import errorLog from './plugins/errorLog'
app.use(errorLog)

// 国际化配置
import VueI18n from './language'
app.use(VueI18n);

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
app.use(Antd);

// 全局指令 防抖 节流 拖拽 权限（暂未实现）
import directive from './plugins/directive'
app.use(directive)

// 挂载 #app 上
app.mount('#app')
