### 薪资管理系统

- **项目描述：**为熟悉Vue3+TS的个人项目，为了更多的给自己充电进行了前后端分离，后端采用nodejs。使用Eslint、Husky、Commitlint、Lint-staged规范项目代码。使用Docker、Nginx、Jenkins部署到个人阿里云Centos8服务器。地址: https://salary.dkwuwei.top/logoIn 账号/密码：dengke

- **技术栈、框架：**2021年三月使用Vue3.0+Vue CLI+JS+Koa+MySQL(手写简单的sql语句)做第一版；2022年二月使用Vue3.2+Vite+TS+Egg+MySQL+Egg-Sequelize进行重构。

---

**项目亮点：**

- 使用Antd进行基础UI架构，对axios、I18n、Echarts等库进行配置封装
- 封装crud组件，只需数据配置，即可实现增删改查。留有扩展入口，如有特殊功能需求可自定义组件渲染
- 以Hooks方式配合crud组件使用，内置crud组件所需的各类方法、数据，提高代码可维护性、健壮性
- 以Vue插件形式注册节流、防抖、权限判断指令，加入Vue errorHandler日志处理
- 组件使用v-bind、$atts简化传参，使用provide/inject给嵌套组件传递数据

---

#### 技术选型

前端：Vue3.0 + Ant-Design-Vue + vue-i18n

后端: nodejs + Koa2 + MySQL + JWT + log4js

UI： [点此查看 UI](https://modao.cc/square/mtki9lb8qraqjjgh?title=%E3%80%90%E9%AB%98%E4%BF%9D%E3%80%91%E5%91%98%E5%B7%A5%E8%96%AA%E8%B5%84%E7%AE%A1%E7%90%86)

---

#### 目录介绍

- node-server

  > 后端源代码

- web-vue

  > 前端源代码

---

具体的内容请看具体源码文件里面有对应的 readme 说明
