/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:54:48
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-18 20:29:54
 * @Description: axios 二次封装
 * @FilePath: \vue-salary-management\src\utils\http.js
 */
import axios from 'axios'
import qs from 'qs'
import router from "@/router/index"
import { getStorage, cleStorage } from "@/utils/storage"

import errorCode from '@/const/errorCode'
import { message } from 'ant-design-vue';

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

axios.defaults.timeout = 10000 // 请求超时，适当修改
axios.defaults.validateStatus = function (status) { // 返回其他状态吗
  return status >= 200 && status <= 500 // 默认的
}
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/salary', // 基础url

  NProgress.configure({
    showSpinner: false
  })

// http request 请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers['Authorization'] = 'Bearer ' + (getStorage('ACCESS_TOKEN') || '') // token
  return config
},
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

// http response 响应拦截器
axios.interceptors.response.use(response => {
  NProgress.done()

  const status = Number(response.status) || 200
  const _message = response.data.msg || errorCode[status] || errorCode['default']

  if (status === 401) {
    message.error('身份验证失败，请重新登录');
    cleStorage() // 清除storage数据
    router.replace("/logoIn"); // 回到登录页
    return
  }

  // 返回 404 就到 404页面
  if (status === 404) {
    router.replace("/404"); // 回到登录页
    return
  }

  if (status === 502) {
    message.error('服务器异常502!');
    return
  }

  if (status !== 200 || response.data.code === 1) {
    message.error(_message);
    return Promise.reject(new Error(_message))
  }
  return response
},
  error => {
    NProgress.done()
    if (process.env.NODE_ENV == 'development') {
      console.error('~~~~~~~~~~~~请求异常~~~~~~~~~~~~');
      console.error('    ********* config ********    ');
      console.log(error.config);
      console.error('    ******** response *******    ');
      console.log(error.response);
      console.error('~~~~~~~~~~~~请求异常-log-end~~~~~~~~~~~~');
    } else {
      message.error('请求超时或服务器异常，请检查网络或联系管理员！');
    }
    return Promise.reject(error)
  }
)

export default function http(url, data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求 
    let promise
    if (method === 'GET' || method === 'get') {
      // 发送get请求 
      promise = axios[method](url + '?' + qs.stringify(data, { arrayFormat: 'repeat' }))
    } else if (method === 'DELETE' || method === 'delete') {
      // 使用axios写API的时候，发现delete请求一直有问题，最后发现delete跟post、patch等方法接收的第二个参数不一样。
      // post、patch接收的第二个参数直接为需要传输的数据，而delete接收的第二个参数为config。
      // 则delete需要通过config来传递数据 axios[method](url, { data })

      // 注意 axios源码中，delete 和 post 、put 的参数不一样，delete只有两个参数。
      // delete第二个参数是config不是data，源码中 使用config里有data 所以使用config里的data进行传参
      // 也就是把第二个参数 再包装成一个对象 axios[method](url, { data })
      promise = axios[method](url, { data })
    } else {
      // 发送post put delete请求 
      promise = axios[method](url, data)
    }
    promise.then(function (response) {
      resolve(response.data.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}

