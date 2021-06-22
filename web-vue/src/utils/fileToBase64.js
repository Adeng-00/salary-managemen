/*
 * @Author: cui DengKe
 * @Date: 2021-06-17 09:39:44
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 09:41:36
 * @Description: 图片文件转换为Base64
 * @FilePath: \vue-salary-management\src\utils\fileToBase64.js
 */


/**
 * @description: 
 * @param {*} imageFile 对应file文件的raw属性
 * @param {*} callback 转换成功的回调函数
 * @param {*} errorCallback 转换失败的回调函数
 * @return {*}
 */

// convertImgToBase64(this.file.raw, base64Str => console.log(base64Str), error => console.log(error));

export const convertImgToBase64 = (imageFile, callback, errorCallback) => {
  try {
    let reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.onload = function (e) {
      if (callback) {
        let base64Str = e.target.result
        callback(base64Str)
      }
    }
  } catch (error) {
    console.error(error)
    if (errorCallback) {
      errorCallback(error)
    }
  }
}