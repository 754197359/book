// pages/newpsw/newpsw.js
const wxRequest = require('../../utils/wxRequest.js');
const getIdentCodeForRegedit = require('../../config.js').getIdentCodeForRegedit; //注册验证码
const checkPhoneForRegedit = require('../../config.js').checkPhoneForRegedit; // 注册检验手机号是否已经注册checkIdentCode
const checkIdentCode = require('../../config.js').checkIdentCode; // 注册检验验证码
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取验证码
    sendTime: '获取验证码',
    snsMsgWait: 60,
    sendColor: '#EF783A',
    code: '',
    username: "",
    value: '',
    smsFlag:"",
  },
  onChange(event) {
    this.setData({
      value: event.detail
    })
    // event.detail 为当前输入的值
    // console.log(event.detail);
  },


  // 获取验证码
  sendCode: function () {
    var that = this;
    if (that.data.value == '') {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none'
      })
      return false
    }
    if (!(/^1[3456789]\d{9}$/.test(that.data.value))) {
      // wx.showModal({
      //   content: '请输入正确的手机号！',
      //   confirmColor:'#EF7B3C',
      //   confirmText:"确定",
      //   showCancel:false,
      // })
      wx.showToast({
        title: '请输入正确的手机号！',
        icon: 'none'
      })
      return false
    } else {
      //注册检验手机号是否已经注册
      wxRequest.Get(`${checkPhoneForRegedit}/${this.data.value}`).then(res => {
        console.log(res)
        if (res.code == 200) {
          if (res.data.isRegedited == "Y") {
            // wx.showToast({
            //   title: '该手机已经注册请直接登录',
            //   icon: 'none',
            //   duration: 3000
            // })
            // wx.reLaunch({
            //   url: '/pages/login1/login1',
            // })
            wxRequest.Get(`${getIdentCodeForRegedit}/${this.data.value}`).then(res => {
              console.log(res)
              if (res.code == 200) {
                if (res.msg == "Success.") {
                  wx.showToast({
                    title: '验证码已发送',
                    icon: 'none',
                    duration: 3000
                  })
                } else {
                  wx.showToast({
                    title: '验证码发送失败！',
                    icon: 'none',
                    duration: 3000
                  })
                }
              }
            });
            // return false
          }
        }
      })
      //

    }
    // 60秒后重新获取验证码
    var inter = setInterval(function () {
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
  //获取验证码
  setPassInput: function (e) {
    this.setData({
      code: e.detail.value
    });
    console.log(this.data.code)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 下一步设置密码
   */
  nextpsw: function () {
    if (!(/^1[3456789]\d{9}$/.test(this.data.value))) {
      // wx.showModal({
      //   content: '手机号格式有误！',
      //   confirmColor:'#EF7B3C',
      //   confirmText:"确定",
      //   showCancel:false,
      // })
      wx.showToast({
        title: '手机号格式有误！',
        icon: 'none'
      })
      return false
    }else if(!(/\d{6}$/.test(this.data.code))){
      // wx.showModal({
      //   content: '验证码格式有误！',
      //   confirmColor:'#EF7B3C',
      //   confirmText:"确定",
      //   showCancel:false,
      // })
      wx.showToast({
        title: '验证码格式有误！',
        icon: 'none'
      })
      return false
    }else{
    wxRequest.Get(`${checkIdentCode}/${this.data.value}/${this.data.code}`).then(res => {
      console.log(res)
      if (res.code == 200) {
        if (res.data.isSuccess == "Y") {
          wx.navigateTo({
            url: '/pages/newpsw1/newpsw1?phone='+this.data.value,
          })
        } else {
          wx.showToast({
            title: res.data.errMsg,
            icon: 'none',
            duration: 8000
          })
          return false
        }
      }
    })
  }
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