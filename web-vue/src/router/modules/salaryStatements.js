/*
 * @Author: cui DengKe
 * @Date: 2021-06-15 08:16:55
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-19 10:04:06
 * @Description: 工资报表 路由
 * @FilePath: \vue-salary-management\src\router\modules\salaryStatements.js
 */

export default {
  path: '/salaryStatements',
  redirect: '/salaryStatements/index',
  component: () => import('@/layout/index.vue'),
  meta: { hide: true },
  children: [
    {
      path: 'index',
      component: () => import('@/views/salaryStatements/index.vue'),
      name: 'SalaryStatements',
      meta: { title: '工资报表' }
    }
  ]
}