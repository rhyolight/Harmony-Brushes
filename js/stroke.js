function project_coordinate(x1, y1, x2, y2, x3, y3) {
    var x0,y0;
    dx = x2 - x1;
    dy = y2 - y1;

    if((dx == 0) && (dy == 0)) {
        x0 = x1;
        y0 = y1;
    }
    else {
        t = ((x3 - x1) * dx + (y3 - y1) * dy) / (dx * dx + dy * dy);
        
        x0 = x1 + t * dx;
        y0 = y1 + t * dy;
    }

    return Array(x0, y0);
}

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
            initialX, initialY, targetX, targetY, method) {
        x = sKeyIsDown? initialX: mouseX;
        y = aKeyIsDown? initialY: mouseY;

        if(dKeyIsDown) {
            projection = project_coordinate(targetX, targetY, initialX,
                initialY, mouseX, mouseY);
            x = projection[0];
            y = projection[1];
        }

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
            initialX, initialY, targetX, targetY) {
        this.strokeTemplate(mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY, 'strokeStart');
    },
    stroke: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY) {
        this.strokeTemplate(mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY, 'stroke');
    },
    strokeEnd: function (mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY) {
        this.strokeTemplate(mouseX, mouseY, xMirrorIsDown, yMirrorIsDown,
            xyMirrorIsDown, aKeyIsDown, sKeyIsDown, dKeyIsDown,
            initialX, initialY, targetX, targetY, 'strokeEnd');
    }
};