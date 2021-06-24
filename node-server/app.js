/*
 * @Author: cui DengKe
 * @Date: 2021-06-10 17:59:14
 * @LastEditors: cui DengKe
 * @LastEditTime: 2021-06-24 09:44:40
 * @Description: 项目入口文件
 * @FilePath: \node-server\app.js
 */
const Koa = require('koa')
const path = require('path')
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const koaStatic = require('koa-static')
const koaBody = require('koa-body');
const koaJwt = require('koa-jwt')

const { koaSwagger } = require('koa2-swagger-ui')
const swagger = require('./config/swagger');

const routers = require('./routers/index.js')

const config = require('./config/default.js');
const logger = require('./middleware/logger');
const { checkToken } = require('./utils/token-tools')
const { toHump } = require('./utils/response-format');

const app = new Koa();

// 加入swagger显示接口文档
app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/swagger.json' // example path to json
    }
  })
);
app.use(swagger.routes(), swagger.allowedMethods());

// 处理log的中间件
app.use(logger());

// 配置跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:5050');
  ctx.set('Access-Control-Allow-Methods', 'get,post,put,delete,GET,POST,PUT,DELETE');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Max-Age', 3600 * 24);
  await next();
});

// 客户端参数解析中间件
app.use(koaBody({
  multipart: true, // 支持文件上传
  parsedMethods: ['POST', 'PUT', 'GET', 'DELETE'], // 设为false 解决 DELETE拿不到参数
  formidable: {
    maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
    multipart: true // 是否支持 multipart-formdate 的表单
  }
}));

// Vue路由history模式刷新404的解决方法 
// 注意：该引用须在 const serve = require('koa-static'); 前
app.use(historyApiFallback({ whiteList: ['/api'] }));

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, './public/dist')))
app.use(koaStatic(path.join(__dirname, './public')))


// 中间件 处理401错误
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err;
    }
  })
});

// 路由权限控制 除了path里的路径不需要验证token 其他都要
app.use(
  koaJwt({
    secret: config.secret
  }).unless({
    path: [
      /^\/api\/common\/login/,
      /^\/api\/common\/register/,
      /^((?!\/api).)*$/   // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
  })
);

// 校验 token 
app.use(checkToken)

// 格式化返回客户端的数据格式  从下划线转为驼峰 需要放在引用路由之前
app.use(toHump)

// 配置路由
app.use(routers.routes(), routers.allowedMethods())


// 监听在3000端口
app.listen(config.port, () => {
  console.log(`node server is running on port: ${config.port}`);
});