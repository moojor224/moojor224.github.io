function downloadDebug(name) {
    console.debug(`%c${name} %cnot included. importing...`, "font-style: bold;font-size:20px;");
}

function loadScripts() {
    if (!document.head.querySelector("link[href='/fall2023/jmoore143/css/themes.css']")) {
        downloadDebug("themes css file");
        var lnk = document.createElement("link");
        lnk.rel = "stylesheet";
        // lnk.href = "/fall2023/jmoore143/css/themes.css";
        document.head.append(lnk);
    }
    if (!document.head.querySelector("link[href='/fall2023/jmoore143/css/global.css']")) {
        downloadDebug("global css file");
        var lnk = document.createElement("link");
        lnk.rel = "stylesheet";
        // lnk.href = "/fall2023/jmoore143/css/global.css";
        document.head.append(lnk);
    }
    loadNav();
    setTheme();
}
async function loadNav() {
    console.debug("getting nav");
    await fetch("/fall2023/jmoore143/helpers/nav.html").then(r => {
        r.text().then(t => {
            // console.log(t);
            var nav;
            while (true) {
                if (!(nav = document.body.querySelector("nav"))) {
                    if (!(nav = document.querySelector("header"))) {
                        document.body.prepend(
                            createElement("header").add(nav = createElement("nav"))
                        );
                        break;
                    }
                    nav.prepend(nav = createElement("nav"));
                    break;
                }
                break;
            }
            nav.innerHTML = t;
            console.log(nav);
            var scr = nav.querySelector("script");
            var nw = document.createElement("script");
            nw.innerHTML = scr.innerHTML;
            scr.onload = function () {

            }
            scr.async = true;
            nav.insertBefore(nw, scr);
        });
    });
}
function setTheme() {
    if (!document.body.classList.contains("dark")) {
        // document.body.classList.add("dark");
    }
}
window.onload = loadScripts;