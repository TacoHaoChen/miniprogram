       // 在页面中定义插屏广告
       let interstitialAd = null
//index.js
//获取应用实例
const app = getApp()
Page({
  takePhoto() {
    wx.navigateTo({
      url: '/pages/index/index', //跳转到自定义的一个拍照页面
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    attentionAnim: null,
    isIphone: !1,
    releState: !1,
    showMoreApp: !1,
    wordLeft: 620,
    transitNum: 3,
    hourNum: 12,
    minuteNum: 12,
    isShowDot: !1,
    userInfo: {},
    hasUserInfo: !1,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
},
openRelevanceBlock: function() {
    this.setData({
        releState: !0
    });
},
remove: function() {
    this.setData({
        releState: !1
    });
},
appid: function() {
    var t = this;
    wx.setClipboardData({
        data: t.data.appid,
        success: function(t) {},
        fail: function(t) {}
    });
},
getData: function() {
    var t = this, e = new Date(), n = e.getFullYear(), a = e.getMonth(), o = e.getDate(), i = e.getHours();
    n > 2019 || a > 6 || o > 2 ? t.setData({
        showMoreApp: !0
    }) : (n > 2019 || a > 6 || o > 1) && i >= 12 && t.setData({
        showMoreApp: !0
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = this;
    a.getData(), a.setData({
        wordLeft: -300
    }), t = setInterval(function() {
        a.data.wordLeft > 0 ? a.setData({
            wordLeft: -300
        }) : (a.setData({
            transitNum: 0,
            wordLeft: 620
        }), setTimeout(function() {
            a.setData({
                transitNum: 3
            });
        }, 3050));
    }, 3100), e = setInterval(function() {
        var t = new Date(), e = ("0" + t.getHours()).slice(-2), n = ("0" + t.getMinutes()).slice(-2);
        a.setData({
            hourNum: e,
            minuteNum: n
        }), a.data.isShowDot ? a.setData({
            isShowDot: !1
        }) : a.setData({
            isShowDot: !0
        });
    }, 500), wx.getSystemInfo({
        success: function(t) {
            "android" == t.platform ? a.setData({
                isIphone: !1
            }) : a.setData({
                isIphone: !0
            });
        }
    });
    var o = wx.createAnimation({
        duration: 500,
        timingFunction: "linear",
        delay: 0
    });
    a.attentionAnim = o;
    var i = !0;
    setInterval(function() {
        i ? (a.attentionAnim.left(3).step(), i = !i) : (a.attentionAnim.left(6).step(), 
        i = !i), a.setData({
            attentionAnim: o.export()
        });
    }.bind(a), 500);
    // 在页面onLoad回调事件中创建插屏广告实例
if (wx.createInterstitialAd) {
  interstitialAd = wx.createInterstitialAd({
    adUnitId: ''
  })
  interstitialAd.onLoad(() => {})
  interstitialAd.onError((err) => {})
  interstitialAd.onClose(() => {})
}

// 在适合的场景显示插屏广告
setInterval(() => {
if (interstitialAd) {
  interstitialAd.show().catch((err) => {
    console.error(err)
  })
}
}, 6000)
  

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
    return{
      title:'哇塞！大家以后都用这个拍照吧！',
      path:'',
      imageUrl:'',
   
    } 
   },

   onShareTimeline() {
    return {
      title: '墙裂推荐：这款最近超火的水印相机，拍照自动加时间、地点、经纬度，工作生活打卡必备',
      query: ''
    }
  },
   goToPage1: function () {
    wx.navigateTo({
      url: '/pages/xiangce/xiangce',
    })
  }
})