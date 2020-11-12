const app = getApp();
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

module.exports = {
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo ,
  regexConfig: { //验证邮箱手机号码的正则表达式
    idcard: /^[1-9]\d{7}((0\d)|zhidao(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
    phone: /^1(3|4|5|6|7|8|9)\d{9}$/,
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
  },
  sendPost: function (newurl, postData) {
    let url = app.globalData.globalUrl + newurl;
    if(newurl!='/applet/user/loginByAccount'&&newurl!=="/applet/user/loginByWX"&&newurl!=="/applet/user/realNameAuth"&&newurl!=="/applet/user/regedit"&&newurl!="/applet/user/resetPassword"){
      postData.token = wx.getStorageSync('userInfo').userInfo.token;
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'POST',
        data: postData,
        header: {
          'content-type': 'application/json'
        },
        dataType: 'json',
        success(res) {
          if (res.data.code == -1) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.code == -2) {
            wx.showToast({
              title: '请先登录',
              icon: "none",

            })
            setTimeout(function () {
              wx.hideToast();
              navigateToPath('/pages/login/login');
            }, 1500)
          } else {
            resolve(res)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    });
  },
  // 发起get请求，请求后台  
  sendPost1: function (url, postData) {
    url = app.globalData.globalUrl + url;
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        data: postData,
        header: {
          'content-type': 'application/json'
        },
        dataType: 'json',
        success(res) {
          if (res.data.code == -1) {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          } else if (res.data.code == -2) {
            wx.showToast({
              title: '请先登录',
              icon: "none",

            })
            setTimeout(function () {
              wx.hideToast();
              navigateToPath('/pages/login/login');
            }, 1500)
          } else {
            resolve(res)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    });
  },
  navigateToPath: function (path) {
    wx.navigateTo({
      url: path,
    })
  },
  changeNum: function (num) {
    var thisNum = (num || 0).toString().split('.'); //判断如果有小数点就分割这个数为一个数组
    var num = thisNum[0]; //截取小数点前面的部分保存
    var fuNum = thisNum[0]; //如果是负数先保存备用
    var result = ''; //最后结果
    if (fuNum < 0) {
      num = num.slice(1); //是负数先把负号截取掉
    }
    while (num.length > 3) { //循环每三位添加一个逗号
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    if (fuNum < 0) {
      result = '-' + result
    } //负数加上负号
    if (thisNum[1]) {
      result = result + '.' + thisNum[1];
    } //拼接上小数
    return result;
  }
}