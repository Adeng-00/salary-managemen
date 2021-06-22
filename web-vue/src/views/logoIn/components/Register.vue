<!--
 * @Author: cui DengKe
 * @Date: 2021-04-13 17:58:16
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-20 22:20:45
 * @Description: register 注册页
 * @FilePath: \vue-salary-management\src\views\logoIn\components\Register.vue
-->
<template>
  <div class="wrap flex-centers">
    <div class="form-warp bg-white flex-centers box-shadow">
      <a-form
        class="padding-x"
        :model="formState"
        :rules="rules"
        :wrapper-col="{ span: 18 }"
        @finish="handleFinish"
      >
        <a-form-item class="flex-centers">
          <div class="system-title text-center">{{$t('logoInI18n.Register')}}</div>
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
            type="password"
            :placeholder="$t('commonI18n.PleaseEnter')+$t('logoInI18n.Password')"
            v-model:value="formState.password"
          />
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 16 }"
          :label="$t('logoInI18n.ConfirmPassword')"
          name="checkPass"
        >
          <a-input-password
            type="password"
            :placeholder="$t('commonI18n.PleaseEnter')+$t('logoInI18n.ConfirmPassword')"
            v-model:value="formState.checkPass"
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
          <a-button block type="primary" html-type="submit">{{$t('logoInI18n.Register')}}</a-button>
          <a-button class="margin-tx" block @click="backLogoIn">{{$t('logoInI18n.BackLogin')}}</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { message } from 'ant-design-vue';
import cipher from '@/utils/cipher'
import VerificationCode from '@/components/VerificationCode' // 验证码组件
import { registerPort } from '@/api/commonApi/index'
import { useI18n } from 'vue-i18n'

export default {
  name: "Register",
  components: { VerificationCode },
  emits: ['logoIn'],
  setup(props, context) {
    const { t } = useI18n()

    const codeRef = ref() // 验证码组件ref
    const formState = reactive({
      account: "", // 账号
      password: "", // 密码
      checkPass: "", // 密码
      code: '' // 验证码
    });
    // 确认密码校验规则
    const validatePass = async (rule, value) => {
      if (value === "") {
        return Promise.reject(t('commonI18n.PleaseEnter') + t('logoInI18n.ConfirmPassword'));
      } else if (value !== formState.password) {
        return Promise.reject(t('logoInI18n.PasswordMismatch') + t('commonI18n.PleaseEnter'));
      } else {
        return Promise.resolve();
      }
    };
    // 验证码校验规则
    const validateCode = async (rule, value) => {
      if (value === '') {
        return Promise.reject(t('commonI18n.PleaseEnter') + t('logoInI18n.verificationCode'))
      } else if (value !== codeRef.value.imgCode) {
        codeRef.value.handleDraw()
        console.log(codeRef.value.imgCode)
        return Promise.reject(t('commonI18n.VerificationError'))
      } else {
        return Promise.resolve()
      }
    }
    // 必填校验
    const rules = {
      account: [
        {
          required: true,
          message: t('commonI18n.PleaseEnter') + t('logoInI18n.Account'),
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: t('commonI18n.PleaseEnter') + t('logoInI18n.Password'),
          trigger: "blur",
        },
      ],
      checkPass: [{ required: true, validator: validatePass, trigger: "change" }],
      code: [{ required: true, validator: validateCode, trigger: 'change' }]
    };
    // 提交成功的回调
    const handleFinish = (values) => {
      values.password = cipher.MD5.encrypt(values.password) // 采用md5加密 密码

      registerPort(values).then(res => {
        message.success(t('commonI18n.RegistrationCompleted'));
        setTimeout(() => {
          backLogoIn(res)
        }, 1000)
      }).catch(err => {
        console.log(err);
      })
    };
    // 返回登录
    const backLogoIn = () => {
      context.emit('logoIn')
    };
    return {
      formState,
      rules,
      codeRef,
      handleFinish,
      backLogoIn
    };
  },
}
</script>


<style lang="scss" scoped>
.wrap {
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
      line-height: 54px;
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
</style>