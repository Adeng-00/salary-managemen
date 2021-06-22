/*
 * @Author: cui DengKe
 * @Date: 2021-06-15 08:16:55
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-19 10:04:16
 * @Description:员工管理 路由
 * @FilePath: \vue-salary-management\src\router\modules\staffManagement.js
 */

export default {
  path: '/staffManagement',
  redirect: '/staffManagement/index',
  component: () => import('@/layout/index.vue'),
  meta: { hide: false, title: '员工管理' },
  children: [
    {
      path: 'index',
      component: () => import('@/views/staffManagement/index.vue'),
      name: 'StaffManagement',
      meta: { title: '员工管理' }
    }
  ]
}