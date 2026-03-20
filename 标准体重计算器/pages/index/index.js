getApp();

var t = null;

Page({
    STANDARD: 22,
    rules: [ [ 18.5, 24, 28 ], [ 18.5, 25, 30, 35, 40 ], [ 18.5, 23, 25, 30 ] ],
    ruleConfig: [ "偏瘦", "正常", "偏胖", "肥胖", "重度肥胖", "极重度肥胖" ],
    dangerConfig: [ "低（但其它疾病危险性增加）", "平均水平", "增加", "中度增加", "严重增加", "非常严重增加" ],
    data: {
        array: [ "中国标准", "国际标准", "亚洲标准" ],
        index: 0,
        score: 0,
        height: 0,
        weight: 0,
        physicalCondition: "未知",
        weightStandard: 0,
        danger: "未知",
        charLt: "<"
    },
    onLoad: function() {
        wx.createInterstitialAd && ((t = wx.createInterstitialAd({
            adUnitId: ""
        })).onLoad(function() {}), t.onError(function(t) {}), t.onClose(function() {}));
    },
    onShow: function() {
        t && t.show().catch(function(t) {
            console.error(t);
        });
    },
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        });
    },
    bindKeyHightInput: function(t) {
        this.setData({
            height: t.detail.value
        });
    },
    bindKeyWeightInput: function(t) {
        this.setData({
            weight: t.detail.value
        });
    },
    calculateBtn: function(t) {
        return this.data.height ? this.data.weight ? (this.calculate(), this.weightStandardCalculate(), 
        void this.physicalConditionCalculate()) : (wx.showToast({
            title: "请输入体重"
        }), !1) : (wx.showToast({
            title: "请输入身高"
        }), !1);
    },
    calculate: function() {
        var t, i = this.data.height / 100;
        t = (this.data.weight / (i * i)).toFixed(1), this.setData({
            score: t
        });
    },
    weightStandardCalculate: function() {
        var t, i = this.data.height / 100;
        t = (this.STANDARD * (i * i)).toFixed(1), this.setData({
            weightStandard: t
        });
    },
    physicalConditionCalculate: function() {
        var t = this.rules[this.data.index], i = 0, a = +this.data.score, e = t.length;
        if (a >= t[e - 1]) i = e; else for (var n = t.length; n >= 1; --n) a < t[n] && a >= t[n - 1] && (i = n);
        this.setData({
            physicalCondition: this.ruleConfig[i]
        }), this.setData({
            danger: this.dangerConfig[i]
        });
    },


    onShareAppMessage: function(t) {
        return {
            title: "标准体重计算器！测BMI指数！测一测你的体重够不够标准？",
            path: "/pages/index/index",
        };
    },
    onShareTimeline() {
        return {
          title: '标准体重计算器！测BMI指数！测一测你的体重够不够标准？',
          query: ''
        }
      }
});