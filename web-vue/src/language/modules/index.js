/*
 * @Author: cui DengKe
 * @Date: 2021-06-18 13:06:14
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-18 13:37:38
 * @Description: 模块化翻译文件 入口
 * @FilePath: \vue-salary-management\src\language\modules\index.js
 */

/**
 * @description: 用引入多个文件 获取i18n数据
 * @param {String} directory:表示检索的目录
 * @param {String} useSubdirectories：表示是否检索子文件夹
 * @param {regExp} regExp:匹配文件的正则表达式,一般是文件名
 * @return {File} module 文件
 */
const files = require.context('./', true, /index\.js$/)

// 语言对象
const lang = { ch: {}, en: {} }

files.keys().forEach(e => {
  // 排除掉自身文件
  if (e !== './index.js') {
    const f = files(e).default

    if (lang.ch[f.name]) {
      throw Error('翻译文件有模块名冲突' + f.name + '@' + e)
    }

    lang.ch[f.name] = f.ch
    lang.en[f.name] = f.en
  }
})

export default lang