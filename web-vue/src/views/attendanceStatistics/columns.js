/*
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 21:08:38
 * @Description: 出勤统计 配置
 * @FilePath: \vue-salary-management\src\views\attendanceStatistics\columns.js
 */
// 根据value 展示对应 label
import { filterValueBackLabel } from '@/utils/format';

// crud展示配置
export const options = {
  operation: {
    add: true,
    del: true,
    edit: 'attendance/edit',
    search: true,
    view: true
  }
}

// 表格展示配置  store 从VueX中获取数据
export const columns = (store) => {
  return [
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
      title: "早退次数",
      dataIndex: "leaveEarly",
      type: 'text',
    },
    {
      title: "迟到次数",
      dataIndex: "late",
      type: 'text',
    },
    {
      title: "未打卡次数",
      dataIndex: "noClockIn",
      type: 'text',
    },
    {
      title: "加班次数",
      dataIndex: "workOvertime",
      type: 'text',
    },
    {
      title: "未写日志次数",
      dataIndex: "nogNotWritten",
      type: 'text',
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: 80,
      slots: { customRender: "operation" }
    }
  ]
}