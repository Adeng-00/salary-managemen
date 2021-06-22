<!--
 * @Author: cui DengKe
 * @Date: 2021-06-20 17:50:36
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:47:41
 * @Description: 菜单管理 右侧权限标识 table
 * @FilePath: \vue-salary-management\src\views\systemManagement\permissionManagement\components\rightTable.vue
-->
<template>
  <CRUD v-bind="CRUDState" @rowRequest="rowRequest"></CRUD>
</template>

<script>
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { options, columns } from './rightColumns'
import CRUD from '@/components/CustomCRUD/index'
import * as permissionApi from '@/api/permissionApi'
import { message } from 'ant-design-vue'

export default {
  name: 'RightTable',
  components: { CRUD },
  props: {
    curMenuId: { // 当前选中数据的menuId
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const store = useStore() // VueX

    // curd 整体配置
    const CRUDState = reactive({
      options,
      isLoading: false,
      tableColumns: columns,
      tableData: [],
      dataTotal: 0
    })

    // 请求数据
    const getListData = (menuId) => {
      permissionApi.getPermissionPort({ menuId }).then(async (result) => {
        CRUDState.tableData = result.data
      }).catch((err) => {
        console.log(err);
      });
    }

    watch(() => props.curMenuId, (val) => {
      if (val.length > 0) {
        getListData(val[0])
      }
    }, { immediate: true })

    const rowRequest = (flag, data) => {
      if (props.curMenuId.length < 1) {
        return
      }
      data.menuId = props.curMenuId[0]
      // 新增
      if (flag === 1) {
        permissionApi.addPermissionPort(data).then((res) => {
          if (res) {
            getListData(props.curMenuId[0])
            message.success('添加成功')
          } else {
            message.error('添加失败')
          }
        }).catch((err) => {
          message.error('添加失败')
          console.log("添加失败", err)
        })
      }
      // 编辑
      if (flag === 2) {
        permissionApi.putPermissionPort(data).then((res) => {
          if (res) {
            getListData(props.curMenuId[0])
            message.success('编辑成功')
          } else {
            message.error('编辑失败')
          }
        }).catch((err) => {
          message.error('编辑失败')
          console.log("编辑失败", err)
        });
      }
      // 删除
      if (flag === 3) {
        permissionApi.delPermissionPort(data).then((res) => {
          if (res) {
            getListData(props.curMenuId[0])
            message.success('删除成功')
          } else {
            message.error('删除失败')
          }
        }).catch((err) => {
          message.error('删除失败')
          console.log("删除失败", err)
        })
      }
      store.dispatch('getPermissionAll')
    }

    return {
      CRUDState,
      rowRequest
    }
  }
}
</script>