<!--
 * @Author: cui DengKe
 * @Date: 2021-06-15 08:16:55
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:43:04
 * @Description: CURD 表格组件
 * @FilePath: \vue-salary-management\src\components\CustomCRUD\components\CRUDTable.vue
-->
<template>
  <div>
    <!-- 添加 搜索 重置 按钮 -->
    <div class="flex-s-b padding-x">
      <div>
        <a-button
          v-permission="currentOptions.operation.add"
          @click="openAddOrEdit(1)"
          type="primary"
        >添加</a-button>
      </div>
      <div v-if="currentOptions.operation.search">
        <a-button v-debounce="handleSearch" type="primary">查询</a-button>
        <a-button class="margin-lx" v-debounce="handleReset" type="primary">重置</a-button>
      </div>
    </div>
    <!-- 搜索组件 -->
    <CRUDSearch
      v-if="currentOptions.operation.search"
      ref="searchRfe"
      @submitSearch="receiveSearch"
    ></CRUDSearch>
    <!-- 表格 -->
    <a-table
      class="margin-xl"
      :columns="currentColumns"
      :loading="isLoading"
      :data-source="currentData"
      rowKey="id"
      bordered
      :pagination="false"
    >
      <template #operation="{ record }">
        <!-- <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            更多
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a-button
                  type="link"
                  v-if="currentOptions.operation.view"
                  @click="openAddOrEdit(5,record)"
                >查看</a-button>
              </a-menu-item>
              <a-menu-item>
                <a-button
                  type="link"
                  v-if="currentOptions.operation.edit"
                  @click="openAddOrEdit(2,record)"
                >编辑</a-button>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>-->
        <span class="flex-centers">
          <a-button
            type="link"
            v-permission="currentOptions.operation.view"
            @click="openAddOrEdit(5,record)"
          >查看</a-button>
          <a-button
            type="link"
            v-permission="currentOptions.operation.edit"
            @click="openAddOrEdit(2,record)"
          >编辑</a-button>
          <a-popconfirm title="确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="handleDel(record)">
            <a-button v-permission="currentOptions.operation.del" type="link">删除</a-button>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
    <!-- 添加或者编辑组件 -->
    <CRUDAddOrEditOrView
      v-if="vBindform.modalVisibl"
      v-bind="vBindform"
      @closeModal="vBindform.modalVisibl = false"
      @handleAddOrEdit="rowRequest"
    ></CRUDAddOrEditOrView>
  </div>
</template>

<script>
import { reactive, ref, inject } from 'vue'
import CRUDSearch from './CRUDSearch.vue'
import CRUDAddOrEditOrView from './CRUDAddOrEditOrView.vue'

export default {
  name: 'CRUDTable',
  components: { CRUDSearch, CRUDAddOrEditOrView },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  // 抛出 行操作 新增 编辑 删除
  emits: ['rowRequest'],
  setup(props, context) {
    const currentColumns = inject('currentColumns') // 表格列表配置展示字段
    const currentOptions = inject('currentOptions') // crud 配置项 是否展示增删改查询...
    const currentData = inject('currentData') // 表格数据

    const vBindform = reactive({
      formState: {}, // 表单数据
      formRules: {}, // 表单校验 规则
      modalVisibl: false, // 编辑or添加 modal框的开关
      actionFlag: 1 // 动作标识 1新增 2编辑 3删除 4查询 5查看
    })

    // 表单Colums配置
    currentColumns.forEach((e) => {
      e.align = 'center'
      if (e.dataIndex !== 'operation') {
        vBindform.formState[e.dataIndex] = ''
        e['placeholder'] = e.type === 'text' ? `请输入 ${e.title}` : `请选择 ${e.title}`
        if (e.required) {
          vBindform.formRules[e.dataIndex] = [{
            required: true,
            message: e.type === 'text' ? `请输入 ${e.title}` : `请选择 ${e.title}`,
            trigger: e.type === 'text' ? 'blur' : 'change'
          }]
        }
      }
    })

    /**
     * @description: 新增or编辑 打开modal框的方法
     * @param {Object} record 存在即为 编辑 不存在即为 新增
     */
    const openAddOrEdit = (flag, record) => {
      vBindform.actionFlag = Number(flag)
      // if (record) {
      //   vBindform.formState = JSON.parse(JSON.stringify(record))
      // } else {
      //   for (const item in vBindform.formState) {
      //     vBindform.formState[item] = ''
      //   }
      // }
      vBindform.formState = record ? JSON.parse(JSON.stringify(record)) : {}
      vBindform.modalVisibl = true
    }

    /**
     * @description: 提交添加完数据或者编辑完数据的方法
     * @param {Number} flag 1增加 2编辑 3删除 4查询 5查看
     * @param {Object} data 当前表单数据
     * @return {Function} 提交事件 
     */
    const rowRequest = (flag, data) => {
      context.emit('rowRequest', flag, data)
    }

    /**
     * @description: 删除数据 先做页面假删除
     * @param {Object} data 要删除数据 对象
     * @return {Function} 提交事件 3 删除的标识 data 要删除的数据
     */
    const handleDel = (data) => {
      currentData.value = currentData.value.filter(f => f.id !== data.id)
      rowRequest(3, data)
    }

    //  查询数据
    const searchData = ref({})
    // 查询组件的 ref
    const searchRfe = ref(null)

    /**
     * @description: 接收要查询的数据
     * @param {Object} data 要查询的数据
     */
    const receiveSearch = (data) => {
      searchData.value = data
    }

    /**
     * @description: 查询数据
     * @param {Object} data 要查询的数据
     * @return {Function} 提交事件 4 查询的标识 data 要查询的数据
     */
    const handleSearch = () => {
      rowRequest(4, searchData.value)
    }

    /**
     * @description: 重置查询数据
     * @return {*} 提交事件 4 查询 返回一个空数据
     */
    const handleReset = () => {
      if (searchRfe.value) {
        searchRfe.value.handleReset()
        handleSearch()
      }
    }

    return {
      currentOptions,
      currentColumns,
      currentData,
      searchRfe,
      vBindform,
      openAddOrEdit,
      rowRequest,
      handleDel,
      receiveSearch,
      handleSearch,
      handleReset
    }
  }
}
</script>