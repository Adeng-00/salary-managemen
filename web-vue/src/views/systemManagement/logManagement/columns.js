/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 21:36:19
 * @Description: 工资报表 配置
 * @FilePath: \vue-salary-management\src\views\systemManagement\logManagement\columns.js
 */

// 根据value 展示对应 label

// crud展示配置
export const options = {
  operation: {
    add: false,
    del: true,
    edit: false,
    search: true,
    view: true
  }
}

// 表格展示配置
export const columns = [
  {
    title: "异常名字",
    dataIndex: "name",
    type: 'text',
    width: 200
  },
  {
    title: "异常信息",
    dataIndex: "info",
    type: 'text',
    width: 200
  },
  {
    title: "异常堆栈",
    dataIndex: "stack",
    type: 'textarea',
    span: 24,
    ellipsis: true
  },
  {
    title: "vue 异常信息",
    dataIndex: "vueInfo",
    type: 'text',
    width: 200
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    type: 'date',
    search: true,
    width: 200,
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: 120,
    slots: { customRender: "operation" }
  }
]

