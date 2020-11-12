// pages/appointment/appointment.js
const wxRequest = require('../../utils/wxRequest.js');
const getReserveRecordList = require('../../config.js').getReserveRecordList; //账号密码登录
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    time:"2020.08.20",
    vipId:"",
    pageNum:1,
    pageSize:10,
    yuyue:[],
    policy:0,
  },
  onChange(event) {
    this.setData({
      pageNum:1
    })
    if (event.detail.name == 1) {
      this.Get({
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize,
        "reserveStatus":1,
        "reserveType": 0,
        "vipId": this.data.vipId
      })
    }else if (event.detail.name == 2) {
      this.Get({
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize,
        "reserveStatus":2,
        "reserveType": 0,
        "vipId": this.data.vipId
      })
    }else  if (event.detail.name == 3) {
      this.Get({
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize,
        "reserveStatus":3,
        "reserveType": 0,
        "vipId": this.data.vipId
      })
    }else if(event.detail.name == 0){
      this.Get({
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize,
        "reserveStatus":0,
        "reserveType": 0,
        "vipId": this.data.vipId
      })
    }
    this.setData({
      policy: event.detail.name,
    });
  },
  //跳转详情
    gotofhxq1:function(e){
      console.log(e)
      wx.navigateTo({
          url: '/pages/appointmentdetails/appointmentdetails?id=' + e.currentTarget.id+"&reserveDate="+e.currentTarget.dataset.reservedate,
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vipId: wx.getStorageSync('userInfo').id,
    });
    this.Get({
      "pageNum": this.data.pageNum,
      "pageSize": this.data.pageSize,
      "reserveStatus":0,
      "reserveType": 0,
      "vipId": this.data.vipId
    })
  },
  //个人预约
  Get(data) {
    wxRequest.postJson(`${getReserveRecordList}`, data).then(res => {
      // console.log(res.data.msg)
      let arr = [];
      if(res.code==200){
        if(data.pageNum==1){
          arr = res.data.list
        }else{
          arr = this.data.yuyue.concat(res.data.list)
        }
        this.setData({
          yuyue:arr
        })
        console.log(this.data.yuyue)
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
    this.onLoad();
		wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.pageNum += 1;
    if (this.data.policy == 1) {
      this.Get({
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize,
        "reserveStatus":1,
        "reserveType": 0,
        "vipId": this.data.vipId
      })
    } else if(this.data.policy == 2){
      this.Get({
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize,
        "reserveStatus":2,
        "reserveType": 0,
        "vipId": this.data.vipId
      })
    }else if(this.data.policy == 3){
      this.Get({
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize,
        "reserveStatus":3,
        "reserveType": 0,
        "vipId": this.data.vipId
      })
    }else if(this.data.policy == 0){
      this.Get({
        "pageNum": this.data.pageNum,
        "pageSize": this.data.pageSize,
        "reserveStatus":0,
        "reserveType": 0,
        "vipId": this.data.vipId
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})