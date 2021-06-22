<!--
 * @Author: cui DengKe
 * @Date: 2021-06-17 12:00:27
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:53:28
 * @Description: 二次封装 select选择 组件 可单独用 也可配合CRUD使用
 * @FilePath: \vue-salary-management\src\components\Repackaging\SelectPart.vue
-->
<template>
  <a-select
    :disabled="disabled"
    v-model:value="curValue"
    show-search
    style="width: 100%"
    :placeholder="placeholder"
    :filter-option="filterOption"
  >
    <a-select-option
      v-for="selectItem in selectDataFormat(selectData)"
      :value="selectItem.value"
      :key="selectItem.label+selectItem.value"
    >{{ selectItem.label}}</a-select-option>
  </a-select>
</template>

<script>
import { ref, watch } from '@vue/runtime-core';

export default {
  name: 'SelectPart',
  props: {
    value: { // v-model 的key
      tyep: String,
      default: ''
    },
    placeholder: { // 提示信息
      tyep: String,
      default: ''
    },
    disabled: { // 是否禁用
      tyep: Boolean,
      default: false
    },
    selectData: { // select数据源
      default: []
    }
  },
  emits: ["update:value"],
  setup(props, context) {
    // 组件上直接使用 v-model:value="value" 可以用 但是会提示报错 故用ref在包一下
    // 默认为 空字符串 新增时导致 placeholder不显示 故不存在时 赋值null
    const curValue = ref(props.value)
    // 监听props.value 保证父组件改变子组件也能实时拿到最新值
    // 在配合curd搜索组件时 重置功能需要
    // watch(() => props.value, (val) => {
    //   curValue.value = val ? val : null
    // }, { immediate: true })

    /**
     * @description: 返回 selectData 数据
     * @param {Array | Function} data
     * @return {*} Array
     */
    const selectDataFormat = (data = []) => {
      if (Array.isArray(data)) {
        return data
      } else {
        return data()
      }
    }

    /**
     * @description: select框 筛选 
     * @param {string} input 筛选的内容
     * @param {object} option 
     * @returns {object} 筛选中的内容
     */
    const filterOption = (input, option) => {
      return option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }

    /**
    * @description: 监听curValue 传递给父组件
    * @return {String} 最新的值
    */
    watch(curValue, (val) => {
      context.emit('update:value', val)
    })

    return {
      curValue,
      selectDataFormat,
      filterOption
    }
  }
}
</script>