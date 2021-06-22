<!--
 * @Author: cui DengKe
 * @Date: 2021-06-13 14:30:30
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 23:22:10
 * @Description: CURD 搜索组件
 * @FilePath: \vue-salary-management\src\components\CustomCRUD\components\CRUDSearch.vue
-->

<template>
  <a-collapse class="margin-ts">
    <a-collapse-panel key="1" :show-arrow="false">
      <template #header>
        <CommonTitle title="搜索"></CommonTitle>
      </template>
      <!-- 表单 -->
      <a-form ref="formRef" :model="searchState">
        <a-row :gutter="16">
          <template v-for="(item, index) in searchOptions" :key="index">
            <a-col :span="6">
              <a-form-item :name="item.dataIndex">
                <div class="flex-start">
                  <label style="min-width: 80px">{{ item.title }}：</label>
                  <!-- 根据item.type不同类型展示不同 组件 -->
                  <CRUDFormAndSearch v-model:value="searchState[item.dataIndex]" v-bind="item"></CRUDFormAndSearch>
                </div>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
      </a-form>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { reactive, inject, watch } from 'vue'
import CommonTitle from '../../CommonTitle.vue'
import CRUDFormAndSearch from './CRUDFormAndSearch.vue'

export default {
  name: 'CRUDSearch',
  components: { CommonTitle, CRUDFormAndSearch },
  emits: ['submitSearch'],
  setup(props, context) {
    // 注入表格配置项
    const tempOptions = inject('currentColumns')
    // 当前要查询的字段 配置
    const searchOptions = reactive([])
    tempOptions.forEach(e => {
      if (e.search) {
        searchOptions.push(e)
      }
    })

    /**
     * @description:  form表单数据
     * @description:  声明为reactive watch直接侦听param 
     * @description:  声明为ref watch需要侦听param.value 
     */
    const searchState = reactive({})

    /**
     * @description: 监听searchState 数据的变化
     * @return {*} 提交事件 返回当前search的参数
     */
    // eslint-disable-next-line no-unused-vars
    watch(searchState, (nval, oval) => {
      context.emit('submitSearch', nval)
    })

    /**
     * @description: 重置数据
     */
    const handleReset = () => {
      // 重新赋值不会触发watch  并且不能再次向对象中添加数据
      for (const item in searchState) {
        searchState[item] = null
        // delete searchState.value[item]
      }
    }

    return {
      searchOptions,
      searchState,
      handleReset
    }
  }
}
</script>

<style lang="scss" scoped>
.input-sty {
  min-width: 200px;
  max-width: 250px;
}
</style>
