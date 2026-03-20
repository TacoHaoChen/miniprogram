Page({
    data: {
        adVideoOff: 1,
        headHeight: 0,
        menus: [ {
            name: "摇骰子",
            class: "all",
            page: "/pages/play/dice/index"
        }, {
            name: "比大小",
            class: "l",
            page: "/pages/play/size/index"
        }, {
            name: "喝酒神器",
            class: "r",
            page: "/pages/play/drink/index"
        }, {
            name: "酷炫闪屏",
            class: "l",
            page: "/pages/play/twinkle/index"
        }, {
            name: "右上角···添加小程序",
            class: "r",
            page: "/"
        } ]
    },
    onLoad: function(a) {},
    menuTap: function(a) {
        wx.navigateTo({
            url: a.currentTarget.dataset.page
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(s) {
                var e = wx.getMenuButtonBoundingClientRect();
                a.setData({
                    headHeight: e.bottom + e.top - s.statusBarHeight
                });
            }
        });
    },
    adVideoLoad: function() {
        console.log("小程序视频广告加载成功");
    },
    adVideoClose: function() {
        this.setData({
            adVideoOff: !1
        });
    },
    adError: function() {
        this.setData({
            adVideoOff: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
      return {
          title: "宝！一起来鸭！摇骰子",
          path: "pages/index/index"
      };
  },
  onShareTimeline: function() {
      return {
          title: "宝！一起来鸭！摇骰子"
      };
  },
  });