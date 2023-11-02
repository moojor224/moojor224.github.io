// copyright Jordan Moore (jmoore143)
(function () {//flexbox froggy
    var code = document.getElementById("code");
    code.value = Object.entries(levels[parseInt(document.querySelector(".current").textContent) - 1].style).map(e => e.join(":") + ";").join("\n");
    code.dispatchEvent(new Event("input"));
})();