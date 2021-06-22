/*
 * @Author: cui DengKe
 * @Date: 2021-06-11 17:52:47
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-12 16:42:15
 * @Description: 集中定义使用的接口类型   
 * @FilePath: \node-server\routes\methods.js
 */

/* 
 采用 Restfule 风格
（1）每种url代表了一种资源。
（2）客户端和服务器之间，传递这个资源的某种表现层。
（3）客户端通过四个http动词，对服务器资源进行操作。实现表现层状态的转化。 
*/

module.exports = {
  get: 'get',
  post: 'post',
  put: 'put',
  del: 'delete'
}