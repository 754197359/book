// pages/shimingrenzheng1/shimingrenzheng1.js  getVipInfo
const wxRequest = require('../../utils/wxRequest.js');
const getVipInfo = require('../../config.js').getVipInfo; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    idcard1:"",
    idcard2:"",
    idCard:"",
    isRealname:0,
    icon:"",
    id:"",
    arr:[],
  },
	onBackTap: function (e) {
		wx.navigateBack({
			//返回上一页面
			delta: 1,
		});
  },
  onPageScroll: function (e) {
		console.log(e.scrollTop);
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      icon:wx.getStorageSync('userInfo').icon,
      name: wx.getStorageSync('userInfo').name,
      isRealname: wx.getStorageSync('userInfo').isRealname,
      idCard:wx.getStorageSync('userInfo').idCard,
      idcard1:(wx.getStorageSync('userInfo').idCard).slice(0, 1),
      idcard2:(wx.getStorageSync('userInfo').idCard).slice(13, 14),
      // icon:wx.getStorageSync('userInfo').icon.substring()
      id:wx.getStorageSync('userInfo').id
    });
    wxRequest.Get(`${getVipInfo}/${this.data.id}`).then(res => {
      console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          this.setData({
            arr:res.data
          })
        }
      }
    })
  },
  //跳转重新认证 
  goToPage2:function(){
    wx.navigateTo({
      url: '/pages/autonym/autonym',
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