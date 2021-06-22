<!--
 * @Author: cui DengKe
 * @Date: 2021-06-15 08:16:55
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 13:18:13
 * @Description: 侧边菜单操作组件
 * @FilePath: \vue-salary-management\src\layout\components\Sidebar.vue
-->
<template>
  <a-layout-sider
    class="bg-white shadow-l"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
  >
    <!-- 图标 -->
    <div class="logo-box">
      <div class="flex-center">
        <a-avatar :size="64" src="https://adeng-00.github.io/assets/headimg.jpg" />
      </div>
      <div class="system-title text-center">{{$t('commonI18n.SystemTitle')}}</div>
      <div class="text-center">v1.0.1</div>
    </div>
    <!-- 菜单 -->
    <a-menu
      :style="collapsed ? 'margin-left: -50px' : ''"
      theme="light"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @click="handleClick"
      mode="inline"
    >
      <!-- menuIndex 用作a-menu的唯一值 -->
      <template v-for="(itemData, menuIndex) in menuData" :key="menuIndex">
        <!-- children是否存在 判断此路由是否需要展示在menu上 -->
        <!-- ，404，‘/’，‘/logoIn’...，他们是不需要展示在menu上的，所以路由配置时没有children  -->

        <template v-if="itemData.children">
          <!-- 1. itemData.meta.hide 只是为了做嵌套，方便试图展示在layout上。其还是一级菜单 -->
          <!-- 就不展示parent路由的title 直接取children[0].title展示  -->
          <template v-if="itemData.meta.hide">
            <a-menu-item @click="jumpRouter(itemData, itemData.children[0])" :key="menuIndex">
              <span>{{ itemData.children[0].meta.title }}</span>
            </a-menu-item>
          </template>

          <!-- 2. !itemData.meta.hide 是二级菜单 -->
          <template v-if="!itemData.meta.hide">
            <a-sub-menu :key="'sub' + menuIndex">
              <template #title>
                <span>
                  <span>{{ itemData.meta.title }}</span>
                </span>
              </template>
              <a-menu-item
                @click="jumpRouter(itemData, item)"
                v-for="(item, index) in itemData.children"
                :key="menuIndex + '-' + index"
              >
                <span>{{ item.meta.title }}</span>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Sidebar',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()

    // 侧边菜单 数据操作 组
    const menuDataGroup = reactive({
      collapsed: props.modelValue, // 是否被折叠
      selectedKeys: store.getters.CUR_CHO_MENU.selectedKeys, // 默认选中的菜单
      openKeys: store.getters.CUR_CHO_MENU.openKeys, // 默认被打开的菜单
      menuData: store.getters.MENU_DATA, // 菜单数据
      jumpRouter(parentObj, childrenObj) {
        // 点击菜单 进行路由跳转
        if (childrenObj) {
          // childrenObj存在就是二级菜单 跳转时需要 parentPath/subPath
          router.push(`${parentObj.path}/${childrenObj.path}`)
        } else {
          // 一级菜单
          router.push(parentObj.path)
        }
      },
      handleClick(val) {
        // 若是选中菜单 设置Keys 防止刷新页面丢失数据
        if (val.keyPath[1]) { // 这里代表选中的是 二级菜单
          store.commit('SET_CUR_CHO_MENU', {
            selectedKeys: [val.keyPath[1]],
            openKeys: [val.keyPath[0]]
          })
        } else { // 这里代表选中的是 一级菜单
          store.commit('SET_CUR_CHO_MENU', {
            selectedKeys: [val.keyPath[0]],
            openKeys: []
          })
        }
      }
    })

    // 监听数据变化 触发折叠menu 指令
    watch(() => props.modelValue, (val) => {
      menuDataGroup.collapsed = val
    })

    return {
      ...toRefs(menuDataGroup),
    }
  }
}
</script>

<style scoped lang="scss">
.logo-box {
  margin: 80px 0 20px 0;
  .system-title {
    font-family: SourceHanSansSC;
    font-weight: 700;
    font-size: 25px;
    color: rgb(47, 79, 79);
    font-style: normal;
    letter-spacing: 0px;
    line-height: 54px;
    text-decoration: none;
  }
}
</style>
