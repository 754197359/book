module.exports = {
  name: "读书会",
  // siteroot: "http://121.89.167.74:8998",
  siteimgroot: "https://zszy.ahytdata.com:9000/",
  siteroot: "https://dsh.ahytdata.com:4333",
  api:{
    queryInvoice: '/score/addScore/{0}/{1}', //签到
    queryScore: '/score/getScoreList/{0}', //获取积分
  }
};