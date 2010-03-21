function circles(a) {
    this.init(a)
}
circles.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        this.context.globalCompositeOperation = "source-over";
        this.points = new Array()
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.prevMouseX = b;
        this.prevMouseY = a;
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.1)"
    },
    stroke: function (e, b) {
        var g, l, k, h, f, c, j, a;
        this.points.push([e, b]);
        l = e - this.prevMouseX;
        k = b - this.prevMouseY;
        h = Math.sqrt(l * l + k * k) * 2;
        f = Math.floor(e / 100) * 100 + 50;
        c = Math.floor(b / 100) * 100 + 50;
        j = Math.floor(Math.random() * 10);
        a = h / j;
        for (g = 0; g < j; g++) {
            this.context.beginPath();
            this.context.arc(f, c, (j - g) * a, 0, Math.PI * 2, true);
            this.context.stroke()
        }
        this.prevMouseX = e;
        this.prevMouseY = b
    },
    strokeEnd: function (b, a) {}
};

function chrome(a) {
    this.init(a)
}
chrome.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        if (RegExp(" AppleWebKit/").test(navigator.userAgent)) {
            this.context.globalCompositeOperation = "darker"
        }
        this.points = new Array();
        this.count = 0
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.prevMouseX = b;
        this.prevMouseY = a
    },
    stroke: function (f, c) {
        var e, b, a, g;
        this.points.push([f, c]);
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.1)";
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX, this.prevMouseY);
        this.context.lineTo(f, c);
        this.context.stroke();
        for (e = 0; e < this.points.length; e++) {
            b = this.points[e][0] - this.points[this.count][0];
            a = this.points[e][1] - this.points[this.count][1];
            g = b * b + a * a;
            if (g < 1000) {
                this.context.strokeStyle = "rgba(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", 0.1 )";
                this.context.beginPath();
                this.context.moveTo(this.points[this.count][0] + (b * 0.2), this.points[this.count][1] + (a * 0.2));
                this.context.lineTo(this.points[e][0] - (b * 0.2), this.points[e][1] - (a * 0.2));
                this.context.stroke()
            }
        }
        this.prevMouseX = f;
        this.prevMouseY = c;
        this.count++
    },
    strokeEnd: function (b, a) {}
};

function fur(a) {
    this.init(a)
}
fur.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        this.points = new Array();
        this.count = 0
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.prevMouseX = b;
        this.prevMouseY = a;
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.1)"
    },
    stroke: function (f, c) {
        var e, b, a, g;
        this.points.push([f, c]);
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX, this.prevMouseY);
        this.context.lineTo(f, c);
        this.context.stroke();
        for (e = 0; e < this.points.length; e++) {
            b = this.points[e][0] - this.points[this.count][0];
            a = this.points[e][1] - this.points[this.count][1];
            g = b * b + a * a;
            if (g < 2000 && Math.random() > g / 2000) {
                this.context.beginPath();
                this.context.moveTo(f + (b * 0.5), c + (a * 0.5));
                this.context.lineTo(f - (b * 0.5), c - (a * 0.5));
                this.context.stroke()
            }
        }
        this.prevMouseX = f;
        this.prevMouseY = c;
        this.count++
    },
    strokeEnd: function (b, a) {}
};

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

function longfur(a) {
    this.init(a)
}
longfur.prototype = {
    context: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        this.context.globalCompositeOperation = "source-over";
        this.points = new Array();
        this.count = 0
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.05 )"
    },
    stroke: function (g, c) {
        var f, e, b, a, h;
        this.points.push([g, c]);
        for (f = 0; f < this.points.length; f++) {
            e = -Math.random();
            b = this.points[f][0] - this.points[this.count][0];
            a = this.points[f][1] - this.points[this.count][1];
            h = b * b + a * a;
            if (h < 4000 && Math.random() > h / 4000) {
                this.context.beginPath();
                this.context.moveTo(this.points[this.count][0] + (b * e), this.points[this.count][1] + (a * e));
                this.context.lineTo(this.points[f][0] - (b * e) + Math.random() * 2, this.points[f][1] - (a * e) + Math.random() * 2);
                this.context.stroke()
            }
        }
        this.count++
    },
    strokeEnd: function (b, a) {}
};

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

function bargs(c) {
    var b, a = [];
    for (b = 1; b < arguments.length; b++) {
        a.push(arguments[b])
    }
    return function () {
        return c.apply(this, a)
    }
}
function shaded(a) {
    this.init(a)
}
shaded.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        this.context.globalCompositeOperation = "source-over";
        this.points = new Array();
        this.count = 0
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.prevMouseX = b;
        this.prevMouseY = a
    },
    stroke: function (f, c) {
        var e, b, a, g;
        this.points.push([f, c]);
        for (e = 0; e < this.points.length; e++) {
            b = this.points[e][0] - this.points[this.count][0];
            a = this.points[e][1] - this.points[this.count][1];
            g = b * b + a * a;
            if (g < 1000) {
                this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " + ((1 - (g / 1000)) * 0.1) + " )";
                this.context.beginPath();
                this.context.moveTo(this.points[this.count][0], this.points[this.count][1]);
                this.context.lineTo(this.points[e][0], this.points[e][1]);
                this.context.stroke()
            }
        }
        this.prevMouseX = f;
        this.prevMouseY = c;
        this.count++
    },
    strokeEnd: function (b, a) {}
};

function simple(a) {
    this.init(a)
}
simple.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    init: function (a) {
        this.context = a;
        this.context.globalCompositeOperation = "source-over";
        this.context.lineWidth = 0.5
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.prevMouseX = b;
        this.prevMouseY = a;
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.5)"
    },
    stroke: function (b, a) {
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX, this.prevMouseY);
        this.context.lineTo(b, a);
        this.context.stroke();
        this.prevMouseX = b;
        this.prevMouseY = a
    },
    strokeEnd: function (b, a) {}
};

function sketchy(a) {
    this.init(a)
}
sketchy.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        this.context.globalCompositeOperation = "source-over";
        this.points = new Array();
        this.count = 0
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.prevMouseX = b;
        this.prevMouseY = a
    },
    stroke: function (f, c) {
        var e, b, a, g;
        this.points.push([f, c]);
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.05)";
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX, this.prevMouseY);
        this.context.lineTo(f, c);
        this.context.stroke();
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.05 )";
        for (e = 0; e < this.points.length; e++) {
            b = this.points[e][0] - this.points[this.count][0];
            a = this.points[e][1] - this.points[this.count][1];
            g = b * b + a * a;
            if (g < 4000 && Math.random() > g / 2000) {
                this.context.beginPath();
                this.context.moveTo(this.points[this.count][0] + (b * 0.3), this.points[this.count][1] + (a * 0.3));
                this.context.lineTo(this.points[e][0] - (b * 0.3), this.points[e][1] - (a * 0.3));
                this.context.stroke();
            }
        }
        this.prevMouseX = f;
        this.prevMouseY = c;
        this.count++
    },
    strokeEnd: function (b, a) {}
};

function squares(a) {
    this.init(a)
}
squares.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    init: function (a) {
        this.context = a;
        this.context.globalCompositeOperation = "source-over";
        this.context.fillStyle = "rgb(255, 255, 255)";
        this.context.lineWidth = 1
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.prevMouseX = b;
        this.prevMouseY = a;
        this.context.strokeStyle = "rgb(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ")"
    },
    stroke: function (f, d) {
        var b, a, g, e, c;
        b = f - this.prevMouseX;
        a = d - this.prevMouseY;
        g = 1.57079633;
        e = Math.cos(g) * b - Math.sin(g) * a;
        c = Math.sin(g) * b + Math.cos(g) * a;
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX - e, this.prevMouseY - c);
        this.context.lineTo(this.prevMouseX + e, this.prevMouseY + c);
        this.context.lineTo(f + e, d + c);
        this.context.lineTo(f - e, d - c);
        this.context.lineTo(this.prevMouseX - e, this.prevMouseY - c);
        this.context.fill();
        this.context.stroke();
        this.prevMouseX = f;
        this.prevMouseY = d
    },
    strokeEnd: function (b, a) {}
};

function web(a) {
    this.init(a)
}
web.prototype = {
    context: null,
    prevMouseX: null,
    prevMouseY: null,
    points: null,
    count: null,
    init: function (a) {
        this.context = a;
        this.context.lineWidth = 1;
        this.context.globalCompositeOperation = "source-over";
        this.points = new Array();
        this.count = 0
    },
    destroy: function () {},
    strokeStart: function (b, a) {
        this.prevMouseX = b;
        this.prevMouseY = a
    },
    stroke: function (f, c) {
        var e, b, a, g;
        this.points.push([f, c]);
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.5)";
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX, this.prevMouseY);
        this.context.lineTo(f, c);
        this.context.stroke();
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.1)";
        for (e = 0; e < this.points.length; e++) {
            b = this.points[e][0] - this.points[this.count][0];
            a = this.points[e][1] - this.points[this.count][1];
            g = b * b + a * a;
            if (g < 2500 && Math.random() > 0.9) {
                this.context.beginPath();
                this.context.moveTo(this.points[this.count][0], this.points[this.count][1]);
                this.context.lineTo(this.points[e][0], this.points[e][1]);
                this.context.stroke()
            }
        }
        this.prevMouseX = f;
        this.prevMouseY = c;
        this.count++
    },
    strokeEnd: function (b, a) {}
};

function ColorSelector(a) {
    this.init(a)
}
ColorSelector.prototype = {
    container: null,
    hue: null,
    hueSelector: null,
    hueData: null,
    luminosity: null,
    luminositySelector: null,
    luminosityData: null,
    luminosityPosition: null,
    init: function (b) {
        var a;
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.width = "250px";
        this.container.style.height = "250px";
        this.container.style.visibility = "hidden";
        this.container.style.cursor = "pointer";
        this.hue = document.createElement("canvas");
        this.hue.width = b.width;
        this.hue.height = b.height;
        a = this.hue.getContext("2d");
        a.drawImage(b, 0, 0);
        this.hueData = a.getImageData(0, 0, this.hue.width, this.hue.height).data;
        this.container.appendChild(this.hue);
        this.luminosity = document.createElement("canvas");
        this.luminosity.style.position = "absolute";
        this.luminosity.style.left = "0px";
        this.luminosity.style.top = "0px";
        this.luminosity.width = 250;
        this.luminosity.height = 250;
        this.container.appendChild(this.luminosity);
        this.updateLuminosity([255, 255, 255]);
        this.hueSelector = document.createElement("canvas");
        this.hueSelector.style.position = "absolute";
        this.hueSelector.style.left = ((this.hue.width - 15) / 2) + "px";
        this.hueSelector.style.top = ((this.hue.height - 15) / 2) + "px";
        this.hueSelector.width = 15;
        this.hueSelector.height = 15;
        a = this.hueSelector.getContext("2d");
        a.lineWidth = 2;
        a.strokeStyle = "rgba(0, 0, 0, 0.5)";
        a.beginPath();
        a.arc(8, 8, 6, 0, Math.PI * 2, true);
        a.stroke();
        a.strokeStyle = "rgba(256, 256, 256, 0.8)";
        a.beginPath();
        a.arc(7, 7, 6, 0, Math.PI * 2, true);
        a.stroke();
        this.container.appendChild(this.hueSelector);
        this.luminosityPosition = [(b.width - 15), (b.height - 15) / 2];
        this.luminositySelector = document.createElement("canvas");
        this.luminositySelector.style.position = "absolute";
        this.luminositySelector.style.left = (this.luminosityPosition[0] - 7) + "px";
        this.luminositySelector.style.top = (this.luminosityPosition[1] - 7) + "px";
        a = this.luminositySelector.getContext("2d");
        a.drawImage(this.hueSelector, 0, 0);
        this.container.appendChild(this.luminositySelector)
    },
    show: function () {
        this.container.style.visibility = "visible"
    },
    hide: function () {
        this.container.style.visibility = "hidden"
    },
    updateLuminosity: function (g) {
        var d, e, l, b, a, k = 100,
            f = 120,
            h, j = 1080 / 2,
            c = Math.PI / 180;
        b = this.luminosity.width / 2;
        a = this.luminosity.height / 2;
        d = this.luminosity.getContext("2d");
        d.lineWidth = 3;
        d.clearRect(0, 0, this.luminosity.width, this.luminosity.height);
        for (h = 0; h < j; h++) {
            e = h / (j / 360) * c;
            l = 255 - (h / j) * 255;
            d.strokeStyle = "rgb(" + Math.floor(g[0] - l) + "," + Math.floor(g[1] - l) + "," + Math.floor(g[2] - l) + ")";
            d.beginPath();
            d.moveTo(Math.cos(e) * k + b, Math.sin(e) * k + a);
            d.lineTo(Math.cos(e) * f + b, Math.sin(e) * f + a);
            d.stroke()
        }
        this.luminosityData = d.getImageData(0, 0, this.luminosity.width, this.luminosity.height).data
    },
    update: function (g) {
        var b, k, f, c, h, a, j;
        b = (g.clientX - this.container.offsetLeft);
        k = (g.clientY - this.container.offsetTop);
        f = b - 125;
        c = k - 125;
        h = Math.sqrt(f * f + c * c);
        if (h < 90) {
            this.hueSelector.style.left = (b - 7) + "px";
            this.hueSelector.style.top = (k - 7) + "px";
            this.updateLuminosity([this.hueData[(b + (k * 250)) * 4], this.hueData[(b + (k * 250)) * 4 + 1], this.hueData[(b + (k * 250)) * 4 + 2]])
        } else {
            if (h > 100 && h < 120) {
                a = f / h;
                j = c / h;
                this.luminosityPosition[0] = (a * 110) + 125;
                this.luminosityPosition[1] = (j * 110) + 125;
                this.luminositySelector.style.left = (this.luminosityPosition[0] - 7) + "px";
                this.luminositySelector.style.top = (this.luminosityPosition[1] - 7) + "px"
            }
        }
    },
    getColor: function () {
        var a, b;
        a = Math.floor(this.luminosityPosition[0]);
        b = Math.floor(this.luminosityPosition[1]);
        return [this.luminosityData[(a + (b * 250)) * 4], this.luminosityData[(a + (b * 250)) * 4 + 1], this.luminosityData[(a + (b * 250)) * 4 + 2]]
    }
};

function Palette() {
    var f, e, b, a, q = 0,
        h = 90,
        o = 1080 / 2,
        n = 30,
        m, d = Math.PI / 180,
        l, k, p, g, r;
    f = document.createElement("canvas");
    f.width = 250;
    f.height = 250;
    b = f.width / 2;
    a = f.height / 2;
    m = (h - q) / n;
    e = f.getContext("2d");
    e.lineWidth = 3;

    function s(z, v, u) {
        var w, x, B, y, A, j, c, C;
        if (u == 0) {
            return [0, 0, 0]
        }
        z /= 60;
        v /= 100;
        u /= 100;
        y = Math.floor(z);
        A = z - y;
        j = u * (1 - v);
        c = u * (1 - (v * A));
        C = u * (1 - (v * (1 - A)));
        switch (y) {
        case 0:
            w = u;
            x = C;
            B = j;
            break;
        case 1:
            w = c;
            x = u;
            B = j;
            break;
        case 2:
            w = j;
            x = u;
            B = C;
            break;
        case 3:
            w = j;
            x = c;
            B = u;
            break;
        case 4:
            w = C;
            x = j;
            B = u;
            break;
        case 5:
            w = u;
            x = j;
            B = c;
            break
        }
        return [w, x, B]
    }
    for (l = 0; l < o; l++) {
        p = s(Math.floor((l / o) * 360), 100, 100);
        g = l / (o / 360) * d;
        for (k = 0; k < n; k++) {
            r = 255 - (k / n) * 255;
            e.strokeStyle = "rgb(" + Math.floor(p[0] * 255 + r) + "," + Math.floor(p[1] * 255 + r) + "," + Math.floor(p[2] * 255 + r) + ")";
            e.beginPath();
            e.moveTo(Math.cos(g) * (m * k + q) + b, Math.sin(g) * (m * k + q) + a);
            e.lineTo(Math.cos(g) * (m * (k + 1) + q) + b, Math.sin(g) * (m * (k + 1) + q) + a);
            e.stroke()
        }
    }
    return f
}
function Menu() {
    this.init()
}
Menu.prototype = {
    container: null,
    foregroundColor: null,
    backgroundColor: null,
    selector: null,
    save: null,
    clear: null,
    about: null,
    init: function () {
        var b, c, d, e = 15,
            a = 15;
        this.container = document.createElement("div");
        this.container.className = "gui";
        this.container.style.position = "absolute";
        this.container.style.top = "0px";
        this.foregroundColor = document.createElement("canvas");
        this.foregroundColor.style.marginBottom = "-3px";
        this.foregroundColor.style.cursor = "pointer";
        this.foregroundColor.width = e;
        this.foregroundColor.height = a;
        this.container.appendChild(this.foregroundColor);
        this.setForegroundColor([0, 0, 0]);
        c = document.createTextNode(" ");
        this.container.appendChild(c);
        this.backgroundColor = document.createElement("canvas");
        this.backgroundColor.style.marginBottom = "-3px";
        this.backgroundColor.style.cursor = "pointer";
        this.backgroundColor.width = e;
        this.backgroundColor.height = a;
        this.container.appendChild(this.backgroundColor);
        this.setBackgroundColor([250, 250, 250]);
        c = document.createTextNode(" ");
        this.container.appendChild(c);
        this.selector = document.createElement("select");
        for (i = 0; i < STYLES.length; i++) {
            b = document.createElement("option");
            b.id = i;
            b.innerHTML = STYLES[i].toUpperCase();
            this.selector.appendChild(b)
        }
        this.container.appendChild(this.selector);
        c = document.createTextNode(" ");
        this.container.appendChild(c);
        this.save = document.createElement("span");
        this.save.className = "button";
        this.save.innerHTML = "Save";
        this.container.appendChild(this.save);
        c = document.createTextNode(" ");
        this.container.appendChild(c);
        this.clear = document.createElement("Clear");
        this.clear.className = "button";
        this.clear.innerHTML = "Clear";
        this.container.appendChild(this.clear);
        d = document.createTextNode(" | ");
        this.container.appendChild(d);
        this.about = document.createElement("About");
        this.about.className = "button";
        this.about.innerHTML = "About";
        this.container.appendChild(this.about)
    },
    setForegroundColor: function (a) {
        var b = this.foregroundColor.getContext("2d");
        b.fillStyle = "rgb(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
        b.fillRect(0, 0, this.foregroundColor.width, this.foregroundColor.height);
        b.fillStyle = "rgba(0, 0, 0, 0.1)";
        b.fillRect(0, 0, this.foregroundColor.width, 1)
    },
    setBackgroundColor: function (a) {
        var b = this.backgroundColor.getContext("2d");
        b.fillStyle = "rgb(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
        b.fillRect(0, 0, this.backgroundColor.width, this.backgroundColor.height);
        b.fillStyle = "rgba(0, 0, 0, 0.1)";
        b.fillRect(0, 0, this.backgroundColor.width, 1)
    }
};

function About() {
    this.init()
}
About.prototype = {
    container: null,
    init: function () {
        var b, a;
        this.container = document.createElement("div");
        this.container.className = "gui";
        this.container.style.position = "absolute";
        this.container.style.top = "0px";
        this.container.style.visibility = "hidden";
        a = document.createElement("div");
        a.style.margin = "20px 20px";
        a.style.textAlign = "left";
        this.container.appendChild(a);
        b = document.createElement("p");
        b.style.textAlign = "center";
        b.innerHTML = '<strong>HARMONY</strong> v0.5 by <a href="http://twitter.com/mrdoob" target="_blank">Mr.doob</a>';
        a.appendChild(b);
        b = document.createElement("p");
        b.style.textAlign = "center";
        b.innerHTML = "Hold &lt;shift&gt; for colour palette";
        a.appendChild(b);
        b = document.createElement("p");
        b.style.textAlign = "center";
        b.innerHTML = '<a href="http://mrdoob.com/blog/post/689" target="_blank">More info</a>';
        a.appendChild(b);
        b = document.createElement("hr");
        a.appendChild(b);
        b = document.createElement("p");
        b.innerHTML = '<em>Sketchy</em>, <em>Shaded</em>, <em>Chrome</em>, <em>Fur</em>, <em>LongFur</em> and <em>Web</em> are all variations of the neighbour points connection concept. First implemented in <a href="http://www.zefrank.com/scribbler/" target="_blank">The Scribbler</a>.';
        a.appendChild(b);
        b = document.createElement("p");
        b.innerHTML = "If you like the tool, you can use this button to share your love ;)";
        a.appendChild(b);
        b = document.createElement("p");
        b.style.textAlign = "center";
        b.innerHTML = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="VY7767JMMMYM4"><input type="image" src="https://www.paypal.com/en_GB/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online."><img alt="" border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1"></form>';
        a.appendChild(b)
    },
    show: function () {
        this.container.style.visibility = "visible"
    },
    hide: function () {
        this.container.style.visibility = "hidden"
    }
};
var i, style, STYLES = ["sketchy", "shaded", "chrome", "fur", "longfur", "web", "", "simple", "squares", "ribbon", "", "circles", "grid", "", "stringy", "curvy"],
    COLOR = [0, 0, 0],
    BACKGROUND_COLOR = [250, 250, 250],
    SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight,
    container, foregroundColorSelector, backgroundColorSelector, menu, about, canvas, flattenCanvas, context, mouseX = 0,
    mouseY = 0,
    isForegroundColorSelectorVisible = false,
    isBackgroundColorSelectorVisible = false,
    isAboutVisible = false;
isForegroundColorSelectorMouseDown = false,
isBackgroundColorSelectorMouseDown = false,
isMenuMouseOver = false,
isMouseDown = false,
controlKeyIsDown = false;
init();

function init() {
    var hash, palette;
    document.body.style.backgroundColor = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")";
    container = document.createElement("div");
    document.body.appendChild(container);
    canvas = document.createElement("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    canvas.style.cursor = "crosshair";
    container.appendChild(canvas);
    flattenCanvas = document.createElement("canvas");
    flattenCanvas.width = SCREEN_WIDTH;
    flattenCanvas.height = SCREEN_HEIGHT;
    palette = new Palette();
    foregroundColorSelector = new ColorSelector(palette);
    foregroundColorSelector.container.onmousedown = onForegroundColorSelectorMouseDown;
    foregroundColorSelector.container.onmouseup = onForegroundColorSelectorMouseUp;
    foregroundColorSelector.container.onmousemove = onForegroundColorSelectorMouseMove;
    container.appendChild(foregroundColorSelector.container);
    backgroundColorSelector = new ColorSelector(palette);
    backgroundColorSelector.container.onmousedown = onBackgroundColorSelectorMouseDown;
    backgroundColorSelector.container.onmouseup = onBackgroundColorSelectorMouseUp;
    backgroundColorSelector.container.onmousemove = onBackgroundColorSelectorMouseMove;
    container.appendChild(backgroundColorSelector.container);
    menu = new Menu();
    menu.foregroundColor.addEventListener("click", onMenuForegroundColor, false);
    menu.backgroundColor.addEventListener("click", onMenuBackgroundColor, false);
    menu.selector.onchange = onMenuSelectorChange;
    menu.save.addEventListener("click", onMenuSave, false);
    menu.clear.addEventListener("click", onMenuClear, false);
    menu.about.addEventListener("click", onMenuAbout, false);
    menu.container.onmouseover = onMenuMouseOver;
    menu.container.onmouseout = onMenuMouseOut;
    container.appendChild(menu.container);
    context = canvas.getContext("2d");
    if (window.location.hash) {
        hash = window.location.hash.substr(1, window.location.hash.length);
        for (i = 0; i < STYLES.length; i++) {
            if (hash == STYLES[i]) {
                style = eval("new " + STYLES[i] + "(context)");
                menu.selector.selectedIndex = i;
                break
            }
        }
    }
    if (!style) {
        style = eval("new " + STYLES[0] + "(context)")
    }
    about = new About();
    container.appendChild(about.container);
    window.onresize = onWindowResize;
    window.onkeydown = onDocumentKeyDown;
    window.onkeyup = onDocumentKeyUp;
    document.onmousedown = onDocumentMouseDown;
    document.onmouseout = onCanvasMouseUp;
    canvas.onmousedown = onCanvasMouseDown;
    canvas.onmouseup = onCanvasMouseUp;
    canvas.onmousemove = onCanvasMouseMove;
    canvas.ontouchstart = onCanvasTouchStart;
    canvas.ontouchend = onCanvasTouchEnd;
    canvas.ontouchmove = onCanvasTouchMove;
    onWindowResize(null)
}
function onWindowResize(a) {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    menu.container.style.left = ((SCREEN_WIDTH - menu.container.offsetWidth) / 2) + "px";
    about.container.style.left = ((SCREEN_WIDTH - about.container.offsetWidth) / 2) + "px";
    about.container.style.top = ((SCREEN_HEIGHT - about.container.offsetHeight) / 2) + "px"
}
function onDocumentMouseDown(a) {
    return isMenuMouseOver
}
function onDocumentKeyDown(a) {
    if (controlKeyIsDown) {
        return
    }
    switch (a.keyCode) {
    case 16:
        controlKeyIsDown = true;
        foregroundColorSelector.container.style.left = mouseX - 125 + "px";
        foregroundColorSelector.container.style.top = mouseY - 125 + "px";
        foregroundColorSelector.container.style.visibility = "visible";
        break
    }
}
function onDocumentKeyUp(a) {
    switch (a.keyCode) {
    case 16:
        controlKeyIsDown = false;
        foregroundColorSelector.container.style.visibility = "hidden";
        break
    }
}
function onForegroundColorSelectorMouseDown(a) {
    isForegroundColorSelectorMouseDown = true
}
function onForegroundColorSelectorMouseUp(a) {
    isForegroundColorSelectorMouseDown = false;
    foregroundColorSelector.update(a);
    COLOR = foregroundColorSelector.getColor();
    menu.setForegroundColor(COLOR)
}
function onForegroundColorSelectorMouseMove(a) {
    if (!isForegroundColorSelectorMouseDown) {
        return
    }
    foregroundColorSelector.update(a);
    COLOR = foregroundColorSelector.getColor();
    menu.setForegroundColor(COLOR)
}
function onBackgroundColorSelectorMouseDown(a) {
    isBackgroundColorSelectorMouseDown = true
}
function onBackgroundColorSelectorMouseUp(a) {
    isBackgroundColorSelectorMouseDown = false;
    backgroundColorSelector.update(a);
    BACKGROUND_COLOR = backgroundColorSelector.getColor();
    menu.setBackgroundColor(BACKGROUND_COLOR);
    document.body.style.backgroundColor = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")"
}
function onBackgroundColorSelectorMouseMove(a) {
    if (!isBackgroundColorSelectorMouseDown) {
        return
    }
    backgroundColorSelector.update(a);
    BACKGROUND_COLOR = backgroundColorSelector.getColor();
    menu.setBackgroundColor(BACKGROUND_COLOR);
    document.body.style.backgroundColor = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")"
}
function onMenuForegroundColor(a) {
    cleanPopUps();
    foregroundColorSelector.show();
    foregroundColorSelector.container.style.left = ((SCREEN_WIDTH - foregroundColorSelector.container.offsetWidth) / 2) + "px";
    foregroundColorSelector.container.style.top = ((SCREEN_HEIGHT - foregroundColorSelector.container.offsetHeight) / 2) + "px";
    isForegroundColorSelectorVisible = true
}
function onMenuBackgroundColor(a) {
    cleanPopUps();
    backgroundColorSelector.show();
    backgroundColorSelector.container.style.left = ((SCREEN_WIDTH - backgroundColorSelector.container.offsetWidth) / 2) + "px";
    backgroundColorSelector.container.style.top = ((SCREEN_HEIGHT - backgroundColorSelector.container.offsetHeight) / 2) + "px";
    isBackgroundColorSelectorVisible = true
}
function onMenuSelectorChange(e) {
    if (STYLES[menu.selector.selectedIndex] == "") {
        return
    }
    style.destroy();
    style = eval("new " + STYLES[menu.selector.selectedIndex] + "(context)");
    window.location.hash = STYLES[menu.selector.selectedIndex]
}
function onMenuMouseOver(a) {
    isMenuMouseOver = true
}
function onMenuMouseOut(a) {
    isMenuMouseOver = false
}
function onMenuSave() {
    var a = flattenCanvas.getContext("2d");
    a.fillStyle = "rgb(" + BACKGROUND_COLOR[0] + ", " + BACKGROUND_COLOR[1] + ", " + BACKGROUND_COLOR[2] + ")";
    a.fillRect(0, 0, canvas.width, canvas.height);
    a.drawImage(canvas, 0, 0);
    window.open(flattenCanvas.toDataURL("image/png"), "mywindow")
}
function onMenuClear() {
    context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    style = eval("new " + STYLES[menu.selector.selectedIndex] + "(context)")
}
function onMenuAbout(a) {
    cleanPopUps();
    isAboutVisible = true;
    about.show()
}
function onCanvasMouseDown(a) {
    cleanPopUps();
    isMouseDown = true;
    style.strokeStart(mouseX, mouseY)
}
function onCanvasMouseUp(a) {
    isMouseDown = false;
    style.strokeEnd(mouseX, mouseY)
}
function onCanvasMouseMove(a) {
    if (!a) {
        a = window.event
    }
    mouseX = a.clientX;
    mouseY = a.clientY;
    if (!isMouseDown) {
        return
    }
    style.stroke(mouseX, mouseY)
}
function onCanvasTouchStart(a) {
    if (a.touches.length == 1) {
        var b = a.touches[0];
        style.strokeStart(b.pageX, b.pageY);
        return false
    }
}
function onCanvasTouchEnd(a) {
    if (a.touches.length == 1) {
        var b = a.touches[0];
        style.strokeEnd(b.pageX, b.pageY);
        return false
    }
}
function onCanvasTouchMove(a) {
    if (a.touches.length == 1) {
        var b = a.touches[0];
        style.stroke(b.pageX, b.pageY);
        return false
    }
}
function cleanPopUps() {
    if (isForegroundColorSelectorVisible) {
        foregroundColorSelector.hide();
        isForegroundColorSelectorVisible = false
    }
    if (isBackgroundColorSelectorVisible) {
        backgroundColorSelector.hide();
        isBackgroundColorSelectorVisible = false
    }
    if (isAboutVisible) {
        about.hide();
        isAboutVisible = false
    }
};