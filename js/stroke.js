function StrokeManager(a) {
    this.init(a)
}
StrokeManager.prototype = {
    canvas: null,
    style: null,
    xMirrorStyle: null,
    yMirrorStyle: null,
    xyMirrorStyle: null,
    init: function (canvas) {
        this.canvas = canvas;
    },
    destroy: function () {},
    setStyle: function(styleClass, context) {
        this.style = eval("new " + styleClass + "(context)");
        this.xMirrorStyle = eval("new " + styleClass + "(context)");
        this.yMirrorStyle = eval("new " + styleClass + "(context)");
        this.xyMirrorStyle = eval("new " + styleClass + "(context)");
    },
    strokeStart: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY) {
        x = sKeyIsDown? initialX: mouseX;
        y = aKeyIsDown? initialY: mouseY;
        
        this.style.strokeStart(x, y);

        mirrorX = this.canvas.width - x;
        mirrorY = this.canvas.height - y;

        if(xMirrorIsDown) {
            this.xMirrorStyle.strokeStart(mirrorX, y);
        }

        if(yMirrorIsDown) {
            this.yMirrorStyle.strokeStart(x, mirrorY);
        }

        if((xMirrorIsDown && yMirrorIsDown) || xyMirrorIsDown) {
            this.xyMirrorStyle.strokeStart(mirrorX, mirrorY);
        }
    },
    stroke: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY) {
        x = sKeyIsDown? initialX: mouseX;
        y = aKeyIsDown? initialY: mouseY;

        this.style.stroke(x, y);

        mirrorX = this.canvas.width - x;
        mirrorY = this.canvas.height - y;

        if(xMirrorIsDown) {
            this.xMirrorStyle.stroke(mirrorX, y);
        }

        if(yMirrorIsDown) {
            this.yMirrorStyle.stroke(x, mirrorY);
        }

        if((xMirrorIsDown && yMirrorIsDown) || xyMirrorIsDown) {
            this.xyMirrorStyle.stroke(mirrorX, mirrorY);
        }
    },
    strokeEnd: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY) {
        x = sKeyIsDown? initialX: mouseX;
        y = aKeyIsDown? initialY: mouseY;

        this.style.strokeEnd(x, y)

        mirrorX = this.canvas.width - x;
        mirrorY = this.canvas.height - y;

        if(xMirrorIsDown) {
            this.xMirrorStyle.strokeEnd(mirrorX, y);
        }

        if(yMirrorIsDown) {
            this.yMirrorStyle.strokeEnd(x, mirrorY);
        }

        if((xMirrorIsDown && yMirrorIsDown) || xyMirrorIsDown) {
            this.xyMirrorStyle.strokeEnd(mirrorX, mirrorY);
        }
    },
};