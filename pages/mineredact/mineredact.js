// pages/mineredact/mineredact.js
const wxRequest = require('../../utils/wxRequest.js');
const update = require('../../config.js').update; //更新个人信息
const upload = require('../../config.js').upload; //上传图片
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    name: "",
    id: "",
    // 切换头像  
    showModal: false,
    head: "../../images/weidenglu.png",
    icon:"",
  },
  // 点击换手机相册或者电脑本地图片    
  headimage: function () {
    var _this = this;
    wx.chooseImage({
      
      count: 1, // 默认9      
      sizeType: ['original', 'compressed'],
      // 指定是原图还是压缩图，默认两个都有      
      sourceType: ['album', 'camera'],
      // 指定来源是相册还是相机，默认两个都有    
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        // 返回选定照片的本地文件路径tempFilePath可以作为img标签的src属性显示图片 
        //然后请求接口把图片传给后端存到服务器即可 
        // console.log(res) 
        // wxRequest.postJson(`${upload}`,`${res.tempFilePaths[0]}`).then(res => {
        //   console.log(res.data)
        // }),
        // wx.chooseImage({
        //   success(res){
        //     const tempFilePaths = res.tempFilePaths
        //     wx.uploadFile({
        //       filePath: tempFilePaths[0],
        //       name: 'file',
        //       url: "http://121.89.167.74:8000/comm/upload",
        //       formData:{
        //         'user':'test'
        //       },
        //       success(res){
        //         console.log(res)
        //         const data =res.data
        //       }
        //     })
        //   }
        // })
        // console.log(tempFilePaths[0])
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: 'https://dsh.ahytdata.com:4333/comm/upload',
          success:(res) =>{
            console.log(res.data)
            // console.log(res.data.substring(37, 73))
            _this.setData({
              icon:res.data
            })
            console.log(_this.data.icon)
          }
        })

        _this.setData({
          head: res.tempFilePaths,
        })
        console.log(_this.data.head)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(wx.getStorageSync('userInfo'))
    let geticon =wx.getStorageSync('userInfo').icon
    that.setData({
      name: wx.getStorageSync('userInfo').nickname,
      id: wx.getStorageSync('userInfo').id,
      head:wx.getStorageSync('userInfo').icon,
      icon:wx.getStorageSync('userInfo').icon==null ? null:geticon.slice(30),
      // icon:wx.getStorageSync('userInfo').icon.substring()
    });
    // console.log(that.data.icon)
  },
  onChange(event) {
    this.setData({
      name: event.detail
    })
    console.log(event.detail);
  },
  //**保存修改信息 */
  goToPage2: function () {
    console.log(this.data)

    this.Get({
      "icon":this.data.icon,
      "id": this.data.id,
      "nickname": this.data.name
    })
  let userInfo=  wx.getStorageSync("userInfo");
  userInfo.nickname=this.data.name
  userInfo.icon=this.data.head
  wx.setStorageSync("userInfo", userInfo);
    // wx.getStorageSync('userInfo').nickname
    // wx.setStorageSync(('userInfo').nickname, this.data.name);
    // wx.setStorageSync(('userInfo').icon, "http://121.89.167.74:80/"+this.data.icon);
    wx.reLaunch({
      url: '/pages/mine/mine',
    })
  },

  Get(data) {
    wxRequest.postJson(`${update}`, data).then(res => {
      // console.log(res.data.msg)
      if (res.code == 200) {
        wx.showToast({
          title: '修改成功！',
          duration: 2000,
          icon: 'none'
        });
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