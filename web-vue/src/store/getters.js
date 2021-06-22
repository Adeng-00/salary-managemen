/*
 * @Author: cui DengKe
 * @Date: 2021-04-15 20:33:00
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 13:45:11
 * @Description: VueX getters 获取数据
 * @FilePath: \vue-salary-management\src\store\getters.js
 */

const getters = {
  REFRESH_TOKEN: state => state.permission.REFRESH_TOKEN, // token令牌
  ACCESS_TOKEN: state => state.permission.ACCESS_TOKEN, // 刷新token 的令牌
  MENU_DATA: state => state.permission.MENU_DATA, // 依赖于router 生成的菜单数据
  PERMISSION_ALL: state => state.permission.PERMISSION_ALL, // 所有的去权限配置
  CUR_CHO_MENU: state => state.permission.CUR_CHO_MENU, // 当前被选中的菜单项 默认第二个运营数据
  LANG: state => state.permission.LANG, // 当前系统语言
  userInfo: state => state.staff.userInfo,  // 个人信息
  staffList: state => state.staff.staffList  // 人员列表
}

export default getters
