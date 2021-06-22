<!--
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-13 23:09:46
 * @Description: home 首页
 * @FilePath: \vue-salary-management\src\views\logoIn\index.vue
-->
<template>
  <LogoIn v-if="!isRegister" @register="jumpRegister"></LogoIn>
  <Register v-if="isRegister" @logoIn="jumpLogoIn"></Register>
</template>

<script>
import { ref } from 'vue'
import LogoIn from './components/LogoIn';
import Register from './components/Register';
export default {
  name: 'Home',
  components: { LogoIn, Register },
  setup(props, context) {
    const isRegister = ref(false)
    const jumpRegister = (boolean) => {
      isRegister.value = boolean
    }
    const jumpLogoIn = () => {
      isRegister.value = false
    }
    return {
      isRegister,
      jumpRegister,
      jumpLogoIn
    }
  }
}
</script>


<style lang="scss" scoped>
.logo-in {
  width: 100vw;
  height: 100vh;
  background: #55b9f3;
  .form-warp {
    margin: auto;
    width: 380px;
    height: 450px;
    .system-title {
      font-family: SourceHanSansSC;
      font-weight: 700;
      font-size: 25px;
      color: rgb(47, 79, 79);
      font-style: normal;
      letter-spacing: 0px;
      line-height: 54px;
      text-decoration: none;
    }
    .code-input {
      height: 32px;
      width: 55%;
    }
    .code-canvas {
      position: relative;
      left: -15px;
    }
  }
}
.load-bg {
  width: 100vw;
  height: 100vh;
  background: rgb(50, 59, 68);
}
</style>