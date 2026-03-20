Page({
    data: {
        lisisuju: !1
    },
    onLoad: function(n) {
        var t = this;
        wx.getStorage({
            key: "lisi",
            success: function(n) {
                t.setData({
                    lisisuju: n.data
                });
            }
        });
    },
    dianjitupian: function(n) {
        wx.previewImage({
            current: n.currentTarget.dataset.src,
            urls: this.data.lisisuju
        });
    },
    onReady: function() {},
    onShow: function() {
        var n = this;
        wx.getStorage({
            key: "lisi",
            success: function(t) {
                n.setData({
                    lisisuju: t.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});