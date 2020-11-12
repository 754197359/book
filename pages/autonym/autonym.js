const wxRequest = require('../../utils/wxRequest.js');
const update = require('../../config.js').update; //更新个人信息
const upload = require('../../config.js').upload; //上传图片
const getVipInfo = require('../../config.js').getVipInfo; 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    idcard:"",
    imgs: [],
    picPaths:[],//网络路径
    show1:false,
    show2:false,
    show3:false,
    show4:true,
    show5:true,
    show6:true,
    head:[],
    icon:"",
    head1:"",
    icon1:"",
    head2:"",
    icon2:"",
    isRealname:"",
    arr:"",
  },
//     // 上传图片
//     chooseImg: function (e) {
//       var that = this;
//       var imgs = this.data.imgs;
//       if (imgs.length >= 9) {
//         this.setData({
//           lenMore: 1
//         });
//         setTimeout(function () {
//           that.setData({
//             lenMore: 0
//           });
//         }, 2500);
//         return false;
//       }
      
//       wx.chooseImage({
//         count: 3, // 默认9
//         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//         success: function (res) {
//           // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//           var tempFilePaths = res.tempFilePaths;
//           var imgs = that.data.imgs;
//           // console.log(tempFilePaths + '----');
//           for (var i = 0; i < tempFilePaths.length; i++) {
//             if (imgs.length >= 9) {
//               that.setData({
//                 imgs: imgs
//               });
//               return false;
//             } else {
//               imgs.push(tempFilePaths[i]);
//             }
//           }
//           // console.log(imgs);
//           that.setData({
//             imgs: imgs
//           });
//         }
//       });
//     },
//     // 删除图片
//     deleteImg: function (e) {
//       var imgs = this.data.imgs;
//       var index = e.currentTarget.dataset.index;
//       imgs.splice(index, 1);
//       this.setData({
//         imgs: imgs
//       });
//     },
//     // 预览图片
//     previewImg: function (e) {
//       //获取当前图片的下标
//       var index = e.currentTarget.dataset.index;
//       //所有图片
//       var imgs = this.data.imgs;
//       wx.previewImage({
//         //当前显示图片
//         current: imgs[index],
//         //所有图片
//         urls: imgs
//       })
//     },
// // //添加上传图片
// chooseImageTap: function () {
//   var that = this;
//   wx.showActionSheet({
//     itemList: ['拍摄', '从相册中选择'],
//     itemColor: "#00000",
//     success: function (res) {
//       if (!res.cancel) {
//         if (res.tapIndex == 1) {
//           that.chooseWxImage('album')
//         } else if (res.tapIndex == 0) {
//           that.chooseWxImage('camera')
//         }
//       }
//     }
//   })
// },
// // // 图片本地路径
// chooseWxImage: function (type) {
//   var that = this;
//   var imgsPaths = that.data.imgs;
//   wx.chooseImage({
//     sizeType: ['original', 'compressed'],
//     sourceType: [type],
//     success: function (res) {

//       console.log(res.tempFilePaths);
//       that.setData({
//         imgs:res.tempFilePaths,
//         show1:true,
//         show4:false,
//       })
//       console.log(res.tempFilePaths);
//       that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
//     }
//   }) 
//   // console.log(this.data.imgs)
//   //console.log(this.data)
// },
// // //上传服务器
// upImgs: function (imgurl, index) {
//   var that = this;
//   wx.uploadFile({
//     url: '${upload}',//
//     filePath: imgurl,
//     name: 'file',
//     success: function (res) {
//       // console.log(res) //接口返回网络路径
//       console.log(res.data)
//       // var data = JSON.parse(res.data)
//       //   that.data.picPaths.push(data['msg'])
//       //   that.setData({
//       //     picPaths: that.data.picPaths
//       //   })
//         // console.log(that.data.picPaths)
//     }
//   })
// },
setPassInput1: function (e) {
  var that = this;
  that.setData({
    idcard: e.detail.value
  });
  console.log(that.data.idcard)
},
setPassInput: function (e) {
  var that = this;
  that.setData({
    name: e.detail.value
  });
  console.log(that.data.name)
},
onBackTap: function (e) {
  wx.navigateBack({
    //返回上一页面
    delta: 1,
  });
},
onPageScroll: function (e) {
  // console.log(e.scrollTop);
  var scrolltop = e.scrollTop;
  if (scrolltop >= 100) {
    this.setData({
      opacity: 1,
    });
  } else {
    this.setData({
      opacity: 0,
    });
  }
},
    // 删除图片
  deleteImg: function (e) {
  this.setData({
    head:"",
    show4:true, 
    show1:false,
    icon:""
  })
  },

  // 预览图片
  previewImg: function (e) {
    console.log(this.data.head)
    var words =this.data.head
    var words = words.split(",")
      wx.previewImage({
        //当前显示图片
        
        current:words,
        //所有图片
         urls: words
      })
  },
chooseImageTap: function () {
  var that = this;
  wx.showActionSheet({
    itemList: ['拍摄', '从相册中选择'],
    itemColor: "#00000",
    success: function (res) {
      if (!res.cancel) {
        if (res.tapIndex == 1) {
          that.chooseWxImage('album')
        } else if (res.tapIndex == 0) {
          that.chooseWxImage('camera')
        }
      }
    }
  })
},
chooseWxImage: function (type) {
  var that = this;
  var imgsPaths = that.data.imgs;
  wx.chooseImage({
    sizeType: ['original', 'compressed'],
    sourceType: [type],
    success: function (res) {
      // console.log(res)
      that.headimage(res.tempFilePaths) //调用上传方法
    }
  }) 
},
// 点击换手机相册或者电脑本地图片    
headimage: function (imgurl) {
  console.log(imgurl[0])
  var _this = this;
      wx.uploadFile({
        filePath: imgurl[0],
        name: 'file',
        url: 'https://dsh.ahytdata.com:4333/comm/upload',
        success:(res) =>{
          // debugger
          console.log(1)
          console.log(res)
          _this.setData({
            icon:res.data,
          })
        }
      })

      _this.setData({
        head: imgurl[0],
        show4:false,
        show1:true
      })
      console.log(_this.data.head)
},
/**证件反面 */
    // 删除图片
 deleteImg1: function (e) {
      this.setData({
        head1:"",
        show5:true, 
        show2:false,
        icon1:""
      })
      },
 // 预览图片
 previewImg1: function (e) {
  var words =this.data.head1
  var words = words.split(",")
  wx.previewImage({
    //当前显示图片
    current: words,
    //所有图片
    urls: words
  })
},
chooseImageTap1: function () {
var that = this;
wx.showActionSheet({
itemList: ['拍摄', '从相册中选择'],
itemColor: "#00000",
success: function (res) {
  if (!res.cancel) {
    if (res.tapIndex == 1) {
      that.chooseWxImage1('album')
    } else if (res.tapIndex == 0) {
      that.chooseWxImage1('camera')
    }
  }
}
})
},
chooseWxImage1: function (type) {
var that = this;
var imgsPaths = that.data.imgs;
wx.chooseImage({
sizeType: ['original', 'compressed'],
sourceType: [type],
success: function (res) {
  // console.log(res)
  that.headimage1(res.tempFilePaths) //调用上传方法
}
}) 
},
// 点击换手机相册或者电脑本地图片    
headimage1: function (imgurl) {
var _this = this;
  wx.uploadFile({
    filePath: imgurl[0],
    name: 'file',
    url: 'https://dsh.ahytdata.com:4333/comm/upload',
    success:(res) =>{
      console.log(res.data)
      _this.setData({
        icon1:res.data,
      })
    }
  })

  _this.setData({
    head1: imgurl[0],
    show5:false,
    show2:true
  })
  console.log(_this.data.icon1)
},
goToPage3:function(){
  wx.navigateTo({
    url: '/pages/shimingrenzheng1/shimingrenzheng1',
  })
},
  /**下一步 */
  goToPage2:function(){
    console.log(this.data.icon)
    if (this.data.icon == '' || this.data.icon == null) {
      wx.showToast({
        title: '请上传证件正面！',
        icon: 'none',
      })
      return false
    }
    if (this.data.icon1 == '' || this.data.icon1 == null) {
      wx.showToast({
        title: '请上传证件反面！',
        icon: 'none',
      })
      return false
    }
    if (this.data.icon2 == '' || this.data.icon2 == null) {
      wx.showToast({
        title: '请上传手持证件正面照！',
        icon: 'none',
      })
      return false
    }
    this.Get({
      "idCardFront":this.data.icon,
      "idCardBack": this.data.icon1,
      "idCardHand": this.data.icon2,
      "id": this.data.id,
      "idCard":this.data.idcard,
      "name":this.data.name
    })
    let userInfo=  wx.getStorageSync("userInfo");
    userInfo.idCardFront=this.data.head
    userInfo.idCardBack=this.data.head1
    userInfo.idCardHand=this.data.head2
    userInfo.isRealname=1
    wx.setStorageSync("userInfo", userInfo);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(wx.getStorageSync('userInfo'))
    that.setData({
      // name: wx.getStorageSync('userInfo').name,
      // idcard: wx.getStorageSync('userInfo').idCard,
      id:wx.getStorageSync('userInfo').id,
      head:wx.getStorageSync('userInfo').idCardFront,
      head1:wx.getStorageSync('userInfo').idCardBack,
      head2:wx.getStorageSync('userInfo').idCardHand,
      isRealname:wx.getStorageSync('userInfo').isRealname,
      icon:wx.getStorageSync('userInfo').idCardFront==null ? null:wx.getStorageSync('userInfo').idCardFront.slice(30),
      icon1:wx.getStorageSync('userInfo').idCardBack==null ? null:wx.getStorageSync('userInfo').idCardBack.slice(30),
      icon2:wx.getStorageSync('userInfo').idCardHand==null ? null:wx.getStorageSync('userInfo').idCardHand.slice(30),
      // icon:wx.getStorageSync('userInfo').icon.substring()
    });
    if(this.data.head =="" || this.data.head ==null){
      console.log(this.data.head)
      console.log("加载 数据")
      this.setData({
        show4:true,
        show1:false
      })
    }else{
      this.setData({
        show4:false,
        show1:true
      })
    }
    if(this.data.head1 =="" || this.data.head1 ==null){
      console.log(this.data.head)
      console.log("加载 数据1")
      this.setData({
        show5:true,
        show2:false
      })
    }else{
      this.setData({
        show5:false,
        show2:true
      })
    }
    if(this.data.head2 =="" || this.data.head2 ==null){
      console.log(this.data.head2)
      console.log("加载 数据2")
      this.setData({
        show6:true,
        show3:false
      })
    }else{
      this.setData({
        show6:false,
        show3:true
      })
    }
    // console.log(that.data.icon)
    wxRequest.Get(`${getVipInfo}/${this.data.id}`).then(res => {
      console.log(res)
      if(res.code==200){
        if(res.msg=="Success."){
          this.setData({
            arr:res.data,
             name: res.data.name,
            idcard: res.data.idCard,
          })
        }
      }
    })
  },

  //手持 
      // 删除图片
      deleteImg2: function (e) {
        this.setData({
          head2:"",
          show6:true, 
          show3:false,
          icon2:""
        })
        },
      
        // 预览图片
        previewImg2: function (e) {
          var words =this.data.head2
          var words = words.split(",")
            wx.previewImage({
              //当前显示图片
              current: words,
              //所有图片
              urls: words
            })
        },
      chooseImageTap2: function () {
        var that = this;
        wx.showActionSheet({
          itemList: ['拍摄', '从相册中选择'],
          itemColor: "#00000",
          success: function (res) {
            if (!res.cancel) {
              if (res.tapIndex == 1) {
                that.chooseWxImage2('album')
              } else if (res.tapIndex == 0) {
                that.chooseWxImage2('camera')
              }
            }
          }
        })
      },
      chooseWxImage2: function (type) {
        var that = this;
        var imgsPaths = that.data.imgs;
        wx.chooseImage({
          sizeType: ['original', 'compressed'],
          sourceType: [type],
          success: function (res) {
            // console.log(res)
            that.headimage2(res.tempFilePaths) //调用上传方法
          }
        }) 
      },
      // 点击换手机相册或者电脑本地图片    
      headimage2: function (imgurl) {
        var _this = this;
            wx.uploadFile({
              filePath: imgurl[0],
              name: 'file',
              url: 'https://dsh.ahytdata.com:4333/comm/upload',
              success:(res) =>{
                console.log(res.data)
                _this.setData({
                  icon2:res.data,
                })
              }
            })
      
            _this.setData({
              head2: imgurl[0],
              show6:false,
              show3:true
            })
            console.log(_this.data.head2)
      },
      /** */
      Get(data) {
        wxRequest.postJson(`${update}`, data).then(res => {
          // console.log(res.data.msg)
          if (res.code == 200) {
            wx.showToast({
              title: '上传成功！',
              duration: 2000,
              icon: 'none'
            });
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/shimingrenzheng1/shimingrenzheng1',
              })
            }, 1000);
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
    this.onLoad();
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