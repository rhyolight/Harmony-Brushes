function stringy(a) {
    this.init(a)
}
stringy.prototype = {
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
        this.points = new Array();
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.5)";
    },
    stroke: function (b, a) {
        var FACTOR = 10, 
            HISTORY = 15,
            sliced,
            e, oldStroke,
            c = b+(Math.random() - 0.5) * FACTOR,
            d = a+(Math.random() - 0.5) * FACTOR;
        if (this.count) {
            this.points.push([c, d]);
            this.context.beginPath();
            this.context.moveTo(this.prevMouseX, this.prevMouseY);
            this.context.lineTo(c, d);
            this.context.stroke();
            sliced = this.points.slice(this.points.length - HISTORY, this.points.length);
            for (e=0; e < sliced.length; e++) {
                oldStroke = this.context.strokeStyle;
                this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.15)";
                this.context.beginPath();
                this.context.moveTo(c,d);
                this.context.lineTo(sliced[e][0], sliced[e][1]);
                this.context.stroke();
                this.context.strokeStyle = oldStroke;
            }
            this.prevMouseX = c;
            this.prevMouseY = d            
        }
        this.count++;
    },
    strokeEnd: function (b, a) {}
};

