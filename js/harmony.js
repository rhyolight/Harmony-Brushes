var i, style, xMirrorStyle, yMirrorStyle, xyMirrorStyle,
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
controlKeyIsDown = false,
xMirrorIsDown = false,
yMirrorIsDown = false;
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
    menu.xMirror.addEventListener("click", onMenuXMirror, false);
    menu.yMirror.addEventListener("click", onMenuYMirror, false);
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
                xMirrorStyle = eval("new " + STYLES[i] + "(context)"); // XXX: hack
                yMirrorStyle = eval("new " + STYLES[i] + "(context)"); // XXX: hack
                xyMirrorStyle = eval("new " + STYLES[i] + "(context)"); // XXX: hack
                menu.selector.selectedIndex = i;
                break
            }
        }
    }
    if (!style) {
        style = eval("new " + STYLES[0] + "(context)");
        xMirrorStyle = eval("new " + STYLES[0] + "(context)"); // XXX: hack
        yMirrorStyle = eval("new " + STYLES[0] + "(context)"); // XXX: hack
        xyMirrorStyle = eval("new " + STYLES[0] + "(context)"); // XXX: hack
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
    switch (a.keyCode) {
    case 16:
        if(controlKeyIsDown) {
            controlKeyIsDown = false;
            foregroundColorSelector.container.style.visibility = "hidden";
        }
        else {
            controlKeyIsDown = true;
            foregroundColorSelector.container.style.left = mouseX - 125 + "px";
            foregroundColorSelector.container.style.top = mouseY - 125 + "px";
            foregroundColorSelector.container.style.visibility = "visible";
        }
        break
    }
}
function onDocumentKeyUp(a) {
    //switch (a.keyCode) {
    //case 16:
        //break
    //}
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
function onMenuXMirror() {
    // XXX: this should set button state to pressed/released via css class
    xMirrorIsDown = !xMirrorIsDown;
}
function onMenuYMirror() {
    // XXX: this should set button state to pressed/released via css class
    yMirrorIsDown = !yMirrorIsDown;
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
    style = eval("new " + STYLES[menu.selector.selectedIndex] + "(context)");
    xMirrorStyle = eval("new " + STYLES[menu.selector.selectedIndex] + "(context)"); // XXX: hack
    yMirrorStyle = eval("new " + STYLES[menu.selector.selectedIndex] + "(context)"); // XXX: hack
    xyMirrorStyle = eval("new " + STYLES[menu.selector.selectedIndex] + "(context)"); // XXX: hack
}
function onMenuAbout(a) {
    cleanPopUps();
    isAboutVisible = true;
    about.show()
}
function onCanvasMouseDown(a) {
    cleanPopUps();
    isMouseDown = true;

    style.strokeStart(mouseX, mouseY);

    if(xMirrorIsDown) {
        mirrorX = canvas.width - mouseX;
        xMirrorStyle.strokeStart(mirrorX, mouseY);
    }

    if(yMirrorIsDown) {
        mirrorY = canvas.height - mouseY;
        yMirrorStyle.strokeStart(mouseX, mirrorY);
    }

    if(xMirrorIsDown && yMirrorIsDown) {
        xyMirrorStyle.strokeStart(mirrorX, mirrorY);
    }
}
function onCanvasMouseUp(a) {
    isMouseDown = false;
    style.strokeEnd(mouseX, mouseY)

    if(xMirrorIsDown) {
        mirrorX = canvas.width - mouseX;
        xMirrorStyle.strokeEnd(mirrorX, mouseY);
    }

    if(yMirrorIsDown) {
        mirrorY = canvas.height - mouseY;
        yMirrorStyle.strokeEnd(mouseX, mirrorY);
    }

    if(xMirrorIsDown && yMirrorIsDown) {
        xyMirrorStyle.strokeEnd(mirrorX, mirrorY);
    }
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

    if(xMirrorIsDown) {
        mirrorX = canvas.width - mouseX;
        xMirrorStyle.stroke(mirrorX, mouseY);
    }

    if(yMirrorIsDown) {
        mirrorY = canvas.height - mouseY;
        yMirrorStyle.stroke(mouseX, mirrorY);
    }

    if(xMirrorIsDown && yMirrorIsDown) {
        xyMirrorStyle.stroke(mirrorX, mirrorY);
    }
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