var n = null;

Page({
    data: {},
    onLoad: function(o) {
        var t = o.path;
        (n = this.selectComponent("#cropper")).fnInit({
            imagePath: t,
            debug: !0,
            outputFileType: "jpg",
            quality: 1,
            aspectRatio: .75,
            minBoxWidthRatio: .2,
            minBoxHeightRatio: .2,
            initialBoxWidthRatio: 1,
            initialBoxHeightRatio: .6
        });
    },
    fnCancel: function() {
        console.log("cancel"), wx.navigateBack({
            delta: 1
        });
    },
    fnSubmit: function() {
        console.log("submit"), n.fnCrop({
            success: function(n) {
                var o = n.tempFilePath;
                console.log(n), console.log(n.tempFilePath);
                var t = getCurrentPages();
                t[t.length - 2].setData({
                    src: o,
                    ispaizhao: !1
                }), wx.navigateBack({
                    delta: 1
                });
            },
            fail: function(n) {
                console.log(n);
            },
            complete: function() {}
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