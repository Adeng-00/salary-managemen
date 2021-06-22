<!--
 * @Author: cui DengKe
 * @Date: 2021-06-16 09:24:35
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 23:41:09
 * @Description: 日志管理 页面
 * @FilePath: \vue-salary-management\src\views\systemManagement\logManagement\index.vue
-->
<template>
  <CRUD v-bind="CRUDState" @rowRequest="useRowRequest" @pagingRequest="usePagingRequest"></CRUD>
</template>

<script>
import { reactive } from 'vue'
import CRUD from '@/components/CustomCRUD/index'
import { options, columns } from './columns'
import * as commonApi from '@/api/commonApi';
import useCURD from "@/composition/useCURD";

export default {
  name: "LogManagement",
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
    useGetListData(commonApi, 'WebLog')

    return {
      CRUDState,
      useRowRequest,
      usePagingRequest
    }
  }
}
</script>

<style lang="scss" scoped>
</style>