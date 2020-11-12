//app.js
App({

  onLaunch: function () {
    // // 展示本地存储能力
    // // debugger
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // debugger
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.info('登陆操作>换取openId : ' + JSON.stringify(res))
    //     wx.setStorageSync('code', res.code);
    //     console.log(res.code)
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     // debugger
    //      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: res => {
    //           // debugger
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //           // wx.navigateTo({
    //           //   url: '/pages/mine/mine',
    //           // })
    //           // debugger
    //           wx.switchTab({
    //             url: '/pages/mine/mine',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
    // 标题栏
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 51;
        }
      }
    })
  },
  checkLogin() {
    let flag = false;
    let user = wx.getStorageSync('userInfo')
    console.log(wx.getStorageSync('userInfo'))
    // 判断用户是否登录
    if (user) {
      console.log("user" + user == null)
      flag = true;
      this.globalData.userInfo = user;
    } else {
      flag = false;
      wx.redirectTo({
        url: '/pages/login0/login0'
      });
      console.log("执行返回登录页")
    }
    return flag;
  },
  globalData: {
    userInfo: null
  },
  util: require("/utils/utils.js"),
  api: require("/utils/api.js"),
  siteInfo: require("siteinfo.js"),
  // WxParse: require("/plugin/wxParse/wxParse.js")
})