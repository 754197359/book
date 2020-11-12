// pages/register/register.js
const wxRequest = require('../../utils/wxRequest.js');
const regedit = require('../../config.js').regedit; //注册验证码
Page({

  /**
   * 页面的初始数据
   */
  data: {
    next:"<下一步",
    mima:"",
    mima1:"",
    name:"",
    idcard:"",
    phone:""
  },
  //密码
  onChange(event) {
    this.setData({
      mima: event.detail
    })
    // console.log(this.data.mima)
  },
  //确认密码
  onChange1(event) {
    this.setData({
      mima1: event.detail
    })
    // console.log(this.data.mima1)
  },
  onChange2(event) {
    this.setData({
      name: event.detail
    })
    // console.log(this.data.mima1)
  },
  onChange3(event) {
    this.setData({
      idcard: event.detail
    })
    // console.log(this.data.mima1)
  },
  goToPage2:function(){
    if (this.data.mima == '') {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return false
    }
    if (this.data.mima1 == '') {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return false
    }
    if (this.data.idcard == '') {
      wx.showToast({
        title: '请输入身份证号！',
        icon: 'none'
      })
      return false
    }
    if (this.data.name == '') {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'none'
      })
      return false
    }
    let passReq = /^.{6,18}$/;
    if (!passReq.test(this.data.mima)) {
      wx.showToast({
        title: '请输入输入6-18位密码！',
        icon: 'none',
      })
      return false
    }
    if (!passReq.test(this.data.mima1)) {
      wx.showToast({
        title: '请输入输入6-18位密码！',
        icon: 'none',
      })
      return false
    }
    if(this.data.mima !=this.data.mima1){
      wx.showToast({
        title: '两次密码输入不相同！',
        icon: 'none',
      })
      return false
    }
    
    let cardReq = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!cardReq.test(this.data.idcard)) {
      wx.showToast({
        title: '请输入正确的身份证号！',
        icon: 'none',
      })
      return false
    }
    this.Get({
      "idCard":this.data.idcard,
      "name":this.data.name,
      "password":this.data.mima,
      "phone":this.data.phone
    })
  },

  Get(data){
    wxRequest.postJson(`${regedit}`,data).then(res => {
      console.log(res.data.isSuccess)
      if(res.code ==200){
        if(res.data.isSuccess =="Y"){
          // wx.showToast({
          //   title: ' 注册成功',
          //   icon: 'none',
          //   duration: 8000
          // })
          // wx.showModal({
          //   content: '注册成功',
          //   confirmColor:'#EF7B3C',
          //   confirmText:"确定",
          //   showCancel:false,
          //   duration: 3000
          // })
          wx.showToast({
            title: '注册成功！',
            icon: 'none',
          })
          wx.navigateTo({
            url: '/pages/login1/login1',
          })
        }else{
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: options.phone
    });
    console.log(this.data.phone)
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
		this.onLoad();
		wx.stopPullDownRefresh();
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