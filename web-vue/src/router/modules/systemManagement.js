/*
 * @Author: cui DengKe
 * @Date: 2021-06-15 08:16:55
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:50:58
 * @Description: 系统管理 路由
 * @FilePath: \vue-salary-management\src\router\modules\systemManagement.js
 */

export default {
  path: '/systemManagement',
  // redirect: '/systemManagement/index',
  component: () => import('@/layout/index.vue'),
  meta: { hide: false, title: '系统管理' },
  children: [
    {
      path: 'permissionManagement/index',
      component: () => import('@/views/systemManagement/permissionManagement/index.vue'),
      name: 'permissionManagement',
      meta: { title: '权限管理' }
    },
    {
      path: 'logManagement/index',
      component: () => import('@/views/systemManagement/logManagement/index.vue'),
      name: 'logManagement',
      meta: { title: '日志管理' }
    },
    // {
    //   path: 'companyFile/index',
    //   component: () => import('@/views/systemManagement/companyFile/index.vue'),
    //   name: 'companyFile',
    //   meta: { title: '公司文件' }
    // }
  ]
}