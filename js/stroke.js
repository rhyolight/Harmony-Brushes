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
            xyMirrorIsDown) {
        this.style.strokeStart(mouseX, mouseY);

        mirrorX = this.canvas.width - mouseX;
        mirrorY = this.canvas.height - mouseY;

        if(xMirrorIsDown) {
            this.xMirrorStyle.strokeStart(mirrorX, mouseY);
        }

        if(yMirrorIsDown) {
            this.yMirrorStyle.strokeStart(mouseX, mirrorY);
        }

        if((xMirrorIsDown && yMirrorIsDown) || xyMirrorIsDown) {
            this.xyMirrorStyle.strokeStart(mirrorX, mirrorY);
        }
    },
    stroke: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown) {
        this.style.stroke(mouseX, mouseY)

        mirrorX = this.canvas.width - mouseX;
        mirrorY = this.canvas.height - mouseY;

        if(xMirrorIsDown) {
            this.xMirrorStyle.stroke(mirrorX, mouseY);
        }

        if(yMirrorIsDown) {
            this.yMirrorStyle.stroke(mouseX, mirrorY);
        }

        if((xMirrorIsDown && yMirrorIsDown) || xyMirrorIsDown) {
            this.xyMirrorStyle.stroke(mirrorX, mirrorY);
        }
    },
    strokeEnd: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown) {
        this.style.strokeEnd(mouseX, mouseY)

        mirrorX = this.canvas.width - mouseX;
        mirrorY = this.canvas.height - mouseY;

        if(xMirrorIsDown) {
            this.xMirrorStyle.strokeEnd(mirrorX, mouseY);
        }

        if(yMirrorIsDown) {
            this.yMirrorStyle.strokeEnd(mouseX, mirrorY);
        }

        if((xMirrorIsDown && yMirrorIsDown) || xyMirrorIsDown) {
            this.xyMirrorStyle.strokeEnd(mirrorX, mirrorY);
        }
    }
};