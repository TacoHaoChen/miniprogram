var t = require("../../@babel/runtime/helpers/interopRequireDefault")(require("../../@babel/runtime/helpers/defineProperty")), e = function(t) {
    a && console.log(t);
}, a = !1, i = null, o = 0, h = 0, n = 0, s = 0, c = 0, l = 0, d = 0, g = 0, f = 1, r = 0, x = 0, u = .15, b = .15, v = .6, p = .6, m = 0, H = 0, W = 0, T = 0, R = 0, w = 0;

Component({
    data: {
        imagePath: "",
        stageLeft: 0,
        stageTop: 0,
        stageWidth: 0,
        stageHeight: 0,
        boxWidth: 0,
        boxHeight: 0,
        boxLeft: 0,
        boxTop: 0,
        canvasWidth: 0,
        canvasHeight: 0
    },
    methods: {
        fnInit: function(m) {
            var H = this, W = m.imagePath;
            m.debug && (a = m.debug), m.minBoxWidthRatio && (u = m.minBoxWidthRatio), m.minBoxHeightRatio && (b = m.minBoxHeightRatio), 
            m.initialBoxWidthRatio && (v = m.initialBoxWidthRatio), m.initialBoxHeightRatio && (p = m.initialBoxHeightRatio), 
            m.aspectRatio && (i = m.aspectRatio), wx.createSelectorQuery().in(this).select(".layout").boundingClientRect(function(a) {
                e(a), a.left, a.top, o = a.width, h = a.height, wx.getImageInfo({
                    src: W,
                    success: function(a) {
                        var m;
                        e(a), d = a.width, g = a.height;
                        var T = d / g;
                        T >= o / h ? f = g / (l = (c = o) / T) : (l = h, f = d / (c = h * T)), n = (o - c) / 2, 
                        s = (h - l) / 2, r = c * u, x = l * b;
                        var R = c * v, w = l * p;
                        i && (w = R / i), w > l && (R = (w = l) * i);
                        var L = (c - R) / 2, B = (l - w) / 2;
                        H.setData((m = {
                            imagePath: W,
                            canvasWidth: 1 * d,
                            canvasHeight: 1 * g,
                            stageLeft: n,
                            stageTop: s,
                            stageWidth: c,
                            stageHeight: l
                        }, (0, t.default)(m, "stageHeight", l), (0, t.default)(m, "boxWidth", R), (0, t.default)(m, "boxHeight", w), 
                        (0, t.default)(m, "boxLeft", L), (0, t.default)(m, "boxTop", B), m));
                    }
                });
            }).exec();
        },
        fnTouchStart: function(t) {
            e("start"), e(t);
            var a = t.touches[0], i = a.pageX, o = a.pageY;
            R = i, w = o, m = this.data.boxLeft, H = this.data.boxTop, W = this.data.boxWidth, 
            T = this.data.boxHeight;
        },
        fnTouchMove: function(t) {
            e("move"), e(t);
            var a = t.target.id, o = t.touches[0], h = o.pageX, n = o.pageY, s = h - R, d = n - w;
            if ("box" == a) {
                var g = m + s, f = H + d;
                g < 0 && (g = 0), f < 0 && (f = 0), g + W > c && (g = c - W), f + T > l && (f = l - T), 
                this.setData({
                    boxLeft: g,
                    boxTop: f
                });
            } else if ("lt" == a) {
                i && (d = s / i);
                var u = m + s, b = H + d;
                u < 0 && (u = 0), b < 0 && (b = 0), m + W - u < r && (u = m + W - r), H + T - b < x && (b = H + T - x);
                var v = W - (u - m), p = T - (b - H);
                0 == b && i && 0 != u && (u = W - (v = p * i) + m), 0 == u && i && (b = T - (p = v / i) + H), 
                v == r && i && (b = T - (p = v / i) + H), this.setData({
                    boxTop: b,
                    boxLeft: u,
                    boxWidth: v,
                    boxHeight: p
                });
            } else if ("rt" == a) {
                i && (d = -s / i);
                var L = W + s;
                L < r && (L = r), m + L > c && (L = c - m);
                var B = H + d;
                B < 0 && (B = 0), H + T - B < x && (B = H + T - x);
                var D = T - (B - H);
                0 == B && i && L != c - m && (L = D * i), L == c - m && i && (B = T - (D = L / i) + H), 
                L == r && i && (B = T - (D = L / i) + H), this.setData({
                    boxTop: B,
                    boxHeight: D,
                    boxWidth: L
                });
            } else if ("lb" == a) {
                i && (d = -s / i);
                var M = m + s;
                M < 0 && (M = 0), m + W - M < r && (M = m + W - r);
                var y = W - (M - m), C = T + d;
                C < x && (C = x), H + C > l && (C = l - H), C == l - H && i && 0 != M && (M = W - (y = C * i) + m), 
                0 == M && i && (C = y / i), y == r && i && (C = y / i), this.setData({
                    boxLeft: M,
                    boxWidth: y,
                    boxHeight: C
                });
            } else if ("rb" == a) {
                i && (d = s / i);
                var P = W + s;
                P < r && (P = r), m + P > c && (P = c - m);
                var I = T + d;
                I < x && (I = x), H + I > l && (I = l - H), I == l - H && i && P != c - m && (P = I * i), 
                P == c - m && i && (I = P / i), P == r && i && (I = P / i), this.setData({
                    boxWidth: P,
                    boxHeight: I
                });
            }
        },
        fnTouchEnd: function(t) {
            e("end");
        },
        fnTouchCancel: function(t) {
            e("cancel");
        },
        fnCrop: function(t) {
            var e = this, a = function() {}, i = function() {}, o = function() {};
            null != t.success && (a = t.success), null != t.fail && (i = t.fail), null != t.complete && (o = t.complete);
            var h = e.data.imagePath, n = wx.createCanvasContext("canvas", e), s = e.data.boxLeft, c = e.data.boxTop, l = e.data.boxWidth, d = e.data.boxHeight, g = Math.ceil(s * f), r = Math.ceil(c * f), x = Math.ceil(l * f), u = Math.ceil(d * f), b = Math.ceil(1 * x), v = Math.ceil(1 * u);
            n.drawImage(h, g, r, x, u, 0, 0, b, v), n.draw(!1, function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: b,
                    height: v,
                    destWidth: x,
                    destHeight: u,
                    canvasId: "canvas",
                    fileType: "jpg",
                    quality: 1,
                    success: a,
                    fail: i,
                    complete: o
                }, e);
            });
        }
    }
});