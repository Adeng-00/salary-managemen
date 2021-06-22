<!--
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:41:36
 * @Description: CRUD 组件
 * @FilePath: \vue-salary-management\src\components\CustomCRUD\index.vue
-->
<template>
  <div class="el-box-shadow" style="height:100%">
    <!-- 表格 -->
    <Table :isLoading="isLoading" @rowRequest="rowRequest"></Table>
    <!-- 分页 -->
    <Paging v-if="!options.operation.notPaging" ref="pagingRef" @handlePaging="handlePaging"></Paging>
  </div>
</template>

<script>
import { ref, watch, readonly, provide } from 'vue'
import Table from './components/CRUDTable.vue'
import Paging from './components/CRUDPaging.vue'
import { isEmpty } from "@/utils/validator";

export default {
  name: 'CRUD',
  components: { Table, Paging },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    options: { // 表格配置项
      type: Object,
      default: () => {
        return {}
      }
    },
    tableColumns: { // 表格列表配置展示字段
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: { // 表格数据
      type: Array,
      default: () => {
        return []
      }
    },
    dataTotal: { // 数据总条数=>用于分页组件
      type: Number,
      default: 0
    }
  },
  // 提交 新增 修改 删除 row操作 、分页操作
  emits: ['rowRequest', 'pagingRequest'],
  setup(props, context) {
    // 子孙组件注入 crud 配置项 表格配置项 注入响应式的数据 方便子孙组件接收 最新的配置
    // readonly 确保通过 provide 传递的数据不会被注入的组件更改
    provide('currentColumns', props.tableColumns) // 表格列表配置展示字段
    provide('currentOptions', readonly(props.options)) // crud 配置项 是否展示增删改查询...
    const curDataTotal = ref(props.dataTotal)
    provide('currentTotal', curDataTotal) // 数据总条数=>用于分页组件
    const curTableData = ref(props.tableData)
    provide('currentData', curTableData) // 表格数据

    // 监听 表格数据、总条数
    watch(
      [() => props.tableData, () => props.dataTotal],
      // eslint-disable-next-line no-unused-vars
      ([newData, NewTotal], [oldData, oldTotal]) => {
        curDataTotal.value = NewTotal
        curTableData.value = newData
      }
    )
    const pagingRef = ref(null) // 分页组件 ref 为了重置current 使用

    /**
     * @description: 抛出 添加或者修改 方法
     * @param {Number} flag 1增加 2编辑 3删除 4查询重置
     * @param {Object} data 当前表单数据
     */
    const rowRequest = (flag, data) => {
      if (flag === 4 && isEmpty(data) && pagingRef.value) {
        pagingRef.value.pageObj.current = 1
      }
      context.emit('rowRequest', flag, data)
    }

    /**
     * @description: 分页
     * @param {Object} obj current 页面 size 当前页条数 total 总条数
     */
    const handlePaging = (obj) => {
      context.emit('pagingRequest', obj)
    }

    return {
      curTableData,
      pagingRef,
      curDataTotal,
      rowRequest,
      handlePaging
    }
  }
}
</script>