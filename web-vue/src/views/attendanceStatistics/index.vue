<!--
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 23:39:03
 * @Description: 考勤统计
 * @FilePath: \vue-salary-management\src\views\attendanceStatistics\index.vue
-->
<template>
  <CRUD v-bind="CRUDState" @rowRequest="useRowRequest" @pagingRequest="usePagingRequest"></CRUD>
</template>

<script>
import { reactive } from '@vue/reactivity'
import CRUD from '@/components/CustomCRUD/index'
import { options, columns } from './columns'
import * as  attendanceApi from '@/api/attendanceApi'
import useCURD from "@/composition/useCURD"

export default {
  name: 'AttendanceStatistics',
  components: { CRUD },
  setup() {
    // 解构 crud 需要使用的数据 方法
    const { store, isLoading, tableData, dataTotal, useGetListData, useRowRequest, usePagingRequest } = useCURD();

    // 初始化 table 配置 并 传入Store 用于拿VueX中的人员数据
    const tableColumns = columns(store)

    // curd 整体配置
    const CRUDState = reactive({
      options,
      isLoading,
      tableColumns,
      tableData,
      dataTotal
    })

    // 开始请求页面数据
    useGetListData(attendanceApi, 'Attendance')

    return {
      CRUDState,
      useRowRequest,
      usePagingRequest
    }
  }
}
</script>