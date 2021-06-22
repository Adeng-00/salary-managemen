### 薪资管理系统

#### 技术选型

Vue3.0 + Ant-Design-Vue + vue-i18n

UI： [点此查看 UI](https://modao.cc/square/mtki9lb8qraqjjgh?title=%E3%80%90%E9%AB%98%E4%BF%9D%E3%80%91%E5%91%98%E5%B7%A5%E8%96%AA%E8%B5%84%E7%AE%A1%E7%90%86)

---

#### 功能介绍

- 「运营数据」

  统计上月迟到人数，早退情况，旷工人数，未写日志人数，未打卡人数。

- 「出勤统计」

  管理员工出勤数据，以此数据生成「运营数据」中统计信息

- 「员工管理」

  维护员工的基础信息，查看员工的入职基本信息。

- 「工资报表」

  可对员工的工资数据进行操作。

- 「系统管理」

  权限管理，配置按钮权限表示。

  日志管理，记录项目项目运行中错误日志。

---

#### 项目特点

1. 基于 Antd Table 封装简易 CRUD。只需注重 js 配置，即可实现增删改查。如有特殊功能需求可自定义组件渲染。
2. 组件使用 v-bind/\$attrs 简化传参，也可解决对没根元素的组件传参，使用 provide/inject 给嵌套组件传递数据。
3. 以自定义 Hooks 方式管理 CRUD 组件需要的各类方法、数据。
4. 以 Vue 插件形式用 Vue errorHandler 做日志处理，自定义节流、防抖、权限判断指令。

#### 项目目录结构

|-- src

​ |-- App.vue Vue 挂在对象

​ |-- main.js 入口文件

​ |-- api api 接口管理

​ |-- assets 图片资源

​ |-- components 公用组件

​ |-- composition 自定义 Hooks

​ |-- const 常量配置 errCode

​ |-- language i18n 国际化

​ |-- layout 主体布局容器

​ |-- plugins 自定义 Vue 插件 指令 + errorHandler

​ |-- router 路由管理

​ |-- store VueX 状态管理

​ |-- styles scss 样式

​ |-- utils 工具函数

​ |-- views 编写.vue 文件

---

### 项目运行错误   处理

1. Error: Cannot find module 'vue-loader-v16/package.json'

> 升级 npm==> npm i -g npm;  <br>
> 使用  cnpm  也要升级  cnpm i -g cnpm <br>
> 升级完删除  node_modules  在  cnpm i <br>
> 先卸载  ==> npm uninstall vue-loader-v16 <br>
> 在安装  ==> cnpm i vue-loader-v16

2. Error: Cannot find module 'webpack'

> 重新  npm install --save-dev webpack
