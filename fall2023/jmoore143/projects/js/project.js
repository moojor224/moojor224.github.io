// copyright Jordan Moore (jmoore143)
(function () {
    class Project {
        steps = [];
        files = [];
        materials = [];
        constructor(title) {
            this.title = title;
        }
        addFile(path, name, link, language) {
            this.files.push(new this.#File(path, name, link, language));
        }
        addStep(...step) {
            this.steps.push(...step);
        }
        renderSteps() {
            function interleave(arr, thing) {
                return [].concat(...arr.map(n => [n, thing()])).slice(0, -1);
            }
            var res = interleave(this.steps.map(e => e.render()), (e => createElement("hr")));
            console.log(res);
            return [...res, createElement("hr")];
        }
        addMaterial(amount, name, links = "#") {
            if (typeof links == "string") {
                links = [links];
            }
            this.materials.push({
                amount,
                name,
                links
            });
        }
        getLinks(links) {
            var span = createElement("span");
            var arr = [];
            links.forEach(l => {
                if (l.includes("amazon")) {
                    arr.push(createElement("a", { href: l, innerHTML: "Amazon" }), ",");
                } else {
                    arr.push(createElement("a", { href: l, innerHTML: l }), ",");
                }
            });
            arr.pop();
            return arr;
        }
        renderMaterials() {
            let table = createElement("table", {
                classList: "materials-table",
                cellspacing: "0",
                cellpadding: "0",
            });
            table.add(
                // createElement("thead").add(
                createElement("tr").add(
                    createElement("th", { innerHTML: "Amount" }),
                    createElement("th", { innerHTML: "Name" }),
                    createElement("th", { innerHTML: "Link" }),
                ),
                // ),
                // createElement("tbody").add(
                ...this.materials.map((mat, row) => createElement("tr", {
                    classList: row % 2 ? "odd" : "even"
                }).add(
                    createElement("td", { innerHTML: mat.amount + (mat.amount.includes("x") ? "" : "x") }),
                    createElement("td", { innerHTML: mat.name }),
                    createElement("td").add(
                        ...this.getLinks(mat.links)
                    ),
                ))
                // )
            );
            return table;
        }
        anchor(id) {
            return createElement("h1", {
                id,
                innerHTML: id,
            });
        }
        render() {
            let div = document.createElement("div", { classList: "container" });
            let filesDiv = createElement("div", {
                classList: "vtv-wrapper"
            });
            let ol = createElement("ol", { classList: "vtv" });
            div.add(this.makeTOC());
            div.add(this.anchor("Materials"));
            div.add(this.renderMaterials());

            div.add(this.anchor("Steps"));
            var res = this.renderSteps();
            console.log(res);
            div.add(...res);

            div.add(this.anchor("Files"));
            div.add(filesDiv.add(ol.add(...this.files.map(e => e.render()))));
            console.log(div.children);
            return div;
        }
        makeTOC() {
            let toc = createElement("div", {
                id: "toc_container"
            });
            let ul = createElement("ul");
            ul.add(
                createElement("li").add(
                    createElement("a", { href: "#Materials", innerHTML: "Materials" })
                ),
                createElement("li").add(
                    createElement("a", { href: "#Steps", innerHTML: "Steps" }),
                    createElement("ol").add(
                        ...this.steps.map((e, n) => createElement("li").add(
                            createElement("a", {
                                innerHTML: e.title,
                                href: "#" + e.title,
                            })
                        ))
                    )
                ),
                createElement("li").add(
                    createElement("a", { href: "#Files", innerHTML: "Files" })
                )
            );
            toc.add(ul);
            return toc;
        }
        #File = class {
            constructor(path, name, link, language) {
                this.path = path;
                this.name = name;
                this.link = link;
                this.language = language;
            }
            render() {
                let li = createElement("li", {
                    dataset: {
                        path: `${this.path}/${this.name}`,
                        url: `${this.link}`,
                        language: this.language,
                    }
                });
                return li;
            }
            // getLanguage(ext) {
            //     switch (ext) {
            //         case "js": return "javascript";
            //         case "ino": return "arduino";
            //         case "cpp": return "c++";
            //         case "stl": return "3d file";
            //         case "txt": return "plain text";
            //     }
            // }
        }
    }
    class Step {
        text = [];
        images = [];
        constructor(title) {
            this.title = title;
        }
        addText(text) {
            this.text.push(text);
        }
        addImage(link) {
            this.images.push(link);
        }
        render() {
            let step = createElement("div", { classList: "step" }).add(
                createElement("h3", {
                    id: this.title,
                    innerHTML: this.title,
                })
            );
            let pictures = createElement("div", { classList: "pics" });
            let slideIndex = 1;
            let numSlides = this.images.length;
            function plusSlides(n, elem) {
                showSlides(slideIndex += n, elem);
            }
            function currentSlide(n, elem) {
                showSlides(slideIndex = n, elem);
            }
            function showSlides(n, elem) {
                console.log(elem);
                let i;
                let slides = elem.querySelectorAll(".slide");
                if (n > slides.length) slideIndex = 1;
                if (n < 1) slideIndex = slides.length;
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slides[slideIndex - 1].style.display = "block";
                elem.querySelector(".numbertext").innerHTML = `${slideIndex}/${elem.querySelectorAll("img").length}`;
            }
            function imgModal(l){
                document.body.append(createElement("div", {
                    style: {
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#0003"
                    }
                }))
            }
            pictures.add(
                createElement("div", { classList: "slideshow-container" }).add(
                    ...this.images.map((i, n) => createElement("div", {
                        classList: "slide"
                    }).add(
                        createElement("img", {
                            src: i,
                            onclick: e=>imgModal(i)
                        })
                    )),
                    createElement("div", {
                        classList: "controls"
                    }).add(
                        createElement("a", {
                            onclick: () => {
                                plusSlides(-1, pictures);
                            },
                            innerHTML: "&#10094;",
                            classList: "prev text-border"
                        }),
                        createElement("div", {
                            classList: "numbertext text-border"
                        }),
                        createElement("a", {
                            onclick: () => {
                                plusSlides(1, pictures)
                            },
                            innerHTML: "&#10095;",
                            classList: "next text-border"
                        })
                    )
                )
            );
            currentSlide(1, pictures);


            let text = createElement("div").add(
                ...this.text.map(t => createElement("p", {
                    innerHTML: t
                }))
            );


            step.add(pictures, createElement("br"), text);
            return step;
        }
    }
    window.Project = Project;
    window.Step = Step;
})();