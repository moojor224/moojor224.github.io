function loadNav() {
    fetch("/jmoore143/helpers/nav.html").then(r => {
        r.text().then(t => {
            var nav = document.body.querySelector("nav");
            nav.innerHTML = t;

            var scr = document.querySelector("nav script");
            var nw = document.createElement("script");
            nw.innerHTML = scr.innerHTML;
            scr.onload = function (){

            }
            scr.async = true;
            nav.insertBefore(nw, scr);
        });
    });
}
window.onload = loadNav;