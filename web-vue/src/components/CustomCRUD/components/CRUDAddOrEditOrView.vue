<!--
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:49:25
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:24:16
 * @Description: CURD  新增\编辑\查看 组件
 * @FilePath: \vue-salary-management\src\components\CustomCRUD\components\CRUDAddOrEditOrView.vue
-->
<template>
  <a-modal
    :maskClosable="false"
    width="1000px"
    ok-text="确认"
    cancel-text="取消"
    v-model:visible="addOrEditVisible"
    @cancel="cancelFun"
    @ok="addOrEditOver"
  >
    <template #title>
      <CommonTitle :title="modalVisibl ? '编辑' : '添加'"></CommonTitle>
    </template>
    <a-form ref="formRef" :model="curFormState" :rules="formRules">
      <template v-for="(item, index) in formColums" :key="index">
        <a-form-item
          v-if="item.dataIndex!=='operation'"
          :class="item.span?'form-item_long':'form-item_half'"
          :label="item.title"
          :name="item.dataIndex"
        >
          <template v-if="item.type ==='select'">
            <!-- select 单独处理 -->
            <a-select
              :disabled="item.disabled"
              v-model:value="curFormState[item.dataIndex]"
              show-search
              style="width: 100%"
              :placeholder="item.placeholder"
            >
              <a-select-option
                v-for="selectItem in item.selectData"
                :value="selectItem.value"
                :key="selectItem.label+selectItem.value"
              >{{ selectItem.label}}</a-select-option>
            </a-select>
          </template>
          <template v-else>
            <!-- 根据item.type不同类型展示不同 组件 -->
            <CRUDFormAndSearch v-model:value="curFormState[item.dataIndex]" v-bind="item"></CRUDFormAndSearch>
          </template>
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>

<script>
import { reactive, ref, inject } from 'vue'
import CommonTitle from '../../CommonTitle.vue'
import CRUDFormAndSearch from './CRUDFormAndSearch.vue'

export default {
  name: 'CRUDAddOrEditOrView',
  props: {
    formState: { // form表单数据
      type: Object,
      default: () => {
        return {}
      }
    },
    formRules: { // 表单校验规则
      type: Object,
      default: () => {
        return {}
      }
    },
    modalVisibl: { // modal 开关
      type: Boolean,
      default: false
    },
    actionFlag: { // 动作标识 1新增 2编辑
      type: Number,
      default: 1
    }
  },
  components: { CommonTitle, CRUDFormAndSearch },
  emits: ['handleAddOrEdit', 'closeModal'],
  setup(props, context) {
    // form表单 ref 元素 用于校验必填
    const formRef = ref(null);
    // form表单配置
    const formColums = inject('currentColumns')

    // 查看时 设置 disabled
    formColums.forEach((e) => {

      if (props.actionFlag === 5) {
        e.disabled = true
      } else {
        e.disabled = false
      }
    })

    // form表单数据
    const curFormState = reactive(props.formState)
    // modal 开关
    const addOrEditVisible = ref(props.modalVisibl)

    /**
     * @description: 抛出去方法 
     * @param {*} actionFlag 1新增 2编辑
     * @param {*} curFormState 数据
     * @return {void}  
     */
    const addOrEditOver = () => {
      /**
      * 提交时 节流
      * preTime 记录上次触发的时间
      * 每次触发比较nowTime（当前时间）和 preTime 的差是否大于指定的时间段！
      */
      let nowTime = new Date().getTime()
      let preTime
      if (!preTime || nowTime - preTime > 1500) {
        preTime = nowTime
        formRef.value
          .validate()
          .then(() => {
            context.emit('handleAddOrEdit', props.actionFlag, curFormState)
            cancelFun()
          })
          .catch((error) => {
            console.log('error', error);
          })
      }
    }

    /**
     * @description: 关闭弹窗
     */
    const cancelFun = () => {
      addOrEditVisible.value = false
      context.emit('closeModal')
    }

    return {
      formRef,
      curFormState,
      formColums,
      addOrEditVisible,
      cancelFun,
      addOrEditOver
    }
  }
}
</script>