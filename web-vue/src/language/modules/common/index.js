/*
 * @Author: cui DengKe
 * @Date: 2021-06-18 13:51:27
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-18 22:12:28
 * @Description: 公共的 国际化翻译
 * @FilePath: \vue-salary-management\src\language\modules\common\index.js
 */

import formatI18n from '../formatI18n';

const lang = {
  SystemTitle: ['薪资管理系统', 'Salary Management System'],
  Tips: ['提示', 'Tips'],
  Cancel: ['取消', 'Cancel'],
  Confirm: ['确认', 'Confirm'],
  Failed: ['失败', 'Failed'],
  Success: ['成功', 'Success'],
  PleaseEnter: ['请输入', 'Please Enter'],
  PleaseChoose: ['请选择', 'Please Choose'],
  EndTime: ['结束时间', 'End Time'],
  StartTime: ['开始时间', 'Start Time'],
  AddFailed: ['添加失败', 'Add Failed'],
  AddSuccess: ['添加成功', 'Add Success'],
  EditFailed: ['修改失败', 'Edit Failed'],
  EditSuccess: ['修改成功', 'Edit Success'],
  AreYouSure: ['是否确定删除？', 'Are you sure you want to delete ?'],
  DeleteFailed: ['删除失败', 'Delete Failed'],
  DeleteSuccess: ['删除成功', 'Delete Success']
}

export default formatI18n(lang, 'commonI18n')