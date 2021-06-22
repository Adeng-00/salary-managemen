/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 20:46:10
 * @Description: 工资报表 配置
 * @FilePath: \vue-salary-management\src\views\salaryStatements\columns.js
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

// 表格展示配置  store 从VueX中获取数据
export const columns = (store) => {
  return [
    {
      title: "员工部门",
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
    },
    {
      title: "员工姓名",
      dataIndex: "name",
      type: 'select',
      search: true,
      required: true,
      selectData: store.getters.staffList,
      customRender: ({ text, column }) => { // 根据value 展示对应 label
        return filterValueBackLabel(text, column.selectData)
      }
    },
    {
      title: "应出勤天数",
      dataIndex: "shouldDays",
      type: 'text',
      required: true
    },
    {
      title: "实际出勤天数",
      dataIndex: "actualDays",
      type: 'text',
      required: true
    },
    {
      title: "基本工资",
      dataIndex: "baseSalary",
      type: 'text',
      required: true
    },
    {
      title: "岗位工资",
      dataIndex: "postSalary",
      type: 'text'
    },
    {
      title: "绩效工资",
      dataIndex: "meritSalary",
      type: 'text'
    },
    {
      title: "违规扣款",
      dataIndex: "deduction",
      type: 'text'
    },
    {
      title: "社保扣款",
      dataIndex: "socialSecurity",
      type: 'text'
    },
    {
      title: "全勤奖",
      dataIndex: "fullAttendance",
      type: 'text',
      required: true
    },
    {
      title: "加班天数",
      dataIndex: "workOvertimeDays",
      type: 'text'
    },
    {
      title: "加班费",
      dataIndex: "overtimeSalary",
      type: 'text'
    },
    {
      title: "实发薪资",
      dataIndex: "actualSalary",
      type: 'text',
      required: true
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 80,
      slots: { customRender: "operation" }
    }
  ]
}

