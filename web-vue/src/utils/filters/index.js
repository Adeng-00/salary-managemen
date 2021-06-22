/*
 * @Author: cui DengKe
 * @Date: 2021-06-16 21:22:21
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-16 21:38:38
 * @Description: 过滤器 工具函数
 * @FilePath: \vue-salary-management\src\utils\filters\index.js
 */

/**
 * @description: 是否是图片类型的文件
 * @param {String} filename 文件名
 * @return {Boolean} 是、否
 */
export const isImg = (filename) => {
  if (!filename || typeof filename !== 'string') {
    return new Error('过滤文件名后缀错误！可能没有值或者不是字符串！')
  }
  const reg = /(\.png|\.jpg|\.jpeg|\.gif|\.PNG|\.JPEG|\.JPG|\.GIF)$/
  return reg.test(filename)
}

/**
 * @description: 过滤文件 后缀名
 * @param {String} filename 文件名
 * @return {String} 后缀名
 */
export const getSuffixFilter = (filename) => {
  if (!filename || typeof filename !== 'string') {
    return new Error('过滤文件名后缀错误！可能没有值或者不是字符串！')
  }

  const suffix = filename.split('.')[1].toUpperCase()

  if (['TXT', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PDF', 'PPT', 'ZIP'].includes(suffix)) {
    return suffix.toLowerCase()
  } else if (['PNG', 'JPG', 'JPEG', 'GIT'].includes(suffix)) {
    return 'other'
  }
}