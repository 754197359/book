// pages/login1/login1.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    showOneButtonDialog: false,
    title: '微信授权',
    content: "获得你的公开信息",
    btn_no: '取消',
    btn_ok: '确定',
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
    onLoad: function (options) {
        var that = this;
        // 查看是否授权
        wx.getSetting({
            success: function (res) {
              
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                          debugger
                            //从数据库获取用户信息
                            that.queryUsreInfo();
                            //用户已经授权过
                            wx.switchTab({
                                url: ''
                            })
                        }
                    });
                }else{
                  console.log("用户还没有授权")
                }
            }
        })
    },
    bindGetUserInfo: function (e) {
      wx.authorize({scope: "scope.userInfo"})
      wx.getUserInfo({
        success: function(res) {
          debugger
          var userInfo = res.userInfo
          var nickName = userInfo.nickName
          var avatarUrl = userInfo.avatarUrl
          var gender = userInfo.gender //性别 0：未知、1：男、2：女
          var province = userInfo.province
          var city = userInfo.city
          var country = userInfo.country
        }
      })
        // if (e.detail.userInfo) {
        //     //用户按了允许授权按钮
        //     var that = this;
        //     //插入登录的用户的相关信息到数据库
        //     wx.request({
        //         url: getApp().globalData.urlPath + 'hstc_interface/insert_user',
        //         data: {
        //             openid: getApp().globalData.openid,
        //             nickName: e.detail.userInfo.nickName,
        //             avatarUrl: e.detail.userInfo.avatarUrl,
        //             province:e.detail.userInfo.province,
        //             city: e.detail.userInfo.city
        //         },
        //         header: {
        //             'content-type': 'application/json'
        //         },
        //         success: function (res) {
        //             //从数据库获取用户信息
        //             that.queryUsreInfo();
        //             console.log("插入小程序登录用户信息成功！");
        //         }
        //     });
        //     //授权成功后，跳转进入小程序首页
        //     wx.switchTab({
        //         url: ''  
        //     })
        // } else {
        //     //用户按了拒绝按钮
        //     wx.showModal({
        //         title:'警告',
        //         content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        //         showCancel:false,
        //         confirmText:'返回授权',
        //         success:function(res){
        //             if (res.confirm) {
        //                 console.log('用户点击了“返回授权”')
        //             } 
        //         }
        //     })
        // }
    },
    //获取用户信息接口
    queryUsreInfo: function () {
        wx.request({
            url: getApp().globalData.urlPath + 'hstc_interface/queryByOpenid',
            data: {
                openid: getApp().globalData.openid
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data);
                getApp().globalData.userInfo = res.data;
            }
        })
    },
   /**
   * 授权登录
   */
  showPopup () {
    debugger
    this.setData({
      flag: !this.data.flag
    })
  },
  //隐藏弹框
  hidePopup: function () {
    this.setData({
      flag: !this.data.flag
    })
  },
  /**
   * 设置密码表单事件
   */
  setPassInput:function(e){
    var that=this;
    // 存储输入的密码
    that.setData({
      pass:e.detail.value,
    })
  },
  selectedPinche2: function(e) {
    console.log(2)
    this.setData({
      currentSelectTripType1: e.currentTarget.dataset.id,
      show2:false,
      show3:true,
      show4:true,
      show5:false,
    })
    console.log(this.data.currentSelectTripType1)
  },
  selectedPinche1: function (e) {
    console.log(1)
    this.setData({
      currentSelectTripType1: e.currentTarget.dataset.id,
      show2:true,
      show3:false,
      show4:false,
      show5:true,
    })
    console.log(this.data.currentSelectTripType1)
  },
  // 更新data 切换选中状态
  selectedPinche: function (e) {
      this.setData({
        currentSelectTripType: e.currentTarget.dataset.id,
        show:false,
        show1:true,
        show3:true,
        show2:false,
        // show4:true,
        // show5:false,
        show6:false,
        show7:false,
        show8:true,
      })
      console.log(this.data.currentSelectTripType)
    },
    selectedBaoche: function(e) {
      this.setData({
        currentSelectTripType: e.currentTarget.dataset.id,
        show1:false,
        show:true,
        show3:true,
        show2:true,
        // show4:true,
        // show5:true,
        show6:true,
        show7:true,
        show8:false
      })
      console.log(this.data.currentSelectTripType)
    },
     // 获取验证码
  sendCode: function() {  
    // 60秒后重新获取验证码
       var inter = setInterval(function() {
         this.setData({
           smsFlag: true,
           sendColor: '#cccccc',
           sendTime: this.data.snsMsgWait + 's后重发',
           snsMsgWait: this.data.snsMsgWait - 1
         });
         if (this.data.snsMsgWait < 0) {
           clearInterval(inter)
           this.setData({
             sendColor: '#363636',
             sendTime: '获取验证码',
             snsMsgWait: 60,
             smsFlag: false
           });
         }
       }.bind(this), 1000);
     },
  /**
   * 跳转忘记密码
   */
  goToPage1: function(){
    wx.navigateTo({
      url: '/pages/newpsw/newpsw',
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})