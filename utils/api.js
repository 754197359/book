/**
 *  接口请求封装
 *  此类用于封装，api 请求方法。 以达到数据、界面分离效果
 */

var api = {};

/**
 * 签到
 * @param {vipId}  vipId 用户id
 * @param {score}  score 打卡积分
 * @param {function} cb 回调函数
 */
api.queryInvoice = function (vipId,score, cb) {
  var app = getApp();
  //url
  var url = app.siteInfo.api.queryInvoice.format(vipId,score);
  app.util.getReq(url, function (res) {
    var resData = null;
    if (res.code == 200) {
      resData = res;
    }
    //回调
    return typeof cb == "function" && cb(resData)
  })
},

/**
 * 获取积分
 * @param {vipId}  vipId 用户id
 * @param {function} cb 回调函数
 */
api.queryScore = function (vipId, cb) {
  var app = getApp();
  //url
  var url = app.siteInfo.api.queryScore.format(vipId);
  app.util.getReq(url, function (res) {
    var resData = null;
    if (res.code == 200) {
      resData = res.data;
    }
    //回调
    return typeof cb == "function" && cb(resData)
  })
}
module.exports = api;