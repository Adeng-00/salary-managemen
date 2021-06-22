<template>
  <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在！">
    <template #extra>
      <a-button @click="backHome" type="primary">回到首页</a-button>
      <a-button @click="backPage" type="primary">返回上一页</a-button>
    </template>
  </a-result>
</template>


<script>
import { useRouter } from "vue-router";
export default {
  name: "errorPage",
  setup() {
    const router = useRouter();
    function backHome() {
      // 回到首页 不能用push，push会产生一条新的记录，那样浏览器回退就回再次回到404页面
      router.replace("/dashBoard"); // replace 不会产生记录
    }
    function backPage() {
      // 回到上一页 不能用push，push会产生一条新的记录，那样浏览器回退就回再次回到404页面
      router.go(-1); // go 不会产生记录 go() 需要确定去往的路由层数
    }
    return {
      backHome,
      backPage,
    };
  },
}
</script>

<style lang="scss" scoped>
</style>