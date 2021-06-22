<!--
 * @Author: cui DengKe
 * @Date: 2021-06-11 11:20:19
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-21 13:46:04
 * @Description: logoIn 登录页
 * @FilePath: \vue-salary-management\src\views\logoIn\components\LogoIn.vue
-->
<template>
  <div class="logo-in flex-centers">
    <div class="pos-re form-warp bg-white flex-centers box-shadow">
      <a-form
        class="padding-x"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
        :wrapperCol="{ span: 18 }"
      >
        <a-form-item class="flex-centers">
          <div class="system-title text-center">{{$t('commonI18n.SystemTitle')}}</div>
        </a-form-item>
        <a-form-item :label="$t('logoInI18n.Account')" name="account">
          <a-input
            :placeholder="$t('commonI18n.PleaseEnter')+$t('logoInI18n.Account')"
            v-model:value="formState.account"
            type="text"
          />
        </a-form-item>
        <a-form-item :label="$t('logoInI18n.Password')" name="password">
          <a-input-password
            :placeholder="$t('commonI18n.PleaseEnter')+$t('logoInI18n.Password')"
            v-model:value="formState.password"
          />
        </a-form-item>
        <a-form-item :label="$t('logoInI18n.verificationCode')" name="code">
          <div class="flex-s-b">
            <a-input
              class="code-input"
              type="text"
              :placeholder="$t('commonI18n.PleaseEnter')+$t('logoInI18n.verificationCode')"
              v-model:value="formState.code"
            />
            <VerificationCode class="code-canvas" :passWidth="100" :passHeight="32" ref="codeRef"></VerificationCode>
          </div>
        </a-form-item>
        <a-form-item class="flex-centers">
          <a-button block type="primary" html-type="submit">{{$t('logoInI18n.signIn')}}</a-button>
          <a-button class="margin-tx" block @click="register">{{$t('logoInI18n.Register')}}</a-button>
        </a-form-item>
      </a-form>
      <div class="pos-ab" style="bottom:10px;left:10px">
        English
        <a-switch @change="handleLocale" v-model:checked="i18nLocale" />&nbsp;中文
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import cipher from '@/utils/cipher'
import { message } from 'ant-design-vue';
import VerificationCode from '@/components/VerificationCode' // 验证码组件
import { logInPort } from '@/api/commonApi/index'

export default {
  name: 'LogoIn',
  components: { VerificationCode },
  emits: ["register"],
  setup(props, context) {
    // i18n 使用
    const { t, locale } = useI18n({ useScope: 'global' })
    const router = useRouter()
    const store = useStore()
    const formState = reactive({
      account: '', // 账号
      password: '', // 密码
      code: '' // 验证码
    })

    const codeRef = ref() // 验证码组件ref
    const isRegiser = ref(false) // 是否注册

    // 验证码校验规则
    const validateCode = async (rule, value) => {
      if (value === '') {
        return Promise.reject('请确认验证码！')
      } else if (value !== codeRef.value.imgCode) {
        codeRef.value.handleDraw()
        console.log(codeRef.value.imgCode)
        return Promise.reject('验证码有误，请注意大小写！')
      } else {
        return Promise.resolve()
      }
    }

    // 必填校验
    const rules = {
      account: [
        {
          required: true,
          message: '请输入您的账号！',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入您的密码！',
          trigger: 'blur'
        }
      ],
      code: [{ required: true, validator: validateCode, trigger: 'change' }]
    }

    // 登录
    const handleFinish = (values) => {
      // 采用md5加密 密码
      values.password = cipher.MD5.encrypt(values.password)

      logInPort(values).then(res => {
        // 登录成功储存 登陆状态
        store.commit('SET_TOKEN', res.data)

        // 设置用户个人信息
        store.commit('SET_USER_INFO', res.data)

        // 根据路由数据 设置菜单数据
        store.dispatch('generateMenuData', router.options.routes)

        // 获取所有权限
        store.dispatch('getPermissionAll')

        // 获取人员信息
        store.dispatch('getStaffList')

        // 跳转到首页
        router.push('/dashBoard')
        message.success(t('logoInI18n.LoginSuccess'));
      }).catch(err => {
        console.log(err);
      })
    }

    // 跳转到注册页面
    const register = () => {
      isRegiser.value = !isRegiser.value
      context.emit("register", isRegiser.value);
    }

    const i18nLocale = ref(store.getters.LANG === 'en' ? false : true) // 选择语言
    const handleLocale = (val) => {
      if (val) { // 默认中文
        locale.value = 'ch'
        store.commit('SET_LANG', 'ch')
      } else { // 英文
        locale.value = 'en'
        store.commit('SET_LANG', 'en')
      }
      // 切换语言后使用
      location.reload();
    }

    return {
      formState,
      rules,
      codeRef,
      handleFinish,
      register,
      i18nLocale,
      handleLocale
    }
  }
}
</script>


<style lang="scss" scoped>
.logo-in {
  width: 100vw;
  height: 100vh;
  background: #55b9f3;
  .form-warp {
    margin: auto;
    width: 380px;
    height: 450px;
    .system-title {
      font-family: SourceHanSansSC;
      font-weight: 700;
      font-size: 25px;
      color: rgb(47, 79, 79);
      font-style: normal;
      letter-spacing: 0px;
      text-decoration: none;
    }
    .code-input {
      height: 32px;
      width: 52%;
      margin-top: -6px;
    }
    .code-canvas {
      position: relative;
      left: -15px;
    }
  }
}
.load-bg {
  width: 100vw;
  height: 100vh;
  background: rgb(50, 59, 68);
}
</style>