<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0">
      <a-page-header :ghost="false" style="border: 1px solid rgb(235, 237, 240)">
        <template #tags>
          <!-- 折叠menu的Icon -->
          <component
            class="trigger"
            @click="hideMenu"
            :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
          ></component>
        </template>
        <template #extra>
          <a-dropdown class="margin-rlg pointer" placement="bottomCenter">
            <!-- <div>{{$t('subjectI18n.Admin')}}</div> -->
            <div>{{curUser.account}}</div>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1">{{$t('subjectI18n.SwitchLanguageOut')}}</a-menu-item>
                <a-menu-item key="2">
                  <UserOutlined />
                  {{$t('subjectI18n.SignOut')}}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-page-header>
    </a-layout-header>
    <a-layout-content class="main-box_con">
      <!-- <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>User</a-breadcrumb-item>
      </a-breadcrumb>-->
      <div class="padding-x bg-white">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { reactive, toRefs } from "vue";
import { useStore } from 'vuex'
import { useRouter } from "vue-router";
import { cleStorage } from "@/utils/storage";

export default {
  name: "MainBody",
  components: { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const store = useStore();
    const router = useRouter();

    const outGorup = reactive({
      hideMenu() {
        // 点击隐藏\展开menu事件
        outGorup.collapsed = !outGorup.collapsed;
        // 提交数据给父组件
        context.emit("update:modelValue", outGorup.collapsed);
      },
      outLogo() {
        // 退出登录
        cleStorage(); // 清空浏览器储存数据
        router.replace("/"); // 回到登录页
      },
      collapsed: props.modelValue
    })

    // title右侧下拉事件处理
    const handleMenuClick = (e) => {
      let obj = JSON.parse(JSON.stringify(e));
      switch (obj.key) {
        case '1':
          store.commit('SET_LANG', store.getters.LANG === 'ch' ? 'en' : 'ch')
          // 切换语言后使用
          location.reload();
          break;
        case '2':
          outGorup.outLogo();
          break;
        default:
          break;
      }
    };
    return {
      ...toRefs(outGorup),
      curUser: store.getters.userInfo,
      handleMenuClick
    };
  },
}
</script>

<style scoped>
.main-box_con {
  height: 100vh;
  overflow-y: scroll;
}
.main-box_con::-webkit-scrollbar {
  display: none;
}
.pointer {
  cursor: pointer;
}
</style>
