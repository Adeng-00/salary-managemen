/*
 * @Author: cui DengKe
 * @Date: 2021-06-14 10:19:22
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 13:44:46
 * @Description: 员工模块 VueX 数据
 * @FilePath: \vue-salary-management\src\store\modules\staff.js
 */

import { getStaffListIdAndName } from '@/api/staffApi';

const staff = {
  state: {
    userInfo: {}, // 个人信息
    staffList: [] // 员工列表
  },

  mutations: {
    // 设置员工列表
    SET_STAFF_LIST: (state, data) => {
      state.staffList = data.map(m => {
        return {
          label: m.name,
          value: String(m.id)
        }
      })
    },
    // 设置个人信息
    SET_USER_INFO: (state, data) => {
      state.userInfo = data
    }
  },

  actions: {
    // 获取员工列表
    async getStaffList(context) {
      try {
        const data = await getStaffListIdAndName({ current: 1, size: 999 })
        data && context.commit('SET_STAFF_LIST', data.data)
      } catch (error) {
        console.log("获取人员list失败==>", error);
      }
    }
  }
}

export default staff
