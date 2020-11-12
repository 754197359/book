// pages/dushubijixq/dushubijixq.js
const wxRequest = require('../../utils/wxRequest.js');
const getNoteDetail = require('../../config.js').getNoteDetail; //读书笔记列表
const removeNote = require('../../config.js').removeNote;//删除读书笔记
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actions: [
      {
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
      },
    ],
    show1: false,
    id:"",
    bj:[],
  },
  goToPage1:function(e){
    console.log(e.currentTarget.dataset.id)
    wxRequest.Delete(`${removeNote}/${this.data.id}`).then(res => {
      console.log(res)
        if(res.code==200){
          wx.showToast({
            title: '已删除',
            icon: 'none',
            duration: 3000
          })
          if(e.currentTarget.dataset.id==0){
            wx.navigateTo({
              url: '/pages/caogao/caogao',
            })
          }else{
          wx.navigateTo({
            url: '/pages/dushubiji/dushubiji',
          })
        }
        }
      })
  },
  /**删除返回并刷新 */
  Get6(){
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    beforePage.loadData();
    wx.navigateBack({
      delta: 1,
    })
  },
  goToPage2:function(){
    wx.navigateTo({
      url: '/pages/fabu/fabu?id='+this.data.id,
    })
  },
  getshow1: function () {
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
    this.setData({
      id: options.id,
  });
  wxRequest.Get(`${getNoteDetail}/${options.id}`).then(res => {
    console.log(res)
    if(res.code==200){
      this.setData({
        bj:res.data
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