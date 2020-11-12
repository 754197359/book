// pages/fabu/fabu.js  checkTodayScore
const wxRequest = require("../../utils/wxRequest.js");
const checkTodayScore = require("../../config.js").checkTodayScore; //账号密码登录
var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		show1: false,
		todays: "",
		storeTotal: 0,
		regiFlag: false,
		regisState: "点我签到",
		data: {
			selected: [
				{
					date: "2018-5-21",
				},
				{
					date: "2018-5-22",
				},
				{
					date: "2018-5-24",
				},
				{
					date: "2018-5-25",
				},
			],
		},
		actions: [
			{
				name: " 选项 ",
			},
			{
				name: " 选项 ",
			},
			{
				name: " 选项 ",
			},
		],
		id: "",
	},
	getshow1: function () {
		this.setData({
			show1: true,
		});
	},
	//场馆选择
	onClose1() {
		this.setData({
			show1: false,
		});
	},

	onSelect1(event) {
		console.log(event.detail);
		this.setData({
			venue: event.detail.name,
		});
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			id: wx.getStorageSync("userInfo").id,
		});
		wxRequest
			.Get(`${checkTodayScore}/${wx.getStorageSync("userInfo").id}`)
			.then((res) => {
				console.log(res);
				if (res.code == 200) {
					if (res.data.isCan == "N") {
						this.setData({
							regisState: "已签到",
						});
					} else if (res.data.isCan == "Y") {
						this.setData({
							regisState: "点我签到",
						});
					}
				}
			});
	},
	/**
	 * 日历是否被打开
	 */
	bindselect(e) {
		console.log(e.detail.ischeck);
	},
	/**
	 * 获取选择日期
	 */
	bindgetdate(e) {
		let y = e.detail.year;
		let m = e.detail.month;
		let d = e.detail.date;
		let tod = y + "-" + m + "-" + d;
		this.setData({
			todays: tod,
		});
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		let userId = wx.getStorageSync("userInfo").id;
		let that = this;
		console.log(that.data.id);
		app.api.queryScore(userId, function (res) {
			if (res != null) {
				that.setData({
					storeTotal: res.total,
				});

				// 将签到复制到列表上去
				that.setData({
					selected: res.list,
				});

				res.list.forEach((element) => {
					if (element.addTime == that.data.todays) {
						that.setData({
							regiFlag: true,
							regisState: "已签到",
						});
					}
				});
			}
		});
	},
	registerFun: function () {
		let para = {
			vipId: this.data.id,
			score: 5,
		};
		if (this.data.regisState == "点我签到") {
			//let userId = app.globalData.loginInfo;
			let userId = wx.getStorageSync("userInfo").id;
			let that = this;
			app.api.queryInvoice(userId, 5, function (res) {
				// debugger
				if (res != null) {
					that.setData({
						regisState: "已签到",
						regiFlag: true,
          });
          wx.showModal({
            content: '签到成功！',
            confirmColor:'#EF7B3C',
            confirmText:"确定",
            showCancel:false,
            duration: 3000
					})
					// wx.showToast({
					// 	title: '请签到成功!',
					// 	icon: 'none'
					// })
					setTimeout(function () {
						that.onReady();
					}, 1000);

				}
				app.api.queryScore(wx.getStorageSync("userInfo").id, function (res) {
					if (res != null) {
						that.setData({
							storeTotal: res.total,
						});
					}
				});
			});
			
			//let userId = wx.getStorageSync("userInfo").id;
			//let that = this;
			//console.log(that.data.id);
			app.api.queryScore(userId, function (res) {
				if (res != null) {
					that.setData({
						storeTotal: res.total,
					});

					// 将签到复制到列表上去
					that.setData({
						selected: res.list,
					});

					res.list.forEach((element) => {
						if (element.addTime == that.data.todays) {
							that.setData({
								regiFlag: true,
								regisState: "已签到",
							});
						}
					});
				}
			});
			
			
		} else {
			// that.setData({
			//   regiFlag: true
			// });
		}
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

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
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {},
});
