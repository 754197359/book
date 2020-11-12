// pages/fabu/fabu.js
const wxRequest = require('../../utils/wxRequest.js');
const addNote = require('../../config.js').addNote; //读书笔记列表
const getNoteDetail = require('../../config.js').getNoteDetail; //读书笔记列表
const updateNote = require('../../config.js').updateNote;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1: false,
    actions: [{
        name: '已完成',
      },
      {
        name: '进行中'
      },
    ],
    ydcd:"请选择阅读程度",
    bookName:"",
    vipId:"",
    readProgress:"",
    notes:"",
    id:"",
    bj:[],
    value:"",
    value1:"",
    value2:"",
    value3:false
  },
  /**跳转草稿 */
  goToPage1:function(){
    if(this.data.bookName==""){
      wx.showToast({
        title: '请输入书名！',
        icon: 'none',
      })
      return false
    }
    if(this.data.notes==""){
      wx.showToast({
        title: '请输入读书笔记！',
        icon: 'none',
      })
      return false
    }
    if(this.data.id==null || this.data.id==undefined){
    this.Get({
      "bookName":this.data.bookName,
      "vipId":this.data.vipId,
      "readProgress":this.data.readProgress,
      "notes":this.data.notes,
      "noteStatus":0
    })
    wx.showToast({
      title: '保存成功！',
      icon: 'none',
    })
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/caogao/caogao',
      })
    }, 1000);
    // wx.navigateTo({
    //   url: '/pages/caogao/caogao',
    // })
  }else{
    this.Get1({
      "bookName":this.data.bookName,
      "vipId":this.data.vipId,
      "readProgress":this.data.readProgress,
      "notes":this.data.notes,
      "noteStatus":0,
      "id": this.data.id,
    })
    wx.showToast({
      title: '修改成功！',
      icon: 'none',
    })
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/caogao/caogao',
      })
    }, 1000);
    // wx.navigateTo({
    //   url: '/pages/caogao/caogao',
    // })
    
  }
  },
  onChange(event) {
    this.setData({
      bookName: event.detail
    })
    // event.detail 为当前输入的值
    // console.log(event.detail);
  },
  onChange1(event) {
    this.setData({
      notes: event.detail
    })
    // event.detail 为当前输入的值
    // console.log(event.detail);
  },
  goToPage2:function(){
    if(this.data.bookName==""){
      wx.showToast({
        title: '请输入书名！',
        icon: 'none',
      })
      return false
    }
    if(this.data.notes==""){
      wx.showToast({
        title: '请输入读书笔记！',
        icon: 'none',
      })
      return false
    }
    if(this.data.id==null || this.data.id==undefined){
      console.log(1)
      console.log(this.data.id)
      console.log(1)
    this.Get({
      "bookName":this.data.bookName,
      "vipId":this.data.vipId,
      "readProgress":this.data.readProgress,
      "notes":this.data.notes,
      "noteStatus":1
    })
    wx.showToast({
      title: '发布成功！',
      icon: 'none',
    })
  setTimeout(function () {
    wx.navigateTo({
      url: '/pages/dushubiji/dushubiji',
    })
  }, 1000);
  // wx.navigateTo({
  //   url: '/pages/dushubiji/dushubiji',
  // })
}else{
  this.Get1({
    "bookName":this.data.bookName,
    "vipId":this.data.vipId,
    "readProgress":this.data.readProgress,
    "notes":this.data.notes,
    "noteStatus":1,
    "id": this.data.id,
  })
  wx.showToast({
    title: '修改成功！',
    icon: 'none',
  })
setTimeout(function () {
  wx.navigateTo({
    url: '/pages/dushubiji/dushubiji',
  })
}, 1000);
}
  },
  Get(data){
    wxRequest.postJson(`${addNote}`,data).then(res => {
      console.log(res)
      if(res.code ==200){
        //   wx.showModal({
        //     content: '成功',
        //     confirmColor:'#EF7B3C',
        //     confirmText:"确定",
        //     showCancel:false,
        //     duration: 3000
        // })
      }
    })
  },
  Get1(data){
    wxRequest.postJson(`${updateNote}`,data).then(res => {
      console.log(res)
      if(res.code ==200){
        //   wx.showModal({
        //     content: '成功',
        //     confirmColor:'#EF7B3C',
        //     confirmText:"确定",
        //     showCancel:false,
        //     duration: 3000
        // })
      }
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
    if(event.detail.name=="已完成"){
      this.setData({
        readProgress:1
      })
    }else{
      this.setData({
        readProgress:0
      })
    }
    this.setData({
      venue:event.detail.name,
      ydcd:event.detail.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options !=null){
    this.setData({
      id: options.id,
  });
    this.setData({
      vipId: wx.getStorageSync('userInfo').id,
  });
  console.log(this.data.id)
  if(this.data.id !=null){
    wxRequest.Get(`${getNoteDetail}/${this.data.id}`).then(res => {
      console.log(res)
      if(res.code==200){
        this.setData({
          bj:res.data,
          bookName:res.data.bookName,
          notes:res.data.notes,
          readProgress:res.data.readProgress
        })
      }
    })
  }
  if(this.data.readProgress==1){
    this.setData({
      ydcd:"已读完"
    })
  }else if(this.data.readProgress==0){
    this.setData({
      ydcd:"进行中"
    })
  }
}
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