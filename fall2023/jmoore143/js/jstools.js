// <!-- copyright Jordan Moore (jmoore143) -->

function createElement(tag = "span", data = {}) {
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

window.Element.prototype.add = function (...args) {
    args.forEach(elem => {
        this.append(elem);
    });
    return this;
}

function displaySecs(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

function extend(template, config) {
    let temp = Object.assign({}, template);
    Object.entries(config).forEach(function(entry) {
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