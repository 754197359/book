// pages/order/order.js
const wxRequest = require('../../utils/wxRequest.js');
const getReserveRemain = require('../../config.js').getReserveRemain; //查询空闲名额
const addReserve = require('../../config.js').addReserve; //新增预约接口
const getReserveLibraryList = require('../../config.js').getReserveLibraryList;
const checkReserveDate = require('../../config.js').checkReserveDate; 
const checkReserveLibrary = require('../../config.js').checkReserveLibrary;
const getVipInfo = require('../../config.js').getVipInfo; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    date: '',
    show: false,
    show1: false,
    show2: false,
    actions: [{
        name: ' 选项 ',
      },
    ],
    venue:0,
    remainNum:0,
    reservedNum:0,
    vipId:"",
    reservePhone:"",
    name:"",
    value1:" ",
    value2:"",
    value3:"",
    libraryId:"",
    isPartVip:0,
    value4:"",
    show3:"",
    venue1:"上午",
    actions1: [{
      name: '上午',
    },
    {
      name: '下午',
    },
  ],
  reserveHalf:"0",
  smsFlag:false,
  color:"#EF7B3B ,#F1963F",
  date1:"",
  date2:"",
  minDate: new Date(2020, 9, 26).getTime(),
  maxDate: new Date(2020, 10, 26).getTime(),
  },
    //获取手机
    onChange5(event) {
      this.setData({
        reservePhone: event.detail
      })
      console.log(this.data.reservePhone)
    },
  //获取活动内容
    onChange9(event) {
    this.setData({
      value4: event.detail
    })
    console.log(this.data.value4)
  },
    //获取活动人数 
    onChange1(event) {
      this.setData({
        value2: event.detail
      })
      console.log(this.data.value2)
    },
        //获取分会名称 
        onChange2(event) {
          this.setData({
            value3: event.detail
          })
          console.log(this.data.value3)
        },
  //分会预约
  goToPage3:function(){
    let phoneReq = /^[1][0-9]{10}$/;
    if (!phoneReq.test(this.data.reservePhone)) {
      wx.showToast({
        title: '请输入正确的手机号！',
        icon: 'none',
      })
      return false
    }
    if (this.data.value3 == '' || this.data.value3 == null) {
      wx.showToast({
        title: '请输入分会名称！',
        icon: 'none',
      })
      return false
    }
    if (this.data.venue ==0) {
      wx.showToast({
        title: '请选择场馆！',
        icon: 'none',
      })
      return false
    }
    if (this.data.value2 == '' || this.data.value2 == null) {
      wx.showToast({
        title: '请输入参与人数！',
        icon: 'none',
      })
      return false
    }
    console.log(this.data.venue)
    if (this.data.value4 == '' || this.data.value4 == null) {
      wx.showToast({
        title: '请输入活动内容！',
        icon: 'none',
      })
      return false
    }

    // wxRequest.Get(`${checkReserveDate}/${this.data.vipId}/${this.data.date}`).then(res => {
      // console.log(res)
      // if(res.code==200){
        // if(res.data.isReserve=="Y"){
          wxRequest.Get(`${checkReserveLibrary}/${this.data.vipId}/${this.data.value2}/${this.data.date}/${this.data.reserveHalf}/${this.data.libraryId}`).then(res1 => {
            // console.log(res)
            if(res1.code==200){
              if(res1.data.isReserve=="Y"){
                this.Get({
                  "reserveType":1,
                  "reserveDate":this.data.date,
                  "reservePhone":this.data.reservePhone,
                  "vipId":this.data.vipId,
                  "meetingName":this.data.value3,
                  "meetingContent":this.data.value4,
                  "meetingNumber":this.data.value2,
                  "libraryId":this.data.libraryId,
                  "reserveHalf":this.data.reserveHalf
                })
              }else{
                wx.showToast({
                  title: res1.data.errMsg,
                  icon:'none',
                })
              }
            }
          })

        // }else{
        //   wx.showToast({
        //     title: res.data.errMsg,
        //     icon:'none',
        //   })
        // }
      // }
    // })
  },
  getshow1: function () {
    this.setData({
      show1: true
    })
    wxRequest.Get(`${getReserveLibraryList}/${this.data.date}/${this.data.reserveHalf}`).then(res => {
      // console.log(res)
      if(res.code==200){
        this.setData({
          actions:res.data
        })
      }
    })
  },
//时段
  getshow2: function () {
    this.setData({
      show2: true
    })
  },
  //场馆选择
  onClose1() {
    this.setData({
      show1: false
    });
  },

    //时段
    onClose2() {
      this.setData({
        show2: false
      });
    },

    //时段
    onSelect2(event) {
      console.log(event.detail.name);
      this.setData({
        venue1:event.detail.name,
        
      })
      if(event.detail.name=="上午"){
        this.setData({
          reserveHalf:0
        })
      }else if(event.detail.name=="下午"){
        this.setData({
          reserveHalf:1
        })
      }
      console.log(this.data.reserveHalf)
    },

  onSelect1(event) {
    console.log(event.detail.name);
    this.setData({
      venue:event.detail.name,
      libraryId:event.detail.id
    })
  },
  //日历 
  onDisplay() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getYear()+1900}-${date.getMonth() + 1< 10 ?"0"+(date.getMonth() + 1):date.getMonth() + 1}-${date.getDate()< 10? "0"+date.getDate():date.getDate()}`;
  },
  onConfirm1(event) {
    
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
    console.log(event.detail)
    // wxRequest.Get(`${checkReserveDate}/${this.data.vipId}/${this.formatDate(event.detail)}`).then(res => {
    //   // console.log(res)
    //   if(res.code==200){
    //     if(res.data.isReserve=="N"){
    //       wx.showToast({
    //         title: res.data.errMsg,
    //         icon:'none',
    //       })
    //     }
    //   }
    // })
    // wxRequest.Get(`${getReserveRemain}/${this.data.date}`).then(res => {
    //   // console.log(res)
    //   if(res.code==200){
    //     if(res.msg=="Success."){
    //       this.setData({
    //         remainNum:res.data.remainNum,
    //         reservedNum:res.data.reservedNum,
    //       })
    //       if(res.data.remainNum==0){
    //         this.setData({
    //           smsFlag:true,
    //           color:"#E5E5E5,#E5E5E5"
    //         })
    //       }
    //     }
    //   }
    // })
  },
  onConfirm(event) {
    
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
    // wxRequest.Get(`${checkReserveDate}/${this.data.vipId}/${this.formatDate(event.detail)}`).then(res => {
    //   // console.log(res)
    //   if(res.code==200){
    //     if(res.data.isReserve=="N"){
    //       wx.showToast({
    //         title: res.data.errMsg,
    //         icon:'none',
    //       })
    //     }
    //   }
    // })
    wxRequest.Get(`${getReserveRemain}/${this.data.date}`).then(res => {
      // console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          this.setData({
            remainNum:res.data.remainNum,
            reservedNum:res.data.reservedNum,
          })
          
          if(res.data.remainNum==0){
            this.setData({
              smsFlag:true,
              color:"#E5E5E5,#E5E5E5"
            })
          }else{
            this.setData({
              smsFlag:false,
              color:"#EF7B3B ,#F1963F"
            })
          }
          
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.value1)
        //获取当前日期
    
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
//获取年份  
var Y =date.getFullYear();
//获取月份  
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日日期 
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
// console.log("当前时间：" + Y + '年'  + M+ '月' + D+ '日' ); 
    this.setData({
      date:Y+"-"+M+"-"+D,

      minDate: new Date(Y, M-1, D).getTime(),
      maxDate:new Date(Y, M, D).getTime(),
    })
    // console.log(this.data.date)
    console.log(this.data.remainNum)

    wxRequest.Get(`${getReserveRemain}/${this.data.date}`).then(res => {
      // console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          this.setData({
            remainNum:res.data.remainNum,
            reservedNum:res.data.reservedNum,
          })
          if(res.data.remainNum==0){
            this.setData({
              smsFlag:true,
              color:"#E5E5E5,#E5E5E5"
            })
          }
        }
      }
    })
    console.log(wx.getStorageSync('userInfo'))
    this.setData({
      reservePhone: wx.getStorageSync('userInfo').phone,
      vipId: wx.getStorageSync('userInfo').id,
      name:wx.getStorageSync('userInfo').name,
      isPartVip:wx.getStorageSync('userInfo').isPartVip,
    });
    wxRequest.Get(`${getVipInfo}/${this.data.vipId}`).then(res => {
      console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          // this.setData({
          //   arr:res.data
          // })
          if(res.data.isPartVip==0){
            this.setData({
              show3:true
            })
          }else if(res.data.isPartVip==1){
            this.setData({
              show3:false
            })
          }
        }
      }
    })
  


  },
  goToPage2:function(){
    let phoneReq = /^[1][0-9]{10}$/;
    if (!phoneReq.test(this.data.reservePhone)) {
      wx.showToast({
        title: '请输入正确的手机号！',
        icon: 'none',
      })
      return false
    }
    // wxRequest.Get(`${checkReserveDate}/${this.data.vipId}/${this.data.date}`).then(res => {
    //   // console.log(res)
    //   if(res.code==200){
    //     if(res.data.isReserve=="Y"){
          this.Get({
            "reserveType":0,
            "reserveDate":this.data.date,
            "reservePhone":this.data.reservePhone,
            "vipId":this.data.vipId
          })
    //     }else{
    //       wx.showToast({
    //         title: res.data.errMsg,
    //         icon:'none',
    //       })
    //     }
    //   }
    // })

  },
  Get(data) {
    let that =this;
    wxRequest.postJson(`${addReserve}`, data).then(res => {
      // console.log(res.data.msg)
      if (res.code == 200) {
        if(res.data.isReserve=="Y"){
        wx.showToast({
          title: '预约成功！',
          duration: 2000,
          icon: 'none'
        });
        console.log(res.data.reserveType==0)
        setTimeout(function () {
          if(res.data.reserveType==0){
            wx.navigateTo({
              url: '/pages/appointmentdetails/appointmentdetails?id='+res.data.reserveId+"&reserveDate="+that.data.date,
            })
          }else{
            wx.navigateTo({
              url: '/pages/orderxq/orderxq?id='+res.data.reserveId,
            })
          }
        }, 1000);
      }else{
        wx.showToast({
          title: res.data.errMsg,
          duration: 2000,
          icon: 'none'
        });
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