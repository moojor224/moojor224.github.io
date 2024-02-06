let scr = document.currentScript;
let parent = scr.parentElement;
console.log(parent, scr);
scr.remove();
console.log(parent);
parent.innerHTML = parent.innerHTML.replaceAll("<", "&lt;");