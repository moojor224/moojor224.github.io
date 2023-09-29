window.onload = function () {
    let a = document.createElement("a");
    a.href = "/fall2023/jmoore143/";
    a.className = "home";
    a.innerHTML = "back home";
    let style = document.createElement("style");
    style.innerHTML = `a.home {color: #0000;background-color: #0000;position: absolute;top: 0px;left: 0px;padding: 5px;}
a.home:visited {color: #0000;background-color: #0000;}a.home:hover {color: #fff;background-color: #000;}`;
    document.head.append(style);
    document.body.append(a);
}