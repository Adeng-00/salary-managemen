/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:27:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-22 15:54:09
 * @Description: router 配置 采用History 模式
 * @FilePath: \web-vue\src\router\index.js
 */

import { createRouter, createWebHistory } from 'vue-router'

import { message } from 'ant-design-vue';

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

import { getStorage } from "@/utils/storage";
import { isEmpty } from "@/utils/validator";

export const ROUTER_DATA = [
  {
    path: '/',
    name: 'Home',
    redirect: '/logoIn',
    meta: { hide: true }
  },
  {
    path: '/logoIn',
    component: () => import('@/views/logoIn/index.vue'),
    name: 'LogoIn',
    meta: { hide: true }
  },
  {
    path: '/dashBoard',
    name: 'DashBoard',
    redirect: '/dashBoard/index',
    component: () => import('@/layout/index.vue'),
    meta: { hide: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashBoard/index.vue'),
        name: 'DashBoard',
        meta: { title: '运营数据' } // 运营数据 看板
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    meta: { hide: true }
  }
]

// 获取路由文件
const require_module = require.context('./modules', false, /.js$/)
require_module.keys().forEach(file_name => {
  ROUTER_DATA.push(require_module(file_name).default)
})


// import staffManagementRoute from './modules/staffManagement'
// import attendanceStatisticsRoute from './modules/attendanceStatistics'
// import salaryStatementsRoute from './modules/salaryStatements'
// import systemManagementRoute from './modules/systemManagement'

// export const modulesRoutes = [
//   staffManagementRoute, // 员工管理
//   attendanceStatisticsRoute, // 出勤统计
//   salaryStatementsRoute, // 工资报表
//   systemManagementRoute // 系统管理
// ]


/**
 * @description: 创建路由
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: ROUTER_DATA
})

/**
 * 全局前置守卫 按照创建顺序调用 守卫是异步执行的
 * @param to 指的是我们即将要到达的路由
 * @param from 是指正在离开的路由
 *  */
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  // 是否在登录状态下
  if (!isEmpty(getStorage("ACCESS_TOKEN"))) {
    if (to.path === '/logoIn') { // 如果已登录，并且是从从登录页面跳转的，那么继续往下走
      next('/dashBoard')
    } else {  // 如果已登录，但不是从登录页面来跳转的
      if (to.matched.length === 0) {  // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到 dashBoard
        // next('/404')
        // next('/404')
        next('/dashBoard')
      } else {
        next() // 此跳转路由的来源路由存在，则匹配到正确跳转
      }
    }
    // NProgress.done()  // 关闭进度条
  } else { // 没有登录就去登录
    if (to.path === '/logoIn') { // 如果是访问到了登录，那么继续往下走
      next()
    } else {
      message.error('身份验证失败,请重新登录')
      next('/')
    }
    // NProgress.done()  // 关闭进度条
  }
})

// 路由载入结束 关闭进度条
router.afterEach(() => {
  NProgress.done()
})

export default router