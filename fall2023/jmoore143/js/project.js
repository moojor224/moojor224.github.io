(function () {
    class Project {
        steps = [];
        files = {
            name: "top"
        };
        materials = [];
        constructor(title) {
            this.title = title;

        }
        addFile(path, name, link) {
            function recurse(arr, n, l, obj){
                if(recurse.length > 0){

                }
            }
            path = path.split("/");
            recurse(path, name, link, this.files);
        }
        addStep(step) {
            this.steps.push(step);
        }
        addMaterial(name, amount, link = "#"){

        }
    }
    class Step {
        text = [];
        image = [];
        constructor(...elems) {

        }
        addText(text){

        }
        addImage(link){
            this.images.push(link);
        }
    }
    window.Project = Project;
    window.Step = Step;
})();
var lnk = document.createElement("link");
lnk.href = "/fall2023/jmoore143/js/vanilla-tree-viewer/main.css";
lnk.rel = "stylesheet";
document.body.head.append(lnk);