<!--
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-13 14:51:57
 * @Description: 项目主体 布局容器
 * @FilePath: \vue-salary-management\src\layout\index.vue
-->
<template>
  <a-layout style="max-height: 100vh">
    <Sidebar v-model="collapsed"></Sidebar>
    <MainBody v-model="collapsed"></MainBody>
  </a-layout>
</template>

<script>
import { ref, watch } from "vue";
import Sidebar from "./components/Sidebar.vue";
import MainBody from "./components/MainBody.vue";

export default {
  name: "Home",
  components: { Sidebar, MainBody },
  setup() {
    // menu 是否被折叠
    const collapsed = ref(false);
    watch(collapsed, (nval, oval) => {
      collapsed.value = nval;
    });
    return {
      collapsed,
    };
  },
}
</script>

<style scoped>
</style>
