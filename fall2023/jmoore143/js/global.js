function downloadDebug(name) {
    console.debug(`%c${name} %cnot included. importing...`, "font-style: bold;font-size:20px;");
}

function loadScripts() {
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
function makeTOC(...args) {
    let toc = createElement("div", {
        id: "toc_container"
    });
    function recurse(data){
        if(Array.isArray(data)){
            return createElement("ul").add(
                ...data.map(e=>recurse(e))
            );
        }
        return createElement("li").add(
            createElement("a", {
                innerHTML: data.text,
                href: data.link,
            })
        );
    }
    let ul = createElement("ul");
    ul.add(...args.map(e=>recurse(e)));
    toc.add(ul);
    return toc;
}
window.onload = loadScripts;