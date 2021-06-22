<!--
 * @Author: cui DengKe
 * @Date: 2021-06-20 15:16:55
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:49:29
 * @Description: 权限管理 permissionManagement
 * @FilePath: \vue-salary-management\src\views\systemManagement\permissionManagement\index.vue
-->
<template>
  <a-row class="padding-xl" :gutter="16">
    <a-col :span="4">
      <CommonTitle title="菜单"></CommonTitle>
      <LeftTreeOperation
        @refreshMenu="getMenuData"
        v-model:putMenuData="selectedMenu"
        v-model:curMenuId="selectedKeys"
      ></LeftTreeOperation>
      <a-tree
        v-if="treeData.length>0"
        defaultExpandAll
        @select="selectTreeNode"
        :tree-data="treeData"
        v-model:selectedKeys="selectedKeys"
        :replace-fields="replaceFields"
      ></a-tree>
    </a-col>
    <a-col :span="20">
      <CommonTitle title="权限"></CommonTitle>
      <RightTable v-model:curMenuId="selectedKeys"></RightTable>
    </a-col>
  </a-row>
</template>

<script>
import { ref } from 'vue';
import * as menuApi from '@/api/menuApi';
import CommonTitle from '@/components/CommonTitle.vue';
import LeftTreeOperation from './components/LeftTreeOperation.vue'
import RightTable from './components/rightTable.vue'

export default {
  name: "PermissionManagement",
  components: { CommonTitle, LeftTreeOperation, RightTable },
  setup() {
    // tree 组件 配置
    const replaceFields = {
      title: 'menuName',
      key: 'id'
    };
    // tree 数据源
    const treeData = ref([])
    // 当前选中的tree数据
    const selectedKeys = ref([])
    // 当前选中的菜单数据 用于给组件传参 做修改使用
    const selectedMenu = ref({})

    // 获取数据 子组件提交的刷新数据
    const getMenuData = () => {
      menuApi.getMenuAllPort().then(async (result) => {
        treeData.value = [{
          menuName: '菜单',
          id: '0-0-0',
          children: result.data
        }]
      }).catch((err) => {
        console.log("获取菜单数据失败==>", err)
      });
    }
    getMenuData() // 进入页面先请求一次 菜单数据

    const selectTreeNode = (selectedKeys, { node }) => {
      const { menuName, menuPath, id } = node.dataRef
      selectedMenu.value = { menuName, menuPath, id }
    }

    return {
      replaceFields,
      treeData,
      selectedKeys,
      selectedMenu,
      getMenuData,
      selectTreeNode
    }
  }
}
</script>