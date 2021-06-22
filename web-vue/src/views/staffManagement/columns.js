/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 08:55:19
 * @Description: 员工管理crud 配置项
 * @FilePath: \vue-salary-management\src\views\staffManagement\columns.js
 */

// 根据value 展示对应 label
import { filterValueBackLabel } from '@/utils/format';

// crud展示配置
export const options = {
  operation: {
    add: true,
    del: true,
    edit: true,
    search: true,
    view: true
  }
}

// 表格展示配置
export const columns = [
  {
    title: "员工姓名",
    dataIndex: "name",
    type: 'text',
    search: true,
    required: true,
  }, {
    title: "员工年龄",
    dataIndex: "age",
    type: 'text',
    required: true
  }, {
    title: "员工性别",
    dataIndex: "gender",
    type: 'select',
    required: true,
    selectData: [{
      label: '男',
      value: '0'
    }, {
      label: '女',
      value: '1'
    }],
    customRender: ({ text, column }) => { // 根据value 展示对应 label
      return filterValueBackLabel(text, column.selectData)
    }
  }, {
    title: "员工手机",
    dataIndex: "phone",
    type: 'text',
    required: true,
  }, {
    title: "员工住址",
    dataIndex: "address",
    type: 'text',
    required: true,
  }, {
    title: "员工工号",
    dataIndex: "jobNumber",
    type: 'text',
    search: true,
    required: true,
  }, {
    title: "员工学历",
    dataIndex: "education",
    type: 'select',
    required: true,
    selectData: [{
      label: '大专',
      value: '0'
    }, {
      label: '本科',
      value: '1'
    }, {
      label: '研究生',
      value: '2'
    }],
    customRender: ({ text, column }) => { // 根据value 展示对应 label
      return filterValueBackLabel(text, column.selectData)
    }
  }, {
    title: "在职状态",
    dataIndex: "staffState",
    type: 'select',
    search: true,
    required: true,
    selectData: [{
      label: '已入职',
      value: '0'
    }, {
      label: '试用期',
      value: '1'
    }, {
      label: '已离职',
      value: '2'
    }],
    customRender: ({ text, column }) => { // 根据value 展示对应 label
      return filterValueBackLabel(text, column.selectData)
    }
  }, {
    title: "是否转正",
    dataIndex: "isFormal",
    type: 'select',
    search: true,
    required: true,
    selectData: [{
      label: '是',
      value: '0'
    }, {
      label: '否',
      value: '1'
    }],
    customRender: ({ text, column }) => { // 根据value 展示对应 label
      return filterValueBackLabel(text, column.selectData)
    }
  }, {
    title: "入职时间",
    dataIndex: "entryDate",
    type: 'date',
    width: 120,
    required: true,
  }, {
    title: "所在部门",
    dataIndex: "department",
    type: 'select',
    search: true,
    required: true,
    selectData: [{
      label: 'UI组',
      value: '1'
    }, {
      label: '前端组',
      value: '2'
    }, {
      label: '后端组',
      value: '3'
    }, {
      label: '管理组',
      value: '4'
    }],
    customRender: ({ text, column }) => { // 根据value 展示对应 label
      return filterValueBackLabel(text, column.selectData)
    }
  }, {
    title: "上传头像",
    dataIndex: "photo",
    type: 'upload',
    isSingle: true,
    isImage: true,
    isShowColumn: false,
    colSpan: 0,     //隐藏表头
    customRender: (value) => {
      let obj = {
        children: value,
        attrs: {},
      };
      obj.attrs.colSpan = 0;
      return obj;
    },
  },
  {
    title: "操作",
    dataIndex: "operation",
    slots: { customRender: "operation" }
  }
]



