// copyright Jordan Moore (jmoore143)
class Folder {
    name;
    subFiles = [];
    subFolders = [];
    constructor(name = "", items) {
        this.name = name;
        this.add(...items);
    }
    add(...items) {
        items.forEach(e => {
            if (["File", "Folder"].includes(e.constructor.name)) {
                this["sub" + e.constructor.name + "s"].push(e);
                e.parentFolder = this;Document
            } else {
                console.error(e, "is not a folder or file");
            }
        })
    }
    listify(top = false, fileCallback) {
        this.#sort();
        var dt = createElement("details").add(
            createElement("summary", {
                innerHTML: top ? `<h3>${this.name}</h3>` : this.name,
                classList: top ? "fileTree" : ""
            }),
            ...this.subFolders.map(e => e.listify(false)),
            createElement("ul").add(
                ...this.subFiles.map(e => e.listify(fileCallback))
            )
        );

        return dt;
    }
    #sort(ascend = false) {
        ascend = ascend ? -1 : 1
        this.subFiles = this.subFiles.sort((a, b) => {
            return ((a.name > b.name) ? (1 * ascend) : ((b.name > a.name) ? (-1 * ascend) : 0));
        });
        this.subFolders = this.subFolders.sort((a, b) => {
            return ((a.name > b.name) ? (1 * ascend) : ((b.name > a.name) ? (-1 * ascend) : 0));
        });
    }
}

class File {
    name;
    data;
    parentFolder;
    constructor(name = "", data = {}) {
        this.name = name;
        this.data = data;
    }
    listify(callback = (e)=>e.name) {
        return createElement("li").add(
            callback(this)
        );
    }
}