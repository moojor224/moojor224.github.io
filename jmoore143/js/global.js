function downloadDebug(name){
    console.debug(`%c${name} %cnot included. importing...`, "font-style: bold;font-size:20px;");
}
function loadScripts() {
    if (!window.createElement) {
        downloadDebug("jstools");
        var scr = document.createElement("script");
        scr.src = "/jmoore143/js/jstools.js";
        document.head.append(scr);
    }
    if(!["0px", "0"].includes(window.getComputedStyle(document.body).margin)){
        downloadDebug("global styles");
        var lnk = document.createElement("link");
        lnk.rel = "stylesheet";
        lnk.href = "/jmoore143/css/global.css";
        document.head.append(lnk);
    }
    loadNav();
}
async function loadNav() {
    console.debug("getting nav");
    await fetch("/jmoore143/helpers/nav.html").then(r => {
        r.text().then(t => {
            var nav;
            while (true) {
                if (!(nav = document.body.querySelector("nav"))) {
                    if (!(nav = document.querySelector("header"))) {
                        document.body.prepend(
                            createElement("header").add(nav = createElement("nav"))
                        );
                        break;
                    }
                    nav.add(nav = createElement("nav"));
                    break;
                }
                break;
            }
            nav.innerHTML = t;

            var scr = document.querySelector("nav script");
            var nw = document.createElement("script");
            nw.innerHTML = scr.innerHTML;
            scr.onload = function () {

            }
            scr.async = true;
            nav.insertBefore(nw, scr);
        });
    });
}
window.onload = loadScripts;