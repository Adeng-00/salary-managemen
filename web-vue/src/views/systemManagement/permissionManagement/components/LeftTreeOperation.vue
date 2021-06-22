<!--
 * @Author: cui DengKe
 * @Date: 2021-06-20 21:20:36
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 23:34:42
 * @Description: 菜单管理 左侧菜单 tree
 * @FilePath: \vue-salary-management\src\views\systemManagement\permissionManagement\components\LeftTreeOperation.vue
-->

<template>
  <div>
    <div class="flex-around">
      <a-button @click="openModal(1)" type="primary">添加</a-button>
      <a-button @click="openModal(2)" type="primary">修改</a-button>
      <a-button @click="openModal(3)" type="primary">
        <div v-show="curMenuId.length<1">删除</div>
        <div v-show="curMenuId.length>0">
          <a-popconfirm title="确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="rowRequest">删除</a-popconfirm>
        </div>
      </a-button>
    </div>

    <a-modal
      :maskClosable="false"
      width="1000px"
      ok-text="确认"
      cancel-text="取消"
      v-model:visible="showModal"
      v-if="showModal"
      @cancel="closeModal(false)"
      @ok="rowRequest"
    >
      <template #title>
        <CommonTitle :title="showModal ? '编辑' : '添加'"></CommonTitle>
      </template>
      <a-form ref="formRef" :model="formData" :rules="formRules">
        <template v-for="(item, index) in formColumns" :key="index">
          <a-form-item class="form-item_half" :label="item.title" :name="item.dataIndex">
            <!-- 根据item.type不同类型展示不同 组件 -->
            <CRUDFormAndSearch v-model:value="formData[item.dataIndex]" v-bind="item"></CRUDFormAndSearch>
          </a-form-item>
        </template>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { ref } from 'vue'
import * as menuApi from '@/api/menuApi'
import { message } from 'ant-design-vue'
import { formColumns, formRules } from './leftColumns'
import CommonTitle from '@/components/CommonTitle.vue';
import CRUDFormAndSearch from '@/components/CustomCRUD/components/CRUDFormAndSearch'

export default {
  name: "LeftTreeOperation",
  props: {
    putMenuData: { // 要修改的数据源
      type: Object,
      default: () => { }
    },
    curMenuId: { // 当前选中数据的menuId
      type: Array,
      default: () => []
    }
  },
  components: { CommonTitle, CRUDFormAndSearch },
  emits: ['refreshMenu'],
  setup(props, context) {
    const showModal = ref(false) // modal开关
    const curOperFlag = ref(1) // 操作标识 1增 2改 3删
    const formData = ref({}) // 表单数据

    /**
     * @description: 打开modal框的方法
     * @param {Number} flag 并设置当前操作标识 1增 2改 3删
     */
    const openModal = (flag) => {
      if (flag !== 1 && props.curMenuId.length < 1 || !props.curMenuId) {
        message.warn('请先选择要操作的菜单')
        return
      }
      // 每次打开重置数据 新增的时候等于传递的 要put的数据
      formData.value = {}
      if (flag === 2) {
        formData.value = props.putMenuData
      }
      // 删除的时候不单出 Modal框
      if (flag !== 3) {
        showModal.value = true
      }
      // 设置当前操作的标识
      curOperFlag.value = flag
    }

    // 发请求 1增 2改 3删
    const rowRequest = () => {
      // 新增
      if (curOperFlag.value === 1) {
        // 设置parentId 不存在就是一级菜单默认 0 
        formData.value.pid = props.curMenuId.length > 0 ? props.curMenuId[0] : 0
        menuApi.addMenuPort(formData.value).then((res) => {
          if (res) {
            message.success('添加成功')
            closeModal(true)
          } else {
            message.error('添加失败')
          }
        }).catch((err) => {
          message.error('添加失败')
          console.log("添加失败", err)
        })
      }
      // 编辑
      if (curOperFlag.value === 2) {
        menuApi.putMenuPort(formData.value).then((res) => {
          if (res) {
            message.success('编辑成功')
            closeModal(true)
          } else {
            message.error('编辑失败')
          }
        }).catch((err) => {
          message.error('编辑失败')
          console.log("编辑失败", err)
        });
      }
      // 删除
      if (curOperFlag.value === 3) {
        formData.value.id = props.curMenuId[0]
        menuApi.delMenuPort(formData.value).then((res) => {
          if (res) {
            message.success('删除成功')
            closeModal(true)
          } else {
            message.error('删除失败')
          }
        }).catch((err) => {
          message.error('删除失败')
          console.log("删除失败", err)
        })
      }
    }

    /**
    * @description: 关闭modal
    * @param {Boolean} isRefresh true 提交刷新menu tree 方法 false不刷新数据
    */
    const closeModal = (isRefresh) => {
      showModal.value = false
      if (isRefresh) {
        context.emit('refreshMenu')
      }
    }

    return {
      showModal,
      formColumns,
      formRules,
      formData,
      openModal,
      rowRequest,
      closeModal
    }
  }
}
</script>