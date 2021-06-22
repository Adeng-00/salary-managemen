<!--
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-18 14:45:58
 * @Description: file content
 * @FilePath: \vue-salary-management\src\views\dashBoard\index.vue
-->
<template>
  <div class="el-box-shadow">
    <CardStatistics></CardStatistics>
    <EchatrtsStatistics></EchatrtsStatistics>
  </div>
</template>

<script>
import CardStatistics from './components/CardStatistics'
import EchatrtsStatistics from './components/EchatrtsStatistics'

export default {
  name: 'DashBoard',
  components: { CardStatistics, EchatrtsStatistics },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>