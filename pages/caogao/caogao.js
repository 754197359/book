// pages/caogao/caogao.js
const wxRequest = require('../../utils/wxRequest.js');
const getNotes = require('../../config.js').getNotes;//查询读书笔记列表
const removeNote = require('../../config.js').removeNote;//删除读书笔记
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1:"",
    show:"",
    active:0,
    time:"2020.08.07",
    shenhe:"未通过",
    pageNum:1,
    pageSize:10,
    news:[],
    vipId:"",
  },
  gotobj:function(e){
    this.setData({
      id:e.currentTarget.dataset.id
    })
     console.log(this.data.id)
    wx.navigateTo({
      url: '/pages/fabu/fabu?id='+this.data.id,
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      vipId: wx.getStorageSync('userInfo').id,
    });
    this.Get(1)
  },
  Get(pageNum){
        //读书分享
        wxRequest.Get(`${getNotes}/${this.data.vipId}/${0}/${pageNum}/${this.data.pageSize}`).then(res => {
          console.log(res.data.list)
          let arr = [];
          if(res.data.total ==0){
            this.setData({
              show:true,
              show1:false
            })
          }else{
            this.setData({
              show:false,
              show1:true
            })
          }
          if(res.code==200){
            if(pageNum==1){
                arr = res.data.list
            }else{
              arr = this.data.news.concat(res.data.list)
            }
            this.setData({
              news:arr
            })
            // console.log(this.data.news)
          }
        })
      },
      delete:function(e){
        let that = this;
        wx.showModal({
          content: '你确定要删除这条笔记吗？',
          confirmColor:'#EF7B3C',
          cancelText:'取消',
          cancelColor:'#999999',
          confirmText:"确定",
          success: function(res) {
            if (res.confirm) {
              that.Get5(e.currentTarget.dataset.id);
            } else if (res.cancel) {
            console.log('用户点击取消')
            }
          }
        })
       },
/**删除 */
  Get5(id){
    wxRequest.Delete(`${removeNote}/${id}`).then(res => {
      console.log(res)
        if(res.code==200){
          wx.showToast({
            title: '已删除',
            icon: 'none',
            duration: 3000
          })
          this.Get(1)
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
    this.data.pageNum +=1;
    this.Get(this.data.pageNum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})