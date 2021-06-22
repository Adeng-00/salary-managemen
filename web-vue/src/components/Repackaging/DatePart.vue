<!--
 * @Author: cui DengKe
 * @Date: 2021-06-17 11:34:12
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:22:49
 * @Description: 二次封装 date时间 组件 可单独用 也可配合CRUD使用
 * @FilePath: \vue-salary-management\src\components\Repackaging\DatePart.vue
-->
<template>
  <a-date-picker
    :disabled="disabled"
    v-model:value="curValue"
    :placeholder="placeholder"
    format="YYYY-MM-DD"
  />
</template>

<script>
import { ref, watch } from '@vue/runtime-core';
import moment from 'moment';
export default {
  name: 'DatePart',
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
    // a-date-picker 默认值必须是moment格式 所以在查看编辑时候 一定要moment转换一下格式
    const curValue = ref(moment(props.value ? props.value : new Date(), 'YYYY-MM-DD'))

    /**
    * @description: 监听value 的更改 提交事件
    * @return {String} 最新的值
    */
    watch(curValue, (val) => {
      // 设置返回数据时 格式化时间
      context.emit('update:value', moment(val).format('YYYY-MM-DD'))
    }, { immediate: true })

    return {
      curValue
    }
  }
}
</script>