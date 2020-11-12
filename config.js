/**
 * 小程序配置文件
 */

 const host = 'https://dsh.ahytdata.com:4333';
   //const host = 'http://121.89.167.74:8000';

const config = {
    host,
    getIdentCodeForRegedit: `${host}/vip/getIdentCodeForRegedit`, // 获取用户注册验证码
    checkPhoneForRegedit: `${host}/vip/checkPhoneForRegedit`, // 注册检验手机号是否已经注册
    checkIdentCode: `${host}/vip/checkIdentCode`, // 注册检验验证码
    login: `${host}/vip/login`, // 用户名和密码登录
    getCarouselList: `${host}/carousel/getCarouselList`, // 首页轮播
    getArticleList: `${host}/article/getArticleList`, // 首页新闻列表
    getArticleDetail: `${host}/article/getArticleDetail`, // 首页新闻详情
    regedit: `${host}/vip/regedit`, // 注册 
    resetPassword: `${host}/vip/resetPassword`, // 重置密码
    loginBySMS: `${host}/vip/loginBySMS`, // 验证码快速登陆
    getBookCategory: `${host}/bk/getBookCategory`, // 查询图书分类
    getNotes: `${host}/note/getNotes`, // 查询读书笔记 列表
    getTbNoticeMsg: `${host}/notice/getTbNoticeMsg`, // 查询会员通知消息列表
    getBookList: `${host}/bk/getBookList`, // 获取图书列表
    getBookDetail: `${host}/bk/getBookDetail`, // 获取图书详情
    getNoteDetail: `${host}/note/getNoteDetail`, //读书分享详情
    update: `${host}/vip/update`, //我的修改个人信息 
    upload: `${host}/comm/upload`, //通用上传图片
    updateTbNoticeMsgBatch: `${host}/notice/updateTbNoticeMsgBatch`, //修改全部状态
    updateTbNoticeMsgSingle: `${host}/notice/updateTbNoticeMsgSingle`, //修改一条状态
    getReserveRemain: `${host}/reserve/getReserveRemain`, //获取当前场馆预约人数及剩余空闲名额
    addReserve: `${host}/reserve/addReserve`, //获取当前场馆预约人数及剩余空闲名额
    getReserveLibraryList: `${host}/reserve/getReserveLibraryList`, //预约--获取分会场馆信息
    getReserveRecordList: `${host}/reserve/getReserveRecordList`, //预约--获取分会场馆信息
    getReserveRecordDetail: `${host}/reserve/getReserveRecordDetail`,//获取预约详情
    cancelReserve: `${host}/reserve/cancelReserve`,//取消预约
    deleteReserve: `${host}/reserve/deleteReserve`,//删除预约
    removeNote: `${host}/note/removeNote`,//删除读书笔记   
    addNote: `${host}/note/addNote`,//新增读书笔记
    updateNote: `${host}/note/updateNote`,//新增读书笔记
    add: `${host}/search/add`,//新增搜索关键字
    delete: `${host}/search/delete`,//删除搜索关键字
    getHistorylist: `${host}/search/getHistorylist`,//获取搜索历史关键字
    getTitlelist: `${host}/search/getTitlelist`,//模糊查询标题
    checkReserveDate: `${host}/reserve/checkReserveDate`,//检验日期是否可以进行预约
    checkReserveLibrary: `${host}/reserve/checkReserveLibrary`,//检验分会预约场馆是否可以进行预约
    checkTodayScore: `${host}/score/checkTodayScore`,//查询今天是否可以签到 
    logout: `${host}/vip/logout`,//推出登录/carousel/getCarouselDetail
    getCarouselDetail: `${host}/carousel/getCarouselDetail`,//推出登录
    getVipInfo: `${host}/vip/getVipInfo`,
}

module.exports = config