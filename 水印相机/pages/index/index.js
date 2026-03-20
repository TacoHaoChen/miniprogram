var t = null;

Page({
    data: {
        isbaochun: !1,
        isdingwei: !1,
        isdingshi: 0,
        issgd: "off",
        ispaizhao: !0,
        src: "",
        jd: "未获取",
        wd: "未获取",
        bz: "点击设置",
        IMEI: "【水印相机】小程序拍摄",
        shuiying: [ "经度：正在定位", "纬度：正在定位", "地址：正在定位", "时间：正在获取", "相机：【水印相机】小程序拍摄", "标注：点击备注" ],
        istime: !0,
        issexiantou: "back"
    },
    onLoad: function(i) {
        var a = wx.getSystemInfoSync().windowWidth, n = wx.getSystemInfoSync().windowHeight;
        this.setData({
            w: 2 * a,
            h: a / 3 * 4 * 2,
            kh: 2 * n - a / 3 * 4 * 2,
            zbj: 2 * a * .0236,
            xmh: 2 * n - a / 3 * 4 * 2
          }), this.dingwei(), this.setTime(), wx.createRewardedVideoAd && ((t = wx.createRewardedVideoAd({
            adUnitId: ""
        })).onLoad(function() {
            console.log("onLoad event emit");
        }), t.onError(function(t) {
            console.log("onError event emit", t);
        }), t.onClose(function(t) {
            console.log("onClose event emit", t);
        }));
    },
    huoqushijian: function() {
        var t = new Date(), i = t.getMonth();
        1 == (i = (i + 1).toString()).length && (i = "0" + i);
        var a = t.getDate();
        1 == (a = a.toString()).length && (a = "0" + a);
        var n = t.getHours();
        1 == (n = n.toString()).length && (n = "0" + n);
        var s = t.getMinutes();
        1 == (s = s.toString()).length && (s = "0" + s);
        var e = t.getSeconds();
        1 == (e = e.toString()).length && (e = "0" + e), this.setData({
            time: t.getFullYear() + "-" + i + "-" + a + " " + n + ":" + s + ":" + e
        });
    },
    dingwei: function() {
        var t = this;
        this.setData({
            isdingwei: !0
        }), wx.getLocation({
            type: "gcj02",
            altitude: !0,
            isHighAccuracy: !0,
            highAccuracyExpireTime: 4e3,
            success: function(i) {
                console.log("定位成功"), t.dyditu(i.latitude, i.longitude), t.setData({
                    jd: i.longitude,
                    wd: i.latitude
                });
            }
        });
    },
    shanguang: function() {
        "off" == this.data.issgd ? this.setData({
            issgd: "torch"
        }) : this.setData({
            issgd: "off"
        });
    },
    dingshi: function() {
        0 == this.data.isdingshi ? this.setData({
            isdingshi: 5
        }) : this.setData({
            isdingshi: 0
        });
    },
    paizhao: function() {
        if (0 == this.data.isdingshi) this.paizhao1(); else var t = this, i = 5, a = setInterval(function() {
            0 == (i -= 1) ? (console.log("关闭定时，并拍照"), clearInterval(a), t.paizhao1(), t.setData({
                isdingshi: 5
            })) : t.setData({
                isdingshi: i
            });
        }, 1e3);
    },
    dyditu: function(t, i) {
        var a = this;
        wx.chooseLocation({
            latitude: t,
            longitude: i,
            success: function(t) {
                console.log("定位成功"), a.setData({
                    jd: t.longitude.toFixed(6),
                    wd: t.latitude.toFixed(6),
                    xxdz: t.name,
                    isdingwei: !1
                });
            }
        });
    },
    qiehuanxiangji: function() {
        "back" == this.data.issexiantou ? this.setData({
            issexiantou: "front"
        }) : this.setData({
            issexiantou: "back"
        });
    },
    paizhao1: function() {
        var t = this;
        wx.createCameraContext().takePhoto({
            quality: "high",
            success: function(i) {
                console.log("拍照"), console.log(i.tempImagePath), t.tianjiashuiying(i.tempImagePath), 
                t.setData({
                    src: i.tempImagePath,
                    ispaizhao: !1
                });
            }
        });
    },
    xianche: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: "original",
            sourceType: "album",
            success: function(i) {
                t.jiancai(i.tempFilePaths), t.tianjiashuiying(t.data.src);
            }
        });
    },
    jiancai: function(t) {
        console.log("跳转到剪裁"), wx.navigateTo({
            url: "/pages/cropper/cropper-img?path=" + t,
            success: function(t) {
                console.log("跳转成功");
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
   baocun: function() {
        var i = this;
        t.show().catch(function() {
            t.load().then(function() {
                return t.show();
            }).catch(function(t) {
                console.log("激励视频 广告显示失败");
            });
        }), t.onClose(function(t) {
            t && t.isEnded ? i.baocun1() : wx.showToast({
                title: "视频未播完"
            });
        });
    },
    baocun1: function() {
        var t = this;
        wx.getImageInfo({
            src: this.data.src,
            success: function(i) {
                var a = i.path;
                wx.saveImageToPhotosAlbum({
                    filePath: a,
                    success: function() {
                        wx.showToast({
                            title: "保存成功"
                        }), t.genxinglisi(a);
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "保存失败",
                            icon: "none"
                        });
                    }
                });
            }
        }), t.setData({
            src: "",
            isbaochun: !1,
            ispaizhao: !0
        });
    },
    genxinglisi: function(t) {
        var i = [];
        wx.getStorage({
            key: "lisi",
            success: function(a) {
                (i = a.data).unshift(t), wx.setStorage({
                    key: "lisi",
                    data: i
                });
            },
            fail: function(a) {
                i = [ t ], wx.setStorage({
                    key: "lisi",
                    data: i
                });
            }
        });
    },
    setTime: function() {
        var t = this;
        setInterval(function() {
            t.data.istime && t.huoqushijian(), t.setData({
                shuiying: [ "经度：" + t.data.jd, "纬度：" + t.data.wd, "地址：" + t.data.xxdz, "时间：" + t.data.time, "相机：" + t.data.IMEI, "备注：" + t.data.bz ]
            });
        }, 1e3);
    },
    banjishunying: function() {
        console.log("水印被点击");
        var t = "0";
        this.data.istime && (t = "1"), wx.navigateTo({
            url: "/pages/banjishunying/banjishunying?bz=" + this.data.bz + "&istime=" + t + "&time=" + this.data.time + "&IMEI=" + this.data.IMEI,
            success: function(t) {
                console.log("跳转成功");
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    tianjiashuiying: function(t) {
        var i = this, a = wx.createCanvasContext("myCanvas");
        wx.getImageInfo({
            src: t,
            success: function(t) {
                var n = t.width, s = t.height;
                a.drawImage(t.path, 0, 0, n, s, 0, 0, 435, 580);
                var e = i.data.shuiying.reverse();
                for (var o in e) a.beginPath(), a.setFontSize(16.5), a.setFillStyle("white"), a.fillText(e[o], 9, 566 - 22 * o);
                a.draw(!1, function() {
                    wx.canvasToTempFilePath({
                        canvasId: "myCanvas",
                        success: function(t) {
                            i.setData({
                                isbaochun: !0,
                                src: t.tempFilePath
                            });
                        }
                    });
                });
            }
        });
    },
    quxiao: function() {
        this.setData({
            src: "",
            isbaochun: !1,
            ispaizhao: !0
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this.data.src;
        "" != t && (console.log(t), this.tianjiashuiying(t));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});