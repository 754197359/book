// pages/shouye/shouye.js
const app = getApp()
const wxRequest = require("../../utils/wxRequest.js");
const getCarouselList = require("../../config.js").getCarouselList; //轮播
const getArticleList = require("../../config.js").getArticleList; //首页新闻列表
const getBookCategory = require("../../config.js").getBookCategory; //图书列表
const getNotes = require("../../config.js").getNotes; //查询读书笔记列表
const getTbNoticeMsg = require("../../config.js").getTbNoticeMsg; //查询会员通知消息列表
const getBookList = require("../../config.js").getBookList; //查询图书列表
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		currentData: 0,
		active: 0,
		active1: "#EF783A",
		widheight: "",
		widwidth: "",
		show1: false,
		show2: true,
		show3: true,
		show4: false,
		show5: true,
		show6: false,
		image: [],
		news: [],
		pageNum: 1,
		pageSize: 10,
		title: [],
		vipId: "",
		notReadNum: 0,
		pageNum1: 1,
		isNew: "",
		category: "",
		book: ["d", "d", "3s"],
		news1: [],
		pageNum2: 1,
		userInfo:"",
		event:"",
	},
	gotowl:function(e){
		// wx.navigateTo({
		// 	url: "/pages/vebview/vebview?link="+,
		// });
		console.log(e)
	},
	tianjia:function(){
		wx.navigateTo({
			url: "/pages/fabu/fabu",
		});
	},
	onPageScroll: function (e) {
		// console.log(e.scrollTop);
		var scrolltop = e.scrollTop;
	},
	goto: function (e) {
		console.log(e.currentTarget.dataset.islink)
		if(e.currentTarget.dataset.islink==1){
			wx.navigateTo({
				url: "/pages/webview/webview?link="+e.currentTarget.dataset.link,
			});
		}else{
			wx.navigateTo({
				url: "/pages/fuwenben/fuwenben?id="+e.currentTarget.dataset.id,
			});
		}
	},
	/**跳转消息 */
	gotomessage: function () {
		wx.navigateTo({
			url: "/pages/message1/message1",
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this;
		let flag = app.checkLogin()
		console.log("首页执行")
		console.log(wx.getStorageSync('userInfo'))
		console.log(flag)
		if (flag) {
			that.setData({
					userInfo: wx.getStorageSync('userInfo')
			});
		}
		console.log(that.data.userInfo)
		if (that.data.userInfo ==null || that.data.userInfo =="") {

			}else{
				console.log(that.data.userInfo ==null || that.data.userInfo =="")
				// console.log(wx.getStorageSync("userInfo"));
				that.setData({
					vipId: wx.getStorageSync("userInfo").id,
				});
				// console.log(that.data.vipId);
				// 获取系统信息
				wx.getSystemInfo({
					success: function (res) {
						that.setData({
							widheight: res.screenHeight * 0.5,
							widwidth: res.screenWidth,
						});
					},
				});
		
				wx.getSystemInfo({
					success: function (res) {
						that.setData({
							clientHeight: res.windowHeight + 1000,
						});
					},
				});
		
				// console.log(this.data.widheight)
				// console.log(this.data.widwidth)

				//图书
				wxRequest.Get(`${getBookCategory}`).then((res) => {
					console.log(res.data);
					if (res.code == 200) {
						this.setData({
							title: res.data,
						});
					}
				});
				//首页轮播
				wxRequest.Get(`${getCarouselList}`).then((res) => {
					console.log(res.data);
					if (res.code == 200) {
						
						this.setData({
							image: res.data,
						});
			}
		});
		// console.log(this.data.image)
		this.Get(this.data.pageNum);
		this.Get1(-1,1,1);
		this.Get2(this.data.pageNum2);
	}
	},


	//获取当前滑块的index
	bindchange: function (e) {
		const that = this;
		that.setData({
			currentData: e.detail.current,
		});
	},
	//点击切换，滑块index赋值
	checkCurrent: function (e) {
		const that = this;

		if (that.data.currentData === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentData: e.target.dataset.current,
			});
		}
		if (that.data.currentData == 0) {
			that.setData({
				show1: false,
				show2: true,
				show3: true,
				show4: false,
				show5: true,
				show6: false,
			});
			this.Get(1)
		} else if (that.data.currentData == 1) {
			that.setData({
				show1: true,
				show2: false,
				show3: false,
				show4: true,
				show5: true,
				show6: false,
				event:0,
			});
			// console.log(this.data.event)
			if (this.data.event == 1) {
				this.Get1(0, -1, 1);
			} else if (this.data.event == 2) {
				this.Get1(1, -1, 1);
			} else if (this.data.event == 3) {
				this.Get1(2, -1, 1);
			} else if (this.data.event == 4) {
				this.Get1(3, -1, 1);
			} else if (this.data.event == 0) {
				this.Get1(-1, 1, 1);
			} else if (this.data.event == 5) {
				this.Get1(4, -1, 1);
			}
		} else if (that.data.currentData == 2) {
			that.setData({
				show1: true,
				show2: false,
				show3: true,
				show4: false,
				show5: false,
				show6: true,
			});
			this.Get2(1)
		}
	},
	showHistory: function () {
		wx.navigateTo({
			url: "/pages/sousuo/sousuo",
		});
	},
	/**
	 * 图书切换标签
	 */
	onChange(event) {
		console.log(event.detail.name);
		this.setData({
			pageNum1: 1,
			event:event.detail.name
		});
		if (event.detail.name == 1) {
			this.Get1(0, -1, 1);
		} else if (event.detail.name == 2) {
			this.Get1(1, -1, 1);
		} else if (event.detail.name == 3) {
			this.Get1(2, -1, 1);
		} else if (event.detail.name == 4) {
			this.Get1(3, -1, 1);
		} else if (event.detail.name == 0) {
			this.Get1(-1, 1, 1);
		} else if (event.detail.name == 5) {
			this.Get1(4, -1, 1);
		}
	},
	//读书分享
	Get2(pageNum2) {
		wxRequest
			.Get(`${getNotes}/${-1}/${2}/${pageNum2}/${this.data.pageSize}`)
			.then((res) => {
				// console.log(res.data.list);
				let arr = [];
				if (res.code == 200) {
					if (pageNum2 == 1) {
						arr = res.data.list;
					} else {
						arr = this.data.news1.concat(res.data.list);
					}
					this.setData({
						news1: arr,
					});
					// console.log(this.data.news)
				}
			});
	},
	//首页图书列表
	Get1( category,isNew, pageNum1) {
		wxRequest
			.Get(
				`${getBookList}/${category}/${isNew}/${pageNum1}/${this.data.pageSize}`
			)
			.then((res) => {
				// console.log(res);

				let arr = [];
				if (res.code == 200) {
					if (pageNum1 == 1) {
						arr = res.data.list;
					} else {
						arr = this.data.book.concat(res.data.list);
					}
					this.setData({
						book: arr,
					});
				}
			});
	},
	Get(pageNum) {
		//首页新闻列表
		wxRequest
			.Get(`${getArticleList}/${pageNum}/${this.data.pageSize}`)
			.then((res) => {
				// console.log(res.data.list);
				let arr = [];
				if (res.code == 200) {
					if (pageNum == 1) {
						arr = res.data.list;
					} else {
						arr = this.data.news.concat(res.data.list);
					}
					this.setData({
						news: arr,
					});
					// console.log(this.data.news);
				}
			});
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		if (this.data.userInfo ==null || this.data.userInfo =="") {
			
		}else{
					//消息
					wxRequest.Get(`${getTbNoticeMsg}/${this.data.vipId}/1/1`).then((res) => {
						console.log(res);
						if (res.code == 200) {
							this.setData({
								notReadNum: res.data.notReadNum,
							});
							// console.log(this.data.notReadNum);
						}
					});
				}
						//首页轮播
						wxRequest.Get(`${getCarouselList}`).then((res) => {
							console.log(res.data);
							if (res.code == 200) {
								
								this.setData({
									image: res.data,
								});
					}
				});
								//图书
								wxRequest.Get(`${getBookCategory}`).then((res) => {
									console.log(res.data);
									if (res.code == 200) {
										this.setData({
											title: res.data,
										});
									}
								});
								this.Get(this.data.pageNum);
								this.Get1(-1,1,1);
								this.Get2(this.data.pageNum2);
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

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
		// console.log(this.data.news)
		if (this.data.currentData == 0) {
			this.data.pageNum += 1;
			this.Get(this.data.pageNum);
		} else if (this.data.currentData == 1) {
			this.data.pageNum1 += 1;
			console.log(this.data.event)
			if (this.data.event== 1) {
				this.Get1(0, -1, this.data.pageNum1);
			} else if (this.data.event == 2) {
				this.Get1(1, -1, this.data.pageNum1);
			} else if (this.data.event== 3) {
				this.Get1(2, -1, this.data.pageNum1);
			} else if (this.data.event == 4) {
				this.Get1(3, -1, this.data.pageNum1);
			} else if (this.data.event == 0) {
				this.Get1(-1, 1, this.data.pageNum1);
			} else if (this.data.event == 5) {
				this.Get1(4, -1, this.data.pageNum1);
			}
		}else{
			this.data.pageNum2 += 1;
			this.Get2(this.data.pageNum2);
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
	
});
