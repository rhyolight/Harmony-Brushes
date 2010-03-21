function bargs(c) {
    var b, a = [];
    for (b = 1; b < arguments.length; b++) {
        a.push(arguments[b])
    }
    return function () {
        return c.apply(this, a)
    }
}

function ribbon(a) {
    this.init(a)
}
ribbon.prototype = {
    context: null,
    mouseX: null,
    mouseY: null,
    painters: null,
    interval: null,
    init: function (b) {
        this.context = b;
        this.context.lineWidth = 1;
        this.context.globalCompositeOperation = "source-over";
        this.mouseX = SCREEN_WIDTH / 2;
        this.mouseY = SCREEN_HEIGHT / 2;
        this.painters = new Array();
        for (var a = 0; a < 50; a++) {
            this.painters.push({
                dx: SCREEN_WIDTH / 2,
                dy: SCREEN_HEIGHT / 2,
                ax: 0,
                ay: 0,
                div: 0.1,
                ease: Math.random() * 0.2 + 0.6
            })
        }
        this.isDrawing = false;
        this.interval = setInterval(bargs(function (c) {
            c.update();
            return false
        }, this), 1000 / 60)
    },
    destroy: function () {
        clearInterval(this.interval)
    },
    strokeStart: function (c, a) {
        this.mouseX = c;
        this.mouseY = a;
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.05 )";
        for (var b = 0; b < this.painters.length; b++) {
            this.painters[b].dx = c;
            this.painters[b].dy = a
        }
        this.shouldDraw = true
    },
    stroke: function (b, a) {
        this.mouseX = b;
        this.mouseY = a
    },
    strokeEnd: function (b, a) {},
    update: function () {
        var a;
        for (a = 0; a < this.painters.length; a++) {
            this.context.beginPath();
            this.context.moveTo(this.painters[a].dx, this.painters[a].dy);
            this.painters[a].dx -= this.painters[a].ax = (this.painters[a].ax + (this.painters[a].dx - this.mouseX) * this.painters[a].div) * this.painters[a].ease;
            this.painters[a].dy -= this.painters[a].ay = (this.painters[a].ay + (this.painters[a].dy - this.mouseY) * this.painters[a].div) * this.painters[a].ease;
            this.context.lineTo(this.painters[a].dx, this.painters[a].dy);
            this.context.stroke()
        }
    }
};
