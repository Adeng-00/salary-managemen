/*
 * @Author: cui DengKe
 * @Date: 2021-06-15 08:16:55
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-19 10:03:43
 * @Description: 出勤统计 路由
 * @FilePath: \vue-salary-management\src\router\modules\attendanceStatistics.js
 */

export default {
  path: '/attendanceStatistics',
  redirect: '/attendanceStatistics/index',
  component: () => import('@/layout/index.vue'),
  meta: { hide: true },
  children: [
    {
      path: 'index',
      component: () => import('@/views/attendanceStatistics/index.vue'),
      name: 'AttendanceStatistics',
      meta: { title: '出勤统计' }
    }
  ]
}