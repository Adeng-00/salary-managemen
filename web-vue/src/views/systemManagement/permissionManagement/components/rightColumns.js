/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:42:23
 * @Description: 菜单管理 右侧权限标识 table 配置
 * @FilePath: \vue-salary-management\src\views\systemManagement\permissionManagement\components\rightColumns.js
 */

// crud展示配置
export const options = {
  operation: {
    add: true,
    del: true,
    edit: true,
    view: true,
    search: false,
    notPaging: true
  }
}

// 表格展示配置
export const columns = [
  {
    title: "权限名称",
    dataIndex: "name",
    type: 'text',
    required: true
  }, {
    title: "权限标识",
    dataIndex: "flag",
    type: 'text',
    required: true
  }, {
    title: "权限备注",
    dataIndex: "remark",
    type: 'text',
    required: true
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: 120,
    slots: { customRender: "operation" }
  }
]



