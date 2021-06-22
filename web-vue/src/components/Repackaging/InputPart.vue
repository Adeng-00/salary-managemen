<!--
 * @Author: cui DengKe
 * @Date: 2021-06-17 10:01:02
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:22:10
 * @Description: 二次封装 input文本框 组件 可单独用 也可配合CRUD使用
 * @FilePath: \vue-salary-management\src\components\Repackaging\InputPart.vue
-->
<template>
  <a-input allow-clear :disabled="disabled" :placeholder="placeholder" v-model:value="curValue" />
</template>

<script>
import { ref, watch } from '@vue/runtime-core';

export default {
  name: 'InputPart',
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
    // 组件上直接使用 v-model:value="value" 可以用 但是会提示报错 故用ref在包一下
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