/*
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:37
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 20:58:26
 * @Description: 路由权限 动态的路由
 * @FilePath: \vue-salary-management\src\store\modules\permission.js
 */
// import { commonRoutes, modulesRoutes } from '@/router'

import { getStorage, setStorage } from "@/utils/storage"

// 刷新token接口
import { refreshTokenPort } from '@/api/commonApi';
import { getPermissionAllPort } from '@/api/permissionApi';

// 加权限的判断
function hasPermission(grantedPolicies, route) {
  if (route.meta && route.meta.policy) {
    const policy = route.meta.policy
    return grantedPolicies[policy]
  } else {
    return true
  }
}

// 加权限的判断
export function filterAsyncRoutes(routes, grantedPolicies) {
  const res = []
  routes.forEach(e => {
    const tmp = { ...e }
    if (hasPermission(grantedPolicies, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, grantedPolicies)
      }
      if (e.meta && e.meta.policy === '') {
        if (tmp.children && tmp.children.length > 0) {
          res.push(tmp)
        }
      } else {
        res.push(tmp)
      }
    }
  })
  return res
}

const permission = {
  state: {
    ACCESS_TOKEN: '', // token令牌
    REFRESH_TOKEN: '', // 刷新token 的令牌
    MENU_DATA: [],  // 菜单数据
    CUR_CHO_MENU: { // 当前选中的菜单操作栏数据 防止刷新页面丢失数据
      selectedKeys: [2], // 当前被选中的菜单项 默认第二个运营数据
      openKeys: [], // 若是打开的二级菜单 刷新页面 使用 以达到正确展示菜单的目的
    },
    LANG: getStorage('LANG', 'local') || 'ch', // 当前环境语言 默认中文
    PERMISSION_ALL: []
  },
  mutations: {
    // 设置获取到的全部权限
    SET_PERMISSION_ALL: (state, data) => {
      state.PERMISSION_ALL = data
    },
    // 设置当前被选中的菜单项  注意：系统只有两级菜单  
    SET_CUR_CHO_MENU: (state, obj) => {
      state.CUR_CHO_MENU = obj
    },
    // 设置语言
    SET_LANG: (state, data) => {
      setStorage('LANG', data, 'local')
      state.LANG = data // 当前环境语言
    },
    // 设置菜单数据
    SET_MENU_DATA: (state, menus) => {
      state.MENU_DATA = menus
    },
    // 设置token
    SET_TOKEN: (state, data) => {
      const { token, refreshToken } = data
      setStorage('ACCESS_TOKEN', token)
      state.ACCESS_TOKEN = token // token
      state.REFRESH_TOKEN = refreshToken // 向后台换取新token 的 refreshToken
    }
  },
  actions: {
    // 获取所有权限
    async getPermissionAll(context) {
      try {
        const data = await getPermissionAllPort()
        if (data.data && data.data.length > 0) {
          context.commit('SET_PERMISSION_ALL', data.data)
        }
      } catch (error) {
        console.log("获取所有权限接口错误==>", error);
      }
    },
    // 刷新token
    async refreshToken(context) {
      try {
        if (context.state.REFRESH_TOKEN) {
          const data = await refreshTokenPort({ refreshToken: context.state.REFRESH_TOKEN })
          if (data.data && data.data.token) {
            context.commit('SET_TOKEN', { refreshToken: context.state.REFRESH_TOKEN, token: data.data.token })
          }
        }
      } catch (error) {
        console.log("刷新token接口错误==>", error);
      }
    },
    // 提交菜单数据
    generateMenuData(context, routes) {
      context.commit('SET_MENU_DATA', routes)
    }
  }
}

export default permission
