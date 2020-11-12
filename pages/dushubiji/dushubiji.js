// pages/dushubiji/dushubiji.js
const wxRequest = require('../../utils/wxRequest.js');
const getNotes = require('../../config.js').getNotes; //读书笔记列表
const removeNote = require('../../config.js').removeNote;//删除读书笔记
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show1:true,
    active:0,
    time:"2020.08.07",
    shenhe:"未通过",
    vipId:"",
    bj:[],
    pageSize:10,
    pageNum:1,
    show:"true",
    currentData:0,
    id:"",
    id2:"",
    loading: true,
    length:""
  },
  /*跳转编辑
  */
 gotobj:function(e){
  this.setData({
    id:e.currentTarget.dataset.id
  })
   console.log(this.data.id)
  wx.navigateTo({
    url: '/pages/fabu/fabu?id='+this.data.id,
  })
 },
 /**跳转草稿箱 */
 goToPage1:function(){
  wx.navigateTo({
    url: '/pages/caogao/caogao',
  })
 },
 /**跳转发布 */
 goToPage2:function(){
  wx.navigateTo({
    url: '/pages/fabu1/fabu1',
  })
 },
  onChange(event) {
    console.log( event.detail.name)
    this.setData({
      pageNum:1
    })
    if(event.detail.name==1){
      this.Get2(1,1);
      this.setData({
        currentData:1
      })
    }else if(event.detail.name==2){
      this.Get2(1,3);
      this.setData({
        currentData:2
      })
    }else if(event.detail.name==3){
      this.Get2(1,2);
      this.setData({
        currentData:3
      })
    }else if(event.detail.name==0){
      this.Get2(1,-1);
      this.setData({
        currentData:0
      })
    }
  },
  Delete1(id){
    wxRequest.Delete(`${removeNote}/${id}`).then(res => {
      console.log(res)
        if(res.code==200){

          // wx.showToast({
          //   title: '已删除',
          //   icon: 'none',
          //   duration: 3000
          // })
          this.Get2(1,this.data.id2)
        }
       })
  },
 //删除
 delete:function(e){
  const that = this;
  console.log(e)
  that.setData({
    id2:e.currentTarget.dataset.id1
  })
  wx.showModal({
    content: '你确定要删除这条笔记吗？',
    confirmColor:'#EF7B3C',
    cancelText:'取消',
    cancelColor:'#999999',
    confirmText:"确定",
    success: function(res) {
      if (res.confirm) {
        that.Delete1(e.currentTarget.dataset.id);
        // wxRequest.Delete(`${removeNote}/${e.currentTarget.dataset.id}`).then(res => {
        //   console.log(res)
        //     if(res.code==200){

        //       // wx.showToast({
        //       //   title: '已删除',
        //       //   icon: 'none',
        //       //   duration: 3000
        //       // })
        //       this.Get2(1,e.currentTarget.dataset.id1)
        //     }
        //    })
          //  this.Get2(1,e.currentTarget.dataset.id1)
      } else if (res.cancel) {
      console.log('用户点击取消')
      }
    }
  })
  console.log(this.data.currentData)
  console.log(e.currentTarget.dataset.id1);
  // wxRequest.Delete(`${removeNote}/${e.currentTarget.dataset.id}`).then(res => {
  //   console.log(res)
  //     if(res.code==200){
        
  //     }
  //    })
  // if(this.data.currentData==0){
  //   this.Get2(1,-1);
  // }else if(this.data.currentData==1){
  //   this.Get2(1,1);
  // }else if(this.data.currentData==2){
  //   this.Get2(1,3);
  // }else if(this.data.currentData==3){
  //   this.Get2(1,2);
  // }
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var interval = setInterval(function () {  
    //   wx.showToast({
    //     title: '正在加载！',
    //   })
    // }, 500) 
    console.log("onload方法执行")
    console.log(wx.getStorageSync('userInfo'))
      this.setData({
        vipId: wx.getStorageSync('userInfo').id,
      });
      // var interval = setInterval(function () {  
      //   wx.showToast({
      //     title: '加载中...',
      //     icon:"success",
      //     duration:500
      //   })
      // }, 500) 
      wxRequest.Get(`${getNotes}/${this.data.vipId}/${-1}/${1}/${this.data.pageSize}`).then(res => {
        console.log(res.data.list)
        if(res.data.list.length==0){
          this.setData({
            length:res.data.list.length,
            show1:false,
            show:true
          })
        }else{
          this.setData({
            length:res.data.list.length,
            show1:true,
            show:false
          })
        }
      })
      this.Get2(1,-1);
      this.setData({
        loading: false,
      })
  },

  //读书分享
  Get2(pageNum,status){
    console.log("get2方法执行了")
    wxRequest.Get(`${getNotes}/${this.data.vipId}/${status}/${pageNum}/${this.data.pageSize}`).then(res => {
      console.log(res.data.list)
      let arr = [];
      if(res.code==200){
        if(pageNum==1){
            arr = res.data.list
        }else{
          arr = this.data.bj.concat(res.data.list)
        }
        this.setData({
          bj:arr
        })
        // console.log(this.data.news)
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
    if(this.data.currentData==0){
      this.Get2(this.data.pageNum,-1);
    }else if(this.data.currentData==1){
      this.Get2(this.data.pageNum,1);
    }else if(this.data.currentData==2){
      this.Get2(this.data.pageNum,3);
    }else if(this.data.currentData==3){
      this.Get2(this.data.pageNum,2);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})