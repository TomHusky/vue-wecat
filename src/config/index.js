module.exports = {
  appId:'1552274783265',
  appKey:'7gBZcbsC7kLIWCdELIl8nxcs',
  appSecret:'0osTIhce7uPvDKHz6aa67bhCukaKoYl4',
  /**
   * token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   *  是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * 项目部署基础
   * 默认情况下，我们假设你的应用将被部署在域的根目录下,
   * 例如：https://www.my-app.com/
   * 默认：'/'
   * 如果您的应用程序部署在子路径中，则需要在这指定子路径
   * 例如：https://www.foobar.com/my-app/
   * 需要将它改为'/my-app/'
   */
  publicPath: {
    //  本地环境发布目录
    dev: '/wechat/',
    //  生产环境发布目录
    pro: '/'
  },
  /**
   *  api请求基础路径
   */
  apiUrl: {
    //  本地环境接口请求地址
    dev: 'http://127.0.0.1:8088/wechat-mvc',
    //  生产环境接口请求地址
    pro: 'http://api.openc.top'
  },
}
