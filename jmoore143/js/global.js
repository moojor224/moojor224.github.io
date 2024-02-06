(function () {

    // <!-- copyright Jordan Moore (jmoore143) -->
    function downloadDebug(name) {
        console.debug(`%c${name} %cnot included. importing...`, "font-style: bold;font-size:20px;");
    }

    function loadScripts() {
        [setTheme, loadNav, loadFooter, loadImages].forEach(e => {
            try {
                e();
            } catch (err) { }
        });
    }

    function setTheme() {
        if (!document.body.classList.contains("dark")) {
            document.body.classList.add("dark");
        }
    }

    async function loadNav() {
        console.debug("getting nav");
        await fetch("/jmoore143/helpers/nav.html").then(r => {
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

    async function loadFooter() {
        console.debug("getting footer");
        await fetch("/jmoore143/helpers/footer.html").then(r => {
            r.text().then(text => {
                let footer;
                if (!(footer = document.querySelector("footer"))) {
                    footer = document.createElement("footer");
                    document.body.append(footer);
                }
                footer.innerHTML = text;
                console.log(footer);
                let scr = footer.querySelector("script");
                let nw = document.createElement("script");
                nw.innerHTML = scr.innerHTML;
                scr.onload = function () {

                }
                scr.async = true;
                footer.insertBefore(nw, scr);
            });
        });
    }

    function loadImages() {
        window.setInterval(function () {
            document.querySelectorAll("img[data-src]").forEach(i => {
                i.src = i.dataset.src;
                delete i.dataset.src;
            });
        }, 100);
    }

    function makeTOC(...args) {
        let toc = createElement("div", {
            id: "toc_container"
        });
        function recurse(data) {
            if (Array.isArray(data)) {
                return createElement("ul").add(
                    ...data.map(e => recurse(e))
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
        ul.add(...args.map(e => recurse(e)));
        toc.add(ul);
        return toc;
    }
    window.onload = loadScripts;
})()