<!--
 * @Author: cui DengKe
 * @Date: 2021-06-17 10:16:59
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:23:11
 * @Description: CURD 中 form表单 或者 search搜索 使用的组件集合
 * @FilePath: \vue-salary-management\src\components\CustomCRUD\components\CRUDFormAndSearch.vue
-->
<template>
  <component v-model:value="curValue" :is="componentId" v-bind="$attrs"></component>
</template>

<script>
import { ref, computed, watch } from '@vue/runtime-core'
import InputPart from '../../Repackaging/InputPart.vue' // input组件
import TextareaxPart from '../../Repackaging/TextareaxPart.vue' // textareax组件
import DatePart from '../../Repackaging/DatePart.vue' // 时间组件
import SelectPart from '../../Repackaging/SelectPart.vue' // 时间组件
import UploadPart from '../../Repackaging/UploadPart.vue' // 上传组件

export default {
  name: 'CRUDFormAndSearch',
  props: {
    value: { // v-model 的key
      tyep: String,
      default: ''
    },
    type: { // 组件类型
      tyep: String,
      default: ''
    }
  },
  inheritAttrs: false,
  components: { InputPart, TextareaxPart, DatePart, SelectPart, UploadPart },
  emits: ["update:value"],
  setup(props, context) {
    // 组件上直接使用 v-model:value="value" 可以用 但是会提示报错 故用ref在包一下
    const curValue = ref(null)
    // 监听props.value 保证父组件改变子组件也能实时拿到最新值
    // 在配合curd搜索组件时 重置功能需要
    watch(() => props.value, (val) => {
      curValue.value = val ? val : null
    }, { immediate: true })

    // 组件枚举对象
    const componentEnum = {
      text: 'InputPart',
      textarea: 'TextareaxPart',
      date: 'DatePart',
      select: 'SelectPart',
      upload: 'UploadPart',
    }

    /**
     * @description: 监听curValue 传递给父组件
     * @return {String} 最新的值
     */
    watch(curValue, (val) => {
      context.emit('update:value', val)
    })

    // 返回是哪个组件
    const componentId = computed(() => {
      return componentEnum[props.type] || 'InputCRUD'
    })

    return {
      componentId,
      curValue
    }
  }

}
</script>