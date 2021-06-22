/*
 * @Author: cui DengKe
 * @Date: 2021-06-18 12:11:53
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-18 22:33:11
 * @Description: vue-i8n 多语言配置
 * @FilePath: \vue-salary-management\src\language\index.js
 */

import { createI18n } from 'vue-i18n'	//引入vue-i18n组件

import modules from './modules'		//引入vue-i18n组件

import { getStorage } from '@/utils/storage'

// https://vue-i18n.intlify.dev/guide/advanced/composition.html

//注册i8n实例并引入语言文件
const i18n = createI18n({
  globalInjection: true,// 通过隐式注入组件的属性和函数
  legacy: false, // you must set `false`, to use Composition API
  locale: getStorage('LANG', 'local') || 'ch',		//默认显示的语言 
  messages: {
    ch: modules.ch,	//引入语言文件
    en: modules.en
  }
})

export default i18n; //将i18n暴露出去，在main.js中引入挂载