// pages/login1/login1.js
const wxRequest = require('../../utils/wxRequest.js');
const login = require('../../config.js').login; //账号密码登录
const getIdentCodeForRegedit = require('../../config.js').getIdentCodeForRegedit; //注册验证码
const checkPhoneForRegedit = require('../../config.js').checkPhoneForRegedit; // 注册检验手机号是否已经注册
const checkIdentCode = require('../../config.js').checkIdentCode; // 注册检验验证码
const loginBySMS = require('../../config.js').loginBySMS; //验证码快速登陆
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentSelectTripType: 'pinche',
    currentSelectTripType1: 'mima',
    // 密码
    pass: '',
    // 表单类型
    inputType: "password",
    inputType1: "true",
    // 是否显示密码
    show_pass: false,
    show: false,
    show1: true,
    //手机验证码登录
    show2: false,
    show3: true,
    show4: true,
    show5: false,
    show6: false,
    show7: false,
    show8: true,
    show9: true,
    //获取验证码
    sendTime: '获取验证码',
    snsMsgWait: 60,
    sendColor: '#EF783A',
    // 登录
    phone: "",
    mima: "",
    //注册
    code: '',
    username: "",
    value: '',
    code1: "",
    defaultType: true,
    passwordType: true,
    height: "",
    width: "",
    smsFlag:"",
    smsFlag1:"",
    sendTime1:"获取验证码",
  },
  onBackTap: function (e) {
    wx.navigateBack({
      //返回上一页面
      delta: 1,
    });
  },
  onPageScroll: function (e) {
    // console.log(e.scrollTop);
    var scrolltop = e.scrollTop;
    if (scrolltop >= 100) {
      this.setData({
        opacity: 1,
      });
    } else {
      this.setData({
        opacity: 0,
      });
    }
  },
  /**
   * 登录获取验证码
   */
  /**
   * 点击显示隐藏密码
   */
  seeTap: function () {
    // var that = this;
    // that.setData({
    //   // 切换图标
    //   show_pass: !that.data.show_pass,
    //   // 切换表单type属性
    //   inputType1: that.data.inputType1 == 'true' ? 'false' : 'true',
    // })
    // console.log(that.data.inputType1)
    // if(this.data.inputType1=="true"){
    //   show_pass: !that.data.show_pass,
    //  this.setData({
    //   inputType1:false
    //  })
    // }else{
    //   this.setData({
    //     inputType1:true
    //    })
    // }
    this.data.defaultType = !this.data.defaultType
    this.data.passwordType = !this.data.passwordType
    this.setData({
      defaultType: this.data.defaultType,
      passwordType: this.data.passwordType
    })
  },
  /**
   * 设置密码表单事件
   */
  setPassInput: function (e) {
    var that = this;
    // 存储输入的密码
    that.setData({
      pass: e.detail.value,
    })
  },
  selectedPinche2: function (e) {
    // console.log(2)
    this.setData({
      currentSelectTripType1: e.currentTarget.dataset.id,
      show2: false,
      show3: true,
      show4: true,
      show5: false,
      show9: true,
      show7: false,
    })
    // console.log(this.data.currentSelectTripType1)
  },
  selectedPinche1: function (e) {
    // console.log(1)
    this.setData({
      currentSelectTripType1: e.currentTarget.dataset.id,
      show2: true,
      show3: false,
      show4: false,
      show5: true,
      show9: false,
      show7: true,
    })
    // console.log(this.data.currentSelectTripType1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })
    console.log(this.data.height)
    console.log(this.data.width)
  },
  //快速登录切换选中状态


  // 更新data 切换选中状态
  selectedPinche: function (e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id,
      show: false,
      show1: true,
      show3: true,
      show2: false,
      show4:true,
      show5:false,
      show6: false,
      show7: false,
      show8: true,
      show9: true,
    })
    // console.log(this.data.currentSelectTripType)
  },
  selectedBaoche: function (e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id,
      show1: false,
      show: true,
      show3: true,
      show2: true,
      show4:true,
      show5:true,
      show6: true,
      show7: true,
      show8: false,
      show9: true,
    })
    // console.log(this.data.currentSelectTripType)
  },
  // 获取验证码
  sendCode: function (e) {
    var that = this;
    that.setData({
      code: e.detail.value
    });
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none'
      })
      return false
    }
    // console.log(that.data.code)
    if (!(/^1[3456789]\d{9}$/.test(that.data.phone))) {
      // wx.showModal({
      //   content: '手机号格式输入有误！',
      //   confirmColor:'#EF7B3C',
      //   confirmText:"确定",
      //   showCancel:false,
      //   duration: 3000
      // })
      wx.showToast({
        title: '手机号格式输入有误！',
        icon: 'none',
      })
      return false
    } else {
      // if (this.data.sendTime == "获取验证码") {
        //注册检验手机号是否已经注册
        console.log(this.data.sendTime)
        wxRequest.Get(`${checkPhoneForRegedit}/${this.data.phone}`).then(res => {
          // console.log(res)
          if (res.code == 200) {
            if (res.data.isRegedited == "Y") {
              wx.showToast({
                title: '该手机已经注册请直接登录',
                icon: 'none',
              })
              return false
            } else {
              wxRequest.Get(`${getIdentCodeForRegedit}/${this.data.phone}`).then(res => {
                // console.log(res)
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
            }
          }
        })
        //
      // }
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
      console.log(this.data.smsFlag)
    }.bind(this), 1000);

  },

  // 获取验证码
  sendCode1: function () {
    var that = this;
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none'
      })
      return false
    }
    if (!(/^1[3456789]\d{9}$/.test(that.data.phone))) {
      // wx.showToast({
      //   title: '请输入正确的手机号！',
      //   duration: 2000,
      //   icon: 'none'
      // });
      wx.showToast({
        title: '请输入正确的手机号！',
        icon: 'none'
      })
      return false
    } else {
      //检验手机号是否已经注册
      wxRequest.Get(`${checkPhoneForRegedit}/${this.data.phone}`).then(res => {
        // console.log(res)
        if (res.code == 200) {
          if (res.data.isRegedited == "Y") {
            // wx.showToast({
            //   title: '该手机已经注册请直接登录',
            //   icon: 'none',
            //   duration: 8000
            // })
            // wx.reLaunch({
            //   url: '/pages/login1/login1',
            // })
            // return false
            wxRequest.Get(`${getIdentCodeForRegedit}/${this.data.phone}`).then(res => {
              // console.log(res)
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
          }
        }
      })
      //

    }

    // 60秒后重新获取验证码
    var inter = setInterval(function () {
      this.setData({
        smsFlag1: true,
        sendColor: '#cccccc',
        sendTime1: this.data.snsMsgWait + 's后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#363636',
          sendTime1: '获取验证码',
          snsMsgWait: 60,
          smsFlag1: false
        });
      }
    }.bind(this), 1000);
  },
  //获取验证码
  setPassInput: function (e) {
    this.setData({
      code: e.detail.value
    });
    // console.log(this.data.code)
  },
  /**
   * 获取登陆时验证码
   */
  setPassInput1: function (e) {
    this.setData({
      code1: e.detail.value
    });
    // console.log(this.data.code1)
  },
  /**
   * 验证码快速登陆
   */
  goToPage3: function () {
    // console.log(this.data.code1)
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none'
      })
      return false
    }
    if (this.data.code == '') {
      wx.showToast({
        title: '请输入验证码！',
        icon: 'none'
      })
      return false
    }
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      // wx.showToast({
      //   title: '手机号格式有误！',
      //   duration: 2000,
      //   icon: 'none'
      // });
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
    } else if (!(/\d{6}$/.test(this.data.code))) {
      // console.log(this.data.code1)
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
    }
    wxRequest.Get(`${loginBySMS}/${this.data.phone}/${this.data.code}`).then(res => {
      // console.log(res)
      if (res.code == 200) {

        wx.showToast({
          title: '登录成功！',
          icon: 'none',
          duration: 3000
        })
        // console.log(res.data)
        // console.log(app.globalData.userInfo)
        // console.log(99)
        //判断是否微信授权登录，未登录储存信息
        if (app.globalData.userInfo == null) {
          // console.log(app.globalData.userInfo)
          //登录储存信息

          wx.setStorageSync('userInfo', res.data);
          //  console.log(wx.getStorageSync('userInfo'))
          app.globalData.userInfo = res.data;
        }
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/shouye/shouye',
          })
        }, 1000);

      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  /**
   * 下一步设置密码
   */
  nextpsw: function () {
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none'
      })
      return false
    }

    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      // wx.showModal({
      //   content: '手机号格式输入有误！',
      //   confirmColor:'#EF7B3C',
      //   confirmText:"确定",
      //   showCancel:false
      // })
      wx.showToast({
        title: '手机号格式输入有误！',
        icon: 'none'
      })
      return false
    }
    if (this.data.code1 == '') {
      wx.showToast({
        title: '请输入验证码！',
        icon: 'none'
      })
      return false
    }
    if (!(/\d{6}$/.test(this.data.code1))) {
      // console.log(this.data.code1)
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
    }
    wxRequest.Get(`${checkIdentCode}/${this.data.phone}/${this.data.code1}`).then(res => {
      // console.log(res)
      if (res.code == 200) {
        if (res.data.isSuccess == "Y") {
          // console.log(this.data.phone)
          wx.navigateTo({
            url: '/pages/register/register?phone=' + this.data.phone,
          })
        } else {
          wx.showToast({
            title: res.data.errMsg,
            icon: 'none',
            duration: 3000
          })
          return false
        }
      }
    })

  },
  /**
   * 跳转忘记密码
   */
  goToPage1: function () {
    wx.navigateTo({
      url: '/pages/newpsw/newpsw',
    })
  },
  //获取手机号
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
    // console.log(this.data.phone)
  },
  //获取密码
  getmima: function (e) {
    this.setData({
      mima: e.detail.value
    });
    // console.log(this.data.mima)
  },
  //账号密码登录
  goToPage2: function () {
    console.log(app.globalData.userInfo)
    if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none'
      })
      return false
    }
    if (this.data.mima == '') {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return false
    }
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {
      // wx.showModal({
      //   content: '手机号格式输入有误！',
      //   confirmColor:'#EF7B3C',
      //   confirmText:"确定",
      //   showCancel:false
      // })
      wx.showToast({
        title: '手机号格式输入有误！',
        icon: 'none'
      })
      return false
    }
    if (!(/.{6,16}/.test(this.data.mima))) {
      // wx.showModal({
      //   content: '密码格式输入有误！',
      //   confirmColor:'#EF7B3C',
      //   confirmText:"确定",
      //   showCancel:false
      // })
      wx.showToast({
        title: '密码格式输入有误！',
        icon: 'none'
      })
      return false
    }
    wxRequest.Get(`${login}/${this.data.phone}/${this.data.mima}`).then(res => {
      // console.log(res)
      if (res.code == 200) {
        wx.showToast({
          title: "登录成功！",
          icon: 'none',
          duration: 3000
        })
        //判断是否微信授权登录，未登录储存信息
        if (app.globalData.userInfo == null) {
          //登录储存信息
          wx.setStorageSync('userInfo', res.data);
          app.globalData.userInfo = res.data;
        }
        console.log(app.globalData.userInfo == null)
        console.log(app.globalData.userInfo)
        // //登录储存信息
        // wx.setStorageSync('userInfo', res.data);
        // app.globalData.userInfo = res.data;
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/shouye/shouye',
          })
        }, 1000);
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
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