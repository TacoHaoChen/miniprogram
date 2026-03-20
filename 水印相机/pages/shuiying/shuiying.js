Page({
    data: {},
    onLoad: function(n) {},
    xuanzheshuiying: function(n) {
        getApp().globalData.shuiyingid = parseInt(n.currentTarget.dataset.id), wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});