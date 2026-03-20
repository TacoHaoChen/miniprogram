function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

require("../../../utils/2E3B3D2778504FCF485D552066D70344.js");

var t, e = require("../../../utils/9B5BE36378504FCFFD3D8B64AC670344.js").siteroot.split("/"), s = e[0] + "//" + e[2], o = getApp(), i = null;

Page({
    data: (t = {
        userOne: {
            class: "",
            status: !0
        },
        userTwo: {
            class: "",
            status: !0
        },
        audioStatus: getApp().globalData.settings.voiceChecked,
        playOneNum: 0,
        playTwoNum: 0,
        isIpx: getApp().globalData.isIpx,
        overStatus: !1
    }, a(t, "audioStatus", getApp().globalData.settings.voiceChecked), a(t, "playOneAudio", ""), 
    a(t, "playTwoAudio", ""), t),
    onLoad: function(a) {
        var t = wx.createInnerAudioContext(), e = wx.createInnerAudioContext();
        t.src = s + "/addons/aaa_danmu/resource/bidaxiao/shaizi.mp3", e.src = s + "/addons/aaa_danmu/resource/bidaxiao/shaizi.mp3", 
        this.setData({
            playOneAudio: t,
            playTwoAudio: e,
            audioStatus: getApp().globalData.settings.voiceChecked
        });
    },
    startClick: function(a) {
        var t = this, e = a.currentTarget.dataset.play, s = Math.floor(6 * Math.random() + 1);
        if (!t.data.overStatus) if (1 == e) {
            if (!t.data.userOne.status) return;
            t.data.audioStatus && (t.data.playOneAudio.stop(), t.data.playOneAudio.play()), 
            s == t.data.playTwoNum && (1 != s && 6 != s ? s -= 1 : 1 == s ? s += 1 : 6 == s && (s -= 1)), 
            t.setData({
                "userOne.class": "active" + s,
                "userOne.status": !1,
                playOneNum: s
            });
        } else if (2 == e) {
            if (!t.data.userTwo.status) return;
            t.data.audioStatus && (t.data.playTwoAudio.stop(), t.data.playTwoAudio.play()), 
            s == t.data.playOneNum && (1 != s && 6 != s ? s -= 1 : 1 == s ? s += 1 : 6 == s && (s -= 1)), 
            t.setData({
                "userTwo.class": "active" + s,
                "userTwo.status": !1,
                playTwoNum: s
            });
        }
    },
    calcResult: function(a) {
        var t = this, e = a.currentTarget.dataset.play;
        if (1 == e ? t.data.playOneAudio.stop() : 2 == e && t.data.playTwoAudio.stop(), 
        t.data.playOneNum > 0 && t.data.playTwoNum > 0 && t.setData({
            overStatus: !0
        }), !o.globalData.isSign2) {
            var s = wx.getStorageSync("isSign2");
            if (2 == s) wx.setStorageSync("isSign2", parseInt(0)), console.log("currentTimes0:", s); else {
                var i = parseInt(s + 1);
                wx.setStorageSync("isSign2", i), console.log("currentTimes1:", s);
            }
        }
    },
    restart: function() {
        this.setData({
            playOneNum: 0,
            playTwoNum: 0,
            overStatus: !1,
            "userOne.class": "",
            "userOne.status": !0,
            "userTwo.class": "",
            "userTwo.status": !0,
            sArray: [ 1, 2, 3, 4, 5, 6 ]
        });
    },
    closeMuisc: function() {
        var a = this;
        a.setData({
            audioStatus: !a.data.audioStatus
        });
    },
    onShareAppMessage: function() {},
    onExit: function() {
        wx.navigateBack();
    },
    onShow: function() {
        i && i.show().catch(function(a) {
            console.error(a);
        });
    },
    preChaping: function() {
        var a = getApp().inGetAdvtype().kv;
        wx.createInterstitialAd && void 0 != a && a.chaping.length && ((i = wx.createInterstitialAd({
            adUnitId: a.chaping
        })).onLoad(function() {}), i.onError(function(a) {}), i.onClose(function() {}));
    }
});