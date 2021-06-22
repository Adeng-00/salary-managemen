<!--
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 23:39:21
 * @Description: 员工管理
 * @FilePath: \vue-salary-management\src\views\staffManagement\index.vue
-->
<template>
  <CRUD v-bind="CRUDState" @rowRequest="useRowRequest" @pagingRequest="usePagingRequest"></CRUD>
</template>

<script>
import { reactive } from '@vue/reactivity'
import CRUD from '@/components/CustomCRUD/index'
import { options, columns } from './columns'
import * as  staffApi from '@/api/staffApi'
import useCURD from "@/composition/useCURD"

export default {
  name: 'StaffManagement',
  components: { CRUD },
  setup() {
    // 解构 crud 需要使用的数据 方法
    const { isLoading, tableData, dataTotal, useGetListData, useRowRequest, usePagingRequest } = useCURD();

    // curd 整体配置
    const CRUDState = reactive({
      options,
      isLoading,
      tableColumns: columns,
      tableData,
      dataTotal
    })

    // 开始请求页面数据
    useGetListData(staffApi, 'Staff')

    return {
      CRUDState,
      useRowRequest,
      usePagingRequest
    }
  }
}
</script>