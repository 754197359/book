// pages/newpsw1/newpsw1.js
const wxRequest = require('../../utils/wxRequest.js');
const resetPassword = require('../../config.js').resetPassword; //重置密码
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mima:"",
    phone:"",
    mima1:"",
  },
  onChange(event) {
    this.setData({
      mima: event.detail
    })
    // console.log(event.detail);
  },
  onChange1(event) {
    this.setData({
      mima1: event.detail
    })
    // console.log(event.detail);
  },
  goToPage2:function(){

    if (this.data.mima1=="") {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return false
    }
    if (this.data.mima=="") {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return false
    }
    if (!(/.{6,16}/.test(this.data.mima))) {
      wx.showToast({
        title: '密码格式输入有误！',
        icon: 'none'
      })
      return false
    }
    if (!(/.{6,16}/.test(this.data.mima1))) {
      wx.showToast({
        title: '密码格式输入有误！',
        icon: 'none'
      })
      return false
    }
    if (this.data.mima!=this.data.mima1) {
      wx.showToast({
        title: '两次密码输入不一致！',
        icon: 'none'
      })
      return false
    }
    wxRequest.Get(`${resetPassword}/${this.data.phone}/${this.data.mima}`).then(res => {
      console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          // wx.showModal({
          //   content: '修改成功',
          //   confirmColor:'#EF7B3C',
          //   confirmText:"确定",
          //   showCancel:false,
          //   duration: 3000
          // })
          wx.showToast({
            title: '修改成功！',
            icon: 'none'
          })
          wx.redirectTo({
            url: '/pages/login1/login1',
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
      phone: options.phone,
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