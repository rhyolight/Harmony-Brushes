function curvy(a) {
    this.init(a)
}
curvy.prototype = {
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
    stroke: function (x,y) {
        var CTL_PNT1_DIST = 10, 
            CTL_PNT2_DIST = 20,
            START = 30,
            e, start, cOne, cTwo, oldStroke,
            sliced;
        
        this.points.push([x, y]);
        this.context.beginPath();
        this.context.moveTo(this.prevMouseX, this.prevMouseY);
        this.context.lineTo(x, y);
        this.context.stroke();
        
        function getPoint(xAgo, pnts) {
            var index = pnts.length - xAgo, i;
            for (i=index; i< pnts.length; i++) {
                if (pnts[i]) {
                    return pnts[i];
                }
            }
        }
        
        oldStroke = this.context.strokeStyle;
        this.context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", 0.15)";
        this.context.beginPath();
        start = getPoint(START, this.points);
        cOne = getPoint(CTL_PNT1_DIST, this.points);
        cTwo = getPoint(CTL_PNT2_DIST, this.points);
        this.context.moveTo(start[0],start[1]);
        this.context.bezierCurveTo(cOne[0], cOne[1], cTwo[0], cTwo[1], x, y);
        this.context.stroke();
        this.context.strokeStyle = oldStroke;
        
        this.prevMouseX = x;
        this.prevMouseY = y;
        this.count++;
    },
    strokeEnd: function (b, a) {}
};

