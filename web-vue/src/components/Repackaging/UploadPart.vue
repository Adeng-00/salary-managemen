<!--
 * @Author: cui DengKe
 * @Date: 2021-06-16 18:15:03
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:21:23
 * @Description: 二次封装 upload上传文件 组件 可单独用 也可配合CRUD使用
 * @FilePath: \vue-salary-management\src\components\Repackaging\UploadPart.vue
-->
<template>
  <div class="form-item_half">
    <a-upload
      v-if="!disabled"
      :accept="isImage?'.jpg, .jpeg, .png':'*'"
      :customRequest="filesRequest"
      :remove="removeBack"
      :multiple="true"
      :file-list="fileLists"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        {{placeholder}}
      </a-button>
    </a-upload>

    <!-- 图片或文件预览 -->
    <!-- <a-image-preview-group> -->
    <template v-for="fileItem in fileLists">
      <a-image
        v-if="isImg(fileItem.url)"
        :width="100"
        :key="'img'+fileItem.url"
        :src="'http://localhost:3000'+fileItem.url"
      />

      <div class="file-view" v-else :key="'file'+fileItem.url">
        <a-image :preview="false" :width="100" :src="fileImgBySuffix(fileItem.url)" />
        <DownloadOutlined @click="downFile(fileItem)" class="icon-down" />
      </div>
    </template>
    <!-- </a-image-preview-group> -->
  </div>
</template>

<script>
import { nextTick, ref } from 'vue'
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { uploadFilePort } from '@/api/commonApi'
import { isImg, getSuffixFilter } from '@/utils/filters'
import { message } from 'ant-design-vue';

export default {
  name: "UploadPart",
  components: { UploadOutlined, DownloadOutlined },
  props: {
    value: { // 文件数据
    },
    isSingle: { // 单个上传 或者多个上传 默认多个
      tyep: Boolean,
      default: false
    },
    isImage: { // 只能上传图片 默认都可以
      tyep: Boolean,
      default: false
    },
    urlKey: { // 文件url使用的key
      type: String,
      default: 'url',
    },
    nameKey: { // 文件name使用的key
      type: String,
      default: 'name',
    },
    disabled: { // 是否禁用
      tyep: Boolean,
      default: false
    },
    placeholder: { // 按钮提示信息
      tyep: String,
      default: '上传'
    }
  },
  emits: ["update:value"],
  setup(props, context) {
    // 文件数据
    const fileLists = ref([])
    if (typeof props.value === 'string') {
      fileLists.value = Array.from(JSON.parse(props.value))
    }

    /**
     * @description: 下载文件
     * @param {Object} file 文件对行
     * @return {*} a.link 下载
     */
    const downFile = (file) => {
      const link = document.createElement('a')
      link.href = 'http://localhost:3000' + file.url
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      window.setTimeout(() => {
        document.body.removeChild(link)
      }, 0)
    }

    /**
     * @description: 返回对应文件类型展示的图边
     * @param {*} data
     * @return {*}
     */
    const fileImgBySuffix = (data) => {
      const fileType = getSuffixFilter(data)
      const src = require(`@/assets/file_type/${fileType}.png`)
      return src
    }

    /**
    * @description: 删除文件列表操作
    * @param {Array} file 文件列表
    * @return {Boolean} 
    */
    const removeBack = (file) => {
      new Promise((resolve, reject) => {
        // 找对对应的 uid
        let hasFile = fileLists.value.findIndex(f => f.uid === file.uid)
        if (hasFile > -1) {
          // 删除页面上的数据
          fileLists.value.splice(hasFile, 1)
          resolve(true)
        } else {
          reject(false)
        }
      })
    }

    // 重写a-upload的文件上传处理方式
    const filesRequest = (data) => {
      if (props.isSingle && fileLists.value.length > 0) {
        message.info(`只能上传一个${props.isImage ? '图片' : '文件'}`)
        return
      }
      // 使用formData 传参
      const formData = new FormData()
      formData.append('file', data.file)

      // 发送http请求
      uploadFilePort(formData).then((res) => {
        // 上传单个文件后，先将该文件push到a-upload组件的已上传文件列表
        nextTick(() => {
          fileLists.value.push(res)
          context.emit('update:value', JSON.stringify(fileLists.value))
        })
      })
    }

    return {
      fileLists,
      isImg,
      filesRequest,
      removeBack,
      fileImgBySuffix,
      downFile
    }
  }
}
</script>

<style lang="scss" scoped>
.file-view {
  display: inline-block;
  position: relative;
}
.icon-down {
  position: absolute;
  right: 0;
  font-size: 23px;
  text-align: center;
  background: #999;
  width: 25px;
  height: 25px;
  color: #fff;
}
</style>