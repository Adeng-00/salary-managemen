<!--
 * @Author: cui DengKe
 * @Date: 2021-04-13 20:50:35
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-19 11:50:30
 * @Description: file content
 * @FilePath: \vue-salary-management\src\App.vue
-->
<template>
  <!-- <a-config-provider :locale="enUS"> -->
  <a-config-provider :locale="curLocale">
    <RouterView />
  </a-config-provider>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')

export default {
  setup() {
    // const router = useRouter()
    const store = useStore()

    const curLocale = ref(zhCN) // 当前系统语言选择语言
    if (store.getters.LANG === 'ch') {
      curLocale.value = zhCN
      moment.locale(zhCN.locale)
    } else {
      curLocale.value = enUS
      moment.locale(enUS.locale)
    }

    // 刷新页面 router数据就没了 所以在页面加载时 判断是否已经登录 是否有菜单信息
    // 满足条件读取sessionStorage里的菜单信息 赋值给路由
    // if (store.getters.ACCESS_TOKEN && store.state.MENU_DATA) {
    //   store.dispatch('generateRoutes').then(async (routerList) => {
    //     const routerArr = await routerList
    //     routerArr.forEach((element) => {
    //       router.addRoute(element) // 4.0版本没有了addRoutes() 所以循环addRoute添加
    //     })
    //   })
    // }

    // 每二十分钟 向后台发请求 换token
    let timer = setInterval(() => {
      store.dispatch('refreshToken')
    }, 60000 * 20)

    // 页面销毁 清除定时器
    onBeforeUnmount(() => {
      clearInterval(timer)
    })

    return {
      curLocale
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
