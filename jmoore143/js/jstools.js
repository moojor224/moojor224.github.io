// <!-- copyright Jordan Moore (jmoore143) -->
let createElement = window.createElement;
if (createElement === undefined) {
    createElement = function (tag = "span", data = {}) {
        tag = typeof (tag) === "string" ? document.createElement(tag) : tag;
        Object.keys(data).forEach(e => {
            if (typeof data[e] === "object") {
                createElement(tag[e] || (tag[e] = {}), data[e]);
            } else {
                tag[e] = data[e];
            }
        });
        return tag;
    }
}

window.Element.prototype.add = function (...args) {
    args.forEach(elem => {
        this.append(elem);
    });
    return this;
}
window.HTMLSelectElement.prototype.add = window.Element.prototype.add;

function displaySecs(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function extend(template, config) {
    let temp = Object.assign({}, template);
    Object.entries(config).forEach(function (entry) {
        if (temp[entry[0]] == undefined) {
            temp[entry[0]] = {};
        }
        if (entry[1].constructor.name == "Object") {
            temp[entry[0]] = extend(temp[entry[0]], entry[1]);
        } else {
            temp[entry[0]] = config[entry[0]];
        }
    });
    return temp;
}

function captureConsole() {
    if (console.everything === undefined) {
        console.everything = [];
        ["log", "warn", "error", "debug"].forEach(e => {
            let d = "default" + e.split("")[0].toUpperCase() + e.substring(1);
            console[d] = console[e].bind(console);
            console[e] = function (...args) {
                console.everything.push({
                    type: e,
                    datetime: Date().toLocaleString(),
                    value: args
                });
                console[d].apply(console, args);
            }
        });
    }
}