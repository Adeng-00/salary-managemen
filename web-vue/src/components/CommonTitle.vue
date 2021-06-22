<!--
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:39:29
 * @Description: 公共 title 组件
 * @FilePath: \vue-salary-management\src\components\CommonTitle.vue
-->
<template>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col :span="6">
      <div class="flex-start">
        <div class="title-prefix"></div>
        <div class="parent-title margin-lx">{{ title }}</div>
      </div>
      <div v-if="subTitle" class="sub-title margin-lx">{{ subTitle }}</div>
    </a-col>
    <a-col :span="18">
      <!-- 用插槽定义右边要展示的内容 -->
      <slot name="rightSlot"></slot>
    </a-col>
  </a-row>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  name: "CommonTitle",
  props: {
    title: {
      type: String,
      default: "Title",
    },
    subTitle: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const passData = reactive({
      title: props.title,
      subTitle: props.subTitle,
    });
    return {
      ...toRefs(passData),
    };
  },
}
</script>

<style lang="scss" scoped>
.title-prefix {
  width: 4px;
  height: 18px;
  z-index: 5;
  border-radius: 8px;
  background-color: #1890ff;
}

.parent-title {
  font-weight: bold;
  font-size: 14px;
  color: rgb(16, 16, 16);
}

.sub-title {
  font-weight: 400;
  font-size: 12px;
  color: rgba(120, 171, 217, 1);
}
</style>