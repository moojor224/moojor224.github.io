(function () {
    let styleSheets = document.querySelectorAll("link[href*=\"custom_console\"");
    if (styleSheets.length == 0) {
        let link = createElement("link", {
            href: "/jmoore143/css/custom_console.css",
            rel: "stylesheet"
        });
        document.head.add(link);
    }

    let consoleContainer = createElement("div", {
        classList: "console"
    });
    /**
     * @type {HTMLDivElement}
     */
    let consoleDiv = createElement("div", {
        classList: "console-rows"
    });
    document.body.add(consoleContainer.add(consoleDiv));
    let styles = {
        string: "#d7d7db", // "white"
        number: "#86de74", // green
        boolean: "#75bfff", // blue
        "undefined": "darkgray",
        "null": "darkgray",
    };
    let maxDepth = 20;
    function walkElement(el) {
        let div = createElement("div");
    }
    function walkObject(obj) {
        let el = createElement("details");
        return el;
    }
    /**
     * 
     * @param {Function} func 
     */
    function processFunction(func) {
        let details = createElement("details", {
            classList: "console-function"
        });
        let summary = createElement("summary", {
            innerHTML: `function ${func.name}(){ ... }`
        });
        details.add(summary);
        details.add(
            createElement("div").add(
                createElement("span", { innerHTML: "arguments: " }),
                createElement("span", { innerHTML: func.arguments || undefined}),
                ),
            createElement("div").add(
                createElement("span", { innerHTML: "caller: " }),
                createElement("span", { innerHTML: func.caller || undefined }),
            ),
            createElement("div").add(
                createElement("span", { innerHTML: "length: " }),
                createElement("span", { innerHTML: func.length }),
            ),
            createElement("div").add(
                createElement("span", { innerHTML: "name: " }),
                createElement("span", { innerHTML: func.name }),
            ),
            createElement("div").add(
                createElement("span", { innerHTML: "prototype: " }),
                walkObject(Object.getPrototypeOf(func))
            ),
            createElement("div").add(
                createElement("span", { innerHTML: "prototype" }),
                walkObject(func.prototype)
            )
        );
        return details;
    }
    function addConsoleLog(logType, ...args) {
        // console.defaultLog("adding", logType, "to console", args);
        let el = createElement("div", {
            backgroundColor: `var(--${logType}-bg)`
        });
        el.add(createElement("div", {
            classList: "icon " + logType
        }));
        args.forEach(function (arg) {
            let type = (typeof arg).toLowerCase();
            if (["string", "number", "boolean", "undefined", "null"].includes(type)) {
                let argEl = createElement("span", {
                    style: {
                        color: styles[type]
                    },
                    innerHTML: arg
                });
                el.add(argEl);
            } else {
                if (arg instanceof HTMLElement) {
                    el.append(walkElement(arg));
                } else if (type == "function") {
                    el.append(processFunction(arg));
                } else if (Array.isArray(arg)) {
                    el.append(`[${arg}]`);
                }
            }
            el.append(createElement("pre", {
                innerHTML: " ",
                style: "padding:0;margin:0"
            }));
        });
        let scrollDown = false;
        if (consoleDiv.scrollHeight == (consoleDiv.scrollTop + parseInt(getComputedStyle(consoleDiv).height.split("px")[0]))) {
            scrollDown = true;
        }
        consoleDiv.append(el);
        if (scrollDown) {
            consoleDiv.scrollTop = consoleDiv.scrollHeight
        }
    }
    if (console.everything === undefined) {
        ["log", "warn", "error", "debug", "info"].forEach(e => {
            let d = "default" + e.split("")[0].toUpperCase() + e.substring(1);
            console[d] = console[e].bind(console);
            console[e] = function (...args) {
                addConsoleLog(e, ...args);
                console[d].apply(console, args);
            }
        });
    }

})();
// function createElement(tag = "span", data = {}) {
//     tag = typeof (tag) === "string" ? document.createElement(tag) : tag;
//     Object.keys(data).forEach(e => {
//         if (typeof data[e] === "object") {
//             createElement(tag[e] || (tag[e] = {}), data[e]);
//         } else {
//             if (tag instanceof HTMLElement && e.startsWith("on")) {
//                 tag.addEventListener(e.substring(2), data[e]);
//             } else {
//                 tag[e] = data[e];
//             }
//         }
//     });
//     return tag;
// }

window.Element.prototype.add = function (...args) {
    args.forEach(elem => {
        this.append(elem);
    });
    return this;
}
/**
 * 
 * @param {HTMLElement} el 
 */
function highlight(el) {
    let bounds = el.getBoundingClientRect();
    let div = createElement("div", {
        classList: "borderBlink",
        style: {
            position: "absolute",
            border: "1px solid red",
            top: bounds.y + "px",
            left: bounds.x + "px",
            width: bounds.width + "px",
            height: bounds.height + "px",
            boxSizing: "border-box"
        }
    });
    function onresize() {
        bounds = el.getBoundingClientRect();
        createElement(div, {
            style: {
                top: bounds.y + "px",
                left: bounds.x + "px",
                width: bounds.width + "px",
                height: bounds.height + "px",
                boxSizing: "border-box"
            }
        });
    }
    document.body.add(div);
    window.addEventListener("resize", onresize);
    document.body.addEventListener("resize", onresize);
    setTimeout(function () {
        div.remove();
        window.removeEventListener("resize", onresize);
        document.body.removeEventListener("resize", onresize);
    }, 5000);
}
