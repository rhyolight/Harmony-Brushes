function grid(a) {
    this.init(a)
}
grid.prototype = {
    context: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        if (RegExp(" AppleWebKit/").test(navigator.userAgent)) {
            this.context.globalCompositeOperation = "darker"
        }
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.01)"
    },
    stroke: function (f, d) {
        var e, a, g, c, b;
        a = Math.round(f / 100) * 100;
        g = Math.round(d / 100) * 100;
        c = (a - f) * 10;
        b = (g - d) * 10;
        for (e = 0; e < 50; e++) {
            this.context.beginPath();
            this.context.moveTo(a, g);
            this.context.quadraticCurveTo(f + Math.random() * c, d + Math.random() * b, a, g);
            this.context.stroke()
        }
    },
    strokeEnd: function (b, a) {}
};
