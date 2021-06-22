### 薪资管理系统

#### 技术选型

nodejs + Koa2 + MySQL + JWT + log4js

---

#### 项目特点

1. 以 MVC 形式搭建项目目录结构，采用 resultful 风格，并封装模板增删改查函数。
2. 抽离 response-format 函数，以及 sql-format 函数，统一管理响应数据格式和 SQL 语句格式。
3. koa-jwt + jsonwebtoken，实现 token 签发、校验，以及接口权限配置。log4js，记录 Success 和 error 全局日志。koa-body 处理文件上传。

#### 项目目录结构

|-- node-serve

|-- app.js 入口文件

|-- cache redis

|-- config 配置项目信息

|-- controller 数据库直连层

|-- enum 枚举项 statusCode

|-- logs log 日志

|-- middleware 中间件

|-- public 静态文件

|-- routers 使用 koa-router 调用 routes 统一生成接口

|-- routes 详细路由接口

|-- services 接口回调函数，真正的逻辑层

|-- utils 工具函数

|-- validator 校验函数

---

#### 文件夹详解

1. controller

   > 与数据库直接连接层，当不知道参数需要哪几个时可以进入看

2. routes

   > 里面定义了一堆路由，地址为/api/文件夹名/属性名，还有调用 api 相关的 http 方法

3. services

   > 定义 routes 里每个接口回调函数，里边调用对应的 controller 方法 真正的逻辑层

4. config

   > 里面定义了数据库的端口和数据库名称以及密码
