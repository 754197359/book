var util = {};
var header = {
  'Accept': 'application/json',
  'content-type': 'application/json',
  'Authorization': null,
};
/*

*/
String.prototype.format = function () {
  if (arguments.length == 0) return this;
  for (var s = this, i = 0; i < arguments.length; i++)
    s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
  return s;
};
util.url = function (r) {
    var n = getApp(),
      a = n.siteInfo.siteroot + r;
    return a;
  }, util.getReq = function (req, cb) {
    var reqUrl = util.url(req);
    console.info("get request url :" + reqUrl)
    wx.showLoading({
      title: '加载中',
    })
    //console.log("header :" + JSON.stringify(header));
    wx.request({
      url: reqUrl,
      method: 'get',
      header: header,
      success: function (res) {
        wx.hideLoading();
        console.log("get request response:" + JSON.stringify(res))
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })
  }, util.delReq = function (req, data, cb) {
    var reqUrl = util.url(req);
    console.info("delete request url :" + reqUrl)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: reqUrl,
      method: 'delete',
      header: header,
      data: data,
      success: function (res) {
        wx.hideLoading();
        console.log("delete request response:" + JSON.stringify(res))
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })
  }, util.postReq = function (req, data, cb) {
    var reqUrl = util.url(req);
    console.info("post request url :" + reqUrl)
    wx.showLoading({
      title: '加载中',
    })
    //console.log("header:" + JSON.stringify(header));
    console.log("data :" + JSON.stringify(data));
    wx.request({
      url: reqUrl,
      method: 'post',
      header: header,
      data: data,
      success: function (res) {
        wx.hideLoading();
        console.log("post request response:" + JSON.stringify(res))
        if (res.statusCode != 200) {
          wx.showModal({
            title: '服务异常',
            content: '服务异常,状态码:' + res.statusCode,
            showCancel: false
          })
        }
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })
  },
  util.uploadFile = function (req, data, cb) {
    var reqUrl = util.url(req);
    console.info("uploadFile request url :" + reqUrl)
    wx.showLoading({
      title: '上传中',
    })
    //console.log("header:" + JSON.stringify(header));
    // console.log("data :" + JSON.stringify(data));
    for (let i = 0; i < data.length; i++) {
      wx.uploadFile({
        url: reqUrl,
        filePath: data[i] + "",
        method: 'post',
        name: 'file',
        success: function (res) {
          wx.hideLoading();
          console.log("uploadFile request response:" + JSON.stringify(res))
          return typeof cb == "function" && cb(res.data)
        },
        fail: function () {
          wx.hideLoading();
          wx.showModal({
            title: '网络错误',
            content: '网络出错，请刷新重试',
            showCancel: false
          })
          return typeof cb == "function" && cb(false)
        }
      })
    }
  },
  util.postData = function (req, data) {
    var reqUrl = util.url(req);
    return new Promise(function (resolve, reject) {
      wx.request({
        url: reqUrl,
        method: 'post',
        header: header,
        data: data,
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          resolve(res);
        }
      });
    });
  },
  util.selectDict = function (k, cb) {
    var n = getApp();
    var params = {
      dictType: k
    };
    util.postData(n.siteInfo.api.queryDictList, params).then(res => {
      var dictList = [];
      if (res.code == 200) {
        dictList = res.data;
      }
      return typeof cb == "function" && cb(dictList)
    })
  },
  util.selectDictLabel = function (list, value) {
    var label = '';
    if (list != null) {
      list.forEach(function (dict) {
        if (value == dict.dictValue) {
          label = dict.dictLabel;
          return;
        }
      });
    }
    return label;
  },
  util.showModal = function (msg) {
    wx.showModal({
      content: msg,
      showCancel: false,
    })
  }, 
  util.formatMoney = function (money) {
    var money = parseInt(money / 100) + '.' + money % 100;
    return Number(money).toFixed(2);
  }, 
  util.getLoginInfo = function (cb) {
    wx.getStorage({
      key: 'loginInfo',
      success(res) {
        return typeof cb == "function" && cb(res.data)
      },
      fail(res) {
        console.log('登陆信息获取失败！')
      }
    })
  },
  util.refreshLoginInfo = function (id) {
    var app = getApp();
    if (id != null) {
      var user = {
        id: id
      };
      //获取用户信息
      console.info('刷新用户请求参数:' + JSON.stringify(user))
      app.api.queryLoginInfo(user, function (res) {
        app.globalData.loginInfo = res;//有问题？
        wx.setStorageSync('loginInfo', res);
      });
    }

  },

  /* 将1000.00转为100000形式 */
  util.undoMoney = function (money) {
    var money = money * 100;
    return money;
  },
  util.showToast = function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },
  util.buttonClicked = function(self) {
    self.setData({
      buttonClicked: true
    })
    setTimeout(function () {
      self.setData({
        buttonClicked: false
      })
    }, 500)
  }, module.exports = util;