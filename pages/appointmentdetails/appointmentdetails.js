// pages/appointmentdetails/appointmentdetails.js
var QRCode = require('../../utils/weapp-qrcode.js')
var qrcode;

const W = wx.getSystemInfoSync().windowWidth;
const rate = 750.0 / W;

// 300rpx 在6s上为 150px
const code_w = 300 / rate;
const wxRequest = require('../../utils/wxRequest.js');
const { Get } = require('../../utils/wxRequest.js');
const getReserveRecordDetail = require('../../config.js').getReserveRecordDetail; //
const cancelReserve = require('../../config.js').cancelReserve;
const deleteReserve = require('../../config.js').deleteReserve;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "李小康",
    data: "2020.08.12",
    yyh: "202008120003",
    phone: "18900201289",
    data1: "2020.08.12  10:09:23",
    data2: "2020.08.12  10:09:23",
    title: "欢迎入场！",
    color: "",
    num: 3,
    hidden: true,
    yearAndMonth: "aa",
    image: '',
    code_w: code_w,
    id: "",
    username: "",
    phone: "",
    xq: [],
    show: "", //取消预约
    show1: true, //删除
    show2: "", //跳转
    show3: true, //二维码
    show4: true, //二维码图片
    xq1: "",
    timer:'',
    loading: true,
  },
  /**取消预约 */
  button1: function () {
    wxRequest.Get(`${cancelReserve}/${this.data.id}`).then(res => {
      console.log(res)
      if (res.code == 200) {
        if (res.msg == "Success.") {
          wx.showToast({
            title: '取消成功！',
            icon: 'none',
            duration: 3000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/appointment/appointment',
            })
          }, 1000);
        }
      }
    })
  },
  goToPage2: function () {
    wxRequest.Get(`${deleteReserve}/${this.data.id}`).then(res => {
      console.log(res)
      if (res.code == 200) {
        if (res.msg == "Success.") {
          wx.showToast({
            title: '删除成功！',
            icon: 'none',
            duration: 3000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/appointment/appointment',
            })
          }, 1000);
        }
      }
    })
  },
  //取消弹框
  modalcnt: function () {
    wx.showModal({
      content: '2020.08.26可预约名额剩余10个，确定取消本次预约吗？',
      confirmColor: '#EF7B3C',
      cancelText: '我在想想',
      cancelColor: '#999999',
      confirmText: "确定取消",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //添加提醒
  actioncnt: function () {
    this.setData({
      hidden: false
    })
  },
  //保存 隐藏
  gettrue: function () {
    this.setData({
      hidden: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(options)
    console.log(options)
    console.log(options)
    that.setData({
      id: options.id,
      xq1:options.reserveDate
    });
    console.log(wx.getStorageSync('userInfo'))
    that.setData({
      username: wx.getStorageSync('userInfo').name,
      phone: wx.getStorageSync('userInfo').phone,
    });
    wxRequest.Get(`${getReserveRecordDetail}/${options.id}`).then(res => {
      console.log(res)
      if (res.code == 200) {
        if (res.data.reserveStatus == 0) {
          that.setData({
            color: "#07C570, #0EE1A1",
            show: false,
            show1: true,
            show2: true,
            show3: false,
            show4: true
          })
        } else if (res.data.reserveStatus == 1) {
          that.setData({
            color: "#43D0FF, #72E9FF",
            show: true,
            show1: true,
            show2: false,
            show3: false,
            show4: true
          })
        } else if (res.data.reserveStatus == 2) {
          that.setData({
            color: "#EF7636, #F7AC69",
            show: true,
            show1: true,
            show2: false,
            show3: false,
            show4: true
          })
        } else if (res.data.reserveStatus == 4) {
          that.setData({
            color: "#F7B500, #FBDA00",
            show: true,
            show1: false,
            show2: true,
            show3: true,
            show4: false
          })
        } else if (res.data.reserveStatus == 3) {
          that.setData({
            color: "#AAAAAA, #E9E9E9",
            show: true,
            show1: false,
            show2: true,
            show3: true,
            show4: false
          })
        } else if (res.data.reserveStatus == 5) {
          that.setData({
            color: "#FE6470, #FF9BA8",
            show: true,
            show1: false,
            show2: true,
            show3: true,
            show4: false
          })
        }
        that.setData({
          xq: res.data,
        })
        console.log(that.data.xq.reserveDate)
        console.log(that.data.xq1)
      
      }
    })
    console.log(that.data.id)
    qrcode = new QRCode('canvas', {
      text: wx.getStorageSync('userInfo').idCard + "&" + that.data.xq1,
      width: 275,
      height: 275,
      colorDark: "#000000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    that.setData({
    timer: setInterval(function () {
      wx.request({    
        url: 'https://dsh.ahytdata.com:4333/reserve/getReserveRecordDetail/'+options.id, //接口名称   
        header: {      
          'content-type': 'application/json' // 默认值（固定，我开发过程中还没有遇到需要修改header的）   
         },   
         method:Get,  //请求方式    
         data:{},  //用于存放post请求的参数   
         success(res) {     
           console.log(res.data)   //成功之后的回调
    //  wxRequest.Get(`${getReserveRecordDetail}/${options.id}`).then(res => {
        console.log(res)
        if (res.code == 200) {
          if (res.data.reserveStatus == 0) {
            that.setData({
              color: "#07C570, #0EE1A1",
              show: false,
              show1: true,
              show2: true,
              show3: false,
              show4: true
            })
          } else if (res.data.reserveStatus == 1) {
            that.setData({
              color: "#43D0FF, #72E9FF",
              show: true,
              show1: true,
              show2: false,
              show3: false,
              show4: true
            })
          } else if (res.data.reserveStatus == 2) {
            that.setData({
              color: "#EF7636, #F7AC69",
              show: true,
              show1: true,
              show2: false,
              show3: false,
              show4: true
            })
          } else if (res.data.reserveStatus == 4) {
            that.setData({
              color: "#F7B500, #FBDA00",
              show: true,
              show1: false,
              show2: true,
              show3: true,
              show4: false
            })
          } else if (res.data.reserveStatus == 3) {
            that.setData({
              color: "#AAAAAA, #E9E9E9",
              show: true,
              show1: false,
              show2: true,
              show3: true,
              show4: false
            })
          } else if (res.data.reserveStatus == 5) {
            that.setData({
              color: "#FE6470, #FF9BA8",
              show: true,
              show1: false,
              show2: true,
              show3: true,
              show4: false
            })
          }
          that.setData({
            xq: res.data,
          })
          console.log(that.data.xq.reserveDate)
          console.log(that.data.xq1)
        
        }

             } 
      })

      console.log("轮播请求1秒触发一次");
    }, 5000)
  })
  that.setData({
    loading: false,
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
    let timer = this.data.timer;
    var that = this;
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let timer = this.data.timer;
    var that = this;
    clearInterval(timer);
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