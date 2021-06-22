/*
 * @Author: cui DengKe
 * @Date: 2021-06-20 23:32:22
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:48:36
 * @Description: 菜单管理 左侧 添加菜单form表单配置
 * @FilePath: \vue-salary-management\src\views\systemManagement\permissionManagement\components\leftColumns.js
 */

// 表单配置
export const formColumns = [
  {
    title: "菜单名称",
    dataIndex: "menuName",
    type: 'text',
    placeholder: "请输入 菜单名称"
  },
  {
    title: "菜单路径",
    dataIndex: "menuPath",
    type: 'text',
    placeholder: "请输入 菜单路径"
  }
]

// 表单校验规则
export const formRules = {
  menuName: [
    {
      required: true,
      message: '请输入 菜单名称',
      trigger: 'blur'
    }
  ],
  menuPath: [
    {
      required: true,
      message: '请输入 菜单路径',
      trigger: 'blur'
    }
  ]
}