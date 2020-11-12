// pages/mine/mine.js
var app = getApp();
const logout = require('../../config.js').logout; //验证码快速登陆
const wxRequest = require('../../utils/wxRequest.js');
const getVipInfo = require('../../config.js').getVipInfo; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    isBranchVip:0,
    show:"true",
    isRealname:"",
    icon:"../../images/weidenglu.png",
    score:"...",
    username: '',
    userphone: '',
    usercode: 0,
    id:"",
    arr:[]
  },
  //跳转编辑
  gotoredact: function () {
    wx.navigateTo({
      url: '/pages/mineredact/mineredact',
    })
  },
  //跳转个人预约
  gotoappointment: function () {
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
  },
  //跳转实名认证
  gotoappointment2: function () {
    wx.navigateTo({
      url: '/pages/autonym/autonym',
    })
  },
  //跳转分会预约
  gotoappointment1: function () {
    wx.navigateTo({
      url: '/pages/fhorder/fhorder',
    })
  },
    //跳转读书笔记
  gotoappointment3: function () {
      wx.navigateTo({
        url: '/pages/dushubiji/dushubiji',
      })
    },
  //跳转消息订阅
  gotoappointment5: function () {
		wx.showModal({
      content: '您确定要退出登录吗？',
      confirmColor:'#EF7B3C',
      cancelText:'我在想想',
      cancelColor:'#999999',
      confirmText:"确定退出",
			success: function(res) {
				if (res.confirm) {
          wxRequest.Get(`${logout}/${app.globalData.userInfo.token}`).then(res => {
            if (res.code == 200) {
                console.log(res)
                wx.removeStorage({
                    key: 'userInfo',
                });
                app.globalData.userInfo = null;

                wx.redirectTo({
                    url: '/pages/login0/login0',
                })

                wx.showToast({
                    title: "退出成功！",
                    icon: 'none',
                });
            }
        })
				} else if (res.cancel) {
				console.log('用户点击取消')
				}
			}
		})
  },
  //跳转积分打卡
  gotoappointment4: function () {
    wx.navigateTo({
      url: '/pages/integral/integral',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    console.log(wx.getStorageSync('userInfo'))
    that.setData({
      name: wx.getStorageSync('userInfo').nickname,
      isBranchVip: wx.getStorageSync('userInfo').isBranchVip,
      isRealname:wx.getStorageSync('userInfo').isRealname,
      icon:wx.getStorageSync('userInfo').icon,
      score:wx.getStorageSync('userInfo').score,
      id:wx.getStorageSync('userInfo').id,
  });
  console.log(that.data.isRealname)
  wxRequest.Get(`${getVipInfo}/${this.data.id}`).then(res => {
    console.log(res)
    if(res.code==200){
      if(res.msg=="Success."){
        this.setData({
          arr:res.data
        })
        if(res.data.isPartVip==1){
          that.setData({
            show:false
          })
        }
      }
    }
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
    this.onLoad();
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