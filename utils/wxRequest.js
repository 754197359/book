const app = getApp();

/**
 * 拦截器(请求之前调用)
 * @fn: 请求函数
 */
function wxPromisify(fn) {
    return function(obj = {}) {
        // 开启动画效果
        wx.showLoading({
            title: '加载中'
        });

        return new Promise((resolve, reject) => {
            obj.success = function(res) {
                // 成功回调
                if (res.statusCode == '200') {
                    // 关闭动画效果
                    wx.hideLoading();

                    if (res.data.errorCode == 10102) {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            duration: 3000
                        });

                        setTimeout(function() {
                            // 跳转到登录页面
                            wx.redirectTo({
                                url: '/pages/login/login',
                            });
                        }, 2000);
                    } else {
                        resolve(res.data);
                    }

                } else {
                    switch (res.statusCode) {
                        case 400:
                            console.log('错误请求');
                            wx.showToast({
                                title: '错误请求',
                                icon: 'none',
                                duration: 3000
                            });
                            break;
                        case 401:
                            console.log('未授权，请重新登录');
                            wx.showToast({
                                title: '未授权，请重新登录',
                                icon: 'none',
                                duration: 3000
                            });

                            // 跳转到登录页面
                            wx.redirectTo({
                                url: '/pages/login/login',
                            });
                            break;
                        case 403:
                            console.log('拒绝访问');
                            wx.showToast({
                                title: '拒绝访问',
                                icon: 'none',
                                duration: 3000
                            });
                            break;
                        case 404:
                            console.log('请求错误，未找到该资源');
                            wx.showToast({
                                title: '请求错误，未找到该资源',
                                icon: 'none',
                                duration: 3000
                            });
                            break;
                        case 405:
                            console.log('请求方法未允许');
                            wx.showToast({
                                title: '请求方法未允许',
                                icon: 'none',
                                duration: 3000
                            });
                            break;
                        case 408:
                            console.log('请求超时');
                            wx.showToast({
                                title: '请求超时',
                                icon: 'none',
                                duration: 3000
                            });
                            break;
                        case 500:
                            console.log('服务端出错');
                            wx.showToast({
                                title: '服务端出错',
                                icon: 'none',
                                duration: 3000
                            });
                            break;
                        case 502:
                            console.log('网络错误');
                            wx.showToast({
                                title: '网络错误',
                                icon: 'none',
                                duration: 3000
                            });
                            break;
                        case 503:
                            console.log('服务不可用');
                            wx.showToast({
                                title: '服务不可用',
                                icon: 'none',
                                duration: 3000
                            });
                            break;
                    }
                }
            }
            // 失败
            obj.fail = function(res) {
                wx.hideLoading(); // 请求超时关闭动画
                wx.showToast({
                    title: res.errMsg,
                    icon: 'none'
                });
                reject(res)
            }
            fn(obj)
        });
    }
}

/**
 * 无论Promise对象最后状态如何都会执行
 * @callback: 回到函数
 */
Promise.prototype.finally = function(callback) {
    let p = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.reject(callback()).then(() => {
            throw reason
        })
    )
}

/**
 * 微信请求get封装
 * @url: 接口地址
 * @data：以对象的格式传入
 * @token: token
 */
function Get(url, data) {
    let Get = wxPromisify(wx.request);
    // var token = app.globalData.userInfo.token;

    return Get({
        url: url,
        method: 'GET',
        data: data,
        header: {
            // 'Access-Token': token
        }
    })
}

/**
 * 微信请求post封装
 * @url: 接口地址
 * @data：以对象的格式传入
 * @token: token
 */
function Post(url, data, token) {
    let Post = wxPromisify(wx.request);

    return Post({
        url: url,
        method: 'POST',
        data: data,
        header: {
            "content-type": "application/x-www-form-urlencoded",
            // 'Access-Token': token
        }
    })
}

/**
 * 微信请求post json封装
 * @url: 接口地址
 * @data：以对象的格式传入
 */
function postJson(url, data) {
    let postJson = wxPromisify(wx.request);
    // var token = app.globalData.userInfo.token;

    return postJson({
        url: url,
        method: 'POST',
        data: data,
        header: {
            // 'Access-Token': token
        }
    });
}

/**
 * 微信请求put封装
 * @url: 接口地址
 * @data：以对象的格式传入
 * @token: token
 */
function Put(url, data) {
    let Put = wxPromisify(wx.request);
    // var token = app.globalData.userInfo.token;

    return Put({
        url: url,
        method: 'PUT',
        data: data,
        header: {
            "content-type": "application/x-www-form-urlencoded",
            // 'Access-Token': token
        }
    });
}

/**
 * 微信请求delete封装
 * @url: 接口地址
 * @data：以对象的格式传入
 * @token: token
 */
function Delete(url, data) {
    let Delete = wxPromisify(wx.request);
    // var token = app.globalData.userInfo.token;
    return Delete({
        url: url,
        method: 'DELETE',
        data: data,
        header: {
            "content-type": "application/x-www-form-urlencoded",
            // 'Access-Token': token
        }
    });
}

module.exports = {
    Post: Post,
    postJson: postJson,
    Get: Get,
    Put: Put,
    Delete: Delete
}