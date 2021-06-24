/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 20:39:41
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-24 09:47:50
 * @Description: 公共模块
 * @FilePath: \node-server\services\common\index.js
 */

const path = require('path')
const fs = require('fs')
// const send = require('koa-send'); // 下载文件

const controller = require(`../../controller/common`)

const { success, failed } = require('../../utils/response-format')
const { setToken } = require('../../utils/token-tools')
const { generateGuid } = require('../../utils/guid')
const validateRegisterInput = require('../../validator/common');


// 下载文件 接口 
const fileLoad = async ctx => {
  const name = ctx.params.name;
  const path = `public/upload/${name}`;
  ctx.attachment(path);
  return await send(ctx, path);
}

// 上传文件 接口 
const uploadFile = async ctx => {
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const fileReader = fs.createReadStream(file.path);

  // 文件路径
  const filePath = path.join(__dirname, '../../public/upload');
  // 组装成绝对路径
  const fileResource = filePath + `/${file.name}`;

  // 使用 createWriteStream 创建可写流，然后使用管道流pipe拼接
  const writeStream = fs.createWriteStream(fileResource);
  // 可读流通过管道写入可写流
  // 判断 /public/upload 文件夹是否存在，如果不在的话就创建一个
  // if (!fs.existsSync(filePath)) {
  //   fs.mkdir(filePath, (err) => {
  //     if (err) throw new Error(err);

  //     fileReader.pipe(writeStream);
  //   })

  //   return ctx.body = {
  //     code: 200,
  //     data: {
  //       status: 'done',
  //       name: file.name,
  //       url: `/upload/${file.name}`
  //     },
  //     msg: 'OK'
  //   }
  // } 
  fileReader.pipe(writeStream);

  return ctx.body = {
    code: 200,
    data: {
      uid: generateGuid('dk'),
      status: 'done',
      name: file.name,
      url: `/upload/${file.name}`
    },
    msg: 'OK'
  }
}

// 刷新token 接口 
const refreshToken = async ctx => {
  let res;
  try {
    const val = ctx.request.body
    await controller.refreshToken(val).then(result => {
      const { account, create_time } = result[0]
      // 重新签发token
      result[0].token = setToken({ account, create_time })
      res = success({ data: result[0] })
    })
  } catch (err) {
    res = failed(err)
  }
  // 返回body 数据 ctx.write(res) 下划线转驼峰
  ctx.write(res)
}

// 注册 接口 
const register = async ctx => {
  let res;
  try {
    const val = ctx.request.body
    const { errors, isValid } = validateRegisterInput(val);
    // 判断是否验证通过
    if (!isValid) {
      ctx.status = 400;
      ctx.body = errors;
      return;
    }
    await controller.register(val).then(result => {
      res = success({ data: result[0] })
    })
  } catch (err) {
    res = failed(err)
  }
  // 返回body 数据 ctx.write(res) 下划线转驼峰
  ctx.write(res)
}

// 字典获取
// #region
/**
 * @swagger
 * /common/login:
 *   post:
 *     description: 登录 接口 返回token
 *     tags: [公共模块]
 *     produces:
 *       - application/x-www-form-urlencoded
 *     responses:
 *       200:
 *         description: 登入成功
 */
// #endregion
// 登录 接口 返回token
const login = async ctx => {
  let res;
  try {
    const val = ctx.request.body
    await controller.login(val).then(result => {
      const { account, create_time } = result[0]
      // 签发token
      result[0].token = setToken({ account, create_time })
      result[0].refreshToken = setToken({ account, create_time, refreshToken: 'refreshToken' })
      res = success({ data: result[0] })
    })
  } catch (err) {
    res = failed(err)
  }
  // 返回body 数据 ctx.write(res) 下划线转驼峰
  ctx.write(res)
}

const model = require('../model')
// 添加、查询 前端日志 接口
const m = model([
  'addWebLog',
  'listWebLogs'
], 'common')

module.exports = {
  ...m,
  login,
  register,
  refreshToken,
  uploadFile
}

