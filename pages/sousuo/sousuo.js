// pages/sousuo/sousuo.js
const wxRequest = require('../../utils/wxRequest.js');
const add = require('../../config.js').add; //getHistorylist
const delete1 = require('../../config.js').delete;
const getHistorylist = require('../../config.js').getHistorylist;
const getTitlelist = require('../../config.js').getTitlelist;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '新闻', value: 1 },
      { text: '图书', value: 0 },
      { text: '读书笔记', value: 2 },
    ],
    value1: 0,
    // inputValue:"",// 保存用户在输入框中输入的文字
    // historyList:[],//用来储存每次的搜索
    vipId:"",
    searchType:0,
    list:[],
    keyword:"",
    sousuo:[],
    show:false,
    show1:true,
  },
  showHistory1:function(){
    console.log(1)
    if(this.data.keyword==null || this.data.keyword=="" ){
      console.log(this.data.keyword)
    this.setData({
      show:false,
      show1:true
    })
  }else{
    this.setData({
      show:true,
      show1:false
    })
  }
  },
  showHistory:function(){
    console.log(1)
    this.setData({
      show:true,
      show1:false
    })
  },
  getName(e){
    let name=e.currentTarget.dataset.name
    let id=e.currentTarget.dataset.id
    let searchType1=e.currentTarget.dataset.searchType
    console.log(e)
    console.log(e.target.dataset.searchtype)
    this.setData({
      sousuo:[]
    });
    if(e.target.dataset.searchtype==0){
      wx.navigateTo({
        url: '/pages/tushuxq/tushuxq?id='+e.target.dataset.id,
      })
    }else if(e.target.dataset.searchtype==1){
      wx.navigateTo({
        url: '/pages/xinwenxq/xinwenxq?id='+e.target.dataset.id,
      })
    }else if(e.target.dataset.searchtype==2){
      wx.navigateTo({
        url: '/pages/dushuxq/dushuxq?id='+e.target.dataset.id,
      })
    }
  },
  // doSearch:function(e){
  //   var inputValue = this.data.inputValue;
  //   var historyList = this.data.historyList || [];
  //   if(historyList.length<5&&inputValue!==""){
  //     historyList.unshift(inputValue);
  //   }else if(historyList.length>=5&&inputValue!==""){
  //     historyList.unshift(inputValue);
  //     historyList.pop();
  //   };
  //   wx.setStorageSync('historyList', historyList);
  // },
  fanhui:function(){
    wx.navigateBack({
      url: '/pages/shouye/shouye',
    })
  },
  deletess:function(){
    wxRequest.Delete(`${delete1}/${this.data.vipId}/${this.data.searchType}`).then(res => {
      console.log(res.data)
      if(res.code==200){
        this.Post1({
          "vipId":this.data.vipId,
          "searchType":this.data.searchType,
        })
      }
    })

  },
  onSwitch1Change({ detail }) {
  this.setData({
    searchType:detail
  })
    this.Post1({
      "vipId":this.data.vipId,
      "searchType":this.data.searchType,
    })
  },
  Post(data){
    wxRequest.postJson(`${add}`,data).then(res => {
      console.log(res)
      if(res.code==200){
        this.Post1({
          "vipId":this.data.vipId,
          "searchType":this.data.searchType,
        })
      }
    })
  },
  Post1(data){
    wxRequest.postJson(`${getHistorylist}`,data).then(res => {
      console.log(res.data)
      if(res.code==200){
        if(res.msg=="Success."){
          this.setData({
            list:res.data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('userInfo'))
    this.setData({
      vipId: wx.getStorageSync('userInfo').id,
  });
    this.Post1({
      "vipId":this.data.vipId,
      "searchType":this.data.searchType,
    })
  },
  //添加一条搜索历史
  onSearch(e) {
    console.log(this.data.searchType)
    console.log(this.data.keyword)
    //添加
    this.Post({
      "vipId":this.data.vipId,
      "keyword":this.data.keyword,
      "searchType":this.data.searchType
    })
    //获取
    this.Post1({
      "vipId":this.data.vipId,
      "searchType":this.data.searchType,
    })
    console.log(99)
    console.log(e.detail)
    //模糊查询标题
    wxRequest.Get(`${getTitlelist}/${e.detail}/${this.data.searchType}`).then(res => {
      console.log(res.data)
      if(res.code==200){
        if(res.msg=="Success."){
        
          this.setData({
            sousuo:res.data
          })
          console.log(77)
          console.log(this.data.sousuo)
        }
      }
    })
  },
  onChange(e) {
    this.setData({
      keyword: e.detail,
    });
    if(e.detail == null || e.detail == ""){
     this.setData({
      sousuo:""
     })
    }else{
    wxRequest.Get(`${getTitlelist}/${e.detail}/${this.data.searchType}`).then(res => {
      console.log(res.data)
      if(res.code==200){
        if(res.msg=="Success."){
          this.setData({
            sousuo:res.data
          })
        }
      }
    })
  }
  },
  getls:function(e){
    console.log(e.target.dataset.name)
    
    this.setData({
      value:e.target.dataset.name,
      keyword:e.target.dataset.name
    })
    wxRequest.Get(`${getTitlelist}/${e.target.dataset.name}/${this.data.searchType}`).then(res => {
      console.log(res.data)
      if(res.code==200){
        if(res.msg=="Success."){
        
          this.setData({
            sousuo:res.data,
             show:true,
            show1:false
          })
          console.log(77)
          console.log(this.data.sousuo)
          // this.setData({
          //   show:true,
          //   show1:false
          // })
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