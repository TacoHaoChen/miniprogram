Page({
    data: {},
    onLoad: function(t) {
        var a = t.bz, i = t.IMEI, e = t.time, n = !0;
        "0" == t.istime && (n = !1, this.setData({
            time: e
        })), this.setData({
            bz: a,
            istime: n,
            time: e,
            IMEI: i
        }), this.setTime();
    },
    switchChange: function(t) {
        console.log(t.detail.value), this.setData({
            istime: t.detail.value
        });
    },
    huoqushijian: function() {
        var t = new Date(), a = t.getMonth();
        1 == (a = (a + 1).toString()).length && (a = "0" + a);
        var i = t.getDate();
        1 == (i = i.toString()).length && (i = "0" + i);
        var e = t.getHours();
        1 == (e = e.toString()).length && (e = "0" + e);
        var n = t.getMinutes();
        1 == (n = n.toString()).length && (n = "0" + n);
        var s = t.getSeconds();
        1 == (s = s.toString()).length && (s = "0" + s), this.setData({
            time: t.getFullYear() + "-" + a + "-" + i + " " + e + ":" + n + ":" + s
        });
    },
    setTime: function() {
        var t = this;
        setInterval(function() {
            t.data.istime && t.huoqushijian(), t.setData({
                shuiying: [ "经度：" + t.data.jd, "纬度：" + t.data.wd, "地点：" + t.data.xxdz, "时间：" + t.data.time, "备注：" + t.data.bz ]
            });
        }, 1e3);
    },
    shijianb: function(t) {
        this.setData({
            time: t.detail.value.trim()
        });
    },
    beizhub: function(t) {
        this.setData({
            bz: t.detail.value.trim()
        });
    },
    IMEIb: function(t) {
        this.setData({
            IMEI: t.detail.value.trim()
        });
    },
    baochun: function() {
        var t = getCurrentPages();
        t[t.length - 2].setData({
            istime: this.data.istime,
            time: this.data.time,
            bz: this.data.bz
        }), wx.navigateBack({
            delta: 1
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