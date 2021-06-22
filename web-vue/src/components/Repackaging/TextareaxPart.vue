<!--
 * @Author: cui DengKe
 * @Date: 2021-06-17 10:29:41
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-17 23:27:31
 * @Description: 二次封装 textareax文本域 组件 可单独用 也可配合CRUD使用
 * @FilePath: \vue-salary-management\src\components\Repackaging\TextareaxPart.vue
-->
<template>
  <a-textarea
    autosize
    :disabled="disabled"
    v-model:value="curValue"
    :placeholder="placeholder"
    allow-clear
    showCount
  />
</template>

<script>
import { ref, watch } from '@vue/runtime-core';

export default {
  name: 'TextareaxPart',
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
    }
  },
  emits: ["update:value"],
  setup(props, context) {
    // 组件上直接使用 v-model:value="value" 可以用但是会报错 用ref在包一下
    const curValue = ref(props.value)

    /**
    * @description: 监听curValue 传递给父组件
    * @return {String} 最新的值
    */
    watch(curValue, (val) => {
      context.emit('update:value', val)
    })

    return {
      curValue
    }
  }
}
</script>