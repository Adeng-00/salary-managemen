<!--
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-13 23:38:57
 * @Description: 首屏 Title组件
 * @FilePath: \vue-salary-management\src\views\dashBoard\components\EchartsTitle.vue
-->
<template>
  <a-row type="flex" class="bg-white padding-x" justify="space-around" align="middle">
    <a-col :span="4">
      <div class="flex-start">
        <div class="title-prefix"></div>
        <div class="parent-title margin-lx">{{ title }}</div>
      </div>
      <div class="sub-title margin-lxxl">{{ subTitle }}</div>
    </a-col>
    <a-col :span="20">
      <!-- 用插槽定义右边要展示的内容 -->
      <slot name="rightSlot"></slot>
    </a-col>
  </a-row>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  name: "EchartsTitle",
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
  setup(props) {
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
  width: 6px;
  height: 32px;
  z-index: 5;
  background-color: #1890ff;
  border: none;
  border-radius: 8px;
}

.parent-title {
  font-weight: bold;
  font-size: 18px;
  color: rgb(16, 16, 16);
}

.sub-title {
  font-weight: 400;
  font-size: 14px;
  color: rgba(120, 171, 217, 1);
}
</style>