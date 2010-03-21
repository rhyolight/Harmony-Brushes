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

        this.xMirror = document.createElement("span");
        this.xMirror.className = "button";
        this.xMirror.innerHTML = "X-Mirror";
        this.container.appendChild(this.xMirror);

        this.yMirror = document.createElement("span");
        this.yMirror.className = "button";
        this.yMirror.innerHTML = "Y-Mirror";
        this.container.appendChild(this.yMirror);

        this.xyMirror = document.createElement("span");
        this.xyMirror.className = "button";
        this.xyMirror.innerHTML = "Radial Mirror";
        this.container.appendChild(this.xyMirror);

        d = document.createTextNode(" | ");
        this.container.appendChild(d);
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
