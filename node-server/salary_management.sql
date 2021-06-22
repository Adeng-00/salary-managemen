/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : salary_management

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 20/06/2021 23:53:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '账户id',
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `create_time` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `status` int(1) NOT NULL COMMENT '是否被删除0否，1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '2021-06-12 10:24:19', 0);
INSERT INTO `account` VALUES (2, 'dengke', '3064e376a509b633f8616ef6d66ac0fe', '2021-06-12 11:30:47', 0);
INSERT INTO `account` VALUES (3, 'dengke1', '8aa2ffbd5ddc9a36f79aab7a81bb397a', '2021-06-12 11:32:46', 0);

-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '考勤表主键id',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工姓名',
  `department` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工部门',
  `leave_early` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '早退次数',
  `late` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '迟到次数',
  `no_clock_in` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '未打卡次数',
  `work_overtime` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '加班次数',
  `nog_not_written` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '未写日志次数',
  `create_time` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间',
  `status` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '是否被删除0否，1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendance
-- ----------------------------
INSERT INTO `attendance` VALUES (19, '15', '2', '0', '2', '1', '10', '2', '2021-06-16 16:13:13', 0);
INSERT INTO `attendance` VALUES (20, '16', '2', '0', '0', '0', '1', '0', '2021-06-17 22:01:51', 0);
INSERT INTO `attendance` VALUES (21, '15', '3', '0', '0', '0', '0', '0', '2021-06-17 22:03:28', 0);

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `menu_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '前端路由地址',
  `menu_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '路由名称（前端菜单名称）',
  `pid` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '父级id，前端为二级菜单',
  `create_time` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间',
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '是否被删除0否1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '/views/dashBoard/index.vue', '运营数据', '0', '2021-06-20 15:33:09', '0');
INSERT INTO `menu` VALUES (2, '/views/attendanceStatistics/index.vue', '出勤统计', '0', '2021-06-20 15:38:06', '0');
INSERT INTO `menu` VALUES (3, '/systemManagement/index', '系统管理', '0', '2021-06-20 15:41:46', '0');
INSERT INTO `menu` VALUES (4, '/views/systemManagement/menuManagement/index.vue', '菜单管理', '3', '2021-06-20 15:42:40', '0');
INSERT INTO `menu` VALUES (5, '/views/systemManagement/logManagement/index.vue', '日志管理', '3', '2021-06-20 22:18:43', '0');
INSERT INTO `menu` VALUES (6, '/views/staffManagement/index.vue', '员工管理', '0', '2021-06-20 23:30:47', '0');
INSERT INTO `menu` VALUES (7, '/views/salaryStatements/index.vue', '工资报表', '0', '2021-06-20 23:37:47', '0');

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限名称',
  `flag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限标识',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限备注',
  `create_time` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间',
  `status` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '是否删除0否1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES (1, '2', '出勤统计-编辑', 'attendance/edit', '出勤统计-编辑', '2021-06-20 18:26:44', '0');
INSERT INTO `permission` VALUES (2, '2', '出勤统计-删除', 'attendance/view', '出勤统计-删除', '2021-06-20 20:05:57', '1');
INSERT INTO `permission` VALUES (3, '2', '出勤统计-添加', 'attendance/add', '出勤统计-添加', '2021-06-20 20:28:05', '0');

-- ----------------------------
-- Table structure for salary
-- ----------------------------
DROP TABLE IF EXISTS `salary`;
CREATE TABLE `salary`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '薪资表主键id',
  `department` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工所在部门',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工姓名',
  `should_days` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '应出勤天数',
  `actual_days` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '实际出勤天数',
  `base_salary` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '基本工资',
  `post_salary` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '岗位工资',
  `merit_salary` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '绩效工资',
  `deduction` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '违规扣款',
  `social_security` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '社保扣款',
  `full_attendance` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '全勤奖',
  `work_overtime_days` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '加班天数',
  `overtime_salary` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '加班费',
  `actual_salary` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '实发工资',
  `create_time` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间',
  `status` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '是否被删除0否，1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of salary
-- ----------------------------
INSERT INTO `salary` VALUES (4, '2', '15', '30', '30', '4000', '0', '0', '0', '0', '100', '1', '200', '4300', '2021-06-16 16:14:00', 0);

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '员工id',
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工姓名',
  `age` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工年龄',
  `gender` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工性别',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工手机',
  `address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工住址',
  `job_number` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工工号',
  `education` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工学历1，大专；2，本科；3，研究生',
  `staff_state` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工在职状态1，在职；2，离职',
  `is_formal` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工是否转正1，转正；2，实习中',
  `entry_date` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工入职时间',
  `department` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工所在部门',
  `photo` varchar(10000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像照片',
  `create_time` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间',
  `status` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '是否被删除0否，1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES (15, '大人物', '20', '0', '17700646171', '郑州', '20210616', '1', '0', '0', '2020-06-16', '2', '[{\"uid\":\"dk073f357d-d37936df-c95e1159-6c88f938\",\"status\":\"done\",\"name\":\"headimg.jpg\",\"url\":\"/upload/headimg.jpg\"}]', '2021-06-16 16:07:25', 0);
INSERT INTO `staff` VALUES (16, '张三', '25', '0', '18888002233', '郑州', '20210617', '1', '1', '1', '2021-06-17', '3', '[{\"uid\":\"dkd3c533db-e89f64c4-a22b7cee-8a7d918b\",\"status\":\"done\",\"name\":\"pdf.png\",\"url\":\"/upload/pdf.png\"}]', '2021-06-17 11:59:18', 0);
INSERT INTO `staff` VALUES (17, '小明', '19', '0', '18888888888', '郑州', '20210617', '0', '0', '0', '2021-06-17', '3', '[{\"uid\":\"dk355e5067-e5385625-b31afbd1-a48f0c3e\",\"status\":\"done\",\"name\":\"other.png\",\"url\":\"/upload/other.png\"}]', '2021-06-17 23:12:54', 0);

-- ----------------------------
-- Table structure for web_log
-- ----------------------------
DROP TABLE IF EXISTS `web_log`;
CREATE TABLE `web_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '异常名字',
  `info` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '异常信息',
  `stack` varchar(10000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '异常堆栈',
  `vue_info` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'vue 异常信息',
  `create_time` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间',
  `status` int(1) UNSIGNED ZEROFILL NOT NULL COMMENT '是否被删除0否，1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of web_log
-- ----------------------------
INSERT INTO `web_log` VALUES (3, 'ReferenceError', 'ss is not defined', 'ReferenceError: ss is not defined\n    at setup (webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js:28:5)\n    at callWithErrorHandling (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:279:22)\n    at setupStatefulComponent (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:7212:29)\n    at setupComponent (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:7168:11)\n    at mountComponent (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5175:13)\n    at processComponent (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5150:17)\n    at patch (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:4765:21)\n    at render (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5870:13)\n    at mount (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:4181:25)\n    at Object.app.mount (webpack-internal:///./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:1507:23)', 'setup function', '2021-06-17 11:10:28', 0);
INSERT INTO `web_log` VALUES (4, 'ReferenceError', 'sss is not defined', 'ReferenceError: sss is not defined\n    at setup (webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader-v16/dist/index.js?!./src/App.vue?vue&type=script&lang=js:28:5)\n    at callWithErrorHandling (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:279:22)\n    at setupStatefulComponent (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:7212:29)\n    at setupComponent (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:7168:11)\n    at mountComponent (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5175:13)\n    at processComponent (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5150:17)\n    at patch (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:4765:21)\n    at render (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:5870:13)\n    at Object.context.reload (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:4174:29)\n    at eval (webpack-internal:///./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js:652:33)', 'setup function', '2021-06-17 11:10:58', 0);

SET FOREIGN_KEY_CHECKS = 1;
