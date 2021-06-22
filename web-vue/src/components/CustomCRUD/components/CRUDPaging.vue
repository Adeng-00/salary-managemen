<!--
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 14:11:06
 * @Description: CURD 分页组件
 * @FilePath: \vue-salary-management\src\components\CustomCRUD\components\Paging.vue
-->
<template>
  <a-pagination
    class="flex-centers margin-tx padding-bx"
    v-model:current="pageObj.current"
    :page-size-options="pagingOptions"
    :total="total"
    show-size-changer
    :page-size="pageObj.size"
    @change="handleCurrent"
    @showSizeChange="handleSize"
  >
    <template #buildOptionText="props">
      <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
      <span v-else>全部</span>
    </template>
  </a-pagination>
</template>

<script>
import { ref, inject } from "vue";
export default {
  name: "CRUDPaging",
  emits: ["handlePaging"],
  setup(props, context) {
    const pageObj = ref({ // 当前页码 显示条数
      current: 1,
      size: 10
    })

    const total = inject('currentTotal') // 总条数
    // 当前页码条数 配置 10 20... 条
    const pagingOptions = ref(["10", "20", "30", "40", "50"])

    /**
     * @description: 选择当前页面 展示条数
     * @param {*} current 当前页码
     * @param {*} pSize  要展示多少条数
     */
    const handleSize = (current, size) => {
      context.emit("handlePaging", { current, size })
    }

    /**
     * @description: 选择当前页码
     * @param {*} current 当前页码
     * @param {*} pSize 当前页码 展示的数据条数
     */
    const handleCurrent = (current, size) => {
      context.emit("handlePaging", { current, size })
    }

    return {
      pageObj,
      total,
      pagingOptions,
      handleCurrent,
      handleSize
    }
  }
}
</script>