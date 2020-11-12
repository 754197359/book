// pages/orderxq/orderxq.js
const wxRequest = require('../../utils/wxRequest.js');
const getReserveRecordDetail = require('../../config.js').getReserveRecordDetail; //
const cancelReserve = require('../../config.js').cancelReserve;
const deleteReserve = require('../../config.js').deleteReserve;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:3,
    hidden:true,
    yearAndMonth:"aa",
    id:"",
    xq:[],
    color:"",
    show:true,
    show1:true,
  },
  /**取消预约 */
  button1:function(){
    wxRequest.Get(`${cancelReserve}/${this.data.id}`).then(res => {
      console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          wx.showToast({
            title: '取消成功！',
            icon: 'none',
            duration: 3000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/fhorder/fhorder',
            })
          }, 1000);
        }
      }
    })
  },
  goToPage2:function(){
    wxRequest.Get(`${deleteReserve}/${this.data.id}`).then(res => {
      console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          wx.showToast({
            title: '删除成功！',
            icon: 'none',
            duration: 3000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/fhorder/fhorder',
            })
          }, 1000);
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
  });
  wxRequest.Get(`${getReserveRecordDetail}/${options.id}`).then(res => {
    console.log(res)
    if(res.code==200){
      if(res.data.reserveStatus==0){
        this.setData({
          color:"#07C570, #0EE1A1",
          show:false,
          show1:true
        })
      }else if(res.data.reserveStatus==4){
        this.setData({
          color:"#F7B500, #FBDA00",
          show:true,
          show1:false
        })
      }else if(res.data.reserveStatus==3){
        this.setData({
          color:"#AAAAAA, #E9E9E9",
          show:true,
          show1:false
        })
      }
      this.setData({
        xq:res.data
      })
      console.log(this.data.xq)
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