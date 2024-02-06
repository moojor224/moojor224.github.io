// <!-- copyright Jordan Moore (jmoore143) -->
window.onload = function () {
    let a = document.createElement("a");
    // a.href = "/jmoore143/";
    a.onclick = ()=>window.location="/jmoore143";
    a.className = "home";
    a.innerHTML = "back home";
    a.style = `cursor: pointer;color: #0000;background-color: #0000;position: absolute;top: 0px;left: 0px;padding: 5px;`;
    document.body.append(a);
}