<!--
 * @Author: cui DengKe
 * @Date: 2021-06-16 09:22:40
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:46:58
 * @Description: 公司文件管理 单独上传文件
 * @FilePath: \vue-salary-management\src\views\systemManagement\companyFile\index.vue
-->

<template>
  <div class="padding-xl el-box-shadow">
    <UploadPart :isSingle="true" :isImage="true" v-model:value="photo"></UploadPart>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import UploadPart from '@/components/Repackaging/UploadPart.vue'

export default {
  name: "CompanyFile",
  components: { UploadPart },
  setup() {
    const photo = ref()

    return {
      photo
    }
  }
}
</script>