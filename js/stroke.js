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
    strokeTemplate: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, method) {
        x = sKeyIsDown? initialX: mouseX;
        y = aKeyIsDown? initialY: mouseY;

        this.style[method](x, y);

        mirrorX = this.canvas.width - x;
        mirrorY = this.canvas.height - y;

        if(xMirrorIsDown) {
            this.xMirrorStyle[method](mirrorX, y);
        }

        if(yMirrorIsDown) {
            this.yMirrorStyle[method](x, mirrorY);
        }

        if((xMirrorIsDown && yMirrorIsDown) || xyMirrorIsDown) {
            this.xyMirrorStyle[method](mirrorX, mirrorY);
        }
    },
    strokeStart: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY) {
        this.strokeTemplate(mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, 'strokeStart');
    },
    stroke: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY) {
        this.strokeTemplate(mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, 'stroke');
    },
    strokeEnd: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY) {
        this.strokeTemplate(mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, 'strokeEnd');
    }
};