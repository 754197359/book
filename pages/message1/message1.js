// pages/message1/message1.js
const wxRequest = require('../../utils/wxRequest.js');
const getTbNoticeMsg = require('../../config.js').getTbNoticeMsg; //消息全部
const updateTbNoticeMsgSingle = require('../../config.js').updateTbNoticeMsgSingle; //修改一条状态
const updateTbNoticeMsgBatch = require('../../config.js').updateTbNoticeMsgBatch; //全部修改状态
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nessage:0,
    vipId:"",
    pageSize:10,
    pageNum:1,
    message:[],
    dot:false,
  },

  //清除 一条
  cleanone :function(e){
    console.log(e.currentTarget.dataset.isyy) 
    console.log(e.currentTarget.id)  
    if(e.currentTarget.dataset.isyy==1){

    }else{
    wxRequest.Get(`${updateTbNoticeMsgSingle}/${e.currentTarget.id}`).then(res => {
      console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          let i = e.currentTarget.dataset.i
          let is_hongdian =this.data.message[i].isReaded
          this.data.message[i].isReaded=1
          this.setData({
            nessage: is_hongdian == 0 ? this.data.nessage - 1 : this.data.nessage,
            message: this.data.message
          })
         
        }
      }
    })
  }
  },
  //清除所有消息
  cleanall:function(){
    wxRequest.Get(`${updateTbNoticeMsgBatch}/${this.data.vipId}`).then(res => {
      console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          // wx.showToast({
          //   title: '全部清除成功！',
          //   icon: 'none',
          //   duration: 3000
          // })
          this.setData({
            pageNum:1
          })
          this.Get(1)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vipId:wx.getStorageSync('userInfo').id,
    });
    console.log(this.data.vipId)
    this.Get(1)
  },

  Get(pageNum){
    wxRequest.Get(`${getTbNoticeMsg}/${this.data.vipId}/${pageNum}/${this.data.pageSize}`).then(res => {
      console.log(res)
      let arr = [];
      if(res.code==200){
        this.setData({
          nessage:res.data.notReadNum
        })
        if(pageNum==1){
            arr = res.data.list
        }else{
          arr = this.data.message.concat(res.data.list)
        }
        this.setData({
          message:arr
        })
        // console.log(this.data.message)
        // .map(item => {
        //   if(item.isReaded==1){
        //     item.isReaded = false
        //   }else{
        //     item.isReaded = true
        //   }
        //   return item
        // })
        // console.log(this.data.nessage)
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
    this.data.pageNum += 1;
    this.Get(this.data.pageNum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})