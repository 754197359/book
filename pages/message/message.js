// pages/fabu/fabu.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    todays: '',
    storeTotal: 0,
    regiFlag: false,
    regisState: '点我签到',
    data: {
      selected: [
        {
          date: '2018-5-21'
        }, {
          date: '2018-5-22'
        },{
          date: '2018-5-24'
        },{
          date: '2018-5-25'
        }
      ]
    },
    actions: [{
        name: ' 选项 ',
      },
      {
        name: ' 选项 '
      },
      {
        name: ' 选项 ',
      },
    ],
  },
  /**
   * 预约消息通知
   */
  orderMess: function () {
    debugger
    this.setData({
      show1: true
    })
  },
  //场馆选择
  onClose1() {
    this.setData({
      show1: false
    });
  },

  onSelect1(event) {
    console.log(event.detail);
    this.setData({
      venue:event.detail.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
    * 日历是否被打开
    */
  bindselect(e) {
    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let y = e.detail.year;
    let m = e.detail.month;
    let d = e.detail.date;
    let tod = y + '-' + m + '-' + d
    this.setData({
      todays: tod
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let userId = 1
    let that = this
    app.api.queryScore(1, function (res) {
      if (res != null) {
        that.setData({
          storeTotal: res.total
        });
        res.list.forEach(element => {
          if(element.addTime == that.data.todays){
            that.setData({
              regiFlag: true,
              regisState: '已签到'
            });
          }
        });
      }
    });
  },
    registerFun: function () {
      let para = {
        "vipId":'',
        "score":5
      }
      if(this.data.regisState == '点我签到'){
        
        //let userId = app.globalData.loginInfo;
        let userId = 1
        let that = this
        app.api.queryInvoice(userId,5, function (res) {
          debugger
          if (res != null) {
            that.setData({
              regisState: '已签到'
            });
          }
          app.api.queryScore(1, function (res) {
            if (res != null) {
              that.setData({
                storeTotal: res.total
              });
            }
          });
        });
      }else{
        that.setData({
          regiFlag: true
        });
      }
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